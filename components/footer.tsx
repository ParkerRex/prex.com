"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

interface FooterProps {
  currentPage?: "about" | "bio" | "blog" | "whiteboards" | "content"
}

export default function Footer({ currentPage }: FooterProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        <Link
          href="/about"
          className={`transition-colors text-sm ${
            currentPage === "about" ? "text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          about
        </Link>
        <Link
          href="/bio"
          className={`transition-colors text-sm ${
            currentPage === "bio" ? "text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          bio
        </Link>
        <Link
          href="/blog"
          className={`transition-colors text-sm ${
            currentPage === "blog" ? "text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          blog
        </Link>
        <Link
          href="/whiteboards"
          className={`transition-colors text-sm ${
            currentPage === "whiteboards" ? "text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          whiteboards
        </Link>
        <Link
          href="/content"
          className={`transition-colors text-sm ${
            currentPage === "content" ? "text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          content
        </Link>
      </div>

      <div className="text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-8 h-8 bg-white dark:bg-white rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-black dark:bg-black rounded-full" />
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-gray-800 dark:text-gray-200" />
            ) : (
              <Moon className="w-4 h-4 text-gray-800 dark:text-gray-200" />
            )}
          </button>
        </div>
        <p className="text-gray-500 dark:text-gray-500 text-xs">2025 parker rex. building the future with ai.</p>
      </div>
    </footer>
  )
}
