import {
  UPDATE_PASSWORD,
  UPDATE_MOBILE_NUMBER,
  LOGIN_START,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED
} from '../actions/Login'

const INITIAL_STATE = {
  password:'',
  mobileno:'',
  loading:false,
  loginFailed:false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case UPDATE_PASSWORD:{
      return { ...state,password:action.payload}}
      break;

    case UPDATE_MOBILE_NUMBER:{
      return { ...state,mobileno:action.payload}}
      break;

    case LOGIN_START:{
        return { ...state,loading:!state.loading}}
        break;

    case LOGIN_SUCCESSFUL:{
       return { ...state,loading:false}}
       break;

    case LOGIN_FAILED:{
          return { ...state,
                  loading:true
          }}
          break;

    default:
      return state;
      break;

  }

}
