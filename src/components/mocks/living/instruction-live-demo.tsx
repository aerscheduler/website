"use client";

import { useCallback, useState } from "react";
import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";
import { InstructionMock } from "@/components/mocks/instruction-mock";
import {
  LivingBoard,
  type DemoController,
} from "@/components/mocks/living/demo-runtime";
import { cn } from "@/lib/cn";

type InstructionType = {
  id: string;
  name: string;
  rate: string;
  kind: string;
  instructors: string[];
  students: string[];
  summary: string;
  details: string[];
};

const TYPES: InstructionType[] = [
  {
    id: "private-dual",
    name: "Private · Dual",
    rate: "$65/hr",
    kind: "Flight",
    instructors: ["Alex Chen", "Morgan Blake"],
    students: ["Jordan Lee", "Casey Ng", "Priya Shah"],
    summary: "Billed with the flight — pairing decides who can book together.",
    details: [
      "Rate · $65/hr instructor portion",
      "Kind · Flight dual",
      "CFIs · Chen, Blake",
      "Syllabus progress · Training records",
    ],
  },
  {
    id: "instrument-dual",
    name: "Instrument · Dual",
    rate: "$70/hr",
    kind: "Flight",
    instructors: ["Alex Chen"],
    students: ["Sam Ortiz"],
    summary: "IFR dual rate. Only paired CFIs appear in self-booking.",
    details: [
      "Rate · $70/hr instructor portion",
      "Kind · Instrument flight",
      "CFI · Alex Chen",
      "Student · Sam Ortiz",
    ],
  },
  {
    id: "ground",
    name: "Ground · Brief",
    rate: "$45/hr",
    kind: "Ground",
    instructors: ["Alex Chen", "Chris Diaz"],
    students: ["Jordan Lee", "Casey Ng"],
    summary: "Ground blocks use rooms or sims — no Hobbs on the invoice.",
    details: [
      "Rate · $45/hr",
      "Kind · Ground",
      "CFIs · Chen, Diaz",
      "Bills separately from aircraft time",
    ],
  },
];

const DAY_LABELS = ["M", "T", "W", "T", "F", "S", "S"];

const MENU = [
  { id: "message", label: "Message student", tone: "text-foreground" },
  { id: "unassign", label: "Unassign from type", tone: "text-[#c4142f]" },
] as const;

const SHADOW_CARD =
  "shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35),0_8px_20px_-8px_rgba(15,23,42,0.2)]";
const SHADOW_MENU = "shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35)]";

type DetailState = { item: InstructionType; x: number; y: number } | null;
type MenuState = {
  name: string;
  x: number;
  y: number;
  highlight: string | null;
  toast: string | null;
} | null;

export function InstructionLiveDemo() {
  const [selectedId, setSelectedId] = useState(TYPES[0].id);
  const [cfi, setCfi] = useState("Alex Chen");
  const [days, setDays] = useState([true, true, true, true, true, false, false]);
  const [flash, setFlash] = useState(false);
  const [paired, setPaired] = useState(false);
  const [detail, setDetail] = useState<DetailState>(null);
  const [menu, setMenu] = useState<MenuState>(null);
  const [removed, setRemoved] = useState<string | null>(null);

  const selected = TYPES.find((t) => t.id === selectedId) ?? TYPES[0];
  const students = (paired
    ? [...selected.students, "Riley Cho"]
    : selected.students
  ).filter((n) => n !== removed);

  const openDetail = async (api: DemoController, id: string) => {
    const item = TYPES.find((t) => t.id === id);
    if (!item) return;
    await api.go(`[data-demo="type-${id}"]`, 560);
    if (api.cancelled()) return;
    await api.wait(70);
    if (api.cancelled()) return;
    await api.press(150);
    if (api.cancelled()) return;
    setSelectedId(id);
    const tip = api.pointFor(`[data-demo="type-${id}"]`);
    setDetail({
      item,
      x: Math.min((tip?.x ?? 36) + 10, 52),
      y: Math.min(Math.max((tip?.y ?? 30) - 2, 16), 46),
    });
    api.release();
    await api.wait(260);
    if (api.cancelled()) return;
    await api.go('[data-demo="detail-rate"]', 360);
    if (api.cancelled()) return;
    await api.wait(520);
    if (api.cancelled()) return;
    await api.go('[data-demo="detail-dismiss"]', 340);
    if (api.cancelled()) return;
    await api.press(140);
    if (api.cancelled()) return;
    setDetail(null);
    api.release();
    await api.wait(200);
  };

  const openMenu = async (api: DemoController, name: string) => {
    await api.go(`[data-demo="student-${name}"]`, 520);
    if (api.cancelled()) return;
    await api.wait(70);
    if (api.cancelled()) return;
    await api.press(110);
    if (api.cancelled()) return;
    const tip = api.pointFor(`[data-demo="student-${name}"]`);
    setMenu({
      name,
      x: Math.min((tip?.x ?? 60) + 1.2, 72),
      y: (tip?.y ?? 45) + 1.4,
      highlight: null,
      toast: null,
    });
    api.release();
    await api.wait(240);
  };

  const script = useCallback(async (api: DemoController) => {
    setSelectedId("private-dual");
    setCfi("Alex Chen");
    setDays([true, true, true, true, true, false, false]);
    setPaired(false);
    setRemoved(null);
    setDetail(null);
    setMenu(null);

    await openDetail(api, "instrument-dual");
    if (api.cancelled()) return;
    await openDetail(api, "private-dual");
    if (api.cancelled()) return;

    await api.tap('[data-demo="cfi-Morgan Blake"]', () => setCfi("Morgan Blake"));
    if (api.cancelled()) return;
    await api.wait(240);
    if (api.cancelled()) return;
    await api.tap('[data-demo="cfi-Alex Chen"]', () => setCfi("Alex Chen"));
    if (api.cancelled()) return;

    await api.tap('[data-demo="day-5"]', () =>
      setDays((prev) => prev.map((on, i) => (i === 5 ? true : on)))
    );
    if (api.cancelled()) return;
    await api.wait(300);
    if (api.cancelled()) return;

    await api.tap('[data-demo="action"]', () => {
      setFlash(true);
      setPaired(true);
    });
    if (api.cancelled()) return;
    await api.wait(700);
    setFlash(false);
    if (api.cancelled()) return;

    await openMenu(api, "Casey Ng");
    if (api.cancelled()) return;
    await api.go('[data-demo="ctx-message"]', 380);
    if (api.cancelled()) return;
    setMenu((m) => (m ? { ...m, highlight: "message" } : m));
    await api.wait(100);
    if (api.cancelled()) return;
    await api.press(150);
    if (api.cancelled()) return;
    setMenu((m) =>
      m ? { ...m, toast: "Message sent", highlight: "message" } : m
    );
    api.release();
    await api.wait(600);
    if (api.cancelled()) return;
    setMenu(null);
    await api.wait(160);

    await openMenu(api, "Riley Cho");
    if (api.cancelled()) return;
    await api.go('[data-demo="ctx-unassign"]', 380);
    if (api.cancelled()) return;
    setMenu((m) => (m ? { ...m, highlight: "unassign" } : m));
    await api.wait(100);
    if (api.cancelled()) return;
    await api.press(150);
    if (api.cancelled()) return;
    setRemoved("Riley Cho");
    setMenu((m) =>
      m ? { ...m, toast: "Unassigned", highlight: "unassign" } : m
    );
    api.release();
    await api.wait(600);
    if (api.cancelled()) return;
    setMenu(null);

    await api.tap('[data-demo="day-5"]', () =>
      setDays((prev) => prev.map((on, i) => (i === 5 ? false : on)))
    );
    if (api.cancelled()) return;
    setPaired(false);
    setRemoved(null);
    setSelectedId("private-dual");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LivingBoard
      label="Alex · CFI"
      rest={{ x: 84, y: 90 }}
      fallback={<InstructionMock />}
      script={script}
    >
      <AppMockShell
        path="/settings/instruction"
        activeNav={0}
        className="animate-none"
        float={
          <MockFloat
            label="Default rate"
            value={selected.rate}
            meta={`${selected.name} · bills with the flight`}
          />
        }
      >
        <MockHeader
          eyebrow="Instruction"
          title="Rates & pairing"
          action={flash ? "Assigned" : "+ Assign"}
        />

        <div className="grid min-h-[280px] flex-1 sm:grid-cols-[1.05fr_1fr]">
          <div className="border-b border-border sm:border-r sm:border-b-0">
            <p className="border-b border-border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              Instruction types
            </p>
            <div className="divide-y divide-border">
              {TYPES.map((t) => (
                <div
                  key={t.id}
                  data-demo={`type-${t.id}`}
                  className={cn(
                    "flex w-full items-start justify-between gap-3 px-4 py-3 text-left transition-colors duration-150",
                    selectedId === t.id ? "bg-primary/[0.06]" : ""
                  )}
                >
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-foreground">
                      {t.name}
                    </p>
                    <p className="mt-0.5 text-[10px] text-muted-foreground">
                      {t.kind} · {t.instructors.length} CFI
                      {t.instructors.length === 1 ? "" : "s"} ·{" "}
                      {t.id === selectedId ? students.length : t.students.length}{" "}
                      student
                      {(t.id === selectedId ? students.length : t.students.length) ===
                      1
                        ? ""
                        : "s"}
                    </p>
                  </div>
                  <p className="shrink-0 text-[12px] font-semibold tabular-nums text-primary">
                    {t.rate}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex-1 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Who teaches · who learns
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Pairing decides who can be booked together for{" "}
                <span className="font-semibold text-foreground">
                  {selected.name}
                </span>
                . Syllabus progress lives under Training.
              </p>

              <div className="mt-3">
                <p className="text-[10px] font-medium text-muted-foreground">
                  Instructors
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {selected.instructors.map((name) => (
                    <div
                      key={name}
                      data-demo={`cfi-${name}`}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[10px] font-semibold transition-all duration-150",
                        cfi === name
                          ? "bg-primary text-white shadow-sm"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3">
                <p className="text-[10px] font-medium text-muted-foreground">
                  Assigned students
                </p>
                <ul className="mt-1.5 min-h-[88px] space-y-1">
                  {students.map((name) => (
                    <li
                      key={name}
                      data-demo={`student-${name}`}
                      className={cn(
                        "flex items-center justify-between rounded-lg bg-[#fafbfc] px-2.5 py-1.5 text-[11px] transition-all duration-300",
                        name === "Riley Cho" && "animate-demo-pop"
                      )}
                    >
                      <span className="font-semibold text-foreground">{name}</span>
                      <span className="text-[10px] text-muted-foreground">
                        ↔ {cfi}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-border bg-[#fafbfc] px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {cfi} · weekly availability
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                Self-booking and the desk only offer times that clear this week.
              </p>
              <div className="mt-2 flex gap-1">
                {DAY_LABELS.map((d, i) => (
                  <div
                    key={`${d}-${i}`}
                    data-demo={`day-${i}`}
                    className={cn(
                      "flex h-8 flex-1 items-center justify-center rounded-md text-[10px] font-semibold transition-all duration-150",
                      days[i]
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {d}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AppMockShell>

      {detail && <DetailCard item={detail.item} x={detail.x} y={detail.y} />}
      {menu && (
        <CtxMenu
          x={menu.x}
          y={menu.y}
          highlight={menu.highlight}
          toast={menu.toast}
        />
      )}
    </LivingBoard>
  );
}

function DetailCard({
  item,
  x,
  y,
}: {
  item: InstructionType;
  x: number;
  y: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-50 w-[250px] overflow-hidden rounded-lg border border-border bg-white animate-demo-pop",
        SHADOW_CARD
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden
    >
      <div className="border-b border-border px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[12px] font-semibold text-foreground">{item.name}</p>
          <span
            data-demo="detail-rate"
            className="shrink-0 text-[11px] font-semibold tabular-nums text-primary"
          >
            {item.rate}
          </span>
        </div>
        <p className="mt-1.5 text-[10px] leading-snug text-muted-foreground">
          {item.summary}
        </p>
      </div>
      <ul className="space-y-1.5 px-3 py-2.5">
        {item.details.map((line) => (
          <li key={line} className="flex gap-2 text-[10px] leading-snug text-foreground/85">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary/70" />
            {line}
          </li>
        ))}
      </ul>
      <div className="border-t border-border px-3 py-2">
        <div data-demo="detail-dismiss" className="text-center text-[10px] font-semibold text-primary">
          Close
        </div>
      </div>
    </div>
  );
}

function CtxMenu({
  x,
  y,
  highlight,
  toast,
}: {
  x: number;
  y: number;
  highlight: string | null;
  toast: string | null;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-50 min-w-[168px] overflow-hidden rounded-md border border-border bg-white py-1 text-[11px] animate-demo-pop",
        SHADOW_MENU
      )}
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden
    >
      {MENU.map((item, i) => (
        <div key={item.id}>
          {i === 1 && <div className="my-1 h-px bg-border" />}
          <div
            data-demo={`ctx-${item.id}`}
            className={cn(
              "px-3 py-1.5 font-medium transition-colors",
              item.tone,
              highlight === item.id &&
                (item.id === "unassign"
                  ? "bg-[#c4142f]/10"
                  : "bg-primary/[0.08]")
            )}
          >
            {item.label}
          </div>
        </div>
      ))}
      {toast && (
        <div className="border-t border-border bg-[#fafbfc] px-3 py-1.5 text-[10px] font-semibold text-primary">
          {toast}
        </div>
      )}
    </div>
  );
}
