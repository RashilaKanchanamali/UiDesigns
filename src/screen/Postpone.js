import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Button from '../UI/components/Button/Button';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import { Header } from 'react-navigation';

export class Postpone extends Component {

  constructor(props){
    super(props);
    this.params = this.props.navigation.state.params,
    this.state = {date:this.params.SelectDate}
    
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
      Date : this.params.SelectDate,
      TimeFrom: this.params.SelectTimeFrom,
      TimeTo: this.params.SelectTimeTo,
      Description: this.params.SelectedDescription
    })
})
}

renderButton () {
  return(
    <Button
    onPress= {this.onButtonPress.bind(this)}>Save</Button>
  );
}

  render() {

    var Code = this.params.SelectCode
    var Id = this.params.SelectId
    var Date = this.params.SelectDate
    var Description = this.params.SelectedDescription
    var TimeFrom = this.params.SelectTimeFrom
    var TimeTo = this.params.SelectTimeTo
    var Token = this.params.TokenTimeSheetInternal

    const { navigate } = this.props.navigation;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset = {Header.HEIGHT}>
        <Text style = {styles.topic}>Reason</Text>
          <View style = {styles.textContainer}>
          <Text 
          multiline={true}
          style={styles.text1}> {Code} </Text>
          </View>

          <View style = {styles.textTime}>
          <View style = {styles.textContainer}>
            <TextInput style={styles.text1}> {moment(TimeFrom).format('HH:mm')} </TextInput>
          </View>
          
          <View style = {styles.textContainer}>
            <Text>-</Text>
          </View>
          <View style = {styles.textContainer}>
            <TextInput style={styles.text1}> {moment(TimeTo).format('HH:mm')} </TextInput>
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

        <View style = {styles.textContainer}>
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
    borderRadius: 3,
    height: 40,
    backgroundColor: '#e6e6fa',
    fontWeight: 'bold'
    
    
  },
  text2: {
    fontSize: 16,
    // borderWidth: 1,
    // borderRadius: 3,
    borderColor: '#000000',
    // width: 150,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10 
  },
  textTime: {
    flexDirection: 'row',
    alignSelf: 'flex-start'
  }
});
