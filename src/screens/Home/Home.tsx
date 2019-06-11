import React, { Component } from "react";
import { StyleSheet, ScrollView, FlatList, Image } from "react-native";
import { View, Text } from "native-base";
import themeStyle from "../../styles/theme.style";
import { ICoinDispatch, populateTopCoins } from "../../actions/coinActions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import currencyFormatter from "currency-formatter";

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
  coins: ICoin[];
};
class HomeScreen extends Component<Props & ICoinDispatch> {

  render() {
    return (
      <View style={styles.container}>

        <View style={{ flexDirection: 'row', padding: 20 }}>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-start', marginLeft: 15 }}>
            <Text style={{ fontFamily: themeStyle.FONT_DEFAULT, fontSize: themeStyle.FONT_SIZE_DEFAULT, color: themeStyle.TEXT_COLOUR }}>Name</Text>
          </View>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end', marginRight: 15 }}>
            <Text style={{ marginRight: 30, fontFamily: themeStyle.FONT_DEFAULT, fontSize: themeStyle.FONT_SIZE_DEFAULT, color: themeStyle.TEXT_COLOUR }}>Price</Text>
            <Text style={{ fontFamily: themeStyle.FONT_DEFAULT, fontSize: themeStyle.FONT_SIZE_DEFAULT, color: themeStyle.TEXT_COLOUR }}>24H</Text>
          </View>
        </View>
        
        <ScrollView style={styles.coinList}>

          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.props.coins}
            renderItem={({ item }) => (
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
            )}
            />

        </ScrollView>

      </View>
    )
  }

  componentDidMount() {
    this.props.populateTopCoins();
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
    backgroundColor: 'rgba(0, 0, 0, .1)',
  },
  listItem: {
    flexDirection: 'row',
    margin: 5,
    marginBottom: 0,
    padding: 20,
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
    
  }
});

function mapStateToProps(state: any) {
  return {
    coins: state.coin.coins,
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    populateTopCoins: () => dispatch(populateTopCoins()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);