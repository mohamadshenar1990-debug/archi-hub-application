"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { History, X, RotateCcw } from "lucide-react";
import { useProjectStore, HistoryItem } from "@/lib/store";

interface HistoryPanelProps<T> {
  section: string;
  renderItem: (data: T, timestamp: number) => React.ReactNode;
}

export function HistoryPanel<T>({ section, renderItem }: HistoryPanelProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const { getHistoryForSection, restoreFromHistory } = useProjectStore();
  const history = getHistoryForSection<T>(section);

  if (history.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgba(12,12,18,.78)] border border-[rgba(255,255,255,.06)] hover:border-[rgba(201,168,76,.22)] transition-colors font-mono text-xs text-[#a09d98]"
      >
        <History className="w-3.5 h-3.5" />
        History ({history.length})
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[400px] bg-[#0e0e14] border-l border-[rgba(201,168,76,.09)] z-50 flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,.06)]">
                <h3 className="font-syne font-semibold text-[#f0ede8]">Generation History</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-[rgba(255,255,255,.06)] transition-colors"
                >
                  <X className="w-4 h-4 text-[#a09d98]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {history.map((item: HistoryItem<T>, index: number) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-xl bg-[rgba(12,12,18,.78)] border border-[rgba(255,255,255,.06)] hover:border-[rgba(201,168,76,.22)] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-[#a09d98]">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                      <button
                        onClick={() => {
                          restoreFromHistory(section, item.id);
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-[rgba(201,168,76,.1)] border border-[rgba(201,168,76,.22)] text-[#c9a84c] text-xs font-medium hover:bg-[rgba(201,168,76,.2)] transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Restore
                      </button>
                    </div>
                    <div className="text-sm text-[#a09d98]">
                      {renderItem(item.data, item.timestamp)}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
