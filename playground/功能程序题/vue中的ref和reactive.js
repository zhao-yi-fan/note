const vue = {
  isRenderPending: false,

  ref(initialValue) {
    let value = initialValue;
    if (typeof initialValue === "object") {
      return vue.reactive(initialValue);
    }

    return {
      get value() {
        console.log("获取值");
        return value;
      },
      set value(newValue) {
        console.log("被修改", newValue);
        value = newValue;
        vue.queueRender();
      },
    };
  },

  reactive(obj) {
    return new Proxy(obj, {
      get(target, key, receiver) {
        console.log("获取属性", String(key));
        return Reflect.get(target, key, receiver);
      },
      set(target, key, value, receiver) {
        console.log("修改属性", String(key), value);
        const result = Reflect.set(target, key, value, receiver);
        vue.queueRender();
        return result;
      },
    });
  },

  queueRender() {
    if (this.isRenderPending) return;

    this.isRenderPending = true;
    Promise.resolve().then(() => {
      this.isRenderPending = false;
      this.render();
    });
  },

  render() {
    console.log("render");
  },
};

const { ref } = vue;

const a = ref(1);
a.value = 2;
a.value = 3;
// 修改了两次只render了一次

// const obj = ref({ a: 1 });
// obj.a = 2;
