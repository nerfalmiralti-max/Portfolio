import {
  Code,
  Database,
  FlaskConical,
  KeyRound,
  Languages,
  Radio,
  Smartphone,
  Wallet,
} from "lucide-react";
import type { Evidence, EvidenceKind } from "@/content/projects";

const icons: Record<EvidenceKind, typeof Radio> = {
  live: Radio,
  client: Wallet,
  repository: Code,
  database: Database,
  auth: KeyRound,
  responsive: Smartphone,
  languages: Languages,
  prototype: FlaskConical,
};

/**
 * Facts about a project that a visitor can verify by following its links.
 * Nothing here is a claim the site makes about itself.
 *
 * `chips` reads as a row inside a project block. `register` numbers the
 * findings and stacks them, which is how the flagship presents them — closer
 * to an instrument reading than to badges.
 */
export function EvidenceRow({
  evidence,
  label = "Project evidence",
  variant = "chips",
}: {
  evidence: readonly Evidence[];
  label?: string;
  variant?: "chips" | "register";
}) {
  return (
    <ul
      className={`evidence-row evidence-${variant}`}
      aria-label={label}
      data-reveal-stagger
    >
      {evidence.map((item, index) => {
        const Icon = icons[item.kind];
        return (
          <li className="evidence-item" data-kind={item.kind} key={item.label}>
            {variant === "register" ? (
              <span className="evidence-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            ) : null}
            <Icon size={12} aria-hidden="true" />
            {item.label}
          </li>
        );
      })}
    </ul>
  );
}
