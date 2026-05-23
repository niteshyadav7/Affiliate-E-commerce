import { supabaseServer } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import ProductDetailClient from "@/components/organisms/ProductDetailClient";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function getProductData(slug: string) {
  // 1. Resolve slug to product
  let productQuery = supabaseServer.from("products").select(`
      *,
      product_links (*),
      product_details (*)
    `);

  let product;

  if (uuidRegex.test(slug)) {
    // If it's a UUID, check both slug and ID
    const { data } = await productQuery
      .or(`slug.eq.${slug},id.eq.${slug}`)
      .maybeSingle();
    product = data;
  } else {
    // Otherwise, check slug
    const { data } = await productQuery.eq("slug", slug).maybeSingle();
    product = data;
  }

  if (!product || !product.is_active) {
    return null;
  }

  // 2. Fetch related products in same category
  const { data: related } = await supabaseServer
    .from("products")
    .select("*")
    .eq("category", product.category)
    .eq("is_active", true)
    .neq("id", product.id)
    .limit(4);

  return {
    product,
    relatedProducts: related || [],
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProductData(slug);

  if (!data) {
    return {
      title: "Product Not Found | DIVERSIFIED Y&P",
      description: "The requested product could not be found.",
    };
  }

  const details = data.product.product_details;
  const metaTitle =
    details?.meta_title || `${data.product.name} | DIVERSIFIED Y&P`;
  const metaDesc =
    details?.meta_description ||
    data.product.description ||
    `Buy ${data.product.name} at DIVERSIFIED Y&P. Smart shopping starts here.`;

  return {
    title: metaTitle,
    description: metaDesc,
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      images: [{ url: data.product.image_url }],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const data = await getProductData(slug);

  if (!data) {
    notFound();
  }

  // Sort links by sort_order
  if (data.product.product_links) {
    data.product.product_links.sort(
      (a: any, b: any) => a.sort_order - b.sort_order,
    );
  }

  return (
    <ProductDetailClient
      product={data.product}
      relatedProducts={data.relatedProducts}
    />
  );
}
