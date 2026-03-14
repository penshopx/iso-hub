# Project Brief: ISO Management System

## Purpose

A Next.js web application for managing ISO certifications, audits, and training (BIMTEK) for Indonesian companies. The system provides centralized management of ISO 45001 (K3), ISO 14001 (Lingkungan), internal/external audits, and document generation.

## Target Users

- Indonesian companies seeking ISO certification
- ISO consultants and auditors
- HR/Training departments managing BIMTEK
- Quality assurance teams

## Core Features

### Must Have
- Dashboard with navigation to all modules
- ISO 45001 (K3) - Kesehatan dan Keselamatan Kerja
- ISO 14001 - Sistem Manajemen Lingkungan
- Pelatihan BIMTEK - Bimbingan Teknis
- Audit Internal management
- Audit Eksternal / Sertifikasi
- ISO Document Generator

### Modules

| Module | Route | Description |
|--------|-------|-------------|
| Dashboard | `/` | Main dashboard with navigation |
| ISO 45001 | `/iso/iso45001` | K3 documents, hazard identification, incidents |
| ISO 14001 | `/iso/iso14001` | Environmental documents, aspects, monitoring |
| Pelatihan | `/iso/pelatihan` | Training programs, participants, certificates |
| Audit Internal | `/audit-internal` | Schedule, findings, corrective actions |
| Audit Eksternal | `/audit-eksternal` | Certification body, surveillance |
| ISO Generator | `/iso-generator` | Generate policies, procedures, forms |

## Tech Stack

- Next.js 16 with App Router
- TypeScript
- Tailwind CSS 4
- Bun package manager
