
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const JOIN_CHAT = 'JOIN_CHAT';
export const JOINED_CHAT = 'JOINED_CHAT';
export const SET_USER_ID = 'SET_USER_ID';

const handleMessage = (currentMessages = [], messages, inverted = true) => {
  if (!Array.isArray(messages)) {
    messages = [messages];
  }
  return inverted ? messages.concat(currentMessages) : currentMessages.concat(messages);
}

const getSendedMessageCount = (messages = [] , userId) => {
  if (!Array.isArray(messages)) {
    messages = [messages];
  }
  console.log(messages)

  const userMessages = messages.filter((elem) => {
    return elem.user._id === userId;
  });
  return userMessages.length;
}


//https://github.com/erikras/ducks-modular-redux


//FONCTIONS PURE 
export default function reducer(state = { messages: [] , userId : null, joined : false, nbMessages: 0 , nbSendedMessages : 0}, action) {
    switch (action.type) {
      case SEND_MESSAGE:
      case RECEIVE_MESSAGE:
        const messages = handleMessage(state.messages, action.payload);
        return { ...state , messages : messages };
      case SET_USER_ID :
        return { ...state , userId : action.payload};
      case JOINED_CHAT :
        return { ...state , joined : action.payload };
      default:
        return state;
    }
  }


  //Actions
  export function joinChat() {
    return { type: JOIN_CHAT };
  }

  export function joinedChat() {
    return { type: JOINED_CHAT , payload: true};
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


