import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native'
import { Container } from 'native-base'
import { observer, inject } from 'mobx-react'
import coinStore from '../../mobx/coinStore'
import ColumnLabels from './ColumnLabels'
import currencyFormatter from 'currency-formatter'


@inject('styles')
@observer
class CoinListItem extends React.Component {

  onCoinPress() {
    coinStore.selected_coin = this.props.coin
    this.props.navigation.navigate('CoinScreen')
  }

  onCoinLongPressed() {
    if (coinStore.favourites_enabled) {
      coinStore.delete_favourite(this.props.coin.name)
    }
    else {
      coinStore.add_favourite(this.props.coin.name)
    }
  }

  getFormattedPrice() {
    let _price = this.props.coin.current_price
    let price = _price < 0.1 ? _price < 0.01 ? _price.toFixed(6) : _price.toFixed(4) : _price.toFixed(2)
    let currencyInfo = currencyFormatter.findCurrency(coinStore.currency.toUpperCase())
    return currencyInfo.symbolOnLeft ? `${currencyInfo.symbol}${price}` : `${price}${currencyInfo.symbol}`
  }

  render() {

    let percent_colour = this.props.coin.price_change_percentage_24h >= 0 ? this.props.styles.accentMint : this.props.styles.accentOrange

    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={this.onCoinPress.bind(this)}
        onLongPress={this.onCoinLongPressed.bind(this)}>
        
        <View style={{
            backgroundColor: this.props.styles.backgroundColour,
            flex: 1,
            display: 'flex',
            flexDirection: 'row',
            margin: 5,
            marginTop: 2.5,
            marginBottom: 2.5,
            padding: 10
          }}>

          <View style={{ flex: 1, alignItems: 'flex-start', flexDirection: 'row', alignItems: 'center' }} >
            <Image source={{ uri: this.props.coin.image }} style={{ width: 30, height: 30 }} />
            <Text style={{ fontSize: 16, fontFamily: this.props.styles.globalFont, marginLeft: 5, color: '#CCC' }}>{ this.props.coin.name } / { String(this.props.coin.symbol).toUpperCase() }</Text>
          </View>

          <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={{ fontSize: 16, fontFamily: this.props.styles.globalFont, flex: 1, color: this.props.styles.textColour, textAlign: 'right' }}>
              { this.getFormattedPrice() }
            </Text>
            <Text style={{ fontSize: 16, fontFamily: this.props.styles.globalFont, flex: 1, color: percent_colour, textAlign: 'right' }}>{ Number(this.props.coin.price_change_percentage_24h).toFixed(2) }%</Text>
          </View>

        </View>

      </TouchableOpacity>
    )
  }

}


@inject('styles')
@observer
class TopList extends React.Component {

  async componentWillMount() {
    await coinStore.get_top_coins()
  }

  async onCoinsRefresh() {
    await coinStore.get_top_coins()
  }

  render() {

    return (
      <Container style={{ flex: 1, backgroundColor: 'transparent' }}>

        <View style={{ flex: 1 }}>
          
          <ColumnLabels />

          { coinStore.show_coins ? <View style={{flex: 1}}>

            { coinStore.filtered_coins.length > 0 ?
              <FlatList
                refreshing={coinStore.coins_refreshing}
                onRefresh={this.onCoinsRefresh.bind(this)}
                keyExtractor={(item, index) => index.toString()}
                data={coinStore.filtered_coins}
                renderItem={({ item }) => <CoinListItem navigation={this.props.navigation} coin={item} />} />
              : null }

            { coinStore.filtered_coins.length < 1 && coinStore.favourites_enabled ? 
              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}> 
                <Text style={{ color: this.props.styles.textColour }}>No favourite coins found :(</Text>
              </View>
              : null }

              { coinStore.filtered_coins.length < 1 && !coinStore.favourites_enabled ? 
              <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}> 
                <Text style={{ color: this.props.styles.textColour }}>Loading coins...</Text>
              </View>
              : null }
            </View>

          : null }
            
        </View>

      </Container>
    )
  }

}

export default TopList