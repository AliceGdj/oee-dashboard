import productionData from "@/api/production-data.json";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCalculation } from "@/hooks/useCalculation";

export default function EfficiencyDowntime() {
  const { getMainDowntimes } = useCalculation();
  const data = getMainDowntimes(productionData.downtimeEvents);
  const mapShiftNameById = Object.fromEntries(
    productionData.shifts.map((shift) => [shift.id, shift.name]),
  );

  return (
    <>
      <h2>Efficiency Downtime</h2>
      <Table>
        <TableCaption>Top 3 downtime reasons with duration</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Shift</TableHead>
            <TableHead>Reason</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.durationMinutes}</TableCell>
              <TableCell>{mapShiftNameById[item.shiftId]}</TableCell>
              <TableCell>{item.reason}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
