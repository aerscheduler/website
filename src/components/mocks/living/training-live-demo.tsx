"use client";

import { useCallback, useState } from "react";
import { AppMockShell, MockFloat, MockHeader, MockPill } from "@/components/mocks/shell";
import { TrainingMock } from "@/components/mocks/training-mock";
import {
  LivingBoard,
  type DemoController,
} from "@/components/mocks/living/demo-runtime";
import { cn } from "@/lib/cn";

type Lesson = {
  name: string;
  grade: string | null;
  note: string;
  demo: string;
  summary: string;
  details: string[];
};

const STAGES: { name: string; lessons: Lesson[] }[] = [
  {
    name: "Stage 1: Presolo",
    lessons: [
      {
        name: "Flight 1: Effects of controls",
        grade: "Complete",
        note: "1.2 dual · Okafor",
        demo: "lesson-f1",
        summary: "Introduced primary and secondary flight controls.",
        details: ["Grade · Complete", "Time · 1.2 dual", "CFI · Okafor", "Next · slow flight"],
      },
      {
        name: "Flight 2: Slow flight and stalls",
        grade: "Complete",
        note: "1.4 dual · Okafor",
        demo: "lesson-f2",
        summary: "Power-off and power-on stalls to recovery.",
        details: ["Grade · Complete", "Time · 1.4 dual", "CFI · Okafor", "Notes · clean recoveries"],
      },
      {
        name: "Flight 3: Takeoffs and landings",
        grade: "Repeat",
        note: "1.1 dual · crosswind",
        demo: "lesson-f3",
        summary: "Needs another pattern session for crosswind consistency.",
        details: ["Grade · Repeat", "Time · 1.1 dual", "Focus · crosswind landings", "Weather · 12G18"],
      },
      {
        name: "Flight 4: Presolo check",
        grade: null,
        note: "Not yet flown",
        demo: "lesson-f4",
        summary: "Checkride-style flight before first solo endorsement.",
        details: ["Status · Scheduled", "Prereq · Flight 3 complete", "Endorsement · A.1 pending", "CFI · Chen"],
      },
    ],
  },
  {
    name: "Stage 2: Solo",
    lessons: [
      {
        name: "Flight 8: First solo",
        grade: null,
        note: "Needs A.2 endorsement",
        demo: "lesson-f8",
        summary: "First solo pattern — blocked until A.2 is signed.",
        details: ["Status · Blocked", "Needs · A.2 endorsement", "Aircraft · N172SP", "Tower · advised"],
      },
      {
        name: "Flight 9: Solo pattern work",
        grade: null,
        note: "Not yet flown",
        demo: "lesson-f9",
        summary: "Solo circuits after first solo is logged.",
        details: ["Status · Not started", "Prereq · Flight 8", "Type · Solo", "Limit · local pattern"],
      },
    ],
  },
  {
    name: "Stage 3: Cross-country",
    lessons: [
      {
        name: "Flight 14: Dual cross-country",
        grade: null,
        note: "Not yet flown",
        demo: "lesson-f14",
        summary: "Dual XC to build navigation and diversion skills.",
        details: ["Status · Not started", "Route · TBD", "Credits · XC dual", "CFI · assigned at book"],
      },
      {
        name: "Flight 15: Night cross-country",
        grade: null,
        note: "Credits 4 requirements",
        demo: "lesson-f15",
        summary: "Night XC that stacks several §61.109 boxes at once.",
        details: ["Status · Not started", "Credits · night + XC + dual", "Min · 100 nm", "Wx · personal mins"],
      },
    ],
  },
];

const REQUIREMENTS = [
  { label: "Total flight time", have: "18.6", need: "40", width: "47%" },
  { label: "Dual instruction received", have: "16.2", need: "20", width: "81%" },
  { label: "Solo flight time", have: "0.0", need: "10", width: "2%" },
  { label: "Night flight training", have: "1.8", need: "3", width: "60%" },
];

const GRADE_CLASS: Record<string, string> = {
  Complete: "bg-emerald-500/12 text-emerald-700",
  Repeat: "bg-amber-500/15 text-amber-700",
};

const MENU = [
  { id: "record", label: "Record lesson", tone: "text-foreground" },
  { id: "repeat", label: "Mark for repeat", tone: "text-foreground" },
  { id: "note", label: "Add instructor note", tone: "text-foreground" },
] as const;

const SHADOW_CARD =
  "shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35),0_8px_20px_-8px_rgba(15,23,42,0.2)]";
const SHADOW_MENU = "shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35)]";

type DetailState = { lesson: Lesson; x: number; y: number } | null;
type MenuState = {
  demo: string;
  x: number;
  y: number;
  highlight: string | null;
  toast: string | null;
} | null;

function findLesson(demo: string): Lesson | undefined {
  for (const s of STAGES) {
    const hit = s.lessons.find((l) => l.demo === demo);
    if (hit) return hit;
  }
  return undefined;
}

export function TrainingLiveDemo() {
  const [stage, setStage] = useState(0);
  const [selected, setSelected] = useState("lesson-f4");
  const [recorded, setRecorded] = useState(false);
  const [flash, setFlash] = useState(false);
  const [detail, setDetail] = useState<DetailState>(null);
  const [menu, setMenu] = useState<MenuState>(null);

  const openDetail = async (api: DemoController, demo: string) => {
    const lesson = findLesson(demo);
    if (!lesson) return;
    await api.go(`[data-demo="${demo}"]`, 560);
    if (api.cancelled()) return;
    await api.wait(70);
    if (api.cancelled()) return;
    await api.press(150);
    if (api.cancelled()) return;
    setSelected(demo);
    const tip = api.pointFor(`[data-demo="${demo}"]`);
    setDetail({
      lesson,
      x: Math.min((tip?.x ?? 40) + 8, 56),
      y: Math.min(Math.max((tip?.y ?? 35) - 2, 18), 48),
    });
    api.release();
    await api.wait(260);
    if (api.cancelled()) return;
    await api.go('[data-demo="detail-grade"]', 360);
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

  const openMenu = async (api: DemoController, demo: string) => {
    await api.go(`[data-demo="${demo}"]`, 540);
    if (api.cancelled()) return;
    await api.wait(70);
    if (api.cancelled()) return;
    await api.press(110);
    if (api.cancelled()) return;
    setSelected(demo);
    const tip = api.pointFor(`[data-demo="${demo}"]`);
    setMenu({
      demo,
      x: (tip?.x ?? 50) + 1.2,
      y: (tip?.y ?? 40) + 1.4,
      highlight: null,
      toast: null,
    });
    api.release();
    await api.wait(240);
  };

  const script = useCallback(async (api: DemoController) => {
    setStage(0);
    setSelected("lesson-f4");
    setRecorded(false);
    setDetail(null);
    setMenu(null);

    await openDetail(api, "lesson-f3");
    if (api.cancelled()) return;

    await api.tap('[data-demo="stage-1"]', () => setStage(1));
    if (api.cancelled()) return;
    await openDetail(api, "lesson-f8");
    if (api.cancelled()) return;

    await api.tap('[data-demo="stage-0"]', () => setStage(0));
    if (api.cancelled()) return;

    await openMenu(api, "lesson-f4");
    if (api.cancelled()) return;
    await api.go('[data-demo="ctx-record"]', 400);
    if (api.cancelled()) return;
    setMenu((m) => (m ? { ...m, highlight: "record" } : m));
    await api.wait(110);
    if (api.cancelled()) return;
    await api.press(160);
    if (api.cancelled()) return;
    setRecorded(true);
    setFlash(true);
    setMenu((m) =>
      m ? { ...m, toast: "Lesson recorded", highlight: "record" } : m
    );
    api.release();
    await api.wait(700);
    if (api.cancelled()) return;
    setMenu(null);
    setFlash(false);
    await api.wait(160);

    await openMenu(api, "lesson-f3");
    if (api.cancelled()) return;
    await api.go('[data-demo="ctx-note"]', 400);
    if (api.cancelled()) return;
    setMenu((m) => (m ? { ...m, highlight: "note" } : m));
    await api.wait(110);
    if (api.cancelled()) return;
    await api.press(150);
    if (api.cancelled()) return;
    setMenu((m) =>
      m ? { ...m, toast: "Note saved", highlight: "note" } : m
    );
    api.release();
    await api.wait(600);
    if (api.cancelled()) return;
    setMenu(null);

    await api.tap('[data-demo="lesson-f4"]', () => setSelected("lesson-f4"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LivingBoard label="Alex · CFI" fallback={<TrainingMock />} script={script}>
      <AppMockShell
        path="/training/enrollments/218"
        activeNav={3}
        className="animate-none"
        float={<MockFloat label="Pace" value="On track" meta="Last lesson 4 days ago" />}
      >
        <MockHeader
          eyebrow="Private Pilot · Part 61"
          title="Jordan Lee"
          action={flash ? "Recorded" : "Record lesson"}
        />
        <div className="flex gap-1.5 overflow-x-auto border-b border-border px-4 py-2.5">
          {STAGES.map((s, i) => (
            <MockPill key={s.name} data-demo={`stage-${i}`} active={stage === i}>
              {s.name.split(": ")[1]}
            </MockPill>
          ))}
        </div>
        <div className="flex min-h-[196px] flex-col divide-y divide-border">
          {STAGES[stage].lessons.map((l) => {
            const grade =
              l.demo === "lesson-f4" && recorded ? "Complete" : l.grade;
            const note =
              l.demo === "lesson-f4" && recorded ? "1.3 dual · Chen" : l.note;
            return (
              <button
                key={l.name}
                type="button"
                data-demo={l.demo}
                className={cn(
                  "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors duration-150",
                  selected === l.demo ? "bg-primary/[0.06]" : "hover:bg-[#f7f8fa]"
                )}
              >
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-semibold text-foreground">{l.name}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">{note}</p>
                </div>
                {grade ? (
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                      GRADE_CLASS[grade]
                    )}
                  >
                    {grade}
                  </span>
                ) : (
                  <span className="shrink-0 text-[10px] text-muted-foreground">–</span>
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-auto border-t border-border bg-[#fafbfc] px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            §61.109 requirements
          </p>
          <div className="mt-2 space-y-2">
            {REQUIREMENTS.map((r) => (
              <div key={r.label}>
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-[10px] text-foreground">{r.label}</p>
                  <p className="shrink-0 text-[10px] tabular-nums text-muted-foreground">
                    {r.have} / {r.need}
                  </p>
                </div>
                <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary/70 transition-all duration-300"
                    style={{ width: r.width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </AppMockShell>

      {detail && (
        <DetailCard lesson={detail.lesson} x={detail.x} y={detail.y} recorded={recorded} />
      )}
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
  lesson,
  x,
  y,
  recorded,
}: {
  lesson: Lesson;
  x: number;
  y: number;
  recorded: boolean;
}) {
  const grade =
    lesson.demo === "lesson-f4" && recorded ? "Complete" : lesson.grade;
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
          <p className="min-w-0 truncate text-[12px] font-semibold text-foreground">
            {lesson.name}
          </p>
          <span
            data-demo="detail-grade"
            className={cn(
              "shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold",
              grade ? GRADE_CLASS[grade] : "bg-muted text-muted-foreground"
            )}
          >
            {grade ?? "Open"}
          </span>
        </div>
        <p className="mt-1.5 text-[10px] leading-snug text-muted-foreground">
          {lesson.summary}
        </p>
      </div>
      <ul className="space-y-1.5 px-3 py-2.5">
        {lesson.details.map((line) => (
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
      {MENU.map((item) => (
        <div
          key={item.id}
          data-demo={`ctx-${item.id}`}
          className={cn(
            "px-3 py-1.5 font-medium transition-colors",
            item.tone,
            highlight === item.id && "bg-primary/[0.08]"
          )}
        >
          {item.label}
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
