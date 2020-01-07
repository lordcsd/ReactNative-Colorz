import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import homeIcon from '../components/icons/home.png';
import galleryIcon from '../components/icons/gallery.png';
import slideShow from '../components/icons/slideShow.png';
import setting from '../components/icons/settings.png';
import share from '../components/icons/share.png';
import send from '../components/icons/send.png';
import newSplash from '../components/icons/newSplash.png';
//import Garble from '../components/icons/garble.svg'

//import SvgUri from 'react-native-svg-uri';

export default class Side extends Component {
  render() {
    return (
      <View style={styles.whole}>
        <View style={styles.top}>
          {/* <SvgUri
          width="300"
          height="400"
          svgXmlData={Garble}/> */}
        </View>

        <View style={styles.flows}>
          <Image source={homeIcon} style={styles.icons} />
          <Text style={styles.iconsText}> Home</Text>
        </View>

        <View style={styles.flows}>
          <Image source={galleryIcon} style={styles.icons} />
          <Text style={styles.iconsText}> Gallery</Text>
        </View>

        <View style={styles.flows}>
          <Image source={slideShow} style={styles.icons} />
          <Text style={styles.iconsText}> Slideshow</Text>
        </View>

        <View style={styles.flows}>
          <Image source={setting} style={styles.icons} />
          <Text style={styles.iconsText}> Tools</Text>
        </View>

        <View
          style={{
            backgroundColor: 'rgb(200,200,200)',
            height: 1,
            marginVertical: 14,
          }}></View>

        <Text style={{color: 'rgb(150,150,150)', margin: 10}}>Communicate</Text>

        <View style={styles.flows}>
          <Image source={share} style={styles.icons} />
          <Text style={styles.iconsText}> Share</Text>
        </View>

        <View style={styles.flows}>
          <Image source={send} style={styles.icons} />
          <Text style={styles.iconsText}> Send</Text>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  flows: {flexDirection: 'row', alignItems: 'center'},
  icons: {height: 35, width: 35},
  iconsText: {fontFamily: 'ubuntu', fontSize: 15},
  top: {
    height: '30%',
    backgroundColor: 'rgb(0,150,150)',
    marginBottom: 10,
  },
  up: {
    backgroundColor: 'rgb(0,140,120)',
    height: 25,
  },
});
