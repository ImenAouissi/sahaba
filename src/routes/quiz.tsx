import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QUIZ } from "@/lib/sahaba-data";
import { SectionHeader } from "@/components/_shared";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "اختبر معرفتك — الصحابة الكرام" },
      { name: "description", content: "اختبر معلوماتك عن الصحابة الكرام رضوان الله عليهم." },
    ],
  }),
  component: QuizRoute,
});

function QuizRoute() {
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