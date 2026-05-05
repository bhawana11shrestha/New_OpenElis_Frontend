import { useState } from "react";
import { cn } from "@/lib/utils";
import { ActionIcon, Badge, Metric, PageWrap, PrimaryButton } from "./primitives";
import { COLLECTED, SAMPLES, TODAY, TO_COLLECT, type Sample } from "@/data/openelis";
import { Plus } from "lucide-react";

type CollectRow = (typeof TO_COLLECT)[number];
type CollectedRow = (typeof COLLECTED)[number];

function AllTable({ rows, setActive }: { rows: Sample[]; setActive: (v: string) => void }) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-muted/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
        <tr>
          <th className="px-6 py-3 font-semibold">Accession No.</th>
          <th className="px-6 py-3 font-semibold">Patient</th>
          <th className="px-6 py-3 font-semibold">Panel / Test</th>
          <th className="px-6 py-3 font-semibold">Section</th>
          <th className="px-6 py-3 font-semibold">Status</th>
          <th className="px-6 py-3 font-semibold text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {rows.map((r) => (
          <tr key={r.accession} className="h-16 transition-base hover:bg-secondary/40">
            <td className="px-6 font-semibold text-primary">
              <span className="inline-flex items-center gap-2">
                {r.accession}
                {r.urgent && <span className="h-2 w-2 rounded-full bg-destructive animate-pulse-soft" />}
              </span>
            </td>
            <td className="px-6 font-semibold">{r.patient}</td>
            <td className="px-6 text-muted-foreground">{r.panel}</td>
            <td className="px-6">{r.section}</td>
            <td className="px-6"><Badge value={r.status} /></td>
            <td className="px-6 text-right">
              <div className="flex justify-end gap-2">
                <ActionIcon type="flask" onClick={() => setActive("Results")} />
                <ActionIcon type="print" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CollectTable({ rows }: { rows: CollectRow[] }) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-muted/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
        <tr>
          <th className="px-6 py-3 font-semibold">Patient ID</th>
          <th className="px-6 py-3 font-semibold">Patient Name</th>
          <th className="px-6 py-3 font-semibold">Source</th>
          <th className="px-6 py-3 font-semibold">Ordered At</th>
          <th className="px-6 py-3 font-semibold">Total</th>
          <th className="px-6 py-3 font-semibold text-right">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {rows.map((r) => (
          <tr key={r.patientId} className="h-16 hover:bg-secondary/40 transition-base">
            <td className="px-6 font-semibold text-primary">{r.patientId}</td>
            <td className="px-6 font-semibold">{r.patient}</td>
            <td className="px-6">{r.source}</td>
            <td className="px-6">{r.ordered}</td>
            <td className="px-6 font-semibold">{r.total}</td>
            <td className="px-6 text-right">
              <button className="rounded-md border border-primary/30 bg-primary/5 px-4 py-2 text-xs font-bold text-primary transition-base hover:bg-primary hover:text-primary-foreground">
                Collect Sample
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CollectedTable({ rows, setActive }: { rows: CollectedRow[]; setActive: (v: string) => void }) {
  return (
    <table className="w-full text-sm">
      <thead className="bg-muted/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
        <tr>
          <th className="px-6 py-3 font-semibold">Accession No.</th>
          <th className="px-6 py-3 font-semibold">Patient</th>
          <th className="px-6 py-3 font-semibold">Source</th>
          <th className="px-6 py-3 font-semibold">Collected</th>
          <th className="px-6 py-3 font-semibold">Pending Tests</th>
          <th className="px-6 py-3 font-semibold">Pending Val.</th>
          <th className="px-6 py-3 font-semibold text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {rows.map((r) => (
          <tr key={r.accession} className="h-16 hover:bg-secondary/40 transition-base">
            <td className="px-6 font-semibold text-primary">{r.accession}</td>
            <td className="px-6">
              <div className="font-semibold">{r.patient}</div>
              <div className="text-xs text-muted-foreground">{r.patientId}</div>
            </td>
            <td className="px-6">{r.source}</td>
            <td className="px-6">{r.collected}</td>
            <td className="px-6 font-semibold">{r.pendingTests}</td>
            <td className="px-6 font-semibold">{r.pendingValidation}</td>
            <td className="px-6 text-right">
              <div className="flex justify-end gap-2">
                <ActionIcon type="tag" />
                <ActionIcon type="flask" onClick={() => setActive("Results")} />
                <ActionIcon type="check" onClick={() => setActive("Validation")} />
                <ActionIcon type="print" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function PaginationControls({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(total, page * pageSize);

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border bg-gradient-surface px-6 py-4 text-sm">
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground">Items per page</span>
        <select
          value={pageSize}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
          className="rounded-md border border-input bg-background px-2.5 py-1.5 outline-none transition-base focus:border-ring focus:ring-2 focus:ring-ring/20"
        >
          {[4, 6, 8, 10].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span className="text-muted-foreground">
          {start}-{end} of {total}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="rounded-md border border-border px-2.5 py-1.5 text-muted-foreground transition-base hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onPageChange(pageNumber)}
            className={cn(
              "min-w-9 rounded-md px-2.5 py-1.5 text-sm font-semibold transition-base",
              page === pageNumber
                ? "bg-primary/10 text-primary"
                : "border border-border text-muted-foreground hover:bg-secondary",
            )}
          >
            {pageNumber}
          </button>
        ))}
        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="rounded-md border border-border px-2.5 py-1.5 text-muted-foreground transition-base hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export function Dashboard({ setActive }: { setActive: (v: string) => void }) {
  const [tab, setTab] = useState<"All" | "Samples to Collect" | "Samples Collected">("All");
  const [period, setPeriod] = useState("Today");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const currentRows = tab === "All" ? SAMPLES : tab === "Samples to Collect" ? TO_COLLECT : COLLECTED;
  const totalPages = Math.max(1, Math.ceil(currentRows.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pagedRows = currentRows.slice((safePage - 1) * pageSize, safePage * pageSize);

  const changeTab = (nextTab: typeof tab) => {
    setTab(nextTab);
    setPage(1);
  };

  const changePageSize = (nextPageSize: number) => {
    setPageSize(nextPageSize);
    setPage(1);
  };

  return (
    <PageWrap>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Today's overview</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {TODAY} · Lab Technician: <span className="font-semibold text-foreground">Ram Thapa</span>
          </p>
        </div>
        <PrimaryButton onClick={() => setActive("Order Entry")}>
          <Plus className="h-4 w-4" /> New Order
        </PrimaryButton>
      </div>

      <div className="mb-6 flex rounded-xl border border-border bg-card py-4 shadow-elegant">
        <Metric value="47" label="Total Samples" />
        <Metric value="12" label="Pending Entry" tone="text-warning" />
        <Metric value="3" label="Urgent" tone="text-destructive" dot />
        <Metric value="28" label="Validated" tone="text-success" />
        <Metric value="4" label="Referred Out" />
      </div>

      <section className="rounded-xl border border-border bg-card shadow-elegant overflow-hidden">
        <div className="flex items-center justify-between border-b border-border bg-gradient-surface px-6 py-4 gap-4 flex-wrap">
          <div className="flex items-center gap-5">
            <h2 className="text-lg font-semibold">Recent samples</h2>
            <div className="flex rounded-lg bg-muted p-1">
              {(["All", "Samples to Collect", "Samples Collected"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => changeTab(t)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-semibold transition-base",
                    tab === t ? "bg-card text-primary shadow-elegant" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          {(tab === "Samples to Collect" || tab === "Samples Collected") && (
            <div className="flex rounded-full bg-muted p-1">
              {["Today", "Backlog"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold transition-base",
                    period === p ? "bg-card text-primary shadow-elegant" : "text-muted-foreground",
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
        {tab === "All" && <AllTable rows={pagedRows as Sample[]} setActive={setActive} />}
        {tab === "Samples to Collect" && <CollectTable rows={pagedRows as CollectRow[]} />}
        {tab === "Samples Collected" && <CollectedTable rows={pagedRows as CollectedRow[]} setActive={setActive} />}
        <PaginationControls
          page={safePage}
          pageSize={pageSize}
          total={currentRows.length}
          onPageChange={setPage}
          onPageSizeChange={changePageSize}
        />
      </section>
    </PageWrap>
  );
}
