import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createAppContainer} from "react-navigation" 
//import from "react-native-reanimated"


class HomeScreen extends Component {
 navigationOptions = {
    drawerLabel: 'Home',
    // drawerIcon: ({ tintColor }) => (
    //   <Image
    //     source={require('./chats-icon.png')}
    //     style={[styles.icon, { tintColor: tintColor }]}
    //   />
    // ),
  };
  render(){
    return (
      <View style={{flex: 1, backgroundColor: 'rgb(255,100,100)'}}>
      <Button
      title="Open Drawer"
      color="red"
      onPress={() => this.props.navigate.toggleDrawer()}
      style={{backgroundColor: 'rgb(0,100,100)', margin: 50}}/>
    </View>
  );
};
}

let DetailScreen = props => {
   navigationOptions = {
    drawerLabel: 'Detail',
    // drawerIcon: ({ tintColor }) => (
    //   <Image
    //     source={require('./notif-icon.png')}
    //     style={[styles.icon, { tintColor: tintColor }]}
    //   />
    // ),
  };
  return (
    <View style={{flex: 1, backgroundColor: 'rgb(0,100,100)'}}>
      <TouchableOpacity
        style={{backgroundColor: 'rgb(255,100,100)', margin: 50}}>
        <Text>Go-To-Lagos</Text>
      </TouchableOpacity>
    </View>
  );
};

const MyDrawerNavigator = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
  },
  Detail: {
    screen: DetailScreen,
  },
});

const MyApp = createAppContainer(MyDrawerNavigator);
export default MyApp