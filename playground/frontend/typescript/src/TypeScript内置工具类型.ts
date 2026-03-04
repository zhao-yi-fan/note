/**
 * TypeScript 内置工具类型（Utility Types）完整指南
 * 官方文档：https://www.typescriptlang.org/docs/handbook/utility-types.html
 */

// ==================== 1. Partial<T> ====================
// 将类型 T 的所有属性变为可选
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// 使用 Partial 后，所有属性都变成可选的
type PartialUser = Partial<User>;
// 等价于：
// {
//   id?: number;
//   name?: string;
//   email?: string;
//   age?: number;
// }

const updateUser = (user: User, updates: Partial<User>): User => {
  return { ...user, ...updates };
};

// ==================== 2. Required<T> ====================
// 将类型 T 的所有属性变为必选（与 Partial 相反）
interface OptionalUser {
  id?: number;
  name?: string;
  email?: string;
}

type RequiredUser = Required<OptionalUser>;
// 等价于：
// {
//   id: number;
//   name: string;
//   email: string;
// }

// ==================== 3. Readonly<T> ====================
// 将类型 T 的所有属性变为只读
type ReadonlyUser = Readonly<User>;
// 等价于：
// {
//   readonly id: number;
//   readonly name: string;
//   readonly email: string;
//   readonly age: number;
// }

const user: ReadonlyUser = {
  id: 1,
  name: "张三",
  email: "zhangsan@example.com",
  age: 25,
};
// user.name = "李四"; // ❌ 错误：无法分配到 "name" ，因为它是只读属性

// ==================== 4. Pick<T, K> ====================
// 从类型 T 中选取指定的属性 K，构造新类型
type UserPreview = Pick<User, "id" | "name">;
// 等价于：
// {
//   id: number;
//   name: string;
// }

const preview: UserPreview = {
  id: 1,
  name: "张三",
};

// ==================== 5. Omit<T, K> ====================
// 从类型 T 中排除指定的属性 K，构造新类型（与 Pick 相反）
type UserWithoutEmail = Omit<User, "email">;
// 等价于：
// {
//   id: number;
//   name: string;
//   age: number;
// }

type UserBasic = Omit<User, "email" | "age">;
// 等价于：
// {
//   id: number;
//   name: string;
// }

// ==================== 6. Record<K, T> ====================
// 构造一个对象类型，键为 K，值为 T
type Role = "admin" | "user" | "guest";
type RolePermissions = Record<Role, string[]>;
// 等价于：
// {
//   admin: string[];
//   user: string[];
//   guest: string[];
// }

const permissions: RolePermissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"],
  guest: ["read"],
};

// 常用场景：创建映射对象
type UserMap = Record<number, User>;
const userMap: UserMap = {
  1: { id: 1, name: "张三", email: "zhangsan@example.com", age: 25 },
  2: { id: 2, name: "李四", email: "lisi@example.com", age: 30 },
};

// ==================== 7. Exclude<T, U> ====================
// 从联合类型 T 中排除可以赋值给 U 的类型
type T1 = "a" | "b" | "c";
type T2 = Exclude<T1, "a">;
// T2 = "b" | "c"

type T3 = Exclude<string | number | boolean, boolean>;
// T3 = string | number

type T4 = Exclude<string | number | (() => void), Function>;
// T4 = string | number

// ==================== 8. Extract<T, U> ====================
// 从联合类型 T 中提取可以赋值给 U 的类型（与 Exclude 相反）
type T5 = Extract<"a" | "b" | "c", "a" | "f">;
// T5 = "a"

type T6 = Extract<string | number | boolean, boolean>;
// T6 = boolean

type T7 = Extract<string | number | (() => void), Function>;
// T7 = () => void

// ==================== 9. NonNullable<T> ====================
// 从类型 T 中排除 null 和 undefined
type T8 = string | number | null | undefined;
type T9 = NonNullable<T8>;
// T9 = string | number

type T10 = NonNullable<string | null | undefined>;
// T10 = string

// ==================== 10. ReturnType<T> ====================
// 获取函数类型 T 的返回值类型
function getUser() {
  return { id: 1, name: "张三", email: "zhangsan@example.com" };
}

type GetUserReturnType = ReturnType<typeof getUser>;
// 等价于：
// {
//   id: number;
//   name: string;
//   email: string;
// }

type T11 = ReturnType<() => string>;
// T11 = string

type T12 = ReturnType<(s: string) => void>;
// T12 = void

// ==================== 11. Parameters<T> ====================
// 获取函数类型 T 的参数类型，以元组形式返回
function createUser(name: string, age: number, email: string) {
  return { name, age, email };
}

type CreateUserParams = Parameters<typeof createUser>;
// CreateUserParams = [name: string, age: number, email: string]

type T13 = Parameters<(a: string, b: number) => void>;
// T13 = [a: string, b: number]

// ==================== 12. ConstructorParameters<T> ====================
// 获取构造函数类型 T 的参数类型
class Person {
  constructor(public name: string, public age: number) {}
}

type PersonConstructorParams = ConstructorParameters<typeof Person>;
// PersonConstructorParams = [name: string, age: number]

// ==================== 13. InstanceType<T> ====================
// 获取构造函数类型 T 的实例类型
type PersonInstance = InstanceType<typeof Person>;
// PersonInstance = Person

class Animal {
  constructor(public name: string) {}
}

type AnimalInstance = InstanceType<typeof Animal>;
// AnimalInstance = Animal

// ==================== 14. ThisParameterType<T> ====================
// 提取函数类型的 this 参数类型，如果没有则返回 unknown
function toHex(this: Number) {
  return this.toString(16);
}

type T14 = ThisParameterType<typeof toHex>;
// T14 = Number

// ==================== 15. OmitThisParameter<T> ====================
// 移除函数类型的 this 参数
type T15 = OmitThisParameter<typeof toHex>;
// T15 = () => string

// ==================== 16. ThisType<T> ====================
// 用于指定对象字面量中 this 的类型（不返回转换后的类型）
interface ObjectDescriptor<D, M> {
  data?: D;
  methods?: M & ThisType<D & M>;
}

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

const obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // this 的类型是 { x: number, y: number }
      this.y += dy;
    },
  },
});

// ==================== 17. Uppercase<S> ====================
// 将字符串字面量类型转换为大写
type T16 = Uppercase<"hello">;
// T16 = "HELLO"

type T17 = Uppercase<"world" | "typescript">;
// T17 = "WORLD" | "TYPESCRIPT"

// ==================== 18. Lowercase<S> ====================
// 将字符串字面量类型转换为小写
type T18 = Lowercase<"HELLO">;
// T18 = "hello"

type T19 = Lowercase<"WORLD" | "TYPESCRIPT">;
// T19 = "world" | "typescript"

// ==================== 19. Capitalize<S> ====================
// 将字符串字面量类型的首字母转换为大写
type T20 = Capitalize<"hello">;
// T20 = "Hello"

type T21 = Capitalize<"world" | "typescript">;
// T21 = "World" | "Typescript"

// ==================== 20. Uncapitalize<S> ====================
// 将字符串字面量类型的首字母转换为小写
type T22 = Uncapitalize<"Hello">;
// T22 = "hello"

type T23 = Uncapitalize<"World" | "TypeScript">;
// T23 = "world" | "typeScript"

// ==================== 实际应用场景 ====================

// 场景1：API 响应类型处理
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

type UserResponse = ApiResponse<User>;
type UserListResponse = ApiResponse<User[]>;

// 场景2：表单数据处理
interface FormData {
  username: string;
  password: string;
  email: string;
  age: number;
}

// 创建表单时，所有字段都是可选的
type CreateFormData = Partial<FormData>;

// 更新表单时，排除某些不可修改的字段
type UpdateFormData = Omit<FormData, "username">;

// 场景3：状态管理
interface State {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

// 只读状态
type ReadonlyState = Readonly<State>;

// 部分更新状态
type StateUpdate = Partial<State>;

// 场景4：配置对象
type Environment = "development" | "staging" | "production";
type Config = Record<Environment, { apiUrl: string; debug: boolean }>;

const config: Config = {
  development: { apiUrl: "http://localhost:3000", debug: true },
  staging: { apiUrl: "https://staging.example.com", debug: true },
  production: { apiUrl: "https://api.example.com", debug: false },
};

// 场景5：函数工具类型组合
type AsyncFunction = (...args: any[]) => Promise<any>;

// 提取异步函数的返回值类型（去除 Promise 包装）
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

async function fetchUser(): Promise<User> {
  return { id: 1, name: "张三", email: "zhangsan@example.com", age: 25 };
}

type FetchUserResult = UnwrapPromise<ReturnType<typeof fetchUser>>;
// FetchUserResult = User

// 场景6：深度只读（自定义工具类型）
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

interface NestedObject {
  level1: {
    level2: {
      value: string;
    };
  };
}

type DeepReadonlyNested = DeepReadonly<NestedObject>;
// 所有嵌套属性都变成只读

// 场景7：深度部分可选（自定义工具类型）
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type DeepPartialNested = DeepPartial<NestedObject>;
// 所有嵌套属性都变成可选

// 场景8：类型守卫结合工具类型
function isUser(obj: any): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.email === "string" &&
    typeof obj.age === "number"
  );
}

// 场景9：条件类型与工具类型结合
type NonFunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

interface MixedInterface {
  name: string;
  age: number;
  greet: () => void;
  calculate: (x: number) => number;
}

type DataKeys = NonFunctionKeys<MixedInterface>;
// DataKeys = "name" | "age"

type MethodKeys = FunctionKeys<MixedInterface>;
// MethodKeys = "greet" | "calculate"

// ==================== 常用组合技巧 ====================

// 1. 只读 + 部分可选
type ReadonlyPartial<T> = Readonly<Partial<T>>;

// 2. 必选 + 只读
type RequiredReadonly<T> = Readonly<Required<T>>;

// 3. 选取部分字段并设为只读
type PickReadonly<T, K extends keyof T> = Readonly<Pick<T, K>>;

// 4. 排除部分字段并设为可选
type OmitPartial<T, K extends keyof T> = Partial<Omit<T, K>>;

// 5. 创建可空类型
type Nullable<T> = T | null;
type Maybe<T> = T | null | undefined;

// 6. 创建数组类型
type ArrayType<T> = T[];
type ReadonlyArrayType<T> = ReadonlyArray<T>;

// ==================== 导出类型 ====================
export type {
  User,
  PartialUser,
  RequiredUser,
  ReadonlyUser,
  UserPreview,
  UserWithoutEmail,
  RolePermissions,
  DeepReadonly,
  DeepPartial,
  UnwrapPromise,
  Nullable,
  Maybe,
};
