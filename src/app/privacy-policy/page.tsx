import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Masks from "@/components/Masks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - DIVERSIFIED Y&P",
  description:
    "Read the complete Privacy Policy of DIVERSIFIED Y&P. Learn how we collect, use, store, and protect your personal information.",
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
              Effective Date: May 24, 2026 &nbsp;|&nbsp; Last Updated: May 24, 2026
            </p>

            <div className="prose prose-slate max-w-none text-secondary leading-relaxed font-body text-body-lg space-y-8">
              {/* Introduction */}
              <p>
                At <strong>DIVERSIFIED Y&P</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), accessible at{" "}
                <strong>yandp.in</strong>, we are committed to safeguarding your privacy and ensuring the protection of your personal data. This Privacy Policy describes in detail how we collect, use, disclose, and protect information when you visit or interact with our website. By using our services, you consent to the practices described in this policy.
              </p>

              {/* Section 1 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                1. Information We Collect
              </h2>
              <p>We collect the following categories of information:</p>

              <h3 className="font-display text-body-lg text-primary font-bold">
                1.1 Personal Information (Provided by You)
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Full name, email address, and phone number when you fill out our contact form or subscribe to our newsletter.</li>
                <li>Account credentials if you create a user profile on our platform.</li>
                <li>Any other information you voluntarily provide through forms, surveys, or direct communication with our team.</li>
              </ul>

              <h3 className="font-display text-body-lg text-primary font-bold">
                1.2 Automatically Collected Information
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Device Information:</strong> IP address, browser type and version, operating system, screen resolution, and device identifiers.</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent on each page, click patterns, referring URLs, and navigation paths through our website.</li>
                <li><strong>Location Data:</strong> Approximate geographic location derived from your IP address.</li>
                <li><strong>Log Data:</strong> Server logs that record the date, time, and duration of your visits.</li>
              </ul>

              {/* Section 2 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                2. How We Use Your Information
              </h2>
              <p>We use the collected information for the following lawful purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Delivery:</strong> To operate, maintain, and improve our e-commerce platform and shopping experience.</li>
                <li><strong>Communication:</strong> To respond to your inquiries submitted through our contact form, and to send order confirmations and service-related notices.</li>
                <li><strong>Newsletter & Marketing:</strong> To send promotional emails, product recommendations, and curated deals to subscribers who have opted in. You may unsubscribe at any time.</li>
                <li><strong>Analytics & Improvement:</strong> To analyze user behavior and website performance using privacy-focused analytics tools (such as Umami Analytics) to enhance usability, design, and product offerings.</li>
                <li><strong>Advertising:</strong> To display personalized advertisements through third-party ad networks, including Google AdSense, based on your browsing interests.</li>
                <li><strong>Security & Fraud Prevention:</strong> To detect, prevent, and address technical issues, unauthorized access, and fraudulent activity.</li>
                <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, legal processes, or governmental requests.</li>
              </ul>

              {/* Section 3 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                3. Cookies and Tracking Technologies
              </h2>
              <p>
                Our website uses cookies and similar tracking technologies to enhance your browsing experience and deliver relevant content and advertisements. The types of cookies we use include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for the basic functionality of the website, such as session management, navigation, and security features. These cannot be disabled.</li>
                <li><strong>Analytics Cookies:</strong> Used to collect anonymous usage data to help us understand visitor behavior and improve our services. We use Umami Analytics, a privacy-focused, GDPR-compliant analytics platform.</li>
                <li><strong>Advertising Cookies:</strong> Set by third-party advertising partners (including Google AdSense) to serve relevant ads based on your browsing activity across websites. These cookies may track your online activity over time and across different websites.</li>
                <li><strong>Preference Cookies:</strong> Remember your settings, such as language and display preferences, to provide a personalized experience.</li>
              </ul>
              <p>
                <strong>Managing Cookies:</strong> You can control or delete cookies through your browser settings at any time. Please note that disabling certain cookies may affect the functionality of the website. For more information on managing cookies, visit{" "}
                <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary underline font-bold">
                  www.allaboutcookies.org
                </a>.
              </p>

              {/* Section 4 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                4. Third-Party Advertising (Google AdSense)
              </h2>
              <p>
                We use Google AdSense, a third-party advertising service provided by Google LLC, to display advertisements on our website. Google AdSense uses cookies, including the DoubleClick cookie, to serve ads based on your prior visits to our website and other websites on the Internet.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet.</li>
                <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline font-bold">Google Ads Settings</a>.</li>
                <li>Alternatively, you may opt out of third-party vendor cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary underline font-bold">www.aboutads.info/choices</a>.</li>
              </ul>
              <p>
                For more details on how Google manages data in its ad products, please review{" "}
                <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-primary underline font-bold">
                  Google&apos;s Privacy & Terms
                </a>.
              </p>

              {/* Section 5 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                5. Data Sharing and Disclosure
              </h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your data only under the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating our website, conducting our business, or providing services to you (e.g., email delivery via Gmail SMTP, analytics via Umami, hosting via Vercel).</li>
                <li><strong>Legal Requirements:</strong> When required by law, subpoena, or other legal process, or when we believe disclosure is necessary to protect our rights, safety, or property.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your data may be transferred as part of the transaction.</li>
              </ul>

              {/* Section 6 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                6. Data Security
              </h2>
              <p>
                We implement industry-standard security measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>SSL/TLS encryption for all data transmitted between your browser and our servers.</li>
                <li>Secure database hosting with row-level security policies (via Supabase).</li>
                <li>Regular security audits and monitoring for unauthorized access attempts.</li>
              </ul>
              <p>
                However, no method of data transmission or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
              </p>

              {/* Section 7 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                7. Data Retention
              </h2>
              <p>
                We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Specifically:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Contact form submissions are retained for up to 12 months to facilitate ongoing correspondence.</li>
                <li>Newsletter subscriber data is retained until you unsubscribe.</li>
                <li>Analytics data is anonymized and retained for up to 24 months for trend analysis.</li>
              </ul>

              {/* Section 8 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                8. Your Rights (GDPR & CCPA)
              </h2>
              <p>
                Depending on your location, you may have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Right to Access:</strong> You may request a copy of the personal information we hold about you.</li>
                <li><strong>Right to Rectification:</strong> You may request correction of inaccurate or incomplete data.</li>
                <li><strong>Right to Erasure:</strong> You may request deletion of your personal data, subject to certain legal exceptions.</li>
                <li><strong>Right to Restrict Processing:</strong> You may request that we limit how we use your data.</li>
                <li><strong>Right to Data Portability:</strong> You may request your data in a commonly used, machine-readable format.</li>
                <li><strong>Right to Opt-Out:</strong> You may opt out of personalized advertising and marketing communications at any time.</li>
              </ul>
              <p>
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:contact@yandp.in" className="text-primary underline font-bold">contact@yandp.in</a>.
                We will respond to your request within 30 days.
              </p>

              {/* Section 9 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                9. Children&apos;s Privacy
              </h2>
              <p>
                Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13 years of age. If we become aware that we have inadvertently collected such information, we will take immediate steps to delete it. If you believe a child has provided us with personal data, please contact us immediately.
              </p>

              {/* Section 10 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                10. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites that are not operated by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party sites or services. We encourage you to review the privacy policies of every site you visit.
              </p>

              {/* Section 11 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                11. Changes to This Privacy Policy
              </h2>
              <p>
                We reserve the right to update or modify this Privacy Policy at any time. Any changes will be posted on this page with an updated &quot;Last Updated&quot; date. We encourage you to review this Privacy Policy periodically for any changes. Your continued use of the website after any modifications constitutes acceptance of the updated Privacy Policy.
              </p>

              {/* Section 12 */}
              <h2 className="font-display text-headline-md text-primary font-bold pt-4">
                12. Contact Us
              </h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
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
