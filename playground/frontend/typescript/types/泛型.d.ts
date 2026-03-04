interface User {
    username: String;
    password?: String;
}
declare const user: User;
declare const getInstance: <T>() => {
    add: (item: T) => void;
    get: () => T[];
    del: (index: number) => void;
};
declare const add: (item: User) => void, get: () => User[], del: (index: number) => void;
declare class Person {
    name: string;
    constructor(name: string);
}
