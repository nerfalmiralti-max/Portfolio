"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { contactSchema, type ContactValues } from "@/lib/validation";

const initial: ContactValues = {
  name: "",
  email: "",
  type: "Website project",
  subject: "",
  message: "",
  company: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "ready" | "sent">("idle");
  const publicEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

  const update = (field: keyof ContactValues, value: string) =>
    setValues((current) => ({ ...current, [field]: value }));

  const draft = `Name: ${values.name}\nEmail: ${values.email}\nType: ${values.type}\nSubject: ${values.subject}\n\n${values.message}`;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        next[String(issue.path[0])] = issue.message;
      });
      setErrors(next);
      setState("idle");
      return;
    }

    setErrors({});
    if (!publicEmail) {
      setState("ready");
      return;
    }

    window.location.href = `mailto:${publicEmail}?subject=${encodeURIComponent(
      `[Portfolio] ${values.subject}`,
    )}&body=${encodeURIComponent(draft)}`;
    setState("sent");
  };

  const copyDraft = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      setState("sent");
    } catch {
      // Clipboard access can be blocked; the draft stays on screen either way.
    }
  };

  return (
    <form className="contact-form" onSubmit={submit} noValidate data-reveal>
      <div className="form-row">
        <Field label="Your name" error={errors.name}>
          <input
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            autoComplete="name"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value)}
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="form-row">
        <Field label="Type of message" error={errors.type}>
          <select
            value={values.type}
            onChange={(event) => update("type", event.target.value)}
          >
            <option>Website project</option>
            <option>Product collaboration</option>
            <option>Educational opportunity</option>
            <option>Feedback</option>
            <option>Other</option>
          </select>
        </Field>
        <Field label="Project name or subject" error={errors.subject}>
          <input
            value={values.subject}
            onChange={(event) => update("subject", event.target.value)}
          />
        </Field>
      </div>

      <Field label="Message" error={errors.message}>
        <textarea
          rows={7}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
        />
      </Field>

      <label className="honeypot" aria-hidden="true">
        Company
        <input
          value={values.company}
          onChange={(event) => update("company", event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      <div className="form-submit">
        <button className="button button-primary" type="submit">
          {state === "idle" ? (
            <>
              Check message <ArrowUpRight size={16} aria-hidden="true" />
            </>
          ) : (
            <>
              Message checked <Check size={16} aria-hidden="true" />
            </>
          )}
        </button>
        <p>
          The form checks the details before opening email or preparing a local
          copy.
        </p>
      </div>

      {state === "ready" ? (
        <div className="form-state" role="status">
          <div>
            <strong>Your message is ready.</strong>
            <p>
              No public email address is configured yet. Copy the draft and send
              it through your preferred contact method.
            </p>
          </div>
          <button type="button" onClick={copyDraft}>
            <Copy size={15} aria-hidden="true" /> Copy draft
          </button>
        </div>
      ) : null}

      {state === "sent" ? (
        <div className="form-state form-state-success" role="status">
          <p>
            {publicEmail
              ? "Your email application opened with the message."
              : "The draft was copied to your clipboard."}
          </p>
        </div>
      ) : null}
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactElement<{
    id?: string;
    "aria-invalid"?: boolean;
    "aria-describedby"?: string;
  }>;
}) {
  const id = `field-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;

  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      {React.cloneElement(children, {
        id,
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? `${id}-error` : undefined,
      })}
      <small id={`${id}-error`} className="field-error" role={error ? "alert" : undefined}>
        {error}
      </small>
    </label>
  );
}
