import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Masks from "@/components/Masks";
import AdBanner from "@/components/molecules/AdBanner";
import ContactForm from "@/components/organisms/ContactForm";
import type { Metadata } from "next";
import { Mail, ShieldCheck, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us - DIVERSIFIED Y&P",
  description: "Get in touch with the team at DIVERSIFIED Y&P. Submit a message or view FAQs.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between">
      <div>
        <Masks />
        <Navbar />

        <main className="pt-[140px] pb-16 px-page-margin-mobile md:px-page-margin-desktop max-w-6xl mx-auto relative z-20">
          
          {/* Header Block */}
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold text-accent-coral uppercase tracking-widest">Get In Touch</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary tracking-tight mt-2">
              Contact Our Team
            </h1>
            <p className="font-body text-body-md text-secondary mt-3 max-w-xl mx-auto leading-relaxed">
              We’re here to assist you with any general inquiries, support requests, or partnership opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            {/* Left Side: Support Channels Info */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white border border-surface-container rounded-3xl p-6 shadow-sm space-y-6 grain-texture relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
                
                <div>
                  <h3 className="font-display text-lg font-bold text-primary mb-1">Direct Channels</h3>
                  <p className="font-body text-xs text-secondary">
                    Drop us an email at any of our specialized mailboxes:
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10 shrink-0">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display text-body-sm font-bold text-primary uppercase tracking-wider mb-0.5">Support & General</h4>
                      <p className="font-body text-[11px] text-secondary leading-normal mb-1">
                        For all support, product issues, or general recommendations.
                      </p>
                      <a href="mailto:contact@yandp.in" className="font-body text-xs text-primary font-bold hover:underline">
                        contact@yandp.in
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start border-t border-surface-container pt-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10 shrink-0">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display text-body-sm font-bold text-primary uppercase tracking-wider mb-0.5">Brand Partnership</h4>
                      <p className="font-body text-[11px] text-secondary leading-normal mb-1">
                        Premium brands interested in placement or product curation.
                      </p>
                      <a href="mailto:partners@yandp.in" className="font-body text-xs text-primary font-bold hover:underline">
                        partners@yandp.in
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start border-t border-surface-container pt-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10 shrink-0">
                      <HelpCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-display text-body-sm font-bold text-primary uppercase tracking-wider mb-0.5">Help & Feedback</h4>
                      <p className="font-body text-[11px] text-secondary leading-normal mb-1">
                        Spotted any issues or want to suggest custom improvements?
                      </p>
                      <a href="mailto:feedback@yandp.in" className="font-body text-xs text-primary font-bold hover:underline">
                        feedback@yandp.in
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Interactive Nodemailer Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>

          {/* Bottom Side: FAQs Section */}
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-surface-container shadow-sm mb-12">
            <h3 className="font-display text-2xl font-bold text-primary mb-6">
              Frequently Asked Questions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-body">
              <div>
                <h4 className="font-display font-bold text-primary text-body-lg mb-2">
                  How can I track my order?
                </h4>
                <p className="text-body-md text-secondary leading-relaxed">
                  Once your order is processed, you will receive a direct email confirmation containing your shipping carrier details and live tracking number. You can use this to monitor your package from our warehouse straight to your doorstep.
                </p>
              </div>
              
              <div>
                <h4 className="font-display font-bold text-primary text-body-lg mb-2">
                  Do you ship internationally?
                </h4>
                <p className="text-body-md text-secondary leading-relaxed">
                  Yes, we support shipping to major international destinations. Available shipping methods, customs handling, and estimated transit times will be computed dynamically at checkout based on your delivery address.
                </p>
              </div>
            </div>
          </div>


        </main>
      </div>
      <Footer />
    </div>
  );
}
