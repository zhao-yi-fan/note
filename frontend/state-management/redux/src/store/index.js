import { createStore } from 'zredux';
import rootReducer from './reducers';

let store = createStore(rootReducer)

export default store