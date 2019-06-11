import React, { Component } from "react";
import { View, Text } from "native-base";
import { StyleSheet } from "react-native";
import themeStyle from "../../styles/theme.style";

interface Props {
  navigation: any;
};
export default class HomeScreen extends Component<Props> {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Favourite coins!</Text>
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