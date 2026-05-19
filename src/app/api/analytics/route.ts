import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

export async function GET() {
  try {
    // 1. Fetch total products count
    const { count: productCount, error: prodErr } = await supabaseServer
      .from('products')
      .select('id', { count: 'exact', head: true });

    if (prodErr) throw prodErr;

    // 2. Fetch total subscribers count
    const { count: subscriberCount, error: subErr } = await supabaseServer
      .from('newsletter_subscribers')
      .select('id', { count: 'exact', head: true });

    if (subErr) throw subErr;

    // 3. Fetch total click count sum from product counters
    const { data: counters, error: countErr } = await supabaseServer
      .from('product_counters')
      .select('total_clicks');

    if (countErr) throw countErr;
    
    const totalClicks = (counters || []).reduce((acc, c) => acc + (c.total_clicks || 0), 0);

    // 4. Fetch the last 500 click events to compute client statistics
    const { data: clickEvents, error: eventErr } = await supabaseServer
      .from('click_events')
      .select('device_type, country_code, created_at, products (name)')
      .order('created_at', { ascending: false })
      .limit(500);

    if (eventErr) throw eventErr;

    // Calculate Device breakdown
    const devices = { Mobile: 0, Tablet: 0, Desktop: 0 };
    // Calculate Country breakdown
    const countries: Record<string, number> = {};

    (clickEvents || []).forEach((event) => {
      // Aggregate devices
      const dev = (event.device_type || 'Desktop') as 'Mobile' | 'Tablet' | 'Desktop';
      if (devices[dev] !== undefined) {
        devices[dev]++;
      } else {
        devices['Desktop']++;
      }

      // Aggregate countries
      const country = event.country_code || 'Unknown';
      countries[country] = (countries[country] || 0) + 1;
    });

    // Compute top countries list
    const topCountries = Object.entries(countries)
      .map(([code, count]) => ({ code, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Recent activity logs (last 10 events)
    const recentActivity = (clickEvents || []).slice(0, 10).map((e: any) => ({
      productName: e.products ? e.products.name : 'Unknown Product',
      deviceType: e.device_type || 'Desktop',
      countryCode: e.country_code || 'Unknown',
      createdAt: e.created_at,
    }));

    return NextResponse.json({
      productCount: productCount || 0,
      subscriberCount: subscriberCount || 0,
      totalClicks,
      devices,
      topCountries,
      recentActivity,
    });
    
  } catch (error: any) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
