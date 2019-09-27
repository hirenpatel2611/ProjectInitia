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
  async componentDidMount() {
    await this.props.fetchLedgerHistory();
  }
  render() {
    return (
      <View>
        <Header headerText="History" />
        <ScrollView style={inStyle.ScrollViewStyle}>
        {
          console.log(this.props.ledgerHistory)
        }
              {this.props.fetchLedgerHistorySuccess?<FlatList
                data={this.props.ledgerHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View
                    key={item.id}
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
                        {item.id}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "circular-bold",
                          fontSize: 14,
                          color: "#7960FF"
                        }}
                      >
                        amount :{item.amount}
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
                          fontSize: 14,
                          color: "#4A4A4A"
                        }}
                      >
                        {item.updated_at}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "circular-book",
                          fontSize: 12,
                          color: "#4A4A4A"
                        }}
                      >
                        {item.payment_id}
                      </Text>
                    </View>

                  </View>
                )}
              />
              :<Text
              style={{
                fontFamily: "circular-bold",
                alignSelf: "center",
                marginTop:50
              }}
              >No History</Text>}

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
    fetchLedgerHistorySuccess
  } = vendors;
  return {
    ledgerHistory,
    fetchLedgerHistorySuccess
  };
};

export default connect(
  mapStateToProps,
  {
    fetchLedgerHistory,
  }
)(LedgerHistory);
