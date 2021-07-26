import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(reduxThunk))
);

export default store;
