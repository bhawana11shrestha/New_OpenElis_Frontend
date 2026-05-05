import React, { useMemo, useState } from "react";
import { adminGroups } from "./data.jsx";
import * as Screens from "./screens.jsx";

function AdminNav({ screen, setScreen }) {
  return (
    <aside className="sticky top-[120px] max-h-[calc(100vh-140px)] w-[360px] shrink-0 overflow-hidden rounded-xl border border-border bg-card shadow-elegant">
      <div className="border-b border-border bg-gradient-surface px-5 py-4">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Admin Modules</p>
        <h2 className="mt-1 text-xl font-bold text-foreground">OpenELIS + SENAITE</h2>
      </div>
      <div className="max-h-[calc(100vh-235px)] overflow-y-auto p-4">
        {adminGroups.map((group) => (
          <div key={group.title} className="mb-6">
            <p className="mb-2 px-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">{group.title}</p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setScreen(item.key)}
                  className={Screens.cls(
                    "w-full rounded-lg px-3 py-3 text-left transition-base",
                    screen === item.key ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <span className="block text-sm font-bold">{item.label}</span>
                  <span className={Screens.cls("mt-1 block text-xs", screen === item.key ? "text-primary/80" : "text-muted-foreground")}>
                    {item.hint}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

function AdminWorkspace() {
  const [screen, setScreen] = useState("combined-home");

  const content = useMemo(() => {
    const map = {
      "combined-home": <Screens.CombinedHome setScreen={setScreen} />,
      "openelis-master": <Screens.OpenELISMaster setScreen={setScreen} />,
      barcode: <Screens.BarcodeConfig />,
      dictionary: <Screens.DictionaryScreen />,
      "test-management": <Screens.TestManagement setScreen={setScreen} />,
      "openelis-test-config": <Screens.OpenELISTestConfigModules setScreen={setScreen} />,
      "rename-test-name": <Screens.RenameEntity title="Rename Existing Test Name" entityLabel="Test Name" />,
      "rename-panel-name": <Screens.RenameEntity title="Rename Existing Panel Name" entityLabel="Panel Name" />,
      "rename-sample-name": <Screens.RenameEntity title="Rename Existing Sample Name" entityLabel="Sample Name" />,
      "rename-method-name": <Screens.RenameEntity title="Rename Existing Method Name" entityLabel="Method Name" />,
      catalog: <Screens.TestCatalog />,
      "modify-test": <Screens.TestModifyEntryMock />,
      activate: <Screens.TestActivation />,
      orderability: <Screens.TestOrderability />,
      "select-list": <Screens.ResultSelectList />,
      "manage-methods": <Screens.ManageMethods />,
      "manage-sample-types-openelis": <Screens.ManageSampleTypesOpenelis setScreen={setScreen} />,
      "manage-panels-openelis": <Screens.ManagePanelsOpenelis setScreen={setScreen} />,
      "manage-uom-openelis": <Screens.ManageUOMOpenelis setScreen={setScreen} />,
      "manage-test-sections-openelis": <Screens.ManageTestSectionsOpenelis setScreen={setScreen} />,
      "openelis-sample-type-create": <Screens.OpenelisCreateForm title="Create New Sample Type" entityLabel="Sample Type" />,
      "openelis-sample-type-order": <Screens.OpenelisOrderScreen title="Set Sample Type Order" itemLabel="Sample Type" />,
      "openelis-sample-type-assign": (
        <Screens.OpenelisAssignmentScreen title="Sample Type Test Assignment" leftLabel="Test" rightLabel="Sample Type" />
      ),
      "openelis-panel-create": <Screens.OpenelisCreateForm title="Create New Panel" entityLabel="Panel" includeSampleType />,
      "openelis-panel-order": <Screens.OpenelisOrderScreen title="Set Panel Order" itemLabel="Panel" />,
      "openelis-panel-assign": <Screens.OpenelisAssignmentScreen title="Panel Test Assignment" leftLabel="Test" rightLabel="Panel" />,
      "openelis-uom-create": <Screens.OpenelisCreateForm title="Create New Test Unit" entityLabel="Test Unit" />,
      "openelis-uom-order": <Screens.OpenelisOrderScreen title="Set Test Unit Order" itemLabel="Test Unit" />,
      "openelis-uom-assign": <Screens.OpenelisAssignmentScreen title="Test Unit Assignment" leftLabel="Test" rightLabel="Test Unit" />,
      "openelis-section-create": <Screens.OpenelisCreateForm title="Create New Test Section" entityLabel="Test Section" />,
      "openelis-section-order": <Screens.OpenelisOrderScreen title="Set Test Section Order" itemLabel="Test Section" />,
      "openelis-section-assign": <Screens.OpenelisAssignmentScreen title="Test Section Assignment" leftLabel="Test" rightLabel="Test Section" />,
      "add-test": <Screens.AddTest />,
      "result-limits": <Screens.ResultLimits />,
      associations: <Screens.AssociationScreen />,
      "docker-edit": <Screens.DockerEdit />,
      users: <Screens.UsersScreen />,
      "senaite-home": <Screens.SenaiteHome />,
      "senaite-key-features": <Screens.SenaiteKeyFeatures />,
      departments: <Screens.Departments />,
      categories: <Screens.Categories />,
      services: <Screens.Services />,
      "sample-types": <Screens.SampleTypes />,
      clients: <Screens.Clients />,
      contacts: <Screens.Contacts />,
      worksheets: <Screens.Worksheets />,
      instruments: <Screens.Instruments />,
      calculations: <Screens.Calculations />,
      specifications: <Screens.Specifications />,
      batches: <Screens.Batches />,
      storage: <Screens.Storage />,
      api: <Screens.ApiIntegration />,
      workflow: <Screens.Workflow />,
      "result-reporting-config": (
        <Screens.OpenelisAdminFeature
          title="Result Reporting Configuration"
          subtitle="OpenELIS report output controls including image/logo settings."
          fields={[
            { label: "Report Header Logo Path", defaultValue: "/assets/report/logo.png" },
            { label: "Report Watermark Image Path", defaultValue: "/assets/report/watermark.png" },
            { label: "Signature Image Path", defaultValue: "/assets/report/signature.png" },
            { label: "Show QR Verification", type: "select", options: ["Enabled", "Disabled"] },
            { label: "Report Footer Text", defaultValue: "OpenELIS Global Laboratory" },
            { label: "Auto Publish Verified Results", type: "select", options: ["Enabled", "Disabled"] },
          ]}
        />
      ),
      "site-branding": (
        <Screens.OpenelisAdminFeature
          title="Site Branding"
          subtitle="OpenELIS site appearance and identity configuration."
          fields={[
            { label: "Site Name", defaultValue: "OpenELIS Global" },
            { label: "Header Logo Upload Path", defaultValue: "/assets/site/header-logo.png" },
            { label: "Login Page Background Image", defaultValue: "/assets/site/login-bg.jpg" },
            { label: "Favicon Path", defaultValue: "/assets/site/favicon.ico" },
            { label: "Primary Brand Color", defaultValue: "#037469" },
            { label: "Enable Custom Branding", type: "select", options: ["Enabled", "Disabled"] },
          ]}
        />
      ),
      "common-properties": (
        <Screens.OpenelisAdminFeature
          title="Common Properties"
          subtitle="Global key/value settings shared across OpenELIS modules."
          fields={[
            { label: "Property Key", defaultValue: "system.defaultLocale" },
            { label: "Property Value", defaultValue: "en_US" },
            { label: "Category", defaultValue: "System" },
            { label: "Editable", type: "select", options: ["Yes", "No"] },
          ]}
        />
      ),
      "lab-number": (
        <Screens.OpenelisAdminFeature
          title="Lab Number Management"
          subtitle="Configure accession/lab numbering format and counters."
          fields={[
            { label: "Lab Number Prefix", defaultValue: "LAB" },
            { label: "Year Segment", type: "select", options: ["Enabled", "Disabled"] },
            { label: "Sequence Length", defaultValue: "6" },
            { label: "Reset Frequency", type: "select", options: ["Yearly", "Monthly", "Never"] },
          ]}
        />
      ),
      "program-management": (
        <Screens.OpenelisAdminFeature
          title="Program Management"
          subtitle="Manage OpenELIS programs and their active lifecycle."
          fields={[
            { label: "Program Name", defaultValue: "National HIV Program" },
            { label: "Program Code", defaultValue: "HIV-01" },
            { label: "Start Date", defaultValue: "2026-01-01" },
            { label: "Status", type: "select", options: ["Active", "Inactive"] },
          ]}
        />
      ),
      "provider-management": (
        <Screens.OpenelisAdminFeature
          title="Provider Management"
          subtitle="Maintain provider details and assignment context."
          fields={[
            { label: "Provider Name", defaultValue: "Dr. Example Provider" },
            { label: "Provider Code", defaultValue: "PRV-1001" },
            { label: "Facility", defaultValue: "Central Lab" },
            { label: "Status", type: "select", options: ["Active", "Inactive"] },
          ]}
        />
      ),
      "organization-management": (
        <Screens.OpenelisAdminFeature
          title="Organization Management"
          subtitle="Organization-level records for OpenELIS instances."
          fields={[
            { label: "Organization Name", defaultValue: "District Public Health Lab" },
            { label: "Organization Code", defaultValue: "DPHL" },
            { label: "Address", defaultValue: "Kathmandu" },
            { label: "Status", type: "select", options: ["Active", "Inactive"] },
          ]}
        />
      ),
      "test-notification-config": (
        <Screens.OpenelisAdminFeature
          title="Test Notification Configuration"
          subtitle="Notification triggers for result and test events."
          fields={[
            { label: "Notification Event", defaultValue: "Critical Result" },
            { label: "Delivery Channel", type: "select", options: ["In-app", "Email", "Both"] },
            { label: "Recipient Group", defaultValue: "Supervisors" },
            { label: "Enabled", type: "select", options: ["Yes", "No"] },
          ]}
        />
      ),
      "external-connections": (
        <Screens.OpenelisAdminFeature
          title="External Connections"
          subtitle="Manage external integrations and endpoint credentials."
          fields={[
            { label: "Connection Name", defaultValue: "National HIS" },
            { label: "Base URL", defaultValue: "https://his.example.org/api" },
            { label: "Authentication Type", type: "select", options: ["Token", "Basic", "mTLS"] },
            { label: "Connection Status", type: "select", options: ["Enabled", "Disabled"] },
          ]}
        />
      ),
      "search-index-management": (
        <Screens.OpenelisAdminFeature
          title="Search Index Management"
          subtitle="Search index controls for performance and data freshness."
          fields={[
            { label: "Index Name", defaultValue: "test_catalog_idx" },
            { label: "Rebuild Strategy", type: "select", options: ["Full Rebuild", "Incremental"] },
            { label: "Last Rebuild Time", defaultValue: "2026-05-04 10:00" },
            { label: "Auto Rebuild", type: "select", options: ["Enabled", "Disabled"] },
          ]}
        />
      ),
      "logging-management": (
        <Screens.OpenelisAdminFeature
          title="Logging Management"
          subtitle="Runtime logging and diagnostics configuration."
          fields={[
            { label: "Application Log Level", type: "select", options: ["INFO", "DEBUG", "WARN", "ERROR"] },
            { label: "Audit Log Level", type: "select", options: ["INFO", "WARN", "ERROR"] },
            { label: "Retention Days", defaultValue: "90" },
            { label: "Export Logs", type: "select", options: ["Enabled", "Disabled"] },
          ]}
        />
      ),
      "calendar-management": (
        <Screens.OpenelisAdminFeature
          title="Calendar Management"
          subtitle="Calendar configuration for lab operations and holidays."
          fields={[
            { label: "Calendar Name", defaultValue: "Default Lab Calendar" },
            { label: "Weekend Policy", type: "select", options: ["Sat/Sun", "Sun Only", "None"] },
            { label: "Holiday Source", defaultValue: "National List" },
            { label: "Enable TAT Exclusion on Holidays", type: "select", options: ["Enabled", "Disabled"] },
          ]}
        />
      ),
      "localization-management": (
        <Screens.OpenelisAdminFeature
          title="Localization Management"
          subtitle="Language and translation administration."
          fields={[
            { label: "Default Language", defaultValue: "English" },
            { label: "Secondary Language", defaultValue: "French" },
            { label: "Fallback Locale", defaultValue: "en_US" },
            { label: "Enable Runtime Translation Editing", type: "select", options: ["Enabled", "Disabled"] },
          ]}
        />
      ),
      "plugin-management": (
        <Screens.OpenelisAdminFeature
          title="Plugin Management"
          subtitle="Manage plugin packages and plugin state."
          fields={[
            { label: "Plugin File Path", defaultValue: "/opt/openelis/plugins/custom-plugin.jar" },
            { label: "Plugin Name", defaultValue: "Custom Integration Plugin" },
            { label: "Version", defaultValue: "1.0.0" },
            { label: "Status", type: "select", options: ["Enabled", "Disabled"] },
          ]}
        />
      ),
    };

    return map[screen] || <Screens.CombinedHome setScreen={setScreen} />;
  }, [screen]);

  return (
    <main className="flex gap-7 p-6">
      <AdminNav screen={screen} setScreen={setScreen} />
      <section className="min-w-0 flex-1">{content}</section>
    </main>
  );
}

export function AdminConsole() {
  return <AdminWorkspace />;
}
