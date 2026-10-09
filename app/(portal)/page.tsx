import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  MapPin,
  Phone,
  Snowflake,
} from "lucide-react";
import { ServiceExplorer } from "@/components/obrien/service-explorer";
import { ReplacementExperience } from "@/components/obrien/replacement-experience";
import { ProjectHighlights } from "@/components/obrien/project-highlights";

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=4901+NW+17th+Way+%23408+Fort+Lauderdale+FL+33309";
const phoneHref = "tel:+19542051381";
const phoneDisplay = "(954) 205-1381";
const portalDemoUrl = "/portal-demo/#/login";

const services = [
  {
    number: "01",
    label: "SERVICE",
    title: "Commercial HVAC Service",
    description:
      "Focused troubleshooting and corrective service for rooftop and packaged comfort systems.",
  },
  {
    number: "02",
    label: "MAINTAIN",
    title: "Preventive Maintenance",
    description:
      "Routine system checks designed to protect performance and identify concerns early.",
  },
  {
    number: "03",
    label: "DIAGNOSE",
    title: "System Diagnostics",
    description:
      "Methodical electrical, mechanical, airflow, and temperature evaluation before recommendations.",
  },
  {
    number: "04",
    label: "RESTORE",
    title: "Repair & Replacement",
    description:
      "Practical repair planning and replacement support based on equipment condition.",
  },
];

const principles = [
  {
    title: "Clear diagnostics",
    copy: "Start with the cause and the condition of the complete system.",
  },
  {
    title: "Respect for the property",
    copy: "Careful field work and straightforward communication at every visit.",
  },
  {
    title: "Practical recommendations",
    copy: "Options shaped by equipment condition and the real operating concern.",
  },
  {
    title: "South Florida focus",
    copy: "Service built around heat, humidity, drainage, and year-round cooling demands.",
  },
];

export default async function Home() {
  return (
    <main>
      <div className="utility-bar">
        <span>⌖ 4901 NW 17th Way, Fort Lauderdale</span>
        <span>◆ Commercial & residential air conditioning</span>
        <a href={phoneHref}><Phone size={12} /> {phoneDisplay}</a>
      </div>

      <header className="site-header">
        <a className="brand-mark" href="#top" aria-label="O’Brien Air Conditioning home">
          <span className="brand-surface">
            <Image src="/assets/obrien-logo-dark.png" width={2170} height={725} alt="O’Brien Air Conditioning" priority unoptimized />
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          <a className="active" href="#top">Home</a>
          <a href="#services">Services</a>
          <a href="#services">Residential</a>
          <a href="#replacements">Replacements</a>
          <a href="#standard">Standard</a>
          <a href="/membership">Membership</a>
          <a href="#location">Location</a>
          <a className="customer-login-nav" href={portalDemoUrl}>Customer Login</a>
        </nav>

        <div className="header-actions">
          <Link className="mobile-membership-link" href="/membership">Membership</Link>
          <a className="mobile-portal-link" href={portalDemoUrl}>Customer Login</a>
          <a className="account-name" href={phoneHref}>{phoneDisplay}</a>
          <a className="primary-button small" href={phoneHref}>Call Now</a>
        </div>
      </header>

      <section className="hero" id="top">
        <Image
          className="hero-equipment"
          src="/assets/obrien-rtu-hero.png"
          fill
          priority
          sizes="100vw"
          alt="Commercial rooftop air-conditioning equipment"
          unoptimized
        />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        <div className="hero-content">
          <p className="eyebrow">SOUTH FLORIDA COMMERCIAL & RESIDENTIAL HVAC</p>
          <h1>
            COMFORT
            <br />
            SYSTEMS.
            <br />
            <em>BUILT FOR</em>
            <br />
            <em>BUSINESS.</em>
          </h1>
          <p className="hero-lede">
            Careful diagnostics, clear recommendations, preventive maintenance,
            and repair planning—delivered with a precise field-service experience.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#services">View Services <span>→</span></a>
            <a className="outline-button" href={mapUrl} target="_blank" rel="noreferrer">
              Get Directions <span>→</span>
            </a>
          </div>
          <div className="hero-checks">
            <span>✓ Commercial HVAC</span>
            <span>✓ Residential HVAC</span>
            <span>✓ Fort Lauderdale</span>
            <span>✓ Clear Recommendations</span>
          </div>
        </div>

        <div className="standard-float">
          <p>THE O’BRIEN STANDARD</p>
          <strong>Precision in every step.</strong>
          <span>Inspect → Explain → Service → Verify</span>
        </div>
      </section>

      <ProjectHighlights />

      <section className="strip-section" aria-label="Services overview">
        <div className="service-strip service-strip-flow">
          {services.map((service) => (
            <a key={service.number} href="#services" className="strip-card">
              <span className="strip-number">{service.number}</span>
              <div>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </div>
              <ArrowUpRight size={17} />
            </a>
          ))}
        </div>
      </section>

      <section className="standard-banner" id="standard">
        <div className="standard-logo">
          <Image src="/assets/obrien-logo.png" width={500} height={126} alt="O’Brien Air Conditioning" unoptimized />
        </div>
        <div>
          <p className="eyebrow green">THE O’BRIEN STANDARD</p>
          <h2>Professional service. Clear next steps.</h2>
          <p>
            A strong service visit gives property teams a clear understanding of
            the equipment, the work performed, and what the system may need next.
          </p>
        </div>
        <a className="primary-button" href="#standard-details">See Our Approach <span>→</span></a>
      </section>

      <ReplacementExperience />

      <ServiceExplorer />

      <section className="approach-section" id="standard-details">
        <div className="approach-copy">
          <p className="eyebrow">WHY O’BRIEN</p>
          <h2>Precision without the complication.</h2>
          <p>
            Property teams should understand what is happening with their system,
            what their options are, and what comes next.
          </p>
          <div className="approach-seal"><Snowflake size={23} /><span>Inspect. Explain. Service. Verify.</span></div>
        </div>

        <div className="principle-grid">
          {principles.map((principle, index) => (
            <article key={principle.title}>
              <div className="principle-top"><span>0{index + 1}</span><Check size={18} /></div>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="location-section" id="location">
        <div>
          <p className="eyebrow">FORT LAUDERDALE, FLORIDA</p>
          <h2>South Florida service starts here.</h2>
          <p>
            O’Brien Air Conditioning operates from a central Broward County
            location with access to commercial properties and facilities across the region.
          </p>
          <a className="white-button" href={mapUrl} target="_blank" rel="noreferrer">
            Open in Maps <ArrowUpRight size={18} />
          </a>
        </div>

        <address className="address-card">
          <div className="pin-wrap"><MapPin size={28} /></div>
          <span>O’Brien Air Conditioning</span>
          <strong>4901 NW 17th Way<br />Suite 408</strong>
          <p>Fort Lauderdale, FL 33309</p>
          <a className="address-phone" href={phoneHref}><Phone size={17} /> {phoneDisplay}</a>
        </address>
      </section>

      <footer>
        <div className="footer-logo">
          <span className="brand-surface">
            <Image src="/assets/obrien-logo-dark.png" width={2170} height={725} alt="O’Brien Air Conditioning" unoptimized />
          </span>
        </div>
        <div className="footer-copy">
          <strong>Commercial comfort, handled with care.</strong>
          <a href={phoneHref}>{phoneDisplay}</a>
          <div className="site-credit"><span>Website design &amp; development by Nordwerk LLC</span><a href="mailto:nordwerk.hq@gmail.com">Website development inquiries: nordwerk.hq@gmail.com</a></div>
        </div>
        <div className="footer-links">
          <a href="#services">Services</a><a href="#replacements">Replacements</a><a href="#projects">Projects</a><a href="#location">Location</a><a href={portalDemoUrl}>Customer Portal</a>
        </div>
      </footer>
    </main>
  );
}
