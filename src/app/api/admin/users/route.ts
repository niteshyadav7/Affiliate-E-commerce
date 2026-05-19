import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase-server';

// Helper to assert caller has Super Admin privileges
async function verifySuperAdmin() {
  const cookieStore = await cookies();
  const role = cookieStore.get('admin_role')?.value;
  return role === 'super_admin';
}

export async function GET() {
  try {
    if (!(await verifySuperAdmin())) {
      return NextResponse.json({ error: 'Forbidden: Requires Super Admin role' }, { status: 403 });
    }

    const { data: users, error } = await supabaseServer
      .from('admin_users')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await verifySuperAdmin())) {
      return NextResponse.json({ error: 'Forbidden: Requires Super Admin role' }, { status: 403 });
    }

    const { username, role, password } = await request.json();

    if (!username || !role || !password) {
      return NextResponse.json({ error: 'All fields (username, role, password) are required' }, { status: 400 });
    }

    // Insert user
    const { data: newUser, error } = await supabaseServer
      .from('admin_users')
      .insert([{ username: username.trim(), role, password: password.trim(), is_blocked: false }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json(newUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await verifySuperAdmin())) {
      return NextResponse.json({ error: 'Forbidden: Requires Super Admin role' }, { status: 403 });
    }

    const { userId, role, password, isBlocked } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Load original user to make sure we don't block the default 'admin' Super Admin or self
    const { data: originalUser } = await supabaseServer
      .from('admin_users')
      .select('username')
      .eq('id', userId)
      .maybeSingle();

    if (originalUser) {
      const cookieStore = await cookies();
      const currentToken = cookieStore.get('admin_token')?.value;
      if (originalUser.username === currentToken && isBlocked === true) {
        return NextResponse.json({ error: 'You cannot block your own active session' }, { status: 400 });
      }
    }

    // Prepare update parameters
    const updateData: any = {};
    if (role !== undefined) updateData.role = role;
    if (password !== undefined) updateData.password = password.trim();
    if (isBlocked !== undefined) updateData.is_blocked = isBlocked;

    const { data: updatedUser, error } = await supabaseServer
      .from('admin_users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await verifySuperAdmin())) {
      return NextResponse.json({ error: 'Forbidden: Requires Super Admin role' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Verify they aren't deleting themselves
    const { data: targetUser } = await supabaseServer
      .from('admin_users')
      .select('username')
      .eq('id', userId)
      .maybeSingle();

    if (targetUser) {
      const cookieStore = await cookies();
      const currentToken = cookieStore.get('admin_token')?.value;
      if (targetUser.username === currentToken) {
        return NextResponse.json({ error: 'You cannot delete your own logged-in account' }, { status: 400 });
      }
    }

    const { error } = await supabaseServer
      .from('admin_users')
      .delete()
      .eq('id', userId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
