import React, { Component } from "react";
import { View } from "native-base";
import { StyleSheet } from "react-native";
import themeStyle from "../../styles/theme.style";
import { NavigationScreenProp } from "react-navigation";
import Coins, {ICoin} from "../../components/Coins";
import {connect} from "react-redux";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  coins: ICoin[],
};
class FavouriteScreen extends Component<Props> {

  render() {
    return (
      <View style={styles.container}>

        <Coins
            navigation={this.props.navigation}
            coins={this.props.coins}
            isFavourites={true} />

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