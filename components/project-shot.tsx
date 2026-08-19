import type { Project } from "@/content/projects";

/**
 * A real screenshot of a live project, in a frame this site draws itself.
 *
 * No stock device mockup: the chrome is a single hairline bar carrying the
 * project's own URL, which doubles as evidence — the address in the frame is
 * the address the "Visit website" button opens.
 *
 * Small screens are served the mobile capture rather than a shrunken desktop
 * one, because a 1440px layout at 390px reads as a grey smear.
 */
export function ProjectShot({
  project,
  priority = false,
  frame = "browser",
}: {
  project: Project;
  /** Only the one above the fold should pre-load. */
  priority?: boolean;
  frame?: "browser" | "bare";
}) {
  const { image, liveUrl } = project;
  const host = liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <figure className="shot" data-frame={frame}>
      {frame === "browser" ? (
        <div className="shot-chrome" aria-hidden="true">
          <span className="shot-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="shot-url">{host}</span>
          <span className="shot-status">Live</span>
        </div>
      ) : null}

      <div className="shot-viewport">
        <picture>
          <source
            media="(max-width: 720px)"
            srcSet={image.mobile}
            width={image.mobileWidth}
            height={image.mobileHeight}
          />
          <img
            src={image.desktop}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            fetchPriority={priority ? "high" : "auto"}
          />
        </picture>
      </div>
    </figure>
  );
}
