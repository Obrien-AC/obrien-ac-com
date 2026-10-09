"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ArrowRight,
  Building2,
  CircuitBoard,
  Droplets,
  Fan,
  Gauge,
  Home,
  RefreshCw,
  ShieldCheck,
  Snowflake,
  ThermometerSun,
  Wind,
  Wrench,
  Zap,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Service = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
};

type Fact = {
  id: string;
  label: string;
  title: string;
  fact: string;
  action: string;
  icon: LucideIcon;
};

const commercialServices: Service[] = [
  {
    id: "commercial-service",
    number: "01",
    label: "SERVICE",
    title: "Commercial HVAC Service",
    description: "Targeted service for rooftop and packaged comfort systems.",
    detail: "A complete visit can include operating-condition checks, controls, airflow, electrical components, temperature performance, and equipment staging.",
    icon: Building2,
  },
  {
    id: "commercial-maintenance",
    number: "02",
    label: "MAINTAIN",
    title: "Preventive Maintenance",
    description: "Planned care that helps identify concerns before interruptions.",
    detail: "Maintenance is most useful when filters, coils, belts, drains, electrical connections, controls, and system operation are reviewed together.",
    icon: ShieldCheck,
  },
  {
    id: "commercial-diagnostics",
    number: "03",
    label: "DIAGNOSE",
    title: "System Diagnostics",
    description: "Methodical evaluation before repair recommendations are made.",
    detail: "Commercial diagnosis may involve multiple stages, safeties, economizers, building controls, VFDs, motors, and zone conditions—not only refrigerant pressures.",
    icon: Gauge,
  },
  {
    id: "commercial-repair",
    number: "04",
    label: "RESTORE",
    title: "Repair & Replacement",
    description: "Practical options based on condition and operating needs.",
    detail: "The right recommendation considers equipment condition, repair history, capacity needs, access, expected operation, and the effect on the occupied space.",
    icon: Wrench,
  },
  {
    id: "commercial-controls",
    number: "05",
    label: "CONTROL",
    title: "Controls & Economizers",
    description: "Sequence, sensor, actuator, and outside-air troubleshooting.",
    detail: "Control work can include thermostat and sensor inputs, occupied schedules, staging calls, economizer dampers, safeties, relays, and coordination with building automation systems.",
    icon: CircuitBoard,
  },
  {
    id: "commercial-airside",
    number: "06",
    label: "AIRFLOW",
    title: "Fans, Motors & Airside",
    description: "Air delivery evaluation across the unit and occupied zones.",
    detail: "Fan rotation, belts, pulleys, bearings, motor condition, VFD command, coil loading, filter pressure, dampers, and duct conditions can all change delivered airflow.",
    icon: Fan,
  },
];

const residentialServices: Service[] = [
  {
    id: "home-repair",
    number: "01",
    label: "REPAIR",
    title: "Residential AC Repair",
    description: "Cooling, electrical, drainage, and airflow troubleshooting.",
    detail: "A residential comfort complaint can come from controls, airflow, drainage, electrical components, refrigerant-side performance, or more than one condition at once.",
    icon: Home,
  },
  {
    id: "home-maintenance",
    number: "02",
    label: "MAINTAIN",
    title: "Home System Maintenance",
    description: "Routine checks for dependable cooling and moisture removal.",
    detail: "A useful maintenance visit looks at the indoor and outdoor equipment as one system, including filters, coils, drains, electrical parts, controls, airflow, and temperature performance.",
    icon: RefreshCw,
  },
  {
    id: "home-airflow",
    number: "03",
    label: "COMFORT",
    title: "Airflow & Humidity",
    description: "Help for weak airflow, uneven rooms, and indoor humidity.",
    detail: "Comfort is shaped by equipment operation, duct delivery, return airflow, insulation, air leakage, sun exposure, thermostat location, and indoor moisture—not temperature alone.",
    icon: Wind,
  },
  {
    id: "home-replacement",
    number: "04",
    label: "REPLACE",
    title: "System Replacement",
    description: "Replacement guidance built around the home and actual load.",
    detail: "A replacement decision should consider sizing, duct conditions, humidity control, efficiency, electrical requirements, installation quality, and the homeowner’s operating goals.",
    icon: ThermometerSun,
  },
  {
    id: "home-drainage",
    number: "05",
    label: "PROTECT",
    title: "Drainage & Water Protection",
    description: "Condensate-path care for South Florida cooling loads.",
    detail: "Drain lines, pans, traps, slope, cleanouts, float switches, coil condition, and equipment level all matter when protecting a home from condensate water.",
    icon: Droplets,
  },
  {
    id: "home-controls",
    number: "06",
    label: "CONTROL",
    title: "Thermostats & Controls",
    description: "Control setup, equipment calls, and operating-sequence checks.",
    detail: "Thermostat placement, configuration, schedules, wiring, equipment delays, float switches, and indoor-outdoor communication can affect both comfort and reliability.",
    icon: CircuitBoard,
  },
];

const commercialFacts: Fact[] = [
  {
    id: "staging",
    label: "Only one stage runs",
    title: "A second compressor is not always supposed to run immediately.",
    fact: "Multi-stage equipment may bring on additional capacity only when the load, time delay, controller logic, or space conditions call for it.",
    action: "Verify the demand and control sequence before treating an idle stage as a failed stage.",
    icon: CircuitBoard,
  },
  {
    id: "airflow",
    label: "Weak airflow",
    title: "Commercial airflow is a system condition, not a single-part diagnosis.",
    fact: "Filters, belts, fan rotation, VFD command, dampers, coils, duct pressure, and zone controls can all affect delivered airflow.",
    action: "Confirm fan operation and the air path before making a refrigerant diagnosis.",
    icon: Fan,
  },
  {
    id: "drainage",
    label: "Water complaint",
    title: "Drainage depends on pressure, trapping, slope, and a clear path.",
    fact: "A clean drain line can still perform poorly when a required trap is missing, the slope is wrong, or air pressure interferes with drainage.",
    action: "Inspect the complete condensate path and equipment pressure relationship.",
    icon: Droplets,
  },
  {
    id: "controls",
    label: "Intermittent shutdown",
    title: "A safety trip is a clue, not the root cause.",
    fact: "Pressure switches, float switches, overloads, phase monitors, and building controls may stop equipment to protect it from another condition.",
    action: "Document the active fault and operating conditions before resetting controls.",
    icon: Zap,
  },
  {
    id: "economizer",
    label: "Outside-air issue",
    title: "Economizer position can affect comfort even when compressors run.",
    fact: "A stuck damper, failed actuator, incorrect sensor input, or control sequence can introduce too much warm humid air—or too little required ventilation.",
    action: "Compare damper position and sensor readings with the controller command and actual outdoor conditions.",
    icon: Wind,
  },
  {
    id: "phase-power",
    label: "Power fault",
    title: "Three-phase protection can stop equipment before damage occurs.",
    fact: "Phase loss, reversal, imbalance, low voltage, a tripped overload, or a failed connection can interrupt large commercial equipment.",
    action: "Treat recurring phase or voltage faults as an electrical condition to document and correct—not a nuisance reset.",
    icon: Zap,
  },
];

const residentialFacts: Fact[] = [
  {
    id: "warm-air",
    label: "Warm air",
    title: "The thermostat is only the beginning of the diagnosis.",
    fact: "Warm supply air can result from an incorrect setting, lost outdoor-unit operation, restricted airflow, an electrical fault, or a refrigeration-system issue.",
    action: "Confirm COOL mode, the setpoint, filter condition, and whether the indoor and outdoor equipment are operating. Leave energized panels to a qualified technician.",
    icon: ThermometerSun,
  },
  {
    id: "water",
    label: "Water near the unit",
    title: "Cooling systems remove moisture as well as heat.",
    fact: "That moisture must leave through the condensate system. A blocked drain, damaged pan, frozen coil, or poor drainage can create a water complaint.",
    action: "If water is actively threatening the property, turn cooling off and arrange service rather than repeatedly resetting a float switch.",
    icon: Droplets,
  },
  {
    id: "uneven",
    label: "Uneven rooms",
    title: "Room temperature differences are not always an equipment-capacity problem.",
    fact: "Supply and return airflow, duct leakage, insulation, windows, sun exposure, door position, and zoning can change room-to-room comfort.",
    action: "Compare airflow and heat gain across the affected rooms before assuming the main system is undersized.",
    icon: Wind,
  },
  {
    id: "cycling",
    label: "Starts and stops",
    title: "Frequent short cycling deserves attention.",
    fact: "Very short run cycles can reduce moisture removal and add starting stress. Controls, airflow, electrical conditions, refrigerant performance, or sizing may be involved.",
    action: "Record how long the system runs and how often it restarts, then have the operating sequence checked.",
    icon: Activity,
  },
  {
    id: "humidity",
    label: "House feels humid",
    title: "Lower temperature does not automatically mean better moisture control.",
    fact: "Run time, airflow, equipment sizing, fan settings, duct leakage, infiltration, and system condition all influence indoor humidity removal.",
    action: "Check whether the system runs long enough to dehumidify and evaluate airflow and outside-air leakage before lowering the setpoint further.",
    icon: Droplets,
  },
  {
    id: "frozen",
    label: "Ice on the system",
    title: "Ice is a symptom that needs the system shut down and diagnosed.",
    fact: "Restricted airflow, a dirty coil, blower problems, control issues, or refrigerant-side conditions can allow the indoor coil to freeze.",
    action: "Turn cooling off, allow the ice to melt, check the filter, and arrange service. Do not chip ice from the coil.",
    icon: Snowflake,
  },
];

export function ServiceExplorer() {
  const [mode, setMode] = useState("commercial");
  const [activeService, setActiveService] = useState(commercialServices[0].id);
  const [activeFact, setActiveFact] = useState(commercialFacts[0].id);

  const changeMode = (value: string) => {
    setMode(value);
    if (value === "residential") {
      setActiveService(residentialServices[0].id);
      setActiveFact(residentialFacts[0].id);
    } else {
      setActiveService(commercialServices[0].id);
      setActiveFact(commercialFacts[0].id);
    }
  };

  const renderMode = (kind: "commercial" | "residential") => {
    const services = kind === "commercial" ? commercialServices : residentialServices;
    const facts = kind === "commercial" ? commercialFacts : residentialFacts;
    const selectedService = services.find((service) => service.id === activeService) ?? services[0];
    const selectedFact = facts.find((fact) => fact.id === activeFact) ?? facts[0];
    const SelectedServiceIcon = selectedService.icon;
    const SelectedFactIcon = selectedFact.icon;

    return (
      <>
        <div className="section-heading explorer-heading">
          <div>
            <p className="eyebrow green">
              {kind === "commercial" ? "COMMERCIAL HVAC SUPPORT" : "RESIDENTIAL HVAC SUPPORT"}
            </p>
            <h2>
              {kind === "commercial" ? (
                <>Built around the system.<br />Focused on the operation.</>
              ) : (
                <>Better home comfort.<br />Clearer answers.</>
              )}
            </h2>
          </div>
          <p>
            {kind === "commercial"
              ? "From a single comfort complaint to planned equipment care, every visit starts with the condition of the complete system."
              : "Residential service should connect the symptoms inside the home to the equipment, airflow, drainage, controls, and South Florida humidity outside it."}
          </p>
        </div>

        <div className="service-grid interactive-grid">
          {services.map((service) => {
            const Icon = service.icon;
            const isActive = service.id === selectedService.id;
            return (
              <button
                type="button"
                className={`service-card interactive-card${isActive ? " active" : ""}`}
                key={service.id}
                onClick={() => setActiveService(service.id)}
                aria-pressed={isActive}
              >
                <div className="card-accent" />
                <div className="service-card-top">
                  <span>{service.number} / {service.label}</span>
                  <div className="service-icon"><Icon size={30} strokeWidth={1.55} /></div>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="explore">Explore service <ArrowRight size={15} /></span>
              </button>
            );
          })}
        </div>

        <div className="service-detail-panel" aria-live="polite">
          <div className="detail-icon"><SelectedServiceIcon size={26} /></div>
          <div>
            <span>SELECTED SERVICE</span>
            <h3>{selectedService.title}</h3>
            <p>{selectedService.detail}</p>
          </div>
          <div className="signal-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
        </div>

        <div className="system-intel">
          <div className="intel-heading">
            <span className="intel-kicker">INTERACTIVE SYSTEM GUIDE</span>
            <h3>{kind === "commercial" ? "Choose an operating symptom." : "What are you noticing at home?"}</h3>
            <p>Select a symptom to see what it may tell you about the system.</p>
          </div>

          <div className="symptom-list" aria-label={`${kind} HVAC symptoms`} role="group">
            {facts.map((fact) => {
              const Icon = fact.icon;
              const isActive = fact.id === selectedFact.id;
              return (
                <button
                  type="button"
                  key={fact.id}
                  className={isActive ? "active" : ""}
                  onClick={() => setActiveFact(fact.id)}
                  aria-pressed={isActive}
                >
                  <Icon size={18} /><span>{fact.label}</span><ArrowRight size={15} />
                </button>
              );
            })}
          </div>

          <article className="fact-display" aria-live="polite">
            <div className="fact-orbit" aria-hidden="true"><span /></div>
            <div className="fact-icon"><SelectedFactIcon size={32} /></div>
            <span className="fact-label">HVAC FACT</span>
            <h3>{selectedFact.title}</h3>
            <p>{selectedFact.fact}</p>
            <div className="fact-action"><strong>Useful next step</strong><span>{selectedFact.action}</span></div>
          </article>
        </div>
      </>
    );
  };

  return (
    <section className="services-section advanced-services" id="services">
      <Tabs value={mode} onValueChange={changeMode} className="service-explorer">
        <div className="audience-switch-wrap">
          <span>CHOOSE SERVICE TYPE</span>
          <TabsList className="audience-tabs">
            <TabsTrigger value="commercial"><Building2 /> Commercial</TabsTrigger>
            <TabsTrigger value="residential"><Home /> Residential</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="commercial">{renderMode("commercial")}</TabsContent>
        <TabsContent value="residential">{renderMode("residential")}</TabsContent>
      </Tabs>
    </section>
  );
}
