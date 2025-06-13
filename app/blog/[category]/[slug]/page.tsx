import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { blogCategories, categoryInfo, BlogCategory } from '@/lib/blog';
import { getPostBySlug, getPostContent, getAllPosts, generateTOC } from '@/lib/mdx';
import { mdxComponents } from '@/components/mdx';
import { TableOfContents } from '@/components/blog/table-of-contents';
import Footer from '@/components/footer';

interface BlogPostPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  
  if (!blogCategories.includes(category as BlogCategory)) {
    return {
      title: 'Post Not Found',
    };
  }

  const post = getPostBySlug(category as BlogCategory, slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Parker Rex`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://prex.com/blog/${category}/${slug}`,
      publishedTime: post.date,
      authors: ['Parker Rex'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { category, slug } = await params;

  if (!blogCategories.includes(category as BlogCategory)) {
    notFound();
  }

  const post = getPostBySlug(category as BlogCategory, slug);
  const content = getPostContent(category as BlogCategory, slug);

  if (!post || !content) {
    notFound();
  }

  const toc = generateTOC(content);

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <Link
            href={`/blog/${category}`}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to {categoryInfo[category as BlogCategory].title.toLowerCase()}
          </Link>
          
          <div className="mb-4">
            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded uppercase tracking-wider">
              {categoryInfo[category as BlogCategory].title}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4 leading-tight">{post.title}</h1>
          <p className="text-gray-400 text-lg mb-6">{post.description}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 pb-8 border-b border-gray-800">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>{post.readingTime} min read</span>
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-800 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <div className="relative">
          <TableOfContents toc={toc} />
          
          <main className="max-w-none">
            <article className="prose prose-invert prose-gray max-w-none">
              <div className="blog-content">
                <MDXRemote source={content} components={mdxComponents} />
              </div>
            </article>
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
}