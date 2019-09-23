import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../Common/Header";
import {
  fetchLedgerHistory,
} from "../../actions";

class LedgerHistory extends Component {
  componentDidMount() {
    this.props.fetchLedgerHistory();
  }
  render() {
    return (
      <View>
        <Header headerText="History" />
        <ScrollView style={inStyle.ScrollViewStyle}>
              <FlatList
                data={this.props.ledgerHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View
                    key={item.Booking_id}
                    style={{
                      margin: 5,
                      backgroundColor: "white",
                      padding: 15,
                      borderRadius: 4,
                      justifyContent: "space-around",
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
                          color: "#4A4A4A"
                        }}
                      >
                        {item.Booking_id}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "circular-bold",
                          fontSize: 14,
                          color: "#7960FF"
                        }}
                      >
                        amount :{item.Amount}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10
                      }}>

                      <Text
                        style={{
                          fontFamily: "circular-book",
                          fontSize: 16,
                          color: "#4A4A4A"
                        }}
                      >
                        {item.Date}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "circular-book",
                          fontSize: 14,
                          color: "#4A4A4A"
                        }}
                      >
                        {item.paymentId}
                      </Text>
                    </View>

                  </View>
                )}
              />

        </ScrollView>
      </View>
    );
  }
}
const inStyle = {
  ScrollViewStyle: {
    paddingTop: 7,
    paddingBottom: 20,
    marginBottom: 60,
    paddingRight: 5,
    paddingLeft: 5
  },
};
const mapStateToProps = ({ vendors }) => {
  const {
    ledgerHistory,
  } = vendors;
  return {
    ledgerHistory
  };
};

export default connect(
  mapStateToProps,
  {
    fetchLedgerHistory,
  }
)(LedgerHistory);
