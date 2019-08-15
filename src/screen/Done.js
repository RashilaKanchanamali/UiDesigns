import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, Alert, KeyboardAvoidingView, Dimensions} from 'react-native';
import Button from '../UI/components/Button/Button';
import moment from 'moment';
// import TimePicker from "react-native-24h-timepicker";
import { Header } from 'react-navigation';
// import DateTimePicker from '@react-native-community/datetimepicker';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export class Done extends Component {
static navigationOptions={ 
  // header:null,
  tabBarVisible:true ,
  title: 'Done',
  headerStyle: {
    backgroundColor: '#A9CCE3',
  },
}
constructor(props) {
  super(props);
  this.params = this.props.navigation.state.params,
  this.state = {
    userItems: '',
    note: '',
    time: '',
    scrollEnabled: true,
    Description : this.params.SelectedDescription,
    Code : this.params.SelectCode,
    TimeFrom : moment(this.params.SelectTimeFrom).format('HH:mm'),
    TimeTo : moment(this.params.SelectTimeTo).format('HH:mm'),
    Id : this.params.SelectId
  };
  this.calendar = null;
}

onCancel() {
  this.TimePicker.close();
}

onConfirm(hour, minute) {
  this.setState({ time: `${hour}:${minute}` });
  this.TimePicker.close();
}

onButtonPress (){
  fetch('http://192.168.2.23:100/integration/timeEntry/saveTimeEntry', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ActivityID: this.params.SelectId,
          EmployeeID: this.params.EmployeeID,
          Date : this.params.SelectDate,
          timeFrom: this.params.SelectTimeFrom,
          timeTo: this.params.SelectTimeTo,
          ActivityType: this.params.ActivityType,
          Description: this.params.SelectedDescription,
          Note: this.state.note,
        })
    })
      .then(response => response.json())
      .then((responseJson) => {
        this.setState ({
          userItems:responseJson
        })
      Alert.alert(this.params.SelectedDescription +' Added to Time Sheet');
    }).catch((error) => {
        Alert.alert(error);
    });
}
renderButton() {
  return (
      <Button 
      onPress={this.onButtonPress.bind(this)}>
      Add To Time Sheet
    </Button>
  );
}
render() {
  
  var Token = this.params.TokenTimeSheetInternal
  const { navigate } = this.props.navigation;
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset = {Header.HEIGHT + 50 }>
    
      <View style = {styles.textContainer}>
        <Text style={styles.text1}> Code : {this.params.SelectCode} </Text>
      </View>
      <View style = {styles.textContainer}>
        <Text style={styles.text1}> Description :   {this.params.SelectedDescription} </Text>
      </View>
      <View style = {styles.textTime}>
        <View style = {styles.textContainer}>
          <Text style={styles.text1}> Time from </Text>
          <TextInput 
            style={styles.text2}
            onChangeText={(TimeFrom) => this.setState({TimeFrom})}>{this.state.TimeFrom}  
            </TextInput>
        </View>
        <View style = {styles.textContainer}>
          <Text>-</Text>
        </View>
        <View style = {styles.textContainer}>
          <Text style={styles.text1}> Time to </Text>
          <TextInput 
          style={styles.text2}
          onChangeText={(TimeTo) => this.setState({TimeTo})}>{this.state.TimeTo} 
          </TextInput>
        </View>
      </View>
      <Text style={styles.textContainer}> Notes : {'\n'} </Text>
      <View style = {styles.textContainer1}>
        <TextInput 
          style = { styles.noteStyle }
          multiline={true}
          onChangeText={note => this.setState({ note})}
          scrollEnabled={this.state.scrollEnabled}
          />
      </View>
      {/* <Text> {this.state.note} </Text> */}
      <View style = {styles.textContainer2}>
      {this.renderButton()}
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
    backgroundColor: '#dcdcdc',
  },
  text1: {
    fontSize: 16,
    color: '#000000',
    borderRadius: 3,
    height: 40,
    // backgroundColor: '#e6e6fa',
    fontWeight: 'bold' 
  },
  text2: {
    fontSize: 16,
    color: '#000000',
    borderRadius: 3,
    height: 40,
    backgroundColor: '#e6e6fa',
    fontWeight: 'bold' 
  },
  textContainer: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000'
  },
  textContainer2: {
    alignSelf: 'center',
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000'
  },
  textTime: {
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  noteStyle: {
    backgroundColor: '#e6e6fa',
    borderRadius: 5,
    textAlignVertical: 'top',
    // alignSelf: 'flex-start',
    height: 100,
    width: SCREEN_WIDTH-20

  },
  textContainer1: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 16,
    color: '#000000'
  },
  // keyboardStyle: {
  //   behavior: 'position'
  // }
});