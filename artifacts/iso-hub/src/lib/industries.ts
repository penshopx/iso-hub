export type IndustryType = 
  | "manufacturing"
  | "automotive"
  | "food"
  | "mining"
  | "energy"
  | "construction"
  | "healthcare"
  | "education"
  | "it"
  | "finance"
  | "government"
  | "retail"
  | "logistics"
  | "oil_gas"
  | "pharmaceutical"
  | "chemical"
  | "telecommunications"
  | "agriculture";

export interface Industry {
  id: IndustryType;
  name: string;
  nameId: string;
  description: string;
  icon: string;
  color: string;
  isoStandards: IndustryStandard[];
  regulations: string[];
  keyProcesses: string[];
  certifications: string[];
}

export interface IndustryStandard {
  isoCode: string;
  name: string;
  nameId: string;
  mandatory: boolean;
  priority: "critical" | "high" | "medium" | "low";
  description: string;
}

export interface IndustryProcess {
  id: string;
  name: string;
  nameId: string;
  category: string;
  description: string;
  isoClauses: string[];
  deliverables: string[];
}

export const INDUSTRIES: Industry[] = [
  {
    id: "manufacturing",
    name: "Manufacturing",
    nameId: "Manufaktur",
    description: "Manufacturing industry including metal fabrication, machinery, electronics",
    icon: "🏭",
    color: "blue",
    isoStandards: [
      { isoCode: "ISO 9001", name: "Quality Management", nameId: "Manajemen Mutu", mandatory: true, priority: "critical", description: "Quality Management System" },
      { isoCode: "ISO 14001", name: "Environmental Management", nameId: "Manajemen Lingkungan", mandatory: true, priority: "critical", description: "Environmental Management System" },
      { isoCode: "ISO 45001", name: "Occupational Health Safety", nameId: "K3", mandatory: true, priority: "critical", description: "Occupational Health and Safety" },
      { isoCode: "ISO 50001", name: "Energy Management", nameId: "Manajemen Energi", mandatory: false, priority: "high", description: "Energy Management System" },
    ],
    regulations: ["UU 13/2003", "PP 50/2012", "Permenaker 05/2018"],
    keyProcesses: ["Production Planning", "Quality Control", "Equipment Maintenance", "Supply Chain"],
    certifications: ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 50001"],
  },
  {
    id: "automotive",
    name: "Automotive",
    nameId: "Otomotif",
    description: "Automotive manufacturing and supply chain",
    icon: "🚗",
    color: "red",
    isoStandards: [
      { isoCode: "IATF 16949", name: "Automotive Quality", nameId: "Mutu Otomotif", mandatory: true, priority: "critical", description: "Automotive Quality Management System" },
      { isoCode: "ISO 9001", name: "Quality Management", nameId: "Manajemen Mutu", mandatory: true, priority: "critical", description: "Foundation for automotive QMS" },
      { isoCode: "ISO 14001", name: "Environmental Management", nameId: "Manajemen Lingkungan", mandatory: true, priority: "critical", description: "Environmental Management" },
      { isoCode: "ISO 45001", name: "Occupational Health Safety", nameId: "K3", mandatory: true, priority: "critical", description: "OHS Management" },
    ],
    regulations: ["IATF 16949", "ISO 26262", "ISO/TS 16949"],
    keyProcesses: ["Production Planning", "APQP", "PPAP", "FMEA", "SPC", "MSA"],
    certifications: ["IATF 16949", "ISO 9001", "ISO 14001", "ISO 45001"],
  },
  {
    id: "food",
    name: "Food & Beverage",
    nameId: "Pangan & Minuman",
    description: "Food processing, manufacturing, and packaging",
    icon: "🍔",
    color: "green",
    isoStandards: [
      { isoCode: "ISO 22000", name: "Food Safety Management", nameId: "Keamanan Pangan", mandatory: true, priority: "critical", description: "Food Safety Management System" },
      { isoCode: "ISO 9001", name: "Quality Management", nameId: "Manajemen Mutu", mandatory: false, priority: "high", description: "Quality Management" },
      { isoCode: "ISO 14001", name: "Environmental Management", nameId: "Manajemen Lingkungan", mandatory: true, priority: "high", description: "Environmental Management" },
      { isoCode: "FSSC 22000", name: "Food Safety System", nameId: "Sistem Keamanan Pangan", mandatory: true, priority: "critical", description: "FSMS + PRP" },
      { isoCode: "HACCP", name: "Hazard Analysis", nameId: "Analisis Bahaya", mandatory: true, priority: "critical", description: "Hazard Analysis Critical Control Points" },
    ],
    regulations: ["BPOM", "MUI Halal", "USDA", "EU Regulations"],
    keyProcesses: ["HACCP Plan", "Prerequisite Programs", "Traceability", "Allergen Management"],
    certifications: ["ISO 22000", "FSSC 22000", "HACCP", "HALAL", "BRC", "IFS"],
  },
  {
    id: "mining",
    name: "Mining & Metals",
    nameId: "Pertambangan & Logam",
    description: "Mining, quarrying, and metal processing",
    icon: "⛏️",
    color: "amber",
    isoStandards: [
      { isoCode: "ISO 19443", name: "Nuclear Quality", nameId: "Mutu Nuklir", mandatory: true, priority: "critical", description: "Quality Management for Nuclear" },
      { isoCode: "ISO 9001", name: "Quality Management", nameId: "Manajemen Mutu", mandatory: true, priority: "critical", description: "QMS for mining" },
      { isoCode: "ISO 14001", name: "Environmental Management", nameId: "Manajemen Lingkungan", mandatory: true, priority: "critical", description: "Environmental Management" },
      { isoCode: "ISO 45001", name: "Occupational Health Safety", nameId: "K3", mandatory: true, priority: "critical", description: "OHS for mining" },
      { isoCode: "ISO 50001", name: "Energy Management", nameId: "Manajemen Energi", mandatory: false, priority: "high", description: "Energy Management" },
    ],
    regulations: ["UU 4/2009", "Permen ESDM", "ISO 19443"],
    keyProcesses: ["Exploration", "Extraction", "Processing", "Rehabilitation"],
    certifications: ["ISO 19443", "ISO 9001", "ISO 14001", "ISO 45001"],
  },
  {
    id: "energy",
    name: "Energy & Utilities",
    nameId: "Energi & Utilitas",
    description: "Power generation, distribution, and utilities",
    icon: "⚡",
    color: "yellow",
    isoStandards: [
      { isoCode: "ISO 50001", name: "Energy Management", nameId: "Manajemen Energi", mandatory: true, priority: "critical", description: "Energy Management System" },
      { isoCode: "ISO 9001", name: "Quality Management", nameId: "Manajemen Mutu", mandatory: true, priority: "critical", description: "QMS for energy" },
      { isoCode: "ISO 14001", name: "Environmental Management", nameId: "Manajemen Lingkungan", mandatory: true, priority: "critical", description: "Environmental Management" },
      { isoCode: "ISO 45001", name: "Occupational Health Safety", nameId: "K3", mandatory: true, priority: "critical", description: "OHS for energy" },
      { isoCode: "ISO 27001", name: "Information Security", nameId: "Keamanan Informasi", mandatory: false, priority: "high", description: "Information Security" },
    ],
    regulations: ["UU 30/2007", "Permen ESDM", "KEPI"],
    keyProcesses: ["Power Generation", "Distribution", "Grid Management", "Customer Service"],
    certifications: ["ISO 50001", "ISO 9001", "ISO 14001", "ISO 45001"],
  },
  {
    id: "construction",
    name: "Construction & Engineering",
    nameId: "Konstruksi & Engineering",
    description: "Construction, civil engineering, building",
    icon: "🏗️",
    color: "orange",
    isoStandards: [
      { isoCode: "ISO 9001", name: "Quality Management", nameId: "Manajemen Mutu", mandatory: true, priority: "critical", description: "QMS for construction" },
      { isoCode: "ISO 14001", name: "Environmental Management", nameId: "Manajemen Lingkungan", mandatory: true, priority: "high", description: "Environmental Management" },
      { isoCode: "ISO 45001", name: "Occupational Health Safety", nameId: "K3", mandatory: true, priority: "critical", description: "OHS for construction" },
      { isoCode: "ISO 39001", name: "Road Safety", nameId: "Keselamatan Jalan", mandatory: false, priority: "high", description: "Road Traffic Safety" },
    ],
    regulations: ["UU 2/2017", "Permen PU", "ISO 39001"],
    keyProcesses: ["Project Planning", "Contract Management", "Quality Assurance", "Safety Management"],
    certifications: ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 39001"],
  },
  {
    id: "healthcare",
    name: "Healthcare & Medical",
    nameId: "Kesehatan & Medis",
    description: "Hospitals, clinics, medical devices",
    icon: "🏥",
    color: "teal",
    isoStandards: [
      { isoCode: "ISO 9001", name: "Quality Management", nameId: "Manajemen Mutu", mandatory: true, priority: "critical", description: "QMS for healthcare" },
      { isoCode: "ISO 14001", name: "Environmental Management", nameId: "Manajemen Lingkungan", mandatory: true, priority: "high", description: "Environmental Management" },
      { isoCode: "ISO 45001", name: "Occupational Health Safety", nameId: "K3", mandatory: true, priority: "critical", description: "OHS for healthcare" },
      { isoCode: "ISO 13485", name: "Medical Devices QMS", nameId: "Alat Kesehatan", mandatory: true, priority: "critical", description: "Medical Devices Quality" },
      { isoCode: "ISO 27001", name: "Information Security", nameId: "Keamanan Informasi", mandatory: false, priority: "high", description: "Patient data security" },
    ],
    regulations: ["UU 36/2009", "BPOM", "KEMENKES"],
    keyProcesses: ["Patient Care", "Clinical Procedures", "Medical Records", "Infection Control"],
    certifications: ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 13485"],
  },
  {
    id: "it",
    name: "Information Technology",
    nameId: "Teknologi Informasi",
    description: "Software development, IT services, data centers",
    icon: "💻",
    color: "indigo",
    isoStandards: [
      { isoCode: "ISO 27001", name: "Information Security", nameId: "Keamanan Informasi", mandatory: true, priority: "critical", description: "Information Security Management" },
      { isoCode: "ISO 9001", name: "Quality Management", nameId: "Manajemen Mutu", mandatory: false, priority: "high", description: "QMS for IT" },
      { isoCode: "ISO 20000", name: "IT Service Management", nameId: "Layanan IT", mandatory: false, priority: "high", description: "IT Service Management" },
      { isoCode: "ISO 22301", name: "Business Continuity", nameId: "Kontinuitas Bisnis", mandatory: false, priority: "high", description: "Business Continuity" },
      { isoCode: "ISO 14001", name: "Environmental Management", nameId: "Manajemen Lingkungan", mandatory: false, priority: "medium", description: "Environmental Management" },
    ],
    regulations: ["UU 11/2008", "Perpres", "NIST"],
    keyProcesses: ["Software Development", "Service Desk", "Data Management", "Cybersecurity"],
    certifications: ["ISO 27001", "ISO 9001", "ISO 20000", "ISO 22301"],
  },
  {
    id: "finance",
    name: "Finance & Banking",
    nameId: "Keuangan & Perbankan",
    description: "Banking, insurance, financial services",
    icon: "🏦",
    color: "emerald",
    isoStandards: [
      { isoCode: "ISO 27001", name: "Information Security", nameId: "Keamanan Informasi", mandatory: true, priority: "critical", description: "Information Security" },
      { isoCode: "ISO 9001", name: "Quality Management", nameId: "Manajemen Mutu", mandatory: false, priority: "high", description: "QMS for finance" },
      { isoCode: "ISO 37001", name: "Anti-Bribery", nameId: "Anti Penyuapan", mandatory: false, priority: "high", description: "Anti-Bribery Management" },
      { isoCode: "ISO 22301", name: "Business Continuity", nameId: "Kontinuitas Bisnis", mandatory: true, priority: "critical", description: "Business Continuity" },
    ],
    regulations: ["UU 10/1998", "OJK", "BI"],
    keyProcesses: ["Risk Management", "Compliance", "Customer Service", "Fraud Prevention"],
    certifications: ["ISO 27001", "ISO 37001", "ISO 22301", "ISO 9001"],
  },
  {
    id: "government",
    name: "Government & Public Sector",
    nameId: "Pemerintah & Sektor Publik",
    description: "Government agencies, public services",
    icon: "🏛️",
    color: "slate",
    isoStandards: [
      { isoCode: "ISO 9001", name: "Quality Management", nameId: "Manajemen Mutu", mandatory: true, priority: "critical", description: "QMS for government" },
      { isoCode: "ISO 37001", name: "Anti-Bribery", nameId: "Anti Penyuapan", mandatory: true, priority: "critical", description: "Anti-Bribery" },
      { isoCode: "ISO 27001", name: "Information Security", nameId: "Keamanan Informasi", mandatory: true, priority: "critical", description: "Information Security" },
      { isoCode: "ISO 45001", name: "Occupational Health Safety", nameId: "K3", mandatory: true, priority: "high", description: "OHS" },
    ],
    regulations: ["UU 28/1999", "UU 20/2001", "Permen PAN RB"],
    keyProcesses: ["Public Service", "Policy Implementation", "Budget Management", "E-Government"],
    certifications: ["ISO 9001", "ISO 37001", "ISO 27001", "ISO 45001"],
  },
  {
    id: "logistics",
    name: "Logistics & Transportation",
    nameId: "Logistik & Transportasi",
    description: "Freight, warehousing, transportation",
    icon: "🚚",
    color: "purple",
    isoStandards: [
      { isoCode: "ISO 28000", name: "Supply Chain Security", nameId: "Keamanan Rantai Pasok", mandatory: false, priority: "high", description: "Supply Chain Security" },
      { isoCode: "ISO 9001", name: "Quality Management", nameId: "Manajemen Mutu", mandatory: false, priority: "high", description: "QMS for logistics" },
      { isoCode: "ISO 14001", name: "Environmental Management", nameId: "Manajemen Lingkungan", mandatory: false, priority: "high", description: "Environmental Management" },
      { isoCode: "ISO 45001", name: "Occupational Health Safety", nameId: "K3", mandatory: true, priority: "critical", description: "OHS for logistics" },
    ],
    regulations: ["UU 22/2009", "Permenhub"],
    keyProcesses: ["Freight Management", "Warehouse Operations", "Fleet Management", "Customs"],
    certifications: ["ISO 28000", "ISO 9001", "ISO 14001", "ISO 45001"],
  },
  {
    id: "oil_gas",
    name: "Oil & Gas",
    nameId: "Migas",
    description: "Oil exploration, refining, distribution",
    icon: "🛢️",
    color: "rose",
    isoStandards: [
      { isoCode: "ISO 9001", name: "Quality Management", nameId: "Manajemen Mutu", mandatory: true, priority: "critical", description: "QMS for oil & gas" },
      { isoCode: "ISO 14001", name: "Environmental Management", nameId: "Manajemen Lingkungan", mandatory: true, priority: "critical", description: "Environmental Management" },
      { isoCode: "ISO 45001", name: "Occupational Health Safety", nameId: "K3", mandatory: true, priority: "critical", description: "OHS for oil & gas" },
      { isoCode: "ISO 50001", name: "Energy Management", nameId: "Manajemen Energi", mandatory: false, priority: "high", description: "Energy Management" },
      { isoCode: "ISO 29001", name: "Oil & Gas Quality", nameId: "Mutu Migas", mandatory: false, priority: "high", description: "Petroleum Quality" },
    ],
    regulations: ["UU 22/2001", "SKK Migas", "ISO 29001"],
    keyProcesses: ["Exploration", "Production", "Refining", "Distribution"],
    certifications: ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 29001"],
  },
  {
    id: "pharmaceutical",
    name: "Pharmaceutical",
    nameId: "Farmasi",
    description: "Pharmaceutical manufacturing and distribution",
    icon: "💊",
    color: "cyan",
    isoStandards: [
      { isoCode: "ISO 9001", name: "Quality Management", nameId: "Manajemen Mutu", mandatory: true, priority: "critical", description: "QMS for pharma" },
      { isoCode: "ISO 14001", name: "Environmental Management", nameId: "Manajemen Lingkungan", mandatory: true, priority: "high", description: "Environmental Management" },
      { isoCode: "ISO 45001", name: "Occupational Health Safety", nameId: "K3", mandatory: true, priority: "critical", description: "OHS for pharma" },
      { isoCode: "ISO 27001", name: "Information Security", nameId: "Keamanan Informasi", mandatory: false, priority: "high", description: "Data Security" },
      { isoCode: "GMP", name: "Good Manufacturing Practice", nameId: "CPOB", mandatory: true, priority: "critical", description: "Good Manufacturing Practice" },
    ],
    regulations: ["BPOM", "FDA", "EU GMP", "WHO GMP"],
    keyProcesses: ["R&D", "Manufacturing", "QC", "Distribution"],
    certifications: ["ISO 9001", "ISO 14001", "ISO 45001", "GMP"],
  },
  {
    id: "chemical",
    name: "Chemical & Petrochemical",
    nameId: "Kimia & Petrokimia",
    description: "Chemical manufacturing and processing",
    icon: "🧪",
    color: "violet",
    isoStandards: [
      { isoCode: "ISO 9001", name: "Quality Management", nameId: "Manajemen Mutu", mandatory: true, priority: "critical", description: "QMS for chemical" },
      { isoCode: "ISO 14001", name: "Environmental Management", nameId: "Manajemen Lingkungan", mandatory: true, priority: "critical", description: "Environmental Management" },
      { isoCode: "ISO 45001", name: "Occupational Health Safety", nameId: "K3", mandatory: true, priority: "critical", description: "OHS for chemical" },
      { isoCode: "ISO 50001", name: "Energy Management", nameId: "Manajemen Energi", mandatory: false, priority: "high", description: "Energy Management" },
    ],
    regulations: ["UU 5/1984", "Permenperin", "REACH"],
    keyProcesses: ["Chemical Handling", "Process Safety", "Emergency Response", "Waste Management"],
    certifications: ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 50001"],
  },
  {
    id: "agriculture",
    name: "Agriculture & Plantation",
    nameId: "Pertanian & Perkebunan",
    description: "Farming, plantation, agribusiness",
    icon: "🌾",
    color: "lime",
    isoStandards: [
      { isoCode: "ISO 9001", name: "Quality Management", nameId: "Manajemen Mutu", mandatory: false, priority: "high", description: "QMS for agriculture" },
      { isoCode: "ISO 14001", name: "Environmental Management", nameId: "Manajemen Lingkungan", mandatory: true, priority: "critical", description: "Environmental Management" },
      { isoCode: "ISO 45001", name: "Occupational Health Safety", nameId: "K3", mandatory: true, priority: "high", description: "OHS" },
      { isoCode: "ISO 22000", name: "Food Safety", nameId: "Keamanan Pangan", mandatory: true, priority: "critical", description: "Food Safety" },
    ],
    regulations: ["UU 12/1992", "UU 19/2013", "Permentan"],
    keyProcesses: ["Crop Production", "Harvesting", "Post-Harvest", "Processing"],
    certifications: ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 22000"],
  },
];

export function getIndustryById(id: IndustryType): Industry | undefined {
  return INDUSTRIES.find(industry => industry.id === id);
}

export function getMandatoryStandards(industryId: IndustryType): IndustryStandard[] {
  const industry = getIndustryById(industryId);
  return industry?.isoStandards.filter(s => s.mandatory) || [];
}

export function getCriticalStandards(industryId: IndustryType): IndustryStandard[] {
  const industry = getIndustryById(industryId);
  return industry?.isoStandards.filter(s => s.priority === "critical") || [];
}

export function getIndustryColor(industryId: IndustryType): string {
  return INDUSTRIES.find(i => i.id === industryId)?.color || "gray";
}
