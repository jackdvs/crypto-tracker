import React, { Component } from 'react'
import { Alert } from 'react-native'
import { Container, Text, Content, View, Button, Badge } from 'native-base'
import { inject, observer } from 'mobx-react'
import axios from 'axios'
import CoinScreenHeader from './Header'

import formatCurrency from 'currency-formatter'
import df from 'dateformat'
import striptags from 'striptags'

import coinStore from '../../mobx/coinStore'

@inject('styles')
@observer
export default class CoinScreen extends Component {

  state = {
    coinData: null
  }

  styles = {
    listContent: {
      flex: 1
    },
    listItem: {
      flex: 1,
      flexDirection: 'row',
      padding: 2,
      borderBottomWidth: 1,
      borderBottomColor: this.props.styles.textColour
    },
    listItemKey: {
      flex: 1,
      textAlign: 'left',
      color: this.props.styles.textColour
    },
    listItemValue: {
      flex: 1,
      textAlign: 'right',
      color: this.props.styles.textColour
    }
  }

  getFormattedPrice(number) {
    let _price = number 
    let price = _price < 0.1 ? _price < 0.01 ? _price.toFixed(6) : _price.toFixed(4) : _price.toFixed(2)
    let currencyInfo = formatCurrency.findCurrency(coinStore.currency.toUpperCase())
    return currencyInfo.symbolOnLeft ? `${currencyInfo.symbol}${price}` : `${price}${currencyInfo.symbol}`
  }

  componentDidMount() {
    axios.get(`https://api.coingecko.com/api/v3/coins/${coinStore.selected_coin.id}?localization=en&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
    .then(res => {
      this.setState({ coinData: res.data })
    })
    .catch(err => {
      console.log('error: ' + err.message)
    })
  }

  render() {

    let exists = coinStore.favourite_coins.filter(favourite => favourite === coinStore.selected_coin.name).length > 0

    return (
      <Container style={{ backgroundColor: this.props.styles.appContainerBackgroundColour }}>

        <CoinScreenHeader navigation={this.props.navigation} />
        
          
        { this.state.coinData != null ?
        
        <Content>

          <Content style={this.styles.listContent}>
            <View style={this.styles.listItem}>
              <Text style={this.styles.listItemKey}>Market cap rank</Text><Text style={this.styles.listItemValue}>{ this.state.coinData.market_cap_rank }</Text>
            </View>
            <View style={this.styles.listItem}>
              <Text style={this.styles.listItemKey}>Current price</Text><Text style={this.styles.listItemValue}>{ this.getFormattedPrice(this.state.coinData.market_data.current_price[coinStore.currency]) }</Text>
            </View>
            <View style={this.styles.listItem}>
              <Text style={this.styles.listItemKey}>Market cap</Text><Text style={this.styles.listItemValue}>{ formatCurrency.format(this.state.coinData.market_data.market_cap[coinStore.currency], { code: coinStore.currency.toUpperCase() }) }</Text>
            </View>
            <View style={this.styles.listItem}>
              <Text style={this.styles.listItemKey}>Total volume</Text><Text style={this.styles.listItemValue}>{ Number(this.state.coinData.market_data.total_volume[coinStore.currency]).toFixed(2) } { coinStore.selected_coin.symbol.toUpperCase() }</Text>
            </View>
            <View style={this.styles.listItem}>
              <Text style={this.styles.listItemKey}>Circulating supply</Text><Text style={this.styles.listItemValue}>{ Number(this.state.coinData.market_data.circulating_supply).toFixed(2) } { coinStore.selected_coin.symbol.toUpperCase() }</Text>
            </View>
            <View style={this.styles.listItem}>
              <Text style={this.styles.listItemKey}>Last updated</Text><Text style={this.styles.listItemValue}>
              { df(this.state.coinData.last_updated, 'mediumDate') + ' at '  + df(this.state.coinData.last_updated, 'shortTime') }</Text>
            </View>
            <View style={this.styles.listItem}>
              <Text style={this.styles.listItemKey}>24 hours</Text>
              <View style={this.styles.listItemValue}>
                <Badge 
                  success={Number(this.state.coinData.market_data.price_change_percentage_24h) > 0}
                  danger={Number(this.state.coinData.market_data.price_change_percentage_24h) <= 0}
                  style={{ alignSelf: 'flex-end' }}>
                  <Text>{ Number(this.state.coinData.market_data.price_change_percentage_24h).toFixed(2) }%</Text>
                </Badge>
              </View>
            </View>
            <View style={this.styles.listItem}>
              <Text style={this.styles.listItemKey}>7 days</Text>
              <View style={this.styles.listItemValue}>
                <Badge
                  success={Number(this.state.coinData.market_data.price_change_percentage_7d) > 0}
                  danger={Number(this.state.coinData.market_data.price_change_percentage_7d) <= 0} 
                  style={{ alignSelf: 'flex-end' }}>
                  <Text>{ Number(this.state.coinData.market_data.price_change_percentage_7d).toFixed(2) }%</Text>
                </Badge>
              </View>
            </View>
            <View style={this.styles.listItem}>
              <Text style={this.styles.listItemKey}>14 days</Text>
              <View style={this.styles.listItemValue}>
                <Badge
                  success={Number(this.state.coinData.market_data.price_change_percentage_14d) > 0}
                  danger={Number(this.state.coinData.market_data.price_change_percentage_14d) <= 0} 
                  style={{ alignSelf: 'flex-end' }}>
                  <Text>{ Number(this.state.coinData.market_data.price_change_percentage_14d).toFixed(2) }%</Text>
                </Badge>
              </View>
            </View>
            <View style={this.styles.listItem}>
              <Text style={this.styles.listItemKey}>30 days</Text>
              <View style={this.styles.listItemValue}>
                <Badge
                  success={Number(this.state.coinData.market_data.price_change_percentage_30d) > 0}
                  danger={Number(this.state.coinData.market_data.price_change_percentage_30d) <= 0} 
                  style={{ alignSelf: 'flex-end' }}>
                  <Text>{ Number(this.state.coinData.market_data.price_change_percentage_30d).toFixed(2) }%</Text>
                </Badge>
              </View>
            </View>
            <View style={this.styles.listItem}>
              <Text style={this.styles.listItemKey}>60 days</Text>
              <View style={this.styles.listItemValue}>
                <Badge
                  success={Number(this.state.coinData.market_data.price_change_percentage_60d) > 0}
                  danger={Number(this.state.coinData.market_data.price_change_percentage_60d) <= 0} 
                  style={{ alignSelf: 'flex-end' }}>
                  <Text>{ Number(this.state.coinData.market_data.price_change_percentage_60d).toFixed(2) }%</Text>
                </Badge>
              </View>
            </View>
            <View style={this.styles.listItem}>
              <Text style={this.styles.listItemKey}>200 days</Text>
              <View style={this.styles.listItemValue}>
                <Badge
                  success={Number(this.state.coinData.market_data.price_change_percentage_200d) > 0}
                  danger={Number(this.state.coinData.market_data.price_change_percentage_200d) <= 0} 
                  style={{ alignSelf: 'flex-end' }}>
                  <Text>{ Number(this.state.coinData.market_data.price_change_percentage_200d).toFixed(2) }%</Text>
                </Badge>
              </View>
            </View>
            <View style={this.styles.listItem}>
              <Text style={this.styles.listItemKey}>1 year</Text>
              <View style={this.styles.listItemValue}>
                <Badge
                  success={Number(this.state.coinData.market_data.price_change_percentage_1y) > 0}
                  danger={Number(this.state.coinData.market_data.price_change_percentage_1y) <= 0} 
                  style={{ alignSelf: 'flex-end' }}>
                  <Text>{ Number(this.state.coinData.market_data.price_change_percentage_1y).toFixed(2) }%</Text>
                </Badge>
              </View>
            </View>

          </Content>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15, flexWrap: 'wrap' }}>

            <Button style={{ backgroundColor: this.props.styles.accentMint }} onPress={() => Alert.alert(`What is ${coinStore.selected_coin.name}?`, striptags(this.state.coinData.description.en ))}>
              <Text style={{ color: this.props.styles.appContainerBackgroundColour, fontFamily: this.props.styles.globalFont }}>What is { coinStore.selected_coin.name }?</Text>
            </Button>
            
            <Button style={{ backgroundColor: this.props.styles.backgroundColour }}
            onPress={() => {
              if (exists) {
                coinStore.delete_favourite(coinStore.selected_coin.name)
              }
              else{
                coinStore.add_favourite(coinStore.selected_coin.name)
              }
            }}>
              <Text style={{ color: this.props.styles.textColour, fontFamily: this.props.styles.globalFont }}>{ exists ? 'Remove from favourites' : 'Add to favourites' }</Text>
            </Button>

          </View>
          
        </Content>

        : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: this.props.styles.textColour }}>Loading coin data...</Text>
        </View>}

      </Container>
    )
  }

}