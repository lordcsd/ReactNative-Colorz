import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

class Body extends Component {
  state = {
    arr: '',
    toggle: 9,
    button1: ' ',
    button2: ' ',
    button3: ' ',
    button4: ' ',
    button5: ' ',
    button6: ' ',
    button7: ' ',
    button8: ' ',
    button9: ' ',
    reload: {
      fontSize: 30,
      textAlign: 'center',
      color: 'rgb(248, 220, 56)',
    },winner:""
  };

  playAgain = () => {
    this.setState({
      arr: '',
      toggle: 9,
      button1: ' ',
      button2: ' ',
      button3: ' ',
      button4: ' ',
      button5: ' ',
      button6: ' ',
      button7: ' ',
      button8: ' ',
      button9: ' ',
      winner: ""
    });
  };

  sayWinner = () => {
    if (this.state.arr.length % 2 == 0) {
      if (this.state.winner == 'X') {
        this.setState({winner:'X'})
      } else {
        this.setState({winner:'O'})
      }
    } else if (this.state.arr.length % 2 == 1) {
      if (this.state.winner == 'O') {
        this.setState({winner:'O'})
      } else {
        this.setState({winner:'X'})
      }
    }
  };

  checker = () => {
    //horizonal check
    if (
      (this.state.button1 == 'X' &&
        this.state.button2 == 'X' &&
        this.state.button3 == 'X') ||
      (this.state.button1 == 'O' &&
        this.state.button2 == 'O' &&
        this.state.button3 == 'O')
    ) {
      this.sayWinner();
    } else if (
      (this.state.button4 == 'X' &&
        this.state.button5 == 'X' &&
        this.state.button6 == 'X') ||
      (this.state.button4 == 'O' &&
        this.state.button5 == 'O' &&
        this.state.button6 == 'O')
    ) {
      this.sayWinner();
    } else if (
      (this.state.button7 == 'X' &&
        this.state.button8 == 'X' &&
        this.state.button9 == 'X') ||
      (this.state.button7 == 'O' &&
        this.state.button8 == 'O' &&
        this.state.button9 == 'O')
    ) {
      this.sayWinner();
    }

    //vertical chheck
    else if (
      (this.state.button1 == 'X' &&
        this.state.button4 == 'X' &&
        this.state.button7 == 'X') ||
      (this.state.button1 == 'O' &&
        this.state.button4 == 'O' &&
        this.state.button7 == 'O')
    ) {
      this.sayWinner();
    } else if (
      (this.state.button2 == 'X' &&
        this.state.button5 == 'X' &&
        this.state.button8 == 'X') ||
      (this.state.button2 == 'O' &&
        this.state.button5 == 'O' &&
        this.state.button8 == 'O')
    ) {
      this.sayWinner();
    } else if (
      (this.state.button3 == 'X' &&
        this.state.button6 == 'X' &&
        this.state.button9 == 'X') ||
      (this.state.button3 == 'O' &&
        this.state.button6 == 'O' &&
        this.state.button9 == 'O')
    ) {
      this.sayWinner();
    }
    // south-east
    else if (
      (this.state.button1 == 'X' &&
        this.state.button5 == 'X' &&
        this.state.button9 == 'X') ||
      (this.state.button1 == 'O' &&
        this.state.button5 == 'O' &&
        this.state.button9 == 'O')
    ) {
      this.sayWinner();
    }
    //north-east
    else if (
      (this.state.button3 == 'X' &&
        this.state.button5 == 'X' &&
        this.state.button7 == 'X') ||
      (this.state.button3 == 'O' &&
        this.state.button5 == 'O' &&
        this.state.button7 == 'O')
    ) {
      this.sayWinner();
    }
  };

  render() {
    if (this.state.winner == '') {
      return (
        <View style={styles.main}>
          <View>
            <View style={styles.contain}>
              <TouchableOpacity
                onPressOut={this.checker()}
                style={styles.button}
                onPressIn={() => {
                  this.checker;
                  if (this.state.button1 == ' ') {
                    if (this.state.toggle % 2 == 1) {
                      this.setState({button1: 'X'});
                      this.setState({
                        toggle: this.state.toggle - 1,
                        arr: this.state.arr + 'u',
                      });
                    } else {
                      this.setState({button1: 'O'});
                      this.setState({
                        toggle: this.state.toggle - 1,
                        arr: this.state.arr + 'u',
                      });
                    }
                  }
                  this.checker;
                }}>
                <Text style={styles.innerText}>{this.state.button1}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPressOut={this.checker}
                style={styles.button}
                onPressIn={() => {
                  this.checker;
                  if (this.state.button2 == ' ') {
                    if (this.state.toggle % 2 == 1) {
                      this.setState({button2: 'X'});
                      this.setState({
                        toggle: this.state.toggle - 1,
                        arr: this.state.arr + 'u',
                      });
                    } else {
                      this.setState({button2: 'O'});
                      this.setState({
                        toggle: this.state.toggle - 1,
                        arr: this.state.arr + 'u',
                      });
                    }
                  }
                  this.checker;
                }}>
                <Text style={styles.innerText}>{this.state.button2}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPressOut={this.checker()}
                style={styles.button}
                onPressIn={() => {
                  this.checker;
                  if (this.state.button3 == ' ') {
                    if (this.state.toggle % 2 == 1) {
                      this.setState({button3: 'X'});
                      this.setState({
                        toggle: this.state.toggle - 1,
                        arr: this.state.arr + 'u',
                      });
                    } else {
                      this.setState({button3: 'O'});
                      this.setState({
                        toggle: this.state.toggle - 1,
                        arr: this.state.arr + 'u',
                      });
                    }
                  }
                  this.checker;
                }}>
                <Text style={styles.innerText}>{this.state.button3}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.contain}>
              <TouchableOpacity
                onPressOut={this.checker}
                style={styles.button}
                onPressIn={() => {
                  this.checker;
                  if (this.state.button4 == ' ') {
                    if (this.state.toggle % 2 == 1) {
                      this.setState({button4: 'X'});
                      this.setState({
                        toggle: this.state.toggle - 1,
                        arr: this.state.arr + 'u',
                      });
                    } else {
                      this.setState({button4: 'O'});
                      this.setState({
                        toggle: this.state.toggle - 1,
                        arr: this.state.arr + 'u',
                      });
                    }
                  }
                  this.checker;
                }}>
                <Text style={styles.innerText}>{this.state.button4}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPressOut={this.checker}
                style={styles.button}
                onPressIn={() => {
                  this.checker;
                  if (this.state.button5 == ' ') {
                    if (this.state.toggle % 2 == 1) {
                      this.setState({button5: 'X'});
                      this.setState({
                        toggle: this.state.toggle - 1,
                        arr: this.state.arr + 'u',
                      });
                    } else {
                      this.setState({button5: 'O'});
                      this.setState({
                        toggle: this.state.toggle - 1,
                        arr: this.state.arr + 'u',
                      });
                    }
                  }
                  this.checker;
                }}>
                <Text style={styles.innerText}>{this.state.button5}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPressOut={this.checker}
                style={styles.button}
                onPressIn={() => {
                  this.checker;
                  if (this.state.button6 == ' ') {
                    if (this.state.toggle % 2 == 1) {
                      this.setState({button6: 'X'});

                      this.setState({
                        toggle: this.state.toggle - 1,
                        arr: this.state.arr + 'u',
                      });
                    } else {
                      this.setState({button6: 'O'});

                      this.setState({
                        toggle: this.state.toggle - 1,
                        arr: this.state.arr + 'u',
                      });
                    }
                  }
                  this.checker;
                }}>
                <Text style={styles.innerText}>{this.state.button6}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.contain}>
              <TouchableOpacity
                onPressOut={this.checker}
                style={styles.button}
                onPressIn={() => {
                  this.checker;
                  if (this.state.button7 == ' ') {
                    if (this.state.toggle % 2 == 1) {
                      this.setState({button7: 'X'});
                      this.setState({
                        toggle: this.state.toggle - 1,
                        arr: this.state.arr + 'u',
                      });
                    } else {
                      this.setState({button7: 'O'});
                      this.setState({
                        toggle: this.state.toggle - 1,
                        arr: this.state.arr + 'u',
                      });
                    }
                  }
                  this.checker;
                }}>
                <Text style={styles.innerText}>{this.state.button7}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPressOut={this.checker}
                style={styles.button}
                onPressIn={() => {
                  this.checker;
                  if (this.state.button8 == ' ') {
                    if (this.state.toggle % 2 == 1) {
                      this.setState({button8: 'X'});
                      this.setState({
                        toggle: this.state.toggle - 1,
                        arr: this.state.arr + 'u',
                      });
                    } else {
                      this.setState({button8: 'O'});
                      this.setState({
                        toggle: this.state.toggle - 1,
                        arr: this.state.arr + 'u',
                      });
                    }
                  }
                  this.checker;
                }}>
                <Text style={styles.innerText}>{this.state.button8}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPressOut={this.checker}
                style={styles.button}
                onPressIn={() => {
                  this.checker;
                  if (this.state.button9 == ' ') {
                    if (this.state.toggle % 2 == 1) {
                      this.setState({button9: 'X'});
                      this.setState({
                        toggle: this.state.toggle - 1,
                        arr: this.state.arr + 'u',
                      });
                    } else {
                      this.setState({button9: 'O'});
                      this.setState({
                        toggle: this.state.toggle - 1,
                        arr: this.state.arr + 'u',
                      });
                    }
                  }
                  this.checker;
                }}>
                <Text style={styles.innerText}>{this.state.button9}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.playAgain}>
            <TouchableOpacity onPressOut={this.playAgain}>
              <Text style={this.state.reload}>Reload</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    else{
      return(
      <View style={styles.winnerScreen}>
        <Text style={styles.winnerText}>
          {this.state.winner}
        </Text>
        <Text style={styles.winnerText}>Wins</Text>

        <View style={styles.playAgain}>
            <TouchableOpacity onPressOut={this.playAgain}>
              <Text style={this.state.reload}>Reload</Text>
            </TouchableOpacity>
          </View>
      </View>
      )
    }
  }
}

export default Body;

let styles = StyleSheet.create({
  logo: {
    marginBottom: 25,
  },
  top: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: 'rgb(0,150,150)',
    width: 120,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgb(255,200,0)',
  },
  innerText: {
    fontSize: 80,
    textAlign: 'center',
    color: 'rgb(80, 80, 80)',
  },
  contain: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: 'rgb(255,100,100)',
    height: 100,
    width: 100,
    borderColor: 'rgb(225,100,0)',
    borderWidth: 1,
  },
  playAgain: {
    width: '50%',
    height: 35,
    alignItems: 'center',
    backgroundColor: 'rgb(100,100,150)',
    marginTop: 50,
    borderRadius: 10,
    display: 'flex',
  },
  winnerScreen:{
    flex:1,
    backgroundColor:"rgb(50,50,100)",
    alignItems:"center",
    justifyContent:"space-around"
  },
  winnerText:{
    textAlign:"center",
    fontSize:120,
    color:"rgb(0,150,150)"
  }
});
