import { Injectable } from '@angular/core';
import {
  EntityManager,
  EntityQuery,
  FetchStrategySymbol,
  FetchStrategy,
  Predicate,
  FilterQueryOp,
  Entity,
  core,
  EntityType,
  Validator,
  DataService,
  MetadataStore,
  NamingConvention
} from 'breeze-client';
import { RegistrationHelper } from '../models/entities/registration-helper';
import {
  Customer,
  Order,
  OrderStatus,
  ProductSize,
  Product
} from '../models/entities/entity-model';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Metadata } from '../models/entities/metadata';

@Injectable({
  providedIn: 'root'
})
export class ZzaDataService {
  private _customersCached = false;
  // private _em: EntityManager = new EntityManager(
  //   "http://zzaapi.azurewebsites.net/breeze/zza"
  // );

  private _em: EntityManager;

  private _initialized: boolean;

  // private _em: EntityManager = new EntityManager(
  //   'http://localhost:8181/breeze/zza'
  // );

  constructor() {
    const dataService = new DataService({
      serviceName: 'http://zzaapi.azurewebsites.net/breeze/zza',
      hasServerMetadata: false
    });
    const metadataStore = new MetadataStore({
      namingConvention: NamingConvention.camelCase
    });
    metadataStore.importMetadata(JSON.stringify(Metadata.value));
    this._em = new EntityManager({
      dataService: dataService,
      metadataStore: metadataStore
    });

    RegistrationHelper.register(this._em.metadataStore);
    console.log(this._em.metadataStore.getEntityTypes());

    this._em.entityChanged.subscribe(args => {
      //   console.log(
      //     `${args.entity.entityType.name} ${args.entityAction.toString()}`
      //   );
      const changes = this._em.getChanges();
      const chStr = this._em.exportEntities(changes);
      // localStorage["changeCache"] = chStr;
    });
  }

  async initialize(): Promise<boolean> {
    const promise = new Promise<boolean>(async (resolve, reject) => {
      try {
        if (this._initialized) {
          resolve(true);
        } else {
          this._initialized = true;
          this._em.attachEntity;
          // await this._em.fetchMetadata();
          // const existingChanges = localStorage['changeCache'];
          // if (existingChanges) {
          //   this._em.importEntities(existingChanges);
          //   localStorage.removeItem('changeCache');
          // }
          await this._em.executeQuery(EntityQuery.from('Lookups'));
          await this._initValidation();
          resolve(true);
        }
      } catch (error) {
        reject(false);
      }
    });
    return promise;
  }

  private async _initValidation(): Promise<void> {}

  async getOrderStatuses(): Promise<OrderStatus[]> {
    const promise = new Promise<OrderStatus[]>(async (resolve, reject) => {
      try {
        const strategy: FetchStrategySymbol = FetchStrategy.FromLocalCache;
        const statuses = <OrderStatus[]>(await this._em.executeQuery(
          EntityQuery.from('OrderStatuses')
            .using(strategy)
            .toType('OrderStatus')
        )).results;
        resolve(statuses);
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  }

  async getProductSizes(): Promise<ProductSize[]> {
    const promise = new Promise<ProductSize[]>(async (resolve, reject) => {
      try {
        const strategy: FetchStrategySymbol = FetchStrategy.FromLocalCache;
        const sizes = <ProductSize[]>(
          (await this._em.executeQuery(
            EntityQuery.from('ProductSizes').using(strategy)
          )).results
        );
        resolve(sizes);
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  }

  async getProducts(): Promise<Product[]> {
    const promise = new Promise<Product[]>(async (resolve, reject) => {
      try {
        let strategy: FetchStrategySymbol = FetchStrategy.FromLocalCache;
        let products = <Product[]>(
          (await this._em.executeQuery(
            EntityQuery.from('Products').using(strategy)
          )).results
        );
        if (products && _.some(products)) {
          resolve(products);
          return;
        }

        strategy = FetchStrategy.FromServer;
        products = <Product[]>(
          (await this._em.executeQuery(
            EntityQuery.from('Products').using(strategy)
          )).results
        );
        resolve(products);
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  }

  async getCustomers(): Promise<Customer[]> {
    const promise = new Promise<Customer[]>(async (resolve, reject) => {
      try {
        const query = EntityQuery.from('Customers').orderBy([
          'state',
          'lastName'
        ]);
        const results = <any>(await this._em.executeQuery(query)).results;
        resolve(results);
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  }

  async getCustomersPaged(startPage: number, pageSize: number): Promise<any> {
    const promise = new Promise<any>(async (resolve, reject) => {
      try {
        const query = EntityQuery.from('Customers')
          .orderBy(['state', 'lastName'])
          .skip((startPage - 1) * pageSize)
          .take(pageSize)
          .inlineCount();
        const results = <any>await this._em.executeQuery(query);
        resolve({
          customers: results.results as Customer[],
          totalRecords: results.inlineCount
        });
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  }

  async getCustomer(id: string): Promise<Customer> {
    const promise = new Promise<Customer>(async (resolve, reject) => {
      try {
        const query = EntityQuery.from('Customers').where('id', 'equals', id);
        const strategy: FetchStrategySymbol = !this._customersCached
          ? FetchStrategy.FromServer
          : FetchStrategy.FromLocalCache;
        const results = <any>(
          (await this._em.executeQuery(query.using(strategy))).results
        );
        if (_.some(results)) {
          resolve(results[0]);
        } else {
          resolve(null);
        }
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  }

  getCustomerById(id: string) {
    return this._em.getEntityByKey('Customer', id);
  }

  getCustomerOrderHistory(customerId: string): Order[] | PromiseLike<Order[]> {
    const promise = new Promise<Order[]>(async (resolve, reject) => {
      try {
        const query = EntityQuery.from('Orders')
          .where('customerId', FilterQueryOp.Equals, customerId)
          .expand([
            'orderItems',
            'orderItems.product',
            'orderItems.orderItemOptions'
          ]);
        const strategy: FetchStrategySymbol = !this._customersCached
          ? FetchStrategy.FromServer
          : FetchStrategy.FromLocalCache;
        const results = <any>(
          (await this._em.executeQuery(query.using(strategy))).results
        );
        if (_.some(results)) {
          resolve(results);
        } else {
          resolve(null);
        }
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  }

  async getCustomerSummaries(
    startPage: number,
    pageSize: number
  ): Promise<any> {
    const promise = new Promise<any>(async (resolve, reject) => {
      try {
        const strategy: FetchStrategySymbol = !this._customersCached
          ? FetchStrategy.FromServer
          : FetchStrategy.FromLocalCache;
        const query = EntityQuery.from('Customers')
          .orderBy(['state', 'lastName'])
          .select(['id', 'firstName', 'lastName', 'email', 'phone', 'state'])
          .skip((startPage - 1) * pageSize)
          .take(pageSize)
          .inlineCount();
        const results = <any>await this._em.executeQuery(query.using(strategy));
        resolve({
          customers: results.results,
          totalRecords: results.inlineCount
        });
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  }

  async createEntity(typeName: string): Promise<Entity> {
    const options: any = {};
    if (typeName === 'Customer') {
      options.id = core.getUuid();
      // console.log(options.id);
    }
    return this._em.createEntity(typeName, options);
  }

  async deleteCustomer(customer: Customer): Promise<void> {
    // const orders = await this.getCustomerOrderHistory(customer.id);
    // orders.slice().forEach(o => {
    //   o.orderItems.slice().forEach(oi => {
    //     oi.orderItemOptions
    //       .slice()
    //       .forEach(opt => opt.entityAspect.setDeleted());
    //     oi.entityAspect.setDeleted();
    //   });
    //   o.entityAspect.setDeleted();
    // });
    // customer.entityAspect.setDeleted();
  }

  searchAsync(value: any, field: string): Promise<Customer[]> {
    const promise = new Promise<Customer[]>(async (resolve, reject) => {
      try {
        let pred: Predicate;
        if (field === 'name') {
          pred = new Predicate('firstName', FilterQueryOp.Contains, value).or(
            'lastName',
            FilterQueryOp.Contains,
            value
          );
        } else {
          pred = new Predicate(field, FilterQueryOp.Contains, value);
        }
        const strategy: FetchStrategySymbol = !this._customersCached
          ? FetchStrategy.FromServer
          : FetchStrategy.FromLocalCache;
        const query = EntityQuery.from('Customers').where(pred);
        const results = <Customer[]>(
          (await this._em.executeQuery(query.using(strategy))).results
        );
        resolve(results);
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  }

  private getDummyData(): Customer[] {
    const cust1 = new Customer();
    cust1.firstName = 'Fred';
    cust1.lastName = 'Flintstone';
    const cust2 = new Customer();
    cust2.firstName = 'Barney';
    cust2.lastName = 'Rubble';
    return [cust1, cust2];
  }

  async saveChanges(): Promise<void> {
    const promise = new Promise<void>(async (resolve, reject) => {
      try {
        await this._em.saveChanges();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  }

  async submitOrder(order: Order): Promise<void> {
    const promise = new Promise<void>(async (resolve, reject) => {
      try {
        const items: any[] = [order, ...order.orderItems];
        await this._em.saveChanges(items);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  }
}
