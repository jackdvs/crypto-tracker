import React, {Component} from 'react';
import {View, StyleSheet, StatusBar, Alert} from 'react-native';
import {Provider} from 'react-redux';
import store from './store';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './screens/Home/Home';
import FavouriteCoinsScreen from "./screens/Favourites/Favourites";
import { Container, Icon, Text } from 'native-base';
import themeStyle from './styles/theme.style';
import { createBottomTabNavigator } from 'react-navigation';
import CoinDetails from './screens/CoinDetails/CoinDetails';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Orientation from "react-native-orientation";
import {AdMobBanner} from "react-native-admob";
import { tsMethodSignature } from '@babel/types';


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
        style={{ color: props.tintColour, backgroundColor: props.backgroundColor, fontSize: themeStyle.FONT_SIZE_TABBAR }} />
    </View>
  );
}

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
      
      <View style={{ flex: 1, backgroundColor: themeStyle.BACKGROUND_COLOUR }}>
        <View style={{ height: 50, backgroundColor: "rgba(0, 0, 0, .1)"}}>
          <AdMobBanner
              adSize="smartBanner"
              adUnitID="ca-app-pub-2008717089598745/5600665527"
              onAdFailedToLoad={(error: any) => console.log('[ERROR]: error fetching ad: ' + error.message)} />
        </View>
      </View>

      <View style={styles.tabBar}>

        {routes
          .filter((route: any, index: number) => route.routeName !== "CoinDetails")
          .map((route: any, index: number) => {
          
          const isRouteActive = index === activeRouteIndex;
          const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

          return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.tabBarItem}
              key={index}
              onPress={() => onTabPress({ route })}
              onLongPress={() => onTabLongPress({ route })}
              accessibilityLabel={getAccessibilityLabel({ route })}
            >
              {renderIcon({ route, focused: isRouteActive, tintColor })}
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
      borderTopWidth: 0,
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
          <StatusBar backgroundColor={themeStyle.STATUS_BAR_COLOUR} />
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
  }
});

export default App;
