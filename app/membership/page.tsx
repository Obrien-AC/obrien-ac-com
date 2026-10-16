import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { MembershipExperience } from "@/components/obrien/membership-experience";

const portalDemoUrl = "/portal-demo/#/login";
const portalTourUrl = "/portal-demo/#/tour/0";

export const metadata: Metadata = {
  title: "O’Brien Elite Comfort Club | Residential HVAC Membership & Commercial Maintenance",
  description: "Join the O’Brien Elite Comfort Club for two annual residential HVAC maintenance visits, priority service, system health reports, and member savings. Residential plans are $350 annually plus $100 per additional system. Commercial maintenance plans are custom-priced.",
  alternates: { canonical: "/membership" },
  openGraph: { url: "https://obrien-ac.com/membership/", title: "O’Brien Elite Comfort Club", description: "Premium residential HVAC membership and custom commercial planned maintenance in South Florida." },
};

export default function MembershipPage() {
  return <>
    <div className="utility-bar"><span>⌖ 4901 NW 17th Way, Fort Lauderdale</span><span>◆ Commercial & residential air conditioning</span><a href="tel:+19542051381"><Phone size={12} /> (954) 205-1381</a></div>
    <header className="site-header membership-header">
      <Link className="brand-mark" href="/" aria-label="O’Brien Air Conditioning home"><span className="brand-surface"><Image src="/assets/obrien-logo-dark.png" width={2170} height={725} alt="O’Brien Air Conditioning" priority unoptimized /></span></Link>
      <nav className="desktop-nav" aria-label="Main navigation"><Link href="/">Home</Link><Link href="/#services">Services</Link><Link href="/#replacements">Replacements</Link><Link href="/#projects">Projects</Link><Link className="active" href="/membership">Membership</Link><a className="customer-login-nav" href={portalDemoUrl}>Customer Login</a><a className="customer-login-nav portal-explore-nav" href={portalTourUrl}>Explore Portal Demo</a></nav>
      <div className="header-actions"><a className="mobile-portal-link" href={portalDemoUrl}>Customer Login</a><a className="mobile-portal-link portal-explore-nav" href={portalTourUrl}>Explore Demo</a><a className="account-name" href="tel:+19542051381">(954) 205-1381</a><a className="primary-button small" href="#enroll">Join</a></div>
    </header>
    <MembershipExperience />
    <footer className="membership-footer"><Link href="/">O’Brien Air Conditioning</Link><span>4901 NW 17th Way, Suite 408 · Fort Lauderdale, FL 33309</span><a href={portalDemoUrl}>Customer Portal</a><a href="tel:+19542051381">(954) 205-1381</a><div className="site-credit"><span>Website design &amp; development by Nordwerk LLC</span><a href="mailto:nordwerk.hq@gmail.com">Website development inquiries: nordwerk.hq@gmail.com</a></div></footer>
  </>;
}
