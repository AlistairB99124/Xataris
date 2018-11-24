import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FuseNavigationService } from '../../navigation.service';
import { NavigationEnd, Router } from '@angular/router';
import { fuseAnimations } from '../../../../animations';
import * as _ from 'lodash';

@Component({
    selector   : 'fuse-nav-vertical-collapse',
    templateUrl: './nav-vertical-collapse.component.html',
    styleUrls  : ['./nav-vertical-collapse.component.scss'],
    animations : fuseAnimations
})
export class FuseNavVerticalCollapseComponent implements OnInit
{
    @Input() item: any;
    @HostBinding('class') classes = 'nav-collapse nav-item';
    @HostBinding('class.open') public isOpen = false;

    constructor(
        private navigationService: FuseNavigationService,
        private router: Router
    )
    {
        router.events.subscribe(
            (event) => {
                if ( event instanceof NavigationEnd )
                {
                    if ( this.isUrlInChildren(this.item, event.urlAfterRedirects) )
                    {
                        this.expand();
                    }
                    else
                    {
                        this.collapse();
                    }
                }
            }
        );

        this.navigationService.onNavCollapseToggled
            .subscribe(
                (clickedItem) => {
                    if ( clickedItem && clickedItem.children )
                    {
                        if ( this.isChildrenOf(this.item, clickedItem) )
                        {
                            return;
                        }
                        if ( this.isUrlInChildren(this.item, this.router.url) )
                        {
                            return;
                        }
                        if ( this.item !== clickedItem )
                        {
                            this.collapse();
                        }
                    }
                }
            );
    }

    ngOnInit()
    {
        if ( this.isUrlInChildren(this.item, this.router.url) )
        {
            this.expand();
        }
        else
        {
            this.collapse();
        }
        const user = localStorage.getItem('userId');
        this.navigationService.getUserPermissions({userId: user}).subscribe(res => {                                
            const moduleFound = _.find(res.data.modules, (x) => x.id === this.item.id);
            if (moduleFound) {
                if (res.data.permission >= this.item.permission) {
                    this.item.show = true;
                }
            } else {
                this.item.show = false;
            }
        });
    }

    toggleOpen(ev)
    {
        ev.preventDefault();

        this.isOpen = !this.isOpen;

        // Navigation collapse toggled...
        this.navigationService.onNavCollapseToggled.emit(this.item);
        this.navigationService.onNavCollapseToggle.emit();
    }

    expand()
    {
        if ( this.isOpen )
        {
            return;
        }

        this.isOpen = true;
        this.navigationService.onNavCollapseToggle.emit();
    }

    collapse()
    {
        if ( !this.isOpen )
        {
            return;
        }

        this.isOpen = false;
        this.navigationService.onNavCollapseToggle.emit();
    }

    isChildrenOf(parent, item)
    {
        if ( !parent.children )
        {
            return false;
        }

        if ( parent.children.indexOf(item) !== -1 )
        {
            return true;
        }

        for ( const children of parent.children )
        {
            if ( children.children )
            {
                return this.isChildrenOf(children, item);
            }
        }
    }
    
    isUrlInChildren(parent, url)
    {
        if ( !parent.children )
        {
            return false;
        }

        for ( let i = 0; i < parent.children.length; i++ )
        {
            if ( parent.children[i].children )
            {
                if ( this.isUrlInChildren(parent.children[i], url) )
                {
                    return true;
                }
            }

            if ( parent.children[i].url === url || url.includes(parent.children[i].url) )
            {
                return true;
            }
        }

        return false;
    }

}
