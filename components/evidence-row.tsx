import {
  Database,
  FlaskConical,
  Code,
  KeyRound,
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
  prototype: FlaskConical,
};

/**
 * Facts about a project that a visitor can verify by following its links.
 * Nothing here is a claim the site makes about itself.
 */
export function EvidenceRow({
  evidence,
  label = "Project evidence",
}: {
  evidence: readonly Evidence[];
  label?: string;
}) {
  return (
    <ul className="evidence-row" aria-label={label} data-reveal-stagger>
      {evidence.map((item) => {
        const Icon = icons[item.kind];
        return (
          <li className="evidence-chip" data-kind={item.kind} key={item.label}>
            <Icon size={12} aria-hidden="true" />
            {item.label}
          </li>
        );
      })}
    </ul>
  );
}
