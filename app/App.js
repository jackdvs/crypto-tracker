import { createAppContainer, createStackNavigator } from 'react-navigation'
import { View, Easing, Animated } from 'react-native'
import React from 'react'
import { Provider } from 'mobx-react'

import HomeScreen from './screens/HomeScreen'
import CoinScreen from './screens/CoinScreen'

import styleStore from './mobx/styleStore'

import Footer from './screens/HomeScreen/Footer'

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {      
      const { layout, position, scene } = sceneProps

      const thisSceneIndex = scene.index
      const width = layout.initWidth
      const height = layout.initHeight

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0],
      })

      return { transform: [  { translateX } ] }
    },
  }
}


const AppNavigator = createAppContainer(createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  CoinScreen: { screen: CoinScreen }
}, {
  initialRouteName: 'HomeScreen',
  headerMode: 'none',
  transitionConfig
}))


class App extends React.Component {
  render() {
    return (
    <Provider styles={styleStore}>
      <View style={{ flex: 1, backgroundColor: styleStore.appContainerBackgroundColour }}>
        <AppNavigator />
        <Footer />
      </View>
    </Provider>)
  }
}


export default App