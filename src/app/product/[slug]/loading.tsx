import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import Masks from "@/components/Masks";

export default function Loading() {
  return (
    <div className="min-h-screen bg-surface">
      <Masks />
      <Navbar />

      <main className="pt-[130px] pb-12 px-page-margin-mobile md:px-page-margin-desktop max-w-7xl mx-auto relative z-20">
        {/* Back navigation & Breadcrumbs Skeleton */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="w-32 h-5 rounded bg-surface-container-high shimmer" />
          <div className="w-64 h-5 rounded bg-surface-container-high shimmer" />
        </div>

        {/* Product Details Section Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-3xl p-6 md:p-10 border border-surface-container shadow-sm mb-16 relative overflow-hidden grain-texture">
          {/* Left Column: Image Gallery Skeleton */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="relative aspect-square rounded-2xl bg-surface-container-low border border-surface-container overflow-hidden flex items-center justify-center">
              <div className="w-full h-full bg-surface-container-low shimmer" />
            </div>

            {/* Gallery Thumbnails Skeleton */}
            <div className="flex gap-3 py-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-20 h-20 rounded-xl bg-surface-container-low border border-surface-container shimmer flex-shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Right Column: Information & Actions Skeleton */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Badges row skeleton */}
              <div className="flex flex-wrap gap-2 items-center">
                <div className="w-20 h-6 rounded-full bg-surface-container-high shimmer" />
                <div className="w-24 h-6 rounded-full bg-surface-container-high shimmer" />
              </div>

              {/* Product Title skeleton */}
              <div className="space-y-2">
                <div className="w-full h-10 rounded-lg bg-surface-container-high shimmer" />
                <div className="w-2/3 h-10 rounded-lg bg-surface-container-high shimmer" />
              </div>

              {/* Price & Rating skeleton */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-y border-surface-container py-6">
                <div className="w-36 h-12 rounded-lg bg-surface-container-high shimmer" />
                <div className="w-48 h-6 rounded bg-surface-container-high shimmer" />
              </div>

              {/* Short Description skeleton */}
              <div className="space-y-2.5">
                <div className="w-full h-5 rounded bg-surface-container-low shimmer" />
                <div className="w-full h-5 rounded bg-surface-container-low shimmer" />
                <div className="w-4/5 h-5 rounded bg-surface-container-low shimmer" />
              </div>

              {/* Product Highlights skeleton */}
              <div className="space-y-3 pt-2">
                <div className="w-36 h-5 rounded bg-surface-container-high shimmer" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-surface-container-high shimmer flex-shrink-0" />
                      <div className="w-full h-4 rounded bg-surface-container-low shimmer" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Actions skeleton */}
            <div className="mt-8 pt-6 border-t border-surface-container">
              <div className="w-full h-14 rounded-full bg-surface-container-high shimmer" />
            </div>
          </div>
        </div>

        {/* Product Description Section Skeleton */}
        <div className="bg-white rounded-3xl border border-surface-container shadow-sm p-6 md:p-10 mb-16">
          <div className="w-48 h-7 rounded-lg bg-surface-container-high shimmer mb-6" />
          <div className="space-y-3">
            <div className="w-full h-5 rounded bg-surface-container-low shimmer" />
            <div className="w-full h-5 rounded bg-surface-container-low shimmer" />
            <div className="w-full h-5 rounded bg-surface-container-low shimmer" />
            <div className="w-5/6 h-5 rounded bg-surface-container-low shimmer" />
            <div className="w-4/5 h-5 rounded bg-surface-container-low shimmer" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
