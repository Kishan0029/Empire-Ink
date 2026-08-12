import React from "react";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import logoImage from "@/imports/Empire___Ink_Logo_2.png";

export function Footer() {
  return (
    <footer className="bg-[#0C0C0A] border-t border-[#C8A14B]/10 py-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center">
          <ImageWithFallback
            src={logoImage}
            alt="Empire & Ink Logo"
            className="h-12 w-auto object-contain brightness-0 invert opacity-80"
          />
        </div>
        <p className="text-[11px] text-white/25">
          &copy; 2026 Empire & Ink. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
