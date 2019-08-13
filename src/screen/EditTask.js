import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, TextInput, ImageBackground, Dimensions, AsyncStorage, } from 'react-native';
import moment from 'moment';
import Button from '../UI/components/Button/Button';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const { height: SCREEN_HEIGHT } = Dimensions.get('window');

class EditTask extends Component {
  state ={
    item: 'loading'
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem('mykey', 'cnq');
      this.setState({
        item: await AsyncStorage.getItem('mykey')
      })

    } catch (error)
    {
console.log(error);
    }
    console.log (this.state)
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('tasks');
      if ( value !== null) {
        console.log (value)
      }
    }catch (error){
console.log(error)
    }
  }

  deleteData = async () => {
    try {
      AsyncStorage.removeItem('mykey', ()=> {
        console.log("deleted")
        this.setState({
          // item: await AsyncStorage.getItem('mykey')
        })
      });
      
    }catch (error){

    }
  }

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
        
        <Text style = {styles.container2}>
        abc

        </Text>
<Button
onPress = {this.storeData}>store it</Button>

        <Text>{this.state.item}</Text>

        <Button
onPress = {this.deleteData}>delete it</Button>

      </View>
    )
}
}

export default EditTask;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop:10,
        paddingBottom:10,
        // height: 200
        // backgroundColor: "#e6e6fa"
      },
      container2: {
        // flex: 1,
        backgroundColor: "#e6e6fa",
        borderRadius: 2,
        width: SCREEN_WIDTH-20,
        height: 200,
        // alignItems: 'flex-start',
        textAlignVertical: 'top'

    }
})