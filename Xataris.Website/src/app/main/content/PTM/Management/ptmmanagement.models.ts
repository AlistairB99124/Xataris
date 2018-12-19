import { GridOptions } from '../../../../core/models/sharedModels';

export interface PTMManagementViewModel {
  allTimesheets: Array<Timesheet>;
  confirmForm: boolean;
  loader: boolean;
  selectedTimesheet: Timesheet;
  selectedTimesheets: Array<Timesheet>;
  materials: Array<Material>;
  showToggleOn: boolean;
  showToggleOff: boolean;
  timesheetsGrid: GridOptions;
  showMore: boolean;
}

export interface Timesheet {
  code: string;
  dateCreated: string;
  specificLocation: string;
  detailedPoint: string;
  status: string;
  description: string;
  operatorTime: any;
  assistantTime: any;
  originalQuote: boolean;
  quoteNo: string;
  siNumber: string;
  plumber: string;
  site: number;
  materials: Array<any>;
  nonMaterials: Array<any>;
  timesheetId: number;
  isSelected: boolean;
}
export interface Material {
  materialId: number;
  code: string;
  description: string;
  bomNumber: string;
  quantity: number | string;
}
