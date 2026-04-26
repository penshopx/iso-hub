import { Link } from "wouter";

const calendarEvents = [
  { id: 1, title: "Audit Internal ISO 9001", date: "2026-03-20", type: "Audit", status: "Upcoming", color: "blue" },
  { id: 2, title: "Surveillance Audit SGS", date: "2026-03-25", type: "External Audit", status: "Upcoming", color: "red" },
  { id: 3, title: "Renewal ISO 14001", date: "2026-04-15", type: "Certification", status: "Deadline", color: "orange" },
  { id: 4, title: "Training ISO 45001", date: "2026-03-28", type: "Training", status: "Upcoming", color: "purple" },
  { id: 5, title: "Management Review Meeting", date: "2026-04-01", type: "Meeting", status: "Upcoming", color: "green" },
  { id: 6, title: "Environmental Monitoring", date: "2026-03-22", type: "Monitoring", status: "Recurring", color: "cyan" },
  { id: 7, title: "K3 Inspection", date: "2026-03-24", type: "Inspection", status: "Recurring", color: "yellow" },
  { id: 8, title: "CAPA Review", date: "2026-04-05", type: "Review", status: "Upcoming", color: "pink" },
];

const months = ["Maret 2026", "April 2026", "Mei 2026"];

const typeColors: Record<string, string> = {
  "Audit": "bg-blue-500",
  "External Audit": "bg-red-500",
  "Certification": "bg-orange-500",
  "Training": "bg-purple-500",
  "Meeting": "bg-green-500",
  "Monitoring": "bg-cyan-500",
  "Inspection": "bg-yellow-500",
  "Review": "bg-pink-500",
};

export default function ComplianceCalendarPage() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-semibold">Kalender Kepatuhan</h1>
                <p className="text-sm text-neutral-400">Compliance Calendar & Reminders</p>
              </div>
            </div>
            <Link href="/kalender-kepatuhan/tambah" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
              + Tambah Event
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Calendar View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Month Calendar */}
          <div className="lg:col-span-2 bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">{months[0]}</h2>
              <div className="flex gap-2">
                <button className="p-2 bg-neutral-700 rounded hover:bg-neutral-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button className="p-2 bg-neutral-700 rounded hover:bg-neutral-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
                <div key={day} className="text-center text-xs text-neutral-500 font-medium py-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 31 }, (_, i) => {
                const day = i + 1;
                const hasEvent = [20, 22, 24, 25, 28].includes(day);
                const isToday = day === 18;
                return (
                  <div 
                    key={day} 
                    className={`aspect-square p-1 rounded flex flex-col items-start justify-start text-sm ${
                      isToday ? "bg-blue-600" : hasEvent ? "bg-neutral-700" : "bg-neutral-750"
                    } hover:bg-neutral-600 cursor-pointer transition-colors`}
                  >
                    <span className={isToday ? "text-white" : "text-neutral-400"}>{day}</span>
                    {hasEvent && (
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-0.5"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
            <h2 className="text-lg font-semibold mb-4">Upcoming Events</h2>
            <div className="space-y-3">
              {calendarEvents.slice(0, 5).map((event) => (
                <div key={event.id} className="p-3 bg-neutral-700/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${typeColors[event.type]}`}></div>
                    <span className="text-xs text-neutral-400">{event.date}</span>
                  </div>
                  <p className="font-medium text-sm">{event.title}</p>
                  <span className="text-xs text-neutral-500">{event.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Event Types Legend */}
        <div className="mb-8 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
          <h2 className="text-lg font-semibold mb-4">Legend</h2>
          <div className="flex flex-wrap gap-4">
            {Object.entries(typeColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded ${color}`}></div>
                <span className="text-sm text-neutral-400">{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline View */}
        <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-6">
          <h2 className="text-lg font-semibold mb-6">Timeline - Q1 2026</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-neutral-700"></div>
            <div className="space-y-6">
              {[
                { date: "2026-03-20", title: "Audit Internal ISO 9001", desc: "Tim audit internal melakukan audit pada dept. Produksi & QC", type: "Audit" },
                { date: "2026-03-25", title: "Surveillance Audit SGS", desc: "Audit pengawas tahunan dari Bureau Veritas", type: "External Audit" },
                { date: "2026-04-01", title: "Management Review", desc: "Rapat tinjauan manajemen untuk evaluasi SM", type: "Meeting" },
                { date: "2026-04-15", title: "Renewal ISO 14001", desc: "Batas akhir renewal sertifikat ISO 14001", type: "Certification" },
                { date: "2026-04-20", title: "Training Awareness", desc: "Pelatihan kesadaran ISO untuk semua karyawan", type: "Training" },
              ].map((item, idx) => (
                <div key={idx} className="relative pl-12">
                  <div className="absolute left-2.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-neutral-900"></div>
                  <div className="bg-neutral-700/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-blue-400 font-medium">{item.date}</span>
                      <span className="px-2 py-0.5 bg-neutral-600 rounded text-xs">{item.type}</span>
                    </div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-neutral-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reminders */}
        <div className="mt-8 p-6 bg-yellow-900/30 border border-yellow-500/30 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Reminders Aktif</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-red-400">●</span>
                  <span>Surveillance Audit - 7 hari lagi</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-orange-400">●</span>
                  <span>ISO 14001 Renewal - 28 hari lagi</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-yellow-400">●</span>
                  <span>Monthly Environmental Report - 4 hari lagi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
