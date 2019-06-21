import React, { Component } from "react";
import { View, Text } from "native-base";
import { StyleSheet } from "react-native";
import themeStyle from "../../styles/theme.style";
import { NavigationScreenProp } from "react-navigation";
import Coins from "../../components/Coins";
import {connect} from "react-redux";
import { ICoin } from "../CoinDetails/ICoin";
//@ts-ignore
import {AdMobBanner} from "react-native-admob";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  coins: ICoin[],
};
interface State {
  adLoaded: string;
};
class FavouriteScreen extends Component<Props, State> {

  state = {
    adLoaded: ""
  };

  render() {
    return (
      <View style={styles.container}>

        {this.renderAd()}

        <Coins
            navigation={this.props.navigation}
            coins={this.props.coins}
            isFavourites={true} />

      </View>
    )
  }

  renderAd() {
    return (
      <View style={{ height: 50, backgroundColor: themeStyle.BACKGROUND_COLOUR, alignItems: "center" }}>
        <AdMobBanner
          style={{ flex: 1 }}
          adSize="banner"
          adUnitID="ca-app-pub-2008717089598745/5600665527"
          onAdFailedToLoad={(error: any) => {
            console.log('error fetching ad: ' + error.message);
            this.setState({ adLoaded: "false" });
          }}
          onAdLoaded={() => {
            this.setState({ adLoaded: "true" });
          }}
        />
        {this.state.adLoaded === "true"
          ? null
          : (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <Text style={{ color: themeStyle.TEXT_COLOUR, fontSize: 12 }}>Advert</Text>
            </View>
          )
        }
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyle.BACKGROUND_COLOUR
  },
  text: {
    color: themeStyle.TEXT_COLOUR,
    fontFamily: themeStyle.FONT_DEFAULT
  }
})

function mapStateToProps(state: any) {

  const coins: ICoin[] = state.coin.coins;
  const favourites = state.coin.favourites;

  return {
    coins: coins.filter(coin => favourites.includes(coin.name)),
  }
}


export default connect(mapStateToProps)(FavouriteScreen);