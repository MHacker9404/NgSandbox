import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { of, Observable } from 'rxjs';
import { MessagesService } from '../services/messages.service';

@Component({
    selector: 'ngs-messages',
    template: `
        <div class="messages-frame" *ngIf="(errors$ | async)?.length > 0">
            <div class="messages messages-error">
                <i class="md-icon close-icon" (click)="close()">close</i>
                <div class="messages-container">
                    <div *ngFor="let message of errors$ | async">{{ message }}</div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnInit {
    errors$: Observable<string[]>;

    constructor(private _messagesService: MessagesService) {}

    ngOnInit() {
        this.errors$ = this._messagesService.errors$;
    }

    close() {
        this._messagesService.error();
    }
}

@NgModule({
    declarations: [MessagesComponent],
    imports: [CommonModule],
    exports: [MessagesComponent],
})
export class MessagesModule {}
