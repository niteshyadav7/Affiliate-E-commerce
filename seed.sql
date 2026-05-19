-- ============================================
-- SHOPVERSE SEED DATA
-- Run this in your Supabase SQL Editor
-- to populate the store with the Stitch design products!
-- ============================================

-- Clear existing data (optional, but good for a fresh start)
TRUNCATE products CASCADE;

-- Insert Products
INSERT INTO products (id, name, description, price, image_url, category, is_active)
VALUES 
  (
    'a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d', 
    'Acoustic Pro Max', 
    'Modern premium noise-cancelling wireless headphones in space grey.', 
    '$299.00', 
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ8ZxBELdGezf2X1RdWRBcZSz3S9vJsXJj9bO0vnGYaNNcBB2dqbGQHF0yp0Cs6l1OZ1ghSB6UKe2pnKi6bFNsl98lWaVFRrrLsY3k0Xil55X8WLQZb8mf3SOTtv8uTNUipFW0rqaCXZSX00v7HFT4yUoHspg61T5c-961rzFzTadlOPfotNkJ1ZlLdSxcGd6_58s75nQrhpnasVHJ6vpBkzlzcgHUQaz2_ksINM4VvBrIOfD1G7HWd9JN-KnvpaXqBb7V0Arsc-b4', 
    'Electronics', 
    true
  ),
  (
    'b2c3d4e5-f6a7-4b5c-8d9e-0f1a2b3c4d5e', 
    'Nexus Watch S', 
    'A sleek, futuristic smartwatch with a high-resolution circular display.', 
    '$149.00', 
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBV89iLGzkvvbvSFuypVD4OR9w4RojkGVABDdTX9E4yHKBpxlbNb-POaQAKjaNjkIGg7RZ6HPG9NcEbYTJzFXMSw9_KTqkcMU756b1yHaSk-QnYS-1eAZlUehC81GcjPtv_GfMDReXEQWnmHFf8LSveBUFdwNJNJOpcHU_zoKYirUDGtD3yjbPcAokbMuWLaDP7niJ1GlUA-OqAZD47P6giuJRKfMmS2-wnOyqprZvxDhIWKXHj6fduUWBGZsIk6FrxveBNks6EC139', 
    'Electronics', 
    true
  ),
  (
    'c3d4e5f6-a7b8-4c5d-8e9f-1a2b3c4d5e6f', 
    'Velocity Run V2', 
    'Luxury performance running shoes in a vibrant red and white colorway.', 
    '$120.00', 
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCYvpAlE3hnm3zMcKCcJcIUnJwlJY2wB_zOfErrprKRvhqArX4HRacyYowJAUFNCyRQpcnDXMdTaZxrE6-v_NRiTb3su7yYmwfK5P-RpJ4G0I1sLjW6Hx5vuruu98pUhun50LvHbMJ33ik_eQcOM_kZ_G9fhrkMLBsPLTZllKGlf5AUMe0HLLpZkz7zersm3tQpn2T3VD9sRiUO4MD4WmxFswGB3OKm2tv1Sqg0WRQe5EsZdhUSSKfZ044fqkVHBz690VaLwX3af-Pj', 
    'New Arrival', 
    true
  ),
  (
    'd4e5f6a7-b8c9-4d5e-8f0a-2b3c4d5e6f7a', 
    'Aura Air Notebook', 
    'A slim, high-performance silver laptop with ultra-thin bezels.', 
    '$899.00', 
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBKUJe1qRt_4KXB3jNwH7fO8Fv5a7mwz2iyTAeeQTtaYAcBEap_80mG-hNSuBwP8KKYpdfg5ppvL04iMbEXBNiFzwUedyNaZI9lHE9NO1mHa_IMOOdozNEWSUOJ-VahjcmYLGEGX6QDe-wT0SNU4DfEOaL_XxXRptXatv5gF2wpwrj3-fzBtD1puEKESW6VDeGtVjhFfc5d_O5e-LdOS-sKkVXntdbIskTmgLNdPgrH9nkG7BZo1I5GQqEf0JKI0C3mfOoml8BO5M2N', 
    'Electronics', 
    true
  ),
  (
    'e5f6a7b8-c9d0-4e5f-8a1b-3c4d5e6f7a8b',
    'Nomad Pack',
    'A rugged yet stylish leather and canvas backpack for urban travelers.',
    '$85.00',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA-dWmpKH_dr46FBsaLN9lC7sbwkMZs-Y__nR_sIxD6ObTOSXqab57wukCQOuLHzwjzWiK9fdbUPOeseTp1Og8-R5CB5KcpIAIjAAhCo7iXuoi_hIyyfcdx1WwCmL8Z6Jz8ZcEHNj8HhQ5oSsRflZ9DFCxnudVx-Q6YRYAkx8d6aVsPvFAwlFub2GT_zq-9w2aOIIUjMua1G0hnUEMeyYZT_y6gaAwsKNpIdpAGTOWuDgg2yNRtYH5DB0TT09dgve87iV38ykV8oX-c',
    'Lifestyle',
    true
  ),
  (
    'f6a7b8c9-d0e1-4f5a-8b2c-4d5e6f7a8b9c',
    'Horizon Specs',
    'Modern designer sunglasses with a gold metal frame and dark polarized lenses.',
    '$180.00',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBiqKwrjV6OBZJnv6aBF-hnADm-K68XNQSHdFIIa3JruAnH_CmW7GfUUIandDWKdUDXJKbxI-4i4RGwFzsIScWENUR_bf05fBNoG7BRWerSFJKvLexH6CYhQrZK1fiYlivER9WKJ0owRZkwRLhuyfvfGurvP65MaUosaGhjjGOuhGzoW4I5TZWJLY6qf-SZrjOLqokJuuLHxMLek5LpL8K4hL_GgOXwr-Rg_6_LRjObB-UeNjEemNHlf-4cXKWFlJkG82Gwv9LsCVgh',
    'Fashion',
    true
  ),
  (
    'a7b8c9d0-e1f2-4a5b-8c3d-5e6f7a8b9c0d',
    'BeanMaster Pro',
    'A sleek black automatic coffee maker brewing coffee into a ceramic mug.',
    '$245.00',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA1XtxEuJKlCLnnoX7KjrjXne8K4BR0wFfKOvmMzlI5Onk4lbkZvNMNDxSormIOdkZWolRPtKt5-SGZf94x0VRSp5JrS73p1uVPiXjo6dQj80kfCGX0ohvc554SjbV_sY28CF_B4uxQ1mi_5k6d4F7B1wPA8-mDKMiw_dMJl0miaOvRVPsQw4hEoSLRCXeSa8ryqv6-z-KP1ePL1TbqSGj5vNXU7I79b1GdSUwNVLjZlbXsczooFrZZYf6SAcHEDxb_AhYN4t92G5Bp',
    'Lifestyle',
    true
  ),
  (
    'b8c9d0e1-f2a3-4b5c-8d4e-6f7a8b9c0d1e',
    'Shield Case Ultra',
    'A premium matte-finish phone case in a deep forest green color.',
    '$35.00',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD5LF-RgRraOL3mWitI-IrYrA80I1qh3hPuJG3UiFcM2kdgjjWE37I0DoDjz2FEEY7Q7g5RVfu4l1-bJyOkJd4F9Q7NJ8Fi4QfvieP-aYdR4jKhZD56LcM_QgemofEbcxNn15Czbzw31isyPNPiKLjrOpqL0hxqbZZxequpsxZuSAfKCoXLfO-C4qXHdNMd6H0-1PcO9UUam5jhzAliq6qNWJLJj2eBuZlLrpKkUTrw0vuNDUsU9A7s7lgOfmNGzhsoUCfcb-exaj0h',
    'Gadgets',
    true
  );

-- Insert Links (Round-Robin Targets)
INSERT INTO product_links (product_id, url, label, sort_order)
VALUES 
  -- Acoustic Pro Max Links
  ('a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d', 'https://amazon.com/dp/B09XS7JWHH', 'Amazon', 0),
  ('a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d', 'https://bestbuy.com/site/sony-headphones', 'BestBuy', 1),
  ('a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d', 'https://target.com/p/sony-headphones', 'Target', 2),
  
  -- Nexus Watch S Links
  ('b2c3d4e5-f6a7-4b5c-8d9e-0f1a2b3c4d5e', 'https://amazon.com/dp/smartwatch', 'Amazon', 0),
  ('b2c3d4e5-f6a7-4b5c-8d9e-0f1a2b3c4d5e', 'https://samsung.com/smartwatch', 'Samsung Store', 1),
  
  -- Velocity Run V2 Links
  ('c3d4e5f6-a7b8-4c5d-8e9f-1a2b3c4d5e6f', 'https://nike.com/t/running-shoe', 'Nike Official', 0),
  ('c3d4e5f6-a7b8-4c5d-8e9f-1a2b3c4d5e6f', 'https://footlocker.com/nike', 'Foot Locker', 1),
  
  -- Aura Air Notebook Links
  ('d4e5f6a7-b8c9-4d5e-8f0a-2b3c4d5e6f7a', 'https://apple.com/macbook-air', 'Apple Store', 0),
  ('d4e5f6a7-b8c9-4d5e-8f0a-2b3c4d5e6f7a', 'https://amazon.com/macbook-air', 'Amazon', 1),
  
  -- Nomad Pack Links
  ('e5f6a7b8-c9d0-4e5f-8a1b-3c4d5e6f7a8b', 'https://amazon.com/nomad-backpack', 'Amazon', 0),
  ('e5f6a7b8-c9d0-4e5f-8a1b-3c4d5e6f7a8b', 'https://rei.com/backpacks', 'REI', 1),

  -- Horizon Specs Links
  ('f6a7b8c9-d0e1-4f5a-8b2c-4d5e6f7a8b9c', 'https://sunglasshut.com/horizon', 'Sunglass Hut', 0),
  ('f6a7b8c9-d0e1-4f5a-8b2c-4d5e6f7a8b9c', 'https://amazon.com/horizon-glasses', 'Amazon', 1),

  -- BeanMaster Pro Links
  ('a7b8c9d0-e1f2-4a5b-8c3d-5e6f7a8b9c0d', 'https://amazon.com/beanmaster', 'Amazon', 0),
  ('a7b8c9d0-e1f2-4a5b-8c3d-5e6f7a8b9c0d', 'https://williams-sonoma.com/coffee', 'Williams Sonoma', 1),

  -- Shield Case Ultra Links
  ('b8c9d0e1-f2a3-4b5c-8d4e-6f7a8b9c0d1e', 'https://amazon.com/shield-case', 'Amazon', 0),
  ('b8c9d0e1-f2a3-4b5c-8d4e-6f7a8b9c0d1e', 'https://casetify.com/shield', 'Casetify', 1);

-- Initialize Counters
INSERT INTO product_counters (product_id, next_index, total_clicks)
VALUES 
  ('a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d', 0, 0),
  ('b2c3d4e5-f6a7-4b5c-8d9e-0f1a2b3c4d5e', 0, 0),
  ('c3d4e5f6-a7b8-4c5d-8e9f-1a2b3c4d5e6f', 0, 0),
  ('d4e5f6a7-b8c9-4d5e-8f0a-2b3c4d5e6f7a', 0, 0),
  ('e5f6a7b8-c9d0-4e5f-8a1b-3c4d5e6f7a8b', 0, 0),
  ('f6a7b8c9-d0e1-4f5a-8b2c-4d5e6f7a8b9c', 0, 0),
  ('a7b8c9d0-e1f2-4a5b-8c3d-5e6f7a8b9c0d', 0, 0),
  ('b8c9d0e1-f2a3-4b5c-8d4e-6f7a8b9c0d1e', 0, 0);
