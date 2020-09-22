import * as types from "../../actionTypes";

const initialState = {
  error: false,
  isLogged: false,
  msg: "",
  pending: false,
  success: false,
  user: null,
  userType: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_IN_ERROR:
    case types.SIGN_UP_ERROR: {
      return {
        error: true,
        isLogged: false,
        msg: action.payload,
        pending: false,
        success: false,
      };
    }
    case types.SIGN_IN_SUCCESS:
    case types.SIGN_UP_SUCCESS: {
      console.log("Successss");
      return {
        pending: false,
        error: false,
        msg: action.payload.msg,
        isLogged: true,
        success: action.payload.success,
        user: { ...action.payload.payload },
        userType: action.payload.type,
      };
    }
    case types.SIGN_IN_PENDING:
    case types.SIGN_UP_PENDING: {
      return {
        error: false,
        isLogged: false,
        msg: null,
        pending: true,
        success: false,
        user: null,
        userType: null,
      };
    }
    case types.UPDATE_AUTH: {
      return {
        ...state,
        user: action.data,
      };
    }
    default: {
      return initialState;
    }
  }
};
