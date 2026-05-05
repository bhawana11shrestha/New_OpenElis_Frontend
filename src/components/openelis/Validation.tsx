import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge, Field, GhostButton, Input, PageWrap, PrimaryButton, Select } from "./primitives";
import { CheckCircle2, ClipboardCheck, Copy, FileJson, RotateCcw, Save, Search } from "lucide-react";

type SearchType = "routine" | "order" | "range" | "testDate";

type DictionaryResult = {
  id: string;
  value: string;
};

type ValidationRow = {
  id: number;
  accessionNumber: string;
  analysisId: string;
  resultId: string;
  testId: string;
  patientName: string;
  nationalId: string;
  receivedDate: string;
  sampleType: string;
  sampleSource: string;
  testName: string;
  normalRange: string;
  result: string;
  resultType: "N" | "M" | "C" | "D";
  dictionaryResults?: DictionaryResult[];
  unitsOfMeasure: string;
  technician: string;
  normal: boolean;
  nonconforming: boolean;
  failedValidation: boolean;
  referredOut: boolean;
  amended: boolean;
  validationLevel: "Self Validation" | "Supervisor Validation";
  pastNotes: string;
  note: string;
  isAccepted: boolean;
  isRejected: boolean;
};

const TEST_SECTIONS = [
  { id: "", label: "All sections" },
  { id: "1", label: "Hematology" },
  { id: "2", label: "Biochemistry" },
  { id: "3", label: "Microbiology" },
  { id: "4", label: "Serology" },
  { id: "5", label: "Immunology" },
];

const SEARCH_MODES: { id: SearchType; label: string }[] = [
  { id: "routine", label: "Routine Queue" },
  { id: "order", label: "By Accession" },
  { id: "range", label: "Accession Range" },
  { id: "testDate", label: "By Test Date" },
];

const INITIAL_ROWS: ValidationRow[] = [
  {
    id: 0,
    accessionNumber: "13022026-001",
    analysisId: "AN-91001",
    resultId: "RS-58201",
    testId: "T-HEM-001",
    patientName: "Sita Rai",
    nationalId: "SDH21011",
    receivedDate: "2026-05-04",
    sampleType: "Whole blood",
    sampleSource: "Emergency",
    testName: "Hemoglobin (Whole blood)",
    normalRange: "12.0 - 16.0",
    result: "13.8",
    resultType: "N",
    unitsOfMeasure: "g/dL",
    technician: "admin",
    normal: true,
    nonconforming: false,
    failedValidation: false,
    referredOut: false,
    amended: false,
    validationLevel: "Self Validation",
    pastNotes: "Previous validation completed without comment.",
    note: "",
    isAccepted: false,
    isRejected: false,
  },
  {
    id: 1,
    accessionNumber: "13022026-002",
    analysisId: "AN-91002",
    resultId: "RS-58202",
    testId: "T-BIO-018",
    patientName: "Hari Sharma",
    nationalId: "SDH21082",
    receivedDate: "2026-05-04",
    sampleType: "Serum",
    sampleSource: "OPD",
    testName: "Glucose (Serum)",
    normalRange: "70 - 110",
    result: "146",
    resultType: "N",
    unitsOfMeasure: "mg/dL",
    technician: "admin",
    normal: false,
    nonconforming: false,
    failedValidation: true,
    referredOut: false,
    amended: false,
    validationLevel: "Supervisor Validation",
    pastNotes: "Delta check warning from previous visit.",
    note: "Confirm fasting status before release.",
    isAccepted: false,
    isRejected: false,
  },
  {
    id: 2,
    accessionNumber: "13022026-003",
    analysisId: "AN-91003",
    resultId: "RS-58203",
    testId: "T-MIC-011",
    patientName: "Maya Gurung",
    nationalId: "SDH21124",
    receivedDate: "2026-05-04",
    sampleType: "Blood culture",
    sampleSource: "Ward",
    testName: "Culture Result (Blood culture)",
    normalRange: "No growth",
    result: "2",
    resultType: "D",
    dictionaryResults: [
      { id: "1", value: "No growth" },
      { id: "2", value: "Growth detected" },
      { id: "3", value: "Contaminated" },
    ],
    unitsOfMeasure: "",
    technician: "supervisor",
    normal: false,
    nonconforming: true,
    failedValidation: true,
    referredOut: false,
    amended: false,
    validationLevel: "Supervisor Validation",
    pastNotes: "Specimen condition flagged at reception.",
    note: "",
    isAccepted: false,
    isRejected: false,
  },
  {
    id: 3,
    accessionNumber: "14022026-006",
    analysisId: "AN-91004",
    resultId: "RS-58204",
    testId: "T-SER-004",
    patientName: "Nima Tamang",
    nationalId: "SDH231201",
    receivedDate: "2026-05-04",
    sampleType: "Serum",
    sampleSource: "ART Clinic",
    testName: "VDRL (Serum)",
    normalRange: "Non-reactive",
    result: "1",
    resultType: "D",
    dictionaryResults: [
      { id: "1", value: "Reactive" },
      { id: "2", value: "Non-reactive" },
    ],
    unitsOfMeasure: "",
    technician: "admin",
    normal: false,
    nonconforming: false,
    failedValidation: false,
    referredOut: true,
    amended: true,
    validationLevel: "Supervisor Validation",
    pastNotes: "Referred result imported from partner lab.",
    note: "",
    isAccepted: false,
    isRejected: false,
  },
];

function displayResult(row: ValidationRow) {
  if (["M", "C", "D"].includes(row.resultType)) {
    return row.dictionaryResults?.find((item) => item.id === row.result)?.value ?? row.result;
  }
  return `${row.result}${row.unitsOfMeasure ? ` ${row.unitsOfMeasure}` : ""}`;
}

function splitTestName(testName: string) {
  const match = testName.match(/^(.*)\s\((.*)\)$/);
  return { test: match?.[1] ?? testName, sample: match?.[2] ?? "" };
}

function StatusPills({ row }: { row: ValidationRow }) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {row.normal && <Badge value="Normal" />}
      {row.failedValidation && <Badge value="Critical" />}
      {row.nonconforming && <Badge value="Nonconforming" />}
      {row.referredOut && <Badge value="Referred out" />}
      {row.amended && <Badge value="Amended" />}
    </div>
  );
}

function queueDescription(section: string) {
  if (section === "Self Validation") {
    return "Normal in-range results that can be released by the logged-in technologist, following the SENAITE self-validation pattern.";
  }
  if (section === "Supervisor Validation") {
    return "Exceptions that need senior review before release: abnormal values, nonconforming samples, amendments, or referred results.";
  }
  if (section === "Critical") return "Results with failed validation or critical flags requiring supervisor attention.";
  if (section === "Amended") return "Changed or corrected results waiting for supervisor validation.";
  if (section === "Referred Out") return "Externally referred results awaiting final validation.";
  return "All entered results waiting for validation.";
}

export function Validation({ validationSection = "Awaiting Review" }: { validationSection?: string }) {
  const [searchType, setSearchType] = useState<SearchType>("routine");
  const [unitType, setUnitType] = useState("2");
  const [accessionNumber, setAccessionNumber] = useState("13022026-001");
  const [date, setDate] = useState("2026-05-04");
  const [pageSize, setPageSize] = useState("20");
  const [rows, setRows] = useState(INITIAL_ROWS);
  const [selectedId, setSelectedId] = useState(0);

  const selectedRow = rows.find((row) => row.id === selectedId) ?? rows[0];
  const visibleRows = useMemo(() => {
    const queueRows = rows.filter((row) => {
      if (validationSection === "Self Validation") return row.validationLevel === "Self Validation";
      if (validationSection === "Supervisor Validation") return row.validationLevel === "Supervisor Validation";
      if (validationSection === "Critical") return row.failedValidation;
      if (validationSection === "Amended") return row.amended;
      if (validationSection === "Referred Out") return row.referredOut;
      return true;
    });

    if (searchType === "order") return queueRows.filter((row) => row.accessionNumber.includes(accessionNumber));
    if (searchType === "testDate") return queueRows.filter((row) => row.receivedDate === date);
    return queueRows;
  }, [accessionNumber, date, rows, searchType, validationSection]);

  const endpoint = `/rest/AccessionValidation?accessionNumber=${encodeURIComponent(
    searchType === "routine" || searchType === "testDate" ? "" : accessionNumber,
  )}&unitType=${encodeURIComponent(searchType === "routine" ? unitType : "")}&date=${encodeURIComponent(
    searchType === "testDate" ? date : "",
  )}&doRange=${searchType === "order" ? "false" : "true"}&page=1`;

  const payloadPreview = rows.map((row) => ({
    accessionNumber: row.accessionNumber,
    analysisId: row.analysisId,
    resultId: row.resultId,
    testId: row.testId,
    result: row.result,
    resultType: row.resultType,
    note: row.note,
    isAccepted: row.isAccepted,
    isRejected: row.isRejected,
    normal: row.normal,
    nonconforming: row.nonconforming,
    failedValidation: row.failedValidation,
    referredOut: row.referredOut,
    amended: row.amended,
    validationLevel: row.validationLevel,
  }));

  const updateRow = (id: number, patch: Partial<ValidationRow>) => {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  };

  const acceptNormal = () => {
    setRows((current) =>
      current.map((row) => (row.normal ? { ...row, isAccepted: true, isRejected: false } : row)),
    );
  };

  const acceptAll = () => {
    setRows((current) => current.map((row) => ({ ...row, isAccepted: true, isRejected: false })));
  };

  const retestAll = () => {
    setRows((current) => current.map((row) => ({ ...row, isAccepted: false, isRejected: true })));
  };

  return (
    <PageWrap>
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Validation</h1>
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
            {queueDescription(validationSection)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <GhostButton onClick={acceptNormal}>
            <CheckCircle2 className="h-4 w-4" /> Accept Normal
          </GhostButton>
          <GhostButton onClick={retestAll}>
            <RotateCcw className="h-4 w-4" /> Retest All
          </GhostButton>
          <PrimaryButton>
            <Save className="h-4 w-4" /> Save Validation
          </PrimaryButton>
        </div>
      </div>

      <section className="mb-5 rounded-xl border border-border bg-card shadow-elegant">
        <div className="border-b border-border bg-gradient-surface px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Find Results</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">Choose how the validation queue should load.</p>
            </div>
            <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-bold text-muted-foreground">
              /rest/AccessionValidation
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {SEARCH_MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setSearchType(mode.id)}
                className={cn(
                  "rounded-md border px-3 py-2 text-sm font-bold transition-base",
                  searchType === mode.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                {mode.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_1fr_1fr_130px_auto] md:items-end">
            <Field label="Section">
              <Select value={unitType} onChange={(event) => setUnitType(event.target.value)}>
                {TEST_SECTIONS.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.label}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Accession number">
              <Input value={accessionNumber} onChange={(event) => setAccessionNumber(event.target.value)} />
            </Field>
            <Field label="Test date">
              <Input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
            </Field>
            <Field label="Page size">
              <Select value={pageSize} onChange={(event) => setPageSize(event.target.value)}>
                {["10", "20", "30", "50", "100"].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </Select>
            </Field>
            <PrimaryButton className="h-10 px-4">
              <Search className="h-4 w-4" /> Search
            </PrimaryButton>
          </div>

          <details className="mt-4 rounded-lg border border-border bg-secondary/40 px-4 py-3">
            <summary className="cursor-pointer text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Backend fields used by this search
            </summary>
            <code className="mt-3 block overflow-x-auto whitespace-nowrap rounded-md bg-background px-3 py-2 text-xs text-foreground">
              GET {endpoint}
            </code>
            <p className="mt-2 text-xs text-muted-foreground">
              Section options come from <code>/rest/user-test-sections/VALIDATION</code>. Search fields are
              <code> accessionNumber</code>, <code>unitType</code>, <code>date</code>, and <code>doRange</code>.
            </p>
          </details>
        </div>
      </section>

      <section className="mb-5 overflow-hidden rounded-xl border border-border bg-card shadow-elegant">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-gradient-surface px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold">Validation Worklist</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {validationSection} / {visibleRows.length} result{visibleRows.length === 1 ? "" : "s"}.
              Self Validation releases routine normal results; Supervisor Validation handles exceptions.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <GhostButton onClick={acceptAll}>
              <ClipboardCheck className="h-4 w-4" /> Accept All
            </GhostButton>
            <PrimaryButton>
              <Save className="h-4 w-4" /> Save
            </PrimaryButton>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] text-sm">
            <thead className="bg-muted/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">Sample</th>
                <th className="px-5 py-3 font-semibold">Test</th>
                <th className="px-5 py-3 font-semibold">Range</th>
                <th className="px-5 py-3 font-semibold">Result</th>
                <th className="px-5 py-3 font-semibold">Level</th>
                <th className="px-5 py-3 font-semibold">Validate</th>
                <th className="px-5 py-3 font-semibold">Note</th>
                <th className="px-5 py-3 font-semibold">Past Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {visibleRows.map((row) => {
                const label = splitTestName(row.testName);
                return (
                  <tr
                    key={row.analysisId}
                    onClick={() => setSelectedId(row.id)}
                    className={cn(
                      "align-top transition-base hover:bg-secondary/40",
                      selectedId === row.id && "bg-primary/5",
                    )}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          className="mt-0.5 rounded-md border border-border bg-background p-2 text-muted-foreground"
                          title="Copy accession"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <div>
                          <div className="font-bold text-primary">{row.accessionNumber}</div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {row.patientName} / {row.nationalId}
                          </div>
                          <StatusPills row={row} />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-semibold">{label.test}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{label.sample || row.sampleType}</div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{row.normalRange}</td>
                    <td className="px-5 py-4">
                      <div className={cn("text-base font-bold", row.normal ? "text-success" : "text-warning")}>
                        {displayResult(row)}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <Badge value={row.validationLevel} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="inline-flex overflow-hidden rounded-md border border-border bg-background">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            updateRow(row.id, { isAccepted: !row.isAccepted, isRejected: false });
                          }}
                          className={cn(
                            "px-3 py-2 text-xs font-bold transition-base",
                            row.isAccepted ? "bg-success/10 text-success" : "text-muted-foreground hover:bg-secondary",
                          )}
                        >
                          Accept
                        </button>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            updateRow(row.id, { isRejected: !row.isRejected, isAccepted: false });
                          }}
                          className={cn(
                            "border-l border-border px-3 py-2 text-xs font-bold transition-base",
                            row.isRejected ? "bg-destructive/10 text-destructive" : "text-muted-foreground hover:bg-secondary",
                          )}
                        >
                          Retest
                        </button>
                      </div>
                      <div className="mt-1 text-[11px] text-muted-foreground">
                        isAccepted / isRejected
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <textarea
                        value={row.note}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => updateRow(row.id, { note: event.target.value })}
                        className="min-h-16 w-56 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-base focus:border-ring focus:ring-2 focus:ring-ring/20"
                        placeholder="Validation note"
                      />
                    </td>
                    <td className="px-5 py-4 text-xs text-muted-foreground">{row.pastNotes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border bg-gradient-surface px-5 py-4 text-sm">
          <span className="text-muted-foreground">
            Showing 1-{visibleRows.length} of {visibleRows.length}
          </span>
          <span className="text-xs text-muted-foreground">
            Save sends resultList with note, isAccepted, and isRejected to <code>/rest/AccessionValidation</code>.
          </span>
        </div>
      </section>

      <details className="rounded-xl border border-border bg-card shadow-elegant">
        <summary className="cursor-pointer border-b border-border bg-gradient-surface px-5 py-4 text-lg font-semibold">
          Backend Verification Details
        </summary>
        <div className="grid grid-cols-1 gap-5 p-5 xl:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Selected result fields
            </h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {[
                ["analysisId", selectedRow.analysisId],
                ["resultId", selectedRow.resultId],
                ["testId", selectedRow.testId],
                ["technician", selectedRow.technician],
                ["sampleSource", selectedRow.sampleSource],
                ["sampleType", selectedRow.sampleType],
                ["resultType", selectedRow.resultType],
                ["receivedDate", selectedRow.receivedDate],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-border bg-secondary/40 p-3">
                  <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</div>
                  <div className="mt-1 font-semibold text-foreground">{value}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              <FileJson className="h-4 w-4" /> Save payload preview
            </h3>
            <pre className="max-h-72 overflow-auto rounded-lg border border-border bg-secondary/40 p-4 text-xs leading-relaxed text-foreground">
              {JSON.stringify(payloadPreview, null, 2)}
            </pre>
          </div>
        </div>
      </details>
    </PageWrap>
  );
}
