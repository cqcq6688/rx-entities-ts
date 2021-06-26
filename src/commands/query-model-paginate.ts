import { CommandType, QueryCommand } from 'src/command/query-command';
import { QueryResult } from 'src/common/query-result';
import { SelectQueryBuilder } from 'typeorm';

export class QueryModelPaginateCommand extends QueryCommand {
  static description = `
    Magic query command, Paginate the results.
  `;

  static version = '1.0';

  static commandType = CommandType.QUERY_MODEL_COMMAND;

  static commandName = 'paginate';

  isEffectResultCount = true;

  get params() {
    return this.commandMeta.params;
  }

  get count() {
    return this.commandMeta.getFistNumberParam();
  }

  get pageSize(): number {
    return parseInt(this.commandMeta.params[0]);
  }

  get pageIndex() {
    return parseInt(this.commandMeta.params[1]);
  }

  addToQueryBuilder(qb: SelectQueryBuilder<any>): SelectQueryBuilder<any> {
    console.assert(
      this.commandMeta.params.length > 0,
      'Too few pagination parmas',
    );
    qb.skip(this.pageSize * this.pageIndex).take(this.pageSize);
    return qb;
  }

  filterResult(result: QueryResult): QueryResult {
    result.pagination = {
      pageSize: this.pageSize,
      pageIndex: this.pageIndex,
      totalCount: result.totalCount,
    };
    return result;
  }
}