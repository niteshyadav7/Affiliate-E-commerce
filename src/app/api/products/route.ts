import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

export async function GET() {
  const { data, error } = await supabaseServer
    .from('products')
    .select(`
      *,
      product_links (*),
      product_counters (*)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, image_url, category, is_active } = body;

    const { data, error } = await supabaseServer
      .from('products')
      .insert([
        { name, description, price, image_url, category, is_active }
      ])
      .select()
      .single();

    if (error) throw error;

    // Initialize counter
    if (data) {
      await supabaseServer.from('product_counters').insert([
        { product_id: data.id, next_index: 0, total_clicks: 0 }
      ]);
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
