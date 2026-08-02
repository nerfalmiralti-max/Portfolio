import type { ProjectSlug } from "@/content/site";

export function ProjectVisual({ variant, compact = false }: { variant: ProjectSlug; compact?: boolean }) {
  if (variant === "99-aktau") {
    return (
      <div className={`project-visual booking-visual ${compact ? "compact" : ""}`} aria-label="Visual representation of the 99 AKTAU booking interface" role="img">
        <div className="booking-top"><span>99</span><span>BOOKING / AKTAU</span><i /></div>
        <div className="booking-stage">
          <span className="tiny-label">HALL 02</span>
          <strong>21:30</strong>
          <div className="booking-slots"><i /><i className="active" /><i /><i /><i /></div>
        </div>
        <div className="booking-ticket"><span>REQUEST #014</span><strong>Accepted</strong></div>
      </div>
    );
  }

  if (variant === "mangystau-trials") {
    return (
      <div className={`project-visual map-visual ${compact ? "compact" : ""}`} aria-label="Visual representation of a route across Mangystau" role="img">
        <div className="map-grid" />
        <div className="map-contour contour-one" /><div className="map-contour contour-two" />
        <div className="route-segment segment-one" /><div className="route-segment segment-two" />
        <i className="route-dot dot-one" /><i className="route-dot dot-two" /><i className="route-dot dot-three" />
        <span className="map-label label-one">AKTAU</span><span className="map-label label-two">BOZZHYRA</span>
        <div className="route-card"><span>03 DAYS</span><strong>540 KM</strong><small>Route 02 / personalized</small></div>
      </div>
    );
  }

  return (
    <div className={`project-visual kronos-visual ${compact ? "compact" : ""}`} aria-label="Visual representation of the Kronos time-planning interface" role="img">
      <div className="kronos-grid" />
      <div className="time-ring"><div><strong>64</strong><span>%</span></div></div>
      <span className="kronos-date">TODAY / 18:42</span>
      <div className="time-bars"><i style={{ "--fill": "72%" } as React.CSSProperties} /><i style={{ "--fill": "44%" } as React.CSSProperties} /><i style={{ "--fill": "81%" } as React.CSSProperties} /></div>
      <div className="focus-chip"><span>FOCUS</span><strong>01:24:19</strong></div>
    </div>
  );
}
