import { QueryMeta } from 'src/meta/query/query-meta';
import { CommandMeta } from './command.meta';
import { CommandType, QueryCommand } from './query-command';

// eslint-disable-next-line prettier/prettier
export interface CommandClass extends Function {
  description?: string;
  version?: string;

  commandType: CommandType;
  commandName: string;
  new (commandMeta?: CommandMeta, queryMeta?: QueryMeta): QueryCommand;
}
