import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // 1. Resolve slug to product ID
    let productId = "";

    // Query products by slug
    const { data: productBySlug } = await supabaseServer
      .from("products")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (productBySlug) {
      productId = productBySlug.id;
    } else {
      // Fallback: Check if the slug parameter is a valid UUID
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (uuidRegex.test(slug)) {
        const { data: productById } = await supabaseServer
          .from("products")
          .select("id")
          .eq("id", slug)
          .maybeSingle();

        if (productById) {
          productId = productById.id;
        }
      }
    }

    // If product is not found, redirect to our custom 404 page
    if (!productId) {
      return NextResponse.redirect(new URL("/not-found", request.url));
    }

    // 2. Parse device type from User-Agent
    const ua = request.headers.get("user-agent") || "";
    let device = "Desktop";
    if (/tablet|ipad|playbook|silk/i.test(ua)) {
      device = "Tablet";
    } else if (
      /mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)
    ) {
      device = "Mobile";
    }

    // 3. Parse country code and referrer
    const country = request.headers.get("x-vercel-ip-country") || "Unknown";
    const referrer = request.headers.get("referer") || "Direct";

    // 4. Call redirect RPC with analytics metrics
    const { data, error } = await supabaseServer.rpc("get_next_redirect", {
      p_product_id: productId,
      p_country_code: country,
      p_device_type: device,
      p_referrer: referrer,
    });

    if (error) {
      console.error("RPC Error in short slug redirect:", error);
      return NextResponse.json(
        { error: "Failed to find redirect link" },
        { status: 500 },
      );
    }

    if (!data || data.length === 0) {
      // If product has no links, redirect back to Diversified Y&P home
      return NextResponse.redirect(new URL("/", request.url));
    }

    const { redirect_url } = data[0];

    return NextResponse.redirect(redirect_url);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
