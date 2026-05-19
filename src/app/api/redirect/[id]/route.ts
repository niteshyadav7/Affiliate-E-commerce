import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Call the RPC function
    const { data, error } = await supabaseServer
      .rpc('get_next_redirect', { p_product_id: id });

    if (error) {
      console.error('RPC Error:', error);
      return NextResponse.json({ error: 'Failed to find redirect' }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'No links available' }, { status: 404 });
    }

    const { redirect_url } = data[0];
    
    // Instead of json, we can actually do a 302 redirect directly. 
    // This is great because we can just link to /api/redirect/[id] from the client.
    return NextResponse.redirect(redirect_url);
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
