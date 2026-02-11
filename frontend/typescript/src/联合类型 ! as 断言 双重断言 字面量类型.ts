//1）联合类型
//默认你可以认为是并集
let str: string | number; //当没有初始化的时候只能调用两者类型中的共同方法
// str.tostring
// str.valueof
str = 1; //会根据赋值来推导后续的方法
str.toFixed();
str = "abc";
str.toLowerCase();

// 类型断言
let ele: HTMLElement | null = document.getElementById("#app");
// ele!.style.color='red'；//非空断言表示一定有值ts语法
ele?.style?.color; // ele && ele.style && ele.style.color

// 可以做断言操作也能解决这个问题
(<HTMLElement>ele).style.color = "red"; //这个和jsx语法有冲突尽量不采用

(ele as HTMLElement).style.color = "red"; //断言不能断言不存在的属性

// 双重断言（不建议使用会破坏原有类型）
ele as any as boolean;

// 字面量类型
type Direction = "up" | "down" | "left" | "right"; //类型别名
let direction: Direction;
direction = "up";

export {};
