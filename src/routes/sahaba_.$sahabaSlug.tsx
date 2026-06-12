import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SAHABA } from "@/lib/sahaba-data";

export const Route = createFileRoute("/sahaba_/$sahabaSlug")({
  head: ({ params }) => {
    const s = SAHABA.find((s) => s.slug === decodeURIComponent(params.sahabaSlug));
    return {
      meta: [
        { title: s ? `${s.name} — سيرة الصحابي` : "صحابي" },
        { name: "description", content: s?.short ?? "" },
        // SEO
        { property: "og:title", content: s ? `${s.name} — الصحابة الكرام` : "" },
        { property: "og:description", content: s?.short ?? "" },
        { property: "og:type", content: "article" },
      ],
    };
  },
  loader: ({ params }) => {
    const s = SAHABA.find((s) => s.slug === decodeURIComponent(params.sahabaSlug));
    if (!s) throw notFound();
    return s;
  },
  component: SahabiPage,
});

// ─── تحليل bio HTML إلى أقسام ────────────────────────────────────────────
type Section = { title: string; paragraphs: string[] };

function parseBio(bio: string): Section[] {
  const sections: Section[] = [];
  // قسّم على h4
  const parts = bio.split(/<h4>(.*?)<\/h4>/g);
  // parts: ["قبل h4", "عنوان1", "محتوى1", "عنوان2", "محتوى2", ...]
  for (let i = 1; i < parts.length; i += 2) {
    const title = parts[i].trim();
    const html = parts[i + 1] ?? "";
    // استخرج نصوص <p>
    const paragraphs = [...html.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) =>
      m[1].trim()
    );
    sections.push({ title, paragraphs });
  }
  return sections;
}

// ─── مساعد: فقرة مع تمييز الاقتباسات والآيات ────────────────────────────
function Paragraph({ html }: { html: string }) {
  // عرض HTML مباشرة مع تمييز «» و﴿﴾
  const highlighted = html
    .replace(/«([^»]+)»/g, `<span class="text-cream font-display">«$1»</span>`)
    .replace(/﴿([^﴾]+)﴾/g, `<span class="text-cream font-display">﴿$1﴾</span>`);
  return (
    <p
      className="font-body text-[1.05rem] leading-[2.1] text-text-muted mb-3"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}

function SahabiPage() {
  const s = Route.useLoaderData();
  const sections = parseBio(s.bio);

  const categoryColor =
    s.category === "العشرة المبشّرون"
      ? "bg-[oklch(0.745_0.115_84/0.15)] text-gold border-gold/40"
      : s.category === "المهاجرون"
      ? "bg-[oklch(0.5_0.1_280/0.15)] text-[oklch(0.75_0.12_280)] border-[oklch(0.5_0.12_280)]/40"
      : "bg-[oklch(0.55_0.12_160/0.15)] text-[oklch(0.7_0.12_160)] border-[oklch(0.5_0.12_160)]/40";

  return (
    <div className="min-h-screen bg-green-deep text-text-main" dir="rtl">

      {/* ══════════ HERO ══════════ */}
      <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">

        {/* خلفية هندسية */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,var(--gold) 0,var(--gold) 1px,transparent 0,transparent 50%),repeating-linear-gradient(-45deg,var(--gold) 0,var(--gold) 1px,transparent 0,transparent 50%)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* توهّج */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 40%, oklch(0.745 0.115 84 / 0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-2xl">
          {/* الحرف الأول */}
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-gold/40 bg-[oklch(0.745_0.115_84/0.08)] font-display text-4xl text-gold shadow-[0_0_40px_oklch(0.745_0.115_84/0.2)]">
            {s.init}
          </div>

          {/* الفئة */}
          <span className={`mb-4 inline-block rounded-full border px-4 py-1 text-xs tracking-widest ${categoryColor}`}>
            {s.category}
          </span>

          {/* الاسم */}
          <h1 className="font-display text-5xl leading-tight text-gold drop-shadow-[0_0_40px_oklch(0.745_0.115_84/0.4)] sm:text-6xl md:text-7xl">
            {s.name}
          </h1>

          {/* اللقب */}
          <p className="mt-3 font-display text-xl text-text-muted">{s.laqab}</p>

          <div className="mx-auto my-6 h-px w-28 bg-gradient-to-r from-transparent via-gold to-transparent" />

          {/* المختصر */}
          <p className="font-body text-base leading-loose text-text-muted">{s.short}</p>

          {/* تاريخ الوفاة */}
          {s.death && (
            <p className="mt-4 font-body text-sm text-gold/60">{s.death}</p>
          )}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gold/40 text-xl">↓</div>
      </section>

      {/* ══════════ السيرة ══════════ */}
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-4">
        {sections.map((sec, i) => (
          <section key={i} className="mb-14">
            {/* عنوان القسم */}
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-gradient-to-l from-gold/30 to-transparent" />
              <h2 className="font-display text-2xl text-gold">{sec.title}</h2>
              <span className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
            </div>
            {/* فقرات */}
            <div className="space-y-1">
              {sec.paragraphs.map((p, j) => (
                <Paragraph key={j} html={p} />
              ))}
            </div>
          </section>
        ))}

        {/* ══════ خاتمة ══════ */}
        <div className="mt-16 flex flex-col items-center gap-2 rounded-2xl border border-[color:var(--gold)]/15 bg-[oklch(0.745_0.115_84/0.04)] py-10 text-center">
          <p className="font-display text-xl text-gold/80">رضي الله عنه وأرضاه</p>
          <p className="text-xs tracking-widest text-text-dim">✦ &nbsp; سيرة صحابي جليل &nbsp; ✦</p>
        </div>

        {/* ══════ رجوع ══════ */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/sahaba"
            className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 px-6 py-2.5 font-body text-sm text-gold transition hover:bg-[oklch(0.745_0.115_84/0.1)]"
          >
            ← العودة إلى الصحابة
          </Link>
        </div>
      </div>
    </div>
  );
}