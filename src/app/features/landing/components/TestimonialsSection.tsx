import React from "react";
import { Star } from "lucide-react";
import { GoldDivider } from "../../../components/common/Ornaments";
import { GlassCard } from "../../../components/common/GlassCard";
import type { Testimonial } from "../../../api/types";

export interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section className="py-24 bg-[#FAF7F2] dark:bg-[#121212]">
      <div className="max-w-5xl mx-auto px-6">
        <GoldDivider className="mb-12" />
        <h2
          className="text-center text-[#222] dark:text-[#F5F0E8] mb-12"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "2.4rem",
            fontWeight: 400,
          }}
        >
          From Our Community
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <GlassCard key={t.name} gold className="p-6">
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className="text-[#C8A14B] fill-[#C8A14B]"
                  />
                ))}
              </div>
              <p className="text-[#222] dark:text-[#F5F0E8] text-[14px] leading-relaxed mb-5 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#C8A14B]/80 to-[#6A2332]/80 flex items-center justify-center text-white text-[11px] font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#222] dark:text-[#F5F0E8]">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-[#6F6F6F]">{t.role}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
