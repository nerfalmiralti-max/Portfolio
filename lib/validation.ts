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
  subject: z.string().trim().min(3, "Add a short project name or subject.").max(120),
  message: z.string().trim().min(20, "Add a little more detail about the enquiry.").max(3000),
  company: z.string().max(0, "Spam check failed."),
});

export type ContactValues = z.infer<typeof contactSchema>;
