import productionData from "@/api/production-data.json";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCalculation } from "@/hooks/useCalculation";
import { highlight } from "@/lib/utils";

export default function EfficiencyDetail() {
  const {
    getShiftDowntime,
    getShiftDowntimePlanned,
    getShiftDowntimeUnplanned,
    getShiftAvailability,
    getShiftPerformance,
    getShiftQuality,
    getTotalEfficiency,
  } = useCalculation();

  const shiftsId: string[] = productionData.shifts.map((el) => el.id);
  const shifts = productionData.shifts;
  const downtimes = productionData.downtimeEvents;

  return (
    <>
      <h2>Efficiency Detail</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>{shifts[0].name}</TableHead>
            <TableHead>{shifts[1].name}</TableHead>
            <TableHead>{shifts[2].name}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Target Quantity</TableCell>
            <TableCell>{shifts[0].targetQuantity}</TableCell>
            <TableCell>{shifts[1].targetQuantity}</TableCell>
            <TableCell>{shifts[2].targetQuantity}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Actual Quantity</TableCell>
            <TableCell>{shifts[0].actualQuantity}</TableCell>
            <TableCell>{shifts[1].actualQuantity}</TableCell>
            <TableCell>{shifts[2].actualQuantity}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Good</TableCell>
            <TableCell>{shifts[0].goodQuantity}</TableCell>
            <TableCell>{shifts[1].goodQuantity}</TableCell>
            <TableCell>{shifts[2].goodQuantity}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Defect</TableCell>
            <TableCell>{shifts[0].defectQuantity}</TableCell>
            <TableCell>{shifts[1].defectQuantity}</TableCell>
            <TableCell>{shifts[2].defectQuantity}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Downtime (min)</TableCell>
            <TableCell>{getShiftDowntime(shiftsId[0], downtimes)}</TableCell>
            <TableCell>{getShiftDowntime(shiftsId[1], downtimes)}</TableCell>
            <TableCell>{getShiftDowntime(shiftsId[2], downtimes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Downtime Planned (min)</TableCell>
            <TableCell>
              {getShiftDowntimePlanned(shiftsId[0], downtimes)}
            </TableCell>
            <TableCell>
              {getShiftDowntimePlanned(shiftsId[1], downtimes)}
            </TableCell>
            <TableCell>
              {getShiftDowntimePlanned(shiftsId[2], downtimes)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Downtime Unplanned (min)</TableCell>
            <TableCell>
              {getShiftDowntimeUnplanned(shiftsId[0], downtimes)}
            </TableCell>
            <TableCell>
              {getShiftDowntimeUnplanned(shiftsId[1], downtimes)}
            </TableCell>
            <TableCell>
              {getShiftDowntimeUnplanned(shiftsId[2], downtimes)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Availability (%)</TableCell>
            <TableCell>
              {getShiftAvailability(shiftsId[0], downtimes)}
            </TableCell>
            <TableCell>
              {getShiftAvailability(shiftsId[1], downtimes)}
            </TableCell>
            <TableCell>
              {getShiftAvailability(shiftsId[2], downtimes)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Performance (%)</TableCell>
            <TableCell>{getShiftPerformance(shiftsId[0], shifts)}</TableCell>
            <TableCell>{getShiftPerformance(shiftsId[1], shifts)}</TableCell>
            <TableCell>{getShiftPerformance(shiftsId[2], shifts)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Quality (%)</TableCell>
            <TableCell>{getShiftQuality(shiftsId[0], shifts)}</TableCell>
            <TableCell>{getShiftQuality(shiftsId[1], shifts)}</TableCell>
            <TableCell>{getShiftQuality(shiftsId[2], shifts)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Efficiency (%)</TableCell>
            <TableCell
              className={highlight(
                getTotalEfficiency(shiftsId[0], shifts, downtimes),
              )}
            >
              {getTotalEfficiency(shiftsId[0], shifts, downtimes)}
            </TableCell>
            <TableCell
              className={highlight(
                getTotalEfficiency(shiftsId[1], shifts, downtimes),
              )}
            >
              {getTotalEfficiency(shiftsId[1], shifts, downtimes)}
            </TableCell>
            <TableCell
              className={highlight(
                getTotalEfficiency(shiftsId[2], shifts, downtimes),
              )}
            >
              {getTotalEfficiency(shiftsId[2], shifts, downtimes)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
