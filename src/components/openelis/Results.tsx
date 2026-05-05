import { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Badge, Field, GhostButton, Info, Input, PageWrap, PrimaryButton, Select } from "./primitives";
import { Check, Copy, FileJson, RotateCcw, Save, Search } from "lucide-react";

type SearchType = "unit" | "order" | "range" | "patient" | "date";
type ResultFlag = "Normal" | "Abnormal" | "Critical" | "Pending";
type ResultType = "N" | "M" | "C" | "D";

type DictionaryResult = {
  id: string;
  value: string;
};

type ResultRow = {
  id: number;
  accessionNumber: string;
  patientId: string;
  patientName: string;
  section: string;
  sampleType: string;
  sampleStatusType: string;
  analysisStatus: "Pending" | "Draft" | "Saved" | "Complete";
  analysisId: string;
  resultId: string;
  testId: string;
  testDate: string;
  collectionDate: string;
  recievedDate: string;
  analysisMethod: string;
  testName: string;
  normalRange: string;
  lowerNormalRange?: number;
  upperNormalRange?: number;
  resultType: ResultType;
  resultValue: string;
  currentResult: string;
  unitsOfMeasure: string;
  dictionaryResults?: DictionaryResult[];
  note: string;
  pastNotes: string;
  reportable: boolean;
  acceptedAsIs: boolean;
  rejected: boolean;
  referredOut: boolean;
  analyzerResult: boolean;
  savedDraft: boolean;
};

const SEARCH_MODES: { id: SearchType; label: string }[] = [
  { id: "unit", label: "By Section" },
  { id: "order", label: "By Accession" },
  { id: "range", label: "Range" },
  { id: "patient", label: "By Patient" },
  { id: "date", label: "By Date" },
];

const TEST_SECTIONS = ["All sections", "Hematology", "Biochemistry", "Microbiology", "Serology"];
const SAMPLE_STATUS = ["All", "Collected", "Received", "Accepted", "Rejected"];
const ANALYSIS_STATUS = ["All", "Pending", "Draft", "Saved", "Complete"];

const INITIAL_RESULTS: ResultRow[] = [
  {
    id: 0,
    accessionNumber: "13022026-001",
    patientId: "SDH21011",
    patientName: "Sita Rai",
    section: "Hematology",
    sampleType: "Whole blood",
    sampleStatusType: "Accepted",
    analysisStatus: "Pending",
    analysisId: "AN-51001",
    resultId: "RS-30001",
    testId: "T-HEM-001",
    testDate: "2026-05-04",
    collectionDate: "2026-05-04",
    recievedDate: "2026-05-04",
    analysisMethod: "Manual entry",
    testName: "Hemoglobin (Whole blood)",
    normalRange: "12.0 - 16.0",
    lowerNormalRange: 12,
    upperNormalRange: 16,
    resultType: "N",
    resultValue: "13.8",
    currentResult: "",
    unitsOfMeasure: "g/dL",
    note: "",
    pastNotes: "No previous notes.",
    reportable: true,
    acceptedAsIs: false,
    rejected: false,
    referredOut: false,
    analyzerResult: false,
    savedDraft: false,
  },
  {
    id: 1,
    accessionNumber: "13022026-002",
    patientId: "SDH21082",
    patientName: "Hari Sharma",
    section: "Biochemistry",
    sampleType: "Serum",
    sampleStatusType: "Accepted",
    analysisStatus: "Draft",
    analysisId: "AN-51002",
    resultId: "RS-30002",
    testId: "T-BIO-018",
    testDate: "2026-05-04",
    collectionDate: "2026-05-04",
    recievedDate: "2026-05-04",
    analysisMethod: "Cobas c311",
    testName: "Glucose (Serum)",
    normalRange: "70 - 110",
    lowerNormalRange: 70,
    upperNormalRange: 110,
    resultType: "N",
    resultValue: "146",
    currentResult: "142",
    unitsOfMeasure: "mg/dL",
    note: "Repeat requested if non-fasting.",
    pastNotes: "Analyzer imported 142 mg/dL.",
    reportable: true,
    acceptedAsIs: false,
    rejected: false,
    referredOut: false,
    analyzerResult: true,
    savedDraft: true,
  },
  {
    id: 2,
    accessionNumber: "13022026-003",
    patientId: "SDH21124",
    patientName: "Maya Gurung",
    section: "Microbiology",
    sampleType: "Blood culture",
    sampleStatusType: "Accepted",
    analysisStatus: "Pending",
    analysisId: "AN-51003",
    resultId: "RS-30003",
    testId: "T-MIC-011",
    testDate: "2026-05-04",
    collectionDate: "2026-05-03",
    recievedDate: "2026-05-04",
    analysisMethod: "Manual entry",
    testName: "Culture Result (Blood culture)",
    normalRange: "No growth",
    resultType: "D",
    resultValue: "2",
    currentResult: "",
    unitsOfMeasure: "",
    dictionaryResults: [
      { id: "1", value: "No growth" },
      { id: "2", value: "Growth detected" },
      { id: "3", value: "Contaminated" },
    ],
    note: "",
    pastNotes: "Specimen accepted with condition note.",
    reportable: true,
    acceptedAsIs: false,
    rejected: false,
    referredOut: false,
    analyzerResult: false,
    savedDraft: false,
  },
  {
    id: 3,
    accessionNumber: "14022026-006",
    patientId: "SDH231201",
    patientName: "Nima Tamang",
    section: "Serology",
    sampleType: "Serum",
    sampleStatusType: "Received",
    analysisStatus: "Pending",
    analysisId: "AN-51004",
    resultId: "RS-30004",
    testId: "T-SER-004",
    testDate: "2026-05-04",
    collectionDate: "2026-05-04",
    recievedDate: "2026-05-04",
    analysisMethod: "Referral lab",
    testName: "VDRL (Serum)",
    normalRange: "Non-reactive",
    resultType: "D",
    resultValue: "1",
    currentResult: "",
    unitsOfMeasure: "",
    dictionaryResults: [
      { id: "1", value: "Reactive" },
      { id: "2", value: "Non-reactive" },
    ],
    note: "External result pending confirmation.",
    pastNotes: "Referred to partner lab.",
    reportable: true,
    acceptedAsIs: false,
    rejected: false,
    referredOut: true,
    analyzerResult: false,
    savedDraft: false,
  },
];

function splitTestName(testName: string) {
  const match = testName.match(/^(.*)\s\((.*)\)$/);
  return { test: match?.[1] ?? testName, sample: match?.[2] ?? "" };
}

function dictionaryValue(row: ResultRow) {
  if (!["M", "C", "D"].includes(row.resultType)) return row.resultValue;
  return row.dictionaryResults?.find((item) => item.id === row.resultValue)?.value ?? row.resultValue;
}

function flagFor(row: ResultRow): ResultFlag {
  if (!row.resultValue) return "Pending";
  if (row.resultType === "N") {
    const value = Number(row.resultValue);
    if (Number.isFinite(value) && row.lowerNormalRange !== undefined && value < row.lowerNormalRange) return "Abnormal";
    if (Number.isFinite(value) && row.upperNormalRange !== undefined && value > row.upperNormalRange) {
      return value > row.upperNormalRange * 1.25 ? "Critical" : "Abnormal";
    }
    return "Normal";
  }
  const value = dictionaryValue(row).toLowerCase();
  if (value.includes("growth") || value.includes("reactive")) return "Critical";
  if (value.includes("contaminated")) return "Abnormal";
  return "Normal";
}

function flagClass(flag: ResultFlag) {
  if (flag === "Critical") return "bg-destructive text-destructive-foreground";
  if (flag === "Abnormal") return "bg-warning text-warning-foreground";
  if (flag === "Pending") return "bg-muted text-muted-foreground";
  return "bg-success/15 text-success";
}

function resultDescription(section: string) {
  if (section === "Saved Drafts") return "Results saved as drafts and ready to continue entry.";
  if (section === "Abnormal") return "Out-of-range results that should be reviewed before saving.";
  if (section === "Critical") return "Critical or reactive values that should move quickly to validation.";
  if (section === "Referred Out") return "Referred-out results entered or imported from partner laboratories.";
  if (section === "Analyzer Results") return "Analyzer-imported values that can be accepted as-is or edited before saving.";
  if (["Hematology", "Biochemistry", "Microbiology", "Serology"].includes(section)) {
    return `${section} result entry queue.`;
  }
  return "Simple result entry queue using OpenELIS Global logbook result fields.";
}

function StatusPills({ row }: { row: ResultRow }) {
  const flag = flagFor(row);
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[11px] font-bold", flagClass(flag))}>
        {flag}
      </span>
      {row.savedDraft && <Badge value="Pending" />}
      {row.referredOut && <Badge value="Referred out" />}
      {row.analyzerResult && <Badge value="Entered" />}
    </div>
  );
}

export function ResultsEntry({ resultSection = "Pending Entry" }: { resultSection?: string }) {
  const [searchType, setSearchType] = useState<SearchType>("unit");
  const [section, setSection] = useState("Biochemistry");
  const [labNumber, setLabNumber] = useState("13022026-002");
  const [upperRangeAccessionNumber, setUpperRangeAccessionNumber] = useState("13022026-004");
  const [patientPK, setPatientPK] = useState("SDH21082");
  const [collectionDate, setCollectionDate] = useState("2026-05-04");
  const [recievedDate, setRecievedDate] = useState("2026-05-04");
  const [selectedTest, setSelectedTest] = useState("Glucose");
  const [selectedSampleStatus, setSelectedSampleStatus] = useState("All");
  const [selectedAnalysisStatus, setSelectedAnalysisStatus] = useState("All");
  const [rows, setRows] = useState(INITIAL_RESULTS);
  const [selectedId, setSelectedId] = useState(1);
  const refs = useRef<(HTMLInputElement | HTMLSelectElement | null)[]>([]);

  const filteredRows = useMemo(() => {
    const queueRows = rows.filter((row) => {
      const flag = flagFor(row);
      if (resultSection === "Saved Drafts") return row.savedDraft || row.analysisStatus === "Draft";
      if (resultSection === "Abnormal") return flag === "Abnormal";
      if (resultSection === "Critical") return flag === "Critical";
      if (resultSection === "Referred Out") return row.referredOut;
      if (resultSection === "Analyzer Results") return row.analyzerResult;
      if (["Hematology", "Biochemistry", "Microbiology", "Serology"].includes(resultSection)) {
        return row.section === resultSection;
      }
      return row.analysisStatus !== "Complete";
    });

    if (searchType === "order") return queueRows.filter((row) => row.accessionNumber.includes(labNumber));
    if (searchType === "patient") return queueRows.filter((row) => row.patientId.includes(patientPK));
    if (searchType === "date") {
      return queueRows.filter(
        (row) =>
          row.collectionDate === collectionDate ||
          row.recievedDate === recievedDate ||
          row.testName.toLowerCase().includes(selectedTest.toLowerCase()),
      );
    }
    if (searchType === "unit" && section !== "All sections") return queueRows.filter((row) => row.section === section);
    return queueRows;
  }, [collectionDate, labNumber, patientPK, recievedDate, resultSection, rows, searchType, section, selectedTest]);

  const selectedRow = rows.find((row) => row.id === selectedId) ?? filteredRows[0] ?? rows[0];
  const doRange = searchType === "range";
  const endpoint = `/rest/LogbookResults?labNumber=${encodeURIComponent(
    searchType === "order" || searchType === "range" ? labNumber.split("-")[0] : "",
  )}&upperRangeAccessionNumber=${encodeURIComponent(doRange ? upperRangeAccessionNumber : "")}&patientPK=${encodeURIComponent(
    searchType === "patient" ? patientPK : "",
  )}&testSectionId=${encodeURIComponent(searchType === "unit" ? section : "")}&collectionDate=${encodeURIComponent(
    searchType === "date" ? collectionDate : "",
  )}&recievedDate=${encodeURIComponent(searchType === "date" ? recievedDate : "")}&selectedTest=${encodeURIComponent(
    searchType === "date" ? selectedTest : "",
  )}&selectedSampleStatus=${encodeURIComponent(selectedSampleStatus === "All" ? "" : selectedSampleStatus)}&selectedAnalysisStatus=${encodeURIComponent(
    selectedAnalysisStatus === "All" ? "" : selectedAnalysisStatus,
  )}&doRange=${doRange}&finished=false`;

  const payloadPreview = rows.map((row) => ({
    accessionNumber: row.accessionNumber,
    analysisId: row.analysisId,
    resultId: row.resultId,
    testId: row.testId,
    resultValue: row.resultValue,
    resultType: row.resultType,
    note: row.note,
    reportable: row.reportable,
    acceptedAsIs: row.acceptedAsIs,
    rejected: row.rejected,
    analysisStatus: row.analysisStatus,
  }));

  const updateRow = (id: number, patch: Partial<ResultRow>) => {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  };

  const acceptAnalyzerResults = () => {
    setRows((current) =>
      current.map((row) =>
        row.analyzerResult
          ? { ...row, acceptedAsIs: true, resultValue: row.currentResult || row.resultValue, savedDraft: false }
          : row,
      ),
    );
  };

  const saveDrafts = () => {
    setRows((current) =>
      current.map((row) =>
        filteredRows.some((visible) => visible.id === row.id)
          ? { ...row, savedDraft: true, analysisStatus: "Draft" }
          : row,
      ),
    );
  };

  const saveComplete = () => {
    setRows((current) =>
      current.map((row) =>
        filteredRows.some((visible) => visible.id === row.id)
          ? { ...row, savedDraft: false, analysisStatus: "Saved" }
          : row,
      ),
    );
  };

  const nav = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "Enter" || event.key === "ArrowDown") {
      event.preventDefault();
      refs.current[Math.min(index + 1, filteredRows.length - 1)]?.focus();
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      refs.current[Math.max(index - 1, 0)]?.focus();
    }
  };

  return (
    <PageWrap>
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Result Entry</h1>
          <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{resultDescription(resultSection)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <GhostButton onClick={acceptAnalyzerResults}>
            <Check className="h-4 w-4" /> Accept Analyzer
          </GhostButton>
          <GhostButton onClick={saveDrafts}>
            <RotateCcw className="h-4 w-4" /> Save Draft
          </GhostButton>
          <PrimaryButton onClick={saveComplete}>
            <Save className="h-4 w-4" /> Save Results
          </PrimaryButton>
        </div>
      </div>

      <section className="mb-5 rounded-xl border border-border bg-card shadow-elegant">
        <div className="border-b border-border bg-gradient-surface px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Find Results</h2>
              <p className="mt-0.5 text-sm text-muted-foreground">Load a worklist by section, accession, range, patient, or date.</p>
            </div>
            <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-bold text-muted-foreground">
              /rest/LogbookResults
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-4 grid grid-cols-2 gap-2 lg:grid-cols-5">
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

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-4 xl:grid-cols-[1fr_1fr_1fr_1fr_auto] xl:items-end">
            <Field label="Section">
              <Select value={section} onChange={(event) => setSection(event.target.value)}>
                {TEST_SECTIONS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
            </Field>
            <Field label="Lab number">
              <Input value={labNumber} onChange={(event) => setLabNumber(event.target.value)} />
            </Field>
            <Field label="Patient">
              <Input value={patientPK} onChange={(event) => setPatientPK(event.target.value)} />
            </Field>
            <Field label="Test">
              <Input value={selectedTest} onChange={(event) => setSelectedTest(event.target.value)} />
            </Field>
            <PrimaryButton className="h-10 px-4">
              <Search className="h-4 w-4" /> Search
            </PrimaryButton>
            <Field label="Range end">
              <Input value={upperRangeAccessionNumber} onChange={(event) => setUpperRangeAccessionNumber(event.target.value)} />
            </Field>
            <Field label="Collection date">
              <Input type="date" value={collectionDate} onChange={(event) => setCollectionDate(event.target.value)} />
            </Field>
            <Field label="Received date">
              <Input type="date" value={recievedDate} onChange={(event) => setRecievedDate(event.target.value)} />
            </Field>
            <Field label="Sample status">
              <Select value={selectedSampleStatus} onChange={(event) => setSelectedSampleStatus(event.target.value)}>
                {SAMPLE_STATUS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
            </Field>
            <Field label="Analysis status">
              <Select value={selectedAnalysisStatus} onChange={(event) => setSelectedAnalysisStatus(event.target.value)}>
                {ANALYSIS_STATUS.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </Select>
            </Field>
          </div>

          <details className="mt-4 rounded-lg border border-border bg-secondary/40 px-4 py-3">
            <summary className="cursor-pointer text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Backend fields used by this search
            </summary>
            <code className="mt-3 block overflow-x-auto whitespace-nowrap rounded-md bg-background px-3 py-2 text-xs text-foreground">
              GET {endpoint}
            </code>
          </details>
        </div>
      </section>

      <section className="mb-5 rounded-xl border border-border bg-card shadow-elegant overflow-hidden">
        <div className="border-b border-border bg-gradient-surface px-5 py-4">
          <h2 className="text-lg font-semibold">Patient & Sample Info</h2>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 p-5 text-sm md:grid-cols-4">
          <Info label="Accession" value={selectedRow.accessionNumber} />
          <Info label="Patient ID" value={selectedRow.patientId} />
          <Info label="Name" value={selectedRow.patientName} />
          <Info label="Section" value={selectedRow.section} />
          <Info label="Sample" value={selectedRow.sampleType} />
          <Info label="Status" value={selectedRow.analysisStatus} />
          <Info label="Method" value={selectedRow.analysisMethod} />
          <Info label="Received" value={selectedRow.recievedDate} />
        </div>
      </section>

      <section className="mb-5 overflow-hidden rounded-xl border border-border bg-card shadow-elegant">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-gradient-surface px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold">Results</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {resultSection} / {filteredRows.length} result{filteredRows.length === 1 ? "" : "s"}. Use Enter or arrow keys to move through result fields.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <GhostButton onClick={saveDrafts}>Save Draft</GhostButton>
            <PrimaryButton onClick={saveComplete}>Save & Send to Validation</PrimaryButton>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1120px] text-sm">
            <thead className="bg-muted/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">Sample</th>
                <th className="px-5 py-3 font-semibold">Test</th>
                <th className="px-5 py-3 font-semibold">Range</th>
                <th className="px-5 py-3 font-semibold">Result</th>
                <th className="px-5 py-3 font-semibold">Current</th>
                <th className="px-5 py-3 font-semibold">Flag</th>
                <th className="px-5 py-3 font-semibold">Actions</th>
                <th className="px-5 py-3 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRows.map((row, index) => {
                const label = splitTestName(row.testName);
                const flag = flagFor(row);
                return (
                  <tr
                    key={row.analysisId}
                    onClick={() => setSelectedId(row.id)}
                    className={cn(
                      "align-top transition-base hover:bg-secondary/40",
                      selectedId === row.id && "bg-primary/5",
                      flag === "Critical" && "bg-destructive/5",
                      flag === "Abnormal" && "bg-warning/5",
                    )}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <button type="button" className="mt-0.5 rounded-md border border-border bg-background p-2 text-muted-foreground">
                          <Copy className="h-4 w-4" />
                        </button>
                        <div>
                          <div className="font-bold text-primary">{row.accessionNumber}</div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            {row.patientName} / {row.patientId}
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
                      {["M", "C", "D"].includes(row.resultType) ? (
                        <Select
                          ref={(element) => {
                            refs.current[index] = element;
                          }}
                          value={row.resultValue}
                          onKeyDown={(event) => nav(event, index)}
                          onChange={(event) => updateRow(row.id, { resultValue: event.target.value, savedDraft: true })}
                          className="w-48"
                        >
                          <option value=""></option>
                          {row.dictionaryResults?.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.value}
                            </option>
                          ))}
                        </Select>
                      ) : (
                        <Input
                          ref={(element) => {
                            refs.current[index] = element;
                          }}
                          type="number"
                          value={row.resultValue}
                          onKeyDown={(event) => nav(event, index)}
                          onChange={(event) => updateRow(row.id, { resultValue: event.target.value, savedDraft: true })}
                          className="w-40"
                        />
                      )}
                      <div className="mt-1 text-xs text-muted-foreground">{row.unitsOfMeasure}</div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{row.currentResult || "-"}</td>
                    <td className="px-5 py-4">
                      <span className={cn("inline-flex min-w-20 justify-center rounded-full px-2.5 py-1 text-xs font-bold", flagClass(flag))}>
                        {flag}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-semibold">
                          <input
                            type="checkbox"
                            checked={row.reportable}
                            onChange={(event) => updateRow(row.id, { reportable: event.target.checked })}
                          />
                          Reportable
                        </label>
                        <label className="flex items-center gap-2 text-xs font-semibold">
                          <input
                            type="checkbox"
                            checked={row.acceptedAsIs}
                            onChange={(event) =>
                              updateRow(row.id, {
                                acceptedAsIs: event.target.checked,
                                resultValue: event.target.checked && row.currentResult ? row.currentResult : row.resultValue,
                              })
                            }
                          />
                          Accept as-is
                        </label>
                        <label className="flex items-center gap-2 text-xs font-semibold text-destructive">
                          <input
                            type="checkbox"
                            checked={row.rejected}
                            onChange={(event) => updateRow(row.id, { rejected: event.target.checked })}
                          />
                          Reject result
                        </label>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <textarea
                        value={row.note}
                        onChange={(event) => updateRow(row.id, { note: event.target.value, savedDraft: true })}
                        className="min-h-16 w-60 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-base focus:border-ring focus:ring-2 focus:ring-ring/20"
                        placeholder="Result note"
                      />
                      <div className="mt-2 text-xs text-muted-foreground">{row.pastNotes}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
                ["resultType", selectedRow.resultType],
                ["analysisMethod", selectedRow.analysisMethod],
                ["sampleStatusType", selectedRow.sampleStatusType],
                ["analysisStatus", selectedRow.analysisStatus],
                ["reportable", String(selectedRow.reportable)],
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
              <FileJson className="h-4 w-4" /> POST /rest/LogbookResults payload preview
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
