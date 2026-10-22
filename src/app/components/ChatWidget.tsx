import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Ship,
  Package,
  Warehouse,
  GraduationCap,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

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

type ActionButton = {
  label: string;
  page: Page;
};

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  actions?: ActionButton[];
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    sender: "bot",
    text: "Hello! 👋 Welcome to **Export Trade Africa (ETA)**.\n\nI'm your AI Trade & Sourcing Specialist. Ask me anything about our company, sourcing agricultural commodities and solid minerals from Nigeria, our 9-step export process, 11-step import services & Form M, warehousing across Nigeria, or export training & mentorship.",
    timestamp: "Just now",
    actions: [
      { label: "Request a Quote", page: "quote" },
      { label: "View Products", page: "products" },
      { label: "Our Services", page: "services" },
    ],
  },
];

const SUGGESTIONS = [
  "How does the export process work?",
  "What commodities & minerals do you source?",
  "How do import services & Form M work?",
  "Where are your warehouses located?",
  "Tell me about training & mentorship",
  "What are your 5 core operating elements?",
  "How do I request an export quote?",
];

// ── Knowledge Base Matching Engine ───────────────────────────────────────────
function findAnswer(query: string): { text: string; actions?: ActionButton[] } {
  const q = query.toLowerCase().trim();

  // 1. Export Process
  if (
    q.includes("export process") ||
    q.includes("export steps") ||
    q.includes("how to export") ||
    q.includes("exporting from nigeria") ||
    q.includes("how our export process works")
  ) {
    return {
      text:
        "**Export Trade Africa guides you through a clear 9-stage export journey:**\n\n" +
        "1. **Product Enquiry & Sourcing:** Tell us what you need, quantity, destination country, and specific requirements.\n" +
        "2. **Samples & Quality Specifications:** We arrange samples, agree on product grades, quality standards, and packaging.\n" +
        "3. **Quotation & Proforma Invoice:** Comprehensive pricing, payment terms, delivery arrangements, and Incoterms.\n" +
        "4. **Order Confirmation & Payment:** Documented through a purchase order or sales contract.\n" +
        "5. **Product Preparation & Quality Inspection:** Sorting, grading, processing, independent lab testing, and quality certification.\n" +
        "6. **Export Documentation & Regulatory Compliance:** Form NXP, Certificate of Origin, Phytosanitary Certificate, Commercial Invoice & Packing List, and applicable mineral permits.\n" +
        "7. **Freight Booking & Customs Clearance:** Coordination with shipping lines, freight forwarders, and clearing agents.\n" +
        "8. **Shipment & Transport Documentation:** Verification and issuance of the Bill of Lading or relevant transport documents.\n" +
        "9. **Final Document Dispatch & Shipment Updates:** Complete export package dispatched to the buyer with tracking updates until delivery.",
      actions: [
        { label: "Request Export Quote", page: "quote" },
        { label: "Explore Services", page: "services" },
      ],
    };
  }

  // 2. Import Process & Form M / NSW
  if (
    q.includes("import") ||
    q.includes("form m") ||
    q.includes("single window") ||
    q.includes("customs clearance") ||
    q.includes("importing into nigeria")
  ) {
    return {
      text:
        "**Our 11-step Import Coordination for Nigerian businesses covers:**\n\n" +
        "1. **Understanding Requirements & Sourcing:** Product specs, quantity, budget, and delivery timeline.\n" +
        "2. **Supplier Verification & Negotiation:** Vetting prospective international suppliers and negotiating commercial terms.\n" +
        "3. **Order Confirmation & Payment:** Purchase orders, banking coordination, and FX compliance.\n" +
        "4. **Form M & Pre-Import Documentation:** Partnering with authorised dealer banks, SON, NAFDAC, and relevant agencies.\n" +
        "5. **Regulatory Approvals & National Single Window (NSW):** Supporting electronic submissions through Nigeria's evolving digital trade facilitation framework and MDA engagement.\n" +
        "6. **Supplier Production & Pre-Shipment Inspection:** Quality checks, lab testing, and cargo readiness.\n" +
        "7. **Freight Forwarding:** Sea and air shipping coordination to Nigerian ports.\n" +
        "8. **Arrival & Customs Documentation:** Bill of Lading / Air Waybill, PAAR, Commercial Invoice, Packing List.\n" +
        "9. **Customs Assessment & Duty Payment:** Coordinated with licensed customs agents and Nigeria Customs Service.\n" +
        "10. **Port Release & Haulage:** Direct delivery to your warehouse, factory, business premises, or bonded warehouse.\n" +
        "11. **Delivery Confirmation & Document Handover:** Final verification and complete audit trail records.",
      actions: [
        { label: "Import Consultation", page: "contact" },
        { label: "View Services", page: "services" },
      ],
    };
  }

  // 3. Products / Commodities / Solid Minerals / African Food
  if (
    q.includes("product") ||
    q.includes("commodity") ||
    q.includes("commodities") ||
    q.includes("mineral") ||
    q.includes("minerals") ||
    q.includes("cashew") ||
    q.includes("cocoa") ||
    q.includes("sesame") ||
    q.includes("hibiscus") ||
    q.includes("lithium") ||
    q.includes("zinc") ||
    q.includes("lead") ||
    q.includes("tin") ||
    q.includes("food") ||
    q.includes("charcoal") ||
    q.includes("bitter kola")
  ) {
    return {
      text:
        "**Export Trade Africa sources across three major categories:**\n\n" +
        "🌾 **Agricultural Commodities:**\n" +
        "• Raw Cashew Nuts (RCN)\n" +
        "• Premium Cocoa Beans\n" +
        "• Natural White/Brown Sesame Seeds\n" +
        "• Dried Hibiscus Flowers\n" +
        "• Hardwood Charcoal\n" +
        "• Bitter Kola (Garcinia Kola)\n" +
        "• Dried Split Ginger & Chilli Peppers\n" +
        "• Pure Raw Shea Butter\n\n" +
        "🥘 **African Food Products:**\n" +
        "• Ijebu & Yellow Garri\n" +
        "• Premium Yam Flour\n" +
        "• Pure Palm Oil\n" +
        "• Utazi Leaves & Ugwu Leaves\n" +
        "• Dried/Frozen Giant African Snails\n\n" +
        "⛏️ **Solid Minerals & Industrial Raw Materials:**\n" +
        "• Zinc Ore\n" +
        "• Lead Ore\n" +
        "• Cassiterite / Tin Ore\n" +
        "• Lithium-bearing minerals (Spodumene/Lepidolite)\n" +
        "• Fluorite & Copper Ore\n\n" +
        "All transactions are backed by laboratory testing, assay verification, and full export compliance.",
      actions: [
        { label: "Browse Product Catalog", page: "products" },
        { label: "Get Product Quote", page: "quote" },
      ],
    };
  }

  // 4. Warehousing & Logistics
  if (
    q.includes("warehouse") ||
    q.includes("warehousing") ||
    q.includes("logistics") ||
    q.includes("storage") ||
    q.includes("transport") ||
    q.includes("haulage")
  ) {
    return {
      text:
        "**Warehousing & Logistics by Export Trade Africa:**\n\n" +
        "With warehouse access across multiple states in Nigeria, we position products close to farms, mines, production centres, and shipping ports.\n\n" +
        "**Our 8-Step Value Chain:**\n" +
        "1. Goods Receipt & Inventory Registration\n" +
        "2. Quality Inspection & Condition Reporting\n" +
        "3. Secure Storage & Handling (short & long-term)\n" +
        "4. Inventory Management & Stock Visibility\n" +
        "5. Order Processing, Picking & Consolidation\n" +
        "6. Inland Transportation & Route Planning\n" +
        "7. Export Cargo Preparation & Port Delivery\n" +
        "8. Dispatch, Delivery Confirmation & Reporting\n\n" +
        "We coordinate haulage directly to Apapa, Tin Can, or on-forwarding destinations across Nigeria.",
      actions: [
        { label: "Learn More on Services", page: "services" },
        { label: "Contact Logistics Team", page: "contact" },
      ],
    };
  }

  // 5. Training & Mentorship
  if (
    q.includes("training") ||
    q.includes("mentor") ||
    q.includes("mentorship") ||
    q.includes("learn") ||
    q.includes("course") ||
    q.includes("class") ||
    q.includes("coach")
  ) {
    return {
      text:
        "**Export Training and Mentorship:**\n\n" +
        "At Export Trade Africa, we believe Africa’s trade potential grows when more people possess practical skills.\n\n" +
        "Our programmes are led by our Founder and seasoned trade practitioners with professional certifications in international trade and logistics:\n\n" +
        "• **Product Selection & Sourcing:** Finding competitive African products\n" +
        "• **Market Research & Buyer Identification:** Securing legitimate international buyers\n" +
        "• **Pricing & Costing:** Freight, Incoterms, currency risk, and margins\n" +
        "• **Export Documentation & Compliance:** Form NXP, Phytosanitary, Certificate of Origin, SONCAP\n" +
        "• **One-to-One Mentorship:** Tailored guidance for entrepreneurs\n" +
        "• **Corporate Team Training:** Building internal export/import desks for businesses",
      actions: [
        { label: "View Mentorship Details", page: "mentorship-training" },
        { label: "Book a Session", page: "contact" },
      ],
    };
  }

  // 6. About ETA / Founder / Location / Core Elements
  if (
    q.includes("about") ||
    q.includes("company") ||
    q.includes("who are you") ||
    q.includes("founder") ||
    q.includes("ceo") ||
    q.includes("mission") ||
    q.includes("vision") ||
    q.includes("location") ||
    q.includes("office") ||
    q.includes("address") ||
    q.includes("elements") ||
    q.includes("how we work")
  ) {
    return {
      text:
        "**About Export Trade Africa (ETA):**\n\n" +
        "Export Trade Africa is an African trade and supply chain company established in **Lagos, Nigeria**.\n\n" +
        "• **Mission:** To make it easier for businesses around the world to source quality products from Africa, and for African businesses to participate confidently in international trade.\n" +
        "• **Credentials:** Built on practical Nigerian commodity market experience, supported by professional certifications in international trade and logistics.\n" +
        "• **Our 5 Operating Elements:**\n" +
        "  1. Reliable sourcing from trusted producers & mines\n" +
        "  2. Quality assurance & laboratory inspection\n" +
        "  3. Trade documentation & regulatory compliance\n" +
        "  4. Logistics & supply chain coordination\n" +
        "  5. Communication & transparent accountability\n\n" +
        "• **Office Location:** Plot 14B, Admiralty Way, Lekki Phase 1, Lagos, Nigeria.\n" +
        "• **Tagline:** *Sourcing Africa. Connecting Markets. Empowering Exporters.*",
      actions: [
        { label: "Read Our Story", page: "about" },
        { label: "Contact Office", page: "contact" },
      ],
    };
  }

  // 7. Sourcing & Supply Chain
  if (
    q.includes("sourcing") ||
    q.includes("supply chain") ||
    q.includes("procurement") ||
    q.includes("farm gate")
  ) {
    return {
      text:
        "**Local Sourcing, Global Markets:**\n\n" +
        "We find the right products and manage the entire journey from farm gate, mine site, or factory to warehouse or international port.\n\n" +
        "**Our 3 Essential Capabilities:**\n" +
        "1. **Procurement & Supplier Management:** Sourcing networks across Nigeria and Africa.\n" +
        "2. **Quality Control & Product Assurance:** Sampling, assay, and pre-shipment inspections.\n" +
        "3. **Logistics & Supply Chain Coordination:** Farm collection, consolidation, warehousing, and freight.\n\n" +
        "We coordinate the full journey so buyers don't have to juggle fragmented vendors.",
      actions: [
        { label: "Start Sourcing Enquiry", page: "quote" },
        { label: "Explore Services", page: "services" },
      ],
    };
  }

  // 8. Quote / Pricing / Contact
  if (
    q.includes("quote") ||
    q.includes("price") ||
    q.includes("cost") ||
    q.includes("contact") ||
    q.includes("phone") ||
    q.includes("email") ||
    q.includes("whatsapp")
  ) {
    return {
      text:
        "**Get in Touch with Export Trade Africa:**\n\n" +
        "• **Office Address:** Plot 14B, Admiralty Way, Lekki Phase 1, Lagos, Nigeria\n" +
        "• **Email:** info@exporttradeafrica.com\n" +
        "• **Phone / WhatsApp:** +234 803 000 0000\n" +
        "• **Hours:** Mon–Fri 8:00 AM – 6:00 PM WAT, Sat 9:00 AM – 1:00 PM WAT\n\n" +
        "You can request an export quote or submit an import consultation form online in under 2 minutes.",
      actions: [
        { label: "Request a Quote", page: "quote" },
        { label: "Contact Us", page: "contact" },
      ],
    };
  }

  // 9. Compliance / Form NXP / Certifications
  if (
    q.includes("compliance") ||
    q.includes("nxp") ||
    q.includes("phytosanitary") ||
    q.includes("certificate of origin") ||
    q.includes("customs") ||
    q.includes("son") ||
    q.includes("nafdac")
  ) {
    return {
      text:
        "**Trade Documentation & Compliance:**\n\n" +
        "Export Trade Africa handles all regulatory approvals and mandatory filings:\n\n" +
        "• **Form NXP:** Nigeria Export Proceeds form through CBN authorised banks\n" +
        "• **Phytosanitary Certificate:** Plant health clearance for agricultural commodities\n" +
        "• **Certificate of Origin:** Validating source origin for preferential tariff treatment\n" +
        "• **Commercial Invoice & Packing List:** Accurate weights, grades, and HS codes\n" +
        "• **Solid Mineral Permits:** Mining export permits, royalties, and assay certificates\n" +
        "• **Form M & NSW:** For imports, coordinated with SON, NAFDAC, and Nigeria Customs Service.",
      actions: [
        { label: "Trust & Compliance Details", page: "compliance" },
        { label: "Talk to Compliance Team", page: "contact" },
      ],
    };
  }

  // Fallback
  return {
    text:
      "Thank you for asking! **Export Trade Africa (ETA)** is an African trade and supply chain company based in Lagos, Nigeria.\n\n" +
      "We specialise in:\n" +
      "• **Exporting** Agricultural Commodities (Cashew, Cocoa, Sesame, Hibiscus) and Solid Minerals (Zinc, Lead, Tin, Lithium)\n" +
      "• **Import Coordination** for machinery, raw materials, and finished goods (Form M & customs clearance)\n" +
      "• **Warehousing & Logistics** across multiple Nigerian states\n" +
      "• **Export Training & Mentorship** for new and growing exporters\n\n" +
      "Would you like to request a quote, view our product catalog, or read more about our services?",
    actions: [
      { label: "Request a Quote", page: "quote" },
      { label: "View Products", page: "products" },
      { label: "Contact Us", page: "contact" },
    ],
  };
}

// ── Main ChatWidget Component ────────────────────────────────────────────────
export function ChatWidget({ navigate }: { navigate: (page: Page) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, messages, isTyping]);

  function handleSend(userText?: string) {
    const textToSend = (userText || input).trim();
    if (!textToSend) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userText) setInput("");
    setIsTyping(true);

    // Simulate smart thinking delay
    setTimeout(() => {
      const response = findAnswer(textToSend);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: response.text,
        timestamp: "Just now",
        actions: response.actions,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  }

  function handleReset() {
    setMessages(INITIAL_MESSAGES);
    setInput("");
  }

  function handleActionClick(page: Page) {
    navigate(page);
    // On mobile, optionally close or keep minimized
    if (window.innerWidth < 640) {
      setIsOpen(false);
    }
  }

  return (
    <>
      {/* ── Floating Launcher ── */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
          <button
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="group relative flex items-center gap-3 bg-[#0A1628] hover:bg-[#162840] text-white pl-4 pr-5 py-3.5 rounded-full shadow-2xl border border-white/20 transition-all duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C97B2A]"
            aria-label="Open AI Trade Assistant"
          >
            {/* Glowing Accent Ring */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#C97B2A] to-[#E59840] opacity-40 blur-sm group-hover:opacity-75 transition duration-300" />

            <div className="relative w-8 h-8 rounded-full bg-[#C97B2A] flex items-center justify-center text-white font-bold text-xs shadow-inner">
              <Sparkles size={16} className="animate-spin-slow" />
            </div>

            <div className="relative text-left">
              <div className="text-xs font-bold leading-tight flex items-center gap-1.5">
                ETA AI Assistant
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-[10px] text-white/70">Ask about trade & sourcing</div>
            </div>

            {hasUnread && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#C97B2A] border-2 border-white rounded-full" />
            )}
          </button>
        </div>
      )}

      {/* ── Active Chat Modal / Window ── */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ease-out flex flex-col ${
            isMinimized
              ? "bottom-5 right-5 sm:bottom-6 sm:right-6 w-72 h-14 rounded-2xl shadow-xl overflow-hidden bg-[#0A1628] border border-white/20"
              : "bottom-4 right-3 sm:bottom-6 sm:right-6 w-[calc(100vw-24px)] sm:w-[410px] h-[580px] max-h-[86vh] rounded-2xl shadow-2xl bg-white border border-[#E8E9EB] overflow-hidden"
          }`}
        >
          {/* Header */}
          <div className="bg-[#0A1628] text-white px-4 py-3 sm:py-3.5 flex items-center justify-between shrink-0 border-b border-white/10 select-none">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C97B2A] flex items-center justify-center text-white font-bold shadow-inner">
                <Sparkles size={16} />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
                  Export Trade Africa AI
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                </div>
                <div className="text-[10px] text-white/70">
                  Online · Sourcing & Trade Intelligence
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset conversation"
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                aria-label="Reset chat"
              >
                <RotateCcw size={14} />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? "Expand chat" : "Minimize chat"}
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                aria-label="Minimize or Expand"
              >
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isMinimized ? "rotate-180" : ""}`}
                />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Minimized Content: click anywhere to expand */}
          {isMinimized && (
            <div
              onClick={() => setIsMinimized(false)}
              className="px-4 py-2 text-white/80 text-xs cursor-pointer flex items-center justify-between"
            >
              <span>Click to resume chat</span>
              <Sparkles size={14} className="text-[#C97B2A]" />
            </div>
          )}

          {/* Expanded Chat Body */}
          {!isMinimized && (
            <>
              {/* Message History */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC]">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-sm ${
                        msg.sender === "user"
                          ? "bg-[#0A1628] text-white rounded-br-xs"
                          : "bg-white text-[#1E293B] border border-[#E2E8F0] rounded-bl-xs"
                      }`}
                    >
                      <div className="whitespace-pre-line space-y-1">
                        {renderFormattedText(msg.text)}
                      </div>

                      {/* Action buttons inside bot messages */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] flex flex-wrap gap-1.5">
                          {msg.actions.map((act) => (
                            <button
                              key={act.label}
                              onClick={() => handleActionClick(act.page)}
                              className="inline-flex items-center gap-1.5 text-[11px] font-semibold bg-[#F1F5F9] hover:bg-[#C97B2A] text-[#0A1628] hover:text-white px-2.5 py-1.5 rounded-md border border-[#CBD5E1] transition-all"
                            >
                              <span>{act.label}</span>
                              <ArrowRight size={11} />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-[#94A3B8] mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-xs text-[#64748B] bg-white border border-[#E2E8F0] rounded-2xl px-4 py-2.5 max-w-[120px] shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C97B2A] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C97B2A] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C97B2A] animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions Chips Carousel */}
              <div className="bg-white border-t border-[#E8E9EB] px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] text-[#94A3B8] font-semibold uppercase tracking-wider shrink-0 pl-1">
                  Ask:
                </span>
                {SUGGESTIONS.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleSend(sug)}
                    className="text-[11px] text-[#0A1628] bg-[#F1F5F9] hover:bg-[#E2E8F0] active:scale-95 px-2.5 py-1 rounded-full whitespace-nowrap transition-colors shrink-0"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="bg-white p-3 border-t border-[#E8E9EB] flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about commodities, export/import, logistics..."
                  className="flex-1 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#0A1628] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0A1628] focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="bg-[#0A1628] hover:bg-[#162840] disabled:opacity-40 disabled:hover:bg-[#0A1628] text-white p-2.5 rounded-xl transition-colors shrink-0 flex items-center justify-center shadow-sm"
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}

// ── Markdown-like rendering helper for clean bolding & bullet points ──────────
function renderFormattedText(rawText: string) {
  const lines = rawText.split("\n");
  return lines.map((line, idx) => {
    // Process markdown **bold**
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <div key={idx} className={line === "" ? "h-2" : "leading-relaxed"}>
        {parts.map((part, pIdx) => {
          if (part.startsWith("**") && part.endsWith("**")) {
            return (
              <strong key={pIdx} className="font-semibold text-[#0A1628]">
                {part.slice(2, -2)}
              </strong>
            );
          }
          if (part.startsWith("*") && part.endsWith("*")) {
            return (
              <em key={pIdx} className="italic text-[#C97B2A]">
                {part.slice(1, -1)}
              </em>
            );
          }
          return <span key={pIdx}>{part}</span>;
        })}
      </div>
    );
  });
}
