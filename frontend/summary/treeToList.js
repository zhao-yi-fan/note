const tree = {
  id: 1,
  name: "A",
  pid: 0,
  children: [
    {
      id: 2,
      name: "B",
      pid: 1,
      children: [
        {
          id: 4,
          name: "D",
          pid: 2,
          children: [],
        },
      ],
    },
    {
      id: 3,
      name: "C",
      pid: 1,
      children: [],
    },
  ],
};

function treeToList(tree) {
  const list = [];
  function recursion(obj) {
    list.push(obj);
    obj.children.forEach(recursion);
  }

  recursion(tree);

  return list;
}

console.log(treeToList(tree));
