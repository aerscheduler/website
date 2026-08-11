"use client";

import { useCallback, useState } from "react";
import {
  PhoneChrome,
  PhoneMock,
  IosHomeScreen,
} from "@/components/phone-mock";
import {
  LivingBoard,
  type DemoController,
} from "@/components/mocks/living/demo-runtime";
import { cn } from "@/lib/cn";

type Sheet =
  | {
      kind: "inspection";
      title: string;
      summary: string;
      details: string[];
    }
  | {
      kind: "squawks";
      title: string;
      summary: string;
      details: string[];
    }
  | {
      kind: "unpaid";
      title: string;
      summary: string;
      details: string[];
    }
  | null;

type MenuState = {
  x: number;
  y: number;
  highlight: string | null;
  toast: string | null;
} | null;

const MENU = [
  { id: "details", label: "Open details", tone: "text-foreground" },
  { id: "signoff", label: "Sign off inspection", tone: "text-foreground" },
  { id: "cancel", label: "Cancel MX block", tone: "text-[#c4142f]" },
] as const;

export function MobileLiveDemo() {
  const [selected, setSelected] = useState<string | null>(null);
  const [pillActive, setPillActive] = useState<string | null>(null);
  const [sheet, setSheet] = useState<Sheet>(null);
  const [menu, setMenu] = useState<MenuState>(null);

  const openInspectionSheet = async (api: DemoController, from: string) => {
    await api.go(`[data-demo="${from}"]`, 560);
    if (api.cancelled()) return;
    await api.wait(70);
    if (api.cancelled()) return;
    await api.press(150);
    if (api.cancelled()) return;
    setSelected(from === "upcoming-row" ? "upcoming-row" : "hero");
    setSheet({
      kind: "inspection",
      title: "N44TS · Annual inspection",
      summary:
        "All-day maintenance block. AVIATES · A — annual. Grounds until signed off.",
      details: [
        "Tue, Aug 11 · all day",
        "Aircraft · N44TS",
        "Type · Maintenance",
        "Letter · A · Annual · §91.409(a)",
      ],
    });
    api.release();
    await api.wait(280);
    if (api.cancelled()) return;
    await api.go('[data-demo="sheet-meta"]', 360);
    if (api.cancelled()) return;
    await api.wait(500);
    if (api.cancelled()) return;
    await api.go('[data-demo="sheet-dismiss"]', 320);
    if (api.cancelled()) return;
    await api.press(140);
    if (api.cancelled()) return;
    setSheet(null);
    setSelected(null);
    api.release();
    await api.wait(180);
  };

  const script = useCallback(async (api: DemoController) => {
    setSelected(null);
    setPillActive(null);
    setSheet(null);
    setMenu(null);

    await openInspectionSheet(api, "hero");
    if (api.cancelled()) return;

    await api.tap('[data-demo="pill-squawks"]', () => {
      setPillActive("squawks");
      setSelected("squawks");
    });
    if (api.cancelled()) return;
    await api.wait(220);
    if (api.cancelled()) return;

    await api.go('[data-demo="stat-squawks"]', 480);
    if (api.cancelled()) return;
    await api.wait(70);
    if (api.cancelled()) return;
    await api.press(150);
    if (api.cancelled()) return;
    setSelected("squawks");
    setSheet({
      kind: "squawks",
      title: "Open squawks",
      summary: "13 open across the fleet — triage from Maintenance.",
      details: [
        "N5287Q · Left mag drop · Grounds",
        "N172SP · Nav light inop",
        "N44TS · Seat rail sticky",
        "Plus 10 more on other tails",
      ],
    });
    api.release();
    await api.wait(260);
    if (api.cancelled()) return;
    await api.go('[data-demo="sheet-meta"]', 340);
    if (api.cancelled()) return;
    await api.wait(480);
    if (api.cancelled()) return;
    await api.go('[data-demo="sheet-dismiss"]', 300);
    if (api.cancelled()) return;
    await api.press(140);
    if (api.cancelled()) return;
    setSheet(null);
    api.release();
    await api.wait(160);

    // Only switch pills when leaving Squawks — never re-tap Squawks
    await api.tap('[data-demo="pill-invoices"]', () => {
      setPillActive("invoices");
      setSelected("invoices");
    });
    if (api.cancelled()) return;
    await api.wait(180);
    if (api.cancelled()) return;

    await api.go('[data-demo="stat-unpaid"]', 460);
    if (api.cancelled()) return;
    await api.wait(70);
    if (api.cancelled()) return;
    await api.press(150);
    if (api.cancelled()) return;
    setSelected("unpaid");
    setSheet({
      kind: "unpaid",
      title: "Unpaid invoices",
      summary: "$7,431.45 outstanding across 4 invoices.",
      details: [
        "Alex Chen · Dual 1.2 · $186",
        "Jordan Lee · Rental · $252",
        "Sam Ortiz · Membership · $95",
        "Plus 1 more past due",
      ],
    });
    api.release();
    await api.wait(260);
    if (api.cancelled()) return;
    await api.go('[data-demo="sheet-dismiss"]', 320);
    if (api.cancelled()) return;
    await api.press(140);
    if (api.cancelled()) return;
    setSheet(null);
    setPillActive(null);
    api.release();
    await api.wait(160);

    await openInspectionSheet(api, "upcoming-row");
    if (api.cancelled()) return;

    // Right-click the upcoming MX block
    await api.go('[data-demo="upcoming-row"]', 520);
    if (api.cancelled()) return;
    await api.wait(70);
    if (api.cancelled()) return;
    await api.press(110);
    if (api.cancelled()) return;
    setSelected("upcoming-row");
    const tip = api.pointFor('[data-demo="upcoming-row"]');
    setMenu({
      x: Math.min((tip?.x ?? 48) + 1.2, 58),
      y: Math.min((tip?.y ?? 72) + 1.4, 70),
      highlight: null,
      toast: null,
    });
    api.release();
    await api.wait(240);
    if (api.cancelled()) return;
    await api.go('[data-demo="ctx-signoff"]', 380);
    if (api.cancelled()) return;
    setMenu((m) => (m ? { ...m, highlight: "signoff" } : m));
    await api.wait(100);
    if (api.cancelled()) return;
    await api.press(150);
    if (api.cancelled()) return;
    setMenu((m) =>
      m ? { ...m, toast: "Annual signed off", highlight: "signoff" } : m
    );
    api.release();
    await api.wait(650);
    if (api.cancelled()) return;
    setMenu(null);
    setSelected(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LivingBoard
      label="Sam · Admin"
      rest={{ x: 52, y: 90 }}
      fallback={<PhoneMock />}
      script={script}
    >
      <div className="relative mx-auto w-[250px] sm:w-[268px]">
        <PhoneChrome>
          <IosHomeScreen
            selected={selected}
            pillActive={pillActive}
            sheet={
              sheet ? (
                <DetailSheet sheet={sheet} />
              ) : undefined
            }
          />
        </PhoneChrome>

        <div className="absolute -right-2 bottom-[16%] z-10 rounded-lg border border-border bg-white px-2.5 py-2 shadow-md sm:-right-5 sm:bottom-[18%]">
          <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Native app
          </p>
          <p className="mt-0.5 text-xs font-semibold text-foreground">iOS</p>
        </div>
      </div>

      {menu && (
        <div
          className="pointer-events-none absolute z-50 min-w-[168px] overflow-hidden rounded-md border border-border bg-white py-1 text-[11px] shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35)] animate-demo-pop"
          style={{ left: `${menu.x}%`, top: `${menu.y}%` }}
          aria-hidden
        >
          {MENU.map((item, i) => (
            <div key={item.id}>
              {i === 2 && <div className="my-1 h-px bg-border" />}
              <div
                data-demo={`ctx-${item.id}`}
                className={cn(
                  "px-3 py-1.5 font-medium transition-colors",
                  item.tone,
                  menu.highlight === item.id &&
                    (item.id === "cancel"
                      ? "bg-[#c4142f]/10"
                      : "bg-primary/[0.08]")
                )}
              >
                {item.label}
              </div>
            </div>
          ))}
          {menu.toast && (
            <div className="border-t border-border bg-[#fafbfc] px-3 py-1.5 text-[10px] font-semibold text-primary">
              {menu.toast}
            </div>
          )}
        </div>
      )}
    </LivingBoard>
  );
}

function DetailSheet({ sheet }: { sheet: NonNullable<Sheet> }) {
  return (
    <div
      className="pointer-events-none absolute inset-x-2 bottom-[56px] z-40 overflow-hidden rounded-2xl border border-border bg-white shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35),0_8px_20px_-8px_rgba(15,23,42,0.2)] animate-demo-pop"
      aria-hidden
    >
      <div className="border-b border-border px-3 py-2.5">
        <p className="text-[12px] font-semibold text-foreground">{sheet.title}</p>
        <p
          data-demo="sheet-meta"
          className="mt-1.5 text-[10px] leading-snug text-muted-foreground"
        >
          {sheet.summary}
        </p>
      </div>
      <ul className="space-y-1.5 px-3 py-2.5">
        {sheet.details.map((line) => (
          <li
            key={line}
            className="flex gap-2 text-[10px] leading-snug text-foreground/85"
          >
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary/70" />
            {line}
          </li>
        ))}
      </ul>
      <div className="border-t border-border px-3 py-2">
        <div
          data-demo="sheet-dismiss"
          className="text-center text-[10px] font-semibold text-primary"
        >
          Close
        </div>
      </div>
    </div>
  );
}
