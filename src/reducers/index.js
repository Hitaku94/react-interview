import counterReducer from './counter';
import moviesReducer from './counter';
import {combineReducers} from 'redux';

const rootReducers = combineReducers({
    counter : counterReducer,
    moviesReducer,
   
})

export default rootReducers