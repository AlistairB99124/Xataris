import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../core/modules/shared.module';

import { FuseMainComponent } from './main.component';
import { FuseContentComponent } from './content/content.component';
import { FuseFooterComponent } from './footer/footer.component';
import { FuseNavbarVerticalComponent } from './navbar/vertical/navbar-vertical.component';
import { FuseToolbarComponent } from './toolbar/toolbar.component';
import { FuseNavigationModule } from '../core/components/navigation/navigation.module';
import { FuseNavbarVerticalToggleDirective } from './navbar/vertical/navbar-vertical-toggle.directive';
import { FuseShortcutsModule } from '../core/components/shortcuts/shortcuts.module';
import { FuseSearchBarModule } from '../core/components/search-bar/search-bar.module';

import { SiteManagementModule } from '../main/content/Sites/Management/siteManagement.module';
import { TimesheetModule } from '../main/content/PTM/MyTimesheet/mytimesheet.module';
import { LoginModule } from '../main/content/Account/Login/login.module';
import { UsersSummaryModule } from '../main/content/Users/UserManagement/Summary/usersSummary.module';
import { InventoryModule } from '../main/content/Inventory/Management/inventory.module';
import { GroupManagementModule } from '../main/content/Users/GroupManagement/GroupManagement.module';
import { OrdersModule } from '../main/content/Orders/Orders.module';
import { PTMManagementModule } from '../main/content/PTM/Management/ptmmanagement.module';
import { SiteDetailsModule } from '../main/content/Sites/Details/sitesDetails.module';

@NgModule({
    declarations: [
        FuseContentComponent,
        FuseFooterComponent,
        FuseMainComponent,
        FuseNavbarVerticalComponent,
        FuseToolbarComponent,
        FuseNavbarVerticalToggleDirective,
    ],
    imports     : [
        SharedModule,
        RouterModule,
        FuseNavigationModule,
        FuseShortcutsModule,
        FuseSearchBarModule,
        TimesheetModule,
        LoginModule,
        UsersSummaryModule,
        InventoryModule,
        SiteManagementModule,
        SiteDetailsModule,
        GroupManagementModule,
        OrdersModule,
        PTMManagementModule,
    ],
    exports     : [
        FuseMainComponent
    ],
    providers: []
})

export class FuseMainModule
{
}
