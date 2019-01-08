import * as s from '../../../../../core/models/sharedModels';
import { GridOptions } from '../../../../../core/components/grid/grid.models';

export interface UsersManagementViewModel {
    tileCounts: TileCount;
    usersGridData: GridData;
    selectedUsers: Array<s.UserDetails>;
    isUsersGridCollapsed: boolean;
    datasource: any;
    displayedColumns: Array<string>;
    selectedUser: s.UserDetails;
    availableGroups: Array<s.DropdownModel<number>>;
    selectedGroup: s.DropdownModel<number>;
    showUsersList: boolean;
    isUserDetailsGridCollapsed: boolean;
    selectedFilter: UserFilter;
    usersGrid: GridOptions;
}
export interface GridData{
    columns: Array<any>;
    rows: Array<s.UserDetails>;
}
export interface TileCount{
    lockedOutCount: number;
    neverLoggedCount: number;
    loggedLastMonthCount: number;
    loggedInCount: number;
}
export interface FilterUserInput{
    userFilter: UserFilter;
}

export interface TileCount{
    lockedOutCount: number;
    neverLoggedCount: number;
    loggedLastMonthCount: number;
    loggedInCount: number;
}

export interface UserFilterInput{
    filter: UserFilter;
}

export enum UserFilter {
    LockedOut = 0,
    NeverLoggedIn = 1,
    LoggedInLastMonth = 2,
    LoggedIn = 3
}
