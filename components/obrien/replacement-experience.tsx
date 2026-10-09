"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Gauge,
  Home,
  Package,
  Route,
  Settings2,
  ShieldCheck,
  Wind,
  Zap,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ProjectMode = "commercial" | "residential";

const projectData = {
  commercial: {
    eyebrow: "LARGE COMMERCIAL REPLACEMENTS",
    title: "Replacement logistics, engineered around the operation.",
    intro:
      "Large packaged and rooftop replacements require more than equipment selection. Access, structural and curb conditions, controls, rigging, shutdown windows, duct transitions, power, drainage, and start-up all have to align.",
    image: "/assets/commercial-replacement-v1.png",
    imageAlt: "Large commercial rooftop air-conditioning unit being crane-set by a professional crew",
    stat: "RTU / PACKAGED",
    statLabel: "coordinated replacements",
    steps: [
      { title: "Survey", copy: "Document equipment, capacity, curb, duct, power, controls, access, drainage, and operating constraints.", icon: ClipboardCheck },
      { title: "Plan", copy: "Confirm replacement compatibility and coordinate transitions, permits, rigging, safety, and the shutdown sequence.", icon: Route },
      { title: "Lift & set", copy: "Stage the crane or rigging plan, protect the property, remove the old unit, and place the replacement accurately.", icon: Package },
      { title: "Connect", copy: "Complete duct, electrical, controls, gas where applicable, condensate, accessories, and weatherproofing connections.", icon: Zap },
      { title: "Commission", copy: "Verify rotation, staging, safeties, airflow, temperature performance, controls response, drainage, and final operation.", icon: Gauge },
    ],
    capabilities: ["Rooftop units", "Packaged systems", "Split systems", "VRF / VRV coordination", "Economizers", "VFDs & fan systems", "BAS / controls", "Curb adapters", "Crane & rigging coordination", "Condensate systems", "Staged capacity", "Start-up & commissioning"],
  },
  residential: {
    eyebrow: "RESIDENTIAL SYSTEM REPLACEMENTS",
    title: "A complete comfort system—not just a new box.",
    intro:
      "A dependable home replacement starts with the house, the duct system, and the family’s comfort concerns. Equipment matching, airflow, humidity control, electrical requirements, drainage, and installation details shape the result.",
    image: "/assets/residential-replacement-v1.png",
    imageAlt: "Technicians installing a residential outdoor air-conditioning condenser at a South Florida home",
    stat: "WHOLE-HOME",
    statLabel: "comfort-focused replacements",
    steps: [
      { title: "Assess", copy: "Review comfort complaints, operating history, equipment condition, duct delivery, returns, drainage, and the home envelope.", icon: ClipboardCheck },
      { title: "Match", copy: "Select compatible indoor and outdoor equipment with capacity, efficiency, humidity, electrical, and control needs in view.", icon: Settings2 },
      { title: "Prepare", copy: "Protect the home and verify the pad or platform, line set, drain, disconnect, breaker, thermostat wiring, and access.", icon: ShieldCheck },
      { title: "Install", copy: "Set, connect, seal, evacuate, charge as required, and complete the electrical, controls, drainage, and airflow work.", icon: Zap },
      { title: "Verify", copy: "Confirm temperature split, airflow, static conditions where needed, drainage, thermostat response, and stable operation.", icon: CheckCircle2 },
    ],
    capabilities: ["Heat-pump systems", "Straight-cool systems", "Air handlers", "Condensers", "Duct & return review", "Humidity control", "Thermostats & controls", "Float-switch protection", "Drainage corrections", "Air-quality accessories", "Electrical compatibility", "Start-up verification"],
  },
} as const;

export function ReplacementExperience() {
  const [mode, setMode] = useState<ProjectMode>("commercial");
  const [activeStep, setActiveStep] = useState(0);
  const data = projectData[mode];
  const step = data.steps[activeStep];
  const StepIcon = step.icon;

  const changeMode = (value: string) => {
    setMode(value as ProjectMode);
    setActiveStep(0);
  };

  return (
    <section className="replacement-section" id="replacements">
      <div className="replacement-shell">
        <div className="replacement-heading">
          <div>
            <p className="eyebrow">PROJECT CAPABILITY</p>
            <h2>From replacement plan<br />to verified performance.</h2>
          </div>
          <p>
            Explore how O’Brien approaches commercial equipment changes and residential
            system replacements. Select a project type, then move through the workflow.
          </p>
        </div>

        <Tabs value={mode} onValueChange={changeMode}>
          <TabsList className="replacement-tabs" aria-label="Replacement project type">
            <TabsTrigger value="commercial"><Building2 /> Commercial replacement</TabsTrigger>
            <TabsTrigger value="residential"><Home /> Residential replacement</TabsTrigger>
          </TabsList>

          {(["commercial", "residential"] as const).map((kind) => {
            const panel = projectData[kind];
            return (
              <TabsContent value={kind} key={kind}>
                <div className="replacement-visual">
                  <Image src={panel.image} fill sizes="(max-width: 760px) 100vw, 92vw" alt={panel.imageAlt} unoptimized />
                  <div className="replacement-image-shade" />
                  <div className="replacement-image-copy">
                    <span>{panel.eyebrow}</span>
                    <h3>{panel.title}</h3>
                    <p>{panel.intro}</p>
                  </div>
                  <div className="replacement-badge">
                    <strong>{panel.stat}</strong>
                    <span>{panel.statLabel}</span>
                  </div>
                </div>
              </TabsContent>
            );
          })}

          <div className="replacement-workflow">
            <div className="workflow-steps" role="group" aria-label={`${mode} replacement workflow`}>
              {data.steps.map((item, index) => {
                const Icon = item.icon;
                const isActive = index === activeStep;
                const isComplete = index < activeStep;
                return (
                  <button
                    type="button"
                    key={item.title}
                    className={`${isActive ? "active" : ""}${isComplete ? " complete" : ""}`}
                    onClick={() => setActiveStep(index)}
                    aria-pressed={isActive}
                  >
                    <span className="workflow-index">{isComplete ? <CheckCircle2 size={17} /> : `0${index + 1}`}</span>
                    <Icon size={18} />
                    <span>{item.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="workflow-detail" aria-live="polite">
              <div className="workflow-detail-icon"><StepIcon size={32} /></div>
              <div>
                <span>STEP {activeStep + 1} OF {data.steps.length}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveStep((activeStep + 1) % data.steps.length)}
                aria-label="Show next replacement step"
              >
                Next step <ArrowRight size={16} />
              </button>
              <div className="workflow-progress" aria-hidden="true">
                <i style={{ width: `${((activeStep + 1) / data.steps.length) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="capability-board">
            <div>
              <span className="intel-kicker">SYSTEMS & SERVICES</span>
              <h3>{mode === "commercial" ? "Commercial capabilities" : "Residential capabilities"}</h3>
              <p>Equipment and project support considered as part of the complete operating system.</p>
            </div>
            <div className="capability-tags">
              {data.capabilities.map((capability, index) => (
                <span key={capability}><i>{String(index + 1).padStart(2, "0")}</i>{capability}</span>
              ))}
            </div>
            <div className="system-pulse" aria-hidden="true">
              <Wind size={26} />
              <i /><i /><i /><i />
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
