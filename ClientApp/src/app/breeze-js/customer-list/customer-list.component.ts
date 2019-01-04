import {
  Component,
  OnInit,
  ElementRef,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Observable, Subject, fromEvent } from 'rxjs';
import { ZzaDataService } from '../services/zza-data.service';
import { Customer } from '../models/entities/entity-model';
import {
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  map
} from 'rxjs/operators';

@Component({
  selector: 'ngs-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  private _unsubscribe$: Subject<void> = new Subject<void>();
  customers: Customer[];
  _selectedCustomer: Customer;
  _searchField = 'name';
  _searchInput: string;
  _currentPage = 1;
  _pageCount: number;
  _totalRecords: number;
  _pageSize = 5;

  constructor(
    private readonly _zzaSvc: ZzaDataService,
    private _er: ElementRef
  ) {
    fromEvent(_er.nativeElement, 'keyup')
      .pipe(
        takeUntil(this._unsubscribe$),
        debounceTime(500),
        distinctUntilChanged(),
        map(() => this._search(this._searchInput))
      )
      .subscribe();
  }

  async ngOnInit() {
    // try {
    //   const results = await this._zzaSvc.getCustomerSummaries(
    //     1,
    //     this._pageSize
    //   );
    //   this.customers = results.customers;
    //   this._totalRecords = results.totalRecords;
    //   this._pageCount = Math.floor(this._totalRecords / this._pageSize);
    //   if (this._pageCount < this._totalRecords / this._pageSize) {
    //     this._pageCount += 1;
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    this.refresh(1);
  }

  async save() {
    try {
      await this._zzaSvc.saveChanges();
      this.ngOnInit();
    } catch (error) {
      console.error(error);
    }
  }

  _onSelect(customer: Customer) {
    this._selectedCustomer = customer;
  }

  async _search(value) {
    this.customers = await this._zzaSvc.searchAsync(value, this._searchField);
  }

  async pageUp() {
    // try {
    //   if (this._currentPage * this._pageSize >= this._totalRecords) return;
    //   const newPage = this._currentPage + 1;
    //   const results = await this._zzaSvc.getCustomersPaged(
    //     newPage,
    //     this._pageSize
    //   );
    //   this.customers = results.customers;
    //   this._currentPage = newPage;
    // } catch (error) {
    //   console.error(error);
    // }
    try {
      if (this._currentPage * this._pageSize >= this._totalRecords) {
        return;
      }
      const newPage = this._currentPage + 1;
      this.refresh(newPage);
    } catch (error) {
      console.error(error);
    }
  }

  async pageDown() {
    // try {
    //   if (this._currentPage === 1) return;
    //   const newPage = this._currentPage - 1;
    //   const results = await this._zzaSvc.getCustomersPaged(
    //     newPage,
    //     this._pageSize
    //   );
    //   this.customers = results.customers;
    //   this._currentPage = newPage;
    // } catch (error) {
    //   console.error(error);
    // }
    try {
      if (this._currentPage === 1) {
        return;
      }
      const newPage = this._currentPage - 1;
      this.refresh(newPage);
    } catch (error) {
      console.error(error);
    }
  }

  async refresh(page: number = 1) {
    try {
      this._searchInput = '';
      const results = await this._zzaSvc.getCustomersPaged(
        page,
        this._pageSize
      );
      this.customers = results.customers;
      this._totalRecords = results.totalRecords;
      this._pageCount = Math.floor(this._totalRecords / this._pageSize);
      if (this._pageCount < this._totalRecords / this._pageSize) {
        this._pageCount += 1;
      }
      this._currentPage = page;
    } catch (error) {
      console.error(error);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
