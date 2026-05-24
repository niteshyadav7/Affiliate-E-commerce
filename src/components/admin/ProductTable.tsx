"use client";

import { useState, useEffect } from "react";
import {
  Edit2,
  Trash2,
  Link as LinkIcon,
  Plus,
  ExternalLink,
  Upload,
  X,
  FileText,
  AlertCircle,
  CheckCircle2,
  Download,
} from "lucide-react";
import Button from "@/components/atoms/Button";
import ProductForm from "./ProductForm";

export default function ProductTable({ role = "viewer" }: { role?: string }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const copyToClipboard = (slug: string, id: string) => {
    const url = `${window.location.origin}/r/${slug || id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const exportProductsToCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Category",
      "Price",
      "Is Active",
      "Slug",
      "Landing Page URL",
      "Short Redirect URL",
      "Image URL",
      "Description",
      "Affiliate Links Count",
      "Total Clicks"
    ];

    const baseUrl = window.location.origin;

    const rows = products.map((product) => {
      const slugOrId = product.slug || product.id;
      const landingPageUrl = `${baseUrl}/product/${slugOrId}`;
      const shortRedirectUrl = `${baseUrl}/r/${slugOrId}`;
      const activeLinksCount = product.product_links?.length || 0;
      const totalClicks = product.product_counters?.[0]?.total_clicks || 0;

      return [
        product.id || "",
        product.name || "",
        product.category || "",
        product.price || "",
        product.is_active ? "Yes" : "No",
        product.slug || "",
        landingPageUrl,
        shortRedirectUrl,
        product.image_url || "",
        product.description || "",
        activeLinksCount,
        totalClicks,
      ];
    });

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((val) => `"${val.toString().replace(/"/g, '""')}"`).join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `diversified-yp_products_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (product: any) => {
    try {
      await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...product, is_active: !product.is_active }),
      });
      fetchProducts();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  if (loading) return <div>Loading products...</div>;

  return (
    <>
      {isEditing && (
        <ProductForm
          product={editingProduct}
          onSave={() => {
            setIsEditing(false);
            setEditingProduct(null);
            fetchProducts();
          }}
          onCancel={() => {
            setIsEditing(false);
            setEditingProduct(null);
          }}
        />
      )}

      <BulkUploadModal
        isOpen={isBulkUploadOpen}
        onClose={() => setIsBulkUploadOpen(false)}
        onUploadComplete={fetchProducts}
      />

      <div className="bg-white rounded-2xl shadow-sm border border-surface-container-low overflow-hidden">
        <div className="p-6 border-b border-surface-container-low flex justify-between items-center">
          <h2 className="font-display text-xl font-bold text-primary">
            All Products
          </h2>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-2 text-xs border-primary/20 text-primary hover:bg-primary/5"
              onClick={exportProductsToCSV}
            >
              <Download className="w-4 h-4" /> Export CSV
            </Button>
            {role !== "viewer" && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-2 text-xs"
                  onClick={() => setIsBulkUploadOpen(true)}
                >
                  <Upload className="w-4 h-4" /> Bulk Upload
                </Button>
                <Button
                  size="sm"
                  className="flex items-center gap-2 text-xs"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsEditing(true);
                  }}
                >
                  <Plus className="w-4 h-4" /> Add Product
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-on-secondary-container">
            <thead className="bg-surface/50 text-xs uppercase bg-gray-50 border-b border-surface-container-low">
              <tr>
                <th className="px-6 py-4 font-bold text-primary">Product</th>
                <th className="px-6 py-4 font-bold text-primary">Category</th>
                <th className="px-6 py-4 font-bold text-primary">Price</th>
                <th className="px-6 py-4 font-bold text-primary">
                  Links & Clicks
                </th>
                <th className="px-6 py-4 font-bold text-primary">Status</th>
                {role !== "viewer" && (
                  <th className="px-6 py-4 font-bold text-primary text-right">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-surface-container-low hover:bg-surface/30"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface flex-shrink-0 overflow-hidden">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-primary">
                          {product.name}
                        </div>
                        <div className="text-xs opacity-70 truncate max-w-[200px]">
                          {product.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary/5 text-primary">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-primary">
                    {product.price}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-xs">
                      <span className="flex items-center gap-1.5 text-primary font-bold">
                        <LinkIcon className="w-3.5 h-3.5" />{" "}
                        {product.product_links?.length || 0} active links
                      </span>
                      <div className="flex items-center gap-1 mt-1 bg-surface py-0.5 px-1.5 rounded-lg border border-outline/10 w-fit max-w-[120px]">
                        <span
                          className="font-mono text-[7px] text-primary opacity-80 select-all truncate"
                          title={`/r/${product.slug || "no-slug"}`}
                        >
                          /r/{product.slug || "no-slug"}
                        </span>
                        <button
                          onClick={() =>
                            copyToClipboard(product.slug, product.id)
                          }
                          className="text-[7px] text-primary hover:underline font-bold cursor-pointer transition-all whitespace-nowrap"
                        >
                          {copiedId === product.id ? "Copied!" : "Copy"}
                        </button>
                      </div>
                      <span className="opacity-70 text-[10px] mt-0.5">
                        Total Clicks:{" "}
                        {product.product_counters?.[0]?.total_clicks || 0}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      disabled={role === "viewer"}
                      onClick={() => toggleStatus(product)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${role === "viewer" ? "cursor-not-allowed opacity-60" : "cursor-pointer"} ${product.is_active ? "bg-green-500" : "bg-gray-300"}`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${product.is_active ? "translate-x-5" : "translate-x-1"}`}
                      />
                    </button>
                  </td>
                  {role !== "viewer" && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setIsEditing(true);
                          }}
                          className="p-2 text-on-secondary-container hover:text-primary bg-surface rounded-lg hover:bg-surface-container-low transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {role === "super_admin" && (
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-red-400 hover:text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function BulkUploadModal({
  isOpen,
  onClose,
  onUploadComplete,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [parsedProducts, setParsedProducts] = useState<any[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "schema">("upload");
  const [selectedSchemaCol, setSelectedSchemaCol] = useState<number>(0);
  const [hoveredSchemaCol, setHoveredSchemaCol] = useState<number | null>(null);
  const [sampleRowCopiedIdx, setSampleRowCopiedIdx] = useState<number | null>(
    null,
  );

  const SCHEMA_COLUMNS = [
    {
      name: "Name",
      required: true,
      type: "String",
      desc: "The product title. Used to display on lists and detail pages.",
      example: "Short Kurta Palazzo Set Dark Green 10R",
      tip: "Strips out underscores to spaces dynamically. Used for generating SEO slugs.",
    },
    {
      name: "Category",
      required: false,
      type: "String",
      desc: "Product group. Helps in filtering.",
      example: "Fashion",
      tip: "Standard categories are: Fashion, Electronics, Gadgets, Lifestyle.",
    },
    {
      name: "Price",
      required: true,
      type: "Decimal/Number",
      desc: "Selling price of the product.",
      example: "499.00",
      tip: "Do not include currency symbols ($, ₹). Numeric floats only.",
    },
    {
      name: "Image URL",
      required: false,
      type: "URL",
      desc: "Main catalog image displayed everywhere.",
      example: "https://lh3.googleusercontent.com/d/1_YOUR_IMAGE_ID_HERE",
      tip: "Google Drive urls are auto-hydrated! Format: https://lh3.googleusercontent.com/d/IMAGE_ID",
    },
    {
      name: "Description",
      required: false,
      type: "String",
      desc: "A short sentence highlighting the product.",
      example: "Women's premium Cotton Short Kurta Palazzo Set.",
      tip: "Keep it below 120 characters for clean grid layouts.",
    },
    {
      name: "Redirect URLs",
      required: false,
      type: "String",
      desc: "Buying links from alternate retailers.",
      example:
        "Amazon|https://amazon.com/dp/B09XS7JWHH;Diversified Y&P Buy|https://diversified-yp.com/buy",
      tip: "Format: Label|URL separated by semi-colons.",
    },
    {
      name: "Long Description",
      required: false,
      type: "Text/Markdown",
      desc: "Comprehensive product description for landing page.",
      example:
        "This 100% pure cotton co-ord set for women features a beautifully styled short Kurti with fully breathable Palazzo bottoms. Tailored from premium fabrics suitable for casual summer wear and official occasions.",
      tip: "Supports raw text and standard spacing.",
    },
    {
      name: "Highlights",
      required: false,
      type: "String",
      desc: "Key bullet points showing premium features.",
      example:
        "100% Breathable Cotton|Includes Kurti and Palazzo|Plus sizes from S to 7XL|Elegant green dye",
      tip: "Separate each feature bullet with a pipe character (|).",
    },
    {
      name: "Specifications",
      required: false,
      type: "JSON or Pipe",
      desc: "Technical specs or attributes.",
      example:
        '{"Material": "Cotton", "Pattern": "Solid", "Fit": "Plus Size Available", "Wash Care": "Hand Wash"}',
      tip: "Can be JSON string, or simple key-values like: Material:Cotton|Pattern:Solid",
    },
    {
      name: "Gallery Images",
      required: false,
      type: "String",
      desc: "Additional product slider images.",
      example:
        "https://lh3.googleusercontent.com/d/1_IMAGE_1|https://lh3.googleusercontent.com/d/1_IMAGE_2",
      tip: "Separate each absolute URL with a pipe character (|).",
    },
    {
      name: "Rating",
      required: false,
      type: "Decimal",
      desc: "Dummy customer rating.",
      example: "4.9",
      tip: "Must be between 0.0 and 5.0. Default is 5.0.",
    },
    {
      name: "Reviews Count",
      required: false,
      type: "Integer",
      desc: "Total customer review counter.",
      example: "84",
      tip: "Accepts raw positive integer numbers.",
    },
    {
      name: "Stock Status",
      required: false,
      type: "String",
      desc: "Inventory level status.",
      example: "in_stock",
      tip: "Allowed values: in_stock or out_of_stock.",
    },
    {
      name: "Shipping Info",
      required: false,
      type: "String",
      desc: "Delivery estimates or policies.",
      example: "Free shipping in 2-3 business days",
      tip: "Accepts short textual description.",
    },
    {
      name: "Meta Title",
      required: false,
      type: "String",
      desc: "Search engine browser title.",
      example:
        "Women's Premium Cotton Short Kurta Palazzo Set | Diversified Y&P",
      tip: "Ideal length is around 50-60 characters.",
    },
    {
      name: "Meta Description",
      required: false,
      type: "String",
      desc: "SEO descriptive snippet.",
      example:
        "Buy premium women's cotton short kurta palazzo sets on Diversified Y&P today.",
      tip: "Ideal length is 120-160 characters.",
    },
  ];

  const sampleRows = [
    [
      "Short Kurta Palazzo Set Dark Green 10R",
      "Fashion",
      "499.00",
      "https://lh3.googleusercontent.com/d/1_YOUR_IMAGE_ID_HERE",
      "Women's premium Cotton Short Kurta Palazzo Set.",
      "Amazon|https://amazon.com/dp/B09XS7JWHH;Diversified Y&P Buy|https://diversified-yp.com/buy",
      "This 100% pure cotton co-ord set for women features a beautifully styled short Kurti with fully breathable Palazzo bottoms. Tailored from premium fabrics suitable for casual summer wear and official occasions.",
      "100% Breathable Cotton|Includes Kurti and Palazzo|Plus sizes from S to 7XL|Elegant green dye",
      '{"Material": "Cotton", "Pattern": "Solid", "Fit": "Plus Size Available", "Wash Care": "Hand Wash"}',
      "https://lh3.googleusercontent.com/d/1_IMAGE_1|https://lh3.googleusercontent.com/d/1_IMAGE_2",
      "4.9",
      "84",
      "in_stock",
      "Free shipping in 2-3 business days",
      "Women's Premium Cotton Short Kurta Palazzo Set | Diversified Y&P",
      "Buy premium women's cotton short kurta palazzo sets on Diversified Y&P today.",
    ],
    [
      "Acoustic Pro Max",
      "Electronics",
      "299.00",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      "Modern noise-cancelling headphones in space grey.",
      "Amazon|https://amazon.com/dp/B09XS7JWHH;BestBuy|https://bestbuy.com/site/headphones",
      "Immerse yourself in high-fidelity audio with our state-of-the-art noise cancellation technology.",
      "Active Noise Cancellation|Up to 30hrs battery|Spatial Audio|USB-C Charging",
      '{"Weight": "250g", "Bluetooth": "5.3"}',
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500|https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500",
      "4.8",
      "1245",
      "in_stock",
      "Free expedited shipping",
      "Acoustic Pro Max Headphones | Diversified Y&P",
      "Buy the new Acoustic Pro Max with active noise cancellation.",
    ],
  ];

  const downloadSampleCSV = () => {
    const headers = SCHEMA_COLUMNS.map(
      (col) => `${col.name} (${col.required ? "Required" : "Optional"})`,
    );

    const csvContent = [
      headers.join(","),
      ...sampleRows.map((row) =>
        row.map((val) => `"${val.replace(/"/g, '""')}"`).join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "diversified-yp_bulk_upload_template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copySampleRowToClipboard = (idx: number) => {
    const rowData = sampleRows[idx];
    const rowString = rowData
      .map((val) => `"${val.replace(/"/g, '""')}"`)
      .join(",");
    navigator.clipboard.writeText(rowString);
    setSampleRowCopiedIdx(idx);
    setTimeout(() => setSampleRowCopiedIdx(null), 2000);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith(".csv")) {
        processFile(droppedFile);
      } else {
        setErrors(["Only CSV files (.csv) are accepted."]);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    setErrors([]);
    setParsedProducts([]);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const rows = parseCSV(text);

        if (rows.length < 2) {
          setErrors([
            "The CSV file must contain a header row and at least one product row.",
          ]);
          return;
        }

        // Normalize headers by trimming, lowercasing, and stripping anything inside parentheses
        const headers = rows[0].map((h) =>
          h
            .trim()
            .toLowerCase()
            .replace(/\s*\(.*\)/g, ""),
        );
        const nameIndex = headers.indexOf("name");
        const categoryIndex = headers.indexOf("category");
        const priceIndex = headers.indexOf("price");
        const imageUrlIndex = headers.indexOf("image url");
        const descriptionIndex = headers.indexOf("description");
        const redirectUrlsIndex = headers.indexOf("redirect urls");

        const longDescIndex = headers.indexOf("long description");
        const highlightsIndex = headers.indexOf("highlights");
        const specsIndex = headers.indexOf("specifications");
        const galleryIndex = headers.indexOf("gallery images");
        const ratingIndex = headers.indexOf("rating");
        const reviewsIndex = headers.indexOf("reviews count");
        const stockIndex = headers.indexOf("stock status");
        const shippingIndex = headers.indexOf("shipping info");
        const metaTitleIndex = headers.indexOf("meta title");
        const metaDescIndex = headers.indexOf("meta description");

        if (nameIndex === -1 || priceIndex === -1) {
          setErrors([
            'CSV must contain at least "Name" and "Price" columns. Make sure headers are unmodified.',
          ]);
          return;
        }

        const products: any[] = [];
        const fileErrors: string[] = [];

        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (row.length === 1 && row[0] === "") continue;

          const name = row[nameIndex]?.trim();
          const category = row[categoryIndex]?.trim() || "General";
          const price = row[priceIndex]?.trim();
          const image_url = row[imageUrlIndex]?.trim() || "";
          const description = row[descriptionIndex]?.trim() || "";
          const redirectUrlsText = row[redirectUrlsIndex]?.trim() || "";

          if (!name) {
            fileErrors.push(`Row ${i + 1}: Product name is required.`);
            continue;
          }
          if (!price) {
            fileErrors.push(`Row ${i + 1}: Price is required.`);
            continue;
          }

          const links: any[] = [];
          if (redirectUrlsText) {
            const urlTokens = redirectUrlsText.split(";");
            urlTokens.forEach((token) => {
              const trimmedToken = token.trim();
              if (trimmedToken) {
                if (trimmedToken.includes("|")) {
                  const [label, url] = trimmedToken.split("|");
                  links.push({ label: label.trim(), url: url.trim() });
                } else {
                  links.push({ label: "Buy Link", url: trimmedToken });
                }
              }
            });
          }

          const details: any = {};
          if (longDescIndex > -1)
            details.long_description = row[longDescIndex]?.trim();

          if (highlightsIndex > -1) {
            const h = row[highlightsIndex]?.trim();
            if (h)
              details.highlights = h
                .split("|")
                .map((item) => item.trim())
                .filter(Boolean);
          }

          if (specsIndex > -1) {
            const s = row[specsIndex]?.trim();
            if (s) {
              try {
                details.specifications = JSON.parse(s);
              } catch (e) {
                const specs: any = {};
                s.split("|").forEach((pair) => {
                  const parts = pair.split(":");
                  if (parts.length >= 2) {
                    const key = parts[0].trim();
                    const val = parts.slice(1).join(":").trim();
                    if (key) specs[key] = val;
                  }
                });
                if (Object.keys(specs).length > 0)
                  details.specifications = specs;
              }
            }
          }

          if (galleryIndex > -1) {
            const g = row[galleryIndex]?.trim();
            if (g)
              details.gallery_images = g
                .split("|")
                .map((item) => item.trim())
                .filter(Boolean);
          }

          if (ratingIndex > -1)
            details.rating = parseFloat(row[ratingIndex]?.trim() || "5.0");
          if (reviewsIndex > -1)
            details.reviews_count = parseInt(row[reviewsIndex]?.trim() || "0");
          if (stockIndex > -1)
            details.stock_status = row[stockIndex]?.trim() || "in_stock";
          if (shippingIndex > -1)
            details.shipping_info = row[shippingIndex]?.trim();
          if (metaTitleIndex > -1)
            details.meta_title = row[metaTitleIndex]?.trim();
          if (metaDescIndex > -1)
            details.meta_description = row[metaDescIndex]?.trim();

          products.push({
            name,
            category,
            price,
            image_url,
            description,
            links,
            details,
          });
        }

        if (fileErrors.length > 0) {
          setErrors(fileErrors);
        }
        setParsedProducts(products);
      } catch (err: any) {
        setErrors([`Failed to parse CSV file: ${err.message}`]);
      }
    };
    reader.readAsText(selectedFile);
  };

  const parseCSV = (text: string) => {
    const lines = [];
    let row = [""];
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          row[row.length - 1] += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        row.push("");
      } else if ((char === "\r" || char === "\n") && !inQuotes) {
        if (char === "\r" && nextChar === "\n") {
          i++;
        }
        lines.push(row);
        row = [""];
      } else {
        row[row.length - 1] += char;
      }
    }
    if (row.length > 1 || row[0] !== "") {
      lines.push(row);
    }
    return lines;
  };

  const handleUpload = async () => {
    if (parsedProducts.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/products/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: parsedProducts }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to upload products");
      setSuccess(true);
      setTimeout(() => {
        onUploadComplete();
        onClose();
        resetModal();
      }, 1500);
    } catch (err: any) {
      setErrors([err.message]);
    } finally {
      setLoading(false);
    }
  };

  const resetModal = () => {
    setFile(null);
    setParsedProducts([]);
    setErrors([]);
    setSuccess(false);
    setDragActive(false);
    setActiveTab("upload");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary/45 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300">
      <div className="bg-white rounded-3xl w-full max-w-4xl border border-surface-container shadow-2xl overflow-hidden flex flex-col max-h-[90vh] relative animate-in fade-in zoom-in-95 duration-200">
        {/* Colorful Gradient Header Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-accent-coral via-primary to-accent-lime" />

        {/* Modal Header */}
        <div className="p-6 pb-4 flex justify-between items-center border-b border-surface-container-low flex-shrink-0 bg-gray-50/20">
          <div>
            <h3 className="font-display text-xl font-bold text-primary flex items-center gap-2">
              <Upload className="w-5 h-5 text-accent-coral animate-pulse" />{" "}
              Bulk Product Upload Portal
            </h3>
            <p className="text-[11px] font-body text-secondary mt-0.5">
              Hydrate thousands of fashion sets, accessories, and links in
              seconds.
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              resetModal();
            }}
            className="p-2 hover:bg-surface-container-low hover:rotate-90 text-secondary hover:text-primary rounded-full transition-all duration-300 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex border-b border-surface-container flex-shrink-0 bg-gray-50/50">
          <button
            onClick={() => setActiveTab("upload")}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "upload"
                ? "border-primary text-primary bg-primary/5 font-extrabold"
                : "border-transparent text-secondary hover:text-primary hover:bg-surface-container-low"
            }`}
          >
            📂 Upload File & Verify
          </button>
          <button
            onClick={() => setActiveTab("schema")}
            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === "schema"
                ? "border-primary text-primary bg-primary/5 font-extrabold"
                : "border-transparent text-secondary hover:text-primary hover:bg-surface-container-low"
            }`}
          >
            ✨ Beautiful Interactive Spreadsheet Template
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 pr-4 bg-white">
          {success ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center border border-green-200 shadow-md mb-6 animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h4 className="font-display text-xl font-bold text-primary">
                Import Completed!
              </h4>
              <p className="text-sm font-body text-secondary max-w-sm mt-2">
                Successfully uploaded and hydrated{" "}
                <span className="text-primary font-bold">
                  {parsedProducts.length} products
                </span>{" "}
                into the Diversified Y&P inventory.
              </p>
            </div>
          ) : activeTab === "upload" ? (
            <>
              {/* Premium Template Helper Card */}
              <div className="bg-gradient-to-r from-surface-container-low to-surface-container/60 border border-surface-container p-4 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all hover:shadow-sm">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-accent-lime/20 text-primary border border-accent-lime font-display text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      Self-Documenting CSV
                    </span>
                    <h4 className="text-xs font-bold text-primary">
                      Need the official bulk schema?
                    </h4>
                  </div>
                  <p className="text-[11px] font-body text-secondary max-w-md leading-relaxed">
                    Download our beautiful template loaded with detailed
                    examples. The parser is robust, handles column tips, and
                    translates Google Drive images flawlessly.
                  </p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-[10px] font-extrabold flex items-center gap-1.5 shrink-0 bg-white hover:bg-surface-container-low border-surface-container hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 cursor-pointer flex-1 sm:flex-none justify-center"
                    onClick={downloadSampleCSV}
                  >
                    <FileText className="w-3.5 h-3.5 text-accent-coral" />{" "}
                    Download CSV Template
                  </Button>
                </div>
              </div>

              {/* Advanced Drag & Drop Zone */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() =>
                  document.getElementById("csv-file-input")?.click()
                }
                className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 relative flex flex-col items-center justify-center ${
                  dragActive
                    ? "border-primary bg-primary/5 shadow-inner scale-[0.99]"
                    : file
                      ? "border-accent-lime bg-accent-lime/5 shadow-sm"
                      : "border-surface-container hover:border-primary/50 hover:bg-surface-container-low hover:shadow-md"
                }`}
              >
                <input
                  type="file"
                  id="csv-file-input"
                  className="hidden"
                  accept=".csv"
                  onChange={handleFileChange}
                />

                {file ? (
                  <div className="space-y-2.5">
                    <div className="w-12 h-12 bg-accent-lime/10 rounded-full flex items-center justify-center border border-accent-lime/20 mx-auto">
                      <FileText className="w-6 h-6 text-accent-lime animate-pulse" />
                    </div>
                    <p className="text-sm font-bold text-primary">
                      {file.name}
                    </p>
                    <p className="text-[11px] font-mono text-secondary">
                      ({(file.size / 1024).toFixed(1)} KB) • File Loaded
                      Successfully
                    </p>
                    <span className="text-[10px] bg-primary/5 text-primary hover:bg-primary/10 px-4 py-1.5 rounded-full font-bold transition-colors">
                      Click or drop another file to change
                    </span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-14 h-14 bg-surface-container rounded-2xl flex items-center justify-center border border-surface-container-high/20 mx-auto transition-transform group-hover:scale-110 duration-300">
                      <Upload className="w-6 h-6 text-secondary animate-bounce" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary">
                        Drag & Drop CSV file here, or{" "}
                        <span className="text-accent-coral hover:underline">
                          browse files
                        </span>
                      </p>
                      <p className="text-[10px] font-body text-secondary mt-1 max-w-[340px] mx-auto leading-relaxed">
                        Supports standard comma-separated files. Highly complex
                        structures (embedded redirects, spec JSONs)
                        auto-hydrate.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* CSV Parsing Error Log */}
              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 space-y-2.5 animate-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center gap-2 text-red-700 font-bold text-xs">
                    <AlertCircle className="w-4 h-4 text-red-500" /> Validation
                    Conflicts ({errors.length}):
                  </div>
                  <ul className="list-disc pl-5 text-[11px] font-body text-red-600 space-y-1.5 max-h-32 overflow-y-auto pr-1">
                    {errors.map((err, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {err}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Elegant Parsed Products Preview */}
              {parsedProducts.length > 0 && (
                <div className="space-y-3 animate-in slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-primary flex items-center gap-2">
                      <span>Parsed Inventory Data</span>
                      <span className="bg-primary text-white px-2 py-0.5 rounded-full font-mono text-[10px] font-extrabold">
                        {parsedProducts.length}
                      </span>
                    </h4>
                    <span className="text-[10px] font-body text-secondary">
                      Verify loaded entries below before pushing to cloud
                    </span>
                  </div>

                  {/* Detailed columns summary card */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 p-3 rounded-2xl border border-surface-container text-center">
                    <div className="p-2 bg-white rounded-xl border border-outline/5">
                      <div className="text-[9px] font-bold text-secondary uppercase">
                        Products
                      </div>
                      <div className="text-sm font-extrabold text-primary font-mono">
                        {parsedProducts.length}
                      </div>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-outline/5">
                      <div className="text-[9px] font-bold text-secondary uppercase">
                        With Images
                      </div>
                      <div className="text-sm font-extrabold text-green-600 font-mono">
                        {parsedProducts.filter((p) => p.image_url).length}
                      </div>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-outline/5">
                      <div className="text-[9px] font-bold text-secondary uppercase">
                        With Redirects
                      </div>
                      <div className="text-sm font-extrabold text-primary font-mono">
                        {
                          parsedProducts.filter((p) => p.links?.length > 0)
                            .length
                        }
                      </div>
                    </div>
                    <div className="p-2 bg-white rounded-xl border border-outline/5">
                      <div className="text-[9px] font-bold text-secondary uppercase">
                        Avg Price
                      </div>
                      <div className="text-sm font-extrabold text-accent-coral font-mono">
                        $
                        {(
                          parsedProducts.reduce(
                            (acc, curr) => acc + (parseFloat(curr.price) || 0),
                            0,
                          ) / parsedProducts.length
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="border border-surface-container rounded-2xl bg-surface/10 divide-y divide-surface-container/60 max-h-[300px] overflow-y-auto pr-2 shadow-inner">
                    {parsedProducts.map((p, idx) => (
                      <div
                        key={idx}
                        className="p-4 hover:bg-white rounded-xl transition-all duration-150 flex justify-between items-start gap-6 border-b border-surface-container/10 last:border-b-0"
                      >
                        <div className="space-y-1.5 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="text-xs font-bold text-primary truncate max-w-[280px]">
                              {p.name}
                            </div>
                            <span className="bg-primary/5 text-primary text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wide border border-primary/10">
                              {p.category}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-body text-secondary leading-normal">
                            {p.image_url ? (
                              <span className="text-green-600 font-bold flex items-center gap-0.5">
                                ✓ Main Image
                              </span>
                            ) : (
                              <span className="text-secondary opacity-60">
                                ✗ No Image
                              </span>
                            )}
                            <span className="opacity-40">•</span>
                            <span>
                              Links:{" "}
                              <span className="font-bold text-primary">
                                {p.links?.length || 0} redirection targets
                              </span>
                            </span>
                            {p.details?.gallery_images && (
                              <>
                                <span className="opacity-40">•</span>
                                <span>
                                  Gallery Slider:{" "}
                                  <span className="font-bold text-primary">
                                    {p.details.gallery_images.length} photos
                                  </span>
                                </span>
                              </>
                            )}
                          </div>
                          {p.description && (
                            <div className="text-[10px] font-body text-secondary/70 truncate max-w-lg">
                              {p.description}
                            </div>
                          )}
                        </div>
                        <div className="text-xs font-mono font-black text-primary whitespace-nowrap bg-surface-container px-3 py-1.5 rounded-lg border border-outline/5">
                          ${parseFloat(p.price).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* SCHEMA EXCEL INTERACTIVE MODE */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-primary font-display">
                    Interactive Schema Blueprint
                  </h4>
                  <p className="text-[11px] font-body text-secondary leading-relaxed">
                    This interactive sheet replicates standard Excel
                    spreadsheets. Click any column header to view detailed
                    database schema formatting constraints, pro tips, and
                    examples.
                  </p>
                </div>

                {/* Spreadsheet Component Mock */}
                <div className="border border-surface-container rounded-2xl bg-white overflow-hidden shadow-sm flex flex-col">
                  {/* Spreadsheet Toolbar */}
                  <div className="bg-gray-50 px-4 py-2 border-b border-surface-container flex items-center justify-between text-[10px] font-semibold text-secondary">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-accent-coral border border-white shrink-0" />{" "}
                        Required Column
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-accent-lime border border-white shrink-0" />{" "}
                        Optional Column
                      </span>
                    </div>
                    <span className="hidden sm:inline">
                      💡 Click a column header to inspect details
                    </span>
                  </div>

                  {/* Horizontal Scroll Grid */}
                  <div className="overflow-x-auto max-w-full">
                    <table className="w-full border-collapse text-left text-[11px] font-mono select-none">
                      <thead>
                        {/* Letters Bar */}
                        <tr className="bg-gray-50 border-b border-surface-container">
                          <th className="w-10 px-2 py-1 text-center font-bold text-secondary/40 border-r border-surface-container bg-gray-100/50"></th>
                          {SCHEMA_COLUMNS.map((_, idx) => (
                            <th
                              key={idx}
                              className="px-3 py-1 text-center font-bold text-secondary/50 border-r border-surface-container min-w-[155px]"
                            >
                              {String.fromCharCode(65 + idx)}
                            </th>
                          ))}
                        </tr>

                        {/* Header Names (Row 1) */}
                        <tr className="bg-white border-b border-surface-container-high">
                          <th className="px-2 py-2 text-center font-bold text-secondary border-r border-surface-container bg-gray-50">
                            1
                          </th>
                          {SCHEMA_COLUMNS.map((col, idx) => {
                            const isHovered = hoveredSchemaCol === idx;
                            const isSelected = selectedSchemaCol === idx;
                            return (
                              <th
                                key={idx}
                                onClick={() => setSelectedSchemaCol(idx)}
                                onMouseEnter={() => setHoveredSchemaCol(idx)}
                                onMouseLeave={() => setHoveredSchemaCol(null)}
                                className={`px-3 py-2.5 border-r border-surface-container cursor-pointer font-display font-extrabold text-[10px] transition-all relative ${
                                  isSelected
                                    ? "bg-primary text-white"
                                    : isHovered
                                      ? "bg-primary/5 text-primary"
                                      : "text-primary"
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <span className="truncate">{col.name}</span>
                                  {col.required ? (
                                    <span
                                      className={`text-[10px] font-black ${isSelected ? "text-accent-coral" : "text-accent-coral animate-pulse"}`}
                                    >
                                      *
                                    </span>
                                  ) : (
                                    <span
                                      className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-accent-lime" : "bg-primary/30"}`}
                                    />
                                  )}
                                </div>
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-container bg-white font-body">
                        {/* Row 2: Fashion Item */}
                        <tr className="hover:bg-primary/5 transition-colors">
                          <td className="px-2 py-2 text-center font-mono font-bold text-secondary border-r border-surface-container bg-gray-50">
                            2
                          </td>
                          {sampleRows[0].map((val, colIdx) => {
                            const isSelected = selectedSchemaCol === colIdx;
                            return (
                              <td
                                key={colIdx}
                                onClick={() => setSelectedSchemaCol(colIdx)}
                                className={`px-3 py-2 border-r border-surface-container truncate max-w-[160px] text-secondary text-[10px] ${
                                  isSelected
                                    ? "bg-primary/5 font-semibold text-primary"
                                    : ""
                                }`}
                              >
                                {val}
                              </td>
                            );
                          })}
                        </tr>

                        {/* Row 3: Electronics Item */}
                        <tr className="hover:bg-primary/5 transition-colors">
                          <td className="px-2 py-2 text-center font-mono font-bold text-secondary border-r border-surface-container bg-gray-50">
                            3
                          </td>
                          {sampleRows[1].map((val, colIdx) => {
                            const isSelected = selectedSchemaCol === colIdx;
                            return (
                              <td
                                key={colIdx}
                                onClick={() => setSelectedSchemaCol(colIdx)}
                                className={`px-3 py-2 border-r border-surface-container truncate max-w-[160px] text-secondary text-[10px] ${
                                  isSelected
                                    ? "bg-primary/5 font-semibold text-primary"
                                    : ""
                                }`}
                              >
                                {val}
                              </td>
                            );
                          })}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Schema details card */}
                {selectedSchemaCol !== null && (
                  <div className="bg-gradient-to-r from-surface-container-low to-white border border-surface-container p-4 rounded-2xl animate-in fade-in slide-in-from-top-1 duration-200">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono bg-primary text-white font-extrabold text-[10px] px-2 py-0.5 rounded">
                            Cell {String.fromCharCode(65 + selectedSchemaCol)}1
                          </span>
                          <h4 className="text-sm font-bold text-primary font-display">
                            Column: {SCHEMA_COLUMNS[selectedSchemaCol].name}
                          </h4>
                          {SCHEMA_COLUMNS[selectedSchemaCol].required ? (
                            <span className="bg-red-50 text-red-600 border border-red-200 font-display text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                              Required
                            </span>
                          ) : (
                            <span className="bg-green-50 text-green-700 border border-green-200 font-display text-[9px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                              Optional
                            </span>
                          )}
                          <span className="bg-primary/5 text-primary/70 border border-outline/10 font-mono text-[9px] px-2 py-0.5 rounded-md">
                            Type: {SCHEMA_COLUMNS[selectedSchemaCol].type}
                          </span>
                        </div>
                        <p className="text-[11px] font-body text-secondary leading-relaxed">
                          {SCHEMA_COLUMNS[selectedSchemaCol].desc}
                        </p>
                        <div className="text-[10px] font-body text-secondary/80 flex items-start gap-1">
                          <span className="text-accent-coral font-bold shrink-0">
                            Pro Tip:
                          </span>
                          <span>{SCHEMA_COLUMNS[selectedSchemaCol].tip}</span>
                        </div>
                      </div>

                      {/* Example Box */}
                      <div className="bg-white border border-surface-container p-3 rounded-xl max-w-xs shrink-0 space-y-1 shadow-sm w-full md:w-auto">
                        <div className="text-[9px] font-bold text-secondary uppercase tracking-wider">
                          Interactive Example Value
                        </div>
                        <div className="font-mono text-[10px] text-primary bg-surface p-1.5 rounded border border-outline/5 truncate max-w-[280px]">
                          {SCHEMA_COLUMNS[selectedSchemaCol].example}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Clipboard actions */}
                <div className="bg-gradient-to-r from-surface-container-low to-white border border-surface-container p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <h5 className="text-[11px] font-bold text-primary">
                      Grab CSV Samples Direct
                    </h5>
                    <p className="text-[10px] font-body text-secondary">
                      Copy row presets for fashion sets or smart electronic
                      devices to test uploads immediately.
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap w-full md:w-auto">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-[9px] font-bold py-1 bg-white hover:bg-gray-50 border-surface-container cursor-pointer flex-1 md:flex-none justify-center"
                      onClick={() => copySampleRowToClipboard(0)}
                    >
                      {sampleRowCopiedIdx === 0
                        ? "✓ Copied Kurta Row!"
                        : "📋 Copy Fashion Sample Row"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-[9px] font-bold py-1 bg-white hover:bg-gray-50 border-surface-container cursor-pointer flex-1 md:flex-none justify-center"
                      onClick={() => copySampleRowToClipboard(1)}
                    >
                      {sampleRowCopiedIdx === 1
                        ? "✓ Copied Electronics Row!"
                        : "📋 Copy Electronics Sample Row"}
                    </Button>
                  </div>
                </div>

                {/* Schema visual requirements */}
                <div className="border border-surface-container rounded-2xl p-4 bg-surface/30 space-y-3">
                  <h5 className="text-[10px] font-bold uppercase tracking-wider text-primary font-display flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-accent-coral shrink-0" />{" "}
                    Essential Formatting Checklist
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-[10px] font-body text-secondary leading-relaxed">
                    <div className="flex items-start gap-2">
                      <span className="bg-primary/5 font-mono px-1.5 py-0.5 rounded text-primary text-[9px] font-bold">
                        Image URLs
                      </span>
                      <span>
                        Supports direct public URLs and Google Drive shares
                        seamlessly.
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-primary/5 font-mono px-1.5 py-0.5 rounded text-primary text-[9px] font-bold">
                        Multiple Retailers
                      </span>
                      <span>
                        Redirect URLs are entered as:{" "}
                        <code className="bg-white px-1 border border-outline/10 text-primary">
                          Label|URL
                        </code>{" "}
                        separated by semicolons (;).
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-primary/5 font-mono px-1.5 py-0.5 rounded text-primary text-[9px] font-bold">
                        Slider Photos
                      </span>
                      <span>
                        Specify additional Gallery Images using absolute URLs
                        separated by pipes (|).
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-primary/5 font-mono px-1.5 py-0.5 rounded text-primary text-[9px] font-bold">
                        JSON Specifications
                      </span>
                      <span>
                        Format as standard JSON, or key-value couples:{" "}
                        <code className="bg-white px-1 border border-outline/10 text-primary">
                          Color:Green|Fabric:Cotton
                        </code>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer Controls */}
        {!success && (
          <div className="p-4 px-6 border-t border-surface-container-low flex justify-between items-center flex-shrink-0 bg-gray-50/50">
            <div className="text-[10px] font-body text-secondary">
              {activeTab === "upload" && parsedProducts.length > 0 && (
                <span className="text-green-600 font-bold">
                  ✓ Validation successful. Ready to import.
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  onClose();
                  resetModal();
                }}
                disabled={loading}
                className="text-xs font-bold hover:bg-surface-container cursor-pointer"
              >
                Cancel
              </Button>
              {activeTab === "upload" ? (
                <Button
                  type="button"
                  onClick={handleUpload}
                  disabled={
                    loading ||
                    parsedProducts.length === 0 ||
                    errors.some((e) => e.includes("required"))
                  }
                  className="text-xs font-extrabold flex items-center gap-2 px-5 py-2.5 shadow-md active:scale-95 transition-transform duration-150 cursor-pointer"
                >
                  {loading ? (
                    <>Inserting products...</>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Import{" "}
                      {parsedProducts.length || ""} Products
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={downloadSampleCSV}
                  className="text-xs font-extrabold flex items-center gap-2 px-5 py-2.5 shadow-md active:scale-95 transition-transform duration-150 cursor-pointer"
                >
                  <FileText className="w-4 h-4" /> Download CSV Template
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
