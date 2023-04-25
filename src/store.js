import {createStore} from 'redux';
import reducers from './Redux/reducers';

let store = createStore(reducers);

export default store;