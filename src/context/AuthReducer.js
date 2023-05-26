// AuthReducer.js

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const loginAction = (user) => ({
  type: LOGIN,
  payload: user,
});

export const logoutAction = () => ({
  type: LOGOUT,
});


export const reducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          isAuthenticated: true,
          user: action.payload,
        };
      case 'UPDATE_USER_DETAILS':
        return {
          user_details:action.payload,
        };
      case 'LOGOUT':
        return {
          isAuthenticated: false,
          user: null,
        };
      default:
        return state;
    }
  };