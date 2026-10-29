import { getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const { meta, content } = getPostBySlug(slug);

    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <Link href="/blog" className="text-sm text-charcoal/50 hover:text-charcoal">
          ← Back to journal
        </Link>
        
        <h1 className="mt-8 font-display text-5xl">{meta.title}</h1>
        <p className="mt-4 text-charcoal/50">{meta.date}</p>
        
        <div className="prose prose-lg mt-10 max-w-none prose-headings:font-display prose-a:text-saffron-dark">
          <MDXRemote source={content} />
        </div>
      </div>
    );
  } catch (e) {
    notFound();
  }
}