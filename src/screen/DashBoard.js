import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

class DashBoard extends Component {
    render() {
        return (
            <View style={styles.container}>
            <View style= {styles.Text1}>
                <TouchableOpacity>
                    <Text>
                        Person
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: "center",
        //alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    Text1: {
        alignItems: 'baseline',
        width: 80,
        height: 80,
        backgroundColor: "#00ced1"
    }
});

export default DashBoard;