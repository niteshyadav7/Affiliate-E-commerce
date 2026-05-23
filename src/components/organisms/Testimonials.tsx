"use client";

import TestimonialCard from "../molecules/TestimonialCard";

const TESTIMONIALS = [
  {
    id: 1,
    content:
      "The most seamless shopping experience I've had. The curation is exactly what I was looking for.",
    author: "Sarah Jenkins",
    role: "Verified Buyer",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC26OJfNAqKXrVtTfukucmv54tib3bVV1uYHWWbjuBv2E8had2qB5gb47M9BiXd0SQ9GIE1Ctrks6npxG-B8h9xPh9G4PK4mU2VSQ7BYAndWKLwKPld1HEZAXN_bH22TyiGHu_FMpmHZd14tlgkeraYsU_FK76LGV2pMOrYfjWd7dRnmZxkhnK4WXWN-m2w9wTaqTYkhg5nphSBFMuPLazy46HSR2hm5UbAcwyJMQI7I-qQwzyCtB2u-nYUd2siyQAqk8NVCHxz_sCy",
  },
  {
    id: 2,
    content:
      "Quality meets affordability here. My go-to for all tech accessories and home gadgets.",
    author: "Marcus Chen",
    role: "Tech Enthusiast",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZSlKnt8irWHrgAww4P-L4pALv7KB3AQllyqE99q73Ds84Ueooot3VnpuFiGcpX5_icRKXATE2sxr1CSnJcp_QypStGlhU94JoowGaMA4uXrkIsyWSqSMBA-8HoOZ9TcmlY4b-M-B_5PmEwO-XGHxhD1NJyhf3P_6aaAhHrGlKG1vsLCOHI1_d2zZchKMyVnwrrOktVFhhoXWjuoxL2H09WJrEXJ2P8lDPTnAyEw4gDCiWng1s6zmqZFqbbjq8GvXoROpROq1dbAM9",
  },
  {
    id: 3,
    content:
      "Customer support was incredibly fast and helpful. DIVERSIFIED Y&P actually cares about its users.",
    author: "Emily Rivera",
    role: "Frequent Shopper",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAazJ-XL5yK-OCwoXtk2OqeNzylGy5xNvN5t2hiBzjHpMeKV_lQXpmjZ7TrwvnWXQAuiuOGLeVtjCoS_QnECrltERo67FSEPGK5RYJkXor3wrlLIMF7ADHznBGlI4yspzogXZ3-eaXf9zZ_r5ooUc-2TVH6H7euwP3-MZ8QZh8x_Stp7-dNw-ddUb8H7eQyk3pg963-NTK1ljpmrpldgzCZ9-k48ny6bMFRcK77Ft3J7mbsd7XOu205Ldgnlq_o7Dcxms4vQT_PW7LE",
  },
];

export default function Testimonials() {
  return (
    <section className="relative z-30 py-section-gap px-page-margin-mobile md:px-page-margin-desktop bg-surface text-center overflow-hidden">
      <h2 className="font-display text-headline-lg-mobile md:text-headline-lg text-primary mb-16 px-4">
        Trusted by 10,000+ Shoppers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
        {TESTIMONIALS.map((t, idx) => (
          <TestimonialCard key={t.id} {...t} delay={idx * 0.1} />
        ))}
      </div>

      <div className="max-w-5xl mx-auto flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-30 grayscale contrast-125 select-none">
        {["AMAZON", "FLIPKART", "NIKE", "SONY", "APPLE"].map((brand) => (
          <span
            key={brand}
            className="font-display text-headline-md font-bold tracking-tight"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}
