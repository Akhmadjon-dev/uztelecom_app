import { SIGN_UP_ERROR, SIGN_UP_PENDING, SIGN_UP_SUCCESS } from '../../actionTypes';
import Axios from '../../../utils/axios';

export const signUpError = (err) => ({
  type: SIGN_UP_ERROR,
  payload: err
});

export const signUpPending = () => ({
  type: SIGN_UP_PENDING
});

export const signUpSuccess = (payload) => {
  return {
    type: SIGN_UP_SUCCESS,
    payload
  }
};

export default (data) => (dispatch) => {
  dispatch(signUpPending());

  return Axios.post('/auth/sign-up', data)
    .then((res) => {
      const { data } = res;

      if (data.success) {
        return dispatch(signUpSuccess(res.data))
      }
      return dispatch(signUpError(data.msg)) 
    })
    .catch((err) => dispatch(signUpError(err.message)));
}