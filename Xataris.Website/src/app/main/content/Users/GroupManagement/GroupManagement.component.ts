import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { fuseAnimations } from '../../../../core/animations';
import { locale as en } from './i18n/en';
import { locale as af } from './i18n/af';
import { XatarisPermissions, DropdownModel } from '../../../../core/models/sharedModels';
import { ApiService } from '../../../services/api.service';
import * as _ from 'lodash';
import * as s from '../../../../core/models/sharedModels';

import {
    GroupManagementViewModel,
    GroupDetail,
    SaveGroupInput
} from './GroupManagement.models';
import { ColumnDef, ColumnType } from '../../../../core/components/grid/grid.models';

@Component({
    selector: 'fuse-group-management',
    templateUrl: './GroupManagement.component.html',
    styleUrls: ['./GroupManagement.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class GroupManagementComponent implements OnInit {

    data: GroupManagementViewModel;

    constructor(
        private translationLoader: FuseTranslationLoaderService,
        private apiService: ApiService) {
        }

    public async ngOnInit() {
        this.translationLoader.loadTranslations(en, af);
        this.data = {} as GroupManagementViewModel;
        this.data.isGroupListCollapsed = false;
        this.data.isGroupDetailCollapsed = false;
        this.data.groupsGrid = {
            columnDefs: [
                <ColumnDef>{
                    field: 'id',
                    title: '',
                    columnType: ColumnType.checkbox
                },
                <ColumnDef>{
                    field: 'title',
                    title: 'Title',
                    columnType: ColumnType.text
                },
                <ColumnDef>{
                    field: 'description',
                    title: 'Description',
                    columnType: ColumnType.text
                },
                <ColumnDef>{
                    field: 'modules',
                    title: 'Modules',
                    columnType: ColumnType.text
                },
                <ColumnDef>{
                    field: 'accessLevel',
                    title: 'Access Level',
                    columnType: ColumnType.text,
                },
            ],
            rowData: [],
            onReady: this.getGroups,
            idRow: 'id'
        };
        this.data.availableModules = await this.apiService.post('User/GetAvailableModules');
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
    }

    addNewGroup = () => {
        this.data.groupDetail = {} as GroupDetail<Array<DropdownModel<number>>>;
        this.data.groupDetail.title = '';
        this.data.groupDetail.description = '';
        this.data.groupDetail.modules = [];
        this.data.groupDetail.accessLevel = {};
        this.data.isGroupListCollapsed = true;
        this.data.showDetailsPanel = true;
    }

    public enableDelete = () => {
        return this.data.groupsGrid.api ? this.data.groupsGrid.api.getSelectedRows().length > 0 : false;
    }

    public enableEdit = () => {
        return this.data.groupsGrid.api ? this.data.groupsGrid.api.getSelectedRows().length === 1 : false;
    }

    editGroup = () => {
        this.data.selectedGroup = <any>this.data.groupsGrid.api.getSelectedRows()[0];
        const modulesArray = this.data.selectedGroup.modules.split(',');
        this.data.selectedModules = [] as Array<s.DropdownModel<number>>;
        _.forEach(modulesArray, (x) => {
            const find = _.find(this.data.availableModules, { text: x });
            find['isSelected'] = true;
            this.data.selectedModules.push(find);
        });
        const accessLevel = _.find(this.data.availableAccess, { text: this.data.selectedGroup.accessLevel });
        accessLevel['selected'] = true;
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

    deleteGroup = async () => {
        const groups = [];
        _.forEach(this.data.groupsGrid.rowData, (x) => {
            if (x.isSelected) {
                groups.push({ groupsId: x.id });
            }
        });
        const input = {
            groupsIds: groups
        };
        const isDeleted = await this.apiService.post('User/DeleteGroups', input);
        if (isDeleted.isSuccess) {
            this.getGroups();
        }
    }

    public saveGroup = async (): Promise<void> => {
        const input = <SaveGroupInput>{
            id: this.data.groupDetail.id,
            title: this.data.groupDetail.title,
            description: this.data.groupDetail.description,
            modules: this.data.groupDetail.modules,
            access: this.data.groupDetail.accessLevel
        };
        const isSaved = await this.apiService.post('User/SaveGroup', input);
        if (isSaved.isSuccess) {
            this.data.showDetailsPanel = false;
            this.data.isGroupListCollapsed = false;
            this.data.isGroupDetailCollapsed = true;
            await this.getGroups();
        }
    }

    public getGroups = async (): Promise<void> => {
        const groups = await this.apiService
            .post('User/GetGroups');
        _.forEach(groups, g => {
            const modules = JSON.parse(g.modules);
            const stringArray = <Array<string>>_.map(modules, m => {
                return m.name ? m.name : m.Name;
            });
            g.modules = stringArray.join(',');
        });
        this.data.groupsGrid.api.setRowData(groups);
    }
}
