# Active Context: ISO Hub - Platform ISO Indonesia

## Current State

**Project Status**: ✅ Building ISO Hub Platform

Platform yang menghubungkan pencari dan pemberi layanan ISO - seperti ride-sharing untuk konsultasi ISO.

## Concept

**ISO Hub** adalah platform yang menghubungkan:
- **Pencari (Seekers)**: Perusahaan, individu yang membutuhkan konsultasi ISO
- **Pemberi (Providers)**: Fasilitator, Konsultan, Trainer ISO tersertifikasi

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript & Tailwind CSS 4
- [x] ISO Hub dashboard dengan pencarian
- [x] Fasilitator Directory - direktori konsultan
- [x] Perpustakaan - knowledge base ISO
- [x] Layanan - booking layanan konsultasi/training
- [x] Diskusi - forum komunitas
- [x] Proyek Konsultansi
- [x] Dokumen dengan workflow
- [x] Sertifikasi - Gap analysis
- [x] Learning - E-course, E-book, Chatbot AI
- [x] Produktivitas - Mini apps, document generator
- [x] Agents - AI Agent Control Center dengan 5 specialist agents
- [x] OPC CLAW - Multi-agent task orchestration system
- [x] Risiko - ISO 31000 Risk Management dengan risk matrix
- [x] Insiden - Incident reporting & CAPA system
- [x] Vendor - Supplier management & evaluation (ISO 28000)
- [x] Sertifikasi Badan - Directory lembaga sertifikasi terakreditasi
- [x] Kalender Kepatuhan - Compliance calendar & reminders
- [x] Audit - ISO 19011 Audit Management (Internal & External)
- [x] KPI - Key Performance Indicators dengan BSC framework
- [x] Kalibrasi - Equipment calibration management (ISO 10012)
- [x] Perubahan - Change control management (ISO 9001 Cl. 6.3, 8.1)
- [x] Database dengan 45+ tables (expanded schema)
- [x] Backend API v1 with full CRUD operations
- [x] Advanced query features (pagination, filters, search)
- [x] Activity logging & notifications
- [x] Export functionality (JSON, CSV)
- [x] Cross-entity search API
- [x] Floating Chatbot - ISO Knowledge Help Desk
- [x] OPC CLAW Backend - Real execution engine
- [x] OPC Tasks API - CRUD with auto-routing
- [x] Agent Stats - Performance tracking
- [x] Specialist Agents - ISO, Legal, Technical, Audit, Training
- [x] Multi-Agent Orchestrator System
- [x] Task Decomposition Engine
- [x] Agent Auto-Detection (keyword based)
- [x] Result Aggregation
- [x] Agentic Floating Chatbot - Helpdesk dengan personality agentic
- [x] Chat API v1 - Intent detection, progressive response, task execution
- [x] Mentor System - Panduan step-by-step ISO implementation
- [x] Command System - Receive commands, execute tasks (create, book, schedule)

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | ISO Hub Dashboard |
| `/fasilitator` | Direktori Fasilitator/Konsultan |
| `/perpustakaan` | Knowledge Base ISO |
| `/layanan` | Layanan & Booking |
| `/diskusi` | Forum Diskusi |
| `/proyek` | Kelola Proyek Konsultansi |
| `/dokumen` | Manajemen Dokumen |
| `/sertifikasi` | Roadmap Sertifikasi |
| `/learning` | E-course, E-book, Chatbot AI |
| `/produktivitas` | Mini apps, document generator |
| `/agents` | AI Agent Control Center |
| `/opc` | OPC CLAW Console |
| `/risiko` | Risk Management (ISO 31000) |
| `/insiden` | Incident Management & CAPA |
| `/vendor` | Vendor/Supplier Management |
| `/sertifikasi-badan` | Certification Body Directory |
| `/kalender-kepatuhan` | Compliance Calendar |
| `/audit` | Audit Management (ISO 19011) |
| `/kpi` | KPI Dashboard (BSC) |
| `/kalibrasi` | Calibration Management (ISO 10012) |
| `/perubahan` | Change Control Management |

## API Routes (v1)

| Endpoint | Description |
|----------|-------------|
| `GET /api/v1/risks` | Risk Management CRUD |
| `GET /api/v1/vendors` | Vendor Management CRUD |
| `GET /api/v1/kpi` | KPI & Performance data |
| `GET /api/v1/audit` | Audit Programs & Schedules |
| `GET /api/v1/dashboard` | Dashboard Analytics |
| `GET /api/v1/export` | Export data (JSON/CSV) |
| `GET /api/v1/search` | Cross-entity search |
| `POST /api/v1/opc/tasks` | Execute OPC task |
| `GET /api/v1/opc/tasks` | Get task history & stats |
| `GET /api/v1/agents` | List specialist agents |
| `POST /api/v1/chat` | Agentic chatbot with intent detection |

## Database Tables (50+)

### Facilitator & Services
- facilitators, services, bookings, reviews

### Knowledge Base
- knowledgeArticles

### Consulting
- consultingProjects, projectTasks, projectMilestones
- documentWorkflow

### Certification
- certificationRoadmap, gapAnalysis, readinessChecklist

### ISO Management
- isoDocuments, hazards, incidents
- environmentalAspects, environmentalMonitoring
- trainingPrograms, participants, certificates
- internalAudits, auditFindings, correctiveActions

## Session History

| Date | Changes |
|------|---------|
| 2026-03-18 | Transformed to ISO Hub - platform like ride-sharing for ISO consulting |
| 2026-03-18 | Added Learning, Produktivitas modules |
| 2026-03-18 | Added Agents (AI Control Center) and OPC CLAW (multi-agent orchestration) |
| 2026-03-18 | Updated dashboard navigation with Agents & OPC menu items |
| 2026-03-18 | Added industry best practice modules: Risk Management (ISO 31000), Incident Management (CAPA), Vendor Management (ISO 28000), Certification Body Directory, Compliance Calendar |
| 2026-03-18 | Added Audit Management (ISO 19011), KPI Dashboard (BSC), Calibration (ISO 10012), Change Control |
| 2026-03-18 | Created powerful backend with expanded schema (45+ tables), REST API v1, CRUD operations, activity logging, export, search |
| 2026-03-18 | Strengthened backend with agentic Chat API - intent detection, progressive response, command execution, mentoring system |
