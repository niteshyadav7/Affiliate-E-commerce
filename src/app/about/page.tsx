import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Masks from "@/components/Masks";
import type { Metadata } from "next";
import { ShoppingBag, Sparkles, ShieldCheck, Users, Globe, Zap, Search, CheckCircle, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - DIVERSIFIED Y&P",
  description:
    "Learn about DIVERSIFIED Y&P — your trusted destination for premium curated products. Discover our story, mission, values, and commitment to excellence.",
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
            <span className="text-[10px] font-bold text-accent-coral uppercase tracking-widest">Our Story</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary tracking-tight mt-3">
              About DIVERSIFIED Y&P
            </h1>
            <p className="font-body text-body-lg text-secondary mt-4 max-w-2xl mx-auto leading-relaxed">
              A premium shopping destination where quality meets curation. We handpick the finest products across electronics, fashion, gadgets, and lifestyle — so you don&apos;t have to.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-surface-container shadow-sm mb-8 relative overflow-hidden grain-texture">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent-coral via-primary to-accent-lime" />

            <div className="prose prose-slate max-w-none text-secondary leading-relaxed font-body text-body-lg space-y-8">
              <h2 className="font-display text-headline-md text-primary font-bold pt-2">
                Our Mission
              </h2>
              <p>
                At <strong>DIVERSIFIED Y&P</strong>, our mission is to simplify the modern shopping experience. In a digital marketplace overflowing with millions of products, finding something truly exceptional shouldn&apos;t require hours of searching, comparing, and second-guessing. We exist to be the trusted filter between the overwhelming sea of choices and your ideal purchase.
              </p>
              <p>
                Every product featured on our platform has been carefully evaluated by our curation team across multiple criteria including design excellence, build quality, functionality, customer reviews, and value for money. We believe that shopping should be effortless, enjoyable, and rewarding.
              </p>

              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                Our Story
              </h2>
              <p>
                DIVERSIFIED Y&P was founded with a simple yet powerful idea: <em>what if there was a store that only carried the best?</em> Not the cheapest. Not the most popular. But the very best — products that combine exceptional design, reliable performance, and genuine value.
              </p>
              <p>
                Starting as a small project driven by a passion for great products and clean design, DIVERSIFIED Y&P has grown into a full-fledged curated shopping platform trusted by customers who value quality above all else. Our name reflects our philosophy — &quot;Diversified&quot; in our product range, united by an unwavering standard of &quot;Young &amp; Premium&quot; quality.
              </p>

              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                What Sets Us Apart
              </h2>
              <p>
                Unlike mass-market retailers that list everything under the sun, we take a fundamentally different approach:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Curated, Not Crowded:</strong> Every item in our catalog is hand-selected. We intentionally keep our collection focused so that every product meets our strict quality criteria.</li>
                <li><strong>Design-First Philosophy:</strong> We believe great products should look as good as they perform. Our curation prioritizes aesthetics, ergonomics, and modern design sensibilities.</li>
                <li><strong>Transparent & Honest:</strong> No inflated reviews, no misleading descriptions. We present products with honest, accurate information so you can make confident decisions.</li>
                <li><strong>Customer-Centric Service:</strong> From seamless browsing to responsive customer support, every touchpoint is designed to deliver a premium experience.</li>
              </ul>
            </div>
          </div>

          {/* New Section: Curation Framework & Trust Guarantee */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Left: 4-Step Curatorial Framework */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-surface-container shadow-sm grain-texture relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
              <h3 className="font-display text-2xl font-bold text-primary mb-6">Our Curation &amp; Quality Standard</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10 shrink-0 mt-0.5">
                    <Search className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-primary text-body-md mb-1">1. Research &amp; Market Discovery</h4>
                    <p className="font-body text-body-sm text-secondary leading-relaxed">
                      We monitor worldwide design trends, tech journals, and customer feedback pools to discover exceptional products before they hit mainstream markets.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start border-t border-surface-container pt-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10 shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-primary text-body-md mb-1">2. Rigorous Physical Testing</h4>
                    <p className="font-body text-body-sm text-secondary leading-relaxed">
                      Sample units are procured and tested for build quality, structural integrity, material longevity, and ease of use in real-world everyday settings.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start border-t border-surface-container pt-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10 shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-primary text-body-md mb-1">3. Aesthetic &amp; Ergonomic Assessment</h4>
                    <p className="font-body text-body-sm text-secondary leading-relaxed">
                      We evaluate visual harmony, packaging design, user interface comfort, and overall styling to ensure it matches the premium aesthetic standard.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start border-t border-surface-container pt-4">
                  <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10 shrink-0 mt-0.5">
                    <Award className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-primary text-body-md mb-1">4. Value Validation &amp; Approval</h4>
                    <p className="font-body text-body-sm text-secondary leading-relaxed">
                      Pricing structures are verified with suppliers to make sure they represent genuine value-for-money before receiving the DIVERSIFIED stamp.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Security & Trust Banner */}
            <div className="lg:col-span-5 bg-gradient-to-br from-primary to-primary-container text-white rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden shadow-sm">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,var(--color-accent-lime),transparent_55%)] opacity-20" />
              
              <div className="space-y-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-accent-lime" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">100% Authenticity Guarantee</h3>
                  <p className="font-body text-body-sm text-white/80 leading-relaxed">
                    At DIVERSIFIED Y&amp;P, we stand firmly behind the authenticity of our entire inventory. We maintain direct partnerships with registered manufacturers, verified distributors, and authorized brand owners. 
                  </p>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <h4 className="font-display font-bold text-white text-body-sm mb-1">No Counterfeits. Ever.</h4>
                  <p className="font-body text-body-xs text-white/70">
                    Every product is shipped in original retail packaging containing serial tracking numbers and manufacturer warranty certifications.
                  </p>
                </div>
              </div>

              <div className="mt-8 border border-white/15 bg-white/5 rounded-2xl p-4 relative z-10">
                <p className="font-body text-[11px] text-white/70 leading-normal">
                  🔐 <strong>Shopping Security:</strong> Our payments infrastructure complies fully with PCI-DSS protocols, ensuring your transactional metadata is fully encrypted at all times.
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
              <h3 className="font-display font-bold text-primary text-body-md">Quality First</h3>
              <p className="font-body text-body-sm text-secondary leading-relaxed">
                Every product undergoes rigorous evaluation for build quality, design integrity, and real-world performance before it earns a place in our catalog.
              </p>
            </div>

            <div className="bg-white border border-surface-container rounded-2xl p-6 text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto border border-primary/10">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-primary text-body-md">Trust & Transparency</h3>
              <p className="font-body text-body-sm text-secondary leading-relaxed">
                Honest product information, clear pricing with no hidden fees, and transparent policies. We build long-term trust with every interaction.
              </p>
            </div>

            <div className="bg-white border border-surface-container rounded-2xl p-6 text-center space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto border border-primary/10">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-primary text-body-md">Innovation Driven</h3>
              <p className="font-body text-body-sm text-secondary leading-relaxed">
                We continuously monitor emerging trends, technologies, and customer feedback to keep our collection fresh, relevant, and ahead of the curve.
              </p>
            </div>
          </div>

          {/* Stats / Highlights */}
          <div className="bg-primary rounded-3xl p-8 md:p-10 mb-8 text-center">
            <h3 className="font-display text-2xl font-bold text-white mb-8">Our Impact in Numbers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="font-display text-3xl md:text-4xl font-bold text-accent-lime">500+</p>
                <p className="font-body text-body-sm text-white/70 mt-1">Curated Products</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl font-bold text-accent-lime">50+</p>
                <p className="font-body text-body-sm text-white/70 mt-1">Premium Brands</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl font-bold text-accent-lime">10K+</p>
                <p className="font-body text-body-sm text-white/70 mt-1">Happy Customers</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl font-bold text-accent-lime">4.8★</p>
                <p className="font-body text-body-sm text-white/70 mt-1">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-surface-container shadow-sm mb-8 grain-texture relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-lime to-primary" />
            <h3 className="font-display text-2xl font-bold text-primary mb-6 pt-2">Product Categories We Curate</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-body text-body-lg text-secondary leading-relaxed">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center border border-surface-container shrink-0">
                  <ShoppingBag className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-primary text-body-md mb-1">Electronics & Tech</h4>
                  <p className="text-body-sm text-secondary">Smartphones, laptops, audio gear, smartwatches, and cutting-edge gadgets from world-renowned brands.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center border border-surface-container shrink-0">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-primary text-body-md mb-1">Fashion & Apparel</h4>
                  <p className="text-body-sm text-secondary">Curated clothing, footwear, eyewear, and accessories that blend style with comfort and durability.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center border border-surface-container shrink-0">
                  <Globe className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-primary text-body-md mb-1">Lifestyle & Home</h4>
                  <p className="text-body-sm text-secondary">Home décor, kitchen essentials, fitness equipment, and everyday lifestyle upgrades for modern living.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center border border-surface-container shrink-0">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-primary text-body-md mb-1">Gadgets & Accessories</h4>
                  <p className="text-body-sm text-secondary">Innovative tech accessories, phone cases, charging solutions, and smart home devices that simplify daily routines.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center py-8">
            <p className="font-body text-body-lg text-secondary mb-4">
              Have questions or want to collaborate with us?
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
