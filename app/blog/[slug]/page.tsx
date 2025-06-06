import Link from "next/link"
import { notFound } from "next/navigation"
import Footer from "@/components/footer"

// Sample blog content - in a real app, this would be loaded from MDX files
const blogContent: Record<string, { title: string; date: string; author: string; content: string }> = {
  "building-ai-first-products": {
    title: "Building AI-First Products",
    date: "2025-01-15",
    author: "parker rex",
    content: `
# Building AI-First Products

The landscape of product development has fundamentally shifted. We're no longer building products that *use* AI—we're building products that are *powered by* AI from the ground up.

## The Paradigm Shift

Traditional software development follows a predictable pattern: define requirements, build features, ship to users. AI-first products flip this on its head.

Instead of building static features, we're building **adaptive systems** that learn and evolve with user behavior.

## Key Principles

### 1. Data as the Foundation

Every AI-first product starts with data. Not just any data—**quality, relevant data** that directly impacts the user experience.

### 2. Continuous Learning

The product doesn't just serve users; it learns from them. Every interaction becomes training data for the next iteration.

### 3. Personalization at Scale

AI enables us to create personalized experiences for millions of users simultaneously—something impossible with traditional approaches.

## Real-World Application

At REX Studios, we've applied these principles to build products that:

- Adapt to user workflows automatically
- Predict user needs before they're expressed
- Scale personalization without human intervention

The future belongs to products that think, learn, and evolve. The question isn't whether to build AI-first—it's how quickly you can make the transition.
    `,
  },
  "understanding-ai-workflows": {
    title: "Understanding AI Workflows",
    date: "2024-12-20",
    author: "parker rex",
    content: `
# Understanding AI Workflows

After building dozens of AI automations for clients, I've learned that the magic isn't in the AI itself—it's in how you structure the workflow around it.

## The Workflow Framework

Every successful AI implementation follows this pattern:

### Input → Process → Validate → Output

But the devil is in the details of each step.

## Common Mistakes

**Mistake #1: Skipping Validation**

Too many people pipe AI output directly to the end user. Always validate, always have a human in the loop for critical decisions.

**Mistake #2: Over-Engineering**

Start simple. A basic automation that works is better than a complex system that breaks.

**Mistake #3: Ignoring Context**

AI without context is just expensive randomness. Feed it the right information at the right time.

## What Actually Works

The best AI workflows I've built share these characteristics:

- **Clear boundaries**: The AI knows exactly what it should and shouldn't do
- **Fallback mechanisms**: When AI fails, the system gracefully degrades
- **Continuous feedback**: Every output gets evaluated and fed back into the system

## The Bottom Line

AI workflows aren't about replacing humans—they're about amplifying human capabilities. Build them with that mindset, and you'll create something truly valuable.
    `,
  },
  "learning-to-code-at-28": {
    title: "Learning to Code at 28",
    date: "2023-08-22",
    author: "parker rex",
    content: `
# Learning to Code at 28

I tried to learn programming four times before it finally stuck. At 15, 18, 21, and 25—each time, I'd get frustrated and quit. At 28, something was different.

## Why It Finally Worked

**Desperation is a powerful motivator.** I was burning through savings in Austin, had a failed startup behind me, and needed to build something—anything—to move forward.

But more importantly, I had **AI as a tutor**.

## The AI Advantage

Learning to code in 2023 was fundamentally different from learning in 2015. Instead of getting stuck on syntax errors for hours, I could:

- Ask ChatGPT to explain concepts in plain English
- Get instant feedback on my code
- Debug errors in real-time
- Learn by building, not by reading documentation

## What I Learned

**TypeScript and Next.js** became my foundation. I jumped in right when the App Router dropped—terrible timing, but it forced me to learn the new paradigms from scratch.

The key insight: **Don't try to learn everything.** Pick a stack, build something real, and let necessity drive your learning.

## The Breakthrough Moment

Three months in, I built my first real application—a simple productivity tracker. It was ugly, buggy, and barely functional. But it *worked*.

That's when I knew I could do this.

## For Anyone Starting Late

Age is just a number. I know developers who started at 35, 40, even 50. What matters isn't when you start—it's that you start.

And if you're learning now, you have advantages I didn't: better tools, AI tutors, and a community that's more welcoming than ever.

The best time to plant a tree was 20 years ago. The second best time is now.
    `,
  },
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

import type React from "react"

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogContent[params.slug]

  if (!post) {
    notFound()
  }

  // Simple MDX-like rendering (in a real app, you'd use @next/mdx or similar)
  const renderContent = (content: string) => {
    const lines = content.trim().split("\n")
    const elements: React.ReactNode[] = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      if (line.startsWith("# ")) {
        elements.push(
          <h1 key={i} className="text-3xl font-bold mb-6 text-white">
            {line.substring(2)}
          </h1>,
        )
      } else if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-2xl font-bold mb-4 mt-8 text-white">
            {line.substring(3)}
          </h2>,
        )
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={i} className="text-xl font-semibold mb-3 mt-6 text-white">
            {line.substring(4)}
          </h3>,
        )
      } else if (line.startsWith("**") && line.endsWith("**")) {
        elements.push(
          <p key={i} className="font-bold mb-4 text-gray-300">
            {line.substring(2, line.length - 2)}
          </p>,
        )
      } else if (line.startsWith("- ")) {
        elements.push(
          <li key={i} className="ml-6 mb-2 text-gray-300 list-disc">
            {line.substring(2)}
          </li>,
        )
      } else if (line.trim() === "") {
        // Skip empty lines
        continue
      } else {
        elements.push(
          <p key={i} className="mb-4 text-gray-300 leading-relaxed">
            {line}
          </p>,
        )
      }
    }

    return elements
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="/blog" className="text-gray-400 hover:text-white transition-colors mb-8 inline-block">
            ← back to blog
          </Link>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <p className="text-gray-400 text-sm">
            {post.date} – {post.author}
          </p>
        </div>

        {/* Content */}
        <article className="prose prose-invert max-w-none">
          <div className="space-y-4">{renderContent(post.content)}</div>
        </article>

        <Footer currentPage="blog" />
      </div>
    </div>
  )
}
