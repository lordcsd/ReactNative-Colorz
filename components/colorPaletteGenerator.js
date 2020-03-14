import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
  ScrollView,
} from 'react-native';

let PaletteGenerator = props => {
  const [state, setState] = useState({
    main: props.colorGroups.main,
    inverse: props.colorGroups.inverse,
    gradientToBrighter: props.colorGroups.gradientToBrighter,
    gradientToInverse: props.colorGroups.gradientToInverse,
    harmonics: props.colorGroups.harmonics,
    complimentary: props.colorGroups.complimentary,
    gradientToRandom: props.colorGroups.gradientToRandom,
    compGradToLighter: props.colorGroups.compGradToLighter,
    darkenedEnd: props.colorGroups.darkenedEnd,
    compInbetween: props.colorGroups.compInbetween,
    showPrompt: false,
    final: [],
  });

  let pattern1 = [...state.gradientToBrighter];
  let pattern2 = [state.main, ...state.gradientToInverse, state.inverse];
  let pattern3 = [
    state.complimentary[1],
    state.complimentary[0],
    state.main,
    state.complimentary[2],
    state.complimentary[3],
  ];
  let pattern4 = [...state.harmonics];
  let pattern5 = [...state.gradientToRandom];
  let pattern6 = [...state.compGradToLighter];
  let pattern7 = [...state.darkenedEnd];
  let pattern8 = [...state.compInbetween];

  let patterns = [
    pattern1,
    pattern2,
    pattern3,
    pattern4,
    pattern5,
    pattern6,
    pattern7,
    pattern8,
  ];

  let UnShowPrompt = () => {
    setState({...state, showPrompt: false});
  };

  return (
    <View style={styles.main}>
      <Text style={styles.underText}>Tap preferred color palette to save</Text>
      <View>
        {patterns.map(pat => {
          return (
            <TouchableOpacity
              style={styles.colors}
              onPress={() => {
                setState({...state, showPrompt: true, final: pat});
              }}>
              <View
                style={[{backgroundColor: `${pat[0]}`}, styles.blocks]}></View>

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
                style={[{backgroundColor: `${pat[2]}`}, styles.blocks]}></View>

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
                style={[{backgroundColor: `${pat[4]}`}, styles.blocks]}></View>
            </TouchableOpacity>
          );
        })}
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
                    if (err) console.log('not saved');
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
    justifyContent:'center'
  },
  colors: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    borderWidth: 6,
    borderRadius: 10,
    borderColor: 'rgb(50,50,50)',
    width: '80%',
  },
  blocks: {
    height: 40,
    width: '20%',
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
    color: 'rgb(50,50,50)',
    fontSize: 20
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
