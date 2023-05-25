// AuthReducer.js

export const CHANGE_CHAT = 'CHANGE_CHAT';

export const changeChatAction = (chat) => ({
  type: CHANGE_CHAT,
  payload: chat,
});




export const reducer = (data, action) => {
    switch (action.type) {
      case 'CHANGE_CHAT':
        return {
          ...data,
          chat: action.payload,
          chatId:action.payload.uid
        };

        case 'RESET_DATA':
          return {
            chatId: null,
            chat: {},
            other_user: {},
          };

        case 'UPDATE_OTHER_USER':
      return {
        ...data,
        other_user: action.payload,
      };
     
      default:
        return data;
    }
  };