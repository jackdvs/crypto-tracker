import React, { Component } from "react";
import { Header, Left, Body, Right,Icon, Container, Title } from "native-base";
import { StyleSheet, Image } from "react-native";
import themeStyle from "../../styles/theme.style";
import { NavigationScreenProp } from "react-navigation";
import { ICoin } from "../Favourites/FavCoinsList";
import { TouchableOpacity } from "react-native-gesture-handler";


interface Props {
  navigation: NavigationScreenProp<any>;
};
export default class CoinDetails extends Component<Props> {

  onClose() {
    this.props.navigation.goBack();
  }

  render() {

    const { navigation } = this.props;
    const coin: ICoin = navigation.getParam("coin");

    return (
      <Container style={styles.container}>
        <Header
          androidStatusBarColor={themeStyle.BACKGROUND_COLOUR}
          style={styles.header}>
          <Left style={{ flex: 1 }}>
            <Title style={styles.text}>{ coin.name }</Title>
          </Left>
          <Body></Body>
          <Right>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.onClose()}>
              <Icon
                type="FontAwesome"
                name="close"
                style={{
                  padding: 10,
                  ...styles.text,
                  fontSize: 24 }} />
            </TouchableOpacity>
          </Right>
        </Header>
      </Container>
    )
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyle.BACKGROUND_COLOUR,
  },
  text: {
    color: themeStyle.TEXT_COLOUR,
    fontSize: themeStyle.FONT_SIZE_DEFAULT + 2,
  },
  header: {
    backgroundColor: themeStyle.BACKGROUND_COLOUR,
    paddingLeft: 20,
    paddingRight: 10,
  }
});