
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model carteiras
 * 
 */
export type carteiras = $Result.DefaultSelection<Prisma.$carteirasPayload>
/**
 * Model lancamento
 * 
 */
export type lancamento = $Result.DefaultSelection<Prisma.$lancamentoPayload>
/**
 * Model usuario
 * 
 */
export type usuario = $Result.DefaultSelection<Prisma.$usuarioPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Carteiras
 * const carteiras = await prisma.carteiras.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Carteiras
   * const carteiras = await prisma.carteiras.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.carteiras`: Exposes CRUD operations for the **carteiras** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Carteiras
    * const carteiras = await prisma.carteiras.findMany()
    * ```
    */
  get carteiras(): Prisma.carteirasDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.lancamento`: Exposes CRUD operations for the **lancamento** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lancamentos
    * const lancamentos = await prisma.lancamento.findMany()
    * ```
    */
  get lancamento(): Prisma.lancamentoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usuario`: Exposes CRUD operations for the **usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.usuarioDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.8.2
   * Query Engine version: 2060c79ba17c6bb9f5823312b6f6b7f4a845738e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    carteiras: 'carteiras',
    lancamento: 'lancamento',
    usuario: 'usuario'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "carteiras" | "lancamento" | "usuario"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      carteiras: {
        payload: Prisma.$carteirasPayload<ExtArgs>
        fields: Prisma.carteirasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.carteirasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteirasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.carteirasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteirasPayload>
          }
          findFirst: {
            args: Prisma.carteirasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteirasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.carteirasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteirasPayload>
          }
          findMany: {
            args: Prisma.carteirasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteirasPayload>[]
          }
          create: {
            args: Prisma.carteirasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteirasPayload>
          }
          createMany: {
            args: Prisma.carteirasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.carteirasCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteirasPayload>[]
          }
          delete: {
            args: Prisma.carteirasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteirasPayload>
          }
          update: {
            args: Prisma.carteirasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteirasPayload>
          }
          deleteMany: {
            args: Prisma.carteirasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.carteirasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.carteirasUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteirasPayload>[]
          }
          upsert: {
            args: Prisma.carteirasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteirasPayload>
          }
          aggregate: {
            args: Prisma.CarteirasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCarteiras>
          }
          groupBy: {
            args: Prisma.carteirasGroupByArgs<ExtArgs>
            result: $Utils.Optional<CarteirasGroupByOutputType>[]
          }
          count: {
            args: Prisma.carteirasCountArgs<ExtArgs>
            result: $Utils.Optional<CarteirasCountAggregateOutputType> | number
          }
        }
      }
      lancamento: {
        payload: Prisma.$lancamentoPayload<ExtArgs>
        fields: Prisma.lancamentoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.lancamentoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lancamentoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.lancamentoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lancamentoPayload>
          }
          findFirst: {
            args: Prisma.lancamentoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lancamentoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.lancamentoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lancamentoPayload>
          }
          findMany: {
            args: Prisma.lancamentoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lancamentoPayload>[]
          }
          create: {
            args: Prisma.lancamentoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lancamentoPayload>
          }
          createMany: {
            args: Prisma.lancamentoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.lancamentoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lancamentoPayload>[]
          }
          delete: {
            args: Prisma.lancamentoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lancamentoPayload>
          }
          update: {
            args: Prisma.lancamentoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lancamentoPayload>
          }
          deleteMany: {
            args: Prisma.lancamentoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.lancamentoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.lancamentoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lancamentoPayload>[]
          }
          upsert: {
            args: Prisma.lancamentoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$lancamentoPayload>
          }
          aggregate: {
            args: Prisma.LancamentoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLancamento>
          }
          groupBy: {
            args: Prisma.lancamentoGroupByArgs<ExtArgs>
            result: $Utils.Optional<LancamentoGroupByOutputType>[]
          }
          count: {
            args: Prisma.lancamentoCountArgs<ExtArgs>
            result: $Utils.Optional<LancamentoCountAggregateOutputType> | number
          }
        }
      }
      usuario: {
        payload: Prisma.$usuarioPayload<ExtArgs>
        fields: Prisma.usuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.usuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarioPayload>
          }
          findFirst: {
            args: Prisma.usuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarioPayload>
          }
          findMany: {
            args: Prisma.usuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarioPayload>[]
          }
          create: {
            args: Prisma.usuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarioPayload>
          }
          createMany: {
            args: Prisma.usuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.usuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarioPayload>[]
          }
          delete: {
            args: Prisma.usuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarioPayload>
          }
          update: {
            args: Prisma.usuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarioPayload>
          }
          deleteMany: {
            args: Prisma.usuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.usuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.usuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarioPayload>[]
          }
          upsert: {
            args: Prisma.usuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$usuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.usuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.usuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
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
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    carteiras?: carteirasOmit
    lancamento?: lancamentoOmit
    usuario?: usuarioOmit
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
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
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
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CarteirasCountOutputType
   */

  export type CarteirasCountOutputType = {
    lancamento: number
  }

  export type CarteirasCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lancamento?: boolean | CarteirasCountOutputTypeCountLancamentoArgs
  }

  // Custom InputTypes
  /**
   * CarteirasCountOutputType without action
   */
  export type CarteirasCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarteirasCountOutputType
     */
    select?: CarteirasCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CarteirasCountOutputType without action
   */
  export type CarteirasCountOutputTypeCountLancamentoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: lancamentoWhereInput
  }


  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    carteiras: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    carteiras?: boolean | UsuarioCountOutputTypeCountCarteirasArgs
  }

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountCarteirasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: carteirasWhereInput
  }


  /**
   * Models
   */

  /**
   * Model carteiras
   */

  export type AggregateCarteiras = {
    _count: CarteirasCountAggregateOutputType | null
    _avg: CarteirasAvgAggregateOutputType | null
    _sum: CarteirasSumAggregateOutputType | null
    _min: CarteirasMinAggregateOutputType | null
    _max: CarteirasMaxAggregateOutputType | null
  }

  export type CarteirasAvgAggregateOutputType = {
    saldo_atual: Decimal | null
  }

  export type CarteirasSumAggregateOutputType = {
    saldo_atual: Decimal | null
  }

  export type CarteirasMinAggregateOutputType = {
    id: string | null
    nome: string | null
    saldo_atual: Decimal | null
    usuario_id: string | null
  }

  export type CarteirasMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    saldo_atual: Decimal | null
    usuario_id: string | null
  }

  export type CarteirasCountAggregateOutputType = {
    id: number
    nome: number
    saldo_atual: number
    usuario_id: number
    _all: number
  }


  export type CarteirasAvgAggregateInputType = {
    saldo_atual?: true
  }

  export type CarteirasSumAggregateInputType = {
    saldo_atual?: true
  }

  export type CarteirasMinAggregateInputType = {
    id?: true
    nome?: true
    saldo_atual?: true
    usuario_id?: true
  }

  export type CarteirasMaxAggregateInputType = {
    id?: true
    nome?: true
    saldo_atual?: true
    usuario_id?: true
  }

  export type CarteirasCountAggregateInputType = {
    id?: true
    nome?: true
    saldo_atual?: true
    usuario_id?: true
    _all?: true
  }

  export type CarteirasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which carteiras to aggregate.
     */
    where?: carteirasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of carteiras to fetch.
     */
    orderBy?: carteirasOrderByWithRelationInput | carteirasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: carteirasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` carteiras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` carteiras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned carteiras
    **/
    _count?: true | CarteirasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CarteirasAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CarteirasSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CarteirasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CarteirasMaxAggregateInputType
  }

  export type GetCarteirasAggregateType<T extends CarteirasAggregateArgs> = {
        [P in keyof T & keyof AggregateCarteiras]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCarteiras[P]>
      : GetScalarType<T[P], AggregateCarteiras[P]>
  }




  export type carteirasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: carteirasWhereInput
    orderBy?: carteirasOrderByWithAggregationInput | carteirasOrderByWithAggregationInput[]
    by: CarteirasScalarFieldEnum[] | CarteirasScalarFieldEnum
    having?: carteirasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CarteirasCountAggregateInputType | true
    _avg?: CarteirasAvgAggregateInputType
    _sum?: CarteirasSumAggregateInputType
    _min?: CarteirasMinAggregateInputType
    _max?: CarteirasMaxAggregateInputType
  }

  export type CarteirasGroupByOutputType = {
    id: string
    nome: string
    saldo_atual: Decimal | null
    usuario_id: string | null
    _count: CarteirasCountAggregateOutputType | null
    _avg: CarteirasAvgAggregateOutputType | null
    _sum: CarteirasSumAggregateOutputType | null
    _min: CarteirasMinAggregateOutputType | null
    _max: CarteirasMaxAggregateOutputType | null
  }

  type GetCarteirasGroupByPayload<T extends carteirasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CarteirasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CarteirasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CarteirasGroupByOutputType[P]>
            : GetScalarType<T[P], CarteirasGroupByOutputType[P]>
        }
      >
    >


  export type carteirasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    saldo_atual?: boolean
    usuario_id?: boolean
    usuario?: boolean | carteiras$usuarioArgs<ExtArgs>
    lancamento?: boolean | carteiras$lancamentoArgs<ExtArgs>
    _count?: boolean | CarteirasCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["carteiras"]>

  export type carteirasSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    saldo_atual?: boolean
    usuario_id?: boolean
    usuario?: boolean | carteiras$usuarioArgs<ExtArgs>
  }, ExtArgs["result"]["carteiras"]>

  export type carteirasSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    saldo_atual?: boolean
    usuario_id?: boolean
    usuario?: boolean | carteiras$usuarioArgs<ExtArgs>
  }, ExtArgs["result"]["carteiras"]>

  export type carteirasSelectScalar = {
    id?: boolean
    nome?: boolean
    saldo_atual?: boolean
    usuario_id?: boolean
  }

  export type carteirasOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "saldo_atual" | "usuario_id", ExtArgs["result"]["carteiras"]>
  export type carteirasInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | carteiras$usuarioArgs<ExtArgs>
    lancamento?: boolean | carteiras$lancamentoArgs<ExtArgs>
    _count?: boolean | CarteirasCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type carteirasIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | carteiras$usuarioArgs<ExtArgs>
  }
  export type carteirasIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | carteiras$usuarioArgs<ExtArgs>
  }

  export type $carteirasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "carteiras"
    objects: {
      usuario: Prisma.$usuarioPayload<ExtArgs> | null
      lancamento: Prisma.$lancamentoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      saldo_atual: Prisma.Decimal | null
      usuario_id: string | null
    }, ExtArgs["result"]["carteiras"]>
    composites: {}
  }

  type carteirasGetPayload<S extends boolean | null | undefined | carteirasDefaultArgs> = $Result.GetResult<Prisma.$carteirasPayload, S>

  type carteirasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<carteirasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CarteirasCountAggregateInputType | true
    }

  export interface carteirasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['carteiras'], meta: { name: 'carteiras' } }
    /**
     * Find zero or one Carteiras that matches the filter.
     * @param {carteirasFindUniqueArgs} args - Arguments to find a Carteiras
     * @example
     * // Get one Carteiras
     * const carteiras = await prisma.carteiras.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends carteirasFindUniqueArgs>(args: SelectSubset<T, carteirasFindUniqueArgs<ExtArgs>>): Prisma__carteirasClient<$Result.GetResult<Prisma.$carteirasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Carteiras that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {carteirasFindUniqueOrThrowArgs} args - Arguments to find a Carteiras
     * @example
     * // Get one Carteiras
     * const carteiras = await prisma.carteiras.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends carteirasFindUniqueOrThrowArgs>(args: SelectSubset<T, carteirasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__carteirasClient<$Result.GetResult<Prisma.$carteirasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Carteiras that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {carteirasFindFirstArgs} args - Arguments to find a Carteiras
     * @example
     * // Get one Carteiras
     * const carteiras = await prisma.carteiras.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends carteirasFindFirstArgs>(args?: SelectSubset<T, carteirasFindFirstArgs<ExtArgs>>): Prisma__carteirasClient<$Result.GetResult<Prisma.$carteirasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Carteiras that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {carteirasFindFirstOrThrowArgs} args - Arguments to find a Carteiras
     * @example
     * // Get one Carteiras
     * const carteiras = await prisma.carteiras.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends carteirasFindFirstOrThrowArgs>(args?: SelectSubset<T, carteirasFindFirstOrThrowArgs<ExtArgs>>): Prisma__carteirasClient<$Result.GetResult<Prisma.$carteirasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Carteiras that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {carteirasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Carteiras
     * const carteiras = await prisma.carteiras.findMany()
     * 
     * // Get first 10 Carteiras
     * const carteiras = await prisma.carteiras.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const carteirasWithIdOnly = await prisma.carteiras.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends carteirasFindManyArgs>(args?: SelectSubset<T, carteirasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$carteirasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Carteiras.
     * @param {carteirasCreateArgs} args - Arguments to create a Carteiras.
     * @example
     * // Create one Carteiras
     * const Carteiras = await prisma.carteiras.create({
     *   data: {
     *     // ... data to create a Carteiras
     *   }
     * })
     * 
     */
    create<T extends carteirasCreateArgs>(args: SelectSubset<T, carteirasCreateArgs<ExtArgs>>): Prisma__carteirasClient<$Result.GetResult<Prisma.$carteirasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Carteiras.
     * @param {carteirasCreateManyArgs} args - Arguments to create many Carteiras.
     * @example
     * // Create many Carteiras
     * const carteiras = await prisma.carteiras.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends carteirasCreateManyArgs>(args?: SelectSubset<T, carteirasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Carteiras and returns the data saved in the database.
     * @param {carteirasCreateManyAndReturnArgs} args - Arguments to create many Carteiras.
     * @example
     * // Create many Carteiras
     * const carteiras = await prisma.carteiras.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Carteiras and only return the `id`
     * const carteirasWithIdOnly = await prisma.carteiras.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends carteirasCreateManyAndReturnArgs>(args?: SelectSubset<T, carteirasCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$carteirasPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Carteiras.
     * @param {carteirasDeleteArgs} args - Arguments to delete one Carteiras.
     * @example
     * // Delete one Carteiras
     * const Carteiras = await prisma.carteiras.delete({
     *   where: {
     *     // ... filter to delete one Carteiras
     *   }
     * })
     * 
     */
    delete<T extends carteirasDeleteArgs>(args: SelectSubset<T, carteirasDeleteArgs<ExtArgs>>): Prisma__carteirasClient<$Result.GetResult<Prisma.$carteirasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Carteiras.
     * @param {carteirasUpdateArgs} args - Arguments to update one Carteiras.
     * @example
     * // Update one Carteiras
     * const carteiras = await prisma.carteiras.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends carteirasUpdateArgs>(args: SelectSubset<T, carteirasUpdateArgs<ExtArgs>>): Prisma__carteirasClient<$Result.GetResult<Prisma.$carteirasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Carteiras.
     * @param {carteirasDeleteManyArgs} args - Arguments to filter Carteiras to delete.
     * @example
     * // Delete a few Carteiras
     * const { count } = await prisma.carteiras.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends carteirasDeleteManyArgs>(args?: SelectSubset<T, carteirasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Carteiras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {carteirasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Carteiras
     * const carteiras = await prisma.carteiras.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends carteirasUpdateManyArgs>(args: SelectSubset<T, carteirasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Carteiras and returns the data updated in the database.
     * @param {carteirasUpdateManyAndReturnArgs} args - Arguments to update many Carteiras.
     * @example
     * // Update many Carteiras
     * const carteiras = await prisma.carteiras.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Carteiras and only return the `id`
     * const carteirasWithIdOnly = await prisma.carteiras.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends carteirasUpdateManyAndReturnArgs>(args: SelectSubset<T, carteirasUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$carteirasPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Carteiras.
     * @param {carteirasUpsertArgs} args - Arguments to update or create a Carteiras.
     * @example
     * // Update or create a Carteiras
     * const carteiras = await prisma.carteiras.upsert({
     *   create: {
     *     // ... data to create a Carteiras
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Carteiras we want to update
     *   }
     * })
     */
    upsert<T extends carteirasUpsertArgs>(args: SelectSubset<T, carteirasUpsertArgs<ExtArgs>>): Prisma__carteirasClient<$Result.GetResult<Prisma.$carteirasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Carteiras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {carteirasCountArgs} args - Arguments to filter Carteiras to count.
     * @example
     * // Count the number of Carteiras
     * const count = await prisma.carteiras.count({
     *   where: {
     *     // ... the filter for the Carteiras we want to count
     *   }
     * })
    **/
    count<T extends carteirasCountArgs>(
      args?: Subset<T, carteirasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CarteirasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Carteiras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarteirasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CarteirasAggregateArgs>(args: Subset<T, CarteirasAggregateArgs>): Prisma.PrismaPromise<GetCarteirasAggregateType<T>>

    /**
     * Group by Carteiras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {carteirasGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends carteirasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: carteirasGroupByArgs['orderBy'] }
        : { orderBy?: carteirasGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, carteirasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCarteirasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the carteiras model
   */
  readonly fields: carteirasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for carteiras.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__carteirasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends carteiras$usuarioArgs<ExtArgs> = {}>(args?: Subset<T, carteiras$usuarioArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    lancamento<T extends carteiras$lancamentoArgs<ExtArgs> = {}>(args?: Subset<T, carteiras$lancamentoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$lancamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the carteiras model
   */
  interface carteirasFieldRefs {
    readonly id: FieldRef<"carteiras", 'String'>
    readonly nome: FieldRef<"carteiras", 'String'>
    readonly saldo_atual: FieldRef<"carteiras", 'Decimal'>
    readonly usuario_id: FieldRef<"carteiras", 'String'>
  }
    

  // Custom InputTypes
  /**
   * carteiras findUnique
   */
  export type carteirasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteiras
     */
    select?: carteirasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteiras
     */
    omit?: carteirasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteirasInclude<ExtArgs> | null
    /**
     * Filter, which carteiras to fetch.
     */
    where: carteirasWhereUniqueInput
  }

  /**
   * carteiras findUniqueOrThrow
   */
  export type carteirasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteiras
     */
    select?: carteirasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteiras
     */
    omit?: carteirasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteirasInclude<ExtArgs> | null
    /**
     * Filter, which carteiras to fetch.
     */
    where: carteirasWhereUniqueInput
  }

  /**
   * carteiras findFirst
   */
  export type carteirasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteiras
     */
    select?: carteirasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteiras
     */
    omit?: carteirasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteirasInclude<ExtArgs> | null
    /**
     * Filter, which carteiras to fetch.
     */
    where?: carteirasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of carteiras to fetch.
     */
    orderBy?: carteirasOrderByWithRelationInput | carteirasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for carteiras.
     */
    cursor?: carteirasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` carteiras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` carteiras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of carteiras.
     */
    distinct?: CarteirasScalarFieldEnum | CarteirasScalarFieldEnum[]
  }

  /**
   * carteiras findFirstOrThrow
   */
  export type carteirasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteiras
     */
    select?: carteirasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteiras
     */
    omit?: carteirasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteirasInclude<ExtArgs> | null
    /**
     * Filter, which carteiras to fetch.
     */
    where?: carteirasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of carteiras to fetch.
     */
    orderBy?: carteirasOrderByWithRelationInput | carteirasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for carteiras.
     */
    cursor?: carteirasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` carteiras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` carteiras.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of carteiras.
     */
    distinct?: CarteirasScalarFieldEnum | CarteirasScalarFieldEnum[]
  }

  /**
   * carteiras findMany
   */
  export type carteirasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteiras
     */
    select?: carteirasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteiras
     */
    omit?: carteirasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteirasInclude<ExtArgs> | null
    /**
     * Filter, which carteiras to fetch.
     */
    where?: carteirasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of carteiras to fetch.
     */
    orderBy?: carteirasOrderByWithRelationInput | carteirasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing carteiras.
     */
    cursor?: carteirasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` carteiras from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` carteiras.
     */
    skip?: number
    distinct?: CarteirasScalarFieldEnum | CarteirasScalarFieldEnum[]
  }

  /**
   * carteiras create
   */
  export type carteirasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteiras
     */
    select?: carteirasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteiras
     */
    omit?: carteirasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteirasInclude<ExtArgs> | null
    /**
     * The data needed to create a carteiras.
     */
    data: XOR<carteirasCreateInput, carteirasUncheckedCreateInput>
  }

  /**
   * carteiras createMany
   */
  export type carteirasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many carteiras.
     */
    data: carteirasCreateManyInput | carteirasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * carteiras createManyAndReturn
   */
  export type carteirasCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteiras
     */
    select?: carteirasSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the carteiras
     */
    omit?: carteirasOmit<ExtArgs> | null
    /**
     * The data used to create many carteiras.
     */
    data: carteirasCreateManyInput | carteirasCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteirasIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * carteiras update
   */
  export type carteirasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteiras
     */
    select?: carteirasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteiras
     */
    omit?: carteirasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteirasInclude<ExtArgs> | null
    /**
     * The data needed to update a carteiras.
     */
    data: XOR<carteirasUpdateInput, carteirasUncheckedUpdateInput>
    /**
     * Choose, which carteiras to update.
     */
    where: carteirasWhereUniqueInput
  }

  /**
   * carteiras updateMany
   */
  export type carteirasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update carteiras.
     */
    data: XOR<carteirasUpdateManyMutationInput, carteirasUncheckedUpdateManyInput>
    /**
     * Filter which carteiras to update
     */
    where?: carteirasWhereInput
    /**
     * Limit how many carteiras to update.
     */
    limit?: number
  }

  /**
   * carteiras updateManyAndReturn
   */
  export type carteirasUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteiras
     */
    select?: carteirasSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the carteiras
     */
    omit?: carteirasOmit<ExtArgs> | null
    /**
     * The data used to update carteiras.
     */
    data: XOR<carteirasUpdateManyMutationInput, carteirasUncheckedUpdateManyInput>
    /**
     * Filter which carteiras to update
     */
    where?: carteirasWhereInput
    /**
     * Limit how many carteiras to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteirasIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * carteiras upsert
   */
  export type carteirasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteiras
     */
    select?: carteirasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteiras
     */
    omit?: carteirasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteirasInclude<ExtArgs> | null
    /**
     * The filter to search for the carteiras to update in case it exists.
     */
    where: carteirasWhereUniqueInput
    /**
     * In case the carteiras found by the `where` argument doesn't exist, create a new carteiras with this data.
     */
    create: XOR<carteirasCreateInput, carteirasUncheckedCreateInput>
    /**
     * In case the carteiras was found with the provided `where` argument, update it with this data.
     */
    update: XOR<carteirasUpdateInput, carteirasUncheckedUpdateInput>
  }

  /**
   * carteiras delete
   */
  export type carteirasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteiras
     */
    select?: carteirasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteiras
     */
    omit?: carteirasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteirasInclude<ExtArgs> | null
    /**
     * Filter which carteiras to delete.
     */
    where: carteirasWhereUniqueInput
  }

  /**
   * carteiras deleteMany
   */
  export type carteirasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which carteiras to delete
     */
    where?: carteirasWhereInput
    /**
     * Limit how many carteiras to delete.
     */
    limit?: number
  }

  /**
   * carteiras.usuario
   */
  export type carteiras$usuarioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    where?: usuarioWhereInput
  }

  /**
   * carteiras.lancamento
   */
  export type carteiras$lancamentoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lancamento
     */
    select?: lancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lancamento
     */
    omit?: lancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lancamentoInclude<ExtArgs> | null
    where?: lancamentoWhereInput
    orderBy?: lancamentoOrderByWithRelationInput | lancamentoOrderByWithRelationInput[]
    cursor?: lancamentoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LancamentoScalarFieldEnum | LancamentoScalarFieldEnum[]
  }

  /**
   * carteiras without action
   */
  export type carteirasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteiras
     */
    select?: carteirasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteiras
     */
    omit?: carteirasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteirasInclude<ExtArgs> | null
  }


  /**
   * Model lancamento
   */

  export type AggregateLancamento = {
    _count: LancamentoCountAggregateOutputType | null
    _avg: LancamentoAvgAggregateOutputType | null
    _sum: LancamentoSumAggregateOutputType | null
    _min: LancamentoMinAggregateOutputType | null
    _max: LancamentoMaxAggregateOutputType | null
  }

  export type LancamentoAvgAggregateOutputType = {
    valor: Decimal | null
  }

  export type LancamentoSumAggregateOutputType = {
    valor: Decimal | null
  }

  export type LancamentoMinAggregateOutputType = {
    id: string | null
    tipo_lancamento: string | null
    data_lancamento: Date | null
    descricao: string | null
    data_cadastro: Date | null
    valor: Decimal | null
    forma_pagamento: string | null
    carteira_id: string | null
  }

  export type LancamentoMaxAggregateOutputType = {
    id: string | null
    tipo_lancamento: string | null
    data_lancamento: Date | null
    descricao: string | null
    data_cadastro: Date | null
    valor: Decimal | null
    forma_pagamento: string | null
    carteira_id: string | null
  }

  export type LancamentoCountAggregateOutputType = {
    id: number
    tipo_lancamento: number
    data_lancamento: number
    descricao: number
    data_cadastro: number
    valor: number
    forma_pagamento: number
    carteira_id: number
    _all: number
  }


  export type LancamentoAvgAggregateInputType = {
    valor?: true
  }

  export type LancamentoSumAggregateInputType = {
    valor?: true
  }

  export type LancamentoMinAggregateInputType = {
    id?: true
    tipo_lancamento?: true
    data_lancamento?: true
    descricao?: true
    data_cadastro?: true
    valor?: true
    forma_pagamento?: true
    carteira_id?: true
  }

  export type LancamentoMaxAggregateInputType = {
    id?: true
    tipo_lancamento?: true
    data_lancamento?: true
    descricao?: true
    data_cadastro?: true
    valor?: true
    forma_pagamento?: true
    carteira_id?: true
  }

  export type LancamentoCountAggregateInputType = {
    id?: true
    tipo_lancamento?: true
    data_lancamento?: true
    descricao?: true
    data_cadastro?: true
    valor?: true
    forma_pagamento?: true
    carteira_id?: true
    _all?: true
  }

  export type LancamentoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which lancamento to aggregate.
     */
    where?: lancamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of lancamentos to fetch.
     */
    orderBy?: lancamentoOrderByWithRelationInput | lancamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: lancamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` lancamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` lancamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned lancamentos
    **/
    _count?: true | LancamentoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LancamentoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LancamentoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LancamentoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LancamentoMaxAggregateInputType
  }

  export type GetLancamentoAggregateType<T extends LancamentoAggregateArgs> = {
        [P in keyof T & keyof AggregateLancamento]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLancamento[P]>
      : GetScalarType<T[P], AggregateLancamento[P]>
  }




  export type lancamentoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: lancamentoWhereInput
    orderBy?: lancamentoOrderByWithAggregationInput | lancamentoOrderByWithAggregationInput[]
    by: LancamentoScalarFieldEnum[] | LancamentoScalarFieldEnum
    having?: lancamentoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LancamentoCountAggregateInputType | true
    _avg?: LancamentoAvgAggregateInputType
    _sum?: LancamentoSumAggregateInputType
    _min?: LancamentoMinAggregateInputType
    _max?: LancamentoMaxAggregateInputType
  }

  export type LancamentoGroupByOutputType = {
    id: string
    tipo_lancamento: string
    data_lancamento: Date | null
    descricao: string | null
    data_cadastro: Date | null
    valor: Decimal | null
    forma_pagamento: string | null
    carteira_id: string | null
    _count: LancamentoCountAggregateOutputType | null
    _avg: LancamentoAvgAggregateOutputType | null
    _sum: LancamentoSumAggregateOutputType | null
    _min: LancamentoMinAggregateOutputType | null
    _max: LancamentoMaxAggregateOutputType | null
  }

  type GetLancamentoGroupByPayload<T extends lancamentoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LancamentoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LancamentoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LancamentoGroupByOutputType[P]>
            : GetScalarType<T[P], LancamentoGroupByOutputType[P]>
        }
      >
    >


  export type lancamentoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo_lancamento?: boolean
    data_lancamento?: boolean
    descricao?: boolean
    data_cadastro?: boolean
    valor?: boolean
    forma_pagamento?: boolean
    carteira_id?: boolean
    carteiras?: boolean | lancamento$carteirasArgs<ExtArgs>
  }, ExtArgs["result"]["lancamento"]>

  export type lancamentoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo_lancamento?: boolean
    data_lancamento?: boolean
    descricao?: boolean
    data_cadastro?: boolean
    valor?: boolean
    forma_pagamento?: boolean
    carteira_id?: boolean
    carteiras?: boolean | lancamento$carteirasArgs<ExtArgs>
  }, ExtArgs["result"]["lancamento"]>

  export type lancamentoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tipo_lancamento?: boolean
    data_lancamento?: boolean
    descricao?: boolean
    data_cadastro?: boolean
    valor?: boolean
    forma_pagamento?: boolean
    carteira_id?: boolean
    carteiras?: boolean | lancamento$carteirasArgs<ExtArgs>
  }, ExtArgs["result"]["lancamento"]>

  export type lancamentoSelectScalar = {
    id?: boolean
    tipo_lancamento?: boolean
    data_lancamento?: boolean
    descricao?: boolean
    data_cadastro?: boolean
    valor?: boolean
    forma_pagamento?: boolean
    carteira_id?: boolean
  }

  export type lancamentoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tipo_lancamento" | "data_lancamento" | "descricao" | "data_cadastro" | "valor" | "forma_pagamento" | "carteira_id", ExtArgs["result"]["lancamento"]>
  export type lancamentoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    carteiras?: boolean | lancamento$carteirasArgs<ExtArgs>
  }
  export type lancamentoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    carteiras?: boolean | lancamento$carteirasArgs<ExtArgs>
  }
  export type lancamentoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    carteiras?: boolean | lancamento$carteirasArgs<ExtArgs>
  }

  export type $lancamentoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "lancamento"
    objects: {
      carteiras: Prisma.$carteirasPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tipo_lancamento: string
      data_lancamento: Date | null
      descricao: string | null
      data_cadastro: Date | null
      valor: Prisma.Decimal | null
      forma_pagamento: string | null
      carteira_id: string | null
    }, ExtArgs["result"]["lancamento"]>
    composites: {}
  }

  type lancamentoGetPayload<S extends boolean | null | undefined | lancamentoDefaultArgs> = $Result.GetResult<Prisma.$lancamentoPayload, S>

  type lancamentoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<lancamentoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LancamentoCountAggregateInputType | true
    }

  export interface lancamentoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['lancamento'], meta: { name: 'lancamento' } }
    /**
     * Find zero or one Lancamento that matches the filter.
     * @param {lancamentoFindUniqueArgs} args - Arguments to find a Lancamento
     * @example
     * // Get one Lancamento
     * const lancamento = await prisma.lancamento.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends lancamentoFindUniqueArgs>(args: SelectSubset<T, lancamentoFindUniqueArgs<ExtArgs>>): Prisma__lancamentoClient<$Result.GetResult<Prisma.$lancamentoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lancamento that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {lancamentoFindUniqueOrThrowArgs} args - Arguments to find a Lancamento
     * @example
     * // Get one Lancamento
     * const lancamento = await prisma.lancamento.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends lancamentoFindUniqueOrThrowArgs>(args: SelectSubset<T, lancamentoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__lancamentoClient<$Result.GetResult<Prisma.$lancamentoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lancamento that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lancamentoFindFirstArgs} args - Arguments to find a Lancamento
     * @example
     * // Get one Lancamento
     * const lancamento = await prisma.lancamento.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends lancamentoFindFirstArgs>(args?: SelectSubset<T, lancamentoFindFirstArgs<ExtArgs>>): Prisma__lancamentoClient<$Result.GetResult<Prisma.$lancamentoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lancamento that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lancamentoFindFirstOrThrowArgs} args - Arguments to find a Lancamento
     * @example
     * // Get one Lancamento
     * const lancamento = await prisma.lancamento.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends lancamentoFindFirstOrThrowArgs>(args?: SelectSubset<T, lancamentoFindFirstOrThrowArgs<ExtArgs>>): Prisma__lancamentoClient<$Result.GetResult<Prisma.$lancamentoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Lancamentos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lancamentoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lancamentos
     * const lancamentos = await prisma.lancamento.findMany()
     * 
     * // Get first 10 Lancamentos
     * const lancamentos = await prisma.lancamento.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lancamentoWithIdOnly = await prisma.lancamento.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends lancamentoFindManyArgs>(args?: SelectSubset<T, lancamentoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$lancamentoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lancamento.
     * @param {lancamentoCreateArgs} args - Arguments to create a Lancamento.
     * @example
     * // Create one Lancamento
     * const Lancamento = await prisma.lancamento.create({
     *   data: {
     *     // ... data to create a Lancamento
     *   }
     * })
     * 
     */
    create<T extends lancamentoCreateArgs>(args: SelectSubset<T, lancamentoCreateArgs<ExtArgs>>): Prisma__lancamentoClient<$Result.GetResult<Prisma.$lancamentoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Lancamentos.
     * @param {lancamentoCreateManyArgs} args - Arguments to create many Lancamentos.
     * @example
     * // Create many Lancamentos
     * const lancamento = await prisma.lancamento.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends lancamentoCreateManyArgs>(args?: SelectSubset<T, lancamentoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Lancamentos and returns the data saved in the database.
     * @param {lancamentoCreateManyAndReturnArgs} args - Arguments to create many Lancamentos.
     * @example
     * // Create many Lancamentos
     * const lancamento = await prisma.lancamento.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Lancamentos and only return the `id`
     * const lancamentoWithIdOnly = await prisma.lancamento.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends lancamentoCreateManyAndReturnArgs>(args?: SelectSubset<T, lancamentoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$lancamentoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Lancamento.
     * @param {lancamentoDeleteArgs} args - Arguments to delete one Lancamento.
     * @example
     * // Delete one Lancamento
     * const Lancamento = await prisma.lancamento.delete({
     *   where: {
     *     // ... filter to delete one Lancamento
     *   }
     * })
     * 
     */
    delete<T extends lancamentoDeleteArgs>(args: SelectSubset<T, lancamentoDeleteArgs<ExtArgs>>): Prisma__lancamentoClient<$Result.GetResult<Prisma.$lancamentoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lancamento.
     * @param {lancamentoUpdateArgs} args - Arguments to update one Lancamento.
     * @example
     * // Update one Lancamento
     * const lancamento = await prisma.lancamento.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends lancamentoUpdateArgs>(args: SelectSubset<T, lancamentoUpdateArgs<ExtArgs>>): Prisma__lancamentoClient<$Result.GetResult<Prisma.$lancamentoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Lancamentos.
     * @param {lancamentoDeleteManyArgs} args - Arguments to filter Lancamentos to delete.
     * @example
     * // Delete a few Lancamentos
     * const { count } = await prisma.lancamento.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends lancamentoDeleteManyArgs>(args?: SelectSubset<T, lancamentoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lancamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lancamentoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lancamentos
     * const lancamento = await prisma.lancamento.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends lancamentoUpdateManyArgs>(args: SelectSubset<T, lancamentoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lancamentos and returns the data updated in the database.
     * @param {lancamentoUpdateManyAndReturnArgs} args - Arguments to update many Lancamentos.
     * @example
     * // Update many Lancamentos
     * const lancamento = await prisma.lancamento.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Lancamentos and only return the `id`
     * const lancamentoWithIdOnly = await prisma.lancamento.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends lancamentoUpdateManyAndReturnArgs>(args: SelectSubset<T, lancamentoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$lancamentoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Lancamento.
     * @param {lancamentoUpsertArgs} args - Arguments to update or create a Lancamento.
     * @example
     * // Update or create a Lancamento
     * const lancamento = await prisma.lancamento.upsert({
     *   create: {
     *     // ... data to create a Lancamento
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lancamento we want to update
     *   }
     * })
     */
    upsert<T extends lancamentoUpsertArgs>(args: SelectSubset<T, lancamentoUpsertArgs<ExtArgs>>): Prisma__lancamentoClient<$Result.GetResult<Prisma.$lancamentoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Lancamentos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lancamentoCountArgs} args - Arguments to filter Lancamentos to count.
     * @example
     * // Count the number of Lancamentos
     * const count = await prisma.lancamento.count({
     *   where: {
     *     // ... the filter for the Lancamentos we want to count
     *   }
     * })
    **/
    count<T extends lancamentoCountArgs>(
      args?: Subset<T, lancamentoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LancamentoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lancamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LancamentoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LancamentoAggregateArgs>(args: Subset<T, LancamentoAggregateArgs>): Prisma.PrismaPromise<GetLancamentoAggregateType<T>>

    /**
     * Group by Lancamento.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {lancamentoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends lancamentoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: lancamentoGroupByArgs['orderBy'] }
        : { orderBy?: lancamentoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, lancamentoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLancamentoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the lancamento model
   */
  readonly fields: lancamentoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for lancamento.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__lancamentoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    carteiras<T extends lancamento$carteirasArgs<ExtArgs> = {}>(args?: Subset<T, lancamento$carteirasArgs<ExtArgs>>): Prisma__carteirasClient<$Result.GetResult<Prisma.$carteirasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the lancamento model
   */
  interface lancamentoFieldRefs {
    readonly id: FieldRef<"lancamento", 'String'>
    readonly tipo_lancamento: FieldRef<"lancamento", 'String'>
    readonly data_lancamento: FieldRef<"lancamento", 'DateTime'>
    readonly descricao: FieldRef<"lancamento", 'String'>
    readonly data_cadastro: FieldRef<"lancamento", 'DateTime'>
    readonly valor: FieldRef<"lancamento", 'Decimal'>
    readonly forma_pagamento: FieldRef<"lancamento", 'String'>
    readonly carteira_id: FieldRef<"lancamento", 'String'>
  }
    

  // Custom InputTypes
  /**
   * lancamento findUnique
   */
  export type lancamentoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lancamento
     */
    select?: lancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lancamento
     */
    omit?: lancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lancamentoInclude<ExtArgs> | null
    /**
     * Filter, which lancamento to fetch.
     */
    where: lancamentoWhereUniqueInput
  }

  /**
   * lancamento findUniqueOrThrow
   */
  export type lancamentoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lancamento
     */
    select?: lancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lancamento
     */
    omit?: lancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lancamentoInclude<ExtArgs> | null
    /**
     * Filter, which lancamento to fetch.
     */
    where: lancamentoWhereUniqueInput
  }

  /**
   * lancamento findFirst
   */
  export type lancamentoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lancamento
     */
    select?: lancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lancamento
     */
    omit?: lancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lancamentoInclude<ExtArgs> | null
    /**
     * Filter, which lancamento to fetch.
     */
    where?: lancamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of lancamentos to fetch.
     */
    orderBy?: lancamentoOrderByWithRelationInput | lancamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for lancamentos.
     */
    cursor?: lancamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` lancamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` lancamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of lancamentos.
     */
    distinct?: LancamentoScalarFieldEnum | LancamentoScalarFieldEnum[]
  }

  /**
   * lancamento findFirstOrThrow
   */
  export type lancamentoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lancamento
     */
    select?: lancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lancamento
     */
    omit?: lancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lancamentoInclude<ExtArgs> | null
    /**
     * Filter, which lancamento to fetch.
     */
    where?: lancamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of lancamentos to fetch.
     */
    orderBy?: lancamentoOrderByWithRelationInput | lancamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for lancamentos.
     */
    cursor?: lancamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` lancamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` lancamentos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of lancamentos.
     */
    distinct?: LancamentoScalarFieldEnum | LancamentoScalarFieldEnum[]
  }

  /**
   * lancamento findMany
   */
  export type lancamentoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lancamento
     */
    select?: lancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lancamento
     */
    omit?: lancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lancamentoInclude<ExtArgs> | null
    /**
     * Filter, which lancamentos to fetch.
     */
    where?: lancamentoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of lancamentos to fetch.
     */
    orderBy?: lancamentoOrderByWithRelationInput | lancamentoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing lancamentos.
     */
    cursor?: lancamentoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` lancamentos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` lancamentos.
     */
    skip?: number
    distinct?: LancamentoScalarFieldEnum | LancamentoScalarFieldEnum[]
  }

  /**
   * lancamento create
   */
  export type lancamentoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lancamento
     */
    select?: lancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lancamento
     */
    omit?: lancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lancamentoInclude<ExtArgs> | null
    /**
     * The data needed to create a lancamento.
     */
    data: XOR<lancamentoCreateInput, lancamentoUncheckedCreateInput>
  }

  /**
   * lancamento createMany
   */
  export type lancamentoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many lancamentos.
     */
    data: lancamentoCreateManyInput | lancamentoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * lancamento createManyAndReturn
   */
  export type lancamentoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lancamento
     */
    select?: lancamentoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the lancamento
     */
    omit?: lancamentoOmit<ExtArgs> | null
    /**
     * The data used to create many lancamentos.
     */
    data: lancamentoCreateManyInput | lancamentoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lancamentoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * lancamento update
   */
  export type lancamentoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lancamento
     */
    select?: lancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lancamento
     */
    omit?: lancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lancamentoInclude<ExtArgs> | null
    /**
     * The data needed to update a lancamento.
     */
    data: XOR<lancamentoUpdateInput, lancamentoUncheckedUpdateInput>
    /**
     * Choose, which lancamento to update.
     */
    where: lancamentoWhereUniqueInput
  }

  /**
   * lancamento updateMany
   */
  export type lancamentoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update lancamentos.
     */
    data: XOR<lancamentoUpdateManyMutationInput, lancamentoUncheckedUpdateManyInput>
    /**
     * Filter which lancamentos to update
     */
    where?: lancamentoWhereInput
    /**
     * Limit how many lancamentos to update.
     */
    limit?: number
  }

  /**
   * lancamento updateManyAndReturn
   */
  export type lancamentoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lancamento
     */
    select?: lancamentoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the lancamento
     */
    omit?: lancamentoOmit<ExtArgs> | null
    /**
     * The data used to update lancamentos.
     */
    data: XOR<lancamentoUpdateManyMutationInput, lancamentoUncheckedUpdateManyInput>
    /**
     * Filter which lancamentos to update
     */
    where?: lancamentoWhereInput
    /**
     * Limit how many lancamentos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lancamentoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * lancamento upsert
   */
  export type lancamentoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lancamento
     */
    select?: lancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lancamento
     */
    omit?: lancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lancamentoInclude<ExtArgs> | null
    /**
     * The filter to search for the lancamento to update in case it exists.
     */
    where: lancamentoWhereUniqueInput
    /**
     * In case the lancamento found by the `where` argument doesn't exist, create a new lancamento with this data.
     */
    create: XOR<lancamentoCreateInput, lancamentoUncheckedCreateInput>
    /**
     * In case the lancamento was found with the provided `where` argument, update it with this data.
     */
    update: XOR<lancamentoUpdateInput, lancamentoUncheckedUpdateInput>
  }

  /**
   * lancamento delete
   */
  export type lancamentoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lancamento
     */
    select?: lancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lancamento
     */
    omit?: lancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lancamentoInclude<ExtArgs> | null
    /**
     * Filter which lancamento to delete.
     */
    where: lancamentoWhereUniqueInput
  }

  /**
   * lancamento deleteMany
   */
  export type lancamentoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which lancamentos to delete
     */
    where?: lancamentoWhereInput
    /**
     * Limit how many lancamentos to delete.
     */
    limit?: number
  }

  /**
   * lancamento.carteiras
   */
  export type lancamento$carteirasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteiras
     */
    select?: carteirasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteiras
     */
    omit?: carteirasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteirasInclude<ExtArgs> | null
    where?: carteirasWhereInput
  }

  /**
   * lancamento without action
   */
  export type lancamentoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the lancamento
     */
    select?: lancamentoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the lancamento
     */
    omit?: lancamentoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: lancamentoInclude<ExtArgs> | null
  }


  /**
   * Model usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioMinAggregateOutputType = {
    id: string | null
    nome: string | null
    senha: string | null
    email: string | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id: string | null
    nome: string | null
    senha: string | null
    email: string | null
  }

  export type UsuarioCountAggregateOutputType = {
    id: number
    nome: number
    senha: number
    email: number
    _all: number
  }


  export type UsuarioMinAggregateInputType = {
    id?: true
    nome?: true
    senha?: true
    email?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id?: true
    nome?: true
    senha?: true
    email?: true
  }

  export type UsuarioCountAggregateInputType = {
    id?: true
    nome?: true
    senha?: true
    email?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which usuario to aggregate.
     */
    where?: usuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuarioOrderByWithRelationInput | usuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type usuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: usuarioWhereInput
    orderBy?: usuarioOrderByWithAggregationInput | usuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: usuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    id: string
    nome: string
    senha: string
    email: string
    _count: UsuarioCountAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends usuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type usuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    senha?: boolean
    email?: boolean
    carteiras?: boolean | usuario$carteirasArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type usuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    senha?: boolean
    email?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type usuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    senha?: boolean
    email?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type usuarioSelectScalar = {
    id?: boolean
    nome?: boolean
    senha?: boolean
    email?: boolean
  }

  export type usuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "senha" | "email", ExtArgs["result"]["usuario"]>
  export type usuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    carteiras?: boolean | usuario$carteirasArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "usuario"
    objects: {
      carteiras: Prisma.$carteirasPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nome: string
      senha: string
      email: string
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type usuarioGetPayload<S extends boolean | null | undefined | usuarioDefaultArgs> = $Result.GetResult<Prisma.$usuarioPayload, S>

  type usuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<usuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface usuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['usuario'], meta: { name: 'usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {usuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends usuarioFindUniqueArgs>(args: SelectSubset<T, usuarioFindUniqueArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {usuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends usuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, usuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends usuarioFindFirstArgs>(args?: SelectSubset<T, usuarioFindFirstArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends usuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, usuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usuarioWithIdOnly = await prisma.usuario.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends usuarioFindManyArgs>(args?: SelectSubset<T, usuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {usuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends usuarioCreateArgs>(args: SelectSubset<T, usuarioCreateArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {usuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends usuarioCreateManyArgs>(args?: SelectSubset<T, usuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {usuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends usuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, usuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {usuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends usuarioDeleteArgs>(args: SelectSubset<T, usuarioDeleteArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {usuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends usuarioUpdateArgs>(args: SelectSubset<T, usuarioUpdateArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {usuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends usuarioDeleteManyArgs>(args?: SelectSubset<T, usuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends usuarioUpdateManyArgs>(args: SelectSubset<T, usuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {usuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `id`
     * const usuarioWithIdOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends usuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, usuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {usuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends usuarioUpsertArgs>(args: SelectSubset<T, usuarioUpsertArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends usuarioCountArgs>(
      args?: Subset<T, usuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends usuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: usuarioGroupByArgs['orderBy'] }
        : { orderBy?: usuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, usuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the usuario model
   */
  readonly fields: usuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__usuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    carteiras<T extends usuario$carteirasArgs<ExtArgs> = {}>(args?: Subset<T, usuario$carteirasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$carteirasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the usuario model
   */
  interface usuarioFieldRefs {
    readonly id: FieldRef<"usuario", 'String'>
    readonly nome: FieldRef<"usuario", 'String'>
    readonly senha: FieldRef<"usuario", 'String'>
    readonly email: FieldRef<"usuario", 'String'>
  }
    

  // Custom InputTypes
  /**
   * usuario findUnique
   */
  export type usuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    /**
     * Filter, which usuario to fetch.
     */
    where: usuarioWhereUniqueInput
  }

  /**
   * usuario findUniqueOrThrow
   */
  export type usuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    /**
     * Filter, which usuario to fetch.
     */
    where: usuarioWhereUniqueInput
  }

  /**
   * usuario findFirst
   */
  export type usuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    /**
     * Filter, which usuario to fetch.
     */
    where?: usuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuarioOrderByWithRelationInput | usuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for usuarios.
     */
    cursor?: usuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * usuario findFirstOrThrow
   */
  export type usuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    /**
     * Filter, which usuario to fetch.
     */
    where?: usuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuarioOrderByWithRelationInput | usuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for usuarios.
     */
    cursor?: usuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * usuario findMany
   */
  export type usuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    /**
     * Filter, which usuarios to fetch.
     */
    where?: usuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of usuarios to fetch.
     */
    orderBy?: usuarioOrderByWithRelationInput | usuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing usuarios.
     */
    cursor?: usuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * usuario create
   */
  export type usuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a usuario.
     */
    data: XOR<usuarioCreateInput, usuarioUncheckedCreateInput>
  }

  /**
   * usuario createMany
   */
  export type usuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many usuarios.
     */
    data: usuarioCreateManyInput | usuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * usuario createManyAndReturn
   */
  export type usuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * The data used to create many usuarios.
     */
    data: usuarioCreateManyInput | usuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * usuario update
   */
  export type usuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a usuario.
     */
    data: XOR<usuarioUpdateInput, usuarioUncheckedUpdateInput>
    /**
     * Choose, which usuario to update.
     */
    where: usuarioWhereUniqueInput
  }

  /**
   * usuario updateMany
   */
  export type usuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update usuarios.
     */
    data: XOR<usuarioUpdateManyMutationInput, usuarioUncheckedUpdateManyInput>
    /**
     * Filter which usuarios to update
     */
    where?: usuarioWhereInput
    /**
     * Limit how many usuarios to update.
     */
    limit?: number
  }

  /**
   * usuario updateManyAndReturn
   */
  export type usuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * The data used to update usuarios.
     */
    data: XOR<usuarioUpdateManyMutationInput, usuarioUncheckedUpdateManyInput>
    /**
     * Filter which usuarios to update
     */
    where?: usuarioWhereInput
    /**
     * Limit how many usuarios to update.
     */
    limit?: number
  }

  /**
   * usuario upsert
   */
  export type usuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the usuario to update in case it exists.
     */
    where: usuarioWhereUniqueInput
    /**
     * In case the usuario found by the `where` argument doesn't exist, create a new usuario with this data.
     */
    create: XOR<usuarioCreateInput, usuarioUncheckedCreateInput>
    /**
     * In case the usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usuarioUpdateInput, usuarioUncheckedUpdateInput>
  }

  /**
   * usuario delete
   */
  export type usuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
    /**
     * Filter which usuario to delete.
     */
    where: usuarioWhereUniqueInput
  }

  /**
   * usuario deleteMany
   */
  export type usuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which usuarios to delete
     */
    where?: usuarioWhereInput
    /**
     * Limit how many usuarios to delete.
     */
    limit?: number
  }

  /**
   * usuario.carteiras
   */
  export type usuario$carteirasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteiras
     */
    select?: carteirasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteiras
     */
    omit?: carteirasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteirasInclude<ExtArgs> | null
    where?: carteirasWhereInput
    orderBy?: carteirasOrderByWithRelationInput | carteirasOrderByWithRelationInput[]
    cursor?: carteirasWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CarteirasScalarFieldEnum | CarteirasScalarFieldEnum[]
  }

  /**
   * usuario without action
   */
  export type usuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the usuario
     */
    select?: usuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the usuario
     */
    omit?: usuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: usuarioInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CarteirasScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    saldo_atual: 'saldo_atual',
    usuario_id: 'usuario_id'
  };

  export type CarteirasScalarFieldEnum = (typeof CarteirasScalarFieldEnum)[keyof typeof CarteirasScalarFieldEnum]


  export const LancamentoScalarFieldEnum: {
    id: 'id',
    tipo_lancamento: 'tipo_lancamento',
    data_lancamento: 'data_lancamento',
    descricao: 'descricao',
    data_cadastro: 'data_cadastro',
    valor: 'valor',
    forma_pagamento: 'forma_pagamento',
    carteira_id: 'carteira_id'
  };

  export type LancamentoScalarFieldEnum = (typeof LancamentoScalarFieldEnum)[keyof typeof LancamentoScalarFieldEnum]


  export const UsuarioScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    senha: 'senha',
    email: 'email'
  };

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type carteirasWhereInput = {
    AND?: carteirasWhereInput | carteirasWhereInput[]
    OR?: carteirasWhereInput[]
    NOT?: carteirasWhereInput | carteirasWhereInput[]
    id?: UuidFilter<"carteiras"> | string
    nome?: StringFilter<"carteiras"> | string
    saldo_atual?: DecimalNullableFilter<"carteiras"> | Decimal | DecimalJsLike | number | string | null
    usuario_id?: UuidNullableFilter<"carteiras"> | string | null
    usuario?: XOR<UsuarioNullableScalarRelationFilter, usuarioWhereInput> | null
    lancamento?: LancamentoListRelationFilter
  }

  export type carteirasOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    saldo_atual?: SortOrderInput | SortOrder
    usuario_id?: SortOrderInput | SortOrder
    usuario?: usuarioOrderByWithRelationInput
    lancamento?: lancamentoOrderByRelationAggregateInput
  }

  export type carteirasWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: carteirasWhereInput | carteirasWhereInput[]
    OR?: carteirasWhereInput[]
    NOT?: carteirasWhereInput | carteirasWhereInput[]
    nome?: StringFilter<"carteiras"> | string
    saldo_atual?: DecimalNullableFilter<"carteiras"> | Decimal | DecimalJsLike | number | string | null
    usuario_id?: UuidNullableFilter<"carteiras"> | string | null
    usuario?: XOR<UsuarioNullableScalarRelationFilter, usuarioWhereInput> | null
    lancamento?: LancamentoListRelationFilter
  }, "id">

  export type carteirasOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    saldo_atual?: SortOrderInput | SortOrder
    usuario_id?: SortOrderInput | SortOrder
    _count?: carteirasCountOrderByAggregateInput
    _avg?: carteirasAvgOrderByAggregateInput
    _max?: carteirasMaxOrderByAggregateInput
    _min?: carteirasMinOrderByAggregateInput
    _sum?: carteirasSumOrderByAggregateInput
  }

  export type carteirasScalarWhereWithAggregatesInput = {
    AND?: carteirasScalarWhereWithAggregatesInput | carteirasScalarWhereWithAggregatesInput[]
    OR?: carteirasScalarWhereWithAggregatesInput[]
    NOT?: carteirasScalarWhereWithAggregatesInput | carteirasScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"carteiras"> | string
    nome?: StringWithAggregatesFilter<"carteiras"> | string
    saldo_atual?: DecimalNullableWithAggregatesFilter<"carteiras"> | Decimal | DecimalJsLike | number | string | null
    usuario_id?: UuidNullableWithAggregatesFilter<"carteiras"> | string | null
  }

  export type lancamentoWhereInput = {
    AND?: lancamentoWhereInput | lancamentoWhereInput[]
    OR?: lancamentoWhereInput[]
    NOT?: lancamentoWhereInput | lancamentoWhereInput[]
    id?: UuidFilter<"lancamento"> | string
    tipo_lancamento?: StringFilter<"lancamento"> | string
    data_lancamento?: DateTimeNullableFilter<"lancamento"> | Date | string | null
    descricao?: StringNullableFilter<"lancamento"> | string | null
    data_cadastro?: DateTimeNullableFilter<"lancamento"> | Date | string | null
    valor?: DecimalNullableFilter<"lancamento"> | Decimal | DecimalJsLike | number | string | null
    forma_pagamento?: StringNullableFilter<"lancamento"> | string | null
    carteira_id?: UuidNullableFilter<"lancamento"> | string | null
    carteiras?: XOR<CarteirasNullableScalarRelationFilter, carteirasWhereInput> | null
  }

  export type lancamentoOrderByWithRelationInput = {
    id?: SortOrder
    tipo_lancamento?: SortOrder
    data_lancamento?: SortOrderInput | SortOrder
    descricao?: SortOrderInput | SortOrder
    data_cadastro?: SortOrderInput | SortOrder
    valor?: SortOrderInput | SortOrder
    forma_pagamento?: SortOrderInput | SortOrder
    carteira_id?: SortOrderInput | SortOrder
    carteiras?: carteirasOrderByWithRelationInput
  }

  export type lancamentoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: lancamentoWhereInput | lancamentoWhereInput[]
    OR?: lancamentoWhereInput[]
    NOT?: lancamentoWhereInput | lancamentoWhereInput[]
    tipo_lancamento?: StringFilter<"lancamento"> | string
    data_lancamento?: DateTimeNullableFilter<"lancamento"> | Date | string | null
    descricao?: StringNullableFilter<"lancamento"> | string | null
    data_cadastro?: DateTimeNullableFilter<"lancamento"> | Date | string | null
    valor?: DecimalNullableFilter<"lancamento"> | Decimal | DecimalJsLike | number | string | null
    forma_pagamento?: StringNullableFilter<"lancamento"> | string | null
    carteira_id?: UuidNullableFilter<"lancamento"> | string | null
    carteiras?: XOR<CarteirasNullableScalarRelationFilter, carteirasWhereInput> | null
  }, "id">

  export type lancamentoOrderByWithAggregationInput = {
    id?: SortOrder
    tipo_lancamento?: SortOrder
    data_lancamento?: SortOrderInput | SortOrder
    descricao?: SortOrderInput | SortOrder
    data_cadastro?: SortOrderInput | SortOrder
    valor?: SortOrderInput | SortOrder
    forma_pagamento?: SortOrderInput | SortOrder
    carteira_id?: SortOrderInput | SortOrder
    _count?: lancamentoCountOrderByAggregateInput
    _avg?: lancamentoAvgOrderByAggregateInput
    _max?: lancamentoMaxOrderByAggregateInput
    _min?: lancamentoMinOrderByAggregateInput
    _sum?: lancamentoSumOrderByAggregateInput
  }

  export type lancamentoScalarWhereWithAggregatesInput = {
    AND?: lancamentoScalarWhereWithAggregatesInput | lancamentoScalarWhereWithAggregatesInput[]
    OR?: lancamentoScalarWhereWithAggregatesInput[]
    NOT?: lancamentoScalarWhereWithAggregatesInput | lancamentoScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"lancamento"> | string
    tipo_lancamento?: StringWithAggregatesFilter<"lancamento"> | string
    data_lancamento?: DateTimeNullableWithAggregatesFilter<"lancamento"> | Date | string | null
    descricao?: StringNullableWithAggregatesFilter<"lancamento"> | string | null
    data_cadastro?: DateTimeNullableWithAggregatesFilter<"lancamento"> | Date | string | null
    valor?: DecimalNullableWithAggregatesFilter<"lancamento"> | Decimal | DecimalJsLike | number | string | null
    forma_pagamento?: StringNullableWithAggregatesFilter<"lancamento"> | string | null
    carteira_id?: UuidNullableWithAggregatesFilter<"lancamento"> | string | null
  }

  export type usuarioWhereInput = {
    AND?: usuarioWhereInput | usuarioWhereInput[]
    OR?: usuarioWhereInput[]
    NOT?: usuarioWhereInput | usuarioWhereInput[]
    id?: UuidFilter<"usuario"> | string
    nome?: StringFilter<"usuario"> | string
    senha?: StringFilter<"usuario"> | string
    email?: StringFilter<"usuario"> | string
    carteiras?: CarteirasListRelationFilter
  }

  export type usuarioOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    senha?: SortOrder
    email?: SortOrder
    carteiras?: carteirasOrderByRelationAggregateInput
  }

  export type usuarioWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: usuarioWhereInput | usuarioWhereInput[]
    OR?: usuarioWhereInput[]
    NOT?: usuarioWhereInput | usuarioWhereInput[]
    nome?: StringFilter<"usuario"> | string
    senha?: StringFilter<"usuario"> | string
    carteiras?: CarteirasListRelationFilter
  }, "id" | "email">

  export type usuarioOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    senha?: SortOrder
    email?: SortOrder
    _count?: usuarioCountOrderByAggregateInput
    _max?: usuarioMaxOrderByAggregateInput
    _min?: usuarioMinOrderByAggregateInput
  }

  export type usuarioScalarWhereWithAggregatesInput = {
    AND?: usuarioScalarWhereWithAggregatesInput | usuarioScalarWhereWithAggregatesInput[]
    OR?: usuarioScalarWhereWithAggregatesInput[]
    NOT?: usuarioScalarWhereWithAggregatesInput | usuarioScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"usuario"> | string
    nome?: StringWithAggregatesFilter<"usuario"> | string
    senha?: StringWithAggregatesFilter<"usuario"> | string
    email?: StringWithAggregatesFilter<"usuario"> | string
  }

  export type carteirasCreateInput = {
    id?: string
    nome: string
    saldo_atual?: Decimal | DecimalJsLike | number | string | null
    usuario?: usuarioCreateNestedOneWithoutCarteirasInput
    lancamento?: lancamentoCreateNestedManyWithoutCarteirasInput
  }

  export type carteirasUncheckedCreateInput = {
    id?: string
    nome: string
    saldo_atual?: Decimal | DecimalJsLike | number | string | null
    usuario_id?: string | null
    lancamento?: lancamentoUncheckedCreateNestedManyWithoutCarteirasInput
  }

  export type carteirasUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    saldo_atual?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    usuario?: usuarioUpdateOneWithoutCarteirasNestedInput
    lancamento?: lancamentoUpdateManyWithoutCarteirasNestedInput
  }

  export type carteirasUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    saldo_atual?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    usuario_id?: NullableStringFieldUpdateOperationsInput | string | null
    lancamento?: lancamentoUncheckedUpdateManyWithoutCarteirasNestedInput
  }

  export type carteirasCreateManyInput = {
    id?: string
    nome: string
    saldo_atual?: Decimal | DecimalJsLike | number | string | null
    usuario_id?: string | null
  }

  export type carteirasUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    saldo_atual?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type carteirasUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    saldo_atual?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    usuario_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type lancamentoCreateInput = {
    id?: string
    tipo_lancamento: string
    data_lancamento?: Date | string | null
    descricao?: string | null
    data_cadastro?: Date | string | null
    valor?: Decimal | DecimalJsLike | number | string | null
    forma_pagamento?: string | null
    carteiras?: carteirasCreateNestedOneWithoutLancamentoInput
  }

  export type lancamentoUncheckedCreateInput = {
    id?: string
    tipo_lancamento: string
    data_lancamento?: Date | string | null
    descricao?: string | null
    data_cadastro?: Date | string | null
    valor?: Decimal | DecimalJsLike | number | string | null
    forma_pagamento?: string | null
    carteira_id?: string | null
  }

  export type lancamentoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo_lancamento?: StringFieldUpdateOperationsInput | string
    data_lancamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    data_cadastro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    forma_pagamento?: NullableStringFieldUpdateOperationsInput | string | null
    carteiras?: carteirasUpdateOneWithoutLancamentoNestedInput
  }

  export type lancamentoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo_lancamento?: StringFieldUpdateOperationsInput | string
    data_lancamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    data_cadastro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    forma_pagamento?: NullableStringFieldUpdateOperationsInput | string | null
    carteira_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type lancamentoCreateManyInput = {
    id?: string
    tipo_lancamento: string
    data_lancamento?: Date | string | null
    descricao?: string | null
    data_cadastro?: Date | string | null
    valor?: Decimal | DecimalJsLike | number | string | null
    forma_pagamento?: string | null
    carteira_id?: string | null
  }

  export type lancamentoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo_lancamento?: StringFieldUpdateOperationsInput | string
    data_lancamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    data_cadastro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    forma_pagamento?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type lancamentoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo_lancamento?: StringFieldUpdateOperationsInput | string
    data_lancamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    data_cadastro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    forma_pagamento?: NullableStringFieldUpdateOperationsInput | string | null
    carteira_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usuarioCreateInput = {
    id?: string
    nome: string
    senha: string
    email: string
    carteiras?: carteirasCreateNestedManyWithoutUsuarioInput
  }

  export type usuarioUncheckedCreateInput = {
    id?: string
    nome: string
    senha: string
    email: string
    carteiras?: carteirasUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type usuarioUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    carteiras?: carteirasUpdateManyWithoutUsuarioNestedInput
  }

  export type usuarioUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    carteiras?: carteirasUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type usuarioCreateManyInput = {
    id?: string
    nome: string
    senha: string
    email: string
  }

  export type usuarioUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type usuarioUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type UsuarioNullableScalarRelationFilter = {
    is?: usuarioWhereInput | null
    isNot?: usuarioWhereInput | null
  }

  export type LancamentoListRelationFilter = {
    every?: lancamentoWhereInput
    some?: lancamentoWhereInput
    none?: lancamentoWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type lancamentoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type carteirasCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    saldo_atual?: SortOrder
    usuario_id?: SortOrder
  }

  export type carteirasAvgOrderByAggregateInput = {
    saldo_atual?: SortOrder
  }

  export type carteirasMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    saldo_atual?: SortOrder
    usuario_id?: SortOrder
  }

  export type carteirasMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    saldo_atual?: SortOrder
    usuario_id?: SortOrder
  }

  export type carteirasSumOrderByAggregateInput = {
    saldo_atual?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type CarteirasNullableScalarRelationFilter = {
    is?: carteirasWhereInput | null
    isNot?: carteirasWhereInput | null
  }

  export type lancamentoCountOrderByAggregateInput = {
    id?: SortOrder
    tipo_lancamento?: SortOrder
    data_lancamento?: SortOrder
    descricao?: SortOrder
    data_cadastro?: SortOrder
    valor?: SortOrder
    forma_pagamento?: SortOrder
    carteira_id?: SortOrder
  }

  export type lancamentoAvgOrderByAggregateInput = {
    valor?: SortOrder
  }

  export type lancamentoMaxOrderByAggregateInput = {
    id?: SortOrder
    tipo_lancamento?: SortOrder
    data_lancamento?: SortOrder
    descricao?: SortOrder
    data_cadastro?: SortOrder
    valor?: SortOrder
    forma_pagamento?: SortOrder
    carteira_id?: SortOrder
  }

  export type lancamentoMinOrderByAggregateInput = {
    id?: SortOrder
    tipo_lancamento?: SortOrder
    data_lancamento?: SortOrder
    descricao?: SortOrder
    data_cadastro?: SortOrder
    valor?: SortOrder
    forma_pagamento?: SortOrder
    carteira_id?: SortOrder
  }

  export type lancamentoSumOrderByAggregateInput = {
    valor?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type CarteirasListRelationFilter = {
    every?: carteirasWhereInput
    some?: carteirasWhereInput
    none?: carteirasWhereInput
  }

  export type carteirasOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usuarioCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    senha?: SortOrder
    email?: SortOrder
  }

  export type usuarioMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    senha?: SortOrder
    email?: SortOrder
  }

  export type usuarioMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    senha?: SortOrder
    email?: SortOrder
  }

  export type usuarioCreateNestedOneWithoutCarteirasInput = {
    create?: XOR<usuarioCreateWithoutCarteirasInput, usuarioUncheckedCreateWithoutCarteirasInput>
    connectOrCreate?: usuarioCreateOrConnectWithoutCarteirasInput
    connect?: usuarioWhereUniqueInput
  }

  export type lancamentoCreateNestedManyWithoutCarteirasInput = {
    create?: XOR<lancamentoCreateWithoutCarteirasInput, lancamentoUncheckedCreateWithoutCarteirasInput> | lancamentoCreateWithoutCarteirasInput[] | lancamentoUncheckedCreateWithoutCarteirasInput[]
    connectOrCreate?: lancamentoCreateOrConnectWithoutCarteirasInput | lancamentoCreateOrConnectWithoutCarteirasInput[]
    createMany?: lancamentoCreateManyCarteirasInputEnvelope
    connect?: lancamentoWhereUniqueInput | lancamentoWhereUniqueInput[]
  }

  export type lancamentoUncheckedCreateNestedManyWithoutCarteirasInput = {
    create?: XOR<lancamentoCreateWithoutCarteirasInput, lancamentoUncheckedCreateWithoutCarteirasInput> | lancamentoCreateWithoutCarteirasInput[] | lancamentoUncheckedCreateWithoutCarteirasInput[]
    connectOrCreate?: lancamentoCreateOrConnectWithoutCarteirasInput | lancamentoCreateOrConnectWithoutCarteirasInput[]
    createMany?: lancamentoCreateManyCarteirasInputEnvelope
    connect?: lancamentoWhereUniqueInput | lancamentoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type usuarioUpdateOneWithoutCarteirasNestedInput = {
    create?: XOR<usuarioCreateWithoutCarteirasInput, usuarioUncheckedCreateWithoutCarteirasInput>
    connectOrCreate?: usuarioCreateOrConnectWithoutCarteirasInput
    upsert?: usuarioUpsertWithoutCarteirasInput
    disconnect?: usuarioWhereInput | boolean
    delete?: usuarioWhereInput | boolean
    connect?: usuarioWhereUniqueInput
    update?: XOR<XOR<usuarioUpdateToOneWithWhereWithoutCarteirasInput, usuarioUpdateWithoutCarteirasInput>, usuarioUncheckedUpdateWithoutCarteirasInput>
  }

  export type lancamentoUpdateManyWithoutCarteirasNestedInput = {
    create?: XOR<lancamentoCreateWithoutCarteirasInput, lancamentoUncheckedCreateWithoutCarteirasInput> | lancamentoCreateWithoutCarteirasInput[] | lancamentoUncheckedCreateWithoutCarteirasInput[]
    connectOrCreate?: lancamentoCreateOrConnectWithoutCarteirasInput | lancamentoCreateOrConnectWithoutCarteirasInput[]
    upsert?: lancamentoUpsertWithWhereUniqueWithoutCarteirasInput | lancamentoUpsertWithWhereUniqueWithoutCarteirasInput[]
    createMany?: lancamentoCreateManyCarteirasInputEnvelope
    set?: lancamentoWhereUniqueInput | lancamentoWhereUniqueInput[]
    disconnect?: lancamentoWhereUniqueInput | lancamentoWhereUniqueInput[]
    delete?: lancamentoWhereUniqueInput | lancamentoWhereUniqueInput[]
    connect?: lancamentoWhereUniqueInput | lancamentoWhereUniqueInput[]
    update?: lancamentoUpdateWithWhereUniqueWithoutCarteirasInput | lancamentoUpdateWithWhereUniqueWithoutCarteirasInput[]
    updateMany?: lancamentoUpdateManyWithWhereWithoutCarteirasInput | lancamentoUpdateManyWithWhereWithoutCarteirasInput[]
    deleteMany?: lancamentoScalarWhereInput | lancamentoScalarWhereInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type lancamentoUncheckedUpdateManyWithoutCarteirasNestedInput = {
    create?: XOR<lancamentoCreateWithoutCarteirasInput, lancamentoUncheckedCreateWithoutCarteirasInput> | lancamentoCreateWithoutCarteirasInput[] | lancamentoUncheckedCreateWithoutCarteirasInput[]
    connectOrCreate?: lancamentoCreateOrConnectWithoutCarteirasInput | lancamentoCreateOrConnectWithoutCarteirasInput[]
    upsert?: lancamentoUpsertWithWhereUniqueWithoutCarteirasInput | lancamentoUpsertWithWhereUniqueWithoutCarteirasInput[]
    createMany?: lancamentoCreateManyCarteirasInputEnvelope
    set?: lancamentoWhereUniqueInput | lancamentoWhereUniqueInput[]
    disconnect?: lancamentoWhereUniqueInput | lancamentoWhereUniqueInput[]
    delete?: lancamentoWhereUniqueInput | lancamentoWhereUniqueInput[]
    connect?: lancamentoWhereUniqueInput | lancamentoWhereUniqueInput[]
    update?: lancamentoUpdateWithWhereUniqueWithoutCarteirasInput | lancamentoUpdateWithWhereUniqueWithoutCarteirasInput[]
    updateMany?: lancamentoUpdateManyWithWhereWithoutCarteirasInput | lancamentoUpdateManyWithWhereWithoutCarteirasInput[]
    deleteMany?: lancamentoScalarWhereInput | lancamentoScalarWhereInput[]
  }

  export type carteirasCreateNestedOneWithoutLancamentoInput = {
    create?: XOR<carteirasCreateWithoutLancamentoInput, carteirasUncheckedCreateWithoutLancamentoInput>
    connectOrCreate?: carteirasCreateOrConnectWithoutLancamentoInput
    connect?: carteirasWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type carteirasUpdateOneWithoutLancamentoNestedInput = {
    create?: XOR<carteirasCreateWithoutLancamentoInput, carteirasUncheckedCreateWithoutLancamentoInput>
    connectOrCreate?: carteirasCreateOrConnectWithoutLancamentoInput
    upsert?: carteirasUpsertWithoutLancamentoInput
    disconnect?: carteirasWhereInput | boolean
    delete?: carteirasWhereInput | boolean
    connect?: carteirasWhereUniqueInput
    update?: XOR<XOR<carteirasUpdateToOneWithWhereWithoutLancamentoInput, carteirasUpdateWithoutLancamentoInput>, carteirasUncheckedUpdateWithoutLancamentoInput>
  }

  export type carteirasCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<carteirasCreateWithoutUsuarioInput, carteirasUncheckedCreateWithoutUsuarioInput> | carteirasCreateWithoutUsuarioInput[] | carteirasUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: carteirasCreateOrConnectWithoutUsuarioInput | carteirasCreateOrConnectWithoutUsuarioInput[]
    createMany?: carteirasCreateManyUsuarioInputEnvelope
    connect?: carteirasWhereUniqueInput | carteirasWhereUniqueInput[]
  }

  export type carteirasUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<carteirasCreateWithoutUsuarioInput, carteirasUncheckedCreateWithoutUsuarioInput> | carteirasCreateWithoutUsuarioInput[] | carteirasUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: carteirasCreateOrConnectWithoutUsuarioInput | carteirasCreateOrConnectWithoutUsuarioInput[]
    createMany?: carteirasCreateManyUsuarioInputEnvelope
    connect?: carteirasWhereUniqueInput | carteirasWhereUniqueInput[]
  }

  export type carteirasUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<carteirasCreateWithoutUsuarioInput, carteirasUncheckedCreateWithoutUsuarioInput> | carteirasCreateWithoutUsuarioInput[] | carteirasUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: carteirasCreateOrConnectWithoutUsuarioInput | carteirasCreateOrConnectWithoutUsuarioInput[]
    upsert?: carteirasUpsertWithWhereUniqueWithoutUsuarioInput | carteirasUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: carteirasCreateManyUsuarioInputEnvelope
    set?: carteirasWhereUniqueInput | carteirasWhereUniqueInput[]
    disconnect?: carteirasWhereUniqueInput | carteirasWhereUniqueInput[]
    delete?: carteirasWhereUniqueInput | carteirasWhereUniqueInput[]
    connect?: carteirasWhereUniqueInput | carteirasWhereUniqueInput[]
    update?: carteirasUpdateWithWhereUniqueWithoutUsuarioInput | carteirasUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: carteirasUpdateManyWithWhereWithoutUsuarioInput | carteirasUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: carteirasScalarWhereInput | carteirasScalarWhereInput[]
  }

  export type carteirasUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<carteirasCreateWithoutUsuarioInput, carteirasUncheckedCreateWithoutUsuarioInput> | carteirasCreateWithoutUsuarioInput[] | carteirasUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: carteirasCreateOrConnectWithoutUsuarioInput | carteirasCreateOrConnectWithoutUsuarioInput[]
    upsert?: carteirasUpsertWithWhereUniqueWithoutUsuarioInput | carteirasUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: carteirasCreateManyUsuarioInputEnvelope
    set?: carteirasWhereUniqueInput | carteirasWhereUniqueInput[]
    disconnect?: carteirasWhereUniqueInput | carteirasWhereUniqueInput[]
    delete?: carteirasWhereUniqueInput | carteirasWhereUniqueInput[]
    connect?: carteirasWhereUniqueInput | carteirasWhereUniqueInput[]
    update?: carteirasUpdateWithWhereUniqueWithoutUsuarioInput | carteirasUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: carteirasUpdateManyWithWhereWithoutUsuarioInput | carteirasUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: carteirasScalarWhereInput | carteirasScalarWhereInput[]
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type usuarioCreateWithoutCarteirasInput = {
    id?: string
    nome: string
    senha: string
    email: string
  }

  export type usuarioUncheckedCreateWithoutCarteirasInput = {
    id?: string
    nome: string
    senha: string
    email: string
  }

  export type usuarioCreateOrConnectWithoutCarteirasInput = {
    where: usuarioWhereUniqueInput
    create: XOR<usuarioCreateWithoutCarteirasInput, usuarioUncheckedCreateWithoutCarteirasInput>
  }

  export type lancamentoCreateWithoutCarteirasInput = {
    id?: string
    tipo_lancamento: string
    data_lancamento?: Date | string | null
    descricao?: string | null
    data_cadastro?: Date | string | null
    valor?: Decimal | DecimalJsLike | number | string | null
    forma_pagamento?: string | null
  }

  export type lancamentoUncheckedCreateWithoutCarteirasInput = {
    id?: string
    tipo_lancamento: string
    data_lancamento?: Date | string | null
    descricao?: string | null
    data_cadastro?: Date | string | null
    valor?: Decimal | DecimalJsLike | number | string | null
    forma_pagamento?: string | null
  }

  export type lancamentoCreateOrConnectWithoutCarteirasInput = {
    where: lancamentoWhereUniqueInput
    create: XOR<lancamentoCreateWithoutCarteirasInput, lancamentoUncheckedCreateWithoutCarteirasInput>
  }

  export type lancamentoCreateManyCarteirasInputEnvelope = {
    data: lancamentoCreateManyCarteirasInput | lancamentoCreateManyCarteirasInput[]
    skipDuplicates?: boolean
  }

  export type usuarioUpsertWithoutCarteirasInput = {
    update: XOR<usuarioUpdateWithoutCarteirasInput, usuarioUncheckedUpdateWithoutCarteirasInput>
    create: XOR<usuarioCreateWithoutCarteirasInput, usuarioUncheckedCreateWithoutCarteirasInput>
    where?: usuarioWhereInput
  }

  export type usuarioUpdateToOneWithWhereWithoutCarteirasInput = {
    where?: usuarioWhereInput
    data: XOR<usuarioUpdateWithoutCarteirasInput, usuarioUncheckedUpdateWithoutCarteirasInput>
  }

  export type usuarioUpdateWithoutCarteirasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type usuarioUncheckedUpdateWithoutCarteirasInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
  }

  export type lancamentoUpsertWithWhereUniqueWithoutCarteirasInput = {
    where: lancamentoWhereUniqueInput
    update: XOR<lancamentoUpdateWithoutCarteirasInput, lancamentoUncheckedUpdateWithoutCarteirasInput>
    create: XOR<lancamentoCreateWithoutCarteirasInput, lancamentoUncheckedCreateWithoutCarteirasInput>
  }

  export type lancamentoUpdateWithWhereUniqueWithoutCarteirasInput = {
    where: lancamentoWhereUniqueInput
    data: XOR<lancamentoUpdateWithoutCarteirasInput, lancamentoUncheckedUpdateWithoutCarteirasInput>
  }

  export type lancamentoUpdateManyWithWhereWithoutCarteirasInput = {
    where: lancamentoScalarWhereInput
    data: XOR<lancamentoUpdateManyMutationInput, lancamentoUncheckedUpdateManyWithoutCarteirasInput>
  }

  export type lancamentoScalarWhereInput = {
    AND?: lancamentoScalarWhereInput | lancamentoScalarWhereInput[]
    OR?: lancamentoScalarWhereInput[]
    NOT?: lancamentoScalarWhereInput | lancamentoScalarWhereInput[]
    id?: UuidFilter<"lancamento"> | string
    tipo_lancamento?: StringFilter<"lancamento"> | string
    data_lancamento?: DateTimeNullableFilter<"lancamento"> | Date | string | null
    descricao?: StringNullableFilter<"lancamento"> | string | null
    data_cadastro?: DateTimeNullableFilter<"lancamento"> | Date | string | null
    valor?: DecimalNullableFilter<"lancamento"> | Decimal | DecimalJsLike | number | string | null
    forma_pagamento?: StringNullableFilter<"lancamento"> | string | null
    carteira_id?: UuidNullableFilter<"lancamento"> | string | null
  }

  export type carteirasCreateWithoutLancamentoInput = {
    id?: string
    nome: string
    saldo_atual?: Decimal | DecimalJsLike | number | string | null
    usuario?: usuarioCreateNestedOneWithoutCarteirasInput
  }

  export type carteirasUncheckedCreateWithoutLancamentoInput = {
    id?: string
    nome: string
    saldo_atual?: Decimal | DecimalJsLike | number | string | null
    usuario_id?: string | null
  }

  export type carteirasCreateOrConnectWithoutLancamentoInput = {
    where: carteirasWhereUniqueInput
    create: XOR<carteirasCreateWithoutLancamentoInput, carteirasUncheckedCreateWithoutLancamentoInput>
  }

  export type carteirasUpsertWithoutLancamentoInput = {
    update: XOR<carteirasUpdateWithoutLancamentoInput, carteirasUncheckedUpdateWithoutLancamentoInput>
    create: XOR<carteirasCreateWithoutLancamentoInput, carteirasUncheckedCreateWithoutLancamentoInput>
    where?: carteirasWhereInput
  }

  export type carteirasUpdateToOneWithWhereWithoutLancamentoInput = {
    where?: carteirasWhereInput
    data: XOR<carteirasUpdateWithoutLancamentoInput, carteirasUncheckedUpdateWithoutLancamentoInput>
  }

  export type carteirasUpdateWithoutLancamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    saldo_atual?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    usuario?: usuarioUpdateOneWithoutCarteirasNestedInput
  }

  export type carteirasUncheckedUpdateWithoutLancamentoInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    saldo_atual?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    usuario_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type carteirasCreateWithoutUsuarioInput = {
    id?: string
    nome: string
    saldo_atual?: Decimal | DecimalJsLike | number | string | null
    lancamento?: lancamentoCreateNestedManyWithoutCarteirasInput
  }

  export type carteirasUncheckedCreateWithoutUsuarioInput = {
    id?: string
    nome: string
    saldo_atual?: Decimal | DecimalJsLike | number | string | null
    lancamento?: lancamentoUncheckedCreateNestedManyWithoutCarteirasInput
  }

  export type carteirasCreateOrConnectWithoutUsuarioInput = {
    where: carteirasWhereUniqueInput
    create: XOR<carteirasCreateWithoutUsuarioInput, carteirasUncheckedCreateWithoutUsuarioInput>
  }

  export type carteirasCreateManyUsuarioInputEnvelope = {
    data: carteirasCreateManyUsuarioInput | carteirasCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type carteirasUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: carteirasWhereUniqueInput
    update: XOR<carteirasUpdateWithoutUsuarioInput, carteirasUncheckedUpdateWithoutUsuarioInput>
    create: XOR<carteirasCreateWithoutUsuarioInput, carteirasUncheckedCreateWithoutUsuarioInput>
  }

  export type carteirasUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: carteirasWhereUniqueInput
    data: XOR<carteirasUpdateWithoutUsuarioInput, carteirasUncheckedUpdateWithoutUsuarioInput>
  }

  export type carteirasUpdateManyWithWhereWithoutUsuarioInput = {
    where: carteirasScalarWhereInput
    data: XOR<carteirasUpdateManyMutationInput, carteirasUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type carteirasScalarWhereInput = {
    AND?: carteirasScalarWhereInput | carteirasScalarWhereInput[]
    OR?: carteirasScalarWhereInput[]
    NOT?: carteirasScalarWhereInput | carteirasScalarWhereInput[]
    id?: UuidFilter<"carteiras"> | string
    nome?: StringFilter<"carteiras"> | string
    saldo_atual?: DecimalNullableFilter<"carteiras"> | Decimal | DecimalJsLike | number | string | null
    usuario_id?: UuidNullableFilter<"carteiras"> | string | null
  }

  export type lancamentoCreateManyCarteirasInput = {
    id?: string
    tipo_lancamento: string
    data_lancamento?: Date | string | null
    descricao?: string | null
    data_cadastro?: Date | string | null
    valor?: Decimal | DecimalJsLike | number | string | null
    forma_pagamento?: string | null
  }

  export type lancamentoUpdateWithoutCarteirasInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo_lancamento?: StringFieldUpdateOperationsInput | string
    data_lancamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    data_cadastro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    forma_pagamento?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type lancamentoUncheckedUpdateWithoutCarteirasInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo_lancamento?: StringFieldUpdateOperationsInput | string
    data_lancamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    data_cadastro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    forma_pagamento?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type lancamentoUncheckedUpdateManyWithoutCarteirasInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipo_lancamento?: StringFieldUpdateOperationsInput | string
    data_lancamento?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    data_cadastro?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    valor?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    forma_pagamento?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type carteirasCreateManyUsuarioInput = {
    id?: string
    nome: string
    saldo_atual?: Decimal | DecimalJsLike | number | string | null
  }

  export type carteirasUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    saldo_atual?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    lancamento?: lancamentoUpdateManyWithoutCarteirasNestedInput
  }

  export type carteirasUncheckedUpdateWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    saldo_atual?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    lancamento?: lancamentoUncheckedUpdateManyWithoutCarteirasNestedInput
  }

  export type carteirasUncheckedUpdateManyWithoutUsuarioInput = {
    id?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    saldo_atual?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}