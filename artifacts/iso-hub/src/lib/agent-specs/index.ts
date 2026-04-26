export * from "./types";
export * from "./sales";
export * from "./retail";
export * from "./manufacturing";
export * from "./finance";
export * from "./healthcare";
export * from "./it";
export * from "./education";
export * from "./customer-service";
export * from "./personal-development";
export * from "./engineering";
export * from "./hr";
export * from "./administrative";
export * from "./marketing";
export * from "./industries";

import { AgentSpec } from "./types";
import { SALES_ORCHESTRATOR, SALES_SPECIALISTS } from "./sales";
import { RETAIL_ORCHESTRATOR, RETAIL_SPECIALISTS } from "./retail";
import { MANUFACTURING_ORCHESTRATOR, MANUFACTURING_SPECIALISTS } from "./manufacturing";
import { FINANCE_ORCHESTRATOR, FINANCE_SPECIALISTS } from "./finance";
import { HEALTHCARE_ORCHESTRATOR, HEALTHCARE_SPECIALISTS } from "./healthcare";
import { IT_ORCHESTRATOR, IT_SPECIALISTS } from "./it";
import { EDUCATION_ORCHESTRATOR, EDUCATION_SPECIALISTS } from "./education";
import { CUSTOMER_SERVICE_ORCHESTRATOR, CUSTOMER_SERVICE_SPECIALISTS } from "./customer-service";
import { PERSONAL_DEVELOPMENT_ORCHESTRATOR, PERSONAL_DEVELOPMENT_SPECIALISTS } from "./personal-development";
import { ENGINEERING_ORCHESTRATOR, ENGINEERING_SPECIALISTS } from "./engineering";
import { HR_ORCHESTRATOR as HR_ORCH_NEW, HR_SPECIALISTS as HR_SPECS_NEW } from "./hr";
import { ADMIN_ORCHESTRATOR as ADMIN_ORCH_NEW, ADMIN_SPECIALISTS as ADMIN_SPECS_NEW } from "./administrative";
import { MARKETING_ORCHESTRATOR as MKT_ORCH_NEW, MARKETING_SPECIALISTS as MKT_SPECS_NEW } from "./marketing";

export const ALL_ORCHESTRATORS: AgentSpec[] = [
  SALES_ORCHESTRATOR,
  RETAIL_ORCHESTRATOR,
  MANUFACTURING_ORCHESTRATOR,
  FINANCE_ORCHESTRATOR,
  HEALTHCARE_ORCHESTRATOR,
  IT_ORCHESTRATOR,
  EDUCATION_ORCHESTRATOR,
  CUSTOMER_SERVICE_ORCHESTRATOR,
  PERSONAL_DEVELOPMENT_ORCHESTRATOR,
  ENGINEERING_ORCHESTRATOR,
  HR_ORCH_NEW,
  ADMIN_ORCH_NEW,
  MKT_ORCH_NEW
];

export const INDUSTRY_LIST = [
  { id: "sales", name: "Sales", nameId: "Penjualan", icon: "💰" },
  { id: "finance", name: "Finance", nameId: "Keuangan", icon: "💹" },
  { id: "customer_service", name: "Customer Service", nameId: "Layanan Pelanggan", icon: "🎧" },
  { id: "personal_development", name: "Personal Development", nameId: "Pengembangan Diri", icon: "🌱" },
  { id: "engineering", name: "Engineering", nameId: "Teknik", icon: "🔧" },
  { id: "retail", name: "Retail", nameId: "Retail", icon: "🛒" },
  { id: "manufacturing", name: "Manufacturing", nameId: "Manufaktur", icon: "🏭" },
  { id: "healthcare", name: "Healthcare", nameId: "Kesehatan", icon: "🏥" },
  { id: "it", name: "IT/Tech", nameId: "Teknologi", icon: "💻" },
  { id: "education", name: "Education", nameId: "Pendidikan", icon: "🎓" },
  { id: "real_estate", name: "Real Estate", nameId: "Properti", icon: "🏠" },
  { id: "media", name: "Media", nameId: "Media", icon: "📺" },
  { id: "legal", name: "Legal", nameId: "Hukum", icon: "⚖️" },
  { id: "hr", name: "Human Resources", nameId: "HR", icon: "👥" },
  { id: "marketing", name: "Marketing", nameId: "Pemasaran", icon: "📣" },
  { id: "executive", name: "Executive", nameId: "Eksekutif", icon: "👔" },
  { id: "medical", name: "Medical", nameId: "Medis", icon: "🩺" },
  { id: "entrepreneur", name: "Entrepreneur", nameId: "Wirausaha", icon: "🚀" },
  { id: "creative", name: "Creative", nameId: "Kreatif", icon: "🎨" },
  { id: "religious", name: "Religious", nameId: "Keagaan", icon: "🕊️" },
  { id: "administrative", name: "Administrative", nameId: "Administrasi", icon: "📋" },
  { id: "construction", name: "Construction", nameId: "Konstruksi", icon: "🏗️" },
  { id: "telecommunications", name: "Telecommunications", nameId: "Telekomunikasi", icon: "📡" }
];

export function getOrchestratorByIndustry(industry: string): AgentSpec | undefined {
  switch(industry) {
    case "sales": return SALES_ORCHESTRATOR;
    case "finance": return FINANCE_ORCHESTRATOR;
    case "customer_service": return CUSTOMER_SERVICE_ORCHESTRATOR;
    case "personal_development": return PERSONAL_DEVELOPMENT_ORCHESTRATOR;
    case "engineering": return ENGINEERING_ORCHESTRATOR;
    case "retail": return RETAIL_ORCHESTRATOR;
    case "manufacturing": return MANUFACTURING_ORCHESTRATOR;
    case "healthcare": return HEALTHCARE_ORCHESTRATOR;
    case "it": return IT_ORCHESTRATOR;
    case "education": return EDUCATION_ORCHESTRATOR;
    case "hr": return HR_ORCH_NEW;
    case "administrative": return ADMIN_ORCH_NEW;
    case "marketing": return MKT_ORCH_NEW;
    default: return undefined;
  }
}

export function getSpecialistsByIndustry(industry: string): AgentSpec[] {
  switch(industry) {
    case "sales": return SALES_SPECIALISTS;
    case "finance": return FINANCE_SPECIALISTS;
    case "customer_service": return CUSTOMER_SERVICE_SPECIALISTS;
    case "personal_development": return PERSONAL_DEVELOPMENT_SPECIALISTS;
    case "engineering": return ENGINEERING_SPECIALISTS;
    case "retail": return RETAIL_SPECIALISTS;
    case "manufacturing": return MANUFACTURING_SPECIALISTS;
    case "healthcare": return HEALTHCARE_SPECIALISTS;
    case "it": return IT_SPECIALISTS;
    case "education": return EDUCATION_SPECIALISTS;
    case "hr": return HR_SPECS_NEW;
    case "administrative": return ADMIN_SPECS_NEW;
    case "marketing": return MKT_SPECS_NEW;
    default: return [];
  }
}

export function getAllAgentsByIndustry(industry: string): AgentSpec[] {
  const orchestrator = getOrchestratorByIndustry(industry);
  const specialists = getSpecialistsByIndustry(industry);
  return orchestrator ? [orchestrator, ...specialists] : specialists;
}
