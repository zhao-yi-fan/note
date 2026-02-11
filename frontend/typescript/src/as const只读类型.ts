// 对于数组和对象，可以使用 as const 来将其转换为只读类型
/* 
const a: (string | number | {
  gender: string;
})[] 
 */
const a = ["jack", 123, { gender: "male" }];

/* 
const b: readonly ["jack", 123, {
    readonly gender: "male";
}]
 */
const b = ["jack", 123, { gender: "male" }] as const;
