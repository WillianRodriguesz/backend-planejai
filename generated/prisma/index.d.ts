
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
 * Model carteira
 * 
 */
export type carteira = $Result.DefaultSelection<Prisma.$carteiraPayload>
/**
 * Model conta_recorrente
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type conta_recorrente = $Result.DefaultSelection<Prisma.$conta_recorrentePayload>
/**
 * Model transacao
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type transacao = $Result.DefaultSelection<Prisma.$transacaoPayload>
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
 * const carteiras = await prisma.carteira.findMany()
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
   * const carteiras = await prisma.carteira.findMany()
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
   * `prisma.carteira`: Exposes CRUD operations for the **carteira** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Carteiras
    * const carteiras = await prisma.carteira.findMany()
    * ```
    */
  get carteira(): Prisma.carteiraDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.conta_recorrente`: Exposes CRUD operations for the **conta_recorrente** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conta_recorrentes
    * const conta_recorrentes = await prisma.conta_recorrente.findMany()
    * ```
    */
  get conta_recorrente(): Prisma.conta_recorrenteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transacao`: Exposes CRUD operations for the **transacao** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transacaos
    * const transacaos = await prisma.transacao.findMany()
    * ```
    */
  get transacao(): Prisma.transacaoDelegate<ExtArgs, ClientOptions>;

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
    carteira: 'carteira',
    conta_recorrente: 'conta_recorrente',
    transacao: 'transacao',
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
      modelProps: "carteira" | "conta_recorrente" | "transacao" | "usuario"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      carteira: {
        payload: Prisma.$carteiraPayload<ExtArgs>
        fields: Prisma.carteiraFieldRefs
        operations: {
          findUnique: {
            args: Prisma.carteiraFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteiraPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.carteiraFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteiraPayload>
          }
          findFirst: {
            args: Prisma.carteiraFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteiraPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.carteiraFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteiraPayload>
          }
          findMany: {
            args: Prisma.carteiraFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteiraPayload>[]
          }
          create: {
            args: Prisma.carteiraCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteiraPayload>
          }
          createMany: {
            args: Prisma.carteiraCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.carteiraCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteiraPayload>[]
          }
          delete: {
            args: Prisma.carteiraDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteiraPayload>
          }
          update: {
            args: Prisma.carteiraUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteiraPayload>
          }
          deleteMany: {
            args: Prisma.carteiraDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.carteiraUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.carteiraUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteiraPayload>[]
          }
          upsert: {
            args: Prisma.carteiraUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$carteiraPayload>
          }
          aggregate: {
            args: Prisma.CarteiraAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCarteira>
          }
          groupBy: {
            args: Prisma.carteiraGroupByArgs<ExtArgs>
            result: $Utils.Optional<CarteiraGroupByOutputType>[]
          }
          count: {
            args: Prisma.carteiraCountArgs<ExtArgs>
            result: $Utils.Optional<CarteiraCountAggregateOutputType> | number
          }
        }
      }
      conta_recorrente: {
        payload: Prisma.$conta_recorrentePayload<ExtArgs>
        fields: Prisma.conta_recorrenteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.conta_recorrenteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conta_recorrentePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.conta_recorrenteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conta_recorrentePayload>
          }
          findFirst: {
            args: Prisma.conta_recorrenteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conta_recorrentePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.conta_recorrenteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conta_recorrentePayload>
          }
          findMany: {
            args: Prisma.conta_recorrenteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conta_recorrentePayload>[]
          }
          create: {
            args: Prisma.conta_recorrenteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conta_recorrentePayload>
          }
          createMany: {
            args: Prisma.conta_recorrenteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.conta_recorrenteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conta_recorrentePayload>[]
          }
          delete: {
            args: Prisma.conta_recorrenteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conta_recorrentePayload>
          }
          update: {
            args: Prisma.conta_recorrenteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conta_recorrentePayload>
          }
          deleteMany: {
            args: Prisma.conta_recorrenteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.conta_recorrenteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.conta_recorrenteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conta_recorrentePayload>[]
          }
          upsert: {
            args: Prisma.conta_recorrenteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$conta_recorrentePayload>
          }
          aggregate: {
            args: Prisma.Conta_recorrenteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConta_recorrente>
          }
          groupBy: {
            args: Prisma.conta_recorrenteGroupByArgs<ExtArgs>
            result: $Utils.Optional<Conta_recorrenteGroupByOutputType>[]
          }
          count: {
            args: Prisma.conta_recorrenteCountArgs<ExtArgs>
            result: $Utils.Optional<Conta_recorrenteCountAggregateOutputType> | number
          }
        }
      }
      transacao: {
        payload: Prisma.$transacaoPayload<ExtArgs>
        fields: Prisma.transacaoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.transacaoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transacaoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.transacaoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transacaoPayload>
          }
          findFirst: {
            args: Prisma.transacaoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transacaoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.transacaoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transacaoPayload>
          }
          findMany: {
            args: Prisma.transacaoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transacaoPayload>[]
          }
          create: {
            args: Prisma.transacaoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transacaoPayload>
          }
          createMany: {
            args: Prisma.transacaoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.transacaoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transacaoPayload>[]
          }
          delete: {
            args: Prisma.transacaoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transacaoPayload>
          }
          update: {
            args: Prisma.transacaoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transacaoPayload>
          }
          deleteMany: {
            args: Prisma.transacaoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.transacaoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.transacaoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transacaoPayload>[]
          }
          upsert: {
            args: Prisma.transacaoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$transacaoPayload>
          }
          aggregate: {
            args: Prisma.TransacaoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransacao>
          }
          groupBy: {
            args: Prisma.transacaoGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransacaoGroupByOutputType>[]
          }
          count: {
            args: Prisma.transacaoCountArgs<ExtArgs>
            result: $Utils.Optional<TransacaoCountAggregateOutputType> | number
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
    carteira?: carteiraOmit
    conta_recorrente?: conta_recorrenteOmit
    transacao?: transacaoOmit
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
   * Count Type CarteiraCountOutputType
   */

  export type CarteiraCountOutputType = {
    conta_recorrente: number
    transacao: number
  }

  export type CarteiraCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conta_recorrente?: boolean | CarteiraCountOutputTypeCountConta_recorrenteArgs
    transacao?: boolean | CarteiraCountOutputTypeCountTransacaoArgs
  }

  // Custom InputTypes
  /**
   * CarteiraCountOutputType without action
   */
  export type CarteiraCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CarteiraCountOutputType
     */
    select?: CarteiraCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CarteiraCountOutputType without action
   */
  export type CarteiraCountOutputTypeCountConta_recorrenteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: conta_recorrenteWhereInput
  }

  /**
   * CarteiraCountOutputType without action
   */
  export type CarteiraCountOutputTypeCountTransacaoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: transacaoWhereInput
  }


  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    carteira: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    carteira?: boolean | UsuarioCountOutputTypeCountCarteiraArgs
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
  export type UsuarioCountOutputTypeCountCarteiraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: carteiraWhereInput
  }


  /**
   * Models
   */

  /**
   * Model carteira
   */

  export type AggregateCarteira = {
    _count: CarteiraCountAggregateOutputType | null
    _avg: CarteiraAvgAggregateOutputType | null
    _sum: CarteiraSumAggregateOutputType | null
    _min: CarteiraMinAggregateOutputType | null
    _max: CarteiraMaxAggregateOutputType | null
  }

  export type CarteiraAvgAggregateOutputType = {
    saldo: Decimal | null
  }

  export type CarteiraSumAggregateOutputType = {
    saldo: Decimal | null
  }

  export type CarteiraMinAggregateOutputType = {
    id_carteira: string | null
    id_usuario: string | null
    saldo: Decimal | null
  }

  export type CarteiraMaxAggregateOutputType = {
    id_carteira: string | null
    id_usuario: string | null
    saldo: Decimal | null
  }

  export type CarteiraCountAggregateOutputType = {
    id_carteira: number
    id_usuario: number
    saldo: number
    _all: number
  }


  export type CarteiraAvgAggregateInputType = {
    saldo?: true
  }

  export type CarteiraSumAggregateInputType = {
    saldo?: true
  }

  export type CarteiraMinAggregateInputType = {
    id_carteira?: true
    id_usuario?: true
    saldo?: true
  }

  export type CarteiraMaxAggregateInputType = {
    id_carteira?: true
    id_usuario?: true
    saldo?: true
  }

  export type CarteiraCountAggregateInputType = {
    id_carteira?: true
    id_usuario?: true
    saldo?: true
    _all?: true
  }

  export type CarteiraAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which carteira to aggregate.
     */
    where?: carteiraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of carteiras to fetch.
     */
    orderBy?: carteiraOrderByWithRelationInput | carteiraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: carteiraWhereUniqueInput
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
    _count?: true | CarteiraCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CarteiraAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CarteiraSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CarteiraMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CarteiraMaxAggregateInputType
  }

  export type GetCarteiraAggregateType<T extends CarteiraAggregateArgs> = {
        [P in keyof T & keyof AggregateCarteira]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCarteira[P]>
      : GetScalarType<T[P], AggregateCarteira[P]>
  }




  export type carteiraGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: carteiraWhereInput
    orderBy?: carteiraOrderByWithAggregationInput | carteiraOrderByWithAggregationInput[]
    by: CarteiraScalarFieldEnum[] | CarteiraScalarFieldEnum
    having?: carteiraScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CarteiraCountAggregateInputType | true
    _avg?: CarteiraAvgAggregateInputType
    _sum?: CarteiraSumAggregateInputType
    _min?: CarteiraMinAggregateInputType
    _max?: CarteiraMaxAggregateInputType
  }

  export type CarteiraGroupByOutputType = {
    id_carteira: string
    id_usuario: string
    saldo: Decimal | null
    _count: CarteiraCountAggregateOutputType | null
    _avg: CarteiraAvgAggregateOutputType | null
    _sum: CarteiraSumAggregateOutputType | null
    _min: CarteiraMinAggregateOutputType | null
    _max: CarteiraMaxAggregateOutputType | null
  }

  type GetCarteiraGroupByPayload<T extends carteiraGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CarteiraGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CarteiraGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CarteiraGroupByOutputType[P]>
            : GetScalarType<T[P], CarteiraGroupByOutputType[P]>
        }
      >
    >


  export type carteiraSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_carteira?: boolean
    id_usuario?: boolean
    saldo?: boolean
    usuario?: boolean | usuarioDefaultArgs<ExtArgs>
    conta_recorrente?: boolean | carteira$conta_recorrenteArgs<ExtArgs>
    transacao?: boolean | carteira$transacaoArgs<ExtArgs>
    _count?: boolean | CarteiraCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["carteira"]>

  export type carteiraSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_carteira?: boolean
    id_usuario?: boolean
    saldo?: boolean
    usuario?: boolean | usuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["carteira"]>

  export type carteiraSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_carteira?: boolean
    id_usuario?: boolean
    saldo?: boolean
    usuario?: boolean | usuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["carteira"]>

  export type carteiraSelectScalar = {
    id_carteira?: boolean
    id_usuario?: boolean
    saldo?: boolean
  }

  export type carteiraOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_carteira" | "id_usuario" | "saldo", ExtArgs["result"]["carteira"]>
  export type carteiraInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | usuarioDefaultArgs<ExtArgs>
    conta_recorrente?: boolean | carteira$conta_recorrenteArgs<ExtArgs>
    transacao?: boolean | carteira$transacaoArgs<ExtArgs>
    _count?: boolean | CarteiraCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type carteiraIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | usuarioDefaultArgs<ExtArgs>
  }
  export type carteiraIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | usuarioDefaultArgs<ExtArgs>
  }

  export type $carteiraPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "carteira"
    objects: {
      usuario: Prisma.$usuarioPayload<ExtArgs>
      conta_recorrente: Prisma.$conta_recorrentePayload<ExtArgs>[]
      transacao: Prisma.$transacaoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_carteira: string
      id_usuario: string
      saldo: Prisma.Decimal | null
    }, ExtArgs["result"]["carteira"]>
    composites: {}
  }

  type carteiraGetPayload<S extends boolean | null | undefined | carteiraDefaultArgs> = $Result.GetResult<Prisma.$carteiraPayload, S>

  type carteiraCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<carteiraFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CarteiraCountAggregateInputType | true
    }

  export interface carteiraDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['carteira'], meta: { name: 'carteira' } }
    /**
     * Find zero or one Carteira that matches the filter.
     * @param {carteiraFindUniqueArgs} args - Arguments to find a Carteira
     * @example
     * // Get one Carteira
     * const carteira = await prisma.carteira.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends carteiraFindUniqueArgs>(args: SelectSubset<T, carteiraFindUniqueArgs<ExtArgs>>): Prisma__carteiraClient<$Result.GetResult<Prisma.$carteiraPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Carteira that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {carteiraFindUniqueOrThrowArgs} args - Arguments to find a Carteira
     * @example
     * // Get one Carteira
     * const carteira = await prisma.carteira.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends carteiraFindUniqueOrThrowArgs>(args: SelectSubset<T, carteiraFindUniqueOrThrowArgs<ExtArgs>>): Prisma__carteiraClient<$Result.GetResult<Prisma.$carteiraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Carteira that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {carteiraFindFirstArgs} args - Arguments to find a Carteira
     * @example
     * // Get one Carteira
     * const carteira = await prisma.carteira.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends carteiraFindFirstArgs>(args?: SelectSubset<T, carteiraFindFirstArgs<ExtArgs>>): Prisma__carteiraClient<$Result.GetResult<Prisma.$carteiraPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Carteira that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {carteiraFindFirstOrThrowArgs} args - Arguments to find a Carteira
     * @example
     * // Get one Carteira
     * const carteira = await prisma.carteira.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends carteiraFindFirstOrThrowArgs>(args?: SelectSubset<T, carteiraFindFirstOrThrowArgs<ExtArgs>>): Prisma__carteiraClient<$Result.GetResult<Prisma.$carteiraPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Carteiras that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {carteiraFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Carteiras
     * const carteiras = await prisma.carteira.findMany()
     * 
     * // Get first 10 Carteiras
     * const carteiras = await prisma.carteira.findMany({ take: 10 })
     * 
     * // Only select the `id_carteira`
     * const carteiraWithId_carteiraOnly = await prisma.carteira.findMany({ select: { id_carteira: true } })
     * 
     */
    findMany<T extends carteiraFindManyArgs>(args?: SelectSubset<T, carteiraFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$carteiraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Carteira.
     * @param {carteiraCreateArgs} args - Arguments to create a Carteira.
     * @example
     * // Create one Carteira
     * const Carteira = await prisma.carteira.create({
     *   data: {
     *     // ... data to create a Carteira
     *   }
     * })
     * 
     */
    create<T extends carteiraCreateArgs>(args: SelectSubset<T, carteiraCreateArgs<ExtArgs>>): Prisma__carteiraClient<$Result.GetResult<Prisma.$carteiraPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Carteiras.
     * @param {carteiraCreateManyArgs} args - Arguments to create many Carteiras.
     * @example
     * // Create many Carteiras
     * const carteira = await prisma.carteira.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends carteiraCreateManyArgs>(args?: SelectSubset<T, carteiraCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Carteiras and returns the data saved in the database.
     * @param {carteiraCreateManyAndReturnArgs} args - Arguments to create many Carteiras.
     * @example
     * // Create many Carteiras
     * const carteira = await prisma.carteira.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Carteiras and only return the `id_carteira`
     * const carteiraWithId_carteiraOnly = await prisma.carteira.createManyAndReturn({
     *   select: { id_carteira: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends carteiraCreateManyAndReturnArgs>(args?: SelectSubset<T, carteiraCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$carteiraPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Carteira.
     * @param {carteiraDeleteArgs} args - Arguments to delete one Carteira.
     * @example
     * // Delete one Carteira
     * const Carteira = await prisma.carteira.delete({
     *   where: {
     *     // ... filter to delete one Carteira
     *   }
     * })
     * 
     */
    delete<T extends carteiraDeleteArgs>(args: SelectSubset<T, carteiraDeleteArgs<ExtArgs>>): Prisma__carteiraClient<$Result.GetResult<Prisma.$carteiraPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Carteira.
     * @param {carteiraUpdateArgs} args - Arguments to update one Carteira.
     * @example
     * // Update one Carteira
     * const carteira = await prisma.carteira.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends carteiraUpdateArgs>(args: SelectSubset<T, carteiraUpdateArgs<ExtArgs>>): Prisma__carteiraClient<$Result.GetResult<Prisma.$carteiraPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Carteiras.
     * @param {carteiraDeleteManyArgs} args - Arguments to filter Carteiras to delete.
     * @example
     * // Delete a few Carteiras
     * const { count } = await prisma.carteira.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends carteiraDeleteManyArgs>(args?: SelectSubset<T, carteiraDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Carteiras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {carteiraUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Carteiras
     * const carteira = await prisma.carteira.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends carteiraUpdateManyArgs>(args: SelectSubset<T, carteiraUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Carteiras and returns the data updated in the database.
     * @param {carteiraUpdateManyAndReturnArgs} args - Arguments to update many Carteiras.
     * @example
     * // Update many Carteiras
     * const carteira = await prisma.carteira.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Carteiras and only return the `id_carteira`
     * const carteiraWithId_carteiraOnly = await prisma.carteira.updateManyAndReturn({
     *   select: { id_carteira: true },
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
    updateManyAndReturn<T extends carteiraUpdateManyAndReturnArgs>(args: SelectSubset<T, carteiraUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$carteiraPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Carteira.
     * @param {carteiraUpsertArgs} args - Arguments to update or create a Carteira.
     * @example
     * // Update or create a Carteira
     * const carteira = await prisma.carteira.upsert({
     *   create: {
     *     // ... data to create a Carteira
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Carteira we want to update
     *   }
     * })
     */
    upsert<T extends carteiraUpsertArgs>(args: SelectSubset<T, carteiraUpsertArgs<ExtArgs>>): Prisma__carteiraClient<$Result.GetResult<Prisma.$carteiraPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Carteiras.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {carteiraCountArgs} args - Arguments to filter Carteiras to count.
     * @example
     * // Count the number of Carteiras
     * const count = await prisma.carteira.count({
     *   where: {
     *     // ... the filter for the Carteiras we want to count
     *   }
     * })
    **/
    count<T extends carteiraCountArgs>(
      args?: Subset<T, carteiraCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CarteiraCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Carteira.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CarteiraAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CarteiraAggregateArgs>(args: Subset<T, CarteiraAggregateArgs>): Prisma.PrismaPromise<GetCarteiraAggregateType<T>>

    /**
     * Group by Carteira.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {carteiraGroupByArgs} args - Group by arguments.
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
      T extends carteiraGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: carteiraGroupByArgs['orderBy'] }
        : { orderBy?: carteiraGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, carteiraGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCarteiraGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the carteira model
   */
  readonly fields: carteiraFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for carteira.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__carteiraClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends usuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, usuarioDefaultArgs<ExtArgs>>): Prisma__usuarioClient<$Result.GetResult<Prisma.$usuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    conta_recorrente<T extends carteira$conta_recorrenteArgs<ExtArgs> = {}>(args?: Subset<T, carteira$conta_recorrenteArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$conta_recorrentePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transacao<T extends carteira$transacaoArgs<ExtArgs> = {}>(args?: Subset<T, carteira$transacaoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the carteira model
   */
  interface carteiraFieldRefs {
    readonly id_carteira: FieldRef<"carteira", 'String'>
    readonly id_usuario: FieldRef<"carteira", 'String'>
    readonly saldo: FieldRef<"carteira", 'Decimal'>
  }
    

  // Custom InputTypes
  /**
   * carteira findUnique
   */
  export type carteiraFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteira
     */
    select?: carteiraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteira
     */
    omit?: carteiraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteiraInclude<ExtArgs> | null
    /**
     * Filter, which carteira to fetch.
     */
    where: carteiraWhereUniqueInput
  }

  /**
   * carteira findUniqueOrThrow
   */
  export type carteiraFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteira
     */
    select?: carteiraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteira
     */
    omit?: carteiraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteiraInclude<ExtArgs> | null
    /**
     * Filter, which carteira to fetch.
     */
    where: carteiraWhereUniqueInput
  }

  /**
   * carteira findFirst
   */
  export type carteiraFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteira
     */
    select?: carteiraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteira
     */
    omit?: carteiraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteiraInclude<ExtArgs> | null
    /**
     * Filter, which carteira to fetch.
     */
    where?: carteiraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of carteiras to fetch.
     */
    orderBy?: carteiraOrderByWithRelationInput | carteiraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for carteiras.
     */
    cursor?: carteiraWhereUniqueInput
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
    distinct?: CarteiraScalarFieldEnum | CarteiraScalarFieldEnum[]
  }

  /**
   * carteira findFirstOrThrow
   */
  export type carteiraFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteira
     */
    select?: carteiraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteira
     */
    omit?: carteiraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteiraInclude<ExtArgs> | null
    /**
     * Filter, which carteira to fetch.
     */
    where?: carteiraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of carteiras to fetch.
     */
    orderBy?: carteiraOrderByWithRelationInput | carteiraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for carteiras.
     */
    cursor?: carteiraWhereUniqueInput
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
    distinct?: CarteiraScalarFieldEnum | CarteiraScalarFieldEnum[]
  }

  /**
   * carteira findMany
   */
  export type carteiraFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteira
     */
    select?: carteiraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteira
     */
    omit?: carteiraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteiraInclude<ExtArgs> | null
    /**
     * Filter, which carteiras to fetch.
     */
    where?: carteiraWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of carteiras to fetch.
     */
    orderBy?: carteiraOrderByWithRelationInput | carteiraOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing carteiras.
     */
    cursor?: carteiraWhereUniqueInput
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
    distinct?: CarteiraScalarFieldEnum | CarteiraScalarFieldEnum[]
  }

  /**
   * carteira create
   */
  export type carteiraCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteira
     */
    select?: carteiraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteira
     */
    omit?: carteiraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteiraInclude<ExtArgs> | null
    /**
     * The data needed to create a carteira.
     */
    data: XOR<carteiraCreateInput, carteiraUncheckedCreateInput>
  }

  /**
   * carteira createMany
   */
  export type carteiraCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many carteiras.
     */
    data: carteiraCreateManyInput | carteiraCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * carteira createManyAndReturn
   */
  export type carteiraCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteira
     */
    select?: carteiraSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the carteira
     */
    omit?: carteiraOmit<ExtArgs> | null
    /**
     * The data used to create many carteiras.
     */
    data: carteiraCreateManyInput | carteiraCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteiraIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * carteira update
   */
  export type carteiraUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteira
     */
    select?: carteiraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteira
     */
    omit?: carteiraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteiraInclude<ExtArgs> | null
    /**
     * The data needed to update a carteira.
     */
    data: XOR<carteiraUpdateInput, carteiraUncheckedUpdateInput>
    /**
     * Choose, which carteira to update.
     */
    where: carteiraWhereUniqueInput
  }

  /**
   * carteira updateMany
   */
  export type carteiraUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update carteiras.
     */
    data: XOR<carteiraUpdateManyMutationInput, carteiraUncheckedUpdateManyInput>
    /**
     * Filter which carteiras to update
     */
    where?: carteiraWhereInput
    /**
     * Limit how many carteiras to update.
     */
    limit?: number
  }

  /**
   * carteira updateManyAndReturn
   */
  export type carteiraUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteira
     */
    select?: carteiraSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the carteira
     */
    omit?: carteiraOmit<ExtArgs> | null
    /**
     * The data used to update carteiras.
     */
    data: XOR<carteiraUpdateManyMutationInput, carteiraUncheckedUpdateManyInput>
    /**
     * Filter which carteiras to update
     */
    where?: carteiraWhereInput
    /**
     * Limit how many carteiras to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteiraIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * carteira upsert
   */
  export type carteiraUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteira
     */
    select?: carteiraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteira
     */
    omit?: carteiraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteiraInclude<ExtArgs> | null
    /**
     * The filter to search for the carteira to update in case it exists.
     */
    where: carteiraWhereUniqueInput
    /**
     * In case the carteira found by the `where` argument doesn't exist, create a new carteira with this data.
     */
    create: XOR<carteiraCreateInput, carteiraUncheckedCreateInput>
    /**
     * In case the carteira was found with the provided `where` argument, update it with this data.
     */
    update: XOR<carteiraUpdateInput, carteiraUncheckedUpdateInput>
  }

  /**
   * carteira delete
   */
  export type carteiraDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteira
     */
    select?: carteiraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteira
     */
    omit?: carteiraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteiraInclude<ExtArgs> | null
    /**
     * Filter which carteira to delete.
     */
    where: carteiraWhereUniqueInput
  }

  /**
   * carteira deleteMany
   */
  export type carteiraDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which carteiras to delete
     */
    where?: carteiraWhereInput
    /**
     * Limit how many carteiras to delete.
     */
    limit?: number
  }

  /**
   * carteira.conta_recorrente
   */
  export type carteira$conta_recorrenteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conta_recorrente
     */
    select?: conta_recorrenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conta_recorrente
     */
    omit?: conta_recorrenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conta_recorrenteInclude<ExtArgs> | null
    where?: conta_recorrenteWhereInput
    orderBy?: conta_recorrenteOrderByWithRelationInput | conta_recorrenteOrderByWithRelationInput[]
    cursor?: conta_recorrenteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Conta_recorrenteScalarFieldEnum | Conta_recorrenteScalarFieldEnum[]
  }

  /**
   * carteira.transacao
   */
  export type carteira$transacaoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transacao
     */
    select?: transacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transacao
     */
    omit?: transacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transacaoInclude<ExtArgs> | null
    where?: transacaoWhereInput
    orderBy?: transacaoOrderByWithRelationInput | transacaoOrderByWithRelationInput[]
    cursor?: transacaoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransacaoScalarFieldEnum | TransacaoScalarFieldEnum[]
  }

  /**
   * carteira without action
   */
  export type carteiraDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteira
     */
    select?: carteiraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteira
     */
    omit?: carteiraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteiraInclude<ExtArgs> | null
  }


  /**
   * Model conta_recorrente
   */

  export type AggregateConta_recorrente = {
    _count: Conta_recorrenteCountAggregateOutputType | null
    _avg: Conta_recorrenteAvgAggregateOutputType | null
    _sum: Conta_recorrenteSumAggregateOutputType | null
    _min: Conta_recorrenteMinAggregateOutputType | null
    _max: Conta_recorrenteMaxAggregateOutputType | null
  }

  export type Conta_recorrenteAvgAggregateOutputType = {
    id_conta_recorrente: number | null
    valor: Decimal | null
    intervalo_dias: number | null
  }

  export type Conta_recorrenteSumAggregateOutputType = {
    id_conta_recorrente: number | null
    valor: Decimal | null
    intervalo_dias: number | null
  }

  export type Conta_recorrenteMinAggregateOutputType = {
    id_conta_recorrente: number | null
    id_carteira: string | null
    valor: Decimal | null
    descricao: string | null
    intervalo_dias: number | null
    data_inicio: Date | null
  }

  export type Conta_recorrenteMaxAggregateOutputType = {
    id_conta_recorrente: number | null
    id_carteira: string | null
    valor: Decimal | null
    descricao: string | null
    intervalo_dias: number | null
    data_inicio: Date | null
  }

  export type Conta_recorrenteCountAggregateOutputType = {
    id_conta_recorrente: number
    id_carteira: number
    valor: number
    descricao: number
    intervalo_dias: number
    data_inicio: number
    _all: number
  }


  export type Conta_recorrenteAvgAggregateInputType = {
    id_conta_recorrente?: true
    valor?: true
    intervalo_dias?: true
  }

  export type Conta_recorrenteSumAggregateInputType = {
    id_conta_recorrente?: true
    valor?: true
    intervalo_dias?: true
  }

  export type Conta_recorrenteMinAggregateInputType = {
    id_conta_recorrente?: true
    id_carteira?: true
    valor?: true
    descricao?: true
    intervalo_dias?: true
    data_inicio?: true
  }

  export type Conta_recorrenteMaxAggregateInputType = {
    id_conta_recorrente?: true
    id_carteira?: true
    valor?: true
    descricao?: true
    intervalo_dias?: true
    data_inicio?: true
  }

  export type Conta_recorrenteCountAggregateInputType = {
    id_conta_recorrente?: true
    id_carteira?: true
    valor?: true
    descricao?: true
    intervalo_dias?: true
    data_inicio?: true
    _all?: true
  }

  export type Conta_recorrenteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which conta_recorrente to aggregate.
     */
    where?: conta_recorrenteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of conta_recorrentes to fetch.
     */
    orderBy?: conta_recorrenteOrderByWithRelationInput | conta_recorrenteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: conta_recorrenteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` conta_recorrentes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` conta_recorrentes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned conta_recorrentes
    **/
    _count?: true | Conta_recorrenteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Conta_recorrenteAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Conta_recorrenteSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Conta_recorrenteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Conta_recorrenteMaxAggregateInputType
  }

  export type GetConta_recorrenteAggregateType<T extends Conta_recorrenteAggregateArgs> = {
        [P in keyof T & keyof AggregateConta_recorrente]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConta_recorrente[P]>
      : GetScalarType<T[P], AggregateConta_recorrente[P]>
  }




  export type conta_recorrenteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: conta_recorrenteWhereInput
    orderBy?: conta_recorrenteOrderByWithAggregationInput | conta_recorrenteOrderByWithAggregationInput[]
    by: Conta_recorrenteScalarFieldEnum[] | Conta_recorrenteScalarFieldEnum
    having?: conta_recorrenteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Conta_recorrenteCountAggregateInputType | true
    _avg?: Conta_recorrenteAvgAggregateInputType
    _sum?: Conta_recorrenteSumAggregateInputType
    _min?: Conta_recorrenteMinAggregateInputType
    _max?: Conta_recorrenteMaxAggregateInputType
  }

  export type Conta_recorrenteGroupByOutputType = {
    id_conta_recorrente: number
    id_carteira: string
    valor: Decimal
    descricao: string | null
    intervalo_dias: number
    data_inicio: Date
    _count: Conta_recorrenteCountAggregateOutputType | null
    _avg: Conta_recorrenteAvgAggregateOutputType | null
    _sum: Conta_recorrenteSumAggregateOutputType | null
    _min: Conta_recorrenteMinAggregateOutputType | null
    _max: Conta_recorrenteMaxAggregateOutputType | null
  }

  type GetConta_recorrenteGroupByPayload<T extends conta_recorrenteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Conta_recorrenteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Conta_recorrenteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Conta_recorrenteGroupByOutputType[P]>
            : GetScalarType<T[P], Conta_recorrenteGroupByOutputType[P]>
        }
      >
    >


  export type conta_recorrenteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_conta_recorrente?: boolean
    id_carteira?: boolean
    valor?: boolean
    descricao?: boolean
    intervalo_dias?: boolean
    data_inicio?: boolean
    carteira?: boolean | carteiraDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conta_recorrente"]>

  export type conta_recorrenteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_conta_recorrente?: boolean
    id_carteira?: boolean
    valor?: boolean
    descricao?: boolean
    intervalo_dias?: boolean
    data_inicio?: boolean
    carteira?: boolean | carteiraDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conta_recorrente"]>

  export type conta_recorrenteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_conta_recorrente?: boolean
    id_carteira?: boolean
    valor?: boolean
    descricao?: boolean
    intervalo_dias?: boolean
    data_inicio?: boolean
    carteira?: boolean | carteiraDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conta_recorrente"]>

  export type conta_recorrenteSelectScalar = {
    id_conta_recorrente?: boolean
    id_carteira?: boolean
    valor?: boolean
    descricao?: boolean
    intervalo_dias?: boolean
    data_inicio?: boolean
  }

  export type conta_recorrenteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_conta_recorrente" | "id_carteira" | "valor" | "descricao" | "intervalo_dias" | "data_inicio", ExtArgs["result"]["conta_recorrente"]>
  export type conta_recorrenteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    carteira?: boolean | carteiraDefaultArgs<ExtArgs>
  }
  export type conta_recorrenteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    carteira?: boolean | carteiraDefaultArgs<ExtArgs>
  }
  export type conta_recorrenteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    carteira?: boolean | carteiraDefaultArgs<ExtArgs>
  }

  export type $conta_recorrentePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "conta_recorrente"
    objects: {
      carteira: Prisma.$carteiraPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_conta_recorrente: number
      id_carteira: string
      valor: Prisma.Decimal
      descricao: string | null
      intervalo_dias: number
      data_inicio: Date
    }, ExtArgs["result"]["conta_recorrente"]>
    composites: {}
  }

  type conta_recorrenteGetPayload<S extends boolean | null | undefined | conta_recorrenteDefaultArgs> = $Result.GetResult<Prisma.$conta_recorrentePayload, S>

  type conta_recorrenteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<conta_recorrenteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Conta_recorrenteCountAggregateInputType | true
    }

  export interface conta_recorrenteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['conta_recorrente'], meta: { name: 'conta_recorrente' } }
    /**
     * Find zero or one Conta_recorrente that matches the filter.
     * @param {conta_recorrenteFindUniqueArgs} args - Arguments to find a Conta_recorrente
     * @example
     * // Get one Conta_recorrente
     * const conta_recorrente = await prisma.conta_recorrente.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends conta_recorrenteFindUniqueArgs>(args: SelectSubset<T, conta_recorrenteFindUniqueArgs<ExtArgs>>): Prisma__conta_recorrenteClient<$Result.GetResult<Prisma.$conta_recorrentePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Conta_recorrente that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {conta_recorrenteFindUniqueOrThrowArgs} args - Arguments to find a Conta_recorrente
     * @example
     * // Get one Conta_recorrente
     * const conta_recorrente = await prisma.conta_recorrente.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends conta_recorrenteFindUniqueOrThrowArgs>(args: SelectSubset<T, conta_recorrenteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__conta_recorrenteClient<$Result.GetResult<Prisma.$conta_recorrentePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conta_recorrente that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conta_recorrenteFindFirstArgs} args - Arguments to find a Conta_recorrente
     * @example
     * // Get one Conta_recorrente
     * const conta_recorrente = await prisma.conta_recorrente.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends conta_recorrenteFindFirstArgs>(args?: SelectSubset<T, conta_recorrenteFindFirstArgs<ExtArgs>>): Prisma__conta_recorrenteClient<$Result.GetResult<Prisma.$conta_recorrentePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Conta_recorrente that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conta_recorrenteFindFirstOrThrowArgs} args - Arguments to find a Conta_recorrente
     * @example
     * // Get one Conta_recorrente
     * const conta_recorrente = await prisma.conta_recorrente.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends conta_recorrenteFindFirstOrThrowArgs>(args?: SelectSubset<T, conta_recorrenteFindFirstOrThrowArgs<ExtArgs>>): Prisma__conta_recorrenteClient<$Result.GetResult<Prisma.$conta_recorrentePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Conta_recorrentes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conta_recorrenteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conta_recorrentes
     * const conta_recorrentes = await prisma.conta_recorrente.findMany()
     * 
     * // Get first 10 Conta_recorrentes
     * const conta_recorrentes = await prisma.conta_recorrente.findMany({ take: 10 })
     * 
     * // Only select the `id_conta_recorrente`
     * const conta_recorrenteWithId_conta_recorrenteOnly = await prisma.conta_recorrente.findMany({ select: { id_conta_recorrente: true } })
     * 
     */
    findMany<T extends conta_recorrenteFindManyArgs>(args?: SelectSubset<T, conta_recorrenteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$conta_recorrentePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Conta_recorrente.
     * @param {conta_recorrenteCreateArgs} args - Arguments to create a Conta_recorrente.
     * @example
     * // Create one Conta_recorrente
     * const Conta_recorrente = await prisma.conta_recorrente.create({
     *   data: {
     *     // ... data to create a Conta_recorrente
     *   }
     * })
     * 
     */
    create<T extends conta_recorrenteCreateArgs>(args: SelectSubset<T, conta_recorrenteCreateArgs<ExtArgs>>): Prisma__conta_recorrenteClient<$Result.GetResult<Prisma.$conta_recorrentePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Conta_recorrentes.
     * @param {conta_recorrenteCreateManyArgs} args - Arguments to create many Conta_recorrentes.
     * @example
     * // Create many Conta_recorrentes
     * const conta_recorrente = await prisma.conta_recorrente.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends conta_recorrenteCreateManyArgs>(args?: SelectSubset<T, conta_recorrenteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Conta_recorrentes and returns the data saved in the database.
     * @param {conta_recorrenteCreateManyAndReturnArgs} args - Arguments to create many Conta_recorrentes.
     * @example
     * // Create many Conta_recorrentes
     * const conta_recorrente = await prisma.conta_recorrente.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Conta_recorrentes and only return the `id_conta_recorrente`
     * const conta_recorrenteWithId_conta_recorrenteOnly = await prisma.conta_recorrente.createManyAndReturn({
     *   select: { id_conta_recorrente: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends conta_recorrenteCreateManyAndReturnArgs>(args?: SelectSubset<T, conta_recorrenteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$conta_recorrentePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Conta_recorrente.
     * @param {conta_recorrenteDeleteArgs} args - Arguments to delete one Conta_recorrente.
     * @example
     * // Delete one Conta_recorrente
     * const Conta_recorrente = await prisma.conta_recorrente.delete({
     *   where: {
     *     // ... filter to delete one Conta_recorrente
     *   }
     * })
     * 
     */
    delete<T extends conta_recorrenteDeleteArgs>(args: SelectSubset<T, conta_recorrenteDeleteArgs<ExtArgs>>): Prisma__conta_recorrenteClient<$Result.GetResult<Prisma.$conta_recorrentePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Conta_recorrente.
     * @param {conta_recorrenteUpdateArgs} args - Arguments to update one Conta_recorrente.
     * @example
     * // Update one Conta_recorrente
     * const conta_recorrente = await prisma.conta_recorrente.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends conta_recorrenteUpdateArgs>(args: SelectSubset<T, conta_recorrenteUpdateArgs<ExtArgs>>): Prisma__conta_recorrenteClient<$Result.GetResult<Prisma.$conta_recorrentePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Conta_recorrentes.
     * @param {conta_recorrenteDeleteManyArgs} args - Arguments to filter Conta_recorrentes to delete.
     * @example
     * // Delete a few Conta_recorrentes
     * const { count } = await prisma.conta_recorrente.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends conta_recorrenteDeleteManyArgs>(args?: SelectSubset<T, conta_recorrenteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conta_recorrentes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conta_recorrenteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conta_recorrentes
     * const conta_recorrente = await prisma.conta_recorrente.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends conta_recorrenteUpdateManyArgs>(args: SelectSubset<T, conta_recorrenteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conta_recorrentes and returns the data updated in the database.
     * @param {conta_recorrenteUpdateManyAndReturnArgs} args - Arguments to update many Conta_recorrentes.
     * @example
     * // Update many Conta_recorrentes
     * const conta_recorrente = await prisma.conta_recorrente.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Conta_recorrentes and only return the `id_conta_recorrente`
     * const conta_recorrenteWithId_conta_recorrenteOnly = await prisma.conta_recorrente.updateManyAndReturn({
     *   select: { id_conta_recorrente: true },
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
    updateManyAndReturn<T extends conta_recorrenteUpdateManyAndReturnArgs>(args: SelectSubset<T, conta_recorrenteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$conta_recorrentePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Conta_recorrente.
     * @param {conta_recorrenteUpsertArgs} args - Arguments to update or create a Conta_recorrente.
     * @example
     * // Update or create a Conta_recorrente
     * const conta_recorrente = await prisma.conta_recorrente.upsert({
     *   create: {
     *     // ... data to create a Conta_recorrente
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conta_recorrente we want to update
     *   }
     * })
     */
    upsert<T extends conta_recorrenteUpsertArgs>(args: SelectSubset<T, conta_recorrenteUpsertArgs<ExtArgs>>): Prisma__conta_recorrenteClient<$Result.GetResult<Prisma.$conta_recorrentePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Conta_recorrentes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conta_recorrenteCountArgs} args - Arguments to filter Conta_recorrentes to count.
     * @example
     * // Count the number of Conta_recorrentes
     * const count = await prisma.conta_recorrente.count({
     *   where: {
     *     // ... the filter for the Conta_recorrentes we want to count
     *   }
     * })
    **/
    count<T extends conta_recorrenteCountArgs>(
      args?: Subset<T, conta_recorrenteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Conta_recorrenteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conta_recorrente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Conta_recorrenteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Conta_recorrenteAggregateArgs>(args: Subset<T, Conta_recorrenteAggregateArgs>): Prisma.PrismaPromise<GetConta_recorrenteAggregateType<T>>

    /**
     * Group by Conta_recorrente.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {conta_recorrenteGroupByArgs} args - Group by arguments.
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
      T extends conta_recorrenteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: conta_recorrenteGroupByArgs['orderBy'] }
        : { orderBy?: conta_recorrenteGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, conta_recorrenteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConta_recorrenteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the conta_recorrente model
   */
  readonly fields: conta_recorrenteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for conta_recorrente.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__conta_recorrenteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    carteira<T extends carteiraDefaultArgs<ExtArgs> = {}>(args?: Subset<T, carteiraDefaultArgs<ExtArgs>>): Prisma__carteiraClient<$Result.GetResult<Prisma.$carteiraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the conta_recorrente model
   */
  interface conta_recorrenteFieldRefs {
    readonly id_conta_recorrente: FieldRef<"conta_recorrente", 'Int'>
    readonly id_carteira: FieldRef<"conta_recorrente", 'String'>
    readonly valor: FieldRef<"conta_recorrente", 'Decimal'>
    readonly descricao: FieldRef<"conta_recorrente", 'String'>
    readonly intervalo_dias: FieldRef<"conta_recorrente", 'Int'>
    readonly data_inicio: FieldRef<"conta_recorrente", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * conta_recorrente findUnique
   */
  export type conta_recorrenteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conta_recorrente
     */
    select?: conta_recorrenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conta_recorrente
     */
    omit?: conta_recorrenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conta_recorrenteInclude<ExtArgs> | null
    /**
     * Filter, which conta_recorrente to fetch.
     */
    where: conta_recorrenteWhereUniqueInput
  }

  /**
   * conta_recorrente findUniqueOrThrow
   */
  export type conta_recorrenteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conta_recorrente
     */
    select?: conta_recorrenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conta_recorrente
     */
    omit?: conta_recorrenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conta_recorrenteInclude<ExtArgs> | null
    /**
     * Filter, which conta_recorrente to fetch.
     */
    where: conta_recorrenteWhereUniqueInput
  }

  /**
   * conta_recorrente findFirst
   */
  export type conta_recorrenteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conta_recorrente
     */
    select?: conta_recorrenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conta_recorrente
     */
    omit?: conta_recorrenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conta_recorrenteInclude<ExtArgs> | null
    /**
     * Filter, which conta_recorrente to fetch.
     */
    where?: conta_recorrenteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of conta_recorrentes to fetch.
     */
    orderBy?: conta_recorrenteOrderByWithRelationInput | conta_recorrenteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for conta_recorrentes.
     */
    cursor?: conta_recorrenteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` conta_recorrentes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` conta_recorrentes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of conta_recorrentes.
     */
    distinct?: Conta_recorrenteScalarFieldEnum | Conta_recorrenteScalarFieldEnum[]
  }

  /**
   * conta_recorrente findFirstOrThrow
   */
  export type conta_recorrenteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conta_recorrente
     */
    select?: conta_recorrenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conta_recorrente
     */
    omit?: conta_recorrenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conta_recorrenteInclude<ExtArgs> | null
    /**
     * Filter, which conta_recorrente to fetch.
     */
    where?: conta_recorrenteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of conta_recorrentes to fetch.
     */
    orderBy?: conta_recorrenteOrderByWithRelationInput | conta_recorrenteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for conta_recorrentes.
     */
    cursor?: conta_recorrenteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` conta_recorrentes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` conta_recorrentes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of conta_recorrentes.
     */
    distinct?: Conta_recorrenteScalarFieldEnum | Conta_recorrenteScalarFieldEnum[]
  }

  /**
   * conta_recorrente findMany
   */
  export type conta_recorrenteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conta_recorrente
     */
    select?: conta_recorrenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conta_recorrente
     */
    omit?: conta_recorrenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conta_recorrenteInclude<ExtArgs> | null
    /**
     * Filter, which conta_recorrentes to fetch.
     */
    where?: conta_recorrenteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of conta_recorrentes to fetch.
     */
    orderBy?: conta_recorrenteOrderByWithRelationInput | conta_recorrenteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing conta_recorrentes.
     */
    cursor?: conta_recorrenteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` conta_recorrentes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` conta_recorrentes.
     */
    skip?: number
    distinct?: Conta_recorrenteScalarFieldEnum | Conta_recorrenteScalarFieldEnum[]
  }

  /**
   * conta_recorrente create
   */
  export type conta_recorrenteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conta_recorrente
     */
    select?: conta_recorrenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conta_recorrente
     */
    omit?: conta_recorrenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conta_recorrenteInclude<ExtArgs> | null
    /**
     * The data needed to create a conta_recorrente.
     */
    data: XOR<conta_recorrenteCreateInput, conta_recorrenteUncheckedCreateInput>
  }

  /**
   * conta_recorrente createMany
   */
  export type conta_recorrenteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many conta_recorrentes.
     */
    data: conta_recorrenteCreateManyInput | conta_recorrenteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * conta_recorrente createManyAndReturn
   */
  export type conta_recorrenteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conta_recorrente
     */
    select?: conta_recorrenteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the conta_recorrente
     */
    omit?: conta_recorrenteOmit<ExtArgs> | null
    /**
     * The data used to create many conta_recorrentes.
     */
    data: conta_recorrenteCreateManyInput | conta_recorrenteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conta_recorrenteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * conta_recorrente update
   */
  export type conta_recorrenteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conta_recorrente
     */
    select?: conta_recorrenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conta_recorrente
     */
    omit?: conta_recorrenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conta_recorrenteInclude<ExtArgs> | null
    /**
     * The data needed to update a conta_recorrente.
     */
    data: XOR<conta_recorrenteUpdateInput, conta_recorrenteUncheckedUpdateInput>
    /**
     * Choose, which conta_recorrente to update.
     */
    where: conta_recorrenteWhereUniqueInput
  }

  /**
   * conta_recorrente updateMany
   */
  export type conta_recorrenteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update conta_recorrentes.
     */
    data: XOR<conta_recorrenteUpdateManyMutationInput, conta_recorrenteUncheckedUpdateManyInput>
    /**
     * Filter which conta_recorrentes to update
     */
    where?: conta_recorrenteWhereInput
    /**
     * Limit how many conta_recorrentes to update.
     */
    limit?: number
  }

  /**
   * conta_recorrente updateManyAndReturn
   */
  export type conta_recorrenteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conta_recorrente
     */
    select?: conta_recorrenteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the conta_recorrente
     */
    omit?: conta_recorrenteOmit<ExtArgs> | null
    /**
     * The data used to update conta_recorrentes.
     */
    data: XOR<conta_recorrenteUpdateManyMutationInput, conta_recorrenteUncheckedUpdateManyInput>
    /**
     * Filter which conta_recorrentes to update
     */
    where?: conta_recorrenteWhereInput
    /**
     * Limit how many conta_recorrentes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conta_recorrenteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * conta_recorrente upsert
   */
  export type conta_recorrenteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conta_recorrente
     */
    select?: conta_recorrenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conta_recorrente
     */
    omit?: conta_recorrenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conta_recorrenteInclude<ExtArgs> | null
    /**
     * The filter to search for the conta_recorrente to update in case it exists.
     */
    where: conta_recorrenteWhereUniqueInput
    /**
     * In case the conta_recorrente found by the `where` argument doesn't exist, create a new conta_recorrente with this data.
     */
    create: XOR<conta_recorrenteCreateInput, conta_recorrenteUncheckedCreateInput>
    /**
     * In case the conta_recorrente was found with the provided `where` argument, update it with this data.
     */
    update: XOR<conta_recorrenteUpdateInput, conta_recorrenteUncheckedUpdateInput>
  }

  /**
   * conta_recorrente delete
   */
  export type conta_recorrenteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conta_recorrente
     */
    select?: conta_recorrenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conta_recorrente
     */
    omit?: conta_recorrenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conta_recorrenteInclude<ExtArgs> | null
    /**
     * Filter which conta_recorrente to delete.
     */
    where: conta_recorrenteWhereUniqueInput
  }

  /**
   * conta_recorrente deleteMany
   */
  export type conta_recorrenteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which conta_recorrentes to delete
     */
    where?: conta_recorrenteWhereInput
    /**
     * Limit how many conta_recorrentes to delete.
     */
    limit?: number
  }

  /**
   * conta_recorrente without action
   */
  export type conta_recorrenteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the conta_recorrente
     */
    select?: conta_recorrenteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the conta_recorrente
     */
    omit?: conta_recorrenteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: conta_recorrenteInclude<ExtArgs> | null
  }


  /**
   * Model transacao
   */

  export type AggregateTransacao = {
    _count: TransacaoCountAggregateOutputType | null
    _avg: TransacaoAvgAggregateOutputType | null
    _sum: TransacaoSumAggregateOutputType | null
    _min: TransacaoMinAggregateOutputType | null
    _max: TransacaoMaxAggregateOutputType | null
  }

  export type TransacaoAvgAggregateOutputType = {
    id_transacao: number | null
    valor: Decimal | null
  }

  export type TransacaoSumAggregateOutputType = {
    id_transacao: number | null
    valor: Decimal | null
  }

  export type TransacaoMinAggregateOutputType = {
    id_transacao: number | null
    id_carteira: string | null
    valor: Decimal | null
    tipo: string | null
    descricao: string | null
    data: Date | null
  }

  export type TransacaoMaxAggregateOutputType = {
    id_transacao: number | null
    id_carteira: string | null
    valor: Decimal | null
    tipo: string | null
    descricao: string | null
    data: Date | null
  }

  export type TransacaoCountAggregateOutputType = {
    id_transacao: number
    id_carteira: number
    valor: number
    tipo: number
    descricao: number
    data: number
    _all: number
  }


  export type TransacaoAvgAggregateInputType = {
    id_transacao?: true
    valor?: true
  }

  export type TransacaoSumAggregateInputType = {
    id_transacao?: true
    valor?: true
  }

  export type TransacaoMinAggregateInputType = {
    id_transacao?: true
    id_carteira?: true
    valor?: true
    tipo?: true
    descricao?: true
    data?: true
  }

  export type TransacaoMaxAggregateInputType = {
    id_transacao?: true
    id_carteira?: true
    valor?: true
    tipo?: true
    descricao?: true
    data?: true
  }

  export type TransacaoCountAggregateInputType = {
    id_transacao?: true
    id_carteira?: true
    valor?: true
    tipo?: true
    descricao?: true
    data?: true
    _all?: true
  }

  export type TransacaoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which transacao to aggregate.
     */
    where?: transacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transacaos to fetch.
     */
    orderBy?: transacaoOrderByWithRelationInput | transacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: transacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned transacaos
    **/
    _count?: true | TransacaoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransacaoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransacaoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransacaoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransacaoMaxAggregateInputType
  }

  export type GetTransacaoAggregateType<T extends TransacaoAggregateArgs> = {
        [P in keyof T & keyof AggregateTransacao]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransacao[P]>
      : GetScalarType<T[P], AggregateTransacao[P]>
  }




  export type transacaoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: transacaoWhereInput
    orderBy?: transacaoOrderByWithAggregationInput | transacaoOrderByWithAggregationInput[]
    by: TransacaoScalarFieldEnum[] | TransacaoScalarFieldEnum
    having?: transacaoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransacaoCountAggregateInputType | true
    _avg?: TransacaoAvgAggregateInputType
    _sum?: TransacaoSumAggregateInputType
    _min?: TransacaoMinAggregateInputType
    _max?: TransacaoMaxAggregateInputType
  }

  export type TransacaoGroupByOutputType = {
    id_transacao: number
    id_carteira: string
    valor: Decimal
    tipo: string
    descricao: string | null
    data: Date
    _count: TransacaoCountAggregateOutputType | null
    _avg: TransacaoAvgAggregateOutputType | null
    _sum: TransacaoSumAggregateOutputType | null
    _min: TransacaoMinAggregateOutputType | null
    _max: TransacaoMaxAggregateOutputType | null
  }

  type GetTransacaoGroupByPayload<T extends transacaoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransacaoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransacaoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransacaoGroupByOutputType[P]>
            : GetScalarType<T[P], TransacaoGroupByOutputType[P]>
        }
      >
    >


  export type transacaoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_transacao?: boolean
    id_carteira?: boolean
    valor?: boolean
    tipo?: boolean
    descricao?: boolean
    data?: boolean
    carteira?: boolean | carteiraDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transacao"]>

  export type transacaoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_transacao?: boolean
    id_carteira?: boolean
    valor?: boolean
    tipo?: boolean
    descricao?: boolean
    data?: boolean
    carteira?: boolean | carteiraDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transacao"]>

  export type transacaoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_transacao?: boolean
    id_carteira?: boolean
    valor?: boolean
    tipo?: boolean
    descricao?: boolean
    data?: boolean
    carteira?: boolean | carteiraDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transacao"]>

  export type transacaoSelectScalar = {
    id_transacao?: boolean
    id_carteira?: boolean
    valor?: boolean
    tipo?: boolean
    descricao?: boolean
    data?: boolean
  }

  export type transacaoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_transacao" | "id_carteira" | "valor" | "tipo" | "descricao" | "data", ExtArgs["result"]["transacao"]>
  export type transacaoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    carteira?: boolean | carteiraDefaultArgs<ExtArgs>
  }
  export type transacaoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    carteira?: boolean | carteiraDefaultArgs<ExtArgs>
  }
  export type transacaoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    carteira?: boolean | carteiraDefaultArgs<ExtArgs>
  }

  export type $transacaoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "transacao"
    objects: {
      carteira: Prisma.$carteiraPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id_transacao: number
      id_carteira: string
      valor: Prisma.Decimal
      tipo: string
      descricao: string | null
      data: Date
    }, ExtArgs["result"]["transacao"]>
    composites: {}
  }

  type transacaoGetPayload<S extends boolean | null | undefined | transacaoDefaultArgs> = $Result.GetResult<Prisma.$transacaoPayload, S>

  type transacaoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<transacaoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransacaoCountAggregateInputType | true
    }

  export interface transacaoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['transacao'], meta: { name: 'transacao' } }
    /**
     * Find zero or one Transacao that matches the filter.
     * @param {transacaoFindUniqueArgs} args - Arguments to find a Transacao
     * @example
     * // Get one Transacao
     * const transacao = await prisma.transacao.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends transacaoFindUniqueArgs>(args: SelectSubset<T, transacaoFindUniqueArgs<ExtArgs>>): Prisma__transacaoClient<$Result.GetResult<Prisma.$transacaoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transacao that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {transacaoFindUniqueOrThrowArgs} args - Arguments to find a Transacao
     * @example
     * // Get one Transacao
     * const transacao = await prisma.transacao.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends transacaoFindUniqueOrThrowArgs>(args: SelectSubset<T, transacaoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__transacaoClient<$Result.GetResult<Prisma.$transacaoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transacao that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transacaoFindFirstArgs} args - Arguments to find a Transacao
     * @example
     * // Get one Transacao
     * const transacao = await prisma.transacao.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends transacaoFindFirstArgs>(args?: SelectSubset<T, transacaoFindFirstArgs<ExtArgs>>): Prisma__transacaoClient<$Result.GetResult<Prisma.$transacaoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transacao that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transacaoFindFirstOrThrowArgs} args - Arguments to find a Transacao
     * @example
     * // Get one Transacao
     * const transacao = await prisma.transacao.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends transacaoFindFirstOrThrowArgs>(args?: SelectSubset<T, transacaoFindFirstOrThrowArgs<ExtArgs>>): Prisma__transacaoClient<$Result.GetResult<Prisma.$transacaoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transacaos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transacaoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transacaos
     * const transacaos = await prisma.transacao.findMany()
     * 
     * // Get first 10 Transacaos
     * const transacaos = await prisma.transacao.findMany({ take: 10 })
     * 
     * // Only select the `id_transacao`
     * const transacaoWithId_transacaoOnly = await prisma.transacao.findMany({ select: { id_transacao: true } })
     * 
     */
    findMany<T extends transacaoFindManyArgs>(args?: SelectSubset<T, transacaoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transacaoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transacao.
     * @param {transacaoCreateArgs} args - Arguments to create a Transacao.
     * @example
     * // Create one Transacao
     * const Transacao = await prisma.transacao.create({
     *   data: {
     *     // ... data to create a Transacao
     *   }
     * })
     * 
     */
    create<T extends transacaoCreateArgs>(args: SelectSubset<T, transacaoCreateArgs<ExtArgs>>): Prisma__transacaoClient<$Result.GetResult<Prisma.$transacaoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transacaos.
     * @param {transacaoCreateManyArgs} args - Arguments to create many Transacaos.
     * @example
     * // Create many Transacaos
     * const transacao = await prisma.transacao.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends transacaoCreateManyArgs>(args?: SelectSubset<T, transacaoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transacaos and returns the data saved in the database.
     * @param {transacaoCreateManyAndReturnArgs} args - Arguments to create many Transacaos.
     * @example
     * // Create many Transacaos
     * const transacao = await prisma.transacao.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transacaos and only return the `id_transacao`
     * const transacaoWithId_transacaoOnly = await prisma.transacao.createManyAndReturn({
     *   select: { id_transacao: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends transacaoCreateManyAndReturnArgs>(args?: SelectSubset<T, transacaoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transacaoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transacao.
     * @param {transacaoDeleteArgs} args - Arguments to delete one Transacao.
     * @example
     * // Delete one Transacao
     * const Transacao = await prisma.transacao.delete({
     *   where: {
     *     // ... filter to delete one Transacao
     *   }
     * })
     * 
     */
    delete<T extends transacaoDeleteArgs>(args: SelectSubset<T, transacaoDeleteArgs<ExtArgs>>): Prisma__transacaoClient<$Result.GetResult<Prisma.$transacaoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transacao.
     * @param {transacaoUpdateArgs} args - Arguments to update one Transacao.
     * @example
     * // Update one Transacao
     * const transacao = await prisma.transacao.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends transacaoUpdateArgs>(args: SelectSubset<T, transacaoUpdateArgs<ExtArgs>>): Prisma__transacaoClient<$Result.GetResult<Prisma.$transacaoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transacaos.
     * @param {transacaoDeleteManyArgs} args - Arguments to filter Transacaos to delete.
     * @example
     * // Delete a few Transacaos
     * const { count } = await prisma.transacao.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends transacaoDeleteManyArgs>(args?: SelectSubset<T, transacaoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transacaoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transacaos
     * const transacao = await prisma.transacao.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends transacaoUpdateManyArgs>(args: SelectSubset<T, transacaoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transacaos and returns the data updated in the database.
     * @param {transacaoUpdateManyAndReturnArgs} args - Arguments to update many Transacaos.
     * @example
     * // Update many Transacaos
     * const transacao = await prisma.transacao.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transacaos and only return the `id_transacao`
     * const transacaoWithId_transacaoOnly = await prisma.transacao.updateManyAndReturn({
     *   select: { id_transacao: true },
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
    updateManyAndReturn<T extends transacaoUpdateManyAndReturnArgs>(args: SelectSubset<T, transacaoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$transacaoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transacao.
     * @param {transacaoUpsertArgs} args - Arguments to update or create a Transacao.
     * @example
     * // Update or create a Transacao
     * const transacao = await prisma.transacao.upsert({
     *   create: {
     *     // ... data to create a Transacao
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transacao we want to update
     *   }
     * })
     */
    upsert<T extends transacaoUpsertArgs>(args: SelectSubset<T, transacaoUpsertArgs<ExtArgs>>): Prisma__transacaoClient<$Result.GetResult<Prisma.$transacaoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transacaos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transacaoCountArgs} args - Arguments to filter Transacaos to count.
     * @example
     * // Count the number of Transacaos
     * const count = await prisma.transacao.count({
     *   where: {
     *     // ... the filter for the Transacaos we want to count
     *   }
     * })
    **/
    count<T extends transacaoCountArgs>(
      args?: Subset<T, transacaoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransacaoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransacaoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TransacaoAggregateArgs>(args: Subset<T, TransacaoAggregateArgs>): Prisma.PrismaPromise<GetTransacaoAggregateType<T>>

    /**
     * Group by Transacao.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {transacaoGroupByArgs} args - Group by arguments.
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
      T extends transacaoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: transacaoGroupByArgs['orderBy'] }
        : { orderBy?: transacaoGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, transacaoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransacaoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the transacao model
   */
  readonly fields: transacaoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for transacao.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__transacaoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    carteira<T extends carteiraDefaultArgs<ExtArgs> = {}>(args?: Subset<T, carteiraDefaultArgs<ExtArgs>>): Prisma__carteiraClient<$Result.GetResult<Prisma.$carteiraPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the transacao model
   */
  interface transacaoFieldRefs {
    readonly id_transacao: FieldRef<"transacao", 'Int'>
    readonly id_carteira: FieldRef<"transacao", 'String'>
    readonly valor: FieldRef<"transacao", 'Decimal'>
    readonly tipo: FieldRef<"transacao", 'String'>
    readonly descricao: FieldRef<"transacao", 'String'>
    readonly data: FieldRef<"transacao", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * transacao findUnique
   */
  export type transacaoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transacao
     */
    select?: transacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transacao
     */
    omit?: transacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transacaoInclude<ExtArgs> | null
    /**
     * Filter, which transacao to fetch.
     */
    where: transacaoWhereUniqueInput
  }

  /**
   * transacao findUniqueOrThrow
   */
  export type transacaoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transacao
     */
    select?: transacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transacao
     */
    omit?: transacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transacaoInclude<ExtArgs> | null
    /**
     * Filter, which transacao to fetch.
     */
    where: transacaoWhereUniqueInput
  }

  /**
   * transacao findFirst
   */
  export type transacaoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transacao
     */
    select?: transacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transacao
     */
    omit?: transacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transacaoInclude<ExtArgs> | null
    /**
     * Filter, which transacao to fetch.
     */
    where?: transacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transacaos to fetch.
     */
    orderBy?: transacaoOrderByWithRelationInput | transacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for transacaos.
     */
    cursor?: transacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of transacaos.
     */
    distinct?: TransacaoScalarFieldEnum | TransacaoScalarFieldEnum[]
  }

  /**
   * transacao findFirstOrThrow
   */
  export type transacaoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transacao
     */
    select?: transacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transacao
     */
    omit?: transacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transacaoInclude<ExtArgs> | null
    /**
     * Filter, which transacao to fetch.
     */
    where?: transacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transacaos to fetch.
     */
    orderBy?: transacaoOrderByWithRelationInput | transacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for transacaos.
     */
    cursor?: transacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transacaos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of transacaos.
     */
    distinct?: TransacaoScalarFieldEnum | TransacaoScalarFieldEnum[]
  }

  /**
   * transacao findMany
   */
  export type transacaoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transacao
     */
    select?: transacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transacao
     */
    omit?: transacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transacaoInclude<ExtArgs> | null
    /**
     * Filter, which transacaos to fetch.
     */
    where?: transacaoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of transacaos to fetch.
     */
    orderBy?: transacaoOrderByWithRelationInput | transacaoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing transacaos.
     */
    cursor?: transacaoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` transacaos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` transacaos.
     */
    skip?: number
    distinct?: TransacaoScalarFieldEnum | TransacaoScalarFieldEnum[]
  }

  /**
   * transacao create
   */
  export type transacaoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transacao
     */
    select?: transacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transacao
     */
    omit?: transacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transacaoInclude<ExtArgs> | null
    /**
     * The data needed to create a transacao.
     */
    data: XOR<transacaoCreateInput, transacaoUncheckedCreateInput>
  }

  /**
   * transacao createMany
   */
  export type transacaoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many transacaos.
     */
    data: transacaoCreateManyInput | transacaoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * transacao createManyAndReturn
   */
  export type transacaoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transacao
     */
    select?: transacaoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the transacao
     */
    omit?: transacaoOmit<ExtArgs> | null
    /**
     * The data used to create many transacaos.
     */
    data: transacaoCreateManyInput | transacaoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transacaoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * transacao update
   */
  export type transacaoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transacao
     */
    select?: transacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transacao
     */
    omit?: transacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transacaoInclude<ExtArgs> | null
    /**
     * The data needed to update a transacao.
     */
    data: XOR<transacaoUpdateInput, transacaoUncheckedUpdateInput>
    /**
     * Choose, which transacao to update.
     */
    where: transacaoWhereUniqueInput
  }

  /**
   * transacao updateMany
   */
  export type transacaoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update transacaos.
     */
    data: XOR<transacaoUpdateManyMutationInput, transacaoUncheckedUpdateManyInput>
    /**
     * Filter which transacaos to update
     */
    where?: transacaoWhereInput
    /**
     * Limit how many transacaos to update.
     */
    limit?: number
  }

  /**
   * transacao updateManyAndReturn
   */
  export type transacaoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transacao
     */
    select?: transacaoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the transacao
     */
    omit?: transacaoOmit<ExtArgs> | null
    /**
     * The data used to update transacaos.
     */
    data: XOR<transacaoUpdateManyMutationInput, transacaoUncheckedUpdateManyInput>
    /**
     * Filter which transacaos to update
     */
    where?: transacaoWhereInput
    /**
     * Limit how many transacaos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transacaoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * transacao upsert
   */
  export type transacaoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transacao
     */
    select?: transacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transacao
     */
    omit?: transacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transacaoInclude<ExtArgs> | null
    /**
     * The filter to search for the transacao to update in case it exists.
     */
    where: transacaoWhereUniqueInput
    /**
     * In case the transacao found by the `where` argument doesn't exist, create a new transacao with this data.
     */
    create: XOR<transacaoCreateInput, transacaoUncheckedCreateInput>
    /**
     * In case the transacao was found with the provided `where` argument, update it with this data.
     */
    update: XOR<transacaoUpdateInput, transacaoUncheckedUpdateInput>
  }

  /**
   * transacao delete
   */
  export type transacaoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transacao
     */
    select?: transacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transacao
     */
    omit?: transacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transacaoInclude<ExtArgs> | null
    /**
     * Filter which transacao to delete.
     */
    where: transacaoWhereUniqueInput
  }

  /**
   * transacao deleteMany
   */
  export type transacaoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which transacaos to delete
     */
    where?: transacaoWhereInput
    /**
     * Limit how many transacaos to delete.
     */
    limit?: number
  }

  /**
   * transacao without action
   */
  export type transacaoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the transacao
     */
    select?: transacaoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the transacao
     */
    omit?: transacaoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: transacaoInclude<ExtArgs> | null
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
    id_usuario: string | null
    nome: string | null
    email: string | null
    senha: string | null
  }

  export type UsuarioMaxAggregateOutputType = {
    id_usuario: string | null
    nome: string | null
    email: string | null
    senha: string | null
  }

  export type UsuarioCountAggregateOutputType = {
    id_usuario: number
    nome: number
    email: number
    senha: number
    _all: number
  }


  export type UsuarioMinAggregateInputType = {
    id_usuario?: true
    nome?: true
    email?: true
    senha?: true
  }

  export type UsuarioMaxAggregateInputType = {
    id_usuario?: true
    nome?: true
    email?: true
    senha?: true
  }

  export type UsuarioCountAggregateInputType = {
    id_usuario?: true
    nome?: true
    email?: true
    senha?: true
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
    id_usuario: string
    nome: string
    email: string
    senha: string
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
    id_usuario?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
    carteira?: boolean | usuario$carteiraArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type usuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_usuario?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type usuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id_usuario?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type usuarioSelectScalar = {
    id_usuario?: boolean
    nome?: boolean
    email?: boolean
    senha?: boolean
  }

  export type usuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id_usuario" | "nome" | "email" | "senha", ExtArgs["result"]["usuario"]>
  export type usuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    carteira?: boolean | usuario$carteiraArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type usuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type usuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $usuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "usuario"
    objects: {
      carteira: Prisma.$carteiraPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id_usuario: string
      nome: string
      email: string
      senha: string
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
     * // Only select the `id_usuario`
     * const usuarioWithId_usuarioOnly = await prisma.usuario.findMany({ select: { id_usuario: true } })
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
     * // Create many Usuarios and only return the `id_usuario`
     * const usuarioWithId_usuarioOnly = await prisma.usuario.createManyAndReturn({
     *   select: { id_usuario: true },
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
     * // Update zero or more Usuarios and only return the `id_usuario`
     * const usuarioWithId_usuarioOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { id_usuario: true },
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
    carteira<T extends usuario$carteiraArgs<ExtArgs> = {}>(args?: Subset<T, usuario$carteiraArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$carteiraPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    readonly id_usuario: FieldRef<"usuario", 'String'>
    readonly nome: FieldRef<"usuario", 'String'>
    readonly email: FieldRef<"usuario", 'String'>
    readonly senha: FieldRef<"usuario", 'String'>
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
   * usuario.carteira
   */
  export type usuario$carteiraArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the carteira
     */
    select?: carteiraSelect<ExtArgs> | null
    /**
     * Omit specific fields from the carteira
     */
    omit?: carteiraOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: carteiraInclude<ExtArgs> | null
    where?: carteiraWhereInput
    orderBy?: carteiraOrderByWithRelationInput | carteiraOrderByWithRelationInput[]
    cursor?: carteiraWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CarteiraScalarFieldEnum | CarteiraScalarFieldEnum[]
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


  export const CarteiraScalarFieldEnum: {
    id_carteira: 'id_carteira',
    id_usuario: 'id_usuario',
    saldo: 'saldo'
  };

  export type CarteiraScalarFieldEnum = (typeof CarteiraScalarFieldEnum)[keyof typeof CarteiraScalarFieldEnum]


  export const Conta_recorrenteScalarFieldEnum: {
    id_conta_recorrente: 'id_conta_recorrente',
    id_carteira: 'id_carteira',
    valor: 'valor',
    descricao: 'descricao',
    intervalo_dias: 'intervalo_dias',
    data_inicio: 'data_inicio'
  };

  export type Conta_recorrenteScalarFieldEnum = (typeof Conta_recorrenteScalarFieldEnum)[keyof typeof Conta_recorrenteScalarFieldEnum]


  export const TransacaoScalarFieldEnum: {
    id_transacao: 'id_transacao',
    id_carteira: 'id_carteira',
    valor: 'valor',
    tipo: 'tipo',
    descricao: 'descricao',
    data: 'data'
  };

  export type TransacaoScalarFieldEnum = (typeof TransacaoScalarFieldEnum)[keyof typeof TransacaoScalarFieldEnum]


  export const UsuarioScalarFieldEnum: {
    id_usuario: 'id_usuario',
    nome: 'nome',
    email: 'email',
    senha: 'senha'
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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type carteiraWhereInput = {
    AND?: carteiraWhereInput | carteiraWhereInput[]
    OR?: carteiraWhereInput[]
    NOT?: carteiraWhereInput | carteiraWhereInput[]
    id_carteira?: StringFilter<"carteira"> | string
    id_usuario?: StringFilter<"carteira"> | string
    saldo?: DecimalNullableFilter<"carteira"> | Decimal | DecimalJsLike | number | string | null
    usuario?: XOR<UsuarioScalarRelationFilter, usuarioWhereInput>
    conta_recorrente?: Conta_recorrenteListRelationFilter
    transacao?: TransacaoListRelationFilter
  }

  export type carteiraOrderByWithRelationInput = {
    id_carteira?: SortOrder
    id_usuario?: SortOrder
    saldo?: SortOrderInput | SortOrder
    usuario?: usuarioOrderByWithRelationInput
    conta_recorrente?: conta_recorrenteOrderByRelationAggregateInput
    transacao?: transacaoOrderByRelationAggregateInput
  }

  export type carteiraWhereUniqueInput = Prisma.AtLeast<{
    id_carteira?: string
    AND?: carteiraWhereInput | carteiraWhereInput[]
    OR?: carteiraWhereInput[]
    NOT?: carteiraWhereInput | carteiraWhereInput[]
    id_usuario?: StringFilter<"carteira"> | string
    saldo?: DecimalNullableFilter<"carteira"> | Decimal | DecimalJsLike | number | string | null
    usuario?: XOR<UsuarioScalarRelationFilter, usuarioWhereInput>
    conta_recorrente?: Conta_recorrenteListRelationFilter
    transacao?: TransacaoListRelationFilter
  }, "id_carteira">

  export type carteiraOrderByWithAggregationInput = {
    id_carteira?: SortOrder
    id_usuario?: SortOrder
    saldo?: SortOrderInput | SortOrder
    _count?: carteiraCountOrderByAggregateInput
    _avg?: carteiraAvgOrderByAggregateInput
    _max?: carteiraMaxOrderByAggregateInput
    _min?: carteiraMinOrderByAggregateInput
    _sum?: carteiraSumOrderByAggregateInput
  }

  export type carteiraScalarWhereWithAggregatesInput = {
    AND?: carteiraScalarWhereWithAggregatesInput | carteiraScalarWhereWithAggregatesInput[]
    OR?: carteiraScalarWhereWithAggregatesInput[]
    NOT?: carteiraScalarWhereWithAggregatesInput | carteiraScalarWhereWithAggregatesInput[]
    id_carteira?: StringWithAggregatesFilter<"carteira"> | string
    id_usuario?: StringWithAggregatesFilter<"carteira"> | string
    saldo?: DecimalNullableWithAggregatesFilter<"carteira"> | Decimal | DecimalJsLike | number | string | null
  }

  export type conta_recorrenteWhereInput = {
    AND?: conta_recorrenteWhereInput | conta_recorrenteWhereInput[]
    OR?: conta_recorrenteWhereInput[]
    NOT?: conta_recorrenteWhereInput | conta_recorrenteWhereInput[]
    id_conta_recorrente?: IntFilter<"conta_recorrente"> | number
    id_carteira?: StringFilter<"conta_recorrente"> | string
    valor?: DecimalFilter<"conta_recorrente"> | Decimal | DecimalJsLike | number | string
    descricao?: StringNullableFilter<"conta_recorrente"> | string | null
    intervalo_dias?: IntFilter<"conta_recorrente"> | number
    data_inicio?: DateTimeFilter<"conta_recorrente"> | Date | string
    carteira?: XOR<CarteiraScalarRelationFilter, carteiraWhereInput>
  }

  export type conta_recorrenteOrderByWithRelationInput = {
    id_conta_recorrente?: SortOrder
    id_carteira?: SortOrder
    valor?: SortOrder
    descricao?: SortOrderInput | SortOrder
    intervalo_dias?: SortOrder
    data_inicio?: SortOrder
    carteira?: carteiraOrderByWithRelationInput
  }

  export type conta_recorrenteWhereUniqueInput = Prisma.AtLeast<{
    id_conta_recorrente?: number
    AND?: conta_recorrenteWhereInput | conta_recorrenteWhereInput[]
    OR?: conta_recorrenteWhereInput[]
    NOT?: conta_recorrenteWhereInput | conta_recorrenteWhereInput[]
    id_carteira?: StringFilter<"conta_recorrente"> | string
    valor?: DecimalFilter<"conta_recorrente"> | Decimal | DecimalJsLike | number | string
    descricao?: StringNullableFilter<"conta_recorrente"> | string | null
    intervalo_dias?: IntFilter<"conta_recorrente"> | number
    data_inicio?: DateTimeFilter<"conta_recorrente"> | Date | string
    carteira?: XOR<CarteiraScalarRelationFilter, carteiraWhereInput>
  }, "id_conta_recorrente">

  export type conta_recorrenteOrderByWithAggregationInput = {
    id_conta_recorrente?: SortOrder
    id_carteira?: SortOrder
    valor?: SortOrder
    descricao?: SortOrderInput | SortOrder
    intervalo_dias?: SortOrder
    data_inicio?: SortOrder
    _count?: conta_recorrenteCountOrderByAggregateInput
    _avg?: conta_recorrenteAvgOrderByAggregateInput
    _max?: conta_recorrenteMaxOrderByAggregateInput
    _min?: conta_recorrenteMinOrderByAggregateInput
    _sum?: conta_recorrenteSumOrderByAggregateInput
  }

  export type conta_recorrenteScalarWhereWithAggregatesInput = {
    AND?: conta_recorrenteScalarWhereWithAggregatesInput | conta_recorrenteScalarWhereWithAggregatesInput[]
    OR?: conta_recorrenteScalarWhereWithAggregatesInput[]
    NOT?: conta_recorrenteScalarWhereWithAggregatesInput | conta_recorrenteScalarWhereWithAggregatesInput[]
    id_conta_recorrente?: IntWithAggregatesFilter<"conta_recorrente"> | number
    id_carteira?: StringWithAggregatesFilter<"conta_recorrente"> | string
    valor?: DecimalWithAggregatesFilter<"conta_recorrente"> | Decimal | DecimalJsLike | number | string
    descricao?: StringNullableWithAggregatesFilter<"conta_recorrente"> | string | null
    intervalo_dias?: IntWithAggregatesFilter<"conta_recorrente"> | number
    data_inicio?: DateTimeWithAggregatesFilter<"conta_recorrente"> | Date | string
  }

  export type transacaoWhereInput = {
    AND?: transacaoWhereInput | transacaoWhereInput[]
    OR?: transacaoWhereInput[]
    NOT?: transacaoWhereInput | transacaoWhereInput[]
    id_transacao?: IntFilter<"transacao"> | number
    id_carteira?: StringFilter<"transacao"> | string
    valor?: DecimalFilter<"transacao"> | Decimal | DecimalJsLike | number | string
    tipo?: StringFilter<"transacao"> | string
    descricao?: StringNullableFilter<"transacao"> | string | null
    data?: DateTimeFilter<"transacao"> | Date | string
    carteira?: XOR<CarteiraScalarRelationFilter, carteiraWhereInput>
  }

  export type transacaoOrderByWithRelationInput = {
    id_transacao?: SortOrder
    id_carteira?: SortOrder
    valor?: SortOrder
    tipo?: SortOrder
    descricao?: SortOrderInput | SortOrder
    data?: SortOrder
    carteira?: carteiraOrderByWithRelationInput
  }

  export type transacaoWhereUniqueInput = Prisma.AtLeast<{
    id_transacao?: number
    AND?: transacaoWhereInput | transacaoWhereInput[]
    OR?: transacaoWhereInput[]
    NOT?: transacaoWhereInput | transacaoWhereInput[]
    id_carteira?: StringFilter<"transacao"> | string
    valor?: DecimalFilter<"transacao"> | Decimal | DecimalJsLike | number | string
    tipo?: StringFilter<"transacao"> | string
    descricao?: StringNullableFilter<"transacao"> | string | null
    data?: DateTimeFilter<"transacao"> | Date | string
    carteira?: XOR<CarteiraScalarRelationFilter, carteiraWhereInput>
  }, "id_transacao">

  export type transacaoOrderByWithAggregationInput = {
    id_transacao?: SortOrder
    id_carteira?: SortOrder
    valor?: SortOrder
    tipo?: SortOrder
    descricao?: SortOrderInput | SortOrder
    data?: SortOrder
    _count?: transacaoCountOrderByAggregateInput
    _avg?: transacaoAvgOrderByAggregateInput
    _max?: transacaoMaxOrderByAggregateInput
    _min?: transacaoMinOrderByAggregateInput
    _sum?: transacaoSumOrderByAggregateInput
  }

  export type transacaoScalarWhereWithAggregatesInput = {
    AND?: transacaoScalarWhereWithAggregatesInput | transacaoScalarWhereWithAggregatesInput[]
    OR?: transacaoScalarWhereWithAggregatesInput[]
    NOT?: transacaoScalarWhereWithAggregatesInput | transacaoScalarWhereWithAggregatesInput[]
    id_transacao?: IntWithAggregatesFilter<"transacao"> | number
    id_carteira?: StringWithAggregatesFilter<"transacao"> | string
    valor?: DecimalWithAggregatesFilter<"transacao"> | Decimal | DecimalJsLike | number | string
    tipo?: StringWithAggregatesFilter<"transacao"> | string
    descricao?: StringNullableWithAggregatesFilter<"transacao"> | string | null
    data?: DateTimeWithAggregatesFilter<"transacao"> | Date | string
  }

  export type usuarioWhereInput = {
    AND?: usuarioWhereInput | usuarioWhereInput[]
    OR?: usuarioWhereInput[]
    NOT?: usuarioWhereInput | usuarioWhereInput[]
    id_usuario?: StringFilter<"usuario"> | string
    nome?: StringFilter<"usuario"> | string
    email?: StringFilter<"usuario"> | string
    senha?: StringFilter<"usuario"> | string
    carteira?: CarteiraListRelationFilter
  }

  export type usuarioOrderByWithRelationInput = {
    id_usuario?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    carteira?: carteiraOrderByRelationAggregateInput
  }

  export type usuarioWhereUniqueInput = Prisma.AtLeast<{
    id_usuario?: string
    email?: string
    AND?: usuarioWhereInput | usuarioWhereInput[]
    OR?: usuarioWhereInput[]
    NOT?: usuarioWhereInput | usuarioWhereInput[]
    nome?: StringFilter<"usuario"> | string
    senha?: StringFilter<"usuario"> | string
    carteira?: CarteiraListRelationFilter
  }, "id_usuario" | "email">

  export type usuarioOrderByWithAggregationInput = {
    id_usuario?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
    _count?: usuarioCountOrderByAggregateInput
    _max?: usuarioMaxOrderByAggregateInput
    _min?: usuarioMinOrderByAggregateInput
  }

  export type usuarioScalarWhereWithAggregatesInput = {
    AND?: usuarioScalarWhereWithAggregatesInput | usuarioScalarWhereWithAggregatesInput[]
    OR?: usuarioScalarWhereWithAggregatesInput[]
    NOT?: usuarioScalarWhereWithAggregatesInput | usuarioScalarWhereWithAggregatesInput[]
    id_usuario?: StringWithAggregatesFilter<"usuario"> | string
    nome?: StringWithAggregatesFilter<"usuario"> | string
    email?: StringWithAggregatesFilter<"usuario"> | string
    senha?: StringWithAggregatesFilter<"usuario"> | string
  }

  export type carteiraCreateInput = {
    id_carteira: string
    saldo?: Decimal | DecimalJsLike | number | string | null
    usuario: usuarioCreateNestedOneWithoutCarteiraInput
    conta_recorrente?: conta_recorrenteCreateNestedManyWithoutCarteiraInput
    transacao?: transacaoCreateNestedManyWithoutCarteiraInput
  }

  export type carteiraUncheckedCreateInput = {
    id_carteira: string
    id_usuario: string
    saldo?: Decimal | DecimalJsLike | number | string | null
    conta_recorrente?: conta_recorrenteUncheckedCreateNestedManyWithoutCarteiraInput
    transacao?: transacaoUncheckedCreateNestedManyWithoutCarteiraInput
  }

  export type carteiraUpdateInput = {
    id_carteira?: StringFieldUpdateOperationsInput | string
    saldo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    usuario?: usuarioUpdateOneRequiredWithoutCarteiraNestedInput
    conta_recorrente?: conta_recorrenteUpdateManyWithoutCarteiraNestedInput
    transacao?: transacaoUpdateManyWithoutCarteiraNestedInput
  }

  export type carteiraUncheckedUpdateInput = {
    id_carteira?: StringFieldUpdateOperationsInput | string
    id_usuario?: StringFieldUpdateOperationsInput | string
    saldo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    conta_recorrente?: conta_recorrenteUncheckedUpdateManyWithoutCarteiraNestedInput
    transacao?: transacaoUncheckedUpdateManyWithoutCarteiraNestedInput
  }

  export type carteiraCreateManyInput = {
    id_carteira: string
    id_usuario: string
    saldo?: Decimal | DecimalJsLike | number | string | null
  }

  export type carteiraUpdateManyMutationInput = {
    id_carteira?: StringFieldUpdateOperationsInput | string
    saldo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type carteiraUncheckedUpdateManyInput = {
    id_carteira?: StringFieldUpdateOperationsInput | string
    id_usuario?: StringFieldUpdateOperationsInput | string
    saldo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
  }

  export type conta_recorrenteCreateInput = {
    valor: Decimal | DecimalJsLike | number | string
    descricao?: string | null
    intervalo_dias: number
    data_inicio: Date | string
    carteira: carteiraCreateNestedOneWithoutConta_recorrenteInput
  }

  export type conta_recorrenteUncheckedCreateInput = {
    id_conta_recorrente?: number
    id_carteira: string
    valor: Decimal | DecimalJsLike | number | string
    descricao?: string | null
    intervalo_dias: number
    data_inicio: Date | string
  }

  export type conta_recorrenteUpdateInput = {
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    intervalo_dias?: IntFieldUpdateOperationsInput | number
    data_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    carteira?: carteiraUpdateOneRequiredWithoutConta_recorrenteNestedInput
  }

  export type conta_recorrenteUncheckedUpdateInput = {
    id_conta_recorrente?: IntFieldUpdateOperationsInput | number
    id_carteira?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    intervalo_dias?: IntFieldUpdateOperationsInput | number
    data_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type conta_recorrenteCreateManyInput = {
    id_conta_recorrente?: number
    id_carteira: string
    valor: Decimal | DecimalJsLike | number | string
    descricao?: string | null
    intervalo_dias: number
    data_inicio: Date | string
  }

  export type conta_recorrenteUpdateManyMutationInput = {
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    intervalo_dias?: IntFieldUpdateOperationsInput | number
    data_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type conta_recorrenteUncheckedUpdateManyInput = {
    id_conta_recorrente?: IntFieldUpdateOperationsInput | number
    id_carteira?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    intervalo_dias?: IntFieldUpdateOperationsInput | number
    data_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type transacaoCreateInput = {
    valor: Decimal | DecimalJsLike | number | string
    tipo: string
    descricao?: string | null
    data?: Date | string
    carteira: carteiraCreateNestedOneWithoutTransacaoInput
  }

  export type transacaoUncheckedCreateInput = {
    id_transacao?: number
    id_carteira: string
    valor: Decimal | DecimalJsLike | number | string
    tipo: string
    descricao?: string | null
    data?: Date | string
  }

  export type transacaoUpdateInput = {
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tipo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
    carteira?: carteiraUpdateOneRequiredWithoutTransacaoNestedInput
  }

  export type transacaoUncheckedUpdateInput = {
    id_transacao?: IntFieldUpdateOperationsInput | number
    id_carteira?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tipo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type transacaoCreateManyInput = {
    id_transacao?: number
    id_carteira: string
    valor: Decimal | DecimalJsLike | number | string
    tipo: string
    descricao?: string | null
    data?: Date | string
  }

  export type transacaoUpdateManyMutationInput = {
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tipo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type transacaoUncheckedUpdateManyInput = {
    id_transacao?: IntFieldUpdateOperationsInput | number
    id_carteira?: StringFieldUpdateOperationsInput | string
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tipo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type usuarioCreateInput = {
    id_usuario: string
    nome: string
    email: string
    senha: string
    carteira?: carteiraCreateNestedManyWithoutUsuarioInput
  }

  export type usuarioUncheckedCreateInput = {
    id_usuario: string
    nome: string
    email: string
    senha: string
    carteira?: carteiraUncheckedCreateNestedManyWithoutUsuarioInput
  }

  export type usuarioUpdateInput = {
    id_usuario?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    carteira?: carteiraUpdateManyWithoutUsuarioNestedInput
  }

  export type usuarioUncheckedUpdateInput = {
    id_usuario?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
    carteira?: carteiraUncheckedUpdateManyWithoutUsuarioNestedInput
  }

  export type usuarioCreateManyInput = {
    id_usuario: string
    nome: string
    email: string
    senha: string
  }

  export type usuarioUpdateManyMutationInput = {
    id_usuario?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
  }

  export type usuarioUncheckedUpdateManyInput = {
    id_usuario?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
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

  export type UsuarioScalarRelationFilter = {
    is?: usuarioWhereInput
    isNot?: usuarioWhereInput
  }

  export type Conta_recorrenteListRelationFilter = {
    every?: conta_recorrenteWhereInput
    some?: conta_recorrenteWhereInput
    none?: conta_recorrenteWhereInput
  }

  export type TransacaoListRelationFilter = {
    every?: transacaoWhereInput
    some?: transacaoWhereInput
    none?: transacaoWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type conta_recorrenteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type transacaoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type carteiraCountOrderByAggregateInput = {
    id_carteira?: SortOrder
    id_usuario?: SortOrder
    saldo?: SortOrder
  }

  export type carteiraAvgOrderByAggregateInput = {
    saldo?: SortOrder
  }

  export type carteiraMaxOrderByAggregateInput = {
    id_carteira?: SortOrder
    id_usuario?: SortOrder
    saldo?: SortOrder
  }

  export type carteiraMinOrderByAggregateInput = {
    id_carteira?: SortOrder
    id_usuario?: SortOrder
    saldo?: SortOrder
  }

  export type carteiraSumOrderByAggregateInput = {
    saldo?: SortOrder
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

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
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

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CarteiraScalarRelationFilter = {
    is?: carteiraWhereInput
    isNot?: carteiraWhereInput
  }

  export type conta_recorrenteCountOrderByAggregateInput = {
    id_conta_recorrente?: SortOrder
    id_carteira?: SortOrder
    valor?: SortOrder
    descricao?: SortOrder
    intervalo_dias?: SortOrder
    data_inicio?: SortOrder
  }

  export type conta_recorrenteAvgOrderByAggregateInput = {
    id_conta_recorrente?: SortOrder
    valor?: SortOrder
    intervalo_dias?: SortOrder
  }

  export type conta_recorrenteMaxOrderByAggregateInput = {
    id_conta_recorrente?: SortOrder
    id_carteira?: SortOrder
    valor?: SortOrder
    descricao?: SortOrder
    intervalo_dias?: SortOrder
    data_inicio?: SortOrder
  }

  export type conta_recorrenteMinOrderByAggregateInput = {
    id_conta_recorrente?: SortOrder
    id_carteira?: SortOrder
    valor?: SortOrder
    descricao?: SortOrder
    intervalo_dias?: SortOrder
    data_inicio?: SortOrder
  }

  export type conta_recorrenteSumOrderByAggregateInput = {
    id_conta_recorrente?: SortOrder
    valor?: SortOrder
    intervalo_dias?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type transacaoCountOrderByAggregateInput = {
    id_transacao?: SortOrder
    id_carteira?: SortOrder
    valor?: SortOrder
    tipo?: SortOrder
    descricao?: SortOrder
    data?: SortOrder
  }

  export type transacaoAvgOrderByAggregateInput = {
    id_transacao?: SortOrder
    valor?: SortOrder
  }

  export type transacaoMaxOrderByAggregateInput = {
    id_transacao?: SortOrder
    id_carteira?: SortOrder
    valor?: SortOrder
    tipo?: SortOrder
    descricao?: SortOrder
    data?: SortOrder
  }

  export type transacaoMinOrderByAggregateInput = {
    id_transacao?: SortOrder
    id_carteira?: SortOrder
    valor?: SortOrder
    tipo?: SortOrder
    descricao?: SortOrder
    data?: SortOrder
  }

  export type transacaoSumOrderByAggregateInput = {
    id_transacao?: SortOrder
    valor?: SortOrder
  }

  export type CarteiraListRelationFilter = {
    every?: carteiraWhereInput
    some?: carteiraWhereInput
    none?: carteiraWhereInput
  }

  export type carteiraOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usuarioCountOrderByAggregateInput = {
    id_usuario?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
  }

  export type usuarioMaxOrderByAggregateInput = {
    id_usuario?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
  }

  export type usuarioMinOrderByAggregateInput = {
    id_usuario?: SortOrder
    nome?: SortOrder
    email?: SortOrder
    senha?: SortOrder
  }

  export type usuarioCreateNestedOneWithoutCarteiraInput = {
    create?: XOR<usuarioCreateWithoutCarteiraInput, usuarioUncheckedCreateWithoutCarteiraInput>
    connectOrCreate?: usuarioCreateOrConnectWithoutCarteiraInput
    connect?: usuarioWhereUniqueInput
  }

  export type conta_recorrenteCreateNestedManyWithoutCarteiraInput = {
    create?: XOR<conta_recorrenteCreateWithoutCarteiraInput, conta_recorrenteUncheckedCreateWithoutCarteiraInput> | conta_recorrenteCreateWithoutCarteiraInput[] | conta_recorrenteUncheckedCreateWithoutCarteiraInput[]
    connectOrCreate?: conta_recorrenteCreateOrConnectWithoutCarteiraInput | conta_recorrenteCreateOrConnectWithoutCarteiraInput[]
    createMany?: conta_recorrenteCreateManyCarteiraInputEnvelope
    connect?: conta_recorrenteWhereUniqueInput | conta_recorrenteWhereUniqueInput[]
  }

  export type transacaoCreateNestedManyWithoutCarteiraInput = {
    create?: XOR<transacaoCreateWithoutCarteiraInput, transacaoUncheckedCreateWithoutCarteiraInput> | transacaoCreateWithoutCarteiraInput[] | transacaoUncheckedCreateWithoutCarteiraInput[]
    connectOrCreate?: transacaoCreateOrConnectWithoutCarteiraInput | transacaoCreateOrConnectWithoutCarteiraInput[]
    createMany?: transacaoCreateManyCarteiraInputEnvelope
    connect?: transacaoWhereUniqueInput | transacaoWhereUniqueInput[]
  }

  export type conta_recorrenteUncheckedCreateNestedManyWithoutCarteiraInput = {
    create?: XOR<conta_recorrenteCreateWithoutCarteiraInput, conta_recorrenteUncheckedCreateWithoutCarteiraInput> | conta_recorrenteCreateWithoutCarteiraInput[] | conta_recorrenteUncheckedCreateWithoutCarteiraInput[]
    connectOrCreate?: conta_recorrenteCreateOrConnectWithoutCarteiraInput | conta_recorrenteCreateOrConnectWithoutCarteiraInput[]
    createMany?: conta_recorrenteCreateManyCarteiraInputEnvelope
    connect?: conta_recorrenteWhereUniqueInput | conta_recorrenteWhereUniqueInput[]
  }

  export type transacaoUncheckedCreateNestedManyWithoutCarteiraInput = {
    create?: XOR<transacaoCreateWithoutCarteiraInput, transacaoUncheckedCreateWithoutCarteiraInput> | transacaoCreateWithoutCarteiraInput[] | transacaoUncheckedCreateWithoutCarteiraInput[]
    connectOrCreate?: transacaoCreateOrConnectWithoutCarteiraInput | transacaoCreateOrConnectWithoutCarteiraInput[]
    createMany?: transacaoCreateManyCarteiraInputEnvelope
    connect?: transacaoWhereUniqueInput | transacaoWhereUniqueInput[]
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

  export type usuarioUpdateOneRequiredWithoutCarteiraNestedInput = {
    create?: XOR<usuarioCreateWithoutCarteiraInput, usuarioUncheckedCreateWithoutCarteiraInput>
    connectOrCreate?: usuarioCreateOrConnectWithoutCarteiraInput
    upsert?: usuarioUpsertWithoutCarteiraInput
    connect?: usuarioWhereUniqueInput
    update?: XOR<XOR<usuarioUpdateToOneWithWhereWithoutCarteiraInput, usuarioUpdateWithoutCarteiraInput>, usuarioUncheckedUpdateWithoutCarteiraInput>
  }

  export type conta_recorrenteUpdateManyWithoutCarteiraNestedInput = {
    create?: XOR<conta_recorrenteCreateWithoutCarteiraInput, conta_recorrenteUncheckedCreateWithoutCarteiraInput> | conta_recorrenteCreateWithoutCarteiraInput[] | conta_recorrenteUncheckedCreateWithoutCarteiraInput[]
    connectOrCreate?: conta_recorrenteCreateOrConnectWithoutCarteiraInput | conta_recorrenteCreateOrConnectWithoutCarteiraInput[]
    upsert?: conta_recorrenteUpsertWithWhereUniqueWithoutCarteiraInput | conta_recorrenteUpsertWithWhereUniqueWithoutCarteiraInput[]
    createMany?: conta_recorrenteCreateManyCarteiraInputEnvelope
    set?: conta_recorrenteWhereUniqueInput | conta_recorrenteWhereUniqueInput[]
    disconnect?: conta_recorrenteWhereUniqueInput | conta_recorrenteWhereUniqueInput[]
    delete?: conta_recorrenteWhereUniqueInput | conta_recorrenteWhereUniqueInput[]
    connect?: conta_recorrenteWhereUniqueInput | conta_recorrenteWhereUniqueInput[]
    update?: conta_recorrenteUpdateWithWhereUniqueWithoutCarteiraInput | conta_recorrenteUpdateWithWhereUniqueWithoutCarteiraInput[]
    updateMany?: conta_recorrenteUpdateManyWithWhereWithoutCarteiraInput | conta_recorrenteUpdateManyWithWhereWithoutCarteiraInput[]
    deleteMany?: conta_recorrenteScalarWhereInput | conta_recorrenteScalarWhereInput[]
  }

  export type transacaoUpdateManyWithoutCarteiraNestedInput = {
    create?: XOR<transacaoCreateWithoutCarteiraInput, transacaoUncheckedCreateWithoutCarteiraInput> | transacaoCreateWithoutCarteiraInput[] | transacaoUncheckedCreateWithoutCarteiraInput[]
    connectOrCreate?: transacaoCreateOrConnectWithoutCarteiraInput | transacaoCreateOrConnectWithoutCarteiraInput[]
    upsert?: transacaoUpsertWithWhereUniqueWithoutCarteiraInput | transacaoUpsertWithWhereUniqueWithoutCarteiraInput[]
    createMany?: transacaoCreateManyCarteiraInputEnvelope
    set?: transacaoWhereUniqueInput | transacaoWhereUniqueInput[]
    disconnect?: transacaoWhereUniqueInput | transacaoWhereUniqueInput[]
    delete?: transacaoWhereUniqueInput | transacaoWhereUniqueInput[]
    connect?: transacaoWhereUniqueInput | transacaoWhereUniqueInput[]
    update?: transacaoUpdateWithWhereUniqueWithoutCarteiraInput | transacaoUpdateWithWhereUniqueWithoutCarteiraInput[]
    updateMany?: transacaoUpdateManyWithWhereWithoutCarteiraInput | transacaoUpdateManyWithWhereWithoutCarteiraInput[]
    deleteMany?: transacaoScalarWhereInput | transacaoScalarWhereInput[]
  }

  export type conta_recorrenteUncheckedUpdateManyWithoutCarteiraNestedInput = {
    create?: XOR<conta_recorrenteCreateWithoutCarteiraInput, conta_recorrenteUncheckedCreateWithoutCarteiraInput> | conta_recorrenteCreateWithoutCarteiraInput[] | conta_recorrenteUncheckedCreateWithoutCarteiraInput[]
    connectOrCreate?: conta_recorrenteCreateOrConnectWithoutCarteiraInput | conta_recorrenteCreateOrConnectWithoutCarteiraInput[]
    upsert?: conta_recorrenteUpsertWithWhereUniqueWithoutCarteiraInput | conta_recorrenteUpsertWithWhereUniqueWithoutCarteiraInput[]
    createMany?: conta_recorrenteCreateManyCarteiraInputEnvelope
    set?: conta_recorrenteWhereUniqueInput | conta_recorrenteWhereUniqueInput[]
    disconnect?: conta_recorrenteWhereUniqueInput | conta_recorrenteWhereUniqueInput[]
    delete?: conta_recorrenteWhereUniqueInput | conta_recorrenteWhereUniqueInput[]
    connect?: conta_recorrenteWhereUniqueInput | conta_recorrenteWhereUniqueInput[]
    update?: conta_recorrenteUpdateWithWhereUniqueWithoutCarteiraInput | conta_recorrenteUpdateWithWhereUniqueWithoutCarteiraInput[]
    updateMany?: conta_recorrenteUpdateManyWithWhereWithoutCarteiraInput | conta_recorrenteUpdateManyWithWhereWithoutCarteiraInput[]
    deleteMany?: conta_recorrenteScalarWhereInput | conta_recorrenteScalarWhereInput[]
  }

  export type transacaoUncheckedUpdateManyWithoutCarteiraNestedInput = {
    create?: XOR<transacaoCreateWithoutCarteiraInput, transacaoUncheckedCreateWithoutCarteiraInput> | transacaoCreateWithoutCarteiraInput[] | transacaoUncheckedCreateWithoutCarteiraInput[]
    connectOrCreate?: transacaoCreateOrConnectWithoutCarteiraInput | transacaoCreateOrConnectWithoutCarteiraInput[]
    upsert?: transacaoUpsertWithWhereUniqueWithoutCarteiraInput | transacaoUpsertWithWhereUniqueWithoutCarteiraInput[]
    createMany?: transacaoCreateManyCarteiraInputEnvelope
    set?: transacaoWhereUniqueInput | transacaoWhereUniqueInput[]
    disconnect?: transacaoWhereUniqueInput | transacaoWhereUniqueInput[]
    delete?: transacaoWhereUniqueInput | transacaoWhereUniqueInput[]
    connect?: transacaoWhereUniqueInput | transacaoWhereUniqueInput[]
    update?: transacaoUpdateWithWhereUniqueWithoutCarteiraInput | transacaoUpdateWithWhereUniqueWithoutCarteiraInput[]
    updateMany?: transacaoUpdateManyWithWhereWithoutCarteiraInput | transacaoUpdateManyWithWhereWithoutCarteiraInput[]
    deleteMany?: transacaoScalarWhereInput | transacaoScalarWhereInput[]
  }

  export type carteiraCreateNestedOneWithoutConta_recorrenteInput = {
    create?: XOR<carteiraCreateWithoutConta_recorrenteInput, carteiraUncheckedCreateWithoutConta_recorrenteInput>
    connectOrCreate?: carteiraCreateOrConnectWithoutConta_recorrenteInput
    connect?: carteiraWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type carteiraUpdateOneRequiredWithoutConta_recorrenteNestedInput = {
    create?: XOR<carteiraCreateWithoutConta_recorrenteInput, carteiraUncheckedCreateWithoutConta_recorrenteInput>
    connectOrCreate?: carteiraCreateOrConnectWithoutConta_recorrenteInput
    upsert?: carteiraUpsertWithoutConta_recorrenteInput
    connect?: carteiraWhereUniqueInput
    update?: XOR<XOR<carteiraUpdateToOneWithWhereWithoutConta_recorrenteInput, carteiraUpdateWithoutConta_recorrenteInput>, carteiraUncheckedUpdateWithoutConta_recorrenteInput>
  }

  export type carteiraCreateNestedOneWithoutTransacaoInput = {
    create?: XOR<carteiraCreateWithoutTransacaoInput, carteiraUncheckedCreateWithoutTransacaoInput>
    connectOrCreate?: carteiraCreateOrConnectWithoutTransacaoInput
    connect?: carteiraWhereUniqueInput
  }

  export type carteiraUpdateOneRequiredWithoutTransacaoNestedInput = {
    create?: XOR<carteiraCreateWithoutTransacaoInput, carteiraUncheckedCreateWithoutTransacaoInput>
    connectOrCreate?: carteiraCreateOrConnectWithoutTransacaoInput
    upsert?: carteiraUpsertWithoutTransacaoInput
    connect?: carteiraWhereUniqueInput
    update?: XOR<XOR<carteiraUpdateToOneWithWhereWithoutTransacaoInput, carteiraUpdateWithoutTransacaoInput>, carteiraUncheckedUpdateWithoutTransacaoInput>
  }

  export type carteiraCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<carteiraCreateWithoutUsuarioInput, carteiraUncheckedCreateWithoutUsuarioInput> | carteiraCreateWithoutUsuarioInput[] | carteiraUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: carteiraCreateOrConnectWithoutUsuarioInput | carteiraCreateOrConnectWithoutUsuarioInput[]
    createMany?: carteiraCreateManyUsuarioInputEnvelope
    connect?: carteiraWhereUniqueInput | carteiraWhereUniqueInput[]
  }

  export type carteiraUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<carteiraCreateWithoutUsuarioInput, carteiraUncheckedCreateWithoutUsuarioInput> | carteiraCreateWithoutUsuarioInput[] | carteiraUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: carteiraCreateOrConnectWithoutUsuarioInput | carteiraCreateOrConnectWithoutUsuarioInput[]
    createMany?: carteiraCreateManyUsuarioInputEnvelope
    connect?: carteiraWhereUniqueInput | carteiraWhereUniqueInput[]
  }

  export type carteiraUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<carteiraCreateWithoutUsuarioInput, carteiraUncheckedCreateWithoutUsuarioInput> | carteiraCreateWithoutUsuarioInput[] | carteiraUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: carteiraCreateOrConnectWithoutUsuarioInput | carteiraCreateOrConnectWithoutUsuarioInput[]
    upsert?: carteiraUpsertWithWhereUniqueWithoutUsuarioInput | carteiraUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: carteiraCreateManyUsuarioInputEnvelope
    set?: carteiraWhereUniqueInput | carteiraWhereUniqueInput[]
    disconnect?: carteiraWhereUniqueInput | carteiraWhereUniqueInput[]
    delete?: carteiraWhereUniqueInput | carteiraWhereUniqueInput[]
    connect?: carteiraWhereUniqueInput | carteiraWhereUniqueInput[]
    update?: carteiraUpdateWithWhereUniqueWithoutUsuarioInput | carteiraUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: carteiraUpdateManyWithWhereWithoutUsuarioInput | carteiraUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: carteiraScalarWhereInput | carteiraScalarWhereInput[]
  }

  export type carteiraUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<carteiraCreateWithoutUsuarioInput, carteiraUncheckedCreateWithoutUsuarioInput> | carteiraCreateWithoutUsuarioInput[] | carteiraUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: carteiraCreateOrConnectWithoutUsuarioInput | carteiraCreateOrConnectWithoutUsuarioInput[]
    upsert?: carteiraUpsertWithWhereUniqueWithoutUsuarioInput | carteiraUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: carteiraCreateManyUsuarioInputEnvelope
    set?: carteiraWhereUniqueInput | carteiraWhereUniqueInput[]
    disconnect?: carteiraWhereUniqueInput | carteiraWhereUniqueInput[]
    delete?: carteiraWhereUniqueInput | carteiraWhereUniqueInput[]
    connect?: carteiraWhereUniqueInput | carteiraWhereUniqueInput[]
    update?: carteiraUpdateWithWhereUniqueWithoutUsuarioInput | carteiraUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: carteiraUpdateManyWithWhereWithoutUsuarioInput | carteiraUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: carteiraScalarWhereInput | carteiraScalarWhereInput[]
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

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
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

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
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

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type usuarioCreateWithoutCarteiraInput = {
    id_usuario: string
    nome: string
    email: string
    senha: string
  }

  export type usuarioUncheckedCreateWithoutCarteiraInput = {
    id_usuario: string
    nome: string
    email: string
    senha: string
  }

  export type usuarioCreateOrConnectWithoutCarteiraInput = {
    where: usuarioWhereUniqueInput
    create: XOR<usuarioCreateWithoutCarteiraInput, usuarioUncheckedCreateWithoutCarteiraInput>
  }

  export type conta_recorrenteCreateWithoutCarteiraInput = {
    valor: Decimal | DecimalJsLike | number | string
    descricao?: string | null
    intervalo_dias: number
    data_inicio: Date | string
  }

  export type conta_recorrenteUncheckedCreateWithoutCarteiraInput = {
    id_conta_recorrente?: number
    valor: Decimal | DecimalJsLike | number | string
    descricao?: string | null
    intervalo_dias: number
    data_inicio: Date | string
  }

  export type conta_recorrenteCreateOrConnectWithoutCarteiraInput = {
    where: conta_recorrenteWhereUniqueInput
    create: XOR<conta_recorrenteCreateWithoutCarteiraInput, conta_recorrenteUncheckedCreateWithoutCarteiraInput>
  }

  export type conta_recorrenteCreateManyCarteiraInputEnvelope = {
    data: conta_recorrenteCreateManyCarteiraInput | conta_recorrenteCreateManyCarteiraInput[]
    skipDuplicates?: boolean
  }

  export type transacaoCreateWithoutCarteiraInput = {
    valor: Decimal | DecimalJsLike | number | string
    tipo: string
    descricao?: string | null
    data?: Date | string
  }

  export type transacaoUncheckedCreateWithoutCarteiraInput = {
    id_transacao?: number
    valor: Decimal | DecimalJsLike | number | string
    tipo: string
    descricao?: string | null
    data?: Date | string
  }

  export type transacaoCreateOrConnectWithoutCarteiraInput = {
    where: transacaoWhereUniqueInput
    create: XOR<transacaoCreateWithoutCarteiraInput, transacaoUncheckedCreateWithoutCarteiraInput>
  }

  export type transacaoCreateManyCarteiraInputEnvelope = {
    data: transacaoCreateManyCarteiraInput | transacaoCreateManyCarteiraInput[]
    skipDuplicates?: boolean
  }

  export type usuarioUpsertWithoutCarteiraInput = {
    update: XOR<usuarioUpdateWithoutCarteiraInput, usuarioUncheckedUpdateWithoutCarteiraInput>
    create: XOR<usuarioCreateWithoutCarteiraInput, usuarioUncheckedCreateWithoutCarteiraInput>
    where?: usuarioWhereInput
  }

  export type usuarioUpdateToOneWithWhereWithoutCarteiraInput = {
    where?: usuarioWhereInput
    data: XOR<usuarioUpdateWithoutCarteiraInput, usuarioUncheckedUpdateWithoutCarteiraInput>
  }

  export type usuarioUpdateWithoutCarteiraInput = {
    id_usuario?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
  }

  export type usuarioUncheckedUpdateWithoutCarteiraInput = {
    id_usuario?: StringFieldUpdateOperationsInput | string
    nome?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    senha?: StringFieldUpdateOperationsInput | string
  }

  export type conta_recorrenteUpsertWithWhereUniqueWithoutCarteiraInput = {
    where: conta_recorrenteWhereUniqueInput
    update: XOR<conta_recorrenteUpdateWithoutCarteiraInput, conta_recorrenteUncheckedUpdateWithoutCarteiraInput>
    create: XOR<conta_recorrenteCreateWithoutCarteiraInput, conta_recorrenteUncheckedCreateWithoutCarteiraInput>
  }

  export type conta_recorrenteUpdateWithWhereUniqueWithoutCarteiraInput = {
    where: conta_recorrenteWhereUniqueInput
    data: XOR<conta_recorrenteUpdateWithoutCarteiraInput, conta_recorrenteUncheckedUpdateWithoutCarteiraInput>
  }

  export type conta_recorrenteUpdateManyWithWhereWithoutCarteiraInput = {
    where: conta_recorrenteScalarWhereInput
    data: XOR<conta_recorrenteUpdateManyMutationInput, conta_recorrenteUncheckedUpdateManyWithoutCarteiraInput>
  }

  export type conta_recorrenteScalarWhereInput = {
    AND?: conta_recorrenteScalarWhereInput | conta_recorrenteScalarWhereInput[]
    OR?: conta_recorrenteScalarWhereInput[]
    NOT?: conta_recorrenteScalarWhereInput | conta_recorrenteScalarWhereInput[]
    id_conta_recorrente?: IntFilter<"conta_recorrente"> | number
    id_carteira?: StringFilter<"conta_recorrente"> | string
    valor?: DecimalFilter<"conta_recorrente"> | Decimal | DecimalJsLike | number | string
    descricao?: StringNullableFilter<"conta_recorrente"> | string | null
    intervalo_dias?: IntFilter<"conta_recorrente"> | number
    data_inicio?: DateTimeFilter<"conta_recorrente"> | Date | string
  }

  export type transacaoUpsertWithWhereUniqueWithoutCarteiraInput = {
    where: transacaoWhereUniqueInput
    update: XOR<transacaoUpdateWithoutCarteiraInput, transacaoUncheckedUpdateWithoutCarteiraInput>
    create: XOR<transacaoCreateWithoutCarteiraInput, transacaoUncheckedCreateWithoutCarteiraInput>
  }

  export type transacaoUpdateWithWhereUniqueWithoutCarteiraInput = {
    where: transacaoWhereUniqueInput
    data: XOR<transacaoUpdateWithoutCarteiraInput, transacaoUncheckedUpdateWithoutCarteiraInput>
  }

  export type transacaoUpdateManyWithWhereWithoutCarteiraInput = {
    where: transacaoScalarWhereInput
    data: XOR<transacaoUpdateManyMutationInput, transacaoUncheckedUpdateManyWithoutCarteiraInput>
  }

  export type transacaoScalarWhereInput = {
    AND?: transacaoScalarWhereInput | transacaoScalarWhereInput[]
    OR?: transacaoScalarWhereInput[]
    NOT?: transacaoScalarWhereInput | transacaoScalarWhereInput[]
    id_transacao?: IntFilter<"transacao"> | number
    id_carteira?: StringFilter<"transacao"> | string
    valor?: DecimalFilter<"transacao"> | Decimal | DecimalJsLike | number | string
    tipo?: StringFilter<"transacao"> | string
    descricao?: StringNullableFilter<"transacao"> | string | null
    data?: DateTimeFilter<"transacao"> | Date | string
  }

  export type carteiraCreateWithoutConta_recorrenteInput = {
    id_carteira: string
    saldo?: Decimal | DecimalJsLike | number | string | null
    usuario: usuarioCreateNestedOneWithoutCarteiraInput
    transacao?: transacaoCreateNestedManyWithoutCarteiraInput
  }

  export type carteiraUncheckedCreateWithoutConta_recorrenteInput = {
    id_carteira: string
    id_usuario: string
    saldo?: Decimal | DecimalJsLike | number | string | null
    transacao?: transacaoUncheckedCreateNestedManyWithoutCarteiraInput
  }

  export type carteiraCreateOrConnectWithoutConta_recorrenteInput = {
    where: carteiraWhereUniqueInput
    create: XOR<carteiraCreateWithoutConta_recorrenteInput, carteiraUncheckedCreateWithoutConta_recorrenteInput>
  }

  export type carteiraUpsertWithoutConta_recorrenteInput = {
    update: XOR<carteiraUpdateWithoutConta_recorrenteInput, carteiraUncheckedUpdateWithoutConta_recorrenteInput>
    create: XOR<carteiraCreateWithoutConta_recorrenteInput, carteiraUncheckedCreateWithoutConta_recorrenteInput>
    where?: carteiraWhereInput
  }

  export type carteiraUpdateToOneWithWhereWithoutConta_recorrenteInput = {
    where?: carteiraWhereInput
    data: XOR<carteiraUpdateWithoutConta_recorrenteInput, carteiraUncheckedUpdateWithoutConta_recorrenteInput>
  }

  export type carteiraUpdateWithoutConta_recorrenteInput = {
    id_carteira?: StringFieldUpdateOperationsInput | string
    saldo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    usuario?: usuarioUpdateOneRequiredWithoutCarteiraNestedInput
    transacao?: transacaoUpdateManyWithoutCarteiraNestedInput
  }

  export type carteiraUncheckedUpdateWithoutConta_recorrenteInput = {
    id_carteira?: StringFieldUpdateOperationsInput | string
    id_usuario?: StringFieldUpdateOperationsInput | string
    saldo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    transacao?: transacaoUncheckedUpdateManyWithoutCarteiraNestedInput
  }

  export type carteiraCreateWithoutTransacaoInput = {
    id_carteira: string
    saldo?: Decimal | DecimalJsLike | number | string | null
    usuario: usuarioCreateNestedOneWithoutCarteiraInput
    conta_recorrente?: conta_recorrenteCreateNestedManyWithoutCarteiraInput
  }

  export type carteiraUncheckedCreateWithoutTransacaoInput = {
    id_carteira: string
    id_usuario: string
    saldo?: Decimal | DecimalJsLike | number | string | null
    conta_recorrente?: conta_recorrenteUncheckedCreateNestedManyWithoutCarteiraInput
  }

  export type carteiraCreateOrConnectWithoutTransacaoInput = {
    where: carteiraWhereUniqueInput
    create: XOR<carteiraCreateWithoutTransacaoInput, carteiraUncheckedCreateWithoutTransacaoInput>
  }

  export type carteiraUpsertWithoutTransacaoInput = {
    update: XOR<carteiraUpdateWithoutTransacaoInput, carteiraUncheckedUpdateWithoutTransacaoInput>
    create: XOR<carteiraCreateWithoutTransacaoInput, carteiraUncheckedCreateWithoutTransacaoInput>
    where?: carteiraWhereInput
  }

  export type carteiraUpdateToOneWithWhereWithoutTransacaoInput = {
    where?: carteiraWhereInput
    data: XOR<carteiraUpdateWithoutTransacaoInput, carteiraUncheckedUpdateWithoutTransacaoInput>
  }

  export type carteiraUpdateWithoutTransacaoInput = {
    id_carteira?: StringFieldUpdateOperationsInput | string
    saldo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    usuario?: usuarioUpdateOneRequiredWithoutCarteiraNestedInput
    conta_recorrente?: conta_recorrenteUpdateManyWithoutCarteiraNestedInput
  }

  export type carteiraUncheckedUpdateWithoutTransacaoInput = {
    id_carteira?: StringFieldUpdateOperationsInput | string
    id_usuario?: StringFieldUpdateOperationsInput | string
    saldo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    conta_recorrente?: conta_recorrenteUncheckedUpdateManyWithoutCarteiraNestedInput
  }

  export type carteiraCreateWithoutUsuarioInput = {
    id_carteira: string
    saldo?: Decimal | DecimalJsLike | number | string | null
    conta_recorrente?: conta_recorrenteCreateNestedManyWithoutCarteiraInput
    transacao?: transacaoCreateNestedManyWithoutCarteiraInput
  }

  export type carteiraUncheckedCreateWithoutUsuarioInput = {
    id_carteira: string
    saldo?: Decimal | DecimalJsLike | number | string | null
    conta_recorrente?: conta_recorrenteUncheckedCreateNestedManyWithoutCarteiraInput
    transacao?: transacaoUncheckedCreateNestedManyWithoutCarteiraInput
  }

  export type carteiraCreateOrConnectWithoutUsuarioInput = {
    where: carteiraWhereUniqueInput
    create: XOR<carteiraCreateWithoutUsuarioInput, carteiraUncheckedCreateWithoutUsuarioInput>
  }

  export type carteiraCreateManyUsuarioInputEnvelope = {
    data: carteiraCreateManyUsuarioInput | carteiraCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type carteiraUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: carteiraWhereUniqueInput
    update: XOR<carteiraUpdateWithoutUsuarioInput, carteiraUncheckedUpdateWithoutUsuarioInput>
    create: XOR<carteiraCreateWithoutUsuarioInput, carteiraUncheckedCreateWithoutUsuarioInput>
  }

  export type carteiraUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: carteiraWhereUniqueInput
    data: XOR<carteiraUpdateWithoutUsuarioInput, carteiraUncheckedUpdateWithoutUsuarioInput>
  }

  export type carteiraUpdateManyWithWhereWithoutUsuarioInput = {
    where: carteiraScalarWhereInput
    data: XOR<carteiraUpdateManyMutationInput, carteiraUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type carteiraScalarWhereInput = {
    AND?: carteiraScalarWhereInput | carteiraScalarWhereInput[]
    OR?: carteiraScalarWhereInput[]
    NOT?: carteiraScalarWhereInput | carteiraScalarWhereInput[]
    id_carteira?: StringFilter<"carteira"> | string
    id_usuario?: StringFilter<"carteira"> | string
    saldo?: DecimalNullableFilter<"carteira"> | Decimal | DecimalJsLike | number | string | null
  }

  export type conta_recorrenteCreateManyCarteiraInput = {
    id_conta_recorrente?: number
    valor: Decimal | DecimalJsLike | number | string
    descricao?: string | null
    intervalo_dias: number
    data_inicio: Date | string
  }

  export type transacaoCreateManyCarteiraInput = {
    id_transacao?: number
    valor: Decimal | DecimalJsLike | number | string
    tipo: string
    descricao?: string | null
    data?: Date | string
  }

  export type conta_recorrenteUpdateWithoutCarteiraInput = {
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    intervalo_dias?: IntFieldUpdateOperationsInput | number
    data_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type conta_recorrenteUncheckedUpdateWithoutCarteiraInput = {
    id_conta_recorrente?: IntFieldUpdateOperationsInput | number
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    intervalo_dias?: IntFieldUpdateOperationsInput | number
    data_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type conta_recorrenteUncheckedUpdateManyWithoutCarteiraInput = {
    id_conta_recorrente?: IntFieldUpdateOperationsInput | number
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    intervalo_dias?: IntFieldUpdateOperationsInput | number
    data_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type transacaoUpdateWithoutCarteiraInput = {
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tipo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type transacaoUncheckedUpdateWithoutCarteiraInput = {
    id_transacao?: IntFieldUpdateOperationsInput | number
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tipo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type transacaoUncheckedUpdateManyWithoutCarteiraInput = {
    id_transacao?: IntFieldUpdateOperationsInput | number
    valor?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    tipo?: StringFieldUpdateOperationsInput | string
    descricao?: NullableStringFieldUpdateOperationsInput | string | null
    data?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type carteiraCreateManyUsuarioInput = {
    id_carteira: string
    saldo?: Decimal | DecimalJsLike | number | string | null
  }

  export type carteiraUpdateWithoutUsuarioInput = {
    id_carteira?: StringFieldUpdateOperationsInput | string
    saldo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    conta_recorrente?: conta_recorrenteUpdateManyWithoutCarteiraNestedInput
    transacao?: transacaoUpdateManyWithoutCarteiraNestedInput
  }

  export type carteiraUncheckedUpdateWithoutUsuarioInput = {
    id_carteira?: StringFieldUpdateOperationsInput | string
    saldo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    conta_recorrente?: conta_recorrenteUncheckedUpdateManyWithoutCarteiraNestedInput
    transacao?: transacaoUncheckedUpdateManyWithoutCarteiraNestedInput
  }

  export type carteiraUncheckedUpdateManyWithoutUsuarioInput = {
    id_carteira?: StringFieldUpdateOperationsInput | string
    saldo?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
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