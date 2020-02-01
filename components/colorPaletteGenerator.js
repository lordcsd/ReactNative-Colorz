import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  TextInput,
} from 'react-native';

let showPrompt = false;

let PaletteGenerator = props => {
  const [state, setState] = useState({
    main: props.colorGroups.main,
    inverse: props.colorGroups.inverse,
    gradientToBrighter: props.colorGroups.gradientToBrighter,
    gradientToInverse: props.colorGroups.gradientToInverse,
    harmonics: props.colorGroups.harmonics,
    complimentary: props.colorGroups.complimentary,
    compliFollow: props.colorGroups.compliFollow,
    gradientToRandom: props.colorGroups.gradientToRandom,
    showPrompt: false,
    final: [],
  });

  let pattern1 = [state.main, ...state.gradientToBrighter];
  let pattern2 = [state.main, ...state.gradientToInverse, state.inverse];
  let pattern3 = [
    state.complimentary[1],
    state.main,
    state.complimentary[0],
    state.complimentary[2],
    state.compliFollow,
  ];
  let pattern4 = [...state.harmonics];
  let pattern5 = [state.main, ...state.gradientToRandom];

  let patterns = [pattern1, pattern2, pattern3, pattern4, pattern5];

  let hidePrompt = () => {
    setState({...state, showPrompt: false});
  };

  return (
    <View style={styles.main}>
      <View style={{marginTop: 20}}>
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
                style={[{backgroundColor: `${pat[1]}`,borderRightWidth:1,borderLeftWidth:1}, styles.blocks]}></View>

              <View
                style={[{backgroundColor: `${pat[2]}`}, styles.blocks]}></View>

              <View
                style={[{backgroundColor: `${pat[3]}`,borderRightWidth:1,borderLeftWidth:1}, styles.blocks]}></View>

              <View
                style={[{backgroundColor: `${pat[4]}`}, styles.blocks]}></View>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.underText}>Tap preferred color palette to save</Text>
      {state.showPrompt == true ? (
        <CustomPrompt hidePrompt={hidePrompt} final={state.final} />
      ) : (
        <View></View>
      )}
    </View>
  );
};

let CustomPrompt = props => {
  let [state, setState] = useState({
    paletteName: '',
  });
  return (
    <View style={styles.promptStyle}>
      <TextInput
        value={state.paletteName}
        onChangeText={async text => {
          await setState({paletteName: text});
        }}
        placeholder="Enter name here"
        placeholderTextColor="white"
        style={styles.promptInput}
      />

      <View style={styles.promptButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            if (state.paletteName.length == 0) {
              alert('Please Enter a name');
            } else {
              let fin = {selected: props.final};
              AsyncStorage.setItem(
                JSON.stringify(state.paletteName),
                JSON.stringify(fin),
              );
              props.hidePrompt()
              alert("Saved")
            }
          }}>
          <View style={styles.promptSave}>
            <Text>Save</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={props.hidePrompt}>
          <View style={styles.promptBack}>
            <Text>Back</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

let styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgb(60,60,60)',
    alignItems: 'center',
  },
  colors: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 10,
    borderRadius: 10,
    borderColor: 'rgb(100,100,100)',
    width: 250,
  },
  blocks: {
    height: 50,
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
    color: 'rgb(220,220,220)',
    fontSize: 20,
    marginVertical: 10,
  },
  promptStyle: {
    height: 250,
    width: '80%',
    backgroundColor: 'rgba(20,150,150,0.8)',
    position: 'absolute',
    marginTop: 100,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'rgb(100,160,255)',
  },
  promptInput: {
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 6,
    width: '80%',
    margin: '10%',
    color: 'white',
  },
  promptButtonContainer: {
    width: '80%',
    margin: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  promptSave: {
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgb(50,220,220)',
    backgroundColor: 'rgb(30,180,180)',
    alignItems: 'center',
  },
  promptBack: {
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgb(180,60,50)',
    backgroundColor: 'rgb(220,80,80)',
    alignItems: 'center',
  },
});

export default PaletteGenerator;
