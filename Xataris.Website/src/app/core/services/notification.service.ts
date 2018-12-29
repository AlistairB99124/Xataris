import {
    Component,
    ElementRef,
    OnInit,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    Injectable
} from '@angular/core';
import { NotificationType } from '../models/sharedModels';

@Injectable()
export class NotificationService {

    public componentRef: ComponentRef<NotificationComponent>;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    addMessage(viewContainerRef: ViewContainerRef, text: string, type: NotificationType) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NotificationComponent);
        viewContainerRef.clear();
        this.componentRef = viewContainerRef.createComponent(componentFactory);
        this.componentRef.instance.text = text;
        this.componentRef.instance.type = type;
        setTimeout(() => {
            this.componentRef.destroy();
        }, 5000);
    }

}

@Component({
    template: `
        <div class="fix-note" fxLayout="row" fxLayoutAlign="center center">
            <mat-card class="p-0 card-note {{typeClass}}" fxLayout="column">
                <mat-card-content fxLayout="row" fxLayoutAlign="center center" class="p-0 card-content">
                    <span>{{text}}</span>
                </mat-card-content>
            </mat-card>
        </div>
    `,
    styles: [
        `
        .success {
            background: green;
        }
        .warning {
            background: orange;
        }
        .error {
            background: red;
        }
        .fix-note {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            height: 60px;
            z-index: 100;
        }
        .card-note {
            color: white;
            height: 100%;
            max-width: 500px;
            width: 100%;
        }
        .card-content {
            height: 100%;
            span {
                font-size: 16px;
            }
        }`
    ]
})
export class NotificationComponent implements OnInit {
    public text: string;
    public type: NotificationType;
    public typeClass: string;

    constructor(private elementRef: ElementRef) {

    }

    public ngOnInit() {
        this.typeClass = this.type === NotificationType.Error ? 'error' : this.type === NotificationType.Success ? 'success' : 'warning';
    }
}

