import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Masks from "@/components/Masks";
import type { Metadata } from "next";
import { ShoppingBag, Sparkles, ShieldCheck, Users, Globe, Zap, Search, CheckCircle, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - DIVERSIFIED Y&P",
  description:
    "Learn about DIVERSIFIED Y&P — your premium curated e-commerce catalog and product discovery engine. Discover our story, redirect model, and commitment to transparent shopping curation.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between">
      <div>
        <Masks />
        <Navbar />

        <main className="pt-[140px] pb-16 px-page-margin-mobile md:px-page-margin-desktop max-w-5xl mx-auto relative z-20">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold text-accent-coral uppercase tracking-widest">Our Concept</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary tracking-tight mt-3">
              About DIVERSIFIED Y&P
            </h1>
            <p className="font-body text-body-lg text-secondary mt-4 max-w-2xl mx-auto leading-relaxed">
              A premium shopping search and curation engine. We aggregate and showcase high-end products across multiple categories, directing you instantly to verified merchants for a secure checkout.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-surface-container shadow-sm mb-8 relative overflow-hidden grain-texture">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent-coral via-primary to-accent-lime" />

            <div className="prose prose-slate max-w-none text-secondary leading-relaxed font-body text-body-lg space-y-8">
              <h2 className="font-display text-headline-md text-primary font-bold pt-2">
                Our Mission & Curation Model
              </h2>
              <p>
                At <strong>DIVERSIFIED Y&P</strong>, our mission is to redefine the e-commerce discovery process. In a digital world crowded with millions of products, finding high-quality, elegant, and premium items shouldn&apos;t require endless hours of sorting, searching, and second-guessing. We function as a **highly-refined visual filter** between global online marketplaces and your lifestyle.
              </p>
              <p>
                We do not stock inventory or operate physical warehouses. Instead, our expert curation team continuously reviews premium products from across the digital landscape. When you discover an item you love on our platform, we instantly route you directly to the official merchant or marketplace (such as Amazon, Chupps, and other major platforms) to complete your transaction with confidence on their secure payment systems.
              </p>

              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                The Affiliate Storefront & Redirect Philosophy
              </h2>
              <p>
                DIVERSIFIED Y&P was founded on a simple concept: <em>what if shopping search could be beautiful?</em> We curate top-tier gadgets, electronics, fashion, and lifestyle items. To keep our curation unbiased, clean, and fully operational, we monetize through a combination of display advertisements (such as Google AdSense) and premium affiliate referral relationships. 
              </p>
              <p>
                When you click a &quot;Buy Now&quot; or details link on our website, you are securely redirected to the verified partner store hosting the product. If you decide to make a purchase, we may receive a small referral commission at absolutely zero additional cost to you. This transparent model allows us to focus entirely on visual presentation, product analysis, and design curation.
              </p>

              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                What Sets Us Unified
              </h2>
              <p>
                Unlike mass-market search directories or cluttered ad boards, we provide a structured, premium catalog experience:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Curated Collections:</strong> Every listing is hand-chosen for its material quality, customer trust, and aesthetic merit.</li>
                <li><strong>Direct Verified Redirection:</strong> We link only to official brand stores, authorized resellers, or trusted major platforms to ensure you always purchase genuine products.</li>
                <li><strong>Clean, Ad-Safe Design:</strong> Our interface is optimized for speed, visual beauty, and high-fidelity navigation, ensuring standard-compliant integration with display ads.</li>
                <li><strong>No Markups or Fees:</strong> We do not sell anything directly. The prices you see correspond to the direct store prices, with zero markups from our end.</li>
              </ul>
            </div>
          </div>

          {/* Curation Framework & Redirection Integrity */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Left: 4-Step Curatorial Framework */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-surface-container shadow-sm grain-texture relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
              <h3 className="font-display text-2xl font-bold text-primary mb-6">Our Curation &amp; Link Standard</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10 shrink-0 mt-0.5">
                    <Search className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-primary text-body-md mb-1">1. Aggregation &amp; Market Research</h4>
                    <p className="font-body text-body-sm text-secondary leading-relaxed">
                      We scour global e-commerce platforms, tech catalogs, and consumer reviews to identify top-tier trending items that deserve your attention.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start border-t border-surface-container pt-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10 shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-primary text-body-md mb-1">2. Redirection &amp; Merchant Verification</h4>
                    <p className="font-body text-body-sm text-secondary leading-relaxed">
                      We check each landing page, merchant reputation, and refund policy of the target storefront to guarantee a safe purchasing journey.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start border-t border-surface-container pt-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10 shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-primary text-body-md mb-1">3. Aesthetic Presentation</h4>
                    <p className="font-body text-body-sm text-secondary leading-relaxed">
                      Our catalog design isolates clutter, presenting high-resolution images and clear descriptions in a beautiful, premium visual canvas.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start border-t border-surface-container pt-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10 shrink-0 mt-0.5">
                    <Award className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-primary text-body-md mb-1">4. Link Optimization &amp; Curation</h4>
                    <p className="font-body text-body-sm text-secondary leading-relaxed">
                      We maintain dynamic round-robin referral paths to distribute user clicks directly to the most reliable available merchant offers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Redirection Integrity & Transparency */}
            <div className="lg:col-span-5 bg-gradient-to-br from-primary to-primary-container text-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,var(--color-accent-lime),transparent_55%)] opacity-20" />
              
              <div className="space-y-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-accent-lime" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">Redirection Transparency</h3>
                  <p className="font-body text-body-sm text-white/80 leading-relaxed">
                    At DIVERSIFIED Y&amp;P, we guarantee absolute honesty regarding our commercial setup. We do not charge user registration fees, process payments, or house inventory.
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <h4 className="font-display font-bold text-white text-body-sm mb-1">Affiliate Redirection Model</h4>
                  <p className="font-body text-body-xs text-white/70">
                    Your purchase takes place entirely on the destination platform. For issues regarding shipping, item defects, or payment refunds, please contact the merchant where checkout occurred.
                  </p>
                </div>
              </div>

              <div className="mt-8 border border-white/15 bg-white/5 rounded-2xl p-4 relative z-10">
                <p className="font-body text-[11px] text-white/70 leading-normal">
                  🔒 <strong>Redirection Safety:</strong> All outgoing redirect URLs are fully encrypted and periodically audited to protect your device from spam or malicious redirect paths.
                </p>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white border border-surface-container rounded-2xl p-6 text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto border border-primary/10">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-primary text-body-md">Honest Curation</h3>
              <p className="font-body text-body-sm text-secondary leading-relaxed">
                We only display high-rating products backed by positive reviews and design merit from leading online platforms.
              </p>
            </div>

            <div className="bg-white border border-surface-container rounded-2xl p-6 text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto border border-primary/10">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-primary text-body-md">Commercial Clarity</h3>
              <p className="font-body text-body-sm text-secondary leading-relaxed">
                Full transparency about our display ads and affiliate revenue model. We never charge additional markup or hide affiliate links.
              </p>
            </div>

            <div className="bg-white border border-surface-container rounded-2xl p-6 text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto border border-primary/10">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-primary text-body-md">Speed &amp; Safety</h3>
              <p className="font-body text-body-sm text-secondary leading-relaxed">
                A seamless, lightning-fast browsing layer that redirects users directly to their destination securely, with zero clutter.
              </p>
            </div>
          </div>

          {/* Stats / Highlights */}
          <div className="bg-primary rounded-3xl p-8 md:p-10 mb-8 text-center">
            <h3 className="font-display text-2xl font-bold text-white mb-8">Our Impact in Numbers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="font-display text-3xl md:text-4xl font-bold text-accent-lime">1000+</p>
                <p className="font-body text-body-sm text-white/70 mt-1">Curated Products</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl font-bold text-accent-lime">20+</p>
                <p className="font-body text-body-sm text-white/70 mt-1">Verified Retailers</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl font-bold text-accent-lime">50K+</p>
                <p className="font-body text-body-sm text-white/70 mt-1">Monthly Redirects</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl font-bold text-accent-lime">100%</p>
                <p className="font-body text-body-sm text-white/70 mt-1">Free to Browse</p>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-surface-container shadow-sm mb-8 grain-texture relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-lime to-primary" />
            <h3 className="font-display text-2xl font-bold text-primary mb-6 pt-2">Product Collections We Highlight</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-body text-body-lg text-secondary leading-relaxed">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center border border-surface-container shrink-0">
                  <ShoppingBag className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-primary text-body-md mb-1">Electronics & Tech</h4>
                  <p className="text-body-sm text-secondary">A highly curated pool of laptops, smart devices, wearable tech, and premium accessories compiled from trusted tech stores.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center border border-surface-container shrink-0">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-primary text-body-md mb-1">Fashion & Style</h4>
                  <p className="text-body-sm text-secondary">Premium-grade clothing, designer footwear, and accessories recommended based on style, quality, and consumer reviews.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center border border-surface-container shrink-0">
                  <Globe className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-primary text-body-md mb-1">Modern Home & Lifestyle</h4>
                  <p className="text-body-sm text-secondary">Curated home goods, kitchenware, and creative organizational solutions that upgrade your physical spaces elegantly.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center border border-surface-container shrink-0">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-primary text-body-md mb-1">Gadgets & Novelties</h4>
                  <p className="text-body-sm text-secondary">Innovative charging stands, smart lighting elements, and functional everyday-carry items sourced from the web.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <p className="font-body text-body-lg text-secondary mb-4">
              Have questions, feedback, or want to list your brand&apos;s products?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white rounded-full font-body text-body-sm font-bold hover:shadow-lg transition-all"
            >
              Get In Touch →
            </a>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
