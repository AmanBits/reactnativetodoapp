import {all} from 'redux-saga/effects';
import {watchTaskActions} from './taskSaga';

export default function* rootSaga() {
  yield all([watchTaskActions()]);
}
