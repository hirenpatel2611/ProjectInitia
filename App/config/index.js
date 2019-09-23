import { Platform } from "react-native";
export const URL_BASE = "http://ilifenetwork.com/api/web/v1";
export const URL_USER_LOGIN = "/customers/login";
export const URL_USER_OTP = "/customers/send_otp";
export const URL_USER_SIGNUP = "/customers/signup";
export const SEND_MECHANIC_OTP = "/customers/send_mechanic_otp";
export const URL_USER_INFO = "/app/api/userinfo";
export const GET_VENDOR = "/customers/get_vendor";
export const GET_BOOKING = "/bookings/booking";
export const GET_BOOKINGLIST = "/bookings/get_booking";
export const POST_RATING = "/customers/rating";
export const GET_FUTURE_BOOKINGLIST = "/bookings/get_vendor_booking";
export const BOOKING_UPDATE = "/bookings/booking_update";
export const GET_USER_DATA = "/customers/get_user";
export const UPDATE_PROFILE = "/customers/update_profile";
export const RATING_BY_CUSTOMER = "/customers/rating";
export const SEND_FORGOT_PASSWORD_OTP = "/customers/send_forgot_password_otp";
export const SEND_FORGOT_PASSWORD = "/customers/forgot_password";
export const VERIFY_MECHANIC_OTP = "/customers/verify_mechanic_otp";
export const CUSTOMER_COMMENT = "/bookings/booking_comment";
export const GET_WALLET_AMOUNT = "/wallets/get_wallet_amount";
export const UPDATE_WALLET_AMOUNT = "/wallets/update_wallet_amount";
export const ADD_PAYMENT = "/payments/add_payment";
export const VENDOR_STATUS = "/customers/update_status";
export const WEBCALL_SUCCESSFUL_FLAG = 100;
export const URL_USER_LOGOUT = "/app/api/logout";

export const statusToPhrase = (sts)  => {

  switch (sts) {
    case "PENDING":
      {
       return 'Pending For Approval'
      }
      break;

    case "ACCEPT":
      {
       return 'Your Request Has Been Accepted'
      }
      break;

    case "ON-THE-WAY":
      {
        return 'Mechanic is on the way, will reach in short while'

    }
      break;

    case "REACHED":
      {
    return 'Mechanic reached'
      }
      break;
    default:
  }
};

export const stateAndTin =[
                  {value:'JAMMU AND KASHMIR'	,code:'1'},
                  {value:'HIMACHAL PRADESH'	,code:'2'},
                  {value:'PUNJAB'	,code:'3'},
                  {value:'CHANDIGARH'	,code:'4'},
                  {value:'UTTARAKHAND'	,code:'5'},
                  {value:'HARYANA'	,code:'6'},
                  {value:'DELHI'	,code:'7'},
                  {value:'RAJASTHAN'	,code:'8'},
                  {value:'UTTAR PRADESH'	,code:'9'},
                  {value:'BIHAR'	,code:'10'},
                  {value:'SIKKIM'	,code:'11'},
                  {value:'ARUNACHAL PRADESH'	,code:'12'},
                  {value:'NAGALAND'	,code:'13'},
                  {value:'MANIPUR'	,code:'14'},
                  {value:'MIZORAM'	,code:'15'},
                  {value:'TRIPURA'	,code:'16'},
                  {value:'MEGHLAYA'	,code:'17'},
                  {value:'ASSAM'	,code:'18'},
                  {value:'WEST BENGAL'	,code:'19'},
                  {value:'JHARKHAND'	,code:'20'},
                  {value:'ODISHA'	,code:'21'},
                  {value:'CHATTISGARH'	,code:'22'},
                  {value:'MADHYA PRADESH'	,code:'23'},
                  {value:'MAHARASHTRA'	,code:'27'},
                  {value:'GUJARAT'	,code:'24'},
                  {value:'DAMAN AND DIU'	,code:'25'},
                  {value:'DADRA AND NAGAR HAVELI'	,code:'26'},
                  {value:'ANDHRA PRADESH(BEFORE DIVISION)'	,code:'28'},
                  {value:'KARNATAKA'	,code:'29'},
                  {value:'GOA'	,code:'30'},
                  {value:'LAKSHWADEEP'	,code:'31'},
                  {value:'KERALA'	,code:'32'},
                  {value:'TAMIL NADU'	,code:'33'},
                  {value:'PUDUCHERRY'	,code:'34'},
                  {value:'ANDAMAN AND NICOBAR ISLANDS'	,code:'35'},
                  {value:'TELANGANA'	,code:'36'},
                  {value:'ANDHRA PRADESH (NEW)'	,code:'37'},
                ]
