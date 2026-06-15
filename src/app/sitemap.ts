import { MetadataRoute } from "next";
import { supabaseServer } from "@/lib/supabase-server";
import { BLOG_POSTS } from "@/data/blogPosts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://yandp.in";

  // Define static pages
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms-of-service",
    "/blog",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Map dynamic blog posts
  const blogPages = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Fetch all active products from Supabase to generate dynamic product paths
  let productPages: any[] = [];
  try {
    const { data: products } = await supabaseServer
      .from("products")
      .select("id, slug, created_at")
      .eq("is_active", true);

    if (products && products.length > 0) {
      productPages = products.map((product) => ({
        url: `${baseUrl}/product/${product.slug || product.id}`,
        lastModified: product.created_at ? new Date(product.created_at) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch (err) {
    console.warn("Could not generate product URLs for sitemap:", err);
  }

  return [...staticPages, ...blogPages, ...productPages];
}
