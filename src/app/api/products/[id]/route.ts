import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

import { cookies } from 'next/headers';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const role = cookieStore.get('admin_role')?.value;
    if (role === 'viewer') {
      return NextResponse.json({ error: 'Forbidden: Viewers cannot edit products' }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const { name, description, price, image_url, category, is_active, slug } = body;

    const { data, error } = await supabaseServer
      .from('products')
      .update({ name, description, price, image_url, category, is_active, slug })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    revalidatePath('/');
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
    const cookieStore = await cookies();
    const role = cookieStore.get('admin_role')?.value;
    if (role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden: Only Super Admins can delete products' }, { status: 403 });
    }

    const { id } = await params;
    
    // Supabase handles cascading deletes for product_links and product_counters if set up in DB
    const { error } = await supabaseServer
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    revalidatePath('/');
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
