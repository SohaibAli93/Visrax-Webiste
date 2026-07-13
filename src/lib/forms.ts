import { z } from "zod";

export const requestDemoSchema = z.object({
  fullName: z.string().min(2, "Enter your full name."),
  workEmail: z.string().email("Enter a valid work email."),
  phone: z.string().min(7, "Enter a phone number."),
  company: z.string().min(2, "Enter your company name."),
  jobTitle: z.string().min(2, "Enter your job title."),
  industry: z.string().min(2, "Select an industry."),
  locations: z.string().min(1, "Select the number of locations."),
  cameraCount: z.string().min(1, "Select an approximate camera count."),
  primaryUseCase: z.string().min(2, "Tell us the primary use case."),
  cameraEnvironment: z.string().min(2, "Describe your existing camera environment."),
  message: z.string().min(10, "Add a short message."),
  website: z.string().max(0, "Submission rejected.").optional().or(z.literal(""))
});

export const contactSchema = z.object({
  fullName: z.string().min(2, "Enter your full name."),
  workEmail: z.string().email("Enter a valid work email."),
  company: z.string().min(2, "Enter your company name."),
  topic: z.string().min(2, "Select a topic."),
  message: z.string().min(10, "Add a short message."),
  website: z.string().max(0, "Submission rejected.").optional().or(z.literal(""))
});

export type RequestDemoInput = z.infer<typeof requestDemoSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
