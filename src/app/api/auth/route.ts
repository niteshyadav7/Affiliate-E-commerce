import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

export async function POST(request: Request) {
  try {
    const { role, password } = await request.json();
    const targetRole = role || 'super_admin';

    // 1. Attempt database lookup
    const { data: user, error: dbErr } = await supabaseServer
      .from('admin_users')
      .select('id, username, role, is_blocked')
      .eq('role', targetRole)
      .eq('password', password)
      .eq('is_blocked', false)
      .maybeSingle();

    let authenticatedUser = null;

    if (user) {
      authenticatedUser = { username: user.username, role: user.role };
    } else {
      // 2. Fallback: Env variable password
      const envPassword = process.env.ADMIN_PASSWORD;
      if (targetRole === 'super_admin' && envPassword && password === envPassword) {
        authenticatedUser = { username: 'admin', role: 'super_admin' };
      }
    }

    if (authenticatedUser) {
      const cookieStore = await cookies();
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      };

      cookieStore.set('admin_token', authenticatedUser.username, cookieOptions);
      cookieStore.set('admin_role', authenticatedUser.role, cookieOptions);

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid credentials or blocked account' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_token');
  cookieStore.delete('admin_role');
  return NextResponse.json({ success: true });
}
