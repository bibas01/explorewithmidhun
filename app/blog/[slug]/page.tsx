import { getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  try {
    const { meta, content } = getPostBySlug(slug);

    return (
      <div className="bg-charcoal min-h-screen flex flex-col">
        {/* Main Content Container */}
        <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 flex-grow">
          
          <Link href="/blog" className="text-sm font-medium text-paper-dim hover:text-saffron transition-colors">
            ← Back to journal
          </Link>
          
          <h1 className="mt-8 font-display text-5xl sm:text-6xl text-paper leading-tight">{meta.title}</h1>
          <p className="mt-4 text-paper-dim">{meta.date}</p>
          
          {/* ⬇️ prose-invert makes the MDX content dark-mode friendly */}
          <div className="prose prose-lg prose-invert mt-12 max-w-none 
                          prose-headings:font-display prose-headings:text-paper 
                          prose-p:text-paper-dim prose-p:leading-relaxed
                          prose-a:text-saffron hover:prose-a:text-paper
                          prose-strong:text-paper prose-li:text-paper-dim">
            <MDXRemote source={content} />
          </div>
          
        </div>
      </div>
    );
  } catch (e) {
    notFound();
  }
}