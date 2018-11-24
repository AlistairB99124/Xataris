import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { HttpClient } from '@angular/common/http';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { fuseAnimations } from '../../../../core/animations';
import * as sharedModels from '../../../../core/models/sharedModels';
import { locale as english } from './i18n/en';
import { locale as afrikaans } from './i18n/af';
import { DropdownModel } from '../../../../core/models/sharedModels';
import { PTMManagementApiService } from './ptmmanagement.service';
import { MatTableDataSource, MatSnackBar, MatPaginator } from '@angular/material';
import { FuseConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog.component';
import * as domtoimage from 'dom-to-image';
import * as _ from 'lodash';
import * as jsPDF from 'jspdf';

@Component({
    selector: 'fuse-ptmmanagement',
    templateUrl: './ptmmanagement.component.html',
    styleUrls: ['./ptmmanagement.component.scss'],
    animations: fuseAnimations
})
export class PTMManagementComponent implements OnInit {
    
    data: PTMManagementViewModel;
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns = [
        'timesheetId',
        'code',
        'dateCreated',
        'status',
        'operatorTime',
        'assistantTime',
        'plumber',
        'site'
    ];
    constructor(
        private translationLoader: FuseTranslationLoaderService,
        private http: HttpClient,
        private pTMManagementApiService: PTMManagementApiService,
        public snackBar: MatSnackBar) {
        this.data = {} as PTMManagementViewModel;
        this.data.showToggleOff = true;
        this.data.showToggleOn = false;
        this.data.loader = false;
        this.data.confirmForm = false;
        this.translationLoader.loadTranslations(english, afrikaans);        
    }

    downloadGrid(){
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
                'Site',
                'Selected'
            ]
          };
        new Angular5Csv(this.dataSource.data, 'Timesheets', options);
    }

    downloadPdf(){
        for (let i = 0; i < this.dataSource.data.length; i++) {
            if (this.dataSource.data[i]['isSelected'] === true) {
                this.data.selectedTimesheet = <Timesheet>this.dataSource.data[i];
            }
        }
        this.data.confirmForm = true;
        this.data.loader = true;
            this.pTMManagementApiService.getTimesheetMaterials({ timesheetId: this.data.selectedTimesheet.timesheetId }).subscribe(res => {
                _.forEach(res.data.material, (x) => {
                    this.data.materials.push({
                        materialId: x.id,
                        code: x.stockCode,
                        description: x.stockDescription,
                        bomNumber: x.BOM_No,
                        quantity: x.quantity
                    });
                });
                _.forEach(res.data.nonMaterial, (x) => {
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
                        domtoimage.toPng(element).then((url) => {
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
            });      
    }

    deleteTimesheet(){
        const input = {
            timesheetId: _.find(this.dataSource.data, x => x.isSelected === true)
        };
        this.pTMManagementApiService.deleteTimesheet(input).subscribe(res => {
            if (res.data.errorMessage) {
                this.pTMManagementApiService.getTimesheets().subscribe(result => {
                    this.data.allTimesheets = result.data;
                    this.dataSource.data = this.data.allTimesheets;
                });
            }
        });
    }

    enableDelete = () => _.filter(this.dataSource.data, x => x.isSelected === true).length === 1;

    showDetails(show: boolean){
        if (show) {
            this.data.showToggleOff = false;
            this.data.showToggleOn = true;
            this.displayedColumns = [
                'timesheetId',
                'code',
                'dateCreated',
                'specificLocation',
                'detailedPoint',
                'status',
                'description',
                'operatorTime',
                'assistantTime',
                'originalQuote',
                'quoteNo',
                'siNumber',
                'plumber',
                'site'
            ];
        } else {
            this.data.showToggleOff = true;
            this.data.showToggleOn = false;
            this.displayedColumns = [
                'timesheetId',
                'code',
                'dateCreated',
                'status',
                'operatorTime',
                'assistantTime',
                'plumber',
                'site'
            ];
        }
    }

    ngOnInit()
    {
        this.data.loader = true;
        this.pTMManagementApiService.getTimesheets().subscribe(res => {
            _.forEach(res.data, x => {
                const d = new Date(x.dateCreated);
                x.dateCreated = d.toDateString();
            });
            this.data.allTimesheets = res.data;
            this.dataSource.data = this.data.allTimesheets;
            this.dataSource.paginator = this.paginator;
            this.data.materials = [];
            this.data.loader = false;
        });
    }
    
}

export interface PTMManagementViewModel {
    allTimesheets: Array<Timesheet>;
    confirmForm: boolean;
    loader: boolean;
    selectedTimesheet: Timesheet;
    selectedTimesheets: Array<Timesheet>;
    materials: Array<Material>;
    showToggleOn: boolean;
    showToggleOff: boolean;
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
export interface Material{
    materialId: number;
    code: string;
    description: string;
    bomNumber: string;
    quantity: number | string;
}
