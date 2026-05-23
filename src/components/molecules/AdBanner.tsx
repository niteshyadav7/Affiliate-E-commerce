"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getDirectGoogleDriveLink } from "@/lib/utils";

interface AdConfig {
  id: string;
  label: string;
  is_enabled: boolean;
  ad_type: "custom" | "script";
  script_code: string;
  image_url: string;
  link_url: string;
}

interface AdBannerProps {
  slotId: string;
  className?: string;
}

export default function AdBanner({ slotId, className = "" }: AdBannerProps) {
  const pathname = usePathname();

  // Disable all ads on admin panel subpages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const [config, setConfig] = useState<AdConfig | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadAdConfig() {
      try {
        const { data, error } = await supabase
          .from("ad_configs")
          .select("*")
          .eq("id", slotId)
          .maybeSingle();

        if (error) throw error;
        
        if (data) {
          setConfig(data);
          // If disabled, collapse immediately
          if (!data.is_enabled) {
            setCollapsed(true);
          }
        } else {
          // If config not found, collapse
          setCollapsed(true);
        }
      } catch (err) {
        console.warn(`Failed to load ad slot [${slotId}]:`, err);
        setCollapsed(true);
      }
    }

    loadAdConfig();
  }, [slotId]);

  useEffect(() => {
    if (!config || !config.is_enabled) return;

    if (config.ad_type === "custom") {
      // If custom banner is enabled but has no image URL, collapse it
      if (!config.image_url) {
        setCollapsed(true);
      } else {
        setLoaded(true);
      }
      return;
    }

    // Script injection logic for Google AdSense or similar JS ads
    if (config.ad_type === "script" && config.script_code && containerRef.current) {
      try {
        // Clear container
        containerRef.current.innerHTML = "";

        // Parse HTML and Script tags
        const parser = new DOMParser();
        const doc = parser.parseFromString(config.script_code, "text/html");
        
        // 1. Append HTML elements (like <ins class="adsbygoogle" ...>)
        const bodyChildren = Array.from(doc.body.childNodes);
        bodyChildren.forEach(node => {
          if (node.nodeName !== "SCRIPT") {
            containerRef.current?.appendChild(node.cloneNode(true));
          }
        });

        // 2. Append and evaluate <script> elements
        const scripts = Array.from(doc.querySelectorAll("script"));
        scripts.forEach(oldScript => {
          const newScript = document.createElement("script");
          
          // Copy attributes
          Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
          });
          
          // Copy script body
          newScript.textContent = oldScript.textContent;
          
          containerRef.current?.appendChild(newScript);
        });

        setLoaded(true);

        // Check for "unfilled" or zero-height ads after a brief delay
        // Google AdSense usually sets data-ad-status or changes heights
        const checkEmptyTimer = setTimeout(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const hasIns = containerRef.current.querySelector("ins");
            const isUnfilled = hasIns?.getAttribute("data-ad-status") === "unfilled";
            
            // If the container is 0 height or marked unfilled by Google AdSense, collapse it
            if (rect.height === 0 || isUnfilled) {
              console.log(`Ad slot [${slotId}] is empty/unfilled. Collapsing space.`);
              setCollapsed(true);
            }
          }
        }, 1500);

        // Also setup a ResizeObserver to monitor dynamic collapse by the ad network
        let resizeObserver: ResizeObserver | null = null;
        if (typeof window !== "undefined" && "ResizeObserver" in window) {
          resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
              const height = entry.contentRect.height;
              // If ad loaded but then collapsed to 0
              if (loaded && height === 0) {
                setCollapsed(true);
              }
            }
          });
          resizeObserver.observe(containerRef.current);
        }

        return () => {
          clearTimeout(checkEmptyTimer);
          resizeObserver?.disconnect();
        };

      } catch (err) {
        console.error(`Failed to inject script for slot [${slotId}]:`, err);
        setCollapsed(true);
      }
    }
  }, [config, loaded]);

  // Determine standard wrapper responsive styles depending on slot
  let sizeClasses = "w-full max-w-7xl mx-auto my-6 px-4 md:px-8";
  if (slotId === "homepage_hero" || slotId === "homepage_mid_grid" || slotId === "footer_banner") {
    sizeClasses = "w-full max-w-7xl mx-auto my-2 px-4 md:px-8";
  } else if (slotId === "homepage_grid") {
    // Native Card format
    sizeClasses = "w-full h-full flex flex-col justify-between";
  } else if (slotId === "header_top") {
    // Top bar above navbar
    sizeClasses = "w-full bg-surface-container-low border-b border-surface-container py-2 flex justify-center items-center relative z-40";
  } else if (slotId === "product_detail_sidebar") {
    // Product page details card ad
    sizeClasses = "w-full max-w-[300px] mx-auto my-4";
  } else if (slotId === "mobile_anchor" || slotId === "tablet_anchor") {
    sizeClasses = "py-1 w-full flex justify-center items-center";
  } else if (slotId === "left_skyscraper" || slotId === "right_skyscraper") {
    sizeClasses = "w-[160px] h-[600px] flex justify-center items-center";
  }

  if (collapsed) {
    return <div className="w-0 h-0 overflow-hidden hidden" aria-hidden="true" />;
  }

  return (
    <div className={`${sizeClasses} ${className} transition-all duration-300`}>
      {/* Label for sponsored content */}
      {config && config.ad_type === "custom" && slotId !== "mobile_anchor" && slotId !== "tablet_anchor" && slotId !== "header_top" && (
        <div className="text-[9px] font-bold text-primary/30 uppercase tracking-widest text-center mb-1 select-none">
          Sponsored Content
        </div>
      )}

      {config?.ad_type === "custom" ? (
        <div className="w-full flex justify-center items-center">
          {slotId === "homepage_grid" ? (
            // Native card format styling to blend with ProductCard
            <div className="bg-white rounded-2xl p-4 border border-surface-container shadow-sm h-full flex flex-col justify-between w-full relative overflow-hidden group">
              <div className="absolute top-3 left-3 z-10 bg-primary/10 text-primary border border-primary/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider">
                Ad
              </div>
              <div className="aspect-square rounded-xl bg-surface-container-low mb-4 overflow-hidden relative border border-surface-container-high/10">
                <img
                  src={getDirectGoogleDriveLink(config.image_url)}
                  alt="Promotional Offer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h4 className="font-display text-body-md font-bold text-primary mb-1 line-clamp-2 leading-snug">
                  Featured Promotion
                </h4>
                <p className="font-body text-body-sm text-secondary line-clamp-2 mb-4 leading-relaxed">
                  Discover curated deals from our premium brand partners.
                </p>
              </div>
              <a
                href={config.link_url}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center py-2.5 rounded-full bg-primary hover:shadow-[0_20px_50px_rgba(0,26,61,0.2)] transition-all font-body text-body-sm font-bold text-white block"
              >
                LEARN MORE
              </a>
            </div>
          ) : slotId === "mobile_anchor" || slotId === "tablet_anchor" ? (
            // Bottom sticky anchor formats
            <a
              href={config.link_url}
              target="_blank"
              rel="noreferrer"
              className={`relative block overflow-hidden rounded-md border border-surface-container shadow-sm bg-white ${
                slotId === "tablet_anchor" ? "w-[728px] h-[90px]" : "w-[320px] h-[50px]"
              }`}
            >
              <span className="absolute top-0.5 left-0.5 z-10 bg-primary/20 text-primary px-1 rounded text-[6px] font-bold uppercase tracking-wide">
                Ad
              </span>
              <img
                src={getDirectGoogleDriveLink(config.image_url)}
                alt="Anchor Banner"
                className="w-full h-full object-cover"
              />
            </a>
          ) : slotId === "left_skyscraper" || slotId === "right_skyscraper" ? (
            // Side skyscrapers
            <a
              href={config.link_url}
              target="_blank"
              rel="noreferrer"
              className="block overflow-hidden rounded-2xl border border-surface-container bg-white w-[160px] h-[600px] hover:shadow-md transition-all relative group shadow-sm"
            >
              <span className="absolute top-2 left-2 z-10 bg-primary/20 text-primary px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wide">
                Ad
              </span>
              <img
                src={getDirectGoogleDriveLink(config.image_url)}
                alt="Skyscraper Banner"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </a>
          ) : slotId === "product_detail_sidebar" ? (
            // Sidebar display ad
            <a
              href={config.link_url}
              target="_blank"
              rel="noreferrer"
              className="block overflow-hidden rounded-2xl border border-surface-container bg-white w-[300px] h-[250px] hover:shadow-md transition-all relative group shadow-sm mx-auto"
            >
              <span className="absolute top-2 left-2 z-10 bg-primary/20 text-primary px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wide">
                Ad
              </span>
              <img
                src={getDirectGoogleDriveLink(config.image_url)}
                alt="Sidebar Advertisement"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </a>
          ) : slotId === "header_top" ? (
            // Top bar banner - slim horizontal strip
            <a
              href={config.link_url}
              target="_blank"
              rel="noreferrer"
              className="block w-full max-h-[44px] md:max-h-[60px] overflow-hidden hover:opacity-95 transition-all text-center relative"
            >
              <span className="absolute top-0.5 left-2 z-10 bg-primary/10 text-primary px-1.5 rounded text-[6px] font-bold uppercase tracking-wide">
                Ad
              </span>
              <img
                src={getDirectGoogleDriveLink(config.image_url)}
                alt="Header Offer"
                className="w-full h-full object-cover"
              />
            </a>
          ) : (
            // Horizontal banners (hero, bottom etc)
            <a
              href={config.link_url}
              target="_blank"
              rel="noreferrer"
              className="block overflow-hidden rounded-2xl border border-surface-container bg-surface-container-low max-w-full hover:shadow-sm transition-all"
            >
              <img
                src={getDirectGoogleDriveLink(config.image_url)}
                alt="Advertisement Banner"
                className="w-full max-h-[120px] md:max-h-[160px] object-cover"
              />
            </a>
          )}
        </div>
      ) : (
        // Script wrapper that receives third-party tags
        <div 
          ref={containerRef} 
          className="w-full flex justify-center items-center min-h-[50px] transition-all duration-300"
        />
      )}
    </div>
  );
}
