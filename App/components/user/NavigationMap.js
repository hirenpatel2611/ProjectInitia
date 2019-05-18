import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Dimensions,
  Button,
  TouchableHighlight,
  Slider,
  StyleSheet,
  Platform,
  Animated,
  AsyncStorage,
  Modal
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Actions } from "react-native-router-flux";
import { setTimer, setScore } from "../../actions";
import styles from "./usermapsStyle";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Constants, Location, Permissions, IntentLauncherAndroid } from "expo";
import { getUserLocationSuccess,getBookingCancellation,getBookingUpdateUser } from "../../actions";
import { MapViewDirections } from "../../Common";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class NearbyGaraje extends Component {



  render() {
    const { containerStyle } = styles;
    return (
      <View style={containerStyle}>
        <StatusBar backgroundColor="#7960FF" />
        <View
          style={{
            flex: 1
          }}
        >
          <MapView
            style={{
              ...StyleSheet.absoluteFillObject,
              height:0.91 * ScreenHeight
            }}
            provider={PROVIDER_GOOGLE}
            ref={component => (this._map = component)}
          >
          { this.props.mechanicCurrentLocation? <MapView.Marker.Animated
              coordinate={{
                latitude: this.props.mechanicCurrentLocation.message[0].coords
                  .latitude,
                longitude: this.props.mechanicCurrentLocation.message[0].coords
                  .longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            >
              <View style={inStyle.markerView1}>
                <View style={inStyle.markerView2} />
              </View>
            </MapView.Marker.Animated>:null}
        {this.props.mechanicCurrentLocation?  <MapViewDirections
              origin={{
                latitude: this.props.mechanicCurrentLocation.message[0].coords.latitude,
                longitude: this.props.mechanicCurrentLocation.message[0].coords.longitude
              }}
              destination={{
                latitude: this.props.location.coords.latitude,
                longitude: this.props.location.coords.longitude
              }}
              apikey={"AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8"}
              strokeWidth={5}
              strokeColor="#7960FF"
            />:null}
            <MapView.Marker.Animated
              coordinate={{
                latitude: this.props.location.coords.latitude,
                longitude: this.props.location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              }}
            >
              <View style={inStyle.markerView1}>
                <View style={inStyle.markerView2} />
              </View>
            </MapView.Marker.Animated>
          </MapView>

        </View>
        <View style={{ height:0.10 * ScreenHeight,
                       backgroundColor:'white',
                       padding:10,
                       shadowColor: "#000",
                       shadowOffset: { width: 0, height: 2 },
                       shadowOpacity: 0.5,
                       elevation: 2,
                    }}>
        <Text style={{fontSize:16, fontFamily:'circular-book'}}>
         Mechanic is  {this.props.bookingStatusRes?this.props.bookingStatusRes.type:null}
        </Text>
        {this.props.distanceBetweenUserMechanic?
          <TouchableOpacity
            activeOpacity={1}
            underlayColor="white"
            onPress={()=>{
              var sts="completed";
              this.props.getBookingUpdateUser()}}
          >
            <View style={inStyle.modalButtonCancle}>
              {this.props.loadingBookig ? (
                <Text style={inStyle.modalButtonCancleText}>
                  Loading...
                </Text>
              ) : (
                <Text style={inStyle.modalButtonCancleText}>
                  Complete
                </Text>
              )}
            </View>
          </TouchableOpacity>
          :
          <TouchableOpacity
            activeOpacity={1}
            underlayColor="white"
            onPress={() => {
              this.props.getBookingCancellation();
            }}
          >
            <View style={inStyle.modalButtonCancle}>
              {this.props.loadingBookig ? (
                <Text style={inStyle.modalButtonCancleText}>
                  Loading...
                </Text>
              ) : (
                <Text style={inStyle.modalButtonCancleText}>
                  Cancel
                </Text>
              )}
            </View>
          </TouchableOpacity>
        }
        </View>
      </View>
    );
  }
}

const inStyle = {
  markerView1: {
    borderWidth: 1,
    height: 22,
    width: 22,
    borderRadius: 15,
    borderColor: "#7960FF",
    alignItems: "center",
    justifyContent: "center"
  },
  markerView2: {
    backgroundColor: "#7960FF",
    height: 16,
    width: 16,
    borderRadius: 10
  },
  imageVendor: {
    borderRadius: 15,
    borderColor: "#7960FF",
    width: 32,
    height: 32,
    resizeMode: "contain"
  },
  modalButtonCancle: {
    backgroundColor: "#7960FF",
    height: 25,
    width: 0.90 * ScreenWidth,
    borderRadius: 5,
    alignItems: "center",
    margin: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  modalButtonCancleText: {
    fontSize: 14,
    fontFamily: "circular-bold",
    color: "white"
  },
};

const mapStateToProps = ({ usermaps }) => {
  const { location,
        bookData,
        mechanicCurrentLocation,
        bookingStatusRes,
        distanceBetweenUserMechanic} = usermaps;
  return {
    location,
    bookData,
    mechanicCurrentLocation,
    bookingStatusRes,
    distanceBetweenUserMechanic
  };
};

export default connect(
  mapStateToProps,
  {
    getUserLocationSuccess,
    getBookingCancellation,
    getBookingUpdateUser
  }
)(NearbyGaraje);
