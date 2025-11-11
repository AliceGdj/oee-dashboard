export interface ApiResponseType {
  productionLine: ProductionLine;
  shifts: Shift[];
  downtimeEvents: DowntimeEvent[];
  previousPeriod: PreviousPeriod;
  metadata: Metadata;
}

export interface DowntimeEvent {
  id: string;
  shiftId: string;
  category: string;
  reason: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  type: string;
}

export interface Metadata {
  site: string;
  department: string;
  reportDate: string;
  worldClassOEETarget: number;
  minimumAcceptableOEE: number;
}

export interface PreviousPeriod {
  description: string;
  totalOEE: number;
  availability: number;
  performance: number;
  quality: number;
}

export interface ProductionLine {
  id: string;
  name: string;
  targetCycleTime: number;
  description: string;
}

export interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  plannedProductionTime: number;
  targetQuantity: number;
  actualQuantity: number;
  goodQuantity: number;
  defectQuantity: number;
}
