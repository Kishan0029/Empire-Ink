import React from "react";
import { Feather, Sparkles, Download } from "lucide-react";
import { GlassCard } from "../../../components/common/GlassCard";

export function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Describe Your Vision",
      body: "Write a scene in plain language. We automatically add the right historical details, such as colors, composition, and court elements that match your chosen era.",
      icon: Feather,
    },
    {
      step: "02",
      title: "Your Artwork Takes Shape",
      body: "Our AI creates a painting with authentic gold highlights, marble screens, and intricate border patterns that are faithful to the Mughal period you selected.",
      icon: Sparkles,
    },
    {
      step: "03",
      title: "Refine & Download",
      body: "Zoom in, remix, and adjust. Download your artwork in high resolution with all your notes and settings saved alongside it.",
      icon: Download,
    },
  ];

  return (
    <section className="py-12 bg-[#FAF7F2] dark:bg-[#121212]">
      <div className="max-w-5xl mx-auto px-6">
        <h2
          className="text-center text-[#222] dark:text-[#F5F0E8] mb-2"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 400,
          }}
        >
          How the Studio Works
        </h2>
        <p className="text-center text-[#6F6F6F] text-sm max-w-md mx-auto mb-16">
          Three simple steps to bring your Mughal vision to life
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map(({ step, title, body, icon: Icon }) => (
            <GlassCard
              key={step}
              gold
              className="p-8 text-center hover:shadow-[0_14px_44px_rgba(200,161,75,0.10)] transition-all duration-300"
            >
              <div
                className="mb-3 select-none"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "3.5rem",
                  fontWeight: 700,
                  color: "rgba(200,161,75,0.18)",
                  lineHeight: 1,
                }}
              >
                {step}
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#C8A14B]/12 flex items-center justify-center mx-auto mb-4">
                <Icon size={17} className="text-[#C8A14B]" strokeWidth={1.5} />
              </div>
              <h3
                className="font-semibold text-[#222] dark:text-[#F5F0E8] mb-3"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.2rem",
                }}
              >
                {title}
              </h3>
              <p className="text-sm text-[#6F6F6F] dark:text-[#9A9A8E] leading-relaxed">
                {body}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
