const user = {
    username: 'zyf',
};
// function getUser(user: User): User | undefined {
//   const userList: User[] = [
//     {
//       username: 'zyf',
//     },
//   ]
//   const info = userList.find((item) => item.username === user.username)
//   return info
// }
const getInstance = () => {
    const list = [];
    const add = (item) => {
        list.push(item);
    };
    const get = () => {
        return list;
    };
    const del = (index) => {
        list.splice(index, 1);
    };
    return {
        add,
        get,
        del,
    };
};
const { add, get, del } = getInstance();
add({ username: '111' });
add({ username: '222' });
add({ username: 'aaa' });
console.log(get());
del(1);
console.log(get());
class Person {
    constructor(name) {
        this.name = name;
    }
}
console.log(new Person('张三'));
