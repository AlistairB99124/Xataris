import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import {map, startWith } from 'rxjs/operators';
import { DropdownModel } from '../../models/sharedModels';
import { Observable } from 'rxjs';

@Component({
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    selector: 'x-select'
})

export class XSelectComponent implements OnInit {

    @Input() public input: Array<DropdownModel<number>> = [];
    public output = new FormControl();
    placeholder = 'None Selected';
    filteredOptions: Observable<DropdownModel<number>[]>;

    constructor() {}

    public ngOnInit() {
        if (this.input === undefined) {
            this.input = [];
        }
        const _this = this;
        this.filteredOptions = this.output.valueChanges
      .pipe(
        startWith<string | DropdownModel<any>>(''),
        map(value => typeof value === 'string' ? value : value.value),
        map(name => name ? _this._filter(name) : _this.input.slice())
      );
        console.log(_this.input);
    }

    displayText(option?: DropdownModel<number>): string | undefined {
        return option ? option.text : undefined;
    }

    private _filter(name: string): DropdownModel<number>[] {
        const filterValue = name.toLowerCase();
        return this.input.filter(option => option.text.toLowerCase().indexOf(filterValue) === 0);
    }
}
