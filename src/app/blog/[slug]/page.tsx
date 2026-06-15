import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Masks from "@/components/Masks";
import AdBanner from "@/components/molecules/AdBanner";
import { BLOG_POSTS } from "@/data/blogPosts";
import { Clock, ArrowLeft, ChevronRight, Share2, BookOpen } from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | DIVERSIFIED Y&P",
    };
  }

  return {
    title: `${post.title} | DIVERSIFIED Y&P`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.imageUrl }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Get other posts for related read suggestions
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between">
      <div>
        <Masks />
        <Navbar />

        <main className="pt-[140px] pb-16 px-page-margin-mobile md:px-page-margin-desktop max-w-4xl mx-auto relative z-20">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-body-sm text-on-secondary-container">
            <div className="flex items-center gap-2">
              <Link
                href="/blog"
                className="hover:text-primary flex items-center gap-1 font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Feed
              </Link>
            </div>
            <div className="flex items-center gap-2 font-body max-w-full overflow-hidden">
              <Link href="/" className="hover:text-primary transition-colors shrink-0">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
              <Link href="/blog" className="hover:text-primary transition-colors shrink-0">
                Blog
              </Link>
              <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
              <span className="text-primary font-bold break-words line-clamp-1">
                {post.title}
              </span>
            </div>
          </div>

          {/* Article Container */}
          <article className="bg-white rounded-3xl border border-surface-container overflow-hidden shadow-sm mb-12 relative grain-texture">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent-lime via-primary to-accent-coral" />

            {/* Banner Image */}
            <div className="aspect-video relative overflow-hidden bg-surface-container-low border-b border-surface-container">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-primary/95 text-white backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                {post.category}
              </div>
            </div>

            <div className="p-8 md:p-12">
              {/* Metadata */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-surface-container">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover border border-surface-container"
                  />
                  <div>
                    <p className="font-display font-bold text-primary text-body-sm leading-none">
                      {post.author.name}
                    </p>
                    <p className="font-body text-[10px] text-secondary mt-1">
                      {post.author.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-secondary font-body">
                  <span>{post.publishedAt}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl md:text-5xl font-bold text-primary mb-6 tracking-tight leading-tight">
                {post.title}
              </h1>

              {/* Substantial Content body */}
              <div className="prose prose-slate max-w-none text-secondary leading-relaxed font-body text-body-lg space-y-6">
                {post.content.split("\n\n").map((paragraph, index) => {
                  // Basic markdown compiler for links and headings
                  if (paragraph.startsWith("### ")) {
                    return (
                      <h3
                        key={index}
                        className="font-display text-headline-md text-primary font-bold pt-4"
                      >
                        {paragraph.replace("### ", "")}
                      </h3>
                    );
                  }

                  if (paragraph.startsWith("*   ")) {
                    return (
                      <ul key={index} className="list-disc pl-6 space-y-2">
                        {paragraph.split("\n").map((li, idx) => {
                          const cleanedLi = li.replace("*   ", "").replace("- ", "");
                          return <li key={idx}>{parseMarkdownLinks(cleanedLi)}</li>;
                        })}
                      </ul>
                    );
                  }

                  if (paragraph.startsWith("1.  ") || paragraph.startsWith("2.  ") || paragraph.startsWith("3.  ")) {
                    return (
                      <ol key={index} className="list-decimal pl-6 space-y-2">
                        {paragraph.split("\n").map((li, idx) => {
                          const cleanedLi = li.substring(4);
                          return <li key={idx}>{parseMarkdownLinks(cleanedLi)}</li>;
                        })}
                      </ol>
                    );
                  }

                  return <p key={index}>{parseMarkdownLinks(paragraph)}</p>;
                })}
              </div>
            </div>
          </article>

          <AdBanner slotId="product_detail_bottom" />

          {/* Related Reads */}
          <div className="space-y-6 mt-12">
            <h3 className="font-display text-headline-md text-primary">
              Continue{" "}
              <span className="relative">
                Reading
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-accent-lime -z-10"></span>
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((rPost) => (
                <div
                  key={rPost.slug}
                  className="bg-white border border-surface-container rounded-2xl p-6 hover:shadow-md transition-shadow flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-secondary mb-3 font-body">
                      <span>{rPost.publishedAt}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {rPost.readTime}
                      </span>
                    </div>
                    <h4 className="font-display font-bold text-primary text-body-lg mb-2 line-clamp-2 leading-snug group-hover:text-accent-coral transition-colors">
                      <Link href={`/blog/${rPost.slug}`}>{rPost.title}</Link>
                    </h4>
                    <p className="font-body text-body-sm text-secondary line-clamp-2 leading-relaxed">
                      {rPost.excerpt}
                    </p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-surface-container">
                    <Link
                      href={`/blog/${rPost.slug}`}
                      className="text-xs font-bold text-primary font-body flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      READ POST →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

// Simple helper to parse markdown link [Text](url) to React Nodes
function parseMarkdownLinks(text: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text preceding the match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    
    // Add link node
    parts.push(
      <Link
        key={match.index}
        href={match[2]}
        className="text-primary hover:text-accent-coral font-bold underline transition-colors"
      >
        {match[1]}
      </Link>
    );

    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? <>{parts}</> : text;
}
