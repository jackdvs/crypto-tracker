import React from 'react'
import { View, Text } from 'native-base'
import { inject, observer } from 'mobx-react';

import coinStore from '../../mobx/coinStore'

@inject('styles')
@observer
class ColumnLabels extends React.Component {

  render() {
    return (
      <View style={{ padding: 10, flexDirection: 'row' }}>
        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row' }} >
          <Text style={{ fontSize: 16, fontFamily: this.props.styles.globalFont, color: this.props.styles.textColour }}>NAME</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Text style={{ fontSize: 16, fontFamily: this.props.styles.globalFont, flex: 1, color: this.props.styles.textColour, textAlign: 'right' }}>PRICE</Text>
          <Text style={{ fontSize: 16, fontFamily: this.props.styles.globalFont, flex: 1,  color: this.props.styles.textColour, textAlign: 'right' }}>24H</Text>
        </View>
      </View>
    )
  }

}

export default ColumnLabels