"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectSlug } from "@/content/site";

const cursorLabel: Record<ProjectSlug, string> = { "99-aktau": "BOOK", "mangystau-trials": "ROUTE", kronos: "EXPLORE" };

export function ProjectVisual({ variant, compact = false }: { variant: ProjectSlug; compact?: boolean }) {
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState(0);
  const [localTime, setLocalTime] = useState("LOCAL TIME");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: "120px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const frame = window.requestAnimationFrame(() => setLocalTime(new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date())));
    const timer = window.setInterval(() => {
      setPhase((current) => (current + 1) % 3);
      setLocalTime(new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date()));
    }, 1800);
    return () => { window.cancelAnimationFrame(frame); window.clearInterval(timer); };
  }, [visible]);

  if (variant === "99-aktau") {
    const state = ["Pending", "Reviewing", "Accepted"][phase];
    return (
      <div ref={ref} data-cursor={cursorLabel[variant]} data-phase={phase} className={`project-visual booking-visual motion-visual ${visible ? "is-visible" : ""} ${compact ? "compact" : ""}`} aria-label="Animated representation of the 99 AKTAU booking flow" role="img">
        <div className="booking-controller-lines" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="booking-top"><span>99</span><span>BOOKING / AKTAU</span><i /></div>
        <div className="booking-stage">
          <span className="tiny-label">HALL 02 / GUEST FLOW</span>
          <strong>21:30</strong>
          <div className="booking-slots"><i /><i className="active" /><i /><i /><i /></div>
          <div className="booking-flow"><span className={phase >= 0 ? "active" : ""}>Hall</span><i /><span className={phase >= 1 ? "active" : ""}>Request</span><i /><span className={phase >= 2 ? "active" : ""}>Admin</span></div>
        </div>
        <div className={`booking-ticket status-${state.toLowerCase()}`}><span>REQUEST #014</span><strong>{state}</strong></div>
      </div>
    );
  }

  if (variant === "mangystau-trials") {
    return (
      <div ref={ref} data-cursor={cursorLabel[variant]} data-phase={phase} className={`project-visual map-visual motion-visual ${visible ? "is-visible" : ""} ${compact ? "compact" : ""}`} aria-label="Animated route across real Mangystau destinations" role="img">
        <div className="map-grid" />
        <div className="map-contour contour-one" /><div className="map-contour contour-two" /><div className="map-contour contour-three" />
        <div className="route-segment segment-one" /><div className="route-segment segment-two" /><div className="route-segment segment-three" />
        <i className="route-dot dot-one" /><i className="route-dot dot-two" /><i className="route-dot dot-three" /><i className="route-dot dot-four" />
        <span className="map-label label-one">AKTAU</span><span className="map-label label-two">BOZZHYRA</span><span className="map-label label-three">SHERPALA</span>
        <div className="route-card"><span>03 DAYS / ROUTE 02</span><strong>{phase === 0 ? "180" : phase === 1 ? "360" : "540"} KM</strong><small>Budget + time calibrated</small></div>
      </div>
    );
  }

  return (
    <div ref={ref} data-cursor={cursorLabel[variant]} data-phase={phase} className={`project-visual kronos-visual motion-visual ${visible ? "is-visible" : ""} ${compact ? "compact" : ""}`} aria-label="Animated Kronos time-planning system using the visitor’s local time" role="img">
      <div className="kronos-grid" />
      <div className="time-orbit orbit-month"><i /><span>MONTH 08</span></div>
      <div className="time-orbit orbit-year"><i /><span>YEAR 2026</span></div>
      <div className="time-ring"><div><strong>{[42, 64, 81][phase]}</strong><span>%</span></div></div>
      <span className="kronos-date">TODAY / {localTime}</span>
      <div className="calendar-cells" aria-hidden="true">{Array.from({ length: 14 }, (_, index) => <i className={index <= 4 + phase * 3 ? "filled" : ""} key={index} />)}</div>
      <div className="time-bars"><i style={{ "--fill": `${[42, 64, 81][phase]}%` } as React.CSSProperties} /><i style={{ "--fill": "44%" } as React.CSSProperties} /><i style={{ "--fill": "81%" } as React.CSSProperties} /></div>
      <div className="focus-chip"><span>FOCUS / LIVE</span><strong>{localTime}</strong></div>
    </div>
  );
}
