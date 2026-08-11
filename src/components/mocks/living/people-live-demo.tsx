"use client";

import { useCallback, useRef, useState } from "react";
import {
  AppMockShell,
  MockFloat,
  MockHeader,
  MockPill,
  MockRow,
} from "@/components/mocks/shell";
import { PeopleMock } from "@/components/mocks/people-mock";
import {
  LivingBoard,
  type DemoController,
} from "@/components/mocks/living/demo-runtime";
import { cn } from "@/lib/cn";

type Person = {
  name: string;
  role: string;
  tone: string;
  group: string;
  summary: string;
  details: string[];
};

const PEOPLE: Person[] = [
  {
    name: "Morgan Blake",
    role: "Owner · Admin",
    tone: "bg-primary/10 text-primary",
    group: "All",
    summary: "School owner — full admin, billing, and dispatch access.",
    details: [
      "Member since 2019 · Owner role",
      "Can manage fleet, people, and invoices",
      "Not grounded · currencies N/A for desk",
      "Preferred contact · SMS",
    ],
  },
  {
    name: "Chris Diaz",
    role: "Dispatcher",
    tone: "bg-[#2c4589]/10 text-[#2c4589]",
    group: "All",
    summary: "Front-desk dispatcher — schedule and ramp close-out.",
    details: [
      "Role · Dispatcher · counter iPad",
      "Can book, cancel, and invoice",
      "Cannot edit ratings or memberships",
      "On shift Mon–Fri 07:00–15:00",
    ],
  },
  {
    name: "Alex Chen",
    role: "Instructor",
    tone: "bg-[#17876f]/10 text-[#17876f]",
    group: "Instructors",
    summary: "CFI · available for dual, checkouts, and endorsements.",
    details: [
      "CFI · medical & BFR current",
      "12 active students · Private track",
      "Rate · $65/hr dual (Private)",
      "Availability · Mon–Fri · Sat off",
    ],
  },
  {
    name: "Jordan Lee",
    role: "Student",
    tone: "bg-muted text-muted-foreground",
    group: "Students",
    summary: "Private Pilot student — medical expired, blocked for solo.",
    details: [
      "Stage 1 Presolo · 18.6 hours logged",
      "Medical expired Jul 2 · No-Go for PIC",
      "Balance · $186 due (Dual 1.2)",
      "Assigned CFI · Alex Chen",
    ],
  },
  {
    name: "Sam Ortiz",
    role: "Renter",
    tone: "bg-muted text-muted-foreground",
    group: "Renters",
    summary: "Checkout renter — BFR due in 4 days.",
    details: [
      "Checkout · N172SP & N5287Q",
      "BFR expires Fri · caution for PIC",
      "Last rental · N5287Q yesterday",
      "Card on file · auto-invoice",
    ],
  },
];

const TABS = ["All", "Instructors", "Students", "Renters"] as const;

const MENU_ITEMS = [
  { id: "ground", label: "Ground member", tone: "text-[#c4142f]" },
  { id: "invoice", label: "Invoice directly", tone: "text-foreground" },
  { id: "reservation", label: "Create reservation", tone: "text-foreground" },
  { id: "group", label: "Add to group", tone: "text-foreground" },
] as const;

type DetailState = { person: Person; x: number; y: number } | null;
type MenuState = {
  person: Person;
  x: number;
  y: number;
  highlight: string | null;
  toast: string | null;
} | null;

export function PeopleLiveDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const tabRef = useRef<(typeof TABS)[number]>("All");
  const [selected, setSelected] = useState("Morgan Blake");
  const [flash, setFlash] = useState(false);
  const [detail, setDetail] = useState<DetailState>(null);
  const [menu, setMenu] = useState<MenuState>(null);
  const [grounded, setGrounded] = useState<string | null>(null);

  const ensureTab = async (
    api: DemoController,
    want: (typeof TABS)[number]
  ) => {
    if (tabRef.current === want) return;
    await api.tap(`[data-demo="tab-${want}"]`, () => {
      setTab(want);
      tabRef.current = want;
    });
  };

  const openDetail = async (api: DemoController, name: string) => {
    const person = PEOPLE.find((p) => p.name === name);
    if (!person) return;
    if (person.group !== "All") {
      await ensureTab(api, person.group as (typeof TABS)[number]);
      if (api.cancelled()) return;
    }
    await api.go(`[data-demo="row-${name}"]`, 680);
    if (api.cancelled()) return;
    await api.wait(80);
    if (api.cancelled()) return;
    await api.press(160);
    if (api.cancelled()) return;
    setSelected(name);
    const tip = api.pointFor(`[data-demo="row-${name}"]`);
    setDetail({
      person,
      x: Math.min((tip?.x ?? 40) + 10, 58),
      y: Math.min(Math.max((tip?.y ?? 35) - 2, 14), 48),
    });
    api.release();
    await api.wait(260);
    if (api.cancelled()) return;
    await api.go('[data-demo="detail-role"]', 400);
    if (api.cancelled()) return;
    await api.wait(560);
    if (api.cancelled()) return;
    await api.go('[data-demo="detail-dismiss"]', 380);
    if (api.cancelled()) return;
    await api.press(150);
    if (api.cancelled()) return;
    setDetail(null);
    api.release();
    await api.wait(220);
  };

  const rightClickMenu = async (
    api: DemoController,
    name: string,
    actionId: (typeof MENU_ITEMS)[number]["id"]
  ) => {
    const person = PEOPLE.find((p) => p.name === name);
    if (!person) return;
    if (person.group !== "All") {
      await ensureTab(api, person.group as (typeof TABS)[number]);
      if (api.cancelled()) return;
    }

    await api.go(`[data-demo="row-${name}"]`, 640);
    if (api.cancelled()) return;
    await api.wait(80);
    if (api.cancelled()) return;
    await api.press(110);
    if (api.cancelled()) return;
    setSelected(name);
    const tip = api.pointFor(`[data-demo="row-${name}"]`);
    setMenu({
      person,
      x: (tip?.x ?? 50) + 1.2,
      y: (tip?.y ?? 40) + 1.4,
      highlight: null,
      toast: null,
    });
    api.release();
    await api.wait(300);
    if (api.cancelled()) return;

    await api.go(`[data-demo="ctx-${actionId}"]`, 460);
    if (api.cancelled()) return;
    setMenu((m) => (m ? { ...m, highlight: actionId } : m));
    await api.wait(140);
    if (api.cancelled()) return;
    await api.press(180);
    if (api.cancelled()) return;

    const toast =
      actionId === "ground"
        ? `${name.split(" ")[0]} grounded`
        : actionId === "invoice"
          ? "Invoice draft opened"
          : actionId === "reservation"
            ? "Reservation started"
            : "Added to Evening duals";
    if (actionId === "ground") setGrounded(name);
    setMenu((m) => (m ? { ...m, toast, highlight: actionId } : m));
    api.release();
    await api.wait(700);
    if (api.cancelled()) return;
    setMenu(null);
    await api.wait(240);
  };

  const script = useCallback(async (api: DemoController) => {
    setTab("All");
    tabRef.current = "All";
    setGrounded(null);
    setDetail(null);
    setMenu(null);

    await openDetail(api, "Alex Chen");
    if (api.cancelled()) return;
    await openDetail(api, "Jordan Lee");
    if (api.cancelled()) return;

    await rightClickMenu(api, "Jordan Lee", "ground");
    if (api.cancelled()) return;
    await rightClickMenu(api, "Jordan Lee", "invoice");
    if (api.cancelled()) return;
    await rightClickMenu(api, "Sam Ortiz", "reservation");
    if (api.cancelled()) return;
    await rightClickMenu(api, "Alex Chen", "group");
    if (api.cancelled()) return;

    setGrounded(null);
    await ensureTab(api, "All");
    if (api.cancelled()) return;
    await api.tap('[data-demo="action"]', () => setFlash(true));
    if (api.cancelled()) return;
    await api.wait(700);
    setFlash(false);
    await api.tap('[data-demo="row-Morgan Blake"]', () =>
      setSelected("Morgan Blake")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LivingBoard
      label="Morgan · Admin"
      rest={{ x: 86, y: 90 }}
      fallback={<PeopleMock />}
      script={script}
    >
      <AppMockShell
        path="/people"
        activeNav={1}
        className="animate-none"
        float={
          <MockFloat label="Roster" value="48" meta="members · 3 join requests" />
        }
      >
        <MockHeader
          eyebrow="Organization"
          title="People"
          action={flash ? "Sent" : "Invite"}
        />
        <div className="flex gap-1.5 overflow-hidden border-b border-border px-4 py-2.5">
          {TABS.map((t) => (
            <MockPill key={t} data-demo={`tab-${t}`} active={tab === t}>
              {t}
            </MockPill>
          ))}
        </div>
        <div className="divide-y divide-border">
          {PEOPLE.map((p) => {
            const match = tab === "All" || p.group === tab;
            const isGrounded = grounded === p.name;
            return (
              <MockRow
                key={p.name}
                data-demo={`row-${p.name}`}
                selected={match && selected === p.name}
                className={cn("py-2.5", !match && "opacity-35")}
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
                  {p.name
                    .split(" ")
                    .map((x) => x[0])
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-semibold text-foreground">
                    {p.name}
                  </p>
                  <span
                    className={`mt-0.5 inline-block rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${p.tone}`}
                  >
                    {p.role}
                  </span>
                </div>
                {isGrounded && (
                  <span className="rounded-full bg-[#c4142f]/10 px-2 py-0.5 text-[9px] font-semibold text-[#c4142f]">
                    Grounded
                  </span>
                )}
              </MockRow>
            );
          })}
        </div>
      </AppMockShell>

      {detail && (
        <DetailPopover person={detail.person} x={detail.x} y={detail.y} />
      )}
      {menu && (
        <PeopleContextMenu
          x={menu.x}
          y={menu.y}
          highlight={menu.highlight}
          toast={menu.toast}
        />
      )}
    </LivingBoard>
  );
}

function DetailPopover({
  person,
  x,
  y,
}: {
  person: Person;
  x: number;
  y: number;
}) {
  return (
    <div
      className="pointer-events-none absolute z-50 w-[250px] overflow-hidden rounded-lg border border-border bg-white shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35),0_8px_20px_-8px_rgba(15,23,42,0.2)] animate-demo-pop"
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden
    >
      <div className="border-b border-border px-3 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[12px] font-semibold text-foreground">
            {person.name}
          </p>
          <span
            data-demo="detail-role"
            className={cn(
              "shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold",
              person.tone
            )}
          >
            {person.role.split(" · ")[0]}
          </span>
        </div>
        <p className="mt-1.5 text-[10px] leading-snug text-muted-foreground">
          {person.summary}
        </p>
      </div>
      <ul className="space-y-1.5 px-3 py-2.5">
        {person.details.map((line) => (
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
          data-demo="detail-dismiss"
          className="text-center text-[10px] font-semibold text-primary"
        >
          Close
        </div>
      </div>
    </div>
  );
}

function PeopleContextMenu({
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
      className="pointer-events-none absolute z-50 min-w-[168px] overflow-hidden rounded-md border border-border bg-white py-1 text-[11px] shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35),0_8px_20px_-8px_rgba(15,23,42,0.2)] animate-demo-pop"
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden
    >
      {MENU_ITEMS.map((item, i) => (
        <div key={item.id}>
          {i === 3 && <div className="my-1 h-px bg-border" />}
          <div
            data-demo={`ctx-${item.id}`}
            className={cn(
              "px-3 py-1.5 font-medium transition-colors",
              item.tone,
              highlight === item.id &&
                (item.id === "ground"
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
