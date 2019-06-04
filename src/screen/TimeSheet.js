import React, { Component } from 'react';

import { StyleSheet, View, Alert, Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../UI/components/Button/Button';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //default value of the date time
      date1: '',
      date2: '',
      date3: '',
      date4: '',
      date5: ''
    };
  }
  componentDidMount() {
    var that = this;

    Date.prototype.addDays = function(days) {
      this.setDate(this.getDate() + parseInt(days));
      return this;
      };

      var today = new Date();
      var tomorrow = new Date().addDays(1);
      var dayAfterTomorrow = new Date().addDays(2);
      var yesterday = new Date().addDays(-1);
      var dayBeforeYesterday = new Date().addDays(-2);

    
    that.setState({
      //Setting the value of the date time
      date1: dayBeforeYesterday.getDate(),
      date2: yesterday.getDate(),
      date3: today.getDate(),
      date4: tomorrow.getDate(),
      date5: dayAfterTomorrow.getDate() 
    });
  }

  render() {
    return (
      <View >
      <ScrollView>
        <View style={styles.style1}>
          <View style= {styles.dateFrame}>
            <TouchableOpacity style= {styles.dateFrame1}>
              <Text style={styles.style2}>
                {this.state.date1}
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style= {styles.dateFrame}>
            <TouchableOpacity>
              <Text style={styles.style2}>
                {this.state.date2}
              </Text>
            </TouchableOpacity>
          </View>

          <View style= {styles.dateFrame}>
            <TouchableOpacity>
              <Text style={styles.style2}>
                {this.state.date3}
              </Text>
            </TouchableOpacity>
          </View>

          <View style= {styles.dateFrame}>
            <TouchableOpacity>
              <Text style={styles.style2}>
                {this.state.date4}
              </Text>
            </TouchableOpacity>
          </View>

          <View style= {styles.dateFrame}>
            <TouchableOpacity>
              <Text style={styles.style2}>
                {this.state.date5}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style = {styles.TextStyle}>
            {'\n'}Tasks{'\n'}
          </Text>

          <View style= {styles.textViewStyle}>
            <ScrollView>
              <Text style= {styles.textStyle1}>
              hhhhhhhhhhhhhhhhhhhhhjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
              kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkhhhhhhhhhhhhhhhhhhhhhh
              ddddddddddddddddddddddddddddddddggggggggggggggggggggggggg
              dddddddddddddddddddddddddtttttttttttttttttttttttttttttttttt
              ddddddddddddddddddddddddddrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
              </Text>
              </ScrollView>
          </View>
        </View>

        <View>
        
        <View>
          <Text style = {styles.TextStyle}>
              {'\n'}Time Sheet{'\n'}
          </Text>
        </View>

      <View>
      <ScrollView>
        <View style= {styles.TimeSheetStyle}>
          <Text padding= '10'> 08:00 AM</Text>
            <Text style= {styles.TimeSheet}>

            </Text>
        </View>
        <View style= {styles.TimeSheetStyle}>
          <Text padding= '10'> 09:00 AM</Text>
            <Text style= {styles.TimeSheet}>

            </Text>
        </View>
        <View style= {styles.TimeSheetStyle}>
          <Text padding= '10'> 10:00 AM</Text>
            <Text style= {styles.TimeSheet}>

            </Text>
        </View>
        <View style= {styles.TimeSheetStyle}>
          <Text padding= '10'> 11:00 AM</Text>
            <Text style= {styles.TimeSheet}>

            </Text>
        </View>
        <View style= {styles.TimeSheetStyle}>
          <Text padding= '10'> 12:00 AM</Text>
            <Text style= {styles.TimeSheet}>

            </Text>
        </View>
        <View style= {styles.TimeSheetStyle}>
          <Text padding= '10'> 01:00 PM</Text>
            <Text style= {styles.TimeSheet}>

            </Text>
        </View>
        <View style= {styles.TimeSheetStyle}>
          <Text padding= '10'> 02:00 PM</Text>
            <Text style= {styles.TimeSheet}>

            </Text>
        </View>
        <View style= {styles.TimeSheetStyle}>
          <Text padding= '10'> 03:00 PM</Text>
            <Text style= {styles.TimeSheet}>

            </Text>
        </View>
        <View style= {styles.TimeSheetStyle}>
          <Text padding= '10'> 04:00 PM</Text>
            <Text style= {styles.TimeSheet}>

            </Text>
        </View>
        <View style= {styles.TimeSheetStyle}>
          <Text padding= '10'> 05:00 PM</Text>
            <Text style= {styles.TimeSheet}>
             
            </Text>
        </View>
        </ScrollView>
        </View>
        </View>

        <Button> Day End </Button>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  style1: {
    // paddingLeft: 70,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center'
  },
  style2: {
    fontSize: 20,
    marginTop: 16,
    width: 50
  },
  dateFrame: {
    borderWidth: 1,
    borderColor: "#deb887",
    borderRadius: 10
    
  },
  dateFrame1: {
    justifyContent: 'center'
  },
  TextStyle: {
    fontSize: 18,
    textDecorationLine: 'underline',
    color: '#000000',
    paddingLeft: 20
  },
  textViewStyle: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    height: 60,
    width: 350,
    
    
  },
  textStyle1: {
    
  },
  TimeSheet: {
    height: 20,
    width: 275,
    borderWidth: 1,
    borderColor: 'black'
  },
  TimeSheetStyle: {
    flexDirection: 'row',
    padding: 3
  }
});