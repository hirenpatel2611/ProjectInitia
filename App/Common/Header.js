import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

const Header = (props)=>{
  return(
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles ={
  textStyle :{
    fontSize:16,
    padding:10,
    fontWeight:'bold'
  },
  viewStyle:{
    backgroundColor:'#f8f8f8',
    flexDirection:'row',
    shadowColor:'#000',
    shadowOffset:{width:0, height:2},
    shadowOpacity:0.5,
    elevation:2,
    width:ScreenWidth,
    paddingTop:26,
    position:'relative'
  }
};
export default Header;
