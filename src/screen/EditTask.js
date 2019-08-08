import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, ImageBackground} from 'react-native';
import moment from 'moment';

class EditTask extends Component {

    static navigationOptions={ 
        // header:null,
        tabBarVisible:true ,
        title: 'Edit',
        headerStyle: {
          backgroundColor: '#A9CCE3',
        }
    }

    constructor() {
        super();
        this.state = {
           
        };
      }

    render () {


    return (
        <View style={styles.container}>
        <ImageBackground source = {require('../UI/components/Image/background.png')} style={styles.backgroundImage}>
        <Text>abc</Text>
        </ImageBackground>
      </View>
    )
}
}

export default EditTask;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        // backgroundColor: "#fff",
        // paddingTop: 100
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
      }
})