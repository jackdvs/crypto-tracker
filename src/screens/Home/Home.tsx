import React, { Component } from "react";
import { StyleSheet} from "react-native";
import { Text, Header, Container, Item, Icon, Button, Input } from "native-base";
import themeStyle from "../../styles/theme.style";
import { populateTopCoins, searchCoin } from "../../actions/coinActions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { NavigationScreenProp } from "react-navigation";
import SearchBar from "./SearchBar";

import Coins from "../../components/Coins";
import {ICoin} from "../CoinDetails/ICoin";

interface Props {
  navigation: NavigationScreenProp<any, any>;
  search?: string;
  searchCoin?: any;
  populateTopCoins?: any;
  coins: ICoin[],
};
class HomeScreen extends Component<Props> {

  searchInput: any;

  onSearchClear() {

    const searchSet: boolean = this.props.search !== "";

    if (searchSet) {
      this.props.searchCoin("");
      this.searchInput._root.clear();
      this.searchInput._root.blur();
    }

  }

  render() {

    return (
      <Container style={styles.container}>

        <SearchBar />

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