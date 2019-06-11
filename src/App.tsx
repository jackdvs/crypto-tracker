import React, {Component} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './screens/Home/Home';
import FavouriteCoinsScreen from "./screens/Favourites/FavouriteCoins";
import { Container, Text, Icon } from 'native-base';
import themeStyle from './styles/theme.style';
import { createBottomTabNavigator } from 'react-navigation';

// const AppNavigator = createAppContainer(createStackNavigator({
//   "Home": HomeScreen,
//   "Favourites": FavouriteCoinsScreen,
// }, {
//   initialRouteName: "Home",
//   headerMode: "none",
// }));

interface IconProps {
  routeName: string;
  iconName: string;
  tintColour: any;
}
const IconComponent = (props: IconProps) => (
  <View >
    <Icon 
      type="MaterialIcons"
      name={props.iconName}
      fontSize={24}
      style={{ color: props.tintColour }} />
  </View>
)

const AppNavigator = createAppContainer(createBottomTabNavigator({
  "Home": HomeScreen,
  "Favourites": FavouriteCoinsScreen,
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {

      const { routeName } =  navigation.state;

      let iconName: string = "";

      switch (routeName) {
        case "Home":
          iconName = "home";
          break;
        case "Favourites": 
          iconName = "favorite";
          break;
      }

      return <IconComponent iconName={iconName} routeName={routeName} tintColour={tintColor} />
    }
  }),
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    activeTintColor: themeStyle.TEXT_COLOUR,
    inactiveTintColor: "rgba(0, 0, 0, .25)",
    activeBackgroundColor: themeStyle.BACKGROUND_COLOUR,
    inactiveBackgroundColor: "rgba(0, 0, 0, .25)",
    style: {
      backgroundColor: themeStyle.BACKGROUND_COLOUR,
      borderTopWidth: 0,
    }
  }
}));

interface Props {}
class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <Container style={styles.container}>
          <StatusBar backgroundColor={themeStyle.STATUS_BAR_COLOUR} />
          <AppNavigator></AppNavigator>
        </Container>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;