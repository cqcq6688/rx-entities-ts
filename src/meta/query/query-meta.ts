import { QueryCommand } from 'src/command/query-command';
import { TOKEN_GET_MANY } from 'src/magic/base/tokens';
import { createId } from 'src/util/create-id';
import { EntitySchema } from 'typeorm';
import { RelationMeta } from './relation-meta';

export class QueryMeta {
  id: number;
  entitySchema: EntitySchema<any>;
  model: string;
  relationMetas: RelationMeta[] = [];
  modelCommands: QueryCommand[] = [];
  conditionCommands: QueryCommand[] = [];

  fetchString: 'getOne' | 'getMany' = TOKEN_GET_MANY;

  constructor() {
    this.id = createId();
  }

  /**
   * 一个查询内modelAlias是唯一的
   */
  get alias() {
    return this.model?.toLowerCase() + this.id;
  }

  findOrRepairRelation(relationName: string): RelationMeta {
    return;
  }
}
