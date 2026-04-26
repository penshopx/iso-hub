import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/app/page";
import LearningPage from "@/app/learning/page";
import ProduktivitasPage from "@/app/produktivitas/page";
import RisikoPage from "@/app/risiko/page";
import InsidenPage from "@/app/insiden/page";
import VendorPage from "@/app/vendor/page";
import FasilitatorPage from "@/app/fasilitator/page";
import SertifikasiBadanPage from "@/app/sertifikasi-badan/page";
import PerpustakaanPage from "@/app/perpustakaan/page";
import LayananPage from "@/app/layanan/page";
import KalenderPage from "@/app/kalender-kepatuhan/page";
import ProyekPage from "@/app/proyek/page";
import DokumenPage from "@/app/dokumen/page";
import AuditPage from "@/app/audit/page";
import AuditInternalPage from "@/app/audit-internal/page";
import AuditEksternalPage from "@/app/audit-eksternal/page";
import SertifikasiPage from "@/app/sertifikasi/page";
import IsoPage from "@/app/iso/iso14001/page";
import Iso45001Page from "@/app/iso/iso45001/page";
import IsoPelatihanPage from "@/app/iso/pelatihan/page";
import KalibrasiPage from "@/app/kalibrasi/page";
import KpiPage from "@/app/kpi/page";
import PerubahanPage from "@/app/perubahan/page";
import IndustriPage from "@/app/industri/page";
import AgentsPage from "@/app/agents/page";
import IsoGeneratorPage from "@/app/iso-generator/page";
import OPCPage from "@/app/opc/page";
import FloatingChatbot from "@/components/FloatingChatbot";

const queryClient = new QueryClient();

function Router() {
  return (
    <>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/learning" component={LearningPage} />
        <Route path="/produktivitas" component={ProduktivitasPage} />
        <Route path="/risiko" component={RisikoPage} />
        <Route path="/insiden" component={InsidenPage} />
        <Route path="/vendor" component={VendorPage} />
        <Route path="/fasilitator" component={FasilitatorPage} />
        <Route path="/fasilitator/:id" component={FasilitatorPage} />
        <Route path="/sertifikasi-badan" component={SertifikasiBadanPage} />
        <Route path="/perpustakaan" component={PerpustakaanPage} />
        <Route path="/layanan" component={LayananPage} />
        <Route path="/kalender-kepatuhan" component={KalenderPage} />
        <Route path="/proyek" component={ProyekPage} />
        <Route path="/dokumen" component={DokumenPage} />
        <Route path="/audit" component={AuditPage} />
        <Route path="/audit-internal" component={AuditInternalPage} />
        <Route path="/audit-eksternal" component={AuditEksternalPage} />
        <Route path="/sertifikasi" component={SertifikasiPage} />
        <Route path="/iso/iso14001" component={IsoPage} />
        <Route path="/iso/iso45001" component={Iso45001Page} />
        <Route path="/iso/pelatihan" component={IsoPelatihanPage} />
        <Route path="/kalibrasi" component={KalibrasiPage} />
        <Route path="/kpi" component={KpiPage} />
        <Route path="/perubahan" component={PerubahanPage} />
        <Route path="/industri" component={IndustriPage} />
        <Route path="/agents" component={AgentsPage} />
        <Route path="/iso-generator" component={IsoGeneratorPage} />
        <Route path="/opc" component={OPCPage} />
        <Route component={NotFound} />
      </Switch>
      <FloatingChatbot />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
