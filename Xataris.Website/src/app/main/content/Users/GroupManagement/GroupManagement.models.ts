import { DropdownModel } from '../../../../core/models/sharedModels';
import { GridOptions } from '../../../../core/components/grid/grid.models';

export interface GroupManagementViewModel {
  isGroupListCollapsed: boolean;
  showDetailsPanel: boolean;
  selectedRows: Array<number>;
  isGroupDetailCollapsed: boolean;
  selectedGroup: GroupDetail<string>;
  availableModules: Array<DropdownModel<number>>;
  selectedModules: Array<DropdownModel<number>>;
  accessLevel: Array<any>;
  groupDetail: GroupDetail<Array<DropdownModel<number>>>;
  availableAccess: Array<DropdownModel<number>>;
  groupsGrid: GridOptions;
}

export interface GroupDetail<T> {
  title: string;
  description: string;
  modules: T;
  accessLevel: {};
  id: number;
}

export interface SaveGroupInput {
  id: number;
  title: string;
  description: string;
  modules: Array<DropdownModel<number>>;
  access: DropdownModel<number>;
}
