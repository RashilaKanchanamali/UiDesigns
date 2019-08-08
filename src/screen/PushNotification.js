import React, {Component} from React;
import { View, Text, StyleSheet, Picker } from 'react-native';
import styles2 from './WeekView.styles';

export default class PushNotification extends Component {
    constructor(props){
        this.state={
            seconds: 5
        }
    }
    render () {
        return (
            <View style={styles.container}>
                <Text style = {styles.welcome}></Text>
                <Picker
                style={styles.picker}
                selectedValue={this.state.seconds}
                onValueChange={(seconds)=> this.setState({seconds})}>
                <Picker.Item label="5" value={5}/>
                <Picker.Item label="10" value={10}/>
                <Picker.Item label="15" value={15}/>
                </Picker>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d34'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    picker: {
        width: 100
    }
});