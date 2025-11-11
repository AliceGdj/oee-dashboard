import EfficiencyDetail from "@/components/EfficiencyDetail";
import EfficiencyDowntime from "@/components/EfficiencyDowntime";
import EfficiencyOverview from "@/components/EfficiencyOverview";
import Navbar from "@/components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <h1>Overall Equipment Effectiveness</h1>
      <EfficiencyOverview />
      <EfficiencyDetail />
      <EfficiencyDowntime />
    </>
  );
}

export default App;
