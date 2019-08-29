import { AsyncStorage } from 'react-native'
import { observable, action } from 'mobx'

class StyleStore {

  @observable appContainerBackgroundColour = '#1a1a1d'
  @observable backgroundColour = '#272727'
  @observable textColour = '#747474'
  @observable accentOrange = '#FF652F'
  @observable accentMint = '#14A76C'
  @observable accentYellow = '#FFE400'
  @observable globalFont = 'Ubuntu-Regular'

}

const styleStore = new StyleStore()

export default styleStore