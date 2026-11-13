import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal",
  description: "Trekking tips, gear lists, and stories from the Himalayas.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="bg-charcoal min-h-screen flex flex-col">
      {/* Main Content Container */}
      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 flex-grow">
        
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-saffron font-bold mb-2">The Journal</p>
          <h1 className="mt-2 font-display text-5xl sm:text-6xl text-paper">Notes from the trail.</h1>
        </div>

        <div className="space-y-6">
          {posts.map((post: any) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="rounded-2xl border border-stone/30 bg-charcoal-soft p-6 sm:p-8 transition-all hover:border-saffron/50 hover:bg-stone/10 shadow-lg">
                <p className="text-sm text-paper-dim">{post.date}</p>
                <h2 className="mt-2 font-display text-3xl text-paper group-hover:text-saffron transition-colors">
                  {post.title}
                </h2>
                <p className="mt-3 text-paper-dim leading-relaxed">{post.excerpt}</p>
                <p className="mt-5 text-sm font-bold text-saffron tracking-wide group-hover:translate-x-1 transition-transform">
                  Read article →
                </p>
              </article>
            </Link>
          ))}
          
          {posts.length === 0 && (
            <p className="text-paper-dim text-lg">No journal entries yet. Check back soon!</p>
          )}
        </div>
      </div>
    </div>
  );
}