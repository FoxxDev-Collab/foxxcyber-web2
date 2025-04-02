import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog | FoxxCyber - Cybersecurity Insights and Updates',
  description: 'Stay updated with the latest cybersecurity news, insights, and best practices from FoxxCyber experts.',
  openGraph: {
    title: 'Blog | FoxxCyber - Cybersecurity Insights and Updates',
    description: 'Stay updated with the latest cybersecurity news, insights, and best practices from FoxxCyber experts.',
    type: 'website',
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/blog/${post.slug}`} className="block">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <div className="flex items-center text-muted-foreground mb-4">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  {post.readingTime && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{post.readingTime} min read</span>
                    </>
                  )}
                </div>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
} 