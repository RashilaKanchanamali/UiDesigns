import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import HeadingText from '../UI/components/HeadingText/HeadingText';
import Button from '../UI/components/Button/Button';
import DashBoard from './DashBoard';
import {AsyncStorage} from 'react-native';



//const ACCESS_TOKEN = 'access_token';

class AuthScreen extends Component {

    static navigationOptions={ 
        header:null,
        tabBarVisible:false 
    }

    state = {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxMTkiLCJuYmYiOjE1NjEzNDg4MTgsImV4cCI6MTU2MTM0ODkzOCwiaWF0IjoxNTYxMzQ4ODE4fQ.vRlEh0kdO8Q_N8iCawiUJqVpEwWfVwCobfasWa9Q-qY",
        // UserName: '',
        // Password: '',
        user: ''
    }

    componentWillMount() {
        //this.fetchData1();
        this.fetchData2();
      }
     
//     fetchData1 = async () => {
        
           
//         fetch('http://192.168.2.23:100/integration/login/getToken', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 UserName: this.state.UserName,
//                 Password: this.state.Password
//             })
//         })
        
//         .then(response => response.json())
//         .then(( responseJson ) => {
            
//             this.setState ({
//                 token: responseJson
//             })
//         //.then(navigate('DashBoard', {token: item.token}))

            
//             if (this.state.token.status === "Success" ) {
//                 console.log("abcd");
//                 navigate('DashBoard', {token: item.token});
//             }
//             else {
//                 // Alert.alert(responseJson)
//             }

//              Alert.alert(JSON.stringify(this.state.UserName));

//         })
    
//         // catch((error) => {
//         //     //Alert.alert(JSON.stringify(responseJson));

//         // };
// }

fetchData2 = async () => {

    //var bearer = 'Bearer ' + token;

    fetch ('http://192.168.2.23:100/integration/login/getLoginUser', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer'+ this.state.token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //    token: this.state.token
        // })
    })
    .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          user:responseJson
        })
        Alert.alert(JSON.stringify(responseJson));
      })
      
}

    renderButton() {
        return (
            <Button onPress={this.fetchData2.bind(this)}>
            LOGIN
          </Button>
        );
  
      }
    

    render () {
        const { navigate } = this.props.navigation;
        //let headingText = null;

        headingText1= (
            <HeadingText style={styles.textHeading}>One JIT</HeadingText>
        );

        return (
            <View style={styles.container}>
                {headingText1}
                    <View style={styles.container2}>
                        <Text style={styles.textSignIn}>Sign In</Text>
                            {/* <View style={styles.inputContainer}>
                                <TextInput
                                placeholder="Username"
                                onChangeText={UserName => this.setState({ UserName})}
                                //blurOnSubmit={true}
                                style={styles.input}
                                />
                            </View> */}
                            {/* <View>
                                <TextInput
                                placeholder="Password"
                                onChangeText={Password => this.setState({ Password})}
                                //blurOnSubmit={true}
                                style={styles.input}
                                />
                                
                            </View> */}


                            <View style={styles.buttonContainer}>
                                
                            <View>
                                {this.renderButton()}
                            </View>
                            
                               
                            </View>
                            <View style={styles.wordContainer}>
                            {/* <Text
                                placeholder={this.state.user.lastName}
                            /> */}
                            <Text>Developed By Techsys</Text>
                            </View>
                    </View>
                   
            </View>
        );
    }
}

export default AuthScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center",
        backgroundColor: "#778899",
        paddingTop: 20
    },
    container2: {
        paddingTop: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
        width: 300,
        height: 400,
        alignItems: "center"
    },
    textSignIn: {
        fontSize: 23,
        color: "#000080",
        paddingBottom: 50
    },
    input: {
        fontSize:15,
        backgroundColor: "#e6e6fa",
        borderRadius: 4,
        width: 250,
    },
    inputContainer: {
        padding: 10
    },
    buttonContainer: {
        paddingTop: 30,
        paddingBottom: 70
    }
})