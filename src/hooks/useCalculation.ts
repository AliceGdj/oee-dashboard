import { percentToDecimal } from "@/lib/utils";
import type { DowntimeEvent, Shift } from "@/types";

export function useCalculation() {
  function getShiftDowntime(shiftId: string, downtimeEvents: DowntimeEvent[]) {
    return downtimeEvents
      .filter((event: DowntimeEvent) => event.shiftId === shiftId)
      .reduce(
        (sum: number, event: DowntimeEvent) => sum + event.durationMinutes,
        0,
      );
  }
  function getShiftDowntimePlanned(
    shiftId: string,
    downtimeEvents: DowntimeEvent[],
  ) {
    return downtimeEvents
      .filter((event: DowntimeEvent) => event.shiftId === shiftId)
      .filter((event: DowntimeEvent) => event.type === "planned")
      .reduce(
        (sum: number, event: DowntimeEvent) => sum + event.durationMinutes,
        0,
      );
  }
  function getShiftDowntimeUnplanned(
    shiftId: string,
    downtimeEvents: DowntimeEvent[],
  ) {
    return downtimeEvents
      .filter((event: DowntimeEvent) => event.shiftId === shiftId)
      .filter((event: DowntimeEvent) => event.type === "unplanned")
      .reduce(
        (sum: number, event: DowntimeEvent) => sum + event.durationMinutes,
        0,
      );
  }
  function getShiftAvailability(
    shiftId: string,
    downtimeEvents: DowntimeEvent[],
  ) {
    const shiftDowntime = getShiftDowntime(shiftId, downtimeEvents);
    return (((480 - shiftDowntime) / 480) * 100).toFixed(2);
  }
  function getShiftPerformance(shiftId: string, shifts: Shift[]) {
    const data = shifts.filter((shift) => shift.id === shiftId);
    return ((data[0].actualQuantity / data[0].targetQuantity) * 100).toFixed(2);
  }
  function getShiftQuality(shiftId: string, shifts: Shift[]) {
    const data = shifts.filter((shift) => shift.id === shiftId);
    return (
      ((data[0].actualQuantity - data[0].defectQuantity) /
        data[0].actualQuantity) *
      100
    ).toFixed(2);
  }
  function getTotalEfficiency(
    shiftId: string,
    shifts: Shift[],
    downtime: DowntimeEvent[],
  ) {
    const availability = percentToDecimal(
      getShiftAvailability(shiftId, downtime),
    );
    const performance = percentToDecimal(getShiftPerformance(shiftId, shifts));
    const quality = percentToDecimal(getShiftQuality(shiftId, shifts));
    return (((availability + performance + quality) / 3) * 100).toFixed(2);
  }
  function getMonthlyEfficiency(shifts: Shift[], downtime: DowntimeEvent[]) {
    const shiftsId: string[] = shifts.map((el) => el.id);
    const monthlyEfficiency = shiftsId.map((el: string) =>
      getTotalEfficiency(el, shifts, downtime),
    );
    return (
      monthlyEfficiency.reduce(
        (acc: number, currValue: string) => acc + Number(currValue),
        0,
      ) / 3
    );
  }
  function getMainDowntimes(downtime: DowntimeEvent[]) {
    return downtime
      .sort((a, b) => b.durationMinutes - a.durationMinutes)
      .slice(0, 3);
  }
  return {
    getShiftDowntime,
    getShiftDowntimePlanned,
    getShiftDowntimeUnplanned,
    getShiftAvailability,
    getShiftPerformance,
    getShiftQuality,
    getTotalEfficiency,
    getMonthlyEfficiency,
    getMainDowntimes,
  };
}
