// src/components/_shared.tsx
// ─── مكونات مشتركة بين جميع الصفحات ───

import type { Sahabi, Story } from "@/lib/sahaba-data";

export type PageId = "home" | "sahaba" | "stories" | "quiz" | "contact";

export const NAV: { id: PageId; label: string }[] = [
  { id: "home", label: "الرئيسية" },
  { id: "sahaba", label: "الصحابة" },
  { id: "stories", label: "القصص" },
  { id: "quiz", label: "الاختبار" },
  { id: "contact", label: "تواصل معنا" },
];

/* ══════════ NAVBAR ══════════ */
export function Navbar({
  page,
  navOpen,
  setNavOpen,
  go,
}: {
  page: PageId;
  navOpen: boolean;
  setNavOpen: (v: boolean) => void;
  go: (id: PageId) => void;
}) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[oklch(0.18_0.025_145/0.92)] border-b border-[color:var(--border)]">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <button
          onClick={() => go("home")}
          className="font-display text-2xl text-gold tracking-wide"
        >
          الصحابة الكرام ✦
        </button>

        <ul
          className={`${
            navOpen ? "flex" : "hidden"
          } md:flex absolute md:static top-full inset-x-0 md:inset-auto flex-col md:flex-row gap-2 md:gap-8 bg-green-mid md:bg-transparent p-6 md:p-0 border-b md:border-0 border-[color:var(--border)]`}
        >
          {NAV.map((n) => (
            <li key={n.id}>
              <button
                onClick={() => { go(n.id); setNavOpen(false); }}
                className={`text-sm font-light transition-colors hover:text-gold ${
                  page === n.id ? "text-gold border-b border-gold pb-0.5" : "text-text-muted"
                }`}
              >
                {n.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setNavOpen((v) => !v)}
          className="md:hidden text-gold text-xl"
          aria-label="القائمة"
        >
          ☰
        </button>
      </nav>
    </header>
  );
}

/* ══════════ FOOTER ══════════ */
export function Footer() {
  return (
    <footer className="mt-12 border-t border-[color:var(--border)] bg-[oklch(0.16_0.022_145)]">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center">
        <p className="font-display text-lg text-gold/60 mb-2">✦ الصحابة الكرام ✦</p>
        <p className="text-sm text-text-muted">
          موقع الصحابة الكرام · صُنع بـ<span className="text-gold">❤</span> لنشر سيرة أصحاب النبي ﷺ
        </p>
        <p className="text-xs text-text-dim mt-2">© جميع الحقوق محفوظة 2026 ·</p>
      </div>
    </footer>
  );
}

/* ══════════ MODAL ══════════ */
export function Modal({
  modal,
  onClose,
}: {
  modal: { type: "sahabi"; data: Sahabi } | { type: "story"; data: Story };
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-green-mid border border-gold/30 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
      >
        <div className="flex items-center gap-4 p-6 border-b border-[color:var(--border)] sticky top-0 bg-green-mid">
          <div className="w-16 h-16 rounded-full border-2 border-gold bg-green-deep flex items-center justify-center font-display text-2xl text-gold flex-shrink-0">
            {modal.type === "sahabi" ? modal.data.init : "📖"}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-display text-2xl text-gold truncate">
              {modal.type === "sahabi" ? modal.data.name : modal.data.title}
            </h2>
            <p className="text-sm text-text-muted truncate">
              {modal.type === "sahabi" ? modal.data.laqab : modal.data.cat}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-gold text-2xl leading-none"
            aria-label="إغلاق"
          >
            ✕
          </button>
        </div>
        <div
          className="p-6 text-[color:var(--text-main)] leading-loose modal-body"
          dangerouslySetInnerHTML={{
            __html:
              modal.type === "sahabi"
                ? modal.data.bio
                : `<p style="line-height:2.1">${modal.data.full}</p>`,
          }}
        />
      </div>
      <style>{`
        .modal-body h4 {
          font-family: 'Amiri', serif;
          font-size: 1.15rem;
          color: var(--gold);
          margin: 1.25rem 0 0.5rem;
          border-right: 3px solid var(--gold);
          padding-right: 0.75rem;
        }
        .modal-body p { margin-bottom: 0.5rem; color: var(--text-main); }
      `}</style>
    </div>
  );
}

/* ══════════ REUSABLE UI ══════════ */
export function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="text-center mb-10">
      <p className="text-xs tracking-[0.3em] uppercase text-[color:var(--green-light)] font-semibold mb-2">
        {label}
      </p>
      <h2 className="font-display text-3xl md:text-4xl text-[color:var(--green-deep)]">{title}</h2>
      <div className="w-12 h-px bg-gold mx-auto mt-4" />
    </div>
  );
}

export function Ornament() {
  return (
    <div className="max-w-6xl mx-auto px-6 my-10 flex items-center gap-4">
      <div className="flex-1 h-px bg-[color:var(--gold)]/40" />
      <div className="w-2 h-2 bg-gold rotate-45" />
      <div className="w-3 h-3 border border-gold rotate-45" />
      <div className="w-2 h-2 bg-gold rotate-45" />
      <div className="flex-1 h-px bg-[color:var(--gold)]/40" />
    </div>
  );
}

export function SahabiCard({ s, onOpen }: { s: Sahabi; onOpen: () => void }) {
  const badge =
    s.category === "العشرة المبشّرون"
      ? "bg-[oklch(0.745_0.115_84/0.15)] text-[color:var(--green-deep)] border-gold/40"
      : s.category === "المهاجرون"
      ? "bg-[oklch(0.5_0.1_280/0.12)] text-[oklch(0.4_0.12_280)] border-[oklch(0.5_0.12_280)]/30"
      : "bg-[oklch(0.55_0.12_160/0.12)] text-[oklch(0.35_0.12_160)] border-[oklch(0.5_0.12_160)]/30";

  return (
    <button
      onClick={onOpen}
      className="card-corner group text-right bg-white border border-[color:var(--gold)]/25 rounded-2xl p-6 transition hover:-translate-y-1 hover:border-gold hover:shadow-[0_12px_30px_-12px_rgba(60,40,10,0.25)]"
    >
      <span
        className={`inline-block text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full border ${badge} mb-4 font-semibold`}
      >
        {s.category}
      </span>
      <h3 className="font-display text-2xl text-[color:var(--green-deep)] mb-1">{s.name}</h3>
      <p className="text-xs text-ink-dim mb-3">{s.laqab.split("—")[0].trim()}</p>
      <p className="text-sm text-ink-muted leading-relaxed font-light">{s.short}</p>
      <div className="mt-5 pt-4 border-t border-[color:var(--gold)]/20 flex items-center justify-between">
        <span className="text-xs text-ink-dim">
          <strong className="text-[color:var(--green-light)] font-semibold">{s.death}</strong>
        </span>
        <span className="text-[color:var(--gold)]/60 group-hover:text-gold group-hover:-translate-x-1 transition text-lg">←</span>
      </div>
    </button>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs text-ink-muted mb-1.5 font-semibold">{label}</span>
      {children}
    </label>
  );
}