import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CampaignsClient from '@/components/admin/CampaignsClient';

export const metadata = {
  title: 'Campaigns | Shopverse Admin',
};

export default async function CampaignsPage() {
  const cookieStore = await cookies();
  const adminRole = cookieStore.get('admin_role')?.value;

  // Protect route: Only super_admin can access
  if (adminRole !== 'super_admin') {
    redirect('/admin');
  }

  return <CampaignsClient />;
}
