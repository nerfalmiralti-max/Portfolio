import { redirect } from "next/navigation";

/** The project lessons moved into About rather than living on a thin page. */
export default function JourneyPage() {
  redirect("/about#lessons");
}
