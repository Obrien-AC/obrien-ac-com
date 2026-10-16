from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


OUT = Path(__file__).resolve().parents[1] / "portal-demo" / "documents"
OUT.mkdir(parents=True, exist_ok=True)


def build(filename, eyebrow, title, subtitle, metrics, sections):
    path = OUT / filename
    styles = getSampleStyleSheet()
    styles.add(ParagraphStyle(name="Eyebrow", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=9, leading=12, textColor=colors.HexColor("#26d48c"), spaceAfter=10))
    styles.add(ParagraphStyle(name="TitleX", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=26, leading=29, textColor=colors.HexColor("#0b2519"), spaceAfter=8))
    styles.add(ParagraphStyle(name="BodyX", parent=styles["BodyText"], fontSize=10, leading=15, textColor=colors.HexColor("#33443b")))
    styles.add(ParagraphStyle(name="HeadX", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=14, textColor=colors.HexColor("#0b2519"), spaceBefore=14, spaceAfter=6))
    story = [Paragraph("FICTIONAL DEMONSTRATION — NO REAL CUSTOMER DATA", styles["Eyebrow"]), Paragraph(title, styles["TitleX"]), Paragraph(subtitle, styles["BodyX"]), Spacer(1, 0.18 * inch)]
    data = [[Paragraph(k, styles["Eyebrow"]), Paragraph(v, styles["BodyX"])] for k, v in metrics]
    table = Table(data, colWidths=[1.8 * inch, 4.6 * inch], hAlign="LEFT")
    table.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), colors.HexColor("#eef7f1")), ("BOX", (0, 0), (-1, -1), 0.75, colors.HexColor("#b8d8c6")), ("INNERGRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#d5e7dc")), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 10), ("RIGHTPADDING", (0, 0), (-1, -1), 10), ("TOPPADDING", (0, 0), (-1, -1), 9), ("BOTTOMPADDING", (0, 0), (-1, -1), 9)]))
    story.append(table)
    for heading, text in sections:
        story.extend([Paragraph(heading, styles["HeadX"]), Paragraph(text, styles["BodyX"])])
    story.extend([Spacer(1, 0.25 * inch), Paragraph("Prepared for the O’Brien Elite Portal public demonstration. All names, assets, readings, dates, prices, documents and workflows in this file are fictional.", styles["BodyX"])])
    doc = SimpleDocTemplate(str(path), pagesize=letter, rightMargin=0.62 * inch, leftMargin=0.62 * inch, topMargin=0.62 * inch, bottomMargin=0.62 * inch, title=title, author="O'Brien Air Conditioning — Demo")
    doc.build(story)


build("harbor-point-condition-report-demo.pdf", "DEMO CONDITION REPORT", "Harbor Point Motors — HVAC Condition Brief", "Sample executive condition summary for a fictional automotive facility.", [("Portfolio status", "Operational with two monitored assets"), ("Condition score", "91 / 100 (simulated)"), ("Assets reviewed", "12 fictional HVAC assets"), ("Recommended action", "Continue planned maintenance; review RTU-04 belt tension")], [("Executive summary", "Comfort delivery is stable across the showroom and office zones. Simulated trend data indicates consistent discharge temperatures and no active critical alarms."), ("Illustrative findings", "RTU-04 shows a moderate belt-wear trend. FCU-02 is operating normally after a fictional drain-line service. All readings are examples for product demonstration."), ("Recommended next step", "Confirm the upcoming preventive visit and keep the monitored assets on the 30-day review list.")])
build("harbor-point-replacement-proposal-demo.pdf", "DEMO REPLACEMENT PROPOSAL", "Harbor Point Motors — RTU-04 Replacement Option", "Fictional decision-ready proposal created only for portal demonstration.", [("Proposal value", "$48,750 (fictional)"), ("Preferred savings", "$3,900 (fictional)"), ("Project window", "3 working days (illustrative)"), ("Status", "Awaiting demo decision")], [("Scope", "Replace one fictional 10-ton rooftop unit serving the east showroom, provide curb adaptation, controls integration, start-up and commissioning."), ("Commercial options", "Standard option: $52,650. Morgan Preferred demo option: $48,750. These figures are fictional and are not an offer or contract."), ("Decision workflow", "Portal users may request a simulated revision or record a simulated approval. No purchase or binding authorization occurs.")])
build("cypress-maintenance-agreement-demo.pdf", "DEMO MAINTENANCE AGREEMENT", "Cypress Auto Center — Elite Care Plan", "Fictional preventive maintenance plan for guided-portal use.", [("Covered assets", "9 fictional systems"), ("Visit frequency", "Quarterly"), ("Response target", "Priority dispatch — demonstration only"), ("Annual value", "$14,400 (fictional)")], [("Included services", "Quarterly inspections, filter management, drain treatment, operating checks, documented readings and portal closeout reports."), ("Portal visibility", "Upcoming visits, completed work, equipment history and documents appear in the fictional sample workspace."), ("Important notice", "This sample has no legal effect and does not represent an active customer agreement.")])
build("palm-ridge-service-report-demo.pdf", "DEMO SERVICE REPORT", "Palm Ridge Offices — Service Visit Closeout", "Fictional work-order closeout with sample before-and-after results.", [("Work order", "DEMO-24018"), ("Asset", "AHU-03"), ("Status", "Completed — simulated"), ("Comfort result", "72°F supply zone / stable")], [("Reported issue", "Second-floor west offices were represented as warmer than the target during a simulated afternoon load."), ("Work performed", "The fictional technician inspected airflow, cleaned the simulated sensor, verified damper response and documented stable operation."), ("Closeout", "No follow-up is required in this example. The customer may reopen or create another simulated service request in the portal.")])

print("Generated 4 fictional showcase PDFs")
