import { observable, action } from 'mobx'
import axios from 'axios'
import { AsyncStorage, Alert } from 'react-native'
import { apply_favourites_filter } from '../utils/filters';

class CoinStore {

  @observable show_coins = false
  @observable api_root = 'https://api.coingecko.com/api/v3'
  @observable currency = 'usd'
  @observable app_title = 'Crypto Tracker'
  @observable favourites_enabled = false
  @observable search_enabled = false
  @observable coins_refreshing = false
  @observable filter = ''
  @observable coins = []
  @observable filtered_coins = []
  @observable filter_favourites = []
  @observable favourite_coins = []
  @observable selected_coin = {}

  @action.bound
  async get_top_coins() {
    try {
      this.coins_refreshing = true
      let { data } = await axios.get(`${this.api_root}/coins/markets?vs_currency=${this.currency}&per_page=100&order=market_cap_desc`)
      this.coins = data
      if (coinStore.favourites_enabled) {
        apply_favourites_filter()
      }
      else {
        this.filtered_coins = data
      }
      this.coins_refreshing = false
    }
    catch (err) {
      console.log('error getting coins: ' + err.message)
    }
  }

  @action.bound
  async get_favourites() {
    try {
      let str_favourites = await AsyncStorage.getItem('favourite_coins')
      let json_favourites = JSON.parse(str_favourites) || []
      this.favourite_coins = json_favourites
    }
    catch (err) {
      console.log('error: ' + err.message)
    }
  }
  
  @action.bound
  async set_search_enabled(status) {
    this.search_enabled = status
  }

  @action.bound
  async add_favourite(coin_id) {
    try {

      // fetch favourites
      await this.get_favourites()

      // push to favourites if item is not inside array
      let already_exists = this.favourite_coins.filter(coin => coin === coin_id).length > 0

      if (!already_exists) {

        // append coin to favourites
        this.favourite_coins.push(coin_id)

         // save back to storage
        let str_favourites = JSON.stringify(this.favourite_coins)
        await AsyncStorage.setItem('favourite_coins', str_favourites)

        Alert.alert(`Added to favourites`, `Added ${coin_id.toUpperCase()} to favourites!`)
      }
      else {
        Alert.alert(`Already exists`, `${coin_id.toUpperCase()} already exists in your favourites!`)
      }

    }
    catch (err) {
      console.log('error: ' + err.message)
    }
  }

  @action.bound
  async delete_favourite(coin_id) {
    try {

      Alert.alert(`Removed from favourites`, `Removed ${coin_id.toUpperCase()} from favourites!`)

      // get favourites
      await this.get_favourites()

      // filter through and remove the specified id
      this.favourite_coins = this.favourite_coins.filter(id => id !== coin_id)

      // save back to storage
      let str_favourites = JSON.stringify(this.favourite_coins)
      await AsyncStorage.setItem('favourite_coins', str_favourites)

      // update list when removing favourite
      this.filtered_coins = this.filtered_coins.filter(fcoin => fcoin.name != coin_id)

    }
    catch (err) {
      console.log('error: ' + err.message)
    }
  }
  
}

const coinStore = new CoinStore()

export default coinStore

