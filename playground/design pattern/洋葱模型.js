class KoaLike {
  constructor() {
    this.middlewares = [];
  }

  use(fn) {
    this.middlewares.push(fn);
  }

  async run() {
    const dispatch = async (index) => {
      if (index >= this.middlewares.length) return;
      const middleware = this.middlewares[index];
      await middleware(() => dispatch(index + 1));
    };
    return dispatch(0);
  }
}


// 洋葱模型
const app = new KoaLike();

app.use(async (next) => {
  console.log(1);
  await new Promise(resolve => setTimeout(resolve, 1000));
  await next();
  console.log(4);
});

app.use(async (next) => {
  console.log(2);
  await next();
  console.log(5);
});

app.use(async (next) => {
  console.log(3);
  await next();
  console.log(6);
});

app.run();
