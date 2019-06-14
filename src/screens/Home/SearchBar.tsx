import React, { Component } from "react";
import { Text, Header, Item, Icon, Button, Input } from "native-base";
import themeStyle from "../../styles/theme.style";
import { searchCoin } from "../../actions/coinActions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { NavigationScreenProp } from "react-navigation";



interface Props {
  navigation?: NavigationScreenProp<any, any>|any;
  search?: string|any;
  searchCoin?: any;
};
class SearchBar extends Component<Props> {

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

    const searchSet: boolean = this.props.search !== "";

    return (
      <Header searchBar style={{ height: 50, backgroundColor: themeStyle.BACKGROUND_COLOUR }} androidStatusBarColor={themeStyle.BACKGROUND_COLOUR}>
        <Item style={{ backgroundColor: "rgba(0, 0, 0, .1)" }}>
          <Icon type="MaterialIcons" name="search" />
          <Input
            ref={(input) => { this.searchInput = input }}
            getRef={(input) => { this.searchInput = input }}
            autoCorrect={false}
            placeholder="Search for coin"
            style={{ color: themeStyle.TEXT_COLOUR }}
            onChangeText={(text: string) => this.props.searchCoin(text)} />

          <Button transparent onPress={this.onSearchClear.bind(this)}>
              {searchSet ?
              <Icon
                type='MaterialIcons'
                name="close"
                style={{ color: themeStyle.TEXT_COLOUR }} /> : null }
            </Button> 
        </Item>
        <Button transparent>
          <Text style={{ color: themeStyle.TEXT_COLOUR }} >Search</Text>
        </Button>
      </Header>
    )
  }

}

function mapStateToProps(state: any) {
  return {
    search: state.coin.searchText,
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>): any {
  return {
    searchCoin: (coinName: string) => dispatch(searchCoin(coinName)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);