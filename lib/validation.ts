import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Enter a valid email address."),
  type: z.enum([
    "Website project",
    "Product collaboration",
    "Educational opportunity",
    "Feedback",
    "Other",
  ]),
  subject: z.string().trim().min(3, "Tell me what this is about.").max(120),
  message: z.string().trim().min(20, "Please add a little more detail.").max(3000),
  company: z.string().max(0, "Spam check failed."),
});

export type ContactValues = z.infer<typeof contactSchema>;
