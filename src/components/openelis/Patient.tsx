import { Card, Field, GhostButton, Input, PageWrap, PrimaryButton, Select } from "./primitives";

const patients = [
  { id: "SDH200713", first: "Dummy", middle: "", last: "Dummmm", gender: "F" },
  { id: "DH219922", first: "Dummy", middle: "", last: "Patient", gender: "F" },
  { id: "SDH192150", first: "Dummy", middle: "", last: "Test", gender: "F" },
  { id: "SDH200695", first: "Dummy", middle: "", last: "Test", gender: "M" },
  { id: "SDH200697", first: "Dummy", middle: "", last: "Th", gender: "F" },
];

export function PatientManagement() {
  return (
    <PageWrap>
      <div className="mb-6 border-b border-border pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Add / Modify Patient</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Search existing patients, select a record, then update patient information.
        </p>
      </div>

      <Card title="Search">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Field label="First Name"><Input defaultValue="dummy" /></Field>
          <Field label="Middle Name"><Input /></Field>
          <Field label="Last Name"><Input /></Field>
          <Field label="Patient ID"><Input /></Field>
        </div>
        <div className="mt-4 flex justify-end">
          <GhostButton>Run Search</GhostButton>
        </div>
      </Card>

      <section className="mb-6 rounded-xl border border-border bg-card shadow-elegant overflow-hidden">
        <div className="flex items-center justify-between border-b border-border bg-gradient-surface px-6 py-4">
          <h2 className="text-lg font-semibold">Search Results</h2>
          <button className="rounded-md border border-primary/30 px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/5 transition-base">
            + New Patient
          </button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-muted/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-6 py-3 w-10"></th>
              <th className="px-6 py-3 font-semibold">Patient ID</th>
              <th className="px-6 py-3 font-semibold">First Name</th>
              <th className="px-6 py-3 font-semibold">Middle</th>
              <th className="px-6 py-3 font-semibold">Last Name</th>
              <th className="px-6 py-3 font-semibold">Gender</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {patients.map((p, i) => (
              <tr key={p.id} className="h-14 hover:bg-secondary/40 transition-base">
                <td className="px-6"><input type="radio" name="patient" defaultChecked={i === 0} className="accent-primary" /></td>
                <td className="px-6 font-semibold text-primary">{p.id}</td>
                <td className="px-6">{p.first}</td>
                <td className="px-6">{p.middle || "—"}</td>
                <td className="px-6">{p.last}</td>
                <td className="px-6">{p.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <Card title="Patient Information">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Field label="Patient ID" required><Input defaultValue="SDH200713" /></Field>
          <Field label="First Name" required><Input defaultValue="Dummy" /></Field>
          <Field label="Middle Name"><Input /></Field>
          <Field label="Last Name" required><Input defaultValue="Dummmm" /></Field>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="Father's / Husband's Name"><Input /></Field>
          <Field label="House No. / Street"><Input defaultValue="3" /></Field>
          <Field label="Village"><Input defaultValue="Narayan Municipality" /></Field>
          <Field label="Gram Panchayat"><Input /></Field>
          <Field label="Tehsil"><Input /></Field>
          <Field label="District"><Input /></Field>
          <Field label="State"><Input /></Field>
          <Field label="Date of Birth"><Input defaultValue="24/04/2023" /></Field>
          <Field label="Age"><Input defaultValue="3" /></Field>
          <Field label="Gender" required>
            <Select defaultValue="Female">
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
            </Select>
          </Field>
          <Field label="Occupation"><Input /></Field>
          <Field label="Caste"><Input /></Field>
        </div>
        <div className="mt-8 flex justify-center gap-3">
          <PrimaryButton>Save Patient</PrimaryButton>
          <GhostButton>Cancel</GhostButton>
        </div>
      </Card>
    </PageWrap>
  );
}
