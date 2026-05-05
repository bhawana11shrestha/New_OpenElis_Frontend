import { useState } from "react";
import { Header } from "@/components/openelis/Header";
import { Sidebar } from "@/components/openelis/Sidebar";
import { Dashboard } from "@/components/openelis/Dashboard";
import { OrderEntry } from "@/components/openelis/OrderEntry";
import { PatientManagement } from "@/components/openelis/Patient";
import { ResultsEntry } from "@/components/openelis/Results";
import { Validation } from "@/components/openelis/Validation";
import { Reports } from "@/components/openelis/Reports";
import { Admin } from "@/components/openelis/Admin";

const Index = () => {
  const [active, setActive] = useState<string>("Home");
  const [reportSection, setReportSection] = useState("Patient Status Report");
  const [validationSection, setValidationSection] = useState("Awaiting Review");
  const [resultSection, setResultSection] = useState("Pending Entry");

  const content =
    active === "Home" ? <Dashboard setActive={setActive} /> :
    active === "Order Entry" ? <OrderEntry /> :
    active === "Edit Sample" ? <OrderEntry mode="edit" /> :
    active === "Patient" ? <PatientManagement /> :
    active === "Results" ? <ResultsEntry resultSection={resultSection} /> :
    active === "Validation" ? <Validation validationSection={validationSection} /> :
    active === "Reports" ? <Reports reportSection={reportSection} setReportSection={setReportSection} /> :
    <Admin />;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header active={active} setActive={setActive} />
      <div className="flex">
        {active !== "Admin" && (
          <Sidebar
            active={active}
            setActive={setActive}
            reportSection={reportSection}
            setReportSection={setReportSection}
            validationSection={validationSection}
            setValidationSection={setValidationSection}
            resultSection={resultSection}
            setResultSection={setResultSection}
          />
        )}
        {content}
      </div>
    </div>
  );
};

export default Index;
