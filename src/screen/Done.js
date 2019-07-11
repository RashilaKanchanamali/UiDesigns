import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import Button from '../UI/components/Button/Button';
export class Done extends Component {

  static navigationOptions={ 
    // header:null,
    tabBarVisible:true ,
    title: 'Done'
}
  
  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.textContainer}>
          <Text style={styles.text1}> PB-DWH</Text>
        </View>

        <View style = {styles.textContainer}>
          <Text style={styles.text1}> Meeting with Mr.Ruwan </Text>
        </View>

        <View style = {styles.textTime}>
          <View style = {styles.textContainer}>
            <TextInput style={styles.text1}>       </TextInput>
          </View>
          
          <View style = {styles.textContainer}>
            <Text>-</Text>
          </View>
          <View style = {styles.textContainer}>
            <TextInput style={styles.text1}>       </TextInput>
          </View>
        </View>

        <View style = {styles.textContainer}>
          <TextInput style={styles.text1}> Notes {'\n'} </TextInput>
          
        </View>

        <View style = {styles.textContainer}>
          <Button>
           Add to Time Sheet
          </Button>
        </View>
      </View>
    );
  }
}
export default Done;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#87CEEB',
  },
  text1: {
    fontSize: 16,
    borderWidth: 1,
    // borderRadius: 3,
    borderColor: '#000000',
    // width: 150,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10
    
  },
  textContainer: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingTop: 20
  },
  textTime: {
    flexDirection: 'row',
    alignSelf: 'flex-start'
  }
});

      

