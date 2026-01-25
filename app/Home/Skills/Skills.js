import "./skills.css";
import { HiAcademicCap } from "react-icons/hi2";

import Reveal from "@/app/Component/Reveal/Reveal";

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen flex-col justify-start pt-16 dark:bg-neutral-800"
    >
      <h1>Skills</h1>
      <span className="mb-12 text-xl text-gray-500">What I got in my bag</span>
      <Reveal yTranslate={300}>
        <div className="mx-auto grid h-full w-4/5 grid-cols-2 justify-center gap-8 max-[992px]:w-full max-[992px]:text-[14px] max-md:grid-cols-1">
          <div className="flex flex-col rounded-xl border-2 border-gray-400 bg-slate-200 p-4 dark:bg-slate-800">
            <h3 className="mb-4 self-center text-xl">Frontend</h3>
            <div>
              <ul className="grid grid-flow-col grid-cols-2 grid-rows-4 items-center justify-center gap-4">
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  JavaScript
                </li>
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  React
                </li>
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  Next.js
                </li>
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  HeroUI
                </li>
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  Tailwindcss
                </li>
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  Shadcn/ui
                </li>
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  Figma
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col rounded-xl border-2 border-gray-400 bg-slate-200 p-4 dark:bg-slate-800">
            <h3 className="mb-4 self-center text-xl">Backend</h3>
            <div>
              <ul className="grid grid-flow-col grid-cols-2 grid-rows-4 items-center justify-center gap-4">
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  Python
                </li>
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  Node.js
                </li>
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  Express.js
                </li>
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  Mongodb
                </li>
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  PostgreSQL
                </li>
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  AWS
                </li>
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  Docker
                </li>
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  Supabase
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col rounded-xl border-2 border-gray-400 bg-slate-200 p-4 dark:bg-slate-800">
            <h3 className="mb-4 self-center text-xl">Blockchain</h3>
            <div>
              <ul className="grid grid-flow-col grid-cols-2 grid-rows-4 items-center justify-center gap-4">
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  Solidity
                </li>
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  Truffle
                </li>
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  Web3.js
                </li>
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  Ether.js
                </li>
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  Foundry
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col rounded-xl border-2 border-gray-400 bg-slate-200 p-4 dark:bg-slate-800">
            <h3 className="mb-4 self-center text-xl">AI</h3>
            <div>
              <ul className="grid grid-flow-col grid-cols-2 grid-rows-4 items-center justify-center gap-4">
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  N8N
                </li>
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  RAG
                </li>
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  MCP
                </li>
                <li className="flex items-center justify-start gap-1">
                  <HiAcademicCap />
                  Claude
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
