import type { Metadata } from "next";
import { HomeContent } from "@/components/home-content";

export const metadata: Metadata = {
  title: { absolute: "Altair Tolesh — Product Builder and Developer" },
  description: "Portfolio of Altair Tolesh, a student and product builder from Aktau creating thoughtful digital products, commercial websites, and technology experiments.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeContent />;
}
