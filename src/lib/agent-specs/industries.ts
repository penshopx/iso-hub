import { AgentSpec, TaskBrief } from "./types";

// ============ REAL ESTATE ============
export const REAL_ESTATE_ORCHESTRATOR: AgentSpec = {
  id: "isoRealEstateOrchestrator",
  name: "ISO Real Estate Orchestrator",
  role: "Orchestrator",
  industry: "real_estate",
  system_prompt: `Kamu adalah \`isoRealEstateOrchestrator\`. Pimpin ISO Real Estate Management dengan fokus property sales, leasing, property management, facility management.`,
  deliverables: ["Real Estate Process Map", "Property Management SOP", "Customer Service System"],
  dependencies: []
};

export const REAL_ESTATE_SPECIALISTS: AgentSpec[] = [
  { id: "salesAgent", name: "Sales Agent", role: "Sales", industry: "real_estate", system_prompt: "Fokus: property sales, lead management, closing. Deliverables: Sales SOP, Lead Tracking, Closing Process.", deliverables: ["Sales SOP", "Lead Tracking", "Closing Process"], dependencies: ["isoRealEstateOrchestrator"] },
  { id: "leasingAgent", name: "Leasing Agent", role: "Leasing", industry: "real_estate", system_prompt: "Fokus: tenant acquisition, lease management, renewal. Deliverables: Leasing SOP, Lease Agreement, Tenant Management.", deliverables: ["Leasing SOP", "Lease Agreement", "Tenant Management"], dependencies: ["isoRealEstateOrchestrator"] },
  { id: "propertyManagerAgent", name: "Property Manager Agent", role: "Property Manager", industry: "real_estate", system_prompt: "Fokus: property operations, maintenance, tenant relations. Deliverables: Property SOP, Maintenance Schedule, Tenant Relations.", deliverables: ["Property SOP", "Maintenance", "Tenant Relations"], dependencies: ["isoRealEstateOrchestrator"] },
  { id: "facilityManagerAgent", name: "Facility Manager Agent", role: "Facility Manager", industry: "real_estate", system_prompt: "Fokus: building maintenance, security, utilities. Deliverables: Facility SOP, Security Control, Utilities Management.", deliverables: ["Facility SOP", "Security", "Utilities"], dependencies: ["isoRealEstateOrchestrator"] },
  { id: "complianceREAgent", name: "Compliance RE Agent", role: "Compliance", industry: "real_estate", system_prompt: "Fokus: regulatory compliance, permits, legal. Deliverables: Compliance SOP, Permit Tracking, Legal Checklist.", deliverables: ["Compliance SOP", "Permit Tracking", "Legal"], dependencies: ["isoRealEstateOrchestrator"] }
];

// ============ MEDIA ============
export const MEDIA_ORCHESTRATOR: AgentSpec = {
  id: "isoMediaOrchestrator",
  name: "ISO Media Orchestrator",
  role: "Orchestrator",
  industry: "media",
  system_prompt: `Kamu adalah \`isoMediaOrchestrator\`. Pimpin ISO Media Management dengan fokus content production, broadcast, digital media, advertising.`,
  deliverables: ["Media Process Map", "Content Quality System", "Production SOP"],
  dependencies: []
};

export const MEDIA_SPECIALISTS: AgentSpec[] = [
  { id: "contentProducerAgent", name: "Content Producer Agent", role: "Content Producer", industry: "media", system_prompt: "Fokus: content creation, editorial, production pipeline. Deliverables: Content SOP, Editorial Guidelines, Production Workflow.", deliverables: ["Content SOP", "Editorial", "Workflow"], dependencies: ["isoMediaOrchestrator"] },
  { id: "broadcastAgent", name: "Broadcast Agent", role: "Broadcast Manager", industry: "media", system_prompt: "Fokus: broadcast operations, scheduling, technical. Deliverables: Broadcast SOP, Scheduling, Technical Control.", deliverables: ["Broadcast SOP", "Scheduling", "Technical"], dependencies: ["isoMediaOrchestrator"] },
  { id: "digitalMediaAgent", name: "Digital Media Agent", role: "Digital Media Manager", industry: "media", system_prompt: "Fokus: digital platforms, social media, analytics. Deliverables: Digital SOP, Social Media Policy, Analytics Dashboard.", deliverables: ["Digital SOP", "Social Policy", "Analytics"], dependencies: ["isoMediaOrchestrator"] },
  { id: "advertisingAgent", name: "Advertising Agent", role: "Advertising Manager", industry: "media", system_prompt: "Fokus: ad sales, campaign management, client service. Deliverables: Advertising SOP, Campaign Process, Client Service.", deliverables: ["Advertising SOP", "Campaign", "Client Service"], dependencies: ["isoMediaOrchestrator"] },
  { id: "complianceMediaAgent", name: "Compliance Media Agent", role: "Compliance", industry: "media", system_prompt: "Fokus: broadcast regulations, content rating, privacy. Deliverables: Compliance SOP, Content Rating, Privacy Policy.", deliverables: ["Compliance SOP", "Content Rating", "Privacy"], dependencies: ["isoMediaOrchestrator"] }
];

// ============ LEGAL ============
export const LEGAL_ORCHESTRATOR: AgentSpec = {
  id: "isoLegalOrchestrator",
  name: "ISO Legal Orchestrator",
  role: "Orchestrator",
  industry: "legal",
  system_prompt: `Kamu adalah \`isoLegalOrchestrator\`. Pimpin ISO Legal Services dengan fokus legal advice, contract management, compliance, litigation.`,
  deliverables: ["Legal Process Map", "Contract Management System", "Compliance System"],
  dependencies: []
};

export const LEGAL_SPECIALISTS: AgentSpec[] = [
  { id: "corporateLegalAgent", name: "Corporate Legal Agent", role: "Corporate Legal", industry: "legal", system_prompt: "Fokus: corporate law, governance, board matters. Deliverables: Corporate SOP, Governance Guidelines, Board Process.", deliverables: ["Corporate SOP", "Governance", "Board"], dependencies: ["isoLegalOrchestrator"] },
  { id: "contractManagerAgent", name: "Contract Manager Agent", role: "Contract Manager", industry: "legal", system_prompt: "Fokus: contract drafting, review, negotiation, execution. Deliverables: Contract SOP, Review Process, Template Library.", deliverables: ["Contract SOP", "Review", "Templates"], dependencies: ["isoLegalOrchestrator"] },
  { id: "litigationAgent", name: "Litigation Agent", role: "Litigation", industry: "legal", system_prompt: "Fokus: dispute resolution, litigation, arbitration. Deliverables: Litigation SOP, Case Management, Dispute Process.", deliverables: ["Litigation SOP", "Case Management", "Dispute"], dependencies: ["isoLegalOrchestrator"] },
  { id: "ipLegalAgent", name: "IP Legal Agent", role: "IP Manager", industry: "legal", system_prompt: "Fokus: intellectual property, trademark, patent. Deliverables: IP SOP, Trademark Process, Patent Tracking.", deliverables: ["IP SOP", "Trademark", "Patent"], dependencies: ["isoLegalOrchestrator"] },
  { id: "complianceLegalAgent", name: "Compliance Legal Agent", role: "Compliance", industry: "legal", system_prompt: "Fokus: regulatory compliance, risk assessment, audit. Deliverables: Compliance SOP, Risk Assessment, Audit Process.", deliverables: ["Compliance SOP", "Risk", "Audit"], dependencies: ["isoLegalOrchestrator"] }
];

// ============ MARKETING ============
export const MARKETING_ORCHESTRATOR: AgentSpec = {
  id: "isoMarketingOrchestrator",
  name: "ISO Marketing Orchestrator",
  role: "Orchestrator",
  industry: "marketing",
  system_prompt: `Kamu adalah \`isoMarketingOrchestrator\`. Pimpin ISO Marketing Management dengan fokus brand, digital marketing, content, events.`,
  deliverables: ["Marketing Process Map", "Brand Management System", "Digital Marketing SOP"],
  dependencies: []
};

export const MARKETING_SPECIALISTS: AgentSpec[] = [
  { id: "brandManagerAgent", name: "Brand Manager Agent", role: "Brand Manager", industry: "marketing", system_prompt: "Fokus: brand strategy, brand identity, brand guidelines. Deliverables: Brand SOP, Brand Guidelines, Identity Control.", deliverables: ["Brand SOP", "Guidelines", "Identity"], dependencies: ["isoMarketingOrchestrator"] },
  { id: "digitalMarketingAgent", name: "Digital Marketing Agent", role: "Digital Marketing Manager", industry: "marketing", system_prompt: "Fokus: SEO, SEM, social media, email marketing. Deliverables: Digital SOP, SEO Process, Social Media Guidelines.", deliverables: ["Digital SOP", "SEO", "Social"], dependencies: ["isoMarketingOrchestrator"] },
  { id: "contentMarketingAgent", name: "Content Marketing Agent", role: "Content Manager", industry: "marketing", system_prompt: "Fokus: content strategy, content production, distribution. Deliverables: Content SOP, Content Calendar, Distribution Process.", deliverables: ["Content SOP", "Calendar", "Distribution"], dependencies: ["isoMarketingOrchestrator"] },
  { id: "eventsAgent", name: "Events Agent", role: "Events Manager", industry: "marketing", system_prompt: "Fokus: event planning, event execution, post-event. Deliverables: Events SOP, Event Planning, Post-Event Analysis.", deliverables: ["Events SOP", "Planning", "Analysis"], dependencies: ["isoMarketingOrchestrator"] },
  { id: "marketingAnalyticsAgent", name: "Marketing Analytics Agent", role: "Analytics Manager", industry: "marketing", system_prompt: "Fokus: marketing analytics, ROI, reporting. Deliverables: Analytics SOP, ROI Framework, Reporting Process.", deliverables: ["Analytics SOP", "ROI", "Reporting"], dependencies: ["isoMarketingOrchestrator"] }
];

// ============ EXECUTIVE ============
export const EXECUTIVE_ORCHESTRATOR: AgentSpec = {
  id: "isoExecutiveOrchestrator",
  name: "ISO Executive Orchestrator",
  role: "Orchestrator",
  industry: "executive",
  system_prompt: `Kamu adalah \`isoExecutiveOrchestrator\`. Pimpin ISO Executive Management dengan fokus corporate governance, strategy, stakeholder.`,
  deliverables: ["Corporate Governance", "Strategy Management", "Stakeholder Relations"],
  dependencies: []
};

export const EXECUTIVE_SPECIALISTS: AgentSpec[] = [
  { id: "governanceAgent", name: "Corporate Governance Agent", role: "Corporate Secretary", industry: "executive", system_prompt: "Fokus: board matters, governance, compliance. Deliverables: Governance SOP, Board Process, Committee Charters.", deliverables: ["Governance SOP", "Board", "Committee"], dependencies: ["isoExecutiveOrchestrator"] },
  { id: "strategyAgent", name: "Strategy Agent", role: "Strategy Director", industry: "executive", system_prompt: "Fokus: strategic planning, execution, monitoring. Deliverables: Strategy SOP, Planning Process, KPI Framework.", deliverables: ["Strategy SOP", "Planning", "KPI"], dependencies: ["isoExecutiveOrchestrator"] },
  { id: "investorAgent", name: "Investor Relations Agent", role: "IR Manager", industry: "executive", system_prompt: "Fokus: investor communication, reporting, events. Deliverables: IR SOP, Reporting Process, Investor Events.", deliverables: ["IR SOP", "Reporting", "Events"], dependencies: ["isoExecutiveOrchestrator"] },
  { id: "complianceExecAgent", name: "Compliance Executive Agent", role: "CCO", industry: "executive", system_prompt: "Fokus: enterprise risk, compliance, audit. Deliverables: Compliance SOP, Risk Framework, Audit Program.", deliverables: ["Compliance SOP", "Risk", "Audit"], dependencies: ["isoExecutiveOrchestrator"] }
];

// ============ MEDICAL ============
export const MEDICAL_ORCHESTRATOR: AgentSpec = {
  id: "isoMedicalOrchestrator",
  name: "ISO Medical Orchestrator",
  role: "Orchestrator",
  industry: "medical",
  system_prompt: `Kamu adalah \`isoMedicalOrchestrator\`. Pimpin ISO Medical Practice dengan fokus clinical services, patient safety, medical records.`,
  deliverables: ["Medical Process Map", "Clinical Quality System", "Patient Safety"],
  dependencies: []
};

export const MEDICAL_SPECIALISTS: AgentSpec[] = [
  { id: "clinicalDirectorMedicalAgent", name: "Clinical Director Agent", role: "Clinical Director", industry: "medical", system_prompt: "Fokus: clinical protocols, patient care, outcomes. Deliverables: Clinical SOP, Care Protocols, Outcome Metrics.", deliverables: ["Clinical SOP", "Care", "Outcomes"], dependencies: ["isoMedicalOrchestrator"] },
  { id: "medicalRecordsMedicalAgent", name: "Medical Records Agent", role: "Medical Records", industry: "medical", system_prompt: "Fokus: medical documentation, confidentiality, retention. Deliverables: Records SOP, Confidentiality, Retention.", deliverables: ["Records SOP", "Confidentiality", "Retention"], dependencies: ["isoMedicalOrchestrator"] },
  { id: "patientSafetyMedicalAgent", name: "Patient Safety Agent", role: "Patient Safety", industry: "medical", system_prompt: "Fokus: incident reporting, adverse events, safety. Deliverables: Safety SOP, Incident Reporting, Risk Assessment.", deliverables: ["Safety SOP", "Incident", "Risk"], dependencies: ["isoMedicalOrchestrator"] },
  { id: "medicalComplianceAgent", name: "Medical Compliance Agent", role: "Compliance", industry: "medical", system_prompt: "Fokus: regulatory compliance, accreditation, licensing. Deliverables: Compliance SOP, Accreditation, Licensing.", deliverables: ["Compliance SOP", "Accreditation", "Licensing"], dependencies: ["isoMedicalOrchestrator"] }
];

// ============ ENTREPRENEUR ============
export const ENTREPRENEUR_ORCHESTRATOR: AgentSpec = {
  id: "isoEntrepreneurOrchestrator",
  name: "ISO Entrepreneur Orchestrator",
  role: "Orchestrator",
  industry: "entrepreneur",
  system_prompt: `Kamu adalah \`isoEntrepreneurOrchestrator\`. Pimpin ISO Startup/SME Management dengan fokus agility, growth, lean operations.`,
  deliverables: ["Lean Process Map", "Growth System", "Agile Operations"],
  dependencies: []
};

export const ENTREPRENEUR_SPECIALISTS: AgentSpec[] = [
  { id: "growthAgent", name: "Growth Agent", role: "Growth Manager", industry: "entrepreneur", system_prompt: "Fokus: growth strategy, customer acquisition, retention. Deliverables: Growth SOP, Acquisition, Retention.", deliverables: ["Growth SOP", "Acquisition", "Retention"], dependencies: ["isoEntrepreneurOrchestrator"] },
  { id: "productAgent", name: "Product Agent", role: "Product Manager", industry: "entrepreneur", system_prompt: "Fokus: product development, MVP, product-market fit. Deliverables: Product SOP, MVP Process, Feedback Loop.", deliverables: ["Product SOP", "MVP", "Feedback"], dependencies: ["isoEntrepreneurOrchestrator"] },
  { id: "operationsStartupAgent", name: "Operations Startup Agent", role: "Operations", industry: "entrepreneur", system_prompt: "Fokus: lean operations, process optimization. Deliverables: Operations SOP, Lean Process, Optimization.", deliverables: ["Operations SOP", "Lean", "Optimization"], dependencies: ["isoEntrepreneurOrchestrator"] }
];

// ============ CREATIVE ============
export const CREATIVE_ORCHESTRATOR: AgentSpec = {
  id: "isoCreativeOrchestrator",
  name: "ISO Creative Orchestrator",
  role: "Orchestrator",
  industry: "creative",
  system_prompt: `Kamu adalah \`isoCreativeOrchestrator\`. Pimpin ISO Creative Agency dengan fokus creative process, project management, client service.`,
  deliverables: ["Creative Process Map", "Project Management", "Client Service"],
  dependencies: []
};

export const CREATIVE_SPECIALISTS: AgentSpec[] = [
  { id: "creativeDirectorAgent", name: "Creative Director Agent", role: "Creative Director", industry: "creative", system_prompt: "Fokus: creative direction, concept, creative review. Deliverables: Creative SOP, Concept Process, Review Framework.", deliverables: ["Creative SOP", "Concept", "Review"], dependencies: ["isoCreativeOrchestrator"] },
  { id: "accountServiceAgent", name: "Account Service Agent", role: "Account Manager", industry: "creative", system_prompt: "Fokus: client liaison, brief handling, account management. Deliverables: Account SOP, Brief Process, Client Service.", deliverables: ["Account SOP", "Brief", "Service"], dependencies: ["isoCreativeOrchestrator"] },
  { id: "productionCreativeAgent", name: "Production Agent", role: "Production Manager", industry: "creative", system_prompt: "Fokus: production, timelines, resource allocation. Deliverables: Production SOP, Timeline, Resource.", deliverables: ["Production SOP", "Timeline", "Resource"], dependencies: ["isoCreativeOrchestrator"] }
];

// ============ RELIGIOUS ============
export const RELIGIOUS_ORCHESTRATOR: AgentSpec = {
  id: "isoReligiousOrchestrator",
  name: "ISO Religious Orchestrator",
  role: "Orchestrator",
  industry: "religious",
  system_prompt: `Kamu adalah \`isoReligiousOrchestrator\`. Pimpin ISO Religious Organization Management dengan fokus religious services, community, education.`,
  deliverables: ["Religious Services SOP", "Community Management", "Religious Education"],
  dependencies: []
};

export const RELIGIOUS_SPECIALISTS: AgentSpec[] = [
  { id: "worshipAgent", name: "Worship Agent", role: "Worship Director", industry: "religious", system_prompt: "Fokus: worship services, ceremonies, liturgy. Deliverables: Worship SOP, Service Guide, Ceremony Protocol.", deliverables: ["Worship SOP", "Service", "Ceremony"], dependencies: ["isoReligiousOrchestrator"] },
  { id: "educationReligiousAgent", name: "Religious Education Agent", role: "Education Director", industry: "religious", system_prompt: "Fokus: religious education, teaching, spiritual development. Deliverables: Education SOP, Curriculum, Teaching Guidelines.", deliverables: ["Education SOP", "Curriculum", "Teaching"], dependencies: ["isoReligiousOrchestrator"] },
  { id: "communityAgent", name: "Community Agent", role: "Community Director", industry: "religious", system_prompt: "Fokus: community programs, outreach, social services. Deliverables: Community SOP, Outreach, Social Programs.", deliverables: ["Community SOP", "Outreach", "Social"], dependencies: ["isoReligiousOrchestrator"] }
];

// ============ ADMINISTRATIVE ============
export const ADMINISTRATIVE_ORCHESTRATOR: AgentSpec = {
  id: "isoAdminOrchestrator",
  name: "ISO Administrative Orchestrator",
  role: "Orchestrator",
  industry: "administrative",
  system_prompt: `Kamu adalah \`isoAdminOrchestrator\`. Pimpin ISO Administrative Services dengan fokus office management, document, support.`,
  deliverables: ["Admin Process Map", "Document Management", "Support Services"],
  dependencies: []
};

export const ADMINISTRATIVE_SPECIALISTS: AgentSpec[] = [
  { id: "officeManagerAgent", name: "Office Manager Agent", role: "Office Manager", industry: "administrative", system_prompt: "Fokus: office operations, facilities, utilities. Deliverables: Office SOP, Facilities, Utilities.", deliverables: ["Office SOP", "Facilities", "Utilities"], dependencies: ["isoAdminOrchestrator"] },
  { id: "documentAdminAgent", name: "Document Admin Agent", role: "Document Manager", industry: "administrative", system_prompt: "Fokus: document management, records, archiving. Deliverables: Doc SOP, Records, Archiving.", deliverables: ["Doc SOP", "Records", "Archive"], dependencies: ["isoAdminOrchestrator"] },
  { id: "receptionAgent", name: "Reception Agent", role: "Reception", industry: "administrative", system_prompt: "Fokus: receptionist, visitor management, communication. Deliverables: Reception SOP, Visitor, Communication.", deliverables: ["Reception SOP", "Visitor", "Comm"], dependencies: ["isoAdminOrchestrator"] }
];

// ============ CONSTRUCTION ============
export const CONSTRUCTION_ORCHESTRATOR: AgentSpec = {
  id: "isoConstructionOrchestrator",
  name: "ISO Construction Orchestrator",
  role: "Orchestrator",
  industry: "construction",
  system_prompt: `Kamu adalah \`isoConstructionOrchestrator\`. Pimpin ISO Construction Management dengan fokus project delivery, safety, quality.`,
  deliverables: ["Construction Process Map", "Project Management", "Safety System"],
  dependencies: []
};

export const CONSTRUCTION_SPECIALISTS: AgentSpec[] = [
  { id: "siteManagerAgent", name: "Site Manager Agent", role: "Site Manager", industry: "construction", system_prompt: "Fokus: site operations, scheduling, supervision. Deliverables: Site SOP, Scheduling, Supervision.", deliverables: ["Site SOP", "Schedule", "Supervision"], dependencies: ["isoConstructionOrchestrator"] },
  { id: "safetyConstructionAgent", name: "Safety Construction Agent", role: "Safety Manager", industry: "construction", system_prompt: "Fokus: construction safety, PPE, hazard control. Deliverables: Safety SOP, Hazard, PPE.", deliverables: ["Safety SOP", "Hazard", "PPE"], dependencies: ["isoConstructionOrchestrator"] },
  { id: "qualityConstructionAgent", name: "Quality Construction Agent", role: "Quality Manager", industry: "construction", system_prompt: "Fokus: construction quality, inspection, defects. Deliverables: QC SOP, Inspection, Defect Management.", deliverables: ["QC SOP", "Inspection", "Defects"], dependencies: ["isoConstructionOrchestrator"] },
  { id: "procurementConstructionAgent", name: "Procurement Construction Agent", role: "Procurement", industry: "construction", system_prompt: "Fokus: material procurement, vendor, logistics. Deliverables: Procurement SOP, Vendor, Logistics.", deliverables: ["Procurement SOP", "Vendor", "Logistics"], dependencies: ["isoConstructionOrchestrator"] }
];

// ============ TELECOMMUNICATIONS ============
export const TELECOMMUNICATIONS_ORCHESTRATOR: AgentSpec = {
  id: "isoTelecomOrchestrator",
  name: "ISO Telecommunications Orchestrator",
  role: "Orchestrator",
  industry: "telecommunications",
  system_prompt: `Kamu adalah \`isoTelecomOrchestrator\`. Pimpin ISO Telecommunications Management dengan fokus network operations, service delivery, customer service.`,
  deliverables: ["Telecom Process Map", "Network Operations", "Service Delivery"],
  dependencies: []
};

export const TELECOMMUNICATIONS_SPECIALISTS: AgentSpec[] = [
  { id: "networkOpsAgent", name: "Network Operations Agent", role: "Network Ops Manager", industry: "telecommunications", system_prompt: "Fokus: network monitoring, incident, maintenance. Deliverables: Network SOP, Monitoring, Maintenance.", deliverables: ["Network SOP", "Monitoring", "Maintenance"], dependencies: ["isoTelecomOrchestrator"] },
  { id: "serviceDeliveryAgent", name: "Service Delivery Agent", role: "Service Delivery", industry: "telecommunications", system_prompt: "Fokus: service provisioning, installation, activation. Deliverables: Service SOP, Provisioning, Activation.", deliverables: ["Service SOP", "Provisioning", "Activation"], dependencies: ["isoTelecomOrchestrator"] },
  { id: "customerServiceTelecomAgent", name: "Customer Service Telecom Agent", role: "CS Manager", industry: "telecommunications", system_prompt: "Fokus: customer support, complaint, retention. Deliverables: CS SOP, Complaint, Retention.", deliverables: ["CS SOP", "Complaint", "Retention"], dependencies: ["isoTelecomOrchestrator"] },
  { id: "billingAgent", name: "Billing Agent", role: "Billing Manager", industry: "telecommunications", system_prompt: "Fokus: billing, revenue, collections. Deliverables: Billing SOP, Revenue, Collections.", deliverables: ["Billing SOP", "Revenue", "Collections"], dependencies: ["isoTelecomOrchestrator"] }
];

// ============ RETAIL ============
export const RETAIL_SERVICE_ORCHESTRATOR: AgentSpec = {
  id: "isoRetailServiceOrchestrator",
  name: "ISO Retail Service Orchestrator",
  role: "Orchestrator",
  industry: "retail_service",
  system_prompt: `Kamu adalah \`isoRetailServiceOrchestrator\`. Pimpin ISO Retail Service Management dengan fokus customer service, store operations, merchandising.`,
  deliverables: ["Retail Service Map", "Customer Service System", "Store Operations"],
  dependencies: []
};

export const RETAIL_SERVICE_SPECIALISTS: AgentSpec[] = [
  { id: "customerServiceRetailAgent", name: "Customer Service Agent", role: "CS Manager", industry: "retail_service", system_prompt: "Fokus: customer service, complaint handling, satisfaction. Deliverables: CS SOP, Complaint, Satisfaction.", deliverables: ["CS SOP", "Complaint", "Satisfaction"], dependencies: ["isoRetailServiceOrchestrator"] },
  { id: "storeOpsRetailAgent", name: "Store Operations Agent", role: "Store Ops", industry: "retail_service", system_prompt: "Fokus: daily store operations, opening/closing. Deliverables: Store SOP, Opening/Closing, Daily Ops.", deliverables: ["Store SOP", "Opening/Closing", "Daily"], dependencies: ["isoRetailServiceOrchestrator"] },
  { id: "merchandisingAgent", name: "Merchandising Agent", role: "Merchandising", industry: "retail_service", system_prompt: "Fokus: product display, inventory, stock. Deliverables: Merch SOP, Display, Stock.", deliverables: ["Merch SOP", "Display", "Stock"], dependencies: ["isoRetailServiceOrchestrator"] }
];

// Export helper functions - use index.ts instead
export function getAgentByIndustry(industry: string, role: string): AgentSpec | undefined {
  return undefined;
}
