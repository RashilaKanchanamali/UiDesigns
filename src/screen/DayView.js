import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';

class DayView extends Component {

    static navigationOptions={ 
        // header:null,
        tabBarVisible:true ,
        title: 'Edit',
        // tabBarOptions: {
        //     inactiveTintColor: 'red',
        // }
    }

    constructor(props){
        super(props);
        this.params = this.props.navigation.state.params
      }

    fetchData () {
        fetch ()
    }

render () {
    var date1 = this.params.Date1 
    var date2 = this.params.Date2
    var date3 = this.params.Date3
    var date4 = this.params.Date4
    var date5 = this.params.Date5
    var date6 = this.params.Date6
    var date7 = this.params.Date7
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    if (date = date1) {
        var date = date1 + '-' + month + '-' + year
    }
    else if (date = date2) {
        var date = date2 + '-' + month + '-' + year
    } 
    else if (date = date3) {
        var date = date3 + '-' + month + '-' + year
    }
    else if (date = date4) {
        var date = date4 + '-' + month + '-' + year
    }
    else if (date = date5) {
        var date = date5 + '-' + month + '-' + year
    }
    else if (date = date6) {
        var date = date6 + '-' + month + '-' + year
    }
    else {
        var date = date7 + '-' + month + '-' + year
    }


    return (
      <View style = { styles.container }>
          <Text>    {date}</Text>
      </View>  
    )
}
}

export default DayView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#dcdcdc',
      }
})