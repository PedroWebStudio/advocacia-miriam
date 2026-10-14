"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Image from "next/image";
import { ArrowRight } from "@/components/icons";
import { FormEvent, useEffect, useId, useRef, useState } from "react";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mrs-display",
});

const sans = Manrope({ subsets: ["latin"], variable: "--font-mrs-sans" });

const aboutPoints = [
  "Advogada especializada em Direito do Trabalho",
  "Atuação exclusiva em processos trabalhistas",
  "Defesa de direitos em rescisões e verbas salariais",
  "Acompanhamento próximo em todas as fases do processo",
  "Linguagem clara e estratégia alinhada ao seu caso",
];

const areas = [
  { n: "I",   title: "Rescisão e verbas", text: "Cobrança de direitos em demissões, avisos e valores devidos." },
  { n: "II",  title: "Horas extras",      text: "Reconhecimento de jornadas irregulares e pagamentos omitidos." },
  { n: "III", title: "Assédio e danos",   text: "Proteção da dignidade no ambiente de trabalho e reparação." },
  { n: "IV",  title: "FGTS e benefícios", text: "Regularização de depósitos, estabilidade e benefícios legais." },
];

const situations = [
  { title: "Fui demitido e não recebi tudo",          text: "Verbas rescisórias incompletas, atrasos ou valores que não fecham com o contrato." },
  { title: "Faço hora extra sem receber",             text: "Jornada além do combinado, banco de horas irregular ou pagamento parcial." },
  { title: "Sofro pressão ou assédio no trabalho",    text: "Ambiente hostil, humilhações ou situações que afetam saúde e dignidade." },
  { title: "Meus direitos não estão sendo respeitados", text: "FGTS, férias, adicional, estabilidade ou qualquer irregularidade na relação de emprego." },
];

const steps = [
  { n: "01", title: "Conversa inicial", text: "Você conta o que aconteceu. Eu escuto com atenção e identifico os pontos jurídicos centrais." },
  { n: "02", title: "Análise do caso",  text: "Documentos, prazos e provas são avaliados para montar a estratégia mais adequada." },
  { n: "03", title: "Proposta clara",   text: "Você recebe um caminho objetivo: o que cabe, o que esperar e como seguiremos." },
  { n: "04", title: "Acompanhamento",   text: "Do protocolo à audiência, cada etapa é comunicada com transparência." },
];

const faqs = [
  { q: "Atende só processos trabalhistas?",       a: "Sim. A atuação é exclusiva em Direito do Trabalho — foco total no que realmente importa para o seu caso." },
  { q: "Preciso ter todos os documentos prontos?", a: "Não. Na conversa inicial já orientamos o que reunir. Holerites, contrato, mensagens e comprovantes ajudam, mas começamos mesmo sem o pacote completo." },
  { q: "Quanto tempo leva um processo?",           a: "Depende da complexidade e da vara. O que posso garantir é acompanhamento contínuo e comunicação clara em cada fase." },
  { q: "Posso conversar antes de decidir?",        a: "Sim. O primeiro contato serve para entender a situação e avaliar se há caminho jurídico — sem compromisso precipitado." },
];

const nav = [
  { href: "#trajetoria",   label: "Sobre" },
  { href: "#atuacao",      label: "Atuação" },
  { href: "#como-funciona", label: "Como funciona" },
];

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const titleId = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          phone: fd.get("phone"),
          email: fd.get("email"),
          subject: fd.get("subject"),
          message: fd.get("message"),
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <button type="button" aria-label="Fechar" className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />
          <motion.div
            role="dialog" aria-modal="true" aria-labelledby={titleId}
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl"
          >
            {/* Sidebar */}
            <div className="hidden w-56 shrink-0 flex-col justify-between bg-[#3d0a18] p-8 sm:flex">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#D4AF37]">Contato</p>
                <h2 id={titleId} className="mt-4 font-[family-name:var(--font-mrs-display)] text-3xl leading-tight text-white">Fale<br />comigo</h2>
                <div className="mt-6 h-px w-10 bg-[#D4AF37]/50" />
                <p className="mt-6 text-xs leading-6 text-white/45">Respondo em até 24h com atenção ao seu caso.</p>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">Contatos</p>
                <a href="tel:+5511999999999" className="block text-xs text-white/60 transition hover:text-[#D4AF37]">(11) 99999-9999</a>
                <a href="https://instagram.com/advmiriam" target="_blank" rel="noopener noreferrer" className="block text-xs text-white/60 transition hover:text-[#D4AF37]">@advmiriam</a>
              </div>
            </div>

            {/* Formulário */}
            <div className="flex-1 overflow-y-auto bg-[#5A0B22]">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <p className="font-[family-name:var(--font-mrs-display)] text-xl text-white sm:hidden">Fale comigo</p>
                <div className="hidden sm:block" />
                <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/50 transition hover:border-[#D4AF37] hover:text-[#D4AF37]" aria-label="Fechar">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1l10 10M11 1L1 11" /></svg>
                </button>
              </div>

              {status === "done" ? (
                <div className="flex flex-col items-center justify-center gap-4 p-10 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/10">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7 text-[#D4AF37]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <p className="font-[family-name:var(--font-mrs-display)] text-2xl text-white">Mensagem enviada!</p>
                  <p className="text-sm text-white/50">Retorno em até 24h.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 p-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block">
                      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">Nome</span>
                      <input required name="name" type="text" autoComplete="name" placeholder="Seu nome" className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#D4AF37]/60" />
                    </label>
                    <label className="block">
                      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">WhatsApp</span>
                      <input required name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(11) 99999-9999" className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#D4AF37]/60" />
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">E-mail</span>
                    <input required name="email" type="email" autoComplete="email" placeholder="seu@email.com" className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#D4AF37]/60" />
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">Assunto</span>
                    <input required name="subject" type="text" placeholder="Ex.: rescisão, horas extras..." className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#D4AF37]/60" />
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">Mensagem</span>
                    <textarea required name="message" rows={4} placeholder="Conte brevemente a sua situação" className="mt-2 w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#D4AF37]/60" />
                  </label>
                  {status === "error" && <p className="text-xs text-red-400">Erro ao enviar. Tente novamente.</p>}
                  <button type="submit" disabled={status === "sending"}
                    className="group flex w-full items-center justify-center gap-3 rounded-lg bg-[#D4AF37] py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#3d0a18] transition hover:bg-white disabled:opacity-60"
                  >
                    {status === "sending" ? "Enviando..." : "Enviar mensagem"}
                    <span className="transition-transform group-hover:translate-x-1"><ArrowRight className="h-3.5 w-3.5" /></span>
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function MiriamAdvocacia() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.15]);
  const veil = useTransform(scrollYProgress, [0, 1], [0, 0.45]);

  function openContact() { setMenuOpen(false); setContactOpen(true); }

  return (
    <main className={`${display.variable} ${sans.variable} min-h-screen bg-[#F7F4F2] text-[#2C181E]`} style={{ fontFamily: "var(--font-mrs-sans)" }}>

      {/* HEADER */}
      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-8">
          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/55 transition hover:text-[#D4AF37]">{item.label}</a>
            ))}
          </nav>
          <a href="#" className="lg:justify-self-center">
            <span className="font-[family-name:var(--font-mrs-display)] text-lg tracking-wide text-[#D4AF37]">MS</span>
          </a>
          <div className="flex items-center justify-end gap-4">
            <button type="button" onClick={openContact} className="hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4AF37] transition hover:text-white lg:inline">Contato</button>
            <button type="button" onClick={() => setMenuOpen((v) => !v)} className="flex flex-col gap-1.5 lg:hidden" aria-label="Menu">
              <span className="block h-px w-6 bg-white" />
              <span className="block h-px w-6 bg-white" />
              <span className="block h-px w-6 bg-white" />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border-t border-white/10 bg-[#5A0B22]/95 px-6 py-4 backdrop-blur lg:hidden">
              {nav.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="block py-3 text-sm text-white/80">{item.label}</a>
              ))}
              <button type="button" onClick={openContact} className="mt-2 block w-full py-3 text-left text-sm text-[#D4AF37]">Contato</button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section ref={heroRef} className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-28 text-center">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 35%, #6e1230 0%, #5A0B22 48%, #2f0612 100%)" }} />
        <motion.div className="absolute inset-0 bg-[#1a040c]" style={{ opacity: veil }} />
        <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} className="pointer-events-none absolute left-1/2 top-[42%] h-[min(78vw,520px)] w-[min(78vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF37]/20" aria-hidden />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="pointer-events-none absolute left-1/2 top-[42%] h-[min(92vw,640px)] w-[min(92vw,640px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" aria-hidden />

        <motion.div style={{ y: logoY, opacity: logoOpacity }} className="relative z-10 flex w-full max-w-3xl flex-col items-center">
          <motion.div initial={{ opacity: 0, filter: "blur(12px)", scale: 1.06 }} animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
            <Image src="/images/logo-ms.png" alt="Miriam Rodrigues Santos — Advocacia Trabalhista" width={985} height={438} priority className="mx-auto h-auto w-[min(88vw,420px)] bg-transparent [mix-blend-mode:lighten]" unoptimized />
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }} className="mt-8 text-[11px] font-medium uppercase tracking-[0.35em] text-[#D4AF37]">Especialista em Direito do Trabalho</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }} className="mt-5 max-w-2xl font-[family-name:var(--font-mrs-display)] text-3xl leading-[1.15] text-white sm:text-5xl">
            Seus direitos trabalhistas,<br />com estratégia e presença.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }} className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/60">
            Atuação exclusiva em processos trabalhistas — rescisões, verbas, horas extras e demais demandas da relação de emprego.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.65 }} className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-white/45">
            <span>Rescisão</span><span className="text-[#D4AF37]/50">·</span><span>Horas extras</span><span className="text-[#D4AF37]/50">·</span><span>Assédio</span><span className="text-[#D4AF37]/50">·</span><span>FGTS</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button type="button" onClick={openContact} className="bg-[#D4AF37] px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5A0B22] transition hover:bg-white">Fale comigo</button>
            <a href="#atuacao" className="border border-white/30 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]">Ver atuação</a>
          </motion.div>
          <motion.a href="#trajetoria" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.95 }} className="mt-14 inline-flex flex-col items-center gap-3 text-[10px] font-medium uppercase tracking-[0.35em] text-white/40 transition hover:text-[#D4AF37]">
            Conhecer
            <span className="relative flex h-12 w-5 items-start justify-center overflow-hidden rounded-full border border-white/20">
              <motion.span className="mt-1.5 h-2 w-1 rounded-full bg-[#D4AF37]" animate={{ y: [0, 24, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
            </span>
          </motion.a>
        </motion.div>
      </section>

      {/* SOBRE */}
      <section id="trajetoria" className="grid lg:grid-cols-2">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.9 }} className="relative min-h-[480px] overflow-hidden bg-[#3d0a18] lg:min-h-[640px]">
          <Image src="/images/miriam.png" alt="Miriam Rodrigues Santos" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[center_20%]" priority />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col justify-center bg-[#5A0B22] px-8 py-14 text-white sm:px-12 sm:py-20 lg:px-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#D4AF37]">Quem sou eu</p>
          <h2 className="mt-4 font-[family-name:var(--font-mrs-display)] text-4xl leading-tight sm:text-5xl">Miriam Rodrigues Santos</h2>
          <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-white/55">Advogada · Direito do Trabalho</p>
          <div className="mt-8 h-px w-16 bg-[#D4AF37]" />
          <p className="mt-8 text-sm leading-7 text-white/70">Atuo exclusivamente com processos trabalhistas. Meu compromisso é defender os direitos do trabalhador com estratégia, clareza e acompanhamento próximo em cada etapa do processo.</p>
          <ul className="mt-10 space-y-4">
            {aboutPoints.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-white/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" />{item}
              </li>
            ))}
          </ul>
          <a href="https://instagram.com/advmiriam" target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-[#D4AF37] transition hover:text-white">Instagram · @advmiriam</a>
        </motion.div>
      </section>

      {/* ATUAÇÃO */}
      <section id="atuacao" className="bg-[#5A0B22]">
        <div className="border-b border-white/10 px-6 py-14 text-center sm:py-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#D4AF37]">Direito do Trabalho</p>
          <h2 className="mt-4 font-[family-name:var(--font-mrs-display)] text-4xl text-white sm:text-5xl">Processos trabalhistas.<br />Só isso. Com profundidade.</h2>
        </div>
        <div>
          {areas.map((area, index) => (
            <motion.article key={area.title} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }} className="group border-b border-white/10">
              <div className="mx-auto grid max-w-5xl items-center gap-4 px-6 py-10 transition duration-500 group-hover:bg-white/[0.03] sm:grid-cols-[5rem_1fr_1.4fr] sm:gap-10 sm:py-12 lg:px-8">
                <span className="font-[family-name:var(--font-mrs-display)] text-3xl text-[#D4AF37]/70 transition group-hover:text-[#D4AF37]">{area.n}</span>
                <h3 className="font-[family-name:var(--font-mrs-display)] text-3xl text-white sm:text-4xl">{area.title}</h3>
                <p className="text-sm leading-7 text-white/55 sm:text-right">{area.text}</p>
              </div>
              <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.05 * index }} className="h-px origin-left bg-gradient-to-r from-[#D4AF37]/50 to-transparent" />
            </motion.article>
          ))}
        </div>
      </section>

      {/* QUANDO PROCURAR */}
      <section id="quando-procurar" className="bg-[#F7F4F2] py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#8A6B2E]">Quando procurar</p>
            <h2 className="mt-4 font-[family-name:var(--font-mrs-display)] text-4xl text-[#5A0B22] sm:text-5xl">Situações em que posso ajudar.</h2>
            <p className="mt-5 text-sm leading-7 text-[#2C181E]/60">Se alguma dessas realidades faz parte do seu dia a dia, vale uma conversa para entender os seus direitos.</p>
          </div>
          <div className="mt-14 divide-y divide-[#5A0B22]/10 border-y border-[#5A0B22]/10">
            {situations.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.05 }} className="grid gap-3 py-8 sm:grid-cols-[2fr_3fr] sm:gap-10">
                <h3 className="font-[family-name:var(--font-mrs-display)] text-2xl text-[#5A0B22] sm:text-3xl">{item.title}</h3>
                <p className="text-sm leading-7 text-[#2C181E]/60">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="relative overflow-hidden py-20 text-white sm:py-28" style={{ background: "radial-gradient(ellipse at 70% 0%, #7a1840 0%, #5A0B22 55%, #3a0716 100%)" }}>
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="max-w-xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#D4AF37]">Como funciona</p>
            <h2 className="mt-4 font-[family-name:var(--font-mrs-display)] text-4xl sm:text-5xl">Do primeiro contato<br />ao acompanhamento.</h2>
          </div>
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:gap-x-14 lg:gap-y-16">
            {steps.map((step, index) => (
              <motion.div key={step.n} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.08 }}>
                <p className="text-xs tracking-[0.28em] text-[#D4AF37]">{step.n}</p>
                <h3 className="mt-3 font-[family-name:var(--font-mrs-display)] text-3xl">{step.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-white/60">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPROMISSO */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#8A6B2E]">Compromisso</p>
            <h2 className="mt-5 font-[family-name:var(--font-mrs-display)] text-4xl leading-tight text-[#5A0B22] sm:text-5xl">Especialização real.<br />Atendimento humano.</h2>
            <div className="mx-auto mt-8 h-px w-20 bg-[#D4AF37]" />
            <p className="mx-auto mt-8 max-w-xl text-[15px] leading-8 text-[#2C181E]/65">Não diluo a prática em várias áreas. Ao concentrar a atuação em processos trabalhistas, cada análise ganha profundidade — e você ganha uma condução mais segura, clara e próxima.</p>
            <div className="mx-auto mt-12 grid max-w-2xl gap-8 text-left sm:grid-cols-3 sm:gap-6">
              {[["Foco", "Somente trabalhista"], ["Clareza", "Linguagem acessível"], ["Presença", "Acompanhamento próximo"]].map(([title, text]) => (
                <div key={title} className="border-t border-[#5A0B22]/15 pt-4">
                  <p className="font-[family-name:var(--font-mrs-display)] text-2xl text-[#5A0B22]">{title}</p>
                  <p className="mt-2 text-sm text-[#2C181E]/55">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="duvidas" className="bg-[#F7F4F2] py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-[#8A6B2E]">Dúvidas frequentes</p>
            <h2 className="mt-4 font-[family-name:var(--font-mrs-display)] text-4xl text-[#5A0B22] sm:text-5xl">Perguntas que costumam surgir.</h2>
          </div>
          <div className="mt-14 divide-y divide-[#5A0B22]/10 border-y border-[#5A0B22]/10">
            {faqs.map((item, index) => (
              <motion.details key={item.q} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left marker:content-none">
                  <span className="font-[family-name:var(--font-mrs-display)] text-xl text-[#5A0B22] sm:text-2xl">{item.q}</span>
                  <span className="mt-1 text-[#D4AF37] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#2C181E]/60">{item.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="relative overflow-hidden py-24 text-white sm:py-32" style={{ background: "radial-gradient(ellipse at 30% 0%, #7a1840 0%, #5A0B22 55%, #3a0716 100%)" }}>
        <p aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-[family-name:var(--font-mrs-display)] text-[38vw] leading-none text-white/[0.04]">MS</p>
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center lg:px-8">
          <motion.div initial={{ opacity: 0, filter: "blur(8px)" }} whileInView={{ opacity: 1, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.9 }}>
            <Image src="/images/logo-ms.png" alt="" width={200} height={90} className="mx-auto h-auto w-36 bg-transparent [mix-blend-mode:lighten]" unoptimized />
            <h2 className="mt-10 font-[family-name:var(--font-mrs-display)] text-4xl sm:text-5xl md:text-6xl">Vamos conversar.</h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-white/60">Conte um pouco da sua situação trabalhista. Retorno com atenção e objetividade.</p>
            <div className="mt-12 flex flex-col items-center gap-5">
              <button type="button" onClick={openContact} className="bg-[#D4AF37] px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5A0B22] transition hover:bg-white">Enviar mensagem</button>
              <a href="tel:+5511999999999" className="text-sm tracking-wide text-white/70 transition hover:text-[#D4AF37]">(11) 99999-9999</a>
              <a href="https://instagram.com/advmiriam" target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-[0.28em] text-[#D4AF37]/80 transition hover:text-white">@advmiriam</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#3a0716] py-8 text-white/40">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 text-center text-xs sm:flex-row sm:text-left lg:px-8">
          <p>© {new Date().getFullYear()} Miriam Rodrigues Santos</p>
          <p className="uppercase tracking-[0.2em]">Advocacia trabalhista</p>
        </div>
      </footer>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
}
