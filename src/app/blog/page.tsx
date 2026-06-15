import Link from "next/link";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Masks from "@/components/Masks";
import { BLOG_POSTS } from "@/data/blogPosts";
import { Clock, BookOpen, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Guides & Editorial Reviews | DIVERSIFIED Y&P",
  description:
    "Read in-depth product reviews, shopping guides, and technology analysis curated by the DIVERSIFIED Y&P team. Discover smart shopping tips.",
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between">
      <div>
        <Masks />
        <Navbar />

        <main className="pt-[140px] pb-16 px-page-margin-mobile md:px-page-margin-desktop max-w-6xl mx-auto relative z-20">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold text-accent-coral uppercase tracking-widest flex items-center justify-center gap-1.5 mb-3">
              <BookOpen className="w-3.5 h-3.5" /> Editorial Feed
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary tracking-tight">
              Curation & Tech Insights
            </h1>
            <p className="font-body text-body-lg text-secondary mt-4 max-w-xl mx-auto leading-relaxed">
              In-depth product analysis, shopping guides, and technology reviews written by our curators to help you shop smarter.
            </p>
          </div>

          {/* Grid of posts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-3xl border border-surface-container overflow-hidden hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Post Image */}
                  <div className="aspect-video relative overflow-hidden bg-surface-container-low border-b border-surface-container">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-primary/90 text-white backdrop-blur-md px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider">
                      {post.category}
                    </div>
                  </div>

                  {/* Post Info */}
                  <div className="p-6 md:p-8 space-y-3">
                    <div className="flex items-center gap-4 text-[10px] text-secondary font-body">
                      <span>{post.publishedAt}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>

                    <h2 className="font-display text-headline-sm text-primary font-bold line-clamp-2 leading-snug group-hover:text-primary-container transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="font-body text-body-sm text-secondary line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="px-6 pb-6 pt-2 md:px-8 md:pb-8">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent-coral transition-colors font-body"
                  >
                    READ ARTICLE <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
