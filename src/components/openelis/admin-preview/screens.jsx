import React, { useMemo, useState } from "react";
import { ArrowRight, Barcode, BookOpen, Check, ClipboardList, Edit3, FlaskConical, Grid2X2, Link2, Plus, Save, Search, Settings, ShieldCheck, TestTube2, Users, X } from "lucide-react";
import {
  batches, calculations, categories, clients, contacts, departments, dictionaryRows,
  instruments, openelisTests, sampleTypes, services, specifications, storage,
  workflowSteps, worksheets
} from "./data.jsx";

export function cls(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Button({ children, tone = "default", className = "", ...props }) {
  const style = tone === "primary" ? "bg-gradient-primary text-primary-foreground border-primary" : tone === "danger" ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-background text-foreground border-border";
  return <button {...props} className={cls("inline-flex h-10 cursor-pointer items-center gap-2 rounded-md border px-4 text-sm font-bold transition-base hover:shadow-elegant", style, className)}>{children}</button>;
}

export function Badge({ children, tone = "green" }) {
  const style = tone === "green" ? "bg-success/10 text-success border-success/20" : tone === "amber" ? "bg-warning/15 text-warning-foreground border-warning/30" : tone === "red" ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-muted text-muted-foreground border-border";
  return <span className={cls("inline-flex rounded-full border px-3 py-1 text-xs font-bold", style)}>{children}</span>;
}

export function Header({ title, subtitle, children }) {
  return (
    <div className="mb-5 rounded-xl border border-border bg-card p-5 shadow-elegant">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Combined OpenELIS + SENAITE Admin</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return <section className={cls("rounded-xl border border-border bg-card p-5 shadow-elegant", className)}>{children}</section>;
}

function Field({ label, children, required }) {
  return <label className="block"><span className="mb-2 block text-sm font-semibold">{label}{required && <b className="text-red-500"> *</b>}</span>{children}</label>;
}
function Input(props) {
  return <input {...props} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-base focus:border-ring focus:ring-2 focus:ring-ring/20" />;
}
function Select({ children, ...props }) {
  return <select {...props} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-base focus:border-ring focus:ring-2 focus:ring-ring/20">{children}</select>;
}

function DataTable({ columns, rows, onEdit }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-elegant">
      <table className="w-full text-sm">
        <thead className="bg-gradient-surface text-left text-xs uppercase tracking-widest text-muted-foreground">
          <tr>{columns.map(c => <th key={c} className="px-5 py-4">{c}</th>)}<th className="px-5 py-4 text-right">Actions</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, i) => <tr key={i} className="transition-base hover:bg-secondary">{row.map((cell, j) => <td key={j} className="px-5 py-4">{cell}</td>)}<td className="px-5 py-4 text-right"><div className="flex justify-end gap-2"><Button onClick={() => onEdit?.(i)}><Edit3 className="h-4 w-4" />Edit</Button><Button tone="danger"><X className="h-4 w-4" />Deactivate</Button></div></td></tr>)}
        </tbody>
      </table>
    </div>
  );
}

function Drawer({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/30">
      <div className="ml-auto h-full w-[560px] overflow-y-auto bg-card p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Button onClick={onClose}><X className="h-4 w-4" />Close</Button>
        </div>
        {children}
        <div className="mt-6 flex justify-end gap-2 border-t pt-4">
          <Button onClick={onClose}>Cancel</Button>
          <Button tone="primary"><Save className="h-4 w-4" />Save</Button>
        </div>
      </div>
    </div>
  );
}

export function CombinedHome({ setScreen }) {
  const cards = [
    ["OpenELIS Master List", "openelis-master", "Dictionary, barcode, test management, limits and associations"],
    ["SENAITE Setup", "senaite-home", "Departments, categories, services, sample types, clients"],
    ["Worksheets", "worksheets", "Worksheet templates, slots, analysts and QC"],
    ["Instruments", "instruments", "ASTM/API instruments and calibration"],
    ["Specifications", "specifications", "Client/sample/service limits and alerts"],
    ["Workflow Mapping", "workflow", "OpenELIS + SENAITE flow side-by-side"],
  ];
  return <><Header title="Unified Admin Console" subtitle="OpenELIS admin structure combined with SENAITE LIMS setup and advanced features." /><div className="grid grid-cols-3 gap-4">{cards.map(([title,key,desc]) => <button key={key} onClick={()=>setScreen(key)} className="rounded-xl border bg-white p-5 text-left shadow-sm hover:border-primary"><h3 className="font-bold text-primary">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p></button>)}</div></>;
}

export function OpenELISMaster({ setScreen }) {
  const tools = [
    ["Barcode Configuration","barcode"],["Dictionary","dictionary"],["Test Management","test-management"],["OpenELIS Test Config Modules","openelis-test-config"],["Test Catalog","catalog"],["Modify Existing Test","modify-test"],["Activate / Deactivate Tests","activate"],["Enable / Disable Test Orderability","orderability"],["Add Result Select List","select-list"],["Add New Test","add-test"],["Result Limits","result-limits"],["Sample / Panel / Test Associations","associations"],["Manage Methods","manage-methods"],["Manage Sample Types","manage-sample-types-openelis"],["Manage Panels","manage-panels-openelis"],["Manage UOM","manage-uom-openelis"],["Manage Test Sections","manage-test-sections-openelis"],["Docker Edit","docker-edit"],["Manage Users","users"]
  ];
  return <><Header title="OpenELIS Global 3 Admin" subtitle="Keeps OpenELIS style: master-list entry, specific forms, add/edit/modify actions." /><div className="grid grid-cols-2 gap-4">{tools.map(([t,k])=><button key={k} onClick={()=>setScreen(k)} className="rounded-lg border bg-white p-4 text-left hover:bg-secondary"><b className="text-primary">{t}</b><p className="mt-1 text-sm text-slate-600">Open {t} module</p></button>)}</div></>;
}

export function BarcodeConfig() {
  return <><Header title="Barcode Configuration" subtitle="OpenELIS-specific barcode form: label count, elements and dimensions."><Button tone="primary"><Save className="h-4 w-4" />Save</Button></Header><div className="grid grid-cols-2 gap-5"><Card><h2 className="font-bold">Number Barcode Label</h2><div className="mt-4 grid grid-cols-2 gap-4"><Field label="Order labels"><Input defaultValue="1" /></Field><Field label="Specimen labels"><Input defaultValue="2" /></Field></div></Card><Card><h2 className="font-bold">Barcode Label Elements</h2><div className="mt-4 grid grid-cols-2 gap-2">{["Patient Name","Patient ID","Accession No.","Sample Type","Collection Date","Preprinted Barcode"].map((x,i)=><label key={x} className="rounded border p-3 text-sm"><input type="checkbox" defaultChecked={i<4} /> {x}</label>)}</div></Card></div><Card className="mt-5"><h2 className="font-bold">Dimensions Barcode Label</h2><div className="mt-4 grid grid-cols-4 gap-4"><Field label="Width"><Input defaultValue="50 mm"/></Field><Field label="Height"><Input defaultValue="25 mm"/></Field><Field label="Left Margin"><Input defaultValue="2 mm"/></Field><Field label="Top Margin"><Input defaultValue="2 mm"/></Field></div></Card></>;
}

export function DictionaryScreen() {
  const [edit,setEdit]=useState(false);
  return <><Header title="Dictionary" subtitle="OpenELIS-style select/modify/previous/next dictionary screen."><Button onClick={()=>setEdit(true)}><Edit3 className="h-4 w-4"/>Modify</Button></Header><Card><div className="mb-4 flex gap-2"><Input placeholder="Search by dictionary entry"/><Button><Search className="h-4 w-4"/>Search</Button><Button>Previous</Button><Button>Next</Button></div><DataTable columns={["Select","Category","Dictionary Entry","Abbreviation","Active"]} rows={dictionaryRows.map(r=>[<input type="checkbox" defaultChecked={r.selected}/>,r.category,<b>{r.entry}</b>,r.abbreviation,<Badge>{r.active?"Active":"Inactive"}</Badge>])} /></Card>{edit&&<Drawer title="Modify Dictionary Entry" onClose={()=>setEdit(false)}><div className="grid grid-cols-2 gap-4"><Field label="Category"><Select><option>Sample Type</option><option>Priority</option></Select></Field><Field label="Dictionary Entry" required><Input defaultValue="Whole Blood"/></Field><Field label="Local Abbreviation"><Input defaultValue="WB"/></Field><Field label="Is Active"><Select><option>Active</option><option>Inactive</option></Select></Field></div></Drawer>}</>;
}

export function TestManagement({ setScreen }) {
  return <><Header title="Test Management" subtitle="OpenELIS test management uses spelling corrections and test organization."><Button tone="primary" onClick={()=>setScreen("add-test")}><Plus className="h-4 w-4"/>Add New Test</Button></Header><div className="grid grid-cols-2 gap-5"><Card><h2 className="mb-3 font-bold">Spelling Corrections</h2>{[["Rename Existing Test Name","rename-test-name"],["Rename Existing Panel Name","rename-panel-name"],["Rename Existing Sample Name","rename-sample-name"],["Rename Existing Method Name","rename-method-name"]].map(([x,k])=><button key={k} onClick={()=>setScreen(k)} className="mb-2 flex w-full cursor-pointer justify-between rounded border p-3 text-left hover:bg-slate-50"><span>{x}</span><ArrowRight className="h-4 w-4"/></button>)}</Card><Card><h2 className="mb-3 font-bold">Test Organization</h2>{[["View Test Catalog","catalog"],["Modify Existing Test","modify-test"],["Activate / Deactivate Tests","activate"],["Enable / Disable Test Orderability","orderability"],["Add Result Select List","select-list"],["Manage Methods","manage-methods"],["Manage Sample Types","manage-sample-types-openelis"],["Manage Panels","manage-panels-openelis"],["Manage UOM","manage-uom-openelis"],["Manage Test Sections","manage-test-sections-openelis"]].map(([x,k])=><button key={k} onClick={()=>setScreen(k)} className="mb-2 flex w-full cursor-pointer justify-between rounded border p-3 text-left hover:bg-slate-50"><span>{x}</span><ArrowRight className="h-4 w-4"/></button>)}</Card></div></>;
}

export function OpenELISTestConfigModules({ setScreen }) {
  const modules = [
    ["Test Add","add-test","Create tests with names, section, sample, result type and ranges"],
    ["Test Modify Entry","modify-test","Filter catalog and modify an existing test"],
    ["Result Select List","select-list","Create qualitative option lists"],
    ["Test Orderability","orderability","Enable or disable ordering by test"],
    ["Test Activation","activate","Activate/deactivate tests"],
    ["Method Management","manage-methods","Create, activate and rename methods"],
    ["Sample Type Management","manage-sample-types-openelis","Create, order and assign tests to sample types"],
    ["Panel Management","manage-panels-openelis","Create, order and assign tests to panels"],
    ["UOM Management","manage-uom-openelis","Maintain units used in tests"],
    ["Test Section Management","manage-test-sections-openelis","Create and order test sections"],
  ];
  return <><Header title="OpenELIS Test Config Modules" subtitle="Aligned with OpenELIS Global 2 Admin testManagementConfigMenu structure." /><div className="grid grid-cols-2 gap-4">{modules.map(([title,key,desc]) => <button key={key} onClick={()=>setScreen(key)} className="rounded-xl border bg-white p-5 text-left shadow-sm hover:border-primary"><h3 className="font-bold text-primary">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p></button>)}</div></>;
}

export function ManageMethods() {
  const rows = [{name:"Analyzer",type:"Instrument",active:true},{name:"Manual Microscopy",type:"Manual",active:true},{name:"ELISA",type:"Serology",active:true}];
  return <><Header title="Manage Methods" subtitle="OpenELIS method flow: create method, activate/deactivate, rename entry." />
    <div className="grid grid-cols-3 gap-4">
      <button className="rounded-lg border bg-white p-4 text-left hover:bg-secondary"><b>Create New Method</b><p className="mt-1 text-sm text-slate-600">English/French method names</p></button>
      <button className="rounded-lg border bg-white p-4 text-left hover:bg-secondary"><b>Set Method Activation</b><p className="mt-1 text-sm text-slate-600">Enable/disable methods</p></button>
      <button className="rounded-lg border bg-white p-4 text-left hover:bg-secondary"><b>Rename Existing Method</b><p className="mt-1 text-sm text-slate-600">Correction flow with Next/Accept</p></button>
    </div>
    <Card className="mt-5"><h2 className="mb-3 font-bold">Method List</h2><DataTable columns={["Method","Type","Status"]} rows={rows.map(r=>[r.name,r.type,<Badge>{r.active?"Active":"Inactive"}</Badge>])} /></Card>
  </>;
}

export function ManageSampleTypesOpenelis({ setScreen }) {
  return <><Header title="Manage Sample Types" subtitle="OpenELIS flow: create new sample type, set sample type order, test assignment." />
    <div className="grid grid-cols-3 gap-4">
      <button onClick={()=>setScreen("openelis-sample-type-create")} className="rounded-lg border bg-white p-4 text-left hover:bg-secondary"><b>Create New Sample Type</b><p className="mt-1 text-sm text-slate-600">English/French names, Next/Accept</p></button>
      <button onClick={()=>setScreen("openelis-sample-type-order")} className="rounded-lg border bg-white p-4 text-left hover:bg-secondary"><b>Set Sample Type Order</b><p className="mt-1 text-sm text-slate-600">Reorder display sequence</p></button>
      <button onClick={()=>setScreen("openelis-sample-type-assign")} className="rounded-lg border bg-white p-4 text-left hover:bg-secondary"><b>Test Assignment</b><p className="mt-1 text-sm text-slate-600">Assign tests to sample types</p></button>
    </div>
  </>;
}

export function ManagePanelsOpenelis({ setScreen }) {
  return <><Header title="Manage Panels" subtitle="OpenELIS flow: create new panel, set panel order, test assignment." />
    <div className="grid grid-cols-3 gap-4">
      <button onClick={()=>setScreen("openelis-panel-create")} className="rounded-lg border bg-white p-4 text-left hover:bg-secondary"><b>Create New Panel</b><p className="mt-1 text-sm text-slate-600">Names + sample type</p></button>
      <button onClick={()=>setScreen("openelis-panel-order")} className="rounded-lg border bg-white p-4 text-left hover:bg-secondary"><b>Set Panel Order</b><p className="mt-1 text-sm text-slate-600">Drag/reorder style mock</p></button>
      <button onClick={()=>setScreen("openelis-panel-assign")} className="rounded-lg border bg-white p-4 text-left hover:bg-secondary"><b>Test Assignment</b><p className="mt-1 text-sm text-slate-600">Assign tests to panel</p></button>
    </div>
  </>;
}

export function ManageUOMOpenelis({ setScreen }) {
  return <><Header title="Manage Unit Of Measure" subtitle="OpenELIS flow: create new test unit, set test unit order, test assignment." />
    <div className="grid grid-cols-3 gap-4">
      <button onClick={()=>setScreen("openelis-uom-create")} className="rounded-lg border bg-white p-4 text-left hover:bg-secondary"><b>Create New Test Unit</b><p className="mt-1 text-sm text-slate-600">Add UOM entry</p></button>
      <button onClick={()=>setScreen("openelis-uom-order")} className="rounded-lg border bg-white p-4 text-left hover:bg-secondary"><b>Set Test Unit Order</b><p className="mt-1 text-sm text-slate-600">Reorder unit display</p></button>
      <button onClick={()=>setScreen("openelis-uom-assign")} className="rounded-lg border bg-white p-4 text-left hover:bg-secondary"><b>Test Assignment</b><p className="mt-1 text-sm text-slate-600">Reassign tests to unit</p></button>
    </div>
  </>;
}

export function ManageTestSectionsOpenelis({ setScreen }) {
  return <><Header title="Manage Test Sections" subtitle="OpenELIS flow: create test section, set section order, test assignment." />
    <div className="grid grid-cols-3 gap-4">
      <button onClick={()=>setScreen("openelis-section-create")} className="rounded-lg border bg-white p-4 text-left hover:bg-secondary"><b>Create New Test Section</b><p className="mt-1 text-sm text-slate-600">English/French names</p></button>
      <button onClick={()=>setScreen("openelis-section-order")} className="rounded-lg border bg-white p-4 text-left hover:bg-secondary"><b>Set Test Section Order</b><p className="mt-1 text-sm text-slate-600">Adjust section sequence</p></button>
      <button onClick={()=>setScreen("openelis-section-assign")} className="rounded-lg border bg-white p-4 text-left hover:bg-secondary"><b>Test Assignment</b><p className="mt-1 text-sm text-slate-600">Assign tests to section</p></button>
    </div>
  </>;
}

export function OpenelisCreateForm({ title, entityLabel, includeSampleType=false }) {
  return <><Header title={title} subtitle="OpenELIS create flow with Next/Accept behavior." /><Card><div className="grid grid-cols-2 gap-4">
    <Field label={`${entityLabel} Name (English)`} required><Input defaultValue="" /></Field>
    <Field label={`${entityLabel} Name (French)`} required><Input defaultValue="" /></Field>
    {includeSampleType && <Field label="Sample Type" required><Select><option>Whole Blood</option><option>Serum</option><option>Urine</option></Select></Field>}
    <Field label="Status"><Select><option>Inactive</option><option>Active</option></Select></Field>
  </div><div className="mt-5 flex justify-end gap-2"><Button>Next</Button><Button tone="primary">Accept</Button></div></Card></>;
}

export function OpenelisOrderScreen({ title, itemLabel }) {
  return <><Header title={title} subtitle="OpenELIS ordering flow for display sequence." /><Card><div className="space-y-2">{["1","2","3","4"].map((n,i)=><div key={n} className="rounded border p-3">{n}. {itemLabel} {i+1}  [drag]</div>)}</div><div className="mt-5 flex justify-end gap-2"><Button>Next</Button><Button tone="primary">Accept</Button></div></Card></>;
}

export function OpenelisAssignmentScreen({ title, leftLabel, rightLabel }) {
  return <><Header title={title} subtitle="OpenELIS assignment flow with selection and target mapping." /><Card><div className="grid grid-cols-2 gap-4">
    <Field label={leftLabel} required><Select><option>Hemoglobin</option><option>Glucose</option><option>VDRL</option></Select></Field>
    <Field label={rightLabel} required><Select><option>Whole Blood</option><option>Serum</option><option>Panel A</option></Select></Field>
  </div><div className="mt-5 flex justify-end gap-2"><Button>Next</Button><Button tone="primary">Accept</Button></div></Card></>;
}

export function RenameEntity({ title, entityLabel }) {
  const [confirm, setConfirm] = useState(false);
  return <><Header title={title} subtitle="OpenELIS rename flow (Save -> Accept confirmation)." /><Card><div className="grid grid-cols-2 gap-4"><Field label={`Select ${entityLabel}`} required><Select><option>{entityLabel} A</option><option>{entityLabel} B</option></Select></Field><Field label="Search"><Input placeholder={`Search ${entityLabel.toLowerCase()}`} /></Field><Field label="Current English"><Input defaultValue={`${entityLabel} Current EN`} /></Field><Field label="Current French"><Input defaultValue={`${entityLabel} Current FR`} /></Field><Field label="New English" required><Input placeholder={`${entityLabel} New EN`} /></Field><Field label="New French"><Input placeholder={`${entityLabel} New FR`} /></Field></div>{confirm && <div className="mt-4 rounded bg-amber-50 p-3 text-sm text-amber-800">Confirmation required. Click Accept to finalize rename.</div>}<div className="mt-5 flex justify-end gap-2"><Button onClick={()=>setConfirm(false)}>Cancel</Button><Button onClick={()=>setConfirm(true)}>Save</Button><Button tone="primary">Accept</Button></div></Card></>;
}

export function TestCatalog() {
  return <><Header title="Test Catalog" subtitle="OpenELIS Global 3 view of all configured tests and panels."><Button><Search className="h-4 w-4"/>Filter</Button></Header><DataTable columns={["Test Name","Section","Sample","Result Type","Active","Orderable"]} rows={openelisTests.map(t=>[<b>{t.name}</b>,t.section,t.sample,t.resultType,<Badge tone={t.active?"green":"red"}>{t.active?"Active":"Inactive"}</Badge>,<Badge tone={t.orderable?"green":"amber"}>{t.orderable?"Orderable":"Blocked"}</Badge>])} /></>;
}

export function TestActivation() {
  return <><Header title="Activate / Deactivate Tests" subtitle="Toggle availability of tests without deleting historical results."><Button tone="primary"><Save className="h-4 w-4"/>Save Changes</Button></Header><Card><div className="space-y-3">{openelisTests.map(t=><label key={t.name} className="flex items-center justify-between rounded-lg border p-4"><div><p className="font-bold">{t.name}</p><p className="text-sm text-slate-600">{t.section} · {t.sample}</p></div><span className="text-sm"><input type="checkbox" defaultChecked={t.active} /> Active</span></label>)}</div></Card></>;
}

export function TestOrderability() {
  return <><Header title="Enable / Disable Test Orderability" subtitle="Control which tests can be ordered by clinical users."><Button tone="primary"><Save className="h-4 w-4"/>Apply Order Rules</Button></Header><Card><div className="space-y-3">{openelisTests.map(t=><label key={t.name} className="flex items-center justify-between rounded-lg border p-4"><div><p className="font-bold">{t.name}</p><p className="text-sm text-slate-600">Section: {t.section}</p></div><span className="text-sm"><input type="checkbox" defaultChecked={t.orderable} /> Orderable</span></label>)}</div></Card></>;
}

export function ResultSelectList() {
  return <><Header title="Result Select List" subtitle="Define selectable options for qualitative tests (OpenELIS list values)."><Button tone="primary"><Plus className="h-4 w-4"/>Add Option Set</Button></Header><DataTable columns={["Test","Option Set","Values","Status"]} rows={[["VDRL","VDRL_QUAL","Reactive, Non-reactive, Indeterminate",<Badge>Active</Badge>],["Urine RBC","UR_RBC_SEMI","Nil, Few, Moderate, Many",<Badge>Active</Badge>],["HIV Rapid","HIV_RDT","Positive, Negative, Invalid",<Badge tone="amber">Draft</Badge>]]} /></>;
}

export function DockerEdit() {
  return <><Header title="Docker Edit" subtitle="OpenELIS Global 3 backend container settings for admin preview."><Button tone="primary"><Save className="h-4 w-4"/>Save Docker Config</Button></Header><Card><div className="grid grid-cols-2 gap-4"><Field label="Environment"><Select><option>Development</option><option>Staging</option><option>Production</option></Select></Field><Field label="Image Tag"><Input defaultValue="openelisglobal/openelis-global-3:latest" /></Field><Field label="Application Port"><Input defaultValue="8080" /></Field><Field label="Database Host"><Input defaultValue="postgres" /></Field><Field label="Database Port"><Input defaultValue="5432" /></Field><Field label="Compose Profile"><Select><option>openelis-core</option><option>openelis-with-instruments</option></Select></Field><Field label="Restart Policy"><Select><option>unless-stopped</option><option>always</option><option>no</option></Select></Field><Field label="Container Healthcheck"><Select><option>Enabled</option><option>Disabled</option></Select></Field></div></Card><Card className="mt-5"><h2 className="font-bold">Runtime Variables</h2><div className="mt-4 grid grid-cols-2 gap-4"><Field label="JAVA_OPTS"><Input defaultValue="-Xms512m -Xmx2048m" /></Field><Field label="TZ"><Input defaultValue="UTC" /></Field><Field label="LIS_MODE"><Select><option>OpenELIS</option><option>Combined OpenELIS+SENAITE</option></Select></Field><Field label="Instrument Integration"><Select><option>ASTM Enabled</option><option>ASTM Disabled</option></Select></Field></div></Card></>;
}

export function AddTest() {
  const [step,setStep]=useState(1);
  const [showGuide, setShowGuide] = useState(false);
  return <><Header title="Add New Test" subtitle="OpenELIS TestAdd pattern with guide and add flow."><Button onClick={()=>setShowGuide(!showGuide)}>{showGuide ? "Hide Guide" : "Show Guide"}</Button><Button tone="primary"><Save className="h-4 w-4"/>Save</Button></Header>{showGuide && <Card className="mb-4"><h2 className="mb-3 font-bold">Field Guide</h2><ul className="list-disc pl-5 text-sm text-slate-700"><li>Name</li><li>Report Name</li><li>Test Section</li><li>Panel</li><li>UOM</li><li>Result Type: Numeric, Alphanumeric, Text Area, Select List, Multi Select List, Cascading Multi Select List</li><li>Active</li><li>Orderable</li></ul></Card>}<div className="mb-4 flex gap-2">{["Names","Classification","Result Type","State","Confirm"].map((s,i)=><button key={s} onClick={()=>setStep(i+1)} className={cls("rounded-full px-4 py-2 text-sm font-bold",step===i+1?"bg-primary text-white":"bg-slate-200")}>{i+1}. {s}</button>)}</div><Card>{step===1&&<div className="grid grid-cols-2 gap-4"><Field label="Name (English)" required><Input defaultValue="Hemoglobin"/></Field><Field label="Name (French)"><Input defaultValue="Hemoglobine"/></Field><Field label="Report Name (English)"><Input defaultValue="Hemoglobin"/></Field><Field label="Report Name (French)"><Input defaultValue="Hemoglobine"/></Field></div>}{step===2&&<div className="grid grid-cols-3 gap-4"><Field label="Test Section"><Select><option>Hematology</option></Select></Field><Field label="Panel"><Select><option>CBC</option></Select></Field><Field label="UOM"><Select><option>g/dL</option></Select></Field></div>}{step===3&&<div className="grid grid-cols-1 gap-4"><Field label="Result Type"><Select><option>Numeric</option><option>Alphanumeric</option><option>Text Area</option><option>Select List</option><option>Multi Select List</option><option>Cascading Multi Select List</option></Select></Field></div>}{step===4&&<div className="grid grid-cols-2 gap-4"><Field label="Active"><Select><option>Yes</option><option>No</option></Select></Field><Field label="Orderable"><Select><option>Yes</option><option>No</option></Select></Field></div>}{step===5&&<div className="rounded bg-emerald-50 p-4 text-emerald-800">Confirm and submit to `/rest/TestAdd`.</div>}<div className="mt-5 flex justify-end gap-2">{step>1&&<Button onClick={()=>setStep(step-1)}>Back</Button>}{step<5&&<Button tone="primary" onClick={()=>setStep(step+1)}>Next</Button>}</div></Card></>;
}

export function TestModifyEntryMock() {
  const [selectedSampleType, setSelectedSampleType] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const items = openelisTests.filter(t => (!selectedSampleType || t.sample === selectedSampleType) && (!selectedSection || t.section === selectedSection) && (!query || t.name.toLowerCase().includes(query.toLowerCase())));
  return <><Header title="Modify Existing Test" subtitle="OpenELIS TestModifyEntry pattern: filter by sample type/section, search test, then edit."><Button onClick={()=>setShowGuide(!showGuide)}>{showGuide ? "Hide Guide" : "Show Guide"}</Button></Header>{showGuide && <Card className="mb-4"><p className="text-sm text-slate-700">Editable fields: Name, Report Name, Test Section, Panel, UOM, Result Type, Active, Orderable.</p></Card>}<Card><div className="grid grid-cols-4 gap-4"><Field label="Sample Type"><Select value={selectedSampleType} onChange={(e)=>setSelectedSampleType(e.target.value)}><option value="">All</option><option>Whole Blood</option><option>Serum</option><option>Urine</option></Select></Field><Field label="Test Section"><Select value={selectedSection} onChange={(e)=>setSelectedSection(e.target.value)}><option value="">All</option><option>Hematology</option><option>Serology</option><option>Urinalysis</option></Select></Field><Field label="Search Test Name"><Input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search..." /></Field><div className="flex items-end"><Button onClick={()=>{setSelectedSampleType(""); setSelectedSection(""); setQuery(""); setSelected(null);}}>Clear</Button></div></div></Card><div className="mt-5 grid grid-cols-4 gap-3">{items.map(t=><button key={t.name} onClick={()=>setSelected(t)} className="rounded border bg-white p-3 text-left hover:bg-slate-50">{t.name}</button>)}</div>{selected && <Card className="mt-5"><h2 className="mb-3 font-bold">Editing: {selected.name}</h2><div className="grid grid-cols-2 gap-4"><Field label="Name (English)"><Input defaultValue={selected.name} /></Field><Field label="Name (French)"><Input defaultValue={selected.name} /></Field><Field label="Report Name (English)"><Input defaultValue={selected.name} /></Field><Field label="Report Name (French)"><Input defaultValue={selected.name} /></Field><Field label="Test Section"><Select><option>{selected.section}</option></Select></Field><Field label="Panel"><Select><option>CBC</option></Select></Field><Field label="UOM"><Select><option>{selected.unit}</option></Select></Field><Field label="Result Type"><Select><option>{selected.resultType}</option><option>Alphanumeric</option><option>Text Area</option><option>Select List</option><option>Multi Select List</option><option>Cascading Multi Select List</option></Select></Field><Field label="Active"><Select><option>Yes</option><option>No</option></Select></Field><Field label="Orderable"><Select><option>Yes</option><option>No</option></Select></Field></div><div className="mt-5 flex justify-end gap-2"><Button>Cancel</Button><Button tone="primary">Save</Button></div></Card>}</>;
}
function RangeTable() {
  return <div><h2 className="font-bold">Result Limits / Ranges</h2><div className="mt-4 grid grid-cols-6 gap-3"><Field label="Sex"><Select><option>Both</option></Select></Field><Field label="Age From"><Input defaultValue="0"/></Field><Field label="Age To"><Input defaultValue="10"/></Field><Field label="Normal"><Input defaultValue="12-17"/></Field><Field label="Valid"><Input defaultValue="0-30"/></Field><Field label="Critical"><Input defaultValue="<7 or >22"/></Field></div></div>
}

export function ResultLimits() {
  return <><Header title="Result Limits" subtitle="Normal, reporting, valid and critical ranges."><Button tone="primary"><Plus className="h-4 w-4"/>Add Limit</Button></Header><Card><RangeTable/><DataTable columns={["Test","Sex","Age","Normal","Reporting","Valid","Critical"]} rows={[["Hemoglobin","Male","Adult","13.5-17.5","5-25","0-30",<b className="text-red-600">&lt;7 or &gt;22</b>],["Glucose","Both","All","70-140","20-600","0-1000",<b className="text-red-600">&gt;400</b>]]}/></Card></>;
}

export function AssociationScreen() {
  return <><Header title="Sample / Panel / Test Associations" subtitle="OpenELIS association screen: assign panels/tests to sample type and maintain display order."/><div className="grid grid-cols-3 gap-5"><Card><h2 className="font-bold">Sample Types</h2>{["Whole Blood","Serum","Urine"].map(x=><button key={x} className="mt-2 w-full rounded border p-3 text-left">{x}</button>)}</Card><Card><h2 className="font-bold">Available Panels / Tests</h2>{["CBC","CD4","VDRL","Urine RE/ME"].map(x=><label key={x} className="mt-2 block rounded border p-3"><input type="checkbox"/> {x}</label>)}</Card><Card><h2 className="font-bold">Assigned Order</h2>{["CBC","CD4"].map((x,i)=><div key={x} className="mt-2 rounded border p-3">:: {i+1}. {x}</div>)}<Button tone="primary" className="mt-4">Save Association</Button></Card></div></>;
}

function GenericSetup({ title, subtitle, rows, columns, fields, primary = "Add" }) {
  const [drawer,setDrawer]=useState(false);
  return <><Header title={title} subtitle={subtitle}><Button tone="primary" onClick={()=>setDrawer(true)}><Plus className="h-4 w-4"/>{primary}</Button></Header><DataTable columns={columns.map(c=>c.label)} rows={rows.map(r=>columns.map(c=>c.render?c.render(r):r[c.key]))} onEdit={()=>setDrawer(true)}/>{drawer&&<Drawer title={`${primary} / Edit`} onClose={()=>setDrawer(false)}><div className="grid grid-cols-2 gap-4">{fields.map(f=><Field key={f.key} label={f.label} required={f.required}>{f.type==="select"?<Select>{(f.options||["Active","Inactive"]).map(o=><option key={o}>{o}</option>)}</Select>:f.type==="textarea"?<textarea className="min-h-24 w-full rounded-md border p-3"/>:<Input defaultValue={f.default||""}/>}</Field>)}</div></Drawer>}</>;
}

export function SenaiteHome() {
  const steps = [["1","Lab Department","departments"],["2","Analysis Category","categories"],["3","Analysis Services","services"],["4","Sample Type","sample-types"],["5","Client","clients"],["6","Client Contact","contacts"]];
  return <><Header title="SENAITE Setup Overview" subtitle="SENAITE setup sequence added beside OpenELIS admin."><Badge>SENAITE layer</Badge></Header><div className="grid grid-cols-3 gap-4">{steps.map(([n,t])=><Card key={t}><p className="text-xs font-bold text-slate-500">Step {n}</p><h2 className="mt-1 font-bold text-primary">{t}</h2><p className="mt-2 text-sm text-slate-600">Configure {t.toLowerCase()} records used by SENAITE sample workflow.</p></Card>)}</div><Workflow /></>;
}

export function SenaiteKeyFeatures() {
  return <>
    <Header title="SENAITE-only Features" subtitle="Only additive capabilities that are typically outside OpenELIS core admin configuration.">
      <Badge>SENAITE exclusive layer</Badge>
    </Header>
    <div className="grid grid-cols-2 gap-5">
      <Card>
        <h2 className="mb-3 font-bold">Self/Peer Validation Policy</h2>
        <div className="space-y-3 text-sm">
          <label className="flex items-center justify-between rounded border p-3"><span>Allow self-validation by analyst</span><input type="checkbox" /></label>
          <label className="flex items-center justify-between rounded border p-3"><span>Require peer validation for release</span><input type="checkbox" defaultChecked /></label>
          <label className="flex items-center justify-between rounded border p-3"><span>Block publish if peer validation missing</span><input type="checkbox" defaultChecked /></label>
          <label className="flex items-center justify-between rounded border p-3"><span>Require validation comment on override</span><input type="checkbox" defaultChecked /></label>
        </div>
      </Card>
      <Card>
        <h2 className="mb-3 font-bold">Worksheet QC Controls</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Mandatory QC Slots"><Input defaultValue="2" /></Field>
          <Field label="Duplicate Slots"><Input defaultValue="1" /></Field>
          <Field label="Retest Slots"><Input defaultValue="1" /></Field>
          <Field label="Auto-create QC Samples"><Select><option>Enabled</option><option>Disabled</option></Select></Field>
        </div>
      </Card>
      <Card>
        <h2 className="mb-3 font-bold">Uncertainty & Traceability</h2>
        <div className="space-y-3 text-sm">
          <label className="flex items-center justify-between rounded border p-3"><span>Enable uncertainty reporting</span><input type="checkbox" defaultChecked /></label>
          <label className="flex items-center justify-between rounded border p-3"><span>Enable interim fields in analyses</span><input type="checkbox" defaultChecked /></label>
          <label className="flex items-center justify-between rounded border p-3"><span>Show uncertainty on certificate/report</span><input type="checkbox" defaultChecked /></label>
          <label className="flex items-center justify-between rounded border p-3"><span>Keep full calculation audit trail</span><input type="checkbox" defaultChecked /></label>
        </div>
      </Card>
      <Card>
        <h2 className="mb-3 font-bold">Specification Profiles</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Profile Scope"><Select><option>Client + SampleType + Service</option><option>SampleType + Service</option></Select></Field>
          <Field label="Out-of-spec Handling"><Select><option>Flag and hold</option><option>Flag only</option></Select></Field>
          <Field label="Auto-apply to New Requests"><Select><option>Enabled</option><option>Disabled</option></Select></Field>
          <Field label="Use Trend Rules"><Select><option>Enabled</option><option>Disabled</option></Select></Field>
        </div>
      </Card>
    </div>
    <Card className="mt-5">
      <h2 className="mb-3 font-bold">Batch & Retest Automation</h2>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <label className="flex items-center justify-between rounded border p-3"><span>Auto-create duplicates on threshold breach</span><input type="checkbox" defaultChecked /></label>
        <label className="flex items-center justify-between rounded border p-3"><span>Auto-retest on QC failure</span><input type="checkbox" defaultChecked /></label>
        <label className="flex items-center justify-between rounded border p-3"><span>Route retests to priority worksheet</span><input type="checkbox" defaultChecked /></label>
      </div>
    </Card>
    <div className="mt-5 grid grid-cols-2 gap-5">
      <Card>
        <h2 className="mb-3 font-bold">Partitions & Aliquots</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Enable Sample Partitioning"><Select><option>Enabled</option><option>Disabled</option></Select></Field>
          <Field label="Auto-create Aliquots on Receive"><Select><option>Enabled</option><option>Disabled</option></Select></Field>
          <Field label="Default Child Container"><Input defaultValue="Aliquot Tube 1.5 ml" /></Field>
          <Field label="Parent-Child Trace Enforcement"><Select><option>Strict</option><option>Basic</option></Select></Field>
        </div>
      </Card>
      <Card>
        <h2 className="mb-3 font-bold">Profiles & Templates</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Use Analysis Profiles"><Select><option>Enabled</option><option>Disabled</option></Select></Field>
          <Field label="Use Analysis Templates"><Select><option>Enabled</option><option>Disabled</option></Select></Field>
          <Field label="Auto-assign Analyses from Template"><Select><option>Enabled</option><option>Disabled</option></Select></Field>
          <Field label="Template Trigger Stage"><Select><option>Sample Reception</option><option>Sample Registration</option></Select></Field>
        </div>
      </Card>
    </div>
    <div className="mt-5 grid grid-cols-2 gap-5">
      <Card>
        <h2 className="mb-3 font-bold">Worksheet Control References</h2>
        <div className="space-y-3 text-sm">
          <label className="flex items-center justify-between rounded border p-3"><span>Enable blank references in worksheets</span><input type="checkbox" defaultChecked /></label>
          <label className="flex items-center justify-between rounded border p-3"><span>Enable control references in worksheets</span><input type="checkbox" defaultChecked /></label>
          <label className="flex items-center justify-between rounded border p-3"><span>Alert on duplicate variation (%) breach</span><input type="checkbox" defaultChecked /></label>
        </div>
      </Card>
      <Card>
        <h2 className="mb-3 font-bold">Client Portal & Report Delivery</h2>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Client Portal Access"><Select><option>Enabled</option><option>Disabled</option></Select></Field>
          <Field label="Verified Results Visibility"><Select><option>Show to client before publish</option><option>Show only after publish</option></Select></Field>
          <Field label="Default Publish Action"><Select><option>Generate PDF + Publish</option><option>Generate PDF only</option></Select></Field>
          <Field label="Auto-email Published Report"><Select><option>Enabled</option><option>Disabled</option></Select></Field>
        </div>
      </Card>
    </div>
  </>;
}

export function Departments(){return <GenericSetup title="Lab Departments" subtitle="SENAITE departments used by analysis services and worksheets." rows={departments} columns={[{label:"Department",key:"title"},{label:"Manager",key:"manager"},{label:"Services",key:"services"},{label:"Status",render:r=><Badge>{r.active?"Active":"Inactive"}</Badge>}]} fields={[{key:"title",label:"Department Title",required:true},{key:"manager",label:"Manager"},{key:"active",label:"Status",type:"select",options:["Active","Inactive"]}]}/>;}
export function Categories(){return <GenericSetup title="Analysis Categories" subtitle="SENAITE categories group analysis services." rows={categories} columns={[{label:"Category",key:"title"},{label:"Department",key:"department"},{label:"Sort Order",key:"sortOrder"},{label:"Status",render:r=><Badge>{r.active?"Active":"Inactive"}</Badge>}]} fields={[{key:"title",label:"Category Title",required:true},{key:"department",label:"Department",type:"select",options:["Hematology","Chemistry","Serology"]},{key:"sortOrder",label:"Sort Order"}]}/>;}
export function Services(){return <GenericSetup title="Analysis Services" subtitle="Core SENAITE service/test setup: keyword, category, unit, method, price, accreditation." rows={services} columns={[{label:"Service",key:"title"},{label:"Keyword",key:"keyword"},{label:"Category",key:"category"},{label:"Department",key:"department"},{label:"Unit",key:"unit"},{label:"Price",key:"price"},{label:"Accredited",render:r=><Badge tone={r.accredited?"green":"amber"}>{r.accredited?"Yes":"No"}</Badge>}]} fields={[{key:"title",label:"Service Title",required:true},{key:"keyword",label:"Keyword"},{key:"category",label:"Category",type:"select",options:["Blood Chemistry","Hematology","Serology"]},{key:"unit",label:"Unit"},{key:"method",label:"Method"},{key:"price",label:"Price"},{key:"accredited",label:"Accredited",type:"select",options:["Yes","No"]}]}/>;}
export function SampleTypes(){return <GenericSetup title="Sample Types" subtitle="SENAITE sample type setup: prefix, retention, container and partitions." rows={sampleTypes} columns={[{label:"Sample Type",key:"title"},{label:"Prefix",key:"prefix"},{label:"Retention",key:"retention"},{label:"Container",key:"container"},{label:"Partitions",key:"partitions"},{label:"Status",render:r=><Badge>{r.active?"Active":"Inactive"}</Badge>}]} fields={[{key:"title",label:"Sample Type",required:true},{key:"prefix",label:"Prefix"},{key:"retention",label:"Retention Period"},{key:"container",label:"Default Container"},{key:"partitions",label:"Partitions",type:"textarea"}]}/>;}
export function Clients(){return <GenericSetup title="Clients" subtitle="SENAITE clients: organizations that submit samples/requests." rows={clients} columns={[{label:"Client",key:"name"},{label:"Code",key:"code"},{label:"Email",key:"email"},{label:"Phone",key:"phone"},{label:"Status",render:r=><Badge>{r.active?"Active":"Inactive"}</Badge>}]} fields={[{key:"name",label:"Client Name",required:true},{key:"code",label:"Client Code"},{key:"email",label:"Email"},{key:"phone",label:"Phone"}]}/>;}
export function Contacts(){return <GenericSetup title="Client Contacts" subtitle="SENAITE contact people linked to client organizations." rows={contacts} columns={[{label:"Contact",key:"name"},{label:"Client",key:"client"},{label:"Email",key:"email"},{label:"Role",key:"role"},{label:"Status",render:r=><Badge>{r.active?"Active":"Inactive"}</Badge>}]} fields={[{key:"name",label:"Contact Name",required:true},{key:"client",label:"Client",type:"select",options:["Sukraraj Hospital","Main OPD"]},{key:"email",label:"Email"},{key:"role",label:"Role"}]}/>;}
export function Worksheets(){return <GenericSetup title="Worksheets & Templates" subtitle="SENAITE worksheet planning: templates, services, analysts, QC/duplicate/retest slots." rows={worksheets} columns={[{label:"Template",key:"template"},{label:"Department",key:"department"},{label:"Services",key:"services"},{label:"Analyst",key:"analyst"},{label:"Slots",key:"slots"},{label:"QC",key:"qc"}]} fields={[{key:"template",label:"Template Name",required:true},{key:"department",label:"Department"},{key:"services",label:"Services",type:"textarea"},{key:"analyst",label:"Default Analyst"},{key:"slots",label:"Slots"},{key:"qc",label:"QC Slots"}]}/>;}
export function Instruments(){return <GenericSetup title="Instruments" subtitle="SENAITE instrument setup: interface, calibration and connectivity." rows={instruments} columns={[{label:"Instrument",key:"name"},{label:"Department",key:"department"},{label:"Interface",key:"interface"},{label:"Status",render:r=><Badge>{r.status}</Badge>},{label:"Calibration Due",key:"calibrationDue"}]} fields={[{key:"name",label:"Instrument Name",required:true},{key:"department",label:"Department"},{key:"interface",label:"Interface",type:"select",options:["ASTM","CSV/API","Manual"]},{key:"calibrationDue",label:"Calibration Due"}]}/>;}
export function Calculations(){return <GenericSetup title="Calculations" subtitle="Formula-based calculated analyses." rows={calculations} columns={[{label:"Calculation",key:"title"},{label:"Formula",key:"formula"},{label:"Input Services",key:"services"},{label:"Output",key:"output"}]} fields={[{key:"title",label:"Calculation Title",required:true},{key:"formula",label:"Formula",type:"textarea"},{key:"services",label:"Input Services"},{key:"output",label:"Output Service"}]}/>;}
export function Specifications(){return <GenericSetup title="Specifications" subtitle="SENAITE client/sample/product limits and alert ranges." rows={specifications} columns={[{label:"Spec",key:"title"},{label:"Sample",key:"sampleType"},{label:"Service",key:"service"},{label:"Min",key:"min"},{label:"Max",key:"max"},{label:"Alert",render:r=><b className="text-red-600">{r.alert}</b>}]} fields={[{key:"title",label:"Specification Title",required:true},{key:"sampleType",label:"Sample Type"},{key:"service",label:"Service"},{key:"min",label:"Min"},{key:"max",label:"Max"},{key:"alert",label:"Alert Rule"}]}/>;}
export function Batches(){return <GenericSetup title="Batches" subtitle="Group samples/analysis requests for projects, clients or campaigns." rows={batches} columns={[{label:"Batch ID",key:"id"},{label:"Client",key:"client"},{label:"Samples",key:"samples"},{label:"Status",render:r=><Badge tone={r.status==="Open"?"amber":"green"}>{r.status}</Badge>}]} fields={[{key:"id",label:"Batch ID"},{key:"client",label:"Client"},{key:"status",label:"Status",type:"select",options:["Open","Received","Closed"]}]}/>;}
export function Storage(){return <GenericSetup title="Storage" subtitle="Sample storage locations, containers, positions and temperature." rows={storage} columns={[{label:"Location",key:"location"},{label:"Container",key:"container"},{label:"Position",key:"position"},{label:"Temperature",key:"temp"},{label:"Samples",key:"samples"}]} fields={[{key:"location",label:"Location"},{key:"container",label:"Container"},{key:"position",label:"Position"},{key:"temp",label:"Temperature"}]}/>;}
export function ApiIntegration(){return <><Header title="JSON/API & Integrations" subtitle="SENAITE JSON API, ASTM middleware and combined LIS integration layer."/><div className="grid grid-cols-3 gap-4"><Card><h2 className="font-bold text-primary">JSON API</h2><p className="mt-2 text-sm text-slate-600">Expose clients, samples, analyses and results to external systems.</p><Badge>Enabled</Badge></Card><Card><h2 className="font-bold text-primary">ASTM / Instrument</h2><p className="mt-2 text-sm text-slate-600">Instrument middleware for analyzer result import.</p><Badge>Connected</Badge></Card><Card><h2 className="font-bold text-primary">OpenELIS Bridge</h2><p className="mt-2 text-sm text-slate-600">Mapping between OpenELIS orders/results and SENAITE services.</p><Badge tone="amber">Mapping Review</Badge></Card></div></>;}
export function Workflow(){return <Card className="mt-5"><h2 className="mb-4 font-bold">Workflow Mapping</h2><table className="w-full text-sm"><thead className="bg-slate-50"><tr><th className="p-3 text-left">Step</th><th className="p-3 text-left">SENAITE</th><th className="p-3 text-left">OpenELIS</th></tr></thead><tbody>{workflowSteps.map(s=><tr key={s.step} className="border-t"><td className="p-3 font-bold">{s.step}</td><td className="p-3">{s.senaite}</td><td className="p-3">{s.openelis}</td></tr>)}</tbody></table></Card>;}

export function OpenelisAdminFeature({ title, subtitle, fields = [] }) {
  return <><Header title={title} subtitle={subtitle}><Button tone="primary"><Save className="h-4 w-4" />Save</Button></Header><Card><div className="grid grid-cols-2 gap-4">{fields.map((f) => <Field key={f.label} label={f.label}>{f.type === "select" ? <Select>{(f.options || ["Enabled", "Disabled"]).map((o) => <option key={o}>{o}</option>)}</Select> : <Input defaultValue={f.defaultValue || ""} placeholder={f.placeholder || ""} />}</Field>)}</div></Card></>;
}


export function UsersScreen() {
  return <GenericSetup title="Manage Users" subtitle="Combined admin user management for OpenELIS and SENAITE roles." rows={[
    { login: "admin", name: "System Administrator", role: "Admin", department: "All", active: true },
    { login: "labtech", name: "Lab Technician", role: "Lab Tech", department: "Hematology", active: true },
    { login: "supervisor", name: "Lab Supervisor", role: "Supervisor", department: "Biochemistry", active: true }
  ]} columns={[
    {label:"Login",key:"login"},
    {label:"Name",key:"name"},
    {label:"Role",key:"role"},
    {label:"Department",key:"department"},
    {label:"Status",render:r=><Badge>{r.active?"Active":"Inactive"}</Badge>}
  ]} fields={[
    {key:"login",label:"Login",required:true},
    {key:"name",label:"Full Name",required:true},
    {key:"role",label:"Role",type:"select",options:["Admin","Lab Tech","Supervisor","SENAITE Manager"]},
    {key:"department",label:"Department"},
    {key:"active",label:"Status",type:"select",options:["Active","Inactive"]}
  ]} primary="Add User" />;
}

