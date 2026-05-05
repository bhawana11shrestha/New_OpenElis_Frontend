import { cn } from "@/lib/utils";
import { ICONS } from "./primitives";

function SidebarItem({
  label,
  active,
  count,
  danger,
  icon,
  onClick,
}: {
  label: string;
  active?: boolean;
  count?: number;
  danger?: boolean;
  icon?: keyof typeof ICONS;
  onClick?: () => void;
}) {
  const Icon = icon ? ICONS[icon] : null;
  return (
    <button
      onClick={onClick}
      className={cn(
        "group flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-base",
        active
          ? "bg-primary/10 text-primary font-semibold"
          : "text-foreground/75 hover:bg-secondary hover:text-foreground",
      )}
    >
      <span className="flex items-center gap-2.5">
        {Icon && (
          <Icon
            className={cn(
              "h-4 w-4 transition-base",
              active ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
            )}
          />
        )}
        {label}
      </span>
      {count !== undefined && (
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[11px] font-bold",
            danger
              ? "bg-destructive/10 text-destructive"
              : active
                ? "bg-primary/15 text-primary"
                : "bg-muted text-muted-foreground",
          )}
        >
          {count}
        </span>
      )}
    </button>
  );
}

function SidebarGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {title}
      </p>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

export function Sidebar({
  active,
  setActive,
  reportSection,
  setReportSection,
  validationSection,
  setValidationSection,
  resultSection,
  setResultSection,
}: {
  active: string;
  setActive: (v: string) => void;
  reportSection?: string;
  setReportSection?: (v: string) => void;
  validationSection?: string;
  setValidationSection?: (v: string) => void;
  resultSection?: string;
  setResultSection?: (v: string) => void;
}) {
  const wrap = "ml-5 mt-5 mb-5 w-[260px] shrink-0 self-start sticky top-[120px] rounded-xl border border-border bg-card p-3 shadow-elegant";

  if (active === "Order Entry" || active === "Edit Sample")
    return (
      <aside className={wrap}>
        <SidebarGroup title="Sample">
          <SidebarItem label="Add Sample" active={active === "Order Entry"} icon="file" onClick={() => setActive("Order Entry")} />
          <SidebarItem label="Edit Sample" active={active === "Edit Sample"} icon="file" onClick={() => setActive("Edit Sample")} />
        </SidebarGroup>
        <SidebarGroup title="Search">
          <SidebarItem label="Search by Patient" count={4} />
          <SidebarItem label="Search by Accession" />
        </SidebarGroup>
        <SidebarGroup title="Collection">
          <SidebarItem label="Pending Collection" count={5} />
          <SidebarItem label="Collected Today" count={4} />
        </SidebarGroup>
        <SidebarGroup title="Quick Actions">
          <SidebarItem label="Generate Accession" icon="file" />
          <SidebarItem label="Print Barcode" icon="tag" />
        </SidebarGroup>
      </aside>
    );

  if (active === "Patient")
    return (
      <aside className={wrap}>
        <SidebarGroup title="Patient">
          <SidebarItem label="Add / Modify Patient" active count={8} />
          <SidebarItem label="New Patient" />
          <SidebarItem label="Search Patient" />
        </SidebarGroup>
        <SidebarGroup title="Patient Search">
          <SidebarItem label="By Name" />
          <SidebarItem label="By Patient ID" />
          <SidebarItem label="Recently Updated" count={4} />
        </SidebarGroup>
        <SidebarGroup title="Quick Actions">
          <SidebarItem label="Clear Form" icon="file" />
          <SidebarItem label="Save Patient" icon="check" />
        </SidebarGroup>
      </aside>
    );

  if (active === "Results")
    return (
      <aside className={wrap}>
        <SidebarGroup title="Results">
          <SidebarItem
            label="Pending Entry"
            active={(resultSection ?? "Pending Entry") === "Pending Entry"}
            count={4}
            onClick={() => setResultSection?.("Pending Entry")}
          />
          <SidebarItem
            label="Saved Drafts"
            active={resultSection === "Saved Drafts"}
            count={2}
            onClick={() => setResultSection?.("Saved Drafts")}
          />
          <SidebarItem
            label="Abnormal"
            active={resultSection === "Abnormal"}
            count={2}
            danger
            onClick={() => setResultSection?.("Abnormal")}
          />
          <SidebarItem
            label="Critical"
            active={resultSection === "Critical"}
            count={1}
            danger
            onClick={() => setResultSection?.("Critical")}
          />
          <SidebarItem
            label="Referred Out"
            active={resultSection === "Referred Out"}
            count={1}
            onClick={() => setResultSection?.("Referred Out")}
          />
          <SidebarItem
            label="Analyzer Results"
            active={resultSection === "Analyzer Results"}
            count={2}
            onClick={() => setResultSection?.("Analyzer Results")}
          />
        </SidebarGroup>
        <SidebarGroup title="Sections">
          {["Hematology", "Biochemistry", "Microbiology", "Serology"].map((s) => (
            <SidebarItem
              key={s}
              label={s}
              icon="flask"
              active={resultSection === s}
              onClick={() => setResultSection?.(s)}
            />
          ))}
        </SidebarGroup>
      </aside>
    );

  if (active === "Validation")
    return (
      <aside className={wrap}>
        <SidebarGroup title="Validation">
          <SidebarItem
            label="Awaiting Review"
            active={(validationSection ?? "Awaiting Review") === "Awaiting Review"}
            count={4}
            onClick={() => setValidationSection?.("Awaiting Review")}
          />
          <SidebarItem
            label="Self Validation"
            active={validationSection === "Self Validation"}
            count={1}
            onClick={() => setValidationSection?.("Self Validation")}
          />
          <SidebarItem
            label="Supervisor Validation"
            active={validationSection === "Supervisor Validation"}
            count={3}
            danger
            onClick={() => setValidationSection?.("Supervisor Validation")}
          />
        </SidebarGroup>
        <SidebarGroup title="Exception Queue">
          <SidebarItem
            label="Critical"
            active={validationSection === "Critical"}
            count={2}
            danger
            onClick={() => setValidationSection?.("Critical")}
          />
          <SidebarItem
            label="Amended"
            active={validationSection === "Amended"}
            count={1}
            onClick={() => setValidationSection?.("Amended")}
          />
          <SidebarItem
            label="Referred Out"
            active={validationSection === "Referred Out"}
            count={1}
            onClick={() => setValidationSection?.("Referred Out")}
          />
        </SidebarGroup>
      </aside>
    );

  if (active === "Reports")
    return (
      <aside className={wrap}>
        <SidebarGroup title="Reports">
          {[
            "Routine",
            "Patient Status Report",
            "Aggregate Reports",
            "Activity Reports",
            "Referred Tests",
            "Non Conformity",
            "Routine CSV Report",
            "Study",
            "ARV Reports",
            "EID Reports",
            "Viral Load",
            "Export by Date",
            "Audit Trail",
          ].map((item) => (
            <SidebarItem
              key={item}
              label={item}
              active={(reportSection ?? "Patient Status Report") === item}
              onClick={() => setReportSection?.(item)}
            />
          ))}
        </SidebarGroup>
      </aside>
    );

  if (active === "Admin")
    return (
      <aside className={wrap}>
        <SidebarGroup title="Administration">
          <SidebarItem label="Test Management" active />
          <SidebarItem label="Users & Roles" />
          <SidebarItem label="Lab Sections" />
          <SidebarItem label="Barcode Settings" />
          <SidebarItem label="Report Settings" />
          <SidebarItem label="System Audit" />
        </SidebarGroup>
      </aside>
    );

  return (
    <aside className={wrap}>
      <SidebarGroup title="Worklist">
        <SidebarItem label="My queue" active count={12} />
        <SidebarItem label="All pending" />
        <SidebarItem label="Urgent" count={3} danger />
      </SidebarGroup>
      <SidebarGroup title="Lab Sections">
        {["Hematology", "Biochemistry", "Microbiology", "Serology"].map((s) => (
          <SidebarItem key={s} label={s} icon="flask" />
        ))}
      </SidebarGroup>
      <SidebarGroup title="Quick Links">
        <SidebarItem label="Print labels" icon="tag" />
        <SidebarItem label="Batch validate" icon="check" />
      </SidebarGroup>
    </aside>
  );
}
