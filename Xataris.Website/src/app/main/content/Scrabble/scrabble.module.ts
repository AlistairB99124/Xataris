import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { ScrabbleComponent } from './scrabble.component';

import { ScrabbleApiService } from './scrabble.service';

const routes = [
    {
        path     : 'scrabble',
        component: ScrabbleComponent
    }
];

@NgModule({
    declarations: [
        ScrabbleComponent
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        ScrabbleApiService
    ],
    exports     : [
        ScrabbleComponent
    ]
})

export class ScrabbleModule
{
}
