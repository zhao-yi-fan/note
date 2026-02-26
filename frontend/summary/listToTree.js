const list = [
  { id: 1, name: 'A', pid: 0 },
  { id: 2, name: 'B', pid: 1 },
  { id: 3, name: 'C', pid: 1 },
  { id: 4, name: 'D', pid: 2 }
]

// 请把它转成如下树结构
// {
//   id:1, name:'A', pid:0, children:[
//      {id:2, ... children: [...] },
//      {id:3, ...}
//   ]
// }
function listToTree(list) {
  const result = [];
  const map = list.reduce((acc,cur)=>{
    acc[cur.id] = {
      ...cur,
      children: []
    }
    return acc
  },{});

  list.forEach((item)=>{
    if(item.pid === 0){
      result.push(map[item.id])
    } else {
      map[item.pid].children.push(map[item.id])
    }
  })
  return result
}

console.log(JSON.stringify(listToTree(list), null, 2));