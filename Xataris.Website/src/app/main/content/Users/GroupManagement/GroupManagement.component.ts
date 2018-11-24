import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../core/animations';
import { locale as english } from './i18n/en';
import { locale as afrikaans } from './i18n/af';
import { XatarisPermissions, DropdownModel } from '../../../../core/models/sharedModels';
import { GroupManagementApiService } from './GroupManagement.service';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as s from '../../../../core/models/sharedModels';

@Component({
    selector: 'fuse-group-management',
    templateUrl: './GroupManagement.component.html',
    styleUrls: ['./GroupManagement.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class GroupManagementComponent {

    data: GroupManagementViewModel;
    datasource;
    displayedColumns;

    constructor(
        private translationLoader: FuseTranslationLoaderService,
        private groupManagementApiService: GroupManagementApiService,
        private router: Router,
        private formBuilder: FormBuilder) {
       this.data = {} as GroupManagementViewModel;
       this.data.isGroupListCollapsed = false;
       this.data.isGroupDetailCollapsed = false;
       this.datasource = new MatTableDataSource();
       this.getGroups();
       this.groupManagementApiService.getAvailableModules().subscribe(res => {
           this.data.availableModules = res.data;
       });
       this.data.availableAccess = [
           <DropdownModel<number>>{
               text: 'Read',
               value: XatarisPermissions.Read,
               selected: false
           },
           <DropdownModel<number>>{
            text: 'Write',
            value: XatarisPermissions.Write,
            selected: false
        },
        <DropdownModel<number>>{
            text: 'Design',
            value: XatarisPermissions.Design,
            selected: false
        },
        <DropdownModel<number>>{
            text: 'Admin',
            value: XatarisPermissions.Admin,
            selected: false
        }
       ];
       this.displayedColumns = ['id', 'title', 'description', 'modules', 'accessLevel'];
    }

    addNewGroup(){
        this.data.groupDetail = {} as GroupDetail<Array<DropdownModel<number>>>;
        this.data.groupDetail.title = '';
        this.data.groupDetail.description = '';
        this.data.groupDetail.modules = [];
        this.data.groupDetail.accessLevel = {};
        this.data.isGroupListCollapsed = true;
        this.data.showDetailsPanel = true;
    }

    enableDelete(){
        return _.filter(this.datasource.data, { isSelected: true }).length > 0;
    }

    enableEdit(){
        return _.filter(this.datasource.data, { isSelected: true }).length === 1;
    }

    editGroup(){        
        this.data.selectedGroup = _.find(this.datasource.data, { isSelected: true });
        const modulesArray = this.data.selectedGroup.modules.split(',');
        this.data.selectedModules = [] as Array<s.DropdownModel<number>>;
        _.forEach(modulesArray, (x) => {
            const find = _.find(this.data.availableModules, { text: x});
            find.isSelected = true;
            this.data.selectedModules.push(find);
        });
        const accessLevel = _.find(this.data.availableAccess, { text: this.data.selectedGroup.accessLevel });
        accessLevel.selected = true;
        this.data.groupDetail = {
            title: this.data.selectedGroup.title,
            description: this.data.selectedGroup.description,
            modules: this.data.selectedModules,
            accessLevel: accessLevel,
            id: this.data.selectedGroup.id
        } as GroupDetail<Array<DropdownModel<number>>>;
        this.data.isGroupListCollapsed = true;
        this.data.showDetailsPanel = true;
    }

    deleteGroup(){
        const groups = [];
        _.forEach(this.datasource.data, (x) => {
            if (x.isSelected) {
               groups.push({groupsId: x.id});
            }
        });
        const input = {
            groupsIds: groups
        };
        this.groupManagementApiService.deleteGroups(input).subscribe(res => {
            if (res.data.isSuccess) {
                this.getGroups();
            }            
        });
    }

    saveGroup(){
        const input = <SaveGroupInput>{
            id: this.data.groupDetail.id,
            title: this.data.groupDetail.title,
            description: this.data.groupDetail.description,
            modules: this.data.groupDetail.modules,
            access: this.data.groupDetail.accessLevel
        };
        this.groupManagementApiService.saveGroup(input).subscribe(res => {
            this.data.showDetailsPanel = false;
            this.data.isGroupListCollapsed = false;
            this.data.isGroupDetailCollapsed = true;
            this.getGroups();
        });
    }
        
    getGroups(){
        this.groupManagementApiService.getGroups().subscribe(res => {
            _.forEach(res.data, (g) => {
                const modules = JSON.parse(g.modules);
                const stringArray = <Array<string>>_.map(modules, (m) => {
                    return m.name;
                });
                g.modules = stringArray.join(',');
                g['isSelected'] = false;
            });
            this.datasource.data = res.data;
            console.log(this.datasource.data);
        });
    }
}

export interface GroupManagementViewModel {
    isGroupListCollapsed: boolean;
    showDetailsPanel: boolean;
    selectedRows: Array<number>;
    isGroupDetailCollapsed: boolean;
    selectedGroup: GroupDetail<string>;
    availableModules: Array<DropdownModel<number>>;
    selectedModules: Array<DropdownModel<number>>;
    accessLevel: Array<any>;
    groupDetail: GroupDetail<Array<DropdownModel<number>>>;
    availableAccess: Array<DropdownModel<number>>;
}

export interface GroupDetail<T> {
    title: string;
    description: string;
    modules: T;
    accessLevel: {};
    id: number;
}

export interface SaveGroupInput{
    id: number;
    title: string;
    description: string;
    modules: Array<DropdownModel<number>>;
    access: DropdownModel<number>;
}
