import type { Decision } from "@/content/projects";

/**
 * The part of a case study that shows thinking rather than output: the question
 * the project ran into, what was chosen, and why that beat the alternative.
 */
export function DecisionList({ decisions }: { decisions: readonly Decision[] }) {
  return (
    <ol className="decision-list">
      {decisions.map((decision) => (
        <li className="decision" key={decision.question} data-scene="ruled">
          <div>
            <p className="label">Question</p>
            <h3>{decision.question}</h3>
          </div>
          <div>
            <p className="decision-choice">{decision.choice}</p>
            <p className="decision-reason">{decision.reason}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
