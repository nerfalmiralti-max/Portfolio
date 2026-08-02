import type { ProjectSlug } from "@/content/projects";

export function ProjectVisual({
  variant,
  compact = false,
}: {
  variant: ProjectSlug;
  compact?: boolean;
}) {
  if (variant === "99-aktau") {
    return (
      <div
        className={`project-visual booking-visual ${compact ? "compact" : ""}`}
        aria-label="Product-flow demonstration for the 99 AKTAU booking system"
        role="img"
        data-motion="project-99"
      >
        <div className="visual-chrome">
          <span>99 / BOOKING SYSTEM</span>
          <i />
        </div>
        <div className="booking-panel">
          <div className="booking-panel-head">
            <span>Hall 02</span>
            <span>Today</span>
          </div>
          <strong>21:30</strong>
          <div className="booking-slots" aria-hidden="true">
            <i />
            <i className="selected" />
            <i />
            <i />
          </div>
          <div className="booking-flow">
            <span>Hall selected</span>
            <i />
            <span>Request created</span>
            <i />
            <span>Admin review</span>
          </div>
        </div>
        <div className="booking-status">
          <span>Request #014</span>
          <strong>
            <i className="status-pending" aria-hidden="true">Pending</i>
            <i className="status-accepted" aria-hidden="true">Accepted</i>
          </strong>
        </div>
        <svg className="booking-connector" viewBox="0 0 600 90" preserveAspectRatio="none" aria-hidden="true">
          <path d="M18 44 C168 4 426 86 582 44" />
        </svg>
      </div>
    );
  }

  if (variant === "tuesday-lounge-bar") {
    return (
      <div
        className={`project-visual tuesday-visual ${compact ? "compact" : ""}`}
        aria-label="Interface composition for Tuesday Lounge Bar"
        role="img"
        data-motion="project-tuesday"
      >
        <div className="tuesday-glow" aria-hidden="true" />
        <div className="visual-chrome">
          <span>TUESDAY / EVENING EDITION</span>
          <i />
        </div>
        <div className="tuesday-wordmark">
          <span>LOUNGE BAR</span>
          <strong>Tuesday</strong>
          <p>Atmosphere first. Essentials always within reach.</p>
        </div>
        <div className="venue-actions">
          <div>
            <span>01</span>
            <strong>Menu</strong>
          </div>
          <div>
            <span>02</span>
            <strong>Location</strong>
          </div>
          <div>
            <span>03</span>
            <strong>Reserve</strong>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`project-visual map-visual ${compact ? "compact" : ""}`}
      aria-label="Route-planning interface for Mangystau Trials"
      role="img"
      data-motion="project-mangystau"
    >
      <div className="map-grid" aria-hidden="true" />
      <svg className="map-topography" viewBox="0 0 800 520" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-40 160 C90 48 236 74 318 182 S512 310 850 122" />
        <path d="M-62 220 C108 88 244 142 340 226 S574 352 848 182" />
        <path d="M-20 354 C170 246 250 276 420 390 S696 432 860 316" />
      </svg>
      <div className="contour contour-a" aria-hidden="true" />
      <div className="contour contour-b" aria-hidden="true" />
      <div className="route route-a" aria-hidden="true" />
      <div className="route route-b" aria-hidden="true" />
      <i className="route-point point-a" />
      <i className="route-point point-b" />
      <i className="route-point point-c" />
      <span className="map-label map-label-a">AKTAU</span>
      <span className="map-label map-label-b">BOZZHYRA</span>
      <span className="map-label map-label-c">SHERPALA</span>
      <div className="route-summary">
        <span>03 days / route 02</span>
        <strong>540 km</strong>
        <small>Budget and time calibrated</small>
      </div>
    </div>
  );
}
