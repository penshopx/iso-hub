import Link from "next/link";

const certificationBodies = [
  {
    id: "cb001",
    name: "SGS Indonesia",
    acronym: "SGS",
    country: "Indonesia",
    city: "Jakarta",
    accreditations: ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001", "IATF 16949"],
    accreditationBody: "KAN",
    status: "Active",
    rating: 4.8,
    clients: 1250,
    yearEstablished: 1992,
    website: "sgs.co.id",
  },
  {
    id: "cb002",
    name: "Bureau Veritas Indonesia",
    acronym: "BVI",
    country: "Indonesia",
    city: "Jakarta",
    accreditations: ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 22000", "ISO 50001"],
    accreditationBody: "KAN",
    status: "Active",
    rating: 4.7,
    clients: 980,
    yearEstablished: 1995,
    website: "bureauveritas.co.id",
  },
  {
    id: "cb003",
    name: "TÜV Rheinland Indonesia",
    acronym: "TÜV",
    country: "Indonesia",
    city: "Jakarta",
    accreditations: ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001", "ISO 37001", "IATF 16949"],
    accreditationBody: "DAkkS",
    status: "Active",
    rating: 4.9,
    clients: 756,
    yearEstablished: 1998,
    website: "tuv.com",
  },
  {
    id: "cb004",
    name: "Intertek Indonesia",
    acronym: "Intertek",
    country: "Indonesia",
    city: "Jakarta",
    accreditations: ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 22000"],
    accreditationBody: "UKAS",
    status: "Active",
    rating: 4.6,
    clients: 542,
    yearEstablished: 2000,
    website: "intertek.com",
  },
  {
    id: "cb005",
    name: "BSI Group Indonesia",
    acronym: "BSI",
    country: "Indonesia",
    city: "Jakarta",
    accreditations: ["ISO 9001", "ISO 14001", "ISO 45001", "ISO 27001", "ISO 37001", "ISO 22301"],
    accreditationBody: "UKAS",
    status: "Active",
    rating: 4.7,
    clients: 623,
    yearEstablished: 1997,
    website: "bsigroup.com",
  },
  {
    id: "cb006",
    name: "Sucofindo (SCS)",
    acronym: "Sucofindo",
    country: "Indonesia",
    city: "Jakarta",
    accreditations: ["ISO 9001", "ISO 14001", "ISO 45001"],
    accreditationBody: "KAN",
    status: "Active",
    rating: 4.4,
    clients: 890,
    yearEstablished: 1990,
    website: "sucofindo.co.id",
  },
];

const isoStandards = [
  { code: "ISO 9001", name: "Quality Management", category: "General" },
  { code: "ISO 14001", name: "Environmental Management", category: "Environment" },
  { code: "ISO 45001", name: "Occupational Health & Safety", category: "Safety" },
  { code: "ISO 27001", name: "Information Security", category: "Security" },
  { code: "ISO 37001", name: "Anti-Bribery", category: "Compliance" },
  { code: "ISO 22000", name: "Food Safety", category: "Food" },
  { code: "ISO 50001", name: "Energy Management", category: "Energy" },
  { code: "IATF 16949", name: "Automotive Quality", category: "Automotive" },
  { code: "ISO 22301", name: "Business Continuity", category: "Security" },
  { code: "ISO 31000", name: "Risk Management", category: "General" },
];

export default function CertificationBodiesPage() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-semibold">Badan Sertifikasi Terakreditasi</h1>
              <p className="text-sm text-neutral-400">Directory Lembaga Sertifikasi ISO di Indonesia</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search & Filters */}
        <div className="mb-8 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="Cari badan sertifikasi..." 
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white"
              />
            </div>
            <select className="px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white">
              <option>Semua Akreditasi</option>
              <option>KAN (Indonesia)</option>
              <option>UKAS (UK)</option>
              <option>DAkkS (Jerman)</option>
              <option>ANAB (USA)</option>
            </select>
            <select className="px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-lg text-white">
              <option>Semua Standar</option>
              {isoStandards.map((iso) => (
                <option key={iso.code}>{iso.code} - {iso.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4 text-center">
            <div className="text-3xl font-bold text-blue-400">6</div>
            <div className="text-sm text-neutral-400">Total CB</div>
          </div>
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4 text-center">
            <div className="text-3xl font-bold text-green-400">10+</div>
            <div className="text-sm text-neutral-400">Standar Ditawarkan</div>
          </div>
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4 text-center">
            <div className="text-3xl font-bold text-purple-400">5,041</div>
            <div className="text-sm text-neutral-400">Total Klien</div>
          </div>
          <div className="bg-neutral-800 rounded-lg border border-neutral-700 p-4 text-center">
            <div className="text-3xl font-bold text-yellow-400">30+</div>
            <div className="text-sm text-neutral-400">Tahun Pengalaman</div>
          </div>
        </div>

        {/* CB List */}
        <div className="space-y-4 mb-8">
          {certificationBodies.map((cb) => (
            <div key={cb.id} className="bg-neutral-800 rounded-lg border border-neutral-700 p-6 hover:border-neutral-600 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold">{cb.acronym.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">{cb.name}</h3>
                      <p className="text-neutral-400 text-sm">{cb.city}, {cb.country}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 font-medium">{cb.rating}</span>
                      </div>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                        {cb.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">Akreditasi</p>
                      <p className="text-sm font-medium">{cb.accreditationBody}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">Klien</p>
                      <p className="text-sm font-medium">{cb.clients.toLocaleString()}+</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 mb-1">Beroperasi Sejak</p>
                      <p className="text-sm font-medium">{cb.yearEstablished}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs text-neutral-500 mb-2">Sertifikasi yang Ditawarkan:</p>
                    <div className="flex flex-wrap gap-2">
                      {cb.accreditations.map((acc) => (
                        <span key={acc} className="px-2 py-1 bg-neutral-700 rounded text-xs">
                          {acc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                    Hubungi
                  </button>
                  <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium transition-colors">
                    Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* KAN Info */}
        <div className="p-6 bg-blue-900/30 border border-blue-500/30 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Tentang Akreditasi KAN</h3>
              <p className="text-sm text-neutral-400 mb-2">
                Komite Akreditasi Nasional (KAN) adalah lembaga akreditasi resmi Indonesia yang menetapkan kompetensi 
                badan sertifikasi, laboratorium, dan lembaga inspeksi sesuai standar internasional.
              </p>
              <p className="text-sm text-neutral-400">
                Pastikan badan sertifikasi yang Anda pilih memiliki akreditasi KAN untuk menjamin legally recognized certification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
