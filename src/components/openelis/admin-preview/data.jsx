export const topMenu = ["Home", "Order", "Workplan", "Results", "Validation", "Reports", "Admin"];

export const adminGroups = [
  {
    title: "OpenELIS Global 3",
    items: [
      { key: "openelis-master", label: "Legacy Admin / Master List", hint: "Original OpenELIS admin entry point" },
      { key: "barcode", label: "Barcode Configuration", hint: "Label count, elements, dimensions" },
      { key: "dictionary", label: "Dictionary", hint: "Category, dictionary entry, abbreviation, active" },
      { key: "test-management", label: "Test Management", hint: "Spelling corrections and test organization" },
      { key: "openelis-test-config", label: "OpenELIS Test Config Modules", hint: "Module map of TestAdd, SelectList, Section, Panel, UOM and assignments" },
      { key: "rename-test-name", label: "Rename Test Name", hint: "Correct existing test names safely" },
      { key: "rename-panel-name", label: "Rename Panel Name", hint: "Update panel naming conventions" },
      { key: "rename-sample-name", label: "Rename Sample Name", hint: "Correct sample type naming labels" },
      { key: "rename-method-name", label: "Rename Method Name", hint: "Fix or standardize method names" },
      { key: "catalog", label: "Test Catalog", hint: "View all tests, sections, samples and result types" },
      { key: "modify-test", label: "Test Modify Entry", hint: "OpenELIS-style filter, search and edit test details" },
      { key: "activate", label: "Activate / Deactivate Tests", hint: "Enable or disable tests while preserving history" },
      { key: "orderability", label: "Test Orderability", hint: "Control which tests can be ordered" },
      { key: "select-list", label: "Result Select List", hint: "Qualitative result option sets" },
      { key: "manage-methods", label: "Method Management", hint: "Create/activate methods used by tests" },
      { key: "manage-sample-types-openelis", label: "Sample Type Management", hint: "Create, order and assign tests to sample types" },
      { key: "openelis-sample-type-create", label: "Create Sample Type", hint: "OpenELIS create sample type flow" },
      { key: "openelis-sample-type-order", label: "Sample Type Order", hint: "OpenELIS set sample type order flow" },
      { key: "openelis-sample-type-assign", label: "Sample Type Test Assignment", hint: "OpenELIS assign tests to sample types" },
      { key: "manage-panels-openelis", label: "Panel Management", hint: "Create, order and assign tests to panels" },
      { key: "openelis-panel-create", label: "Create Panel", hint: "OpenELIS create new panel flow" },
      { key: "openelis-panel-order", label: "Panel Order", hint: "OpenELIS set panel order flow" },
      { key: "openelis-panel-assign", label: "Panel Test Assignment", hint: "OpenELIS assign tests to panels" },
      { key: "manage-uom-openelis", label: "UOM Management", hint: "Manage units of measure used in tests" },
      { key: "openelis-uom-create", label: "Create Test Unit", hint: "OpenELIS create unit of measure flow" },
      { key: "openelis-uom-order", label: "Test Unit Order", hint: "OpenELIS set unit order flow" },
      { key: "openelis-uom-assign", label: "Test Unit Assignment", hint: "OpenELIS assign tests to unit of measure" },
      { key: "manage-test-sections-openelis", label: "Test Section Management", hint: "Create, order and assign tests to sections" },
      { key: "openelis-section-create", label: "Create Test Section", hint: "OpenELIS create section flow" },
      { key: "openelis-section-order", label: "Test Section Order", hint: "OpenELIS set section order flow" },
      { key: "openelis-section-assign", label: "Test Section Assignment", hint: "OpenELIS assign tests to sections" },
      { key: "add-test", label: "Add New Test", hint: "Names, section, sample, unit, result type, ranges" },
      { key: "result-limits", label: "Result Limits", hint: "Normal, reporting, valid and critical ranges" },
      { key: "associations", label: "Sample / Panel / Test Associations", hint: "Assign panels and tests to sample types" },
      { key: "docker-edit", label: "Docker Edit", hint: "Container runtime and environment settings" },
      { key: "users", label: "Manage Users", hint: "Users and access" },
    ],
  },
  {
    title: "SENAITE Setup",
    items: [
      { key: "senaite-home", label: "SENAITE Setup Overview", hint: "Setup sequence and dashboard" },
      { key: "departments", label: "Lab Departments", hint: "Departments used by analysis services" },
      { key: "categories", label: "Analysis Categories", hint: "Group analysis services" },
      { key: "services", label: "Analysis Services", hint: "Core SENAITE test/service setup" },
      { key: "sample-types", label: "Sample Types", hint: "Sample type, retention, prefix and partitions" },
      { key: "clients", label: "Clients", hint: "Client organizations and contacts" },
      { key: "contacts", label: "Client Contacts", hint: "Contact people, email and roles" },
    ],
  },
  {
    title: "SENAITE Advanced",
    items: [
      { key: "senaite-key-features", label: "SENAITE-only Features", hint: "Validation, QC, uncertainty, specs and release controls" },
      { key: "worksheets", label: "Worksheets & Templates", hint: "Worksheet templates, duplicate/retest slots, analysts" },
      { key: "instruments", label: "Instruments", hint: "Instrument setup, interfaces and calibration" },
      { key: "calculations", label: "Calculations", hint: "Formula-based calculated analyses" },
      { key: "specifications", label: "Specifications", hint: "Client/sample/product limits and alert ranges" },
      { key: "batches", label: "Batches", hint: "Group samples/requests together" },
      { key: "storage", label: "Storage", hint: "Sample storage locations, containers and positions" },
      { key: "api", label: "JSON/API & Integrations", hint: "JSON API, ASTM/HL7, instrument middleware" },
      { key: "workflow", label: "Workflow Rules", hint: "Receive, submit, verify and publish" },
    ],
  },
  {
    title: "OpenELIS Extended Admin",
    items: [
      { key: "result-reporting-config", label: "Result Reporting Configuration", hint: "Report layout, branding, signatures and publishing controls" },
      { key: "site-branding", label: "Site Branding", hint: "Logo upload, login banner and system identity visuals" },
      { key: "common-properties", label: "Common Properties", hint: "Global property/value configuration" },
      { key: "lab-number", label: "Lab Number Management", hint: "Lab number format and sequence rules" },
      { key: "program-management", label: "Program Management", hint: "Program setup and assignment controls" },
      { key: "provider-management", label: "Provider Management", hint: "Provider records and associations" },
      { key: "organization-management", label: "Organization Management", hint: "Organization setup for facilities and ownership" },
      { key: "test-notification-config", label: "Test Notification Configuration", hint: "Notification rules by test/result events" },
      { key: "external-connections", label: "External Connections", hint: "External system endpoints and credentials" },
      { key: "search-index-management", label: "Search Index Management", hint: "Rebuild and maintain search indexes" },
      { key: "logging-management", label: "Logging Management", hint: "Log levels and operational diagnostics" },
      { key: "calendar-management", label: "Calendar Management", hint: "Calendar setup and non-working day controls" },
      { key: "localization-management", label: "Localization Management", hint: "Language and translation controls" },
      { key: "plugin-management", label: "Plugin Management", hint: "Plugin package list and activation state" },
    ],
  },
];

export const openelisTests = [
  { name: "Hemoglobin", section: "Hematology", sample: "Whole Blood", unit: "g/dL", resultType: "Numeric", active: true, orderable: true },
  { name: "VDRL", section: "Serology", sample: "Serum", unit: "-", resultType: "Select List", active: true, orderable: true },
  { name: "Urine RBC", section: "Urinalysis", sample: "Urine", unit: "/HPF", resultType: "Select List", active: true, orderable: true },
];

export const dictionaryRows = [
  { selected: true, category: "Sample Type", entry: "Whole Blood", abbreviation: "WB", active: true },
  { selected: false, category: "Test Result Type", entry: "Numeric", abbreviation: "NUM", active: true },
  { selected: false, category: "Priority", entry: "STAT", abbreviation: "STAT", active: true },
];

export const departments = [
  { title: "Hematology", manager: "Mina Gurung", services: 36, active: true },
  { title: "Chemistry", manager: "Bikash Poudel", services: 52, active: true },
  { title: "Microbiology", manager: "Ram Thapa", services: 28, active: true },
];

export const categories = [
  { title: "Blood Chemistry", department: "Chemistry", sortOrder: 1, active: true },
  { title: "Hematology", department: "Hematology", sortOrder: 2, active: true },
  { title: "Serology", department: "Serology", sortOrder: 3, active: true },
];

export const services = [
  { title: "Glucose", keyword: "GLU", category: "Blood Chemistry", department: "Chemistry", unit: "mg/dL", method: "Analyzer", price: "250", accredited: true },
  { title: "Hemoglobin", keyword: "HB", category: "Hematology", department: "Hematology", unit: "g/dL", method: "Analyzer", price: "150", accredited: true },
  { title: "VDRL", keyword: "VDRL", category: "Serology", department: "Serology", unit: "-", method: "Manual", price: "300", accredited: false },
];

export const sampleTypes = [
  { title: "Blood", prefix: "BLD", retention: "7 days", container: "EDTA Tube", partitions: "Plasma, Whole Blood", active: true },
  { title: "Serum", prefix: "SER", retention: "14 days", container: "Plain Tube", partitions: "Serum", active: true },
  { title: "Urine", prefix: "URN", retention: "3 days", container: "Urine Container", partitions: "Urine", active: true },
];

export const clients = [
  { name: "Sukraraj Hospital", code: "SKH", email: "info@hospital.local", phone: "+977-01-111111", active: true },
  { name: "Main OPD", code: "OPD", email: "opd@hospital.local", phone: "+977-01-222222", active: true },
];

export const contacts = [
  { name: "Dr. Ram Thapa", client: "Sukraraj Hospital", email: "ram@hospital.local", role: "Requester", active: true },
  { name: "Mina Gurung", client: "Main OPD", email: "mina@hospital.local", role: "Sample Contact", active: true },
];

export const worksheets = [
  { template: "Chemistry Routine", department: "Chemistry", services: "Glucose, Urea, Creatinine", analyst: "Bikash", slots: 24, qc: "2 QC + 1 Blank" },
  { template: "Hematology Daily", department: "Hematology", services: "CBC, HB, WBC", analyst: "Mina", slots: 30, qc: "1 Duplicate + 1 Retest" },
];

export const instruments = [
  { name: "Sysmex XN-550", department: "Hematology", interface: "ASTM", status: "Connected", calibrationDue: "2026-05-20" },
  { name: "Mindray BS-240", department: "Chemistry", interface: "CSV/API", status: "Connected", calibrationDue: "2026-05-14" },
];

export const calculations = [
  { title: "LDL Calculation", formula: "TC - HDL - (TG / 5)", services: "TC, HDL, TG", output: "LDL" },
  { title: "A/G Ratio", formula: "Albumin / Globulin", services: "Albumin, Globulin", output: "A/G Ratio" },
];

export const specifications = [
  { title: "Adult Chemistry Normal", sampleType: "Serum", service: "Glucose", min: "70", max: "140", alert: ">400" },
  { title: "CBC Critical", sampleType: "Blood", service: "Hemoglobin", min: "12", max: "17", alert: "<7" },
];

export const batches = [
  { id: "B-2026-001", client: "Sukraraj Hospital", samples: 12, status: "Open" },
  { id: "B-2026-002", client: "Main OPD", samples: 8, status: "Received" },
];

export const storage = [
  { location: "Cold Room 1", container: "Rack A", position: "A1-A24", temp: "2-8 deg C", samples: 24 },
  { location: "Freezer", container: "Box 2", position: "B1-B81", temp: "-20 deg C", samples: 41 },
];

export const workflowSteps = [
  { step: "Sample Intake", senaite: "Create Sample / Analysis Request", openelis: "Order Entry / Accession" },
  { step: "Receive", senaite: "Receive Sample", openelis: "Sample received / workplan queue" },
  { step: "Submit Results", senaite: "Submit Results", openelis: "Result Entry" },
  { step: "Verify", senaite: "Verify Results", openelis: "Validation" },
  { step: "Publish", senaite: "Publish Report", openelis: "Print / Reports" },
];

