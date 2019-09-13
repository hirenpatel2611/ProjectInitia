import { LOGIN_SUCCESSFUL } from "../actions/Login";
import {
  SET_USER_INFO,
  GET_USER_PROFILE_DATA,
  UPDATE_IS_VENDOR,
  SET_ALL_STATE_TO_INITIAL
} from "../actions/ui";

const INITIAL_STATE = {
  userId: "",
  userMobileno: "",
  userFullName: "",
  userAddress: "",
  isUserVendor: "",
  userData: "",
  isVendorLoggedIn: false,
  userCurrentBooking: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESSFUL:
      {
        return {
          ...state,
          userId: action.payload.user_id,
          userMobileno: action.payload.mobileno,
          userFullName: action.payload.first_name,
          userAddress: action.payload.address
        };
      }
      break;

    case SET_USER_INFO:
      {
        return {
          ...state,
          userId: action.userId,
          isUserVendor: action.isUserVendor
        };
      }
      break;

    case GET_USER_PROFILE_DATA:
      {
        return {
          ...state,
          userData: {
            uri: state.isVendorLoggedIn ? action.payload.profile_image : null,
            workshop_name: state.isVendorLoggedIn
              ? action.payload.workshop_name
              : null,
            userId: action.payload.id,
            userEmail: action.payload.email,
            userMobileno: action.payload.mobile,
            userFullName: action.payload.first_name,
            userAddress: action.payload.address,
            userLatitude: action.payload.latitude,
            userLongitude: action.payload.longitude,
            userVehicleType: JSON.parse(action.payload.service_vehicle_type),
            uderReferalCode: action.payload.referal_code
          },
          userCurrentBooking: action.payload.current_booking
        };
      }
      break;

    case UPDATE_IS_VENDOR:
      {
        return {
          ...state,
          isVendorLoggedIn: action.payload
        };
      }
      break;

    case SET_ALL_STATE_TO_INITIAL:
      {
        return {
          ...state,
          ...INITIAL_STATE
        };
      }
      break;

    default:
      return state;
      break;
  }
};
