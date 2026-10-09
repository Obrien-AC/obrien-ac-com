"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, Building2, Check, ChevronDown, Gauge, Home, ShieldCheck } from "lucide-react";
import { annualMembershipTotal, membershipPricing, membershipRecipient } from "@/lib/membership";

type Audience = "residential" | "commercial";
type FormStatus = "idle" | "sending" | "sent" | "error";

const benefits = [
  ["Priority service", "Preferred non-emergency scheduling where availability allows."],
  ["Two annual visits", "Professional preventative maintenance twice during the membership year."],
  ["Member savings", "10% off qualifying HVAC repairs."],
  ["System health reports", "Clear documentation of system condition and technician recommendations."],
  ["Drain protection", "Condensate drain inspection and maintenance during scheduled service."],
  ["Performance review", "Cooling, electrical, drainage, temperature, airflow, and operating condition reviewed."],
  ["Service history", "Maintenance findings organized across future service visits."],
  ["Replacement advantage", "Preferred consultation if replacement becomes necessary."],
];

const commercialFactors = [
  ["Number of units", "Equipment quantity and system type."], ["Tonnage", "Splits through larger packaged and rooftop equipment."],
  ["Service frequency", "Monthly, bi-monthly, quarterly, semi-annual, or custom."], ["Filter requirements", "Quantity, sizes, specialty filters, and replacement interval."],
  ["Coil service", "Condenser and evaporator cleaning requirements."], ["Drainage", "Drain-line and condensate-system maintenance."],
  ["Controls", "Thermostats, BAS, VFDs, economizers, and applicable controls."], ["Access", "Roof access, lifts, occupied spaces, security, and scheduling."],
];

function RequestForm({ kind, compact = false }: { kind: "residential" | "existing" | "commercial"; compact?: boolean }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const isCommercial = kind === "commercial";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form));
    try {
      const requestData = { ...payload, requestType: kind };
      const response = await fetch(`https://formsubmit.co/ajax/${membershipRecipient}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...requestData, _subject: `New ${kind} membership request from obrien-ac.com`, _template: "table", _captcha: "false", _replyto: payload.email }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || String(result.success) === "false") throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }
  return (
    <form className={`membership-form${compact ? " compact" : ""}`} onSubmit={submit}>
      <input name="website" tabIndex={-1} autoComplete="off" className="form-honeypot" aria-hidden="true" />
      {isCommercial ? <>
        <label>Company / Property Name<input required name="company" autoComplete="organization" /></label>
        <label>Contact Name<input required name="name" autoComplete="name" /></label>
      </> : compact ? <label>Name<input required name="name" autoComplete="name" /></label> : <>
        <label>First name<input required name="firstName" autoComplete="given-name" /></label>
        <label>Last name<input required name="lastName" autoComplete="family-name" /></label>
      </>}
      <label>Phone<input required name="phone" type="tel" autoComplete="tel" /></label>
      <label>Email<input required name="email" type="email" autoComplete="email" /></label>
      <label className="wide">{isCommercial ? "Property Address" : "Service address"}<input required name="address" autoComplete="street-address" /></label>
      {!compact && !isCommercial && <><label>City<input required name="city" autoComplete="address-level2" /></label><label>ZIP<input required name="zip" inputMode="numeric" autoComplete="postal-code" /></label></>}
      <label>{isCommercial ? "Approximate Number of HVAC Units" : "Number of HVAC systems"}<input required name="systems" type="number" min="1" defaultValue="1" /></label>
      {!compact && !isCommercial && <><label>Approximate equipment age<input name="equipmentAge" /></label><label>Preferred contact method<select name="contactMethod"><option>Phone</option><option>Email</option><option>Text</option></select></label></>}
      {isCommercial && <>
        <label>Property Type<select required name="propertyType"><option>Automotive</option><option>Hospitality</option><option>Commercial Office</option><option>Retail</option><option>Luxury Residential / HOA</option><option>Industrial / Distribution</option><option>Medical</option><option>Other</option></select></label>
        <label>Known Tonnage / Equipment Types<input name="equipment" /></label>
        <label>Preferred Maintenance Frequency<select name="frequency"><option>Not sure</option><option>Monthly</option><option>Bi-monthly</option><option>Quarterly</option><option>Semi-annual</option><option>Custom</option></select></label>
        <label>Current Maintenance Provider (optional)<input name="provider" /></label>
      </>}
      {!compact && <label className="wide">Additional notes<textarea name="notes" rows={4} /></label>}
      {!compact && !isCommercial && <label className="form-consent wide"><input required type="checkbox" name="consent" value="yes" /> I agree to be contacted regarding O’Brien Elite Comfort Club enrollment and service scheduling.</label>}
      <button className="primary-button wide" type="submit" disabled={status === "sending"}>{status === "sending" ? "SENDING…" : isCommercial ? "REQUEST COMMERCIAL PLAN" : compact ? "ADD MEMBERSHIP TO MY ACCOUNT" : "REQUEST MEMBERSHIP ACTIVATION"}<ArrowRight size={17} /></button>
      <div className="form-status wide" role="status" aria-live="polite">
        {status === "sent" && "Request received. O’Brien will contact you shortly."}
        {status === "error" && <>We couldn’t send your request. Please call <a href="tel:+19542051381">(954) 205-1381</a>.</>}
      </div>
    </form>
  );
}

export function MembershipExperience() {
  const [audience, setAudience] = useState<Audience>("residential");
  const [systems, setSystems] = useState(1);
  const total = annualMembershipTotal(systems);
  return <main className="membership-page">
    <section className="membership-hero">
      <div className="membership-hero-copy">
        <p className="eyebrow">O’BRIEN ELITE COMFORT CLUB</p><h1>Protect your comfort.<br /><em>Protect your system.</em></h1>
        <p>The O’Brien Elite Comfort Club is designed for homeowners who want fewer surprises, priority support, and a better way to protect one of the most important systems in their home.</p>
        <div className="hero-actions"><a className="primary-button" href="#enroll">Join Elite Comfort</a><a className="outline-button" href="#benefits">View member benefits</a></div>
      </div>
      <div className="health-report" aria-label="Example member system report">
        <div className="report-top"><span>EXAMPLE MEMBER SYSTEM REPORT</span><ShieldCheck /></div><p>SYSTEM HEALTH</p><strong>92 <small>/ 100</small></strong>
        <div className="health-meter"><i /></div>
        {[ ["Cooling Performance","Excellent"],["Drainage","Clear"],["Electrical","Normal"],["Airflow","Good"],["Next Maintenance","Scheduled"],["Member Status","Active"] ].map(([a,b])=><div className="health-row" key={a}><span>{a}</span><b>{b}</b></div>)}
        <small>Based on technician inspection during service visits. Not live monitoring.</small>
      </div>
    </section>

    <section className="membership-main">
      <div className="audience-toggle" role="tablist" aria-label="Membership audience">
        <button role="tab" aria-selected={audience === "residential"} onClick={()=>setAudience("residential")}><Home />Residential</button>
        <button role="tab" aria-selected={audience === "commercial"} onClick={()=>setAudience("commercial")}><Building2 />Commercial</button>
      </div>
      {audience === "residential" ? <div className="audience-panel">
        <div className="membership-cards">
          <article className="elite-card"><span>ELITE COMFORT · RESIDENTIAL</span><h2>${membershipPricing.firstSystem}<small>/ year</small></h2><strong>One HVAC system included</strong><p><b>+${membershipPricing.additionalSystem}/year</b> each additional system at the same residence</p><ul>{["2 annual maintenance visits","Priority scheduling","System Health Reports","10% member repair savings","Maintenance history","Preferred replacement consultation"].map(x=><li key={x}><Check />{x}</li>)}</ul><a className="primary-button" href="#enroll">Join Elite Comfort</a></article>
          <article className="calculator-card"><p className="eyebrow">WHAT WILL MY MEMBERSHIP COST?</p><label htmlFor="systems">Number of HVAC systems</label><div className="system-control"><button onClick={()=>setSystems(Math.max(1,systems-1))} aria-label="Remove one system">−</button><input id="systems" type="number" min="1" value={systems} onChange={e=>setSystems(Math.max(1,Number(e.target.value)))} /><button onClick={()=>setSystems(systems+1)} aria-label="Add one system">+</button></div><div className="calculation"><span>First system <b>${membershipPricing.firstSystem}</b></span><span>Additional systems <b>{Math.max(0,systems-1)} × ${membershipPricing.additionalSystem}</b></span></div><p>ANNUAL MEMBERSHIP TOTAL</p><strong>${total}<small>/ year</small></strong></article>
        </div>
        <section id="benefits" className="benefit-section"><p className="eyebrow">MEMBER BENEFITS</p><h2>Planned care. Clear documentation.</h2><div className="benefit-grid">{benefits.map(([title,copy])=><article key={title}><Gauge /><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
        <section className="visit-timeline"><article><span>VISIT 01</span><h3>Performance + drainage</h3><p>Cooling operation, drainage, electrical condition, refrigerant and temperature performance, coils, and controls.</p></article><i /><article><span>VISIT 02</span><h3>Reliability + system health</h3><p>System condition, airflow, electrical health, drainage, temperature performance, blower operation, and maintenance trends.</p></article></section>
        <section className="comparison"><div><span>WITHOUT MEMBERSHIP</span>{["Maintenance gets delayed","System condition is often unknown","Small issues can go unnoticed","Standard scheduling","Full standard repair pricing","No centralized service history"].map(x=><p key={x}>{x}</p>)}</div><div className="member-side"><span>ELITE COMFORT MEMBER</span>{["Two scheduled annual visits","Documented system condition","Priority scheduling","10% qualifying repair savings","Organized maintenance history","Proactive recommendations"].map(x=><p key={x}><Check />{x}</p>)}</div></section>
        <section id="enroll" className="form-section"><div><p className="eyebrow">RESIDENTIAL ENROLLMENT</p><h2>Request membership activation.</h2><p>No payment information is collected. Submit your property details and O’Brien will contact you to confirm eligibility and scheduling.</p></div><RequestForm kind="residential" /></section>
        <section className="existing-section"><div><p className="eyebrow">ALREADY AN O’BRIEN CUSTOMER?</p><h2>Adding Elite Comfort is easy.</h2></div><RequestForm kind="existing" compact /></section>
      </div> : <div className="audience-panel commercial-panel">
        <section className="commercial-intro"><div><p className="eyebrow">COMMERCIAL PLANNED MAINTENANCE</p><h2>Built around your equipment.<br />Priced around your property.</h2><p>Commercial HVAC maintenance is not one-size-fits-all. O’Brien builds programs around the actual property, equipment portfolio, operating schedule, access, and service requirements.</p></div><div className="custom-rate"><span>COMMERCIAL</span><strong>CUSTOM RATE</strong><p>Built around your facility</p><a href="#commercial-request" className="primary-button">Request custom rate</a></div></section>
        <section className="factor-grid">{commercialFactors.map(([title,copy])=><article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</section>
        <section className="experience-link"><p>Experience supporting automotive facilities, hotels and hospitality, luxury properties, commercial buildings, and industrial facilities.</p><Link className="outline-button" href="/#projects">View Project Experience</Link></section>
        <section id="commercial-request" className="form-section"><div><p className="eyebrow">REQUEST A COMMERCIAL MAINTENANCE PLAN</p><h2>Tell us about your property.</h2><p>O’Brien will review the system portfolio and build a maintenance program based on the facility’s actual operating needs.</p></div><RequestForm kind="commercial" /></section>
      </div>}
      <section className="membership-faq"><p className="eyebrow">MEMBERSHIP FAQ</p><h2>Clear terms. No surprises.</h2>{[
        ["How much is residential membership?","$350 per year for the first residential HVAC system, plus $100 per year for each additional system at the same residence."],
        ["How often will my system be serviced?","Two scheduled preventative maintenance visits per membership year."],
        ["Are repairs or refrigerant included?","No. Repairs, replacement parts, and refrigerant are billed separately. Members receive 10% off qualifying repairs."],
        ["Is this a warranty?","No. Elite Comfort is a preventative-maintenance and service-membership program, not insurance or an equipment warranty."],
        ["Does maintenance guarantee my system won’t break?","No. Maintenance helps identify concerns and reduce risk, but mechanical and electrical equipment can still fail."],
        ["How much does commercial maintenance cost?","Commercial maintenance is custom-priced based on equipment, quantity, frequency, filters, cleaning requirements, access, and operating needs."],
      ].map(([q,a])=><details key={q}><summary>{q}<ChevronDown /></summary><p>{a}</p></details>)}
      <details className="membership-details"><summary>Membership details <ChevronDown /></summary><div><p>Residential membership covers one eligible system at one residential property for $350 annually; additional eligible systems at that property are $100 each. It includes two scheduled maintenance visits. Repairs, parts, refrigerant, replacement equipment, specialty cleaning, and unstated services are separate. The 10% discount applies to qualifying repairs and generally cannot be combined. Priority scheduling is subject to availability and emergency demand. Maintenance does not guarantee against failure.</p><p>Commercial scope and pricing are custom and defined by the signed proposal. Equipment count, condition, filters, access, travel, frequency, and cleaning requirements may affect pricing. Repairs and replacement work are separate unless the agreement says otherwise.</p></div></details>
      </section>
    </section>
  </main>;
}
