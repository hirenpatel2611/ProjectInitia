import {
  UPDATE_PASSWORD,
  UPDATE_MOBILE_NUMBER,
  LOGIN_START,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILED,
  ON_SUBMEET_LOGIN_FORM
} from '../actions/Login'

const INITIAL_STATE = {
  password:'',
  mobileno:'',
  loading:false,
  loginFailed:false,
  loginStatus:0,
  onSubmeetLoginForm:false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case UPDATE_PASSWORD:{
      return { ...state,
              password:action.payload,
              onSubmeetLoginForm:false,
              loginFailed:false
      }}
      break;

    case UPDATE_MOBILE_NUMBER:{
      return { ...state,
              mobileno:action.payload,
              onSubmeetLoginForm:false,
              loginFailed:false
            }}
      break;

    case LOGIN_START:{
        return { ...state,loading:!state.loading}}
        break;

    case LOGIN_SUCCESSFUL:{
       return { ...state,
              loading:false,
              loginStatus:action.payload,
              loginFailed:true
       }}
       break;

    case LOGIN_FAILED:{
          return { ...state,
                  loading:true
          }}
          break;

    case ON_SUBMEET_LOGIN_FORM:{
        return { ...state,
            onSubmeetLoginForm:true
        }}
      break;

    default:
      return state;
      break;

  }

}
