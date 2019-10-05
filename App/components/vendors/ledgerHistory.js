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
import { Spinner } from "../../Common";
import {fetchLedgerHistory,historyDropdown} from "../../actions";
import {setLedgerHeader,filterHistory,getLedgerHeader} from '../../config';
import { Dropdown } from 'react-native-material-dropdown';

class LedgerHistory extends Component {
  async componentDidMount() {
    await this.props.fetchLedgerHistory();
  }
  render() {
    return (
      <View style={{flexDirection:'column'}}>
        <Header headerText="History" />
        <View style={{
          bottom:10,
          top:3,
          }}>
        <Dropdown
            label='Filter'
            data={filterHistory}
            containerStyle={{marginLeft:16,width:'50%'}}
            itemTextStyle={{fontFamily:'circular-bold',fontSize:16}}
            pickerStyle={{height:'25%'}}
            baseColor={'rgba(0, 0, 0,1)'}
            onChangeText={(value,index)=>{
                this.props.historyDropdown(getLedgerHeader(value));
            }}
          />
        </View>
        <ScrollView style={inStyle.ScrollViewStyle}>

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
                        {setLedgerHeader(item.payment_id).header}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "circular-bold",
                          fontSize: 16,
                          color: setLedgerHeader(item.payment_id).type === 'dr'?'#cc0000':"green"
                        }}
                      >
                        Pts {item.points}{" "}{setLedgerHeader(item.payment_id).type}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                    <Text
                      style={{
                        fontFamily: "circular-book",
                        fontSize: 14,
                        color: "#4A4A4A"
                      }}
                    >
                    {item.referal_detail?('xxxxxx'+item.referal_detail.slice(-4)):null}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "circular-book",
                        fontSize: 14,
                        color: "#4A4A4A"
                      }}
                    >
                    {setLedgerHeader(item.payment_id).value?("("+item.amount+" "+setLedgerHeader(item.payment_id).value+")"):null}
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
              :this.props.loadingHistory?<View style={{marginTop:"60%"}}><Spinner /></View>:<Text
              style={{
                fontFamily: "circular-bold",
                alignSelf: "center",
                marginTop:"60%"
              }}
              >No Prior Transactions Found</Text>

            }

        </ScrollView>
      </View>
    );
  }
}
const inStyle = {
  ScrollViewStyle: {
    top:5,
    paddingBottom: 160,
    marginBottom: 190,
    paddingRight: 5,
    paddingLeft: 5,
  },
};
const mapStateToProps = ({ vendors }) => {
  const {
    ledgerHistory,
    fetchLedgerHistorySuccess,
    loadingHistory
  } = vendors;
  return {
    ledgerHistory,
    fetchLedgerHistorySuccess,
    loadingHistory
  };
};

export default connect(
  mapStateToProps,
  {
    fetchLedgerHistory,
    historyDropdown
  }
)(LedgerHistory);
