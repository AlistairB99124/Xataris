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
                'show': true,
                'children': [
                    {
                        'id'   : 2,
                        'title': 'PTM',
                        'translate': 'NAV.PTM.TITLE',
                        'type' : 'collapse',
                        'icon' : 'schedule',
                        'url'  : '#',
                        'show': true,
                        'permission': 0,
                        'children': [
                            {
                                'id'   : 'ptmmanagement',
                                'title': 'PTM Management',
                                'translate': 'NAV.PTM.PTMMANAGEMENT.TITLE',
                                'type' : 'item',
                                'show': true,
                                'url'  : 'PTM/PTMManagement'
                            },
                            {
                                'id'   : 'mytimesheet',
                                'title': 'My Time Sheet',
                                'translate': 'NAV.PTM.MYTIMESHEET.TITLE',
                                'type' : 'item',
                                'show': true,
                                'url'  : 'PTM/MyTimesheet'
                            }
                        ]
                    },
                    {
                        'id'   : 5,
                        'title': 'Orders',
                        'translate': 'NAV.ORDERS.TITLE',
                        'type' : 'collapse',
                        'icon' : 'markunread_mailbox',
                        'permission': 0,
                        'show': true,
                        'url'  : '#',
                        'children': [
                            {
                                'id'   : 'ordermanagement',
                                'title': 'Order Management',
                                'translate': 'NAV.ORDERS.MANAGEMENT.TITLE',
                                'type' : 'item',
                                'show': true,
                                'url'  : '/orders/management'
                            }
                        ]
                    },
                    {
                        'id'   : 4,
                        'title': 'Sites',
                        'translate': 'NAV.SITES.TITLE',
                        'type' : 'collapse',
                        'icon' : 'location_city',
                        'permission': 1,
                        'show': true,
                        'url': '#',
                        'children': [
                            {
                                'id'   : 'sitesManagement',
                                'title': 'Sites Management',
                                'translate': 'NAV.SITES.MANAGEMENT.TITLE',
                                'type' : 'item',
                                'show': true,
                                'url'  : '/Sites/Management'
                            }
                        ]
                    },
                    {
                        'id'   : 3,
                        'title': 'Inventory',
                        'translate': 'NAV.DATA.TITLE',
                        'type' : 'collapse',
                        'icon' : 'insert_drive_file',
                        'permission': 1,
                        'show': true,
                        'url': '#',
                        'children': [
                            {
                                'id'   : 'dataImport',
                                'title': 'Management',
                                'translate': 'NAV.DATA.IMPORT.TITLE',
                                'type' : 'item',
                                'url'  : 'Inventory/Import'
                            }
                        ]
                    },
                    {
                        'id'   : 10,
                        'title': 'Users',
                        'translate': 'NAV.USERS.TITLE',
                        'type' : 'collapse',
                        'icon' : 'person',
                        'url': '#',
                        'permission': 4,
                        'show': true,
                        'children': [
                            {
                                'id'   : 'usersManagement',
                                'title': 'User Management',
                                'translate': 'NAV.USERS.MANAGEMENT.TITLE',
                                'type' : 'item',
                                'show': true,
                                'url'  : '/users/management'
                            },
                            {
                                'id'   : 'groupManagement',
                                'title': 'Group Management',
                                'translate': 'NAV.USERS.GROUPMANAGEMENT.TITLE',
                                'type' : 'item',
                                'show': true,
                                'url'  : '/users/groupmanagement'
                            }
                        ]
                    },
                    /*{
                        'id'   : 6,
                        'title': 'Scrabble',
                        'translate': 'NAV.SCRABBLE.TITLE',
                        'type' : 'item',
                        'icon' : 'schedule',
                        'url'  : 'scrabble',
                        'show': true,
                        'permission': 0
                    },
                    {
                        'id'   : 1,
                        'title': 'ELF IDEAS',
                        'translate': 'NAV.ELF.TITLE',
                        'type' : 'item',
                        'icon' : 'cake',
                        'url'  : 'elf',
                        'show': true,
                        'permission': 0
                    }*/
                ]
            }
        ];
    }
}
