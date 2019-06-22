import React, {Component} from 'react';
import {View, StyleSheet, BackHandler, Alert} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import HomeScreen from './screens/Home/Home';
import FavouriteCoinsScreen from "./screens/Favourites/Favourites";
import { Container, Text } from 'native-base';
import themeStyle from './styles/theme.style';
import CoinDetails from './screens/CoinDetails/CoinDetails';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Orientation from "react-native-orientation";
import IconComponent from './components/TabBarIcon';
import AsyncStorage from '@react-native-community/async-storage';

const TabBar = (props: any) => {

  const {
    renderIcon,
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation
  } = props;

  const { routes, index: activeRouteIndex, routeName } = navigation.state;

  return (
    <View>

      <View style={styles.tabBar}>

        {routes
          .filter((route: any, index: number) => route.routeName !== "CoinDetails")
          .map((route: any, index: number) => {
          
            const isRouteActive = index === activeRouteIndex;
            const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

            const bgColor: string = isRouteActive ?  "red" : "red";

            return (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.tabBarItem}
                key={index}
                onPress={async () => {

                  await AsyncStorage.setItem("screen", route.routeName);

                  return onTabPress({ route });
                }}
                onLongPress={() => onTabLongPress({ route })}
                accessibilityLabel={getAccessibilityLabel({ route })}
              >
                {renderIcon({ route, focused: isRouteActive, tintColor, backgroundColor: bgColor })}
            </TouchableOpacity>
          )

        })}

      </View>

    </View>
  );

}

const routeConfig: any = {
  Home: HomeScreen,
  Favourites: FavouriteCoinsScreen,
  CoinDetails: {
    screen: CoinDetails,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
};

const tabNavigatorOptions: any = {
  swipeEnabled: true,
  tabBarComponent: TabBar,
  defaultNavigationOptions: ({ navigation } : { navigation: any }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }: { focused: any, horizontal: any, tintColor: any }) => {
      
      const { routeName, index } =  navigation.state;

      let iconName: string = "";
      switch (routeName) {
        case "Home":
          iconName = "home";
          break;
        case "Favourites":
          iconName = "favorite";
          break;
      }
      return <IconComponent routeIndex={index} iconName={iconName} routeName={routeName} tintColour={tintColor} />
    }
  }),
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    activeTintColor: themeStyle.TEXT_COLOUR,
    inactiveTintColor: "rgba(0, 0, 0, .4)",
    activeBackgroundColor: themeStyle.BACKGROUND_COLOUR,
    inactiveBackgroundColor: "rgba(0, 0, 0, .4)",
    style: {
      backgroundColor: themeStyle.BACKGROUND_COLOUR,
    }
  }
};

const TabNavigator = (initialRouteName: string) => createBottomTabNavigator(routeConfig, {
  ...tabNavigatorOptions,
  initialRouteName,
});

const AppNavHome = createAppContainer(TabNavigator("Home"));
const AppNavFavs = createAppContainer(TabNavigator("Favourites"));



interface Props {};
interface State {
  screen: any;
};
class App extends Component<Props, State> {
  
  state = {
    screen: null,
  };

  constructor(props: any) {
    super(props);
    console.disableYellowBox = true;
    Orientation.lockToPortrait();
    (async () => {
      let screen: string|null = await AsyncStorage.getItem("screen") || null;
      if (screen === null) {
        await AsyncStorage.setItem("screen", "Home");
        screen = await AsyncStorage.getItem("screen");
      }
      this.setState({ screen });
    })();
  }

  render() {
    return (
      <Provider store={store}>
        <Container style={styles.container}>
          {this.state.screen !== null
            ? this.state.screen === "Home"
              ? <AppNavHome />
              : <AppNavFavs />
            : null}
        </Container>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    height: 50,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: themeStyle.BACKGROUND_COLOUR,
    flexDirection: "row",
  },
  tabBarItem: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 30,
    paddingRight: 30,
  },
  container: {
    flex: 1,
    borderBottomWidth: 1,
    backgroundColor: themeStyle.BACKGROUND_COLOUR,
    borderBottomColor: "rgba(0, 0, 0, .1)",
  }
});



export default App;
