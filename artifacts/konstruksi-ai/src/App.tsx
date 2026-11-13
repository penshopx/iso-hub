import { useEffect, useMemo, useState } from "react";

const NEWS = [
  { cat: "Construction", color: "#2e7dd7", ico: "🏗", title: "Tol IKN senilai Rp 2,42 T segera rampung akhir kuartal ini", date: "13 Nov 2026", read: "4 mnt", sol: "Tender Assistant" },
  { cat: "Energy", color: "#d98a16", ico: "⚡", title: "Aset Hutama Karya tembus Rp 127,95 T hingga Juni 2022", date: "12 Nov 2026", read: "3 mnt", sol: "Industry Solutions" },
  { cat: "Electricity", color: "#0f9b8e", ico: "🔌", title: "Digitalisasi gardu: PLN percepat transformasi digital", date: "12 Nov 2026", read: "5 mnt", sol: "KonstruksiAI" },
  { cat: "Mining", color: "#8b5e34", ico: "⛏", title: "Penguatan inovasi tambang global dorong standar keselamatan", date: "11 Nov 2026", read: "4 mnt", sol: "Contractor Safety Passport" },
  { cat: "Environment", color: "#137a45", ico: "🌱", title: "Solusi ETP & ZLD pabrik industri air limbah semakin diminati", date: "11 Nov 2026", read: "6 mnt", sol: "Sustainable Construction Buddy" },
  { cat: "Business & Tender", color: "#c0392b", ico: "📋", title: "Panduan persiapan tender konstruksi langkah demi langkah", date: "10 Nov 2026", read: "7 mnt", sol: "Tender Assistant" },
  { cat: "Regulation & Professional", color: "#12355b", ico: "⚖", title: "Pembaruan PP jasa konstruksi: dampak bagi pelaku usaha", date: "10 Nov 2026", read: "5 mnt", sol: "LexCom" },
  { cat: "Technology & AI", color: "#6a4c93", ico: "🤖", title: "AI untuk rekayasa: masa depan infrastruktur & inovasi", date: "09 Nov 2026", read: "8 mnt", sol: "KonstruksiAI & Mini Apps" },
];

const CHANNELS = ["Semua", "Construction", "Energy", "Electricity", "Mining", "Environment", "Business & Tender", "Regulation & Professional", "Technology & AI"];
const PROD_TABS = ["Semua", "AI & Knowledge", "Bisnis & Compliance", "Proyek & Dokumen", "Kompetensi", "Produktivitas"];

const PRODUCTS = [
  { name: "KonstruksiAI", cat: "AI & Knowledge", status: "Live", ico: "🤖", desc: "Asisten AI dan pintu masuk layanan AI untuk profesional konstruksi.", tag: "AI Knowledge" },
  { name: "Brain Project", cat: "AI & Knowledge", status: "Live", ico: "💡", desc: "Konsultasi dan pemecahan masalah bisnis & teknis bersama AI.", tag: "AI Advisory" },
  { name: "Klinik Konsultasi", cat: "AI & Knowledge", status: "Live", ico: "🏥", desc: "Layanan konsultasi langsung dengan tenaga ahli profesional.", tag: "Consulting" },
  { name: "Bedah Dokumen", cat: "AI & Knowledge", status: "Beta", ico: "📑", desc: "Analisis dokumen & persyaratan teknis dengan bantuan AI.", tag: "AI Tools" },
  { name: "Ruang Proyek", cat: "Proyek & Dokumen", status: "Live", ico: "📊", desc: "Manajemen proyek dari perencanaan hingga evaluasi kinerja.", tag: "Project Mgmt" },
  { name: "Dokumen Proyek", cat: "Proyek & Dokumen", status: "Live", ico: "📁", desc: "Pengelolaan & penyimpanan dokumen proyek secara terstruktur.", tag: "Project Mgmt" },
  { name: "Tender", cat: "Bisnis & Compliance", status: "Live", ico: "📋", desc: "Informasi tender, persiapan dokumen & pengadaan barang jasa.", tag: "Compliance" },
  { name: "Kontraktor", cat: "Bisnis & Compliance", status: "Live", ico: "🏗", desc: "Direktori & layanan kontraktor serta penyedia jasa konstruksi.", tag: "Directory" },
  { name: "Biro Jasa", cat: "Bisnis & Compliance", status: "Beta", ico: "🏢", desc: "Layanan pendukung perizinan & administrasi badan usaha.", tag: "Compliance" },
  { name: "Cek Kesiapan SBU/SKK", cat: "Bisnis & Compliance", status: "Live", ico: "✅", desc: "Evaluasi kesiapan legalitas & kompetensi badan usaha.", tag: "Compliance" },
  { name: "Kompetensi Hub", cat: "Kompetensi", status: "Live", ico: "🎓", desc: "Profil kompetensi & pengembangan profesional tenaga ahli.", tag: "Academy" },
  { name: "Bimtek SKK", cat: "Kompetensi", status: "Beta", ico: "📖", desc: "Pelatihan & persiapan uji kompetensi sertifikasi.", tag: "Academy" },
  { name: "LKPM-BKPM", cat: "Bisnis & Compliance", status: "Live", ico: "📈", desc: "Pelaporan kegiatan investasi & kepatuhan usaha.", tag: "Compliance" },
  { name: "LexCom", cat: "Bisnis & Compliance", status: "Live", ico: "⚖", desc: "Pemantauan & tafsir regulasi serta kepatuhan hukum.", tag: "Compliance" },
  { name: "Ruang Simpan", cat: "Produktivitas", status: "Live", ico: "🗄", desc: "Penyimpanan & manajemen dokumen usaha secara aman.", tag: "Productivity" },
  { name: "Mini Apps", cat: "Produktivitas", status: "Proto", ico: "🧩", desc: "Kumpulan aplikasi produktivitas & no-code ringan.", tag: "Productivity" },
];

const SUGGESTIONS = ["Bagaimana persiapan tender?", "Cek kesiapan SBU", "Regulasi terbaru", "Cari tenaga ahli"];

function botReply(text: string) {
  const t = text.toLowerCase();
  if (t.includes("tender")) return "Untuk persiapan tender: ① cek kelengkapan SBU/SKK & legalitas, ② siapkan dokumen administrasi & teknis, ③ analisis syarat & jadwal paket di Tender Watch, ④ gunakan Tender Assistant. Saya bisa arahkan ke tool terkait.";
  if (t.includes("sbu") || t.includes("skk")) return "Gunakan aplikasi Cek Kesiapan SBU/SKK untuk evaluasi awal. Jika ada gap, saya sarankan Biro Jasa dan Bimtek SKK untuk pemenuhan persyaratan.";
  if (t.includes("regulasi")) return "Lihat Regulatory Watch untuk pembaruan terbaru (PP jasa konstruksi, SBU, ESDM, AMDAL). Untuk tafsir mendalam, buka LexCom atau konsultasi ahli regulasi.";
  if (t.includes("ahli") || t.includes("tenaga")) return "Direktori Tenaga Ahli menyediakan 1.240+ profesional (sipil, listrik, HSE, lingkungan, mekanikal). Sebutkan sektor & kualifikasi untuk rekomendasi.";
  if (t.includes("harga") || t.includes("paket")) return "Paket: Explorer (Gratis), Professional (Rp 199K/bln), Business (Rp 799K/bln), Enterprise (Custom). Saya bisa bantu memilih sesuai kebutuhan.";
  return `Saya memahami: "${text}". Saran: ① identifikasi kebutuhan & gap, ② pilih solusi di katalog aplikasi, ③ hubungkan dengan ahli/mitra jika perlu. Mau diarahkan ke pilar terkait?`;
}

export default function KonstruksiAIPortal() {
  const [channel, setChannel] = useState("Semua");
  const [prodTab, setProdTab] = useState("Semua");
  const [menuOpen, setMenuOpen] = useState(false);
  const [chat, setChat] = useState<{ role: "bot" | "user"; text: string }[]>([
    { role: "bot", text: "Halo! Saya AI Concierge Konstruksi AI. Ceritakan masalah bisnis, teknis, atau proyek Anda, dan saya akan mengarahkan ke solusi yang tepat. 👋" },
  ]);
  const [input, setInput] = useState("");

  const filteredNews = useMemo(() => (channel === "Semua" ? NEWS : NEWS.filter((n) => n.cat === channel)), [channel]);
  const filteredProducts = useMemo(() => (prodTab === "Semua" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === prodTab)), [prodTab]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setChat((c) => [...c, { role: "user", text: t }, { role: "bot", text: botReply(t) }]);
    setInput("");
  };

  useEffect(() => {
    const el = document.getElementById("chat-body");
    if (el) el.scrollTop = el.scrollHeight;
  }, [chat]);

  return (
    <div className="kai">
      <style>{css}</style>
      <div className="topbar">
        <div className="container">
          <div className="tb-left"><span className="pill"><span className="dot-live" /> Berita diperbarui setiap hari • 10–15 artikel/hari</span><a href="#news">📰 Daily Industry Briefing</a></div>
          <div className="tb-right"><a href="#pricing">Masuk / Daftar</a></div>
        </div>
      </div>

      <nav className="nav">
        <div className="container">
          <a href="#top" className="brand"><div className="logo">K<span style={{ color: "#f5a623" }}>A</span>I</div><div>Konstruksi AI<small>Gustafta Ecosystem</small></div></a>
          <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
            {[["Beranda", "#top"], ["News", "#news"], ["AI Center", "#concierge"], ["Solusi", "#pillars"], ["Aplikasi", "#catalog"], ["Marketplace", "#market"], ["Harga", "#pricing"]].map(([l, href]) => (
              <li key={l}><a href={href} onClick={() => setMenuOpen(false)}>{l}</a></li>
            ))}
          </ul>
          <div className="nav-actions">
            <a href="#concierge" className="btn btn-primary btn-sm">Tanya AI Concierge</a>
            <button className="nav-toggle" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu"><span /><span /><span /></button>
          </div>
        </div>
      </nav>

      <header className="hero" id="top">
        <div className="container">
          <div>
            <span className="hero-eyebrow">🦅 Trilogi Gustafta • Monolog → Dialog → Kolaborasi → Kreasi</span>
            <h1>Ekosistem AI untuk Bisnis &amp; Profesi <span className="grad">Konstruksi, Energi &amp; Lingkungan</span></h1>
            <p className="lead">Satu portal yang menghubungkan <strong style={{ color: "#fff" }}>informasi harian, pengetahuan, konsultasi profesional, aplikasi digital, dan peluang bisnis</strong>. Informasi setiap hari. Solusi setiap saat. Kolaborasi untuk masa depan.</p>
            <div className="hero-cta"><a href="#news" className="btn btn-primary">📰 Jelajahi Berita Hari Ini</a><a href="#concierge" className="btn btn-ghost">🤖 Mulai dengan AI Concierge</a></div>
            <div className="hero-stats">{[["8+", "Pilar Ekosistem"], ["8", "Kanal Berita"], ["15+", "Aplikasi & SaaS"], ["5", "Sektor Vertikal"]].map(([n, l]) => <div className="hero-stat" key={l}><div className="num">{n}</div><div className="lbl">{l}</div></div>)}</div>
          </div>
          <div className="concierge" id="concierge">
            <div className="ch-head"><div className="ai-orb">🤖</div><div><strong>AI Concierge</strong><span>Solution Engine • Online</span></div></div>
            <div className="ch-body" id="chat-body">{chat.map((m, i) => <div key={i} className={`ch-msg ${m.role}`}>{m.text}</div>)}</div>
            <div className="ch-sugg">{SUGGESTIONS.map((s) => <button key={s} className="sugg" onClick={() => send(s)}>{s}</button>)}</div>
            <form className="ch-input" onSubmit={(e) => { e.preventDefault(); send(input); }}>
              <input value={input} onChange={(e) => setInput(e.currentTarget.value)} placeholder="Apa yang ingin Anda selesaikan hari ini?" />
              <button type="submit" aria-label="Kirim">➤</button>
            </form>
          </div>
        </div>
      </header>

      <div className="trilogi">
        <div className="container">
          <div className="trilogi-label">TRILOGI GUSTAFTA<small>Filosofi &amp; Metodologi</small></div>
          {[["1", "Monolog → Dialog", "Pengetahuan menjadi percakapan"], ["2", "Dialog → Kolaborasi", "Percakapan menjadi kerja sama"], ["3", "Dialog → Kreasi", "Percakapan menjadi inovasi"]].map(([n, t, s]) => (
            <div className="tstage" key={n}><div className="tnum">{n}</div><div className="ttx"><strong>{t}</strong><span>{s}</span></div></div>
          ))}
        </div>
      </div>

      <section className="section" id="news">
        <div className="container">
          <div className="section-head left"><span className="eyebrow">Daily Engagement Engine</span><h2>Konstruksi AI News &amp; Industry Intelligence</h2><p>Portal berita harian. Setiap artikel mengarahkan pada tindakan: <strong>Berita → Pengetahuan → Dialog → Solusi → Kolaborasi → Kreasi → Transaksi.</strong></p></div>
          <div className="channels-bar">{CHANNELS.map((c) => <button key={c} className={`ch-tab ${channel === c ? "active" : ""}`} onClick={() => setChannel(c)}>{c}</button>)}</div>
          <div className="news-grid">
            {filteredNews.map((n, i) => (
              <article className="n-card" key={i}>
                <div className="nc-thumb" style={{ background: `linear-gradient(135deg,${n.color},#081a33)` }}>{n.ico}</div>
                <div className="nc-body"><span className="nc-cat" style={{ color: n.color }}>{n.cat}</span><h4>{n.title}</h4><div className="nc-meta"><span>📅 {n.date}</span><span>⏱ {n.read}</span></div><div className="nc-sol">→ {n.sol}</div></div>
              </article>
            ))}
          </div>
          {filteredNews.length === 0 && <p style={{ textAlign: "center", color: "#7a8aa3", padding: "24px" }}>Belum ada berita untuk kanal ini.</p>}
        </div>
      </section>

      <section className="section alt" id="catalog">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Product Engine</span><h2>Katalog Aplikasi &amp; Produk Digital</h2><p>Semua layanan di bawah Konstruksi AI dengan akses, akun, dan pengalaman pengguna terpadu.</p></div>
          <div className="prod-tabs">{PROD_TABS.map((t) => <button key={t} className={`prod-tab ${prodTab === t ? "active" : ""}`} onClick={() => setProdTab(t)}>{t}</button>)}</div>
          <div className="prod-grid">
            {filteredProducts.map((p) => (
              <div className="prod" key={p.name}>
                <div className="pr-top"><div className="pr-ico">{p.ico}</div><span className={`pr-status ${p.status.toLowerCase()}`}>{p.status}</span></div>
                <h4>{p.name}</h4><p>{p.desc}</p>
                <div className="pr-foot"><span className="pr-tag">{p.tag}</span><span className="pr-cta">Buka →</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="pillars">
        <div className="container">
          <div className="section-head"><span className="eyebrow">8 Pilar Ekosistem</span><h2>Solusi Bisnis Terintegrasi</h2></div>
          <div className="pillars-grid">
            {[
              { a: "#2e7dd7", ico: "🧠", t: "AI Knowledge & Advisory", tri: "Monolog → Dialog", items: ["Asisten AI", "Klinik konsultasi", "Tanya jawab regulasi", "Bedah dokumen"] },
              { a: "#f5a623", ico: "🤝", t: "Business Collaboration", tri: "Dialog → Kolaborasi", items: ["Direktori ahli", "Mitra usaha", "Kolaborasi tender", "Komunitas"] },
              { a: "#0f9b8e", ico: "⚡", t: "AI Apps & Digital Tools", tri: "Dialog → Kreasi", items: ["AI document creator", "Proposal & tender", "Analisis teknis", "Mini apps"] },
              { a: "#6a4c93", ico: "📊", t: "Project Management", tri: "Siklus pekerjaan", items: ["Manajemen proyek", "Pengendalian biaya", "Dokumen proyek", "QA/QC"] },
              { a: "#c0392b", ico: "⚖", t: "Licensing & Compliance", tri: "Kesiapan bisnis", items: ["SBU & SKK", "Perizinan", "Dokumen tender", "LKPM & ISO"] },
              { a: "#1b9e5a", ico: "🦺", t: "HSE & Environment", tri: "Keselamatan", items: ["HSE management", "Safety Passport", "Risiko & bahaya", "Kepatuhan lingkungan"] },
              { a: "#d98a16", ico: "🎓", t: "Academy & Competency", tri: "Pengembangan SDM", items: ["Pelatihan & bimtek", "Microlearning", "LMS", "Sertifikasi"] },
              { a: "#12355b", ico: "🏭", t: "Industry Solutions", tri: "Solusi sektoral", items: ["Energi & listrik", "Pertambangan", "Teknologi lingkungan", "BIM & smart infra"] },
            ].map((p, i) => (
              <div className="pillar" key={i} style={{ ["--accent" as any]: p.a }}>
                <div className="p-ico">{p.ico}</div><h3>{p.t}</h3><div className="p-tri">{p.tri}</div>
                <ul>{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="market">
        <div className="container">
          <div className="section-head left"><span className="eyebrow">Business Engine</span><h2>Konsultasi, Kolaborasi &amp; Marketplace</h2></div>
          <div className="market-grid">
            <div className="dir-card">
              <div className="dc-head"><h4>👤 Direktori Tenaga Ahli</h4><span className="dc-count">1.240+ profesional</span></div>
              <div className="dc-body">{[["AS", "Andi Saputra, ST", "Sipil • SBU A", "#2e7dd7"], ["RH", "Rina Hartanti, MT", "Listrik • SKK", "#f5a623"], ["BP", "Budi Prakoso", "HSE • ISO 45001", "#0f9b8e"]].map(([ini, n, s, c]) => (
                <div className="dir-row" key={n}><div className="dir-av" style={{ background: c }}>{ini}</div><div className="dir-info"><strong>{n}</strong><span>{s}</span></div></div>
              ))}</div>
            </div>
            <div className="dir-card">
              <div className="dc-head"><h4>🏢 Direktori Bisnis</h4><span className="dc-count">560+ perusahaan</span></div>
              <div className="dc-body">{[["HK", "PT Hutama Karya", "Kontraktor BUMN", "#12355b"], ["MJ", "CV Mega Jaya", "Kontraktor UMKM", "#c0392b"], ["EL", "PT Energi Lestari", "Konsultan EBT", "#1b9e5a"]].map(([ini, n, s, c]) => (
                <div className="dir-row" key={n}><div className="dir-av" style={{ background: c }}>{ini}</div><div className="dir-info"><strong>{n}</strong><span>{s}</span></div></div>
              ))}</div>
            </div>
            <div className="tender-board">
              <div className="tb-head"><h4>📋 Tender Board</h4></div>
              {[["Pengadaan ETP & ZLD", "Rp 24,8 M", "22 Nov"], ["Renovasi Gardu 150kV", "Rp 18,2 M", "25 Nov"], ["Jembatan Kalikuto", "Rp 2,42 T", "30 Nov"]].map(([t, v, d]) => (
                <div className="tb-row" key={t}><div><strong>{t}</strong></div><div className="tb-val"><div className="v">{v}</div><div className="d">Tutup {d}</div></div></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="pricing">
        <div className="container">
          <div className="section-head"><span className="eyebrow">Paket Komersial</span><h2>Pilih Paket Sesuai Kebutuhan Anda</h2></div>
          <div className="price-grid">
            {[
              { tier: "Free", name: "Explorer", price: "Gratis", desc: "Untuk mengenal ekosistem.", items: ["Info & berita harian", "Aplikasi gratis", "AI terbatas"], feat: false },
              { tier: "Professional", name: "Individual", price: "Rp 199K/bln", desc: "Tenaga ahli & profesional.", items: ["Semua Explorer", "AI tools tanpa batas", "Fitur profesional", "Diskon pelatihan"], feat: true },
              { tier: "Business", name: "UMKM", price: "Rp 799K/bln", desc: "Kontraktor & konsultan.", items: ["Aplikasi bisnis lengkap", "Tender & compliance", "Dashboard perusahaan", "5 pengguna"], feat: false },
              { tier: "Enterprise", name: "Corporate", price: "Custom", desc: "Perusahaan besar.", items: ["Sistem khusus", "Integrasi & SSO", "Manajemen pengguna", "SLA prioritas"], feat: false },
            ].map((p) => (
              <div className={`price ${p.feat ? "featured" : ""}`} key={p.name}>
                <div className="ptier">{p.tier}</div><div className="pname">{p.name}</div><div className="pprice">{p.price}</div><div className="pdesc">{p.desc}</div>
                <ul>{p.items.map((i) => <li key={i}>{i}</li>)}</ul>
                <a href="#" className={`btn ${p.feat ? "btn-primary" : "btn-outline"}`}>Pilih</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container"><div className="f-bottom"><span>© 2026 Gustafta — Konstruksi AI. Informasi Setiap Hari. Solusi Setiap Saat. Kolaborasi untuk Masa Depan.</span></div></div>
      </footer>
    </div>
  );
}

const css = `
.kai{font-family:Inter,'Segoe UI',system-ui,sans-serif;color:#1a2740;background:#f5f7fa;line-height:1.6}
.kai *{box-sizing:border-box}
.kai h1,.kai h2,.kai h3,.kai h4{color:#0b1f3a;font-weight:800;margin:0}
.kai p{margin:0;color:#475569}.kai a{text-decoration:none;color:inherit}.kai ul{list-style:none;margin:0;padding:0}
.kai .container{max-width:1240px;margin:0 auto;padding:0 24px}
.kai .btn{display:inline-flex;align-items:center;gap:8px;font-weight:700;font-size:.9rem;padding:11px 20px;border-radius:9px;border:1.5px solid transparent;cursor:pointer}
.kai .btn-primary{background:linear-gradient(135deg,#f5a623,#d98a16);color:#081a33}
.kai .btn-ghost{background:rgba(255,255,255,.08);color:#fff;border-color:rgba(255,255,255,.28)}
.kai .btn-outline{border-color:#cdd6e2;color:#12355b;background:#fff}
.kai .btn-sm{padding:8px 14px;font-size:.84rem}
.kai .topbar{background:#081a33;color:#cdd9ec;font-size:.82rem;padding:7px 0}
.kai .topbar .container{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
.kai .tb-left,.kai .tb-right{display:flex;gap:14px;align-items:center}
.kai .dot-live{width:7px;height:7px;border-radius:50%;background:#41d97a;display:inline-block;margin-right:6px}
.kai .nav{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.95);backdrop-filter:blur(8px);border-bottom:1px solid #e1e6ed}
.kai .nav .container{display:flex;align-items:center;justify-content:space-between;height:64px;gap:14px}
.kai .brand{display:flex;align-items:center;gap:10px;font-weight:900;font-size:1.1rem;color:#0b1f3a}
.kai .brand .logo{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,#12355b,#2e7dd7);display:grid;place-items:center;color:#fff}
.kai .brand small{display:block;font-size:.6rem;color:#7a8aa3;letter-spacing:.14em;text-transform:uppercase}
.kai .nav-menu{display:flex;gap:4px;align-items:center}
.kai .nav-menu a{padding:8px 10px;border-radius:8px;font-size:.86rem;font-weight:600;color:#475569}
.kai .nav-menu a:hover{background:#eef2f7;color:#0b1f3a}
.kai .nav-actions{display:flex;gap:8px;align-items:center}
.kai .nav-toggle{display:none;flex-direction:column;gap:4px;background:none;border:none}
.kai .nav-toggle span{width:22px;height:2px;background:#0b1f3a}
.kai .hero{background:linear-gradient(160deg,#081a33,#0b1f3a 50%,#12355b);color:#fff;padding:56px 0 64px}
.kai .hero .container{display:grid;grid-template-columns:1.15fr .85fr;gap:40px;align-items:center}
.kai .hero-eyebrow{display:inline-block;background:rgba(245,166,35,.16);border:1px solid rgba(245,166,35,.4);color:#ffd27a;padding:6px 14px;border-radius:30px;font-size:.78rem;font-weight:700;margin-bottom:16px}
.kai .hero h1{color:#fff;font-size:clamp(1.9rem,4vw,3rem);margin-bottom:14px}
.kai .hero .grad{background:linear-gradient(120deg,#ffd27a,#f5a623);-webkit-background-clip:text;background-clip:text;color:transparent}
.kai .lead{color:#c5d3ea;font-size:1.05rem;margin-bottom:22px}
.kai .hero-cta{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:26px}
.kai .hero-stats{display:flex;gap:22px;flex-wrap:wrap;padding-top:20px;border-top:1px solid rgba(255,255,255,.12)}
.kai .hero-stat .num{font-size:1.4rem;font-weight:900;color:#fff}
.kai .hero-stat .lbl{font-size:.75rem;color:#9fb3d1}
.kai .concierge{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.16);border-radius:20px;padding:18px}
.kai .ch-head{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.kai .ai-orb{width:40px;height:40px;border-radius:10px;background:conic-gradient(from 180deg,#f5a623,#2e7dd7,#0f9b8e,#f5a623);display:grid;place-items:center}
.kai .ch-head strong{color:#fff;display:block}.kai .ch-head span{font-size:.75rem;color:#9fb3d1}
.kai .ch-body{background:rgba(8,26,51,.5);border-radius:12px;padding:14px;margin-bottom:10px;max-height:240px;overflow:auto}
.kai .ch-msg{font-size:.88rem;color:#dbe6f5;margin-bottom:8px}.kai .ch-msg.user{color:#ffd27a;font-style:italic}
.kai .ch-sugg{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}
.kai .sugg{font-size:.75rem;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);color:#dbe6f5;padding:5px 10px;border-radius:16px;cursor:pointer}
.kai .ch-input{display:flex;gap:8px;background:#fff;border-radius:10px;padding:5px 5px 5px 12px}
.kai .ch-input input{flex:1;border:none;outline:none;font-size:.9rem;color:#1a2740;background:transparent}
.kai .ch-input button{background:linear-gradient(135deg,#f5a623,#d98a16);color:#081a33;width:34px;height:34px;border-radius:8px;border:none;font-weight:800;cursor:pointer}
.kai .trilogi{background:linear-gradient(135deg,#0b1f3a,#12355b);color:#fff;padding:28px 0}
.kai .trilogi .container{display:grid;grid-template-columns:auto 1fr 1fr 1fr;gap:20px;align-items:center}
.kai .trilogi-label{font-weight:900}.kai .trilogi-label small{display:block;font-size:.7rem;color:#9fb3d1}
.kai .tstage{display:flex;gap:10px;align-items:center}.kai .tnum{width:34px;height:34px;border-radius:50%;border:2px solid #f5a623;color:#f5a623;display:grid;place-items:center;font-weight:800}
.kai .ttx strong{display:block;color:#fff;font-size:.9rem}.kai .ttx span{font-size:.76rem;color:#9fb3d1}
.kai .section{padding:64px 0}.kai .section.alt{background:#eef2f7}
.kai .section-head{max-width:760px;margin:0 auto 36px;text-align:center}.kai .section-head.left{text-align:left;margin-left:0}
.kai .section-head .eyebrow{font-size:.76rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#d98a16}
.kai .section-head h2{margin:8px 0 10px}
.kai .channels-bar,.kai .prod-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px}
.kai .ch-tab,.kai .prod-tab{padding:8px 14px;border-radius:20px;font-size:.83rem;font-weight:700;background:#fff;border:1px solid #e1e6ed;color:#475569;cursor:pointer}
.kai .ch-tab.active,.kai .prod-tab.active{background:#0b1f3a;color:#fff;border-color:#0b1f3a}
.kai .news-grid,.kai .prod-grid,.kai .pillars-grid,.kai .price-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.kai .n-card,.kai .prod,.kai .pillar,.kai .price,.kai .dir-card,.kai .tender-board{background:#fff;border:1px solid #e1e6ed;border-radius:14px;overflow:hidden}
.kai .nc-thumb{height:120px;display:grid;place-items:center;color:#fff;font-size:1.5rem}
.kai .nc-body{padding:14px}
.kai .nc-cat{font-size:.7rem;font-weight:800;text-transform:uppercase}
.kai .n-card h4{font-size:.94rem;margin:6px 0 8px}
.kai .nc-meta{font-size:.73rem;color:#7a8aa3;display:flex;gap:10px}
.kai .nc-sol{font-size:.72rem;font-weight:700;color:#2e7dd7;margin-top:8px;padding-top:8px;border-top:1px dashed #e1e6ed}
.kai .prod{padding:14px}
.kai .pr-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.kai .pr-ico{width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#1c4a7c,#2e7dd7);display:grid;place-items:center}
.kai .pr-status{font-size:.64rem;font-weight:800;padding:3px 8px;border-radius:20px}
.kai .pr-status.live{background:rgba(27,158,90,.14);color:#137a45}.kai .pr-status.beta{background:rgba(245,166,35,.16);color:#d98a16}.kai .pr-status.proto{background:rgba(122,138,163,.18);color:#475569}
.kai .prod h4{font-size:.95rem;margin-bottom:6px}.kai .prod p{font-size:.8rem;margin-bottom:10px;min-height:36px}
.kai .pr-foot{display:flex;justify-content:space-between;font-size:.74rem;padding-top:8px;border-top:1px solid #eef2f7}
.kai .pr-tag{color:#2e7dd7;font-weight:700}
.kai .pillar{padding:18px}.kai .pillar .p-ico{width:42px;height:42px;border-radius:10px;background:var(--accent,#2e7dd7);display:grid;place-items:center;color:#fff;margin-bottom:10px}
.kai .pillar .p-tri{font-size:.72rem;color:var(--accent);font-weight:700;margin-bottom:8px}
.kai .pillar ul li{font-size:.8rem;color:#475569;padding-left:14px;position:relative;margin-bottom:4px}
.kai .pillar ul li::before{content:"▸";position:absolute;left:0;color:var(--accent)}
.kai .market-grid{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:16px}
.kai .dc-head,.kai .tb-head{padding:14px 16px;border-bottom:1px solid #e1e6ed;display:flex;justify-content:space-between;align-items:center}
.kai .tb-head{background:linear-gradient(135deg,#12355b,#2e7dd7);color:#fff}.kai .tb-head h4{color:#fff}
.kai .dc-body{padding:6px}
.kai .dir-row{display:flex;align-items:center;gap:10px;padding:10px;border-radius:8px}
.kai .dir-av{width:34px;height:34px;border-radius:8px;display:grid;place-items:center;color:#fff;font-weight:800;font-size:.8rem}
.kai .dir-info strong{display:block;font-size:.84rem;color:#0b1f3a}.kai .dir-info span{font-size:.74rem;color:#7a8aa3}
.kai .tb-row{padding:12px 16px;border-bottom:1px solid #eef2f7;display:flex;justify-content:space-between}
.kai .tb-row strong{font-size:.84rem;color:#0b1f3a}
.kai .tb-val .v{font-size:.84rem;font-weight:800;color:#137a45}.kai .tb-val .d{font-size:.72rem;color:#d98a16}
.kai .price{padding:22px;display:flex;flex-direction:column}.kai .price.featured{border-color:#f5a623}
.kai .ptier{font-size:.75rem;font-weight:800;text-transform:uppercase;color:#7a8aa3}.kai .pname{font-size:1.05rem;font-weight:800;color:#0b1f3a;margin:4px 0}
.kai .pprice{font-size:1.5rem;font-weight:900;color:#0b1f3a}.kai .pdesc{font-size:.82rem;margin:6px 0 14px}
.kai .price ul{flex:1;margin-bottom:16px}.kai .price ul li{font-size:.82rem;color:#475569;padding-left:18px;position:relative;margin-bottom:6px}
.kai .price ul li::before{content:"✓";position:absolute;left:0;color:#1b9e5a;font-weight:800}
.kai .price .btn{width:100%;justify-content:center}
.kai .footer{background:#081a33;color:#9fb3d1;padding:28px 0}
.kai .f-bottom{font-size:.8rem;text-align:center}
@media(max-width:1080px){.kai .hero .container{grid-template-columns:1fr}.kai .news-grid,.kai .prod-grid,.kai .pillars-grid,.kai .price-grid{grid-template-columns:repeat(2,1fr)}.kai .market-grid{grid-template-columns:1fr}.kai .trilogi .container{grid-template-columns:1fr 1fr}.kai .nav-menu{display:none}.kai .nav-toggle{display:flex}.kai .nav-menu.open{display:flex;flex-direction:column;position:absolute;top:64px;left:0;right:0;background:#fff;padding:12px;border-bottom:1px solid #e1e6ed}}
@media(max-width:640px){.kai .news-grid,.kai .prod-grid,.kai .pillars-grid,.kai .price-grid{grid-template-columns:1fr}.kai .trilogi .container{grid-template-columns:1fr}}
`;
