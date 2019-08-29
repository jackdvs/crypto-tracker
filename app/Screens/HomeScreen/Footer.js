import React from 'react'
import { View } from 'react-native'
import { AdMobBanner } from 'react-native-admob'

class Footer extends React.Component {

  render() {
    return (
      <View style={styles.appFooter}>
        <AdMobBanner
          adSize="smartBanner"
          adUnitID="ca-app-pub-2008717089598745/5600665527"
          onAdFailedToLoad={error => console.error('error fetching ad: ' + error.message)} />
      </View>
    )
  }

}

const styles = {
  appFooter: {
    backgroundColor: '#1a1a1d',
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

export default Footer