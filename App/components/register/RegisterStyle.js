import {
  StyleSheet,
  Dimensions
} from 'react-native';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

var styles = StyleSheet.create({

  containerStyle: {
    justifyContent: 'space-around',
    backgroundColor: '#F7F6FB',
  },
  topImageStyle: {
    height: ScreenHeight * 0.247376,
    width: ScreenWidth,
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 20
  },
  gameBtnStyle: {
    width: ScreenWidth * 0.29333,
    height: ScreenHeight * 0.0509,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gameBtnTextStyle: {
    color: '#7a5230',
    fontSize: ScreenHeight * 0.02698,
    fontWeight: 'bold'
  },

  holeContainerStyle: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },

  holeViewStyle: {
    justifyContent: 'center',
  },

  moleImageStyle: {
    height: ScreenHeight * 0.29985,
    width: 0.28 * ScreenWidth,
    bottom: 0.09445 * ScreenHeight,
    left: 0.008 * ScreenWidth
  },
  moleBtnStyle: {
    flex: 1
  },
  holeImageStyle: {
    zIndex: 0,
    height: ScreenHeight * 0.07496,
    width: 0.27466 * ScreenWidth,
    top: 0.032233 * ScreenHeight,
    left: 0.008 * ScreenWidth
  },
  holeMaskImageStyle: {
    zIndex: 0,
    height: ScreenHeight * 0.05247,
    width: ScreenWidth * 0.29333
  },
  animatedViewStyle:{
    position: 'absolute',
    zIndex: 1
  },
  statusBarStyle:{
    backgroundColor: '#FF7960FF'
  },
  createButton: {
      backgroundColor: '#7960FF',
      height: 44,
      width:280,
      borderRadius: 25,
      alignItems: 'center',
      marginBottom:10,
      // color: 'white',
      justifyContent:'center'
    },
  loginButton: {
      backgroundColor: 'transparent',
      height: 44,
      width:280,
      borderRadius: 25,
      borderColor:'#7960FF',
      borderWidth:1,
      alignItems: 'center',
      justifyContent:'center',
      marginBottom:10
    },
  button_text:{
    color: '#ff0000',
    fontSize:20,
  },
  buttonText: {
    padding: 10,
    fontSize:16,
    fontWeight: 'bold'
  },
  themeColor: {
    color: '#7960FF'
  },
  whiteText: {
    color: 'white'
  },
  inputStyle: {
	  width:280,
	  borderRadius: 5,
	  height: 48,
	  borderColor: '#9D9D9D',
	  borderWidth: 1,
	  marginBottom:20,
	  fontWeight:'bold',
	  fontSize:19,
	  paddingLeft:15,
	  paddingRight:5
	},
  phoneinputStyle: {
     width:170,
    borderRadius: 5,
    height: 44,
    marginBottom:20,
    fontWeight:'bold',
    fontSize:19,
    paddingLeft:5,
    paddingRight:5
  },
  verificationInputStyle: {
    width:40,
    borderBottomWidth:2,
    borderColor: '#7960FF',
    marginBottom:40,
    margin:10,
    fontSize:20,
    fontWeight:'bold',
    textAlign:'center',

  },
   containertwo: {
    alignItems: 'center',
    marginTop: 120,
    marginBottom:80,
    marginLeft: 20,
    marginRight:20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    height: 410,
    borderRadius:10,
    borderColor:'#7960FF',
    borderWidth:1,
  },
  textInputProfilStyle:{
    fontSize: 16,
    fontWeight: "bold",
    fontFamily:'open-sans-regular'
  },
  subContainerProfile:{
    paddingLeft: 16,
    flex: 1,
    flexDirection: "column",
    borderTopWidth: 1,
  },
  profileHeadText:{
    fontSize: 14,
    fontWeight: "bold",
    color: "#9C9C9C",
    fontFamily:'open-sans-bold'
  },
  profileNameText:{
    fontSize: 20,
    fontWeight: "bold",
    color: "#4B4B4B",
    fontFamily:'open-sans-bold'
  },
  profileModalView:{
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    marginTop: 50
  },
  profileModal1View:{
    alignItems: "center",
    marginTop: 20,
    margin: 30
  },
  profileModalText1:{
    fontSize: 16,
    fontWeight: "bold",
    color: "#7960FF",
    fontFamily:'open-sans-bold'
  },
  profileModalText2:{
    fontSize: 25,
    color: "#000000",
    marginTop: 13,
    fontFamily:'open-sans-regular'
  },
  profilImage1style:{
    width: 140,
    height: 140
  },
  profileButtonView:{
    alignItems: "center",
    justifyContent:'flex-end',
  },
  textError: {
   color: 'red',
   marginTop: 5,
   fontFamily:'open-sans-bold'
 },
  midViewRegiMobile:{
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "white",
    borderRadius: 5,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    padding: 30,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  midTextHeadStyle:{
    fontSize: 16,
    textAlign: "center",
    width: 350,
    marginTop: 16,
    fontFamily:'open-sans-regular'
  },
  maunViewStyle:{
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    marginTop: 93
  },
  buttonOtpStyle:{
    alignItems: "center",
    padding: 10,
    marginTop: 50,
    backgroundColor: "white",
    borderRadius: 60,
    marginRight: 20,
    marginLeft: 50,
    marginBottom: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  buttonOtpStyle1:{
    alignItems: "center",
    padding: 10,
    marginTop: 50,
    backgroundColor: "white",
    borderRadius: 60,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  otpInputStyle:{
    backgroundColor: "white",
    borderBottomWidth: 1,
    color: "black",
    borderColor: "#7960FF",
  },
  otpViewStyle:{
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "white",
    borderRadius: 5,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    paddingBottom: 30,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  otpHText:{
    fontSize: 16,
    textAlign: "center",
    width: 350,
    marginTop: 16,
    paddingRight: 33,
    paddingLeft: 33,
    fontFamily:'open-sans-regular',
  },
  resendViewStyle:{
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: 100,
    top: 10
  },
  resendTextStyle:{
    fontSize: 14,
    textAlign: "center",
    color: "#7960FF",
    fontFamily:'open-sans-regular',
  },
  headerTextStyle:{
    paddingTop: 20,
    paddingLeft: 16,
    fontSize: 22,
    fontWeight: "bold",
    color: "#4B4B4B",
    fontFamily:'open-sans-bold',
    paddingBottom:10
  },
  imageMobileStyle:{
    width: 140,
    height: 140
  },
  titleViewStyle:{
    alignItems: "center",
    marginTop: 32,
    margin: 30
  },
  titleTextStyle:{
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    fontFamily:'open-sans-bold'
  },
  subContainorOtp:{
    flex: 1,
    flexDirection: "column"
  },
  modalHTextStyle:{
    fontSize: 25,
    color: "#000000",
    marginTop: 13,
    fontWeight: "bold"
  },
  modalButtonViewStyle:{
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 84
  },
  imageMotorcycle:{
    width: 90,
    height: 90,
    resizeMode: "contain",
  },
  modalVahicle:{
    alignItems: "center",
    marginTop: 114,
    margin: 30
  },
  image1Otp:{
    width: 140,
    height: 140
  },
  image1OtpView:{
    alignItems: "center"
  },
  otpMainView:{
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    marginTop: 75
  },
  headerOtpView:{
    alignItems: "center",
    marginTop: 32
  },
  otpResendText:{
    fontSize: 14,
    textAlign: "center",
    color: "#7960FF"
  },
  headerOtpText:{
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    fontFamily:'open-sans-bold'
  },
  imageRefreshStyle:{
    width: 13,
    height: 13,
    right: 3
  },
  headerViewProfile:{
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    height:ScreenHeight,
  }


});
export default styles;
