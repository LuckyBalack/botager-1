"use client"

import * as React from "react"

// Tailwind breakpoints
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

export type DeviceType = "mobile" | "tablet" | "desktop" | "tv"

export interface ResponsiveState {
  // Device type helpers
  isMobile: boolean // < 640px
  isTablet: boolean // 640px - 1024px
  isDesktop: boolean // 1024px - 1536px
  isTV: boolean // > 1536px
  
  // Current device type
  deviceType: DeviceType
  
  // Breakpoint helpers (min-width queries, like Tailwind)
  isSm: boolean // >= 640px
  isMd: boolean // >= 768px
  isLg: boolean // >= 1024px
  isXl: boolean // >= 1280px
  is2xl: boolean // >= 1536px
  
  // Current width for custom logic
  width: number
}

function getResponsiveState(width: number): ResponsiveState {
  const isMobile = width < BREAKPOINTS.sm
  const isTablet = width >= BREAKPOINTS.sm && width < BREAKPOINTS.lg
  const isDesktop = width >= BREAKPOINTS.lg && width < BREAKPOINTS["2xl"]
  const isTV = width >= BREAKPOINTS["2xl"]

  let deviceType: DeviceType = "mobile"
  if (isTV) deviceType = "tv"
  else if (isDesktop) deviceType = "desktop"
  else if (isTablet) deviceType = "tablet"

  return {
    isMobile,
    isTablet,
    isDesktop,
    isTV,
    deviceType,
    isSm: width >= BREAKPOINTS.sm,
    isMd: width >= BREAKPOINTS.md,
    isLg: width >= BREAKPOINTS.lg,
    isXl: width >= BREAKPOINTS.xl,
    is2xl: width >= BREAKPOINTS["2xl"],
    width,
  }
}

export function useResponsive(): ResponsiveState {
  const [state, setState] = React.useState<ResponsiveState>(() =>
    getResponsiveState(typeof window !== "undefined" ? window.innerWidth : 1024)
  )

  React.useEffect(() => {
    const handleResize = () => {
      setState(getResponsiveState(window.innerWidth))
    }

    // Set initial state
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return state
}

// Hook for specific breakpoint queries
export function useBreakpoint(breakpoint: keyof typeof BREAKPOINTS): boolean {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${BREAKPOINTS[breakpoint]}px)`)
    
    const handleChange = () => setMatches(mql.matches)
    handleChange()

    mql.addEventListener("change", handleChange)
    return () => mql.removeEventListener("change", handleChange)
  }, [breakpoint])

  return matches
}
