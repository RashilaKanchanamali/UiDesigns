import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

class Edit extends Component {

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
      <View>
          <Text>Edit</Text>
      </View>  
    )
}
}

export default Edit;

const styles = StyleSheet.create({
    
})