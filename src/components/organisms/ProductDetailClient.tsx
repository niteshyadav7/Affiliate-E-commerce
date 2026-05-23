"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronRight,
  Star,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Clock,
  ArrowLeft,
  ExternalLink,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Button from "../atoms/Button";
import Navbar from "./Navbar";
import Masks from "../Masks";
import { getDirectGoogleDriveLink } from "@/lib/utils";

interface ProductLinkType {
  id: string;
  product_id: string;
  url: string;
  label: string;
  click_count: number;
  sort_order: number;
}

interface ProductDetailsType {
  id: string;
  product_id: string;
  long_description: string;
  highlights: string[];
  specifications: Record<string, string>;
  gallery_images: string[];
  rating: number;
  reviews_count: number;
  stock_status: string;
  shipping_info: string;
  meta_title: string;
  meta_description: string;
}

interface ProductType {
  id: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
  category: string;
  slug: string | null;
  is_active: boolean;
  product_links?: ProductLinkType[];
  product_details?: ProductDetailsType | null;
}

interface ProductDetailClientProps {
  product: ProductType;
  relatedProducts: ProductType[];
}

export default function ProductDetailClient({
  product,
  relatedProducts,
}: ProductDetailClientProps) {
  const details = product.product_details;
  const links = product.product_links || [];

  // Setup images list (primary image + gallery images)
  const allImages = [product.image_url, ...(details?.gallery_images || [])]
    .filter(Boolean)
    .map((url) => getDirectGoogleDriveLink(url));

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "specifications">(
    "description",
  );
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  // Format underscores to spaces for elegant visual presentation
  const formattedName = product.name ? product.name.replace(/_/g, " ") : "";
  const currentImageUrl = allImages[activeImageIndex];
  const hasImageError = !currentImageUrl || imageErrors[currentImageUrl];

  // Formatting helper for prices
  const displayPrice = product.price;

  // Stock badge colors and labels
  const getStockStatus = (status: string) => {
    switch (status) {
      case "low_stock":
        return {
          label: "Low Stock",
          className:
            "bg-accent-amber/20 text-primary border border-accent-amber",
        };
      case "out_of_stock":
        return {
          label: "Out of Stock",
          className: "bg-error/10 text-error border border-error/20",
        };
      case "in_stock":
      default:
        return {
          label: "In Stock",
          className: "bg-accent-lime/20 text-primary border border-accent-lime",
        };
    }
  };

  const stockInfo = getStockStatus(details?.stock_status || "in_stock");

  // Trigger main round-robin affiliate redirect
  const handleBuyNow = () => {
    window.open(`/api/redirect/${product.id}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-surface">
      <Masks />

      <Navbar />

      <main className="pt-[130px] pb-section-gap px-page-margin-mobile md:px-page-margin-desktop max-w-7xl mx-auto relative z-20">
        {/* Back navigation & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-body-sm text-on-secondary-container">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hover:text-primary flex items-center gap-1 font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Store
            </Link>
          </div>
          <div className="flex items-center gap-2 font-body max-w-full overflow-hidden">
            <Link
              href="/"
              className="hover:text-primary transition-colors shrink-0"
            >
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
            <span className="capitalize shrink-0">
              {product.category.toLowerCase()}
            </span>
            <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
            <span className="text-primary font-bold break-words line-clamp-1">
              {formattedName}
            </span>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-3xl p-6 md:p-10 border border-surface-container shadow-sm mb-16 relative overflow-hidden grain-texture">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative aspect-square rounded-2xl bg-surface-container-low overflow-hidden border border-surface-container group flex items-center justify-center">
              {hasImageError ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-surface-container-low to-surface-container/60 p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-4 border border-primary/10">
                    <ShoppingBag className="w-8 h-8 text-primary/30 animate-pulse" />
                  </div>
                  <p className="font-display text-body-lg font-bold text-primary mb-1">
                    Image Not Available
                  </p>
                  <p className="font-body text-body-sm text-secondary max-w-[240px]">
                    We are uploading a gorgeous showcase for this product soon.
                  </p>
                </div>
              ) : (
                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={currentImageUrl}
                  alt={`${formattedName} gallery image`}
                  onError={() => {
                    if (currentImageUrl) {
                      setImageErrors((prev) => ({
                        ...prev,
                        [currentImageUrl]: true,
                      }));
                    }
                  }}
                  className="w-full h-full object-contain object-top bg-white group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-primary border border-surface-white/20 flex items-center gap-1 z-10">
                <Sparkles className="w-3.5 h-3.5 text-accent-coral" />{" "}
                Diversified Y&P Verified
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition-all flex-shrink-0 ${
                      activeImageIndex === idx
                        ? "border-primary shadow-md"
                        : "border-surface-container hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt="thumbnail"
                      className="w-full h-full object-contain object-top bg-white"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Badges & Category */}
              <div className="flex flex-wrap gap-2 items-center">
                <span
                  className={`px-3 py-1 rounded-full font-body text-[10px] font-bold uppercase tracking-wider ${stockInfo.className}`}
                >
                  {stockInfo.label}
                </span>
                <span className="bg-surface-container-low text-primary border border-surface-container-high px-3 py-1 rounded-full font-body text-[10px] font-bold uppercase tracking-wider">
                  {product.category}
                </span>
              </div>

              {/* Product Title */}
              <h1 className="font-display text-[32px] md:text-[42px] leading-tight text-primary font-bold break-words">
                {formattedName}
              </h1>

              {/* Price & Rating */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-y border-surface-container py-4">
                <div className="text-display-lg text-primary font-display">
                  {displayPrice}
                </div>

                {details && (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-accent-amber">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(details.rating)
                              ? "fill-current"
                              : "opacity-30"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-body text-body-md text-primary font-bold">
                      {details.rating.toFixed(1)}
                    </span>
                    <span className="font-body text-body-sm text-on-secondary-container">
                      ({details.reviews_count} reviews)
                    </span>
                  </div>
                )}
              </div>

              {/* Short Description */}
              <p className="font-body text-body-lg text-secondary leading-relaxed">
                {product.description}
              </p>

              {/* Product Highlights */}
              {details?.highlights && details.highlights.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-display text-body-md font-bold text-primary uppercase tracking-wider">
                    Product Highlights
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {details.highlights.map((highlight, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2.5 font-body text-body-sm text-secondary"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent-coral shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTAs and Purchases options */}
            <div className="mt-8 pt-6 border-t border-surface-container space-y-6">
              {/* Primary Redirect BUY NOW */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1 flex items-center justify-center gap-2 group text-white font-extrabold cursor-pointer"
                  onClick={handleBuyNow}
                  disabled={details?.stock_status === "out_of_stock"}
                >
                  <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {details?.stock_status === "out_of_stock"
                    ? "OUT OF STOCK"
                    : "BUY NOW"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description Section */}
        {(details?.long_description || product.description) && (
          <div className="bg-white rounded-3xl border border-surface-container shadow-sm p-6 md:p-10 mb-16">
            <h3 className="font-display text-headline-md text-primary mb-6">
              Product Description
            </h3>
            <div className="prose max-w-none text-secondary leading-relaxed font-body text-body-lg whitespace-pre-line">
              {details?.long_description || product.description}
            </div>
          </div>
        )}

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-8">
            <h3 className="font-display text-headline-md text-primary">
              Related{" "}
              <span className="relative">
                Products
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-accent-lime -z-10"></span>
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => {
                const productPrice = p.price;
                const formattedRelatedName = p.name
                  ? p.name.replace(/_/g, " ")
                  : "";
                return (
                  <motion.div
                    key={p.id}
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-2xl p-4 border border-surface-container hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-square rounded-xl bg-surface-container-low mb-4 overflow-hidden relative border border-surface-container-high/10">
                        <img
                          src={getDirectGoogleDriveLink(p.image_url)}
                          alt={formattedRelatedName}
                          className="w-full h-full object-contain object-top bg-white"
                        />
                      </div>
                      <h4 className="font-display text-body-md font-bold text-primary mb-1.5 line-clamp-2 break-words min-h-[44px] flex items-center leading-snug">
                        {formattedRelatedName}
                      </h4>
                      <p className="font-body text-body-sm font-semibold text-on-secondary-container mb-4">
                        {productPrice}
                      </p>
                    </div>

                    <Link
                      href={`/product/${p.id}`}
                      className="w-full text-center py-2.5 rounded-full border border-primary/20 hover:bg-primary hover:text-white transition-colors font-body text-body-sm font-bold text-primary block"
                    >
                      VIEW DETAILS
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
