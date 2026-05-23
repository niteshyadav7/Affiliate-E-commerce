"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import Button from "../atoms/Button";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const loading = status === "loading";

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };
  return (
    <footer className="relative z-40 bg-primary text-surface-white mt-section-gap">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-page-margin-mobile md:px-page-margin-desktop py-section-gap max-w-7xl mx-auto">
        <div className="md:col-span-1">
          <div className="font-display text-headline-md text-accent-lime mb-6 tracking-tighter">
            DIVERSIFIED Y&P
          </div>
          <p className="font-body text-body-md text-secondary-fixed-dim/70 max-w-xs">
            Curating excellence for the modern shopper. A blend of luxury,
            technology, and sustainability.
          </p>
        </div>

        {["QUICK LINKS", "SUPPORT"].map((title) => (
          <div key={title}>
            <h4 className="font-display text-body-md font-bold mb-6 text-surface-white uppercase tracking-wider">
              {title}
            </h4>
            <ul className="flex flex-col gap-4">
              {(title === "QUICK LINKS"
                ? ["Privacy Policy", "Terms of Service", "Shipping & Returns"]
                : ["Contact Us", "Wholesale"]
              ).map((link) => (
                <li key={link}>
                  <a
                    className="font-body text-body-md text-secondary-fixed-dim/70 hover:text-accent-lime hover:underline decoration-accent-lime underline-offset-8 transition-all"
                    href="#"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-display text-body-md font-bold mb-6 text-surface-white uppercase tracking-wider">
            NEWSLETTER
          </h4>
          <form onSubmit={handleSubscribe} className="flex gap-2 relative">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-tertiary-container border-none rounded-full px-6 py-3 w-full text-surface-white placeholder-on-tertiary-container focus:ring-1 focus:ring-accent-lime outline-none"
              placeholder="Email address"
              type="email"
              required
              disabled={loading || status === "success"}
            />
            <Button
              type="submit"
              variant="secondary"
              className="p-3"
              disabled={loading || status === "success"}
            >
              <Send className="w-5 h-5" />
            </Button>

            {status === "success" && (
              <span className="absolute -bottom-8 left-4 text-xs text-accent-lime font-bold">
                Subscribed successfully!
              </span>
            )}
            {status === "error" && (
              <span className="absolute -bottom-8 left-4 text-xs text-red-400 font-bold">
                Failed to subscribe. Try again.
              </span>
            )}
          </form>
        </div>
      </div>

      <div className="border-t border-surface-white/10 max-w-7xl mx-auto py-8 px-page-margin-mobile md:px-page-margin-desktop flex flex-col md:flex-row justify-between items-center gap-4 text-secondary-fixed-dim/50 font-body text-body-sm">
        <span>© 2026 DIVERSIFIED Y&P. All rights reserved.</span>
        <div className="flex gap-6">
          {["Instagram", "X", "LinkedIn"].map((social) => (
            <span
              key={social}
              className="hover:text-accent-lime cursor-pointer transition-colors px-2"
            >
              {social}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
