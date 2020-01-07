import React, {Component} from 'react';
import Slider from 'react-native-slider';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

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
  };

  check =
    (this.state.red !== this.state.green) !== this.state.blue
      ? this.rgbToHex
      : 1 + 1;

  rgbToHex = () => {
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
  };

  render() {
    return (
      <View style={styles.main} onValueChange={this.rgbToHex}>
        <View style={{flexDirection:"row",alignItems:"center"}}>
          <Text style={{width:"30%",textAlign:"center",color:"white"}}>Main Color</Text>
          <View
            style={{
              marginTop:20,
              borderBottomLeftRadius:10,
              borderTopLeftRadius:10,
              width: '70%',
              height: 150,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
            }}>
            <Text style={styles.screens}>{this.state.hexCode}</Text>
            <Text style={styles.screens}>
              rgb({this.state.red},{this.state.green},{this.state.blue})
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row',alignItems:"center"}}>
          <Text style={{width: '30%', textAlign: 'center',color:"white"}}>Inverse</Text>
          <View
            style={{
              borderBottomLeftRadius:10,
              borderTopLeftRadius:10,
              width: '70%',
              height: 50,
              backgroundColor: `rgb(${this.state.inverseRed},${this.state.inverseGreen},${this.state.inverseBlue})`,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                backgroundColor:"rgba(0,0,0,0.5)",
                borderRadius:3,
                fontSize: 15,
                paddingHorizontal:5
              }}>
              rgb({this.state.inverseRed},{this.state.inverseGreen},
              {this.state.inverseBlue}) {this.state.inverseHexcode}
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row',alignItems:"center"}}>
          <Text style={{textAlign: 'center', width: '30%',color:"white"}}>
            Darker to Lighter
          </Text>

          <View style={styles.gradient}>
            <View
              style={{
                borderBottomLeftRadius:10,
                borderTopLeftRadius:10,
                backgroundColor: `rgb(${this.state.red - 50},${this.state
                  .green - 50},${this.state.blue - 50})`,
                height: 50,
                width: 50,
              }}>
              </View>
            <View
              style={{
                backgroundColor: `rgb(${this.state.red - 25},${this.state
                  .green - 25},${this.state.blue - 25})`,
                height: 50,
                width: 50,
              }}></View>
            <View
              style={{
                backgroundColor: `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
                height: 50,
                width: 50,
              }}></View>
            <View
              style={{
                backgroundColor: `rgb(${this.state.red + 25},${this.state
                  .green + 25},${this.state.blue + 25})`,
                height: 50,
                width: 50,
              }}></View>
            <View
              style={{
                backgroundColor: `rgb(${this.state.red + 50},${this.state
                  .green + 50},${this.state.blue + 50})`,
                height: 50,
                width: 50,
              }}>
                
              </View>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text style={{width: '30%', textAlign: 'center',color:"white"}}>
            Complimentry Colors
          </Text>
          <View
            style={{
              alignItems:"center",
              justifyContent:"center",
              borderBottomLeftRadius:10,
              borderTopLeftRadius:10,
              width: 83.33333,
              height: 50,
              backgroundColor: `rgb(${this.state.blue},${this.state.red},${this.state.green})`,
            }}>
              <Text style={{fontSize:10,backgroundColor:"rgba(0,0,0,0.5)",color:"white",borderRadius:2}}>
              rgb({this.state.blue},{this.state.red},{this.state.green})
              </Text>
            </View>

          <View
            style={{
              alignItems:"center",
              justifyContent:"center",
              width: 83.33333,
              height: 50,
              backgroundColor: `rgb(${this.state.green},${this.state.blue},${this.state.red})`,
            }}>
              <Text style={{fontSize:10,backgroundColor:"rgba(0,0,0,0.5)",color:"white",borderRadius:2}}>
              rgb({this.state.green},{this.state.blue},{this.state.red})
              </Text>
            </View>

          <View
            style={{
              alignItems:"center",
              justifyContent:"center",
              width: 83.33333,
              height: 50,
              backgroundColor: `rgb(${this.state.red},${this.state.green},${this.state.blue})`,
            }}>
               <Text style={{fontSize:10,backgroundColor:"rgba(0,0,0,0.5)",color:"white",borderRadius:2}}>
              rgb({this.state.red},{this.state.green},{this.state.blue})
              </Text>
            </View>
        </View>

        <View>
          <View>
            <Text style={styles.color}>Red:{this.state.red}</Text>
          </View>

          <View style={styles.plusAndMinus}>
            <TouchableOpacity
              style={styles.redButton}
              onPressOut={this.rgbToHex}
              onPressIn={() => {
                this.rgbToHex();
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
              thumbStyle={styles.thumbStyle}
              maximumValue={255}
              onValueChange={value => {
                this.rgbToHex();
                let value2 = 255 - Math.floor(value);
                return this.setState({
                  red: Math.floor(value),
                  inverseRed: value2,
                });
              }}
              style={styles.slider}
            />

            <TouchableOpacity
              style={styles.redButton}
              onPressOut={this.rgbToHex}
              onPressIn={() => {
                this.rgbToHex();
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
          <View>
            <Text style={styles.color}>Green:{this.state.green}</Text>
          </View>

          <View style={styles.plusAndMinus}>
            <TouchableOpacity
              style={styles.greenButton}
              onPressOut={this.rgbToHex}
              onPressIn={() => {
                this.rgbToHex();
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
              thumbStyle={styles.thumbStyle}
              minimumValue={0}
              maximumValue={255}
              onValueChange={value => {
                this.rgbToHex();
                let value3 = 255 - Math.floor(value);
                this.setState({
                  green: Math.floor(value),
                  inverseGreen: value3,
                });
              }}
              style={styles.slider}
            />

            <TouchableOpacity
              style={styles.greenButton}
              onPressOut={this.rgbToHex}
              onPressIn={() => {
                this.rgbToHex();
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
          <View>
            <Text style={styles.color}>Blue:{this.state.blue}</Text>
          </View>

          <View style={styles.plusAndMinus}>
            <TouchableOpacity
              style={styles.blueButton}
              onPressOut={this.rgbToHex}
              onPressIn={() => {
                this.rgbToHex();
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
              thumbStyle={styles.thumbStyle}
              onValueChange={value => {
                this.rgbToHex();
                let value4 = 255 - Math.floor(value);
                this.setState({
                  blue: Math.floor(value),
                  inverseBlue: value4,
                });
              }}
              style={styles.slider}
            />

            <TouchableOpacity
              style={styles.blueButton}
              onPressOut={this.rgbToHex}
              onPressIn={() => {
                this.rgbToHex();
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

styles = StyleSheet.create({
  slider: {
    backgroundColor: 'rgb(0,100,100)',
    width: 250,
    borderRadius: 10,
  },
  main: {
    flex: 1,
    backgroundColor: 'rgb(50,50,50)',
  },
  plusAndMinus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  redButton: {
    backgroundColor: 'rgb(255,80,80)',
    margin: 5,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  greenButton: {
    backgroundColor: 'rgb(70,205,70)',
    margin: 5,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  blueButton: {
    backgroundColor: 'rgb(70,70,205)',
    margin: 5,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  innerText: {
    color: 'white',
    fontSize: 25,
    paddingTop: 5,
  },
  thumbStyle: {
    height: 50,
    width: 30,
    backgroundColor:"white",
    borderRadius:3,
    borderColor:"white"
  },
  color: {
    marginLeft: 10,
    padding: 5,
    fontSize: 15,
    textAlign: 'center',
    color:"white",
  },
  screens: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    color:"white",
    textAlignVertical: 'center',
    borderRadius: 5,
    margin: 5,
    paddingHorizontal: 10,
  },
  gradient: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  input:{
    backgroundColor:"red"
  }
});
