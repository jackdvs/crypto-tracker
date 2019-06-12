import React, { Component } from "react";
import { View } from "native-base";
import { StyleSheet, Alert } from "react-native";
import themeStyle from "../../styles/theme.style";
import { NavigationScreenProp } from "react-navigation";
import FavCoinsList from "./FavCoinsList";

interface Props {
  navigation: NavigationScreenProp<any, any>;
};
export default class FavouriteScreen extends Component<Props> {

  render() {
    return (
      <View style={styles.container}>
        <FavCoinsList navigation={this.props.navigation} />
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