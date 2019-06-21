import React, { Component } from "react";
import { Header, Left, Body, Right, Container, Title, Text } from "native-base";
import { StyleSheet, Alert, BackHandler, BackAndroid } from "react-native";
import themeStyle from "../../styles/theme.style";
import { NavigationScreenProp } from "react-navigation";
import { TouchableOpacity } from "react-native-gesture-handler";
import CoinInfoList from "./CoinInfoList";
import { connect } from "react-redux";
import { ICoin } from "./ICoin";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-community/async-storage";

interface Props {
  navigation: NavigationScreenProp<any>;
  loading: boolean|any;
  activeScreenIndex: number|any;
  activeScreenName: string|any;
};
class CoinDetails extends Component<Props> {

  private backHandler: any;
  
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", async () => {
      const screen: string = await AsyncStorage.getItem("screen") || "Home";
      return this.props.navigation.navigate(screen);
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
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
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.onClose()}>
              <Icon
                name="arrow-back"
                style={{
                  ...styles.text,
                  padding: 10,
                  fontSize: 26 }} />
            </TouchableOpacity>
          </Left>
          <Body></Body>
          <Right>
            <Title style={styles.text}>{ coin.name }</Title>
          </Right>
        </Header>
        {this.props.loading
          ? <Container style={{
              ...styles.container,
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Text style={styles.text}>Loading coin data...</Text>
            </Container>
          : <CoinInfoList />}
      </Container>
    )
  }

  async onClose() {
    const screen: string = await AsyncStorage.getItem("screen") || "Home";
    this.props.navigation.navigate(screen);
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyle.BACKGROUND_COLOUR,
  },
  text: {
    color: themeStyle.TEXT_COLOUR,
  },
  header: {
    backgroundColor: themeStyle.BACKGROUND_COLOUR,
    paddingLeft: 10,
    paddingRight: 20,
  }
});



function mapStateToProps(state: any): any {
  return {
    loading: state.coin.isCoinInfoLoading,
    activeScreenIndex: state.root.activeScreenIndex,
    activeScreenName: state.root.activeScreenName,
  }
}


export default connect(mapStateToProps)(CoinDetails);