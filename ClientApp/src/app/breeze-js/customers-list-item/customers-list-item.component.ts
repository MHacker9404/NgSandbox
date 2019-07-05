import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Customer } from '../models/entities/customer';
import { ModalDirective } from 'ngx-bootstrap';
import { ZzaDataService } from '../services/zza-data.service';

@Component({
    selector: 'ngs-customers-list-item',
    template: `
        <div style="margin-top:10px;">
            <hr [ngClass]="{ 'current-customer': _isSelected }" />
            <div class="row">
                <div class="col-md-6">
                    <span>{{ customer.firstName }} {{ customer.lastName }}</span>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <span>{{ customer.email }}</span>
                </div>
            </div>
            <div class="row">
                <div class="col-md-6">
                    <span>{{ customer.phone }}</span>
                </div>
                <div class="col-md-3">
                    <span>{{ customer.state }}</span>
                </div>
            </div>
            <div class="row" *ngIf="_isSelected">
                <div class="col-md-6">
                    <a class="btn btn-primary" routerLink="/customer-detail/{{ customer.id }}">Details</a>
                    <button class="btn btn-danger" (click)="deleteCustomer()">
                        Delete
                    </button>
                    <button class="btn btn-succes" routerLink="/order/{{ customer.id }}">
                        Place Order
                    </button>
                </div>
            </div>
            <hr [ngClass]="{ 'current-customer': _isSelected }" />
        </div>
        <div
            class="modal fade"
            bsModal
            #deleteModal="bs-modal"
            [config]="{ backdrop: 'static' }"
            tabindex="-1"
            role="dialog"
            aria-labelledby="mySmallModalLabel"
            aria-hidden="true"
        >
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title pull-left">Delete Customer</h4>
                        <button type="button" class="close pull-right" aria-label="Close" (click)="deleteModal.hide()">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this customer?
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" (click)="deleteModal.hide()">
                            Cancel
                        </button>
                        <button class="btn btn-danger" (click)="confirmDeleteCustomer()">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrls: ['./customers-list-item.component.scss'],
})
export class CustomersListItemComponent implements OnInit {
    @ViewChild('deleteModal', { read: null, static: true }) deleteModal: ModalDirective;
    @Output() deleted = new EventEmitter<void>();
    _isSelected = false;
    constructor(private _svc: ZzaDataService) {}
    @Input() customer: Customer;
    @Input() public set selectedCustomer(value: Customer) {
        this._isSelected = value && value.id === this.customer.id;
    }

    ngOnInit() {}

    deleteCustomer() {
        this.deleteModal.show();
    }

    async confirmDeleteCustomer() {
        try {
            this.deleteModal.hide();
            // this.customer.entityAspect.setDeleted();
            await this._svc.deleteCustomer(this.customer);
            await this._svc.saveChanges();
            this.deleted.emit();
        } catch (error) {
            console.error(error);
        }
    }
}
