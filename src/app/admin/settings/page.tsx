"use client";

import { useState, useEffect } from 'react';
import { Mail, Send, Eye, Users, CheckCircle2, AlertCircle, Trash2, Search, Smartphone } from 'lucide-react';
import Button from '@/components/atoms/Button';

interface Product {
  id: string;
  name: string;
  price: string;
  image_url: string;
  description: string;
}

interface Subscriber {
  email: string;
  created_at: string;
}

export default function SettingsPage() {
  const [subject, setSubject] = useState('Exclusive Weekly Deals from Shopverse!');
  const [headingMessage, setHeadingMessage] = useState(
    'Hey there! We have curated a list of the hottest trending deals this week. Check out the hand-picked recommendations below and lock in your discounts!'
  );
  
  // Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Status States
  const [loadingSubscribers, setLoadingSubscribers] = useState(true);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' | null }>({
    message: '',
    type: null
  });

  // Fetch subscribers and latest products on load
  const fetchData = async () => {
    try {
      // 1. Fetch Subscribers
      const subRes = await fetch('/api/newsletter');
      if (subRes.ok) {
        const subData = await subRes.json();
        setSubscribers(subData || []);
      }
      
      // 2. Fetch Latest Products for live preview
      const prodRes = await fetch('/api/products');
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        // Take latest 3 products
        setProducts(prodData.slice(0, 3) || []);
      }
    } catch (err) {
      console.error('Failed to load settings data', err);
    } finally {
      setLoadingSubscribers(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSendCampaign = async (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribers.length === 0) {
      setStatus({
        message: 'Cannot send campaign: You have 0 subscribers.',
        type: 'error'
      });
      return;
    }

    setSending(true);
    setStatus({ message: '', type: null });

    try {
      const res = await fetch('/api/admin/send-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, headingMessage })
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to send campaign');

      setStatus({
        message: `Success! Newsletter successfully sent to all ${subscribers.length} subscribers.`,
        type: 'success'
      });
    } catch (err: any) {
      setStatus({
        message: err.message || 'An error occurred while sending the email.',
        type: 'error'
      });
    } finally {
      setSending(false);
    }
  };

  const handleDeleteSubscriber = async (email: string) => {
    if (!confirm(`Are you sure you want to remove ${email} from subscribers?`)) return;
    
    try {
      const res = await fetch('/api/newsletter', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      
      if (res.ok) {
        setSubscribers(prev => prev.filter(sub => sub.email !== email));
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete subscriber');
      }
    } catch (err) {
      console.error('Error deleting subscriber', err);
    }
  };

  // Filter subscribers based on search query
  const filteredSubscribers = subscribers.filter(sub => 
    sub.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pr-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-primary flex items-center gap-2.5">
            <Mail className="w-8 h-8 text-primary" /> Newsletter Campaigns
          </h1>
          <p className="text-on-secondary-container mt-2">Create custom weekly broadcasts, monitor subscriptions, and view email styling.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form & Subscribers */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Newsletter Composer Card */}
          <form onSubmit={handleSendCampaign} className="bg-white p-6 rounded-3xl border border-surface-container-low shadow-sm space-y-5">
            <div className="flex justify-between items-center pb-4 border-b border-surface-container-low">
              <div>
                <h3 className="font-display text-base font-bold text-primary flex items-center gap-2">
                  <Send className="w-4.5 h-4.5" /> Newsletter Broadcast
                </h3>
                <p className="text-[11px] text-on-secondary-container opacity-70 mt-0.5">Dispatches a weekly deal digest to your mailing list.</p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-low rounded-full text-xs font-bold text-primary">
                <Users className="w-3.5 h-3.5" /> 
                {loadingSubscribers ? '...' : `${subscribers.length} Subscribers`}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-primary mb-1.5 uppercase tracking-wide">Email Subject</label>
                <input 
                  required
                  type="text"
                  className="w-full px-4 py-2.5 border border-outline/20 rounded-xl focus:outline-none focus:border-primary/50 text-sm bg-white focus:ring-1 focus:ring-primary/20"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="e.g. Exclusive Weekly Deals are Here!"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-primary mb-1.5 uppercase tracking-wide">Introductory Message</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 border border-outline/20 rounded-xl focus:outline-none focus:border-primary/50 text-sm bg-white focus:ring-1 focus:ring-primary/20"
                  value={headingMessage}
                  onChange={e => setHeadingMessage(e.target.value)}
                  placeholder="Write a greeting introducing the highlighted deals..."
                />
              </div>
            </div>

            {status.type && (
              <div className={`p-4 rounded-xl flex items-start gap-3 border text-xs leading-relaxed ${
                status.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
              }`}>
                {status.type === 'success' ? <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                <div>{status.message}</div>
              </div>
            )}

            <div className="pt-2">
              <Button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 py-3 cursor-pointer"
                disabled={sending || loadingSubscribers || subscribers.length === 0}
              >
                <Send className="w-4 h-4" /> {sending ? 'Sending Broadcast...' : 'Send Campaign to Subscribers'}
              </Button>
            </div>
          </form>

          {/* Subscribers Manager Card */}
          <div className="bg-white p-6 rounded-3xl border border-surface-container-low shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-surface-container-low">
              <div>
                <h3 className="font-display text-base font-bold text-primary">Subscribers List</h3>
                <p className="text-[11px] text-on-secondary-container opacity-70">View and manage newsletter audience.</p>
              </div>
              
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-on-secondary-container absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
                <input 
                  type="text"
                  placeholder="Search emails..."
                  className="pl-9 pr-4 py-1.5 border border-outline/20 rounded-xl text-xs bg-white w-full sm:w-48 focus:outline-none focus:border-primary/50"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {loadingSubscribers ? (
              <div className="text-center py-6 text-xs text-on-secondary-container opacity-60">Loading list...</div>
            ) : filteredSubscribers.length === 0 ? (
              <div className="text-center py-8 text-xs text-on-secondary-container opacity-60">
                {searchQuery ? 'No subscribers match your search.' : 'No subscribers signed up yet.'}
              </div>
            ) : (
              <div className="max-h-60 overflow-y-auto pr-1 space-y-2">
                {filteredSubscribers.map((sub, idx) => (
                  <div 
                    key={idx}
                    className="flex justify-between items-center p-3 rounded-xl border border-outline/5 hover:border-outline/10 bg-surface/20 hover:bg-surface/40 transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-primary">{sub.email}</div>
                      <div className="text-[9px] text-on-secondary-container opacity-60">
                        Subscribed: {new Date(sub.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleDeleteSubscriber(sub.email)}
                      className="p-1.5 text-on-secondary-container hover:text-red-500 bg-white hover:bg-red-50 border border-outline/10 rounded-lg transition-colors cursor-pointer"
                      title="Unsubscribe User"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Live Email Preview in Mobile Frame */}
        <div className="lg:col-span-5 flex flex-col items-center space-y-3">
          <h4 className="text-xs font-bold text-primary flex items-center gap-1.5 uppercase tracking-wider">
            <Smartphone className="w-4 h-4 text-primary" /> Live Mobile Email Preview
          </h4>
          
          {/* Locked Mobile phone casing container */}
          <div className="w-[320px] h-[580px] bg-slate-950 rounded-[45px] p-3.5 shadow-2xl border-4 border-slate-800 flex flex-col overflow-hidden relative flex-shrink-0">
            {/* Camera / Speaker Notch */}
            <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-2 flex items-center justify-around px-3 flex-shrink-0">
              <div className="w-1.5 h-1.5 bg-indigo-900 rounded-full"></div>
              <div className="w-6 h-1 bg-slate-800 rounded-full"></div>
              <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
            </div>

            {/* Email app screen container */}
            <div className="flex-1 bg-gray-100 rounded-[28px] overflow-hidden flex flex-col border border-slate-900/10">
              {/* Mail client Header */}
              <div className="bg-primary/5 text-primary p-2 px-3 flex justify-between items-center border-b border-outline/5 text-[9px] font-semibold flex-shrink-0">
                <span className="flex items-center gap-1">✉️ Gmail</span>
                <span className="opacity-60">1 of 1</span>
              </div>

              {/* Message metadata box */}
              <div className="bg-white p-3 border-b border-gray-100 flex-shrink-0 text-[10px] space-y-1">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-800 truncate pr-2">{subject || 'No Subject'}</span>
                  <span className="text-gray-400 text-[8px] whitespace-nowrap">9:41 AM</span>
                </div>
                <div className="text-[8px] text-gray-400">
                  From: <span className="text-gray-600 font-semibold">yadavgolu178@gmail.com</span>
                </div>
                <div className="text-[8px] text-gray-400">
                  To: <span className="text-gray-600 font-semibold">newsletter-subscribers@shopverse</span>
                </div>
              </div>

              {/* Scrollable email body */}
              <div className="flex-1 overflow-y-auto p-2.5 text-[9px] bg-white space-y-4">
                {/* Shopverse branding */}
                <div className="text-center border-b border-gray-50 pb-2">
                  <span className="font-display font-extrabold text-base text-primary tracking-tight">shopverse</span>
                  <div className="text-[8px] text-gray-400 mt-0.5">Your curated shopping rotation</div>
                </div>

                {/* Introductory text */}
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{headingMessage}</p>

                {/* Email Products list */}
                <div className="pt-2">
                  <span className="font-bold text-gray-800 uppercase text-[8px] tracking-wider block mb-2 border-b border-gray-100 pb-1">
                    🔥 Weekly Highlights
                  </span>
                  
                  {products.length === 0 ? (
                    <div className="text-center py-4 text-gray-400 italic text-[8px]">
                      No products added to highlight.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {products.map((p, idx) => (
                        <div 
                          key={idx}
                          className="flex gap-2 items-center bg-gray-50 p-2 rounded-xl border border-gray-100"
                        >
                          <img 
                            src={p.image_url || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100'} 
                            alt={p.name}
                            className="w-10 h-10 object-cover rounded-lg border border-gray-200/50 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-gray-800 truncate text-[9px]">{p.name}</div>
                            <div className="text-[8px] text-gray-400 truncate line-clamp-1">{p.description}</div>
                          </div>
                          <div className="text-right whitespace-nowrap pl-1">
                            <div className="font-bold text-green-600 text-[9px]">{p.price}</div>
                            <span className="text-[7px] bg-primary text-white font-bold px-1.5 py-0.5 rounded mt-0.5 inline-block">Shop</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer notes */}
                <div className="border-t border-gray-100 pt-3 text-center text-gray-400 text-[8px] space-y-1 pb-4">
                  <p>You are receiving this because you subscribed to Shopverse updates.</p>
                  <p className="text-primary font-semibold">
                    <span className="underline">Unsubscribe</span> | <span className="underline">Preferences</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Phone bottom home bar indicator */}
            <div className="w-24 h-1 bg-slate-800 rounded-full mx-auto mt-2 flex-shrink-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
