// Uses a real Redis binary when provided; no production services or credentials needed.
import test from "node:test";
import assert from "node:assert/strict";
import { spawn, execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { RESERVE_SCRIPT } from "./chat-budget.mjs";
const exec = promisify(execFile);
test(
  "real Redis: concurrent callers cannot exceed global/lifetime/visitor caps",
  { skip: !process.env.REDIS_SERVER_BIN },
  async () => {
    const dir = await mkdtemp(join(tmpdir(), "kev-budget-"));
    const socket = join(dir, "redis.sock");
    const server = spawn(
      process.env.REDIS_SERVER_BIN,
      [
        "--port",
        "0",
        "--unixsocket",
        socket,
        "--save",
        "",
        "--appendonly",
        "no",
      ],
      { stdio: ["ignore", "pipe", "pipe"] },
    );
    try {
      await new Promise((resolve, reject) => {
        server.on("error", reject);
        server.stdout.on("data", (chunk) => {
          if (chunk.toString().includes("ready to accept connections"))
            resolve();
        });
        server.on("exit", (code) => reject(new Error(`Redis exited ${code}`)));
      });
      const command = async (...args) =>
        JSON.parse(
          (
            await exec(process.env.REDIS_CLI_BIN, [
              "-s",
              socket,
              "--json",
              ...args,
            ])
          ).stdout,
        );
      const reserve = async (
        namespace,
        visitor,
        daily = "100",
        total = "1000",
      ) =>
        command("EVAL", RESERVE_SCRIPT, "1", namespace, visitor, daily, total);
      const attempts = await Promise.all(
        Array.from({ length: 40 }, (_, i) =>
          reserve("parallel", `visitor-${i}`, "5"),
        ),
      );
      assert.equal(attempts.filter((x) => x[0] === 1).length, 5);
      assert.equal(await command("GET", "parallel:lifetime"), "5");
      const totalAttempts = await Promise.all(
        Array.from({ length: 20 }, (_, i) =>
          reserve("total", `visitor-${i}`, "100", "3"),
        ),
      );
      assert.equal(totalAttempts.filter((x) => x[0] === 1).length, 3);
      assert.equal((await reserve("cooldown", "same"))[0], 1);
      assert.equal((await reserve("cooldown", "same"))[1], "cooldown");
      for (let i = 0; i < 10; i++) {
        await command("DEL", "visitor:cooldown:same");
        const r = await reserve("visitor", "same");
        assert.equal(r[0], 1);
      }
      await command("DEL", "visitor:cooldown:same");
      assert.equal((await reserve("visitor", "same"))[1], "visitor");
      assert.equal((await reserve("disabled", "a", "0"))[0], 0);
    } finally {
      server.kill("SIGTERM");
      await new Promise((resolve) => server.once("close", resolve));
      await rm(dir, { recursive: true, force: true });
    }
  },
);
