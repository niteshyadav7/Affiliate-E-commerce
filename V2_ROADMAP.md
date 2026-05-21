# Shopverse V2 Expansion Roadmap

This document outlines the architecture and implementation steps to transform Shopverse into a highly advanced, automated affiliate marketing engine in the future.

---

## 1. Automated Broken Link Checker (Cron Job)
Affiliate links often expire or products go out of stock. We will implement an automated system to catch these before you lose traffic.

**Implementation Details:**
- **`src/app/api/cron/check-links/route.ts`**: A Vercel Cron Job endpoint that triggers daily. It will fetch all active `product_links`, perform a lightweight `HEAD` request to each URL, and verify if it returns a 200 OK or 404 Not Found.
- **Database Schema**: Add an `is_broken` (BOOLEAN) and `last_checked_at` (TIMESTAMP) column to the `product_links` table.
- **Admin UI**: Add a prominent red warning icon next to products that contain broken links, alerting the admin immediately upon logging in.

## 2. A/B Testing Analytics for Affiliate Links
The database currently distributes clicks across multiple links in a round-robin fashion (thanks to `get_next_redirect`). We just need to expose the analytics for this.

**Implementation Details:**
- **`src/app/api/analytics/route.ts`**: Aggregate clicks not just by product, but specifically by `link_id`. Calculate the exact conversion/click split between Link A and Link B.
- **Admin Analytics**: Add an "A/B Test Results" section showing the performance comparison of different affiliate links attached to the same product.

## 3. Dynamic Social Sharing Cards (SEO Boost)
When you share your affiliate links on social media (Twitter, Discord, iMessage), they should generate a beautiful preview card showing the product image, title, and price.

**Implementation Details:**
- **`src/app/api/og/route.tsx`**: Implement `@vercel/og` to dynamically generate a PNG image using React/Tailwind. The route will accept parameters like `?title=Airpods&price=199&image=...` and output a branded graphical card.
- **Root Layout / Slug Page**: Inject the dynamic Open Graph (`og:image`) meta tags pointing to the new `/api/og` endpoint.

## 4. Categories, Tags & Live Search
As your product inventory grows, users need ways to filter and discover deals easily.

**Implementation Details:**
- **Database Schema**: 
  - Add `category` (TEXT) to `products` table.
  - Create a new `product_tags` table for many-to-many tagging (e.g., "Tech", "Under $50").
- **Storefront UI**: Add a sticky category sidebar (or top pill-navigation) and a real-time search bar that filters the products feed instantly.
- **Admin Editor**: Add inputs for selecting a category and applying tags when creating/editing products.

## 5. "Deal Expired" & Waitlist System
Don't let expired deals result in zero conversions. Let users subscribe to alerts.

**Implementation Details:**
- **Database Schema**: Add `status` (TEXT: 'active', 'expired', 'draft') to `products` table. Create a new `waitlists` table tracking `email` and `product_id`.
- **Product Card UI**: If a product is 'expired', change the "Shop Now" button to a gray "Notify Me" button. Clicking it opens a modal to collect their email.
- **Waitlist API**: Handle waitlist signups and optionally trigger an email to the admin when demand for an expired product reaches a certain threshold.
