import type { Metadata } from "next";
import { HomeContent } from "@/components/home-content";

export const metadata: Metadata = {
  title: { absolute: "Altair Tolesh — Web Designer and Developer" },
  description:
    "Altair Tolesh is a student from Aktau who designs, builds, and deploys websites.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return <HomeContent />;
}
