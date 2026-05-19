import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Parse device type from User-Agent
    const ua = request.headers.get('user-agent') || '';
    let device = 'Desktop';
    if (/tablet|ipad|playbook|silk/i.test(ua)) {
      device = 'Tablet';
    } else if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) {
      device = 'Mobile';
    }

    // Parse country code from Vercel header, fallback to header lookup
    const country = request.headers.get('x-vercel-ip-country') || 'Unknown';
    const referrer = request.headers.get('referer') || 'Direct';

    // Call the updated RPC function with metadata parameters
    const { data, error } = await supabaseServer
      .rpc('get_next_redirect', { 
        p_product_id: id,
        p_country_code: country,
        p_device_type: device,
        p_referrer: referrer
      });

    if (error) {
      console.error('RPC Error:', error);
      return NextResponse.json({ error: 'Failed to find redirect' }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'No links available' }, { status: 404 });
    }

    const { redirect_url } = data[0];
    
    return NextResponse.redirect(redirect_url);
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
