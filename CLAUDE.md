# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run lint` - Run ESLint

## Architecture

This is a portfolio website built with Next.js 14 (App Router), Tailwind CSS, and Framer Motion.

### Directory Structure

- `/app` - Next.js App Router pages and components
  - `/api/kevingpt/route.js` - OpenAI GPT chatbot endpoint
  - `/Component/` - Reusable UI components (Header, Footer, ThemeToggle, Reveal, Carousel, Popup)
  - `/Home/` - Page sections (Hero, About, Skills, Showcase, Services, Contact, Blog)
- `/asset/materials/` - Static assets (logo, profile pictures, showcase images, popup images)
- `/data/aboutMe.json` - Portfolio data (skills, personal info, Q&A content)

### Key Patterns

**Component Structure**: Components use PascalCase directories with `.js` files. Each component typically has a corresponding `.css` file for custom styles. Client components are marked with `"use client"`.

**Styling**: Tailwind CSS for utility classes combined with component-specific CSS files for animations and complex styles. Dark mode uses Tailwind's selector mode (`darkMode: 'selector'`).

**Animation**: Framer Motion `<Reveal>` wrapper component for scroll-based reveal animations. Swiper for carousels.

**Imports**: Path alias `@/*` maps to project root (configured in jsconfig.json).

**Responsive Design**: Uses Tailwind breakpoints including custom ones like `max-[992px]` and `max-[496px]`.

### Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics
- `OPENAI_SECRET_KEY` - OpenAI API for KevinGPT feature
