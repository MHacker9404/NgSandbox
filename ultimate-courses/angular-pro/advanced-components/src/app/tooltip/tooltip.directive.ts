import { Input, Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[tooltip]',
    exportAs: 'tooltip',
})
export class TooltipDirective implements OnInit {
    tooltipElement = document.createElement('div');
    visible = false;

    @Input()
    set tooltip(value: any) {
        this.tooltipElement.textContent = value;
    }

    hide() {
        this.tooltipElement.classList.remove('tooltip--active');
        console.debug('hide');
    }

    show() {
        this.tooltipElement.classList.add('tooltip--active');
        console.debug('show');
    }

    constructor(private element: ElementRef) {}

    ngOnInit() {
        this.tooltipElement.className = 'tooltip';
        this.element.nativeElement.appendChild(this.tooltipElement);
        this.element.nativeElement.classList.add('tooltip-container');
    }
}
