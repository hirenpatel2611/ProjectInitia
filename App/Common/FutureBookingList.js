import React, {Component} from 'react';
import {Text,View,TouchableOpacity,Dimensions} from 'react-native';
import {getBookingApprove,isBookingCancle} from '../actions/Vendors';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

const FutureBookingList = ({customer,
                            bookstatus,
                            onPressApprove,
                            opacityApprove,
                            disabledApprove,
                            opacityCancle,
                            disabledCancle,
                            onPressCancle})=>{
  return(
    <View
      style={{
        margin: 5,
        backgroundColor: "white",
        padding: 15,
        borderRadius: 4,
        justifyContent:'space-around',
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        shadowOpacity: 0.5
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
      <Text
          style={{
            fontFamily: "circular-bold",
            fontSize: 20,
            color: "#4A4A4A",
            fontFamily:'circular-bold'
          }}
        >
         {customer.first_name}
        </Text>
        <Text
            style={{
              fontFamily: "circular-bold",
              fontSize: 20,
              color: "#4A4A4A",
              fontFamily:'circular-bold'
            }}
          >

          </Text>
        <Text
          style={{
            fontFamily: "circular-bold",
            fontSize: 16,
            color: "#4A4A4A",
            fontFamily:'circular-book'
          }}
        >
          Distance
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop:10
        }}
      >
        <Text
          style={{
            fontFamily: "circular-bold",
            fontSize: 16,
            color: "#4A4A4A",
            fontFamily:'circular-book'
          }}
        >
          {customer.mobile}
        </Text>
        <Text
          style={{
            fontFamily: "circular-bold",
            fontSize: 16,
            color: "#4A4A4A",
            fontFamily:'circular-book'
          }}
        >
          {customer.OTP}
        </Text>

        <Text
          style={{
            fontFamily: "circular-bold",
            fontSize: 16,
            color: "#7960FF",
            fontFamily:'circular-book'
          }}
        >
          {customer.distance}
        </Text>
        <Text
          style={{
            fontFamily: "circular-bold",
            fontSize: 14,
            color:'#7960FF',
          }}
        >
          Status :{bookstatus}
        </Text>
      </View>
      <View style={{
        flexDirection:'row',
        justifyContent: "space-between",
        marginTop:10
      }}
      >
      <Text
        style={{
          fontSize: 14,
          color:'#7960FF',
          fontFamily:'circular-book'
        }}
      >
        {customer.email}
      </Text>

      <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
          width:0.45*ScreenWidth,
      }}
      >
      <TouchableOpacity
      style={{alignSelf:'flex-end',opacity:opacityApprove}}
      disabled={disabledApprove}
      onPress={onPressApprove}
      >
        <View
        style={{
          width:80,
          height:28,
          backgroundColor:'#4EA352',
          alignItems:'center',
          justifyContent:'center',
          borderRadius:3
        }}

        >
          <Text style={{
            color:'white'
          }}>
          Approve
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
      style={{alignSelf:'flex-end',opacity:opacityCancle}}
      disabled={disabledCancle}
      onPress={onPressCancle}
      >
        <View
        style={{
          width:80,
          height:28,
          backgroundColor:'#D35400',
          alignItems:'center',
          justifyContent:'center',
          borderRadius:3
        }}

        >
          <Text style={{
            color:'white'
          }}>
          Cancel
          </Text>
        </View>
      </TouchableOpacity>
      </View>
      </View>
    </View>
  )
}

export {FutureBookingList};
