import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class ColorPalette extends Component {
  render() {
    return (
      <View>
        {/* palette colors go here */}
        <View>
          <View style={styles.set}></View>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  set: {
    flexDirection: 'row',
  }
});
