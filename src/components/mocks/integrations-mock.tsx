import { AppMockShell, MockFloat, MockHeader } from "@/components/mocks/shell";

export function IntegrationsMock() {
  const items = [
    {
      name: "Stripe",
      status: "Connected",
      ok: true,
      detail: "Invoices & cards",
      logo: "/integrations/stripe.svg",
    },
    {
      name: "Google Calendar",
      status: "Coming soon",
      ok: false,
      detail: "Personal sync",
      logo: "/integrations/google-calendar.svg",
    },
    {
      name: "QuickBooks",
      status: "Coming soon",
      ok: false,
      detail: "Ledger export",
      logo: "/integrations/quickbooks.svg",
    },
  ];

  return (
    <AppMockShell
      path="/settings"
      activeNav={0}
      float={<MockFloat label="Payments" value="Live" meta="Stripe connected" />}
    >
      <MockHeader eyebrow="Settings" title="Integrations" />
      <div className="divide-y divide-border">
        {items.map((item) => (
          <div key={item.name} className="flex items-center gap-3 px-4 py-4">
            <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-white p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.logo}
                alt=""
                width={28}
                height={28}
                className="size-7 object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-foreground">{item.name}</p>
              <p className="text-[10px] text-muted-foreground">{item.detail}</p>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                item.ok
                  ? "bg-success/10 text-success"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </AppMockShell>
  );
}
