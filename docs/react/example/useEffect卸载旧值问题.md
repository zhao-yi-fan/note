# useEffect卸载旧值问题(闭包与hooks 经典坑)

:::info
useRef不仅有保存dom的作用，
useRef在保存变量时，在重新渲染方法后，可以`保留`住初始值。
:::
## demo
```html
<div id="root"></div>
<script type="text/babel">
  const { useEffect, useMemo, useState, useRef } = React;

  // 闭包与hooks经典的坑
  function Test () {
    let num = 0;
    function effect () {
      num++
      const message = `num: ${num}`;
      console.log(message)
      return function unmount () {
        console.log('unmount: ', message)
      }
    }
    return effect;
  }
  // 执行test，返回effect函数
  const add = Test()
  // 执行effect函数，返回引用了message1的unmount函数
  const unmount = add()
  // 再次执行effect函数，返回引用了message2的unmount函数
  add()
  // message3
  add()
  // message4
  add()
  // 执行unmount函数，打印message1
  unmount()


  function App () {
    const [number, setNumber] = useState(0);
    const oldNumber = useRef(number).current

    const add = () => {
      setNumber(number + 1);
      console.log('add: ', number);
    }

    const unmount = () => {
      ReactDOM.unmountComponentAtNode(document.querySelector('#root'))
    }
    // 方式1：闭包的方式。在卸载时，要使用初始的值，那么就不能依赖number
    useEffect(() => {
      console.log('不依赖number: ', number)
      return () => {
        console.log('不依赖unmount: ', number) // 依赖如果是空数组 则卸载时 number是旧的值
      }
    }, [])

    // 方式2：react建议使用值的变量必须依赖，要使用初始的值，那么就要使用useRef。
    useEffect(() => {
      console.log('依赖number: ', number)
      return () => {
        console.log('依赖unmount number: ', number)
        console.log('依赖unmount useRef: ', oldNumber) // 依赖number卸载时是新值，且每次都会执行
      }
    }, [number])
    return (
      <div>
        number: {number}
        <br />
        <button onClick={add}>add</button>
        <button onClick={unmount}>卸载</button>
      </div>
    )
  }
  ReactDOM.render(<App />, document.getElementById('root'));
</script>
```


## 示例
<iframe src="https://zhaoyifan.top/study/react/react-test/useEffect卸载旧值问题.html" width="100%" height="500px"></iframe>
