import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers'

const middlewares = [];

// push in logger as the last middleware
// if (IS_DEV) {
//   // eslint-disable-next-line global-require
//   const { createLogger } = require('redux-logger');
//   const logger = createLogger({
//     diff: true,
//     collapsed: true
//   });
//
//   middlewares.push(logger);
// }

const makeStore = (initialState, options) => {
  return createStore(reducers, initialState);
};

export default makeStore