import { createStore } from 'redux';
import bomberReducer   from './bomberReducer.js';

const bomberStore = createStore( bomberReducer );

export default bomberStore;
