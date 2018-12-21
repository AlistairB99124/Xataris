import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
// import { Site } from '../siteManagement.models';

@Component({
    selector   : 'fuse-map-modal',
    templateUrl: './map-modal.component.html',
    styleUrls  : ['./map-modal.component.scss']
})
export class MapModalComponent implements OnInit
{
    public site: any;

    constructor(public dialogRef: MatDialogRef<MapModalComponent>)
    {
    }

    public ngOnInit()
    {
        console.log(this.site);
    }

}
