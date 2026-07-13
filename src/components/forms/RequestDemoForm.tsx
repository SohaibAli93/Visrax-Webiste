"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { cloneElement, useState } from "react";
import type { ReactElement } from "react";
import { useForm } from "react-hook-form";
import { requestDemoSchema, type RequestDemoInput } from "@/lib/forms";

const industries = ["Manufacturing", "Offices and Commercial Buildings", "Warehousing and Logistics", "Textile Manufacturing", "Retail", "Traffic and Transportation", "Construction", "Healthcare", "Education", "Energy and Utilities", "Security Operations"];
const locations = ["1 location", "2-5 locations", "6-20 locations", "21+ locations"];
const cameraCounts = ["Under 25", "25-100", "101-500", "501-1,000", "1,000+"];

export function RequestDemoForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<RequestDemoInput>({ resolver: zodResolver(requestDemoSchema) });

  async function onSubmit(values: RequestDemoInput) {
    setStatus("idle");
    const response = await fetch("/api/request-demo", {
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
        <Field label="Phone number" error={errors.phone?.message}>
          <input {...register("phone")} autoComplete="tel" />
        </Field>
        <Field label="Company" error={errors.company?.message}>
          <input {...register("company")} autoComplete="organization" />
        </Field>
        <Field label="Job title" error={errors.jobTitle?.message}>
          <input {...register("jobTitle")} autoComplete="organization-title" />
        </Field>
        <Field label="Industry" error={errors.industry?.message}>
          <select {...register("industry")} defaultValue="">
            <option value="" disabled>
              Select industry
            </option>
            {industries.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>
        <Field label="Number of locations" error={errors.locations?.message}>
          <select {...register("locations")} defaultValue="">
            <option value="" disabled>
              Select range
            </option>
            {locations.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>
        <Field label="Approximate camera count" error={errors.cameraCount?.message}>
          <select {...register("cameraCount")} defaultValue="">
            <option value="" disabled>
              Select range
            </option>
            {cameraCounts.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Primary use case" error={errors.primaryUseCase?.message}>
        <input {...register("primaryUseCase")} placeholder="Safety, security, occupancy, traffic, operations..." />
      </Field>
      <Field label="Existing camera environment" error={errors.cameraEnvironment?.message}>
        <textarea {...register("cameraEnvironment")} rows={3} placeholder="Briefly describe your camera locations and current monitoring setup." />
      </Field>
      <Field label="Message" error={errors.message?.message}>
        <textarea {...register("message")} rows={4} placeholder="Tell us what you want Visrax to monitor." />
      </Field>
      <div className="hidden" aria-hidden>
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>
      {status === "success" ? (
        <p className="rounded-xl border border-white/10 bg-white/[0.035] p-3.5 text-sm text-white/70">
          Request received. The Visrax team can follow up once contact routing is configured.
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
        Request a Demo
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
