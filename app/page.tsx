import type { Metadata } from "next";
import { HomeContent } from "@/components/home-content";

export const metadata: Metadata = {
  title: { absolute: "Altair Tolesh — Product Designer and Web Developer" },
  description:
    "Portfolio of Altair Tolesh, a developer from Aktau working across product structure, UI/UX design, frontend development, backend integration, and deployment.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeContent />;
}
