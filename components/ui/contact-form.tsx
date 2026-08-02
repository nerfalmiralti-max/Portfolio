"use client";

import React, { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { contactSchema, type ContactValues } from "@/lib/validation";

const initial: ContactValues = { name: "", email: "", type: "General conversation", subject: "", message: "", company: "" };

export function ContactForm() {
  const [values, setValues] = useState<ContactValues>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "ready" | "sent">("idle");
  const publicEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

  const update = (field: keyof ContactValues, value: string) => setValues((current) => ({ ...current, [field]: value }));
  const draft = `Name: ${values.name}\nEmail: ${values.email}\nType: ${values.type}\nSubject: ${values.subject}\n\n${values.message}`;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const next: Record<string, string> = {};
      result.error.issues.forEach((issue) => { next[String(issue.path[0])] = issue.message; });
      setErrors(next);
      setState("idle");
      return;
    }
    setErrors({});
    if (!publicEmail) { setState("ready"); return; }
    window.location.href = `mailto:${publicEmail}?subject=${encodeURIComponent(`[Portfolio] ${values.subject}`)}&body=${encodeURIComponent(draft)}`;
    setState("sent");
  };

  const copyDraft = async () => {
    await navigator.clipboard.writeText(draft);
    setState("sent");
  };

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-row">
        <Field label="Your name" error={errors.name}><input value={values.name} onChange={(e) => update("name", e.target.value)} autoComplete="name" /></Field>
        <Field label="Email" error={errors.email}><input type="email" value={values.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" /></Field>
      </div>
      <div className="form-row">
        <Field label="Type of message" error={errors.type}>
          <select value={values.type} onChange={(e) => update("type", e.target.value)}>
            <option>Commercial project</option><option>Collaboration</option><option>Education opportunity</option><option>Feedback</option><option>General conversation</option>
          </select>
        </Field>
        <Field label="Project or opportunity" error={errors.subject}><input value={values.subject} onChange={(e) => update("subject", e.target.value)} /></Field>
      </div>
      <Field label="Message" error={errors.message}><textarea rows={7} value={values.message} onChange={(e) => update("message", e.target.value)} /></Field>
      <label className="honeypot" aria-hidden="true">Company<input value={values.company} onChange={(e) => update("company", e.target.value)} tabIndex={-1} autoComplete="off" /></label>
      <div className="form-submit">
        <button className={`button button-primary ${state === "sent" ? "is-success" : ""}`} type="submit">{state === "sent" ? <>Message ready <Check size={17} /></> : state === "ready" ? <>Message checked <Check size={17} /></> : <>Prepare message <ArrowUpRight size={17} /></>}</button>
        <p>Only share information you are comfortable making part of a professional conversation.</p>
      </div>
      {state === "ready" ? (
        <div className="form-state" role="status"><div><strong>Message checked.</strong><p>Public email delivery is not configured yet. Copy your draft so nothing is lost.</p></div><button type="button" onClick={copyDraft}><Copy size={16} /> Copy draft</button></div>
      ) : null}
      {state === "sent" ? <div className="form-state success" role="status"><Check size={18} /><p>{publicEmail ? "Your email app is ready with the message." : "Draft copied to your clipboard."}</p></div> : null}
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactElement<{ id?: string; "aria-invalid"?: boolean; "aria-describedby"?: string }> }) {
  const id = `field-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      {React.cloneElement(children, { id, "aria-invalid": Boolean(error), "aria-describedby": error ? `${id}-error` : undefined })}
      {error ? <small id={`${id}-error`}>{error}</small> : null}
    </label>
  );
}
