import { ArrowUpRight } from "lucide-react";

/**
 * Every outbound link on the site goes through here, so `rel` and the
 * "leaves the site" affordance can never be forgotten on one of them.
 */
export function ExternalLink({
  href,
  children,
  className = "text-link",
  size = 15,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  size?: number;
}) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <ArrowUpRight size={size} aria-hidden="true" />
      <span className="visually-hidden">(opens in a new tab)</span>
    </a>
  );
}
