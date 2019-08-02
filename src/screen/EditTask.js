import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput} from 'react-native';
import moment from 'moment';
// import TimePicker from "react-native-24h-timepicker";
import DateTimePicker from 'react-native-modal-datetime-picker';

class EditTask extends Component {

    static navigationOptions={ 
        // header:null,
        tabBarVisible:true ,
        title: 'Edit',
        // tabBarOptions: {
        //     inactiveTintColor: 'red',
        // }
    }

    constructor() {
        super();
        this.state = {
            isDateTimePickerVisible: false,
            selecteddate:''
        //   time: ""
        };
      }
     
    //   onCancel() {
    //     this.TimePicker.close();
    //   }
     
    //   onConfirm(hour, minute) {
    //     this.setState({ time: `${hour}:${minute}` });
    //     this.TimePicker.close();
    //   }

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (pickeddate) => {
        day   = pickeddate.getDate();
        month = pickeddate.getMonth();
        year  = pickeddate.getFullYear();
        console.log('A date has been picked: ' + day + '-' + month + '-' + year);
        exdate= day + '-' + month + '-' + year
        this.setState({selecteddate : day + '-' + month + '-' + year}) 
        this._hideDateTimePicker();
      };
      onFocus = () => {
        this._handleDatePicked();
      }


    render () {


    return (
        <View style={styles.container}>

        <TextInput 
        placeholder="placeholder..."
        onFocus={ () => this._showDateTimePicker() }
        value={this.state.selecteddate}
        />

        <DateTimePicker
        isVisible={this.state.isDateTimePickerVisible}
        onConfirm={this._handleDatePicked}
        onCancel={this._hideDateTimePicker}
        mode={'date'}
        datePickerModeAndroid={'spinner'}

        />

        {/* <Text style={styles.text}>REACT NATIVE</Text>

        <Text style={styles.text}>24 HOURS FORMAT TIMEPICKER</Text> */}

        {/* <TouchableOpacity
          onPress={() => this.TimePicker.open()}
          style={styles.button}>

          <Text style={styles.buttonText}>TIMEPICKER</Text>

        </TouchableOpacity> */}

        {/* <Text style={styles.text}>{this.state.time}</Text> */}

        {/* <TimePicker
          ref={ref => {
            this.TimePicker = ref;
          }}
          onCancel={() => this.onCancel()}
          onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
        /> */}
        
      </View>
    )
}
}

export default EditTask;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
        paddingTop: 100
      },
      text: {
        fontSize: 20,
        marginTop: 10
      },
      button: {
        backgroundColor: "#4EB151",
        paddingVertical: 11,
        paddingHorizontal: 17,
        borderRadius: 3,
        marginVertical: 50
      },
      buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600"
      }
})