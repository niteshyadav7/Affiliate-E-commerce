-- =========================================================
-- DIVERSIFIED Y&P SEED DATA: PRODUCT DETAILS & SLUGS
-- Run this in your Supabase SQL Editor to populate rich details!
-- =========================================================

-- 1. Ensure all existing products have slugs
UPDATE products SET slug = 'acoustic-pro-max' WHERE id = 'a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d';
UPDATE products SET slug = 'nexus-watch-s' WHERE id = 'b2c3d4e5-f6a7-4b5c-8d9e-0f1a2b3c4d5e';
UPDATE products SET slug = 'velocity-run-v2' WHERE id = 'c3d4e5f6-a7b8-4c5d-8e9f-1a2b3c4d5e6f';
UPDATE products SET slug = 'aura-air-notebook' WHERE id = 'd4e5f6a7-b8c9-4d5e-8f0a-2b3c4d5e6f7a';
UPDATE products SET slug = 'nomad-pack' WHERE id = 'e5f6a7b8-c9d0-4e5f-8a1b-3c4d5e6f7a8b';
UPDATE products SET slug = 'horizon-specs' WHERE id = 'f6a7b8c9-d0e1-4f5a-8b2c-4d5e6f7a8b9c';
UPDATE products SET slug = 'bean-master-pro' WHERE id = 'a7b8c9d0-e1f2-4a5b-8c3d-5e6f7a8b9c0d';
UPDATE products SET slug = 'shield-case-ultra' WHERE id = 'b8c9d0e1-f2a3-4b5c-8d4e-6f7a8b9c0d1e';

-- 2. Clear existing product details to prevent unique constraint errors on rerun
DELETE FROM product_details;

-- 3. Seed product_details
-- 3.1 Acoustic Pro Max
INSERT INTO product_details (
  product_id, long_description, highlights, specifications, rating, reviews_count, stock_status, shipping_info, gallery_images, meta_title, meta_description
) VALUES (
  'a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d',
  'Experience audio perfection with the Acoustic Pro Max. Designed for audiophiles who demand precision, comfort, and style, these premium over-ear headphones combine custom hybrid active noise cancellation with 40mm dynamic drivers to deliver a spectacular, ultra-detailed soundstage. With 30 hours of wireless playback, luxurious memory foam earcups, and crystal-clear voice calls, they are your perfect companion for studio-quality listening anywhere.',
  ARRAY[
    'Hybrid Active Noise Cancellation (ANC) with ambient transparency mode',
    'Hi-Res Audio certified 40mm custom-engineered dynamic drivers',
    'Up to 30 hours of battery life with ANC enabled (45 hours with ANC off)',
    'Ultra-soft memory foam ear cushions wrapped in premium protein leather',
    'Advanced Bluetooth 5.3 connectivity with seamless multipoint pairing',
    'Travel-friendly folding design with standard 3.5mm backup audio jack'
  ],
  '{"Driver Size": "40mm Dynamic", "Frequency Response": "4Hz - 40kHz", "Battery Life": "Up to 30 hours (ANC on)", "Weight": "250g", "Bluetooth Version": "5.3", "Charging Port": "USB Type-C", "Active Noise Cancellation": "Yes, Adaptive Hybrid"}'::jsonb,
  4.8, 284, 'in_stock', 'Free express shipping on all orders',
  ARRAY['https://lh3.googleusercontent.com/aida-public/AB6AXuAZ8ZxBELdGezf2X1RdWRBcZSz3S9vJsXJj9bO0vnGYaNNcBB2dqbGQHF0yp0Cs6l1OZ1ghSB6UKe2pnKi6bFNsl98lWaVFRrrLsY3k0Xil55X8WLQZb8mf3SOTtv8uTNUipFW0rqaCXZSX00v7HFT4yUoHspg61T5c-961rzFzTadlOPfotNkJ1ZlLdSxcGd6_58s75nQrhpnasVHJ6vpBkzlzcgHUQaz2_ksINM4VvBrIOfD1G7HWd9JN-KnvpaXqBb7V0Arsc-b4'],
  'Acoustic Pro Max - Premium Noise-Cancelling Headphones',
  'Get studio-quality audio with Acoustic Pro Max wireless noise-cancelling headphones. Features 30-hour battery, adaptive hybrid ANC, and ultra-soft memory foam ear cushions.'
);

-- 3.2 Nexus Watch S
INSERT INTO product_details (
  product_id, long_description, highlights, specifications, rating, reviews_count, stock_status, shipping_info, gallery_images, meta_title, meta_description
) VALUES (
  'b2c3d4e5-f6a7-4b5c-8d9e-0f1a2b3c4d5e',
  'Meet the Nexus Watch S, a highly responsive, futuristic smartwatch designed to optimize your active lifestyle. Engineered with a brilliant 1.4-inch circular AMOLED display that remains crystal clear under direct sunlight, it offers continuous health monitoring, heart-rate tracking, oxygen level checks, and advanced sleep analytics. Encased in space-grade aerospace aluminum, it is built to survive extreme conditions while keeping you connected with smart notifications and customized widgets.',
  ARRAY[
    'Brilliant 1.4-inch AMOLED display with scratch-resistant gorilla glass',
    'Comprehensive 24/7 health tracking (Heart Rate, SpO2, Stress levels)',
    'Over 100 dedicated sports and workout modes with built-in GPS',
    'Up to 10 days of battery life on a single charge with fast charging',
    'IP68 dust and water resistance up to 50 meters (5 ATM)',
    'Seamless notification syncing for calls, messages, and smart apps'
  ],
  '{"Display": "1.4-inch AMOLED (454x454)", "Battery Life": "Up to 10 days", "Water Resistance": "5 ATM / IP68", "Sensors": "Optical Heart Rate, SpO2, Accelerometer, Gyroscope", "Connectivity": "Bluetooth 5.2, Wi-Fi", "Weight": "42g (without strap)"}'::jsonb,
  4.6, 142, 'in_stock', 'Free shipping within 3-5 business days',
  ARRAY['https://lh3.googleusercontent.com/aida-public/AB6AXuBV89iLGzkvvbvSFuypVD4OR9w4RojkGVABDdTX9E4yHKBpxlbNb-POaQAKjaNjkIGg7RZ6HPG9NcEbYTJzFXMSw9_KTqkcMU756b1yHaSk-QnYS-1eAZlUehC81GcjPtv_GfMDReXEQWnmHFf8LSveBUFdwNJNJOpcHU_zoKYirUDGtD3yjbPcAokbMuWLaDP7niJ1GlUA-OqAZD47P6giuJRKfMmS2-wnOyqprZvxDhIWKXHj6fduUWBGZsIk6FrxveBNks6EC139'],
  'Nexus Watch S - Futuristic Smartwatch & Health Tracker',
  'Track your workouts and health metrics with the Nexus Watch S. Featuring a bright AMOLED screen, continuous heart-rate tracking, sleep tracking, and up to 10-day battery life.'
);

-- 3.3 Velocity Run V2
INSERT INTO product_details (
  product_id, long_description, highlights, specifications, rating, reviews_count, stock_status, shipping_info, gallery_images, meta_title, meta_description
) VALUES (
  'c3d4e5f6-a7b8-4c5d-8e9f-1a2b3c4d5e6f',
  'Take your runs to the next level with the Velocity Run V2. Engineered for high performance, these running shoes feature our proprietary hyper-bounce foam midsole that delivers maximum energy return with every stride. The upper is made of ultra-breathable engineered knit mesh that shapes to your foot, while the high-grip carbon rubber outsole provides unparalleled traction in both wet and dry conditions. Lightweight, responsive, and incredibly durable.',
  ARRAY[
    'Proprietary energy-returning hyper-bounce foam midsole',
    'Breathable engineered knit mesh upper for optimal airflow',
    'High-durability carbon rubber outsole for superior grip and durability',
    'Lightweight design weighing just 220g for effortless running',
    'Reflective safety detailing for low-light evening runs',
    'Designed for both short speed training and full marathons'
  ],
  '{"Upper": "Engineered Knit Mesh", "Midsole": "Hyper-bounce Responsive Foam", "Outsole": "Carbon Rubber", "Drop": "8mm", "Weight": "220g (Size 9)", "Tread": "Multi-surface High-grip"}'::jsonb,
  4.7, 98, 'in_stock', 'Free express shipping on all orders',
  ARRAY['https://lh3.googleusercontent.com/aida-public/AB6AXuCYvpAlE3hnm3zMcKCcJcIUnJwlJY2wB_zOfErrprKRvhqArX4HRacyYowJAUFNCyRQpcnDXMdTaZxrE6-v_NRiTb3su7yYmwfK5P-RpJ4G0I1sLjW6Hx5vuruu98pUhun50LvHbMJ33ik_eQcOM_kZ_G9fhrkMLBsPLTZllKGlf5AUMe0HLLpZkz7zersm3tQpn2T3VD9sRiUO4MD4WmxFswGB3OKm2tv1Sqg0WRQe5EsZdhUSSKfZ044fqkVHBz690VaLwX3af-Pj'],
  'Velocity Run V2 - High-Performance Running Shoes',
  'Experience ultimate speed and comfort with Velocity Run V2 luxury performance running shoes. Hyper-bounce foam midsole, light weight, and breathable mesh upper.'
);

-- 3.4 Aura Air Notebook
INSERT INTO product_details (
  product_id, long_description, highlights, specifications, rating, reviews_count, stock_status, shipping_info, gallery_images, meta_title, meta_description
) VALUES (
  'd4e5f6a7-b8c9-4d5e-8f0a-2b3c4d5e6f7a',
  'The Aura Air Notebook sets a new benchmark for portability and processing power. Built with an incredibly slim 11.5mm aluminum chassis, this notebook houses an advanced 8-core CPU that effortlessly handles multitasking, creative editing, and productivity workflows. The 13.6-inch Liquid Retina display delivers stunning color accuracy and razor-sharp text, complemented by an all-day 18-hour battery life and a completely silent fanless design.',
  ARRAY[
    'Incredibly thin 11.5mm unibody aerospace-grade aluminum chassis',
    'Powerful 8-core CPU with custom graphics processing unit',
    'Stunning 13.6-inch Liquid Retina display with 500 nits brightness',
    'Up to 18 hours of continuous battery life for all-day freedom',
    'Fanless, completely silent thermal design under heavy workloads',
    'Secure Touch ID login and premium backlit keyboard'
  ],
  '{"Processor": "8-Core Next-Gen Processor", "Display": "13.6-inch Liquid Retina (2560x1664)", "RAM": "16GB Unified Memory", "Storage": "512GB High-speed SSD", "Battery Life": "Up to 18 hours", "Ports": "2x Thunderbolt / USB 4, 3.5mm Headphone Jack", "Weight": "1.24 kg"}'::jsonb,
  4.9, 312, 'in_stock', 'Free express shipping and secure tracking',
  ARRAY['https://lh3.googleusercontent.com/aida-public/AB6AXuBKUJe1qRt_4KXB3jNwH7fO8Fv5a7mwz2iyTAeeQTtaYAcBEap_80mG-hNSuBwP8KKYpdfg5ppvL04iMbEXBNiFzwUedyNaZI9lHE9NO1mHa_IMOOdozNEWSUOJ-VahjcmYLGEGX6QDe-wT0SNU4DfEOaL_XxXRptXatv5gF2wpwrj3-fzBtD1puEKESW6VDeGtVjhFfc5d_O5e-LdOS-sKkVXntdbIskTmgLNdPgrH9nkG7BZo1I5GQqEf0JKI0C3mfOoml8BO5M2N'],
  'Aura Air Notebook - Ultra-thin Premium Laptop',
  'Buy the Aura Air Notebook. Features a powerful 8-core CPU, 13.6-inch Liquid Retina display, 18-hour battery life, and silent fanless design in a 11.5mm aluminum chassis.'
);

-- 3.5 Nomad Pack
INSERT INTO product_details (
  product_id, long_description, highlights, specifications, rating, reviews_count, stock_status, shipping_info, gallery_images, meta_title, meta_description
) VALUES (
  'e5f6a7b8-c9d0-4e5f-8a1b-3c4d5e6f7a8b',
  'Crafted for modern adventurers, the Nomad Pack blends vintage aesthetic with modern utility. Constructed from heavy-duty, water-resistant waxed canvas and reinforced with full-grain crazy horse leather straps, this backpack is built to weather any storm. The spacious main compartment features a padded sleeve that safely fits laptops up to 15.6 inches, alongside multiple quick-access pockets for chargers, notebooks, and travel essentials.',
  ARRAY[
    'Water-resistant, heavy-duty 16oz waxed cotton canvas construction',
    'Genuine full-grain crazy horse leather straps and brass hardware',
    'Fully padded interior compartment for laptops up to 15.6 inches',
    'Ergonomic padded shoulder straps with breathable mesh lining',
    'Magnetic buckle quick-snap closures for effortless access',
    'Hidden anti-theft back pocket for passports and cash'
  ],
  '{"Material": "16oz Waxed Canvas & Full-grain Leather", "Capacity": "22 Liters", "Laptop Sleeve": "Padded, fits up to 15.6-inch laptops", "Dimensions": "45 x 30 x 15 cm", "Weight": "1.1 kg", "Hardware": "Anti-rust Zinc Alloy & Magnetic snaps"}'::jsonb,
  4.5, 67, 'in_stock', 'Free shipping within 3-5 business days',
  ARRAY['https://lh3.googleusercontent.com/aida-public/AB6AXuA-dWmpKH_dr46FBsaLN9lC7sbwkMZs-Y__nR_sIxD6ObTOSXqab57wukCQOuLHzwjzWiK9fdbUPOeseTp1Og8-R5CB5KcpIAIjAAhCo7iXuoi_hIyyfcdx1WwCmL8Z6Jz8ZcEHNj8HhQ5oSsRflZ9DFCxnudVx-Q6YRYAkx8d6aVsPvFAwlFub2GT_zq-9w2aOIIUjMua1G0hnUEMeyYZT_y6gaAwsKNpIdpAGTOWuDgg2yNRtYH5DB0TT09dgve87iV38ykV8oX-c'],
  'Nomad Pack - Premium Canvas & Leather Travel Backpack',
  'Shop the Nomad Pack, a ruggedly handsome travel backpack constructed from water-resistant waxed canvas and crazy horse leather. Features 15.6-inch laptop pocket.'
);

-- 3.6 Horizon Specs
INSERT INTO product_details (
  product_id, long_description, highlights, specifications, rating, reviews_count, stock_status, shipping_info, gallery_images, meta_title, meta_description
) VALUES (
  'f6a7b8c9-d0e1-4f5a-8b2c-4d5e6f7a8b9c',
  'Shield your eyes in absolute luxury with the Horizon Specs. These modern designer sunglasses feature an iconic lightweight titanium frame meticulously plated in 18k yellow gold, paired with custom-tinted polarized lenses that offer 100% UVA/UVB protection and eliminate annoying glare. Hand-finished acetate temple tips ensure supreme comfort for all-day wear. Timeless fashion meeting state-of-the-art optical science.',
  ARRAY[
    'Handcrafted lightweight titanium frame with 18k gold plating',
    'Premium polarized scratch-resistant lenses for unmatched clarity',
    '100% protection against harmful UVA and UVB solar rays',
    'Hypoallergenic adjustable silicone nose pads for a custom fit',
    'Hand-finished acetate temple tips for long-lasting comfort',
    'Includes custom leather protective case and microfiber cloth'
  ],
  '{"Frame Material": "Gold-plated Titanium", "Lens Material": "Polarized TAC", "UV Protection": "100% UVA/UVB (UV400)", "Frame Width": "142mm", "Lens Width": "58mm", "Bridge Width": "16mm", "Temple Length": "145mm"}'::jsonb,
  4.7, 85, 'in_stock', 'Free express shipping on all orders',
  ARRAY['https://lh3.googleusercontent.com/aida-public/AB6AXuBiqKwrjV6OBZJnv6aBF-hnADm-K68XNQSHdFIIa3JruAnH_CmW7GfUUIandDWKdUDXJKbxI-4i4RGwFzsIScWENUR_bf05fBNoG7BRWerSFJKvLexH6CYhQrZK1fiYlivER9WKJ0owRZkwRLhuyfvfGurvP65MaUosaGhjjGOuhGzoW4I5TZWJLY6qf-SZrjOLqokJuuLHxMLek5LpL8K4hL_GgOXwr-Rg_6_LRjObB-UeNjEemNHlf-4cXKWFlJkG82Gwv9LsCVgh'],
  'Horizon Specs - Premium 18k Gold-Plated Sunglasses',
  'Protect your eyes with Horizon Specs premium gold-plated polarized sunglasses. Handcrafted titanium frames, UV400 protection, and custom leather case.'
);

-- 3.7 BeanMaster Pro
INSERT INTO product_details (
  product_id, long_description, highlights, specifications, rating, reviews_count, stock_status, shipping_info, gallery_images, meta_title, meta_description
) VALUES (
  'a7b8c9d0-e1f2-4a5b-8c3d-5e6f7a8b9c0d',
  'Awaken your senses with the BeanMaster Pro, a state-of-the-art automatic coffee maker designed to bring the barista experience directly to your kitchen. Featuring a highly precise conically-ground burr mill, it grinds your favorite coffee beans fresh for every cup, extracting maximum aroma and flavor. The customizable brewing temperature and strength controls let you dial in the perfect cup of coffee, espresso, or ristretto, direct into your favorite ceramic mug or travel tumbler.',
  ARRAY[
    'Integrated conical burr grinder with 15 adjustable grind settings',
    'Digital temperature control (PID) delivers water at exact brewing temp',
    'Customizable brew strength (Mild, Medium, Bold) and cup sizing',
    'Programmable auto-start timer so you wake up to fresh coffee',
    'High-pressure 15-bar Italian pump for perfect espresso crema',
    'Steam wand for creamy lattes, cappuccinos, and flat whites'
  ],
  '{"Pump Pressure": "15-Bar Italian Pump", "Grinder": "Stainless Steel Conical Burr", "Water Tank": "2.0 Liter Removable", "Bean Hopper": "250g Airtight", "Power": "1450 Watts", "Dimensions": "32 x 26 x 38 cm", "Weight": "7.5 kg"}'::jsonb,
  4.8, 174, 'in_stock', 'Free express shipping with heavy-goods insurance',
  ARRAY['https://lh3.googleusercontent.com/aida-public/AB6AXuA1XtxEuJKlCLnnoX7KjrjXne8K4BR0wFfKOvmMzlI5Onk4lbkZvNMNDxSormIOdkZWolRPtKt5-SGZf94x0VRSp5JrS73p1uVPiXjo6dQj80kfCGX0ohvc554SjbV_sY28CF_B4uxQ1mi_5k6d4F7B1wPA8-mDKMiw_dMJl0miaOvRVPsQw4hEoSLRCXeSa8ryqv6-z-KP1ePL1TbqSGj5vNXU7I79b1GdSUwNVLjZlbXsczooFrZZYf6SAcHEDxb_AhYN4t92G5Bp'],
  'BeanMaster Pro - Automatic Coffee & Espresso Machine',
  'Elevate your mornings with BeanMaster Pro automatic coffee maker. Built-in conical burr grinder, 15-bar Italian pump, and custom strength options.'
);

-- 3.8 Shield Case Ultra
INSERT INTO product_details (
  product_id, long_description, highlights, specifications, rating, reviews_count, stock_status, shipping_info, gallery_images, meta_title, meta_description
) VALUES (
  'b8c9d0e1-f2a3-4b5c-8d4e-6f7a8b9c0d1e',
  'Provide unmatched, premium protection for your smartphone with the Shield Case Ultra. Crafted using an advanced dual-layer system combining high-grade impact-absorbing TPU with a matte-finish hard polycarbonate back, this case has been drop-tested to meet military standards (MIL-STD 810G). Featuring raised bezels to guard your screen and camera lenses, precise port cutouts, and integrated responsive tactile buttons, it delivers complete protection without compromising on bulk.',
  ARRAY[
    'Dual-layer impact protection: Shockproof TPU + PC hard outer shell',
    'Certified military-grade drop protection (MIL-STD 810G up to 10 feet)',
    'Raised edge bezels (1.5mm) to shield display and camera lenses',
    'Sleek, fingerprint-resistant matte coating in forest green',
    'Compatible with standard wireless charging and magnetic accessories',
    'Tactile responsive buttons and precision port alignment cutouts'
  ],
  '{"Materials": "Shock-absorbing TPU & Polycarbonate", "Drop Protection": "Up to 10 feet (3m) MIL-STD 810G", "Color": "Matte Forest Green", "Weight": "28g", "Bezel Rise": "1.5mm Screen, 1.8mm Camera", "Wireless Charging": "Yes, fully compatible"}'::jsonb,
  4.4, 53, 'in_stock', 'Free shipping on orders over $50',
  ARRAY['https://lh3.googleusercontent.com/aida-public/AB6AXuD5LF-RgRraOL3mWitI-IrYrA80I1qh3hPuJG3UiFcM2kdgjjWE37I0DoDjz2FEEY7Q7g5RVfu4l1-bJyOkJd4F9Q7NJ8Fi4QfvieP-aYdR4jKhZD56LcM_QgemofEbcxNn15Czbzw31isyPNPiKLjrOpqL0hxqbZZxequpsxZuSAfKCoXLfO-C4qXHdNMd6H0-1PcO9UUam5jhzAliq6qNWJLJj2eBuZlLrpKkUTrw0vuNDUsU9A7s7lgOfmNGzhsoUCfcb-exaj0h'],
  'Shield Case Ultra - Military Grade Slim Phone Case',
  'Buy the Shield Case Ultra in Matte Forest Green. Ultimate drop protection up to 10 feet, dual-layer premium materials, wireless charging compatible.'
);
