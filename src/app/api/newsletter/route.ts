import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

// POST: Add a new email to the newsletter
export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const { data, error } = await supabaseServer
      .from('newsletter_subscribers')
      .insert([{ email }])
      .select()
      .single();

    if (error) {
      // Handle unique constraint violation (code 23505) gracefully
      if (error.code === '23505') {
        return NextResponse.json({ success: true, message: 'Already subscribed!' });
      }
      throw error;
    }

    return NextResponse.json({ success: true, message: 'Subscribed successfully!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// GET: Fetch all subscribers (for Admin Panel)
export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from('newsletter_subscribers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Remove a subscriber (for Admin Panel)
import { cookies } from 'next/headers';

export async function DELETE(request: Request) {
  try {
    const cookieStore = await cookies();
    const role = cookieStore.get('admin_role')?.value;
    if (role !== 'super_admin') {
      return NextResponse.json({ error: 'Forbidden: Only Super Admins can remove subscribers' }, { status: 403 });
    }

    // Try reading ID from query parameters
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const { error } = await supabaseServer
        .from('newsletter_subscribers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return NextResponse.json({ success: true, message: 'Subscriber removed successfully!' });
    }

    // Fallback: Read email from body
    const body = await request.json().catch(() => ({}));
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'ID or Email is required' }, { status: 400 });
    }

    const { error } = await supabaseServer
      .from('newsletter_subscribers')
      .delete()
      .eq('email', email);

    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Subscriber removed successfully!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

