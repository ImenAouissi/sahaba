import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FEATURED_SAHABA, type Sahabi } from "@/lib/sahaba-data";
import { SahabiCard, SectionHeader, Ornament, Modal } from "@/components/_shared";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "الصحابة الكرام رضي الله عنهم" },
      {
        name: "description",
        content:
          "موقع تعريفي بسير الصحابة الكرام رضوان الله عليهم، قصصهم، ومواقفهم الخالدة. اكتشف، اقرأ، واختبر معلوماتك.",
      },
    ],
  }),
  component: HomeRoute,
});

function HomeRoute() {
  const navigate = useNavigate();
  const [modal, setModal] = useState<{ type: "sahabi"; data: Sahabi } | null>(null);

  const goSahaba = (tab?: string) => {
    navigate({ to: "/sahaba", search: tab ? { tab } : undefined });
  };

  return (
    <>
      {/* ── HERO ── */}
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
              onClick={() => navigate({ to: "/sahaba" })}
              className="px-7 py-3 rounded-full bg-gold text-green-deep font-semibold text-sm hover:bg-[color:var(--gold-light)] transition"
            >
              اكتشف الصحابة
            </button>
            <button
              onClick={() => navigate({ to: "/stories" })}
              className="px-7 py-3 rounded-full border border-gold/50 text-gold text-sm hover:bg-gold-faint transition"
            >
              اقرأ القصص
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-4 -mt-10 relative z-10">
        {[
          { n: "١٠", l: "المبشّرون بالجنة", tab: "العشرة المبشّرون" },
          { n: "٣١٣", l: "صحابة بدر الكرام", tab: undefined },
          { n: "١٤٠٠+", l: "صحابي وصحابية", tab: undefined },
        ].map((s) => {
          const clickable = !!s.tab;
          const Tag: any = clickable ? "button" : "div";
          return (
            <Tag
              key={s.l}
              {...(clickable ? { onClick: () => goSahaba(s.tab) } : {})}
              className={`bg-white border border-[color:var(--gold)]/25 rounded-xl p-6 text-center shadow-[0_8px_24px_-12px_rgba(60,40,10,0.18)] ${
                clickable ? "cursor-pointer hover:border-gold transition hover:-translate-y-0.5" : ""
              }`}
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

      {/* ── FEATURED ── */}
      <section className="max-w-6xl mx-auto px-6 pb-8">
        <SectionHeader label="أعلام الصحابة" title="نماذج من خير الأمة" />
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          {FEATURED_SAHABA.map((s) => (
            <SahabiCard key={s.id} s={s} onOpen={() => setModal({ type: "sahabi", data: s })} />
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={() => navigate({ to: "/sahaba" })}
            className="px-7 py-3 rounded-full border border-[color:var(--green-deep)] text-[color:var(--green-deep)] text-sm hover:bg-[color:var(--green-deep)] hover:text-gold transition"
          >
            عرض جميع الصحابة ←
          </button>
        </div>
      </section>

      {/* ── QUOTE ── */}
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

      {modal && <Modal onClose={() => setModal(null)} modal={modal} />}
    </>
  );
}