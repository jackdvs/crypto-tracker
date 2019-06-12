import React, { Component } from "react";
import { StyleSheet} from "react-native";
import { Text, Header, Container, Item, Icon, Button, Input } from "native-base";
import themeStyle from "../../styles/theme.style";
import { populateTopCoins, searchCoin } from "../../actions/coinActions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CoinList from "./CoinList";
import { NavigationScreenProp } from "react-navigation";
import SearchBar from "./SearchBar";



interface Props {
  navigation: NavigationScreenProp<any, any>;
  search?: string;
  searchCoin?: any;
  populateTopCoins?: any;
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
        
        <CoinList />

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
  return {
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