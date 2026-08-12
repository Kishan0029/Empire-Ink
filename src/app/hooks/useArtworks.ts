import { useState, useEffect, useCallback } from "react";
import { galleryService } from "../api";
import type { Artwork, StatsItem, Testimonial } from "../api/types";

export function useArtworks(initialFilter = "All") {
  const [filter, setFilter] = useState(initialFilter);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [stats, setStats] = useState<StatsItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [liked, setLiked] = useState<Set<number>>(new Set([3, 7]));
  const [saved, setSaved] = useState<Set<number>>(new Set([2]));
  const [loading, setLoading] = useState(true);

  const fetchArtworks = useCallback(async () => {
    setLoading(true);
    try {
      const [artData, statsData, testimonialsData] = await Promise.all([
        galleryService.getArtworks(filter, liked),
        galleryService.getStats(),
        galleryService.getTestimonials(),
      ]);
      setArtworks(artData);
      setStats(statsData);
      setTestimonials(testimonialsData);
    } catch (error) {
      console.error("Failed to fetch gallery data:", error);
    } finally {
      setLoading(false);
    }
  }, [filter, liked]);

  useEffect(() => {
    fetchArtworks();
  }, [fetchArtworks]);

  const toggleLike = useCallback(
    async (id: number) => {
      const nextLiked = new Set(liked);
      const isLiked = nextLiked.has(id);
      if (isLiked) {
        nextLiked.delete(id);
      } else {
        nextLiked.add(id);
      }
      setLiked(nextLiked);

      try {
        await galleryService.toggleLike(id, !isLiked);
      } catch (e) {
        console.error("Failed to toggle like:", e);
      }
    },
    [liked]
  );

  const toggleSave = useCallback(
    async (id: number) => {
      const nextSaved = new Set(saved);
      const isSaved = nextSaved.has(id);
      if (isSaved) {
        nextSaved.delete(id);
      } else {
        nextSaved.add(id);
      }
      setSaved(nextSaved);

      try {
        await galleryService.toggleSave(id, !isSaved);
      } catch (e) {
        console.error("Failed to toggle save:", e);
      }
    },
    [saved]
  );

  return {
    artworks,
    stats,
    testimonials,
    filter,
    setFilter,
    liked,
    saved,
    toggleLike,
    toggleSave,
    loading,
    refresh: fetchArtworks,
  };
}
