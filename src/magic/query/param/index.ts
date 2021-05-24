import { JsonUnitMeta } from './json-unit-meta';
import { ModelUnitMeta } from './model-unit-meta';
import { RelationMeta } from './relation-meta';
import { TOKEN_MODEL } from './keyword_tokens';
import { WhereMeta } from './where-meta';
import { ConditionMeta } from './condition-meta';

export class MagicQueryParamsParser {
  private _json: any;
  private _modelUnit: ModelUnitMeta;
  relations: RelationMeta[];
  whereMeta: WhereMeta = new WhereMeta();

  constructor(jsonStr: string) {
    this._json = JSON.parse(jsonStr || '{}');
    for (const keyStr in this._json) {
      const value = this._json[keyStr];
      const jsonUnit = new JsonUnitMeta(keyStr, value);
      if (jsonUnit.key.toLowerCase() === TOKEN_MODEL) {
        this._modelUnit = new ModelUnitMeta(jsonUnit);
      } else if (jsonUnit.isRlationShip()) {
      } else {
        this.whereMeta.addCondition(new ConditionMeta(keyStr, value));
      }
    }
  }

  get modelUnit() {
    return this._modelUnit;
  }

  get takeCommand() {
    return this._modelUnit.takeCommand;
  }
}