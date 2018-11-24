
import { GiftedChat } from 'react-native-gifted-chat';


export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const JOIN_CHAT = 'JOIN_CHAT';
export const SET_USER_ID = 'SET_USER_ID';


//https://github.com/erikras/ducks-modular-redux


//FONCTIONS PURE 
export default function reducer(state = { messages: [] , userId : null}, action) {
    switch (action.type) {
      case SEND_MESSAGE:
        return { ...state , messages : action.payload};
      case RECEIVE_MESSAGE:
          return { ...state , messages : action.payload};
      case JOIN_CHAT :
        return { ...state};
      case SET_USER_ID :
        return { ...state , userId : action.payload};
      default:
        return state;
    }
  }

  export function joinChat() {
    return { type: JOIN_CHAT };
  }

  export function sendMessage(message) {
    return { type: SEND_MESSAGE , payload : message };
  }

  export function receiveMessage(message) {
    return { type: RECEIVE_MESSAGE , payload : message };
  }

  export function setUserId(userId) {
    return { type: SET_USER_ID , payload : userId };
  }