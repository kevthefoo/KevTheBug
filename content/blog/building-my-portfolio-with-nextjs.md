---
title: "Building My Portfolio with Next.js 14"
date: "2025-01-15"
excerpt: "A deep dive into how I built this portfolio website using Next.js 14 App Router, Tailwind CSS, and Framer Motion."
tags: ["Next.js", "React", "Tailwind CSS", "Portfolio"]
readTime: "5 min read"
---

## Why Next.js 14?

When I set out to build my portfolio, I wanted something fast, SEO-friendly, and enjoyable to develop with. Next.js 14 with the App Router was the clear winner.

The new App Router brings server components by default, which means faster page loads and better SEO out of the box. For a portfolio site, this is exactly what you want — recruiters and visitors should see your content instantly.

## The Tech Stack

Here's what powers this site:

- **Next.js 14** — App Router with server and client components
- **Tailwind CSS** — Utility-first styling with custom dark mode
- **Framer Motion** — Smooth scroll-based reveal animations
- **Swiper** — Beautiful project showcase carousel

## Key Design Decisions

### Dark Mode with Selector Strategy

Instead of using Tailwind's default media query dark mode, I opted for the `selector` strategy. This gives users explicit control over their theme preference rather than relying on system settings.

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'selector',
  // ...
}
```

### Scroll-Based Reveal Animations

Every section uses a custom `<Reveal>` component powered by Framer Motion's `useInView` hook. Elements slide in smoothly as you scroll, creating a polished browsing experience without overwhelming the visitor.

### Component-First Architecture

Each section lives in its own directory under `/app/Home/`, making it easy to maintain and update individual sections without touching unrelated code.

## Lessons Learned

1. **Keep animations subtle** — It's tempting to add flashy animations everywhere, but restraint creates a more professional feel.
2. **Mobile-first is non-negotiable** — Over 60% of portfolio views come from mobile devices.
3. **Performance matters** — Every millisecond of load time counts when someone is evaluating your work.

## What's Next

I'm planning to add a blog system (you're reading it now!), more interactive project showcases, and possibly a KevinGPT chatbot that can answer questions about my experience.

Stay tuned for more updates!
