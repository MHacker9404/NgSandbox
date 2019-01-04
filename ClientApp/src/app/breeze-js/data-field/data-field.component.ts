import { Component, Input } from '@angular/core';
import * as _ from 'lodash';
import { EntityBase } from '../models/entities/entity-base';

@Component({
  selector: 'ngs-data-field',
  template: `
    <div
      class="form-group"
      [ngClass]="{ 'alert alert-danger': getValidationErrors() }"
    >
      <label class="control-label" for="_{{ propName.toLowerCase() }}">
        {{ propLabel }}:
      </label>
      <input
        id="_{{ propName.toLowerCase() }}"
        type="text"
        name="_{{ propName.toLowerCase() }}"
        class="form-control"
        [(ngModel)]="_dataProp"
      />
      <span class="help-block" *ngIf="getValidationErrors()">
        {{ getValidationErrors() }}
      </span>
    </div>
  `,
  styleUrls: ['./data-field.component.scss']
})
export class DataFieldComponent {
  @Input() propName: string;
  @Input() propLabel: string;
  @Input() entity: EntityBase;

  get _dataProp() {
    return this.entity && this.propName ? this.entity[this.propName] : '';
  }
  set _dataProp(value: any) {
    if (this.entity && this.propName && this.entity.entityAspect) {
      this.entity.entityAspect.clearValidationErrors();
      this.entity[this.propName] = value;
    }
  }

  getValidationErrors() {
    if (!this.entity || !this.entity.entityAspect) {
      return null;
    }
    this.entity.entityAspect.validateProperty(this.propName);
    const errors = this.entity.entityAspect.getValidationErrors(this.propName);
    return _.some(errors)
      ? errors.map(error => error.errorMessage).join(', ')
      : null;
  }
}
