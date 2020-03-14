//This is a Redacted version to be used as a benchmark/example for React Native Router Flux

import React, {
    Component,
    StatusBar,
    Text,
    View,
    StyleSheet,
    PixelRatio,
  } from 'react-native';
  
  import { Router, Scene } from 'react-native-router-flux';
  import Icon from 'react-native-vector-icons/FontAwesome';
  
  
  //Create a dedicated class that will manage the tabBar icon
  class TabIcon extends Component {
    render() {
      var color = this.props.selected ? '#00f240' : '#301c2a';
  
      return (
        <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center', justifyContent: 'center'}}>
          <Icon style={{color: color}} name={this.props.iconName || "circle"} size={18}/>
          <Text style={{color: color, fontSize: 12}}>{this.props.title}</Text>
        </View>
      );
    }
  }
  
  //MyApp Main Class
  class MySupperApp extends Component {
  
      return (
          <View style={styles.container}>
            <Router>
              <Scene key="root">
                <Scene key="tabbar" component={DrawerMenu} type="reset" duration={1} initial={true} >
                  <Scene key="main" tabs={true} tabBarStyle={styles.tabBar} default="tab1">
                    <Scene  key="tab1"
                            title="MyTab"
                            iconName="tags"
                            icon={TabIcon}
                            hideNavBar={true}
                            component={Tags}
                            initial={true}
                    />
                    <Scene  key="NewsFeed"
                            title="MainNewssFed"
                            iconName="newspaper-o"
                            icon={TabIcon}
                            hideNavBar={true}
                            component={NewsFeed}
                     />
  
                      <Scene  key="settings"
                              iconName="gear"
                              icon={TabIcon}
                              hideNavBar={true}
                              title={Local.settings}
                              component={Settings} />
                    </Scene>
                  </Scene>
              </Scene>
            </Router>
          </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    tabBar: {
      borderTopColor: 'darkgrey',
      borderTopWidth: 1 / PixelRatio.get(),
      backgroundColor: 'ghostwhite',
      opacity: 0.98
    },
    navigationBarStyle: {
      backgroundColor: 'red',
    },
    navigationBarTitleStyle: {
      color:'white',
    },
  });