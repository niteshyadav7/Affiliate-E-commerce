# Dynamic Product Detail Pages + Admin Management

## Background

Currently, clicking **"BUY NOW"** on a product card immediately triggers the round-robin affiliate redirect (`/api/redirect/[id]`). There is **no product landing/detail page** where users can see full product information before deciding to buy.

The existing `products` table only stores: `name`, `description`, `price`, `image_url`, `category`, `slug`, `is_active`. This is insufficient for a rich product landing page.

### What This Plan Delivers

1. **New `product_details` table** — stores rich product info (highlights, specs, gallery, ratings, stock, etc.)
2. **Dynamic product landing page** at `/product/[slug]` — premium UI with image gallery, specifications, affiliate CTA
3. **Updated seed SQL** — detailed data for all 8 existing products
4. **Admin panel section** — full CRUD for product details within the existing admin panel
5. **Updated product cards** — clicking a card navigates to the detail page instead of redirecting immediately

---

## User Review Required

> [!IMPORTANT]
> **Product card behavior change:** Currently, clicking "BUY NOW" on a product card immediately redirects to an affiliate link. This plan changes it so that clicking the card opens a product detail page, and the affiliate redirect ("BUY NOW") happens from within that detail page. This is the standard e-commerce flow.

> [!IMPORTANT]
> **The product detail page will still use the existing round-robin redirect** for the "Buy Now" CTA. The `/api/redirect/[id]` endpoint remains unchanged.

---

## Open Questions

> [!NOTE]
> **Gallery images**: The plan adds support for multiple product images. For now, the seed data will reuse the existing single product image as the primary gallery image. You can add more images later via the admin panel.

---

## Proposed Changes

### 1. Database Schema — `product_details` table

#### [NEW] `product_details_migration.sql`

A new table `product_details` with a 1:1 relationship to `products`:

```sql
CREATE TABLE IF NOT EXISTS product_details (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID UNIQUE REFERENCES products(id) ON DELETE CASCADE,

  -- Rich content
  long_description TEXT DEFAULT '',
  highlights TEXT[] DEFAULT '{}',          -- Array of bullet-point highlights
  specifications JSONB DEFAULT '{}',       -- Key-value pairs e.g. {"Weight": "250g", "Battery": "30hrs"}

  -- Gallery (array of image URLs)
  gallery_images TEXT[] DEFAULT '{}',

  -- Social proof
  rating NUMERIC(2,1) DEFAULT 0.0,         -- e.g. 4.5
  reviews_count INTEGER DEFAULT 0,

  -- Stock & shipping
  stock_status TEXT DEFAULT 'in_stock',     -- 'in_stock', 'low_stock', 'out_of_stock'
  shipping_info TEXT DEFAULT 'Free shipping on orders over $50',

  -- SEO
  meta_title TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Why a separate table?** Keeps the core `products` table lean (it's queried on every homepage load for the grid). Detail data is only fetched when a user visits a specific product page.

---

### 2. Seed Data

#### [NEW] `seed_product_details.sql`

Seed data for all 8 existing products with realistic highlights, specifications, ratings, and gallery images. Example structure:

```sql
INSERT INTO product_details (product_id, long_description, highlights, specifications, rating, reviews_count, stock_status, shipping_info, gallery_images)
VALUES (
  'a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d',  -- Acoustic Pro Max
  'Experience studio-quality sound with the Acoustic Pro Max...',
  ARRAY['Active Noise Cancellation', '30-hour battery life', 'Premium memory foam ear cushions', 'Bluetooth 5.3 with multipoint'],
  '{"Driver Size": "40mm", "Frequency Response": "4Hz - 40kHz", "Battery Life": "30 hours", "Weight": "250g", "Connectivity": "Bluetooth 5.3, 3.5mm AUX", "Noise Cancellation": "Adaptive ANC"}'::jsonb,
  4.8, 2847, 'in_stock', 'Free express shipping',
  ARRAY['<existing_image_url>']
);
-- ... similar for all 8 products
```

---

### 3. Frontend — Product Detail Page

#### [NEW] [page.tsx](file:///d:/yash/may/E-commerce/src/app/product/[slug]/page.tsx)

A **server component** that:

- Fetches product + product_details + product_links by slug (falling back to UUID)
- Renders a premium product landing page
- Passes data to a client component for interactivity

#### [NEW] [ProductDetailClient.tsx](file:///d:/yash/may/E-commerce/src/components/organisms/ProductDetailClient.tsx)

Client component with:

- **Image gallery** with thumbnail navigation and zoom-on-hover
- **Product info section**: name, price, rating stars, reviews count, stock badge
- **Highlights** as styled bullet points
- **Specifications table** rendered from JSONB
- **"Buy Now" CTA** that triggers the existing `/api/redirect/[id]` round-robin
- **"Where to Buy" section** showing all affiliate links with store labels
- **Shipping info** badge
- **Breadcrumb navigation**: Home → Category → Product Name
- **Related products** grid (same category, excluding current product)
- Framer Motion entrance animations consistent with existing site design
- Fully responsive (mobile-first)

**Design approach**: Matches the existing Diversified Y&P "Organic Luxury" design system — Outfit/Inter fonts, navy primary, lime/coral accents, glassmorphism, rounded corners, generous whitespace.

---

### 4. API Routes

#### [NEW] [route.ts](file:///d:/yash/may/E-commerce/src/app/api/products/[id]/details/route.ts)

- `GET` — Fetch product details by product ID
- `PUT` — Update product details (admin, role-gated)
- `POST` — Create product details if they don't exist yet (admin, role-gated)

---

### 5. Admin Panel — Product Details Management

#### [MODIFY] [ProductForm.tsx](file:///d:/yash/may/E-commerce/src/components/admin/ProductForm.tsx)

Add a new **"Product Details"** collapsible section below the existing "Redirect Destinations" section in the same form. This keeps the workflow unified — when editing a product, you can fill in details in the same place. Fields added:

- **Long Description** — rich textarea
- **Highlights** — dynamic list (add/remove bullet points)
- **Specifications** — dynamic key-value pair editor (add/remove rows)
- **Gallery Images** — dynamic list of image URLs (add/remove)
- **Rating** — number input (0.0–5.0)
- **Reviews Count** — number input
- **Stock Status** — dropdown (In Stock / Low Stock / Out of Stock)
- **Shipping Info** — text input
- **Meta Title** — text input
- **Meta Description** — textarea

The form will fetch existing details when editing, and create/update them on save.

---

### 6. Frontend Updates — Product Card & Grid

#### [MODIFY] [ProductCard.tsx](file:///d:/yash/may/E-commerce/src/components/molecules/ProductCard.tsx)

- Make the **entire card clickable** → navigates to `/product/[slug]`
- Keep "BUY NOW" button but change its behavior: it also navigates to the product page (not direct redirect)
- Add slug to the ProductCard props

#### [MODIFY] [ProductGrid.tsx](file:///d:/yash/may/E-commerce/src/components/organisms/ProductGrid.tsx)

- Pass `slug` from database data to ProductCard
- Update the `handleBuyNow` to navigate to `/product/[slug]` instead of `/api/redirect/[id]`
- Use Next.js `router.push` for client-side navigation

---

## File Summary

| Action     | File                                               | Purpose                                  |
| ---------- | -------------------------------------------------- | ---------------------------------------- |
| **NEW**    | `product_details_migration.sql`                    | DB migration for `product_details` table |
| **NEW**    | `seed_product_details.sql`                         | Seed data for all 8 products             |
| **NEW**    | `src/app/product/[slug]/page.tsx`                  | Product detail page (server component)   |
| **NEW**    | `src/components/organisms/ProductDetailClient.tsx` | Product detail UI (client component)     |
| **NEW**    | `src/app/api/products/[id]/details/route.ts`       | API for product details CRUD             |
| **MODIFY** | `src/components/admin/ProductForm.tsx`             | Add details section to admin form        |
| **MODIFY** | `src/components/molecules/ProductCard.tsx`         | Link cards to detail page                |
| **MODIFY** | `src/components/organisms/ProductGrid.tsx`         | Pass slug, update navigation             |

---

## Verification Plan

### Automated Tests

- `npm run build` — ensure no TypeScript/build errors
- Visit `/product/acoustic-pro-max` — verify the page renders with all sections
- Click "BUY NOW" on the detail page → verify redirect triggers via `/api/redirect/[id]`
- Test admin panel → edit a product → verify details section appears and saves correctly
- Test with non-existent slug → verify 404 handling

### Manual Verification

- Browse homepage → click product card → verify navigation to detail page
- Verify responsive layout on mobile viewport
- Verify admin form saves and loads product details correctly
- Run seed SQL in Supabase → verify data populates
