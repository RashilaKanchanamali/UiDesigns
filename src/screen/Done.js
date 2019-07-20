import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Alert} from 'react-native';
import Button from '../UI/components/Button/Button';
import { FlatList } from 'react-native-gesture-handler';
export class Done extends Component {

  static navigationOptions={ 
    // header:null,
    tabBarVisible:true ,
    title: 'Done'
}

constructor(props) {
  super(props);
  this.params = this.props.navigation.state.params,

  this.state = {
    userItems: ''
 
  };
  this.calendar = null;
}

onButtonPress (){

  fetch('http://192.168.2.23:100/integration/timeEntry/saveTimeEntry', {

        method: 'POST',
        headers: {
            // 'Authorization': 'Bearer ' +this.params.TokenTimeSheetInternal,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
    
          activityID: this.state.userItems.activityID,
          timeFrom: this.state.userItems.timeFrom,
          timeTo: this.state.userItems.timeTo,
          isDone: !this.state.userItems.isDone

        })

    })
      .then(response => response.json())
      .then((responseJson) => {

        //console.warn(responseJson)

        this.setState ({
          userItems:responseJson
        })
      Alert.alert(JSON.stringify(responseJson));
    }).catch((error) => {
        Alert.alert(error);
    });
}

renderButton() {
  return (
      <Button onPress={this.onButtonPress.bind(this)}>
      SAVE
    </Button>
  );

}


  render() {
    var Description =  this.params.SelectedDescription
    var Code = this.params.SelectCode
    var TimeFrom = this.params.SelectTimeFrom
    var TimeTo = this.params.SelectTimeTo
    var Id = this.params.SelectId
    var IsDone = this.params.IsDone
    var Token = this.params.TokenTimeSheetInternal

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
      
        <View style = {styles.textContainer}>
          <Text style={styles.text1}> Code : {Code}</Text>
        </View>

        <View style = {styles.textContainer}>
          <Text style={styles.text1}> Description :   {Description} </Text>
        </View>

        <View style = {styles.textTime}>
          <View style = {styles.textContainer}>
            <TextInput style={styles.text1}> Time from :   {TimeFrom} </TextInput>
          </View>
          
          <View style = {styles.textContainer}>
            <Text>-</Text>
          </View>
          <View style = {styles.textContainer}>
            <TextInput style={styles.text1}> Time to :   {TimeTo} </TextInput>
          </View>
        </View>

        <Text style={styles.textContainer}> Notes : {'\n'} </Text>
        
        <View style = {styles.textContainer1}>
            
              <TextInput style = { styles.noteStyle }
                multiline={true}
              />
            
          
        </View>

        <Text 
        placeholder={this.state.userItems.isDone}
        onChangeText={isDone => this.setState({ isDone})}/>

        <View style = {styles.textContainer}>
        {this.renderButton()}
        </View>
      </View>
    );
  }
}
export default Done;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
  },
  text1: {
    fontSize: 16,
    color: '#000000',
    borderRadius: 3,
    height: 40,
    backgroundColor: '#e6e6fa',
    fontWeight: 'bold'
    
    
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
  textTime: {
    flexDirection: 'row',
    alignSelf: 'flex-start'
  },
  noteStyle: {
    backgroundColor: '#e6e6fa',
    borderRadius: 5,
    alignSelf: 'flex-start'
  },
  textContainer1: {
    alignSelf: 'flex-start',
    paddingLeft: 10,
    paddingTop: 10,
    fontSize: 16,
    color: '#000000'
  },
});