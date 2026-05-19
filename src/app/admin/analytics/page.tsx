"use client";

import { useState, useEffect } from 'react';
import { 
  Mail, 
  MousePointerClick, 
  Package, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Globe, 
  History, 
  Trash2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Button from '@/components/atoms/Button';

export default function AnalyticsPage() {
  // Subscribers state
  const [subscribers, setSubscribers] = useState<any[]>([]);
  // Analytics state
  const [metrics, setMetrics] = useState<any>({
    productCount: 0,
    subscriberCount: 0,
    totalClicks: 0,
    devices: { Mobile: 0, Tablet: 0, Desktop: 0 },
    topCountries: [],
    recentActivity: []
  });
  
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch subscribers list
      const subRes = await fetch('/api/newsletter');
      const subData = await subRes.json();
      setSubscribers(subData);

      // Fetch analytics metrics
      const metricsRes = await fetch('/api/analytics');
      const metricsData = await metricsRes.json();
      setMetrics(metricsData);
    } catch (error) {
      console.error('Failed to load analytics data', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSubscriber = async (id: string) => {
    if (!confirm('Are you sure you want to remove this subscriber?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/newsletter?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setSubscribers(subscribers.filter(sub => sub.id !== id));
        // Refresh metrics to keep counts updated
        const metricsRes = await fetch('/api/analytics');
        const metricsData = await metricsRes.json();
        setMetrics(metricsData);
      }
    } catch (error) {
      console.error('Failed to delete subscriber', error);
    } finally {
      setDeletingId(null);
    }
  };

  // Helper: Map country code to Name and Flag
  const getCountryDetail = (code: string) => {
    const countries: Record<string, { name: string; flag: string }> = {
      US: { name: 'United States', flag: '🇺🇸' },
      IN: { name: 'India', flag: '🇮🇳' },
      GB: { name: 'United Kingdom', flag: '🇬🇧' },
      CA: { name: 'Canada', flag: '🇨🇦' },
      AU: { name: 'Australia', flag: '🇦🇺' },
      DE: { name: 'Germany', flag: '🇩🇪' },
      FR: { name: 'France', flag: '🇫🇷' },
      JP: { name: 'Japan', flag: '🇯🇵' },
      BR: { name: 'Brazil', flag: '🇧🇷' },
    };
    return countries[code.toUpperCase()] || { name: code, flag: '🌐' };
  };

  // Helper: Get device icon component
  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType.toLowerCase()) {
      case 'mobile':
        return <Smartphone className="w-4 h-4 text-indigo-500" />;
      case 'tablet':
        return <Tablet className="w-4 h-4 text-purple-500" />;
      default:
        return <Laptop className="w-4 h-4 text-slate-500" />;
    }
  };

  // Compute percentages for devices
  const totalDeviceClicks = (metrics.devices.Mobile || 0) + (metrics.devices.Tablet || 0) + (metrics.devices.Desktop || 0) || 1;
  const devicePercentages = {
    Mobile: Math.round(((metrics.devices.Mobile || 0) / totalDeviceClicks) * 100),
    Tablet: Math.round(((metrics.devices.Tablet || 0) / totalDeviceClicks) * 100),
    Desktop: Math.round(((metrics.devices.Desktop || 0) / totalDeviceClicks) * 100),
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="font-display text-3xl font-bold text-primary">Analytics & Audience</h1>
        <p className="text-on-secondary-container mt-2">View redirect click streams, device tracking, and subscriber logs.</p>
      </div>

      {loading ? (
        <div className="p-16 text-center text-on-secondary-container">
          <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-primary rounded-full mb-4"></div>
          <p className="text-sm">Collecting performance insights...</p>
        </div>
      ) : (
        <>
          {/* 1. Stats Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-surface-container-low flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs font-bold text-primary/60 uppercase tracking-wider">Total Redirect Clicks</p>
                <h3 className="text-3xl font-display font-extrabold text-primary mt-1">{metrics.totalClicks}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <MousePointerClick className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-surface-container-low flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs font-bold text-primary/60 uppercase tracking-wider">Active Products</p>
                <h3 className="text-3xl font-display font-extrabold text-primary mt-1">{metrics.productCount}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Package className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-surface-container-low flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs font-bold text-primary/60 uppercase tracking-wider">Email Subscribers</p>
                <h3 className="text-3xl font-display font-extrabold text-primary mt-1">{metrics.subscriberCount}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                <Mail className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* 2. Middle Columns (Devices / Countries / Live Stream) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left side: Device & Locations */}
            <div className="lg:col-span-5 space-y-8">
              {/* Device breakdown */}
              <div className="bg-white p-6 rounded-2xl border border-surface-container-low shadow-sm">
                <h2 className="font-display text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-indigo-500" /> Device Distribution
                </h2>
                
                <div className="space-y-4">
                  {/* Desktop */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-primary mb-1">
                      <span className="flex items-center gap-1.5"><Laptop className="w-3.5 h-3.5 text-slate-500" /> Desktop</span>
                      <span>{devicePercentages.Desktop}% ({metrics.devices.Desktop || 0})</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-slate-500 h-full rounded-full transition-all duration-500" style={{ width: `${devicePercentages.Desktop}%` }}></div>
                    </div>
                  </div>

                  {/* Mobile */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-primary mb-1">
                      <span className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-indigo-500" /> Mobile</span>
                      <span>{devicePercentages.Mobile}% ({metrics.devices.Mobile || 0})</span>
                    </div>
                    <div className="w-full bg-indigo-50 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: `${devicePercentages.Mobile}%` }}></div>
                    </div>
                  </div>

                  {/* Tablet */}
                  <div>
                    <div className="flex justify-between text-xs font-bold text-primary mb-1">
                      <span className="flex items-center gap-1.5"><Tablet className="w-3.5 h-3.5 text-purple-500" /> Tablet</span>
                      <span>{devicePercentages.Tablet}% ({metrics.devices.Tablet || 0})</span>
                    </div>
                    <div className="w-full bg-purple-50 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: `${devicePercentages.Tablet}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Geographic Locations */}
              <div className="bg-white p-6 rounded-2xl border border-surface-container-low shadow-sm">
                <h2 className="font-display text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-indigo-500" /> Top Target Locations
                </h2>
                
                {metrics.topCountries.length === 0 ? (
                  <p className="text-xs text-on-secondary-container text-center py-6">No locations recorded yet.</p>
                ) : (
                  <div className="divide-y divide-surface-container-low">
                    {metrics.topCountries.map((c: any) => {
                      const geo = getCountryDetail(c.code);
                      return (
                        <div key={c.code} className="flex justify-between items-center py-2.5 first:pt-0 last:pb-0">
                          <span className="flex items-center gap-2 text-sm text-primary font-medium">
                            <span className="text-lg">{geo.flag}</span>
                            {geo.name}
                          </span>
                          <span className="text-xs font-bold bg-primary/5 text-primary px-2.5 py-1 rounded-full">
                            {c.count} clicks
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right side: Live Redirect Feed */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 rounded-2xl border border-surface-container-low shadow-sm h-full flex flex-col">
                <h2 className="font-display text-lg font-bold text-primary mb-4 flex items-center gap-2 flex-shrink-0">
                  <History className="w-5 h-5 text-indigo-500" /> Real-time Activity Feed
                </h2>

                <div className="flex-1 overflow-y-auto max-h-[360px] pr-1 space-y-4">
                  {metrics.recentActivity.length === 0 ? (
                    <div className="text-center py-16 text-on-secondary-container">
                      <History className="w-8 h-8 mx-auto opacity-30 mb-2" />
                      <p className="text-xs">Waiting for redirect logs...</p>
                    </div>
                  ) : (
                    metrics.recentActivity.map((act: any, idx: number) => {
                      const geo = getCountryDetail(act.countryCode);
                      return (
                        <div key={idx} className="flex gap-4 items-start p-3 bg-surface/30 border border-outline/5 hover:bg-surface/50 rounded-xl transition-all duration-200">
                          <div className="p-2.5 bg-white border border-outline/10 rounded-lg flex-shrink-0">
                            {getDeviceIcon(act.deviceType)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-primary truncate">
                              Clicked: {act.productName}
                            </p>
                            <p className="text-[10px] text-on-secondary-container opacity-80 mt-0.5 flex items-center gap-1">
                              <span>{geo.flag}</span> {geo.name} • Via {act.deviceType}
                            </p>
                          </div>
                          <span className="text-[9px] text-on-secondary-container opacity-60 whitespace-nowrap">
                            {new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Subscribers Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-surface-container-low overflow-hidden">
            <div className="p-6 border-b border-surface-container-low flex justify-between items-center">
              <h2 className="font-display text-xl font-bold text-primary flex items-center gap-2">
                <Mail className="w-5 h-5 text-indigo-500" /> Subscribers Management
              </h2>
              <div className="text-xs font-bold text-primary bg-primary/5 px-3 py-1 rounded-full">
                {subscribers.length} Total
              </div>
            </div>

            {subscribers.length === 0 ? (
              <div className="p-12 text-center text-on-secondary-container">
                <Mail className="w-8 h-8 mx-auto opacity-30 mb-2" />
                <p className="text-xs">No email subscribers found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-on-secondary-container">
                  <thead className="bg-surface/50 text-xs uppercase bg-gray-50 border-b border-surface-container-low">
                    <tr>
                      <th className="px-6 py-4 font-bold text-primary">Email Address</th>
                      <th className="px-6 py-4 font-bold text-primary">Date Subscribed</th>
                      <th className="px-6 py-4 font-bold text-primary text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((sub) => (
                      <tr key={sub.id} className="border-b border-surface-container-low hover:bg-surface/30">
                        <td className="px-6 py-4 font-medium text-primary">
                          {sub.email}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(sub.created_at).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            disabled={deletingId === sub.id}
                            onClick={() => deleteSubscriber(sub.id)}
                            className="p-2 text-red-400 hover:text-red-500 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                            title="Unsubscribe Email"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
