import Link from "next/link"

interface FooterProps {
  currentPage?: "about" | "bio" | "blog" | "whiteboards" | "content"
}

export default function Footer({ currentPage }: FooterProps) {
  return (
    <footer className="mt-16 pt-8 border-t border-gray-800">
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        <Link
          href="/about"
          className={`transition-colors text-sm ${
            currentPage === "about" ? "text-green-500 hover:text-green-400" : "text-gray-400 hover:text-white"
          }`}
        >
          about
        </Link>
        <Link
          href="/bio"
          className={`transition-colors text-sm ${
            currentPage === "bio" ? "text-green-500 hover:text-green-400" : "text-gray-400 hover:text-white"
          }`}
        >
          bio
        </Link>
        <Link
          href="/blog"
          className={`transition-colors text-sm ${
            currentPage === "blog" ? "text-green-500 hover:text-green-400" : "text-gray-400 hover:text-white"
          }`}
        >
          blog
        </Link>
        <Link
          href="/whiteboards"
          className={`transition-colors text-sm ${
            currentPage === "whiteboards" ? "text-green-500 hover:text-green-400" : "text-gray-400 hover:text-white"
          }`}
        >
          whiteboards
        </Link>
        <Link
          href="/content"
          className={`transition-colors text-sm ${
            currentPage === "content" ? "text-green-500 hover:text-green-400" : "text-gray-400 hover:text-white"
          }`}
        >
          content
        </Link>
      </div>

      <div className="text-center">
        <div className="w-8 h-8 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
          <div className="w-2 h-2 bg-black rounded-full" />
        </div>
        <p className="text-gray-500 text-xs">2025 parker rex. building the future with ai.</p>
      </div>
    </footer>
  )
}
