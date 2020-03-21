import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import Slider from 'react-native-slider';

export default class EditPalette extends Component {
  state = {
    eachOne: this.props.each1[0],
    key: this.props.each1[1],
    present: '',
    r: 0,
    g: 0,
    b: 0,
    hex: '',
    selected: 0,
    initialCount: 0,
  };

  spliter = async one => {
    let acquired = one
      .split('(')[1]
      .split(')')[0]
      .split(',');

    let first = Number(acquired[0]);
    let second = Number(acquired[1]);
    let third = Number(acquired[2]);

    let negPosChecher = one => {
      if (one < 0) {
        if (one == first) {
          first = 0;
        } else if (one == second) {
          second = 0;
        } else if (one == third) {
          third = 0;
        }
      } else if (one > 255) {
        if (one == first) {
          first = 255;
        } else if (one == second) {
          second = 255;
        } else if (one == third) {
          third = 255;
        }
      } else if (one > -1 && one < 256) {
        if (one == first) {
          first = Math.round(one);
        } else if (one == second) {
          second = one;
        } else if (one == third) {
          third = Math.round(one);
        }
      }
    };

    negPosChecher(first);
    negPosChecher(second);
    negPosChecher(third);

    await this.setState({
      r: Math.round(first),
      g: Math.round(second),
      b: Math.round(third),
    });

    this.hexConvert();
  };

  hexConvert = async () => {
    let hex =
      '#' +
      ((1 << 24) + (this.state.r << 16) + (this.state.g << 8) + this.state.b)
        .toString(16)
        .slice(1);

    await this.setState({hex: hex});
  };

  whichAndSet = () => {
    let change = [...this.state.eachOne];
    if (this.state.selected == 0) {
      change[0] = `rgb(${this.state.r},${this.state.g},${this.state.b})`;
    }
    if (this.state.selected == 1) {
      change[1] = `rgb(${this.state.r},${this.state.g},${this.state.b})`;
    }
    if (this.state.selected == 2) {
      change[2] = `rgb(${this.state.r},${this.state.g},${this.state.b})`;
    }
    if (this.state.selected == 3) {
      change[3] = `rgb(${this.state.r},${this.state.g},${this.state.b})`;
    }
    if (this.state.selected == 4) {
      change[4] = `rgb(${this.state.r},${this.state.g},${this.state.b})`;
    }

    this.setState({
      eachOne: change,
    });
  };

  componentWillMount() {
    AsyncStorage.setItem('edited', JSON.stringify(this.props.each1[0]));
    this.spliter(this.state.eachOne[0]);
  }

  setSelected = pin => {
    this.setState({selected: pin});
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'rgb(80,80,80)'}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'rgb(50,50,50)',
            height: '8%',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Text style={{color: 'rgb(255,255,255)', fontSize: 25}}>
            {this.state.key}
          </Text>

          <TouchableOpacity
            onPress={() => {
              this.props.each1[2]();
              AsyncStorage.setItem(
                this.state.key,
                JSON.stringify(this.state.eachOne),
              );
              alert('saved!');
            }}
            style={{
              backgroundColor: 'rgb(50,200,50)',
              height: '70%',
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                paddingHorizontal: 5,
                color: 'rgb(255,255,255)',
              }}>
              Save
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: 'rgb(220,50,50)',
              height: '70%',
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={async () => {
              await AsyncStorage.getItem('edited', (err, data) => {
                if (data) this.setState({eachOne: JSON.parse(data)});
              });
            }}>
            <Text
              style={{
                fontSize: 18,
                paddingHorizontal: 5,
                color: 'rgb(55,55,55)',
              }}>
              Undo
            </Text>
          </TouchableOpacity>
        </View>
        <ColorDisplay
          colors={this.state.eachOne}
          r={this.state.r}
          g={this.state.g}
          b={this.state.b}
          spliter={this.spliter}
          hex={this.state.hex}
          selected={this.state.selected}
          setSelected={this.setSelected}
          paletteName={this.state.key}
        />

        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            height: '30%',
          }}>
          <Slider
            value={this.state.r}
            minimumValue={0}
            maximumValue={255}
            onValueChange={value => {
              this.setState({
                r: Math.round(value),
              });
              this.hexConvert();
              this.whichAndSet();
            }}
            style={{width: '80%'}}
          />

          <Slider
            value={this.state.g}
            minimumValue={0}
            maximumValue={255}
            onValueChange={value => {
              this.setState({
                g: Math.round(value),
              });
              this.hexConvert();
              this.whichAndSet();
            }}
            style={{width: '80%'}}
          />

          <Slider
            value={this.state.b}
            minimumValue={0}
            maximumValue={255}
            onValueChange={value => {
              this.setState({
                b: Math.round(value),
              });
              this.hexConvert();
              this.whichAndSet();
            }}
            style={{width: '80%'}}
          />
        </View>
      </View>
    );
  }
}

let ColorDisplay = props => {
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        {props.colors.map(eachColor => (
          <TouchableOpacity
            onPress={() => {
              props.spliter(eachColor);
              props.setSelected(props.colors.indexOf(eachColor));
            }}
            style={{
              height: 200,
              width: '20%',
              borderWidth:
                props.selected == props.colors.indexOf(eachColor) ? 5 : 0,
              borderColor: 'white',
              borderStyle: 'dashed',
              backgroundColor: `${eachColor}`,
              justifyContent: 'flex-end',
            }}>
            <View style={{height: 70, backgroundColor: 'black'}}>
              <Text style={{color: 'white', fontSize: 10}}>rgb(</Text>
              <Text style={{color: 'white', fontSize: 10}}>
                {eachColor
                  .split('(')[1]
                  .split(')')[0]
                  .split(',')[0] < 0
                  ? 0
                  : eachColor
                      .split('(')[1]
                      .split(')')[0]
                      .split(',')[0] > 255
                  ? 255
                  : eachColor
                      .split('(')[1]
                      .split(')')[0]
                      .split(',')[0]}
                ,
              </Text>
              <Text style={{color: 'white', fontSize: 10}}>
                {eachColor
                  .split('(')[1]
                  .split(')')[0]
                  .split(',')[1] < 0
                  ? 0
                  : eachColor
                      .split('(')[1]
                      .split(')')[0]
                      .split(',')[1] > 255
                  ? 255
                  : Math.round(
                      eachColor
                        .split('(')[1]
                        .split(')')[0]
                        .split(',')[1],
                    )}
                ,
              </Text>
              <Text style={{color: 'white', fontSize: 10}}>
                {eachColor
                  .split('(')[1]
                  .split(')')[0]
                  .split(',')[2] < 0
                  ? 0
                  : eachColor
                      .split('(')[1]
                      .split(')')[0]
                      .split(',')[2] > 255
                  ? 255
                  : Math.round(
                      eachColor
                        .split('(')[1]
                        .split(')')[0]
                        .split(',')[2],
                    )}
                )
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View
        style={{
          height: 60,
          backgroundColor: 'rgb(50,50,50)',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
          }}>
          rgb({props.r},{props.g},{props.b})
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 20,
          }}>
          {props.hex}
        </Text>
      </View>
    </View>
  );
};
