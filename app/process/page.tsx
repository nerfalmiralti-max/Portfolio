import { redirect } from "next/navigation";

/** Process now lives on the About page, so this URL keeps working. */
export default function ProcessPage() {
  redirect("/about#process");
}
