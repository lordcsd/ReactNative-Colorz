import React, {Component} from 'react';
import {AppRegistry,View} from 'react-native';
import {name as appName} from './app.json';
import ColorList from './components/colorList';
import Color from './components/Colors';
import PaletteGenerator from './components/colorPaletteGenerator';
import Side from './components/tabBar';
import {Router, Scene, Drawer,Tabs} from 'react-native-router-flux';

let Routes = props => {
  return (
    <Router>
      <Drawer
        hideNavBar
        key="drawer"
        contentComponent={Side}
        drawerWidth={250}
        drawerPosition={"right"}>
        <Scene key="root">
          <Scene
            key="colorList"
            component={ColorList}
            title="Colorlist"
            initial
          />
          <Scene key="colorEdit" component={Color} title="Edit Color" />
          <Scene
            key="paletteGenerator"
            component={PaletteGenerator}
            title="Generate color palette"
          />
        </Scene>
      </Drawer>
    </Router>
  );
}


class Main extends Component {
  render() {
    return (
    <Routes />
    );
  }
}


AppRegistry.registerComponent(appName, () => Main);
