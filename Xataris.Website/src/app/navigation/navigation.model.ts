import { FuseNavigationModelInterface } from '../core/components/navigation/navigation.model';

export class FuseNavigationModel implements FuseNavigationModelInterface
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'modules',
                'title'   : 'Modules',
                'translate': 'NAV.MODULES',
                'type'    : 'group',
                'accesslevel': 'any::read',
                'show': true,
                'children': [
                    {
                        'id'   : 1,
                        'title': 'PTM',
                        'translate': 'NAV.PTM.TITLE',
                        'type' : 'collapse',
                        'icon' : 'schedule',
                        'url'  : '#',
                        'accesslevel': 'ptm::read',
                        'permission': 0,
                        'children': [
                            {
                                'id'   : 'ptmmanagement',
                                'title': 'PTM Management',
                                'translate': 'NAV.PTM.PTMMANAGEMENT.TITLE',
                                'type' : 'item',
                                'accesslevel': 'ptm::read',
                                'url'  : 'PTM/PTMManagement'
                            },
                            {
                                'id'   : 'mytimesheet',
                                'title': 'My Time Sheet',
                                'translate': 'NAV.PTM.MYTIMESHEET.TITLE',
                                'type' : 'item',
                                'accesslevel': 'ptm::read',
                                'url'  : 'PTM/MyTimesheet'
                            }
                        ]
                    },
                    {
                        'id'   : 2,
                        'title': 'Orders',
                        'translate': 'NAV.ORDERS.TITLE',
                        'type' : 'collapse',
                        'icon' : 'markunread_mailbox',
                        'permission': 0,
                        'accesslevel': 'orders::read',
                        'url'  : '#',
                        'children': [
                            {
                                'id'   : 'ordermanagement',
                                'title': 'Order Management',
                                'accesslevel': 'orders::read',
                                'translate': 'NAV.ORDERS.MANAGEMENT.TITLE',
                                'type' : 'item',
                                'url'  : '/orders/management'
                            }
                        ]
                    },
                    {
                        'id'   : 3,
                        'title': 'Sites',
                        'translate': 'NAV.SITES.TITLE',
                        'type' : 'collapse',
                        'icon' : 'location_city',
                        'permission': 1,
                        'accesslevel': 'sites::read',
                        'url': '#',
                        'children': [
                            {
                                'id'   : 'sitesManagement',
                                'title': 'Sites Management',
                                'accesslevel': 'sites::read',
                                'translate': 'NAV.SITES.MANAGEMENT.TITLE',
                                'type' : 'item',
                                'url'  : '/Sites/Management'
                            }
                        ]
                    },
                    {
                        'id'   : 4,
                        'title': 'Inventory',
                        'translate': 'NAV.DATA.TITLE',
                        'type' : 'collapse',
                        'icon' : 'insert_drive_file',
                        'permission': 1,
                        'accesslevel': 'inventory::read',
                        'url': '#',
                        'children': [
                            {
                                'id'   : 'dataImport',
                                'title': 'Management',
                                'accesslevel': 'inventory::read',
                                'translate': 'NAV.DATA.IMPORT.TITLE',
                                'type' : 'item',
                                'url'  : 'Inventory/Import'
                            }
                        ]
                    },
                    {
                        'id'   : 5,
                        'title': 'Users',
                        'translate': 'NAV.USERS.TITLE',
                        'type' : 'collapse',
                        'icon' : 'person',
                        'url': '#',
                        'permission': 4,
                        'accesslevel': 'users::admin',
                        'children': [
                            {
                                'id'   : 'usersManagement',
                                'title': 'User Management',
                                'translate': 'NAV.USERS.MANAGEMENT.TITLE',
                                'type' : 'item',
                                'accesslevel': 'users::admin',
                                'url'  : '/users/management'
                            },
                            {
                                'id'   : 'groupManagement',
                                'title': 'Group Management',
                                'translate': 'NAV.USERS.GROUPMANAGEMENT.TITLE',
                                'type' : 'item',
                                'accesslevel': 'users::admin',
                                'url'  : '/users/groupmanagement'
                            }
                        ]
                    },
                ]
            }
        ];
    }
}
