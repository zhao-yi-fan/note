interface User {
  username: String;
  password?: String
}

const user: User = {
  username: 'zyf',
}

// function getUser(user: User): User | undefined {

//   const userList: User[] = [
//     {
//       username: 'zyf',
//     },
//   ]
//   const info = userList.find((item) => item.username === user.username)
//   return info
// }

const getInstance = <T>() => {
  const list: T[] = []

  const add = (item:T) => {
    list.push(item)
  }

  const get = ():T[] => {
    return list
  }
  const del = (index:number) => {
    list.splice(index,1)
  }
  return {
    add,
    get,
    del,
  }
}

const {add,get,del} = getInstance<User>()

add({username: '111'})
add({username: '222'})
add({username: 'aaa'})
console.log(get());
del(1)
console.log(get());



class Person {
  name:string;
  constructor(name:string){
    this.name = name
  }
}

console.log(new Person('张三'));

