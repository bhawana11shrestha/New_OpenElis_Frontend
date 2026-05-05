import { Bell, HelpCircle, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = ["Home", "Order Entry", "Patient", "Results", "Validation", "Reports", "Admin"] as const;

export type NavKey = (typeof NAV)[number];

export function Header({
  active,
  setActive,
}: {
  active: string;
  setActive: (v: string) => void;
}) {
  return (
    <header className="bg-gradient-primary text-primary-foreground shadow-elevated sticky top-0 z-30">
      <div className="flex h-16 items-center px-6 gap-6">
        <div className="flex items-center gap-3 min-w-[260px]">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-accent text-accent-foreground font-bold shadow-elegant">
            <span aria-hidden>◎</span>
          </div>
          <div>
            <div className="text-lg font-bold leading-tight">
              OpenELIS{" "}
              <span className="font-normal text-primary-foreground/70">Global</span>
            </div>
            <div className="text-[11px] uppercase tracking-wide text-primary-foreground/60">
              Laboratory Information System
            </div>
          </div>
        </div>

        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            className="h-10 w-full rounded-md bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-0 focus:ring-2 focus:ring-accent/50"
            placeholder="Search accession no., patient name, or patient ID…"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:inline-flex items-center rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
            ⌘K
          </kbd>
        </div>

        <div className="ml-auto flex items-center gap-2 text-sm">
          <button className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-primary-foreground/90 hover:bg-white/10 transition-base">
            EN <ChevronDown className="h-3.5 w-3.5" />
          </button>
          <button className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-primary-foreground/90 hover:bg-white/10 transition-base">
            <HelpCircle className="h-4 w-4" /> Help
          </button>
          <button className="relative rounded-md p-2 text-primary-foreground/90 hover:bg-white/10 transition-base">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
          </button>
          <div className="ml-1 flex items-center gap-2 rounded-full bg-white/10 pl-2 pr-1 py-1">
            <div className="text-right leading-tight">
              <div className="text-xs font-semibold">Ram Thapa</div>
              <div className="text-[10px] text-primary-foreground/70">Lab Technician</div>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-accent text-accent-foreground text-xs font-bold">
              RT
            </div>
          </div>
        </div>
      </div>

      <nav className="flex items-end gap-1 px-4 border-t border-white/10">
        {NAV.map((n) => (
          <button
            key={n}
            onClick={() => setActive(n)}
            className={cn(
              "relative px-4 py-3 text-sm font-semibold transition-base",
              active === n
                ? "text-primary-foreground"
                : "text-primary-foreground/70 hover:text-primary-foreground",
            )}
          >
            {n}
            {active === n && (
              <span className="absolute bottom-0 left-2 right-2 h-1 rounded-t-full bg-gradient-accent" />
            )}
          </button>
        ))}
      </nav>
    </header>
  );
}
