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
import { FuseNavbarHorizontalComponent } from './navbar/horizontal/navbar-horizontal.component';
import { FuseQuickPanelComponent } from './quick-panel/quick-panel.component';
import { FuseThemeOptionsComponent } from '../core/components/theme-options/theme-options.component';
import { FuseShortcutsModule } from '../core/components/shortcuts/shortcuts.module';
import { FuseSearchBarModule } from '../core/components/search-bar/search-bar.module';
import { ScrabbleModule  } from '../main/content/Scrabble/scrabble.module';
import { ElfModule  } from '../main/content/Elf/elf.module';

import { SiteManagementModule } from '../main/content/Sites/Management/siteManagement.module';
import { TimesheetModule } from '../main/content/PTM/MyTimesheet/mytimesheet.module';
import { LoginModule } from '../main/content/Account/Login/login.module';
import { UsersSummaryModule } from '../main/content/Users/UserManagement/Summary/usersSummary.module';
import { InventoryModule } from '../main/content/Inventory/Management/inventory.module';
import { GroupManagementModule } from '../main/content/Users/GroupManagement/GroupManagement.module';
import { OrdersModule } from '../main/content/Orders/Orders.module';
import { PTMManagementModule } from '../main/content/PTM/Management/ptmmanagement.module';
import { SiteDetailsModule } from '../main/content/Sites/Details/sitesDetails.module';
import { FileDropModule } from 'ngx-file-drop';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { ScrabbleApiService } from '../main/content/Scrabble/scrabble.service';
import { ElfApiService } from '../main/content/Elf/elf.service';

@NgModule({
    declarations: [
        FuseContentComponent,
        FuseFooterComponent,
        FuseMainComponent,
        FuseNavbarVerticalComponent,
        FuseNavbarHorizontalComponent,
        FuseToolbarComponent,
        FuseNavbarVerticalToggleDirective,
        FuseThemeOptionsComponent,
        FuseQuickPanelComponent
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
        FileDropModule,
        SiteManagementModule,
        SiteDetailsModule,
        GroupManagementModule,
        OrdersModule,
        PTMManagementModule,
        ScrabbleModule,
        ElfModule,
    ],
    exports     : [
        FuseMainComponent
    ],
    providers: [
        ScrabbleApiService,
        ElfApiService,
    ]
})

export class FuseMainModule
{
}
