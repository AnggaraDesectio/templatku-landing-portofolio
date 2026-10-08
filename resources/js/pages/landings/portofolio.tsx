// Landing page portofolio RIZKY PRATAMA, web developer freelance (persona fiktif).
// Halaman ini TIDAK memakai AuthenticatedLayout, header/nav + footer inline, self-contained.
// Tidak menerima props.
import { useState, type FormEvent } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StickyMobileCta } from '@/components/sticky-mobile-cta';
import { StatCounter } from '@/components/stat-counter';
import {
    ArrowRight,
    ArrowUpRight,
    Award,
    CheckCircle2,
    Code2,
    ExternalLink,
    Globe,
    Mail,
    MapPin,
    Menu,
    Quote,
    Star,
    X,
} from 'lucide-react';

// Format rupiah gaya Indonesia: 8500000 -> "Rp8.500.000"
const rupiah = (n: number) => `Rp${n.toLocaleString('id-ID')}`;

// ---------- Data ----------

interface Proyek {
    nama: string;
    deskripsi: string;
    tech: string[];
    foto: string;
}

const KARYA: Proyek[] = [
    { nama: 'SiskaPOS, Kasir Cloud', deskripsi: 'Aplikasi kasir multi-cabang dengan laporan real-time untuk 40+ toko ritel.', tech: ['Laravel', 'React', 'MySQL'], foto: '/images/landing-portofolio/karya-pos.jpg' },
    { nama: 'EduLearn Platform', deskripsi: 'Platform kursus online dengan video, kuis, dan sertifikat otomatis.', tech: ['Next.js', 'PostgreSQL'], foto: '/images/landing-portofolio/karya-edulearn.jpg' },
    { nama: 'TravelNusa Booking', deskripsi: 'Website booking paket wisata dengan pembayaran Midtrans & itinerary PDF.', tech: ['Laravel', 'Inertia', 'React'], foto: '/images/landing-portofolio/karya-travel.jpg' },
    { nama: 'KlinikSehat App', deskripsi: 'Sistem antrian & rekam medis sederhana untuk klinik pratama.', tech: ['Flutter', 'Firebase'], foto: '/images/landing-portofolio/karya-klinik.jpg' },
    { nama: 'Arsip Digital Desa', deskripsi: 'Sistem surat-menyurat dan arsip untuk 12 desa di Jawa Timur.', tech: ['Laravel', 'Filament'], foto: '/images/landing-portofolio/karya-arsip.jpg' },
    { nama: 'API Katalog Properti', deskripsi: 'REST API + dashboard admin untuk agregator listing properti.', tech: ['Laravel', 'Redis'], foto: '/images/landing-portofolio/karya-api.jpg' },
];

const SKILLS = [
    { nama: 'Laravel / PHP', level: 95 },
    { nama: 'React / Next.js', level: 88 },
    { nama: 'Tailwind CSS', level: 92 },
    { nama: 'MySQL / PostgreSQL', level: 85 },
    { nama: 'Flutter (Dasar–Menengah)', level: 70 },
    { nama: 'Docker & Deployment VPS', level: 80 },
];

const PENGALAMAN = [
    { periode: '2023, Sekarang', peran: 'Freelance Web Developer', tempat: 'Mandiri / Remote', deskripsi: 'Mengerjakan 30+ proyek untuk klien UMKM, startup, dan instansi, dari company profile sampai sistem informasi.' },
    { periode: '2021, 2023', peran: 'Full-Stack Developer', tempat: 'PT Solusi Digital Nusantara, Jakarta', deskripsi: 'Memimpin pengembangan modul billing & reporting pada ERP internal yang dipakai 200+ karyawan.' },
    { periode: '2019, 2021', peran: 'Frontend Developer', tempat: 'Studio Kreatif Arunika, Bandung', deskripsi: 'Membangun 15+ website company profile dan landing page untuk klien agensi.' },
    { periode: '2018, 2019', peran: 'IT Support & Web Admin', tempat: 'Koperasi Maju Bersama, Surabaya', deskripsi: 'Mengelola website dan sistem informasi simpan pinjam koperasi.' },
];

const LAYANAN_TARIF = [
    { nama: 'Landing Page', harga: 'Rp2,5 jt', durasi: 'mulai dari', deskripsi: '1–3 halaman, copywriting dibantu, SEO dasar, siap dalam 7 hari.' },
    { nama: 'Company Profile', harga: 'Rp5 jt', durasi: 'mulai dari', deskripsi: '5–10 halaman, CMS untuk update konten mandiri, siap dalam 14 hari.' },
    { nama: 'Web App / Sistem', harga: 'Rp12 jt', durasi: 'mulai dari', deskripsi: 'Dashboard, login multi-role, laporan, scope disesuaikan kebutuhan.' },
    { nama: 'Maintenance', harga: 'Rp750 rb', durasi: '/bulan', deskripsi: 'Update keamanan, backup, dan perbaikan bug prioritas.' },
];

const FAQ = [
    {
        q: 'Bagaimana sistem pembayarannya?',
        a: 'DP 50% di awal, pelunasan setelah website live dan kamu setuju dengan hasilnya. Untuk proyek di atas Rp20 juta, pembayaran bisa dibagi 3 termin.',
    },
    {
        q: 'Berapa lama pengerjaan proyek?',
        a: 'Landing page 5–7 hari, company profile 10–14 hari, web app/sistem 1–3 bulan tergantung kompleksitas. Timeline pasti tertulis di kontrak kerja.',
    },
    {
        q: 'Apakah saya dapat source code-nya?',
        a: 'Ya, 100%. Setelah pelunasan, seluruh source code, dokumentasi setup, dan akses server diserahkan kepadamu. Tanpa lock-in.',
    },
    {
        q: 'Apakah ada garansi setelah serah terima?',
        a: 'Ada garansi bug 30 hari gratis. Setelah itu kamu bisa ambil paket maintenance bulanan atau bayar per perbaikan.',
    },
];

// ---------- Halaman ----------

export default function PortofolioLanding() {
    const [menuBuka, setMenuBuka] = useState(false);

    // Form hire, tanpa backend, hanya state konfirmasi.
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [jenisProyek, setJenisProyek] = useState('Landing Page');
    const [detail, setDetail] = useState('');
    const [hireOk, setHireOk] = useState(false);

    function kirimHire(e: FormEvent) {
        e.preventDefault();
        if (!nama.trim() || !email.trim()) return;
        setHireOk(true);
    }

    const scrollKe = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    const navLinks = [
        { href: '#beranda', label: 'Beranda' },
        { href: '#karya', label: 'Karya' },
        { href: '#skill', label: 'Skill' },
        { href: '#pengalaman', label: 'Pengalaman' },
        { href: '#tarif', label: 'Tarif' },
    ];

    return (
        <div className="min-h-screen bg-[#f7f9f9] pb-24 text-slate-900 md:pb-0">
            {/* Navbar */}
            <header className="sticky top-0 z-40 border-b border-teal-900/10 bg-white/95 backdrop-blur">
                <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
                    <a href="#beranda" className="flex items-center gap-2.5">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 font-extrabold text-white">R</span>
                        <span className="text-xl font-extrabold tracking-tight">
                            RIZKY<span className="text-teal-600">.DEV</span>
                        </span>
                    </a>
                    <nav className="ml-8 hidden items-center gap-1 md:flex">
                        {navLinks.map((l) => (
                            <a key={l.href} href={l.href} className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-teal-600/5 hover:text-slate-900">
                                {l.label}
                            </a>
                        ))}
                    </nav>
                    <Button className="ml-auto hidden bg-teal-600 hover:bg-teal-700 sm:inline-flex" onClick={() => scrollKe('hire')}>
                        Hire Saya <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="ml-auto sm:hidden" onClick={() => setMenuBuka((v) => !v)} aria-label="Menu">
                        {menuBuka ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
                {menuBuka && (
                    <nav className="border-t border-teal-900/10 px-4 py-2 md:hidden">
                        {navLinks.map((l) => (
                            <a key={l.href} href={l.href} onClick={() => setMenuBuka(false)} className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-teal-600/5">
                                {l.label}
                            </a>
                        ))}
                    </nav>
                )}
            </header>

            {/* Hero */}
            <section id="beranda" className="relative overflow-hidden">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 85% 15%, rgba(13,148,136,.12) 0, transparent 40%), radial-gradient(circle at 10% 80%, rgba(13,148,136,.08) 0, transparent 40%)' }} aria-hidden />
                <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:py-20 lg:grid-cols-[1.2fr_1fr]">
                    <div>
                        <Badge variant="outline" className="border-teal-700/30 text-teal-700">
                            <span className="mr-1.5 inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" /> Tersedia untuk proyek baru
                        </Badge>
                        <h1 className="font-display mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                            Web developer yang menyerahkan <span className="text-teal-600">source code 100%</span>, tanpa lock-in.
                        </h1>
                        <p className="mt-4 max-w-md text-slate-600">
                            Halo, saya Rizky Pratama. 8 tahun membangun website dan web app untuk UMKM, startup,
                            dan instansi. Spesialis Laravel + React: cepat, rapi, dan gampang dirawat.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center gap-4">
                            <Button size="lg" className="bg-teal-600 hover:bg-teal-700" onClick={() => scrollKe('hire')}>
                                Hire Saya
                            </Button>
                            <button onClick={() => scrollKe('karya')} className="text-sm font-semibold text-slate-600 underline decoration-teal-500 decoration-2 underline-offset-4 hover:text-slate-900">
                                Lihat 6 karya pilihan
                            </button>
                        </div>
                        <div className="mt-6 flex gap-4 text-slate-500">
                            <a href="#karya" aria-label="Portofolio karya" className="transition-colors hover:text-teal-600"><Globe className="h-5 w-5" /></a>
                            <a href="mailto:halo@rizky.dev" aria-label="Kirim email" className="transition-colors hover:text-teal-600"><Mail className="h-5 w-5" /></a>
                        </div>
                    </div>
                    <Card className="border-teal-900/10 shadow-lg">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-700 text-2xl font-extrabold text-white">RP</span>
                                <div>
                                    <p className="text-lg font-extrabold">Rizky Pratama</p>
                                    <p className="flex items-center gap-1 text-sm text-slate-500"><MapPin className="h-3.5 w-3.5" /> Surabaya, Indonesia</p>
                                    <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700"><Code2 className="h-3 w-3" /> Full-Stack Developer</p>
                                </div>
                            </div>
                            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                                {[
                                    { nilai: 8, suffix: ' thn', label: 'Pengalaman' },
                                    { nilai: 45, suffix: '+', label: 'Proyek' },
                                    { nilai: 32, suffix: '', label: 'Klien puas' },
                                ].map((s) => (
                                    <div key={s.label} className="rounded-xl bg-slate-50 p-3">
                                        <p className="tnum text-xl font-extrabold text-teal-700"><StatCounter value={s.nilai} suffix={s.suffix} /></p>
                                        <p className="text-[11px] text-slate-500">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-50 p-3 text-xs text-amber-800">
                                <Award className="h-4 w-4 shrink-0" /> Top Rated Freelancer, 4.9/5 dari 32 ulasan klien
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Karya */}
            <section id="karya" className="scroll-mt-16 bg-white py-14">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-700">Karya Pilihan</p>
                            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Proyek yang pernah saya kerjakan</h2>
                        </div>
                        <p className="max-w-sm text-sm text-slate-500">Setiap proyek live dan dipakai harian oleh pemiliknya, bukan sekadar mockup.</p>
                    </div>
                    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {KARYA.map((k) => (
                            <Card key={k.nama} className="group overflow-hidden transition-shadow hover:shadow-lg">
                                <div className="relative h-40 overflow-hidden">
                                    <img src={k.foto} alt={k.nama} className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden />
                                    <span className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                                        <ExternalLink className="h-4 w-4 text-white" />
                                    </span>
                                </div>
                                <CardContent className="p-5">
                                    <p className="flex items-center gap-1 font-bold">{k.nama} <ArrowUpRight className="h-4 w-4 text-teal-600" /></p>
                                    <p className="mt-1 text-sm text-slate-600">{k.deskripsi}</p>
                                    <div className="mt-3 flex flex-wrap gap-1.5">
                                        {k.tech.map((t) => (
                                            <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skill bars */}
            <section id="skill" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-14">
                <div className="grid gap-10 lg:grid-cols-2">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-700">Keahlian</p>
                        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Skill & tools</h2>
                        <p className="mt-2 text-slate-600">
                            Stack utama saya Laravel + React, kombinasi yang terbukti stabil untuk web app bisnis.
                            Saya juga nyaman dengan deployment VPS (Nginx, Docker) sampai website-mu live.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {['PHP', 'TypeScript', 'REST API', 'Inertia.js', 'Filament', 'Redis', 'Git', 'Linux VPS'].map((t) => (
                                <Badge key={t} variant="outline" className="border-teal-700/20">{t}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        {SKILLS.map((s) => (
                            <div key={s.nama}>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-semibold">{s.nama}</span>
                                    <span className="tnum text-slate-500">{s.level}%</span>
                                </div>
                                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-slate-200">
                                    <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-600" style={{ width: `${s.level}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pengalaman timeline */}
            <section id="pengalaman" className="scroll-mt-16 bg-slate-950 py-14 text-white">
                <div className="mx-auto max-w-3xl px-4">
                    <div className="text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-300">Perjalanan Karier</p>
                        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Pengalaman kerja</h2>
                    </div>
                    <div className="relative mt-10 space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-px before:bg-white/15">
                        {PENGALAMAN.map((p) => (
                            <div key={p.periode} className="relative pl-10">
                                <span className="absolute top-1 left-0 h-4 w-4 rounded-full border-2 border-teal-400 bg-slate-950" />
                                <p className="text-xs font-bold tracking-wide text-teal-300 uppercase">{p.periode}</p>
                                <p className="mt-1 text-lg font-bold">{p.peran}</p>
                                <p className="text-sm text-stone-400">{p.tempat}</p>
                                <p className="mt-2 text-sm text-stone-300">{p.deskripsi}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Layanan + tarif */}
            <section id="tarif" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-14">
                <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-700">Layanan & Tarif</p>
                    <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Harga transparan di depan</h2>
                    <p className="mx-auto mt-2 max-w-lg text-slate-600">Tidak ada biaya siluman. Scope dan timeline tertulis jelas di kontrak kerja.</p>
                </div>
                <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {LAYANAN_TARIF.map((l) => (
                        <Card key={l.nama} className="flex flex-col transition-shadow hover:shadow-md">
                            <CardContent className="flex flex-1 flex-col p-5">
                                <p className="font-bold">{l.nama}</p>
                                <p className="mt-2">
                                    <span className="text-xs text-slate-500">{l.durasi}</span><br />
                                    <span className="tnum text-2xl font-extrabold text-teal-700">{l.harga}</span>
                                </p>
                                <p className="mt-2 flex-1 text-sm text-slate-600">{l.deskripsi}</p>
                                <Button variant="outline" className="mt-4 w-full border-teal-700/30 hover:bg-teal-50" onClick={() => scrollKe('hire')}>
                                    Pilih
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Form hire + testimoni klien teratribusi */}
            <section id="hire" className="scroll-mt-16 bg-gradient-to-br from-teal-700 via-teal-800 to-emerald-900 py-14 text-white">
                <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 lg:grid-cols-2">
                    <div>
                        <h2 className="font-display text-3xl font-extrabold tracking-tight">Punya proyek? Mari diskusi.</h2>
                        <p className="mt-2 max-w-md text-sm text-teal-100">
                            Ceritakan kebutuhanmu lewat form ini. Saya balas maksimal 1x24 jam dengan estimasi
                            biaya dan timeline, gratis, tanpa komitmen.
                        </p>
                        <blockquote className="mt-6 max-w-md rounded-2xl bg-white/10 p-5 backdrop-blur">
                            <Quote className="h-6 w-6 text-emerald-300" />
                            <div className="mt-2 flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className="h-4 w-4 fill-amber-300 text-amber-300" />
                                ))}
                            </div>
                            <p className="mt-2 text-sm italic text-teal-50">
                                "Rizky menyelesaikan sistem kasir 40 toko kami 2 minggu lebih cepat dari janji.
                                Laporannya akurat, dan kalau ada bug selalu direspons di hari yang sama."
                            </p>
                            <footer className="mt-2 text-xs text-teal-200">
                                <span className="font-semibold text-white">Bambang Sutrisno</span>, pemilik jaringan ritel SiskaPOS, Surabaya
                            </footer>
                        </blockquote>
                        <ul className="mt-5 space-y-2 text-sm">
                            {['Kontrak kerja & invoice resmi', 'Source code 100% milikmu', 'Garansi bug 30 hari'].map((x) => (
                                <li key={x} className="flex items-start gap-2 text-teal-50">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> {x}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Card>
                        <CardContent className="p-6">
                            {hireOk ? (
                                <div className="rounded-xl bg-green-50 p-6 text-center">
                                    <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
                                    <p className="mt-3 text-lg font-bold text-green-800">Pesan terkirim!</p>
                                    <p className="mt-1 text-sm text-green-700">
                                        Terima kasih, <span className="font-semibold">{nama}</span>. Saya akan menghubungimu
                                        di {email} maksimal 1x24 jam dengan estimasi untuk proyek {jenisProyek}.
                                    </p>
                                    <Button variant="outline" className="mt-4" onClick={() => { setHireOk(false); setNama(''); setEmail(''); setDetail(''); }}>
                                        Kirim proyek lain
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={kirimHire} className="space-y-4">
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-1.5">
                                            <Label htmlFor="rp-nama">Nama</Label>
                                            <Input id="rp-nama" placeholder="Nama kamu" value={nama} onChange={(e) => setNama(e.target.value)} required />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Label htmlFor="rp-email">Email</Label>
                                            <Input id="rp-email" type="email" placeholder="nama@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="rp-jenis">Jenis proyek</Label>
                                        <Select value={jenisProyek} onValueChange={setJenisProyek}>
                                            <SelectTrigger id="rp-jenis">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {['Landing Page', 'Company Profile', 'Web App / Sistem', 'Maintenance', 'Lainnya'].map((j) => (
                                                    <SelectItem key={j} value={j}>{j}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="rp-detail">Detail kebutuhan</Label>
                                        <Textarea id="rp-detail" rows={4} placeholder="Ceritakan websitemu: untuk apa, fitur apa saja yang dibutuhkan, dan target waktunya..." value={detail} onChange={(e) => setDetail(e.target.value)} />
                                    </div>
                                    <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">Kirim & Minta Estimasi</Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="mx-auto max-w-3xl px-4 py-14">
                <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-700">FAQ</p>
                    <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight">Sering ditanyakan</h2>
                </div>
                <Accordion type="single" collapsible className="mt-8">
                    {FAQ.map((f, i) => (
                        <AccordionItem key={i} value={`item-${i}`}>
                            <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                            <AccordionContent className="text-slate-600">{f.a}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 text-slate-400">
                <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
                    <div>
                        <div className="flex items-center gap-2.5">
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 font-extrabold text-white">R</span>
                            <span className="text-lg font-extrabold text-white">RIZKY<span className="text-teal-400">.DEV</span></span>
                        </div>
                        <p className="mt-3 text-sm">Web developer freelance, Laravel, React, dan segala yang bikin website bekerja.</p>
                    </div>
                    <div>
                        <p className="font-semibold text-white">Navigasi</p>
                        <ul className="mt-3 space-y-1.5 text-sm">
                            <li><a href="#karya" className="hover:text-teal-300">Karya</a></li>
                            <li><a href="#skill" className="hover:text-teal-300">Skill</a></li>
                            <li><a href="#tarif" className="hover:text-teal-300">Tarif</a></li>
                        </ul>
                    </div>
                    <div>
                        <p className="font-semibold text-white">Kontak</p>
                        <ul className="mt-3 space-y-1.5 text-sm">
                            <li><a href="mailto:halo@rizky.dev" className="hover:text-teal-300">halo@rizky.dev</a></li>
                            <li>Surabaya, Indonesia</li>
                            <li>Respons &lt; 24 jam</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800 py-4 text-center text-xs">© 2026 Rizky Pratama. Dibangun dengan kopi dan TypeScript.</div>
            </footer>

            {/* CTA sticky mobile */}
            <StickyMobileCta
                variant="whatsapp"
                title="Rizky Pratama"
                subtitle="Web Developer freelance"
                actionLabel="Hire Saya"
                onAction={() => document.getElementById('hire')?.scrollIntoView({ behavior: 'smooth' })}
            />
        </div>
    );
}
