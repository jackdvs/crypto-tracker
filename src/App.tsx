import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './screens/Home/Home';
import FavouriteCoinsScreen from "./screens/Favourites/Favourites";
import { Container, Icon} from 'native-base';
import themeStyle from './styles/theme.style';
import {createBottomTabNavigator} from 'react-navigation';
import CoinDetails from './screens/CoinDetails/CoinDetails';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Orientation from "react-native-orientation";

interface IconProps {
  routeName: string;
  iconName: string;
  tintColour: any;
}
const IconComponent = (props: IconProps) => {
  return (
    <View>
      <Icon
        type="FontAwesome"
        name={props.iconName}
        fontSize={themeStyle.FONT_SIZE_TABBAR}
        style={{ color: props.tintColour, fontSize: themeStyle.FONT_SIZE_TABBAR }} />
    </View>
  );
};

const TabBar = (props: any) => {

  const {
    renderIcon,
    getLabelText,
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
              onPress={() => onTabPress({ route })}
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

const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Favourites: FavouriteCoinsScreen,
  CoinDetails: {
    screen: CoinDetails,
    navigationOptions: {
      tabBarVisible: false,
    }
  },
}, {
  initialRouteName: "Home",
  swipeEnabled: true,
  tabBarComponent: TabBar,
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } =  navigation.state;
      let iconName: string = "";
      switch (routeName) {
        case "Home":
          iconName = "home";
          break;
        case "Favourites":
          iconName = "star";
          break;
      }
      return <IconComponent iconName={iconName} routeName={routeName} tintColour={tintColor} />
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
});

const AppNavigator = createAppContainer(TabNavigator);

interface Props {}
class App extends Component<Props> {

  constructor(props: any) {
    super(props);
    Orientation.lockToPortrait();
  }

  render() {
    return (
      <Provider store={store}>
        <Container style={styles.container}>
          <AppNavigator />
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
