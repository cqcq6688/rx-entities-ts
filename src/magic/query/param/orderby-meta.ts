import { SelectQueryBuilder } from 'typeorm';

export class OrderByMeta {
  private _orderBy: any;

  constructor(orderArray: any) {
    this._orderBy = orderArray;
  }

  makeQueryBuilder(
    qb: SelectQueryBuilder<any>,
    modelAlias?: string,
  ): SelectQueryBuilder<any> {
    const orderMap = this.getpMap(modelAlias);
    if (orderMap) {
      qb.orderBy(orderMap);
    }
    return qb;
  }

  getpMap(modelAlias: string) {
    if (this._orderBy.length === 0) {
      return undefined;
    }
    const orderMap = {} as any;
    for (const key in this._orderBy) {
      orderMap[`${modelAlias}.${key}`] = this._orderBy[key];
    }
    return orderMap;
  }
}