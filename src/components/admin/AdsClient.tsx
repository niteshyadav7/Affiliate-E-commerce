"use client";

import { useState, useEffect } from "react";
import { 
  Megaphone, 
  Settings, 
  Code, 
  Image as ImageIcon, 
  Eye, 
  Save, 
  AlertCircle, 
  CheckCircle2, 
  Copy, 
  Database,
  Info
} from "lucide-react";
import Button from "@/components/atoms/Button";
import { getDirectGoogleDriveLink } from "@/lib/utils";

interface AdConfig {
  id: string;
  label: string;
  is_enabled: boolean;
  ad_type: "custom" | "script";
  script_code: string;
  image_url: string;
  link_url: string;
  updated_at: string;
}

export default function AdsClient({ role = "viewer" }: { role?: string }) {
  const [configs, setConfigs] = useState<AdConfig[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  // Specific error for when the table does not exist
  const [isTableMissing, setIsTableMissing] = useState<boolean>(false);
  const [copiedSql, setCopiedSql] = useState<boolean>(false);

  const sqlMigrationCode = `-- ============================================
-- ADVERTISEMENT CONFIGURATIONS SCHEMA MIGRATION
-- Run this in your Supabase SQL Editor
-- ============================================

CREATE TABLE IF NOT EXISTS ad_configs (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  is_enabled BOOLEAN DEFAULT false,
  ad_type TEXT DEFAULT 'custom', -- 'script' or 'custom'
  script_code TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  link_url TEXT DEFAULT '',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE ad_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on ad_configs" ON ad_configs FOR SELECT USING (true);
CREATE POLICY "Allow all operations on ad_configs" ON ad_configs FOR ALL USING (true) WITH CHECK (true);

INSERT INTO ad_configs (id, label, is_enabled, ad_type, image_url, link_url) VALUES
('header_top', 'Header Top Banner (All Devices)', false, 'custom', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80', '/'),
('homepage_hero', 'Homepage Hero Banner (728x90)', false, 'custom', 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80', '/'),
('homepage_grid', 'Homepage Product Grid Card (Native)', false, 'custom', 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80', '/'),
('homepage_mid_grid', 'Homepage Mid-Grid Horizontal Banner (728x90)', false, 'custom', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80', '/'),
('left_skyscraper', 'Left Skyscraper Banner (160x600 - Wide Desktop)', false, 'custom', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80', '/'),
('right_skyscraper', 'Right Skyscraper Banner (160x600 - Wide Desktop)', false, 'custom', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80', '/'),
('product_detail_top', 'Product Page Top Banner (728x90)', false, 'custom', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', '/'),
('product_detail_sidebar', 'Product Page Sidebar/CTA Ad (300x250)', false, 'custom', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80', '/'),
('product_detail_bottom', 'Product Page Bottom Banner (728x90)', false, 'custom', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80', '/'),
('mobile_anchor', 'Mobile Sticky Bottom Anchor (320x50 - Mobile Only)', false, 'custom', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80', '/'),
('tablet_anchor', 'Tablet Sticky Bottom Anchor (728x90 - Tablet Only)', false, 'custom', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=700&q=80', '/'),
('footer_banner', 'Storefront Footer Banner (All Devices)', false, 'custom', 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80', '/')
ON CONFLICT (id) DO NOTHING;`;

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/ads");
      
      if (res.status === 404) {
        const data = await res.json();
        if (data.error && data.error.includes("does not exist")) {
          setIsTableMissing(true);
          return;
        }
      }

      if (!res.ok) {
        throw new Error(`Failed to fetch ad configs: ${res.statusText}`);
      }

      const data = await res.json();
      setConfigs(data);
      if (data.length > 0) {
        setSelectedId(data[0].id);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred while loading configurations.");
    } finally {
      setLoading(false);
    }
  };

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(sqlMigrationCode);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const handleUpdateField = (id: string, field: keyof AdConfig, value: any) => {
    setConfigs(prev =>
      prev.map(config => (config.id === id ? { ...config, [field]: value } : config))
    );
  };

  const handleToggleEnable = async (id: string, currentVal: boolean) => {
    if (role === "viewer") {
      setError("Forbidden: Viewers are not allowed to modify ad settings.");
      return;
    }

    const configToSave = configs.find(c => c.id === id);
    if (!configToSave) return;

    const newVal = !currentVal;

    // Update local state instantly for dynamic feel
    setConfigs(prev =>
      prev.map(c => (c.id === id ? { ...c, is_enabled: newVal } : c))
    );

    try {
      setError(null);
      setSuccess(null);

      const res = await fetch("/api/ads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...configToSave,
          is_enabled: newVal
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to toggle ad status.");
      }

      const updated = await res.json();
      setConfigs(prev => prev.map(c => (c.id === id ? updated : c)));
      setSuccess(`Ad placement "${configToSave.label}" is now ${newVal ? "Active" : "Disabled"}.`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: any) {
      // Revert state on error
      setConfigs(prev =>
        prev.map(c => (c.id === id ? { ...c, is_enabled: currentVal } : c))
      );
      setError(err.message || "Failed to update ad status.");
    }
  };

  const handleToggleAll = async (enable: boolean) => {
    if (role === "viewer") {
      setError("Forbidden: Viewers are not allowed to modify ad settings.");
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const updatePromises = configs.map(config => {
        return fetch("/api/ads", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...config,
            is_enabled: enable
          }),
        }).then(async res => {
          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error || `Failed to update ${config.label}`);
          }
          return res.json();
        });
      });

      const results = await Promise.all(updatePromises);
      setConfigs(results);
      setSuccess(`All ad placements have been ${enable ? "activated" : "deactivated"} successfully.`);
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to update all ad configurations.");
      fetchConfigs();
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async (id: string) => {
    if (role === "viewer") {
      setError("Forbidden: Viewers are not allowed to modify ad settings.");
      return;
    }

    const configToSave = configs.find(c => c.id === id);
    if (!configToSave) return;

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const res = await fetch("/api/ads", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(configToSave),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save configuration.");
      }

      const updated = await res.json();
      setConfigs(prev => prev.map(c => (c.id === id ? updated : c)));
      setSuccess(`Ad placement "${configToSave.label}" updated successfully.`);
      
      // Auto dismiss success alert after 4 seconds
      setTimeout(() => setSuccess(null), 4000);
    } catch (err: any) {
      setError(err.message || "Failed to update configuration.");
    } finally {
      setSaving(false);
    }
  };

  const currentConfig = configs.find(c => c.id === selectedId);

  // Render SQL migration instructions if Table doesn't exist yet
  if (isTableMissing) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-surface-container shadow-sm max-w-4xl">
        <div className="flex items-center gap-4 text-accent-amber mb-6">
          <div className="bg-accent-amber/10 p-3 rounded-2xl border border-accent-amber/20">
            <Database className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-primary">Database Table Missing</h2>
            <p className="font-body text-sm text-secondary mt-1">
              The `ad_configs` table does not exist in your Supabase database yet.
            </p>
          </div>
        </div>

        <div className="bg-surface-container-low border border-surface-container rounded-2xl p-6 mb-6">
          <h3 className="font-display font-semibold text-primary mb-3">Setup Instructions</h3>
          <ol className="list-decimal list-inside space-y-2 text-sm text-secondary font-body leading-relaxed">
            <li>Open your <strong>Supabase Dashboard</strong>.</li>
            <li>Navigate to the <strong>SQL Editor</strong> tab on the left menu.</li>
            <li>Click <strong>New Query</strong>.</li>
            <li>Copy and paste the SQL script below, then click <strong>Run</strong>.</li>
            <li>Once applied, refresh this page to access the Ads Manager.</li>
          </ol>
        </div>

        <div className="relative">
          <div className="absolute right-4 top-4 z-10">
            <button
              onClick={copySqlToClipboard}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-bold font-body hover:bg-primary/95 transition-all shadow-sm"
            >
              {copiedSql ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy SQL Code
                </>
              )}
            </button>
          </div>
          <pre className="bg-primary/5 border border-primary/10 text-primary font-mono text-xs p-6 rounded-2xl overflow-x-auto max-h-[320px] select-all">
            {sqlMigrationCode}
          </pre>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-secondary text-sm font-body">Fetching ad placement configurations...</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Sidebar List of placements */}
      <div className="lg:col-span-4 space-y-3">
        <div className="bg-white rounded-2xl border border-surface-container p-4">
          <h2 className="font-display text-sm font-bold text-primary uppercase tracking-wider mb-3 px-2">
            Ad Placements
          </h2>
          
          <div className="flex gap-2 mb-4 px-2">
            <button
              onClick={() => handleToggleAll(true)}
              disabled={role === "viewer" || saving}
              className="flex-1 text-center py-2 rounded-lg border border-accent-lime bg-accent-lime/10 text-primary hover:bg-accent-lime font-body text-[10px] font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Activate All
            </button>
            <button
              onClick={() => handleToggleAll(false)}
              disabled={role === "viewer" || saving}
              className="flex-1 text-center py-2 rounded-lg border border-outline/20 text-secondary hover:bg-surface-container-low font-body text-[10px] font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Deactivate All
            </button>
          </div>

          <div className="space-y-1">
            {configs.map(config => {
              const isActive = config.id === selectedId;
              return (
                <button
                  key={config.id}
                  onClick={() => {
                    setSelectedId(config.id);
                    setError(null);
                    setSuccess(null);
                  }}
                  className={`w-full text-left flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-white font-semibold shadow-sm"
                      : "bg-transparent text-secondary hover:bg-surface-container-low/50 hover:text-primary"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Megaphone className={`w-4 h-4 ${isActive ? "text-accent-lime" : "text-primary/40"}`} />
                    <span className="text-xs truncate max-w-[180px]">{config.label}</span>
                  </div>
                  <span
                    className={`w-2.5 h-2.5 rounded-full border ${
                      config.is_enabled
                        ? "bg-accent-lime border-accent-lime/40"
                        : "bg-surface-container border-outline/20"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {role === "viewer" && (
          <div className="bg-accent-amber/10 border border-accent-amber/20 rounded-2xl p-4 flex gap-3 text-primary text-xs">
            <Info className="w-5 h-5 shrink-0" />
            <p className="font-body leading-relaxed">
              <strong>Viewer Mode:</strong> You can browse ad placements and code structures, but saving updates is disabled.
            </p>
          </div>
        )}
      </div>

      {/* Editor & Preview Form */}
      <div className="lg:col-span-8">
        {currentConfig ? (
          <div className="bg-white rounded-3xl border border-surface-container shadow-sm p-6 md:p-8 space-y-6 relative overflow-hidden grain-texture">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-surface-container pb-4 gap-4">
              <div>
                <span className="text-[10px] font-bold text-accent-coral uppercase tracking-wider">Slot Configuration</span>
                <h2 className="font-display text-xl font-bold text-primary">{currentConfig.label}</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-secondary font-body">Status:</span>
                <button
                  type="button"
                  disabled={role === "viewer" || saving}
                  onClick={() => handleToggleEnable(currentConfig.id, currentConfig.is_enabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    currentConfig.is_enabled ? "bg-accent-lime" : "bg-outline/20"
                  } ${role === "viewer" || saving ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      currentConfig.is_enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="text-xs font-semibold text-primary font-body">
                  {currentConfig.is_enabled ? "Active" : "Disabled"}
                </span>
              </div>
            </div>

            {/* Error and Success alerts */}
            {error && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3 text-red-700 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span className="font-body leading-relaxed">{error}</span>
              </div>
            )}
            {success && (
              <div className="bg-accent-lime/10 border border-accent-lime/20 rounded-xl p-4 flex items-start gap-3 text-primary text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-accent-lime" />
                <span className="font-body leading-relaxed">{success}</span>
              </div>
            )}

            {/* Options selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">Ad System Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={role === "viewer"}
                    onClick={() => handleUpdateField(currentConfig.id, "ad_type", "custom")}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-body text-xs font-bold transition-all ${
                      currentConfig.ad_type === "custom"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-outline/20 bg-transparent text-secondary hover:bg-surface-container-low"
                    } ${role === "viewer" ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    Custom Banner
                  </button>
                  <button
                    type="button"
                    disabled={role === "viewer"}
                    onClick={() => handleUpdateField(currentConfig.id, "ad_type", "script")}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border font-body text-xs font-bold transition-all ${
                      currentConfig.ad_type === "script"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-outline/20 bg-transparent text-secondary hover:bg-surface-container-low"
                    } ${role === "viewer" ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <Code className="w-4 h-4" />
                    Script Code (AdSense)
                  </button>
                </div>
              </div>
            </div>

            {/* Type Specific Fields */}
            {currentConfig.ad_type === "custom" ? (
              <div className="space-y-4">
                <div className="bg-surface-container-low p-4 rounded-2xl border border-surface-container-high/15 space-y-4">
                  <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                    <Settings className="w-4 h-4 text-accent-coral" /> Custom Image Banner details
                  </h3>
                  
                  <div>
                    <label className="block text-xs font-semibold text-secondary mb-1.5">Banner Image URL</label>
                    <input
                      type="url"
                      disabled={role === "viewer"}
                      value={currentConfig.image_url}
                      onChange={e => handleUpdateField(currentConfig.id, "image_url", e.target.value)}
                      placeholder="https://example.com/banner.jpg"
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-outline/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-primary text-xs font-body"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-secondary mb-1.5">Redirect Target Link</label>
                    <input
                      type="url"
                      disabled={role === "viewer"}
                      value={currentConfig.link_url}
                      onChange={e => handleUpdateField(currentConfig.id, "link_url", e.target.value)}
                      placeholder="https://partner-redirect.com/link"
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-outline/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-primary text-xs font-body"
                    />
                  </div>
                </div>

                {/* Banner preview block */}
                {currentConfig.image_url && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-wider flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Direct View Preview
                    </span>
                    <div className="border border-surface-container rounded-2xl overflow-hidden bg-surface-container-low max-h-[160px] flex items-center justify-center p-2">
                      <a href={currentConfig.link_url} target="_blank" rel="noreferrer" className="block max-w-full">
                        <img
                          src={getDirectGoogleDriveLink(currentConfig.image_url)}
                          alt="Banner Preview"
                          className="max-h-[140px] max-w-full object-contain rounded-lg"
                        />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-surface-container-low p-4 rounded-2xl border border-surface-container-high/15 space-y-4">
                  <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                    <Code className="w-4 h-4 text-accent-coral" /> Embed Ad Script Snippet (HTML/JavaScript)
                  </h3>
                  
                  <div>
                    <label className="block text-xs font-semibold text-secondary mb-1.5">
                      Script HTML Code
                    </label>
                    <textarea
                      rows={5}
                      disabled={role === "viewer"}
                      value={currentConfig.script_code}
                      onChange={e => handleUpdateField(currentConfig.id, "script_code", e.target.value)}
                      placeholder={`<!-- Google AdSense Code -->\n<ins class="adsbygoogle"\n     style="display:block"\n     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"\n     data-ad-slot="XXXXXXXXXX"\n     data-ad-format="auto"></ins>\n<script>\n     (adsbygoogle = window.adsbygoogle || []).push({});\n</script>`}
                      className="w-full px-4 py-3 bg-surface rounded-xl border border-outline/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-primary font-mono text-xs leading-relaxed"
                    />
                  </div>
                  
                  <div className="flex gap-2 text-[10px] text-secondary font-body">
                    <Info className="w-4 h-4 text-primary shrink-0" />
                    <p>Paste the raw HTML advertisement code provided by your network. This code will load within a collapse-aware wrapper dynamically on client rendering.</p>
                  </div>
                </div>

                <div className="border border-surface-container rounded-2xl p-4 bg-surface-container-low">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-wider flex items-center gap-1 mb-2">
                    <Eye className="w-3.5 h-3.5" /> Layout Area preview (Mock Container)
                  </span>
                  <div className="w-full bg-white border border-dashed border-outline/35 rounded-xl py-8 px-4 flex flex-col items-center justify-center text-center">
                    <Code className="w-6 h-6 text-primary/45 mb-2" />
                    <span className="text-xs font-bold text-primary">{currentConfig.label}</span>
                    <span className="text-[10px] text-secondary mt-1 max-w-[280px]">
                      {currentConfig.is_enabled 
                        ? "Dynamic Third-Party Script is set to load on runtime." 
                        : "Slot is currently disabled (No layout space will be taken on the storefront)."}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Save Buttons */}
            <div className="flex justify-end pt-4 border-t border-surface-container">
              <Button
                variant="primary"
                size="md"
                disabled={saving || role === "viewer"}
                onClick={() => handleSave(currentConfig.id)}
                className="flex items-center justify-center gap-2 text-white font-extrabold"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving Changes..." : "Save Config Slot"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-surface-container rounded-3xl p-12 text-center flex flex-col items-center justify-center">
            <Megaphone className="w-12 h-12 text-primary/30 mb-4 animate-pulse" />
            <h3 className="font-display text-lg font-bold text-primary">No Ad Placement Selected</h3>
            <p className="font-body text-sm text-secondary mt-2">
              Select one of the ad positions from the left panel to configure its details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
