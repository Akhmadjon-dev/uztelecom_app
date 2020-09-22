import { SIGN_OUT_ERROR, SIGN_OUT_PENDING, SIGN_OUT_SUCCESS } from '../../actionTypes';
import Axios from '../../../utils/axios';

export const signOutError = (err) => ({
  type: SIGN_OUT_ERROR,
  payload: err
});

export const signOutPending = () => ({
  type: SIGN_OUT_PENDING
});

export const signOutSuccess = (payload) => {
  return {
    type: SIGN_OUT_SUCCESS,
    payload
  }
};

export default () => (dispatch) => {
  dispatch(signOutPending());
  return Axios.get('/auth/sign-out')
    .then(() => dispatch(signOutSuccess()))
    .catch((err) => dispatch(signOutError(err.message)));
};