import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

import appCss from "../styles.css?url";

type PageId = "home" | "sahaba" | "stories" | "quiz" | "contact";

const NAV: { id: PageId; label: string; to: string }[] = [
  { id: "home",    label: "الرئيسية",   to: "/"        },
  { id: "sahaba",  label: "الصحابة",    to: "/sahaba"  },
  { id: "stories", label: "القصص",      to: "/stories" },
  { id: "quiz",    label: "الاختبار",   to: "/quiz"    },
  { id: "contact", label: "تواصل معنا", to: "/contact" },
];

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-green-deep px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-gold">٤٠٤</h1>
        <h2 className="mt-4 text-xl font-semibold text-text-main">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-text-muted">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-2 text-sm font-semibold text-green-deep hover:bg-[color:var(--gold-light)] transition"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  return (
    <div className="flex min-h-screen items-center justify-center bg-green-deep px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl text-gold">حدث خطأ</h1>
        <p className="mt-2 text-sm text-text-muted">
          حدث خطأ غير متوقع. يمكنك المحاولة مجدداً أو العودة للرئيسية.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-2 text-sm font-semibold text-green-deep transition hover:bg-[color:var(--gold-light)]"
          >
            حاول مجدداً
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-gold/50 px-6 py-2 text-sm text-gold transition hover:bg-gold-faint"
          >
            الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "الصحابة الكرام رضي الله عنهم" },
      { name: "description", content: "موقع تعريفي بسير الصحابة الكرام رضوان الله عليهم، قصصهم، ومواقفهم الخالدة" },
      { property: "og:title", content: "الصحابة الكرام رضي الله عنهم" },
      { property: "og:description", content: "موقع تعريفي بسير الصحابة الكرام رضوان الله عليهم" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@300;400;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Navbar() {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[oklch(0.18_0.025_145/0.92)] border-b border-[color:var(--border)]">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="font-display text-2xl text-gold tracking-wide"
          onClick={() => setNavOpen(false)}
        >
          الصحابة الكرام ✦
        </Link>

        <ul
          className={`${
            navOpen ? "flex" : "hidden"
          } md:flex absolute md:static top-full inset-x-0 md:inset-auto flex-col md:flex-row gap-2 md:gap-8 bg-green-mid md:bg-transparent p-6 md:p-0 border-b md:border-0 border-[color:var(--border)]`}
        >
          {NAV.map((n) => {
            const isActive =
              n.to === "/" ? pathname === "/" : pathname.startsWith(n.to);
            return (
              <li key={n.id}>
                <Link
                  to={n.to}
                  onClick={() => setNavOpen(false)}
                  className={`text-sm font-light transition-colors hover:text-gold ${
                    isActive
                      ? "text-gold border-b border-gold pb-0.5"
                      : "text-text-muted"
                  }`}
                >
                  {n.label}
                </Link>
              </li>
            );
          })}
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

function Footer() {
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

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-green-deep flex flex-col">
        <Navbar />
        <main className="bg-beige flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}