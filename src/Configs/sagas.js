import {
  call,
  put,
  takeEvery,
  takeLatest
} from 'redux-saga/effects'
import {
  SEND_MESSAGE,
  JOIN_CHAT,
  SET_USER_ID,
  JOINED_CHAT
} from './reducer'
import WebSocketUtils from '../Utils/WebSocketUtils';

const sockerHandler = new WebSocketUtils();

function* sendMessageWS(action) {
  try {
    sockerHandler.send(action.payload);
  } catch (e) {

  }
}

function* joinChat() {
  try {
    yield call(() => sockerHandler.connect());
  } catch (e) {
    alert(e);
  }
}

function* joinedChat() {
  try {
    yield put({
      type: SET_USER_ID,
      payload: sockerHandler.serverUserId
    });
  } catch (e) {
    alert(e);
  }
}

function* mySaga() {
  yield takeEvery(SEND_MESSAGE, sendMessageWS);
  yield takeEvery(JOIN_CHAT, joinChat);
  yield takeEvery(JOINED_CHAT, joinedChat);

}

export default mySaga;