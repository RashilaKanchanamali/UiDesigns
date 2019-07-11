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
          user: responseJson
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

        <View style = {styles.pageView}>
            <View style = {styles.rowView}>
                <View style = {styles.imageView}>
                    <TouchableOpacity onPress= { () => navigate('TimeSheet', {TokenTimeSheet}) }>
                    <Image 
                        style={styles.ImageStyle}
                        source={require('../UI/components/Image/timeSheet.png')}
                    />
                    <Text style = {styles.ImageTextStyle}>
                        Time Entry
                    </Text>
                    </TouchableOpacity>
                </View>

                <View style = {styles.imageView}>
                    <TouchableOpacity>
                    <Image 
                        style={styles.ImageStyle}
                        source={require('../UI/components/Image/pettyCash.png')}
                    />
                    <Text style = {styles.ImageTextStyle}>
                        Petty Cash
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style = {styles.rowView}>
                <View style = {styles.imageView}>
                    <TouchableOpacity>
                    <Image 
                        style={styles.ImageStyle}
                        source={require('../UI/components/Image/medicalClaim.png')}
                    />
                    <Text style = {styles.ImageTextStyle}>
                        Medical Claim
                    </Text>
                    </TouchableOpacity>
                </View>

                <View style = {styles.imageView}>
                    <TouchableOpacity>
                    <Image 
                        style={styles.ImageStyle}
                        source={require('../UI/components/Image/salesManager.png')}
                    />
                    <Text style = {styles.ImageTextStyle}>
                        Sales Manager 
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        
      </View>

    
    
      
      
    );
  }
}
export default DashBoard;

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#87CEEB'
  },
  textStyle: {
    paddingTop: 20,
    paddingLeft: 200,
    fontSize: 16,
    color: '#00008b'
  },
  pageView: {
    flex: 1,
    backgroundColor: '#87CEEB',
    flexDirection: 'column',
    paddingTop: 60
},
rowView: {
    flexDirection: 'row'
},
ImageStyle: {
    // borderWidth: 1,
    // borderColor: 'yellow',
    height: 180,
    width: 180,
},
imageView: {
    flex: .5,
    // borderWidth: 1,
    // borderColor: 'red',
    height: '70 %' ,
    justifyContent: 'center',
    alignItems: 'center'
},
ImageTextStyle: {
    // borderWidth: 1,
    // borderColor: 'green',
    textAlign: 'center'
}
})
