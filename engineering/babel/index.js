const t = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;

const string = `
function fn(){
  console.log('hello word')
}
`;

const ast = parser.parse(string);

const result = traverse(ast, {
  FunctionDeclaration(path) {
    console.log(path.node.id.name);
  },
  StringLiteral(path) {
    console.log(path.node.value);
    path.replaceWith(
      t.callExpression(t.identifier("$hxt"), [
        t.objectExpression([
          t.objectProperty(t.identifier("key"), t.stringLiteral("")),
          t.objectProperty(
            t.identifier("desc"),
            t.stringLiteral(path.node.value)
          ),
        ]),
      ])
    );
    path.skip();
  },
});

console.log(generator(ast).code);
