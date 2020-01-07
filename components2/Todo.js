import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableNativeFeedback,
  TouchableOpacity,
  
} from 'react-native';

export default class Todo extends React.Component {
  state = {
   newTodo:"",
    Todos: [],
  };

  removeAll = () => {
    this.setState({
      Todos: [],
    });
  };

  removeOne = oneItem => {
    this.setState(prevState => {
      return {
        Todos: prevState.Todos.filter(item => item !== oneItem)
      }
    });
  };

  addNew = () => {
    this.setState(prevState => {
    if(this.state.newTodo == ""){
      alert("You can't add an empty Todo")
    }
    else if( this.state.Todos.includes(this.state.newTodo) == true)
    {alert("Item already exists on your Todo")}
    else{
      Todo: prevState.Todos.push(this.state.newTodo)
    }});
  };

  render() {
    return (
      //container ViMath.random()ew
      <View style={styles.main}>
        {/* Body View */}
        <View style={{flex: 5}}>
          <View style={styles.top}>
            <TextInput
              style={styles.inputText}
              underlineColorAndroid="transparent"
              placeholder="Add New Todo"
              placeholderTextColor="white"
              autoCapitalize="none"
              onChangeText={(text) => this.setState({newTodo:text})}
            />

            <TouchableNativeFeedback
              onPress={this.addNew}
              >
              <View style={styles.button}>
                <Text style={{color: 'white'}}>Add-Todo</Text>
              </View>
            </TouchableNativeFeedback>
          </View>

          <FlatList
            data={this.state.Todos}
            renderItem={({item}) => (
              <View style={styles.todoText}>
                <Text>{item}</Text>
                <TouchableOpacity style={styles.deleteOne} onPress={() => this.removeOne(item)}>
                  <Text style={{color: "rgb(255,100,100)",fontSize:20,paddingTop:5}}> 
                    X
                  </Text>
                  </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <TouchableNativeFeedback onPress={this.removeAll}>
          <View style={styles.deleteAll}>
            <Text
              style={{fontSize: 40, paddingTop: 10, color: 'rgb(255,100,100)'}}>
              X
            </Text>
          </View>
        </TouchableNativeFeedback>

        {/* Footer View */}
        <View style={{flex: 0.2, backgroundColor: 'rgb(70,70,90)'}}>
          <Text style={styles.footerText}>CSD Art&Logic</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'rgb(255,100,100)',
  },
  headerText: {
    color: 'rgb(180,180,220)',
    fontSize: 20,
    fontFamily: 'ubuntu',
  },
  headerContainer: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(70,70,90)',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  todoText: {
    flexDirection:"row",
    justifyContent:"space-between",
    color: 'rgb(70,70,90)',
    fontSize: 16,
    backgroundColor: 'rgb(255,150,150)',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgb(20,20,60)',
  },
  inputText: {
    marginTop: 10,
    alignSelf: 'center',
    marginBottom: 10,
    width: '60%',
    height: 40,
    borderColor: 'rgb(30,130,130)',
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgb(80,180,180)',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(50,150,150)',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'rgb(50,130,130)',
    height: 40,
    width: 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  footerText: {
    color: 'rgb(180,180,220)',
    fontSize: 15,
    alignSelf: 'center',
  },
  deleteAll: {
    alignSelf: 'flex-end',
    height: 60,
    width: 60,
    margin: 10,
    borderRadius: 30,
    backgroundColor: 'rgb(70,70,90)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteOne:{
    backgroundColor:'rgb(70,70,90)',
    width:30,
    height:30,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:5
  }
});
