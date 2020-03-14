import React, {Component} from 'react';
import Slider from 'react-native-slider';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Color extends Component {
  state = {
    red: Number(this.props.selected.red),
    green: Number(this.props.selected.green),
    blue: Number(this.props.selected.blue),
    inverseRed: Number(255 - this.props.selected.red),
    inverseGreen: Number(255 - this.props.selected.green),
    inverseBlue: Number(255 - this.props.selected.blue),
    inverseHexcode: '#ffffff',
    hexCode: Number(this.props.selected.hex),
    graR: 0,
    graG: 0,
    graB: 0,
    gra2R: 0,
    gra2G: 0,
    gra2B: 0,
    comp1: [0, 0, 0],
    comp2: [0, 0, 0],
    compInbetween1:[0, 0, 0],
    compInbetween2:[0,0,0],
    darkenedEnd1: [],
    darkenedEnd2: [],
  };

  storeComplimentary = () => {
    let {red, green, blue, comp1, comp2} = this.state;
    let comp1a = [
      Math.floor((this.state.green + this.state.inverseRed) / 2),
      Math.floor((this.state.blue + this.state.inverseGreen) / 2),
      Math.floor((this.state.red + this.state.inverseBlue) / 2),
    ];
    let comp2a = [
      Math.floor((this.state.blue + this.state.inverseRed) / 2),
      Math.floor((this.state.red + this.state.inverseGreen) / 2),
      Math.floor((this.state.green + this.state.inverseBlue) / 2),
    ];

    let CIM1 = comp1[0] < red ? red - comp1[0] : comp1[0] - red;
    let CIM2 = comp1[1] < green ? green - comp1[1] : comp1[1] - green;
    let CIM3 = comp1[2] < blue ? blue - comp1[2] : comp1[2] - blue;

    let compInbetween1 = [CIM1, CIM2, CIM3];

    let CIM4 = comp2[0] < red ? red - comp2[0] : comp2[0] - red;
    let CIM5 = comp2[1] < green ? green - comp2[1] : comp2[1] - green;
    let CIM6 = comp2[2] < blue ? blue - comp2[2] : comp2[2] - blue;

    let compInbetween2 = [CIM4, CIM5, CIM6];

    let darkenedEnd = [];
    let darkenedEnd2 = [];

    if (comp1[0] < comp1[1]) {
      if (comp1[1] < comp1[2]) {
        darkenedEnd = [comp1[0], comp1[0], Math.round(comp1[0] + comp1[0] / 3)];
      } else {
        darkenedEnd = [comp1[0], Math.round(comp1[0] + comp1[0] / 3), comp1[0]];
      }
    } else if (comp1[1] < comp1[2]) {
      if (comp1[2] < comp1[0]) {
        darkenedEnd = [comp1[1], comp1[1], Math.round(comp1[1] + comp1[1] / 3)];
      } else {
        darkenedEnd = [comp1[1], Math.round(comp1[1] + comp1[1] / 3), comp1[1]];
      }
    } else if (comp1[2] < comp1[0]) {
      if (comp1[0] < comp1[1]) {
        darkenedEnd = [comp1[2], comp1[2], Math.round(comp1[1] + comp1[1] / 3)];
      } else {
        darkenedEnd = [comp1[2], Math.round(comp1[1] + comp1[1] / 3), comp1[2]];
      }
    }

    if (comp2[0] < comp2[1]) {
      if (comp2[1] < comp2[2]) {
        darkenedEnd2 = [
          comp2[0],
          comp2[0],
          Math.round(comp2[0] + comp2[0] / 3),
        ];
      } else {
        darkenedEnd2 = [
          comp2[0],
          Math.round(comp2[0] + comp2[0] / 3),
          comp2[0],
        ];
      }
    } else if (comp2[1] < comp2[2]) {
      if (comp2[2] < comp2[0]) {
        darkenedEnd2 = [
          comp2[1],
          comp2[1],
          Math.round(comp2[1] + comp2[1] / 3),
        ];
      } else {
        darkenedEnd2 = [
          comp2[1],
          Math.round(comp2[1] + comp2[1] / 3),
          comp2[1],
        ];
      }
    } else if (comp2[2] < comp2[0]) {
      if (comp2[0] < comp2[1]) {
        darkenedEnd2 = [
          comp2[2],
          comp2[2],
          Math.round(comp2[1] + comp2[1] / 3),
        ];
      } else {
        darkenedEnd2 = [
          comp2[2],
          Math.round(comp2[1] + comp2[1] / 3),
          comp2[2],
        ];
      }
    }

    this.setState({
      comp1: comp1a,
      comp2: comp2a,
      compInbetween1: compInbetween1,
      compInbetween2: compInbetween2,
      darkenedEnd1: darkenedEnd,
      darkenedEnd2: darkenedEnd2,
    });
  };

  componentWillMount() {
    this.setColor();
    this.storeComplimentary();
    setTimeout(()=>this.storeComplimentary(),500)
  }

  setColor = () => {
    this.rgbToHex(this.state.red);
    this.rgbToHex(this.state.green);
    this.rgbToHex(this.state.blue);
    this.storeComplimentary();
  };

  check =
    (this.state.red !== this.state.green) !== this.state.blue
      ? this.rgbToHex
      : 1 + 1;

  rgbToHex = inlet => {
    this.storeComplimentary();
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
      <View onValueChange={this.rgbToHex} style={{flex: 1}}>
        <View
          style={{
            backgroundColor: 'rgb(100,100,100)',
            justifyContent: 'space-between',
            paddingTop: '5%',
            paddingHorizontal: '5%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'space-between',
            }}>
            <View>
              <View
                style={{
                  width: 150,
                  height: 60,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-end',
                  borderTopLeftRadius: 10,
                  backgroundColor: `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
                }}>
                <Text
                  style={{
                    color: `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
                    backgroundColor: 'rgb(22,22,22)',
                    fontSize: 16,
                    width: 90,
                    borderTopRightRadius: 10,
                    paddingHorizontal: 5,
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

            <View>
              <View
                style={{
                  width: 150,
                  height: 60,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-end',
                  borderTopRightRadius: 10,
                  backgroundColor: `rgb(${this.state.inverseRed},${this.state.inverseGreen},${this.state.inverseBlue})`,
                }}>
                <Text
                  style={{
                    color: `rgb(${this.state.inverseRed},${this.state.inverseGreen},${this.state.inverseBlue})`,
                    backgroundColor: 'rgb(22,22,22)',
                    fontSize: 16,
                    width: 90,
                    borderTopRightRadius: 10,
                    paddingHorizontal: 5,
                  }}>
                  inverse
                </Text>
              </View>

              <View>
                <Text style={styles.screens}>{this.state.inverseHexcode}</Text>
                <Text style={styles.screens}>
                  rgb({this.state.inverseRed},{this.state.inverseGreen},
                  {this.state.inverseBlue})
                </Text>
              </View>
            </View>
          </View>

          {/* darker to darker */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <View style={{marginVertical: 10}}>
                <View style={styles.gradient}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        backgroundColor: `rgb(${this.state.red - 100},${this
                          .state.green - 100},${this.state.blue - 100})`,
                        height: 25,
                        width: 30,
                        borderTopLeftRadius: 10,
                      }}></View>
                    <View
                      style={{
                        backgroundColor: `rgb(${this.state.red - 50},${this
                          .state.green - 50},${this.state.blue - 50})`,
                        height: 25,
                        width: 30,
                        borderLeftWidth: 0.5,
                        borderRightWidth: 0.5,
                        borderLeftColor: 'rgb(50,50,50)',
                        borderRightColor: 'rgb(50,50,50)',
                      }}></View>
                    <View
                      style={{
                        backgroundColor: `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
                        height: 25,
                        width: 30,
                      }}></View>
                    <View
                      style={{
                        backgroundColor: `rgb(${this.state.red + 50},${this
                          .state.green + 50},${this.state.blue + 50})`,
                        height: 25,
                        width: 30,
                        borderLeftWidth: 0.5,
                        borderRightWidth: 0.5,
                        borderLeftColor: 'rgb(50,50,50)',
                        borderRightColor: 'rgb(50,50,50)',
                      }}></View>
                    <View
                      style={{
                        backgroundColor: `rgb(${this.state.red + 100},${this
                          .state.green + 100},${this.state.blue + 100})`,
                        height: 25,
                        width: 30,
                        borderTopRightRadius: 10,
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
                      width: 150,
                      paddingLeft: 10,
                    }}>
                    Darker to lighter
                  </Text>
                </View>
              </View>

              {/* gradient to inverse */}

              <View style={{}}>
                <View style={styles.gradient}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        backgroundColor: `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
                        height: 25,
                        width: 30,
                        borderTopLeftRadius: 10,
                      }}></View>
                    <View
                      style={{
                        backgroundColor: `rgb(${this.state.graR},${this.state.graG},${this.state.graB})`,
                        height: 25,
                        width: 30,
                        borderLeftWidth: 0.5,
                        borderRightWidth: 0.5,
                        borderLeftColor: 'rgb(50,50,50)',
                        borderRightColor: 'rgb(50,50,50)',
                      }}></View>
                    <View
                      style={{
                        backgroundColor: `rgb(127,127,127)`,
                        height: 25,
                        width: 30,
                      }}></View>
                    <View
                      style={{
                        backgroundColor: `rgb(${this.state.gra2R},${this.state.gra2G},${this.state.gra2B})`,
                        height: 25,
                        width: 30,
                        borderLeftWidth: 0.5,
                        borderRightWidth: 0.5,
                        borderLeftColor: 'rgb(50,50,50)',
                        borderRightColor: 'rgb(50,50,50)',
                      }}></View>
                    <View
                      style={{
                        backgroundColor: `rgb(${this.state.inverseRed},${this.state.inverseGreen},${this.state.inverseBlue})`,
                        height: 25,
                        width: 30,
                        borderTopRightRadius: 10,
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
                      width: 150,
                      paddingLeft: 10,
                    }}>
                    Gradient to inverse
                  </Text>
                </View>
              </View>
            </View>

            <View>
              {/* complimentry colors */}

              <View style={{marginVertical: 10}}>
                <View style={styles.gradient}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        backgroundColor: `rgb(${this.state.comp1[0]},${this.state.comp1[1]},${this.state.comp1[2]})`,
                        height: 25,
                        width: 50,
                        borderLeftWidth: 0.5,
                        borderRightWidth: 0.5,
                        borderLeftColor: 'rgb(50,50,50)',
                        borderRightColor: 'rgb(50,50,50)',
                        borderTopLeftRadius: 10,
                      }}></View>

                    <View
                      style={{
                        backgroundColor: `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
                        height: 25,
                        width: 50,
                      }}></View>

                    <View
                      style={{
                        backgroundColor: `rgb(${this.state.comp2[0]},${this.state.comp2[1]},${this.state.comp2[2]})`,
                        height: 25,
                        width: 50,
                        borderTopRightRadius: 10,
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
                      width: 150,
                      paddingLeft: 10,
                    }}>
                    Complimentary
                  </Text>
                </View>
              </View>

              {/* harmonics colors */}

              <View style={{}}>
                <View style={styles.gradient}>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        backgroundColor: `rgb(${this.state.inverseGreen},${this.state.inverseBlue},${this.state.inverseRed})`,
                        height: 25,
                        width: 30,
                        borderTopLeftRadius: 10,
                      }}></View>

                    <View
                      style={{
                        backgroundColor: `rgb(${Math.floor(
                          (this.state.inverseGreen + this.state.red) / 2,
                        )},${Math.floor(
                          (this.state.inverseBlue + this.state.green) / 2,
                        )},
                    ${Math.floor((this.state.inverseRed + this.state.blue) / 2)}
                    )})`,
                        height: 25,
                        width: 30,
                        borderLeftWidth: 0.5,
                        borderRightWidth: 0.5,
                        borderLeftColor: 'rgb(50,50,50)',
                        borderRightColor: 'rgb(50,50,50)',
                      }}></View>

                    <View
                      style={{
                        backgroundColor: `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
                        height: 25,
                        width: 30,
                      }}></View>
                  </View>

                  <View
                    style={{
                      backgroundColor: `rgb(${Math.floor(
                        (this.state.inverseBlue + this.state.red) / 2,
                      )},${Math.floor(
                        (this.state.inverseRed + this.state.green) / 2,
                      )},${Math.floor(
                        (this.state.inverseGreen + this.state.blue) / 2,
                      )})`,
                      height: 25,
                      width: 30,
                      borderLeftWidth: 0.5,
                      borderRightWidth: 0.5,
                      borderLeftColor: 'rgb(50,50,50)',
                      borderRightColor: 'rgb(50,50,50)',
                    }}></View>

                  <View
                    style={{
                      backgroundColor: `rgb(${this.state.inverseBlue},${this.state.inverseRed},${this.state.inverseGreen})`,
                      height: 25,
                      width: 30,
                      borderTopRightRadius: 10,
                    }}></View>
                </View>
                <View>
                  <Text
                    style={{
                      backgroundColor: 'rgb(22,22,22)',
                      color: 'rgb(220,220,220)',
                      height: 20,
                      textAlign: 'left',
                      width: 150,
                      paddingLeft: 10,
                    }}>
                    harmonics
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                let ranR = Math.round(Math.random() * 80) + 160;
                let ranG = Math.round(Math.random() * 80) + 160;
                let ranB = Math.round(Math.random() * 80) + 160;
                let colorGroups = {
                  main: `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
                  inverse: `rgb(${this.state.inverseRed},${this.state.inverseGreen},${this.state.inverseBlue})`,

                  gradientToBrighter: [
                    `rgb(${this.state.red - 100},${this.state.green -
                      100},${this.state.blue - 100})`,
                    `rgb(${this.state.red - 50},${this.state.green - 50},${this
                      .state.blue - 50})`,
                    `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
                    `rgb(${this.state.red + 50},${this.state.green + 50},${this
                      .state.blue + 50})`,
                    `rgb(${this.state.red + 100},${this.state.green +
                      100},${this.state.blue + 100})`,
                  ],
                  gradientToInverse: [
                    `rgb(${this.state.graR},${this.state.graG},${this.state.graB})`,
                    `rgb(127,127,127)`,
                    `rgb(${this.state.gra2R},${this.state.gra2G},${this.state.gra2B})`,
                  ],
                  complimentary: [
                    `rgb(${this.state.comp1[0]},${this.state.comp1[1]},${this.state.comp1[2]})`,
                    `rgb(${this.state.compInbetween1[0]},${this.state.compInbetween1[1]},${this.state.compInbetween1[2]})`,
                    `rgb(${this.state.compInbetween2[0]},${this.state.compInbetween2[1]},${this.state.compInbetween2[2]})`,
                    `rgb(${this.state.comp2[0]},${this.state.comp2[1]},${this.state.comp2[2]})`,
                  ],
                  harmonics: [
                    `rgb(${this.state.inverseGreen},${this.state.inverseBlue},${this.state.inverseRed})`,
                    `rgb(${Math.floor(
                      (this.state.inverseGreen + this.state.red) / 2,
                    )},${Math.floor(
                      (this.state.inverseBlue + this.state.green) / 2,
                    )},
                    ${Math.floor((this.state.inverseRed + this.state.blue) / 2)}
                    )})`,
                    `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
                    `rgb(${Math.floor(
                      (this.state.inverseBlue + this.state.red) / 2,
                    )},${Math.floor(
                      (this.state.inverseRed + this.state.green) / 2,
                    )},${Math.floor(
                      (this.state.inverseGreen + this.state.blue) / 2,
                    )})`,
                    `rgb(${this.state.inverseBlue},${this.state.inverseRed},${this.state.inverseGreen})`,
                  ],
                  gradientToRandom: [
                    `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
                    `rgb(${Math.floor(
                      (this.state.inverseBlue + this.state.red) / 2,
                    )},${Math.floor(
                      (this.state.inverseRed + this.state.green) / 2,
                    )},${Math.floor(
                      (this.state.inverseGreen + this.state.blue) / 2,
                    )})`,
                    `rgb(${this.state.inverseBlue},${this.state.inverseRed},${this.state.inverseGreen})`,
                    `rgb(${this.state.inverseRed + 100},${this.state
                      .inverseGreen *
                      0.8 +
                      80},${this.state.blue / 2 + 100})`,
                    `rgb(${this.state.inverseRed + 50},${this.state
                      .inverseGreen *
                      0.8 +
                      40},${this.state.blue / 2})`,
                  ],
                  compGradToLighter: [
                    `rgb(${this.state.comp1[0]},${this.state.comp1[1]},${this.state.comp1[2]})`,
                    `rgb(${this.state.red - 50},${this.state.green - 50},${this
                      .state.blue - 50})`,
                    `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
                    `rgb(${this.state.red + 50},${this.state.green + 50},${this
                      .state.blue + 50})`,
                    `rgb(${this.state.comp2[0]},${this.state.comp2[1]},${this.state.comp2[2]})`,
                  ],
                  darkenedEnd: [
                    `rgb(${this.state.darkenedEnd1[0]},${this.state.darkenedEnd1[1]},${this.state.darkenedEnd1[2]})`,
                    `rgb(${this.state.comp1[0]},${this.state.comp1[1]},${this.state.comp1[2]})`,
                    `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
                    `rgb(${this.state.comp2[0]},${this.state.comp2[1]},${this.state.comp2[2]})`,
                    `rgb(${this.state.darkenedEnd2[0]},${this.state.darkenedEnd2[1]},${this.state.darkenedEnd2[2]})`,
                  ],
                  compInbetween: [
                    `rgb(${this.state.comp1[0]},${this.state.comp1[1]},${this.state.comp1[2]})`,
                    `rgb(${this.state.compInbetween1[0]},${this.state.compInbetween1[1]},${this.state.compInbetween1[2]})`,
                    `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
                    `rgb(${this.state.compInbetween2[0]},${this.state.compInbetween2[1]},${this.state.compInbetween2[2]})`,
                    `rgb(${this.state.comp2[0]},${this.state.comp2[1]},${this.state.comp2[2]})`,
                  ],
                };
                Actions.paletteGenerator({
                  colorGroups: colorGroups,
                  refresh: this.props.refresh,
                });
              }}>
              <Text style={styles.generateButton}>Generate color palette</Text>
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
    marginVertical: '1%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'rgb(100,100,100)',
    margin: 5,
    height: 25,
    width: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    paddingBottom: 8,
  },
  innerText: {
    color: 'rgb(220,220,220)',
    fontSize: 25,
    paddingTop: 5,
  },
  redThumb: {
    height: 25,
    width: 20,
    backgroundColor: 'rgb(255,50,50)',
    borderRadius: 3,
    borderColor: 'rgb(50,50,50)',
  },
  greenThumb: {
    height: 25,
    width: 20,
    backgroundColor: 'rgb(50,255,50)',
    borderRadius: 3,
    borderColor: 'rgb(50,50,50)',
  },
  blueThumb: {
    height: 25,
    width: 20,
    backgroundColor: 'rgb(50,50,255)',
    borderRadius: 2,
    borderColor: 'white',
  },

  color: {
    marginLeft: 10,
    padding: 5,
    fontSize: 15,
    textAlign: 'center',
    color: 'rgb(50,50,50)',
  },
  screens: {
    backgroundColor: 'rgb(22,22,22)',
    fontSize: 15,
    textAlign: 'left',
    color: 'rgb(220,220,220)',
    width: 150,
    paddingHorizontal: 5,
  },
  gradient: {
    flexDirection: 'row',
  },
  input: {
    backgroundColor: 'red',
  },
  generateButton: {
    backgroundColor: 'rgb(50,200,100)',
    color: 'rgb(255,255,255)',
    padding: 5,
    borderRadius: 5,
    marginVertical: 10,
  },
});
