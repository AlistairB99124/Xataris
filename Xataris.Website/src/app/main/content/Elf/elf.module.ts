import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { ElfComponent } from './elf.component';

import { BrowserModule } from '@angular/platform-browser';

import { ElfApiService } from './elf.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const routes = [
    {
        path     : 'elf',
        component: ElfComponent
    }
];

@NgModule({
    declarations: [
        ElfComponent
    ],
    imports     : [
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule,        
        RouterModule.forChild(routes)
    ],
    providers: [
        ElfApiService
    ],
    exports     : [
        ElfComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})

export class ElfModule
{
}
