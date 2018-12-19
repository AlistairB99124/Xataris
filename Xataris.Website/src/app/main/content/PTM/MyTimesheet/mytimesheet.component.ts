import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../core/animations';
import { locale as en } from './i18n/en';
import { locale as af } from './i18n/af';
import { DropdownModel, GridOptions, ColumnDef } from '../../../../core/models/sharedModels';
import { MatDialog, MatSnackBar } from '@angular/material';
import { FuseConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog.component';
import * as _ from 'lodash';
import * as Models from './mytimesheet.models';
import { ColumnType } from '../../../../core/models/sharedModels';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'fuse-mytimesheet',
    templateUrl: './mytimesheet.component.html',
    styleUrls: ['./mytimesheet.component.scss'],
    animations: fuseAnimations
})
export class MyTimesheetComponent implements OnInit, OnDestroy {
    data: Models.TimesheetViewModel;
    @ViewChild('content') content: ElementRef;

    constructor(
        private translationLoader: FuseTranslationLoaderService,
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar) {
        Promise.all([
            this.setupVariables()
        ]).then(() => {
            this.loadPage();
        });
    }

    public ngOnInit = () => {
        // kjfd
    }

    private setupVariables = async () => {
        this.data = {} as Models.TimesheetViewModel;
        this.translationLoader.loadTranslations(en, af);
        this.data.gridOptions = <GridOptions>{
            columnDefs: [
                <ColumnDef>{
                    title: '',
                    field: 'id',
                    columnType: ColumnType.checkbox
                },
                <ColumnDef>{
                    title: await this.translationLoader.getTranslation('MYTIMESHEET.BOMNO'),
                    field: 'bomNo',
                    columnType: ColumnType.text
                },
                <ColumnDef>{
                    title: await this.translationLoader.getTranslation('MYTIMESHEET.CODE'),
                    field: 'stockCode',
                    columnType: ColumnType.text
                },
                <ColumnDef>{
                    title: await this.translationLoader.getTranslation('MYTIMESHEET.DESCRIPTION'),
                    field: 'stockDescription',
                    columnType: ColumnType.text
                },
                <ColumnDef>{
                    title: await this.translationLoader.getTranslation('MYTIMESHEET.QUANTITY'),
                    field: 'quantity',
                    columnType: ColumnType.numeric
                },
            ],
            rowData: [],
            api: {}
        };

        this.data.materials = [];

        this.data.loader = false;
        const dateNow = new Date();
        this.data.technician = '';
        this.data.date = dateNow.toLocaleDateString();
        this.data.confirmForm = false;
        this.data.searchInput = '';
        this.data.quoteEnabled = false;
        const today = new Date();
        this.data.todaysDate = today.toString();
        this.data.hoursAvailable = this.timeOptions().hours;
        this.data.minsAvailable = this.timeOptions().minutes;
        this.data.statusAvailable = this.getStatuses();
        this.data.form = this.formBuilder.group({
            specificLocation: [''],
            detailedPoint: [''],
            description: [''],
            quoteNumber: [''],
            siNumber: [''],
            secondaryMins: [0],
            secondaryHours: [0],
            primaryHours: [0],
            primaryMins: [0],
            primaryTechnician: [''],
            site: [''],
            status: [0]
        });

        this.data.materialForm = this.formBuilder.group({
            nonMaterial: [''],
            material: [''],
            quantity: [''],
            bomNo: ['']
        });

        this.data.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
    }

    private loadPage = async () => {
        this.data.operators = await this.apiService
            .post('Timesheet/GetUsers');
        this.data.sites = await this.apiService
            .post('Site/GetSiteNames');
    }

    private onFormValuesChanged = () => {
        for (const field in this.data.formErrors) {
            if (!this.data.formErrors.hasOwnProperty(field)) {
                continue;
            }
            this.data.formErrors[field] = {};
            const control = this.data.form.get(field);
            if (control && control.dirty && !control.valid) {
                this.data.formErrors[field] = control.errors;
            }
        }
    }

    public updateSite = () => {
        const site = _.find(this.data.sites, x => x.id === this.data.form.controls.site.value);
        this.data.siteName = site.name;
    }

    public openConfirmationMaterialDialog = (data) => {
        this.data.dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.data.dialogRef.componentInstance.confirmMessage = 'You have exceeded the available inventory. If you proceed, please submit an Order Form';

        this.data.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.data.materials.push(data);
                this.data.gridOptions.api.setRowData(this.data.materials);
                this.data.materialForm.reset();
            }
            this.data.dialogRef = null;
        });
    }

    public reloadMaterials = async () => {
        const input = {
            primaryTechnicianId: this.data.form.controls.primaryTechnician.value
        };
        const res = await this.apiService
            .post('Timesheet/GetMaterials', input);
        if (res) {
            this.data.materialsAvailable = res;
            this.data.filterMaterials = this.data.materialsAvailable;
            this.data.loader = false;
        } else {
            this.data.materialsAvailable = [];
            this.data.filterMaterials = this.data.materialsAvailable;
        }
    }


    public saveTimesheet = async () => {
        const input = _.cloneDeep(this.data.form.value);
        input['originalQuote'] = this.data.quoteEnabled;
        input['materials'] = this.data.gridOptions.getRowData();
        this.data.statusLabel = _.find(this.data.statusAvailable, x => x.value === this.data.form.controls.status.value).text;
        this.data.technician = _.find(this.data.operators, x => x.value === this.data.form.controls.primaryTechnician.value).text;
        const isTimesheetAdded = await this.apiService
            .post('Timesheet/AddTimesheet', input);

        if (isTimesheetAdded.isSuccess) {
            const matInput = {
                code: isTimesheetAdded.timesheetCode,
                materials: this.data.gridOptions.getRowData()
            };
            const areMatereialsAdded = await this.apiService
                .post('Timesheet/SaveMaterialItems', matInput);

            if (areMatereialsAdded.isSuccess) {
                this.data.timesheetNo = isTimesheetAdded.timesheetCode;
                this.data.filterMaterials = [];
                this.data.materialsAvailable = [];
                this.data.confirmForm = false;
                this.data.form.reset();
                this.data.materialForm.reset();
                this.data.gridOptions.api.setRowData([]);
                this.data.materials = [];
                this.snackBar.open('Save Successful', '', {
                    duration: 2000
                });
            } else {
                this.snackBar.open('Save Unsuccessful', '', {
                    duration: 2000
                });
            }
        } else {
            this.snackBar.open('Save Unsuccessful', '', {
                duration: 2000
            });
        }
    }

    public deleteMaterial = (id) => {
        const row = _.find(this.data.gridOptions.getRowData(), x => x.id === id);
        _.remove(this.data.materials, row);
        this.data.gridOptions.api.setRowData(this.data.materials);
    }

    public addMaterial = async () => {
        if (this.data.nonStockItem) {
            const row = {
                bomNo: this.data.materialForm.controls.bomNo.value,
                quantity: this.data.materialForm.controls.quantity.value,
                stockCode: '',
                stockDescription: this.data.materialForm.controls.nonMaterial.value
            };
            this.data.materials.push(row);
            this.data.gridOptions.api.setRowData(this.data.materials);
            this.data.materialForm.reset();
        } else {
            const input = {
                id: this.data.materialForm.controls.material.value,
                bomNo: this.data.materialForm.controls.bomNo.value,
                quantity: this.data.materialForm.controls.quantity.value
            };
            const result = await this.apiService
                .post('Timesheet/GetMaterial', input);

            if (result.exceeded) {
                this.openConfirmationMaterialDialog(result);
            } else {
                this.data.materials.push(result);
                this.data.gridOptions.api.setRowData(this.data.materials);
                this.data.materialForm.reset();
            }
        }
    }

    private getStatuses = () => {
        return [
            <DropdownModel<number>>{
                text: 'Chasing',
                value: 0,
                selected: false
            },
            <DropdownModel<number>>{
                text: '1st Fix',
                value: 1,
                selected: false
            },
            <DropdownModel<number>>{
                text: 'Second Fix',
                value: 2,
                selected: false
            },
            <DropdownModel<number>>{
                text: 'Final Fix',
                value: 3,
                selected: false
            }
        ];
    }

    private timeOptions = (): Models.TimeOptions => {
        const options = <Models.TimeOptions>{
            hours: [],
            minutes: []
        };
        for (let hour = 0; hour < 13; hour++) {
            options.hours.push(<DropdownModel<number>>{
              text: hour < 10 ? '0' + hour : hour.toString(),
              value: hour,
              selected: false
            });
        }
        for (let min = 0; min < 61; min += 10) {
            options.minutes.push(<DropdownModel<number>>{
                text: min === 0 ? '00' : min.toString(),
                value: min,
                selected: false
            });
        }
        return options;
    }

    public searchMaterials = () => {
        const results = [];
        _.forEach(this.data.materialsAvailable, (x: DropdownModel<number>) => {
            if (x.text.toLowerCase().includes(this.data.searchInput.toLowerCase())) {
                results.push(x);
            }
        });
        this.data.filterMaterials = results;
    }

    public ngOnDestroy = async () => {
        this.data = null;
    }
}
