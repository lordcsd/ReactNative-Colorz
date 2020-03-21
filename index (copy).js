import React, {Component} from 'react';
import {TouchableOpacity, View, Text, Image} from 'react-native';
import ColorList from './components/colorList';
import Color from './components/Colors';
import Side from './components/tabBar';

import {Router, Scene, Drawer} from 'react-native-router-flux';
import PaletteGenerator from './components/colorPaletteGenerator';
import ViewPalette from './components/viewPalette'

import SavedColorPalettes from './components/SavedColorPalette';
import EditPalette from './components/editPalettes';

import palettes from './components/icons/palle.png';
import set from './components/icons/set.png';

import palettes2 from './components/icons/palle2.png';
import set2 from './components/icons/set2.png';



let FirstRoutes = props => {
  return (
    <Router>
      <Drawer
        hideNavBar
        key="drawer"
        contentComponent={Side}
        drawerWidth={250}
        drawerPosition="right">
        <Scene key="root" navigationBarStyle={{height: 45}}>
          <Scene
            key="colorList"
            component={ColorList}
            title="Colorlist"
            initial
          />
          <Scene key="colorEdit" component={Color} title="Edit Color" />
          <scene
            key="paletteGenerator"
            component={PaletteGenerator}
            title="Select Palette"
          />
        </Scene>
      </Drawer>
    </Router>
  );
};

let SecondRoutes = props => {
  return (
    <Router>
      <Scene key="root" navigationBarStyle={{height: 45}}>
        <Scene
          key="colorPalettes"
          component={SavedColorPalettes}
          title="Color Palettes"
        />
        <Scene
          key="EditColorPalette"
          component={EditPalette}
          title="Edit Color Palette"
        />
         <Scene
          key="ViewColorPalette"
          component={ViewPalette}
          title="View Color Palette"
        />
        <Scene key="colorEdit" component={Color} title="Edit Color" />
        <scene
          key="paletteGenerator"
          component={PaletteGenerator}
          title="Select Palette"
        />
      </Scene>
    </Router>
  );
};

export default class Main extends Component {
  state = {
    whichScreen: 0,
    bottomFooter: true,
  };

  selectColor = 'rgb(40,40,40)';
  unSelectColor = 'rgb(150,150,150)';

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.whichScreen === 0 ? <FirstRoutes /> : <SecondRoutes />}

        <View
          style={{
            backgroundColor: 'rgb(255,255,255)',
            height: '8%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() =>
              this.state.whichScreen == 0 ? '' : this.setState({whichScreen: 0})
            }>
            <Image
              style={{height: 20, width: 20}}
              source={this.state.whichScreen === 0 ? palettes : palettes2}
            />

            <Text
              style={{
                color: `${
                  this.state.whichScreen === 1
                    ? this.unSelectColor
                    : this.selectColor
                }`,
              }}>
              Colors
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() =>
              this.state.whichScreen == 1 ? '' : this.setState({whichScreen: 1})
            }>
            <Image
              style={{height: 20, width: 20}}
              source={this.state.whichScreen === 1 ? set : set2}
            />
            <Text
              style={{
                color: `${
                  this.state.whichScreen === 0
                    ? this.unSelectColor
                    : this.selectColor
                }`,
              }}>
              Palettes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
