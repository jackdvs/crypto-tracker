import React, { Component } from "react";
import { StyleSheet} from "react-native";
import { View, Text } from "native-base";
import themeStyle from "../../styles/theme.style";
import { ICoinDispatch, populateTopCoins } from "../../actions/coinActions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CoinList from "./CoinList";



interface Props {

};
class HomeScreen extends Component<Props & ICoinDispatch> {


  render() {
    return (
      <View style={styles.container}>

        <View style={{ flexDirection: 'row', padding: 20 }}>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-start', marginLeft: 15 }}>
            <Text style={{ fontFamily: themeStyle.FONT_DEFAULT, fontSize: themeStyle.FONT_SIZE_DEFAULT, color: themeStyle.TEXT_COLOUR }}>Name</Text>
          </View>
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end', marginRight: 15 }}>
            <Text style={{ marginRight: 30, fontFamily: themeStyle.FONT_DEFAULT, fontSize: themeStyle.FONT_SIZE_DEFAULT, color: themeStyle.TEXT_COLOUR }}>Price</Text>
            <Text style={{ fontFamily: themeStyle.FONT_DEFAULT, fontSize: themeStyle.FONT_SIZE_DEFAULT, color: themeStyle.TEXT_COLOUR }}>24H</Text>
          </View>
        </View>

        <CoinList />

      </View>
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
  text: {
    color: themeStyle.TEXT_COLOUR,
    fontFamily: themeStyle.FONT_DEFAULT,
    marginLeft: 10,
  },
});

function mapDispatchToProps(dispatch: Dispatch<any>): any {
  return {
    populateTopCoins: () => dispatch(populateTopCoins()),
  }
}

export default connect(null, mapDispatchToProps)(HomeScreen);