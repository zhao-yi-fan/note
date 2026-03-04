import { combineReducers } from 'zredux'
import counter1 from './counter1'
import counter2 from './counter2'

let rootReducer = combineReducers({
  counter1,
  counter2,
})

export default rootReducer;
/**
 * reducer rootReducer
 * state { counter1: {number: 0},counter2: {number: 0}}
 */




/**
 * 项目 不管规模多大
 * 只有一个store
 * store只有一个state
 * store只能有一个reducer
 * 写多个reducer，然后经过一个方法合并成一个reducer就可以了
 */