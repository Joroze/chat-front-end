import { combineEpics } from 'redux-observable';
import { createSelector } from 'reselect';
import * as R from 'ramda';

import { userDictionarySelector } from './Chat.duck';
import { Action } from '../utilities';

// Actions
export const MODAL_OPEN = 'UserDetailsModal/MODAL_OPEN';
export const MODAL_CLOSE = 'UserDetailsModal/MODAL_CLOSE';

// Action Creators
export const openModal = socketId => Action(MODAL_OPEN, socketId);
export const closeModal = () => Action(MODAL_CLOSE);

export const selectedUserIdSelector = state => state.userDetailsModal.selectedUserId;

export const getSelectedUser = createSelector(
  selectedUserIdSelector,
  userDictionarySelector,
  (userId, users) => users[userId],
);

// Define the initial state for the reducer
export const initialState = {
  selectedUserId: '',
  isOpen: false,
};

// Contact Form Reducer
export function reducer(state = initialState, action) {
  const mergeToState = R.merge(state);

  switch (action.type) {
    case MODAL_OPEN:
      return mergeToState({
        isOpen: true,
        selectedUserId: action.payload,
      });
    case MODAL_CLOSE:
      return mergeToState({
        isOpen: false,
      });
    default:
      return state;
  }
}

export const userDetailsModalEpic = combineEpics();
