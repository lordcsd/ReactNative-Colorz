import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

let ViewPalette = props => {
  let [state, setState] = useState({
    colors: props.each1[0],
    paletteName: props.each1[1],
    colorsRGB: [],
    colorsHEX: [],
  });

  let colorsHEX = [];
  let colorsRGB = [];

  let spliter = async one => {
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

    colorsRGB.push(`rgb(${first},${second},${third})`);

    let hexConvert = async () => {
      let hex =
        '#' +
        ((1 << 24) + (first << 16) + (second << 8) + third)
          .toString(16)
          .slice(1);

      colorsHEX.push(hex);
    };
    hexConvert();
  };

  let setter = () => {
    spliter(state.colors[0]);
    spliter(state.colors[1]);
    spliter(state.colors[2]);
    spliter(state.colors[3]);
    spliter(state.colors[4]);
    setState({
      ...state,
      colorsHEX: colorsHEX,
      colorsRGB: colorsRGB,
    });
  };

  useEffect(() => setter(), []);

  return (
    <View style={{flex: 1, width: '100%'}}>
      <View style={{width: '100%', height: '100%'}}>
        {state.colorsRGB.map(eachColor => {
          return (
            <View
              style={{
                height: '20%',
                width: '100%',
                backgroundColor: eachColor,
              }}>
              <Text
                style={{
                  color: 'rgb(255,255,255)',
                  fontSize: 15,
                  backgroundColor: 'rgb(50,50,50)',
                  width: '50%',
                }}>
                {eachColor}
              </Text>
              <Text
                style={{
                  color: 'rgb(255,255,255)',
                  fontSize: 15,
                  backgroundColor: 'rgb(50,50,50)',
                  width: '50%',
                  borderBottomRightRadius:5
                }}>
                {state.colorsHEX[state.colorsRGB.indexOf(eachColor)]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ViewPalette;
