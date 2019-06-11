import React, { Component } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { View, Text } from "native-base";
import themeStyle from "../../styles/theme.style";
import { ICoinDispatch, populateTopCoins } from "../../actions/coinActions";
import { connect } from "react-redux";
import { Dispatch } from "redux";

interface Props {
  coins: any[];
};
class HomeScreen extends Component<Props & ICoinDispatch> {

  render() {
    return (
      <View style={styles.container}>
        
        <ScrollView style={styles.coinList}>

          <View style={styles.listItem}>
            <Text>Coin 1</Text>
          </View>

          <View style={styles.listItem}>
            <Text>Coin 2</Text>
          </View>

          <View style={styles.listItem}>
            <Text>Coin 3</Text>
          </View>

        </ScrollView>

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
    fontFamily: themeStyle.FONT_DEFAULT
  },
  coinList: {
    backgroundColor: 'rgba(0, 0, 0, .1)',
  },
  listItem: {
    margin: 5,
    marginBottom: 0,
    padding: 20,
    backgroundColor: themeStyle.BACKGROUND_COLOUR,
  }
});

function mapStateToProps(state: any) {
  return {
    coins: state.coin.coins,
  }
}

function mapDispatchToProps(dispatch: Dispatch<any>) {
  return {
    populateTopCoins: () => dispatch(populateTopCoins()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);