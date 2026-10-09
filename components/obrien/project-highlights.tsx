"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type Filter = "all" | "hospitality" | "residential" | "automotive" | "commercial" | "industrial";
type GroupId = "hospitality" | "residential" | "automotive" | "industrial";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "hospitality", label: "Hospitality" },
  { id: "residential", label: "Luxury Residential" },
  { id: "automotive", label: "Automotive" },
  { id: "commercial", label: "Commercial" },
  { id: "industrial", label: "Industrial / Logistics" },
];

const groups: { id: GroupId; label: string }[] = [
  { id: "hospitality", label: "Hospitality" },
  { id: "residential", label: "Luxury Residential" },
  { id: "automotive", label: "Automotive" },
  { id: "industrial", label: "Industrial / Logistics" },
];

type Property = {
  name: string;
  location: string;
  region: string;
  category: string;
  group: GroupId;
  filters: readonly Filter[];
  description: string;
  visual: string;
  featured?: boolean;
  major?: string;
  logo?: string;
  image?: string;
  mono?: boolean;
  mark?: readonly string[];
  photoCaption?: string;
};

// Order is display order inside each group; featured South Florida projects render first.
const properties: readonly Property[] = [
  {
    name: "Four Seasons Hotel and Residences Fort Lauderdale",
    major: "Four Seasons",
    location: "525 North Fort Lauderdale Beach Boulevard · Fort Lauderdale, Florida",
    region: "South Florida",
    category: "Luxury Hospitality / Residences",
    group: "hospitality",
    filters: ["hospitality"],
    description:
      "HVAC service experience within a luxury oceanfront hospitality and residential environment where guest comfort, equipment reliability, coordination, and minimal operational disruption are critical.",
    visual: "seasons",
    featured: true,
    logo: "/assets/projects/logos/four-seasons.svg",
    image: "/project-highlights/properties/four-seasons-fort-lauderdale-e510fc840b.webp",
    photoCaption: "Photographed June 2021 during construction.",
  },
  {
    name: "The Villa Grande Club",
    location: "Porto Vita · Aventura, Florida",
    region: "South Florida",
    category: "Luxury Property / Club",
    group: "residential",
    filters: ["residential", "commercial"],
    description:
      "HVAC support for premium occupied spaces requiring careful coordination, reliable climate control, and professional service execution.",
    visual: "villa",
    featured: true,
    mark: ["VILLA GRANDE CLUB", "AT PORTO VITA"],
    image: "/project-highlights/properties/villa-grande-club-9b12e49265.webp",
  },
  {
    name: "Fort Lauderdale Marriott Harbor Beach Resort & Spa",
    major: "Marriott",
    location: "3030 Holiday Drive · Fort Lauderdale, Florida",
    region: "South Florida",
    category: "Hospitality / Resort",
    group: "hospitality",
    filters: ["hospitality"],
    description:
      "HVAC service experience supporting a large beachfront hospitality environment where guest comfort, equipment reliability, scheduling, and continuous operation are essential.",
    visual: "marriott-harbor",
    logo: "/assets/projects/logos/marriott.svg",
    mono: true,
    image: "/project-highlights/properties/marriott-harbor-beach-8a18ecc004.webp",
  },
  {
    name: "Miami Marriott Biscayne Bay",
    major: "Marriott",
    location: "1633 North Bayshore Drive · Miami, Florida",
    region: "South Florida",
    category: "Hospitality",
    group: "hospitality",
    filters: ["hospitality"],
    description:
      "HVAC service experience supporting hotel operations with an emphasis on comfort, equipment performance, preventative maintenance, and operational continuity.",
    visual: "marriott-biscayne",
    logo: "/assets/projects/logos/marriott.svg",
    mono: true,
    image: "/project-highlights/properties/marriott-biscayne-q90-b2006ba393.webp",
  },
  {
    name: "Kimpton Surfcomber Hotel",
    major: "Surfcomber",
    location: "1717 Collins Avenue · Miami Beach, Florida",
    region: "South Florida",
    category: "Hospitality",
    group: "hospitality",
    filters: ["hospitality"],
    description:
      "HVAC support within an active hotel environment where cooling reliability, comfort, scheduling, and minimal interruption to guests and operations are important.",
    visual: "surfcomber",
    logo: "/assets/projects/logos/surfcomber.png",
    image: "/assets/projects/surfcomber-authentic.jpg",
  },
  {
    name: "Riverside Hotel",
    location: "620 East Las Olas Boulevard · Fort Lauderdale, Florida",
    region: "South Florida",
    category: "Hospitality / Historic Hotel",
    group: "hospitality",
    filters: ["hospitality"],
    description:
      "HVAC service experience supporting a landmark Fort Lauderdale hospitality property where comfort, reliability, and coordinated service execution are essential.",
    visual: "riverside",
    mark: ["RIVERSIDE HOTEL", "LAS OLAS BOULEVARD"],
    image: "/project-highlights/properties/riverside-hotel-las-olas-3b5aca4dd2.webp",
  },
  {
    name: "Hilton Fort Lauderdale Marina",
    location: "1881 SE 17th Street · Fort Lauderdale, Florida",
    region: "South Florida",
    category: "Hospitality / Marina",
    group: "hospitality",
    filters: ["hospitality"],
    description:
      "HVAC service experience within an active waterfront hotel environment requiring reliable comfort systems, coordinated access, and minimal disruption to guests and operations.",
    visual: "hilton",
    logo: "/project-highlights/logos/hilton.svg",
    mono: true,
    image: "/project-highlights/properties/hilton-fort-lauderdale-marina-bf4e66c730.webp",
    photoCaption: "Rendering, not a photograph of the property",
  },
  {
    name: "Hilton / Homewood Suites",
    location: "Cary, North Carolina",
    region: "North Carolina",
    category: "Hospitality",
    group: "hospitality",
    filters: ["hospitality"],
    description:
      "HVAC service experience supporting an extended-stay hospitality environment where guest comfort, equipment reliability, and coordinated service execution are essential.",
    visual: "cary",
    logo: "/project-highlights/logos/homewood-suites.svg",
    mono: true,
    image: "/project-highlights/properties/hilton-homewood-suites-cary-e5b4249603.webp",
    photoCaption: "Rendering, not a photograph of the property",
  },
  {
    name: "Marriott",
    major: "Marriott",
    location: "Bethesda, Maryland",
    region: "Maryland",
    category: "Hospitality",
    group: "hospitality",
    filters: ["hospitality"],
    description:
      "HVAC service experience supporting a Marriott hospitality environment where guest comfort, equipment reliability, scheduling, and continuous operation are essential.",
    visual: "marriott-bethesda",
    logo: "/assets/projects/logos/marriott.svg",
    mono: true,
    image: "/project-highlights/properties/marriott-bethesda-d55ad119b0.webp",
    photoCaption: "Rendering, not a photograph of the property",
  },
  {
    name: "The Ritz-Carlton Residences, Miami Beach",
    major: "Ritz-Carlton",
    location: "4701 Meridian Avenue · Miami Beach, Florida",
    region: "South Florida",
    category: "Luxury Residential",
    group: "residential",
    filters: ["residential"],
    description:
      "HVAC service experience supporting a luxury residential environment where comfort, system reliability, access coordination, and discreet professional execution are essential.",
    visual: "ritz",
    mark: ["THE RITZ-CARLTON", "RESIDENCES", "MIAMI BEACH"],
    image: "/project-highlights/properties/ritz-carlton-residences-miami-beach-9b675ae57d.webp",
    photoCaption: "Rendering, not a photograph of the property",
  },
  {
    name: "BMW Coconut Creek",
    location: "Coconut Creek, Florida",
    region: "South Florida",
    category: "Automotive Facility",
    group: "automotive",
    filters: ["automotive", "commercial"],
    description: "Automotive retail and service facility HVAC support.",
    visual: "bmw",
    logo: "/project-highlights/logos/bmw-official-light.svg",
    image: "/project-highlights/properties/bmw-coconut-creek-bbfd812965.webp",
  },
  {
    name: "Arrigo Sawgrass",
    location: "5901 Madison Avenue · Tamarac, Florida",
    region: "South Florida",
    category: "Automotive Facility",
    group: "automotive",
    filters: ["automotive", "commercial"],
    description: "Large-format dealership and service-area HVAC support.",
    visual: "arrigo",
    mark: ["ARRIGO", "CDJR SAWGRASS"],
    image: "/assets/arrigo-sawgrass-logo.png",
  },
  {
    name: "Jeep West Palm Beach",
    location: "West Palm Beach, Florida",
    region: "South Florida",
    category: "Automotive Facility",
    group: "automotive",
    filters: ["automotive", "commercial"],
    description: "Automotive retail and service facility HVAC support.",
    visual: "jeepwpb",
    logo: "/assets/jeep-logo.svg",
    mono: true,
    image: "/project-highlights/properties/jeep-west-palm-d82fbb85ae.webp",
  },
  {
    name: "Amazon — Fort Pierce, FL",
    major: "Amazon",
    location: "Fort Pierce, Florida",
    region: "Treasure Coast",
    category: "Distribution / Industrial",
    group: "industrial",
    filters: ["industrial", "commercial"],
    description:
      "HVAC service experience supporting a large-scale distribution or industrial environment where equipment reliability, airflow, controls, and operational continuity are critical.",
    visual: "amazon",
    logo: "/project-highlights/logos/amazon-reversed.svg",
    image: "/project-highlights/properties/amazon-fort-pierce-9041d49eec.webp",
    photoCaption: "Rendering, not a photograph of the property",
  },
  {
    name: "Amazon Fulfillment Center ACY1",
    major: "Amazon",
    location: "240 Mantua Grove Road · West Deptford, New Jersey",
    region: "New Jersey",
    category: "Fulfillment / Industrial",
    group: "industrial",
    filters: ["industrial", "commercial"],
    description:
      "HVAC service experience supporting a large fulfillment environment where equipment uptime, airflow, controls, scheduling, and operational continuity are critical.",
    visual: "amazon",
    logo: "/project-highlights/logos/amazon-reversed.svg",
    image: "/project-highlights/properties/amazon-acy1-west-deptford-78c46642d2.webp",
    photoCaption: "Rendering, not a photograph of the property",
  },
];

const majorBrands: { name: string; logo?: string; text?: string; className?: string }[] = [
  { name: "The Ritz-Carlton", text: "THE RITZ-CARLTON", className: "brand-serif" },
  { name: "Four Seasons", logo: "/assets/projects/logos/four-seasons.svg" },
  { name: "Kimpton Surfcomber", logo: "/assets/projects/logos/surfcomber.png" },
  { name: "Marriott", logo: "/assets/projects/logos/marriott.svg", className: "brand-mono" },
  { name: "Amazon", text: "AMAZON", className: "brand-sans" },
];

const reach = [
  { state: "Florida", note: "Hospitality, residential, automotive, and distribution environments" },
  { state: "New Jersey", note: "Fulfillment and industrial facility experience" },
  { state: "North Carolina", note: "Hospitality property experience" },
  { state: "Maryland", note: "Hospitality property experience" },
];

const experienceAreas = [
  "Luxury Hospitality",
  "Luxury Residential",
  "Automotive",
  "Industrial & Logistics",
  "Clubs & Amenity Spaces",
  "Multi-System Properties",
];

function ProjectCard({ property, number, index, spotlight }: { property: Property; number: number; index: number; spotlight: boolean }) {
    return (
    <article
      className={`project-card card-${property.visual} has-photo ${property.featured && spotlight ? "featured" : ""}`}
      style={{ "--project-delay": `${Math.min(index, 6) * 55}ms` } as React.CSSProperties}
    >
      <div className={`project-visual visual-${property.visual}`} aria-hidden="true">
        {property.image && (
          <Image
            src={property.image}
            alt=""
            fill
            sizes={property.featured ? "(max-width: 760px) 100vw, 58vw" : "(max-width: 760px) 100vw, (max-width: 1120px) 50vw, 33vw"}
            unoptimized
          />
        )}
      </div>
      <div className="project-shade" aria-hidden="true" />
      <div className="project-topline">
        <span>{String(number).padStart(2, "0")} · {property.region.toUpperCase()}</span>
        {property.featured && spotlight ? <strong>FEATURED EXPERIENCE</strong> : property.major && <strong className="major-badge">MAJOR BRAND</strong>}
      </div>
      <div className="project-copy">
        {property.logo ? (
          <div className={`project-logo project-logo-${property.visual}`}>
            <Image src={property.logo} width={200} height={90} alt={`${property.name} brand logo`} className={property.mono ? "logo-mono" : undefined} unoptimized />
          </div>
        ) : property.mark && (
          <div className="project-logo project-wordmark" aria-label={`${property.name} wordmark`}>
            {property.mark.map((line, i) => i === 0 ? <b key={line}>{line}</b> : <small key={line}>{line}</small>)}
          </div>
        )}
        <span>{property.category}</span>
        <h4>{property.name}</h4>
        <p className="project-location">{property.location}</p>
        <p>{property.description}</p>
        {property.photoCaption && <small className="project-photo-status">{property.photoCaption}</small>}
      </div>
    </article>
  );
}

export function ProjectHighlights() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const numbered = useMemo(
    () => {
      const featured = properties.filter((property) => property.featured);
      const rest = groups.flatMap((group) => properties.filter((property) => !property.featured && property.group === group.id));
      return [...featured, ...rest].map((property, i) => ({ property, number: i + 1 }));
    },
    [],
  );
  const showAll = activeFilter === "all";
  const visible = numbered.filter(({ property }) => showAll || property.filters.includes(activeFilter));
  const featuredItems = showAll ? visible.filter(({ property }) => property.featured) : [];
  const flowItems = showAll ? visible.filter(({ property }) => !property.featured) : visible;

  const renderGrid = (items: typeof visible, className = "") => (
    <div className={`project-grid ${className}`}>
      {items.map(({ property, number }, index) => (
        <ProjectCard key={property.name} property={property} number={number} index={index} spotlight={showAll} />
      ))}
    </div>
  );

  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-title">
      <div className="projects-orbit" aria-hidden="true" />
      <div className="projects-inner">
        <div className="projects-heading">
          <div>
            <p className="eyebrow">PROJECT HIGHLIGHTS</p>
            <h2 id="projects-title">Experience across demanding properties.</h2>
          </div>
          <p>
            O’Brien Air Conditioning supports HVAC systems across luxury residences,
            hospitality properties, automotive facilities, clubs, distribution
            centers, and commercial environments where comfort, reliability, access,
            scheduling, and operational continuity all matter.
          </p>
        </div>

        <div className="experience-strip" aria-label="Experience categories">
          <span className="experience-label">EXPERIENCE ACROSS</span>
          <div>
            {experienceAreas.map((area) => <span key={area}>{area}</span>)}
          </div>
        </div>

        <div className="major-brands" aria-label="Major brands in our project experience">
          <span className="major-brands-label">MAJOR BRANDS SERVICED</span>
          <ul>
            {majorBrands.map((brand) => (
              <li key={brand.name} className={brand.className}>
                {brand.logo
                  ? <Image src={brand.logo} width={160} height={56} alt={brand.name} unoptimized />
                  : <span>{brand.text}</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="project-filter" role="group" aria-label="Filter project highlights">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={activeFilter === filter.id ? "active" : ""}
              aria-pressed={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="project-results" key={activeFilter} aria-live="polite">
          {showAll && (
            <div className="project-group project-group-featured">
              <h3 className="project-group-title">Featured South Florida projects</h3>
              {renderGrid(featuredItems, "project-grid-featured")}
            </div>
          )}
          {showAll
            ? groups.map((group) => {
                const items = flowItems.filter(({ property }) => property.group === group.id);
                if (items.length === 0) return null;
                return (
                  <div className="project-group" key={group.id}>
                    <h3 className="project-group-title">{group.label}<span>{properties.filter((property) => property.group === group.id).length}</span></h3>
                    {renderGrid(items, items.length <= 2 ? "project-grid-wide" : "")}
                  </div>
                );
              })
            : renderGrid(flowItems, flowItems.length <= 2 ? "project-grid-wide" : "")}
        </div>

        <div className="project-reach" aria-labelledby="reach-title">
          <div>
            <p className="eyebrow">PROJECT REACH</p>
            <h3 id="reach-title">Experience beyond South Florida.</h3>
            <p>
              O’Brien’s project experience extends beyond local commercial and
              hospitality environments, with work supporting facilities in Florida
              and select out-of-state markets. This reflects past project experience
              only.
            </p>
          </div>
          <ul>
            {reach.map((item) => (
              <li key={item.state}><strong>{item.state}</strong><span>{item.note}</span></li>
            ))}
          </ul>
        </div>

        <p className="project-disclaimer">
          Photography: Surfcomber — <a href="https://commons.wikimedia.org/wiki/File:Miami_Beach_-_Surfcomber_Hotel.jpg">P. Hughes</a>, <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>; Four Seasons Fort Lauderdale — <a href="https://commons.wikimedia.org/wiki/File:Fort_Lauderdale,_Florida_2021_-_Four_Seasons.jpg">Sharon Hahn Darlin, 2021</a>, <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>; Marriott Harbor Beach — <a href="https://commons.wikimedia.org/wiki/File:Marriott_Harbor_Beach_Resort_and_Spa.jpg">Farragutful, 2016</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>; Riverside Hotel — <a href="https://commons.wikimedia.org/wiki/File:Riverside_Hotel_194800.jpg">Cmasi, 2017</a>, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>; Marriott Biscayne Bay — <a href="https://www.flickr.com/photos/pjs42/3463566932/">Peter &amp; Michelle S, 2009</a>, <a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>. Images resized, converted, and cropped for display. Archival property photographs do not represent project completion dates. Line-art placeholders do not depict the named properties. {" "}
          Property, hotel, club, and brand names and logos are trademarks of their
          respective owners and are used solely to identify locations where O’Brien
          Air Conditioning has performed HVAC-related work. No sponsorship,
          partnership, or endorsement is implied. Listed project experience does not
          indicate licensure to perform contracting work in any other state.
        </p>
      </div>
    </section>
  );
}
