import { StyleSheet, Dimensions } from "react-native";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

var styles = StyleSheet.create({
  containerStyle: {
    justifyContent: "space-around",
    flex: 1,
    backgroundColor: "#F7F6FB"
  },
  topImageStyle: {
    height: ScreenHeight * 0.247376,
    width: ScreenWidth,
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 20
  },
  gameBtnStyle: {
    width: ScreenWidth * 0.29333,
    height: ScreenHeight * 0.0509,
    justifyContent: "center",
    alignItems: "center"
  },
  gameBtnTextStyle: {
    color: "#7a5230",
    fontSize: ScreenHeight * 0.02698,
    fontWeight: "bold"
  },

  holeContainerStyle: {
    justifyContent: "space-around",
    flexDirection: "row"
  },

  holeViewStyle: {
    justifyContent: "center"
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
  animatedViewStyle: {
    position: "absolute",
    zIndex: 1
  },
  statusBarStyle: {
    backgroundColor: "#FF7960FF"
  },
  createButton: {
    backgroundColor: "#7960FF",
    height: 50,
    width: 0.75*ScreenWidth,
    borderRadius: 25,

    alignItems: "center",
    marginBottom: 10,
    // color: 'white',
    justifyContent: "center"
  },
  loginButton: {
    backgroundColor: "transparent",
    height: 50,
    width: 0.75*ScreenWidth,
    borderRadius: 25,
    borderColor: "#7960FF",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10
  },
  button_text: {
    color: "#ff0000",
    fontSize: 20
  },
  buttonText: {
    padding: 10,
    fontSize: 0.055*ScreenWidth,
    fontFamily: "circular-book"
  },
  themeColor: {
    color: "#7960FF"
  },
  whiteText: {
    color: "white"
  },
  inputStyle: {
    width: 280,
    borderRadius: 5,
    height: 48,
    borderColor: "#9D9D9D",
    borderWidth: 1,
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 19,
    paddingLeft: 15,
    paddingRight: 5
  },
  phoneinputStyle: {
    width: 170,
    borderRadius: 5,
    height: 44,
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 19,
    paddingLeft: 5,
    paddingRight: 5
  },
  verificationInputStyle: {
    width: 40,
    borderBottomWidth: 2,
    borderColor: "#7960FF",
    marginBottom: 40,
    margin: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  containertwo: {
    alignItems: "center",
    marginTop: 120,
    marginBottom: 80,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    height: 410,
    borderRadius: 10,
    borderColor: "#7960FF",
    borderWidth: 1
  },
  midTextStyle: {
    fontSize: 16,
    textAlign: "center",
    width: 350,
    marginTop: 16,
    fontFamily: "circular-book",
    color: "#696969"
  },
  mainViewStyle: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    marginTop: 75
  },
  imageViewstyle: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24
  },
  imageMechanic: {
    width: 96,
    height: 110
  },
  image2: {
    width: 34,
    height: 48
  },
  image3: {
    width: 64,
    height: 47,
    marginRight: 25,
    marginLeft: 25
  },
  image4: {
    width: 48,
    height: 48
  },
  subViewStyle: {
    alignItems: "center",
    marginTop: 16
  },
  titleTextStyle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "circular-bold",
    color: "#303030"
  },
  buttonViewstyle: {
    alignItems: "center",
    marginBottom: 40
  }
});
export default styles;
