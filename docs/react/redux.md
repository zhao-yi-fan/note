# Redux 状态管理完全指南

## Redux 核心概念

### 什么是 Redux？

Redux 是一个用于 JavaScript 应用的可预测状态容器，主要用于管理应用的全局状态。它遵循单向数据流的原则，使得状态管理变得可追踪和可预测。

### 三大原则

1. **单一数据源**：整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中
2. **State 是只读的**：唯一改变 state 的方法就是触发 action
3. **使用纯函数来执行修改**：为了描述 action 如何改变 state tree，你需要编写 reducers

### 核心概念详解

#### Store
Store 是保存数据的地方，整个应用只能有一个 Store。

```javascript
import { createStore } from 'redux';

const store = createStore(reducer);
```

#### State
State 是 Store 某个时点的数据集合。

```javascript
const state = store.getState();
```

#### Action
Action 是一个对象，用来描述发生了什么。

```javascript
const action = {
  type: 'ADD_TODO',
  payload: {
    text: '学习Redux'
  }
};
```

#### Reducer
Reducer 是一个纯函数，用来计算出新的 State。

```javascript
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    default:
      return state;
  }
};
```

#### Dispatch
Dispatch 是 View 发出 Action 的唯一方法。

```javascript
store.dispatch(action);
```

## React-Redux

React-Redux 是 Redux 官方提供的 React 绑定库，让 React 组件能够从 Redux store 读取数据，并向 store 分发 actions 来更新状态。

### 核心 API

#### Provider

`Provider` 组件使得 Redux store 对所有嵌套组件可用。

```javascript
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import App from './App';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

#### connect()

`connect()` 函数连接 React 组件与 Redux store。

```javascript
import { connect } from 'react-redux';

// mapStateToProps：将 state 映射到组件的 props
const mapStateToProps = (state) => {
  return {
    todos: state.todos,
    filter: state.filter
  };
};

// mapDispatchToProps：将 dispatch 映射到组件的 props
const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (text) => dispatch({ type: 'ADD_TODO', payload: { text } }),
    removeTodo: (id) => dispatch({ type: 'REMOVE_TODO', payload: { id } }),
    toggleTodo: (id) => dispatch({ type: 'TOGGLE_TODO', payload: { id } })
  };
};

// 使用 connect 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

#### Hooks API（推荐）

React-Redux 7.1.0+ 提供了 Hooks API，这是现代 React 应用中更推荐的方式。

##### useSelector

用于从 Redux store 中提取数据。

```javascript
import { useSelector } from 'react-redux';

function TodoList() {
  const todos = useSelector(state => state.todos);
  const filter = useSelector(state => state.filter);
  
  return (
    <div>
      {todos.map(todo => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  );
}
```

##### useDispatch

返回 Redux store 的 dispatch 函数引用。

```javascript
import { useDispatch } from 'react-redux';

function AddTodo() {
  const dispatch = useDispatch();
  
  const handleAdd = () => {
    dispatch({ 
      type: 'ADD_TODO', 
      payload: { text: '新任务' } 
    });
  };
  
  return <button onClick={handleAdd}>添加</button>;
}
```

### mapDispatchToProps 详解

`mapDispatchToProps` 可以是函数或对象，用于指定哪些 action creators 需要绑定到 props。

#### 函数形式

```javascript
const mapDispatchToProps = (dispatch) => {
  return {
    // 直接 dispatch action
    increment: () => dispatch({ type: 'INCREMENT' }),
    
    // dispatch action creator
    addTodo: (text) => dispatch(addTodoAction(text)),
    
    // 带参数的复杂 dispatch
    fetchUser: (id) => {
      dispatch({ type: 'FETCH_USER_REQUEST' });
      return fetch(`/api/users/${id}`)
        .then(res => res.json())
        .then(user => dispatch({ type: 'FETCH_USER_SUCCESS', payload: user }))
        .catch(err => dispatch({ type: 'FETCH_USER_FAILURE', error: err }));
    }
  };
};
```

#### 对象简写形式

```javascript
import { addTodo, removeTodo, toggleTodo } from './actions';

// Redux 会自动用 dispatch 包装这些 action creators
const mapDispatchToProps = {
  addTodo,
  removeTodo,
  toggleTodo
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
```

#### 使用 bindActionCreators

```javascript
import { bindActionCreators } from 'redux';
import * as todoActions from './actions';

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(todoActions, dispatch);
};
```

## Redux 异步处理

Redux 本身只支持同步数据流，异步操作需要中间件支持。

### Redux-Thunk

Redux-Thunk 是最常用的异步中间件，它允许 action creator 返回函数而不是 action 对象。

#### 安装和配置

```bash
npm install redux-thunk
```

```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
```

#### 使用示例

```javascript
// Action Creator 返回函数
export const fetchUsers = () => {
  return async (dispatch, getState) => {
    // 开始请求
    dispatch({ type: 'FETCH_USERS_REQUEST' });
    
    try {
      const response = await fetch('/api/users');
      const users = await response.json();
      
      // 请求成功
      dispatch({ 
        type: 'FETCH_USERS_SUCCESS', 
        payload: users 
      });
    } catch (error) {
      // 请求失败
      dispatch({ 
        type: 'FETCH_USERS_FAILURE', 
        error: error.message 
      });
    }
  };
};

// 组件中使用
function UserList() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.users);
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  
  if (loading) return <div>加载中...</div>;
  if (error) return <div>错误: {error}</div>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

#### 条件 Dispatch

Thunk 可以访问 `getState()`，允许根据当前状态决定是否 dispatch action。

```javascript
export const fetchUserIfNeeded = (userId) => {
  return (dispatch, getState) => {
    const { users } = getState();
    
    // 如果用户已存在，不重复请求
    if (users[userId]) {
      return Promise.resolve();
    }
    
    return dispatch(fetchUser(userId));
  };
};
```

### Redux-Saga

Redux-Saga 使用 ES6 的 Generator 函数来管理异步流程，使异步逻辑更易于测试和管理。

#### 安装和配置

```bash
npm install redux-saga
```

```javascript
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
```

#### 基本使用

```javascript
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import api from './api';

// Worker Saga: 执行异步操作
function* fetchUserSaga(action) {
  try {
    yield put({ type: 'FETCH_USER_REQUEST' });
    
    // call: 调用异步函数
    const user = yield call(api.fetchUser, action.payload.userId);
    
    // put: dispatch action
    yield put({ type: 'FETCH_USER_SUCCESS', payload: user });
  } catch (error) {
    yield put({ type: 'FETCH_USER_FAILURE', error: error.message });
  }
}

// Watcher Saga: 监听 action
function* watchFetchUser() {
  // takeEvery: 每次 dispatch 都会执行
  yield takeEvery('FETCH_USER', fetchUserSaga);
}

// Root Saga
export default function* rootSaga() {
  yield all([
    watchFetchUser(),
    watchFetchPosts(),
    // 更多 watcher sagas...
  ]);
}
```

#### 常用 Effects

##### takeEvery vs takeLatest

```javascript
import { takeEvery, takeLatest } from 'redux-saga/effects';

// takeEvery: 允许多个实例同时运行
function* watchFetchUsers() {
  yield takeEvery('FETCH_USERS', fetchUsersSaga);
}

// takeLatest: 只保留最新的请求，取消之前的
function* watchSearchUsers() {
  yield takeLatest('SEARCH_USERS', searchUsersSaga);
}
```

##### fork 和 spawn

```javascript
import { fork, spawn, call } from 'redux-saga/effects';

function* rootSaga() {
  // fork: 非阻塞调用，父 saga 会等待
  yield fork(watchFetchUsers);
  
  // spawn: 完全独立的 saga，不影响父 saga
  yield spawn(backgroundTask);
}
```

##### select

```javascript
import { select } from 'redux-saga/effects';

function* mySaga() {
  // 获取整个 state
  const state = yield select();
  
  // 获取部分 state
  const userId = yield select(state => state.user.id);
}
```

##### race

```javascript
import { race, call, delay } from 'redux-saga/effects';

function* fetchWithTimeout() {
  const { response, timeout } = yield race({
    response: call(api.fetchData),
    timeout: delay(5000)
  });
  
  if (timeout) {
    console.log('请求超时');
  } else {
    console.log('请求成功', response);
  }
}
```

#### 实际应用示例

```javascript
import { 
  call, 
  put, 
  takeLatest, 
  select, 
  delay 
} from 'redux-saga/effects';

// 复杂的异步流程
function* loginFlow() {
  while (true) {
    // 等待登录 action
    const { username, password } = yield take('LOGIN_REQUEST');
    
    try {
      // 调用登录 API
      const token = yield call(api.login, username, password);
      
      // 保存 token
      yield put({ type: 'LOGIN_SUCCESS', payload: { token } });
      localStorage.setItem('token', token);
      
      // 等待登出 action
      yield take('LOGOUT');
      
      // 清除 token
      yield call(api.logout);
      localStorage.removeItem('token');
      yield put({ type: 'LOGOUT_SUCCESS' });
      
    } catch (error) {
      yield put({ type: 'LOGIN_FAILURE', error: error.message });
    }
  }
}

// 防抖搜索
function* searchSaga(action) {
  // 延迟 500ms，如果期间有新的搜索请求，当前会被取消
  yield delay(500);
  
  try {
    const results = yield call(api.search, action.payload.query);
    yield put({ type: 'SEARCH_SUCCESS', payload: results });
  } catch (error) {
    yield put({ type: 'SEARCH_FAILURE', error: error.message });
  }
}

function* watchSearch() {
  yield takeLatest('SEARCH_REQUEST', searchSaga);
}
```

### Thunk vs Saga 对比

| 特性 | Redux-Thunk | Redux-Saga |
|------|-------------|------------|
| 学习曲线 | 简单，容易上手 | 较陡峭，需要了解 Generator |
| 代码风格 | Promise/async-await | Generator 函数 |
| 测试 | 需要 mock API | 易于测试，不需要 mock |
| 功能 | 基础异步处理 | 强大的副作用管理 |
| 取消请求 | 需要手动实现 | 内置支持 |
| 并发控制 | 复杂 | 简单（race, all, fork） |
| 适用场景 | 简单异步操作 | 复杂异步流程 |

## Redux Toolkit (RTK)

Redux Toolkit 是官方推荐的编写 Redux 逻辑的方式，简化了配置和常见用例。

### 安装

```bash
npm install @reduxjs/toolkit react-redux
```

### 基本使用

#### createSlice

```javascript
import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    addTodo: (state, action) => {
      // 可以直接修改 state，Immer 会处理不可变性
      state.items.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find(item => item.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    }
  }
});

export const { addTodo, removeTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
```

#### configureStore

```javascript
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './features/todos/todosSlice';
import userReducer from './features/user/userSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    user: userReducer
  }
  // 自动包含 thunk 中间件
  // 自动设置 Redux DevTools
});

export default store;
```

#### createAsyncThunk

处理异步逻辑的标准方式。

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 创建异步 thunk
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/users');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default usersSlice.reducer;
```

## Redux vs 其他状态管理库

### Redux vs Zustand

#### Zustand 特点

- **极简设计**：API 非常简洁
- **无需 Provider**：不需要包裹组件树
- **更少的样板代码**：没有 actions、reducers 等概念
- **体积小**：只有 1KB 左右

#### Zustand 示例

```javascript
import create from 'zustand';

// 创建 store
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 })
}));

// 使用
function Counter() {
  const { count, increment, decrement } = useStore();
  
  return (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}
```

#### 对比

| 特性 | Redux | Zustand |
|------|-------|---------|
| 学习曲线 | 较陡峭 | 平缓 |
| 样板代码 | 多 | 少 |
| DevTools | 官方支持 | 需要配置 |
| 中间件生态 | 丰富 | 基础 |
| 适用场景 | 大型应用 | 中小型应用 |
| 性能 | 优秀 | 优秀 |

### Redux vs MobX

#### MobX 特点

- **响应式编程**：使用观察者模式
- **面向对象**：使用类和装饰器
- **自动追踪依赖**：自动计算和更新
- **可变数据**：直接修改状态

#### MobX 示例

```javascript
import { makeObservable, observable, action, computed } from 'mobx';
import { observer } from 'mobx-react-lite';

class TodoStore {
  todos = [];
  
  constructor() {
    makeObservable(this, {
      todos: observable,
      addTodo: action,
      completedCount: computed
    });
  }
  
  addTodo(text) {
    this.todos.push({ id: Date.now(), text, completed: false });
  }
  
  get completedCount() {
    return this.todos.filter(todo => todo.completed).length;
  }
}

const todoStore = new TodoStore();

// 使用 observer 让组件响应变化
const TodoList = observer(() => {
  return (
    <div>
      <button onClick={() => todoStore.addTodo('新任务')}>添加</button>
      <p>完成数量: {todoStore.completedCount}</p>
      {todoStore.todos.map(todo => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  );
});
```

#### 对比

| 特性 | Redux | MobX |
|------|-------|------|
| 编程范式 | 函数式 | 面向对象 |
| 数据流 | 单向 | 双向（自动） |
| 可变性 | 不可变 | 可变 |
| 样板代码 | 多 | 少 |
| 可预测性 | 高 | 相对较低 |
| 学习曲线 | 较陡峭 | 中等 |
| 调试 | 时间旅行 | 较困难 |

### Redux vs Context API

#### Context API 特点

- **React 内置**：无需额外依赖
- **简单场景**：适合简单的状态传递
- **性能问题**：值变化会导致所有消费者重新渲染

#### Context API 示例

```javascript
import { createContext, useContext, useReducer } from 'react';

const TodoContext = createContext();

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
}

function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, []);
  
  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

function useTodos() {
  return useContext(TodoContext);
}
```

#### 对比

| 特性 | Redux | Context API |
|------|-------|-------------|
| 额外依赖 | 需要 | 不需要 |
| 性能优化 | 内置 | 需要手动 |
| 中间件 | 支持 | 不支持 |
| DevTools | 完善 | 基础 |
| 适用场景 | 复杂状态管理 | 简单状态传递 |

### Redux vs Recoil

#### Recoil 特点

- **原子化状态**：状态拆分成最小单元
- **React 特有**：专为 React 设计
- **异步支持**：原生支持异步查询
- **细粒度更新**：只更新使用到的组件

#### Recoil 示例

```javascript
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';

// 定义 atom（状态单元）
const todoListState = atom({
  key: 'todoListState',
  default: []
});

// 定义 selector（派生状态）
const todoStatsState = selector({
  key: 'todoStatsState',
  get: ({ get }) => {
    const todoList = get(todoListState);
    return {
      total: todoList.length,
      completed: todoList.filter(todo => todo.completed).length
    };
  }
});

// 使用
function TodoList() {
  const [todos, setTodos] = useRecoilState(todoListState);
  const stats = useRecoilValue(todoStatsState);
  
  return (
    <div>
      <p>总数: {stats.total}, 完成: {stats.completed}</p>
      {todos.map(todo => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  );
}
```

#### 对比

| 特性 | Redux | Recoil |
|------|-------|--------|
| 状态结构 | 单一树 | 原子化 |
| 学习曲线 | 较陡峭 | 中等 |
| 异步处理 | 需要中间件 | 原生支持 |
| 社区生态 | 成熟 | 发展中 |
| 适用场景 | 通用 | React 专用 |

## 总结与选择建议

### 何时使用 Redux

✅ **适合使用 Redux 的场景：**
- 大型应用，状态管理复杂
- 需要时间旅行调试
- 需要丰富的中间件生态
- 团队成员熟悉 Redux
- 需要严格的状态管理规范

❌ **不适合使用 Redux 的场景：**
- 简单的小型应用
- 状态主要是本地组件状态
- 团队希望快速开发原型

### 各库选择建议

**选择 Redux：**
- 大型企业应用
- 需要可预测的状态管理
- 需要强大的调试能力

**选择 Zustand：**
- 中小型项目
- 希望减少样板代码
- 追求简洁的 API

**选择 MobX：**
- 团队偏好面向对象
- 需要自动依赖追踪
- 从其他响应式框架迁移

**选择 Recoil：**
- React 专属项目
- 需要原子化状态管理
- 大量异步状态

**选择 Context API：**
- 简单的状态传递
- 主题、语言等全局配置
- 不想引入额外依赖

## 最佳实践

### Redux 最佳实践

1. **使用 Redux Toolkit**：官方推荐，减少样板代码
2. **规范化状态结构**：使用 normalizr 或类似工具
3. **拆分 Reducer**：按功能模块拆分，使用 combineReducers
4. **使用 Selector**：封装状态访问逻辑，使用 reselect 做缓存
5. **避免深层嵌套**：保持状态扁平化
6. **异步操作使用中间件**：Thunk 用于简单场景，Saga 用于复杂流程
7. **TypeScript 类型支持**：为 State、Action、Selector 添加类型

### 性能优化

```javascript
import { memo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';

// 1. 使用 shallowEqual 避免不必要的重渲染
const TodoItem = memo(({ todo }) => {
  return <div>{todo.text}</div>;
});

// 2. 精确选择需要的状态
function TodoList() {
  // ❌ 不好：选择整个状态
  const state = useSelector(state => state);
  
  // ✅ 好：只选择需要的部分
  const todos = useSelector(state => state.todos.items);
}

// 3. 使用 reselect 创建记忆化 selector
import { createSelector } from 'reselect';

const selectTodos = state => state.todos.items;
const selectFilter = state => state.todos.filter;

const selectFilteredTodos = createSelector(
  [selectTodos, selectFilter],
  (todos, filter) => {
    // 只有依赖变化时才重新计算
    return todos.filter(todo => {
      // 过滤逻辑
    });
  }
);
```

## 参考资源

- [Redux 官方文档](https://redux.js.org/)
- [React-Redux 官方文档](https://react-redux.js.org/)
- [Redux Toolkit 官方文档](https://redux-toolkit.js.org/)
- [Redux-Saga 官方文档](https://redux-saga.js.org/)
- [Zustand GitHub](https://github.com/pmndrs/zustand)
- [MobX 官方文档](https://mobx.js.org/)
- [Recoil 官方文档](https://recoiljs.org/)

