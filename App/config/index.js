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
export const MAKE_PAYMENT_CUSTOMER = "/wallets/update_wallets";
export const FETCH_LEDGER_HISTORY = "/payments/get_history";
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

export const setLedgerHeader = payment_id => {

  var res = payment_id.split("_");

  switch (res[0]) {
    case "Cref":
      return ({header:"Paid by Customer",type:"cr",value:""});
      break;

    case "Led":
      return ({header:"Booking Lead",type:"dr",value:""});
      break;

    case "pay":
      return ({header:"Fund Transfer",type:"cr",value:"INR"});
      break;

    case "Ref":
      return ({header:"Referral Bonus",type:"cr",value:""});
      break;

    case "Inst":
      return ({header:"Installation Bonus",type:"cr",value:""});
      break;

    default:
      return null;
  }
};

export const statusForVendor = status =>{
  switch (status) {
    case "cancle":
      return "cancelled";
      break;

    case "pending":
      return "pending";
      break;

    case "accept":
      return "accept";
      break;

    case "on-the-way":
      return "on-the-way";
      break;

    case "reached":
      return "reached";
      break;

      case "completed":
        return "completed";
        break;

    default:
      return null;
  }
}

export const getLedgerHeader = header => {

  switch (header) {
    case "All":
      return "All"
      break;

    case "Paid by Customer":
      return "Cref"
      break;

    case "Booking Lead":
      return "Led"
      break;

    case "Fund Transfer":
      return "pay"
      break;

    case "Referral Bonus":
      return "Ref"
      break;

    case "Installation Bonus":
      return "Inst";
      break;

    default:
      return null;
  }
};

export const paymentAmount = [
  {value:'100 INR + GST (100pts)',amount:100,gst:18,point:100},
  {value:'500 INR + GST (525pts)',amount:500,gst:90,point:525},
  {value:'1000 INR + GST (1050pts)',amount:1000,gst:180,point:1050},
  {value:'2500 INR + GST (2650pts)',amount:1500,gst:270,point:2650},
  {value:'5000 INR + GST (5400pts)',amount:5000,gst:900,point:5400},
  {value:'10000 INR + GST (11000pts)',amount:10000,gst:1800,point:11000},
];

export const filterHistory =[
  {value:"All"},
  {value:"Booking Lead"},
  {value:"Fund Transfer"},
  {value:"Installation Bonus"},
  {value:"Paid by Customer"},
  {value:"Referral Bonus"},

]

export const stateAndTin =[
  {value:'ARUNACHAL PRADESH'	,code:'12'},
  {value:'ASSAM'	,code:'18'},
  {value:'ANDHRA PRADESH(BEFORE DIVISION)'	,code:'28'},
  {value:'ANDAMAN AND NICOBAR ISLANDS'	,code:'35'},
  {value:'ANDHRA PRADESH (NEW)'	,code:'37'},
  {value:'BIHAR'	,code:'10'},
  {value:'CHANDIGARH'	,code:'4'},
  {value:'CHATTISGARH'	,code:'22'},
  {value:'DELHI'	,code:'7'},
  {value:'DAMAN AND DIU'	,code:'25'},
  {value:'DADRA AND NAGAR HAVELI'	,code:'26'},
  {value:'GUJARAT'	,code:'24'},
  {value:'GOA'	,code:'30'},
  {value:'HIMACHAL PRADESH'	,code:'2'},
  {value:'HARYANA'	,code:'6'},
  {value:'JAMMU AND KASHMIR'	,code:'1'},
  {value:'JHARKHAND'	,code:'20'},
  {value:'KARNATAKA'	,code:'29'},
  {value:'KERALA'	,code:'32'},
  {value:'LAKSHWADEEP'	,code:'31'},
  {value:'MANIPUR'	,code:'14'},
  {value:'MIZORAM'	,code:'15'},
  {value:'MEGHLAYA'	,code:'17'},
  {value:'MADHYA PRADESH'	,code:'23'},
  {value:'MAHARASHTRA'	,code:'27'},
  {value:'NAGALAND'	,code:'13'},
  {value:'ODISHA'	,code:'21'},
  {value:'PUNJAB'	,code:'3'},
  {value:'PUDUCHERRY'	,code:'34'},
  {value:'RAJASTHAN'	,code:'8'},
  {value:'SIKKIM'	,code:'11'},
  {value:'TRIPURA'	,code:'16'},
  {value:'TAMIL NADU'	,code:'33'},
  {value:'TELANGANA'	,code:'36'},
  {value:'UTTARAKHAND'	,code:'5'},
  {value:'UTTAR PRADESH'	,code:'9'},
  {value:'WEST BENGAL'	,code:'19'},
  ]
