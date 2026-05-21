import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import { cookies } from 'next/headers';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { data, error } = await supabaseServer
      .from('product_details')
      .select('*')
      .eq('product_id', id)
      .maybeSingle();

    if (error) throw error;
    return NextResponse.json(data || null);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const role = cookieStore.get('admin_role')?.value;
    if (!role || role === 'viewer') {
      return NextResponse.json({ error: 'Forbidden: Unauthorized to create product details' }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const {
      long_description,
      highlights,
      specifications,
      gallery_images,
      rating,
      reviews_count,
      stock_status,
      shipping_info,
      meta_title,
      meta_description
    } = body;

    const { data, error } = await supabaseServer
      .from('product_details')
      .insert([
        {
          product_id: id,
          long_description,
          highlights,
          specifications,
          gallery_images,
          rating: rating ? parseFloat(rating) : 0,
          reviews_count: reviews_count ? parseInt(reviews_count) : 0,
          stock_status: stock_status || 'in_stock',
          shipping_info: shipping_info || '',
          meta_title: meta_title || '',
          meta_description: meta_description || ''
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const role = cookieStore.get('admin_role')?.value;
    if (!role || role === 'viewer') {
      return NextResponse.json({ error: 'Forbidden: Unauthorized to update product details' }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const {
      long_description,
      highlights,
      specifications,
      gallery_images,
      rating,
      reviews_count,
      stock_status,
      shipping_info,
      meta_title,
      meta_description
    } = body;

    // Check if details exist first, if not we upsert or create
    const { data: existing } = await supabaseServer
      .from('product_details')
      .select('id')
      .eq('product_id', id)
      .maybeSingle();

    let result;
    if (existing) {
      const { data, error } = await supabaseServer
        .from('product_details')
        .update({
          long_description,
          highlights,
          specifications,
          gallery_images,
          rating: rating !== undefined ? parseFloat(rating) : 0,
          reviews_count: reviews_count !== undefined ? parseInt(reviews_count) : 0,
          stock_status,
          shipping_info,
          meta_title,
          meta_description,
          updated_at: new Date().toISOString()
        })
        .eq('product_id', id)
        .select()
        .single();
      
      if (error) throw error;
      result = data;
    } else {
      const { data, error } = await supabaseServer
        .from('product_details')
        .insert([
          {
            product_id: id,
            long_description,
            highlights,
            specifications,
            gallery_images,
            rating: rating !== undefined ? parseFloat(rating) : 0,
            reviews_count: reviews_count !== undefined ? parseInt(reviews_count) : 0,
            stock_status: stock_status || 'in_stock',
            shipping_info: shipping_info || '',
            meta_title: meta_title || '',
            meta_description: meta_description || ''
          }
        ])
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
