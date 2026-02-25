import * as actionTypes from '../action-types'
// Counter1组件对应的state
const initialState = {
  number: 0,
  color: 'black'
}
// Counter1组件对应的reducer
function counter1 (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD1:
      return { ...state, number: state.number + 1 }
    case actionTypes.MINUS1:
      return { ...state, number: state.number - 1 }
    case actionTypes.CHANGECOLOR:
      console.log(state,'state===');
      return { ...state, color: action.payload }
    default:
      return state;
  }
}

export default counter1;