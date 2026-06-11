import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { STORIES, type Story } from "@/lib/sahaba-data";
import { SectionHeader } from "@/components/_shared";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "القصص والمواقف — الصحابة الكرام" },
      { name: "description", content: "مواقف خالدة من سيرة الصحابة الكرام رضوان الله عليهم." },
    ],
  }),
  component: StoriesRoute,
});

type ReadMode = "summary" | "full";

function StoryModal({
  story,
  onClose,
}: {
  story: Story;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<ReadMode>("summary");

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-green-mid border border-gold/30 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
      >
        {/* رأس المودال */}
        <div className="flex items-center gap-4 p-6 border-b border-[color:var(--border)] sticky top-0 bg-green-mid">
          <div className="flex-1 min-w-0">
            <p className="text-xs tracking-widest uppercase text-gold/60 mb-1">{story.cat}</p>
            <h2 className="font-display text-2xl text-gold truncate">{story.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-gold text-2xl leading-none flex-shrink-0"
            aria-label="إغلاق"
          >
            ✕
          </button>
        </div>

        {/* اختيار وضع القراءة */}
        <div className="flex gap-2 px-6 pt-5">
          {(["summary", "full"] as ReadMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
                mode === m
                  ? "bg-gold text-green-deep border-gold"
                  : "border-gold/30 text-text-muted hover:border-gold hover:text-gold"
              }`}
            >
              {m === "summary" ? "الملخص" : "القصة كاملة"}
            </button>
          ))}
        </div>

        {/* المحتوى */}
        <div className="p-6 pt-4 modal-body text-[color:var(--text-main)] leading-loose">
          {mode === "summary" ? (
            <div dangerouslySetInnerHTML={{ __html: story.summary }} />
          ) : story.full ? (
            <p style={{ lineHeight: "2.1" }}>{story.full}</p>
          ) : (
            <p className="text-text-muted text-sm italic text-center py-8">
              ✦ القصة الكاملة ستُضاف قريباً ✦
            </p>
          )}
        </div>
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

function StoriesRoute() {
  const [modal, setModal] = useState<Story | null>(null);

  return (
    <>
      <section className="max-w-4xl mx-auto px-6 py-16">
        <SectionHeader label="مواقف خالدة" title="القصص والمواقف" />
        <div className="grid gap-5">
          {STORIES.map((s) => (
            <article
              key={s.id}
              className="card-corner group bg-white border border-[color:var(--gold)]/25 rounded-2xl p-7 hover:border-gold transition shadow-[0_4px_18px_-10px_rgba(60,40,10,0.15)]"
            >
              <span className="inline-block text-[10px] tracking-widest uppercase px-3 py-1 rounded-full bg-[oklch(0.745_0.115_84/0.15)] text-[color:var(--green-deep)] border border-gold/40 mb-4 font-semibold">
                {s.cat}
              </span>
              <h3 className="font-display text-2xl text-[color:var(--green-deep)] mb-2">{s.title}</h3>
              <p className="text-ink-muted leading-relaxed font-light">{s.short}</p>
              <button
                onClick={() => setModal(s)}
                className="mt-5 text-sm text-[color:var(--green-light)] hover:text-[color:var(--green-deep)] font-semibold transition"
              >
                اقرأ القصة ←
              </button>
            </article>
          ))}
        </div>
      </section>

      {modal && <StoryModal story={modal} onClose={() => setModal(null)} />}
    </>
  );
}