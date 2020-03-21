import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import searchImage from './icons/searchWhite.png';
import CameraRollPicker from 'react-native-camera-roll-picker';

let WhatsappHome = props => {
  let getSelectedImages = image => {
    if (image[0]) {
      alert(image[0].uri);
    }
  };

  let dots = [1, 2, 3];
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <View style={{flex: 1}}>
      <View style={styles.topMost}>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            marginLeft: 20,
            fontStyle: 'bold',
          }}>
          WhatsApp saver
        </Text>
        <View
          style={{
            width: '30%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Image source={searchImage} style={{height: 20, width: 20}} />
          <View>
            {dots.map(each => {
              return (
                <View
                  style={{
                    height: 5,
                    width: 5,
                    backgroundColor: 'white',
                    borderRadius: 3,
                    margin: 2,
                  }}></View>
              );
            })}
          </View>
        </View>
      </View>

      <CameraRollPicker callback={getSelectedImages} assetType="All" />
    </View>
  );
};

let styles = StyleSheet.create({
  topMost: {
    backgroundColor: 'rgb(7,94,98)',
    height: '13%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBar: {
    backgroundColor: 'rgb(7,94,98)',
    height: '7%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowRadius: 50,
    shadowColor: 'black',
    shadowOffset: {height: 60, width: 50},
    shadowOpacity: 100,
  },
  topBarText: {
    color: 'white',
  },
  mainView: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default WhatsappHome;
