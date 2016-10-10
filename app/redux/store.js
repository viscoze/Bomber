import { createStore, applyMiddleware } from 'redux';
import ReduxThunk    from 'redux-thunk';
import bomberReducer from './bomberReducer.js';

const bomberStore = createStore( bomberReducer,  applyMiddleware(ReduxThunk) );

export default bomberStore;
