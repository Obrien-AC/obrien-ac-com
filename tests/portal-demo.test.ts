import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd(), "portal-demo");
const app = readFileSync(resolve(root, "app.js"), "utf8");
const html = readFileSync(resolve(root, "index.html"), "utf8");
const manifest = JSON.parse(readFileSync(resolve(root, "data/documents.json"), "utf8"));

describe("static customer portal demo", () => {
  it("has seven proposal metadata records without publishing confidential PDFs", () => {
    expect(manifest).toHaveLength(7);
    expect(manifest.every((document: { publicDocument: boolean }) => document.publicDocument === false)).toBe(true);
    expect(new Set(manifest.map((document: { documentId: string }) => document.documentId)).size).toBe(7);
    expect(app).toContain("Confidential PDF not published · select it locally to preview");
    expect(app).toContain("function pickFile");
  });

  it("labels the portal as a static demonstration", () => {
    expect(html).toContain("Demonstration portal — sample access only");
    expect(app).toContain("Authorized access only");
    expect(app).toContain("localStorage");
  });

  it("supports all three presentation roles and hash navigation", () => {
    expect(app).toContain("group@demo.obrienac.com");
    expect(app).toContain("morgan@obrienaccounts.com");
    expect(app).toContain("admin@demo.obrienac.com");
    expect(app).toContain("#/dashboard");
  });

  it("gives the presentation location manager the complete portfolio", () => {
    expect(app).toContain('"morgan@obrienaccounts.com":{password:"morganfamily",name:"Morgan Dealership Manager",role:"location",locationIds:"all"}');
    expect(app).toContain('title:"Ten rooftop units. Clear action priorities."');
    expect(app).toContain('title:"Drainage risk, organized by documented unit."');
    expect(app).toContain('data-location-tab="equipment"');
    expect(app).toContain('data-go="#/location/${s.locationId}/upcoming"');
    expect(app).toContain('class="clickable-window" data-go="#/report"');
    expect(app).toContain('function requestCenter()');
    expect(app).toContain('function notificationCenter()');
    expect(app).toContain('function presentationMode()');
    expect(app).toContain('View asset details');
  });

  it("assigns a dashboard image to every authorized location", () => {
    expect((app.match(/photo:"\.\/assets\//g) || [])).toHaveLength(10);
  });

  it("adds a secure Morgan residential live-status workspace", () => {
    expect(app).toContain('id:"morgan-residence"');
    expect(app).toContain("function residentialPanel");
    expect(app).toContain("function refreshHomeAssistant");
    expect(app).toContain('sessionStorage.getItem("obrienHaUrl")');
    expect(app).not.toContain("Bearer ey");
    expect(app).toContain("O'Brien Elite Membership");
    expect(app).toContain("Always connected. Always informed.");
    expect(readFileSync(resolve(root, "assets/obrien-elite-membership.png")).length).toBeGreaterThan(0);
  });

  it("adds Arrigo Sawgrass and Margate with logos, building images, and condition reports", () => {
    for (const location of ["arrigo-sawgrass", "arrigo-margate"]) {
      expect(app).toContain(`id:"${location}"`);
      expect(app).toContain(`./assets/${location}.jpg`);
      expect(app).toContain(`./assets/${location}-logo.png`);
      expect(readFileSync(resolve(root, `assets/${location}.jpg`)).length).toBeGreaterThan(0);
      expect(readFileSync(resolve(root, `assets/${location}-logo.png`)).length).toBeGreaterThan(0);
      expect(readFileSync(resolve(root, `documents/${location}-condition-report.pdf`)).length).toBeGreaterThan(0);
    }
    expect(app).toContain("function conditionReportPanel");
    expect(app).toContain("function previewConditionReport");
  });

  it("attaches each supplied Arrigo proposal to its matching location workspace", () => {
    expect(app).toContain("function proposalDocumentPanel");
    expect(app).toContain("function previewLocationProposal");
    expect(app).toContain("OB-2026-0930-MARGATE-PM");
    expect(app).toContain("2849-AC");
    for (const file of ["arrigo-sawgrass-replacement-proposal.pdf", "arrigo-margate-maintenance-proposal.pdf"]) {
      expect(app).toContain(`./documents/${file}`);
      expect(readFileSync(resolve(root, `documents/${file}`)).length).toBeGreaterThan(0);
    }
  });

  it("adds the Units 7 and 8 Elite replacement bundle to Arrigo Sawgrass", () => {
    expect(app).toContain("Units 7 & 8 Elite HVAC Replacement Bundle");
    expect(app).toContain("$76,892.00");
    expect(app).toContain("Two-system bundle · 6% discount · $4,908 savings");
    expect(app).toContain("function locationProposalDocuments");
    expect(readFileSync(resolve(root, "documents/arrigo-sawgrass-units-7-8-replacement-proposal.pdf")).length).toBeGreaterThan(0);
  });

  it("adds the supplied electrical plan set only to Arrigo Sawgrass", () => {
    expect(app).toContain('title:"Electrical Plans"');
    expect(app).toContain('metric:"9 sheets"');
    expect(app).toContain('data-location-tab="plans"');
    expect(app).toContain("function plansPanel");
    expect(readFileSync(resolve(root, "documents/arrigo-sawgrass-electrical-plans.pdf")).length).toBeGreaterThan(0);
  });

  it("does not expose demo credentials or bypass buttons in the login UI", () => {
    expect(app).not.toContain("featured-demo");
    expect(app).not.toContain("demo-access");
    expect(app).not.toContain("Try Demo");
  });

  it("includes the elite BMW Coconut Creek location workspace", () => {
    expect(app).toContain("function coconutCondition");
    expect(app).toContain("function coconutAgreement");
    expect(app).toContain("function coconutUpcoming");
    expect(app).toContain("function coconutHistory");
    expect(app).toContain("OB-PM-2026-1008-01");
    expect(app).toContain("Sample report · Not an actual inspection");
  });

  it("provides a demo equipment registry and unit issue workflow", () => {
    expect(app).toContain("const COCONUT_EQUIPMENT=");
    expect(app).toContain('data-location-tab="equipment"');
    expect(app).toContain("function reportUnitModal");
    expect(app).toContain("Unit is not working");
    expect(app).toContain("it does not contact O'Brien or dispatch service");
  });

  it("attaches viewable PDF examples to every BMW workspace area", () => {
    expect(app).toContain("const COCONUT_DOCS=");
    for (const name of ["equipment-registry", "condition-report", "agreement-summary", "upcoming-service", "service-history"]) {
      expect(app).toContain(`bmw-coconut-creek-${name}-demo.pdf`);
      expect(readFileSync(resolve(root, `documents/bmw-coconut-creek-${name}-demo.pdf`)).length).toBeGreaterThan(0);
    }
  });

  it("keeps the assigned Morgan Auto Group account manager available throughout the account", () => {
    expect(html).toContain('id="account-manager"');
    expect(app).toContain("Chad Oberstein");
    expect(app).toContain("Operation Manager · Assigned Account Manager");
    expect(app).toContain("tel:+13476340943");
    expect(app).toContain("mailto:chad@obrianac.com");
  });

  it("exports and imports browser-local demo data without credentials or PDFs", () => {
    expect(html).toContain('id="data-transfer"');
    expect(app).toContain("function exportDemoData");
    expect(app).toContain("function normalizeImport");
    expect(app).toContain("function importDemoData");
    expect(app).toContain('schema:"obrien-portal-demo"');
    expect(app).toContain("Passwords and credentials are never exported");
    expect(app).toContain("Locally selected confidential PDFs remain on this device");
  });

  it("provides an executive command center with portfolio intelligence", () => {
    expect(app).toContain("const LOCATION_INTELLIGENCE=");
    expect(app).toContain("Portfolio intelligence.");
    expect(app).toContain("Documented exposure");
    expect(app).toContain("Action Required");
    expect(app).toContain("function locationCard");
  });

  it("includes a searchable cross-location document center", () => {
    expect(app).toContain("function documentRecords");
    expect(app).toContain("function documents");
    expect(app).toContain('id="document-search"');
    expect(app).toContain('data-go="#/documents"');
    expect(app).toContain("private object storage");
  });

  it("adds elite capital planning and executive reporting workspaces", () => {
    expect(app).toContain("const CAPITAL_PLAN=");
    expect(app).toContain("const PORTFOLIO_ALERTS=");
    expect(app).toContain("function capitalPlan");
    expect(app).toContain("function executiveReport");
    expect(app).toContain('data-go="#/capital"');
    expect(app).toContain('data-go="#/report"');
    expect(app).toContain("Comfort systems.<br><em>Business clarity.</em>");
    expect(app).toContain("Five-year modeled plan");
  });
});
