"use client";

import { useCallback, useState } from "react";
import { AppMockShell, MockHeader } from "@/components/mocks/shell";
import { LivingBoard, type DemoController } from "@/components/mocks/living/demo-runtime";
import { cn } from "@/lib/cn";

/**
 * A student and an instructor sorting out tomorrow's lesson in Messages, the way the real
 * console does it: the conversation sits beside the schedule, a mention is a chip that opens
 * the aircraft, and the reply arrives live. Every control here exists in the product (the
 * composer, @ mentions, the booking's conversation). Names and tails are invented.
 */

type Msg = { id: string; mine: boolean; parts: (string | { chip: string })[] };

const SEED: Msg[] = [
  { id: "m1", mine: false, parts: ["Weather looks good for tomorrow. Want to fly the lesson at 0800?"] },
];
const ASK: Msg = { id: "m2", mine: true, parts: ["Yes please. Can we take ", { chip: "N172TS" }, " this time?"] };
const REPLY: Msg = { id: "m3", mine: false, parts: ["Booked. ", { chip: "Tue 0800 · N172TS" }, " Bring your logbook."] };

export function MessagesLiveDemo({ animated = true }: { animated?: boolean } = {}) {
  const [messages, setMessages] = useState<Msg[]>(SEED);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");

  const script = useCallback(async (api: DemoController) => {
    setMessages(SEED);
    setTyping(false);
    setDraft("");
    await api.wait(500);
    if (api.cancelled()) return;

    // 1. The student writes back, pointing at the aircraft with @.
    for (const text of ["Yes please. Can we take @N172", "Yes please. Can we take @N172TS this time?"]) {
      setDraft(text);
      await api.wait(500);
      if (api.cancelled()) return;
    }
    await api.tap('[data-demo="send"]', () => {
      setDraft("");
      setMessages((prev) => [...prev, ASK]);
    });
    if (api.cancelled()) return;

    // 2. The instructor answers live. Nobody here clicks: it arrives.
    await api.wait(700);
    setTyping(true);
    await api.wait(1200);
    if (api.cancelled()) return;
    setTyping(false);
    setMessages((prev) => [...prev, REPLY]);
    await api.wait(2400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LivingBoard
      label="Sam · Student"
      rest={{ x: 90, y: 90 }}
      fallback={<MessagesBoard messages={[...SEED, ASK, REPLY]} typing={false} draft="" />}
      script={script}
      animated={animated}
    >
      <MessagesBoard messages={messages} typing={typing} draft={draft} />
    </LivingBoard>
  );
}

function MessagesBoard({ messages, typing, draft }: { messages: Msg[]; typing: boolean; draft: string }) {
  return (
    <AppMockShell
      path="/me"
      activeNav={1}
      className="animate-none"
    >
      <MockHeader eyebrow="Messages" title="Maria Okafor" meta="Instructor · Cascade Flight Training" />
      <div className="flex min-h-[230px] flex-col justify-end gap-1.5 px-4 py-3">
        <p className="pb-1 text-center text-[9px] font-medium text-muted-foreground">Today 6:12 PM</p>
        {messages.map((m) => (
          <div key={m.id} className={cn("flex animate-demo-pop", m.mine ? "justify-end" : "justify-start")}>
            <p
              className={cn(
                "max-w-[78%] rounded-[14px] px-3 py-1.5 text-[11px] leading-[16px]",
                m.mine ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              )}
            >
              {m.parts.map((part, i) =>
                typeof part === "string" ? (
                  <span key={i}>{part}</span>
                ) : (
                  <span
                    key={i}
                    className={cn(
                      "mx-0.5 inline-flex items-center rounded-md px-1 py-px text-[10px] font-semibold",
                      m.mine ? "bg-white/20 text-white" : "border border-border bg-white text-primary"
                    )}
                  >
                    {part.chip}
                  </span>
                )
              )}
            </p>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <span className="inline-flex gap-1 rounded-[14px] bg-muted px-3 py-2">
              {[0, 1, 2].map((d) => (
                <span key={d} className="size-1 animate-pulse rounded-full bg-muted-foreground/60" style={{ animationDelay: `${d * 150}ms` }} />
              ))}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 border-t border-border px-4 py-2.5">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-border text-[10px] text-muted-foreground">@</span>
        <span className={cn("min-w-0 flex-1 truncate rounded-full border border-border px-3 py-1 text-[11px]", draft ? "text-foreground" : "text-muted-foreground")}>
          {draft || "Message Maria Okafor"}
        </span>
        <span data-demo="send" className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
          ↑
        </span>
      </div>
    </AppMockShell>
  );
}
