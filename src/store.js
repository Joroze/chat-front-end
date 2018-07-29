import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';

import {
  reducer as chatReducer,
  chatEpic,
} from './ducks/Chat.duck';
import {
  reducer as userDetailsModalReducer,
  userDetailsModalEpic,
} from './ducks/UserDetailsModal.duck';

export const rootEpic = combineEpics(
  chatEpic,
  userDetailsModalEpic,
);

const rootReducer = combineReducers({
  chat: chatReducer,
  userDetailsModal: userDetailsModalReducer,
});

const epicMiddleware = createEpicMiddleware();
const middleWare = applyMiddleware(thunk, epicMiddleware);
const store = createStore(rootReducer, composeWithDevTools(middleWare));

epicMiddleware.run(rootEpic);

export default () => store;
