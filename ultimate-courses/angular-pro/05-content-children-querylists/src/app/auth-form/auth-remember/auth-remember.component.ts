import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-auth-remember',
    templateUrl: './auth-remember.component.html',
    styleUrls: ['./auth-remember.component.scss'],
})
export class AuthRememberComponent implements OnInit {
    @Output() checked: EventEmitter<boolean> = new EventEmitter<boolean>();

    onChecked(value: any): void {
        const checked: boolean = (value.target as HTMLInputElement).checked;
        this.checked.emit(checked);
    }
    constructor() {}

    ngOnInit(): void {}
}
