import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';
import { cookies } from 'next/headers';
import { isValidAmazonUrl, generate5OrganicUrls } from '@/lib/organicUrlHelper';

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const role = cookieStore.get('admin_role')?.value;
    if (role === 'viewer') {
      return NextResponse.json({ error: 'Forbidden: Viewers cannot upload products' }, { status: 403 });
    }

    const { products, mode = 'create' } = await request.json();

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: 'Invalid products data' }, { status: 400 });
    }

    const processedProducts = [];

    for (const p of products) {
      const { id, slug, is_active, name, description, price, image_url, category, links } = p;

      if (!name || !price) {
        throw new Error('Name and Price are required for all products.');
      }

      let productId = id;
      let productData = null;

      if (mode === 'edit') {
        // Find existing product to update
        if (!productId) {
          if (slug) {
            const { data: match } = await supabaseServer
              .from('products')
              .select('id')
              .eq('slug', slug)
              .maybeSingle();
            if (match) productId = match.id;
          }
          if (!productId && name) {
            const { data: match } = await supabaseServer
              .from('products')
              .select('id')
              .eq('name', name)
              .maybeSingle();
            if (match) productId = match.id;
          }
        }

        if (!productId) {
          throw new Error(`Product match not found for row with Name: "${name || 'Unnamed'}"`);
        }

        // 1. Update core product
        const { data: updatedProd, error: productError } = await supabaseServer
          .from('products')
          .update({
            name,
            description: description || '',
            price,
            image_url: image_url || '',
            category: category || 'General',
            is_active: is_active ?? true,
            slug: slug ? slugify(slug) : slugify(name)
          })
          .eq('id', productId)
          .select()
          .single();

        if (productError) throw productError;
        productData = updatedProd;

        // 2. Update links if provided
        if (Array.isArray(links)) {
          // Delete old links
          const { error: deleteLinksError } = await supabaseServer
            .from('product_links')
            .delete()
            .eq('product_id', productId);

          if (deleteLinksError) throw deleteLinksError;

          // Insert new links
          if (links.length > 0) {
            const linksToInsert: any[] = [];
            for (const l of links) {
              if (isValidAmazonUrl(l.url) && !l.url.includes('crid=') && !l.url.includes('dib=')) {
                const organicLinks = generate5OrganicUrls(l.url, name);
                organicLinks.forEach((ol) => {
                  linksToInsert.push({
                    product_id: productId,
                    url: ol.url,
                    label: ol.label,
                    sort_order: linksToInsert.length
                  });
                });
              } else {
                linksToInsert.push({
                  product_id: productId,
                  url: l.url,
                  label: l.label || 'Link',
                  sort_order: linksToInsert.length
                });
              }
            }

            const { error: linksError } = await supabaseServer
              .from('product_links')
              .insert(linksToInsert);

            if (linksError) throw linksError;
          }
        }

        // 3. Upsert product details if provided
        const { details } = p;
        if (details && Object.keys(details).length > 0) {
          const { error: detailsError } = await supabaseServer
            .from('product_details')
            .upsert({
              product_id: productId,
              long_description: details.long_description || '',
              highlights: details.highlights || [],
              specifications: details.specifications || {},
              gallery_images: details.gallery_images || [],
              rating: details.rating ? parseFloat(details.rating) : 0,
              reviews_count: details.reviews_count ? parseInt(details.reviews_count, 10) : 0,
              stock_status: details.stock_status || 'in_stock',
              shipping_info: details.shipping_info || 'Free shipping on orders over $50',
              meta_title: details.meta_title || '',
              meta_description: details.meta_description || ''
            }, { onConflict: 'product_id' });

          if (detailsError) throw detailsError;
        }

        processedProducts.push({
          ...productData,
          product_links: links || [],
          product_details: details || {}
        });

      } else {
        // Create mode
        // 1. Insert product
        const { data: insertedProd, error: productError } = await supabaseServer
          .from('products')
          .insert([
            { 
              name, 
              description: description || '', 
              price, 
              image_url: image_url || '', 
              category: category || 'General', 
              is_active: is_active ?? true,
              slug: slugify(name)
            }
          ])
          .select()
          .single();

        if (productError) throw productError;
        productData = insertedProd;

        if (productData) {
          // 2. Initialize counter
          const { error: counterError } = await supabaseServer
            .from('product_counters')
            .insert([
              { product_id: productData.id, next_index: 0, total_clicks: 0 }
            ]);
          
          if (counterError) throw counterError;

          // 3. Insert links if any
          if (Array.isArray(links) && links.length > 0) {
            const linksToInsert: any[] = [];
            for (const l of links) {
              if (isValidAmazonUrl(l.url) && !l.url.includes('crid=') && !l.url.includes('dib=')) {
                const organicLinks = generate5OrganicUrls(l.url, name);
                organicLinks.forEach((ol) => {
                  linksToInsert.push({
                    product_id: productData.id,
                    url: ol.url,
                    label: ol.label,
                    sort_order: linksToInsert.length
                  });
                });
              } else {
                linksToInsert.push({
                  product_id: productData.id,
                  url: l.url,
                  label: l.label || 'Link',
                  sort_order: linksToInsert.length
                });
              }
            }

            const { error: linksError } = await supabaseServer
              .from('product_links')
              .insert(linksToInsert);

            if (linksError) throw linksError;
          }

          // 4. Insert product details if provided
          const { details } = p;
          if (details && Object.keys(details).length > 0) {
            const { error: detailsError } = await supabaseServer
              .from('product_details')
              .insert([
                {
                  product_id: productData.id,
                  long_description: details.long_description || '',
                  highlights: details.highlights || [],
                  specifications: details.specifications || {},
                  gallery_images: details.gallery_images || [],
                  rating: details.rating ? parseFloat(details.rating) : 0,
                  reviews_count: details.reviews_count ? parseInt(details.reviews_count, 10) : 0,
                  stock_status: details.stock_status || 'in_stock',
                  shipping_info: details.shipping_info || 'Free shipping on orders over $50',
                  meta_title: details.meta_title || '',
                  meta_description: details.meta_description || ''
                }
              ]);
              
            if (detailsError) throw detailsError;
          }

          processedProducts.push({
            ...productData,
            product_links: links || [],
            product_details: details || {}
          });
        }
      }
    }

    return NextResponse.json({ success: true, count: processedProducts.length, products: processedProducts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
