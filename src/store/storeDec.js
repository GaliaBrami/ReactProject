import { createStore, combineReducers } from 'redux';
import reducer from './reducerUser';

export const store = createStore(reducer);