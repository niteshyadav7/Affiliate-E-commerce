"use client";

import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';

export default function AnalyticsPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch('/api/newsletter');
      const data = await res.json();
      setSubscribers(data);
    } catch (error) {
      console.error('Failed to fetch subscribers', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="font-display text-3xl font-bold text-primary">Analytics & Audience</h1>
        <p className="text-on-secondary-container mt-2">View performance metrics and your newsletter subscribers.</p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-surface-container-low overflow-hidden">
        <div className="p-6 border-b border-surface-container-low flex justify-between items-center">
          <h2 className="font-display text-xl font-bold text-primary flex items-center gap-2">
            <Mail className="w-5 h-5" /> Newsletter Subscribers
          </h2>
          <div className="text-sm font-bold text-primary bg-primary/5 px-3 py-1 rounded-full">
            {subscribers.length} Total
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-on-secondary-container">Loading subscribers...</div>
        ) : subscribers.length === 0 ? (
          <div className="p-8 text-center text-on-secondary-container">No subscribers yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-on-secondary-container">
              <thead className="bg-surface/50 text-xs uppercase bg-gray-50 border-b border-surface-container-low">
                <tr>
                  <th className="px-6 py-4 font-bold text-primary">Email Address</th>
                  <th className="px-6 py-4 font-bold text-primary text-right">Date Subscribed</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="border-b border-surface-container-low hover:bg-surface/30">
                    <td className="px-6 py-4 font-medium text-primary">
                      {sub.email}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {new Date(sub.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
