import React, {useState, useEffect, Component} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import separated from './split';
import {Actions} from 'react-native-router-flux';
import SearchIcon from './icons/searchWhite.png';

export default class ColorList extends Component {
  state = {
    text: '',
    filteredArray: separated,
  };

  filterArray = () => {
    let newArray = [];
    if (this.state.text.length > 0) {
      for (let i = 0; i < 141; i = i + 1) {
        if (separated[i].name.includes(this.state.text) == true) {
          newArray.push(separated[i]);
          this.setState({
            filteredArray: newArray,
          });
        }
      }
    }
  };

  render() {
    return (
      <View style={styles.full}>
        <View style={styles.searchBlock}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter search text"
            placeholderTextColor="white"
            onChangeText={async text => {
              await this.setState({text});
              this.filterArray();
            }}
            value={this.state.text}
          />
          <TouchableOpacity onPress={() =>(this.state.text.length == 0) ? alert("Please enter Text") : this.filterArray}>
            <Image style={{height: 30, width: 30}} source={SearchIcon} />
          </TouchableOpacity>
        </View>
        <List
          data={this.state.filteredArray}
          reload={this.filterArray}
          text={this.state.text}
        />
      </View>
    );
  }
}

let List = props => {
  return (
    <FlatList
      data={props.text.length == 0 ? separated : props.data}
      renderItem={({item}) => (
        <View>
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
                paddingLeft: 10,
              }}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text}>{item.hex}</Text>
              <Text style={styles.text}>{`rgb(${item.rgb})`}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

let styles = StyleSheet.create({
  text: {
    color: 'white',
    marginHorizontal: 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 2,
    paddingVertical: 3,
    borderRadius: 3,
    fontSize: 15,
  },
  searchBlock: {
    flexDirection: 'row',
    backgroundColor: 'rgb(50,50,150)',
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  TextInput: {
    width: '80%',
    height: 40,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
    color: 'white',
  },
});
