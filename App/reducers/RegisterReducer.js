import {
  UPDATE_VEHICLE_BOOL,
  UPDATE_CAR_BOOL,
  UPDATE_USER_TYPE,
  UPDATE_MOBILE_NO,
  UPDATE_OTP_TIMEOUT,
  SET_TIME_OUT,
  ON_OTP_CHANGE,
  TOGGLE_MODAL_PROFILE,
  TOGGLE_MODAL_OTP,
  UPDATE_NAME,
  UPDATE_ADDRESS,
  UPDATE_EMAIL,
  UPDATE_MOBILE_NO_PROFILE,
  UPDATE_DATE_OF_BIRTH,
  UPDATE_PASSWORD_PROFILE,
  UPDATE_CONFIRM_PASSWORD,
  UPDATE_LANGUAGE,
  SIGNUP_START,
  SIGNUP_SUCCESSFUL,
  SIGNUP_FAIL,
  REQUEST_OTP,
  REQUEST_OTP_SUCCESS,
  UPDATE_ON_SUBMEET_OTP,
  UPDATE_ON_SUBMEET_SIGNUP,
  REQUEST_OTP_FAIL,
  GET_LOCATION_START,
  GET_LOCATION_FAIL,
  GET_LOCATION_SUCCESS,
  SET_LOCATION_VISIBILITY,
  SET_LOCATION,
  UPDATE_REGISTER_PROFILE_IMAGE_UPLOAD,
  UPDATE_REGISTER_DOCUMENT_UPLOAD,
  DELETE_REGISTER_DOCUMENT
} from "../actions/Register";
import {SET_ALL_STATE_TO_INITIAL} from '../actions/ui';

const INITIAL_STATE = {
  isTwoWheeler: false,
  isFourWheeler: false,
  isVendor: false,
  mobileno: "",
  otpTimeOut: 59,
  isOtpTimedOut: false,
  otp: "",
  visibleModalProfile: false,
  visibleModalOtp: false,
  name: "",
  address: "",
  mobilenoProfile: "",
  email: "",
  dateOfBirth: "",
  password: "",
  confirmPassword: "",
  language: "",
  loadingSignupB: false,
  recievedOTP: "",
  loading: false,
  onSubmeetOtpForm: false,
  onSubmeetSignupForm: false,
  onSubmeetMobileForm: false,
  requestOtpFail: false,
  requestOtpMessage: "",
  requestOtpSuccess: false,
  location: null,
  errorMessage: null,
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0,
  longitudeDelta: 0,
  setLocationVisible: false,
  signupFail: "",
  imageBase64Register:'',
  imageRegisterUri:'',
  documentRegisterUri:[],
  documentBase64Register:[]
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_VEHICLE_BOOL:
      {
        return {
          ...state,
          isTwoWheeler: !state.isTwoWheeler
        };
      }
      break;

    case UPDATE_CAR_BOOL:
      {
        return {
          ...state,
          isFourWheeler: !state.isFourWheeler
        };
      }
      break;

    case UPDATE_USER_TYPE:
      {
        
        return {
          ...state,
          isVendor: action.payload
        };
      }
      break;

    case UPDATE_MOBILE_NO:
      {
        return {
          ...state,
          mobileno: action.payload,
          onSubmeetMobileForm: false,
          loading: false,
          requestOtpFail: false
        };
      }
      break;

    case UPDATE_OTP_TIMEOUT:
      {
        return {
          ...state,
          otpTimeOut: state.otpTimeOut - 1,
          recievedOTP: state.otpTimeOut === 1 ? "" : state.recievedOTP
        };
      }
      break;

    case SET_TIME_OUT:
      {
        return {
          ...state,
          otpTimeOut: INITIAL_STATE.otpTimeOut
        };
      }
      break;

    case ON_OTP_CHANGE:
      {
        return {
          ...state,
          otp: action.payload,
          onSubmeetOtpForm: false
        };
      }
      break;

    case TOGGLE_MODAL_PROFILE:
      {
        return {
          ...state,
          visibleModalProfile: action.payload
        };
      }
      break;

    case TOGGLE_MODAL_OTP:
      {
        return {
          ...state,
          visibleModalOtp: !state.visibleModalOtp
        };
      }
      break;

    case UPDATE_NAME:
      {
        return {
          ...state,
          name: action.payload,
          onSubmeetSignupForm: false,
          signupFail: ""
        };
      }
      break;

    case UPDATE_ADDRESS:
      {
        return {
          ...state,
          address: action.payload,
          onSubmeetSignupForm: false,
          signupFail: ""
        };
      }
      break;

    case UPDATE_MOBILE_NO_PROFILE:
      {
        return {
          ...state,
          mobilenoProfile: action.payload,
          onSubmeetSignupForm: false
        };
      }
      break;

    case UPDATE_EMAIL:
      {
        return {
          ...state,
          email: action.payload,
          onSubmeetSignupForm: false,
          signupFail: ""
        };
      }
      break;

    case UPDATE_DATE_OF_BIRTH:
      {
        return {
          ...state,
          dateOfBirth: action.payload
        };
      }
      break;

    case UPDATE_PASSWORD_PROFILE:
      {
        return {
          ...state,
          password: action.payload,
          onSubmeetSignupForm: false
        };
      }
      break;

    case UPDATE_CONFIRM_PASSWORD:
      {
        return {
          ...state,
          confirmPassword: action.payload,
          onSubmeetSignupForm: false
        };
      }
      break;

    case UPDATE_LANGUAGE:
      {
        return {
          ...state,
          langauge: action.payload
        };
      }
      break;

    case SIGNUP_START:
      {
        return {
          ...state,
          loadingSignupB: true
        };
      }
      break;

    case SIGNUP_SUCCESSFUL:
      {
        return {
          ...state,
          setLocationVisible:false,
          loadingSignupB: false,
          visibleModalProfile: true,
          signupFail: "",
          mobileno:'',
          otp:'',
          recievedOTP:'',
          name: "",
          address: "",
          mobilenoProfile: "",
          email: "",
          password: "",
          confirmPassword: "",
          isTwoWheeler: false,
          isFourWheeler: false,
          onSubmeetSignupForm:false
        };
      }
      break;

    case SIGNUP_FAIL:
      {
        return {
          ...state,
          setLocationVisible:false,
          loadingSignupB: false,
          signupFail: action.payload,

        };
      }
      break;

    case REQUEST_OTP: {
      return {
        ...state,
        loading: true
      };
    }

    case REQUEST_OTP_SUCCESS:
      {
        return {
          ...state,
          recievedOTP: action.payload.toString(),
          loading: false,
          requestOtpFail: false,
          requestOtpSuccess: true
        };
      }
      break;

    case REQUEST_OTP_FAIL:
      {
        return {
          ...state,
          loading: false,
          requestOtpMessage: action.payload,
          onSubmeetMobileForm: true,
          requestOtpFail: true
        };
      }
      break;

    case UPDATE_ON_SUBMEET_OTP:
      {
        return {
          ...state,
          onSubmeetOtpForm: true
        };
      }
      break;

    case UPDATE_ON_SUBMEET_SIGNUP:
      {
        return {
          ...state,
          onSubmeetSignupForm: true
        };
      }
      break;

    case GET_LOCATION_START:
      {
        return {
          ...state,
          onSubmeetSignupForm: true
        };
      }
      break;

    case GET_LOCATION_FAIL:
      {
        return {
          ...state,
          errorMessage: action.payload
        };
      }
      break;

    case GET_LOCATION_SUCCESS:
      {
        return {
          ...state,
          location: action.payload
        };
      }
      break;

    case SET_LOCATION:
      {
        return {
          ...state,
          setLocationVisible: !state.setLocationVisible
        };
      }
      break;

      case UPDATE_REGISTER_PROFILE_IMAGE_UPLOAD:
        {
          return {
            ...state,
            imageRegisterUri:action.payload.uri,
            imageBase64Register:action.payload.base64
          };
        }
        break;

    case UPDATE_REGISTER_DOCUMENT_UPLOAD:
    {
      return{
        ...state,
        documentRegisterUri:[...state.documentRegisterUri,action.payload.uri],
        documentBase64Register:[...state.documentBase64Register,action.payload.base64]
      }
    }

      break;

      case DELETE_REGISTER_DOCUMENT:
      {
        return{
          ...state,
          documentRegisterUri:[...action.payload],
        }
      }
        break;

        case SET_ALL_STATE_TO_INITIAL:
        {
          return{
            ...state,
            ...INITIAL_STATE
          }
        }
        break;

    default:
      return state;
      break;
  }
};
