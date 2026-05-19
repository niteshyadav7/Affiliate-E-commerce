import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { url, label, sort_order } = body;

    const { data, error } = await supabaseServer
      .from('product_links')
      .insert([
        { product_id: id, url, label, sort_order }
      ])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // ID here might actually be the link ID. We need to pass link ID in query or body.
    // Let's use the URL for the DELETE method on the link endpoint: /api/products/[id]/links?linkId=...
    const url = new URL(request.url);
    const linkId = url.searchParams.get('linkId');

    if (!linkId) {
      return NextResponse.json({ error: 'Link ID is required' }, { status: 400 });
    }

    const { error } = await supabaseServer
      .from('product_links')
      .delete()
      .eq('id', linkId);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { linkId, url, label, sort_order } = body;

    if (!linkId) {
      return NextResponse.json({ error: 'Link ID is required' }, { status: 400 });
    }

    const { data, error } = await supabaseServer
      .from('product_links')
      .update({ url, label, sort_order })
      .eq('id', linkId)
      .eq('product_id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
