"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  LuBookOpen,
  LuX,
  LuHeart,
  LuMoon,
  LuSun,
  LuPanelLeftClose,
  LuPanelLeftOpen,
  LuMessageSquare,
  LuFileText,
  LuDatabase,
  LuGithub,
  LuTrash2,
} from "react-icons/lu";
import portrait from "@/asset/materials/pfp/pfp_bright.png";
import { knowledge } from "@/data/knowledge.mjs";
import { projects } from "@/data/projects";
const prompts = [
  ["About me", "Tell me about Kevin", "about", LuUser],
  ["My projects", "Show me Kevin’s projects", "projects", LuLayers],
  ["My journey", "How did Kevin start his career?", "career", LuCode],
  ["Get in touch", "How can I contact Kevin?", "contact", LuMail],
];
const expandableSourceIds = new Set(["journal"]);
const conversationsKey = "kevthefoo-conversations";
const activeConversationKey = "kevthefoo-active-conversation";
const maxStoredConversations = 20;
const aboutFollowUps = [
  ["My interests", "What are your interests?", ["interests"], LuHeart],
  [
    "My skills",
    "What skills do you use?",
    ["frontend", "backend", "blockchain"],
    LuCode,
  ],
  ["My projects", "Show me your projects", ["projects"], LuLayers],
  ["My journey", "Tell me about your career journey", ["career"], LuBookOpen],
];
function TypewriterText({ text }) {
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    let nextLength = 0;
    const charactersPerTick = Math.max(1, Math.ceil(text.length / 90));
    const interval = window.setInterval(() => {
      nextLength = Math.min(text.length, nextLength + charactersPerTick);
      setVisibleLength(nextLength);
      if (nextLength === text.length) window.clearInterval(interval);
    }, 18);

    return () => window.clearInterval(interval);
  }, [text]);

  const typing = visibleLength < text.length;
  return (
    <>
      <span className="typewriter-text" aria-hidden="true">
        {text.slice(0, visibleLength)}
        {typing && <span className="typewriter-cursor" />}
      </span>
      <span className="sr-only">{text}</span>
    </>
  );
}
export default function PortfolioChat({ posts }) {
  const [messages, setMessages] = useState([]),
    [input, setInput] = useState(""),
    [busy, setBusy] = useState(false),
    [remaining, setRemaining] = useState(null),
    [copied, setCopied] = useState(null),
    [selectedArticle, setSelectedArticle] = useState(null),
    [sidebarOpen, setSidebarOpen] = useState(false),
    [sidebarCollapsed, setSidebarCollapsed] = useState(false),
    [conversations, setConversations] = useState([]),
    [activeConversationId, setActiveConversationId] = useState(null),
    [theme, setTheme] = useState("dark");
  const bottom = useRef(null),
    controller = useRef(null),
    themeTimer = useRef(null),
    field = useRef(null),
    closeArticleButton = useRef(null),
    previousFocus = useRef(null),
    articleModal = useRef(null),
    conversationsReady = useRef(false);
  const careerPost = posts.find(
    (post) => post.slug === "how-i-start-my-career",
  );
  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy]);
  useEffect(
    () => () => {
      controller.current?.abort();
      window.clearTimeout(themeTimer.current);
    },
    [],
  );
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "dark");
  }, []);
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(conversationsKey) || "[]");
      const safeConversations = Array.isArray(stored)
        ? stored.filter(
            (conversation) =>
              conversation &&
              typeof conversation.id === "string" &&
              Array.isArray(conversation.messages),
          )
        : [];
      const storedActiveId = localStorage.getItem(activeConversationKey);
      const activeConversation = safeConversations.find(
        (conversation) => conversation.id === storedActiveId,
      );
      setConversations(safeConversations);
      if (activeConversation) {
        setActiveConversationId(activeConversation.id);
        setMessages(activeConversation.messages);
      }
    } catch {
      localStorage.removeItem(conversationsKey);
      localStorage.removeItem(activeConversationKey);
    } finally {
      conversationsReady.current = true;
    }
  }, []);
  useEffect(() => {
    if (!conversationsReady.current || messages.length === 0) return;
    const firstQuestion = messages.find(
      (message) => message.role === "user",
    )?.text;
    if (!firstQuestion) return;
    const id = activeConversationId || crypto.randomUUID();
    const conversation = {
      id,
      title:
        firstQuestion.length > 42
          ? `${firstQuestion.slice(0, 42).trim()}…`
          : firstQuestion,
      messages,
      updatedAt: new Date().toISOString(),
    };
    setActiveConversationId(id);
    setConversations((current) => {
      const next = [
        conversation,
        ...current.filter((item) => item.id !== id),
      ].slice(0, maxStoredConversations);
      localStorage.setItem(conversationsKey, JSON.stringify(next));
      localStorage.setItem(activeConversationKey, id);
      return next;
    });
  }, [messages, activeConversationId]);
  useEffect(() => {
    if (!selectedArticle) return;
    closeArticleButton.current?.focus();
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedArticle(null);
        previousFocus.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [selectedArticle]);
  function clear() {
    controller.current?.abort();
    controller.current = null;
    setBusy(false);
    setMessages([]);
    setActiveConversationId(null);
    localStorage.removeItem(activeConversationKey);
    setInput("");
    setSidebarOpen(false);
    field.current?.focus();
  }
  function openConversation(conversation) {
    controller.current?.abort();
    controller.current = null;
    setBusy(false);
    setActiveConversationId(conversation.id);
    setMessages(conversation.messages);
    localStorage.setItem(activeConversationKey, conversation.id);
    setSidebarOpen(false);
  }
  function deleteConversation(id) {
    setConversations((current) => {
      const next = current.filter((conversation) => conversation.id !== id);
      localStorage.setItem(conversationsKey, JSON.stringify(next));
      return next;
    });
    if (activeConversationId === id) clear();
  }
  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";
    const root = document.documentElement;
    window.clearTimeout(themeTimer.current);
    root.classList.add("theme-transitioning");
    void root.offsetWidth;
    root.dataset.theme = nextTheme;
    localStorage.setItem("kevthefoo-theme", nextTheme);
    setTheme(nextTheme);
    themeTimer.current = window.setTimeout(
      () => root.classList.remove("theme-transitioning"),
      320,
    );
  }
  function browse() {
    setMessages((m) => [
      ...m,
      {
        role: "assistant",
        text: "Explore my published portfolio below. These details are always available without using AI credits.",
        sources: knowledge.map(({ id, title, href }) => ({ id, title, href })),
      },
    ]);
  }
  function answerPreset(question, sourceIds) {
    if (busy) return;
    const requestedIds = Array.isArray(sourceIds) ? sourceIds : [sourceIds];
    const sources = requestedIds
      .map((sourceId) => knowledge.find((record) => record.id === sourceId))
      .filter(Boolean);
    if (!sources.length) return;
    setInput("");
    setSidebarOpen(false);
    setMessages((current) => [
      ...current,
      { role: "user", text: question },
      {
        role: "assistant",
        text: sources.map((source) => source.text).join("\n\n"),
        sources: sources.map(({ id, title, href }) => ({ id, title, href })),
        mode: "preset",
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
  function openArticle(article, event) {
    previousFocus.current = event.currentTarget;
    setSelectedArticle(article);
  }
  function closeArticle() {
    setSelectedArticle(null);
    previousFocus.current?.focus();
  }
  function keepFocusInArticle(event) {
    if (event.key !== "Tab") return;
    const focusable = [
      ...articleModal.current.querySelectorAll(
        'button, a[href], summary, [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((element) => !element.hasAttribute("disabled"));
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return (
    <div className="portfolio-app">
      <aside
        className={`chat-sidebar ${sidebarOpen ? "is-open" : ""} ${sidebarCollapsed ? "is-collapsed" : ""}`}
        aria-label="Portfolio navigation"
      >
        <div className="sidebar-topbar">
          <button
            className="sidebar-brand"
            onClick={clear}
            aria-label="KevTheFoo — new conversation"
          >
            <Image src="/icon.svg" alt="" width={32} height={32} />
            <span>KevTheFoo</span>
          </button>
          <button
            className="sidebar-toggle"
            type="button"
            onClick={() => {
              if (window.matchMedia("(max-width: 820px)").matches)
                setSidebarOpen(false);
              else setSidebarCollapsed(true);
            }}
            aria-label="Close sidebar"
            title="Close sidebar"
          >
            <LuPanelLeftClose />
          </button>
        </div>
        <button className="sidebar-new-chat" type="button" onClick={clear}>
          <LuMessageSquare />
          <span>New conversation</span>
          <LuPlus className="sidebar-new-chat-plus" />
        </button>
        <nav className="sidebar-navigation">
          <p>Explore</p>
          {prompts.map(([label, question, sourceId, Icon]) => (
            <button
              key={label}
              type="button"
              onClick={() => answerPreset(question, sourceId)}
              className={
                messages
                  .at(-1)
                  ?.sources?.some((source) => source.id === sourceId)
                  ? "is-active"
                  : ""
              }
            >
              <Icon />
              <span>{label}</span>
            </button>
          ))}
          <p>Resources</p>
          <Link href="/blog" onClick={() => setSidebarOpen(false)}>
            <LuFileText />
            <span>Journal</span>
          </Link>
          <Link href="/api/v1" onClick={() => setSidebarOpen(false)}>
            <LuDatabase />
            <span>Public API</span>
          </Link>
          <a
            href="https://github.com/kevthefoo"
            target="_blank"
            rel="noreferrer"
          >
            <LuGithub />
            <span>GitHub</span>
          </a>
          {conversations.length > 0 && (
            <div className="sidebar-recents">
              <p>Recents</p>
              {conversations.map((conversation) => (
                <div
                  className={`sidebar-recent-row ${activeConversationId === conversation.id ? "is-active" : ""}`}
                  key={conversation.id}
                >
                  <button
                    className="sidebar-recent-open"
                    type="button"
                    onClick={() => openConversation(conversation)}
                    title={conversation.title}
                  >
                    <LuMessageSquare />
                    <span>{conversation.title}</span>
                  </button>
                  <button
                    className="sidebar-recent-delete"
                    type="button"
                    onClick={() => deleteConversation(conversation.id)}
                    aria-label={`Delete ${conversation.title}`}
                    title="Delete conversation"
                  >
                    <LuTrash2 />
                  </button>
                </div>
              ))}
            </div>
          )}
        </nav>
        <div className="sidebar-profile">
          <Image src={portrait} alt="Kevin Foo" width={36} height={36} />
          <span>
            <strong>Kevin Foo</strong>
            <small>Software developer</small>
          </span>
        </div>
      </aside>
      {sidebarOpen && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <section className="chat-main">
        <header className="chat-header">
          <div className="chat-header-leading">
            <button
              className={`icon-button sidebar-open-button ${sidebarCollapsed ? "is-visible" : ""}`}
              type="button"
              onClick={() => {
                setSidebarCollapsed(false);
                setSidebarOpen(true);
              }}
              aria-label="Open sidebar"
              title="Open sidebar"
            >
              <LuPanelLeftOpen />
            </button>
            <span className="chat-title">Ask Kevin</span>
          </div>
          <div className="header-actions">
            <button
              className="icon-button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <LuMoon /> : <LuSun />}
            </button>
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
                {prompts.map(([label, question, sourceId, Icon]) => (
                  <button
                    key={label}
                    onClick={() => answerPreset(question, sourceId)}
                  >
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
                          : ["preview", "preset"].includes(message.mode)
                            ? "Published facts"
                            : ""}
                      </small>
                    </div>
                  )}
                  <div
                    className={`message-text ${message.error ? "message-error" : ""}`}
                  >
                    {message.role === "assistant" ? (
                      <TypewriterText text={message.text} />
                    ) : (
                      message.text
                    )}
                  </div>
                  {message.sources?.some((source) => source.id === "about") && (
                    <div
                      className="follow-up-actions"
                      aria-label="Ask a follow-up"
                    >
                      {aboutFollowUps.map(
                        ([label, question, sourceIds, Icon]) => (
                          <button
                            key={label}
                            type="button"
                            onClick={() => answerPreset(question, sourceIds)}
                            disabled={busy}
                          >
                            <Icon />
                            {label}
                          </button>
                        ),
                      )}
                    </div>
                  )}
                  {message.sources?.some(
                    (source) => source.id === "contact",
                  ) && (
                    <div className="inline-links contact-links">
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
                      <a
                        href="https://x.com/kevthefoo"
                        target="_blank"
                        rel="noreferrer"
                      >
                        X
                        <LuArrowUpRight />
                      </a>
                    </div>
                  )}
                  {careerPost &&
                    message.sources?.some(
                      (source) => source.id === "career",
                    ) && (
                      <button
                        type="button"
                        className="related-article-button"
                        onClick={(event) => openArticle(careerPost, event)}
                      >
                        <LuBookOpen />
                        <span>
                          <small>RELATED ARTICLE</small>
                          {careerPost.title}
                        </span>
                        <LuArrowUpRight />
                      </button>
                    )}
                  {message.sources?.some(
                    (source) => source.id === "projects",
                  ) && (
                    <div className="project-rows">
                      {projects.map((project, projectIndex) => (
                        <details className="project-row" key={project.name}>
                          <summary className="project-row-summary">
                            <span className="project-index">
                              {String(projectIndex + 1).padStart(2, "0")}
                            </span>
                            <span className="project-name">{project.name}</span>
                            <span className="project-kind">{project.type}</span>
                            <span className="project-toggle">+</span>
                          </summary>
                          <div className="project-preview">
                            <div className="project-thumbnail">
                              <Image
                                src={project.image}
                                alt={`${project.name} website preview`}
                                sizes="(max-width: 760px) 100vw, 320px"
                              />
                            </div>
                            <div className="project-copy">
                              <small>{project.tag}</small>
                              <h3>{project.name}</h3>
                              <p>{project.description}</p>
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Visit website
                                <LuArrowUpRight />
                              </a>
                            </div>
                          </div>
                        </details>
                      ))}
                    </div>
                  )}
                  {message.sources?.some((source) =>
                    expandableSourceIds.has(source.id),
                  ) && (
                    <div className="sources">
                      {message.sources
                        .filter((source) => expandableSourceIds.has(source.id))
                        .map((source) => (
                          <details key={source.id} className="source-detail">
                            <summary>
                              {source.title}
                              <span>+</span>
                            </summary>
                            <div className="source-content">
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
                              {source.id === "journal" &&
                                posts.map((post) => (
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
                  <span className="assistant-symbol">✳</span>Finding the
                  relevant details<span className="loading-dots">...</span>
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
          {remaining !== null && (
            <div className="composer-caption">
              <span>{remaining} questions left today</span>
            </div>
          )}
        </footer>
      </section>
      {selectedArticle && (
        <div
          className="article-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeArticle();
          }}
        >
          <section
            ref={articleModal}
            className="article-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-modal-title"
            onKeyDown={keepFocusInArticle}
          >
            <header className="article-modal-header">
              <div>
                <span>KEVIN’S JOURNAL</span>
                <h2 id="article-modal-title">{selectedArticle.title}</h2>
                <p>
                  {selectedArticle.date} · {selectedArticle.readTime}
                </p>
              </div>
              <button
                ref={closeArticleButton}
                type="button"
                className="article-modal-close"
                aria-label="Close article"
                title="Close article"
                onClick={closeArticle}
              >
                <LuX />
              </button>
            </header>
            <div className="article-modal-content article-body">
              <ReactMarkdown>{selectedArticle.content}</ReactMarkdown>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
