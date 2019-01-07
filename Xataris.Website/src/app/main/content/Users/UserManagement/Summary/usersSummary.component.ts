import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../../core/animations';
import { MatSnackBar } from '@angular/material';
import { locale as en } from './i18n/en';
import { locale as af } from './i18n/af';
import * as s from '../../../../../core/models/sharedModels';
import { ApiService } from '../../../../services/api.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import {
    UserFilter,
    UserFilterInput,
    UsersManagementViewModel,
    TileCount
} from './usersSummary.models';
import * as _ from 'lodash';
import { FuseConfirmDialogComponent } from '../../../../../core/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'fuse-user-summary',
    templateUrl: './usersSummary.component.html',
    styleUrls: ['./usersSummary.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class UsersSummaryComponent implements OnInit {
    data;
    isEditUser;
    dateNow = Date.now();
    loader: boolean;
    dialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        private translationLoader: FuseTranslationLoaderService,
        private apiService: ApiService,
        public snackBar: MatSnackBar,
        public dialog: MatDialog) { }

    public ngOnInit() {
        this.setupVariables().then(this.load);
    }

    private getGroups = async () => {
        const result = await this.apiService.post('User/GetGroups');
        this.data.availableGroups = _.map(result, (x) => {
            return <s.DropdownModel<number>>{
                text: x.title,
                value: x.id,
                selected: false
            };
        });
    }

    private getWarehouses = async () => {
        this.data.availableWarehouses = await this.apiService.post('User/GetWarehouses');
    }

    private load = async () => {
        Promise.all([
            this.getTileCounts(),
            this.getGroups(),
            this.getWarehouses(),
        ]).then(() => {
            setTimeout(() => {
                this.onTileClick(this.data.selectedFilter).then(() => this.loader = false);
            }, 900);
        });
    }

    private setupVariables = async () => {
        this.loader = true;
        this.translationLoader.loadTranslations(en, af);
        this.data = {} as UsersManagementViewModel;
        this.data.usersGrid = <s.GridOptions>{
            columnDefs: [
                <s.ColumnDef>{
                    field: 'id',
                    title: '',
                    columnType: s.ColumnType.checkbox
                },
                <s.ColumnDef>{
                    field: 'firstName',
                    title: 'First Name',
                    columnType: s.ColumnType.text
                },
                <s.ColumnDef>{
                    field: 'lastName',
                    title: 'Last Name',
                    columnType: s.ColumnType.text
                },
                <s.ColumnDef>{
                    field: 'dateRegistered',
                    title: 'dateRegistered',
                    columnType: s.ColumnType.date,
                    currencySymbol: 'R'
                },
                <s.ColumnDef>{
                    field: 'email',
                    title: 'Email',
                    columnType: s.ColumnType.text
                },
            ],
            rowData: []
        };
        this.data.filterText = 'Logged In Users';
        this.data.selectedFilter = UserFilter.LoggedIn;
        this.data.selectedUsers = [];
        this.data.showUsersList = false;
        this.data.isUserDetailsGridCollapsed = true;
        this.data.tileCounts = <TileCount>{
            lockedOutCount: 0,
            neverLoggedCount: 0,
            loggedLastMonthCount: 0,
            loggedInCount: 0
        };
        this.data.warehouseSelected = {} as s.DropdownModel<number>;
        this.isEditUser = false;
        this.data.selectedUser = {} as s.UserDetails;
    }

    onTileClick = async (userFilter: UserFilter) => {
        const input = <UserFilterInput>{
            filter: userFilter
        };
        this.data.selectedFilter = userFilter;
        switch (this.data.selectedFilter) {
            case UserFilter.LockedOut:
                this.data.filterText = 'Locked Out';
            break;
            case UserFilter.NeverLoggedIn:
                this.data.filterText = 'Never Logged In';
            break;
            case UserFilter.LoggedInLastMonth:
                this.data.filterText = 'Logged in the Last Month';
            break;
            case UserFilter.LoggedIn:
                this.data.filterText = 'Logged In Users';
            break;
        }

        const res = await this.apiService.post('User/GetUserByStatus', input);
        if (res) {
            this.data.showUsersList = true;
            this.data.usersGridData = res;
            this.data.isUsersGridCollapsed = false;
            this.data.usersGrid.api.setRowData(this.data.usersGridData);
        } else {
            this.data.usersGridData = [];
            this.data.usersGrid.api.setRowData(this.data.usersGridData);
        }
    }


    public addNewUser() {
        this.isEditUser = true;
        this.data.isUsersGridCollapsed = true;
        this.data.isUserDetailsGridCollapsed = false;
    }

    public isEditButtonDisabled() {
        return this.data.usersGrid.api.getSelectedRows().length === 1;
    }

    public saveUser = async () => {
        this.loader = true;
        const start = this.data.selectedUser.employmentStartDate;
        const end = this.data.selectedUser.employmentEndDate;
        const startDate = new Date(Date.UTC(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0));
        let endDate = new Date();
        if (this.data.selectedUser.employmentEndDate) {
            endDate = new Date(Date.UTC(end.getFullYear(), end.getMonth(), end.getDate(), 0, 0, 0));
        }
        const input = {
            id: this.data.selectedUser.id,
            firstName: this.data.selectedUser.firstName,
            lastName: this.data.selectedUser.lastName,
            email: this.data.selectedUser.email,
            groupId: this.data.selectedUser.group.value,
            password: this.data.selectedUser.password ? this.data.selectedUser.password : '',
            ptmEnabled: this.data.selectedUser.ptmEnabled,
            employmentStartDate: startDate,
            employmentEndDate: endDate
        };
        const res = await this.apiService.post('User/SaveUser', input);
        if (res.isSuccess) {
            if (this.data.selectedUser.id) {
                this.snackBar.open('User Updated Successfully', '', {
                    duration: 2000,
                });

            } else {
                this.snackBar.open('User Added Successfully', '', {
                    duration: 2000,
                });
            }
            this.data.selectedUser = {} as s.UserDetails;
            this.isEditUser = false;
            this.data.isUsersGridCollapsed = false;
            this.loader = false;
            await this.onTileClick(this.data.selectedFilter);
            await this.getTileCounts();
        } else {
            this.snackBar.open('There was a problem adding the user', '', {
                duration: 2000,
            });
        }
    }

    async deleteUser() {
        this.dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.dialogRef.componentInstance.confirmMessage = 'Warning! You will be deleting all Warehouses, Inventory and Timesheets associated with this User';

        const result = await this.dialogRef.afterClosed().toPromise();
        if (result) {
            const input = {
                email: (<any>_.first(this.data.usersGrid.api.getSelectedRows())).email
            };
            const res = await this.apiService.post('User/DeleteUser', input);
            if (res.data.isSuccess) {
                await this.getTileCounts();
                await this.onTileClick(this.data.selectedFilter);
                this.snackBar.open('User Deleted Successfully', '', {
                    duration: 2000
                });
            } else {
                this.snackBar.open('User Was Not Deleted', '', {
                    duration: 2000
                });
            }
        }
        this.dialogRef = null;
    }

    async editUser() {
        this.isEditUser = true;
        this.data.isUsersGridCollapsed = true;
        this.data.isUserDetailsGridCollapsed = false;
        this.loader = true;
        const input = {
            email: (<any>_.first(this.data.usersGrid.api.getSelectedRows())).email
        };
        const res = await this.apiService.post('User/GetUser', input);
        this.data.selectedUser = res;
        this.data.selectedUser.group = _.find(this.data.availableGroups, (x) => x.value === this.data.selectedUser.groupId);

    }

    async getTileCounts() {
        this.loader = true;
        const res = await this.apiService.post('User/GetUserManagementCounts');
        if (res) {
            this.data.tileCounts = res;
        }
        this.loader = false;
    }
}
