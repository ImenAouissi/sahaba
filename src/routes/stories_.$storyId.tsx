import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { STORIES } from "@/lib/sahaba-data";

export const Route = createFileRoute("/stories_/$storyId")({
  head: ({ params }) => {
    const story = STORIES.find((s) => s.id === params.storyId);
    return {
      meta: [
        { title: story ? `${story.title} — الصحابة الكرام` : "القصة" },
        { name: "description", content: story?.short ?? "" },
      ],
    };
  },
  loader: ({ params }) => {
    const story = STORIES.find((s) => s.id === params.storyId);
    if (!story) throw notFound();
    return story;
  },
  component: StoryPage,
});

type Block =
  | { type: "section"; title: string; items: string[] }
  | { type: "quote"; text: string; source?: string }
  | { type: "list"; items: string[] }
  | { type: "paragraph"; text: string };

function parseFullStory(full: string): Block[] {
  const blocks = full.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  const result: Block[] = [];
  let currentSection: { type: "section"; title: string; items: string[] } | null = null;

  const flush = () => {
    if (currentSection) { result.push(currentSection); currentSection = null; }
  };

  for (const block of blocks) {
    if (block.startsWith("«") || block.startsWith("قال ") || block.startsWith("— ")) {
      flush();
      const lines = block.split("\n");
      const sourceLine = lines[1]?.startsWith("—") ? lines[1] : undefined;
      result.push({ type: "quote", text: lines[0], source: sourceLine });
      continue;
    }

    const sectionMatch = block.match(/^(أوّلاً|ثانياً|ثالثاً|رابعاً|خامساً|سادساً|سابعاً|ثامناً|تاسعاً|عاشراً)[:\s:].+$/);
    if (sectionMatch) {
      flush();
      currentSection = { type: "section", title: block, items: [] };
      continue;
    }

    if (block.split("\n").every((l) => l.startsWith("- "))) {
      flush();
      result.push({ type: "list", items: block.split("\n").map((l) => l.slice(2)) });
      continue;
    }

    if (currentSection) {
      currentSection.items.push(block);
    } else {
      result.push({ type: "paragraph", text: block });
    }
  }

  flush();
  return result;
}

function Paragraph({ text, className = "" }: { text: string; className?: string }) {
  const parts = text.split(/(«[^»]+»|﴿[^﴾]+﴾)/g);
  return (
    <p className={`font-body text-[1.05rem] leading-[2.1] text-text-muted ${className}`}>
      {parts.map((part, i) =>
        part.startsWith("«") || part.startsWith("﴿") ? (
          <span key={i} className="font-display text-cream">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </p>
  );
}

function StoryPage() {
  const story = Route.useLoaderData();
  const blocks = story.full ? parseFullStory(story.full) : [];

  return (
    <div className="min-h-screen bg-green-deep text-text-main" dir="rtl">
      <section className="relative flex min-h-[55vh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(45deg,var(--gold) 0,var(--gold) 1px,transparent 0,transparent 50%),repeating-linear-gradient(-45deg,var(--gold) 0,var(--gold) 1px,transparent 0,transparent 50%)", backgroundSize: "40px 40px" }} />
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, oklch(0.745 0.115 84 / 0.13) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-2xl">
          <span className="mb-6 inline-block border border-[color:var(--gold)]/40 px-5 py-1.5 font-body text-xs tracking-[0.3em] text-gold">{story.cat}</span>
          <h1 className="font-display text-5xl leading-tight text-gold drop-shadow-[0_0_40px_oklch(0.745_0.115_84/0.4)] sm:text-6xl md:text-7xl">{story.title.replace(/\s*—.*/, "")}</h1>
          {story.title.includes("—") && <p className="mt-2 font-display text-xl text-text-muted">{story.title.split("—")[1]?.trim()}</p>}
          <div className="mx-auto my-6 h-px w-28 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="font-body text-base leading-loose text-text-muted">{story.short}</p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gold/40 text-xl">↓</div>
      </section>

      <div className="mx-auto max-w-3xl px-6 pb-24 pt-4">
        {blocks.length === 0 && <p className="py-24 text-center text-text-muted italic">القصة الكاملة ستُضاف قريباً ✦</p>}
        {blocks.map((block, i) => {
          if (block.type === "section") return (
            <section key={i} className="mb-14">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-l from-gold/30 to-transparent" />
                <h2 className="font-display text-2xl text-gold">{block.title}</h2>
                <span className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
              </div>
              <div className="space-y-4">{block.items.map((item, j) => <Paragraph key={j} text={item} />)}</div>
            </section>
          );
          if (block.type === "quote") return (
            <blockquote key={i} className="relative my-10 border-r-[3px] border-gold bg-[oklch(0.745_0.115_84/0.06)] py-5 pr-6 pl-4 rounded-l-lg">
              <span className="absolute -top-3 right-4 font-serif text-4xl leading-none text-gold/30">❝</span>
              <p className="font-display text-lg leading-relaxed text-cream">{block.text}</p>
              {block.source && <footer className="mt-2 text-xs tracking-wide text-gold/60">{block.source}</footer>}
            </blockquote>
          );
          if (block.type === "list") return (
            <ul key={i} className="my-8 flex flex-wrap gap-2">
              {block.items.map((item, j) => <li key={j} className="rounded-sm border border-[color:var(--gold)]/30 bg-[oklch(0.745_0.115_84/0.07)] px-4 py-2 font-body text-sm text-gold">{item}</li>)}
            </ul>
          );
          return <Paragraph key={i} text={(block as {type:"paragraph";text:string}).text} className="mb-5" />;
        })}

        <div className="mt-16 flex flex-col items-center gap-2 rounded-2xl border border-[color:var(--gold)]/15 bg-[oklch(0.745_0.115_84/0.04)] py-10 text-center">
          <p className="font-display text-xl text-gold/80">رضي الله عنه وأرضاه</p>
          <p className="text-xs tracking-widest text-text-dim">✦ بحث تاريخي إسلامي ✦</p>
        </div>

        <div className="mt-10 flex justify-center">
          <Link to="/stories" className="inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/40 px-6 py-2.5 font-body text-sm text-gold transition hover:bg-[oklch(0.745_0.115_84/0.1)]">← العودة إلى القصص</Link>
        </div>
      </div>
    </div>
  );
}
