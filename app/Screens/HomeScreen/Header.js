import React from 'react'
import { Alert, View, Text, Modal, TouchableWithoutFeedback } from 'react-native'
import {
  Header,
  Body,
  Left,
  Right,
  Title,
  Icon,
  Input,
  Button  } from 'native-base'
import { observer, inject } from 'mobx-react'
import coinStore from '../../mobx/coinStore'
import { remove_favourites_filter, apply_favourites_filter, apply_search_filter } from '../../utils/filters'


@inject('styles')
@observer
class AppNavbar extends React.Component {

  onHelpPressed() {

    Alert.alert('Help', `
1. Tap heart to toggle your favourites

2. Tap a coin to view more information about it

3. Long press a coin to add it to your favourites

4. Long press the favourited coin to remove it from your favourites


CONTACT DEVELOPER
Email: j4ckdavis@gmail.com
Website: cryptotracker.jackdvs.me`, null, {  })

  }

  render() {
    return (
      <Header searchBar androidStatusBarColor={this.props.styles.backgroundColour} style={{ backgroundColor: this.props.styles.backgroundColour /*height: 80*/ }}>

        <Left>
          <Button transparent onPress={() => {
            if (coinStore.search_enabled) {
              apply_search_filter('')
            }
            coinStore.set_search_enabled(!coinStore.search_enabled)
          }}>
            <Icon
              type='MaterialIcons'
              name={ coinStore.search_enabled ? 'close' : 'search' }
              style={{ color: this.props.styles.textColour }} />
          </Button> 
        </Left>

        <Body>
        {
           coinStore.search_enabled ? 
           <Input
             placeholder='Search for coin...'
             style={{ color: this.props.styles.textColour, fontFamily: 'Ubuntu-Regular',  fontSize: 18, paddingLeft: 0 }}
             autoFocus
             onChangeText={text => apply_search_filter(text)} /> 

            : 

            <Title
              style={{ color: this.props.styles.textColour, fontFamily: 'Ubuntu-Regular' }}>
              { coinStore.app_title }
            </Title>
        }
       </Body>

       <Right>

         <Button transparent onPress={() => coinStore.favourites_enabled ? remove_favourites_filter() : apply_favourites_filter() }>
           <Icon
             type='MaterialIcons'
             name={coinStore.favourites_enabled ? 'favorite' : 'favorite-border'}
             style={{ color: this.props.styles.textColour }} />
         </Button>

         <Button
            transparent
            onPress={() => this.onHelpPressed()}>
            <Icon 
              type='MaterialIcons'
              name='help'
              style={{ color: this.props.styles.textColour }} />
          </Button>


       </Right>

    </Header>
    )
  }

}

export default AppNavbar