import React from 'react'
import { AsyncStorage } from 'react-native'
import { Container, Button, Text } from 'native-base'
import { inject, observer } from 'mobx-react'

import Navbar from './Header'
import TopCoinList from './TopCoins'

import coinStore from '../../mobx/coinStore'



@inject('styles')
@observer
class HomeScreen extends React.Component {
  
  async componentWillMount() {
    try {
      let favs_exist = await AsyncStorage.getItem('favourite_coins')
      if (favs_exist == null) {
        await AsyncStorage.setItem('favourite_coins', JSON.stringify([]))
      }
      // render the coins
      coinStore.show_coins = true
      // set the currency
      coinStore.currency = 'usd'
      // initialise favourites_enabled from asyncStorage
      let favourites_enabled = await AsyncStorage.getItem('favourites_enabled')
      // apply the filter depending on result
      if (favourites_enabled === 'true') {
        coinStore.favourites_enabled = true
      }
      // get the top 100 coins
      await coinStore.get_top_coins()
    }
    catch(err) {
      // log any errors
      console.log('error: ' + err.message)
    }
  }

  render() {
    return (
      <Container style={{ backgroundColor: this.props.styles.appContainerBackgroundColour }}>

        <Navbar />

        <TopCoinList navigation={this.props.navigation} />

      </Container>
    )
  }

}

export default HomeScreen