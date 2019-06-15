/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';



export default class App extends Component {

  constructor() {
      super()  
      this.state = {
        inputText: "",
        result: ""
      }  
      this.operators = ['/', '*', '-', '+', '=']
  }

  
  numbersPressed(number) {
    switch(number) {
      case 'DEL':
        const text = this.state.inputText.split('')
        text.pop()
        this.setState({
          inputText: text.join(''),
          result: ''
        })
        break;
      default:
        this.setState({
          inputText: this.state.inputText+number,
          result: ''
        })    
    }
  }

  validate() {
    try {
      eval(this.state.inputText)
      return true
    } catch {
      return false
    }
  }

  calculateResult() {
    this.setState({
      result: eval(this.state.inputText)
    })
  }

  operationsPressed(operation) {
    switch(operation) {
      case '=':
        return this.validate() && this.calculateResult()
      case '+':
      case '-':
      case '/':
      case '*':
        if (this.state.inputText == "") return
        const lastChar = this.state.inputText.split('').pop()
        if (this.operators.indexOf(lastChar) >= 0) {
            return
        } 
        this.setState({
          inputText: this.state.inputText+operation
        })
    }
  }

  render() {
    let numbers = [[7,8,9], [4,5,6], [1,2,3], ['.', 0, 'DEL']]
    let rows = []
    for (let i = 0; i < 3 ; i++) {
      let row = []
      for (let j = 0; j < 4; j++) {
        let style = {}
        if (i == 2 && j == 3) {
          style = styles.deleteStyle;
        }
        row.push(<TouchableOpacity onPress={() => this.numbersPressed(numbers[j][i])} key={numbers[j][i]} style={styles.numberRowItem}>
          <Text style={[styles.white, style]}>{numbers[j][i]}</Text>
        </TouchableOpacity>)
      }
      rows.push(<View key={i} styles={styles.numberRow}>{row}</View>)
    }

    let operations = []
    for (let i = 0; i < 5; i++) {
      let style = {}
      if (i == 4) {
        style = styles.operationRowItem2
      } else {
        style = styles.operationRowItem1
      }
      operations.push(<TouchableOpacity key={this.operators[i]} onPress={() => this.operationsPressed(this.operators[i])} style={style}>
        <Text style={styles.white}>{this.operators[i]}</Text>
      </TouchableOpacity>)
    }

    return (
      <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputTextStyle}>{this.state.inputText}</Text>
          </View>
          <View style={styles.resultContainer}>
            <Text style={styles.resultTextStyle}>{this.state.result}</Text>
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.numberContainer}>
                {rows}
            </View>
            <View style={styles.operationsContainer}>
                {operations}
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputContainer: {
    flex: 3,
    backgroundColor: '#111',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 10
  },
  resultContainer: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  mainContainer: {
    flexGrow: 7,
    backgroundColor: '#000',
    flexDirection: 'row'
  },
  numberContainer: {
    flex: 3,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  operationsContainer: {
    flex: 1,
    backgroundColor: '#222'
  },
  inputTextStyle: {
    fontSize: 42,  
    color: '#fff'
  },
  resultTextStyle: {
    fontSize: 24,
    color: '#888' 
  },
  numberRows: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  }, 
  numberRowItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  white: {
    fontSize: 30,
    color: 'white'
  },
  operationRowItem1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },

  operationRowItem2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'red'
  },
  deleteStyle: {
    fontSize: 20
  }
});
