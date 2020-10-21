import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
  Sql,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw, Sql }

/**
 * Prisma Client JS version: 2.9.0
 * Query Engine version: 369b3694b7edb869fad14827a33ad3f3f49bbc20
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
  GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */


export type PrismaAction =
  | 'findOne'
  | 'findMany'
  | 'findFirst'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: PrismaAction
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']
  /**
   * @deprecated renamed to `$transaction`
   */
  transaction: PromiseConstructor['all']

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): UserDelegate;

  /**
   * `prisma.employee`: Exposes CRUD operations for the **Employee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employee.findMany()
    * ```
    */
  get employee(): EmployeeDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const UserDistinctFieldEnum: {
  id: 'id',
  key: 'key',
  email: 'email',
  cpf: 'cpf',
  fullname: 'fullname',
  datebirth: 'datebirth',
  preferencialname: 'preferencialname',
  nickname: 'nickname',
  role: 'role',
  online: 'online',
  computer: 'computer',
  createdat: 'createdat',
  updatedat: 'updatedat'
};

export declare type UserDistinctFieldEnum = (typeof UserDistinctFieldEnum)[keyof typeof UserDistinctFieldEnum]


export declare const EmployeeDistinctFieldEnum: {
  id: 'id',
  email: 'email',
  secret: 'secret',
  cpf: 'cpf',
  datebirth: 'datebirth',
  preferencialname: 'preferencialname',
  fullname: 'fullname',
  role: 'role',
  createdat: 'createdat',
  updatedat: 'updatedat'
};

export declare type EmployeeDistinctFieldEnum = (typeof EmployeeDistinctFieldEnum)[keyof typeof EmployeeDistinctFieldEnum]


export declare const Role: {
  ADMIN: 'ADMIN',
  CANDIDATE: 'CANDIDATE',
  EMPLOYER: 'EMPLOYER',
  USER: 'USER'
};

export declare type Role = (typeof Role)[keyof typeof Role]


export declare const Online: {
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE'
};

export declare type Online = (typeof Online)[keyof typeof Online]


export declare const Computer: {
  NONE: 'NONE',
  UM: 'UM',
  DOIS: 'DOIS',
  TRES: 'TRES',
  QUATRO: 'QUATRO',
  CINCO: 'CINCO',
  SEIS: 'SEIS',
  SETE: 'SETE',
  OITO: 'OITO',
  NOVE: 'NOVE',
  DEZ: 'DEZ'
};

export declare type Computer = (typeof Computer)[keyof typeof Computer]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export declare const QueryMode: {
  default: 'default',
  insensitive: 'insensitive'
};

export declare type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]



/**
 * Model User
 */

export type User = {
  id: number
  key: string
  email: string
  cpf: string
  fullname: string
  datebirth: string | null
  preferencialname: string | null
  nickname: string | null
  role: Role
  online: Online
  computer: Computer
  createdat: Date
  updatedat: Date
}


export type AggregateUser = {
  count: number
  avg: UserAvgAggregateOutputType | null
  sum: UserSumAggregateOutputType | null
  min: UserMinAggregateOutputType | null
  max: UserMaxAggregateOutputType | null
}

export type UserAvgAggregateOutputType = {
  id: number
}

export type UserSumAggregateOutputType = {
  id: number
}

export type UserMinAggregateOutputType = {
  id: number
}

export type UserMaxAggregateOutputType = {
  id: number
}


export type UserAvgAggregateInputType = {
  id?: true
}

export type UserSumAggregateInputType = {
  id?: true
}

export type UserMinAggregateInputType = {
  id?: true
}

export type UserMaxAggregateInputType = {
  id?: true
}

export type AggregateUserArgs = {
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
  count?: true
  avg?: UserAvgAggregateInputType
  sum?: UserSumAggregateInputType
  min?: UserMinAggregateInputType
  max?: UserMaxAggregateInputType
}

export type GetUserAggregateType<T extends AggregateUserArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetUserAggregateScalarType<T[P]>
}

export type GetUserAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof UserAvgAggregateOutputType ? UserAvgAggregateOutputType[P] : never
}
    
    

export type UserSelect = {
  id?: boolean
  key?: boolean
  email?: boolean
  cpf?: boolean
  fullname?: boolean
  datebirth?: boolean
  preferencialname?: boolean
  nickname?: boolean
  role?: boolean
  online?: boolean
  computer?: boolean
  createdat?: boolean
  updatedat?: boolean
}

export type UserGetPayload<
  S extends boolean | null | undefined | UserArgs,
  U = keyof S
> = S extends true
  ? User
  : S extends undefined
  ? never
  : S extends UserArgs | FindManyUserArgs
  ? 'include' extends U
    ? User 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof User ? User[P]
: 
 never
    }
  : User
: User


export interface UserDelegate {
  /**
   * Find zero or one User that matches the filter.
   * @param {FindOneUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneUserArgs>(
    args: Subset<T, FindOneUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find the first User that matches the filter.
   * @param {FindFirstUserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstUserArgs>(
    args?: Subset<T, FindFirstUserArgs>
  ): CheckSelect<T, Prisma__UserClient<User | null>, Prisma__UserClient<UserGetPayload<T> | null>>
  /**
   * Find zero or more Users that matches the filter.
   * @param {FindManyUserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyUserArgs>(
    args?: Subset<T, FindManyUserArgs>
  ): CheckSelect<T, Promise<Array<User>>, Promise<Array<UserGetPayload<T>>>>
  /**
   * Create a User.
   * @param {UserCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const User = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends UserCreateArgs>(
    args: Subset<T, UserCreateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete a User.
   * @param {UserDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const User = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends UserDeleteArgs>(
    args: Subset<T, UserDeleteArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Update one User.
   * @param {UserUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends UserUpdateArgs>(
    args: Subset<T, UserUpdateArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends UserDeleteManyArgs>(
    args: Subset<T, UserDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends UserUpdateManyArgs>(
    args: Subset<T, UserUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {UserUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends UserUpsertArgs>(
    args: Subset<T, UserUpsertArgs>
  ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyUserArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateUserArgs>(args: Subset<T, AggregateUserArgs>): Promise<GetUserAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__UserClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * User findOne
 */
export type FindOneUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Filter, which User to fetch.
  **/
  where: UserWhereUniqueInput
}


/**
 * User findFirst
 */
export type FindFirstUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Filter, which User to fetch.
  **/
  where?: UserWhereInput
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  cursor?: UserWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User findMany
 */
export type FindManyUserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Filter, which Users to fetch.
  **/
  where?: UserWhereInput
  /**
   * Determine the order of the Users to fetch.
  **/
  orderBy?: Enumerable<UserOrderByInput> | UserOrderByInput
  /**
   * Sets the position for listing Users.
  **/
  cursor?: UserWhereUniqueInput
  /**
   * The number of Users to fetch. If negative number, it will take Users before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Users.
  **/
  skip?: number
  distinct?: Enumerable<UserDistinctFieldEnum>
}


/**
 * User create
 */
export type UserCreateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * The data needed to create a User.
  **/
  data: UserCreateInput
}


/**
 * User update
 */
export type UserUpdateArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * The data needed to update a User.
  **/
  data: UserUpdateInput
  /**
   * Choose, which User to update.
  **/
  where: UserWhereUniqueInput
}


/**
 * User updateMany
 */
export type UserUpdateManyArgs = {
  data: UserUpdateManyMutationInput
  where?: UserWhereInput
}


/**
 * User upsert
 */
export type UserUpsertArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * The filter to search for the User to update in case it exists.
  **/
  where: UserWhereUniqueInput
  /**
   * In case the User found by the `where` argument doesn't exist, create a new User with this data.
  **/
  create: UserCreateInput
  /**
   * In case the User was found with the provided `where` argument, update it with this data.
  **/
  update: UserUpdateInput
}


/**
 * User delete
 */
export type UserDeleteArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
  /**
   * Filter which User to delete.
  **/
  where: UserWhereUniqueInput
}


/**
 * User deleteMany
 */
export type UserDeleteManyArgs = {
  where?: UserWhereInput
}


/**
 * User without action
 */
export type UserArgs = {
  /**
   * Select specific fields to fetch from the User
  **/
  select?: UserSelect | null
}



/**
 * Model Employee
 */

export type Employee = {
  id: string
  email: string
  secret: string
  cpf: string
  datebirth: string | null
  preferencialname: string | null
  fullname: string
  role: Role
  createdat: Date
  updatedat: Date
}


export type AggregateEmployee = {
  count: number
}



export type AggregateEmployeeArgs = {
  where?: EmployeeWhereInput
  orderBy?: Enumerable<EmployeeOrderByInput> | EmployeeOrderByInput
  cursor?: EmployeeWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<EmployeeDistinctFieldEnum>
  count?: true
}

export type GetEmployeeAggregateType<T extends AggregateEmployeeArgs> = {
  [P in keyof T]: P extends 'count' ? number : never
}


    
    

export type EmployeeSelect = {
  id?: boolean
  email?: boolean
  secret?: boolean
  cpf?: boolean
  datebirth?: boolean
  preferencialname?: boolean
  fullname?: boolean
  role?: boolean
  createdat?: boolean
  updatedat?: boolean
}

export type EmployeeGetPayload<
  S extends boolean | null | undefined | EmployeeArgs,
  U = keyof S
> = S extends true
  ? Employee
  : S extends undefined
  ? never
  : S extends EmployeeArgs | FindManyEmployeeArgs
  ? 'include' extends U
    ? Employee 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof Employee ? Employee[P]
: 
 never
    }
  : Employee
: Employee


export interface EmployeeDelegate {
  /**
   * Find zero or one Employee that matches the filter.
   * @param {FindOneEmployeeArgs} args - Arguments to find a Employee
   * @example
   * // Get one Employee
   * const employee = await prisma.employee.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneEmployeeArgs>(
    args: Subset<T, FindOneEmployeeArgs>
  ): CheckSelect<T, Prisma__EmployeeClient<Employee | null>, Prisma__EmployeeClient<EmployeeGetPayload<T> | null>>
  /**
   * Find the first Employee that matches the filter.
   * @param {FindFirstEmployeeArgs} args - Arguments to find a Employee
   * @example
   * // Get one Employee
   * const employee = await prisma.employee.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstEmployeeArgs>(
    args?: Subset<T, FindFirstEmployeeArgs>
  ): CheckSelect<T, Prisma__EmployeeClient<Employee | null>, Prisma__EmployeeClient<EmployeeGetPayload<T> | null>>
  /**
   * Find zero or more Employees that matches the filter.
   * @param {FindManyEmployeeArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Employees
   * const employees = await prisma.employee.findMany()
   * 
   * // Get first 10 Employees
   * const employees = await prisma.employee.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const employeeWithIdOnly = await prisma.employee.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyEmployeeArgs>(
    args?: Subset<T, FindManyEmployeeArgs>
  ): CheckSelect<T, Promise<Array<Employee>>, Promise<Array<EmployeeGetPayload<T>>>>
  /**
   * Create a Employee.
   * @param {EmployeeCreateArgs} args - Arguments to create a Employee.
   * @example
   * // Create one Employee
   * const Employee = await prisma.employee.create({
   *   data: {
   *     // ... data to create a Employee
   *   }
   * })
   * 
  **/
  create<T extends EmployeeCreateArgs>(
    args: Subset<T, EmployeeCreateArgs>
  ): CheckSelect<T, Prisma__EmployeeClient<Employee>, Prisma__EmployeeClient<EmployeeGetPayload<T>>>
  /**
   * Delete a Employee.
   * @param {EmployeeDeleteArgs} args - Arguments to delete one Employee.
   * @example
   * // Delete one Employee
   * const Employee = await prisma.employee.delete({
   *   where: {
   *     // ... filter to delete one Employee
   *   }
   * })
   * 
  **/
  delete<T extends EmployeeDeleteArgs>(
    args: Subset<T, EmployeeDeleteArgs>
  ): CheckSelect<T, Prisma__EmployeeClient<Employee>, Prisma__EmployeeClient<EmployeeGetPayload<T>>>
  /**
   * Update one Employee.
   * @param {EmployeeUpdateArgs} args - Arguments to update one Employee.
   * @example
   * // Update one Employee
   * const employee = await prisma.employee.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends EmployeeUpdateArgs>(
    args: Subset<T, EmployeeUpdateArgs>
  ): CheckSelect<T, Prisma__EmployeeClient<Employee>, Prisma__EmployeeClient<EmployeeGetPayload<T>>>
  /**
   * Delete zero or more Employees.
   * @param {EmployeeDeleteManyArgs} args - Arguments to filter Employees to delete.
   * @example
   * // Delete a few Employees
   * const { count } = await prisma.employee.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends EmployeeDeleteManyArgs>(
    args: Subset<T, EmployeeDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Employees.
   * @param {EmployeeUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Employees
   * const employee = await prisma.employee.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends EmployeeUpdateManyArgs>(
    args: Subset<T, EmployeeUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Employee.
   * @param {EmployeeUpsertArgs} args - Arguments to update or create a Employee.
   * @example
   * // Update or create a Employee
   * const employee = await prisma.employee.upsert({
   *   create: {
   *     // ... data to create a Employee
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Employee we want to update
   *   }
   * })
  **/
  upsert<T extends EmployeeUpsertArgs>(
    args: Subset<T, EmployeeUpsertArgs>
  ): CheckSelect<T, Prisma__EmployeeClient<Employee>, Prisma__EmployeeClient<EmployeeGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyEmployeeArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateEmployeeArgs>(args: Subset<T, AggregateEmployeeArgs>): Promise<GetEmployeeAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for Employee.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__EmployeeClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * Employee findOne
 */
export type FindOneEmployeeArgs = {
  /**
   * Select specific fields to fetch from the Employee
  **/
  select?: EmployeeSelect | null
  /**
   * Filter, which Employee to fetch.
  **/
  where: EmployeeWhereUniqueInput
}


/**
 * Employee findFirst
 */
export type FindFirstEmployeeArgs = {
  /**
   * Select specific fields to fetch from the Employee
  **/
  select?: EmployeeSelect | null
  /**
   * Filter, which Employee to fetch.
  **/
  where?: EmployeeWhereInput
  orderBy?: Enumerable<EmployeeOrderByInput> | EmployeeOrderByInput
  cursor?: EmployeeWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<EmployeeDistinctFieldEnum>
}


/**
 * Employee findMany
 */
export type FindManyEmployeeArgs = {
  /**
   * Select specific fields to fetch from the Employee
  **/
  select?: EmployeeSelect | null
  /**
   * Filter, which Employees to fetch.
  **/
  where?: EmployeeWhereInput
  /**
   * Determine the order of the Employees to fetch.
  **/
  orderBy?: Enumerable<EmployeeOrderByInput> | EmployeeOrderByInput
  /**
   * Sets the position for listing Employees.
  **/
  cursor?: EmployeeWhereUniqueInput
  /**
   * The number of Employees to fetch. If negative number, it will take Employees before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` Employees.
  **/
  skip?: number
  distinct?: Enumerable<EmployeeDistinctFieldEnum>
}


/**
 * Employee create
 */
export type EmployeeCreateArgs = {
  /**
   * Select specific fields to fetch from the Employee
  **/
  select?: EmployeeSelect | null
  /**
   * The data needed to create a Employee.
  **/
  data: EmployeeCreateInput
}


/**
 * Employee update
 */
export type EmployeeUpdateArgs = {
  /**
   * Select specific fields to fetch from the Employee
  **/
  select?: EmployeeSelect | null
  /**
   * The data needed to update a Employee.
  **/
  data: EmployeeUpdateInput
  /**
   * Choose, which Employee to update.
  **/
  where: EmployeeWhereUniqueInput
}


/**
 * Employee updateMany
 */
export type EmployeeUpdateManyArgs = {
  data: EmployeeUpdateManyMutationInput
  where?: EmployeeWhereInput
}


/**
 * Employee upsert
 */
export type EmployeeUpsertArgs = {
  /**
   * Select specific fields to fetch from the Employee
  **/
  select?: EmployeeSelect | null
  /**
   * The filter to search for the Employee to update in case it exists.
  **/
  where: EmployeeWhereUniqueInput
  /**
   * In case the Employee found by the `where` argument doesn't exist, create a new Employee with this data.
  **/
  create: EmployeeCreateInput
  /**
   * In case the Employee was found with the provided `where` argument, update it with this data.
  **/
  update: EmployeeUpdateInput
}


/**
 * Employee delete
 */
export type EmployeeDeleteArgs = {
  /**
   * Select specific fields to fetch from the Employee
  **/
  select?: EmployeeSelect | null
  /**
   * Filter which Employee to delete.
  **/
  where: EmployeeWhereUniqueInput
}


/**
 * Employee deleteMany
 */
export type EmployeeDeleteManyArgs = {
  where?: EmployeeWhereInput
}


/**
 * Employee without action
 */
export type EmployeeArgs = {
  /**
   * Select specific fields to fetch from the Employee
  **/
  select?: EmployeeSelect | null
}



/**
 * Deep Input Types
 */


export type UserWhereInput = {
  AND?: UserWhereInput | Enumerable<UserWhereInput>
  OR?: UserWhereInput | Enumerable<UserWhereInput>
  NOT?: UserWhereInput | Enumerable<UserWhereInput>
  id?: IntFilter | number
  key?: StringFilter | string
  email?: StringFilter | string
  cpf?: StringFilter | string
  fullname?: StringFilter | string
  datebirth?: StringNullableFilter | string | null
  preferencialname?: StringNullableFilter | string | null
  nickname?: StringNullableFilter | string | null
  role?: EnumRoleFilter | Role
  online?: EnumOnlineFilter | Online
  computer?: EnumComputerFilter | Computer
  createdat?: DateTimeFilter | Date | string
  updatedat?: DateTimeFilter | Date | string
}

export type UserOrderByInput = {
  id?: SortOrder
  key?: SortOrder
  email?: SortOrder
  cpf?: SortOrder
  fullname?: SortOrder
  datebirth?: SortOrder
  preferencialname?: SortOrder
  nickname?: SortOrder
  role?: SortOrder
  online?: SortOrder
  computer?: SortOrder
  createdat?: SortOrder
  updatedat?: SortOrder
}

export type UserWhereUniqueInput = {
  id?: number
  key?: string
  email?: string
  cpf?: string
  nickname?: string
}

export type EmployeeWhereInput = {
  AND?: EmployeeWhereInput | Enumerable<EmployeeWhereInput>
  OR?: EmployeeWhereInput | Enumerable<EmployeeWhereInput>
  NOT?: EmployeeWhereInput | Enumerable<EmployeeWhereInput>
  id?: StringFilter | string
  email?: StringFilter | string
  secret?: StringFilter | string
  cpf?: StringFilter | string
  datebirth?: StringNullableFilter | string | null
  preferencialname?: StringNullableFilter | string | null
  fullname?: StringFilter | string
  role?: EnumRoleFilter | Role
  createdat?: DateTimeFilter | Date | string
  updatedat?: DateTimeFilter | Date | string
}

export type EmployeeOrderByInput = {
  id?: SortOrder
  email?: SortOrder
  secret?: SortOrder
  cpf?: SortOrder
  datebirth?: SortOrder
  preferencialname?: SortOrder
  fullname?: SortOrder
  role?: SortOrder
  createdat?: SortOrder
  updatedat?: SortOrder
}

export type EmployeeWhereUniqueInput = {
  id?: string
  email?: string
  cpf?: string
}

export type UserCreateInput = {
  key?: string
  email: string
  cpf: string
  fullname: string
  datebirth?: string | null
  preferencialname?: string | null
  nickname?: string | null
  role?: Role
  online?: Online
  computer?: Computer
  createdat?: Date | string
  updatedat?: Date | string
}

export type UserUpdateInput = {
  key?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  cpf?: string | StringFieldUpdateOperationsInput
  fullname?: string | StringFieldUpdateOperationsInput
  datebirth?: string | NullableStringFieldUpdateOperationsInput | null
  preferencialname?: string | NullableStringFieldUpdateOperationsInput | null
  nickname?: string | NullableStringFieldUpdateOperationsInput | null
  role?: Role | EnumRoleFieldUpdateOperationsInput
  online?: Online | EnumOnlineFieldUpdateOperationsInput
  computer?: Computer | EnumComputerFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type UserUpdateManyMutationInput = {
  key?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  cpf?: string | StringFieldUpdateOperationsInput
  fullname?: string | StringFieldUpdateOperationsInput
  datebirth?: string | NullableStringFieldUpdateOperationsInput | null
  preferencialname?: string | NullableStringFieldUpdateOperationsInput | null
  nickname?: string | NullableStringFieldUpdateOperationsInput | null
  role?: Role | EnumRoleFieldUpdateOperationsInput
  online?: Online | EnumOnlineFieldUpdateOperationsInput
  computer?: Computer | EnumComputerFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type EmployeeCreateInput = {
  id?: string
  email: string
  secret?: string
  cpf: string
  datebirth?: string | null
  preferencialname?: string | null
  fullname: string
  role?: Role
  createdat?: Date | string
  updatedat?: Date | string
}

export type EmployeeUpdateInput = {
  id?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  secret?: string | StringFieldUpdateOperationsInput
  cpf?: string | StringFieldUpdateOperationsInput
  datebirth?: string | NullableStringFieldUpdateOperationsInput | null
  preferencialname?: string | NullableStringFieldUpdateOperationsInput | null
  fullname?: string | StringFieldUpdateOperationsInput
  role?: Role | EnumRoleFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type EmployeeUpdateManyMutationInput = {
  id?: string | StringFieldUpdateOperationsInput
  email?: string | StringFieldUpdateOperationsInput
  secret?: string | StringFieldUpdateOperationsInput
  cpf?: string | StringFieldUpdateOperationsInput
  datebirth?: string | NullableStringFieldUpdateOperationsInput | null
  preferencialname?: string | NullableStringFieldUpdateOperationsInput | null
  fullname?: string | StringFieldUpdateOperationsInput
  role?: Role | EnumRoleFieldUpdateOperationsInput
  createdat?: Date | string | DateTimeFieldUpdateOperationsInput
  updatedat?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: string | NestedStringFilter
}

export type StringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: string | NestedStringNullableFilter | null
}

export type EnumRoleFilter = {
  equals?: Role
  in?: Enumerable<Role>
  notIn?: Enumerable<Role>
  not?: Role | NestedEnumRoleFilter
}

export type EnumOnlineFilter = {
  equals?: Online
  in?: Enumerable<Online>
  notIn?: Enumerable<Online>
  not?: Online | NestedEnumOnlineFilter
}

export type EnumComputerFilter = {
  equals?: Computer
  in?: Enumerable<Computer>
  notIn?: Enumerable<Computer>
  not?: Computer | NestedEnumComputerFilter
}

export type DateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type NullableStringFieldUpdateOperationsInput = {
  set?: string | null
}

export type EnumRoleFieldUpdateOperationsInput = {
  set?: Role
}

export type EnumOnlineFieldUpdateOperationsInput = {
  set?: Online
}

export type EnumComputerFieldUpdateOperationsInput = {
  set?: Computer
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type NestedStringNullableFilter = {
  equals?: string | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringNullableFilter | null
}

export type NestedEnumRoleFilter = {
  equals?: Role
  in?: Enumerable<Role>
  notIn?: Enumerable<Role>
  not?: Role | NestedEnumRoleFilter
}

export type NestedEnumOnlineFilter = {
  equals?: Online
  in?: Enumerable<Online>
  notIn?: Enumerable<Online>
  not?: Online | NestedEnumOnlineFilter
}

export type NestedEnumComputerFilter = {
  equals?: Computer
  in?: Enumerable<Computer>
  notIn?: Enumerable<Computer>
  not?: Computer | NestedEnumComputerFilter
}

export type NestedDateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
