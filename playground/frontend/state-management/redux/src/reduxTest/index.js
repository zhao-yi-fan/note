/**
 *
 * @param {*} actionCreator function add(){ return  {type: 'add'}  }
 * @param {*} dispatch
 * @returns
 */
function bindActionCreator(actionCreator, dispatch) {
  return function (...args) {
    return dispatch(actionCreator.apply(this, args));
  };
}

function bindActionCreators(actions, dispatch) {
  const obj = {};
  if (typeof actions === "function") {
    return bindActionCreator(actions, dispatch);
  }
  for (const key in actions) {
    obj[key] = bindActionCreator(actions[key], dispatch);
  }
  return obj;
}

/**
 * 
 * @param {*} reducers {
  count1: (state = {
    count: 0,
  }, action) => {
    switch (action.type) {
      case 'add':
        return { ...state, count: state.count + action.data }
      case 'minus':
        return { ...state, count: state.count - action.data }
      default:
        return state;
    }
  },
  count2: (state = {
    count: 0,
  }, action) => {
    switch (action.type) {
      case 'add':
        return { ...state, count: state.count + action.data }
      case 'minus':
        return { ...state, count: state.count - action.data }
      default:
        return state;
    }
  }
}
 * @returns 
 */
function combineReducers(reducers) {
  return function (state = {}, action) {
    let nextState = {};
    for (const key in reducers) {
      nextState[key] = reducers[key](state[key], action);
    }
    return nextState;
  };
}

function createStore(reducer, prePayload) {
  let state = prePayload;
  const listeners = [];
  function subscribe(fn) {
    listeners.push(fn);
  }
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((l) => l());
  }
  dispatch({ type: "@123123" });
  function getState() {
    return state;
  }
  return {
    getState,
    subscribe,
    dispatch,
  };
}

const instance = createStore(
  combineReducers({
    count1: (state = { count: 0 }, action) => {
      switch (action.type) {
        case "add":
          return { ...state, count: state.count + action.data };
        case "minus":
          return { ...state, count: state.count - action.data };
        default:
          return state;
      }
    },
    count2: (state = { count: 0 }, action) => {
      switch (action.type) {
        case "add":
          return { ...state, count: state.count + action.data };
        case "minus":
          return { ...state, count: state.count - action.data };
        default:
          return state;
      }
    },
  })
);

console.log(instance.getState());

instance.subscribe(() => {
  console.log("接收到订阅了");
});

const actions = bindActionCreators(
  {
    add: (data) => ({ type: "add", data }),
    minus: (data) => ({ type: "minus", data }),
  },
  instance.dispatch
);

setTimeout(() => {
  actions.add(1);
  console.log(instance.getState());
}, 2000);
