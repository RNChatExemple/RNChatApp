import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {SEND_MESSAGE, JOIN_CHAT , RECEIVE_MESSAGE , SET_USER_ID} from './reducer'
import WebSocketUtils from '../Utils/WebSocketUtils';

const sockerHandler = new WebSocketUtils();

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* sendMessageWS(action) {
   try {
    sockerHandler.sendMessage(action.message);
   } catch (e) {
   }
}


function* joinChat(){
  try {
    console.warn('jOIN')
    console.warn("join",call(() => onJoined()))
    yield sockerHandler.init(yield call(() => onJoined()),yield call(() => onReceiveMessage()));
  } catch (e) {

  }
}

function* onJoined(){
  try {
    console.warn('JOINER',id);
    yield put({type : SET_USER_ID , payload : sockerHandler.serverUserId});
  } catch (e) {
    
  }
}

function* onReceiveMessage(){
  try {
    yield put({type : RECEIVE_MESSAGE , payload : sockerHandler.lasreceived});
  } catch (e) {

  }
}
/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery(SEND_MESSAGE, sendMessageWS);
  yield takeEvery(JOIN_CHAT, joinChat);
}

export default mySaga;