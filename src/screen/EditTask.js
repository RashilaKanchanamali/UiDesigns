import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';

class EditTask extends Component {

    static navigationOptions={ 
        // header:null,
        tabBarVisible:true ,
        title: 'Edit',
        // tabBarOptions: {
        //     inactiveTintColor: 'red',
        // }
    }

render () {


    return (
      <View style = { styles.container }>
          <Text>  edit </Text>
      </View>  
    )
}
}

export default EditTask;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#dcdcdc',
      }
})