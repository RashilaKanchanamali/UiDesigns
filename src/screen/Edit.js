import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

class Edit extends Component {

    static navigationOptions={ 
        // header:null,
        tabBarVisible:true ,
        title: 'DashBoard',
        // tabBarOptions: {
        //     inactiveTintColor: 'red',
        // }
    }

render () {
    return (
        <View style = {styles.pageView}>
            
        </View>
    )
}
}

export default Edit;

const styles = StyleSheet.create({
    pageView: {
        flex: 1,
        backgroundColor: '#48D1CC'
    }
})