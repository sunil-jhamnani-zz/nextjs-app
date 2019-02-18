import { createStore } from 'redux';

import reducers from './reducers';

const makeStore = initialState => (
  createStore(reducers, initialState)
);

export default makeStore;
