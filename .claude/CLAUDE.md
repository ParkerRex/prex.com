# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Parker Rex's personal portfolio website (prex.com) built with Next.js 15.2.4 using App Router, TypeScript, and shadcn/ui components. The site features a minimal, terminal-inspired dark design with a comprehensive UI component library.

## Development Commands

**Primary development workflow:**
- `pnpm dev` - Start development server with Turbopack for fast rebuilds
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Next.js linting (ESLint errors are ignored in builds)

**Code quality:**
- Use Biome for formatting, linting, and import organization (configured in biome.json)
- No separate Prettier/ESLint - Biome handles all code quality tasks
- Format with tabs (configured in Biome)

## Architecture

**Tech Stack:**
- Next.js 15.2.4 with App Router (not Pages Router)
- TypeScript 5.8.3 with strict configuration
- React 19.1.0
- Tailwind CSS 3.4.13 with shadcn/ui component system
- Biome for code quality (replaces ESLint/Prettier)

**Key Directories:**
- `app/` - Next.js App Router pages and layouts
- `components/ui/` - Complete shadcn/ui component library (40+ components)
- `lib/` - Utility functions and API integrations
- `hooks/` - Custom React hooks

**Design System:**
- Dark theme with CSS variables in `app/globals.css`
- Monospace font with terminal aesthetic
- shadcn/ui configured with custom color system
- Import paths use `@/` alias (maps to root directory)

## API Integrations

The project has placeholder files for external API integrations:
- `lib/strava.ts` - Strava API (has TODO items for implementation)
- `lib/github.ts` - GitHub API (empty, awaiting implementation)
- `lib/youtube.ts` - YouTube API (empty, awaiting implementation)

## Configuration Notes

- `next.config.mjs` ignores ESLint and TypeScript errors during builds for faster development
- Images are set to unoptimized in Next.js config
- TypeScript uses ESNext target with modern features enabled
- Tailwind configured with extensive custom animations and shadcn/ui integration

## Page Structure

The site uses App Router with the following main routes:
- `/` - Homepage with stats, socials, and projects
- `/about` - About page
- `/bio` - Biography page  
- `/blog` - Blog listing and dynamic `[slug]` posts
- `/content` - Content listing and dynamic `[id]` items
- `/sponsors` - Sponsors page
- `/whiteboards` - Whiteboards page

When adding new pages, follow the existing App Router patterns and maintain the consistent dark theme styling.