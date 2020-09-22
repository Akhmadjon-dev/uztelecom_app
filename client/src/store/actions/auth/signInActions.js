import {
  SIGN_IN_ERROR,
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS
} from '../../actionTypes'
import Axios from '../../../utils/axios'

export const signInError = err => ({
  type: SIGN_IN_ERROR,
  payload: err
})

export const signInPending = () => ({
  type: SIGN_IN_PENDING
})

export const signInSuccess = payload => {
  return {
    type: SIGN_IN_SUCCESS,
    payload
  }
}

const signOut = data => dispatch => {
  dispatch(signInError())

  return Axios.post('/auth/sign-in', data)
    .then(res => {
      const { data } = res
      if (data.success) {
        return dispatch(signInSuccess(data))
      }
      return dispatch(signInError(data.msg))
    })
    .catch(err => dispatch(signInError(err)))
}

export default signOut
