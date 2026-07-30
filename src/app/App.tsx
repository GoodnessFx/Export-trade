import { useState, useEffect } from "react";
import {
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  ChevronRight,
  Ship,
  Warehouse,
  FileText,
  Shield,
  Globe,
  TrendingUp,
  Users,
  Award,
  MessageCircle,
  Package,
  Truck,
  Star,
  Search,
  Landmark,
  FileSignature,
  GraduationCap,
  BookOpen,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Page =
  | "home"
  | "about"
  | "products"
  | "product-detail"
  | "services"
  | "mentorship-training"
  | "quote"
  | "supplier"
  | "compliance"
  | "contact";

type ProductType = {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  description: string;
  category: string;
  items: string[];
  moq: string;
  packaging: string;
  specs: string;
};



type TrainingMediaItem = {
  type: "image" | "video";
  src: string;
  alt: string;
  title: string;
  poster?: string;
};

// ─── Images ──────────────────────────────────────────────────────────────────
const IMG = {
  hero: "https://images.unsplash.com/photo-1713388259485-5fb8454d16cf?w=1800&h=900&fit=crop&auto=format",
  containers: "https://images.unsplash.com/photo-1519213887655-a4f199e3015b?w=1400&h=800&fit=crop&auto=format",
  cargoShip: "https://images.unsplash.com/photo-1606185540834-d6e7483ee1a4?w=1200&h=700&fit=crop&auto=format",
  cargoShip2: "https://images.unsplash.com/photo-1585713181935-d5f622cc2415?w=1200&h=700&fit=crop&auto=format",
  warehouse: "https://images.unsplash.com/photo-1551356522-1237fe9fdb26?w=900&h=600&fit=crop&auto=format",
  beans: "https://images.unsplash.com/photo-1493925410384-84f842e616fb?w=700&h=700&fit=crop&auto=format",
  seeds: "https://images.unsplash.com/photo-1507576164121-220762647800?w=700&h=700&fit=crop&auto=format",
  stones: "https://images.unsplash.com/photo-1545567724-9b16e57c906d?w=700&h=700&fit=crop&auto=format",
  palm: "https://images.unsplash.com/photo-1671208615878-c074b4bf08dc?w=700&h=700&fit=crop&auto=format",
  meeting: "https://images.unsplash.com/photo-1650499310282-cda4d957f5be?w=1200&h=800&fit=crop&auto=format",
  handshake: "https://images.unsplash.com/photo-1638262052640-82e94d64664a?w=1000&h=700&fit=crop&auto=format",
  businessMeeting2: "https://images.unsplash.com/photo-1672380135241-c024f7fbfa13?w=900&h=600&fit=crop&auto=format",
  logo: "/export-trade-logo.jpeg",
  ceoPortrait: "/CEO.jpeg",
  ceoTeaching: "/CEO TEACHING.jpeg",
  ceoConference: "/CEO AT TRAINING CONFERENCE.jpeg",
  ceoTraining1: "/CEO TRAINING.jpeg",
  ceoTraining2: "/CEO TRAINING 02.jpeg",
  ceoTraining3: "/CEO TRAINING 03.jpeg",
  ceoTraining4: "/CEO TRAINING 04.jpeg",
};

// ─── Product Data ─────────────────────────────────────────────────────────────
const PRODUCTS: ProductType[] = [
  {
    id: "agricultural",
    name: "Agricultural Commodities",
    image: IMG.beans,
    imageAlt: "Dried beans and agricultural commodities ready for export",
    description:
      "Sesame, cashew nuts, cocoa beans, hibiscus, and soya beans sourced directly from verified Nigerian farmers and cooperatives.",
    category: "Export",
    items: ["Sesame Seeds", "Raw Cashew Nuts", "Cocoa Beans", "Dried Hibiscus", "Soya Beans"],
    moq: "20MT per shipment",
    packaging: "Jute bags, PP bags, or bulk to buyer specification",
    specs: "Grade A, moisture content below 8%, sorted and cleaned to buyer specifications. Third-party inspection available.",
  },
  {
    id: "minerals",
    name: "Solid Minerals",
    image: IMG.stones,
    imageAlt: "Solid mineral ore samples for export",
    description:
      "Talc, zinc ore, lead ore, feldspar, and kaolin — verified solid minerals with full export permits and laboratory certification.",
    category: "Export",
    items: ["Talc", "Zinc Ore", "Lead Ore", "Feldspar", "Kaolin"],
    moq: "50MT per shipment",
    packaging: "Bulk or bagged to specification",
    specs:
      "Purity certificates provided, verified by independent laboratory. Export permits arranged through MMSD.",
  },
  {
    id: "palm",
    name: "Palm Products",
    image: IMG.palm,
    imageAlt: "Palm plantation in Nigeria",
    description:
      "Crude palm oil, refined palm oil, and palm kernel oil processed to international food-grade standards from Nigerian mills.",
    category: "Export",
    items: ["Crude Palm Oil (CPO)", "Refined Palm Oil", "Palm Kernel Oil", "Palm Kernel Cake"],
    moq: "20MT per shipment",
    packaging: "ISO tanks, flexi-tanks, or 200-litre drums",
    specs: "FFA below 5%, moisture below 0.25%. RSPO-aligned sourcing available on request.",
  },
  {
    id: "consumer",
    name: "Consumer & Industrial Goods",
    image: IMG.warehouse,
    imageAlt: "Warehouse with consumer and industrial goods",
    description:
      "Import and distribution of electronics, machinery, building materials, and fast-moving consumer goods into Nigeria.",
    category: "Import",
    items: ["Electronics & Appliances", "Building Materials", "Machinery & Equipment", "FMCG Products"],
    moq: "One full container load (20ft or 40ft)",
    packaging: "Original manufacturer packaging",
    specs: "SON compliance where applicable. Customs cleared and fully documented upon delivery.",
  },
];

const NAV_LINKS: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "About", page: "about" },
  { label: "Products", page: "products" },
  { label: "Services", page: "services" },
  { label: "Training", page: "mentorship-training" },
  { label: "Trust & Compliance", page: "compliance" },
  { label: "Contact", page: "contact" },
];



const TRAINING_MEDIA: TrainingMediaItem[] = [
  {
    type: "image",
    src: IMG.ceoTeaching,
    alt: "CEO delivering an export trade training session",
    title: "Live practical trade session",
  },
  {
    type: "image",
    src: IMG.ceoConference,
    alt: "CEO presenting trade materials during a mentorship conference",
    title: "Conference mentorship session",
  },
  {
    type: "image",
    src: IMG.ceoTraining1,
    alt: "CEO teaching with export product examples on screen",
    title: "Commodity export walkthrough",
  },
  {
    type: "image",
    src: IMG.ceoTraining2,
    alt: "CEO speaking during a hands-on training class",
    title: "In-room coaching",
  },
  {
    type: "image",
    src: IMG.ceoTraining3,
    alt: "CEO leading a practical mentoring session",
    title: "Mentorship in action",
  },
  {
    type: "image",
    src: IMG.ceoTraining4,
    alt: "CEO addressing participants during an international trade training",
    title: "Structured team training",
  },
];

// ─── Shared: Field ─────────────────────────────────────────────────────────────
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#0A1628] uppercase tracking-wide mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

// ─── Section Label ─────────────────────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-6 h-px bg-[#C97B2A]" />
      <span className="text-[#C97B2A] text-xs font-semibold tracking-[0.18em] uppercase">
        {text}
      </span>
    </div>
  );
}

// ─── Inner Page Hero ──────────────────────────────────────────────────────────
function PageHero({
  label,
  title,
  image,
  imageAlt,
  short = false,
}: {
  label: string;
  title: string;
  image?: string;
  imageAlt?: string;
  short?: boolean;
}) {
  return (
    <section
      className={`relative flex items-end bg-[#0A1628] overflow-hidden ${
        short ? "h-48" : "h-64 sm:h-80"
      }`}
    >
      {image && (
        <img
          src={image}
          alt={imageAlt || ""}
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/50 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-10 sm:pb-12 w-full">
        <SectionLabel text={label} />
        <h1 className="font-display text-white text-4xl sm:text-5xl font-bold">{title}</h1>
      </div>
    </section>
  );
}

function BrandLogo({ variant = "nav" }: { variant?: "nav" | "footer" }) {
  const isNav = variant === "nav";

  return (
    <div
      className={`inline-flex items-center gap-3 rounded-sm ${
        isNav ? "py-1.5" : "py-2"
      }`}
    >
      <img
        src={IMG.logo}
        alt="Export Trade Africa"
        className={isNav ? "h-10 sm:h-12 w-auto mix-blend-screen" : "h-14 sm:h-16 w-auto mix-blend-screen"}
      />
      <span className={`font-display font-bold tracking-tight ${isNav ? "text-lg text-white" : "text-xl text-white"}`}>
        Export Trade Africa
      </span>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({
  currentPage,
  navigate,
}: {
  currentPage: Page;
  navigate: (p: Page) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => {
            navigate("home");
            setOpen(false);
          }}
          className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded-sm"
          aria-label="Go to home page"
        >
          <BrandLogo variant="nav" />
        </button>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.page}
              onClick={() => navigate(link.page)}
              className={`text-[13px] xl:text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded-sm px-1 py-0.5 ${
                currentPage === link.page
                  ? "text-[#C97B2A]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:block">
          <button
            onClick={() => navigate("quote")}
            className="bg-[#C97B2A] text-white text-sm font-semibold px-5 py-2 rounded hover:bg-[#b06820] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            Request a Quote
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#060E1C] border-t border-white/10 px-4 py-3 flex flex-col gap-0.5">
          {NAV_LINKS.map((link) => (
            <button
              key={link.page}
              onClick={() => {
                navigate(link.page);
                setOpen(false);
              }}
              className={`text-left px-3 py-2.5 rounded text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] ${
                currentPage === link.page
                  ? "text-[#C97B2A] bg-white/5"
                  : "text-white/75 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              navigate("quote");
              setOpen(false);
            }}
            className="mt-2 bg-[#C97B2A] text-white text-sm font-semibold px-4 py-2.5 rounded hover:bg-[#b06820] transition-colors text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            Request a Quote
          </button>
        </div>
      )}
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <footer className="bg-[#060E1C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="mb-4">
              <button
                onClick={() => navigate("home")}
                className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded-sm"
                aria-label="Go to home page"
              >
                <BrandLogo variant="footer" />
              </button>
            </div>
            <p className="text-white/55 text-sm leading-relaxed mb-5">
              Import, export and trading company based in Lekki, Lagos, Nigeria.
              Connecting verified African goods to global markets since 2014.
            </p>
            <div className="flex items-center gap-2">
              <span className="bg-white/10 text-white/60 text-xs px-2.5 py-1 rounded-sm font-medium">
                CAC Reg.
              </span>
              <span className="bg-white/10 text-white/60 text-xs px-2.5 py-1 rounded-sm font-medium">
                NEPC Cert.
              </span>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-white/35 tracking-[0.15em] uppercase mb-4">
              Quick Links
            </div>
            <nav className="flex flex-col gap-2">
              {[
                { label: "Home", page: "home" as Page },
                { label: "About Us", page: "about" as Page },
                { label: "Products", page: "products" as Page },
                { label: "Services", page: "services" as Page },
                { label: "Mentorship & Training", page: "mentorship-training" as Page },
                { label: "Trust & Compliance", page: "compliance" as Page },
                { label: "Contact", page: "contact" as Page },
              ].map((link) => (
                <button
                  key={link.page}
                  onClick={() => navigate(link.page)}
                  className="text-white/55 hover:text-[#C97B2A] text-sm text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded-sm"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <div className="text-xs font-semibold text-white/35 tracking-[0.15em] uppercase mb-4">
              Services
            </div>
            <div className="flex flex-col gap-2">
              {[
                "Export Services",
                "Import Services",
                "Sourcing & Procurement",
                "Warehousing & Logistics",
                "Export Finance",
                "International Contracts",
                "Mentorship",
                "Training",
              ].map((s) => (
                <button
                  key={s}
                  onClick={() => navigate("services")}
                  className="text-white/55 hover:text-[#C97B2A] text-sm text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded-sm"
                >
                  {s}
                </button>
              ))}
              <button
                onClick={() => navigate("quote")}
                className="text-white/55 hover:text-[#C97B2A] text-sm text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded-sm"
              >
                Get a Quote
              </button>
              <button
                onClick={() => navigate("supplier")}
                className="text-white/55 hover:text-[#C97B2A] text-sm text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded-sm"
              >
                Become a Supplier
              </button>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-white/35 tracking-[0.15em] uppercase mb-4">
              Contact
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+2348012345678"
                className="flex items-start gap-2.5 text-sm text-white/55 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded-sm"
              >
                <Phone size={13} className="mt-0.5 text-[#C97B2A] shrink-0" />
                <span>+234 (0) 801 234 5678</span>
              </a>
              <a
                href="mailto:trade@exporttradeafrica.com"
                className="flex items-start gap-2.5 text-sm text-white/55 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded-sm"
              >
                <Mail size={13} className="mt-0.5 text-[#C97B2A] shrink-0" />
                <span>trade@exporttradeafrica.com</span>
              </a>
              <a
                href="https://wa.me/2348012345678"
                className="flex items-start gap-2.5 text-sm text-white/55 hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded-sm"
              >
                <MessageCircle size={13} className="mt-0.5 text-[#C97B2A] shrink-0" />
                <span>WhatsApp Chat</span>
              </a>
              <div className="flex items-start gap-2.5 text-sm text-white/55">
                <MapPin size={13} className="mt-0.5 text-[#C97B2A] shrink-0" />
                <span>Lekki Phase 1, Lagos, Nigeria</span>
              </div>
              <div className="flex items-start gap-2.5 text-sm text-white/55">
                <Clock size={13} className="mt-0.5 text-[#C97B2A] shrink-0" />
                <span>Mon–Fri: 8:00 AM – 6:00 PM WAT</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/25 text-xs">
            © 2024 Export Trade Africa Ltd. All rights reserved. RC 1234567.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("mentorship-training")}
              className="text-white/25 hover:text-white/55 text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded-sm"
            >
              Mentorship & Training
            </button>
            <button
              onClick={() => navigate("compliance")}
              className="text-white/25 hover:text-white/55 text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded-sm"
            >
              Trust & Compliance
            </button>
            <button
              onClick={() => navigate("supplier")}
              className="text-white/25 hover:text-white/55 text-xs transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded-sm"
            >
              Become a Supplier
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ navigate }: { navigate: (p: Page, product?: ProductType) => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { type: "image", src: IMG.hero, alt: "Large cargo vessel loaded with colourful shipping containers at port" },
    { type: "video", src: "/PRODUCT 23 VIDEO.mp4" },
    { type: "image", src: IMG.cargoShip2, alt: "Cargo ship at sea" },
    { type: "video", src: "/PRODUCT 24 VIDEO.mp4" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[92vh] min-h-[560px] max-h-[900px] flex items-end overflow-hidden bg-[#0A1628]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-0" : "opacity-0 z-0"
            }`}
          >
            {slide.type === "image" ? (
              <img
                src={slide.src}
                alt={slide.alt || ""}
                className="w-full h-full object-cover opacity-55"
              />
            ) : (
              <video
                src={slide.src}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-55"
              />
            )}
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/45 to-transparent z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20 w-full">
          <div className="max-w-2xl">
            <SectionLabel text="Lekki · Lagos · Nigeria" />
            <h1 className="font-display text-white text-5xl sm:text-6xl lg:text-[5rem] font-bold leading-[1.02] mb-6 tracking-tight">
              African Trade.<br />Global Reach.
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
              Export Trade Africa connects high-quality Nigerian commodities with global markets. We supply verified agricultural goods, solid minerals, and palm products to buyers across Europe, Asia, and the Americas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("quote")}
                className="bg-[#C97B2A] text-white font-semibold px-7 py-3.5 rounded hover:bg-[#b06820] transition-colors flex items-center gap-2 justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
              >
                Request a Quote <ArrowRight size={16} />
              </button>
              <button
                onClick={() => navigate("products")}
                className="border border-white/30 text-white font-semibold px-7 py-3.5 rounded hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A]"
              >
                View Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-b border-[#E8E9EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-[#E8E9EB]">
            {[
              { value: "10+", label: "Years in Operation" },
              { value: "24", label: "Countries Served" },
              { value: "CAC Reg.", label: "RC 1234567" },
              { value: "NEPC", label: "Export Certified" },
            ].map((item) => (
              <div key={item.label} className="lg:px-8 first:lg:pl-0 last:lg:pr-0">
                <div className="font-display text-[#0A1628] text-2xl font-bold">{item.value}</div>
                <div className="text-[#64748B] text-sm mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Tiles */}
      <section className="bg-[#F2F3F6] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <SectionLabel text="What We Do" />
            <h2 className="font-display text-[#0A1628] text-3xl sm:text-4xl font-bold">
              Our Core Services
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Ship size={22} />,
                title: "Export",
                desc: "We handle the complete export process for verified Nigerian commodities, including documentation, freight, customs clearance, and delivery to your port.",
              },
              {
                icon: <Package size={22} />,
                title: "Import",
                desc: "From supplier sourcing to final delivery in Nigeria, we manage your import end to end with full customs compliance and documentation.",
              },
              {
                icon: <Search size={22} />,
                title: "Sourcing",
                desc: "Need a specific product at volume? We source directly from vetted suppliers across Nigeria and West Africa, eliminating unknown intermediaries.",
              },
              {
                icon: <Users size={22} />,
                title: "Mentorship",
                desc: "We provide expert guidance for emerging exporters, helping you navigate international trade regulations, contracts, and buyer relations.",
              },
              {
                icon: <GraduationCap size={22} />,
                title: "Training",
                desc: "Practical, hands-on trade training sessions designed to equip you with the skills to successfully execute import and export transactions.",
              },
            ].map((tile) => (
              <div
                key={tile.title}
                className="bg-white rounded p-7 border border-[#E8E9EB] group hover:border-[#0A1628]/20 transition-colors"
              >
                <div className="text-[#C97B2A] mb-4">{tile.icon}</div>
                <h3 className="font-display text-[#0A1628] text-xl font-bold mb-2">{tile.title}</h3>
                <p className="text-[#64748B] text-sm leading-relaxed mb-5">{tile.desc}</p>
                <button
                  onClick={() => navigate("services")}
                  className="flex items-center gap-1.5 text-[#0A1628] text-sm font-semibold group-hover:text-[#C97B2A] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded-sm"
                >
                  Learn more <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <SectionLabel text="Our Products" />
              <h2 className="font-display text-[#0A1628] text-3xl sm:text-4xl font-bold">
                Product Categories
              </h2>
            </div>
            <button
              onClick={() => navigate("products")}
              className="flex items-center gap-1.5 text-[#0A1628] text-sm font-semibold hover:text-[#C97B2A] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded-sm shrink-0"
            >
              View all products <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCTS.map((product) => (
              <button
                key={product.id}
                onClick={() => navigate("product-detail", product)}
                className="group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded"
              >
                <div className="relative overflow-hidden rounded bg-[#E8E9EB] aspect-[4/3]">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-3 right-3 bg-white/90 text-[#0A1628] text-xs font-semibold px-2 py-0.5 rounded-sm">
                    {product.category}
                  </div>
                </div>
                <div className="pt-4 pb-1">
                  <h3 className="font-display text-[#0A1628] text-lg font-bold mb-1">
                    {product.name}
                  </h3>
                  <p className="text-[#64748B] text-sm line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Us — photo bg */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMG.containers}
            alt="Aerial view of shipping containers at port"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0A1628]/88" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <SectionLabel text="Why Us" />
            <h2 className="font-display text-white text-3xl sm:text-4xl font-bold max-w-lg">
              What makes working with us different
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <Shield size={20} />,
                title: "Reliable Supply",
                desc: "We maintain established relationships with verified farmers and producers, so supply disruptions are rare and traceable when they occur.",
              },
              {
                icon: <TrendingUp size={20} />,
                title: "Direct Sourcing",
                desc: "No unnecessary intermediaries. Buying direct means competitive pricing and a shorter, more transparent chain.",
              },
              {
                icon: <FileText size={20} />,
                title: "Full Documentation",
                desc: "Every shipment leaves with complete export documentation, phytosanitary certificates, and customs clearance handled in-house.",
              },
              {
                icon: <Users size={20} />,
                title: "Responsive Team",
                desc: "Average response time to buyer enquiries is under 4 hours. For urgent matters, reach us directly via WhatsApp.",
              },
            ].map((point) => (
              <div key={point.title} className="border border-white/15 rounded p-6">
                <div className="text-[#C97B2A] mb-3">{point.icon}</div>
                <h3 className="font-display text-white text-lg font-bold mb-2">{point.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Closing CTA */}
      <section className="bg-[#0A1628] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-white text-3xl sm:text-4xl font-bold mb-4">
            Ready to source from Africa?
          </h2>
          <p className="text-white/60 text-base max-w-lg mx-auto mb-8 leading-relaxed">
            Tell us what you need, your required quantity, and your destination. We respond
            within 4 business hours with pricing and availability.
          </p>
          <button
            onClick={() => navigate("quote")}
            className="bg-[#C97B2A] text-white font-semibold px-8 py-4 rounded hover:bg-[#b06820] transition-colors inline-flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            Request a Quote <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <main className="pt-16">
      <PageHero
        label="Who We Are"
        title="Who We Are"
        image={IMG.ceoPortrait}
        imageAlt="Export Trade Africa leadership team"
      />

      {/* Story */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel text="Our History" />
              <h2 className="font-display text-[#0A1628] text-3xl font-bold mb-6">
                Founded in Lagos, built on relationships
              </h2>
              <div className="space-y-4 text-[#64748B] text-sm leading-relaxed">
                <p>
                  Export Trade Africa was established in 2014 in Lekki, Lagos, by a team with
                  direct experience in Nigerian commodity markets and international freight. The
                  founders had seen firsthand how difficult it was for overseas buyers to verify
                  quality and obtain reliable documentation from Nigerian exporters. ETA was built
                  to close that gap.
                </p>
                <p>
                  In our first year, we completed twelve export transactions — all agricultural
                  commodities to buyers in China and the United Arab Emirates. By 2018, we had
                  expanded into solid minerals and palm products and were serving buyers across
                  fourteen countries. Today we operate from our own bonded warehouse facility in
                  Lagos State and maintain an active buyer network spanning Europe, Asia, and
                  North America.
                </p>
                <p>
                  We are registered with the Corporate Affairs Commission of Nigeria (RC 1234567)
                  and certified by the Nigerian Export Promotion Council. Our operations are
                  subject to annual audit, and we provide buyers with full documentation
                  traceability on every shipment.
                </p>
              </div>
            </div>
            <div className="rounded overflow-hidden bg-white border border-[#E8E9EB] aspect-[4/3] flex items-center justify-center p-6">
              <img
                src={IMG.logo}
                alt="Hamdan Integrated Services logo"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-14 border-y border-[#E8E9EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <SectionLabel text="Our Mission" />
            <p className="font-display text-[#0A1628] text-2xl sm:text-3xl font-bold leading-snug">
              &ldquo;To make verified Nigerian agricultural, mineral, and trade goods consistently
              accessible to international buyers &mdash; with the documentation, logistics, and
              communication standards they expect.&rdquo;
            </p>
          </div>
        </div>
      </section>


      {/* Location */}
      <section className="bg-[#F2F3F6] py-16 border-t border-[#E8E9EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionLabel text="Where We Operate" />
              <h2 className="font-display text-[#0A1628] text-3xl font-bold mb-5">Lekki, Lagos</h2>
              <div className="space-y-4 text-[#64748B] text-sm leading-relaxed mb-6">
                <p>
                  Our main office and operations centre is in Lekki Phase 1, Lagos &mdash; a central
                  location with direct access to the Lekki Deep Sea Port and the major freight
                  corridors serving Apapa and Tin Can Island Ports.
                </p>
                <p>
                  We also maintain a bonded warehouse facility in the Ikorodu Industrial Area, and
                  sourcing representatives in Kano (agricultural commodities) and Jos (solid minerals).
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <MapPin size={14} className="text-[#C97B2A] mt-0.5 shrink-0" />
                  <span className="text-[#0A1628] text-sm">
                    Plot 14B, Admiralty Way, Lekki Phase 1, Lagos, Nigeria
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock size={14} className="text-[#C97B2A] mt-0.5 shrink-0" />
                  <span className="text-[#0A1628] text-sm">
                    Monday to Friday, 8:00 AM &ndash; 6:00 PM West Africa Time (UTC+1)
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-[#E8E9EB] rounded overflow-hidden h-72">
              <iframe
                title="Export Trade Africa office location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7558!2d3.5098!3d6.4281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjUnNDEuMiJOIDPCsDMwJzM1LjMiRQ!5e0!3m2!1sen!2sng!4v1680000000000!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── PRODUCTS PAGE ────────────────────────────────────────────────────────────
function ProductsPage({
  navigate,
}: {
  navigate: (p: Page, product?: ProductType) => void;
}) {
  return (
    <main className="pt-16">
      <PageHero
        label="Our Products"
        title="Product Categories"
        image={IMG.cargoShip}
        imageAlt="Cargo ship at sea"
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-[#64748B] text-base max-w-2xl mb-12 leading-relaxed">
            We export verified Nigerian commodities and source imported goods for the Nigerian
            market. All products are documented, certified, and shipped to international standards.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {PRODUCTS.map((product) => (
              <button
                key={product.id}
                onClick={() => navigate("product-detail", product)}
                className="group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded bg-[#F2F3F6] overflow-hidden border border-[#E8E9EB] hover:border-[#0A1628]/20 transition-colors"
              >
                <div className="relative overflow-hidden aspect-[16/9] bg-[#E8E9EB]">
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-[#0A1628] text-white text-xs font-semibold px-2.5 py-1 rounded-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="font-display text-[#0A1628] text-2xl font-bold mb-2">
                    {product.name}
                  </h2>
                  <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {product.items.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="bg-white border border-[#E8E9EB] text-[#0A1628] text-xs font-medium px-2.5 py-1 rounded-sm"
                      >
                        {item}
                      </span>
                    ))}
                    {product.items.length > 3 && (
                      <span className="bg-white border border-[#E8E9EB] text-[#64748B] text-xs px-2.5 py-1 rounded-sm">
                        +{product.items.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-[#0A1628] text-sm font-semibold group-hover:text-[#C97B2A] transition-colors">
                    View details <ArrowRight size={14} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── PRODUCT DETAIL PAGE ──────────────────────────────────────────────────────
function ProductDetailPage({
  product,
  navigate,
}: {
  product: ProductType | null;
  navigate: (p: Page) => void;
}) {
  const p = product ?? PRODUCTS[0];

  return (
    <main className="pt-16">
      <div className="bg-white border-b border-[#E8E9EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <button
            onClick={() => navigate("products")}
            className="flex items-center gap-1.5 text-[#64748B] text-sm hover:text-[#0A1628] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded-sm"
          >
            <ChevronRight size={14} className="rotate-180" />
            Back to Products
          </button>
        </div>
      </div>

      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="rounded overflow-hidden bg-[#E8E9EB] aspect-square">
              <img
                src={p.image}
                alt={p.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="inline-block bg-[#0A1628] text-white text-xs font-semibold px-2.5 py-1 rounded-sm mb-4">
                {p.category}
              </span>
              <h1 className="font-display text-[#0A1628] text-3xl sm:text-4xl font-bold mb-4">
                {p.name}
              </h1>
              <p className="text-[#64748B] text-base leading-relaxed mb-8">{p.description}</p>

              <div className="space-y-3 mb-8">
                {[
                  { label: "Specifications", value: p.specs },
                  { label: "Minimum Order Quantity", value: p.moq },
                  { label: "Packaging", value: p.packaging },
                ].map((row) => (
                  <div key={row.label} className="border border-[#E8E9EB] rounded p-4">
                    <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-1">
                      {row.label}
                    </div>
                    <div className="text-[#0A1628] text-sm">{row.value}</div>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wide mb-3">
                  Available Products
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.items.map((item) => (
                    <span
                      key={item}
                      className="bg-[#F2F3F6] text-[#0A1628] text-xs font-medium px-3 py-1.5 rounded-sm border border-[#E8E9EB]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => navigate("quote")}
                className="w-full bg-[#C97B2A] text-white font-semibold px-6 py-3.5 rounded hover:bg-[#b06820] transition-colors flex items-center justify-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0A1628]"
              >
                Request a Quote for this Product <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────
function ServicesPage({ navigate }: { navigate: (p: Page) => void }) {
  const services = [
    {
      icon: <Ship size={26} />,
      title: "Export Services",
      who: "For international buyers sourcing goods from Nigeria.",
      desc: "We manage the complete export process for agricultural commodities, solid minerals, and palm products — from proforma invoice to bill of lading delivered to your inbox.",
      steps: [
        "Product enquiry and sample request",
        "Pricing, quality specification, and proforma invoice",
        "Purchase order confirmation and payment",
        "Product inspection and quality certification",
        "Export documentation: Form NXP, Certificate of Origin, phytosanitary certificate",
        "Freight booking and port clearance",
        "Bill of lading and full document package dispatched to buyer",
      ],
      image: IMG.cargoShip,
      imageAlt: "Cargo ship carrying Nigerian exports at sea",
    },
    {
      icon: <Package size={26} />,
      title: "Import Services",
      who: "For Nigerian businesses bringing goods in.",
      desc: "From sourcing to last-mile delivery in Nigeria, we handle your entire import process — supplier vetting, payment facilitation, customs clearance, and warehousing.",
      steps: [
        "Product brief and supplier shortlisting",
        "Supplier qualification and price negotiation",
        "Form M and import documentation",
        "Freight forwarding and port arrival",
        "Customs examination and duty payment",
        "Delivery to bonded warehouse or direct to client",
      ],
      image: IMG.warehouse,
      imageAlt: "Warehouse operations for imported goods in Nigeria",
    },
    {
      icon: <Search size={26} />,
      title: "Sourcing & Procurement",
      who: "For buyers who know what they want but need a verified source.",
      desc: "We source specific products at volume from our established network of farmers, producers, and manufacturers across Nigeria and West Africa.",
      steps: [
        "Receive detailed product specification from buyer",
        "Identify and qualify matching suppliers",
        "Arrange sampling, inspection, and independent testing",
        "Negotiate best pricing at specified volume",
        "Coordinate supply to buyer's freight forwarder or take on full logistics",
      ],
      image: IMG.beans,
      imageAlt: "Agricultural commodity sourcing — beans and grains from Nigeria",
    },
    {
      icon: <Warehouse size={26} />,
      title: "Warehousing & Logistics",
      who: "For buyers and importers needing storage and local distribution.",
      desc: "Our bonded warehouse facility in Ikorodu, Lagos, offers short-term and long-term storage with full inventory management and inland transportation.",
      steps: [
        "Goods receipt and inventory logging on arrival",
        "Quality inspection and condition report",
        "Secure storage in appropriate conditions",
        "Dispatch scheduling to port or Nigerian destination",
        "Inventory reporting on request or scheduled cadence",
      ],
      image: IMG.cargoShip2,
      imageAlt: "Freight logistics and port operations",
    },
    {
      icon: <Landmark size={26} />,
      title: "Export Finance",
      who: "For exporters and buyers who need financing structures for cross-border trade.",
      desc: "We support trade finance facilitation for export and import transactions, including letters of credit coordination, payment structuring, and practical guidance on financing documentation required to move deals to settlement.",
      steps: [
        "Financing needs assessment based on transaction size, payment terms, and shipment timeline",
        "Preparation and review of supporting trade documents for the proposed financing structure",
        "Facilitation with financial partners on letters of credit, collections, and structured payment options",
        "Disbursement coordination, shipment milestone tracking, and settlement follow-through",
      ],
      image: IMG.handshake,
      imageAlt: "Trade finance discussion for cross-border export transactions",
    },
    {
      icon: <FileSignature size={26} />,
      title: "International Contracts",
      who: "For businesses that need properly structured trade agreements.",
      desc: "We help draft and review international sale and purchase agreements, align commercial terms with the correct Incoterms, and clarify dispute-resolution clauses so both sides understand obligations before goods move.",
      steps: [
        "Contract needs review covering transaction scope, product terms, jurisdiction, and risk points",
        "Drafting or negotiation support for sales contracts, purchase contracts, and addenda",
        "Alignment of commercial terms, Incoterms, delivery obligations, and payment clauses",
        "Execution support so the final agreement is ready for signature and operational handover",
      ],
      image: IMG.businessMeeting2,
      imageAlt: "International trade contract discussion between business partners",
    },
    {
      icon: <GraduationCap size={26} />,
      title: "Mentorship",
      who: "For entrepreneurs and business owners entering export/import trade.",
      desc: "Our mentorship offering provides hands-on coaching for founders and operators building an export or import business, drawing directly from our own practical trade experience across sourcing, documentation, pricing, and fulfilment.",
      steps: [
        "Intake and goals session to understand the mentee's market, products, and current stage",
        "Structured mentorship sessions focused on practical trade execution and decision-making",
        "Ongoing check-ins to review progress, unblock challenges, and refine the business approach",
      ],
      image: IMG.ceoConference,
      imageAlt: "CEO leading a mentorship session on trade operations",
    },
    {
      icon: <BookOpen size={26} />,
      title: "Training",
      who: "For teams and individuals who want practical trade skills.",
      desc: "We run structured training programs covering export and import processes, documentation requirements, operational workflows, and compliance expectations so participants can execute trade transactions with confidence.",
      steps: [
        "Training needs assessment based on participant roles, experience level, and learning goals",
        "Training delivery through practical sessions, case examples, and guided documentation reviews",
        "Certification or completion wrap-up with clear next steps for applying the training on live transactions",
      ],
      image: IMG.ceoTraining1,
      imageAlt: "CEO delivering trade skills training to participants",
    },
  ];

  return (
    <main className="pt-16">
      <PageHero
        label="What We Offer"
        title="Our Services"
        image={IMG.cargoShip}
        imageAlt="Shipping and export operations"
      />

      <section className="bg-white">
        {services.map((service, i) => (
          <div
            key={service.title}
            className={`py-16 sm:py-20 ${i < services.length - 1 ? "border-b border-[#E8E9EB]" : ""}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                  i % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                <div className={i % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="text-[#C97B2A] mb-4">{service.icon}</div>
                  <h2 className="font-display text-[#0A1628] text-3xl font-bold mb-1.5">
                    {service.title}
                  </h2>
                  <div className="text-[#C97B2A] text-xs font-semibold tracking-wide uppercase mb-4">
                    {service.who}
                  </div>
                  <p className="text-[#64748B] text-base leading-relaxed mb-8">{service.desc}</p>
                  <div>
                    <div className="text-xs font-semibold text-[#0A1628] uppercase tracking-wide mb-4">
                      How it works
                    </div>
                    <ol className="space-y-3">
                      {service.steps.map((step, j) => (
                        <li key={j} className="flex gap-3 text-sm text-[#64748B]">
                          <span className="shrink-0 w-5 h-5 rounded-full bg-[#0A1628] text-white text-xs flex items-center justify-center font-semibold mt-0.5">
                            {j + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                  <button
                    onClick={() => navigate("quote")}
                    className="mt-8 bg-[#0A1628] text-white font-semibold px-6 py-3 rounded hover:bg-[#162840] transition-colors flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A]"
                  >
                    Request this service <ArrowRight size={14} />
                  </button>
                </div>
                <div
                  className={`rounded overflow-hidden bg-[#E8E9EB] aspect-[4/3] ${
                    i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                  }`}
                >
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

// ─── MENTORSHIP & TRAINING PAGE ───────────────────────────────────────────────
function MentorshipTrainingPage({ navigate }: { navigate: (p: Page) => void }) {
  return (
    <main className="pt-16">
      <PageHero
        label="CEO Training"
        title="Mentorship & Training"
        image={IMG.ceoTeaching}
        imageAlt="CEO leading a practical export trade training session"
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 items-start">
            <div>
              <SectionLabel text="Program Overview" />
              <h2 className="font-display text-[#0A1628] text-3xl sm:text-4xl font-bold mb-5">
                Practical guidance for founders, teams, and new trade operators
              </h2>
              <p className="text-[#64748B] text-base leading-relaxed mb-4 max-w-3xl">
                Our mentorship and training sessions are built for people who want to understand
                how cross-border trade works in practice, not just in theory. The program covers
                sourcing, export and import workflows, documentation, pricing logic, compliance,
                and the operational decisions that shape successful transactions.
              </p>
              <p className="text-[#64748B] text-base leading-relaxed max-w-3xl">
                Sessions can be tailored for early-stage entrepreneurs, internal company teams, or
                business owners expanding into new markets. Every engagement is designed to move
                participants from general interest to structured execution.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  title: "One-to-one mentorship",
                  desc: "Focused coaching for entrepreneurs building an export or import business.",
                },
                {
                  title: "Team training",
                  desc: "Structured sessions for staff handling trade documentation, procurement, and operations.",
                },
                {
                  title: "Execution support",
                  desc: "Practical follow-through on trade processes, compliance expectations, and deal readiness.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded bg-[#F2F3F6] border border-[#E8E9EB] p-5 sm:p-6"
                >
                  <h3 className="font-display text-[#0A1628] text-xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F2F3F6] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <SectionLabel text="Gallery" />
            <h2 className="font-display text-[#0A1628] text-3xl sm:text-4xl font-bold mb-3">
              CEO training sessions
            </h2>
            <p className="text-[#64748B] text-base max-w-2xl leading-relaxed">
              A look at recent mentorship and practical training sessions led by the company
              leadership. Media is presented in a consistent gallery format so images and future
              training videos share the same visual treatment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TRAINING_MEDIA.map((item) => (
              <div
                key={item.title}
                className="group text-left rounded bg-white overflow-hidden border border-[#E8E9EB] hover:border-[#0A1628]/20 transition-colors"
              >
                <div className="relative overflow-hidden aspect-[16/11] bg-[#E8E9EB]">
                  {item.type === "image" ? (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <video
                      controls
                      preload="metadata"
                      poster={item.poster}
                      className="w-full h-full object-cover"
                    >
                      <source src={item.src} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <div className="absolute top-4 left-4 bg-[#0A1628] text-white text-xs font-semibold px-2.5 py-1 rounded-sm">
                    {item.type === "video" ? "Video" : "Photo"}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-[#0A1628] text-xl font-bold mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">{item.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
            <div className="rounded overflow-hidden bg-[#E8E9EB] aspect-[4/3]">
              <img
                src={IMG.ceoPortrait}
                alt="CEO of Export Trade Africa"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <SectionLabel text="Next Step" />
              <h2 className="font-display text-[#0A1628] text-3xl sm:text-4xl font-bold mb-5">
                Book a mentorship or training session
              </h2>
              <p className="text-[#64748B] text-base leading-relaxed mb-6 max-w-2xl">
                Whether you need executive-level guidance, team onboarding, or a practical workshop
                for market entry, we can structure a session around your business goals and current
                trade readiness.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate("quote")}
                  className="bg-[#0A1628] text-white font-semibold px-7 py-3.5 rounded hover:bg-[#162840] transition-colors flex items-center gap-2 justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A]"
                >
                  Request a Session <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => navigate("services")}
                  className="border border-[#0A1628]/15 text-[#0A1628] font-semibold px-7 py-3.5 rounded hover:bg-[#F2F3F6] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A]"
                >
                  Explore All Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── QUOTE PAGE ───────────────────────────────────────────────────────────────
function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    quantity: "",
    destination: "",
    targetPrice: "",
    timeline: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "A valid email address is required";
    if (!form.product.trim()) e.product = "Please specify the product required";
    if (!form.destination.trim()) e.destination = "Destination country is required";
    return e;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="pt-16 min-h-screen bg-[#F2F3F6] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded p-10 border border-[#E8E9EB] text-center">
          <div className="w-12 h-12 rounded-full bg-[#0A1628] flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={22} className="text-[#C97B2A]" />
          </div>
          <h2 className="font-display text-[#0A1628] text-2xl font-bold mb-3">
            Quote Request Received
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed mb-3">
            Thank you. A member of our team will review your enquiry and respond within{" "}
            <strong>4 business hours</strong> (Monday to Friday, 8 AM &ndash; 6 PM WAT).
          </p>
          <p className="text-[#64748B] text-sm mb-8">
            For urgent matters, contact us directly on WhatsApp:
          </p>
          <a
            href="https://wa.me/2348012345678"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded hover:bg-[#1fb355] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0A1628]"
          >
            <MessageCircle size={16} /> Open WhatsApp
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16">
      <PageHero
        label="Get a Quote"
        title="Request a Quote"
        image={IMG.handshake}
        imageAlt="Trade agreement and quote process"
        short
      />

      <section className="bg-[#F2F3F6] py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="bg-white border border-[#C97B2A]/25 rounded p-4 mb-8 flex items-start gap-3">
            <Clock size={15} className="text-[#C97B2A] shrink-0 mt-0.5" />
            <p className="text-[#0A1628] text-sm">
              We respond to all enquiries within{" "}
              <strong>4 business hours</strong> (Monday&ndash;Friday, 8 AM&ndash;6 PM WAT).
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded border border-[#E8E9EB] p-6 sm:p-8 space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Full Name *" error={errors.name}>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`w-full border rounded px-3 py-2.5 text-sm text-[#0A1628] bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1628] ${
                    errors.name ? "border-red-400" : "border-[#E8E9EB]"
                  }`}
                  placeholder="Your full name"
                />
              </Field>
              <Field label="Company / Organisation">
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full border border-[#E8E9EB] rounded px-3 py-2.5 text-sm text-[#0A1628] bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1628]"
                  placeholder="Company name (optional)"
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Email Address *" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full border rounded px-3 py-2.5 text-sm text-[#0A1628] bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1628] ${
                    errors.email ? "border-red-400" : "border-[#E8E9EB]"
                  }`}
                  placeholder="you@company.com"
                />
              </Field>
              <Field label="Phone / WhatsApp">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-[#E8E9EB] rounded px-3 py-2.5 text-sm text-[#0A1628] bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1628]"
                  placeholder="+1 555 000 0000"
                />
              </Field>
            </div>
            <Field label="Product Required *" error={errors.product}>
              <input
                type="text"
                value={form.product}
                onChange={(e) => setForm({ ...form, product: e.target.value })}
                className={`w-full border rounded px-3 py-2.5 text-sm text-[#0A1628] bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1628] ${
                  errors.product ? "border-red-400" : "border-[#E8E9EB]"
                }`}
                placeholder="e.g. Sesame Seeds, Raw Cashew Nuts, Palm Oil"
              />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Quantity Required">
                <input
                  type="text"
                  value={form.quantity}
                  onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                  className="w-full border border-[#E8E9EB] rounded px-3 py-2.5 text-sm text-[#0A1628] bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1628]"
                  placeholder="e.g. 20MT, 1 x 40ft container"
                />
              </Field>
              <Field label="Destination Country *" error={errors.destination}>
                <input
                  type="text"
                  value={form.destination}
                  onChange={(e) => setForm({ ...form, destination: e.target.value })}
                  className={`w-full border rounded px-3 py-2.5 text-sm text-[#0A1628] bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1628] ${
                    errors.destination ? "border-red-400" : "border-[#E8E9EB]"
                  }`}
                  placeholder="e.g. Germany, China, United States"
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Target Price (optional)">
                <input
                  type="text"
                  value={form.targetPrice}
                  onChange={(e) => setForm({ ...form, targetPrice: e.target.value })}
                  className="w-full border border-[#E8E9EB] rounded px-3 py-2.5 text-sm text-[#0A1628] bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1628]"
                  placeholder="e.g. USD 900/MT CIF"
                />
              </Field>
              <Field label="Delivery Timeline">
                <input
                  type="text"
                  value={form.timeline}
                  onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                  className="w-full border border-[#E8E9EB] rounded px-3 py-2.5 text-sm text-[#0A1628] bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1628]"
                  placeholder="e.g. Within 60 days, Q3 2024"
                />
              </Field>
            </div>
            <Field label="Additional Notes">
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full border border-[#E8E9EB] rounded px-3 py-2.5 text-sm text-[#0A1628] bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1628] resize-none"
                rows={4}
                placeholder="Specification requirements, certifications needed, special packaging, etc."
              />
            </Field>
            <button
              type="submit"
              className="w-full bg-[#C97B2A] text-white font-semibold px-6 py-3.5 rounded hover:bg-[#b06820] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0A1628] flex items-center justify-center gap-2"
            >
              Submit Quote Request <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

// ─── SUPPLIER PAGE ────────────────────────────────────────────────────────────
function SupplierPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    location: "",
    volume: "",
    notes: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="pt-16 min-h-screen bg-[#F2F3F6] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded p-10 border border-[#E8E9EB] text-center">
          <div className="w-12 h-12 rounded-full bg-[#0A1628] flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={22} className="text-[#C97B2A]" />
          </div>
          <h2 className="font-display text-[#0A1628] text-2xl font-bold mb-3">
            Application Received
          </h2>
          <p className="text-[#64748B] text-sm leading-relaxed">
            Thank you for your interest in supplying to Export Trade Africa. Our sourcing team
            will review your application and contact you within 5 business days.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-16">
      <PageHero
        label="Suppliers"
        title="Become a Supplier"
        image={IMG.beans}
        imageAlt="Agricultural commodity supplier in Nigeria"
        short
      />

      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <SectionLabel text="What We Look For" />
              <h2 className="font-display text-[#0A1628] text-2xl font-bold mb-5">
                Supplier criteria
              </h2>
              <div className="space-y-4 text-[#64748B] text-sm leading-relaxed mb-6">
                <p>
                  We work with producers, farmers, cooperatives, and processors who can supply
                  consistently at volume. We prioritise direct relationships over intermediary
                  supply chains.
                </p>
                <p>Key factors in every supplier relationship:</p>
              </div>
              <ul className="space-y-3">
                {[
                  "Verified capacity: minimum 20MT per month or one container load per order",
                  "Consistent quality with traceability to farm or processing site",
                  "Willingness to supply samples before order confirmation",
                  "Valid business registration or cooperative documentation",
                  "Ability to provide quality certificates or accept third-party inspection",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#64748B]">
                    <CheckCircle size={15} className="text-[#C97B2A] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <form
                onSubmit={handleSubmit}
                className="bg-[#F2F3F6] rounded border border-[#E8E9EB] p-6 space-y-4"
              >
                <h3 className="font-display text-[#0A1628] text-xl font-bold mb-1">
                  Supplier Application
                </h3>
                {(
                  [
                    ["name", "Full Name *", "text", "Your full name"],
                    ["company", "Company / Farm Name", "text", "Business or farm name"],
                    ["email", "Email Address *", "email", "you@company.com"],
                    ["phone", "Phone / WhatsApp *", "tel", "+234 800 000 0000"],
                    ["product", "What do you supply? *", "text", "e.g. Sesame, Cashew, Talc"],
                    ["location", "Location (State / Region) *", "text", "e.g. Kano, Benue"],
                    ["volume", "Monthly Volume Capacity", "text", "e.g. 50MT/month"],
                  ] as const
                ).map(([key, label, type, placeholder]) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-[#0A1628] uppercase tracking-wide mb-1.5">
                      {label}
                    </label>
                    <input
                      type={type}
                      value={form[key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      className="w-full border border-[#E8E9EB] rounded px-3 py-2.5 text-sm text-[#0A1628] bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1628]"
                      placeholder={placeholder}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold text-[#0A1628] uppercase tracking-wide mb-1.5">
                    Additional Information
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full border border-[#E8E9EB] rounded px-3 py-2.5 text-sm text-[#0A1628] bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1628] resize-none"
                    rows={3}
                    placeholder="Certifications, existing buyers, processing capabilities..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#0A1628] text-white font-semibold px-6 py-3 rounded hover:bg-[#162840] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] flex items-center justify-center gap-2"
                >
                  Submit Application <ArrowRight size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── COMPLIANCE PAGE ──────────────────────────────────────────────────────────
function CompliancePage() {
  return (
    <main className="pt-16">
      <PageHero
        label="Verification"
        title="Trust & Compliance"
        image={IMG.handshake}
        imageAlt="Trade compliance and verification"
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-14">
              {/* Certifications */}
              <div>
                <SectionLabel text="Registration & Certification" />
                <div className="space-y-4">
                  {[
                    {
                      label: "Corporate Affairs Commission",
                      detail: "Export Trade Africa Ltd &middot; RC 1234567",
                      note: "Registered under the Companies and Allied Matters Act. Certificate available on request.",
                    },
                    {
                      label: "Nigerian Export Promotion Council",
                      detail: "NEPC Certificate No: NEPC/EXP/2456/2019",
                      note: "Full export authorisation for agricultural commodities, solid minerals, and processed goods.",
                    },
                    {
                      label: "Nigeria Customs Service",
                      detail: "Accredited Exporter &amp; Importer",
                      note: "Cleared for export and import operations at all major Nigerian ports.",
                    },
                    {
                      label: "Standards Organisation of Nigeria",
                      detail: "SON Registered Operator",
                      note: "Compliance with SON quality standards on applicable product categories.",
                    },
                  ].map((cert) => (
                    <div key={cert.label} className="border border-[#E8E9EB] rounded p-5">
                      <div className="flex items-start gap-3">
                        <Award size={17} className="text-[#C97B2A] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-semibold text-[#0A1628] text-sm">{cert.label}</div>
                          <div
                            className="text-[#C97B2A] text-xs font-mono tracking-wide my-1"
                            dangerouslySetInnerHTML={{ __html: cert.detail }}
                          />
                          <div className="text-[#64748B] text-xs leading-relaxed">{cert.note}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div>
                <SectionLabel text="Payment & Transaction Safety" />
                <p className="text-[#64748B] text-sm leading-relaxed mb-6">
                  We understand that an overseas buyer placing their first order carries real risk.
                  Here is how we structure transactions to protect both parties:
                </p>
                <div className="space-y-5">
                  {[
                    {
                      title: "Documentary Letters of Credit (LC)",
                      desc: "Our preferred method for first-time buyers. Funds are released only when shipping documents matching your specifications are presented to the issuing bank.",
                    },
                    {
                      title: "Telegraphic Transfer (TT) with Milestone Structure",
                      desc: "For established buyer relationships, we accept TT in tranches: typically 30% advance and 70% against Bill of Lading. Full documentation is provided at each stage.",
                    },
                    {
                      title: "Third-Party Inspection",
                      desc: "Buyers may appoint an independent inspection agency (SGS, Intertek, Bureau Veritas) at origin. We facilitate full access for pre-shipment inspection.",
                    },
                    {
                      title: "Escrow (upon request)",
                      desc: "For buyers who prefer escrow-based transactions, we are willing to work with agreed platforms. Contact us to discuss.",
                    },
                  ].map((item) => (
                    <div key={item.title} className="border-l-2 border-[#C97B2A] pl-4">
                      <div className="font-semibold text-[#0A1628] text-sm mb-1">{item.title}</div>
                      <div className="text-[#64748B] text-sm leading-relaxed">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-[#0A1628] rounded p-6 text-white">
                <Shield size={22} className="text-[#C97B2A] mb-3" />
                <h3 className="font-display text-xl font-bold mb-3">Document Checklist</h3>
                <p className="text-white/55 text-xs mb-5">
                  Every export shipment comes with the following documentation as standard:
                </p>
                <ul className="space-y-2">
                  {[
                    "Proforma Invoice",
                    "Commercial Invoice",
                    "Packing List",
                    "Bill of Lading / Airway Bill",
                    "Certificate of Origin",
                    "Phytosanitary Certificate (agricultural goods)",
                    "Quality / Assay Certificate",
                    "Nigerian Export Proceeds Form (NXP)",
                    "Combined Certificate of Value & Origin",
                  ].map((doc) => (
                    <li key={doc} className="flex items-start gap-2 text-xs text-white/75">
                      <CheckCircle size={12} className="text-[#C97B2A] shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#F2F3F6] rounded p-6 border border-[#E8E9EB]">
                <Globe size={18} className="text-[#C97B2A] mb-3" />
                <h3 className="font-display text-[#0A1628] text-lg font-bold mb-2">
                  Verify Our Registration
                </h3>
                <p className="text-[#64748B] text-xs leading-relaxed">
                  You can independently verify our CAC registration at the Corporate Affairs
                  Commission public portal (cac.gov.ng) and our NEPC certification at the NEPC
                  portal (nepc.gov.ng).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="pt-16">
      <PageHero label="Get in Touch" title="Contact Us" short />

      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: direct channels + map */}
            <div>
              <h2 className="font-display text-[#0A1628] text-2xl font-bold mb-6">
                Direct channels
              </h2>
              <div className="space-y-1 mb-10">
                {[
                  {
                    icon: <Phone size={17} />,
                    label: "Phone",
                    value: "+234 (0) 801 234 5678",
                    href: "tel:+2348012345678",
                  },
                  {
                    icon: <MessageCircle size={17} />,
                    label: "WhatsApp",
                    value: "Chat directly on WhatsApp",
                    href: "https://wa.me/2348012345678",
                  },
                  {
                    icon: <Mail size={17} />,
                    label: "Email",
                    value: "trade@exporttradeafrica.com",
                    href: "mailto:trade@exporttradeafrica.com",
                  },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-4 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded p-3 -mx-3 hover:bg-[#F2F3F6] transition-colors"
                  >
                    <div className="w-10 h-10 rounded bg-[#0A1628] flex items-center justify-center text-[#C97B2A] shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
                        {item.label}
                      </div>
                      <div className="text-[#0A1628] text-sm font-medium group-hover:text-[#C97B2A] transition-colors">
                        {item.value}
                      </div>
                    </div>
                  </a>
                ))}
                <div className="flex items-start gap-4 p-3 -mx-3">
                  <div className="w-10 h-10 rounded bg-[#0A1628] flex items-center justify-center text-[#C97B2A] shrink-0">
                    <MapPin size={17} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
                      Office Address
                    </div>
                    <div className="text-[#0A1628] text-sm">
                      Plot 14B, Admiralty Way
                      <br />
                      Lekki Phase 1, Lagos, Nigeria
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-3 -mx-3">
                  <div className="w-10 h-10 rounded bg-[#0A1628] flex items-center justify-center text-[#C97B2A] shrink-0">
                    <Clock size={17} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wide">
                      Business Hours
                    </div>
                    <div className="text-[#0A1628] text-sm">
                      Monday&ndash;Friday: 8:00 AM &ndash; 6:00 PM WAT
                      <br />
                      Saturday: 9:00 AM &ndash; 1:00 PM WAT
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded overflow-hidden bg-[#E8E9EB] h-60">
                <iframe
                  title="Export Trade Africa office location map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7558!2d3.5098!3d6.4281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjUnNDEuMiJOIDPCsDMwJzM1LjMiRQ!5e0!3m2!1sen!2sng!4v1680000000000!5m2!1sen!2sng"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right: form */}
            <div>
              <h2 className="font-display text-[#0A1628] text-2xl font-bold mb-6">
                Send a message
              </h2>
              {submitted ? (
                <div className="bg-[#F2F3F6] rounded border border-[#E8E9EB] p-10 text-center">
                  <CheckCircle size={30} className="text-[#C97B2A] mx-auto mb-3" />
                  <div className="font-semibold text-[#0A1628] text-base mb-2">Message sent</div>
                  <div className="text-[#64748B] text-sm">
                    We will respond within 4 business hours.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {(
                    [
                      ["name", "Full Name *", "text", "Your name"],
                      ["email", "Email Address *", "email", "you@company.com"],
                      ["subject", "Subject", "text", "How can we help?"],
                    ] as const
                  ).map(([key, label, type, placeholder]) => (
                    <div key={key}>
                      <label className="block text-xs font-semibold text-[#0A1628] uppercase tracking-wide mb-1.5">
                        {label}
                      </label>
                      <input
                        type={type}
                        required={label.includes("*")}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full border border-[#E8E9EB] rounded px-3 py-2.5 text-sm text-[#0A1628] bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1628]"
                        placeholder={placeholder}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-semibold text-[#0A1628] uppercase tracking-wide mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full border border-[#E8E9EB] rounded px-3 py-2.5 text-sm text-[#0A1628] bg-white focus:outline-none focus:ring-2 focus:ring-[#0A1628] resize-none"
                      rows={6}
                      placeholder="Your message..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#0A1628] text-white font-semibold px-6 py-3 rounded hover:bg-[#162840] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] flex items-center justify-center gap-2"
                  >
                    Send Message <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  function navigate(p: Page, product?: ProductType) {
    if (product) setSelectedProduct(product);
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav currentPage={page} navigate={navigate} />
      {page === "home" && <HomePage navigate={navigate} />}
      {page === "about" && <AboutPage navigate={navigate} />}
      {page === "products" && <ProductsPage navigate={navigate} />}
      {page === "product-detail" && (
        <ProductDetailPage product={selectedProduct} navigate={navigate} />
      )}
      {page === "services" && <ServicesPage navigate={navigate} />}
      {page === "mentorship-training" && <MentorshipTrainingPage navigate={navigate} />}
      {page === "quote" && <QuotePage />}
      {page === "supplier" && <SupplierPage />}
      {page === "compliance" && <CompliancePage />}
      {page === "contact" && <ContactPage />}
      <Footer navigate={navigate} />
    </div>
  );
}
