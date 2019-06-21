import React, { Component } from "react";
import { StyleSheet} from "react-native";
import { Container, View, Text } from "native-base";
import themeStyle from "../../styles/theme.style";
import { populateTopCoins, searchCoin } from "../../actions/coinActions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { NavigationScreenProp } from "react-navigation";
import SearchBar from "./SearchBar";
//@ts-ignore
import {AdMobBanner} from "react-native-admob";

import Coins from "../../components/Coins";
import {ICoin} from "../CoinDetails/ICoin";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  search?: string;
  searchCoin?: any;
  populateTopCoins?: any;
  coins: ICoin[],
};
interface State {
  adLoaded: string;
};
class HomeScreen extends Component<Props, State> {

  state = {
    adLoaded: "",
  };

  searchInput: any;

  onSearchClear() {

    const searchSet: boolean = this.props.search !== "";

    if (searchSet) {
      this.props.searchCoin("");
      this.searchInput._root.clear();
      this.searchInput._root.blur();
    }

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

  render() {

    return (
      <Container style={styles.container}>

        <SearchBar />

        {this.renderAd()}

        <Coins
            isFavourites={false}
            coins={this.props.coins}
            navigation={this.props.navigation} />

      </Container>
    )
  }

  componentDidMount() {
    this.props.populateTopCoins();
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeStyle.BACKGROUND_COLOUR
  },
});

function mapStateToProps(state: any) {

  const search: string = state.coin.searchText;
  const coins: ICoin[] = state.coin.coins;

  return {
    coins: coins.filter(coin => search === "" ? coin : coin.name.toLowerCase().indexOf(search.toLowerCase()) > -1),
    search: state.coin.searchText,
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>): any {
  return {
    populateTopCoins: () => dispatch(populateTopCoins()),
    searchCoin: (coinName: string) => dispatch(searchCoin(coinName)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);