import React, { Component, ComponentClass } from "react";
import { StyleSheet, ScrollView, FlatList, Image, ListView, SectionList, SectionListData, Dimensions, Alert } from "react-native";
import { View, Text } from "native-base";
import themeStyle from "../../styles/theme.style";
import { connect } from "react-redux";
import currencyFormatter from "currency-formatter";
import {RecyclerListView, LayoutProvider, DataProvider} from "recyclerlistview";
import Orientation from "react-native-orientation";
import { TouchableOpacity } from "react-native-gesture-handler";

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 0,
  HALF_RIGHT: 2,
}

export interface ICoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  current_price: number;
};

interface Props {
  coins?: ICoin[]|any;
  search?: string;
  searchCoin?: (searchText: string) => void,
};
class CoinList extends Component<Props> {

  private SCREEN_WIDTH: number = Dimensions.get("window").width;

  private dataProvider = new DataProvider((r1, r2) => r1 !== r2);
  private layoutProvider: any;

  constructor(props: any) {
    super(props);
    Orientation.addOrientationListener(this._orientationDidChange);
    Orientation.lockToPortrait();
    this.layoutProvider = new LayoutProvider(
      index => {
        return ViewTypes.FULL;
      },
      (type, dim) => {
        switch (type) {
          case ViewTypes.FULL:
            dim.width = this.SCREEN_WIDTH;
            dim.height = 75;
            break;
          default:
            dim.width = 0;
            dim.height = 0;
            break;
        }
      }
    );
    this.renderItem = this.renderItem.bind(this);
  }

  render() {
    return (
      <View style={styles.coinList}>
        { this.props.coins.length > 0 ?
        <View style={{ flex: 1, }}>
          <View style={{ flexDirection: 'row', padding: 10, backgroundColor: themeStyle.BACKGROUND_COLOUR, }}>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-start', marginLeft: 15 }}>
              <Text style={{ fontFamily: themeStyle.FONT_DEFAULT, fontSize: themeStyle.FONT_SIZE_DEFAULT, color: themeStyle.TEXT_COLOUR }}>Name</Text>
            </View>
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end', marginRight: 15 }}>
              <Text style={{ marginRight: 30, fontFamily: themeStyle.FONT_DEFAULT, fontSize: themeStyle.FONT_SIZE_DEFAULT, color: themeStyle.TEXT_COLOUR }}>Price</Text>
              <Text style={{ fontFamily: themeStyle.FONT_DEFAULT, fontSize: themeStyle.FONT_SIZE_DEFAULT, color: themeStyle.TEXT_COLOUR }}>24H</Text>
            </View>
          </View>
          <RecyclerListView
            layoutProvider={this.layoutProvider}
            dataProvider={this.dataProvider.cloneWithRows(this.props.coins)}
            rowRenderer={this.renderItem} />
        </View>
        :
        this.props.search === "" ?
        <View style={styles.noCoins}>
          <Text style={styles.text}>Loading coins...</Text>
        </View>
        : 
        <View style={styles.noCoins}>
          <Text style={styles.text}>No results found.</Text>
        </View>
        }
      </View>
    )
  }

  _orientationDidChange(orientation: string) {
    this.SCREEN_WIDTH = Dimensions.get("window").width;
  }

  private getFormattedPrice(coin: ICoin): string {
    const _price = coin.current_price;
    const price = _price < 0.1 ? _price < 0.01 ? _price.toFixed(6) : _price.toFixed(4) : _price.toFixed(2)
    const currencyInfo = currencyFormatter.findCurrency("USD");
    return currencyInfo.symbolOnLeft ? `${currencyInfo.symbol}${price}` : `${price}${currencyInfo.symbol}`
  }

  private getPercentColour(coin: ICoin): string {
    return coin.price_change_percentage_24h >= 0 ? themeStyle.ACCENT_COLOUR : themeStyle.DANGER_COLOUR;
  }

  onPressItem(item: ICoin) {
    Alert.alert(item.name, "You pressed on " + item.name);
  }

  private renderItem(type: any, data: any) {

    const item: ICoin = data;

    if (type === ViewTypes.FULL) {
      return (
        <TouchableOpacity onPress={() => this.onPressItem(item)}>
        <View style={styles.listItem}>
          <View style={styles.listItemLeft}>
            <Image source={{ uri: item.image }} style={styles.icon} />
            <Text style={styles.text}>
              { item.name }
            </Text>
          </View>
          <View style={{ ...styles.listItemRight,}}>
            <Text style={{ ...styles.price, ...styles.text}}>
              { this.getFormattedPrice(item) }
            </Text>
            <Text style={{ ...styles.percent, ...styles.text, color: this.getPercentColour(item) }}>
              { item.price_change_percentage_24h.toFixed(2) }%
            </Text>
          </View>
        </View>
        </TouchableOpacity>
      );
    }
    else return null;
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyle.BACKGROUND_COLOUR
  },
  text: {
    color: themeStyle.TEXT_COLOUR,
    fontFamily: themeStyle.FONT_DEFAULT,
    marginLeft: 10,
  },
  coinList: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .1)',
    paddingBottom: 3,
  },
  listItem: {
    flexDirection: 'row',
    padding: 20,
    marginTop: 5,
    backgroundColor: themeStyle.BACKGROUND_COLOUR,
  },
  listItemLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    width: 30,
    height: 30,
  },
  price: {

  },
  percent: {
    
  },
  noCoins: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

function mapStateToProps(state: any): any {
  
  const search: string = state.coin.searchText;
  const coins: ICoin[] = state.coin.coins;

  return {
    coins: coins.filter(coin => search === "" ? coin : coin.name.toLowerCase().indexOf(search.toLowerCase()) > -1),
    search: search,
  }
}

export default connect(mapStateToProps)(CoinList);