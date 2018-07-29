import { combineEpics, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import io from 'socket.io-client';
import { createSelector } from 'reselect';
import { cloneDeep } from 'lodash';
import {
  catchError,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import * as R from 'ramda';

import { ajaxErrorMessage, Action, ErrorAction } from '../utilities';

// Actions
export const CHAT_STREAM_TOGGLED = 'ContactForm/CHAT_STREAM_TOGGLED';
export const CHAT_STREAM_STARTED = 'ContactForm/CHAT_STREAM_STARTED';
export const CHAT_STREAM_STOPPED = 'ContactForm/CHAT_STREAM_STOPPED';
export const CHAT_STREAM_CONNECTED = 'ContactForm/CHAT_STREAM_CONNECTED';
export const CHAT_STREAM_DISCONNECTED = 'ContactForm/CHAT_STREAM_DISCONNECTED';
export const CHAT_STREAM_ERROR = 'ContactForm/CHAT_STREAM_ERROR';

export const CHAT_MESSAGE_ON_SUBMIT = 'ContactForm/CHAT_MESSAGE_ON_SUBMIT';
export const CHAT_MESSAGE_SENT = 'ContactForm/CHAT_MESSAGE_SENT';
export const CHAT_MESSAGE_RECEIVED = 'ContactForm/CHAT_MESSAGE_RECEIVED';

export const ON_KICK_USER = 'ContactForm/ON_KICK_USER';
export const KICK_USER_SENT = 'ContactForm/KICK_USER_SENT';

export const ON_VIEW_USER_DETAILS = 'ContactForm/ON_VIEW_USER_DETAILS';
export const VIEW_USER_DETAILS_SENT = 'ContactForm/VIEW_USER_DETAILS_SENT';

export const USER_UPDATE_RECEIVED = 'ContactForm/USER_UPDATE_RECEIVED';
export const USER_LEAVE_RECEIVED = 'ContactForm/USER_LEAVE_RECEIVED';

export const GET_USER_LIST_AJAX = 'ContactForm/GET_USER_LIST_AJAX';
export const GET_USER_LIST_AJAX_STARTED = 'ContactForm/GET_USER_LIST_AJAX_STARTED';
export const GET_USER_LIST_AJAX_COMPLETED = 'ContactForm/GET_USER_LIST_AJAX_COMPLETED';
export const GET_USER_LIST_AJAX_ERROR = 'ContactForm/GET_USER_LIST_AJAX_ERROR';

export const ON_INPUT_FIELD_CHANGE = 'ContactForm/ON_INPUT_FIELD_CHANGE';
export const INPUT_FIELD_CHANGED = 'ContactForm/INPUT_FIELD_CHANGED';

// Action Creators
export const toggleChatStream = isEnabled => Action(CHAT_STREAM_TOGGLED, isEnabled);
export const sendChat = msg => Action(CHAT_MESSAGE_ON_SUBMIT, msg);
export const kickUser = socketId => Action(ON_KICK_USER, socketId);
export const viewUserDetails = socketId => Action(ON_VIEW_USER_DETAILS, socketId);
export const getUserList = () => Action(GET_USER_LIST_AJAX);
export const changeInputField = value => Action(ON_INPUT_FIELD_CHANGE, value);

let socket;

export const getSocket = () => socket;

// Socket Handling
export function connectSocket() {
  return (dispatch, getState) => {
    socket = io('https://chat.backend.joroze.com:4001/chat');

    socket.on('connect', () => {
      dispatch(Action(CHAT_STREAM_CONNECTED, socket.id));
      dispatch(getUserList());
    });

    // when you (client user) disconnects by client
    // or gets disconnected by server
    socket.on('disconnect', (reason) => {
      dispatch(Action(CHAT_STREAM_DISCONNECTED, reason));
    });

    // when someone else leaves
    socket.on('user_disconnect', (data) => {
      dispatch(Action(USER_LEAVE_RECEIVED, data));
    });

    socket.on('user', (data) => {
      dispatch(Action(USER_UPDATE_RECEIVED, data));
    });

    socket.on('message', (data) => {
      dispatch(Action(CHAT_MESSAGE_RECEIVED, data));
    });

    socket.on('serverError', (msg) => {
      console.log('Server Socket error!!!!1');
      dispatch(Action(CHAT_STREAM_ERROR, ajaxErrorMessage(msg)));
    });

    dispatch(Action(CHAT_STREAM_STARTED));
  };
}

// Define the initial state for the reducer
export const initialState = {
  author: 'Jordan',
  clientId: '',
  isChatStreamEnabled: false,
  isChatStreamOnline: false,
  isUserListLoading: false,
  messageList: [],
  responseMessage: '',
  inputField: '',
  subject: "Welcome to Jordan's Room",
  title: 'Chill Room',
  userDictionary: {},
};

export const userDictionarySelector = state => state.chat.userDictionary;
const clientIdSelector = state => state.chat.clientId;

export const getUserListSelector = createSelector(
  userDictionarySelector,
  users => R.values(users),
);

export const getUserSelector = createSelector(
  userDictionarySelector,
  clientIdSelector,
  (usersDictionary, clientId) => usersDictionary[clientId],
);

// Contact Form Reducer
export function reducer(state = initialState, action) {
  const mergeToState = R.merge(state);

  switch (action.type) {
    case INPUT_FIELD_CHANGED:
      return mergeToState({
        inputField: action.payload,
      });
    case GET_USER_LIST_AJAX_STARTED:
      return mergeToState({
        isUserListLoading: true,
      });
    case GET_USER_LIST_AJAX_COMPLETED: {
      const updatedState = mergeToState({
        isUserListLoading: false,
      });

      updatedState.userDictionary = action.payload;

      return updatedState;
    }
    case GET_USER_LIST_AJAX_ERROR:
      return mergeToState({
        isUserListLoading: false,
        responseMessage: action.payload,
      });
    case CHAT_STREAM_TOGGLED: {
      const updatedState = mergeToState({
        isChatStreamEnabled: !state.isChatStreamEnabled,
      });

      updatedState.messageList = [];
      updatedState.userDictionary = {};

      return updatedState;
    }
    case CHAT_STREAM_STARTED:
      return mergeToState({
        isChatStreamEnabled: true,
      });
    case CHAT_STREAM_STOPPED:
      return mergeToState({
        isChatStreamEnabled: false,
      });
    case CHAT_STREAM_CONNECTED:
      return mergeToState({
        clientId: action.payload,
        isChatStreamEnabled: true,
        isChatStreamOnline: true,
      });
    case CHAT_STREAM_DISCONNECTED: {
      const updatedState = mergeToState({
        isChatStreamEnabled: false,
        isChatStreamOnline: false,
      });

      updatedState.messageList = [];
      updatedState.userDictionary = {};

      return updatedState;
    }
    case CHAT_STREAM_ERROR:
      return mergeToState({
        isChatStreamEnabled: true,
        isChatStreamOnline: false,
      });
    case CHAT_MESSAGE_RECEIVED:
      return mergeToState({
        messageList: [...state.messageList, action.payload],
      });
    case USER_UPDATE_RECEIVED: {
      const updatedUser = action.payload;
      const userDictionary = cloneDeep(state.userDictionary);

      userDictionary[updatedUser.id] = updatedUser;

      return R.assoc('userDictionary', userDictionary, state);
    }
    case USER_LEAVE_RECEIVED: {
      const updatedUser = action.payload;
      const userDictionary = cloneDeep(state.userDictionary);

      delete userDictionary[updatedUser.id];

      return R.assoc('userDictionary', userDictionary, state);
    }
    default:
      return state;
  }
}

// Epics
function changeInputFieldEpic(action$) {
  return action$.pipe(
    ofType(ON_INPUT_FIELD_CHANGE),
    map(action => Action(INPUT_FIELD_CHANGED, action.payload)),
  );
}

function chatStreamToggleEpic(action$) {
  return action$.pipe(
    ofType(CHAT_STREAM_TOGGLED),
    map((action) => {
      const isEnabled = !action.payload;

      if (isEnabled) {
        return connectSocket();
      }

      socket.disconnect();
      return Action(CHAT_STREAM_STOPPED);
    }),
  );
}

function sendChatEpic(action$) {
  return action$.pipe(
    ofType(CHAT_MESSAGE_ON_SUBMIT),
    switchMap((action) => {
      socket.emit('message', action.payload);
      return of(Action(CHAT_MESSAGE_SENT));
    }),
  );
}

function kickUserEpic(action$) {
  return action$.pipe(
    ofType(ON_KICK_USER),
    switchMap((action) => {
      socket.emit('disconnect_user', action.payload);
      return of(Action(KICK_USER_SENT));
    }),
  );
}

function viewUserDetailsEpic(action$) {
  return action$.pipe(
    ofType(ON_VIEW_USER_DETAILS),
    switchMap((action) => {
      socket.emit('user_details', action.payload);
      return of(Action(VIEW_USER_DETAILS_SENT));
    }),
  );
}

function getUserListEpic(action$) {
  return action$.pipe(
    ofType(GET_USER_LIST_AJAX),
    switchMap(() => ajax.getJSON('https://chat.backend.joroze.com:4001/users').pipe(
      map(result => Action(GET_USER_LIST_AJAX_COMPLETED, result)),
      catchError(error => ErrorAction(GET_USER_LIST_AJAX_ERROR, ajaxErrorMessage(error))),
      startWith(Action(GET_USER_LIST_AJAX_STARTED)),
    )),
  );
}

export const chatEpic = combineEpics(
  chatStreamToggleEpic,
  getUserListEpic,
  sendChatEpic,
  kickUserEpic,
  changeInputFieldEpic,
  viewUserDetailsEpic,
);
