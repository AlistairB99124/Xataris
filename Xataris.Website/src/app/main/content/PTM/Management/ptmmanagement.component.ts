import { Component, OnInit, Inject, ElementRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { fuseAnimations } from '../../../../core/animations';
import { locale as english } from './i18n/en';
import { locale as afrikaans } from './i18n/af';
import {
  GridOptions,
  ColumnDef,
  ColumnType
} from '../../../../core/models/sharedModels';
import { ApiService } from '../../../services/api.service';
import { MatSnackBar } from '@angular/material';
import * as domtoimage from 'dom-to-image';
import * as _ from 'lodash';
import * as jsPDF from 'jspdf';
import { PTMManagementViewModel, Timesheet } from './ptmmanagement.models';

@Component({
    selector: 'fuse-ptmmanagement',
    templateUrl: './ptmmanagement.component.html',
    styleUrls: ['./ptmmanagement.component.scss'],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.Emulated,
})
export class PTMManagementComponent {

    data: PTMManagementViewModel;

    constructor(
        private translationLoader: FuseTranslationLoaderService,
        private apiService: ApiService,
        public snackBar: MatSnackBar) {
        Promise.all([this.setupVariables()]);
    }

    private setupVariables = async () => {
        this.data = {} as PTMManagementViewModel;
        this.data.isDetailCollapsed = false;
        this.data.detailTitle = '';
        this.data.isSummaryCollapsed = false;
        this.data.isDetailShown = false;
        this.data.showMore = false;
        this.data.showToggleOff = true;
        this.data.showToggleOn = false;
        this.data.loader = false;
        this.data.confirmForm = false;
        this.translationLoader.loadTranslations(english, afrikaans);
        this.data.loader = true;

        this.data.timesheetsGrid = <GridOptions>{
            columnDefs: await this.setAllColumns(),
            rowData: [],
            api: {} as any,
            onReady: this.loadPage
        };
        this.data.materialDetailGrid = <GridOptions>{
            columnDefs: await this.setMaterialColumns(),
            rowData: [],
            api: {} as any,
            onReady: this.loadPage
        };
    }

    private setMaterialColumns = async (): Promise<Array<ColumnDef>> => {
        return [
            <ColumnDef>{
                title: 'BOM No',
                field: 'bom',
                columnType: ColumnType.text
            },
            <ColumnDef>{
                title: 'Code',
                field: 'code',
                columnType: ColumnType.text
            },
            <ColumnDef>{
                title: 'Description',
                field: 'description',
                columnType: ColumnType.text
            },
            <ColumnDef>{
                title: 'Quantity',
                field: 'quantity',
                columnType: ColumnType.text
            }
        ];
    }

    private setAllColumns = async (): Promise<Array<ColumnDef>> => {
        return [
            <ColumnDef>{
                title: '',
                field: 'timesheetId',
                columnType: ColumnType.checkbox
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.CODE'),
                field: 'code',
                columnType: ColumnType.text
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.DATE'),
                field: 'dateCreated',
                columnType: ColumnType.date
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.SPECIFICLOCATION'),
                field: 'specificLocation',
                columnType: ColumnType.text
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.DETAILEDPOINT'),
                field: 'detailedPoint',
                columnType: ColumnType.text
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.SHEETSTATUS'),
                field: 'status',
                columnType: ColumnType.text
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.DESCRIPTION'),
                field: 'description',
                columnType: ColumnType.text
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.PLUMBERTIME'),
                field: 'operatorTime',
                columnType: ColumnType.text
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.ASSISTANTTIME'),
                field: 'assistantTime',
                columnType: ColumnType.text
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.ORIGINALQUOTE'),
                field: 'originalQuote',
                columnType: ColumnType.boolean
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.QUOTENO'),
                field: 'quoteNo',
                columnType: ColumnType.text
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.SINO'),
                field: 'siNumber',
                columnType: ColumnType.text
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.PLUMBER'),
                field: 'plumber',
                columnType: ColumnType.text
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.SITE'),
                field: 'site',
                columnType: ColumnType.text
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.MATERIALS'),
                field: 'materials',
                columnType: ColumnType.icon,
                onClick: this.openMaterials
            }
        ];
    }

    private setLimitedColumns = async (): Promise<Array<ColumnDef>> => {
        return [
            <ColumnDef>{
                title: '',
                field: 'timesheetId',
                columnType: ColumnType.checkbox
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.CODE'),
                field: 'code',
                columnType: ColumnType.text
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.DATE'),
                field: 'dateCreated',
                columnType: ColumnType.date
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.SHEETSTATUS'),
                field: 'status',
                columnType: ColumnType.text
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.PLUMBERTIME'),
                field: 'operatorTime',
                columnType: ColumnType.text
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.ASSISTANTTIME'),
                field: 'assistantTime',
                columnType: ColumnType.text
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.ORIGINALQUOTE'),
                field: 'originalQuote',
                columnType: ColumnType.boolean
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.PLUMBER'),
                field: 'plumber',
                columnType: ColumnType.text
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.SITE'),
                field: 'site',
                columnType: ColumnType.text
            },
            <ColumnDef>{
                title: await this.translationLoader.getTranslation('PTMMANAGEMENT.MATERIALS'),
                field: 'materials',
                columnType: ColumnType.icon,
                onClick: this.openMaterials
            }
        ];
    }

    public openMaterials = async (params) => {
        this.data.detailTitle = params.code;
        this.data.isSummaryCollapsed = true;
        this.data.isDetailShown = true;
        const result = await this.apiService.post('Timesheet/GetMaterialsByTimesheet', params.timesheetId);
        const mats = _.map(result[0].materials, (x) => {
            return {
                bom: x.boM_No,
                code: x.stockCode,
                description: x.stockDescription,
                quantity: x.quantity.toString(),
            };
        });
        const non = _.map(result[0].nonMaterials, (x) => {
            return {
                bom: x.boM_No,
                code: '',
                description: x.description,
                quantity: x.metric,
            };
        });
        this.data.materialDetailGrid.api.setRowData(mats.concat(non));
    }

    private loadPage = async (): Promise<any> => {
        const columns = await this.setLimitedColumns();
        this.data.timesheetsGrid.api.setColumnDefs(columns);
        return this.apiService
        .post('Timesheet/GetTimesheets')
        .then(timesheets => {
            this.data.allTimesheets = _.map(timesheets, (x) => {
                x.status = x.status === 0 ? 'Chasing' : x.status === 1 ? 'First Fix' : x.status === 2 ? 'Second Fix' : 'Final Fix';
                return x;
            });
            this.data.timesheetsGrid.api.setRowData(this.data.allTimesheets);
            this.data.materials = [];
            this.data.loader = false;
        });
    }

    downloadGrid() {
        const options = {
            decimalseparator: '.',
            showLabels: true,
            showTitle: false,
            useBom: true,
            noDownload: false,
            headers: [
                'ID',
                'Code',
                'Date',
                'Specific Location',
                'Detailed Point',
                'Sheet Status',
                'Description',
                'Plumber Time',
                'Assistant Time',
                'Original Quote',
                'Quote No.',
                'SI No',
                'Plumber',
                'Site'
            ]
        };
        _.forEach(this.data.timesheetsGrid.getRowData(), (x: Timesheet) => {
            x.dateCreated = new Date(x.dateCreated).toDateString();
        });
        new Angular5Csv(this.data.timesheetsGrid.getRowData(), 'Timesheets', options);
    }

    public downloadPdf = async () => {
        this.data.selectedTimesheet = this.data.timesheetsGrid.api.getSelectedRows()[0];
        this.data.confirmForm = true;
        this.data.loader = true;
        const data = await this.apiService
            .post('Timesheet/GetTimesheetMaterials', {
                timesheetId: this.data.selectedTimesheet.timesheetId
            });
        _.forEach(data.material, x => {
            this.data.materials.push({
                materialId: x.id,
                code: x.stockCode,
                description: x.stockDescription,
                bomNumber: x.BOM_No,
                quantity: x.quantity
            });
        });
        _.forEach(data.nonMaterial, x => {
            this.data.materials.push({
                materialId: x.id,
                code: '',
                description: x.description,
                bomNumber: x.bOM_NO,
                quantity: x.metric
            });
        });
        setTimeout(() => {
            const self = this;
            const element = document.getElementById('formImage');
            if (element) {
                (domtoimage as any).toPng(element).then(url => {
                    const doc = new jsPDF();
                    const img = new Image();
                    img.src = url;
                    img.crossOrigin = 'Anonymous';
                    const persist = () => {
                        doc.save(this.data.selectedTimesheet.code + '.pdf');
                        this.data.confirmForm = false;
                        this.data.loader = false;
                    };
                    img.onload = function () {
                        doc.addImage(this, 0, 0, 210, 297);
                        persist();
                    };
                });
            } else {
                self.data.confirmForm = false;
                self.data.loader = false;
            }
        }, 5000);
    }

    public deleteTimesheet = async () => {
        const input = {
            timesheetId: this.data.timesheetsGrid.api.getSelectedRows()
        };
        const result = await this.apiService
            .post('Timesheet/DeleteTimesheet', input);
        if (result.errorMessage) {
            const timesheets = await this.apiService.post('Timesheet/GetTimesheets');
            this.data.allTimesheets = timesheets;
            this.data.timesheetsGrid.api.setRowData(this.data.allTimesheets);
        }
    }

    enableDelete = () => {
        if (this.data.timesheetsGrid.api.getSelectedRows) {
            return this.data.timesheetsGrid.api.getSelectedRows().length === 1;
        } else {
            return false;
        }
    }

    checkStatus = async (): Promise<void> => {
        if (this.data.showMore) {
            const columns = await this.setAllColumns();
            this.data.timesheetsGrid.api.setColumnDefs(columns);
        } else {
            const columns = await this.setLimitedColumns();
            this.data.timesheetsGrid.api.setColumnDefs(columns);
        }
    }
}
