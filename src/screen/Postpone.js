import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Button from '../UI/components/Button/Button';
import DatePicker from 'react-native-datepicker'

export class Home extends Component {

  constructor(props){
    super(props)
    this.state = {date:"2016-05-15"}
  }

  static navigationOptions={ 
    // header:null,
    tabBarVisible:true ,
    title: 'Postpone'
}

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.topic}>Reason</Text>
          <View style = {styles.textContainer}>
          <TextInput 
          multiline={true}
          style={styles.text1}></TextInput>
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
              minDate="2016-05-01"
              maxDate="2016-06-01"
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
          <Button>
           Postpone 
          </Button>
        </View>

        
      </View>
    );
  }
}
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#7FFFD4',
  },
  topic: {
    fontSize: 18,
    paddingLeft: 10
  },
  textContainer: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingTop: 20
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
