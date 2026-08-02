"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/content/site";
import { useLanguage } from "@/components/language-provider";

export function SiteFooter() {
  const { copy } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="footer-lead">
        <span className="monogram monogram-large" aria-hidden="true"><i>A</i><i>T</i></span>
        <p>{copy.footer}</p>
      </div>
      <div className="footer-grid">
        <div><span className="overline">Location</span><p>{profile.location}</p></div>
        <div><span className="overline">Navigate</span><Link href="/projects">Projects</Link><Link href="/about">About</Link></div>
        <div><span className="overline">Continue</span><Link href="/journey">Journey</Link><Link href="/contact">Contact <ArrowUpRight size={14} /></Link></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Altair Tolesh</span><Link href="/privacy">Privacy</Link><span>{profile.coordinates}</span></div>
    </footer>
  );
}
