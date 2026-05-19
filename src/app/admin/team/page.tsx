import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import TeamClient from '@/components/admin/TeamClient';

export default async function TeamPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get('admin_role')?.value;
  const username = cookieStore.get('admin_token')?.value || '';

  if (role !== 'super_admin') {
    redirect('/admin');
  }

  return <TeamClient currentUser={username} />;
}
