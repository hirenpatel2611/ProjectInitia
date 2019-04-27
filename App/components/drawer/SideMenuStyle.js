import {StyleSheet} from 'react-native';

var styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:10
  },
  container: {
    padding:0,
    height: 35,
    overflow: 'hidden',
    alignItems:'center',
    justifyContent: 'center',
    borderBottomWidth:1,
    borderColor:'#7960FF',

  },
  textStyle: {
    fontSize: 15,
    fontWeight:'300',
    fontFamily:'circular-book',
    color:'black'
  },

  profileImageStyle: {
    backgroundColor: 'white',
    height: 60,
    width: 60,
    borderRadius: 30,
    alignSelf: 'center'
  },
  textViewStyle:{
    justifyContent:'space-around',
    flexDirection:'column',
    flex:0.8
  },
  userInfoTextStyle:{
  color:'white'

},
imageViewstyle: {
  flexDirection: "row",
  justifyContent: "center",
  marginTop: 15
},
imageMechanic: {
  width: 40,
  height: 44,


},
image2: {
  width: 20,
  height: 25
},
image3: {
  width: 30,
  height: 25,
  marginRight: 15,
  marginLeft: 15
},
image4: {
  width: 25,
  height: 25
},


});

export default styles;
