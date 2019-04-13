import {
  StyleSheet,
  Dimensions
} from 'react-native';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

var styles = StyleSheet.create({

  containerStyle: {
    justifyContent: 'space-around',
    flex: 1,
    backgroundColor: '#F5FCFF',
    height:ScreenHeight,
  },
  continueButton: {
      backgroundColor: '#7960FF',
      height: 44,
      width:280,
      borderRadius: 25,
      fontSize:16,
      alignItems: 'center',
      marginBottom:10,
      color: 'white',
    },
  loginButton: {
      backgroundColor: 'transparent',
      height: 44,
      width:280,
      borderRadius: 25,
      borderColor:'#7960FF',
      borderWidth:1,
      alignItems: 'center',
    },
  button_text:{
    color: '#ff0000',
    fontSize:20,
  },
  buttonText: {
    padding: 10,
    fontSize:16,
    fontWeight: 'bold',
    color: 'white'
  },

});
export default styles;
