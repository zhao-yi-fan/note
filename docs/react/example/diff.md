# diff key的作用

## diff
- 一、虚拟DOM中key的作用


 当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM，随后React会对【新虚拟DOM】和【旧虚拟DOM】进行比较，比较规则如下：

 1.旧虚拟DOM中找到了新虚拟DOM相同的key:

   (1). 若虚拟DOM中的内容没有变化，直接使用之前的真实DOM

   (2). 若虚拟DOM中的内容变了，则生成新的真实DOM，随后替换掉页面中之前的真实DOM

 2.旧虚拟DOM没有找到与新虚拟DOM相同的key，根据数据创建新的真实DOM，随后渲染到页面


- 二、用index作为key可能会引发的问题：


 1.若对数据进行：逆序添加、逆序删除等破坏顺序操作：会产生没有必要的真实DOM更新 ==》 界面效果没有问题，但效率低

 2.如果结构中还包含输入类的DOM: 会产生错误DOM更新 =》 界面有问题

 3.注意！如果不存在对数据的逆序添加、逆序删除等破坏顺序操作。
   仅用于渲染列表展示，使用index作为key是没有问题的。

- 三、开发中如何选择key?


 1.最好使用每条数据的唯一标识作为key，比如id、手机号、身份证号等唯一值

 2.如果确定只是展示数据，用index也是可以的

## demo
```html
<div id="app1"></div>
<script type="text/babel">
  
  class Person extends React.Component {
    state = {
      persons: [
        { id: 1, name: '张三', age: 11 },
        { id: 2, name: '李四', age: 12 },
      ]
    }
    add = () => {
      const { persons } = this.state;
      const p = {
        id: persons.length + 1,
        name: '小王',
        age: 13
      }
      this.setState({
        persons: [p, ...persons]
      })
    }
    render () {
      return (<div>
        <h2>以index索引值作为key</h2>
        <button onClick={this.add}>新增</button>
        {
          this.state.persons.map((item, index) => {
            return (<p key={index}>
              {item.name}---{item.age}
              <input type="text" />
            </p>)
          })
        }

        <h2>以id唯一值作为key</h2>
        {
          this.state.persons.map((item) => {
            return (<p key={item.id}>
              {item.name}---{item.age}
              <input type="text" />
            </p>)
          })
        }
      </div>
      )
    }
  }

  ReactDOM.render(<Person />, document.getElementById('app1'))
</script>
```

## 示例

<iframe src="https://zhaoyifan.top/study/react/react-test/diff.html" width="100%" height="500px"></iframe>