import * as actionTypes from '../action-types'
// Counter2组件对应的state
const initialState = {
  number: 0,
  color: 'black'
}
// Counter2组件对应的reducer
function counter2 (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD2:
      return { ...state, number: state.number + 1 }
    case actionTypes.MINUS2:
      return { ...state, number: state.number - 1 }
    case actionTypes.CHANGECOLOR:
      return { ...state, color: action.payload }
    default:
      return state;
  }
}

export default counter2;