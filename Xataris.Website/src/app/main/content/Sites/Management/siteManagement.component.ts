import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../core/animations';
import { locale as en } from './i18n/en';
import { locale as af } from './i18n/af';
import { GridOptions, ColumnDef, ColumnType } from '../../../../core/components/grid/grid.models';
import { MatDialog } from '@angular/material';
import * as m from './siteManagement.models';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import * as _ from 'lodash';
import { MapModalComponent } from './map-modal/map-modal.component';

@Component({
    selector: 'fuse-site-management',
    templateUrl: './siteManagement.component.html',
    styleUrls: ['./siteManagement.component.scss'],
    animations: fuseAnimations
})
export class SiteManagementComponent implements OnInit {
    data: m.SiteManagementViewModel;

    constructor(
        private translationLoader: FuseTranslationLoaderService,
        private apiService: ApiService,
        private router: Router,
        private dialogService: MatDialog
    ) { }

    public ngOnInit() {
        this.setupVariables().then(this.load);
    }

    private load = async () => {
        const res = await this.apiService.post('Site/GetSites', {});
        this.data.siteGrid.api.setRowData(_.map(res, (x) => {
             return <m.Site>{
                id: x.id,
                name: x.name,
                abbr: x.abbr,
                address: x.address,
                latLng: x.latLng
            };
        }));
        this.data.loader = false;
    }

    private setupVariables = async () => {
        this.data = {} as m.SiteManagementViewModel;
        this.translationLoader.loadTranslations(en, af);
        this.data.siteGrid = <GridOptions>{
            columnDefs: [
                <ColumnDef>{
                    title: '',
                    field: 'id',
                    columnType: ColumnType.checkbox
                },
                <ColumnDef>{
                    title: '',
                    field: 'latLng',
                    columnType: ColumnType.icon,
                    iconName: 'map',
                    onClick: this.openMap
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
                }
            ],
            rowData: []
        };
        this.data.loader = true;
    }

    public deleteSites() {
        this.data.loader = true;
        const input = {
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

    public goToDetails(add: boolean) {
        if (add) {
            localStorage.setItem('siteId', null);
        } else {
            const site = this.data.siteGrid.api.getSelectedRows()[0];
            localStorage.setItem('siteId', site.id);
        }
        this.router.navigate(['Sites/Details']);
    }

    public enableEdit = () => {
        if (this.data.siteGrid && this.data.siteGrid.api) {
            return this.data.siteGrid.api.getSelectedRows().length !== 1;
        } else {
            return false;
        }
    }

    public enableDelete = () => {
        if (this.data.siteGrid && this.data.siteGrid.api) {
            return this.data.siteGrid.api.getSelectedRows().length > 0;
        } else {
            return false;
        }
    }

    public openMap = (site: m.Site) => {
        this.data.dialogRef = this.dialogService.open(MapModalComponent, {
            disableClose: false
        });
        this.data.dialogRef.componentInstance.site = site;
    }
}
