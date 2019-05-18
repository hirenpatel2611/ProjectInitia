import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";

const BookingList = ({ vendor }) => {
  return (
    <View
      style={{
        margin: 5,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        justifyContent: "space-around"
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
            fontFamily: "circular-bold"
          }}
        >
          {vendor.first_name}
        </Text>
        <Text
          style={{
            fontFamily: "circular-bold",
            fontSize: 14,
            color: "#4A4A4A",
            fontFamily: "circular-book"
          }}
        >
          Distance
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10
        }}
      >
        <Text
          style={{
            fontFamily: "circular-bold",
            fontSize: 14,
            color: "#4A4A4A",
            fontFamily: "circular-book"
          }}
        >
          {vendor.mobile}
        </Text>
        <Text
          style={{
            fontFamily: "circular-bold",
            fontSize: 14,
            color: "#4A4A4A",
            fontFamily: "circular-book"
          }}
        >
          {vendor.distance}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <Text
          style={{
            fontFamily: "circular-bold",
            fontSize: 14,
            color: "#7960FF",
            fontFamily: "circular-book"
          }}
        >
          {vendor.email}
        </Text>

        <TouchableOpacity>
          <View
            style={{
              width: 70,
              height: 20,
              backgroundColor: "#7960FF",
              alignItems: "center",
              borderRadius: 3
            }}
          >
            <Text
              style={{
                color: "white"
              }}
            >
              Book
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { BookingList };
