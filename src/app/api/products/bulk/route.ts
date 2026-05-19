import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

export async function POST(request: Request) {
  try {
    const { products } = await request.json();

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: 'Invalid products data' }, { status: 400 });
    }

    const insertedProducts = [];

    for (const p of products) {
      const { name, description, price, image_url, category, is_active, links } = p;

      if (!name || !price) {
        throw new Error('Name and Price are required for all products.');
      }

      // 1. Insert product
      const { data: productData, error: productError } = await supabaseServer
        .from('products')
        .insert([
          { 
            name, 
            description: description || '', 
            price, 
            image_url: image_url || '', 
            category: category || 'General', 
            is_active: is_active ?? true 
          }
        ])
        .select()
        .single();

      if (productError) throw productError;

      // 2. Initialize counter
      if (productData) {
        const { error: counterError } = await supabaseServer
          .from('product_counters')
          .insert([
            { product_id: productData.id, next_index: 0, total_clicks: 0 }
          ]);
        
        if (counterError) throw counterError;

        // 3. Insert links if any
        if (Array.isArray(links) && links.length > 0) {
          const linksToInsert = links.map((l: any, index: number) => ({
            product_id: productData.id,
            url: l.url,
            label: l.label || 'Link',
            sort_order: index
          }));

          const { error: linksError } = await supabaseServer
            .from('product_links')
            .insert(linksToInsert);

          if (linksError) throw linksError;
        }

        insertedProducts.push({
          ...productData,
          product_links: links || []
        });
      }
    }

    return NextResponse.json({ success: true, count: insertedProducts.length, products: insertedProducts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
