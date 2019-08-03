import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView} from 'react-native';
import Button from '../UI/components/Button/Button';
export class Done extends Component {

  static navigationOptions={ 
    // header:null,
    tabBarVisible:true ,
    title: 'Done'
}

constructor(props) {
  super(props);
  this.params = this.props.navigation.state.params,

  this.state = {
    //default value of the date time
 
  };
  this.calendar = null;
}



  render() {
    var Description =  this.params.SelectedDescription
    var Code = this.params.SelectCode
    var TimeFrom = this.params.SelectTimeFrom
    var TimeTo = this.params.SelectTimeTo
    var Token = this.params.TokenTimeSheetInternal

    const { navigate } = this.props.navigation;

    return (
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
        <View style = {styles.textContainer}>
          <Text style={styles.text1}> {Code} </Text>
        </View>

        <View style = {styles.textContainer}>
          <Text style={styles.text1}> {Description} </Text>
        </View>

        <View style = {styles.textTime}>
          <View style = {styles.textContainer}>
            <Text style={styles.text1}> {TimeFrom} </Text>
          </View>
          
          <View style = {styles.textContainer}>
            <Text>-</Text>
          </View>
          <View style = {styles.textContainer}>
            <Text style={styles.text1}> {TimeTo} </Text>
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
      </KeyboardAvoidingView>
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
    borderRadius: 3,
    borderColor: '#000000',
    // width: 150,
    height: 40,
    // paddingLeft: 10,
    // paddingRight: 10
    
    
  },
  textContainer: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20
  },
  textTime: {
    flexDirection: 'row',
    alignSelf: 'flex-start'
  }
});