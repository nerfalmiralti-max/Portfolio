import type { Metadata } from "next";
import { HomeContent } from "@/components/home-content";

export const metadata: Metadata = {
  title: { absolute: "Altair Tolesh — Web Designer and Developer" },
  description:
    "Altair Tolesh designs and builds websites in Aktau, Kazakhstan. Commercial client work, a hospitality site, and a hackathon prototype — each deployed, with the source public.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeContent />;
}
