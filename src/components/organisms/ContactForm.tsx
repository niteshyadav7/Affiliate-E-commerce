"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, User, Mail, FileText, MessageSquare } from "lucide-react";
import Button from "@/components/atoms/Button";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        const data = await res.json();
        setErrorMessage(data.error || "Failed to send message. Please try again.");
        setStatus("error");
      }
    } catch (error) {
      setErrorMessage("An unexpected network error occurred.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-white border border-surface-container rounded-3xl p-8 text-center flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in-95 duration-500 min-h-[400px]">
        <div className="w-16 h-16 rounded-full bg-accent-lime/10 flex items-center justify-center border border-accent-lime/30 mb-2">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-display text-2xl font-bold text-primary">Message Sent Successfully!</h3>
        <p className="font-body text-secondary text-sm max-w-sm leading-relaxed">
          Thank you for reaching out. We have sent a confirmation email to you, and our team will get back to you shortly.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 px-6 py-2.5 rounded-full bg-primary text-white font-body text-xs font-bold hover:shadow-lg transition-all"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white border border-surface-container rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden grain-texture">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-lime via-primary to-accent-coral" />
      
      <div className="mb-6">
        <h3 className="font-display text-xl font-bold text-primary">Send Us a Message</h3>
        <p className="font-body text-xs text-secondary mt-1">
          Have queries or feedback? Drop us a line below and we'll reply shortly.
        </p>
      </div>

      {status === "error" && (
        <div className="mb-6 bg-red-50 border border-red-100 rounded-xl p-4 flex items-start gap-3 text-red-700 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span className="font-body leading-relaxed">{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name input */}
        <div>
          <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              disabled={status === "loading"}
              className="w-full pl-11 pr-4 py-3 bg-surface rounded-xl border border-outline/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-primary text-xs font-body"
              required
            />
          </div>
        </div>

        {/* Email input */}
        <div>
          <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              disabled={status === "loading"}
              className="w-full pl-11 pr-4 py-3 bg-surface rounded-xl border border-outline/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-primary text-xs font-body"
              required
            />
          </div>
        </div>

        {/* Subject input */}
        <div>
          <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
            Subject
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">
              <FileText className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What is this regarding?"
              disabled={status === "loading"}
              className="w-full pl-11 pr-4 py-3 bg-surface rounded-xl border border-outline/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-primary text-xs font-body"
              required
            />
          </div>
        </div>

        {/* Message input */}
        <div>
          <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-1.5">
            Message Content
          </label>
          <div className="relative">
            <div className="absolute left-4 top-4 text-primary/40">
              <MessageSquare className="w-4 h-4" />
            </div>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              disabled={status === "loading"}
              className="w-full pl-11 pr-4 py-3 bg-surface rounded-xl border border-outline/20 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-primary text-xs font-body min-h-[100px]"
              required
            />
          </div>
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          variant="primary"
          disabled={status === "loading"}
          className="w-full flex justify-center items-center gap-2 text-white font-extrabold cursor-pointer py-3.5 mt-2"
        >
          {status === "loading" ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
