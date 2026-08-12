import { useState, useEffect, useCallback } from "react";
import { collectionsService } from "../api";
import type { Collection } from "../api/types";

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [selectedColId, setSelectedColId] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchCollections = useCallback(async () => {
    setLoading(true);
    try {
      const data = await collectionsService.getCollections();
      setCollections(data);
    } catch (e) {
      console.error("Failed to fetch collections:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const selectedCol = collections.find((c) => c.id === selectedColId) || null;

  return {
    collections,
    selectedColId,
    setSelectedColId,
    selectedCol,
    filter,
    setFilter,
    loading,
    refresh: fetchCollections,
  };
}
