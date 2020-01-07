import React, {Component} from 'react';
import Slider from 'react-native-slider';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  AsyncStorage,
  Image,
} from 'react-native';
import Palettes from './icons/icon.png';
import newPalette from './icons/newPalette.png';

export default class Color extends Component {
  state = {
    red: 0,
    green: 0,
    blue: 0,
    inverseRed: 255,
    inverseGreen: 255,
    inverseBlue: 255,
    inverseHexcode: '#ffffff',
    hexCode: '#000000',
    graR: 0,
    graG: 0,
    graB: 0,
    gra2R: 0,
    gra2G: 0,
    gra2B: 0,
  };

  componentWillMount() {
    this.setColor();
  }

  setColor = async () => {
    let d = await this.props.selected;
    this.setState({
      red: Number(d.red),
      green: Number(d.green),
      blue: Number(d.blue),
      hexCode: d.hex,
      inverseRed: Number(255 - d.red),
      inverseGreen: Number(255 - d.green),
      inverseBlue: Number(255 - d.blue),
    });
    this.rgbToHex(this.state.red);
    this.rgbToHex(this.state.green);
    this.rgbToHex(this.state.blue);
  };

  check =
    (this.state.red !== this.state.green) !== this.state.blue
      ? this.rgbToHex
      : 1 + 1;

  rgbToHex = inlet => {
    let hex =
      '#' +
      (
        (1 << 24) +
        (this.state.red << 16) +
        (this.state.green << 8) +
        this.state.blue
      )
        .toString(16)
        .slice(1);

    let hex2 =
      '#' +
      (
        (1 << 24) +
        (this.state.inverseRed << 16) +
        (this.state.inverseGreen << 8) +
        this.state.inverseBlue
      )
        .toString(16)
        .slice(1);
    this.setState({hexCode: hex, inverseHexcode: hex2});

    if (inlet > 127) {
      let diva = Math.floor((inlet - 127) / 2);
      if (inlet == this.state.red) {
        this.setState({graR: inlet - diva, gra2R: 127 - diva});
      } else if (inlet == this.state.green) {
        this.setState({graG: inlet - diva, gra2G: 127 - diva});
      } else if (inlet == this.state.blue) {
        this.setState({graB: inlet - diva, gra2B: 127 - diva});
      }
    } else if (inlet < 127) {
      let diva = Math.floor((127 - inlet) / 2);
      if (inlet == this.state.red) {
        this.setState({graR: inlet + diva, gra2R: 127 + diva});
      } else if (inlet == this.state.green) {
        this.setState({graG: inlet + diva, gra2G: 127 + diva});
      } else if (inlet == this.state.blue) {
        this.setState({graB: inlet + diva, gra2B: 127 + diva});
      }
    }
  };

  render() {
    return (
      <View
        onValueChange={this.rgbToHex}
        style={{backgroundColor: 'rgb(190,190,190)', flex: 1}}>
        <View style={{backgroundColor: 'rgb(100,100,100)'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{margin: 10}}>
              <View
                style={{
                  width: 150,
                  height: 70,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-end',
                  borderTopLeftRadius: 10,
                  backgroundColor: `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
                }}>
                <Text
                  style={{
                    color: `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
                    backgroundColor: 'rgb(22,22,22)',
                    fontSize: 20,
                    width: 90,
                    borderTopRightRadius: 10,
                    paddingLeft: 10,
                  }}>
                  main
                </Text>
              </View>

              <View>
                <Text style={styles.screens}>{this.state.hexCode}</Text>
                <Text style={styles.screens}>
                  rgb({this.state.red},{this.state.green},{this.state.blue})
                </Text>
              </View>
            </View>

            <View style={{margin: 10}}>
              <View
                style={{
                  width: 150,
                  height: 70,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-end',
                  borderTopRightRadius: 10,
                  backgroundColor: `rgb(${this.state.inverseRed},${this.state.inverseGreen},${this.state.inverseBlue})`,
                }}>
                <Text
                  style={{
                    color: `rgb(${this.state.inverseRed},${this.state.inverseGreen},${this.state.inverseBlue})`,
                    backgroundColor: 'rgb(22,22,22)',
                    fontSize: 20,
                    width: 90,
                    borderTopRightRadius: 10,
                    paddingLeft: 10,
                  }}>
                  inverse
                </Text>
              </View>

              {/* darker to darker */}

              <View>
                <Text style={styles.screens}>{this.state.inverseHexcode}</Text>
                <Text style={styles.screens}>
                  rgb({this.state.inverseRed},{this.state.inverseGreen},
                  {this.state.inverseBlue})
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <View style={styles.gradient}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    backgroundColor: `rgb(${this.state.red - 102},${this.state
                      .green - 102},${this.state.blue - 102})`,
                    height: 30,
                    width: 64,
                    borderTopLeftRadius:10
                  }}></View>
                <View
                  style={{
                    backgroundColor: `rgb(${this.state.red- 51},${this.state
                      .green- 51},${this.state.blue- 51})`,
                    height: 30,
                    width: 64,
                  }}></View>
                <View
                  style={{
                    backgroundColor: `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
                    height: 30,
                    width: 64,
                  }}></View>
                <View
                  style={{
                    backgroundColor: `rgb(${this.state.red + 51},${this.state
                      .green + 51},${this.state.blue + 51})`,
                    height: 30,
                    width: 64,
                  }}></View>
                <View
                  style={{
                    backgroundColor: `rgb(${this.state.red + 102},${this.state
                      .green + 102},${this.state.blue + 102})`,
                    height: 30,
                    width: 64,
                    borderTopRightRadius:10
                  }}></View>
              </View>
            </View>
            <View>
              <Text
                style={{
                  backgroundColor: 'rgb(22,22,22)',
                  color: 'rgb(220,220,220)',
                  height: 20,
                  textAlign: 'left',
                  width: 320,
                  paddingLeft: 10,
                }}>
                Darker to lighter
              </Text>
            </View>
          </View>

          {/* gradient to inverse */}

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <View style={styles.gradient}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    backgroundColor: `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
                    height: 30,
                    width: 64,
                    borderTopLeftRadius:10
                  }}></View>
                <View
                  style={{
                    backgroundColor: `rgb(${this.state.graR},${this.state.graG},${this.state.graB})`,
                    height: 30,
                    width: 64,
                  }}></View>
                <View
                  style={{
                    backgroundColor: `rgb(127,127,127)`,
                    height: 30,
                    width: 64,
                  }}></View>
                <View
                  style={{
                    backgroundColor: `rgb(${this.state.gra2R},${this.state.gra2G},${this.state.gra2B})`,
                    height: 30,
                    width: 64,
                  }}></View>
                <View
                  style={{
                    backgroundColor: `rgb(${this.state.inverseRed},${this.state.inverseGreen},${this.state.inverseBlue})`,
                    height: 30,
                    width: 64,
                    borderTopRightRadius:10
                  }}></View>
              </View>
            </View>
            <View>
              <Text
                style={{
                  backgroundColor: 'rgb(22,22,22)',
                  color: 'rgb(220,220,220)',
                  height: 20,
                  textAlign: 'left',
                  width: 320,
                  paddingLeft: 10,
                }}>
                Gradient to inverse
              </Text>
            </View>
          </View>

          {/* complimentry colors */}

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <View style={styles.gradient}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    backgroundColor: `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
                    height: 30,
                    width: 53.3333,
                    borderTopLeftRadius: 10,
                  }}></View>
                <View
                  style={{
                    backgroundColor: `rgb(${Math.floor((this.state.red + this.state.blue) / 2)},${Math.floor((this.state.green + this.state.red) / 2)},${Math.floor((this.state.blue + this.state.green) / 2)})`,
                    height: 30,
                    width: 53.3333,
                  }}></View>
                <View
                  style={{
                    backgroundColor: `rgb(${this.state.blue},${this.state.red},${this.state.green})`,
                    height: 30,
                    width: 53.3333,
                  }}></View>
                <View
                  style={{
                    backgroundColor: `rgb(${Math.floor(
                      (this.state.blue + this.state.green) / 2
                    )},
                      ${Math.floor(
                        (this.state.red + this.state.blue) / 2,
                      )},${Math.floor(
                      (this.state.green + this.state.red) / 2,
                    )})`,
                    height: 30,
                    width: 53.3333,
                  }}></View>
                <View
                  style={{
                    backgroundColor: `rgb(${this.state.green},${this.state.blue},${this.state.red})`,
                    height: 30,
                    width: 53.3333,
                  }}></View>

                <View
                  style={{
                    backgroundColor: `rgb(${Math.floor(
                      (this.state.green + this.state.red) / 2,
                    )},
                      ${Math.floor(
                        (this.state.blue + this.state.green) / 2,
                      )},${Math.floor((this.state.red + this.state.blue) / 2)})`,
                    height: 30,
                    width: 53.3333,
                    borderTopRightRadius:10
                  }}></View>
              </View>
            </View>
            <View>
              <Text
                style={{
                  backgroundColor: 'rgb(22,22,22)',
                  color: 'rgb(220,220,220)',
                  height: 20,
                  textAlign: 'left',
                  width: 320,
                  paddingLeft: 10,
                }}>
                Harmonics
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity>
              <Image
                source={newPalette}
                style={{height: 30, width: 30, margin: 15}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={Palettes}
                style={{height: 30, width: 30, margin: 15}}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={styles.plusAndMinus}>
            <TouchableOpacity
              style={styles.button}
              onPressOut={this.rgbToHex}
              onPressIn={() => {
                this.rgbToHex(this.state.red);
                this.rgbToHex(this.state.green);
                this.rgbToHex(this.state.blue);
                this.state.red > 0
                  ? this.setState({
                      red: this.state.red - 1,
                      inverseRed: this.state.inverseRed + 1,
                    })
                  : 1 + 1;
              }}>
              <Text style={styles.innerText}>-</Text>
            </TouchableOpacity>

            <Slider
              value={this.state.red}
              minimumValue={0}
              thumbStyle={styles.redThumb}
              maximumValue={255}
              onValueChange={value => {
                this.rgbToHex(this.state.red);
                this.rgbToHex(this.state.green);
                this.rgbToHex(this.state.blue);
                let value2 = 255 - Math.floor(value);
                return this.setState({
                  red: Math.floor(value),
                  inverseRed: value2,
                });
              }}
              style={styles.slider}
            />

            <TouchableOpacity
              style={styles.button}
              onPressOut={this.rgbToHex}
              onPressIn={() => {
                this.rgbToHex(this.state.red);
                this.rgbToHex(this.state.green);
                this.rgbToHex(this.state.blue);
                this.state.red < 255
                  ? this.setState({
                      red: this.state.red + 1,
                      inverseRed: this.state.inverseRed - 1,
                    })
                  : 1 + 1;
              }}>
              <Text style={styles.innerText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={styles.plusAndMinus}>
            <TouchableOpacity
              style={styles.button}
              onPressOut={this.rgbToHex}
              onPressIn={() => {
                this.rgbToHex(this.state.red);
                this.rgbToHex(this.state.green);
                this.rgbToHex(this.state.blue);
                this.state.green > 0
                  ? this.setState({
                      green: this.state.green - 1,
                      inverseGreen: this.state.inverseGreen + 1,
                    })
                  : 1 + 1;
              }}>
              <Text style={styles.innerText}>-</Text>
            </TouchableOpacity>

            <Slider
              value={this.state.green}
              trackStyle={styles.track}
              thumbStyle={styles.greenThumb}
              minimumValue={0}
              maximumValue={255}
              onValueChange={value => {
                this.rgbToHex(this.state.red);
                this.rgbToHex(this.state.green);
                this.rgbToHex(this.state.blue);
                let value3 = 255 - Math.floor(value);
                this.setState({
                  green: Math.floor(value),
                  inverseGreen: value3,
                });
              }}
              style={styles.slider}
            />

            <TouchableOpacity
              style={styles.button}
              onPressOut={this.rgbToHex}
              onPressIn={() => {
                this.rgbToHex(this.state.red);
                this.rgbToHex(this.state.green);
                this.rgbToHex(this.state.blue);
                this.state.green < 255
                  ? this.setState({
                      green: this.state.green + 1,
                      inverseGreen: this.state.inverseGreen - 1,
                    })
                  : 1 + 1;
              }}>
              <Text style={styles.innerText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={styles.plusAndMinus}>
            <TouchableOpacity
              style={styles.button}
              onPressOut={this.rgbToHex}
              onPressIn={() => {
                this.rgbToHex(this.state.red);
                this.rgbToHex(this.state.green);
                this.rgbToHex(this.state.blue);
                this.state.blue > 0
                  ? this.setState({
                      blue: this.state.blue - 1,
                      inverseBlue: this.state.inverseBlue + 1,
                    })
                  : 1 + 1;
              }}>
              <Text style={styles.innerText}>-</Text>
            </TouchableOpacity>

            <Slider
              value={this.state.blue}
              minimumValue={0}
              maximumValue={255}
              thumbStyle={styles.blueThumb}
              onValueChange={value => {
                this.rgbToHex(this.state.red);
                this.rgbToHex(this.state.green);
                this.rgbToHex(this.state.blue);
                let value4 = 255 - Math.floor(value);
                this.setState({
                  blue: Math.floor(value),
                  inverseBlue: value4,
                });
              }}
              style={styles.slider}
            />

            <TouchableOpacity
              style={styles.button}
              onPressOut={this.rgbToHex}
              onPressIn={() => {
                this.rgbToHex(this.state.red);
                this.rgbToHex(this.state.green);
                this.rgbToHex(this.state.blue);
                this.state.blue < 255
                  ? this.setState({
                      blue: this.state.blue + 1,
                      inverseBlue: this.state.inverseBlue - 1,
                    })
                  : 1 + 1;
              }}>
              <Text style={styles.innerText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  slider: {
    width: 250,
    borderRadius: 10,
  },
  main: {
    alignItems: 'center',
    backgroundColor: 'rgb(59,59,59)',
  },
  plusAndMinus: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'rgb(100,100,100)',
    margin: 5,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  innerText: {
    color: 'rgb(220,220,220)',
    fontSize: 25,
    paddingTop: 5,
  },
  redThumb: {
    height: 30,
    width: 30,
    backgroundColor: 'rgb(255,50,50)',
    borderRadius: 15,
    borderColor: 'black',
    borderWidth:1
  },
  greenThumb: {
    height: 30,
    width: 30,
    backgroundColor: 'rgb(50,255,50)',
    borderRadius: 15,
    borderColor: 'black',
    borderWidth:1
  },
  blueThumb: {
    height: 30,
    width: 30,
    backgroundColor: 'rgb(50,50,255)',
    borderRadius: 15,
    borderColor: 'white',
    borderWidth:1
  },

  color: {
    marginLeft: 10,
    padding: 5,
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
  },
  screens: {
    backgroundColor: 'rgb(22,22,22)',
    fontSize: 15,
    textAlign: 'left',
    color: 'rgb(220,220,220)',
    width: 150,
    paddingHorizontal: 10,
  },
  gradient: {
    flexDirection: 'row',
  },
  input: {
    backgroundColor: 'red',
  },
});
