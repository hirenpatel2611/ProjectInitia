import React, {Component} from 'react';
import {Text,
        View,
        Image,
        Dimensions,
        TouchableOpacity
      } from 'react-native';
import {MECHANIC} from "../images";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

const List = () => {
  return(
    <View style={{width:ScreenWidth, borderBottomWidth:1}}>
      <TouchableOpacity>
          <View style={styles.containerView}>
            <View style={styles.imageViewStyle}>
                <Image
                  style={styles.imageStyle}
                  source={MECHANIC}
                />
              </View>
            <Text style={styles.nameStyle}>Mechanic Name</Text>
            <Text style={styles.distanceStyle}>5 km</Text>
          </View>
      </TouchableOpacity>
    </View>
  );
};

const styles ={
  containerView:{

    borderColor:'#919191',
    flexDirection:'row',
    margin:10,
  },
  nameStyle:{
    fontSize:18,
    paddingLeft:10,
    paddingTop:20
  },
  distanceStyle:{
    paddingLeft:20,
    color:'blue',
    fontSize:18,
    position:'relative',
    paddingTop:20
  },
  imageStyle:{
    width: 25,
    height: 25,
    paddingLeft:20,
  },
  imageViewStyle:{
    alignItems: "center",
    padding: 5,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 60,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
    shadowOpacity: 1.0

  }
};
export default List;
