import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import HeadingText from '../UI/components/HeadingText/HeadingText';
import Button from '../UI/components/Button/Button';

class AuthScreen extends Component {
    static navigationOptions={ 
        header:null,
        tabBarVisible:false 
    }
    constructor(props) {
        super(props);
        this.navigate=this.props.navigation.navigate;
        this.state = {
            token: '',
            UserName: '',
            Password: ''
        }    
    }
    componentWillMount() {
        this.fetchData();
      }
    fetchData () {
    const { navigate } = this.props.navigation;
        fetch('http://192.168.2.23:100/integration/login/getToken', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserName: this.state.UserName,
                Password: this.state.Password
            })
        })
        .then(response => response.json())
        .then(( responseJson ) => {
            this.setState ({
                token: responseJson
            })
            if (this.state.token.status === "Success" ) {
                console.log("abcd");
                var Token =  this.state.token.token
                this.props.navigation.navigate('DashBoard', { TokenDashBoard:Token});
            }   
        });
        //  Alert.alert('Please enter valid Username and Password') 
}
    renderButton() {
        return (
            <Button onPress={this.fetchData.bind(this)}>
            LOGIN
          </Button>
        );
    }
    render () {
        headingText1= (
            <HeadingText style={styles.textHeading}>One JIT</HeadingText>
        );
        return (
            <KeyboardAvoidingView style={styles.container}>
                {headingText1}
                    <View style={styles.container2}>
                        <Text style={styles.textSignIn}>Sign In</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                placeholder="Username"
                                onChangeText={UserName => this.setState({ UserName})}
                                style={styles.input}/>
                            </View>
                            <View>
                                <TextInput
                                placeholder="Password"
                                onChangeText={Password => this.setState({ Password})}
                                style={styles.input}
                                secureTextEntry
                                /> 
                            </View>
                            <View style={styles.buttonContainer}>
                                <View>
                                    {this.renderButton()}
                                </View>
                            </View>
                            <View style={styles.wordContainer}>
                                <Text>Developed By Techsys</Text>
                            </View>
                    </View>
            </KeyboardAvoidingView>
        );
    }
}
export default AuthScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center",
        backgroundColor: "#778899",
        paddingTop: 20,
        paddingBottom: 20
    },
    container2: {
        paddingTop: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
        width: 300,
        height: 420,
        alignItems: "center",
        borderWidth:1,
        borderColor: '#e6e6fa'
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