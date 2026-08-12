import { useState, useEffect, useCallback } from "react";
import { historyService } from "../api";
import type { HistoryItem } from "../api/types";

export function useHistory() {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [query, setQuery] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const data = await historyService.getHistory();
      setHistoryItems(data);
    } catch (e) {
      console.error("Failed to fetch history:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const filtered = historyItems.filter(
    (h) =>
      h.title.toLowerCase().includes(query.toLowerCase()) ||
      h.prompt.toLowerCase().includes(query.toLowerCase()) ||
      h.era.toLowerCase().includes(query.toLowerCase())
  );

  const handleCopy = useCallback((id: number, promptText: string) => {
    navigator.clipboard.writeText(promptText);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  }, []);

  const deleteItem = useCallback(
    async (id: number) => {
      setHistoryItems((prev) => prev.filter((item) => item.id !== id));
      try {
        await historyService.deleteHistoryItem(id);
      } catch (e) {
        console.error("Failed to delete history item:", e);
      }
    },
    []
  );

  return {
    historyItems,
    filtered,
    query,
    setQuery,
    copiedId,
    handleCopy,
    deleteItem,
    loading,
    refresh: fetchHistory,
  };
}
