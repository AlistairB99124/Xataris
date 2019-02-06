import { Component, OnInit, ElementRef, ViewChild, OnDestroy, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../core/animations';
import { locale as en } from './i18n/en';
import { locale as af } from './i18n/af';
import { DropdownModel, NotificationType } from '../../../../core/models/sharedModels';
import { MatDialog, MatSnackBar, MatStepper, MatDialogRef } from '@angular/material';
import { FuseConfirmDialogComponent } from '../../../../core/components/confirm-dialog/confirm-dialog.component';
import * as _ from 'lodash';
import * as Models from './mytimesheet.models';
import { ApiService } from '../../../services/api.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { takeUntil } from 'rxjs/operators';
import { FacebookService } from 'ngx-facebook';

@Component({
    selector: 'fuse-mytimesheet',
    templateUrl: './mytimesheet.component.html',
    styleUrls: ['./mytimesheet.component.scss'],
    animations: fuseAnimations
})
export class MyTimesheetComponent implements OnInit, OnDestroy {
    public title: string;
    public sites: Array<Models.SiteViewModel>;
    public operators: Array<DropdownModel<number>>;
    public todaysDate: string;
    public quoteEnabled: boolean;
    public hoursAvailable: Array<DropdownModel<number>>;
    public minsAvailable: Array<DropdownModel<number>>;
    public statusAvailable: Array<DropdownModel<number>>;
    private materialsAvailable: Array<DropdownModel<number>>;
    public nonStockItem: boolean;
    public filterMaterials: ReplaySubject<Array<DropdownModel<number>>>;
    public confirmForm: boolean;
    public date: string;
    public technician: string;
    public pdfForm: any;
    public siteName: string;
    public loader: boolean;
    public timesheetNo: string;
    public statusLabel: string;
    public form: FormGroup;
    public materialForm: FormGroup;
    private formErrors: any;
    public materials: Array<any>;
    public searchInput: string;
    private dialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    public hoursSelected: Array<DropdownModel<any>>;
    public loadMaterials: boolean;

    _onDestroy = new Subject<void>();
    @ViewChild('stepper') stepper: MatStepper;
    @ViewChild('content') content: ElementRef;
    materialCtrl: FormControl;
    warehouses = [];

    constructor(
        private translationLoader: FuseTranslationLoaderService,
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        private notificationService: NotificationService,
        private viewContainerRef: ViewContainerRef,
        private facebookService: FacebookService) {
        facebookService.init({
            appId: '525756511255352',
            version: 'v3.2',
            xfbml: true,
        });
        this.setupVariables();
    }

    public ngOnInit() {
        this.loadPage();
        this.materialCtrl.valueChanges
      .pipe(takeUntil<any>(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
    }

    public ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    private filterBanks() {
        if (!this.filterMaterials) {
          return;
        }
        // get the search keyword
        let search = this.materialCtrl.value;
        if (!search) {
          this.filterMaterials.next(this.materialsAvailable.slice());
          return;
        } else {
          search = search.toLowerCase();
        }
        // filter the banks
        this.filterMaterials.next(
          this.materialsAvailable.filter((option) => option.text.toLowerCase().includes(search))
        );
      }

    private setupVariables = async () => {
        this.loadMaterials = false;
        this.filterMaterials = new ReplaySubject<any>(1);
        this.materialCtrl = new FormControl();
        this.hoursSelected = [];
        this.translationLoader.loadTranslations(en, af);
        this.materials = [];
        this.loader = false;
        const dateNow = new Date();
        this.technician = '';
        this.date = dateNow.toLocaleDateString();
        this.confirmForm = false;
        this.searchInput = '';
        this.quoteEnabled = false;
        const today = new Date();
        this.todaysDate = today.toString();
        this.hoursAvailable = this.timeOptions().hours;
        this.minsAvailable = this.timeOptions().minutes;
        this.statusAvailable = this.getStatuses();
        this.form = this.formBuilder.group({
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
            status: [0],
            warehouse: ['']
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

    public getWarehouses = async () => {
        this.warehouses = await this.apiService
        .post('Timesheet/GetWarehouses', { primaryTechnicianId: this.form.controls.primaryTechnician.value });
    }

    private loadPage = async () => {
        this.operators = await this.apiService
            .post('Timesheet/GetUsers');
        this.sites = await this.apiService
            .post('Site/GetSiteNames');
    }

    private onFormValuesChanged = () => {
        for (const field in this.formErrors) {
            if (!this.formErrors.hasOwnProperty(field)) {
                continue;
            }
            this.formErrors[field] = {};
            const control = this.form.get(field);
            if (control && control.dirty && !control.valid) {
                this.formErrors[field] = control.errors;
            }
        }
    }

    public updateSite = () => {
        const site = _.find(this.sites, x => x.id === this.form.controls.site.value);
        this.siteName = site.name;
    }

    public openConfirmationMaterialDialog = (data) => {
        this.dialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });
        this.dialogRef.componentInstance.confirmMessage = 'You have exceeded the available inventory. If you proceed, please submit an Order Form';

        this.dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.materials.push(data);
                this.materialForm.reset();
            }
            this.dialogRef = null;
        });
    }

    public reloadMaterials = async () => {
        this.loadMaterials = true;
        const input = {
            id: this.form.controls.warehouse.value
        };
        const res = await this.apiService
            .post('Timesheet/GetMaterials', input);
        if (res) {
            this.materialsAvailable = res;
            this.filterMaterials.next(this.materialsAvailable.slice());
            this.loadMaterials = false;
        } else {
            this.materialsAvailable = [];
            this.loadMaterials = false;
        }
    }


    public saveTimesheet = async () => {
        const input = _.cloneDeep(this.form.value);
        input['originalQuote'] = this.quoteEnabled;
        input['materials'] = this.materials;
        this.statusLabel = _.find(this.statusAvailable, x => x.value === this.form.controls.status.value).text;
        this.technician = _.find(this.operators, x => x.value === this.form.controls.primaryTechnician.value).text;
        const isTimesheetAdded = await this.apiService
            .post('Timesheet/AddTimesheet', input);

        if (isTimesheetAdded.isSuccess) {
            const matInput = {
                code: isTimesheetAdded.timesheetCode,
                materials: this.materials
            };
            const areMatereialsAdded = await this.apiService
                .post('Timesheet/SaveMaterialItems', matInput);

            if (areMatereialsAdded.isSuccess) {
                this.timesheetNo = isTimesheetAdded.timesheetCode;
                this.filterMaterials.unsubscribe();
                this.materialsAvailable = [];
                this.confirmForm = false;
                this.form.reset();
                this.materialForm.reset();
                this.materials = [];
                this.stepper.selectedIndex = 0;
                this.notificationService.addMessage(this.viewContainerRef, 'Save Successful', NotificationType.Success);
            } else {
                this.notificationService.addMessage(this.viewContainerRef, 'Save Unsuccessful', NotificationType.Error);
            }
        } else {
            this.snackBar.open('Save Unsuccessful', '', {
                duration: 2000
            });
        }
    }

    public addMaterial = async () => {
        if (this.nonStockItem) {
            const row = {
                bomNo: this.materialForm.controls.bomNo.value,
                quantity: this.materialForm.controls.quantity.value,
                stockCode: '',
                stockDescription: this.materialForm.controls.nonMaterial.value
            };
            this.materials.push(row);
            this.materialForm.reset();
        } else {
            let quantity = this.materialForm.controls.quantity.value;
            if (typeof quantity === 'string') {
                quantity = parseFloat(quantity);
            }
            if (_.isNaN(quantity)) {
                quantity = 0;
            }
            const input = {
                id: this.materialForm.controls.material.value,
                bomNo: this.materialForm.controls.bomNo.value,
                quantity: quantity
            };
            const result = await this.apiService
                .post('Timesheet/GetMaterial', input);

            if (result.exceeded) {
                this.openConfirmationMaterialDialog(result);
            } else {
                this.materials.push(result);
                this.materialForm.reset();
            }
        }
    }

    private getStatuses = () => [
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
        ]

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
}
