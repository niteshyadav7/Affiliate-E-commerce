import { cookies } from "next/headers";
import LoginForm from "@/components/admin/LoginForm";
import AdsClient from "@/components/admin/AdsClient";

export default async function AdminAdsPage() {
  const cookieStore = await cookies();
  const isAuthenticated = !!cookieStore.get("admin_token")?.value;
  const role = cookieStore.get("admin_role")?.value || "viewer";

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="font-display text-3xl font-bold text-primary">Ads Manager</h1>
        <p className="text-on-secondary-container mt-2">
          Configure advertising banners, scripts, and promotional campaigns across your storefront.
        </p>
      </div>

      <AdsClient role={role} />
    </div>
  );
}
