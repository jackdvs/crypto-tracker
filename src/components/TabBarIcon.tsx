import React, {Component} from "react";
import { View } from "native-base";

import Icon from "react-native-vector-icons/MaterialIcons"
import themeStyle from "../styles/theme.style";

interface Props {
  routeName: string;
  iconName: string;
  tintColour: any;
  routeIndex: number;
};
export default class IconComponent extends Component<Props> {

  render() {
    return (
      <View>
        <Icon
          key={this.props.routeIndex}
          name={this.props.iconName}
          style={{
            fontSize: themeStyle.FONT_SIZE_TABBAR,
            color: this.props.tintColour,
          }} />
      </View>
    );
  };

}