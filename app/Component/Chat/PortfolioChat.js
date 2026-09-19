"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import {
  LuPlus,
  LuArrowUp,
  LuArrowUpRight,
  LuUser,
  LuLayers,
  LuMail,
  LuCode,
  LuCopy,
  LuCheck,
} from "react-icons/lu";
import portrait from "@/asset/materials/pfp/pfp_bright.png";
import { knowledge } from "@/data/knowledge.mjs";
import { projects } from "@/data/projects";
const prompts = [
  ["About me", "Tell me about Kevin", LuUser],
  ["My projects", "Show me Kevin’s projects", LuLayers],
  ["My journey", "How did Kevin start his career?", LuCode],
  ["Get in touch", "How can I contact Kevin?", LuMail],
];
export default function PortfolioChat({ posts, live = false }) {
  const [messages, setMessages] = useState([]),
    [input, setInput] = useState(""),
    [busy, setBusy] = useState(false),
    [remaining, setRemaining] = useState(null),
    [copied, setCopied] = useState(null);
  const bottom = useRef(null),
    controller = useRef(null),
    field = useRef(null);
  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy]);
  useEffect(() => () => controller.current?.abort(), []);
  function clear() {
    controller.current?.abort();
    controller.current = null;
    setBusy(false);
    setMessages([]);
    setInput("");
    field.current?.focus();
  }
  function browse() {
    setMessages((m) => [
      ...m,
      {
        role: "assistant",
        text: "Explore Kevin’s published portfolio below. These details are always available, without using AI credits.",
        sources: knowledge.map(({ id, title, href }) => ({ id, title, href })),
      },
    ]);
  }
  async function send(question = input) {
    if (busy || !question.trim()) return;
    const text = question.trim();
    setInput("");
    setBusy(true);
    const previous = messages.filter((m) => m.role === "assistant").at(-1)
      ?.sources?.[0]?.id;
    setMessages((m) => [...m, { role: "user", text }]);
    const active = new AbortController();
    controller.current = active;
    try {
      const response = await fetch("/api/kevingpt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userQuestion: text,
          ...(previous ? { contextId: previous } : {}),
        }),
        signal: active.signal,
      });
      const data = await response.json();
      if (controller.current !== active) return;
      if (typeof data.remaining === "number") setRemaining(data.remaining);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text:
            data.answer ||
            data.error ||
            "Something went wrong. Please try again.",
          sources: data.sources || [],
          error: !response.ok,
          mode: data.mode,
        },
      ]);
    } catch (error) {
      if (controller.current === active && error.name !== "AbortError")
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            text: "Could not connect. Please check your connection and try again.",
            error: true,
          },
        ]);
    } finally {
      if (controller.current === active) {
        setBusy(false);
        controller.current = null;
        field.current?.focus();
      }
    }
  }
  function stop() {
    controller.current?.abort();
    controller.current = null;
    setBusy(false);
    setMessages((m) => [
      ...m,
      {
        role: "assistant",
        text: "Response stopped. You can ask another question.",
      },
    ]);
  }
  async function copy(text, index) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(index);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div className="portfolio-app">
      <header className="chat-header">
        <button
          className="wordmark"
          onClick={clear}
          aria-label="kevthefoo — new conversation"
        >
          <span className="logo-mark">kf</span>kevthefoo
          <span className="wordmark-dot">.</span>
        </button>
        <div className="header-actions">
          <span className="mode-pill">
            <i />
            {live ? "Portfolio AI" : "Portfolio preview"}
          </span>
          <button
            className="icon-button"
            onClick={clear}
            aria-label="New conversation"
            title="New conversation"
          >
            <LuPlus />
          </button>
        </div>
      </header>
      <div className="content-scroll">
        {messages.length === 0 ? (
          <div className="welcome">
            <div className="intro-avatar">
              <Image
                src={portrait}
                width={64}
                height={64}
                alt="Kevin Foo"
                priority
              />
              <span>✳</span>
            </div>
            <p className="eyebrow">A LITTLE CODE. A LOT OF CURIOSITY.</p>
            <h1>
              Hey, I’m Kevin.
              <br />
              <span>What would you like to know?</span>
            </h1>
            <p className="welcome-description">
              My work, my story, and the things I’m into.
              <br />
              One conversation is a good place to start.
            </p>
            <div className="prompt-grid">
              {prompts.map(([label, question, Icon]) => (
                <button key={label} onClick={() => send(question)}>
                  <Icon />
                  {label}
                  <LuArrowUpRight />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div
            className="messages"
            aria-live="polite"
            aria-relevant="additions text"
          >
            {messages.map((message, index) => (
              <div className={`message ${message.role}`} key={index}>
                {message.role === "assistant" && (
                  <div className="answer-label">
                    <span className="assistant-symbol">✳</span>
                    <strong>Kevin’s portfolio</strong>
                    <small>
                      {message.mode === "ai"
                        ? "AI selected"
                        : message.mode === "preview"
                          ? "Published facts"
                          : ""}
                    </small>
                  </div>
                )}
                <div
                  className={`message-text ${message.error ? "message-error" : ""}`}
                >
                  {message.text}
                </div>
                {message.sources?.length > 0 && (
                  <div className="sources">
                    {message.sources.map((source) => (
                      <details key={source.id} className="source-detail">
                        <summary>
                          {source.title}
                          <span>+</span>
                        </summary>
                        <div className="source-content">
                          <p>
                            {
                              knowledge.find(
                                (record) => record.id === source.id,
                              )?.text
                            }
                          </p>
                          {source.id === "projects" && (
                            <div className="inline-links">
                              {projects.map((project) => (
                                <a
                                  key={project.name}
                                  href={project.url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {project.name}
                                  <LuArrowUpRight />
                                </a>
                              ))}
                            </div>
                          )}
                          {source.id === "contact" && (
                            <div className="inline-links">
                              <a href="mailto:kevthefoo@gmail.com">
                                Email Kevin
                                <LuArrowUpRight />
                              </a>
                              <a
                                href="https://github.com/kevthefoo"
                                target="_blank"
                                rel="noreferrer"
                              >
                                GitHub
                                <LuArrowUpRight />
                              </a>
                              <a
                                href="https://www.linkedin.com/in/kevthefoo/"
                                target="_blank"
                                rel="noreferrer"
                              >
                                LinkedIn
                                <LuArrowUpRight />
                              </a>
                            </div>
                          )}
                          {["journal", "career"].includes(source.id) &&
                            posts
                              .filter(
                                (post) =>
                                  source.id === "journal" ||
                                  post.slug === "how-i-start-my-career",
                              )
                              .map((post) => (
                                <details
                                  className="inline-article"
                                  key={post.slug}
                                >
                                  <summary>{post.title}</summary>
                                  <small>
                                    {post.date} · {post.readTime}
                                  </small>
                                  <div className="article-body">
                                    <ReactMarkdown>
                                      {post.content}
                                    </ReactMarkdown>
                                  </div>
                                </details>
                              ))}
                        </div>
                      </details>
                    ))}
                  </div>
                )}
                {message.role === "assistant" && (
                  <button
                    className="copy-button"
                    aria-label={
                      copied === index ? "Answer copied" : "Copy answer"
                    }
                    onClick={() => copy(message.text, index)}
                  >
                    {copied === index ? <LuCheck /> : <LuCopy />}
                  </button>
                )}
              </div>
            ))}
            {busy && (
              <div className="answer-pending" role="status">
                <span className="assistant-symbol">✳</span>Finding the relevant
                details<span className="loading-dots">...</span>
              </div>
            )}
            <div ref={bottom} />
          </div>
        )}
      </div>
      <footer className="composer-area">
        <form
          className="composer"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <label className="sr-only" htmlFor="question">
            Ask about Kevin
          </label>
          <textarea
            id="question"
            ref={field}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={500}
            rows={2}
            placeholder="Ask me about Kevin…"
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                e.preventDefault();
                send();
              }
            }}
          />
          <div className="composer-bottom">
            <button
              type="button"
              className="browse-button"
              onClick={browse}
              disabled={busy}
            >
              <LuLayers />
              Explore the facts
            </button>
            <div>
              {input.length > 400 && <small>{input.length}/500</small>}
              {busy ? (
                <button
                  type="button"
                  className="send-button"
                  aria-label="Stop response"
                  onClick={stop}
                >
                  <span className="stop-square" />
                </button>
              ) : (
                <button
                  className="send-button"
                  type="submit"
                  aria-label="Send question"
                  disabled={!input.trim()}
                >
                  <LuArrowUp />
                </button>
              )}
            </div>
          </div>
        </form>
        <div className="composer-caption">
          <span>
            {live
              ? "Only Kevin’s world. Answers grounded in his portfolio."
              : "Published facts preview · Live AI is not connected"}
          </span>
          {remaining !== null && <span>{remaining} questions left today</span>}
        </div>
      </footer>
    </div>
  );
}
