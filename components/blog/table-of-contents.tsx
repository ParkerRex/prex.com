'use client';

import { useEffect, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { TOCItem } from '@/lib/mdx';

interface TableOfContentsProps {
  toc: TOCItem[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -35% 0%',
        threshold: 0,
      }
    );

    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  if (toc.length === 0) return null;

  return (
    <div className="hidden xl:block fixed right-8 top-1/2 -translate-y-1/2 w-64">
      <div className="bg-gray-900/50 rounded-lg p-4 backdrop-blur-sm border border-gray-800">
        <h3 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
          Contents
        </h3>
        <ScrollArea className="h-96">
          <nav className="space-y-1">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`
                  block py-1 px-2 text-sm transition-colors duration-200 rounded
                  hover:bg-gray-800/50
                  ${activeId === item.id 
                    ? 'text-blue-400 bg-gray-800/30' 
                    : 'text-gray-400 hover:text-gray-300'
                  }
                `}
                style={{ 
                  paddingLeft: `${(item.level - 1) * 12 + 8}px`,
                  fontSize: item.level === 1 ? '14px' : '13px'
                }}
              >
                {item.title}
              </a>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
}