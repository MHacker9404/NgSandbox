import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'prb-auth-message',
    templateUrl: './auth-message.component.html',
    styleUrls: ['./auth-message.component.scss'],
})
export class AuthMessageComponent implements OnInit {
    public days: number = 7;

    constructor() {}

    ngOnInit(): void {}
}
