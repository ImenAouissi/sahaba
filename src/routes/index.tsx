import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SAHABA, STORIES, QUIZ, type Sahabi, type Story } from "@/lib/sahaba-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "الصحابة الكرام رضي الله عنهم" },
      {
        name: "description",
        content:
          "موقع تعريفي بسير الصحابة الكرام رضوان الله عليهم، قصصهم، ومواقفهم الخالدة. اكتشف، اقرأ، واختبر معلوماتك.",
      },
      { property: "og:title", content: "الصحابة الكرام رضي الله عنهم" },
      {
        property: "og:description",
        content: "موقع تعريفي بسير الصحابة الكرام رضوان الله عليهم، قصصهم، ومواقفهم الخالدة",
      },
      {
        name: "keywords",
        content: "الصحابة, الصحابة الكرام, صحابة الرسول, أصحاب النبي, أبو بكر الصديق, عمر بن الخطاب, عثمان بن عفان, علي بن أبي طالب, خالد بن الوليد, قصص الصحابة, سيرة الصحابة",
},
    ],
  }),
  component: SahabaPage,
});

type PageId = "home" | "sahaba" | "stories" | "quiz" | "contact";

const NAV: { id: PageId; label: string }[] = [
  { id: "home", label: "الرئيسية" },
  { id: "sahaba", label: "الصحابة" },
  { id: "stories", label: "القصص" },
  { id: "quiz", label: "الاختبار" },
  { id: "contact", label: "تواصل معنا" },
];

function SahabaPage() {
  const [page, setPage] = useState<PageId>("home");
  const [navOpen, setNavOpen] = useState(false);
  const [initialTab, setInitialTab] = useState<string>("الجميع");
  const [modal, setModal] = useState<
    | { type: "sahabi"; data: Sahabi }
    | { type: "story"; data: Story }
    | null
  >(null);

  const go = (id: PageId, tab?: string) => {
    setPage(id);
    if (tab) setInitialTab(tab);
    setNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setModal(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-green-deep">
      {/* ─── NAV ─── */}
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
                  onClick={() => go(n.id)}
                  className={`text-sm font-light transition-colors hover:text-gold ${
                    page === n.id ? "text-gold" : "text-text-muted"
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

      {/* ─── PAGES ─── */}
      <main className="bg-beige">
        {page === "home" && <HomePage onOpen={(s) => setModal({ type: "sahabi", data: s })} go={go} />}
        {page === "sahaba" && <SahabaListPage initialTab={initialTab} onOpen={(s) => setModal({ type: "sahabi", data: s })} />}
        {page === "stories" && <StoriesPage onOpen={(s) => setModal({ type: "story", data: s })} />}
        {page === "quiz" && <QuizPage />}
        {page === "contact" && <ContactPage />}
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="mt-12 border-t border-[color:var(--border)] bg-[oklch(0.16_0.022_145)]">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center">
          <p className="font-display text-lg text-gold/60 mb-2">✦ الصحابة الكرام ✦</p>
          <p className="text-sm text-text-muted">
            موقع الصحابة الكرام · صُنع بـ<span className="text-gold">❤</span> لنشر سيرة أصحاب النبي ﷺ
          </p>
          <p className="text-xs text-text-dim mt-2">·جميع الحقوق محفوظة 2026 ©</p>
        </div>
      </footer>

      {/* ─── MODAL ─── */}
      {modal && <Modal onClose={() => setModal(null)} modal={modal} />}
    </div>
  );
}

/* ═══════════════ HOME ═══════════════ */
function HomePage({ onOpen, go }: { onOpen: (s: Sahabi) => void; go: (id: PageId, tab?: string) => void }) {
  return (
    <>
      {/* HERO — dark band with golden geometric pattern */}
      <section className="relative bg-green-deep min-h-[560px] flex items-center justify-center text-center px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-pattern-gold opacity-[0.07]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[color:var(--green-deep)] pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <p className="text-xs tracking-[0.35em] uppercase text-gold font-light mb-5">
            ✦ خير القرون · أصحاب النبي ﷺ ✦
          </p>
          <h1 className="font-display text-5xl md:text-7xl leading-tight text-cream mb-4">
            نور يهدي
            <br />
            <span className="text-gold">الأجيال</span>
          </h1>
          <div className="w-16 h-px bg-gold/60 mx-auto my-6" />
          <p className="text-base md:text-lg text-text-muted leading-loose font-light">
            رحلة في سِيَر أصحاب رسول الله ﷺ
            <br />
            الذين حملوا أمانة الرسالة وأضاؤوا دروب التاريخ
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => go("sahaba")}
              className="px-7 py-3 rounded-full bg-gold text-green-deep font-semibold text-sm hover:bg-[color:var(--gold-light)] transition"
            >
              اكتشف الصحابة
            </button>
            <button
              onClick={() => go("stories")}
              className="px-7 py-3 rounded-full border border-gold/50 text-gold text-sm hover:bg-gold-faint transition"
            >
              اقرأ القصص
            </button>
          </div>
        </div>
      </section>

      {/* STATS — on beige */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-4 -mt-10 relative z-10">
        {[
          { n: "١٠", l: "المبشّرون بالجنة", tab: "العشرة المبشّرون" as const },
          { n: "٣١٣", l: "صحابة بدر الكرام" },
          { n: "١٤٠٠+", l: "صحابي وصحابية" },
        ].map((s) => {
          const clickable = !!s.tab;
          const Tag: any = clickable ? "button" : "div";
          return (
            <Tag
              key={s.l}
              {...(clickable ? { onClick: () => go("sahaba", s.tab) } : {})}
              className={`bg-white border border-[color:var(--gold)]/25 rounded-xl p-6 text-center shadow-[0_8px_24px_-12px_rgba(60,40,10,0.18)] ${clickable ? "cursor-pointer hover:border-gold transition hover:-translate-y-0.5" : ""}`}
            >
              <div className="font-display text-4xl text-[color:var(--green-deep)] leading-none mb-2">
                {s.n}
              </div>
              <div className="text-xs text-ink-muted font-light tracking-wide">{s.l}</div>
            </Tag>
          );
        })}
      </section>

      <Ornament />

      {/* FEATURED */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <SectionHeader label="أعلام الصحابة" title="نماذج من خير الأمة" />
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          {SAHABA.map((s) => (
            <SahabiCard key={s.id} s={s} onOpen={() => onOpen(s)} />
          ))}
        </div>
      </section>

      {/* QUOTE — dark band again */}
      <section className="bg-green-deep border-y border-[color:var(--border)] py-16 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-gold opacity-[0.05]" />
        <div className="relative">
          <div className="font-display text-6xl text-gold/30 leading-none -mb-3">&ldquo;</div>
          <p className="font-display text-2xl md:text-3xl text-[color:var(--cream)]/90 leading-loose max-w-2xl mx-auto mb-3">
            خير الناس قرني، ثم الذين يلونهم، ثم الذين يلونهم
          </p>
          <p className="text-xs text-text-dim tracking-[0.25em] uppercase">
            رسول الله ﷺ — متفق عليه
          </p>
        </div>
      </section>
    </>
  );
}

/* ═══════════════ SAHABA LIST ═══════════════ */
function SahabaListPage({ onOpen, initialTab = "الجميع" }: { onOpen: (s: Sahabi) => void; initialTab?: string }) {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<string>(initialTab);
  useEffect(() => { setTab(initialTab); }, [initialTab]);
  const tabs = ["الجميع", "العشرة المبشّرون", "المهاجرون", "الأنصار"];

  const filtered = useMemo(() => {
    return SAHABA.filter((s) => {
      const matchTab = tab === "الجميع" || s.category === tab;
      const matchQ = q.trim() === "" || s.name.toLowerCase().includes(q.toLowerCase());
      return matchTab && matchQ;
    });
  }, [q, tab]);

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <SectionHeader label="بطاقات تعريفية" title="الصحابة الكرام" />

      <div className="max-w-md mx-auto mb-8">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="🔍 ابحث عن صحابي …"
          className="w-full px-5 py-3 rounded-full bg-white border border-[color:var(--gold)]/30 text-ink placeholder:text-ink-dim focus:border-gold focus:outline-none transition"
        />
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-10">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-1.5 rounded-full border text-sm transition ${
              tab === t
                ? "bg-[color:var(--green-deep)] border-[color:var(--green-deep)] text-gold"
                : "bg-white border-[color:var(--gold)]/40 text-ink-muted hover:text-[color:var(--green-deep)] hover:border-gold"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-ink-muted py-12">لا توجد نتائج مطابقة.</p>
      ) : (
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          {filtered.map((s) => (
            <SahabiCard key={s.id} s={s} onOpen={() => onOpen(s)} />
          ))}
        </div>
      )}
    </section>
  );
}

/* ═══════════════ STORIES ═══════════════ */
function StoriesPage({ onOpen }: { onOpen: (s: Story) => void }) {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      <SectionHeader label="مواقف خالدة" title="القصص والمواقف" />
      <div className="grid gap-5">
        {STORIES.map((s, i) => (
          <article
            key={i}
            className="card-corner group bg-white border border-[color:var(--gold)]/25 rounded-2xl p-7 hover:border-gold transition shadow-[0_4px_18px_-10px_rgba(60,40,10,0.15)]"
          >
            <span className="inline-block text-[10px] tracking-widest uppercase px-3 py-1 rounded-full bg-[oklch(0.745_0.115_84/0.15)] text-[color:var(--green-deep)] border border-gold/40 mb-4 font-semibold">
              {s.cat}
            </span>
            <h3 className="font-display text-2xl text-[color:var(--green-deep)] mb-2">{s.title}</h3>
            <p className="text-ink-muted leading-relaxed font-light">{s.short}</p>
            <button
              onClick={() => onOpen(s)}
              className="mt-5 text-sm text-[color:var(--green-light)] hover:text-[color:var(--green-deep)] font-semibold transition"
            >
              اقرأ القصة كاملة ←
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════ QUIZ ═══════════════ */
function QuizPage() {
  const [cur, setCur] = useState(0);
  const [score, setScore] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [done, setDone] = useState(false);

  const reset = () => {
    setCur(0);
    setScore(0);
    setChosen(null);
    setDone(false);
  };

  const select = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    if (i === QUIZ[cur].ans) setScore((s) => s + 1);
  };

  const next = () => {
    if (cur === QUIZ.length - 1) setDone(true);
    else {
      setCur((c) => c + 1);
      setChosen(null);
    }
  };

  const pct = Math.round((score / QUIZ.length) * 100);

  return (
    <section className="max-w-2xl mx-auto px-6 py-16">
      <SectionHeader label="اختبار معلومات" title="اختبر معرفتك" />

      {!done ? (
        <div className="card-corner bg-white border border-[color:var(--gold)]/25 rounded-2xl p-8 shadow-[0_8px_24px_-12px_rgba(60,40,10,0.18)]">
          <div className="h-1 rounded-full bg-[color:var(--beige-dark)] overflow-hidden mb-5">
            <div
              className="h-full bg-gold transition-all duration-500"
              style={{ width: `${(cur / QUIZ.length) * 100}%` }}
            />
          </div>
          <p className="text-xs tracking-wider text-ink-dim mb-3">
            السؤال {cur + 1} من {QUIZ.length}
          </p>
          <h3 className="font-display text-2xl text-[color:var(--green-deep)] mb-6 leading-relaxed">
            {QUIZ[cur].q}
          </h3>
          <div className="grid gap-3">
            {QUIZ[cur].opts.map((opt, i) => {
              const isCorrect = chosen !== null && i === QUIZ[cur].ans;
              const isWrong = chosen === i && i !== QUIZ[cur].ans;
              return (
                <button
                  key={i}
                  disabled={chosen !== null}
                  onClick={() => select(i)}
                  className={`text-right px-5 py-3 rounded-xl border transition text-sm ${
                    isCorrect
                      ? "bg-[oklch(0.55_0.14_145/0.18)] border-[oklch(0.5_0.14_145)] text-[oklch(0.3_0.1_145)] font-semibold"
                      : isWrong
                      ? "bg-[oklch(0.6_0.18_25/0.12)] border-[oklch(0.55_0.2_25)] text-[oklch(0.4_0.15_25)]"
                      : "bg-[color:var(--beige-dark)] border-[color:var(--gold)]/30 text-ink hover:border-gold hover:bg-white"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {chosen !== null && (
            <button
              onClick={next}
              className="mt-6 w-full py-3 rounded-full bg-[color:var(--green-deep)] text-gold font-semibold text-sm hover:bg-[color:var(--green-mid)] transition"
            >
              {cur === QUIZ.length - 1 ? "عرض النتيجة 🏆" : "السؤال التالي ←"}
            </button>
          )}
        </div>
      ) : (
        <div className="card-corner bg-white border border-[color:var(--gold)]/25 rounded-2xl p-10 text-center shadow-[0_8px_24px_-12px_rgba(60,40,10,0.18)]">
          <div className="font-display text-6xl text-[color:var(--green-deep)] mb-3">
            {score}/{QUIZ.length}
          </div>
          <p className="text-ink-muted mb-1">نسبتك: {pct}%</p>
          <h3 className="font-display text-2xl text-[color:var(--green-deep)] mt-4 mb-2">
            {pct === 100 ? "ممتاز! 🌟" : pct >= 70 ? "جيد جداً! 👏" : pct >= 40 ? "جيد 🙂" : "حاول مجدداً 💪"}
          </h3>
          <p className="text-ink-muted font-light">
            {pct >= 70
              ? "أحسنت، معرفتك بالصحابة رائعة."
              : "اقرأ سير الصحابة والقصص ثم أعد الاختبار."}
          </p>
          <button
            onClick={reset}
            className="mt-6 px-7 py-3 rounded-full border border-[color:var(--green-deep)] text-[color:var(--green-deep)] text-sm hover:bg-[color:var(--green-deep)] hover:text-gold transition"
          >
            إعادة الاختبار 🔄
          </button>
        </div>
      )}
    </section>
  );
}

/* ═══════════════ CONTACT ═══════════════ */
function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!name || !email || !msg) return setErr("يرجى ملء جميع الحقول");
    if (!email.includes("@")) return setErr("بريد إلكتروني غير صحيح");
    setSent(true);
    setName("");
    setEmail("");
    setMsg("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <SectionHeader label="نسعد بتواصلك" title="تواصل معنا" />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-display text-xl text-[color:var(--green-deep)]">يسعدنا تواصلك</h3>
          <p className="text-ink-muted leading-loose font-light">
            إذا كان لديك اقتراح أو تصحيح أو رغبة في إضافة محتوى، فلا تتردد في مراسلتنا. مشروعنا
            مفتوح لكل من يريد المساهمة في نشر سيرة الصحابة الكرام.
          </p>
          <div className="space-y-3 pt-4">
            {[
              { i: "📧", t: "info@sahaba.example.com" },
              { i: "🌐", t: "www.sahaba.example.com" },
              { i: "📍", t: "العالم الإسلامي" },
            ].map((x) => (
              <div
                key={x.t}
                className="flex items-center gap-3 text-sm text-ink bg-white border border-[color:var(--gold)]/25 rounded-xl px-4 py-3"
              >
                <span className="text-lg">{x.i}</span>
                <span>{x.t}</span>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={submit}
          className="card-corner bg-white border border-[color:var(--gold)]/25 rounded-2xl p-7 space-y-4 shadow-[0_8px_24px_-12px_rgba(60,40,10,0.18)]"
        >
          <Field label="الاسم الكامل">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسمك …"
              className="input"
            />
          </Field>
          <Field label="البريد الإلكتروني">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="input"
            />
          </Field>
          <Field label="الرسالة">
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="اكتب رسالتك هنا …"
              rows={5}
              className="input resize-y"
            />
          </Field>
          {err && <p className="text-sm text-[oklch(0.5_0.18_25)]">{err}</p>}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[color:var(--green-deep)] text-gold font-semibold text-sm hover:bg-[color:var(--green-mid)] transition"
          >
            إرسال الرسالة ✉️
          </button>
          {sent && (
            <p className="text-center text-sm text-[oklch(0.35_0.12_145)] bg-[oklch(0.85_0.08_145/0.5)] py-2 rounded-lg">
              ✅ تم إرسال رسالتك بنجاح! شكراً لتواصلك.
            </p>
          )}
        </form>
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.625rem;
          background: var(--beige);
          border: 1px solid color-mix(in oklab, var(--gold) 30%, transparent);
          color: var(--ink);
          font-family: 'Cairo', sans-serif;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .input:focus { border-color: var(--gold); background: #fff; }
        .input::placeholder { color: var(--ink-dim); }
      `}</style>
    </section>
  );
}

/* ═══════════════ SHARED ═══════════════ */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs text-ink-muted mb-1.5 font-semibold">{label}</span>
      {children}
    </label>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
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

function Ornament() {
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

function SahabiCard({ s, onOpen }: { s: Sahabi; onOpen: () => void }) {
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
        <span className="text-[color:var(--gold)]/60 group-hover:text-gold group-hover:-translate-x-1 transition text-lg">
          ←
        </span>
      </div>
    </button>
  );
}

function Modal({
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
