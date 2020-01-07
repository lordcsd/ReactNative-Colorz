import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import ColorList from './components/colorList';
import Color from './components/Colors';
import Side from './components/tabBar';
import {Router, Scene, Drawer} from 'react-native-router-flux';

let Routes = props => {
  return (
    <Router>
      <Drawer
        hideNavBar
        key="drawer"
        contentComponent={Side}
        drawerWidth={250}
        drawerPosition="left">
        <Scene key="root">
          <Scene
            key="colorList"
            component={ColorList}
            title="Colorlist"
            initial
          />
          <Scene key="colorEdit" component={Color} title="Edit Color" />
        </Scene>
      </Drawer>
    </Router>
  );
};

class Main extends Component {
  render() {
    return <Routes />;
  }
}
AppRegistry.registerComponent(appName, () => Main);
