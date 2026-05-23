import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";
import { cookies } from "next/headers";

// GET all ad configurations
export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("ad_configs")
      .select("*")
      .order("label", { ascending: true });

    if (error) {
      // If table doesn't exist yet, we will return a descriptive error so the admin knows they need to run the migration
      if (error.code === 'P0001' || error.message.includes('does not exist')) {
        return NextResponse.json(
          { error: "Table 'ad_configs' does not exist. Please run ads_migration.sql in your Supabase SQL editor." },
          { status: 404 }
        );
      }
      throw error;
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT / POST to update a specific ad configuration
export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const role = cookieStore.get("admin_role")?.value;
    const isAuthenticated = !!cookieStore.get("admin_token")?.value;

    if (!isAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (role === "viewer") {
      return NextResponse.json(
        { error: "Forbidden: Viewers cannot modify ad settings" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { id, is_enabled, ad_type, script_code, image_url, link_url } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing config ID" }, { status: 400 });
    }

    const { data, error } = await supabaseServer
      .from("ad_configs")
      .update({
        is_enabled,
        ad_type,
        script_code,
        image_url,
        link_url,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
