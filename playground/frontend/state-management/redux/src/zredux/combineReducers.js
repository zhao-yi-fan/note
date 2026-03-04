function combineReducers (reducers) {
  /**
   * state 老的总状态
   * action 动作
   */
  return function (state = {}, action) {
    let nextState = {};
    // reducers = {counter1,counter1,}
    for (let key in reducers) {
      // nextState.counter1 = counter1(oldCounter1State,action);
      nextState[key] = reducers[key](state[key], action)
    }
    return nextState;
  }
}

export default combineReducers;