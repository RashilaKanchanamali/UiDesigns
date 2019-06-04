import React, { Component } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TimeSheet from './TimeSheet';

class DashBoard extends Component {

  static navigationOptions={ 
    //header:null,
    tabBarVisible:true 
}

  render() {
    const { navigate } = this.props.navigation;
    return ( 
      
      <View>
        <View>
          <Text>Name</Text>
        </View>
        
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
