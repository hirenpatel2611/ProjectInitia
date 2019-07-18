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
