import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { blogCategories, categoryInfo, BlogCategory } from '@/lib/blog';
import { getPostsByCategory } from '@/lib/mdx';
import Footer from '@/components/footer';

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  return blogCategories.map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  
  if (!blogCategories.includes(category as BlogCategory)) {
    return {
      title: 'Category Not Found',
    };
  }

  const categoryData = categoryInfo[category as BlogCategory];
  
  return {
    title: `${categoryData.title} - Blog - Parker Rex`,
    description: categoryData.description,
    openGraph: {
      title: `${categoryData.title} - Blog - Parker Rex`,
      description: categoryData.description,
      type: 'website',
      url: `https://prex.com/blog/${category}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${categoryData.title} - Blog - Parker Rex`,
      description: categoryData.description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!blogCategories.includes(category as BlogCategory)) {
    notFound();
  }

  const posts = getPostsByCategory(category as BlogCategory);
  const categoryData = categoryInfo[category as BlogCategory];

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>
          <h1 className="text-3xl font-bold mb-2">{categoryData.title}</h1>
          <p className="text-gray-400">{categoryData.description}</p>
        </header>

        <main>
          {posts.length > 0 ? (
            <div className="space-y-6">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-gray-900 p-6 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Link href={`/blog/${category}/${post.slug}`} className="group">
                    <h2 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
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
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                <div className="text-2xl">📝</div>
              </div>
              <h2 className="text-xl font-bold mb-2 text-gray-300">No posts yet</h2>
              <p className="text-gray-400 text-sm max-w-md">
                No posts in the {categoryData.title.toLowerCase()} category yet. 
                Check back soon for new content!
              </p>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}