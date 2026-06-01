"use client"

import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export type MarketplaceMode = "standard" | "auction"

type MarketplaceSegmentedControlProps = {
  value: MarketplaceMode
  onChange: (value: MarketplaceMode) => void
}

export function MarketplaceSegmentedControl({
  value,
  onChange,
}: MarketplaceSegmentedControlProps) {
  return (
    <div className="flex justify-center">
      <div className="relative inline-flex items-center gap-1 rounded-full bg-slate-100 p-1">
        {/* Animated Background */}
        <AnimatePresence mode="wait">
          {value === "standard" && (
            <motion.div
              key="standard"
              layoutId="activeBackground"
              className="absolute left-1 top-1 h-10 w-32 rounded-full bg-white shadow-sm"
              transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
            />
          )}
          {value === "auction" && (
            <motion.div
              key="auction"
              layoutId="activeBackground"
              className="absolute right-1 top-1 h-10 w-32 rounded-full bg-white shadow-sm"
              transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
            />
          )}
        </AnimatePresence>

        {/* Buttons */}
        <button
          type="button"
          onClick={() => onChange("standard")}
          className={cn(
            "relative z-10 px-6 py-2 text-sm font-medium transition-colors",
            value === "standard"
              ? "text-slate-900"
              : "text-slate-600 hover:text-slate-900"
          )}
        >
          Standard Rentals
        </button>
        <button
          type="button"
          onClick={() => onChange("auction")}
          className={cn(
            "relative z-10 px-6 py-2 text-sm font-medium transition-colors",
            value === "auction"
              ? "text-slate-900"
              : "text-slate-600 hover:text-slate-900"
          )}
        >
          Live Auctions
        </button>
      </div>
    </div>
  )
}
