import { Card, Field, GhostButton, Input, PageWrap, PrimaryButton, Select } from "./primitives";

export function OrderEntry({ mode = "add" }: { mode?: "add" | "edit" }) {
  if (mode === "edit") {
    return (
      <PageWrap>
        <div className="mb-6 border-b border-border pb-4">
          <h1 className="text-3xl font-bold tracking-tight">Edit Sample</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">Look up an existing accession and amend its details.</p>
        </div>
        <Card title="Search">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Field label="Accession Number"><Input /></Field>
            <Field label="First Name"><Input /></Field>
            <Field label="Middle Name"><Input /></Field>
            <Field label="Last Name"><Input /></Field>
            <Field label="Patient ID"><Input /></Field>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <GhostButton>Search</GhostButton>
            <GhostButton>Get Tests for Accession</GhostButton>
          </div>
        </Card>
        <div className="mt-8 flex justify-center gap-3">
          <PrimaryButton>Save</PrimaryButton>
          <GhostButton>Cancel</GhostButton>
        </div>
      </PageWrap>
    );
  }

  return (
    <PageWrap>
      <div className="mb-6 border-b border-border pb-4">
        <h1 className="text-3xl font-bold tracking-tight">Add Sample</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Search the patient, choose a sample type, then create the lab order.
        </p>
      </div>

      <Card title="Patient Search">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_1fr_auto] items-end gap-4">
          <Field label="First Name"><Input placeholder="e.g. Sita" /></Field>
          <Field label="Middle Name"><Input /></Field>
          <Field label="Last Name"><Input placeholder="e.g. Rai" /></Field>
          <Field label="Patient ID"><Input placeholder="SDH…" /></Field>
          <GhostButton>Run Search</GhostButton>
        </div>
      </Card>

      <Card title="Sample">
        <div className="flex flex-wrap items-end gap-3">
          <div className="w-full md:w-80">
            <Field label="Sample Type" required>
              <Select defaultValue="">
                <option value="">Select sample type…</option>
                <option>Blood</option>
                <option>Serum</option>
                <option>Urine</option>
                <option>Stool</option>
                <option>Sputum</option>
              </Select>
            </Field>
          </div>
          <GhostButton>+ Add Sample</GhostButton>
        </div>
      </Card>

      <Card title="Order Details">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
          <Field label="Accession Number" required>
            <div className="flex gap-2">
              <Input placeholder="Scan or enter manually" />
              <button className="shrink-0 rounded-md border border-primary/30 px-3 text-sm font-semibold text-primary hover:bg-primary/5 transition-base">
                Generate
              </button>
            </div>
          </Field>
          <Field label="Sample Source" required>
            <Select defaultValue="">
              <option value="">Select source…</option>
              <option>Registration</option>
              <option>OPD</option>
              <option>Emergency</option>
              <option>IPD</option>
            </Select>
          </Field>
          <Field label="Received Date (dd/mm/yyyy)" required>
            <Input defaultValue="04/05/2026" />
          </Field>
          <Field label="Requester's Name">
            <Select defaultValue="">
              <option value="">Select requester…</option>
              <option>Dr. Ram Thapa</option>
              <option>Dr. Sita Devi</option>
            </Select>
          </Field>
        </div>
      </Card>

      <div className="mt-8 flex justify-center gap-3">
        <PrimaryButton>Save Order</PrimaryButton>
        <GhostButton>Cancel</GhostButton>
      </div>
    </PageWrap>
  );
}
