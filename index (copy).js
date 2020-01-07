import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import Color from './components/Colors';
import ColorList from './components/colorList';
import landingImage from './components/landing.png';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Image,
} from 'react-native';

export default class Main extends Component {
  componentDidMount() {
    this.setState({choose: 0});
  }

  state = {
    choose: 0,
  };

  showData = async () => {
    let gotten = await AsyncStorage.getItem('savedRgb');
    let d = JSON.parse(gotten);
    this.setState({choose: d.choose});
  };

  render() {
    return (
      <View showData={this.showData} style={styles.main}>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({choose: 1})}>
            <Text style={styles.writing}>Select Color</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setState({choose: 2})}>
            <Text style={styles.writing}>Edit-Color</Text>
          </TouchableOpacity>
        </View>
        <View>
          {this.state.choose == 1 ? (
            <ColorList />
          ) : this.state.choose == 2 ? (
            <Color />
          ) : (
            <ColorList />
          )}
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgb(255,255,255)',
  },
  bottom: {
    height: 60,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'rgb(250,100,100)',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: 'black',
  },
  button: {
    backgroundColor: 'rgb(50,50,100)',
    width: 150,
    height: 30,
    alignItems: 'center',
    borderRadius: 3,
  },
  writing: {
    textAlign: 'center',
    fontSize: 20,
    color: 'rgb(255,255,255)',
  },
});

let Imager = props => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'rgb(30,34,50)',
      }}>
      <Image source={landingImage} style={{height: 150, width: 300}} />

      <TouchableOpacity
        style={{
          backgroundColor: 'rgb(0,180,185)',
          padding: 20,
          borderRadius: 10,
        }}
        onPressIn={() =>which = 2}
        onPressOut={() =>which = 2}>
        <Text style={{color: 'rgb(30,34,50)', fontSize: 25}}>
          Tap here to continue
        </Text>
      </TouchableOpacity>
    </View>
  );
};


AppRegistry.registerComponent(appName, () =>Main);
