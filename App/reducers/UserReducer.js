import {
  LOGIN_SUCCESSFUL,
} from "../actions/Login";
import {SET_USER_INFO,GET_USER_PROFILE_DATA,GET_USER_PROFILE_DATA_START} from '../actions/ui';


const INITIAL_STATE = {
  userId: "",
  userMobileno: "",
  userFullName: '',
  userAddress: '',
  isUserVendor:'',
  userData:''
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
          userAddress: action.payload.address,
        };
      }
      break;

      case SET_USER_INFO:
        {
          return {
            ...state,
            userId: action.userId,
            isUserVendor: action.isUserVendor,
          };
        }
        break;

        case GET_USER_PROFILE_DATA:
          {
            return {
              ...state,
              userData:{
              userId:action.payload.id,
              userMobileno: action.payload.mobile,
              userFullName: action.payload.first_name,
              userAddress: action.payload.address,
              userLatitude:action.payload.latitude,
              userLongitude:action.payload.longitude,
              userVehicleType:action.payload.service_vehicle_type,}
            };
          }
          break;

    default:
      return state;
      break;
  }
};
