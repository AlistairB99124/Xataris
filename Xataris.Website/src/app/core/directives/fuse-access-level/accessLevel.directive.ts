import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { XatarisPermissions, XatarisModules } from '../../models/sharedModels';
import * as _ from 'lodash';

@Directive({
    selector: '[accessLevel]'
})
export class AccessLevelDirective implements OnInit
{
    constructor(
        private elementRef: ElementRef
    ) {

    }

    AccessLevel = false;
    @Input() set accessLevel(value: string) {
        if (value !== '' && _.includes(value, '::')) {
            let details;
            try {
                details = <any>JSON.parse(localStorage.getItem('Modules'))[0];
            } catch {
                this.AccessLevel = true;
                return;
            }
            const modules = JSON.parse(details.Modules);
            const accessLevel = value.split('::');
            let module = 0;
            let permission = 0;
            const accessString = accessLevel[1].toLowerCase();
            const moduleString = accessLevel[0].toLowerCase();
            if (moduleString === 'any') {
                this.AccessLevel = true;
                return;
            }
            switch (accessString) {
                case 'read':
                    permission = XatarisPermissions.Read;
                break;
                case 'write':
                    permission = XatarisPermissions.Write;
                break;
                case 'design':
                    permission = XatarisPermissions.Design;
                    break;
                case 'admin':
                    permission = XatarisPermissions.Admin;
                    break;
                default:
                    permission = XatarisPermissions.Read;
                    break;
            }
            switch (moduleString) {
                case 'users':
                    module = XatarisModules.Users;
                break;
                case 'ptm':
                    module = XatarisModules.PTM;
                break;
                case 'sites':
                    module = XatarisModules.Sites;
                break;
                case 'inventory':
                    module = XatarisModules.Sites;
                break;
                case 'orders':
                    module = XatarisModules.Sites;
                break;
            }
            if (details) {
                _.forEach(modules, (x) => {
                    if (x.Id === module) {
                        if (permission <= details.AccessLevel) {
                            this.AccessLevel = true;
                        }
                    }
                });
            }
        }
    }

    ngOnInit() {
        if (!this.AccessLevel) {
            this.elementRef.nativeElement.remove();
        }
    }
}
