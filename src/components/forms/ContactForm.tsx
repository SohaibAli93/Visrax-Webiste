"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { cloneElement, useState } from "react";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactInput } from "@/lib/forms";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactInput) {
    setStatus("idle");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    reset();
    setStatus("success");
  }

  return (
    <form className="premium-surface grid gap-5 p-5 sm:p-7" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full name" error={errors.fullName?.message}>
          <input {...register("fullName")} autoComplete="name" />
        </Field>
        <Field label="Work email" error={errors.workEmail?.message}>
          <input {...register("workEmail")} type="email" autoComplete="email" />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input {...register("company")} autoComplete="organization" />
        </Field>
        <Field label="Topic" error={errors.topic?.message}>
          <select {...register("topic")} defaultValue="">
            <option value="" disabled>
              Select topic
            </option>
            <option>Platform evaluation</option>
            <option>Partnership</option>
            <option>Support</option>
            <option>Careers</option>
            <option>Other</option>
          </select>
        </Field>
      </div>
      <Field label="Message" error={errors.message?.message}>
        <textarea {...register("message")} rows={5} placeholder="How can Visrax help?" />
      </Field>
      <div className="hidden" aria-hidden>
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>
      {status === "success" ? (
        <p className="rounded-xl border border-white/10 bg-white/[0.035] p-3.5 text-sm text-white/70">
          Message received. The Visrax team can follow up once contact routing is configured.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="rounded-xl border border-white/10 bg-white/[0.035] p-3.5 text-sm text-white/70">
          Something went wrong. Please check the fields and try again.
        </p>
      ) : null}
      <button
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-transparent bg-gradient-to-r from-[#214cff] via-[#3d5cff] to-[#6b3dff] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(33,76,255,0.28)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : null}
        Send Message
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactElement<Record<string, unknown>> }) {
  const id = label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const field = cloneElement(children, {
    id,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined
  });

  return (
    <label className="grid gap-2 text-sm text-white/76" htmlFor={id}>
      {label}
      {field}
      {error ? (
        <span id={`${id}-error`} className="text-xs text-[#ffb8b8]">
          {error}
        </span>
      ) : null}
    </label>
  );
}
