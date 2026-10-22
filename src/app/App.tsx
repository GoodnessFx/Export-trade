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
import { ChatWidget } from "./components/ChatWidget";

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
    imageAlt: "Agricultural commodities including cashew nuts, cocoa and sesame seeds ready for export",
    description:
      "We connect buyers with agricultural commodities sourced from Nigeria and other African markets, including cashew nuts, cocoa, sesame seeds, hibiscus flowers, charcoal, and bitter kola.",
    category: "Export",
    items: ["Raw Cashew Nuts", "Cocoa Beans", "Sesame Seeds", "Dried Hibiscus Flowers", "Charcoal", "Bitter Kola", "Chilli Peppers", "Ginger"],
    moq: "Subject to product and buyer requirements",
    packaging: "Jute bags, PP bags, or per buyer specification",
    specs: "Agreed product specifications, quality checks, appropriate packaging, sourcing coordination, and export documentation handled for each order.",
  },
  {
    id: "african-food",
    name: "African Food Products",
    image: IMG.palm,
    imageAlt: "African food products including palm oil, garri and yam flour",
    description:
      "A variety of African food products sourced from Nigeria, including garri, yam flour, palm oil, utazi, ugwu leaves, snails, and other products based on availability and buyer requirements.",
    category: "Export",
    items: ["Garri", "Yam Flour", "Palm Oil", "Utazi Leaves", "Ugwu Leaves", "Snails", "Dried Vegetables"],
    moq: "Subject to product and buyer requirements",
    packaging: "Appropriate packaging for food safety and destination market requirements",
    specs: "Different markets have different expectations. We focus on agreed specifications, quality checks, and export documentation for each product.",
  },
  {
    id: "minerals",
    name: "Solid Minerals",
    image: IMG.stones,
    imageAlt: "Solid mineral ore samples including zinc, lead and tin for export",
    description:
      "We support sourcing and export opportunities in Nigeria's solid minerals sector, connecting supply sources with buyers seeking minerals for industrial and commercial use.",
    category: "Export",
    items: ["Zinc", "Lead", "Tin", "Lithium-Bearing Minerals", "Fluorite"],
    moq: "Subject to availability, licensing, and quality specifications",
    packaging: "Bulk or bagged to specification",
    specs: "Responsible sourcing, product verification, traceability, and compliance coordinated for each transaction. Applicable mineral export permits, certificates, and regulatory documentation arranged.",
  },
  {
    id: "import",
    name: "Import Services",
    image: IMG.cargoShip,
    imageAlt: "Large cargo vessel handling imported goods for Nigeria-bound trade",
    description:
      "We coordinate key stages of the import process for Nigerian businesses, including supplier sourcing, import documentation, regulatory requirements, freight, customs clearance, and delivery.",
    category: "Import",
    items: ["Raw Materials", "Machinery & Equipment", "Finished Products", "Consumer Goods"],
    moq: "Subject to product, supplier, and delivery requirements",
    packaging: "Original manufacturer or agreed packaging",
    specs: "Full coordination with supplier, freight forwarder, customs agents, and relevant government agencies. Documentation and compliance support included.",
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
              An African trade and supply chain company established in Lagos, Nigeria. Sourcing Africa. Connecting Markets. Empowering Exporters.
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
                { label: "Export Services", page: "services" as Page },
                { label: "Import Services", page: "services" as Page },
                { label: "Sourcing & Supply Chain", page: "services" as Page },
                { label: "Warehousing & Logistics", page: "services" as Page },
                { label: "Export Training & Mentorship", page: "mentorship-training" as Page },
              ].map((s) => (
                <button
                  key={s.label}
                  onClick={() => navigate(s.page)}
                  className="text-white/55 hover:text-[#C97B2A] text-sm text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A] rounded-sm"
                >
                  {s.label}
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
            © {new Date().getFullYear()} Export Trade Africa. All rights reserved.
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
              Export Trade Africa makes it easier for businesses around the world to source quality products from Africa, and for African businesses to participate confidently in international trade.
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
              { value: "Lagos", label: "Nigeria — Est. in Lagos" },
              { value: "5", label: "Core Service Areas" },
              { value: "CAC Reg.", label: "Registered in Nigeria" },
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
                title: "Export Services",
                desc: "We connect international buyers with quality products from Nigeria and Africa, coordinating the export process from product enquiry to shipment and documentation.",
              },
              {
                icon: <Package size={22} />,
                title: "Import Services",
                desc: "We help Nigerian businesses navigate the import process — from supplier sourcing and verification to documentation, customs clearance, and final delivery.",
              },
              {
                icon: <Search size={22} />,
                title: "Sourcing & Supply Chain",
                desc: "We identify suitable supply sources across Nigeria and Africa, coordinating procurement, quality checks, and logistics from farm gate or mine site to destination.",
              },
              {
                icon: <Truck size={22} />,
                title: "Warehousing & Logistics",
                desc: "We coordinate storage, cargo consolidation, inland transportation, and port delivery to help businesses manage their supply chains more efficiently.",
              },
              {
                icon: <GraduationCap size={22} />,
                title: "Export Training & Mentorship",
                desc: "We provide training and mentorship for aspiring exporters and businesses looking to enter or grow in international markets, covering practical trade skills and export procedures.",
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
                title: "Reliable Sourcing",
                desc: "We identify suitable suppliers and coordinate procurement against agreed specifications, focusing on dependable supply rather than simply the cheapest available product.",
              },
              {
                icon: <TrendingUp size={20} />,
                title: "Quality Assurance",
                desc: "We support appropriate inspection, sampling, testing, and product verification to help ensure goods meet agreed requirements before dispatch.",
              },
              {
                icon: <FileText size={20} />,
                title: "Trade Documentation",
                desc: "We coordinate applicable export and import documentation and regulatory requirements, keeping all paperwork in order for smooth clearance and delivery.",
              },
              {
                icon: <Globe size={20} />,
                title: "End-to-End Coordination",
                desc: "From product enquiry to shipment, we keep buyers and business partners informed throughout the transaction with clear communication and accountability.",
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
            Let's Build Trade Opportunities Together
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Whether you are an international buyer looking for reliable African products, a Nigerian business seeking import support, a supplier looking for new markets, or an aspiring exporter ready to take the next step — Export Trade Africa welcomes the opportunity to work with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("quote")}
              className="bg-[#C97B2A] text-white font-semibold px-8 py-4 rounded hover:bg-[#b06820] transition-colors inline-flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              Request a Quote <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate("contact")}
              className="border border-white/30 text-white font-semibold px-8 py-4 rounded hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A]"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ navigate }: { navigate: (p: Page) => void }) {
  const coreElements = [
    {
      num: "01",
      title: "Reliable Sourcing",
      desc: "Identifying suitable suppliers and coordinating procurement against agreed specifications across verified farms, mines, and factories.",
    },
    {
      num: "02",
      title: "Quality Assurance",
      desc: "Supporting appropriate inspection, sampling, laboratory testing, assay analysis, and product verification before cargo movement.",
    },
    {
      num: "03",
      title: "Trade Documentation & Compliance",
      desc: "Coordinating applicable export and import documentation, banking forms, and regulatory clearances in line with Nigerian and destination requirements.",
    },
    {
      num: "04",
      title: "Logistics & Supply Chain Coordination",
      desc: "Planning collection, storage, cargo consolidation, inland haulage, freight booking, port handling, and international shipment.",
    },
    {
      num: "05",
      title: "Communication & Accountability",
      desc: "Keeping buyers, suppliers, and partners informed throughout the transaction with regular status reporting and transparent updates.",
    },
  ];

  const whatWeDoList = [
    {
      icon: <Ship size={24} />,
      title: "Agricultural Commodities & African Food Products",
      desc: "We connect buyers with agricultural commodities and food products sourced from Nigeria and other African markets. Our product range includes cashew nuts, cocoa, sesame seeds, hibiscus flowers, charcoal, bitter kola, and a variety of African food products such as garri, yam flour, palm oil, utazi, ugwu leaves, snails, and other products based on availability and buyer requirements. We focus on agreed specifications, quality checks, appropriate packaging, sourcing coordination, and export documentation.",
      tag: "Sourcing & Export",
    },
    {
      icon: <Award size={24} />,
      title: "Solid Minerals & Industrial Raw Materials",
      desc: "We support sourcing and export opportunities in Nigeria’s solid minerals sector, connecting suitable supply sources with buyers seeking minerals for industrial and commercial use. Our interests include zinc, lead, tin, lithium-bearing minerals, fluorite, and other selected mineral commodities, subject to availability, applicable licensing, quality specifications, and regulatory compliance. We coordinate responsible sourcing, testing, assay verification, and statutory export permits.",
      tag: "Industrial & Mining",
    },
    {
      icon: <Package size={24} />,
      title: "Import Services",
      desc: "Our services extend to businesses importing goods into Nigeria. We coordinate key stages of the import process, including supplier sourcing and verification, price negotiation, import documentation, regulatory requirements, freight arrangements, customs clearance coordination, and delivery. Whether importing raw materials, machinery, equipment, or finished products, our goal is to simplify trade through clear coordination with MDAs, service providers, and digital trade channels.",
      tag: "Trade Facilitation",
    },
    {
      icon: <Warehouse size={24} />,
      title: "Warehousing & Logistics",
      desc: "Trade does not end when a product is purchased. Goods must be collected, handled, stored, inspected where necessary, and moved to the right destination at the right time. Through our warehousing and logistics arrangements across multiple states in Nigeria, we coordinate movement from farms, mines, and factories to warehouses, processing facilities, ports, and final destinations with inventory tracking and cargo consolidation.",
      tag: "Storage & Freight",
    },
    {
      icon: <GraduationCap size={24} />,
      title: "Export Training & Mentorship",
      desc: "We believe Africa’s trade potential can only grow when more people have the knowledge and practical skills to participate. We provide training and mentorship for aspiring exporters, small businesses, entrepreneurs, and established businesses looking to expand beyond domestic markets. Our learning support covers product selection, market research, buyer identification, pricing, export documentation, regulatory compliance, and international trade procedures.",
      tag: "Capacity Building",
    },
  ];

  return (
    <main className="pt-16">
      {/* ── Executive About Hero: Portrait Engineered so face is 100% visible on mobile and desktop ── */}
      <section className="relative bg-[#0A1628] text-white pt-10 pb-14 sm:py-20 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#162840] via-[#0A1628] to-[#0A1628] opacity-90" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Mission & Identity */}
            <div className="lg:col-span-7 space-y-5">
              <SectionLabel text="About Us · Leadership & Mission" />
              <h1 className="font-display text-white text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Connecting Africa’s Products to Global Markets
              </h1>
              <p className="text-[#C97B2A] text-base sm:text-lg font-semibold">
                Export Trade Africa (ETA) · Established in Lagos, Nigeria
              </p>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Export Trade Africa (ETA) is an African trade and supply chain company established in Lagos, Nigeria, with a clear mission: to make it easier for businesses around the world to source quality products from Africa and for African businesses to participate confidently in international trade.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  "Agricultural Commodities",
                  "Solid Minerals",
                  "Import Services",
                  "Warehousing & Logistics",
                  "Export Training & Mentorship",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/90 border border-white/15"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("quote")}
                  className="bg-[#C97B2A] hover:bg-[#b06820] text-white font-semibold px-6 py-3 rounded transition-colors flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  Request a Quote <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => navigate("services")}
                  className="border border-white/30 text-white font-semibold px-6 py-3 rounded hover:bg-white/10 transition-colors"
                >
                  Explore Services
                </button>
              </div>
            </div>

            {/* Right Column: Founder & Leadership Portrait (face NEVER cut off, full view on mobile & desktop) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[380px] bg-gradient-to-b from-[#1E3352] to-[#0A1628] rounded-2xl p-2.5 sm:p-3 border-2 border-white/15 shadow-2xl ring-1 ring-white/10">
                <div className="rounded-xl overflow-hidden bg-[#0A1628] flex items-center justify-center">
                  <img
                    src={IMG.ceoPortrait}
                    alt="Founder and Leadership of Export Trade Africa"
                    className="w-full h-auto max-h-[460px] sm:max-h-[500px] object-contain sm:object-cover sm:object-top transition-transform duration-500 hover:scale-102"
                  />
                </div>
                <div className="pt-3 pb-1 text-center">
                  <div className="text-white text-sm sm:text-base font-bold">
                    Export Trade Africa Leadership
                  </div>
                  <div className="text-[#C97B2A] text-xs font-medium">
                    Certified in International Trade & Logistics
                  </div>
                  <div className="text-white/60 text-[11px] mt-0.5">
                    Lagos, Nigeria · Operating across Africa
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Practical Background & Experience ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel text="Our Foundation" />
              <h2 className="font-display text-[#0A1628] text-3xl font-bold mb-6">
                Built on Practical Trade Experience & Professional Certifications
              </h2>
              <div className="space-y-4 text-[#64748B] text-sm sm:text-base leading-relaxed">
                <p>
                  Built on practical experience in Nigerian commodity markets and international trade, supported by professional certifications in international trade and logistics, we understand the challenges that buyers and exporters face.
                </p>
                <p>
                  Finding reliable suppliers, verifying product quality, meeting regulatory requirements, preparing accurate documentation, and arranging timely delivery can be complex. We bring these moving parts together to make trade more accessible, organised, and dependable.
                </p>
                <p>
                  Today, our activities span agricultural commodities, African food products, solid minerals, import services, warehousing, and logistics coordination. Beyond moving goods across borders, we are committed to helping more African businesses understand, enter, and grow in international markets.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-white border border-[#E8E9EB] p-8 sm:p-12 flex flex-col items-center justify-center shadow-sm">
              <img
                src={IMG.logo}
                alt="Export Trade Africa logo"
                className="max-w-xs sm:max-w-sm max-h-48 object-contain mb-6"
              />
              <div className="text-center border-t border-[#E8E9EB] pt-6 w-full">
                <div className="font-display text-[#0A1628] font-bold text-lg mb-1">
                  Export Trade Africa
                </div>
                <div className="text-[#C97B2A] text-xs font-semibold uppercase tracking-wider">
                  Sourcing Africa · Connecting Markets · Empowering Exporters
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Do (5 Core Pillars from Founder) ── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-20 border-y border-[#E8E9EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <SectionLabel text="What We Do" />
            <h2 className="font-display text-[#0A1628] text-3xl sm:text-4xl font-bold mb-4">
              Comprehensive Trade & Supply Chain Solutions
            </h2>
            <p className="text-[#64748B] text-base leading-relaxed">
              From Nigerian commodity sourcing and mineral verification to import coordination, warehousing across states, and exporter mentorship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whatWeDoList.map((item, idx) => (
              <div
                key={item.title}
                className={`bg-white rounded-xl border border-[#E8E9EB] p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between ${
                  idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-lg bg-[#0A1628] text-[#C97B2A] flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-[11px] font-semibold text-[#C97B2A] bg-[#C97B2A]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-[#0A1628] text-lg font-bold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#64748B] text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>
                <button
                  onClick={() => navigate(idx === 4 ? "mentorship-training" : "services")}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0A1628] hover:text-[#C97B2A] transition-colors"
                >
                  Learn more <ChevronRight size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Work: The 5 Important Elements ── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <SectionLabel text="How We Work" />
            <h2 className="font-display text-[#0A1628] text-3xl sm:text-4xl font-bold mb-4">
              Our 5-Element Trade Methodology
            </h2>
            <p className="text-[#64748B] text-base leading-relaxed">
              We believe successful international trade begins long before goods reach a port. It starts with understanding buyer needs, identifying suitable supply sources, agreeing on quality and commercial terms, and planning the movement of goods from origin to destination. Every transaction is tailored to the product, quantity, destination, delivery terms, and specific requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {coreElements.map((elem) => (
              <div
                key={elem.num}
                className="bg-[#F8FAFC] border border-[#E8E9EB] rounded-xl p-5 hover:border-[#C97B2A] transition-colors"
              >
                <div className="text-2xl font-black text-[#C97B2A] font-display mb-2">
                  {elem.num}
                </div>
                <h3 className="text-[#0A1628] font-bold text-sm mb-2">
                  {elem.title}
                </h3>
                <p className="text-[#64748B] text-xs leading-relaxed">
                  {elem.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision for African Trade ── */}
      <section className="bg-[#0A1628] text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <SectionLabel text="Our Vision for African Trade" />
            <blockquote className="font-display text-white text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug mb-8">
              &ldquo;We see Africa as more than a source of raw materials. We see a continent with the resources, agricultural potential, food culture, entrepreneurial talent, and industrial opportunities to serve markets around the world.&rdquo;
            </blockquote>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
              Our ambition is to help bridge the gap between African suppliers and international buyers while supporting African entrepreneurs and businesses to develop the knowledge, systems, and relationships needed to compete globally. By combining trade facilitation, sourcing, logistics coordination, and exporter development, we aim to contribute to a more connected, capable, and competitive African trading community.
            </p>
            <div className="inline-block bg-[#C97B2A] text-white text-xs font-semibold px-4 py-2 rounded-full uppercase tracking-wider">
              Export Trade Africa — Sourcing Africa. Connecting Markets. Empowering Exporters.
            </div>
          </div>
        </div>
      </section>

      {/* ── Let's Build Trade Opportunities Together (CTA) ── */}
      <section className="bg-[#C97B2A] text-white py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Let's Build Trade Opportunities Together
          </h2>
          <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8">
            Whether you are an international buyer looking for reliable African products, a Nigerian business seeking import support, a supplier looking for access to new markets, or an aspiring exporter ready to take the next step, Export Trade Africa welcomes the opportunity to work with you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("quote")}
              className="bg-[#0A1628] hover:bg-[#162840] text-white font-semibold px-8 py-3.5 rounded shadow-lg transition-colors flex items-center gap-2"
            >
              Request a Quote <ArrowRight size={14} />
            </button>
            <button
              onClick={() => navigate("contact")}
              className="bg-white hover:bg-white/90 text-[#0A1628] font-semibold px-8 py-3.5 rounded shadow-lg transition-colors"
            >
              Contact Our Lagos Team
            </button>
          </div>
        </div>
      </section>

      {/* ── Where We Operate ── */}
      <section className="bg-[#F2F3F6] py-16 border-t border-[#E8E9EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <SectionLabel text="Where We Operate" />
              <h2 className="font-display text-[#0A1628] text-3xl font-bold mb-5">Lagos, Nigeria</h2>
              <div className="space-y-4 text-[#64748B] text-sm leading-relaxed mb-6">
                <p>
                  Export Trade Africa is established in Lagos, Nigeria — a major hub for trade, logistics, and commerce in West Africa, with direct access to Nigeria's key seaports (Apapa and Tin Can Island) and major freight corridors.
                </p>
                <p>
                  Our activities span agricultural commodities, African food products, solid minerals, import services, warehousing, and logistics coordination. We work with farmers, producers, processors, and suppliers across Nigeria and Africa to connect products with buyers and markets around the world.
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
            <div className="bg-[#E8E9EB] rounded-xl overflow-hidden h-72 shadow-sm border border-[#E8E9EB]">
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
            We connect buyers with agricultural commodities, African food products, and solid minerals sourced from Nigeria and other African markets, and coordinate import services for Nigerian businesses. Each product category is approached with agreed specifications, quality checks, and coordinated documentation.
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
      subtitle: "Your Trusted Partner for Exporting from Nigeria to the World",
      who: "For international buyers sourcing goods from Nigeria and Africa",
      desc: "At Export Trade Africa, we make exporting from Nigeria easier by helping international buyers source quality products and coordinating the export process from start to finish. Whether you are sourcing agricultural commodities (such as cashew nuts, ginger, cocoa, hibiscus flowers, chilli peppers, charcoal, and sesame seeds) or solid minerals (such as tin, zinc, lead, copper, and lithium-bearing minerals), we connect your business with suitable Nigerian supply sources and coordinate every step needed for international shipment.",
      whyChoose: [
        "End-to-end export coordination from enquiry to final dispatch",
        "Diverse product categories: agricultural commodities and solid minerals",
        "Quality-focused approach with agreed specifications and lab testing",
        "Full compliance support: Form NXP, Phytosanitary, Certificate of Origin",
        "Clear communication and regular shipment tracking updates",
        "Professional expertise in international trade and logistics",
      ],
      steps: [
        "Product Enquiry and Sourcing: Tell us what you need, the quantity, destination country, and specific requirements. We assess availability and coordinate sourcing.",
        "Samples and Quality Specifications: Where applicable, we arrange samples for evaluation and agree on grades, standards, packaging, and order terms.",
        "Quotation and Proforma Invoice: We provide transparent pricing, payment terms, delivery arrangements, and Incoterms outlined in a proforma invoice.",
        "Order Confirmation and Payment: Transaction documented through a purchase order or sales contract with agreed payment structures.",
        "Product Preparation and Quality Inspection: Collection, sorting, grading, processing, and packaging. Independent lab testing and quality certification coordinated.",
        "Export Documentation and Compliance: Form NXP, Certificate of Origin, Phytosanitary Certificate, Commercial Invoice, Packing List, and mineral export permits.",
        "Freight Booking and Customs Clearance: Coordinated with freight forwarders, shipping lines, and clearing agents for shipping bookings, port handling, and customs.",
        "Shipment and Transport Documentation: Verification and issuance of the Bill of Lading or applicable transport documents once loaded.",
        "Final Document Dispatch and Shipment Updates: Complete export document package dispatched to the buyer with tracking updates until destination arrival.",
      ],
      ctaText: "Request an Export Quote",
      ctaPage: "quote" as Page,
      image: IMG.cargoShip,
      imageAlt: "Cargo ship carrying Nigerian exports at sea",
    },
    {
      icon: <Package size={26} />,
      title: "Import Services",
      subtitle: "Your Trusted Partner for Importing Goods into Nigeria",
      who: "For Nigerian businesses importing commercial goods, machinery, and raw materials",
      desc: "Importing goods into Nigeria involves more than finding the right supplier. From verifying suppliers and negotiating prices to managing documentation, regulatory approvals, customs clearance, and final delivery, every stage requires careful coordination. We coordinate key stages from sourcing and supplier engagement to customs clearance and delivery to your doorstep.",
      whyChoose: [
        "End-to-end import coordination from international supplier to doorstep",
        "Supplier verification, credential review, and price negotiation",
        "Form M, SON, and NAFDAC regulatory documentation and approvals",
        "National Single Window (NSW) digital trade facilitation support",
        "MDA engagement and trade stakeholder coordination through official channels",
        "Freight forwarding (sea and air) and licensed customs clearance",
      ],
      note: "National Single Window support applies where relevant digital services are available. MDA relationships represent coordination and facilitation through appropriate official channels.",
      steps: [
        "Understanding Your Requirements and Sourcing: Clarifying product specs, quantity, budget, and delivery timelines to shortlist reliable international suppliers.",
        "Supplier Verification and Price Negotiation: Assessing supplier credentials, reviewing production capacity, and negotiating competitive commercial terms.",
        "Order Confirmation and Payment Arrangements: Sales contract coordination and banking arrangements for foreign exchange processing in line with FX regulations.",
        "Form M and Pre-Import Documentation: Preparation of Form M with authorised dealer banks, alongside SON, NAFDAC, and relevant agency permits.",
        "Regulatory Approvals & National Single Window Support: Coordinating electronic trade submissions through Nigeria’s National Single Window and relevant MDAs.",
        "Supplier Production, Inspection, and Shipping Readiness: Monitoring production, packaging, and coordinating pre-shipment inspections and certifications.",
        "Freight Forwarding and International Transportation: Coordinating sea or air freight, cargo booking, and tracking until arrival at Nigerian ports.",
        "Cargo Arrival and Customs Documentation: Reviewing Bill of Lading / Air Waybill, Commercial Invoice, Packing List, Form M, and customs declarations.",
        "Customs Assessment, Examination, and Duty Payment: Facilitating cargo examination and duty payment with licensed agents and Nigeria Customs Service.",
        "Port Release, Haulage, and Final Delivery: Evacuation from port terminals and transportation directly to your warehouse, factory, or bonded warehouse.",
        "Delivery Confirmation and Document Handover: Final receipt confirmation and complete handover of import records for your accounting and audit.",
      ],
      ctaText: "Request Import Consultation",
      ctaPage: "contact" as Page,
      image: IMG.cargoShip,
      imageAlt: "Large cargo vessel supporting international imports into Nigeria",
    },
    {
      icon: <Search size={26} />,
      title: "Local Sourcing, Global Markets",
      subtitle: "We Find the Right Products. We Manage the Journey.",
      who: "For buyers needing dependable agricultural and mineral procurement in Africa",
      desc: "Finding a reliable supplier is only the beginning. Getting the right product at the right price and quality in the required quantity takes experience and planning. We help buyers source products from trusted supply networks across Nigeria and Africa — bringing procurement expertise, quality control, and logistics planning together from the farm gate, mine, or factory to warehouse and port.",
      whyChoose: [
        "Established sourcing networks across Nigeria and African markets",
        "Quality-focused procurement: clear specifications, sampling, and assay checks",
        "Competitive purchasing considering total supply chain cost",
        "Farm-gate, mine-site, and factory pickup with planned handling",
        "Shipment-ready supply aligned with freight schedules and documentation",
        "Flexible service options: sourcing alone or integrated supply chain",
      ],
      steps: [
        "Understanding Your Requirements: Product specifications, volume, quality grade, packaging, target price, and delivery schedule.",
        "Supplier Identification and Qualification: Assessing supplier credentials, consistency, and track record across Nigeria and Africa.",
        "Procurement and Price Negotiation: Confirming availability and negotiating competitive prices factoring in total landed costs.",
        "Sampling, Quality Control, and Inspection: Arranging samples, laboratory testing, and assay verification at origin or pre-shipment.",
        "Farm-Gate, Mine-Site, or Factory Collection: Gathering produce from farms, consolidation across producers, or collection from mines.",
        "Logistics Planning and Supply Consolidation: Route planning, transport scheduling, handling, and temporary warehousing.",
        "Warehousing, Inventory, and Shipment Preparation: Receipt verification, sorting, grading, repackaging, and alignment with export schedules.",
        "Final Delivery or Export Shipment: Delivery to nominated facilities or end-to-end handover to shipping lines and port terminals.",
        "Supply Chain Follow-Up and Reporting: Regular visibility reports on procurement status, collected quantities, and transit updates.",
      ],
      ctaText: "Start Sourcing Enquiry",
      ctaPage: "quote" as Page,
      image: IMG.beans,
      imageAlt: "Agricultural commodity sourcing — cashew, cocoa and sesame from Nigeria",
    },
    {
      icon: <Warehouse size={26} />,
      title: "Warehousing & Logistics",
      subtitle: "Reliable Storage. Smarter Logistics. Seamless Movement of Goods.",
      who: "For businesses needing multi-state storage, cargo consolidation, and haulage in Nigeria",
      desc: "At Export Trade Africa, we provide warehousing and logistics coordination to help businesses store, manage, handle, and move their goods efficiently. With warehouse access across multiple states in Nigeria, we help clients position products closer to suppliers, production centres, major markets, and transportation corridors.",
      whyChoose: [
        "Connected supply chain: storage integrated with procurement and export shipping",
        "Multi-location warehousing across commercial hubs in Nigeria",
        "Real-time inventory visibility and agreed periodic stock reports",
        "Cargo consolidation from multiple suppliers to optimize transport costs",
        "Export cargo preparation aligned with shipping line cutoff dates",
        "Doorstep haulage to factories, distribution centres, and port terminals",
      ],
      steps: [
        "Goods Receipt and Inventory Registration: Quantity verification, packaging checks, weights, and documentation logged in inventory systems.",
        "Quality Inspection and Condition Reporting: Checking arrival condition, noting discrepancies, and coordinating testing where required.",
        "Secure Storage and Product Handling: Short-term or long-term storage, segregation, palletisation, and specialized handling.",
        "Inventory Management and Stock Visibility: Stock movement tracking and regular reporting on balances and dispatches.",
        "Order Processing, Picking, and Consolidation: Multi-supplier cargo consolidation, sorting, labelling, and dispatch preparation.",
        "Inland Transportation and Distribution: Coordinated transport between suppliers, warehouses, ports, and customer premises.",
        "Export Cargo Preparation and Port Delivery: Packing, labelling, export document alignment, and scheduled delivery to seaport terminals.",
        "Dispatch, Delivery Confirmation, and Reporting: Dispatch coordination, receipt confirmation, and updated inventory reporting.",
      ],
      ctaText: "Request Warehousing Quote",
      ctaPage: "quote" as Page,
      image: IMG.cargoShip2,
      imageAlt: "Freight logistics and warehousing operations",
    },
    {
      icon: <GraduationCap size={26} />,
      title: "Export Training & Mentorship",
      subtitle: "Empowering Exporters & Building Practical International Trade Capability",
      who: "For aspiring exporters, entrepreneurs, and businesses entering international trade",
      desc: "At Export Trade Africa, we believe Africa’s trade potential can only grow when more people have the knowledge and practical skills to participate. We provide training and mentorship for aspiring exporters, small businesses, entrepreneurs, and established businesses looking to expand beyond their domestic markets.",
      whyChoose: [
        "Practical trade reality over theoretical concepts",
        "Led by certified trade and logistics professionals",
        "Covers buyer identification, contract negotiation, and Incoterms",
        "Step-by-step guidance on Nigerian regulatory compliance & Form NXP",
        "One-on-one mentorship tailored to individual business goals",
        "Corporate team coaching for export/import desk setup",
      ],
      steps: [
        "Product selection, market research, and identifying genuine international buyers",
        "Export pricing, costing structures, currency handling, and Incoterms",
        "Export documentation: Form NXP, Certificate of Origin, Phytosanitary, and bills of lading",
        "Regulatory compliance and quality standards across target destination markets",
        "Logistics coordination, freight forwarding, and risk mitigation",
        "One-on-one mentorship and corporate team training for sustainable export operations",
      ],
      ctaText: "Explore Mentorship & Training",
      ctaPage: "mentorship-training" as Page,
      image: IMG.ceoConference,
      imageAlt: "CEO leading an export trade training and mentorship session",
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
                  <div className="text-[#C97B2A] mb-3">{service.icon}</div>
                  <h2 className="font-display text-[#0A1628] text-2xl sm:text-3xl font-bold mb-1.5">
                    {service.title}
                  </h2>
                  <div className="text-[#C97B2A] text-xs font-semibold tracking-wide uppercase mb-3">
                    {service.subtitle}
                  </div>
                  <div className="text-[#64748B] text-xs font-medium mb-4 italic">
                    {service.who}
                  </div>
                  <p className="text-[#64748B] text-sm sm:text-base leading-relaxed mb-6">
                    {service.desc}
                  </p>

                  {/* Why Choose Points */}
                  {service.whyChoose && (
                    <div className="mb-6 bg-[#F8FAFC] border border-[#E8E9EB] rounded-lg p-4">
                      <div className="text-xs font-bold text-[#0A1628] uppercase tracking-wide mb-2.5">
                        Key Advantages
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#64748B]">
                        {service.whyChoose.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-1.5">
                            <span className="text-[#C97B2A] font-bold mt-0.5">•</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Note Callout */}
                  {service.note && (
                    <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 leading-relaxed">
                      <strong>Practical Note:</strong> {service.note}
                    </div>
                  )}

                  {/* Numbered Process */}
                  <div>
                    <div className="text-xs font-bold text-[#0A1628] uppercase tracking-wide mb-4">
                      How It Works · Step-by-Step
                    </div>
                    <ol className="space-y-3">
                      {service.steps.map((step, j) => (
                        <li key={j} className="flex gap-3 text-xs sm:text-sm text-[#64748B]">
                          <span className="shrink-0 w-5 h-5 rounded-full bg-[#0A1628] text-white text-[11px] flex items-center justify-center font-bold mt-0.5">
                            {j + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <button
                    onClick={() => navigate(service.ctaPage)}
                    className="mt-8 bg-[#0A1628] text-white font-semibold px-6 py-3 rounded hover:bg-[#162840] transition-colors flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A]"
                  >
                    {service.ctaText} <ArrowRight size={14} />
                  </button>
                </div>

                <div
                  className={`rounded-2xl overflow-hidden bg-[#E8E9EB] aspect-[4/3] shadow-sm border border-[#E8E9EB] ${
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
                Empowering the next generation of African exporters
              </h2>
              <p className="text-[#64748B] text-base leading-relaxed mb-4 max-w-3xl">
                At Export Trade Africa, we believe Africa's trade potential can only grow when more
                people have the knowledge and practical skills to participate. Our training and
                mentorship sessions are built for aspiring exporters, small businesses, entrepreneurs,
                and established businesses looking to expand beyond their domestic markets.
              </p>
              <p className="text-[#64748B] text-base leading-relaxed max-w-3xl">
                Our learning support covers the practical realities of exporting — product selection,
                market research, buyer identification, pricing, export documentation, regulatory
                compliance, logistics, and international trade procedures. Our aim is to help new
                exporters move beyond the idea of exporting and develop a clearer understanding of
                how to prepare, manage, and grow a sustainable export business.
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
            <div className="rounded-2xl overflow-hidden bg-[#0A1628] aspect-[4/3] sm:aspect-[4/5] max-h-[460px] border border-[#E8E9EB] shadow-md flex items-center justify-center">
              <img
                src={IMG.ceoPortrait}
                alt="CEO and Founder of Export Trade Africa"
                className="w-full h-full object-contain sm:object-cover sm:object-top"
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
      <ChatWidget navigate={navigate} />
    </div>
  );
}
