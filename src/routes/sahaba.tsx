import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SAHABA, type Sahabi } from "@/lib/sahaba-data";
import { SahabiCard, SectionHeader, Modal } from "@/components/_shared";

const TABS = ["الجميع", "العشرة المبشّرون", "المهاجرون", "الأنصار"] as const;

export const Route = createFileRoute("/sahaba")({
  head: () => ({
    meta: [
      { title: "الصحابة الكرام — بطاقات تعريفية" },
      { name: "description", content: "تعرّف على سير الصحابة الكرام رضوان الله عليهم مع بطاقات تعريفية مفصّلة." },
    ],
  }),
  validateSearch: (search: Record<string, unknown>) => ({
    tab: typeof search.tab === "string" ? search.tab : "الجميع",
  }),
  component: SahabaRoute,
});

function SahabaRoute() {
  const { tab: initialTab } = Route.useSearch();
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<string>(initialTab);
  const [modal, setModal] = useState<{ type: "sahabi"; data: Sahabi } | null>(null);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  const filtered = useMemo(() => {
    return SAHABA.filter((s) => {
      const matchTab = tab === "الجميع" || s.category === tab;
      const matchQ = q.trim() === "" || s.name.toLowerCase().includes(q.toLowerCase());
      return matchTab && matchQ;
    });
  }, [q, tab]);

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeader label="بطاقات تعريفية" title="الصحابة الكرام" />

        {/* بحث */}
        <div className="max-w-md mx-auto mb-8">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="🔍 ابحث عن صحابي …"
            className="w-full px-5 py-3 rounded-full bg-white border border-[color:var(--gold)]/30 text-ink placeholder:text-ink-dim focus:border-gold focus:outline-none transition"
          />
        </div>

        {/* تبويبات */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {TABS.map((t) => (
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
              {t !== "الجميع" && (
                <span className="mr-1.5 text-[10px] opacity-60">
                  ({SAHABA.filter((s) => s.category === t).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* النتائج */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-ink-muted">لا توجد نتائج مطابقة لـ «{q}»</p>
            <button
              onClick={() => { setQ(""); setTab("الجميع"); }}
              className="mt-4 text-sm text-[color:var(--green-light)] hover:underline"
            >
              مسح البحث
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-ink-dim text-center mb-6">يُعرض {filtered.length} صحابي</p>
            <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
              {filtered.map((s) => (
                <SahabiCard key={s.id} s={s} onOpen={() => setModal({ type: "sahabi", data: s })} />
              ))}
            </div>
          </>
        )}
      </section>

      {modal && <Modal onClose={() => setModal(null)} modal={modal} />}
    </>
  );
}