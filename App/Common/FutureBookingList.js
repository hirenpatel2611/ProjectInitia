import React, {Component} from 'react';
import {Text,View,TouchableOpacity} from 'react-native';

const FutureBookingList = ({vendor})=>{
  return(
    <View
      style={{
        margin: 5,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        justifyContent:'space-around'
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
            fontSize: 18,
            color: "#4A4A4A",
            fontFamily:'circular-bold'
          }}
        >
         {vendor.first_name}
        </Text>
        <Text
          style={{
            fontFamily: "circular-bold",
            fontSize: 14,
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
            fontSize: 14,
            color: "#4A4A4A",
            fontFamily:'circular-book'
          }}
        >
          Vehicle
        </Text>
        <Text
          style={{
            fontFamily: "circular-bold",
            fontSize: 14,
            color: "#4A4A4A",
            fontFamily:'circular-book'
          }}
        >
          {vendor.distance}
        </Text>
      </View>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between"
      }}
      >
      <Text
        style={{
          fontFamily: "circular-bold",
          fontSize: 14,
          color:'#7960FF',
          fontFamily:'circular-book'
        }}
      >
        {vendor.vehicle}
      </Text>

      <TouchableOpacity>
        <View
        style={{
          width:70,
          height:20,
          backgroundColor:'#4EA352',
          alignItems:'center',
          borderRadius:3
        }}
        >
          <Text style={{
            color:'white'
          }}>
          Book
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity>
        <View
        style={{
          width:70,
          height:20,
          backgroundColor:'#D35400',
          alignItems:'center',
          borderRadius:3
        }}
        >
          <Text style={{
            color:'white'
          }}>
          Book
          </Text>
        </View>
      </TouchableOpacity>

      </View>
    </View>
  )
}

export {FutureBookingList};
