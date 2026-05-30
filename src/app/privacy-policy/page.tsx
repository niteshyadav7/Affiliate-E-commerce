import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Masks from "@/components/Masks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - DIVERSIFIED Y&P",
  description:
    "Read the complete Privacy Policy of DIVERSIFIED Y&P. Learn how we handle your personal data, third-party cookies, affiliate tracking, and Google AdSense integration.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between">
      <div>
        <Masks />
        <Navbar />

        <main className="pt-[140px] pb-16 px-page-margin-mobile md:px-page-margin-desktop max-w-4xl mx-auto relative z-20">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-surface-container shadow-sm mb-12 relative overflow-hidden grain-texture">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent-lime via-primary to-accent-coral" />

            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-2 tracking-tight">
              Privacy Policy
            </h1>
            <p className="font-body text-body-sm text-secondary mb-10">
              Effective Date: May 30, 2026 &nbsp;|&nbsp; Last Updated: May 30, 2026
            </p>

            <div className="prose prose-slate max-w-none text-secondary leading-relaxed font-body text-body-lg space-y-8">
              {/* Introduction */}
              <p>
                At <strong>DIVERSIFIED Y&P</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), accessible at{" "}
                <strong>yandp.in</strong>, we are committed to safeguarding your privacy and ensuring transparency regarding how we handle data. This Privacy Policy describes in detail how we collect, process, use, and protect information when you visit or interact with our website.
              </p>
              <p>
                Please note that DIVERSIFIED Y&P is an **affiliate shopping search and curation platform**. We display high-quality products and redirect users to official third-party storefronts to complete purchases. By using our website, you agree to the collection and use of information in accordance with this policy.
              </p>

              {/* Section 1 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                1. Information We Collect
              </h2>
              <p>We collect the following categories of information to provide and improve our service:</p>

              <h3 className="font-display text-body-lg text-primary font-bold">
                1.1 Personal Information (Provided Voluntarily)
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Communication Data:</strong> Full name, email address, phone number, and message content when you fill out our contact form, send us support requests, or subscribe to our weekly curation newsletter.</li>
                <li><strong>Newsletter Data:</strong> Your email address for sending curated deal recommendations. You may unsubscribe or opt-out at any time using the link in the emails.</li>
              </ul>

              <h3 className="font-display text-body-lg text-primary font-bold">
                1.2 Automatically Collected Information
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Device Information:</strong> IP address, browser type and version, operating system, screen resolution, language settings, and device identifiers.</li>
                <li><strong>Usage and Interaction Data:</strong> Pages viewed, time spent on each page, search queries within our catalog, navigation paths, click events (especially outgoing referral link clicks), and referring URLs.</li>
                <li><strong>Approximate Location Data:</strong> General geographic region derived from your IP address.</li>
                <li><strong>Log Data:</strong> Standard server logs that record server requests, errors, and system events.</li>
              </ul>

              {/* Section 2 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                2. How We Use Your Information
              </h2>
              <p>We use the collected information for the following commercial and operational purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Catalog Maintenance:</strong> To operate, optimize, and maintain our premium product search platform.</li>
                <li><strong>Redirection Curation:</strong> To deliver highly accurate product recommendation directories, routing user requests securely to verified merchant checkout platforms.</li>
                <li><strong>Display Advertising:</strong> To serve personalized and contextual ads through networks like Google AdSense, which helps fund our free curation activities.</li>
                <li><strong>Umami Analytics:</strong> To monitor overall catalog navigation patterns, helping us understand which categories and items are popular without tracking individuals.</li>
                <li><strong>Customer Relations:</strong> To answer your direct inquiries submitted through our contact channels.</li>
                <li><strong>Security & Safety:</strong> To prevent bots, detect malicious redirect attempts, block spam, and maintain site stability.</li>
              </ul>

              {/* Section 3 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                3. Cookies and Third-Party Tracking Technologies
              </h2>
              <p>
                Our website utilizes cookies and similar web identifiers to improve layout, analyze performance, and serve relevant advertising. 
              </p>
              <h3 className="font-display text-body-lg text-primary font-bold">
                3.1 Types of Cookies We Use
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for system operations, caching, and running security protocols. These cannot be turned off.</li>
                <li><strong>Analytics Cookies:</strong> We run **Umami Analytics**, a privacy-focused, GDPR-compliant analytics tool. It collects anonymous usage metrics without storing personal identifier markers.</li>
                <li><strong>Advertising Cookies (Google AdSense):</strong> Set by Google and its ad-tech partners. These cookies are used to serve personalized and contextual advertisements based on your prior browsing history on our site and other pages on the web.</li>
                <li><strong>Affiliate Merchant Cookies (Redirection Cookies):</strong> When you click a &quot;Buy Now&quot; or details link on our storefront, you are redirected to third-party marketplaces (e.g., Amazon, Chupps, etc.). These target marketplaces utilize tracking cookies and referral tokens to track that you arrived from DIVERSIFIED Y&P. This ensures we receive referral attribution if you complete a transaction on their site. These cookies are subject to the respective merchant&apos;s privacy policy.</li>
              </ul>
              <p>
                <strong>Managing Your Cookies:</strong> You can block, disable, or delete cookies at any time through your device web browser settings. To learn how to manage cookie preferences, you may consult{" "}
                <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary underline font-bold">
                  www.allaboutcookies.org
                </a>.
              </p>

              {/* Section 4 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                4. Google AdSense & Third-Party Advertising Disclosures
              </h2>
              <p>
                We use Google AdSense, a display ad service provided by Google LLC, to show visual ads. Google AdSense uses tracking cookies, including the DoubleClick cookie, to track browsing behavior across different websites.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet.</li>
                <li>You can completely opt-out of Google&apos;s personalized advertising networks by visiting the <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline font-bold">Google Ads Settings Page</a>.</li>
                <li>Alternatively, you can opt-out of general third-party vendor cookies for personalized advertising by visiting the consumer choice portal at <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary underline font-bold">www.aboutads.info/choices</a>.</li>
              </ul>
              <p>
                For extensive detail on Google&apos;s data practices and privacy protocols, please read{" "}
                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-primary underline font-bold">
                  How Google uses data when you use our partners&apos; sites or apps
                </a>.
              </p>

              {/* Section 5 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                5. Outgoing Links and Third-Party Merchant Policies
              </h2>
              <p>
                Our platform functions purely as a curated navigation layer. Therefore, our website contains numerous outbound links to external merchant platforms (such as Amazon, Chupps, etc.). 
              </p>
              <p>
                We do not have control over, and explicitly assume no responsibility for, the content, transaction procedures, payment gateways, product quality, or privacy protocols implemented by these third-party platforms. When you redirect to an external platform, your browsing and transaction details are governed strictly by that website&apos;s terms and privacy policies. We highly recommend reviewing their privacy policies upon arrival.
              </p>

              {/* Section 6 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                6. Data Sharing and Processing Safeguards
              </h2>
              <p>
                DIVERSIFIED Y&P **does not sell, rent, or trade your personal information** to marketing agencies or third parties. We may disclose data only in the following scenarios:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Core Infrastructure:</strong> With standard, trusted cloud host providers (such as Vercel) and relational database infrastructure (such as Supabase) required to keep our platform operational.</li>
                <li><strong>Newsletter Systems:</strong> Sharing emails with verified SMTP systems solely for delivering our requested news alerts.</li>
                <li><strong>Legal Requirements:</strong> When compelled by law, official subpoena, or safety regulations to protect legal rights and users.</li>
              </ul>

              {/* Section 7 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                7. Data Retention & Privacy Rights (GDPR & CCPA)
              </h2>
              <p>
                Depending on your location, you hold legal rights regarding the deletion, correction, access, and transfer of your personal data. We comply fully with data rights protocols:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You may request details of the data we hold, request corrections to email inputs, or request that your contact data be wiped.</li>
                <li>Email contacts for newsletters are stored until you click unsubscribe. Other contact logs are purged after 12 months.</li>
              </ul>
              <p>
                To trigger any rights or submit a privacy request, please contact us at:{" "}
                <a href="mailto:privacy@yandp.in" className="text-primary underline font-bold">privacy@yandp.in</a> or <a href="mailto:contact@yandp.in" className="text-primary underline font-bold">contact@yandp.in</a>.
              </p>

              {/* Section 8 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                8. Contact Us
              </h2>
              <p>
                For questions concerning our privacy procedures, cookie usage, or affiliate disclosures, contact our team:
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
