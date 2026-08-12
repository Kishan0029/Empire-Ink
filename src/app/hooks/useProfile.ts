import { useState, useEffect, useCallback } from "react";
import { profileService, galleryService } from "../api";
import type { Artwork, UserProfile } from "../api/types";
import { MOCK_USER_PROFILE } from "../api/mock/mockData";

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>(MOCK_USER_PROFILE);
  const [tab, setTab] = useState<"creations" | "liked" | "saved">("creations");
  const [creations, setCreations] = useState<Artwork[]>([]);
  const [likedArtworks, setLikedArtworks] = useState<Artwork[]>([]);
  const [savedArtworks, setSavedArtworks] = useState<Artwork[]>([]);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set([1, 2, 3, 4, 5]));
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set([2, 4]));
  const [loading, setLoading] = useState(true);

  const fetchProfileData = useCallback(async () => {
    setLoading(true);
    try {
      const [profData, crData, lkData, svData] = await Promise.all([
        profileService.getProfile(),
        profileService.getUserCreations(),
        profileService.getLikedArtworks(likedIds),
        profileService.getSavedArtworks(savedIds),
      ]);
      setProfile(profData || MOCK_USER_PROFILE);
      setCreations(crData);
      setLikedArtworks(lkData);
      setSavedArtworks(svData);
    } catch (e) {
      console.error("Failed to fetch profile data:", e);
    } finally {
      setLoading(false);
    }
  }, [likedIds, savedIds]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const displayed =
    tab === "creations"
      ? creations
      : tab === "liked"
      ? creations.filter((a) => likedIds.has(a.id))
      : creations.filter((a) => savedIds.has(a.id));

  const toggleLike = useCallback(
    async (id: number) => {
      const next = new Set(likedIds);
      const isLiked = next.has(id);
      if (isLiked) {
        next.delete(id);
      } else {
        next.add(id);
      }
      setLikedIds(next);
      try {
        await galleryService.toggleLike(id, !isLiked);
      } catch (e) {
        console.error("Failed to toggle like:", e);
      }
    },
    [likedIds]
  );

  const toggleSave = useCallback(
    async (id: number) => {
      const next = new Set(savedIds);
      const isSaved = next.has(id);
      if (isSaved) {
        next.delete(id);
      } else {
        next.add(id);
      }
      setSavedIds(next);
      try {
        await galleryService.toggleSave(id, !isSaved);
      } catch (e) {
        console.error("Failed to toggle save:", e);
      }
    },
    [savedIds]
  );

  return {
    profile,
    tab,
    setTab,
    creations,
    likedArtworks,
    savedArtworks,
    likedIds,
    savedIds,
    displayed,
    toggleLike,
    toggleSave,
    loading,
    refresh: fetchProfileData,
  };
}
