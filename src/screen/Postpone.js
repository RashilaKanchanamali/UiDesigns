import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, KeyboardAvoidingView,Alert} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Button from '../UI/components/Button/Button';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import { Header } from 'react-navigation';

export class Postpone extends Component {

  constructor(props){
    super(props);
    this.params = this.props.navigation.state.params,
    this.state = {
      TimeFrom : moment(this.params.SelectTimeFrom).format('HH:mm'),
      TimeTo : moment(this.params.SelectTimeTo).format('HH:mm'),
      date:this.params.SelectDate,
      Description :this.params.SelectedDescription

    }
    
  }

  static navigationOptions={ 
    // header:null,
    tabBarVisible:true ,
    title: 'Postpone',
    headerStyle: {
      backgroundColor: '#A9CCE3',
    }
}

onButtonPress () {
  fetch ('http://192.168.2.23:100/integration/activity/saveActivity', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ID: this.params.SelectId,
      Date : this.state.date,
      TimeFrom: this.state.TimeFrom,
      TimeTo: this.state.TimeTo,
      Description: this.state.Description
    })
}).then(response => response.json())
.then((responseJson) => {
  if(responseJson.message != null)
    {
      Alert.alert('Activity Changed');
    }
    else{
      Alert.alert('System Error!!!');
    }
})

}

renderButton () {
  return(
    <Button
    onPress= {this.onButtonPress.bind(this)}>Save</Button>
  );
}

  render() {
    var Token = this.params.TokenTimeSheetInternal
    
    const { navigate } = this.props.navigation;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset = {Header.HEIGHT}>
          <View style = {styles.textContainer}>
        
        <Text style = {styles.topic}>Description{'\n'}</Text>
          <TextInput 
          multiline={true}
          style={styles.text1}
          onChangeText={(Description) => this.setState({Description})}> 
          Description :   {this.params.SelectedDescription}
          </TextInput>
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

        
        <View style = {styles.textTime}>
          <View style = {styles.textContainer}>
            <Text style={styles.text2}>Other day</Text>
          </View>
        
          <View style = {styles.textContainer}>
            <DatePicker
              style={{width: 200}}
              date={this.state.date}
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              // minDate="2016-05-01"
              // maxDate="2016-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {this.setState({date: date})}}
            />
          </View>
        </View>

        <View style = {styles.textContainer1}>
        {this.renderButton()}
        </View>

        
      </KeyboardAvoidingView>
    );
  }
}
export default Postpone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#dcdcdc',
  },
  topic: {
    fontSize: 18,
    paddingLeft: 10,
    paddingTop: 20
  },
  textContainer: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000'
  },
  textContainer1: {
    alignSelf: 'center',
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000'
  },
  text1: {
    fontSize: 16,
    color: '#000000',
    // borderRadius: 3,
    height: 40,
    backgroundColor: '#e6e6fa',
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
  textTime: {
    flexDirection: 'row',
    alignSelf: 'flex-start'
  }
});