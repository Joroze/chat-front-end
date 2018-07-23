import * as R from 'ramda';
import { of } from 'rxjs';

export function Action(type, payload) {
  return {
    type,
    payload,
  };
}

export function ErrorAction(type, payload) {
  return of({
    type,
    payload,
    error: true,
  });
}

export function ajaxErrorMessage(error) {
  console.log(error);
  const generalErrorMessage = 'Something went wrong.';
  return R.path(['xhr', 'response', 'message'])(error) || generalErrorMessage;
}
