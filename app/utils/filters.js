import coinStore from '../mobx/coinStore'
import { AsyncStorage } from 'react-native'

export async function apply_search_filter(filter) {

  coinStore.filter = filter

  

  if (coinStore.favourites_enabled) {
    coinStore.filtered_coins = coinStore.filter_favourites.filter(coin => {
      return !coin.name.toUpperCase().search(filter.toUpperCase())
    })
  }
  else {
    coinStore.filtered_coins = coinStore.coins.filter(coin => {
      return !coin.name.toUpperCase().search(filter.toUpperCase())
    })
  }

}

export async function apply_favourites_filter() {
  try {

    //coinStore.app_title = 'Favourite Coins'

    await AsyncStorage.setItem('favourites_enabled', 'true')

    let favourites = await AsyncStorage.getItem('favourite_coins')

    if (favourites != null) {
      
      let json_favourites = JSON.parse(favourites)

      coinStore.filtered_coins = await coinStore.coins.filter(coin => {

        let favs = json_favourites.filter(fav => {
          return coin.name === fav
        })

        return favs.length > 0

      })

      coinStore.filter_favourites = coinStore.filtered_coins

      coinStore.favourites_enabled = true

    }

  }
  catch(err) {
    console.log('error: ' + err.message)
  }
}

export async function remove_favourites_filter() {

  //coinStore.app_title = 'Crypto Tracker'

  try {
    await AsyncStorage.setItem('favourites_enabled', 'false')
  
    coinStore.favourites_enabled = false
    
    coinStore.search_enabled = false

    coinStore.filtered_coins = coinStore.coins
  }
  catch(err) {
    console.log('error: ' + err.message)
  }

}