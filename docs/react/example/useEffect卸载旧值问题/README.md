# useEffect卸载旧值问题

## demo
```html
<div id="root"></div>
<script type="text/babel">
  const { useEffect, useMemo, useState } = React;

  function App () {
    const [number, setNumber] = useState(0);

    const add = () => {
      setNumber(number + 1);
    }

    const unmount = () => {
      ReactDOM.unmountComponentAtNode(document.querySelector('#root'))
    }

    useEffect(() => {
      console.log('number: ', number)
      return () => {
        console.log('unmount: ', number) // 依赖如果是空数组 则number是旧的值
      }
    }, [])

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
