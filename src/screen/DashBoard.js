import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TimeSheet from './TimeSheet';

class DashBoard extends Component {

  static navigationOptions={ 
    // header:null,
    tabBarVisible:true ,
    title: 'DashBoard'
}

constructor(props){
      
  super(props);
  this.navigate=this.props.navigation.navigate;
  this.params=this.props.navigation.state.params,

  this.state = {
    // Token: this.props.navigation.state.params.token,
    user: []
  }
}

componentWillMount() {
  this.fetchData();
}

fetchData = async () => {

    fetch ('http://192.168.2.23:100/integration/login/getLoginUser', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + this.params.TokenDashBoard,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          user:responseJson
        })
        // Alert.alert(JSON.stringify(responseJson.userName));
      })
      
}

  render() {
    const { navigate } = this.props.navigation;
    var TokenTimeSheet= this.params.TokenDashBoard;
    return ( 
      
      <View style={styles.container}>

        <View>
          <Text style = {styles.textStyle}>
            {this.state.user.firstName}  {this.state.user.lastName}
            </Text>
        </View>
        
        <View style={styles.imageDirection1}>
          <TouchableOpacity 
        
            style={styles.imageContainer}
            onPress= { () => navigate('TimeSheet', {TokenTimeSheet}) }>

            <Image 
              style={styles.ImageStyle}
              source={require('../UI/components/Image/timeSheet.png')}
              />
            <Text>Time entry</Text>
          </TouchableOpacity>
        </View>
      </View>

    
    
      
      
    );
  }
}
export default DashBoard;

const styles = StyleSheet.create({
  ImageStyle: {
    
    height: 60,
    width: 60
  },
  imageContainer: {
    
    paddingTop: 20
  },
  imageDirection1: {
    paddingLeft: 60,
    flexDirection: 'row',
    // backgroundColor: '#dddd'
  },
  imageDirection2: {
    flexDirection: "column"
  },
  container: {
    flex: 1,
    backgroundColor: '#ddd'
  },
  textStyle: {
    padding: 30,
    fontSize: 18,
    color: '#00008b'
  }
})
