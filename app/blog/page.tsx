import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";
import { MountainDivider } from "@/components/mountain-divider";

export const metadata: Metadata = {
  title: "Journal",
  description: "Trekking tips, gear lists, and stories from the Himalayas.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="bg-paper min-h-screen flex flex-col">
      {/* Main Content Container */}
      <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 flex-grow">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-saffron">The Journal</p>
          <h1 className="mt-2 font-display text-5xl">Notes from the trail.</h1>
        </div>

        <div className="space-y-8">
          {posts.map((post: any) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <article className="rounded-2xl border border-charcoal/10 p-6 transition hover:border-saffron/50 hover:bg-white/50">
                <p className="text-sm text-charcoal/50">{post.date}</p>
                <h2 className="mt-2 font-display text-3xl group-hover:text-saffron-dark">
                  {post.title}
                </h2>
                <p className="mt-3 text-charcoal/70">{post.excerpt}</p>
                <p className="mt-4 text-sm font-medium text-saffron-dark">Read article →</p>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Divider into footer */}
      <div className="bg-paper w-full mt-24">
        <MountainDivider flip={true} />
      </div>
    </div>
  );
}