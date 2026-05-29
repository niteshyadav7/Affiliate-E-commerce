/**
 * Organic Amazon, Flipkart, and Generic URL Generation Utilities
 */

const CRID_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const B64URL_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

function randomString(length: number, charset: string): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return result;
}

export function generateCrid(): string {
  return randomString(12 + Math.floor(Math.random() * 2), CRID_CHARS);
}

export function generateDib(): string {
  const header = 'eyJ2IjoiMSJ9';
  const payloadLen = 120 + Math.floor(Math.random() * 60);
  const sigLen = 40 + Math.floor(Math.random() * 8);
  return `${header}.${randomString(payloadLen, B64URL_CHARS)}.${randomString(sigLen, B64URL_CHARS)}`;
}

export function generateQid(): string {
  const now = Math.floor(Date.now() / 1000);
  const drift = Math.floor(Math.random() * 600) - 300; // ±300 s
  return String(now + drift);
}

export function generatePosition(): number {
  const r = Math.random() * 100;
  if (r < 40) return 1 + Math.floor(Math.random() * 5);    // 1-5   (40 %)
  if (r < 75) return 6 + Math.floor(Math.random() * 11);   // 6-16  (35 %)
  if (r < 90) return 17 + Math.floor(Math.random() * 16);  // 17-32 (15 %)
  return 33 + Math.floor(Math.random() * 16);               // 33-48 (10 %)
}

export function extractASIN(url: string): string | null {
  if (!url) return null;

  const patterns = [
    /\/dp\/([A-Z0-9]{10})/i,
    /\/product\/([A-Z0-9]{10})/i,
    /\/gp\/product\/([A-Z0-9]{10})/i,
    /\/ASIN\/([A-Z0-9]{10})/i,
    /[?&]asin=([A-Z0-9]{10})/i,
    /\/([A-Z0-9]{10})(?:[/?]|$)/i
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1].toUpperCase();
    }
  }

  return null;
}

export function isValidAmazonUrl(url: string): boolean {
  if (!url) return false;
  try {
    const hostname = new URL(url).hostname;
    return hostname.includes('amazon.');
  } catch {
    return false;
  }
}

export function extractTitleSlug(url: string): string {
  if (!url) return '';
  try {
    const path = new URL(url).pathname;
    const match = path.match(/^\/([^/]+)\/dp\//i);
    if (match && match[1] && match[1].length > 2 && match[1] !== 'dp' && match[1] !== 'gp') {
      return match[1];
    }
  } catch { /* ignore */ }
  return '';
}

export const MARKETPLACES: Record<string, { domain: string; code: string }> = {
  'amazon.com': { domain: 'amazon.com', code: 'US' },
  'amazon.in': { domain: 'amazon.in', code: 'IN' },
  'amazon.co.uk': { domain: 'amazon.co.uk', code: 'UK' },
  'amazon.ca': { domain: 'amazon.ca', code: 'CA' },
  'amazon.de': { domain: 'amazon.de', code: 'DE' },
  'amazon.fr': { domain: 'amazon.fr', code: 'FR' },
  'amazon.it': { domain: 'amazon.it', code: 'IT' },
  'amazon.es': { domain: 'amazon.es', code: 'ES' },
  'amazon.co.jp': { domain: 'amazon.co.jp', code: 'JP' },
  'amazon.com.au': { domain: 'amazon.com.au', code: 'AU' },
  'amazon.com.br': { domain: 'amazon.com.br', code: 'BR' },
  'amazon.com.mx': { domain: 'amazon.com.mx', code: 'MX' }
};

export function detectMarketplace(url: string) {
  if (!url) return MARKETPLACES['amazon.com'];
  try {
    const hostname = new URL(url).hostname.replace('www.', '');
    if (MARKETPLACES[hostname]) {
      return MARKETPLACES[hostname];
    }
    for (const key of Object.keys(MARKETPLACES)) {
      if (hostname.includes(key)) {
        return MARKETPLACES[key];
      }
    }
  } catch {}
  return MARKETPLACES['amazon.com'];
}

export function detectCategoryFromSlug(slug: string): string {
  if (!slug) return 'aps';
  const clean = slug.toLowerCase();

  const mappings = [
    { code: 'hpc', keywords: ['underarm', 'detanning', 'spotlite', 'sanfe', 'skin', 'cream', 'serum', 'body', 'wash', 'face', 'shampoo', 'hair', 'soap', 'oil', 'gel', 'lotion', 'hygiene', 'personal', 'care', 'health', 'wellness', 'supplement', 'vitamin'] },
    { code: 'beauty', keywords: ['makeup', 'lipstick', 'liner', 'mascara', 'foundation', 'eyebrow', 'perfume', 'fragrance', 'grooming', 'trimmer', 'shaver', 'wax', 'hair-styling'] },
    { code: 'electronics', keywords: ['phone', 'mobile', 'charger', 'cable', 'earphone', 'headphone', 'speaker', 'camera', 'lens', 'tripod', 'powerbank', 'adapter', 'tv', 'television', 'audio'] },
    { code: 'computers', keywords: ['laptop', 'pc', 'monitor', 'keyboard', 'mouse', 'router', 'wifi', 'hard-drive', 'ssd', 'usb', 'ram', 'motherboard', 'printer'] },
    { code: 'fashion', keywords: ['shirt', 'pant', 'dress', 'jeans', 'tshirt', 't-shirt', 'jacket', 'coat', 'sweater', 'socks', 'underwear', 'clothing', 'apparel'] },
    { code: 'shoes', keywords: ['shoe', 'sneaker', 'boot', 'sandal', 'slipper', 'bag', 'backpack', 'handbag', 'wallet', 'purse'] },
    { code: 'watches', keywords: ['watch', 'smartwatch', 'clock', 'timepiece'] },
    { code: 'kitchen', keywords: ['kitchen', 'cooker', 'pan', 'bottle', 'knife', 'spoon', 'fork', 'cup', 'mug', 'blender', 'toaster', 'mixer', 'cookware', 'oven'] },
    { code: 'appliances', keywords: ['fridge', 'refrigerator', 'washing-machine', 'dryer', 'dishwasher', 'vacuum', 'ac', 'air-conditioner', 'heater'] },
    { code: 'books', keywords: ['book', 'novel', 'paperback', 'hardcover', 'dictionary', 'biography', 'story'] },
    { code: 'toys', keywords: ['toy', 'game', 'puzzle', 'doll', 'action-figure', 'boardgame', 'lego', 'clay'] },
    { code: 'sports', keywords: ['sport', 'fitness', 'dumbbells', 'yoga', 'mat', 'treadmill', 'cycle', 'racket', 'bat', 'ball', 'gym'] },
    { code: 'grocery', keywords: ['tea', 'coffee', 'snack', 'spices', 'salt', 'sugar', 'rice', 'dal', 'oil', 'honey', 'chocolate', 'cookie', 'biscuit', 'food'] },
    { code: 'baby', keywords: ['baby', 'diaper', 'wipes', 'stroller', 'crib', 'pacifier', 'feeder', 'infant'] },
    { code: 'pet-supplies', keywords: ['dog', 'cat', 'pet', 'aquarium', 'fish', 'bird', 'leash', 'collar', 'kibble'] },
    { code: 'automotive', keywords: ['car', 'bike', 'helmet', 'tyre', 'tire', 'polish', 'wiper', 'seat-cover'] }
  ];

  for (const map of mappings) {
    if (map.keywords.some(kw => clean.includes(kw))) {
      return map.code;
    }
  }

  return 'aps';
}

export function generateOrganicUrl({
  asin,
  marketplace,
  titleSlug = '',
  keywords = [],
  category = 'aps',
}: {
  asin: string;
  marketplace: string;
  titleSlug?: string;
  keywords?: string[];
  category?: string;
}): string {
  const pos = generatePosition();
  const crid = generateCrid();
  const dib = generateDib();
  const qid = generateQid();

  const slugPart = titleSlug ? `/${titleSlug}` : '';
  const path = `https://www.${marketplace}${slugPart}/dp/${asin}/ref=sr_1_${pos}`;

  const keywordStr = keywords
    .map(w => encodeURIComponent(w))
    .join('%2B');

  const rawKw = keywords.join('+');
  const truncLen = Math.max(3, rawKw.length - Math.floor(Math.random() * 4));
  const truncated = rawKw.substring(0, truncLen);
  const truncEnc = encodeURIComponent(truncated).replace(/%20/g, '+');
  const suffixNum = 200 + Math.floor(Math.random() * 200);

  const parts = [
    `crid=${crid}`,
    `dib=${dib}`,
    `dib_tag=se`,
    `keywords=${keywordStr}`,
    `qid=${qid}`,
  ];

  if (category && category !== 'aps') {
    parts.push(`s=${category}`);
  }

  parts.push(`sprefix=${truncEnc}%2C${category}%2C${suffixNum}`);
  parts.push(`sr=1-${pos}`);
  parts.push(`th=1`);

  return `${path}?${parts.join('&')}`;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function isAlreadyExpanded(url: string): boolean {
  if (!url) return false;
  return url.includes('org_rot=1') || url.includes('crid=') || url.includes('dib=');
}

export function getHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

export function generateKeywordVariations(productName: string, titleSlug: string): string[][] {
  const cleanName = productName.toLowerCase().replace(/[^a-z0-9\s]+/g, ' ');
  const cleanSlug = titleSlug.toLowerCase().replace(/[^a-z0-9\s-]+/g, ' ').replace(/-/g, ' ');
  
  const words = `${cleanName} ${cleanSlug}`
    .split(/\s+/)
    .map(w => w.trim())
    .filter(w => w.length > 2);

  // Exclude common affiliate marketing stop words to construct realistic human search strings
  const stopWords = new Set([
    'and', 'for', 'with', 'the', 'you', 'your', 'from', 'its', 'all', 'any', 'new', 'best', 
    'pro', 'max', 'set', 'pax', 'pcs', 'pack', 'size', 'free', 'buy', 'now', 'off', 'super',
    'toy', 'toys', 'kids', 'for'
  ]);

  const richWords = words.filter(w => !stopWords.has(w));
  const baseWords = richWords.length >= 2 ? richWords : (words.length >= 2 ? words : ['product']);

  const variations: string[][] = [];

  // Variation 1: First 2-3 words (Brand + Product name focus)
  variations.push(baseWords.slice(0, Math.min(3, baseWords.length)));

  // Variation 2: End words (Feature / Category focus)
  if (baseWords.length >= 3) {
    variations.push(baseWords.slice(Math.max(1, baseWords.length - 2), baseWords.length));
  } else {
    variations.push([baseWords[baseWords.length - 1]]);
  }

  // Variation 3: Brand name + last word (Simple search, e.g. "sanfe cream")
  variations.push([baseWords[0], baseWords[baseWords.length - 1]].filter(Boolean));

  // Variation 4: Middle word + Category
  if (baseWords.length >= 3) {
    variations.push([baseWords[Math.floor(baseWords.length / 2)], baseWords[baseWords.length - 1]].filter(Boolean));
  } else {
    variations.push([baseWords[0]]);
  }

  // Variation 5: Comprehensive phrase (Up to 4 rich words)
  variations.push(baseWords.slice(0, Math.min(4, baseWords.length)));

  // Deduplicate and pad until we have exactly 5 diverse organic keywords list
  const seen = new Set<string>();
  const finalVariations: string[][] = [];

  for (const v of variations) {
    const key = v.join('+');
    if (!seen.has(key) && v.length > 0) {
      seen.add(key);
      finalVariations.push(v);
    }
  }

  while (finalVariations.length < 5) {
    const randomPick = [];
    const numWords = Math.min(baseWords.length, 2 + Math.floor(Math.random() * 2));
    const shuffled = [...baseWords].sort(() => 0.5 - Math.random());
    for (let i = 0; i < numWords; i++) {
      randomPick.push(shuffled[i]);
    }
    const key = randomPick.join('+');
    if (!seen.has(key) && randomPick.length > 0) {
      seen.add(key);
      finalVariations.push(randomPick);
    } else {
      finalVariations.push(baseWords.slice(0, 2));
    }
  }

  return finalVariations.slice(0, 5);
}

export function generateGenericOrganicLinks(url: string, productName: string): { url: string; label: string }[] {
  const titleSlug = slugify(productName);
  const keywordVariations = generateKeywordVariations(productName, titleSlug);
  const results = [];

  // We vary the search parameter keys to mimic natural variety across different e-commerce scripts
  const searchKeys = ['q', 's', 'search', 'search_query', 'query'];

  for (let i = 1; i <= 5; i++) {
    const currentKeywords = (keywordVariations[i - 1] || ['product']).join('+');
    const qid = generateQid();
    const pos = generatePosition();
    const searchKey = searchKeys[i - 1] || 'q';
    
    const separator = url.includes('?') ? '&' : '?';
    // Append standard organic parameters (keywords, timestamp, search position, and deduplication flag)
    const orgUrl = `${url}${separator}${searchKey}=${encodeURIComponent(currentKeywords)}&ref=search&qid=${qid}&pos=${pos}&org_rot=1`;
    
    results.push({
      url: orgUrl,
      label: `Organic Link ${i}`
    });
  }

  return results;
}

export function generate5OrganicUrls(url: string, productName: string): { url: string; label: string }[] {
  // If it's already expanded, return it as a single link to prevent infinite loop
  if (isAlreadyExpanded(url)) {
    return [{ url, label: 'Link' }];
  }

  const hostname = getHostname(url).toLowerCase();
  const isAmazon = hostname.includes('amazon.');
  const isFlipkart = hostname.includes('flipkart.');

  const results = [];
  
  if (isAmazon) {
    const asin = extractASIN(url);
    if (!asin) {
      return generateGenericOrganicLinks(url, productName);
    }
    const market = detectMarketplace(url);
    const titleSlug = extractTitleSlug(url) || slugify(productName);
    const category = detectCategoryFromSlug(titleSlug);
    const keywordVariations = generateKeywordVariations(productName, titleSlug);

    for (let i = 1; i <= 5; i++) {
      const currentKeywords = keywordVariations[i - 1] || [asin];
      const orgUrl = generateOrganicUrl({
        asin,
        marketplace: market?.domain || 'amazon.in',
        titleSlug,
        keywords: currentKeywords,
        category,
      });
      // Append signature to prevent double-expansion
      const finalUrl = orgUrl.includes('?') ? `${orgUrl}&org_rot=1` : `${orgUrl}?org_rot=1`;
      results.push({
        url: finalUrl,
        label: `Organic Link ${i}`
      });
    }
  } else if (isFlipkart) {
    const titleSlug = slugify(productName);
    const keywordVariations = generateKeywordVariations(productName, titleSlug);

    for (let i = 1; i <= 5; i++) {
      const currentKeywords = (keywordVariations[i - 1] || ['product']).join('+');
      const pos = generatePosition();
      const qid = generateQid();
      
      const separator = url.includes('?') ? '&' : '?';
      const orgUrl = `${url}${separator}q=${encodeURIComponent(currentKeywords)}&as-pos=${pos}&as-type=suggestion&otracker=search&qid=${qid}&org_rot=1`;
      results.push({
        url: orgUrl,
        label: `Organic Link ${i}`
      });
    }
  } else {
    // DMart, Chupps, or other custom e-commerce stores
    results.push(...generateGenericOrganicLinks(url, productName));
  }

  return results;
}
