// import MonthlyScoreCurrent from "./MonthlyScoreCurrent";
// import MonthlyScorePrevious from "./MonthlyScorePrevious";
import productionData from "@/api/production-data.json";
import { useCalculation } from "@/hooks/useCalculation";
import { highlight } from "@/lib/utils";

export default function EfficiencyOverview() {
  const { getMonthlyEfficiency } = useCalculation();
  return (
    <>
      <h2>Efficiency Overview</h2>
      <div className="grid grid-cols-2 gap-4 w-1/2">
        <p>Monthly report for: </p>
        <p>{productionData.metadata.reportDate}</p>
        <p>Total score:</p>
        <p
          className={highlight(
            getMonthlyEfficiency(
              productionData.shifts,
              productionData.downtimeEvents,
            ).toString(),
          )}
        >
          {getMonthlyEfficiency(
            productionData.shifts,
            productionData.downtimeEvents,
          ).toFixed(0) + "%"}
        </p>

        <p>Last month total score:</p>
        <p
          className={highlight(
            (productionData.previousPeriod.totalOEE * 100).toString(),
          )}
        >
          {(productionData.previousPeriod.totalOEE * 100).toFixed(0) + "%"}
        </p>
      </div>
    </>
  );
}
