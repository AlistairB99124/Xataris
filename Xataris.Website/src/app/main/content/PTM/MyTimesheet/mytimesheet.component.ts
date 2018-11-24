import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { HttpClient } from '@angular/common/http';
import { fuseAnimations } from '../../../../core/animations';
import * as sharedModels from '../../../../core/models/sharedModels';
import { locale as english } from './i18n/en';
import { locale as afrikaans } from './i18n/af';
import { DropdownModel } from '../../../../core/models/sharedModels';
import { MyTimesheetApiService } from './mytimesheet.service';
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { FuseConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog.component';
import * as domtoimage from 'dom-to-image';
import * as _ from 'lodash';
import * as Models from './mytimesheet.models';

@Component({
    selector: 'fuse-mytimesheet',
    templateUrl: './mytimesheet.component.html',
    styleUrls: ['./mytimesheet.component.scss'],
    animations: fuseAnimations
})
export class MyTimesheetComponent implements OnInit {
    data;
    form: FormGroup;
    materialForm: FormGroup;
    formErrors: any;
    dataSource = new MatTableDataSource();
    displayedColumns = ['id', 'bomNo', 'stockCode', 'stockDescription', 'quantity'];
    materials: Array<any>;
    dialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    invoice: any;
    searchInput: string;
    @ViewChild('content') content: ElementRef;

    constructor(
        private translationLoader: FuseTranslationLoaderService,
        private formBuilder: FormBuilder,
        private http: HttpClient,
        private timesheetApiService: MyTimesheetApiService,
        public dialog: MatDialog,
        private translateService: TranslateService,
        public snackBar: MatSnackBar) {
            
        this.data = {} as Models.TimesheetViewModel;
        this.data.loader = false;
        const dateNow = new Date();
        this.data.technician = {};
        this.data.date = dateNow.toLocaleDateString();
        this.data.confirmForm = false;
        this.searchInput = '';
        this.translationLoader.loadTranslations(english, afrikaans);
        this.data.quoteEnabled = false;
        this.timesheetApiService.getUsers().subscribe(res => {
            this.data.operators = res.data;            
        });
        this.timesheetApiService.getSites().subscribe(res => {
            this.data.sites = res.data;
        });
        const today = new Date();
        this.data.todaysDate = today.toString();
        this.data.hoursAvailable = this.timeOptions().hours;
        this.data.minsAvailable = this.timeOptions().minutes;
        this.data.statusAvailable = this.getStatuses();
        let description, quantity, code;
        this.translateService.get('MYTIMESHEET.DESCRIPTION').subscribe(res => { description = res; });
        this.translateService.get('MYTIMESHEET.QUANTITY').subscribe(res => { quantity = res; });
        this.translateService.get('MYTIMESHEET.CODE').subscribe(res => { code = res; }); 
        this.data.materialColumns = [
            <Models.Column>{
                order: 0,
                columnName: 'bomNo',
                columnType: Models.ColumnType.Text,
                displayName: 'BOM No',
                width: null
            },
            <Models.Column>{
                order: 1,
                columnName: 'stockCode',
                columnType: Models.ColumnType.Text,
                displayName: code,
                width: null
            },
            <Models.Column>{
                order: 2,
                columnName: 'stockDescription',
                columnType: Models.ColumnType.Text,
                displayName: description,
                width: null
            },
            <Models.Column>{
                order: 3,
                columnName: 'quantity',
                columnType: Models.ColumnType.Number,
                displayName: quantity,
                width: null
            }
        ];
        this.materials = [];
    }    

    reloadMaterials(){
        const input = {
            primaryTechnicianId: this.form.controls.primaryTechnician.value
        };
        this.timesheetApiService.getMaterials(input).subscribe(res => {
            if (res.data) {
                    this.data.materialsAvailable = res.data;
                    this.data.filterMaterials = this.data.materialsAvailable;
                    this.data.loader = false;                           
            } else {
                this.data.materialsAvailable = [];
                this.data.filterMaterials = this.data.materialsAvailable;
            }
        });
    }

    ngOnInit()
    {
        this.form = this.formBuilder.group({
            specificLocation : [''],
            detailedPoint  : [''],
            description   : [''],
            quoteNumber  : [''],
            siNumber: [''],
            secondaryMins: [0],
            secondaryHours: [0],
            primaryHours: [0],
            primaryMins: [0],
            primaryTechnician: [''],
            site: [''],
            status: [0]
        });

        this.materialForm = this.formBuilder.group({
            nonMaterial: [''],
            material: [''],
            quantity: [''],
            bomNo: ['']
        });

        this.form.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
    }

    onFormValuesChanged()
    {
        for (const field in this.formErrors )
        {
            if ( !this.formErrors.hasOwnProperty(field) )
            {
                continue;
            }
            this.formErrors[field] = {};
            const control = this.form.get(field);
            if ( control && control.dirty && !control.valid )
            {
                this.formErrors[field] = control.errors;
            }
        }
    }

    updateSite(){
        const site = _.find(this.data.sites, x => x.id === this.form.controls.site.value);
        this.data.siteName = site.name;
    }

    openConfirmationMaterialDialog(data) {
        this.dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
          disableClose: false
        });
        this.dialogRef.componentInstance.confirmMessage = 'You have exceeded the available inventory. If you proceed, please submit an Order Form';
    
        this.dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.materials.push(data);
            this.dataSource.data = this.materials ;
            this.materialForm.reset();
          }
          this.dialogRef = null;
        });
      }

    
    saveTimesheet(){
        const input = _.cloneDeep(this.form.value);
        input['originalQuote'] = this.data.quoteEnabled;
        input['materials'] = this.dataSource.data;
        this.data.statusLabel = _.find(this.data.statusAvailable, x => x.value === this.form.controls.status.value).text;
        this.data.technician = _.find(this.data.operators, x => x.value === this.form.controls.primaryTechnician.value).text;
        this.timesheetApiService.addTimesheet(input).subscribe(res => {
            if (res.data.isSuccess){
                const matInput = {
                    code: res.data.timesheetCode,
                    materials: this.dataSource.data
                };
                this.timesheetApiService.saveMaterialItems(matInput).subscribe(result => {
                    if (result.data.isSuccess) {
                        this.data.timesheetNo = res.data.timesheetCode;
                        this.data.filterMaterials = [];
                        this.data.materialsAvailable = [];
                        this.data.confirmForm = false;
                        this.form.reset();
                        this.materialForm.reset();
                        this.dataSource.data = [];
                        this.materials = [];
                        this.snackBar.open('Save Successful', '', { duration: 2000 });
                    } else {
                        this.snackBar.open('Save Unsuccessful', '', { duration: 2000 });
                    }
                });
            } else {
                this.snackBar.open('Save Unsuccessful', '', { duration: 2000 });
            }
        });
    }

    deleteMaterial = (id) => {
        const row = _.find(this.dataSource.data, { id: id });
        _.remove(this.materials, row);
        this.dataSource.data = this.materials;
    }

    addMaterial(){
        if (this.data.nonStockItem) {
            const row = {
                bomNo: this.materialForm.controls.bomNo.value,
                quantity: this.materialForm.controls.quantity.value,
                stockCode: '',
                stockDescription: this.materialForm.controls.nonMaterial.value 
            };
            this.materials.push(row);
            this.dataSource.data = this.materials;
            this.materialForm.reset();
        } else {
            const input = {
                id: this.materialForm.controls.material.value,
                bomNo: this.materialForm.controls.bomNo.value,
                quantity: this.materialForm.controls.quantity.value                
            };
            this.timesheetApiService.getMaterial(input).subscribe(res => {
                if (res.data.exceeded) {
                    this.openConfirmationMaterialDialog(res.data);
                } else {
                    this.materials.push(res.data);
                    this.dataSource.data = this.materials ;
                    this.materialForm.reset();
                }
            });
        }
    }

    private getStatuses(){
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

    private timeOptions(){
        return {
            hours: [
                {
                    text: '00',
                    value: 0,
                    selected: false
                },
                {
                    text: '01',
                    value: 1,
                    selected: false
                },
                {
                    text: '02',
                    value: 2,
                    selected: false
                },
                {
                    text: '03',
                    value: 3,
                    selected: false
                },
                {
                    text: '04',
                    value: 4,
                    selected: false
                },
                {
                    text: '05',
                    value: 5,
                    selected: false
                },
                {
                    text: '06',
                    value: 6,
                    selected: false
                },
                {
                    text: '07',
                    value: 7,
                    selected: false
                },
                {
                    text: '08',
                    value: 8,
                    selected: false
                },
                {
                    text: '09',
                    value: 9,
                    selected: false
                },
                {
                    text: '10',
                    value: 10,
                    selected: false
                },
                {
                    text: '11',
                    value: 11,
                    selected: false
                },
                {
                    text: '12',
                    value: 12,
                    selected: false
                }
            ],
            minutes: [
                {
                    text: '00',
                    value: 0,
                    selected: false
                },
                {
                    text: '10',
                    value: 10,
                    selected: false
                },
                {
                    text: '20',
                    value: 20,
                    selected: false
                },
                {
                    text: '30',
                    value: 30,
                    selected: false
                },
                {
                    text: '40',
                    value: 40,
                    selected: false
                },
                {
                    text: '50',
                    value: 50,
                    selected: false
                }
            ]
        };
    }

    searchMaterials(){
            const results = [];
            _.forEach(this.data.materialsAvailable, (x: DropdownModel<number>) => {
                if (x.text.toLowerCase().includes(this.searchInput.toLowerCase())) {
                    results.push(x);
                }
            });
            this.data.filterMaterials = results;
    }
}
