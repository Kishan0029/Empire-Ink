import React from "react";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";

export interface ViewerCanvasProps {
  asset: string;
  title: string;
  zoom: number;
}

export function ViewerCanvas({ asset, title, zoom }: ViewerCanvasProps) {
  return (
    <div className="flex items-center justify-center p-8 bg-[#F0EBE2] dark:bg-[#0A0A09]">
      <div
        className="relative rounded-2xl overflow-hidden shadow-[0_28px_88px_rgba(0,0,0,0.18)] border border-[#C8A14B]/20"
        style={{
          transform: `scale(${zoom})`,
          transition: "transform 0.35s cubic-bezier(.4,0,.2,1)",
        }}
      >
        <div className="bg-[#E4DDD0]">
          <ImageWithFallback
            src={asset}
            alt={title}
            className="max-h-[72vh] object-contain"
          />
        </div>
      </div>
    </div>
  );
}
