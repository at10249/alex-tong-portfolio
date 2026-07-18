"use client";

import { useEffect, useRef } from "react";
import type { MobileView } from "@/context/AppStateContext";

const MOBILE_BREAKPOINT_PX = 767; // must match the CSS media query in globals.css
const EDGE_GUARD_PX = 24; // leave the OS edge-swipe-back gesture alone
const AXIS_LOCK_PX = 10; // movement needed before committing to horizontal vs. vertical
const COMMIT_RATIO = 0.35; // fraction of panel width that auto-commits the gesture
const COMMIT_VELOCITY = 0.5; // px/ms flick speed that auto-commits regardless of distance

type SwipeTarget = "sidebar" | "rightPane";

type SwipeStateRef = {
  mobileSidebarOpen: boolean;
  mobileView: MobileView;
  settingsOpen: boolean;
};

type SwipeActions = {
  openMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  openMobileRightPane: () => void;
  backToChat: () => void;
};

/**
 * Native-app-style swipe navigation between the three mobile screens
 * (sidebar / chat / right pane). Deliberately reuses the existing
 * class-driven CSS transitions (`.app-sidebar.is-open`,
 * `.app-right-pane.is-active` in globals.css) rather than introducing a
 * parallel animation system: this hook only (a) previews the drag with a
 * direct inline `transform` on the panel's real DOM node — safe because
 * Framer Motion never touches `transform` on these elements, only
 * `opacity` — and (b) on release, either clears the inline override (so
 * the untouched CSS class animates the panel back where it started) or
 * calls the same state setters the tap-based buttons already use (so the
 * CSS class flips and animates it the rest of the way). No new "is this
 * open" state is introduced; the gesture can only ever agree with
 * whatever the existing state already says.
 */
export function useSwipeNavigation(
  rootRef: React.RefObject<HTMLElement | null>,
  state: SwipeStateRef,
  actions: SwipeActions
) {
  const stateRef = useRef(state);
  const actionsRef = useRef(actions);

  useEffect(() => {
    stateRef.current = state;
    actionsRef.current = actions;
  }, [state, actions]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let axis: "x" | "y" | null = null;
    let target: SwipeTarget | null = null;
    let opening = false;
    let panelEl: HTMLElement | null = null;
    let panelWidth = 1;
    let startX = 0;
    let startY = 0;
    let startT = 0;

    const reset = () => {
      axis = null;
      target = null;
      panelEl = null;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (window.innerWidth > MOBILE_BREAKPOINT_PX) return;
      if (e.touches.length !== 1 || stateRef.current.settingsOpen) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      startT = e.timeStamp;
      reset();
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;

      if (axis === null) {
        if (Math.abs(dx) < AXIS_LOCK_PX && Math.abs(dy) < AXIS_LOCK_PX) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (axis === "y") return; // vertical intent — leave scrolling alone entirely

        const { mobileSidebarOpen, mobileView } = stateRef.current;
        if (mobileSidebarOpen) {
          target = "sidebar";
          opening = false;
        } else if (mobileView !== "chat") {
          target = "rightPane";
          opening = false;
        } else if (dx > 0) {
          if (startX < EDGE_GUARD_PX) return; // let the OS back-swipe gesture win
          target = "sidebar";
          opening = true;
        } else {
          target = "rightPane";
          opening = true;
        }

        panelEl = document.querySelector<HTMLElement>(target === "sidebar" ? ".app-sidebar" : ".app-right-pane");
        if (!panelEl) {
          target = null;
          return;
        }
        panelWidth = panelEl.getBoundingClientRect().width || 1;
        panelEl.style.transition = "none";
      }

      if (axis !== "x" || !target || !panelEl) return;

      // progress: 0 = panel fully hidden, 1 = panel fully shown, clamped so
      // dragging past either end can't overshoot the resting positions.
      const progress = Math.min(
        1,
        Math.max(0, target === "sidebar" ? (opening ? dx : panelWidth + dx) / panelWidth : (opening ? -dx : panelWidth - dx) / panelWidth)
      );

      e.preventDefault();
      const pct = target === "sidebar" ? (progress - 1) * 100 : (1 - progress) * 100;
      panelEl.style.transform = `translateX(${pct}%)`;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (axis === "x" && target && panelEl) {
        const touch = e.changedTouches[0];
        const totalDx = touch ? touch.clientX - startX : 0;
        const dt = Math.max(1, e.timeStamp - startT);
        const velocity = totalDx / dt; // signed px/ms, positive = rightward

        const rawProgress =
          target === "sidebar"
            ? (opening ? totalDx : panelWidth + totalDx) / panelWidth
            : (opening ? -totalDx : panelWidth - totalDx) / panelWidth;

        // A fast flick commits even if it hasn't crossed the distance
        // threshold yet — "forward" velocity means moving further in the
        // direction this gesture is already going (open vs. close).
        const forwardVelocity = target === "sidebar" ? (opening ? velocity : -velocity) : opening ? -velocity : velocity;

        panelEl.style.transition = "";
        panelEl.style.transform = "";

        // rawProgress is "how open is it" (0-1), not "how far has this
        // gesture traveled" — for a closing drag that starts at 1, we need
        // the distance traveled AWAY from open, or committing would
        // require dragging almost all the way closed instead of ~35% of
        // the way.
        const traveledFraction = opening ? rawProgress : 1 - rawProgress;
        const commit = traveledFraction > COMMIT_RATIO || forwardVelocity > COMMIT_VELOCITY;
        const shouldBeOpen = opening ? commit : !commit;

        if (target === "sidebar") {
          if (shouldBeOpen && !stateRef.current.mobileSidebarOpen) actionsRef.current.openMobileSidebar();
          if (!shouldBeOpen && stateRef.current.mobileSidebarOpen) actionsRef.current.closeMobileSidebar();
        } else {
          const isOpen = stateRef.current.mobileView !== "chat";
          if (shouldBeOpen && !isOpen) actionsRef.current.openMobileRightPane();
          if (!shouldBeOpen && isOpen) actionsRef.current.backToChat();
        }
      }
      reset();
    };

    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchmove", onTouchMove, { passive: false });
    root.addEventListener("touchend", onTouchEnd, { passive: true });
    root.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      root.removeEventListener("touchstart", onTouchStart);
      root.removeEventListener("touchmove", onTouchMove);
      root.removeEventListener("touchend", onTouchEnd);
      root.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [rootRef]);
}
