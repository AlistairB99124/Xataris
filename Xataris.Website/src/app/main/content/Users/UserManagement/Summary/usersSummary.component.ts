import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { FuseTranslationLoaderService } from '../../../../../core/services/translation-loader.service';
import { HttpClient } from '@angular/common/http';
import { fuseAnimations } from '../../../../../core/animations';
import { MatSnackBar } from '@angular/material';
import { locale as english } from './i18n/en';
import { locale as afrikaans } from './i18n/af';
import * as s from '../../../../../core/models/sharedModels';
import { UsersApiService } from './usersSummary.service';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource, MatDialogRef, MatDialog } from '@angular/material';
import * as shape from 'd3-shape';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router, ActivatedRoute } from '@angular/router';
import { UserFilter, UserFilterInput } from './usersSummary.service';
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
    datasource;
    displayedColumns;
    dialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        private translationLoader: FuseTranslationLoaderService,
        private http: HttpClient,
        private usersApiService: UsersApiService,
        private router: Router,
        public snackBar: MatSnackBar,
        public dialog: MatDialog) {
        this.data = {} as UsersManagementViewModel;
        this.setupVariables();
    }

    ngOnInit = async () => {
        
    }

    setupVariables = async () => {
        this.datasource = new MatTableDataSource();
        this.displayedColumns = ['id', 'firstName', 'lastName', 'dateRegistered', 'email'];
        this.data.selectedUsers = [];
        this.data.showUsersList = false;
        this.data.isUserDetailsGridCollapsed = true;
        this.data.tileCounts = <TileCount>{
            lockedOutCount: 0,
            neverLoggedCount: 0,
            loggedLastMonthCount: 0,
            loggedInCount: 0
        };
        await this.getTileCounts();
        this.isEditUser = false;
        this.translationLoader.loadTranslations(english, afrikaans);
        this.data.selectedUser = {} as s.UserDetails;
        this.loader = true;
        const result = await this.usersApiService.getGroups();
        const groups = _.map(result.data, (x) => {
            return <s.DropdownModel<number>>{
                text: x.title,
                value: x.id,
                selected: false
            };
        });
        this.data.availableGroups = groups;
        this.loader = false;
        const res = await this.usersApiService.getWarehouses();
            this.data.availableWarehouses = res['data'];
            this.data.warehouseSelected = {} as s.DropdownModel<number>;
    }

    onTileClick = async (userFilter: UserFilter) => {
        const input = <UserFilterInput>{
            filter: userFilter
        };
        this.data.selectedFilter = userFilter;
        const res = await this.usersApiService.getUserByStatus(input);
            if (res['data']) {
                this.data.showUsersList = true;
                this.data.usersGridData = res['data'];
                this.data.isUsersGridCollapsed = false;
                this.datasource.data = _.map(this.data.usersGridData, (x) => {
                    return {
                        isSelected: false,
                        firstName: x.firstName,
                        lastName: x.lastName,
                        dateRegistered: new Date(x.dateRegistered).toDateString(),
                        email: x.email
                    }
                });
            } else {
                this.data.usersGridData = [];
                this.datasource.data = this.data.usersGridData;
            }  
    }


    async addNewUser(){
        this.isEditUser = true;
        this.data.isUsersGridCollapsed = true;
        this.data.isUserDetailsGridCollapsed = false;
    }

    async isEditButtonDisabled(){
        return _.filter(this.datasource.data, (x) => x.isSelected === true).length === 1;
    }

    async saveUser(){
        this.loader = true;
        const start = this.data.selectedUser.employmentStartDate;
        const end = this.data.selectedUser.employmentEndDate;
        const startDate = new Date(Date.UTC(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0 , 0));
        let endDate = new Date();
        if (this.data.selectedUser.employmentEndDate) {
            endDate = new Date(Date.UTC(end.getFullYear(), end.getMonth(), end.getDate(), 0, 0 , 0));
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
        const res = await this.usersApiService.saveUser(input);
            if (res.data.isSuccess) {
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
                email: _.find(this.datasource.data, x => x.isSelected === true).email
            };
            const res = await this.usersApiService.deleteUser(input);
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

    async editUser(){
        this.isEditUser = true;
        this.data.isUsersGridCollapsed = true;
        this.data.isUserDetailsGridCollapsed = false;
        this.loader = true;
        const input = {
            email: _.find(this.datasource.data, (x) => x.isSelected === true).email
        };
        const res = await this.usersApiService.getUser(input);
            this.data.selectedUser = res['data'];
            this.data.selectedUser.group = _.find(this.data.availableGroups, (x) => x.value === this.data.selectedUser.groupId);
        
    }

    async getTileCounts(){
        this.loader = true;
        const res = await this.usersApiService.getUserManagementCounts();
            if (res.data) {
                this.data.tileCounts = res.data;
            }
            this.loader = false;
    }
}
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
