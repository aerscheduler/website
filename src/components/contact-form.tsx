"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertCircle, ArrowRight, Check, Loader2 } from "lucide-react";
import { API_URL, SUPPORT_EMAIL } from "@/lib/site";
import { CONTACT_TOPICS, isContactTopic, type ContactTopic } from "@/lib/contact";
import { cn } from "@/lib/cn";

const MESSAGE_MAX = 5000;
const MESSAGE_MIN = 10;

type FieldName = "name" | "email" | "organization" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  /** Something went wrong at the form level (network, 429, 5xx). */
  | { kind: "failed"; message: string; showEmailFallback: boolean };

const EMAIL_PATTERN = /^[^\s@,;:<>"'\\]+@[^\s@,;:<>"'\\]+\.[a-z]{2,}$/i;

/**
 * Client-side validation mirrors the server's rules so people get instant
 * feedback. The server re-validates everything — this is UX, not a control.
 */
function validate(values: Record<FieldName, string>): FieldErrors {
  const errors: FieldErrors = {};

  if (!values.name.trim()) errors.name = "Please tell us your name.";
  else if (values.name.length > 120) errors.name = "That name is too long.";

  if (!values.email.trim()) errors.email = "We need an email address to reply to.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "That email address doesn't look right.";

  if (values.organization.length > 160) errors.organization = "That's too long.";

  if (!values.message.trim()) errors.message = "Please include a message.";
  else if (values.message.trim().length < MESSAGE_MIN)
    errors.message = "Please add a little more detail so we can help.";
  else if (values.message.length > MESSAGE_MAX) errors.message = "That message is too long.";

  return errors;
}

const EMPTY: Record<FieldName, string> = { name: "", email: "", organization: "", message: "" };

export function ContactForm() {
  const searchParams = useSearchParams();
  const formId = useId();

  const [values, setValues] = useState(EMPTY);
  const [topic, setTopic] = useState<ContactTopic>("not-sure");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  // Deep links like /contact?topic=integration preselect the reason for
  // writing in, so the "Request an integration" buttons around the site land
  // people on a form that already knows why they're here.
  useEffect(() => {
    const requested = searchParams.get("topic");
    if (requested && isContactTopic(requested)) setTopic(requested);
  }, [searchParams]);

  // Move focus to the confirmation so screen reader users aren't left on a
  // submit button that no longer exists.
  useEffect(() => {
    if (status.kind === "sent") successRef.current?.focus();
  }, [status.kind]);

  const setField = (field: FieldName) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((current) => ({ ...current, [field]: event.target.value }));
    // Clear a field's error as soon as the person starts fixing it.
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "submitting") return;

    const found = validate(values);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      const firstInvalid = Object.keys(found)[0] as FieldName;
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus({ kind: "submitting" });

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          topic,
          // Honeypot. Read from the DOM rather than state so that an automated
          // filler that sets the input value directly is still caught.
          website: honeypotRef.current?.value ?? "",
        }),
      });

      if (response.ok) {
        setStatus({ kind: "sent" });
        setValues(EMPTY);
        return;
      }

      const body = await response.json().catch(() => null);

      // A field-level rejection from the server: show it on the field.
      if (response.status === 400 && body?.field) {
        setErrors({ [body.field as FieldName]: body.message });
        setStatus({ kind: "idle" });
        formRef.current?.querySelector<HTMLElement>(`[name="${body.field}"]`)?.focus();
        return;
      }

      setStatus({
        kind: "failed",
        message: body?.message ?? "Something went wrong sending your message.",
        // Rate limited or server-side failure — always give people a way
        // through that doesn't depend on us.
        showEmailFallback: response.status === 429 || response.status >= 500,
      });
    } catch {
      setStatus({
        kind: "failed",
        message: "We couldn't reach our servers. Please check your connection and try again.",
        showEmailFallback: true,
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        className="rounded-2xl border border-border bg-white p-8 shadow-lg outline-none sm:p-10"
      >
        <div className="flex size-12 items-center justify-center rounded-full bg-success/10">
          <Check className="size-6 text-success" aria-hidden />
        </div>
        <h2 className="mt-5 text-2xl font-semibold tracking-tight text-brand-surface">Message sent</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          Thanks for writing in. We read every message and usually reply within
          one business day — check your spam folder if you don&apos;t see us.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          In a hurry? Email{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium text-primary hover:underline">
            {SUPPORT_EMAIL}
          </a>{" "}
          directly.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-6 text-sm font-semibold text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status.kind === "submitting";
  const remaining = MESSAGE_MAX - values.message.length;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-border bg-white p-6 shadow-lg sm:p-8"
    >
      {status.kind === "failed" && (
        <div
          role="alert"
          className="mb-6 flex gap-3 rounded-xl border border-[#f5c2c0] bg-[#fef6f5] p-4"
        >
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-[#b42318]" aria-hidden />
          <div className="text-sm leading-relaxed text-[#7a271a]">
            <p>{status.message}</p>
            {status.showEmailFallback && (
              <p className="mt-1.5">
                You can always reach us at{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold underline underline-offset-2">
                  {SUPPORT_EMAIL}
                </a>
                .
              </p>
            )}
          </div>
        </div>
      )}

      <fieldset className="border-0 p-0">
        <legend className="text-sm font-semibold text-foreground">
          What can we help with?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {CONTACT_TOPICS.map((option) => {
            const active = topic === option.value;
            return (
              <label
                key={option.value}
                className={cn(
                  "cursor-pointer rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200",
                  "focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-2",
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-white text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                <input
                  type="radio"
                  name="topic"
                  value={option.value}
                  checked={active}
                  onChange={() => setTopic(option.value)}
                  className="sr-only"
                />
                {option.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field
          id={`${formId}-name`}
          name="name"
          label="Your name"
          autoComplete="name"
          value={values.name}
          onChange={setField("name")}
          error={errors.name}
          disabled={submitting}
          required
        />
        <Field
          id={`${formId}-email`}
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          inputMode="email"
          value={values.email}
          onChange={setField("email")}
          error={errors.email}
          disabled={submitting}
          required
        />
      </div>

      <div className="mt-5">
        <Field
          id={`${formId}-organization`}
          name="organization"
          label="Flight school or club"
          hint="Optional"
          autoComplete="organization"
          value={values.organization}
          onChange={setField("organization")}
          error={errors.organization}
          disabled={submitting}
        />
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor={`${formId}-message`} className="text-sm font-semibold text-foreground">
            How can we help?
          </label>
          <span
            className={cn(
              "text-xs tabular-nums",
              remaining < 0 ? "font-semibold text-[#b42318]" : "text-muted-foreground"
            )}
          >
            {remaining.toLocaleString()} left
          </span>
        </div>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={5}
          required
          disabled={submitting}
          value={values.message}
          onChange={setField("message")}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          placeholder="Tell us about your fleet, what you're using today, or what you're trying to figure out."
          className={cn(
            "mt-2 w-full resize-y rounded-lg border bg-white px-3.5 py-2.5 text-[15px] leading-relaxed text-foreground shadow-sm transition-colors",
            "placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60",
            errors.message ? "border-[#d92d20] focus:border-[#d92d20]" : "border-border focus:border-primary"
          )}
        />
        {errors.message && (
          <p id={`${formId}-message-error`} className="mt-1.5 text-sm text-[#b42318]">
            {errors.message}
          </p>
        )}
      </div>

      {/*
        Honeypot. Hidden from sight, from the accessibility tree, and from tab
        order — a person can never fill it in, so anything in it is a bot that
        filled every input on the page.
      */}
      <div aria-hidden className="pointer-events-none absolute -left-[9999px] opacity-0">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          ref={honeypotRef}
          id={`${formId}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className={cn(
          "mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-semibold tracking-tight text-primary-foreground shadow-sm transition-all duration-200",
          "hover:bg-[#1557b0] hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        )}
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight className="size-4 opacity-80" aria-hidden />
          </>
        )}
      </button>

      <p aria-live="polite" className="sr-only">
        {submitting ? "Sending your message" : ""}
      </p>

      <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
        We use what you send only to reply to you. See our{" "}
        <a href="/privacy" className="underline underline-offset-2 hover:text-foreground">
          privacy policy
        </a>
        . No newsletter, no sales sequence.
      </p>
    </form>
  );
}

type FieldProps = {
  id: string;
  name: FieldName;
  label: string;
  hint?: string;
  error?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
  inputMode?: "email" | "text";
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Field({ id, name, label, hint, error, type = "text", required, disabled, autoComplete, inputMode, value, onChange }: FieldProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-foreground">
          {label}
        </label>
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        inputMode={inputMode}
        value={value}
        onChange={onChange}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "mt-2 h-11 w-full rounded-lg border bg-white px-3.5 text-[15px] text-foreground shadow-sm transition-colors",
          "placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60",
          error ? "border-[#d92d20] focus:border-[#d92d20]" : "border-border focus:border-primary"
        )}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-[#b42318]">
          {error}
        </p>
      )}
    </div>
  );
}
