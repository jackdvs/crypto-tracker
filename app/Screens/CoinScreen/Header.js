import React, { Component } from 'react'
import { Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base'
import { inject, observer } from 'mobx-react'

import coinStore from '../../mobx/coinStore'

@inject('styles')
@observer
export default class CoinScreen extends Component {

  
  render() {
    return (
      <Header style={{ backgroundColor: this.props.styles.backgroundColour }} androidStatusBarColor={this.props.styles.backgroundColour}>

        <Left>

          <Button transparent onPress={() => this.props.navigation.navigate('HomeScreen')} >
            <Icon type='MaterialIcons' name='arrow-back' style={{ color: this.props.styles.textColour }} />
          </Button>

        </Left>

        <Body>
          <Title style={{ color: this.props.styles.textColour }} >{ coinStore.selected_coin.name }</Title>
        </Body>

        <Right>
          
        </Right>

      </Header>
    )
  }

}