import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[prb-credit-card]',
})
export class CreditCardDirective {
    constructor(private _element: ElementRef) {
        console.debug(this._element);
    }

    @HostBinding('style.border') border!: string;

    @HostListener('input', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        console.debug(event);
        const input = event.target as HTMLInputElement;
        let trimmed = input.value.replace(/\s+/g, '');
        if (trimmed.length > 16) {
            trimmed = trimmed.substr(0, 16);
        }

        let numbers = [];
        for (let i = 0; i < trimmed.length; i += 4) {
            numbers.push(trimmed.substr(i, 4));
        }

        input.value = numbers.join(' ');

        this.border = '';
        if (/[^\d]+/.test(trimmed)) {
            this.border = '1px solid red';
        }
    }
}
