import React, { Component } from "react";
import { Header, Left, Body, Right,Icon, Container, Title, View, Text } from "native-base";
import { StyleSheet, Image, Alert } from "react-native";
import themeStyle from "../../styles/theme.style";
import { NavigationScreenProp } from "react-navigation";
import { ICoin } from "../Favourites/FavCoinsList";
import { TouchableOpacity } from "react-native-gesture-handler";
import CoinInfoList from "./CoinInfoList";
import { ICoinInfo } from "./ICoinInfo";
import { connect } from "react-redux";


interface Props {
  navigation: NavigationScreenProp<any>;
  loading: boolean|any;
};
class CoinDetails extends Component<Props> {

  onClose() {
    this.props.navigation.goBack(null);
  }

  render() {

    if (this.props.loading) {
      return (
        <Container style={{
          ...styles.container,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Text style={styles.text}>Loading coin data...</Text>
        </Container>
      )
    }

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
        <CoinInfoList />
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



function mapStateToProps(state: any): any {
  return {
    loading: state.coin.isCoinInfoLoading,
  }
}


export default connect(mapStateToProps)(CoinDetails);