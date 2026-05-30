import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Masks from "@/components/Masks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - DIVERSIFIED Y&P",
  description:
    "Read the complete Terms of Service for DIVERSIFIED Y&P. Understand our curated catalog search engine model, transaction redirection, and general guidelines.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between">
      <div>
        <Masks />
        <Navbar />

        <main className="pt-[140px] pb-16 px-page-margin-mobile md:px-page-margin-desktop max-w-4xl mx-auto relative z-20">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-surface-container shadow-sm mb-12 relative overflow-hidden grain-texture">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent-coral to-accent-lime" />

            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-2 tracking-tight">
              Terms of Service
            </h1>
            <p className="font-body text-body-sm text-secondary mb-10">
              Effective Date: May 30, 2026 &nbsp;|&nbsp; Last Updated: May 30, 2026
            </p>

            <div className="prose prose-slate max-w-none text-secondary leading-relaxed font-body text-body-lg space-y-8">
              {/* Introduction */}
              <p>
                Welcome to <strong>DIVERSIFIED Y&P</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), accessible at{" "}
                <strong>yandp.in</strong>. These Terms of Service (&quot;Terms&quot;) govern your access to and use of our website, catalog search engine, recommendations, and curated content.
              </p>
              <p>
                By browsing, accessing, or using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, along with our <a href="/privacy-policy" className="text-primary underline font-bold">Privacy Policy</a>. If you do not agree to these terms, please do not use our website.
              </p>

              {/* Section 1 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                1. Acceptance of Terms
              </h2>
              <p>
                These Terms apply to all visitors, users, and others who access our premium product discovery platform. If you are using this website on behalf of a business, you warrant that you are authorized to bind that business entity to these Terms.
              </p>

              {/* Section 2 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                2. Nature of Service: Curated Affiliate Directory
              </h2>
              <p>
                DIVERSIFIED Y&P is **not a retail store or a merchant of record**. We do not sell items directly, process checkout operations, handle inventory, or manufacture goods. 
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Our website aggregates, highlights, and reviews curated premium-grade products from various external e-commerce brands and marketplaces.</li>
                <li>Any product images, specifications, features, and pricing details displayed on our catalog are for informational and curation purposes. </li>
                <li>While we strive to display accurate pricing and description metadata, we do not warrant that product descriptions, pricing, color coordinates, or stock levels on our directory are error-free, complete, or up-to-date. The definitive details are always those found on the target merchant storefront.</li>
              </ul>

              {/* Section 3 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                3. Redirection &amp; Transaction Policies
              </h2>
              <p>
                All purchases and checkouts occur outside our website. When you click details, &quot;Buy Now&quot;, or redirection links, you are securely transferred to the official third-party storefront of the merchant hosting the product (e.g., Amazon, Chupps, and other partner brands).
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>No Direct Sales:</strong> We do not collect payment credentials, process orders, or host shopping cart checkouts. </li>
                <li><strong>Merchant Terms Governed:</strong> The actual contract of sale, payment processing, shipping times, delivery schedules, logistics, product warranty, refunds, cancellations, and returns exist exclusively and solely between you and the respective third-party merchant.</li>
                <li><strong>Customer Support:</strong> Any issues, inquiries, or complaints concerning product defects, non-delivery, payment errors, returns, or refunds must be directed to the customer service department of the merchant where the actual transaction was processed. DIVERSIFIED Y&P has no authority to intervene in third-party retail disputes.</li>
              </ul>

              {/* Section 4 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                4. Affiliate &amp; Ad Disclosure
              </h2>
              <p>
                To maintain a free visual catalog, DIVERSIFIED Y&P participates in display ad networks (including Google AdSense) and affiliate marketing programs. 
              </p>
              <p>
                This means that some outgoing links may contain referral tokens. If you complete a transaction on the partner merchant website, we may receive a referral commission at absolutely **no additional charge or markup to you**. The presence of an affiliate link does not constitute a direct endorsement of the merchant&apos;s secondary offerings.
              </p>

              {/* Section 5 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                5. Intellectual Property
              </h2>
              <p>
                All proprietary layout codes, text styling, brand symbols, custom SVG marks (such as the DIVERSIFIED Y&amp;P logo), and UI design elements are the exclusive intellectual property of DIVERSIFIED Y&P and are protected by copyright and trade laws.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You may not copy, scraping, modify, reproduce, or frame any portion of our design or text elements without explicit prior written authorization.</li>
                <li>All product photographs, third-party logos, manufacturer trademarks, and brand names referenced in our catalog belong entirely to their respective copyright and trademark owners. They are used on our platform solely for reference, curation, and descriptive purposes.</li>
              </ul>

              {/* Section 6 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                6. User Conduct &amp; Prohibitions
              </h2>
              <p>
                When interacting with our catalog and redirection systems, you agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use automated scripts, web scrapers, spiders, or bots to harvest catalog metadata without our consent.</li>
                <li>Inject malicious code, scripts, spyware, or attempt unauthorized port entries to disrupt server stability.</li>
                <li>Misrepresent yourself or spam our newsletter signup or customer contact forms.</li>
              </ul>

              {/* Section 7 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                7. Disclaimer of Warranties
              </h2>
              <p>
                The website, curated listings, outward links, and metadata are provided on an **&quot;AS IS&quot; and &quot;AS AVAILABLE&quot;** basis. DIVERSIFIED Y&P makes no warranties, express or implied, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Implied warranties of merchantability, fitness for a specific purchase, or product authenticity of items listed by third parties.</li>
                <li>Warranties that the outward redirect URLs are permanently online, secure, or free from merchant errors.</li>
                <li>Warranties that merchant websites comply fully with standard customer safety regulations.</li>
              </ul>

              {/* Section 8 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                8. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by applicable law, DIVERSIFIED Y&P, its owners, developers, and writers shall not be held liable for any direct, indirect, incidental, consequential, special, or punitive damages (including loss of profits, data corruption, or failed transactions) arising out of or related to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your use or inability to navigate our product directory.</li>
                <li>Any transaction conducted on a third-party merchant site after clicking a redirect link.</li>
                <li>Defective items, shipping failures, or pricing discrepancies on third-party sites.</li>
              </ul>

              {/* Section 9 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                9. Governing Law &amp; Jurisdiction
              </h2>
              <p>
                These Terms of Service are governed by and interpreted in accordance with the laws of India. Any legal disputes or claims arising out of these Terms shall be subject to the exclusive jurisdiction of the courts located in India.
              </p>

              {/* Section 10 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                10. Changes to Terms
              </h2>
              <p>
                We reserve the right to amend these Terms of Service at any time. Updates will be posted on this page with an updated &quot;Last Updated&quot; marker. Your continued browsing of our storefront constitutes acceptance of the amended terms.
              </p>

              {/* Section 11 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                11. Contact Us
              </h2>
              <p>
                For any queries regarding these Terms of Service, please contact:
              </p>
              <div className="bg-surface-container-low p-6 rounded-2xl border border-surface-container space-y-2 not-prose">
                <p className="font-display font-bold text-primary text-body-md">DIVERSIFIED Y&P</p>
                <p className="font-body text-body-sm text-secondary">Website: <a href="https://yandp.in" className="text-primary font-bold hover:underline">yandp.in</a></p>
                <p className="font-body text-body-sm text-secondary">Email: <a href="mailto:contact@yandp.in" className="text-primary font-bold hover:underline">contact@yandp.in</a></p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
