import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  TouchableHighlight,
  Slider,
  StyleSheet,
  Platform,
  TextInput,
  AsyncStorage,
  ScrollView,
  Modal
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Dropdown } from 'react-native-material-dropdown';
import styles from "./vendorStyle";
import Header from "../../Common/Header";
import {
  getUserLocationSuccess,
  loadVendorProfile,
  updateVendorFullName,
  updateVendorAddress,
  updateVendorEmail,
  updateVendorProfile,
  upadteVendorProfileImage,
  updateVendorWorkshopName,
  updateVenderProfileVehicleBool,
  updateVendorProfileCarBool,
  updateVendorProfileHeavyVehicleBool,
  updateVendorProfileTowingBool,
  updateVendorProfileTyreBool,
  updateVendorStateAndCode,
  onPressHelp,
  onCloseHelpModal,
  updateDocument,
  getUserData,
  onDeleteVendorDocument
} from "../../actions";
import { USER2, PENCIL, MOTORCYCLE, CAR, HEAVY_VEHICLE,TOWING,CALL } from "../../images";
import { Asset } from "expo";
import * as Constants from "expo-constants";
import * as OpenAnything from 'react-native-openanything';
import call from "react-native-phone-call";
import * as Permissions from "expo-permissions";
import FlashMessage from "react-native-flash-message";
import {stateAndTin} from '../../config'

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

class Profile extends Component {
  componentWillMount() {
    this.props.getUserData()
    this.getPermissionAsync();
    this.props.loadVendorProfile()
  }

  calltocutomer(mobileno) {
    const args = {
      number:'+919158797607',
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    call(args).catch(console.error);
    this.props.onCloseHelpModal();
  }

  mailTo(){
    OpenAnything.Email('help.partner@velway.in')
        this.props.onCloseHelpModal();
  }

  getPermissionAsync = async () => {
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  renderDocument() {
    arr = this.props.documentVendorUri.map(documentUri => {
      return (
        <View
          key={documentUri}
          style={{ width: 0.1 * ScreenHeight, margin: 0.009 * ScreenHeight }}
        >
          <Image
            style={{
              width: 0.1 * ScreenHeight,
              height: 0.1 * ScreenHeight,
              resizeMode: "contain",
              borderRadius: 10,
              position: "absolute"
            }}
            source={{ uri: documentUri }}
          />
          <TouchableOpacity
            style={{
              height: 17,
              width: 17,
              borderRadius: 10,
              backgroundColor: "#FFFFFFFF",
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
              margin: 0.04 * ScreenHeight
            }}
            onPress={() => {
              this.props.onDeleteVendorDocument(documentUri);
            }}
          >
            <Text style={{ color: "#7960FF", fontFamily: "circular-bold" }}>
              X
            </Text>
          </TouchableOpacity>
        </View>
      );
    });
    return arr;
  }

  render() {
    const {
      containerStyle,
      subContainerProfile,
      textInputProfilStyle
    } = styles;
    return (
      <ScrollView style={{opacity:this.props.isHelpModal?0.5:1}}>
        <Header headerText="Profile"
          filterText="Help"
          filterPress={()=>{this.props.onPressHelp()}}
          filterTextStyle={{fontFamily:'circular-bold',
          color:"#7960FF",
          fontSize:16,
          bottom:13}}
        />
        <KeyboardAwareScrollView enableOnAndroid>

          <View style={inStyle.containerStyle}>
            <Image
              style={inStyle.profileImageStyle}
              resizeMode={"cover"}
              source={
                this.props.imageVendorUri
                  ? { uri: this.props.imageVendorUri }
                  : USER2
              }
            />

            <TouchableOpacity
              style={inStyle.touchableOpacityStyle}
              onPress={() => {
                this.props.upadteVendorProfileImage();
              }}
            >
              <Image style={inStyle.imagePencleStyle} source={PENCIL} />
            </TouchableOpacity>
          </View>
          <View style={inStyle.viewSubContainer}>
            <TextInput
            editable={false}
              style={[
                textInputProfilStyle,
                { fontSize: 15, fontFamily: "circular-bold" }
              ]}
              underlineColorAndroid="transparent"
              placeholderTextColor="#9D9D9D"
              placeholder="Workshop Name"
              value={this.props.workshop_nameVendor}
              onChangeText={text => {
                this.props.updateVendorWorkshopName(text);
              }}
            />
            <TextInput
            editable={false}
              style={textInputProfilStyle}
              underlineColorAndroid="transparent"
              placeholderTextColor="#9D9D9D"
              placeholder="Name"
              value={this.props.fullNameVendor}
              onChangeText={text => {
                this.props.updateVendorFullName(text);
              }}
            />

            <View style={{marginLeft: 14,
                          marginTop: 16,
                          marginRight:14,
                          flexDirection:'row',
                          justifyContent:'space-between'}}>
                <Dropdown
                    label='State'
                    value={this.props.addressVendor.value}
                    dropdownOffset={ {top: 0, left: 0} }
                    containerStyle={{width:'65%'}}
                    itemTextStyle={{fontFamily:'circular-book',fontSize:16}}
                    pickerStyle={{height:'50%'}}
                    baseColor='rgba(0, 0, 0,1)'
                    onChangeText={(value,index)=>{
                      this.props.updateVendorStateAndCode(index);
                    }}
                  />
                  <Dropdown
                      label='TIN'
                      value={this.props.addressVendor.code}
                      dropdownOffset={ {top: 0, left: 0} }
                      containerStyle={{width:'30%'}}
                      baseColor='rgba(0, 0, 0,1)'
                      itemTextStyle={{fontFamily:'circular-book',fontSize:16}}
                    />
              </View>
            <TextInput

              style={textInputProfilStyle}
              underlineColorAndroid="transparent"
              placeholderTextColor="#9D9D9D"
              placeholder="Email"
              value={this.props.emailVendor}
              onChangeText={text => {
                this.props.updateVendorEmail(text);
              }}
            />
            <TextInput
              editable={false}
              style={textInputProfilStyle}
              underlineColorAndroid="transparent"
              placeholderTextColor="#9D9D9D"
              placeholder="Mobile"
              value={
                this.props.userData ? this.props.userData.userMobileno : null
              }
            />
          </View>
          <View style={inStyle.viewMechanic}>
            <TouchableHighlight
              activeOpacity={1}
              elevation={5}
              onPress={() => {
                this.props.updateVenderProfileVehicleBool();
              }}
              style={[
                inStyle.buttonMechanic,
                {
                  backgroundColor: this.props.vendorProfileServiceType[0]
                    ? "#7960FF"
                    : "white"
                }
              ]}
            >
              <Image style={inStyle.imageServiceType} source={MOTORCYCLE} />
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={1}
              elevation={5}
              onPress={() => {
                this.props.updateVendorProfileCarBool();
              }}
              style={[
                inStyle.buttonMechanic,
                {
                  backgroundColor: this.props.vendorProfileServiceType[1]
                    ? "#7960FF"
                    : "white"
                }
              ]}
            >
              <Image style={inStyle.imageServiceType} source={CAR} />
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={1}
              elevation={5}
              onPress={() => {
                this.props.updateVendorProfileHeavyVehicleBool();
              }}
              style={[
                inStyle.buttonMechanic,
                {
                  backgroundColor: this.props.vendorProfileServiceType[2]
                    ? "#7960FF"
                    : "white"
                }
              ]}
            >
              <Image style={inStyle.imageServiceType} source={HEAVY_VEHICLE} />
            </TouchableHighlight>
            <TouchableHighlight
              activeOpacity={1}
              elevation={5}
              onPress={() => {
                this.props.updateVendorProfileTowingBool();
              }}
              style={[
                inStyle.buttonMechanic,
                {
                  backgroundColor: this.props.vendorProfileServiceType[3]
                    ? "#7960FF"
                    : "white"
                }
              ]}
            >
              <Image style={inStyle.imageServiceType} source={{uri:'http://ilifenetwork.com/api/web/towing.png'}} />
            </TouchableHighlight>

            <TouchableHighlight
              activeOpacity={1}
              elevation={5}
              onPress={() => {
                this.props.updateVendorProfileTyreBool();
              }}
              style={[
                inStyle.buttonMechanic,
                {
                  backgroundColor: this.props.vendorProfileServiceType[4]
                    ? "#7960FF"
                    : "white"
                }
              ]}
            >
              <Image style={inStyle.imageServiceType} source={{uri:'http://ilifenetwork.com/api/web/tyre.png'}} />
            </TouchableHighlight>
          </View>

{
  console.log(this.props.loadingImageBase64)
}
          <View style={{flexDirection:'row',margin:"2%"}}>
          {this.props.userData.userStatus ==="Pending" ?this.props.loadingImageBase64?<Text style={{margin:5,height:30,marginLeft:"30%",color:"#7960FF"}}>Loading Images...</Text>:this.renderDocument():null}

          </View>
          {this.props.userData.userStatus ==="Pending" ?<TouchableOpacity
            disabled={this.props.documentVendorUri.length === 3 ? true:false}
            underlayColor="white"
            style={{
              backgroundColor: "transparent",
              height: 25,
              width: 0.37 * ScreenWidth,
              borderRadius: 25,
              borderColor: "#7960FF",
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              opacity:this.props.documentVendorUri.length === 3 ? 0.5:1
            }}

            onPress={() => {
              this.props.updateDocument();
            }}
          >
            <Text
              style={{
                fontFamily: "circular-book",
                fontSize: 0.033 * ScreenWidth,
                color: "#7960FF"
              }}
            >
              +Add Documents
            </Text>
          </TouchableOpacity>:null}

          <TouchableHighlight
            onPress={() => {
              this.props.updateVendorProfile();
            }}
            underlayColor="white"
            style={inStyle.continueButton}
          >
            <Text style={inStyle.buttonTextStyle}>
              {this.props.loadingProfileUpdate ? "Loading..." : "Continue"}
            </Text>
          </TouchableHighlight>

        </KeyboardAwareScrollView>
        <Modal
          visible={this.props.isHelpModal}
          onRequestClose={() => {
            console.log("Modal has been closed.");
          }}
          animationType="slide"
          transparent={true}
          opacity={0.5}
          style={inStyle.modalStyle}
        >
        <View style={{
          marginTop: 0.4 * ScreenHeight,
          alignSelf: "center",
          backgroundColor: "#FFFFFF",
          height: 150,
          margin: 15,
          borderRadius: 10,
          paddingBottom: 10,
          paddingRight:5,
          justifyContent: "space-around",
          width:250,
          alignItems:'center',
          borderWidth:1,
          borderColor:"#7960FF"
        }}>
              <Text style={{
                fontSize:17,
                fontFamily:'circular-bold',
                color:"#7960FF",
                alignSelf:'flex-end',
                height: 20,
                width: 20
              }}
              onPress={()=>{
                this.props.onCloseHelpModal()
              }}
              >
              X
              </Text>

            <TouchableOpacity
            style={{flexDirection:'row',width:"48%",top:-10,justifyContent:"space-between"}}
            onPress={()=>{this.mailTo()}}
            >
            <Image

              style={{ height: 20, width: 20 }}
              source={{uri:"http://ilifenetwork.com/api/web/email.png"}}
            />
            <Text style={{
              fontSize:20,
              fontFamily:'circular-bold',
            }}>
            Via Email
            </Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={{
              flexDirection:'row',
              width:"48%",
              bottom:10,
              justifyContent:"space-between",

            }}
            onPress={()=>{this.calltocutomer()}}
            >
            <Image

              style={{ height: 20, width: 20}}
              source={CALL}
            />
            <Text style={{
              fontSize:20,
              fontFamily:'circular-bold',
            }}>
            Via Phone
            </Text>
            </TouchableOpacity>



        </View>
        </Modal>
        <FlashMessage
          position="center"
          style={{
            zIndex: 100,
            backgroundColor: "#7960FF",
            color: "#fff"
          }}
        />
      </ScrollView>
    );
  }
}

const inStyle = {
  containerStyle: {
    borderColor: "#7960FF",
    borderRadius: 60,
    width: 120,
    height: 120,
    alignSelf: "center",
    marginTop: 10,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black"
  },
  profileImageStyle: {
    borderRadius: 60,
    width: 120,
    height: 120,
    alignSelf: "center",
    zIndex: -1,
    position: "absolute"
  },
  touchableOpacityStyle: {
    borderRadius: 15,
    width: 23,
    height: 23,
    alignSelf: "flex-end",
    backgroundColor: "#F5FCFF",
    alignItems: "center",
    justifyContent: "center"
  },
  imagePencleStyle: {
    width: 15,
    height: 15,
    resizeMode: "contain"
  },
  viewSubContainer: {
    marginTop: 0.001 * ScreenHeight,
    height: 0.4 * ScreenHeight,
    justifyContent: "space-around"
  },
  continueButton: {
    marginTop:'2%',
    alignSelf: "center",
    backgroundColor: "#7960FF",
    height: 44,
    width: 0.78 * ScreenWidth,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "center"
  },
  buttonTextStyle: {
    padding: 10,
    fontSize: 18,
    fontFamily: "circular-book",
    color: "white"
  },
  viewMechanic: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",
    width: ScreenWidth
  },
  buttonMechanic: {
    borderRadius: 100,
    alignItems: "center",
    padding: 4,
    borderRadius: 60,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 5,
    shadowOpacity: 1.0
  },
  imageServiceType: {
    width: 50,
    height: 50,
    resizeMode: "contain"
  },
  modalStyle: {
    height: 0.2 * ScreenHeight,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end"
  }
};

const mapStateToProps = ({ user, vendors }) => {
  const {
    onSubmeetProfileVendorForm,
    workshop_nameVendor,
    fullNameVendor,
    addressVendor,
    emailVendor,
    imageVendorUri,
    loadingProfileUpdate,
    vendorProfileServiceType,
    isHelpModal,
    documentVendorUri,
    loadingImageBase64
  } = vendors;
  const { userData } = user;
  return {
    userData,
    onSubmeetProfileVendorForm,
    workshop_nameVendor,
    fullNameVendor,
    addressVendor,
    emailVendor,
    imageVendorUri,
    loadingProfileUpdate,
    vendorProfileServiceType,
    isHelpModal,
    loadingImageBase64,
    documentVendorUri
  };
};

export default connect(
  mapStateToProps,
  {
    getUserLocationSuccess,
    loadVendorProfile,
    updateVendorFullName,
    updateVendorAddress,
    updateVendorEmail,
    updateVendorProfile,
    upadteVendorProfileImage,
    updateVendorWorkshopName,
    updateVenderProfileVehicleBool,
    updateVendorProfileCarBool,
    updateVendorProfileHeavyVehicleBool,
    updateVendorProfileTowingBool,
    updateVendorProfileTyreBool,
    updateVendorStateAndCode,
    onPressHelp,
    onCloseHelpModal,
    updateDocument,
    getUserData,
    onDeleteVendorDocument
  }
)(Profile);
