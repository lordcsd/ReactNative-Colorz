import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import reload from './icons/reload.png';

let PaletteGenerator = props => {
  const [state, setState] = useState({
    main: props.colorGroups.main,
    mainSplit: props.colorGroups.mainSplit,
    inverse: props.colorGroups.inverse,
    gradientToBrighter: props.colorGroups.gradientToBrighter,
    gradientToInverse: props.colorGroups.gradientToInverse,
    harmonics: props.colorGroups.harmonics,
    complimentary: props.colorGroups.complimentary,
    gradientToRandom: props.colorGroups.gradientToRandom,
    compGradToLighter: props.colorGroups.compGradToLighter,
    darkenedEnd: props.colorGroups.darkenedEnd,
    showPrompt: false,
    final: [],
    random1: [198, 65, 21],
    random2: [21, 220, 180],
    random3: [98, 254, 12],
  });

  let pattern1 = [...state.gradientToBrighter];
  let pattern2 = [state.main, ...state.gradientToInverse, state.inverse];
  let pattern3 = [
    state.complimentary[0],
    state.complimentary[1],
    state.main,
    state.complimentary[2],
    state.complimentary[3],
  ];
  let pattern4 = [...state.harmonics];
  let pattern5 = [...state.gradientToRandom];
  let pattern6 = [...state.compGradToLighter];
  let pattern7 = [...state.darkenedEnd];

  let patterns = [
    pattern1,
    pattern2,
    pattern3,
    pattern4,
    pattern5,
    pattern6,
    pattern7,
  ];

  let UnShowPrompt = () => {
    setState({...state, showPrompt: false});
  };

  let setRandom = () => {
    setState({
      ...state,
      random1: [
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
      ],
      random2: [
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
      ],
      random3: [
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
        Math.round(Math.random() * 255),
      ],
    });
  };

  let setFinal = sent => {
    setState({
      ...state,
      showPrompt: true,
      final: [...sent],
    });
  };

  return (
    <View style={styles.main}>
      <Text style={styles.underText}>Tap preferred color palette to save</Text>
      <View
        style={{
          alignItems: 'center',
        }}>
        <ScrollView style={{paddingHorizontal: 50}}>
          {patterns.map(pat => {
            return (
              <TouchableOpacity
                style={styles.colors}
                onPress={() => {
                  setState({...state, showPrompt: true, final: pat});
                }}>
                <View
                  style={[
                    {backgroundColor: `${pat[0]}`},
                    styles.blocks,
                  ]}></View>

                <View
                  style={[
                    {
                      backgroundColor: `${pat[1]}`,
                      borderRightWidth: 1,
                      borderLeftWidth: 1,
                      borderColor: 'rgb(100,100,100)',
                    },
                    styles.blocks,
                  ]}></View>

                <View
                  style={[
                    {backgroundColor: `${pat[2]}`},
                    styles.blocks,
                  ]}></View>

                <View
                  style={[
                    {
                      backgroundColor: `${pat[3]}`,
                      borderRightWidth: 1,
                      borderLeftWidth: 1,
                      borderColor: 'rgb(100,100,100)',
                    },
                    styles.blocks,
                  ]}></View>

                <View
                  style={[
                    {backgroundColor: `${pat[4]}`},
                    styles.blocks,
                  ]}></View>
              </TouchableOpacity>
            );
          })}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: 250,
              marginVertical: 8,
              justifyContent: 'space-between',
            }}>
            <Text style={{color: 'white'}}>Random color palettes</Text>
            <TouchableOpacity onPress={() => setRandom()}>
              <Image
                source={reload}
                style={{height: 25, width: 25, marginLeft: 30}}
              />
            </TouchableOpacity>
          </View>
          <RandomSide
            RandomColorProp={state.random1}
            main={state.main}
            mainSplitArray={state.mainSplit}
            setFinal={setFinal}
          />
          <RandomSide
            RandomColorProp={state.random2}
            main={state.main}
            mainSplitArray={state.mainSplit}
            setFinal={setFinal}
          />
          <RandomSide
            RandomColorProp={state.random3}
            main={state.main}
            mainSplitArray={state.mainSplit}
            setFinal={setFinal}
          />
          <View style={{height: 100}}></View>
        </ScrollView>
      </View>
      {state.showPrompt == true ? (
        <CustomPrompt
          UnShowPrompt={UnShowPrompt}
          final={state.final}
          paletteKeys={state.paletteKeys}
          refresh={props.refresh}
        />
      ) : (
        <View></View>
      )}
    </View>
  );
};

let RandomSide = props => {
  let mainSplit = props.mainSplitArray;
  let rand = [...props.RandomColorProp];
  let firstDivision = [];
  let secondDivision = [];
  let thirdDivision = [];

  let getter = two => {
    let first =
      mainSplit[0] > rand[0]
        ? Math.round(mainSplit[0] - ((mainSplit[0] - rand[0]) / 4) * two)
        : Math.round(mainSplit[0] + ((rand[0] - mainSplit[0]) / 4) * two);

    let second =
      mainSplit[1] > rand[1]
        ? Math.round(mainSplit[1] - ((mainSplit[1] - rand[1]) / 4) * two)
        : Math.round(mainSplit[1] + ((rand[1] - mainSplit[1]) / 4) * two);
    let third =
      mainSplit[2] > rand[2]
        ? Math.round(mainSplit[2] - ((mainSplit[2] - rand[2]) / 4) * two)
        : Math.round(mainSplit[2] + ((rand[2] - mainSplit[2]) / 4) * two);
    if (two == 1) {
      firstDivision = [first, second, third];
    } else if (two == 2) {
      secondDivision = [first, second, third];
    } else if (two == 3) {
      thirdDivision = [first, second, third];
    }
  };

  getter(1);
  getter(2);
  getter(3);

  return (
    <View>
      <TouchableOpacity
        style={styles.colors}
        onPress={() => {
          props.setFinal([
            props.main,
            `rgb(${firstDivision[0]},${firstDivision[1]},${firstDivision[2]})`,
            `rgb(${secondDivision[0]},
        ${secondDivision[1]},${secondDivision[2]})`,
            `rgb(${thirdDivision[0]},${thirdDivision[1]},${thirdDivision[2]})`,
            `rgb(${rand[0]},${rand[1]},${rand[2]})`,
          ]);
        }}>
        <View
          style={{
            height: 40,
            width: 50,
            backgroundColor: props.main,
          }}></View>
        <View
          style={{
            height: 40,
            width: 50,
            backgroundColor: `rgb(${firstDivision[0]},${firstDivision[1]},${firstDivision[2]})`,
          }}></View>
        <View
          style={{
            height: 40,
            width: 50,
            backgroundColor: `rgb(${secondDivision[0]},${secondDivision[1]},${secondDivision[2]})`,
          }}></View>
        <View
          style={{
            height: 40,
            width: 50,
            backgroundColor: `rgb(${thirdDivision[0]},${thirdDivision[1]},${thirdDivision[2]})`,
          }}></View>
        <View
          style={{
            height: 40,
            width: 50,
            backgroundColor: `rgb(${rand[0]},${rand[1]},${rand[2]})`,
          }}></View>
      </TouchableOpacity>
      {/* secondStyle */}
      <TouchableOpacity
        style={styles.colors}
        onPress={() => {
          props.setFinal([
            props.main,
            `rgb(${secondDivision[0]},${secondDivision[1]},${secondDivision[2]})`,
            `rgb(${rand[0]},${rand[1]},${rand[2]})`,
            `rgb(${secondDivision[2]},${secondDivision[0]},${secondDivision[1]})`,
            `rgb(${rand[2]},${rand[0]},${rand[1]})`,
          ]);
        }}>
        <View
          style={{
            height: 40,
            width: 50,
            backgroundColor: props.main,
          }}></View>
        <View
          style={{
            height: 40,
            width: 50,
            backgroundColor: `rgb(${secondDivision[0]},
                ${secondDivision[1]},${secondDivision[2]})`,
          }}></View>
        <View
          style={{
            height: 40,
            width: 50,
            backgroundColor: `rgb(${rand[0]},${rand[1]},${rand[2]})`,
          }}></View>
        <View
          style={{
            height: 40,
            width: 50,
            backgroundColor: `rgb(${secondDivision[2]},${secondDivision[0]},${secondDivision[1]})`,
          }}></View>
        <View
          style={{
            height: 40,
            width: 50,
            backgroundColor: `rgb(${rand[2]},${rand[0]},${rand[1]})`,
          }}></View>
      </TouchableOpacity>
    </View>
  );
};

let CustomPrompt = props => {
  let [state, setState] = useState({
    paletteName: '',
    paletteKeys: props.palleteKeys,
    exists: false,
  });

  return (
    <View style={styles.promptStyle}>
      <TextInput
        value={state.paletteName}
        maxLength={15}
        onChangeText={async text => {
          await setState({
            paletteName: text == 'edited' ? 'edited1' : text,
          });
        }}
        placeholder="Enter name here"
        style={{
          borderRadius: 6,
          width: '80%',
          backgroundColor: `${
            state.exists == true ? 'rgb(255,160,160)' : 'rgb(220,220,220)'
          }`,
        }}
      />

      <Text>{state.exists == true ? 'name already exists' : ''}</Text>

      <View style={styles.promptButtonContainer}>
        <TouchableOpacity
          onPress={async () => {
            let allKeys = [];
            await AsyncStorage.getAllKeys((err, data) => {
              allKeys = data;
            });
            if (state.paletteName.length == 0) {
              alert('Please Enter a name');
            } else {
              if (allKeys.includes(state.paletteName) == true) {
                setState({
                  exists: true,
                  ...state,
                });
              } else {
                await AsyncStorage.setItem(
                  state.paletteName,
                  JSON.stringify(props.final),
                  (err, data) => {
                    if (data) console.log('saved');
                  },
                );
                props.UnShowPrompt();
                alert(`Save successful!! Goto palettes to view`);
                props.refresh();
              }
            }
          }}>
          <View style={styles.promptSave}>
            <Text style={{color: 'rgb(30,75,60)'}}>Save</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={props.UnShowPrompt}>
          <View style={styles.promptBack}>
            <Text style={{color: 'rgb(255,255,255)'}}>Back</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

let styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgb(100,100,100)',
  },
  colors: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    borderWidth: 3,
    borderRadius: 2,
    borderColor: 'rgb(50,50,50)',
    width: 254,
  },
  blocks: {
    height: 40,
    width: 50,
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
    color: 'white',
    fontSize: 20,
    fontFamily: 'ubuntu',
    textAlign: 'center',
  },
  promptStyle: {
    height: 150,
    width: '80%',
    backgroundColor: 'rgb(255,255,255)',
    position: 'absolute',
    marginTop: 60,
    borderRadius: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
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
});

export default PaletteGenerator;
