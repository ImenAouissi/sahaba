import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا — الصحابة الكرام" },
      { name: "description", content: "تواصل مع جمعية تحفيظ القرآن الكريم — جامع الرحمة، أولاد عمر، سيدي الهاني" },
    ],
  }),
  component: ContactRoute,
});

function ContactRoute() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-green-deep py-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-pattern-gold opacity-[0.06]" />
        <div className="relative z-10">
          <p className="text-xs tracking-[0.35em] uppercase text-gold font-light mb-4">
            ✦ نحن هنا ✦
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-cream mb-3">تواصل معنا</h1>
          <div className="w-12 h-px bg-gold/60 mx-auto mt-4" />
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="max-w-2xl mx-auto px-6 py-14">
        <div className="bg-white border border-[color:var(--gold)]/25 rounded-2xl overflow-hidden shadow-[0_12px_40px_-16px_rgba(60,40,10,0.15)]">

          {/* البريد الإلكتروني */}
          <div className="p-8 border-b border-[color:var(--gold)]/15">

            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-[color:var(--green-deep)] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-gold text-lg">✉</span>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-ink-dim font-semibold mb-1">
                  البريد الإلكتروني
                </p>
                <a
                  href="mailto:association.quran.sidielheni@gmail.com"
                  className="font-display text-lg text-[color:var(--green-deep)] hover:text-gold transition-colors break-all"
                  dir="ltr"
                >
                  association.quran.sidielheni@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* الهاتف */}
          <div className="p-8 border-b border-[color:var(--gold)]/15">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-[color:var(--green-deep)] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-gold text-lg">☏</span>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-ink-dim font-semibold mb-1">
                  الهاتف
                </p>
                <a
                  href="tel:+21627717049"
                  className="font-display text-lg text-[color:var(--green-deep)] hover:text-gold transition-colors"
                  dir="ltr"
                >
                  +216 XX XXX XXX
                </a>
              </div>
            </div>
          </div>

          {/* الموقع */}
          <div className="p-8">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-[color:var(--green-deep)] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-gold text-lg">⌖</span>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-ink-dim font-semibold mb-1">
                  العنوان
                </p>
                <p className="font-display text-xl text-[color:var(--green-deep)] leading-snug mb-1">
                  جامع الرحمة
                </p>
                <p className="text-sm text-ink-muted font-light leading-relaxed">
                  أولاد عمر · سيدي الهاني
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* زخرفة سفلية */}
        <div className="flex items-center gap-4 mt-12">
          <div className="flex-1 h-px bg-[color:var(--gold)]/30" />
          <div className="w-2 h-2 bg-gold rotate-45" />
          <div className="w-3 h-3 border border-gold rotate-45" />
          <div className="w-2 h-2 bg-gold rotate-45" />
          <div className="flex-1 h-px bg-[color:var(--gold)]/30" />
        </div>

        <p className="text-center text-xs text-ink-dim mt-6 font-light leading-loose">
          جمعية تحفيظ القرآن الكريم · سيدي الهاني
        </p>
      </section>
    </>
  );
}