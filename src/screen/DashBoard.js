import React, { Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TimeSheet from './TimeSheet';

class DashBoard extends Component {

  static navigationOptions={ 
    //header:null,
    tabBarVisible:true 
}

constructor(props){
      
  super(props);
  this.state = {
    Token: this.props.navigation.state.params.token,
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
            'Authorization': 'Bearer ' + this.state.Token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          user:responseJson
        })
        Alert.alert(JSON.stringify(responseJson));
      })
      
}

  render() {
    const { navigate } = this.props.navigation;
    return ( 
      
      <View>

        {/* <View>
          <Text>
            {this.props.navigation.state.params.user.firstName}
            </Text>
        </View> */}
        
        <View style={styles.imageDirection1}>
          <TouchableOpacity 
            style={styles.imageContainer}
            onPress= { () => navigate('TimeSheet') }>

            <Image 
              style={styles.ImageStyle}
              source={require('../UI/components/Image/timeSheet.png')}

              />
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
    flexDirection: 'row'
  },
  imageDirection2: {
    flexDirection: "column"
  }
})
