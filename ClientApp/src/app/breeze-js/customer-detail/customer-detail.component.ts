import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer, Order } from '../models/entities/entity-model';
import { Router, ActivatedRoute } from '@angular/router';
import { ZzaDataService } from '../services/zza-data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'ngs-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  _customer: Customer = new Customer();
  _errorMessage: string;
  _isEditMode: boolean;
  @ViewChild('myForm') _myForm: NgForm;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _zzaRepository: ZzaDataService
  ) {}

  _orders: Order[];

  async ngOnInit() {
    try {
      if (this._route.routeConfig.path !== 'customer-add') {
        // edit customer
        this._isEditMode = true;
        const id = this._route.snapshot.params['customerId'];
        this._customer = await this._zzaRepository.getCustomer(id);

        // this._customer.entityAspect.propertyChanged.subscribe(args => {
        //   //   console.log(
        //   //     args,
        //   //     `${args.propertyName}: was ${args.oldValue}, now ${args.newValue}`
        //   //   )
        // });
        this._orders = await this._zzaRepository.getCustomerOrderHistory(id);
      } else {
        // add customer
        this._customer = <Customer>(
          await this._zzaRepository.createEntity('Customer')
        );
      }
    } catch (error) {
      this._errorMessage = error.message;
    }
  }

  async onSave() {
    try {
      if (this._myForm.invalid) {
        return;
      }

      await this._zzaRepository.saveChanges();
      await this._router.navigate(['customer-list']);
    } catch (error) {
      if (!error.entityErrors && error.message) {
        this._errorMessage = error.message;
      }
    }
  }
  getValidationErrors(propertyName: string) {
    if (!this._customer || !this._customer.entityAspect) {
      return;
    }
    this._customer.entityAspect.validateProperty(propertyName);
    const errors = this._customer.entityAspect.getValidationErrors(
      propertyName
    );
    if (errors && errors.length > 0) {
      let error = '';
      errors.forEach(e => {
        if (error.trim()) {
          error += ', ';
        }
        error += e.errorMessage;
      });
      return error;
    } else {
      return null;
    }
  }
}
