import Link from "next/link";

const ecourses = [
  {
    id: 1,
    title: "Dasar-Dasar ISO 9001:2015",
    description: "Pelajari fundamental sistem manajemen mutu ISO 9001 dari nol",
    lessons: 12,
    duration: "4 jam",
    level: "Pemula",
    iso: "ISO 9001",
  },
  {
    id: 2,
    title: "Implementasi ISO 14001",
    description: "Tutorial lengkap implementasi sistem manajemen lingkungan",
    lessons: 15,
    duration: "6 jam",
    level: "Menengah",
    iso: "ISO 14001",
  },
  {
    id: 3,
    title: "K3 dengan ISO 45001",
    description: "Memahami keselamatan dan kesehatan kerja dengan ISO 45001",
    lessons: 10,
    duration: "5 jam",
    level: "Pemula",
    iso: "ISO 45001",
  },
  {
    id: 4,
    title: "Anti Penyuapan ISO 37001",
    description: "Panduan lengkap sistem manajemen anti penyuapan",
    lessons: 8,
    duration: "3 jam",
    level: "Menengah",
    iso: "ISO 37001",
  },
  {
    id: 5,
    title: "Manajemen Risiko ISO 31000",
    description: "Belajar mengelola risiko dengan standar ISO 31000",
    lessons: 10,
    duration: "4 jam",
    level: "Pemula",
    iso: "ISO 31000",
  },
];

const ebooks = [
  {
    id: 1,
    title: "Buku Panduan ISO 9001",
    author: "ISO Hub Team",
    pages: 250,
    format: "PDF",
    iso: "ISO 9001",
  },
  {
    id: 2,
    title: "ISO 14001 Handbook",
    author: "Environmental Experts",
    pages: 320,
    format: "PDF",
    iso: "ISO 14001",
  },
  {
    id: 3,
    title: "K3 Guide for Managers",
    author: "Safety First",
    pages: 180,
    format: "EPUB",
    iso: "ISO 45001",
  },
  {
    id: 4,
    title: "Anti Corruption Implementation Guide",
    author: "Integrity Institute",
    pages: 210,
    format: "PDF",
    iso: "ISO 37001",
  },
];

export default function LearningPage() {
  return (
    <main className="min-h-screen bg-neutral-900 text-white">
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-semibold">Learning Hub</h1>
              <p className="text-sm text-neutral-400">E-course, E-book & Chatbot AI</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Chatbot AI Section */}
        <div className="mb-12">
          <div className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">ISO Assistant AI</h2>
                <p className="text-blue-100 mb-4">
                  Tanya apapun tentang ISO! Chatbot AI kami siap membantu menjawab pertanyaan Anda 24/7
                </p>
                <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                  Mulai Chat
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-neutral-800 rounded-lg border border-neutral-700">
              <h4 className="font-medium mb-2">Contoh Pertanyaan:</h4>
              <ul className="text-sm text-neutral-400 space-y-2">
                <li>&quot;Apa itu ISO 9001?&quot;</li>
                <li>&quot;Bagaimana langkah implementasi ISO 14001?&quot;</li>
                <li>&quot;Apa bedanya ISO 37001 dan PANCEK?&quot;</li>
              </ul>
            </div>
            <div className="p-4 bg-neutral-800 rounded-lg border border-neutral-700">
              <h4 className="font-medium mb-2">Topik Populer:</h4>
              <ul className="text-sm text-neutral-400 space-y-2">
                <li>ISO 9001 - Mutu</li>
                <li>ISO 14001 - Lingkungan</li>
                <li>ISO 45001 - K3</li>
              </ul>
            </div>
            <div className="p-4 bg-neutral-800 rounded-lg border border-neutral-700">
              <h4 className="font-medium mb-2">Fitur:</h4>
              <ul className="text-sm text-neutral-400 space-y-2">
                <li>✅ Jawaban cepat</li>
                <li>✅ Referensi dokumen</li>
                <li>✅ 24/7 Available</li>
              </ul>
            </div>
          </div>
        </div>

        {/* E-Courses Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">E-Course</h2>
            <Link href="/learning/kursus" className="text-blue-400 hover:text-blue-300 text-sm">
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecourses.map((course) => (
              <div key={course.id} className="bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden hover:border-neutral-600 transition-colors">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-blue-500 rounded text-xs font-medium">
                      {course.iso}
                    </span>
                    <span className="px-2 py-1 bg-neutral-700 rounded text-xs text-neutral-300">
                      {course.level}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
                  <p className="text-sm text-neutral-400 mb-4">{course.description}</p>
                  <div className="flex justify-between text-sm text-neutral-500 mb-4">
                    <span>{course.lessons} Lesson</span>
                    <span>{course.duration}</span>
                  </div>
                  <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                    Mulai Kursus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* E-Books Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">E-Book</h2>
            <Link href="/learning/buku" className="text-blue-400 hover:text-blue-300 text-sm">
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ebooks.map((book) => (
              <div key={book.id} className="bg-neutral-800 rounded-lg border border-neutral-700 overflow-hidden hover:border-neutral-600 transition-colors">
                <div className="h-32 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="p-4">
                  <span className="px-2 py-1 bg-green-500 rounded text-xs font-medium">
                    {book.iso}
                  </span>
                  <h3 className="font-semibold mt-2 mb-1">{book.title}</h3>
                  <p className="text-xs text-neutral-400 mb-2">by {book.author}</p>
                  <div className="flex justify-between text-xs text-neutral-500">
                    <span>{book.pages} pages</span>
                    <span>{book.format}</span>
                  </div>
                  <button className="w-full mt-3 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg text-sm font-medium transition-colors">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quiz & Evaluasi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Quiz ISO 9001</h3>
              <p className="text-sm text-neutral-400 mb-4">Uji pemahaman Anda tentang sistem manajemen mutu</p>
              <button className="w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm font-medium transition-colors">
                Mulai Quiz
              </button>
            </div>
            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <div className="w-12 h-12 bg-green-500 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Quiz ISO 14001</h3>
              <p className="text-sm text-neutral-400 mb-4">Evaluasi pengetahuan manajemen lingkungan</p>
              <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium transition-colors">
                Mulai Quiz
              </button>
            </div>
            <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
              <div className="w-12 h-12 bg-red-500 rounded-lg mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Quiz ISO 45001</h3>
              <p className="text-sm text-neutral-400 mb-4">Test pengetahuan K3 Anda</p>
              <button className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors">
                Mulai Quiz
              </button>
            </div>
          </div>
        </div>

        {/* Learning Path */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Learning Path</h2>
          <div className="p-6 bg-neutral-800 rounded-lg border border-neutral-700">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 p-4 bg-blue-500/20 rounded-lg text-center">
                <div className="font-bold text-blue-400">Level 1</div>
                <div className="text-sm">Pemahaman Dasar ISO</div>
              </div>
              <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
              <div className="flex-1 p-4 bg-purple-500/20 rounded-lg text-center">
                <div className="font-bold text-purple-400">Level 2</div>
                <div className="text-sm">Implementasi Sistem</div>
              </div>
              <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
              <div className="flex-1 p-4 bg-green-500/20 rounded-lg text-center">
                <div className="font-bold text-green-400">Level 3</div>
                <div className="text-sm">Audit & Sertifikasi</div>
              </div>
              <div className="w-8 h-0.5 bg-neutral-600 hidden md:block"></div>
              <div className="flex-1 p-4 bg-yellow-500/20 rounded-lg text-center">
                <div className="font-bold text-yellow-400">Level 4</div>
                <div className="text-sm">Konsultan Profesional</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
