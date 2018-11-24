import { Component, ViewChild, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../core/animations';
import * as sharedModels from '../../../../core/models/sharedModels';
import { locale as english } from './i18n/en';
import { locale as afrikaans } from './i18n/af';
import { DropdownModel, GridOptions, ColumnDef, ColumnType } from '../../../../core/models/sharedModels';
import * as m from './siteManagement.models';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import * as _ from 'lodash';

@Component({
    selector: 'fuse-site-management',
    templateUrl: './siteManagement.component.html',
    styleUrls: ['./siteManagement.component.scss'],
    animations: fuseAnimations
})
export class SiteManagementComponent {
    data: m.SiteManagementViewModel;
    
    constructor(
        private translationLoader: FuseTranslationLoaderService,
        private apiService: ApiService,
        private router: Router
        ) {
            this.data = {} as m.SiteManagementViewModel;
            this.data.siteGrid = <GridOptions>{
                columnDefs:[
                    <ColumnDef>{
                        title: '',
                        field: 'id',
                        columnType: ColumnType.checkbox
                    },
                    <ColumnDef>{
                        title: 'Name',
                        field: 'name',
                        columnType: ColumnType.text
                    },
                    <ColumnDef>{
                        title: 'Abbr',
                        field: 'abbr',
                        columnType: ColumnType.text
                    },
                    <ColumnDef>{
                        title: 'Address',
                        field: 'address',
                        columnType: ColumnType.text
                    },
                ],
                rowData: []
            }
            this.data.loader = true;
            this.apiService.post('Site/GetSites', {}).then(res => {
                this.data.siteGrid.api.setRowData(_.map(res, (x) => {
                    return <m.Site>{
                        id: x.id,
                        name: x.name,
                        abbr: x.abbr,
                        address: x.address
                    };
                }));
                this.data.loader = false;
            });
    }

    deleteSites(){
        this.data.loader = true;
        const input = {
            gUID: localStorage.getItem('userId'),
            ids: _.map(this.data.siteGrid.api.getSelectedRows(), o => o.id.toString())
        };
        this.apiService.post('Site/DeleteSites', input).then((res) => {
            if (res.isSuccess) {
                this.apiService.post('Site/GetSites', {}).then(result => {
                    this.data.siteGrid.api.setRowData(_.map(result, (x) => <m.Site>{
                            id: x.id,
                            name: x.name,
                            abbr: x.abbr,
                            address: x.address,
                            isSelected: false
                        }));
                    this.data.loader = false;
                });
            } else {
                this.data.loader = false;
            }
        });
    }

    goToDetails(){
        const site = this.data.siteGrid.api.getSelectedRows()[0];
        if (site) {
            localStorage.setItem('siteId', site.id);
        } else {
            localStorage.setItem('siteId', null);
        }
        this.router.navigate(['Sites/Details']);
    }

    enableEdit = () => {
        if (this.data.siteGrid && this.data.siteGrid.api) {
            return this.data.siteGrid.api.getSelectedRows().length !== 1;
        } else {
            return false;
        }
    };
}

