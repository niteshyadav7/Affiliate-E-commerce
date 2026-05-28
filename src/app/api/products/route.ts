import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

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

import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const role = cookieStore.get('admin_role')?.value;
    if (role === 'viewer') {
      return NextResponse.json({ error: 'Forbidden: Viewers cannot create products' }, { status: 403 });
    }

    const body = await request.json();
    const { name, description, price, image_url, category, is_active, slug } = body;

    const { data, error } = await supabaseServer
      .from('products')
      .insert([
        { name, description, price, image_url, category, is_active, slug }
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

    revalidatePath('/');
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
