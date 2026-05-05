export const TODAY = "Monday, 04 May 2026";
export const RESULT_OPTIONS = ["Nil", "Trace", "1+", "2+", "3+", "Packed"];
export const DEPARTMENT_TABS = [
  "All",
  "Biochemistry",
  "Hematology",
  "Serology-Immunology",
  "Immunology",
  "Molecular Biology",
  "Cytology",
  "Virology",
  "Serology",
  "Pathology",
];
export const VALIDATION_MODES = ["All", "Self Validation", "Supervisor Validation"];

export type Sample = {
  priority: "ROUTINE" | "STAT" | "URGENT";
  orderDate: string;
  accession: string;
  patientId: string;
  patient: string;
  panel: string;
  section: string;
  department: string;
  status: "Pending" | "Urgent" | "Entered" | "Validated";
  reviewType: "straight" | "exception";
  issue: "Normal" | "Critical" | "QC impacted" | "Amended" | "Referred out";
  urgent: boolean;
};

export const SAMPLES: Sample[] = [
  { priority: "ROUTINE", orderDate: "09/10/2025", accession: "25-000-03L", patientId: "filipino", patient: "Sita Rai", panel: "CD4 Absolute count (mm3)", section: "Immunology", department: "Immunology", status: "Pending", reviewType: "straight", issue: "Normal", urgent: false },
  { priority: "STAT", orderDate: "29/11/2025", accession: "25-RSH-000-05C", patientId: "54789796575687", patient: "Maya Gurung", panel: "CD4 Absolute count (mm3)", section: "Immunology", department: "Immunology", status: "Urgent", reviewType: "exception", issue: "Critical", urgent: false },
  { priority: "ROUTINE", orderDate: "13/02/2026", accession: "13022026-001", patientId: "SDH21011", patient: "Sita Rai", panel: "CBC, ESR", section: "Hematology", department: "Hematology", status: "Pending", reviewType: "straight", issue: "Normal", urgent: false },
  { priority: "ROUTINE", orderDate: "13/02/2026", accession: "13022026-002", patientId: "SDH21082", patient: "Hari Sharma", panel: "LFT, RFT", section: "Biochemistry", department: "Biochemistry", status: "Entered", reviewType: "straight", issue: "Normal", urgent: false },
  { priority: "URGENT", orderDate: "13/02/2026", accession: "13022026-003", patientId: "SDH21124", patient: "Maya Gurung", panel: "Blood Culture", section: "Microbiology", department: "Microbiology", status: "Urgent", reviewType: "exception", issue: "QC impacted", urgent: true },
  { priority: "ROUTINE", orderDate: "13/02/2026", accession: "13022026-004", patientId: "SDH21303", patient: "Bikash Poudel", panel: "HbA1c, FBS", section: "Biochemistry", department: "Biochemistry", status: "Validated", reviewType: "straight", issue: "Normal", urgent: false },
  { priority: "STAT", orderDate: "31/12/2025", accession: "31122025-093", patientId: "SDH231151", patient: "Mamata Oli", panel: "Urine RE/ME", section: "Biochemistry", department: "Biochemistry", status: "Pending", reviewType: "exception", issue: "Amended", urgent: false },
  { priority: "ROUTINE", orderDate: "14/02/2026", accession: "14022026-006", patientId: "SDH231201", patient: "Nima Tamang", panel: "VDRL", section: "Serology", department: "Serology", status: "Pending", reviewType: "exception", issue: "Referred out", urgent: false },
];

export const TO_COLLECT = [
  { patientId: "SDH200722", patient: "Tt Dummmm", source: "Registration", ordered: "12:50 pm", total: 1 },
  { patientId: "SDH200726", patient: "Emergency Rabin", source: "Registration", ordered: "2:51 pm", total: 1 },
  { patientId: "SDH200725", patient: "Test Rabin", source: "Registration", ordered: "2:53 pm", total: 13 },
  { patientId: "SDH200721", patient: "Ye Sa", source: "Registration", ordered: "12:09 pm", total: 1 },
];

export const COLLECTED = [
  { accession: "29042026-002", patientId: "SDH200719", patient: "Ram Hari", source: "Registration", collected: "4:44 pm", pendingTests: 13, pendingValidation: 0 },
  { accession: "29042026-001", patientId: "APH203033", patient: "Santa Gurung", source: "Registration", collected: "4:41 pm", pendingTests: 17, pendingValidation: 0 },
  { accession: "27042026-001", patientId: "SDH200717", patient: "Dummmm Test", source: "Registration", collected: "1:28 pm", pendingTests: 3, pendingValidation: 0 },
  { accession: "27022026-003", patientId: "SDH192150", patient: "Dummy Test", source: "Registration", collected: "10:37 am", pendingTests: 0, pendingValidation: 5 },
];

export const RESULT_SEED = [
  { id: "alb", test: "Albumin", result: "1+", unit: "-", ref: "Nil" },
  { id: "rbc", test: "RBC", result: "Packed", unit: "/HPF", ref: "0-2" },
  { id: "sugar", test: "Sugar", result: "Nil", unit: "-", ref: "Nil" },
];

export function calculateFlag(test: string, result: string, ref: string) {
  if (!result) return "Pending";
  if (test === "RBC" && result === "Packed") return "Critical";
  if (result === "Nil" && ref === "Nil") return "Normal";
  if (["Trace", "1+", "2+", "3+", "Packed"].includes(result)) return "Abnormal";
  return "Normal";
}

export function flagShort(flag: string) {
  return flag === "Critical" ? "C" : flag === "Abnormal" ? "H" : flag === "Pending" ? "P" : "—";
}
