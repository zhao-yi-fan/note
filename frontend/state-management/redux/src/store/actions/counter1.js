import * as actionTypes from '../action-types';

let actions = {
  add1 () {
    return {
      type: actionTypes.ADD1
    }
  },
  minus1 () {
    return {
      type: actionTypes.MINUS1
    }
  },
  changeColor (color) {
    return {
      type: actionTypes.CHANGECOLOR,
      payload: color
    }
  }
}

export default actions;
