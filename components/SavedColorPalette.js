import React, {Component, useState} from 'react';
import {
  View,
  Text,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Delete from './icons/delete.png';
import Edit from './icons/edit.png';
import SearchIcon from './icons/searchWhite.png';

export default class SavedColorPalettes extends Component {
  state = {
    fetchedKeys: [],
    fetchedPalettes: [],
    loaded: false,
    eachPalette: [],
    showPrompt: false,
    focused: '',
    searchKey: '',
    emptySearch: false,
  };

  showPrompt = key => this.setState({showPrompt: true, focused: key});
  hidePrompt = () => this.setState({showPrompt: false});

  fetchFromAsync = async () => {
    let keys1 = [];
    let groups = [];
    await AsyncStorage.getAllKeys((err, data) => {
      if (data) {
        keys1 = data.filter(unit => unit != 'edited');
        if (this.state.searchKey.length > 0) {
          let keys2 = keys1.filter(unit =>
            unit.toLowerCase().includes(this.state.searchKey.toLowerCase()),
          );
          keys1 = keys2;
          if (keys1.length < 1) {
            this.setState({
              emptySearch: true,
            });
          }
        }
      }
      if (err) {
        console.log('getAllKeys no working!!');
      }
    });

    for (var i = 0; i < keys1.length; i++) {
      await AsyncStorage.getItem(keys1[i], (err, data) => {
        if (data) {
          groups.push(JSON.parse(data));
        }
        if (err) {
          console.log('fetch each group not working!!');
        }
      });
    }

    await this.setState({
      fetchedKeys: keys1,
      fetchedPalettes: groups,
    });
  };

  componentWillMount() {
    this.fetchFromAsync();
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.searchBlock}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter search text"
            onChangeText={async text => {
              await this.setState({
                searchKey: text,
              });
              this.fetchFromAsync();
            }}
          />
          <TouchableOpacity>
            <Image
              style={{height: 30, width: 30}}
              source={SearchIcon}
              onPress={() => {
                if (this.state.searchKey.length < 1) alert('Please enter text');
              }}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontSize:this.state.fetchedKeys.length == 0 && this.state.searchKey.length == 0 ? 0 :20,
            color: 'rgb(60,60,60)',
          }}>
          {this.state.fetchedKeys.length == 0 && this.state.searchKey.length < 1
            ? 'Please create new palettes'
            : this.state.searchKey.length > 0 && this.state.emptySearch == true
            ? 'Your search was not found'
            : ''}
        </Text>
        {this.state.showPrompt == false ? (
          <View>
            <List
              showPrompt={this.showPrompt}
              keys={this.state.fetchedKeys}
              groups={this.state.fetchedPalettes}
              refresh={this.fetchFromAsync}
            />
          </View>
        ) : (
          <View
            style={{
              backgroundColor: 'rgb(100,100,100)',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}>
            <CustomPrompt
              foreignState={this.state.showPrompt}
              showPrompt={this.showPrompt}
              hidePrompt={this.hidePrompt}
              focused={this.state.focused}
              refresh={this.fetchFromAsync}
            />
          </View>
        )}
        <TouchableOpacity
          onPress={() => {
            let selected = {
              red: 37,
              green: 78,
              blue: 94,
              choose: 2,
              hex: '254e5e',
            };
            Actions.colorEdit({
              selected: selected,
              refresh: this.fetchFromAsync,
            });
          }}
          style={{
            position: 'absolute',
            left: '80%',
            top: '80%',
            backgroundColor: 'rgb(255,100,100)',
            height: 40,
            width: 40,
            borderRadius: 35,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 35,
              color: 'white',
              textAlign: 'center',
              paddingBottom: 5,
            }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

let CustomPrompt = props => {
  return (
    <View>
      <View style={styles.promptStyle}>
        <Text>Are you sure you want to remove ?</Text>
        <Text style={{fontSize: 30}}>{props.focused}</Text>

        <View style={styles.promptButtonContainer}>
          <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.removeItem(`${props.focused}`);
              props.refresh();
              props.hidePrompt();
            }}>
            <View style={styles.promptSave}>
              <Text>Confirm</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={props.hidePrompt}>
            <View style={styles.promptBack}>
              <Text>Back</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

let List = props => {
  return (
    <View>
      <ScrollView>
        {props.groups.map(each1 => (
          <View>
            <TouchableOpacity
              onPress={() => {
                let acquired = props.keys[props.groups.indexOf(each1)];
                Actions.EditColorPalette({
                  each1: [each1, acquired, props.refresh],
                });
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 15,
              }}>
              <View
                style={{
                  backgroundColor: each1[0],
                  width: '18%',
                  height: 50,
                  borderTopLeftRadius: 10,
                }}></View>
              <View
                style={{
                  backgroundColor: each1[1],
                  width: '18%',
                  height: 50,
                }}></View>
              <View
                style={{
                  backgroundColor: each1[2],
                  width: '18%',
                  height: 50,
                }}></View>
              <View
                style={{
                  backgroundColor: each1[3],
                  width: '18%',
                  height: 50,
                }}></View>
              <View
                style={{
                  backgroundColor: each1[4],
                  width: '18%',
                  height: 50,
                }}></View>
            </TouchableOpacity>

            <View
              style={{
                height: 50,
                backgroundColor: 'rgb(50,50,50)',
                width: '90%',
                alignSelf: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text style={{fontSize: 20, color: 'white', paddingLeft: 5}}>
                {props.keys[props.groups.indexOf(each1)]}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '50%',
                  justifyContent: 'space-around',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    let acquired = props.keys[props.groups.indexOf(each1)];
                    Actions.EditColorPalette({
                      each1: [each1, acquired],
                    });
                  }}>
                  <Image source={Edit} style={{height: 30, width: 33}} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    props.showPrompt(props.keys[props.groups.indexOf(each1)]);
                  }}>
                  <Image source={Delete} style={{height: 30, width: 28}} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
        <View style={{height: 200}}></View>
      </ScrollView>
    </View>
  );
};

let styles = StyleSheet.create({
  eachPalette: {
    marginTop: 50,
  },
  key1: {
    height: 50,
    width: 150,
    backgroundColor: 'rgb(33,33,200)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: 'rgb(220,220,220)',
  },
  key2: {
    height: 50,
    width: 150,
    backgroundColor: 'rgb(60,150,60)',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: 'rgb(220,220,220)',
  },
  buttonText: {color: 'rgb(220,220,220)'},
  underText: {
    color: 'rgb(220,220,220)',
    fontSize: 20,
    marginVertical: 10,
  },
  promptStyle: {
    height: 150,
    width: '80%',
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  promptInput: {
    borderRadius: 6,
    width: '80%',
    backgroundColor: 'rgb(200,200,200)',
  },
  promptButtonContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  promptSave: {
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'rgb(0,200,100)',
    alignItems: 'center',
  },
  promptBack: {
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'rgb(200,80,80)',
    alignItems: 'center',
  },
  searchBlock: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgb(255,255,255)',
  },
  TextInput: {
    width: '80%',
    height: 35,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'rgb(1,117,255)',
  },
});
