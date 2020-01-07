import React, {Component} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import separated from './split';
import {Actions} from 'react-native-router-flux';

export default class ColorList extends Component {
  render() {
    return (
      <View style={styles.full}>
        <FlatList
          data={separated}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                var savedArr = item.rgb.split(',');
                let savedObj = {
                  red: savedArr[0],
                  green: savedArr[1],
                  blue: savedArr[2],
                  choose: 2,
                  hex: item.hex,
                };
                Actions.colorEdit({selected: savedObj});
                // AsyncStorage.setItem('savedRgb', JSON.stringify(savedObj));
              }}>
              <View
                style={{
                  borderColor: 'black',
                  borderWidth: 1,
                  height: 60,
                  backgroundColor: `${item.name.toLowerCase()}`,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomColor: 'black',
                  justifyContent: 'center',
                }}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.hex}</Text>
                <Text style={styles.text}>{`rgb(${item.rgb})`}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  text: {
    color: 'white',
    marginHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 4,
    borderRadius: 3,
    fontSize: 10,
  },
});
