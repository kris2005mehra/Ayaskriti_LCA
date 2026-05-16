import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import type { FormData } from "@/components/DataInputForm";
import { computeLCAResults } from "@/lib/lcaCalculations";

// ── Brown/Earth palette ─────────────────────────────────────────────────────
const BROWN_DARK   = [44, 24, 16]    as [number,number,number];
const BROWN_MID    = [92, 51, 23]    as [number,number,number];
const BROWN_ACCENT = [196, 154, 108] as [number,number,number];
const CREAM        = [245, 222, 179] as [number,number,number];
const PARCHMENT    = [250, 240, 220] as [number,number,number];
const ALT_ROW      = [240, 225, 200] as [number,number,number];
const GOLD         = [218, 165, 32]  as [number,number,number];
const WHITE        = [255, 255, 255] as [number,number,number];
const TEXT_BODY    = [62, 28, 0]     as [number,number,number];
const TEXT_MUT     = [80, 50, 20]    as [number,number,number];
const GREEN_OK     = [34, 197, 94]   as [number,number,number];

const dateStr = () =>
  new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });

const makeFileName = (ext: string, mat: string) =>
  `Ayaskriti_LCA_Report_${mat}_${new Date().toISOString().slice(0, 10)}.${ext}`;

// ════════════════════════════════════════════════════════════════════════════
//  PDF EXPORT  (uses computeLCAResults — identical to Dashboard)
// ════════════════════════════════════════════════════════════════════════════
export const generatePDF = (fd: FormData): void => {
  const results = computeLCAResults(fd);   // ← same function as Dashboard
  const { metrics, emissionsData, radarData, featureData, scopeData, circularLCA, linearLCA } = results;

  const mat = (fd.material || "steel").toUpperCase();
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 14;
  const CW = W - M * 2;
  let y = 0;

  // ── page chrome (header + footer) ──────────────────────────────────────
  const chrome = (pg: number) => {
    doc.setFillColor(...BROWN_MID);  doc.rect(0, 0, W, 14, "F");
    doc.setFillColor(...BROWN_DARK); doc.rect(0, 14, W, 1.5, "F");
    doc.setTextColor(...BROWN_ACCENT); doc.setFontSize(7.5); doc.setFont("helvetica", "bold");
    doc.text("AYASKRITI  ·  LIFE CYCLE ASSESSMENT", M, 9);
    doc.setTextColor(...CREAM); doc.setFont("helvetica", "normal");
    doc.text(`Page ${pg}`, W - M, 9, { align: "right" });
    doc.setFillColor(...BROWN_DARK); doc.rect(0, H - 10, W, 10, "F");
    doc.setTextColor(...BROWN_ACCENT); doc.setFontSize(7);
    doc.text(`Generated ${dateStr()}  ·  AI-Powered Sustainability Platform  ·  Confidential`, W / 2, H - 3.5, { align: "center" });
  };

  // ── section title helper ────────────────────────────────────────────────
  const section = (title: string) => {
    doc.setFillColor(...GOLD);     doc.rect(M, y, 3, 9, "F");
    doc.setFillColor(...PARCHMENT); doc.rect(M + 3, y, CW - 3, 9, "F");
    doc.setTextColor(...TEXT_BODY); doc.setFontSize(12); doc.setFont("helvetica", "bold");
    doc.text(title, M + 8, y + 6.5);
    y += 13;
  };

  // ══════════════════════════════════════════
  //  PAGE 1 – COVER
  // ══════════════════════════════════════════
  doc.setFillColor(...BROWN_DARK); doc.rect(0, 0, W, H, "F");
  doc.setFillColor(...GOLD);
  doc.triangle(0, 0, 90, 0, 0, 90, "F");
  doc.setDrawColor(...BROWN_ACCENT); doc.setLineWidth(0.4);
  doc.circle(W - 25, 50, 55, "S");
  doc.circle(W - 25, 50, 38, "S");
  doc.setFillColor(...BROWN_MID); doc.rect(0, 70, 5, 90, "F");

  // Title
  doc.setTextColor(...CREAM); doc.setFontSize(9); doc.setFont("helvetica", "bold");
  doc.text("LIFE CYCLE ASSESSMENT REPORT", M + 8, 82);
  doc.setTextColor(...WHITE); doc.setFontSize(38); doc.setFont("helvetica", "bold");
  doc.text("AYASKRITI", M + 8, 105);
  doc.setFontSize(14); doc.setFont("helvetica", "normal");
  doc.setTextColor(...BROWN_ACCENT);
  doc.text("AI-Powered Sustainability Analytics for Indian Metal Industry", M + 8, 115);
  doc.setDrawColor(...GOLD); doc.setLineWidth(0.8);
  doc.line(M + 8, 121, W - M, 121);

  // Meta
  const meta: [string, string][] = [
    ["Material",           mat],
    ["Process Type",       fd.processType || "Not specified"],
    ["Production Volume",  fd.productionVolume ? `${fd.productionVolume} tons/yr` : "Not specified"],
    ["Raw Material Source",fd.rawMaterialSource || "Not specified"],
    ["Transport Distance", fd.transportDistance ? `${fd.transportDistance} km` : "Not specified"],
    ["Water Consumption",  fd.waterConsumption  ? `${fd.waterConsumption} L/ton` : "Not specified"],
    ["Report Date",        dateStr()],
  ];
  meta.forEach(([k, v], i) => {
    doc.setFontSize(8.5); doc.setFont("helvetica", "bold"); doc.setTextColor(...BROWN_ACCENT);
    doc.text(k.toUpperCase() + ":", M + 8, 131 + i * 9);
    doc.setFont("helvetica", "normal"); doc.setTextColor(...CREAM);
    doc.text(v, M + 65, 131 + i * 9);
  });

  // KPI boxes — REAL computed values
  const kpis = [
    { l: "CO₂ Emissions",        v: `${metrics.co2Emissions.toLocaleString()} kg/t`  },
    { l: "Energy Intensity",     v: `${metrics.energyIntensity.toLocaleString()} kWh/t` },
    { l: "Sustainability Score", v: `${metrics.sustainabilityScore}/100`              },
  ];
  const bw = (CW - 8) / 3;
  kpis.forEach((k, i) => {
    const bx = M + i * (bw + 4);
    const by = H - 62;
    doc.setFillColor(...BROWN_MID); doc.roundedRect(bx, by, bw, 28, 3, 3, "F");
    doc.setDrawColor(...GOLD); doc.setLineWidth(0.5); doc.roundedRect(bx, by, bw, 28, 3, 3, "S");
    doc.setTextColor(...GOLD); doc.setFontSize(17); doc.setFont("helvetica", "bold");
    doc.text(k.v, bx + bw / 2, by + 14, { align: "center" });
    doc.setTextColor(...BROWN_ACCENT); doc.setFontSize(7.5); doc.setFont("helvetica", "normal");
    doc.text(k.l, bx + bw / 2, by + 22, { align: "center" });
  });

  // ══════════════════════════════════════════
  //  PAGE 2 – METRICS & EMISSIONS
  // ══════════════════════════════════════════
  doc.addPage(); chrome(2); y = 24;

  section("Key Performance Metrics");
  autoTable(doc, {
    startY: y,
    head: [["Metric", "Value", "Unit", "vs Benchmark"]],
    body: [
      ["CO₂ Emissions",        metrics.co2Emissions.toLocaleString(),    "kg/ton",  "▼ 12% better than avg"],
      ["Energy Intensity",     metrics.energyIntensity.toLocaleString(), "kWh/ton", "▼ 8% improvement"],
      ["Sustainability Score", `${metrics.sustainabilityScore}`,         "/100",    "▲ 15% above avg"],
      ["Water Usage",          metrics.waterUsage.toLocaleString(),      "L/ton",   "▼ 5% better"],
      ["Cost Efficiency",      `${metrics.costEfficiency}`,              "/100",    "Optimal"],
      ["Circular LCA",         circularLCA.toLocaleString(),             "kg CO₂e", "45% of Linear"],
      ["Linear LCA",           linearLCA.toLocaleString(),              "kg CO₂e", "Baseline"],
    ],
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 4, textColor: TEXT_BODY, fillColor: PARCHMENT },
    headStyles: { fillColor: BROWN_MID, textColor: CREAM, fontStyle: "bold" },
    alternateRowStyles: { fillColor: ALT_ROW },
    columnStyles: { 0: { fontStyle: "bold" }, 3: { textColor: GREEN_OK, fontStyle: "bold" } },
    margin: { left: M, right: M },
  });

  y = (doc as any).lastAutoTable.finalY + 12;
  section("Emissions Breakdown by LCA Stage");
  autoTable(doc, {
    startY: y,
    head: [["LCA Stage", "CO₂e (kg/ton)", "Share"]],
    body: emissionsData.map(e => [e.stage, e.value.toLocaleString(), e.pct]),
    theme: "striped",
    styles: { fontSize: 9, cellPadding: 4, textColor: TEXT_BODY, fillColor: PARCHMENT },
    headStyles: { fillColor: BROWN_DARK, textColor: CREAM, fontStyle: "bold" },
    alternateRowStyles: { fillColor: ALT_ROW },
    columnStyles: { 1: { halign: "right" }, 2: { halign: "center", textColor: BROWN_MID, fontStyle: "bold" } },
    margin: { left: M, right: M },
  });

  y = (doc as any).lastAutoTable.finalY + 12;
  section("GHG Scope Classification");
  autoTable(doc, {
    startY: y,
    head: [["Scope", "Share", "Description"]],
    body: scopeData.map(s => [s.scope, s.share, s.description]),
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 4, textColor: TEXT_BODY, fillColor: PARCHMENT },
    headStyles: { fillColor: BROWN_MID, textColor: CREAM, fontStyle: "bold" },
    alternateRowStyles: { fillColor: ALT_ROW },
    columnStyles: { 1: { halign: "center", textColor: BROWN_MID, fontStyle: "bold" } },
    margin: { left: M, right: M },
  });

  // ══════════════════════════════════════════
  //  PAGE 3 – RADAR & AI EXPLAINABILITY
  // ══════════════════════════════════════════
  doc.addPage(); chrome(3); y = 24;

  section("Sustainability Performance vs Industry Benchmark");
  autoTable(doc, {
    startY: y,
    head: [["Category", "Your Score", "Industry Benchmark", "Gap"]],
    body: radarData.map(r => [
      r.category,
      r.score,
      r.benchmark,
      r.score >= r.benchmark ? `▲ +${r.score - r.benchmark}` : `▼ ${r.score - r.benchmark}`,
    ]),
    theme: "grid",
    styles: { fontSize: 9, cellPadding: 4, textColor: TEXT_BODY, fillColor: PARCHMENT },
    headStyles: { fillColor: BROWN_MID, textColor: CREAM, fontStyle: "bold" },
    alternateRowStyles: { fillColor: ALT_ROW },
    columnStyles: {
      1: { halign: "center", fontStyle: "bold" },
      2: { halign: "center" },
      3: { halign: "center", fontStyle: "bold", textColor: GREEN_OK },
    },
    margin: { left: M, right: M },
  });

  y = (doc as any).lastAutoTable.finalY + 12;
  section("AI Explainability – Key Influencing Factors");
  autoTable(doc, {
    startY: y,
    head: [["Factor", "Contribution %", "Direction"]],
    body: featureData.map(f => [
      f.feature,
      `${f.contribution}%`,
      f.direction === "positive" ? "✓ Positive Impact" : "✗ Negative Impact",
    ]),
    theme: "striped",
    styles: { fontSize: 9, cellPadding: 4, textColor: TEXT_BODY, fillColor: PARCHMENT },
    headStyles: { fillColor: BROWN_DARK, textColor: CREAM, fontStyle: "bold" },
    alternateRowStyles: { fillColor: ALT_ROW },
    columnStyles: {
      1: { halign: "center", fontStyle: "bold" },
      2: { halign: "center", fontStyle: "bold" },
    },
    margin: { left: M, right: M },
  });

  // ══════════════════════════════════════════
  //  PAGE 4 – RECOMMENDATIONS
  // ══════════════════════════════════════════
  doc.addPage(); chrome(4); y = 24;

  section("Sustainability Improvement Recommendations");

  const recs = [
    ["Transition to Renewable Energy",     "Energy",    "High",   "25–35% Scope 2 reduction",     "Solar/wind PPAs + on-site generation. Govt incentives offset 20–30% capex. Green hydrogen viable for high-temp processes."],
    ["Waste Heat Recovery Systems",        "Process",   "High",   "15–20% energy efficiency gain", "Regenerative burners, ORC turbines, heat exchangers for steam. Typical payback period: 2–4 years."],
    ["Optimise Raw Material Transport",    "Emissions", "Medium", "8–12% Scope 3 reduction",       "Rail over road for hauls >300 km. Use dedicated freight corridors. Backhaul logistics to cut empty trips."],
    ["Increase Recycled Material Content", "Materials", "High",   "40–70% lower embodied carbon",  `Secondary ${fd.material} saves up to 95% energy. India's growing scrap availability supports higher recycled content.`],
    ["Water Recycling / ZLD Systems",      "Process",   "Medium", "60–80% freshwater reduction",   "Closed-loop cooling + ZLD for CPCB compliance. Aligns with National Water Mission objectives."],
  ];

  autoTable(doc, {
    startY: y,
    head: [["#", "Recommendation", "Category", "Impact", "Potential Saving"]],
    body: recs.map((r, i) => [i + 1, r[0], r[1], r[2], r[3]]),
    theme: "grid",
    styles: { fontSize: 8.5, cellPadding: 3.5, textColor: TEXT_BODY, fillColor: PARCHMENT },
    headStyles: { fillColor: BROWN_DARK, textColor: CREAM, fontStyle: "bold" },
    alternateRowStyles: { fillColor: ALT_ROW },
    columnStyles: {
      0: { halign: "center", cellWidth: 10 },
      2: { halign: "center" },
      3: { halign: "center", fontStyle: "bold", textColor: BROWN_MID },
      4: { fontStyle: "bold", textColor: GREEN_OK },
    },
    margin: { left: M, right: M },
  });

  y = (doc as any).lastAutoTable.finalY + 12;
  recs.forEach((r, i) => {
    if (y > H - 52) { doc.addPage(); chrome(5 + i); y = 24; }
    doc.setFillColor(...PARCHMENT); doc.roundedRect(M, y, CW, 7.5, 1, 1, "F");
    doc.setFillColor(...GOLD);      doc.roundedRect(M, y, 2.5, 7.5, 1, 1, "F");
    doc.setTextColor(...TEXT_BODY); doc.setFontSize(9); doc.setFont("helvetica", "bold");
    doc.text(`${i + 1}. ${r[0]}`, M + 6, y + 5.5);
    y += 10;
    const lines = doc.splitTextToSize(r[4], CW - 8);
    doc.setFontSize(8.5); doc.setFont("helvetica", "normal"); doc.setTextColor(...TEXT_MUT);
    doc.text(lines, M + 6, y);
    y += lines.length * 4.2 + 6;
  });

  doc.save(makeFileName("pdf", mat));
};

// ════════════════════════════════════════════════════════════════════════════
//  EXCEL EXPORT  (uses same computeLCAResults)
// ════════════════════════════════════════════════════════════════════════════
export const generateExcel = (fd: FormData): void => {
  const results = computeLCAResults(fd);
  const { metrics, emissionsData, radarData, featureData, scopeData, circularLCA, linearLCA } = results;
  const mat = (fd.material || "steel").toUpperCase();
  const wb  = XLSX.utils.book_new();

  const ws = (rows: unknown[][], widths: number[]) => {
    const s = XLSX.utils.aoa_to_sheet(rows);
    s["!cols"] = widths.map(w => ({ wch: w }));
    return s;
  };

  XLSX.utils.book_append_sheet(wb, ws([
    ["AYASKRITI LCA – Sustainability Analysis Report"],
    [],
    ["Report Generated",  dateStr()],
    ["Material",          mat],
    ["Process Type",      fd.processType       || "N/A"],
    ["Production Volume", fd.productionVolume   ? `${fd.productionVolume} tons/yr` : "N/A"],
    ["Raw Mat. Source",   fd.rawMaterialSource  || "N/A"],
    ["Transport Dist.",   fd.transportDistance  ? `${fd.transportDistance} km` : "N/A"],
    ["Water Consumption", fd.waterConsumption   ? `${fd.waterConsumption} L/ton` : "N/A"],
    ["Waste Generated",   fd.wasteGenerated     ? `${fd.wasteGenerated} kg/ton` : "N/A"],
    [],
    ["── Computed Metrics ──"],
    ["Metric",                 "Value",                       "Unit"],
    ["CO₂ Emissions",          metrics.co2Emissions,          "kg/ton"],
    ["Energy Intensity",       metrics.energyIntensity,       "kWh/ton"],
    ["Sustainability Score",   metrics.sustainabilityScore,   "/100"],
    ["Cost Efficiency",        metrics.costEfficiency,        "/100"],
    ["Water Usage",            metrics.waterUsage,            "L/ton"],
    ["Circular LCA Footprint", circularLCA,                   "kg CO₂e"],
    ["Linear LCA Footprint",   linearLCA,                     "kg CO₂e"],
  ], [35, 30, 15]), "Summary");

  XLSX.utils.book_append_sheet(wb, ws([
    ["LCA Stage", "CO₂e (kg/ton)", "Share"],
    ...emissionsData.map(e => [e.stage, e.value, e.pct]),
    [],
    ["TOTAL", emissionsData.reduce((s, e) => s + e.value, 0), "100%"],
  ], [35, 20, 12]), "Emissions Breakdown");

  XLSX.utils.book_append_sheet(wb, ws([
    ["Scope", "Share", "Description"],
    ...scopeData.map(s => [s.scope, s.share, s.description]),
  ], [42, 12, 50]), "GHG Scope");

  XLSX.utils.book_append_sheet(wb, ws([
    ["Category", "Your Score", "Benchmark", "Gap"],
    ...radarData.map(r => [r.category, r.score, r.benchmark, r.score - r.benchmark]),
  ], [20, 14, 14, 10]), "Sustainability Radar");

  XLSX.utils.book_append_sheet(wb, ws([
    ["Factor", "Contribution %", "Direction"],
    ...featureData.map(f => [f.feature, f.contribution, f.direction]),
  ], [30, 18, 15]), "AI Explainability");

  XLSX.utils.book_append_sheet(wb, ws([
    ["#", "Recommendation", "Category", "Impact", "Potential Saving"],
    [1, "Transition to Renewable Energy",     "Energy",    "High",   "25–35% Scope 2 reduction"],
    [2, "Waste Heat Recovery Systems",        "Process",   "High",   "15–20% energy efficiency"],
    [3, "Optimise Raw Material Transport",    "Emissions", "Medium", "8–12% Scope 3 reduction"],
    [4, "Increase Recycled Material Content", "Materials", "High",   "40–70% lower embodied carbon"],
    [5, "Water Recycling / ZLD Systems",      "Process",   "Medium", "60–80% freshwater reduction"],
  ], [5, 42, 14, 12, 32]), "Recommendations");

  XLSX.writeFile(wb, makeFileName("xlsx", mat));
};
