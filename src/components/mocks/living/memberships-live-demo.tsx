"use client";

import { useCallback, useRef, useState } from "react";
import {
  AppMockShell,
  MockFloat,
  MockHeader,
  MockPill,
  MockRow,
} from "@/components/mocks/shell";
import { MembershipsMock } from "@/components/mocks/memberships-mock";
import {
  LivingBoard,
  type DemoController,
} from "@/components/mocks/living/demo-runtime";
import { cn } from "@/lib/cn";

type Status = "Active" | "Owed" | "Paused";

type Member = {
  id: string;
  name: string;
  tier: string;
  meta: string;
  amount: string;
  cadence: string;
  status: Status;
  summary: string;
  details: string[];
};

const SEED: Member[] = [
  {
    id: "hollis",
    name: "Hollis Bramley",
    tier: "Full",
    meta: "Member since 2024 · dues paid",
    amount: "$95.00",
    cadence: "/mo",
    status: "Active",
    summary: "Full member on autopay — current through month end.",
    details: [
      "Plan · Full · $95/mo",
      "Card on file · Visa ···· 1881",
      "Next bill · 1st of the month",
      "Flying privileges · all club aircraft",
    ],
  },
  {
    id: "cal",
    name: "Cal Merriweather",
    tier: "Full",
    meta: "Joined the 12th · part month owed",
    amount: "$61.29",
    cadence: " part",
    status: "Owed",
    summary: "Joined mid-cycle — prorated first period still outstanding.",
    details: [
      "Plan · Full · $95/mo after this period",
      "Owed · $61.29 (12th–month end)",
      "No card charged yet · collect at desk",
      "Privileges held until first period clears",
    ],
  },
  {
    id: "noor",
    name: "Noor Haddad",
    tier: "Associate",
    meta: "Occasional flyer · auto-billed",
    amount: "$45.00",
    cadence: "/mo",
    status: "Active",
    summary: "Associate tier — auto-billed, limited weekday flying.",
    details: [
      "Plan · Associate · $45/mo",
      "Autopay on · last charge cleared",
      "Weekday rentals only",
      "Upgrade path · Full at $95/mo",
    ],
  },
  {
    id: "ivy",
    name: "Ivy Petrosyan",
    tier: "Full",
    meta: "Deployed until the spring",
    amount: "–",
    cadence: "",
    status: "Paused",
    summary: "Paused for deployment — no dues while away, roster kept.",
    details: [
      "Plan · Full · paused",
      "No recurring charge while paused",
      "Seniority and checkout retained",
      "Resume when back on the field",
    ],
  },
  {
    id: "rosa",
    name: "Rosa Delgado",
    tier: "Social",
    meta: "Clubhouse only · no flying",
    amount: "$60.00",
    cadence: "/yr",
    status: "Active",
    summary: "Social member — clubhouse access, no aircraft.",
    details: [
      "Plan · Social · $60/yr",
      "No flying privileges",
      "Events and clubhouse access",
      "Billed annually each January",
    ],
  },
];

const TABS = ["All tiers", "Full", "Associate", "Social"] as const;

const STATUS_TONE: Record<Status, string> = {
  Active: "text-success bg-success/10",
  Owed: "text-[#b7791f] bg-[#b7791f]/10",
  Paused: "text-muted-foreground bg-muted",
};

const MENU_ITEMS = [
  { id: "collect", label: "Collect dues", tone: "text-foreground" },
  { id: "pause", label: "Pause membership", tone: "text-foreground" },
  { id: "resume", label: "Resume membership", tone: "text-foreground" },
  { id: "tier", label: "Change tier", tone: "text-foreground" },
  { id: "waive", label: "Waive this period", tone: "text-[#c4142f]" },
] as const;

type DetailState = { member: Member; x: number; y: number } | null;
type MenuState = {
  memberId: string;
  x: number;
  y: number;
  highlight: string | null;
  toast: string | null;
} | null;

export function MembershipsLiveDemo() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All tiers");
  const tabRef = useRef<(typeof TABS)[number]>("All tiers");
  const [selected, setSelected] = useState("cal");
  const [members, setMembers] = useState(() => SEED.map((m) => ({ ...m })));
  const [flash, setFlash] = useState(false);
  const [detail, setDetail] = useState<DetailState>(null);
  const [menu, setMenu] = useState<MenuState>(null);

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

  const openDetail = async (api: DemoController, id: string) => {
    const member = members.find((m) => m.id === id) ?? SEED.find((m) => m.id === id);
    if (!member) return;
    // Rows stay visible on every tab (dimmed when filtered out) — only
    // change tabs when we intentionally want a different filter.
    await api.go(`[data-demo="row-${id}"]`, 660);
    if (api.cancelled()) return;
    await api.wait(80);
    if (api.cancelled()) return;
    await api.press(160);
    if (api.cancelled()) return;
    setSelected(id);
    const tip = api.pointFor(`[data-demo="row-${id}"]`);
    const live = members.find((m) => m.id === id) ?? member;
    setDetail({
      member: live,
      x: Math.min((tip?.x ?? 40) + 10, 56),
      y: Math.min(Math.max((tip?.y ?? 35) - 2, 14), 48),
    });
    api.release();
    await api.wait(260);
    if (api.cancelled()) return;
    await api.go('[data-demo="detail-status"]', 400);
    if (api.cancelled()) return;
    await api.wait(560);
    if (api.cancelled()) return;
    await api.go('[data-demo="detail-dismiss"]', 360);
    if (api.cancelled()) return;
    await api.press(150);
    if (api.cancelled()) return;
    setDetail(null);
    api.release();
    await api.wait(220);
  };

  const openMenu = async (api: DemoController, id: string) => {
    await api.go(`[data-demo="row-${id}"]`, 620);
    if (api.cancelled()) return;
    await api.wait(80);
    if (api.cancelled()) return;
    await api.press(110);
    if (api.cancelled()) return;
    setSelected(id);
    const tip = api.pointFor(`[data-demo="row-${id}"]`);
    setMenu({
      memberId: id,
      x: (tip?.x ?? 50) + 1.2,
      y: (tip?.y ?? 40) + 1.4,
      highlight: null,
      toast: null,
    });
    api.release();
    await api.wait(280);
  };

  const pickMenu = async (
    api: DemoController,
    actionId: (typeof MENU_ITEMS)[number]["id"],
    apply: () => void,
    toast: string
  ) => {
    await api.go(`[data-demo="ctx-${actionId}"]`, 440);
    if (api.cancelled()) return;
    setMenu((m) => (m ? { ...m, highlight: actionId } : m));
    await api.wait(130);
    if (api.cancelled()) return;
    await api.press(170);
    if (api.cancelled()) return;
    apply();
    setMenu((m) => (m ? { ...m, toast, highlight: actionId } : m));
    api.release();
    await api.wait(700);
    if (api.cancelled()) return;
    setMenu(null);
    await api.wait(220);
  };

  const script = useCallback(async (api: DemoController) => {
    setMembers(SEED.map((m) => ({ ...m })));
    setDetail(null);
    setMenu(null);
    setFlash(false);
    setTab("All tiers");
    tabRef.current = "All tiers";

    // Click rows → member detail cards (stay on All tiers)
    await openDetail(api, "cal");
    if (api.cancelled()) return;
    await openDetail(api, "ivy");
    if (api.cancelled()) return;

    // Filter to Full once, then act on Full members — no re-taps
    await ensureTab(api, "Full");
    if (api.cancelled()) return;

    await openMenu(api, "cal");
    if (api.cancelled()) return;
    await pickMenu(
      api,
      "collect",
      () =>
        setMembers((prev) =>
          prev.map((m) =>
            m.id === "cal"
              ? {
                  ...m,
                  status: "Active",
                  amount: "$95.00",
                  cadence: "/mo",
                  meta: "Member since this month · dues paid",
                }
              : m
          )
        ),
      "Dues collected · $61.29"
    );
    if (api.cancelled()) return;

    await openMenu(api, "ivy");
    if (api.cancelled()) return;
    await pickMenu(
      api,
      "resume",
      () =>
        setMembers((prev) =>
          prev.map((m) =>
            m.id === "ivy"
              ? {
                  ...m,
                  status: "Active",
                  amount: "$95.00",
                  cadence: "/mo",
                  meta: "Back on the field · dues resume",
                }
              : m
          )
        ),
      "Membership resumed"
    );
    if (api.cancelled()) return;

    // Switch to Associate only when leaving Full
    await ensureTab(api, "Associate");
    if (api.cancelled()) return;
    await openMenu(api, "noor");
    if (api.cancelled()) return;
    await pickMenu(
      api,
      "tier",
      () =>
        setMembers((prev) =>
          prev.map((m) =>
            m.id === "noor"
              ? {
                  ...m,
                  tier: "Full",
                  amount: "$95.00",
                  meta: "Upgraded to Full · next bill $95",
                }
              : m
          )
        ),
      "Moved to Full tier"
    );
    if (api.cancelled()) return;

    await ensureTab(api, "All tiers");
    if (api.cancelled()) return;
    await api.tap('[data-demo="action"]', () => setFlash(true));
    if (api.cancelled()) return;
    await api.wait(900);
    setFlash(false);

    setMembers(SEED.map((m) => ({ ...m })));
    await api.tap('[data-demo="row-cal"]', () => setSelected("cal"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LivingBoard
      label="Hollis · Treasurer"
      rest={{ x: 86, y: 90 }}
      fallback={<MembershipsMock />}
      script={script}
    >
      <AppMockShell
        path="/settings?tab=memberships"
        activeNav={3}
        className="animate-none"
        float={
          <MockFloat
            label="Recurring"
            value="$2,340/mo"
            meta="26 members on a plan"
          />
        }
      >
        <MockHeader
          eyebrow="Membership"
          title="Members & dues"
          action={flash ? "Billed" : "Bill dues"}
        />
        <div className="flex gap-2 border-b border-border px-4 py-2.5">
          {TABS.map((t) => (
            <MockPill key={t} data-demo={`tab-${t}`} active={tab === t}>
              {t}
            </MockPill>
          ))}
        </div>
        <div className="flex min-h-[260px] flex-col divide-y divide-border">
          {members.map((r) => {
            const match = tab === "All tiers" || r.tier === tab;
            return (
              <MockRow
                key={r.id}
                data-demo={`row-${r.id}`}
                selected={match && selected === r.id}
                className={cn(!match && "opacity-35")}
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-semibold text-muted-foreground">
                  {r.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-semibold text-foreground">
                    {r.name}
                  </p>
                  <p className="truncate text-[10px] text-muted-foreground">
                    {r.tier} · {r.meta}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[12px] font-semibold tabular-nums text-foreground">
                    {r.amount}
                    <span className="text-[10px] font-normal text-muted-foreground">
                      {r.cadence}
                    </span>
                  </p>
                  <span
                    className={`mt-0.5 inline-block rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${STATUS_TONE[r.status]}`}
                  >
                    {r.status}
                  </span>
                </div>
              </MockRow>
            );
          })}
        </div>
      </AppMockShell>

      {detail && (
        <DetailPopover member={detail.member} x={detail.x} y={detail.y} />
      )}
      {menu && (
        <MembershipContextMenu
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
  member,
  x,
  y,
}: {
  member: Member;
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
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-foreground">
              {member.name}
            </p>
            <p className="truncate text-[10px] text-muted-foreground">
              {member.tier} · {member.amount}
              {member.cadence}
            </p>
          </div>
          <span
            data-demo="detail-status"
            className={cn(
              "shrink-0 rounded-full px-2 py-0.5 text-[9px] font-semibold",
              STATUS_TONE[member.status]
            )}
          >
            {member.status}
          </span>
        </div>
        <p className="mt-1.5 text-[10px] leading-snug text-muted-foreground">
          {member.summary}
        </p>
      </div>
      <ul className="space-y-1.5 px-3 py-2.5">
        {member.details.map((line) => (
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

function MembershipContextMenu({
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
      className="pointer-events-none absolute z-50 min-w-[176px] overflow-hidden rounded-md border border-border bg-white py-1 text-[11px] shadow-[0_18px_50px_-12px_rgba(15,23,42,0.35),0_8px_20px_-8px_rgba(15,23,42,0.2)] animate-demo-pop"
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden
    >
      {MENU_ITEMS.map((item, i) => (
        <div key={item.id}>
          {i === 4 && <div className="my-1 h-px bg-border" />}
          <div
            data-demo={`ctx-${item.id}`}
            className={cn(
              "px-3 py-1.5 font-medium transition-colors",
              item.tone,
              highlight === item.id &&
                (item.id === "waive"
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
