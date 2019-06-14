import React, { Component } from "react";
import { View, Text, Button, Container, Content, Badge } from "native-base";
import { StyleSheet, Alert } from "react-native";
import themeStyle from "../../styles/theme.style";
import { ICoinInfo } from "./ICoinInfo";
import { connect } from "react-redux";
import striptags from "striptags";
import { CoinList } from "../Home/CoinList";
import dateformat from "dateformat";
import AsyncStorage from "@react-native-community/async-storage";

interface Props {
  coin: ICoinInfo;
};
interface State {
  exists: boolean;
}
class CoinInfoList extends Component<Props, State> {

  state = {
    exists: false,
  }

  onDescriptionPressed() {
    const title: string = "What is " + this.props.coin.name + "?";
    const desc: string = striptags(this.props.coin.description.en);
    Alert.alert(title, desc);
  }

  get lastUpdated() {
    const strLastUpdated: string = this.props.coin.market_data.last_updated;
    return dateformat(strLastUpdated, "mediumDate") + " at " + dateformat(strLastUpdated, "shortTime");
  }

  async removeFromStorage() {
    const strFavs: any = await AsyncStorage.getItem("favourites");
    const favs: Array<string> = JSON.parse(strFavs);
    const newFavs: Array<string> = favs.filter(fav => fav !== this.props.coin.name);
    const strNewFavs: string = JSON.stringify(newFavs);
    await AsyncStorage.setItem("favourites", strNewFavs);
    await this.refreshInFavouritesState();
  }

  async addToStorage() {
    const strFavs: any = await AsyncStorage.getItem("favourites");
    const favs: Array<string> = JSON.parse(strFavs);
    favs.push(this.props.coin.name);
    const newFavs: Array<string> = favs;
    const strNewFavs: string = JSON.stringify(newFavs);
    await AsyncStorage.setItem("favourites", strNewFavs);
    await this.refreshInFavouritesState();
  }

  async refreshInFavouritesState() {
    // check if in favourites and set
    const strFavs: any = await AsyncStorage.getItem("favourites");
    const favs: Array<string> = JSON.parse(strFavs);
    const _exists: Array<string> = favs.filter(fav => fav === this.props.coin.name);
    let exists = _exists.length > 0;
    this.setState({ exists: exists });
  }

  render() {

    this.refreshInFavouritesState();
    

    return (
      <View style={styles.container}>

        <Content style={styles.listContent}>

          <View style={{ ...styles.listItem, display: "flex", flexDirection: "row", padding: 0, }}>

            <View style={{...styles.listItem, borderBottomWidth: 0}}>
              <Button style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: themeStyle.ICON_COLOUR, }} onPress={() => this.onDescriptionPressed()}>
                <Text style={{ textAlign: "center", color: themeStyle.BACKGROUND_COLOUR, }}>What is {this.props.coin.name}?</Text>
              </Button>
            </View>


            {this.state.exists ?
            <View style={{...styles.listItem, borderBottomWidth: 0}}>
              <Button
                onPress={() => this.removeFromStorage()}
                style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#333', }}>
                <Text style={{ textAlign: "center", color: themeStyle.TEXT_COLOUR }}>Remove from portfolio</Text>
              </Button>
            </View>
            :
            <View style={{...styles.listItem, borderBottomWidth: 0}}>
              <Button
                onPress={() => this.addToStorage()}
                style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#333', }}>
                <Text style={{ textAlign: "center", color: themeStyle.TEXT_COLOUR }}>Add to portfolio</Text>
              </Button>
            </View>
            }

          </View>

          <View style={styles.listItem}>
            <Text style={styles.listItemKey}>Market cap rank</Text>
            <Text style={styles.listItemValue}>{this.props.coin.market_cap_rank}</Text>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.listItemKey}>Current price</Text>
            <Text style={styles.listItemValue}>{CoinList.getFormattedPrice(this.props.coin.market_data.current_price.usd)}</Text>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.listItemKey}>Market cap</Text>
            <Text style={styles.listItemValue}>${this.props.coin.market_data.market_cap.usd}</Text>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.listItemKey}>Total volume</Text>
            <Text style={styles.listItemValue}>{this.props.coin.market_data.total_volume[this.props.coin.symbol]} {this.props.coin.symbol.toUpperCase()}</Text>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.listItemKey}>Circulating supply</Text>
            <Text style={styles.listItemValue}>{this.props.coin.market_data.circulating_supply} {this.props.coin.symbol.toUpperCase()}</Text>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.listItemKey}>Last updated</Text>
            <Text style={styles.listItemValue}>{this.lastUpdated}</Text>
          </View>
          
          <View style={styles.listItem}>
            <Text style={styles.listItemKey}>24 hours change</Text>
            <View style={styles.listItemValue}>
              <Badge 
                success={Number(this.props.coin.market_data.price_change_percentage_24h) > 0}
                danger={Number(this.props.coin.market_data.price_change_percentage_24h) <= 0}
                style={{ alignSelf: 'flex-end' }}>
                <Text>{ Number(this.props.coin.market_data.price_change_percentage_24h).toFixed(2) }%</Text>
              </Badge>
            </View>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.listItemKey}>7 days change</Text>
            <View style={styles.listItemValue}>
              <Badge 
                success={Number(this.props.coin.market_data.price_change_percentage_7d) > 0}
                danger={Number(this.props.coin.market_data.price_change_percentage_7d) <= 0}
                style={{ alignSelf: 'flex-end' }}>
                <Text>{ Number(this.props.coin.market_data.price_change_percentage_7d).toFixed(2) }%</Text>
              </Badge>
            </View>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.listItemKey}>14 days change</Text>
            <View style={styles.listItemValue}>
              <Badge 
                success={Number(this.props.coin.market_data.price_change_percentage_14d) > 0}
                danger={Number(this.props.coin.market_data.price_change_percentage_14d) <= 0}
                style={{ alignSelf: 'flex-end' }}>
                <Text>{ Number(this.props.coin.market_data.price_change_percentage_14d).toFixed(2) }%</Text>
              </Badge>
            </View>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.listItemKey}>30 days change</Text>
            <View style={styles.listItemValue}>
              <Badge 
                success={Number(this.props.coin.market_data.price_change_percentage_30d) > 0}
                danger={Number(this.props.coin.market_data.price_change_percentage_30d) <= 0}
                style={{ alignSelf: 'flex-end' }}>
                <Text>{ Number(this.props.coin.market_data.price_change_percentage_30d).toFixed(2) }%</Text>
              </Badge>
            </View>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.listItemKey}>60 days change</Text>
            <View style={styles.listItemValue}>
              <Badge 
                success={Number(this.props.coin.market_data.price_change_percentage_60d) > 0}
                danger={Number(this.props.coin.market_data.price_change_percentage_60d) <= 0}
                style={{ alignSelf: 'flex-end' }}>
                <Text>{ Number(this.props.coin.market_data.price_change_percentage_60d).toFixed(2) }%</Text>
              </Badge>
            </View>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.listItemKey}>200 days change</Text>
            <View style={styles.listItemValue}>
              <Badge 
                success={Number(this.props.coin.market_data.price_change_percentage_200d) > 0}
                danger={Number(this.props.coin.market_data.price_change_percentage_200d) <= 0}
                style={{ alignSelf: 'flex-end' }}>
                <Text>{ Number(this.props.coin.market_data.price_change_percentage_200d).toFixed(2) }%</Text>
              </Badge>
            </View>
          </View>

          <View style={styles.listItem}>
            <Text style={styles.listItemKey}>1 year change</Text>
            <View style={styles.listItemValue}>
              <Badge 
                success={Number(this.props.coin.market_data.price_change_percentage_1y) > 0}
                danger={Number(this.props.coin.market_data.price_change_percentage_1y) <= 0}
                style={{ alignSelf: 'flex-end' }}>
                <Text>{ Number(this.props.coin.market_data.price_change_percentage_1y).toFixed(2) }%</Text>
              </Badge>
            </View>
          </View>
          

        </Content>

      </View>
    )
  }

}

const styles = StyleSheet.create({

  container: {
    backgroundColor: themeStyle.BACKGROUND_COLOUR,
    padding: 10,
    flex: 1,
  },

  text: {
    color: themeStyle.TEXT_COLOUR,
  },

  listContent: {
    flex: 1
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: themeStyle.TEXT_COLOUR,
  },
  listItemKey: {
    flex: 1,
    textAlign: 'left',
    color: themeStyle.TEXT_COLOUR,
  },
  listItemValue: {
    flex: 1,
    textAlign: "right",
    color: themeStyle.TEXT_COLOUR,
  }

});

function mapStateToProps(state: any) {
  return {
    coin: state.coin.selectedCoinInfo,
  }
}

export default connect(mapStateToProps)(CoinInfoList);