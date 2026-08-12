import React from "react";
import {
  Crown,
  Wand2,
  Download,
  Layers,
} from "lucide-react";
import { GlassCard } from "../../../components/common/GlassCard";

export function FeaturesSection() {
  const features = [
    {
      title: "Four Historical Eras",
      body: "Choose from Akbar, Jahangir, Shah Jahan, or Aurangzeb. Each era has its own distinct look, colors, and artistic style.",
      icon: Crown,
      color: "#C8A14B",
    },
    {
      title: "Smart Description Helper",
      body: "We automatically fill in the right historical details for you, including the colors, court elements, and artistic touches that bring your scene to life.",
      icon: Wand2,
      color: "#6A2332",
    },
    {
      title: "High-Resolution Download",
      body: "Save your finished artwork in full resolution, with your original description and all your chosen settings stored alongside it.",
      icon: Download,
      color: "#C8A14B",
    },
    {
      title: "Multiple Variations",
      body: "Create several versions of the same scene at once and keep the one you love most, or mix elements from different results.",
      icon: Layers,
      color: "#C8A14B",
    },
  ];

  return (
    <section className="py-12 bg-[#FFFDF8] dark:bg-[#0E0E0C]">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="text-center text-[#222] dark:text-[#F5F0E8] mb-2"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 400,
          }}
        >
          Crafted for Excellence
        </h2>
        <p className="text-center text-[#6F6F6F] text-sm mb-16">
          Every feature built for serious artists and historians
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map(({ title, body, icon: Icon, color }) => (
            <GlassCard
              key={title}
              gold
              className="p-6 group hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(200,161,75,0.09)]"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: `${color}16` }}
              >
                <Icon size={17} strokeWidth={1.5} style={{ color }} />
              </div>
              <h3 className="font-semibold text-[#222] dark:text-[#F5F0E8] mb-2 text-[15px]">
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
