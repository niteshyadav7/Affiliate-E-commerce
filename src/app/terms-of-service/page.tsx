import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Masks from "@/components/Masks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - DIVERSIFIED Y&P",
  description:
    "Read the complete Terms of Service for DIVERSIFIED Y&P. Understand the rules, guidelines, and conditions governing your use of our website.",
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
              Effective Date: May 24, 2026 &nbsp;|&nbsp; Last Updated: May 24, 2026
            </p>

            <div className="prose prose-slate max-w-none text-secondary leading-relaxed font-body text-body-lg space-y-8">
              {/* Introduction */}
              <p>
                Welcome to <strong>DIVERSIFIED Y&P</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), accessible at{" "}
                <strong>yandp.in</strong>. These Terms of Service (&quot;Terms&quot;) govern your access to and use of our website, services, and content. By accessing or using our website, you agree to be bound by these Terms. If you do not agree, please do not use our services.
              </p>

              {/* Section 1 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                1. Acceptance of Terms
              </h2>
              <p>
                By browsing, accessing, or making a purchase on our website, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, along with our <a href="/privacy-policy" className="text-primary underline font-bold">Privacy Policy</a>. These Terms apply to all visitors, users, and others who access or use our platform.
              </p>
              <p>
                If you are using this website on behalf of a business or organization, you represent and warrant that you have the authority to bind that entity to these Terms.
              </p>

              {/* Section 2 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                2. Eligibility
              </h2>
              <p>
                You must be at least 18 years of age, or the age of legal majority in your jurisdiction, to use our website and services. By using our website, you represent and warrant that you meet these eligibility requirements.
              </p>

              {/* Section 3 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                3. Products & Services
              </h2>
              <p>
                DIVERSIFIED Y&P is a curated premium shopping storefront that showcases high-quality electronics, gadgets, fashion, and lifestyle products.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All product images, descriptions, and pricing displayed on our website are provided as accurately as possible. However, we do not guarantee that product descriptions, colors, pricing, or other content on the site are error-free, complete, or current.</li>
                <li>We reserve the right to modify, discontinue, or update any product or service offered on our platform at any time without prior notice.</li>
                <li>Product availability is subject to change based on stock levels, supplier updates, and seasonal variations.</li>
                <li>Prices displayed on our website are in the currency specified on the product page and may be subject to applicable taxes and shipping fees calculated at checkout.</li>
              </ul>

              {/* Section 4 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                4. Orders & Payments
              </h2>
              <p>
                When you place an order through our website:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You agree to provide accurate, complete, and current purchase and account information.</li>
                <li>We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product descriptions, or suspected fraudulent activity.</li>
                <li>All payments are processed through secure, industry-standard payment gateways. We do not store your credit card or banking information on our servers.</li>
              </ul>

              {/* Section 5 */}
              <h2 id="shipping" className="font-display text-headline-md text-primary font-bold pt-4">
                5. Shipping & Delivery Policy
              </h2>
              <p>
                We are committed to delivering your products safely and promptly:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Processing Time:</strong> Orders are processed within 1–3 business days from the date of purchase confirmation.</li>
                <li><strong>Shipping Methods:</strong> We partner with reputable logistics carriers to ensure timely and trackable deliveries. Available shipping methods and estimated delivery times are displayed during the checkout process.</li>
                <li><strong>Shipping Fees:</strong> Shipping costs are calculated based on the delivery address, package weight, and selected shipping method, and are displayed before order confirmation.</li>
                <li><strong>Tracking:</strong> Once your order has been shipped, you will receive an email with your tracking number and carrier information to monitor your delivery in real time.</li>
                <li><strong>International Shipping:</strong> We offer shipping to select international destinations. Import duties, taxes, and customs fees may apply and are the responsibility of the buyer.</li>
              </ul>

              {/* Section 6 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                6. Returns, Refunds & Exchanges
              </h2>
              <p>
                We want you to be completely satisfied with your purchase:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Return Window:</strong> You may initiate a return within 30 days of receiving your order.</li>
                <li><strong>Condition:</strong> Items must be returned in their original packaging, unused, and in the same condition as received.</li>
                <li><strong>Process:</strong> To initiate a return or exchange, please contact our support team at <a href="mailto:contact@yandp.in" className="text-primary underline font-bold">contact@yandp.in</a> with your order number and reason for return.</li>
                <li><strong>Refunds:</strong> Once the returned item is received and inspected, a refund will be processed to your original payment method within 7–10 business days.</li>
                <li><strong>Non-Returnable Items:</strong> Certain categories of products (e.g., personalized items, intimate apparel, perishable goods) may not be eligible for returns. Such exceptions will be clearly noted on the product page.</li>
              </ul>

              {/* Section 7 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                7. Intellectual Property
              </h2>
              <p>
                All content on this website, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, data compilations, software, and the design and arrangement thereof, is the exclusive property of DIVERSIFIED Y&P or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You may not reproduce, distribute, modify, create derivative works from, publicly display, or exploit any content from our website without our prior written consent.</li>
                <li>Product names, brand trademarks, and manufacturer-owned images referenced on our platform belong to their respective owners and are used for descriptive and identification purposes only.</li>
              </ul>

              {/* Section 8 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                8. User Conduct
              </h2>
              <p>
                When using our website, you agree not to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Use the site for any unlawful purpose or in violation of any local, state, national, or international law.</li>
                <li>Attempt to gain unauthorized access to any portion of the website, other accounts, computer systems, or networks connected to the website.</li>
                <li>Interfere with or disrupt the website or servers or networks connected to the website.</li>
                <li>Use any automated means (bots, scrapers, spiders) to access the website for any purpose without our express written permission.</li>
                <li>Transmit any viruses, malware, or other harmful or disruptive code.</li>
              </ul>

              {/* Section 9 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                9. Third-Party Advertisements
              </h2>
              <p>
                Our website displays advertisements provided by third-party advertising networks, including Google AdSense. These ads may be based on your browsing activity and are subject to the privacy policies and terms of the respective advertising providers. We are not responsible for the content, accuracy, or practices of third-party advertisers.
              </p>

              {/* Section 10 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                10. Disclaimer of Warranties
              </h2>
              <p>
                Our website and all content, products, and services provided through it are offered on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without any warranties of any kind, either express or implied, including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</li>
                <li>Warranties that the website will be uninterrupted, timely, secure, or error-free.</li>
                <li>Warranties regarding the accuracy, reliability, or completeness of any content on the website.</li>
              </ul>

              {/* Section 11 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                11. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by applicable law, DIVERSIFIED Y&P, its owners, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, goodwill, or other intangible losses, arising out of or in connection with your use of or inability to use the website or services.
              </p>

              {/* Section 12 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                12. Indemnification
              </h2>
              <p>
                You agree to indemnify, defend, and hold harmless DIVERSIFIED Y&P and its affiliates, officers, agents, and employees from and against any and all claims, damages, losses, liabilities, and expenses (including reasonable attorneys&apos; fees) arising out of or related to your use of the website, your violation of these Terms, or your violation of any rights of a third party.
              </p>

              {/* Section 13 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                13. Governing Law
              </h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising from or relating to these Terms shall be subject to the exclusive jurisdiction of the courts located in India.
              </p>

              {/* Section 14 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                14. Changes to These Terms
              </h2>
              <p>
                We reserve the right to update or modify these Terms of Service at any time without prior notice. Changes will be effective immediately upon posting on this page with an updated &quot;Last Updated&quot; date. Your continued use of the website after any modifications constitutes your acceptance of the updated Terms.
              </p>

              {/* Section 15 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                15. Contact Us
              </h2>
              <p>
                If you have any questions, concerns, or feedback regarding these Terms of Service, please contact us:
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
