import Link from "next/link";
import { db } from "@/db";
import { services, facilitators } from "@/db/schema";

async function getServicesWithFacilitators() {
  const servs = await db.select().from(services);
  const facs = await db.select().from(facilitators);
  return servs.map(s => ({
    ...s,
    facilitatorName: facs.find(f => f.id === s.facilitatorId)?.name || "Fasilitator",
  }));
}

const categoryIcons: Record<string, string> = {
  "Konsultasi": "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  "Training": "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  "Audit": "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  "Implementasi": "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
};

export default async function LayananPage() {
  const serviceList = await getServicesWithFacilitators();

  const sampleServices = [
    {
      id: 1,
      name: "Konsultasi ISO 9001",
      description: "Konsultasi implementasi Sistem Manajemen Mutu ISO 9001:2015 untuk perusahaan Anda.",
      category: "Konsultasi",
      isoStandard: "ISO 9001",
      price: 15000000,
      duration: "3 hari",
      location: "Jakarta",
      isOnline: true,
      facilitatorName: "PT Konsultan Maju",
    },
    {
      id: 2,
      name: "Pelatihan ISO 14001",
      description: "Training awareness ISO 14001 untuk tim internal perusahaan.",
      category: "Training",
      isoStandard: "ISO 14001",
      price: 5000000,
      duration: "2 hari",
      location: "Surabaya",
      isOnline: false,
      facilitatorName: "Dr. Ahmad Wijaya",
    },
    {
      id: 3,
      name: "Audit Internal ISO 45001",
      description: "Pelaksanaan audit internal Sistem Manajemen K3 sesuai standar ISO 45001.",
      category: "Audit",
      isoStandard: "ISO 45001",
      price: 8000000,
      duration: "3 hari",
      location: "Jakarta",
      isOnline: false,
      facilitatorName: "Siti Nurhaliza",
    },
    {
      id: 4,
      name: "Implementasi ISO 27001",
      description: "Bantuan lengkap implementasi Sistem Manajemen Keamanan Informasi.",
      category: "Implementasi",
      isoStandard: "ISO 27001",
      price: 25000000,
      duration: "6 bulan",
      location: "Indonesia",
      isOnline: true,
      facilitatorName: "CyberSec Experts",
    },
    {
      id: 5,
      name: "Gap Analysis ISO 9001",
      description: "Analisis kesenjangan untuk mengetahui kesiapan sertifikasi ISO 9001 perusahaan.",
      category: "Konsultasi",
      isoStandard: "ISO 9001",
      price: 7500000,
      duration: "2 hari",
      location: "Bandung",
      isOnline: false,
      facilitatorName: "Qualitas Consulting",
    },
    {
      id: 6,
      name: "Bimtek ISO 45001",
      description: "Bimbingan teknis untuk memahami persyaratan ISO 45001:2018.",
      category: "Training",
      isoStandard: "ISO 45001",
      price: 3500000,
      duration: "1 hari",
      location: "Online",
      isOnline: true,
      facilitatorName: "HSE Indonesia",
    },
    {
      id: 7,
      name: "Konsultasi ISO 37001",
      description: "Implementasi Sistem Manajemen Anti Penyuapan ISO 37001:2016 untuk perusahaan.",
      category: "Konsultasi",
      isoStandard: "ISO 37001",
      price: 20000000,
      duration: "4 hari",
      location: "Jakarta",
      isOnline: true,
      facilitatorName: "Anti Corruption Consultants",
    },
    {
      id: 8,
      name: "Pelatihan ISO 9001",
      description: "Training pemahaman ISO 9001:2015 untuk tim quality assurance.",
      category: "Training",
      isoStandard: "ISO 9001",
      price: 4500000,
      duration: "2 hari",
      location: "Surabaya",
      isOnline: false,
      facilitatorName: "PT Mutu Indonesia",
    },
    {
      id: 9,
      name: "Konsultasi PANCEK",
      description: "Implementasi Panduan Cegah Korupsi (PANCEK) untuk organisasi di Indonesia.",
      category: "Konsultasi",
      isoStandard: "PANCEK",
      price: 18000000,
      duration: "4 hari",
      location: "Jakarta",
      isOnline: true,
      facilitatorName: "Anti Corruption Indonesia",
    },
    {
      id: 10,
      name: "Pelatihan PANCEK",
      description: "Training awareness Panduan Cegah Korupsi untuk karyawan dan manajemen.",
      category: "Training",
      isoStandard: "PANCEK",
      price: 5500000,
      duration: "2 hari",
      location: "Jakarta",
      isOnline: false,
      facilitatorName: "Integrity Consulting",
    },
    // Manufaktur
    {
      id: 11,
      name: "Konsultasi IATF 16949",
      description: "Implementasi Sistem Manajemen Mutu Otomotif IATF 16949 untuk supplier automotive.",
      category: "Konsultasi",
      isoStandard: "IATF 16949",
      price: 35000000,
      duration: "6 bulan",
      location: "Jakarta",
      isOnline: true,
      facilitatorName: "Automotive Quality Solutions",
    },
    {
      id: 12,
      name: "Pelatihan ISO 22000",
      description: "Training keamanan pangan ISO 22000 untuk industri makanan dan minuman.",
      category: "Training",
      isoStandard: "ISO 22000",
      price: 6000000,
      duration: "3 hari",
      location: "Surabaya",
      isOnline: false,
      facilitatorName: "Food Safety Indonesia",
    },
    // Energi
    {
      id: 13,
      name: "Konsultasi ISO 50001",
      description: "Implementasi sistem manajemen energi untuk efisiensi dan penghematan biaya energi.",
      category: "Konsultasi",
      isoStandard: "ISO 50001",
      price: 22000000,
      duration: "4 bulan",
      location: "Jakarta",
      isOnline: true,
      facilitatorName: "Green Energy Consulting",
    },
    // Pertambangan
    {
      id: 14,
      name: "Konsultasi ISO 19443",
      description: "Implementasi Sistem Manajemen Mutu untuk industri pertambangan.",
      category: "Konsultasi",
      isoStandard: "ISO 19443",
      price: 28000000,
      duration: "5 bulan",
      location: "Kalimantan",
      isOnline: false,
      facilitatorName: "Mining Excellence Indonesia",
    },
  ];

  const displayServices = serviceList.length > 0 ? serviceList : sampleServices;

  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-semibold">Layanan</h1>
                <p className="text-sm text-neutral-400">Pesan layanan konsultasi & pelatihan ISO</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
              + Tawarkan Layanan
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8 p-4 bg-gradient-to-r from-green-900 to-blue-900 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Butuh bantuan fasilitator?</h2>
          <p className="text-green-200 mb-4">
            Temukan layanan yang sesuai dengan kebutuhan perusahaan Anda
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium">Semua</button>
          <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium">Konsultasi</button>
          <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium">Training</button>
          <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium">Audit</button>
          <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium">Implementasi</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices.map((service) => (
            <div key={service.id} className="bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden hover:border-neutral-600 transition-colors">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="px-2 py-1 bg-blue-500 rounded text-xs font-medium text-white">
                    {service.category}
                  </span>
                  {service.isOnline ? (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                      Online
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-neutral-700 text-neutral-400 rounded text-xs">
                      Offline
                    </span>
                  )}
                </div>
                
                <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                <p className="text-sm text-neutral-400 mb-4 line-clamp-2">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.isoStandard && (
                    <span className="px-2 py-1 bg-neutral-700 rounded text-xs text-neutral-300">
                      {service.isoStandard}
                    </span>
                  )}
                  <span className="px-2 py-1 bg-neutral-700 rounded text-xs text-neutral-300">
                    {service.duration}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-2xl font-bold text-green-400">
                      {service.price ? `Rp ${(service.price / 1000000).toFixed(1)}jt` : "Hubungi"}
                    </span>
                  </div>
                  <span className="text-xs text-neutral-500">{service.facilitatorName}</span>
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                    Pesan
                  </button>
                  <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium transition-colors">
                    Chat
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-neutral-800 rounded-lg border border-neutral-700">
          <h3 className="font-semibold mb-4">Jenis Layanan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Konsultasi</h4>
                <p className="text-xs text-neutral-400">Bantuan implementasi ISO</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Training</h4>
                <p className="text-xs text-neutral-400">Pelatihan & BIMTEK</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Audit</h4>
                <p className="text-xs text-neutral-400">Audit internal & eksternal</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Implementasi</h4>
                <p className="text-xs text-neutral-400">Bantuan penuh implementasi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
