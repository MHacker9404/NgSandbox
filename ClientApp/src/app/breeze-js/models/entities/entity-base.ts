import { EntityAspect, EntityType, Entity } from 'breeze-client';

export class EntityBase implements Entity {
  // -setDeleted(), invoke validation, add validation rules, track entity state,
  // original property values
  entityAspect: EntityAspect;
  entityType: EntityType;

  get $typeName(): string {
    return this.entityAspect
      ? this.entityAspect.getKey().entityType.shortName
      : '';
  }
}
