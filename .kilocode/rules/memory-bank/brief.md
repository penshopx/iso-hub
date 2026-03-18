# Project Brief: ISO Hub - Platform Multi-Agent ISO

## Purpose

A comprehensive platform with Multi-Agent Architecture untuk ISO consulting dan knowledge management. Menggunakan Agent Orchestrator untuk mengkoordinasi Specialist Agents dalam menyelesaikan tugas-tugas ISO.

## Architecture: OPC CLAW

### Agent Orchestrator
- **Role**: Mengkoordinasi semua specialist agents
- **Functions**: 
  - Task decomposition
  - Agent delegation
  - Result aggregation
  - Error handling

### Specialist Agents

1. **ISO Agent** - Expert ISO Standards
   - ISO 9001, 14001, 45001, 27001, 37001
   - PANCEK, IATF 16949, ISO 22000, etc.
   - Klausul & requirements
   - Gap analysis

2. **Legal Agent** - Compliance & Regulations
   - Peraturan pemerintah RI
   - UU No 20 Tahun 2001 (Anti Korupsi)
   - Peraturan K3 & Lingkungan
   - Compliance requirements

3. **Technical Agent** - Documentation & Implementation
   - Document generation
   - SOP creation
   - Template management
   - Implementation guidance

4. **Audit Agent** - Assessment & Certification
   - Audit preparation
   - Checklist generation
   - Finding tracking
   - Certification roadmap

5. **Training Agent** - Learning & Development
   - Course recommendations
   - Quiz generation
   - Learning path
   - Competency assessment

### OPC CLAW Execution

```
┌─────────────────────────────────────────┐
│         Agent Orchestrator              │
│  (Task → Delegate → Monitor → Result) │
└────────────┬────────────────────────────┘
             │
    ┌────────┼────────┐
    ▼        ▼        ▼
┌───────┐ ┌──────┐ ┌─────────┐
│  ISO  │ │Legal │ │Technical│
│ Agent │ │Agent │ │  Agent  │
└───┬───┘ └──┬───┘ └────┬────┘
    │        │          │
    └────────┼──────────┘
             ▼
    ┌─────────────────────┐
    │    OPC CLAW        │
    │ (Execution Engine) │
    └─────────────────────┘
```

## Ecosystem

### 1. Sources
- Perpustakaan (Knowledge Base)
- Learning (E-course, E-book, Chatbot)
- Diskusi (Forum)

### 2. Documentation
- Dokumen (Manajemen dokumen)
- Template (ISO templates)
- Generator (Auto-generated docs)

### 3. Public Services
- Fasilitator (Consultant directory)
- Layanan (Booking)
- Produktivitas (Mini apps)

## Multi-Agent Features

### Task Execution
- User submits task → Orchestrator decomposes → Delegates to agents → Executes → Aggregates results

### Agent Communication
- Inter-agent messaging
- Shared knowledge base
- Result caching

### OPC CLAW Capabilities
- Parallel execution
- Sequential workflows
- Conditional branching
- Error recovery
- Result validation

## Modules

| Module | Route | Description |
|--------|-------|-------------|
| Dashboard | `/` | Multi-agent control center |
| Agents | `/agents` | Agent management |
| OPC | `/opc` | Execution console |
| Fasilitator | `/fasilitator` | Directory |
| Perpustakaan | `/perpustakaan` | Knowledge |
| Learning | `/learning` | E-course |
| Produktivitas | `/produktivitas` | Tools |
| Layanan | `/layanan` | Booking |
| Dokumen | `/dokumen` | Documents |
| Sertifikasi | `/sertifikasi` | Certification |

## Tech Stack

- Next.js 16 with App Router
- TypeScript
- Tailwind CSS 4
- Bun package manager
- Drizzle ORM with SQLite
- AI/ML Integration
- Agent Framework
