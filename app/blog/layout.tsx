import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog - Parker Rex',
  description: 'Thoughts on AI, development, and building in public',
  openGraph: {
    title: 'Blog - Parker Rex',
    description: 'Thoughts on AI, development, and building in public',
    type: 'website',
    url: 'https://prex.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Parker Rex',
    description: 'Thoughts on AI, development, and building in public',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <h1 className="text-2xl font-bold">Blog</h1>
          <p className="text-gray-400 text-sm mt-2">
            Thoughts on AI, development, and building in public
          </p>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}