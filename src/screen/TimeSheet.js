import React, { Component } from 'react';
import { StyleSheet, View, Alert, Text, ScrollView,AppRegistry, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Button from '../UI/components/Button/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-simple-modal";


export default class App extends Component {
  state = { open: false };

  modalDidOpen = () => console.log("Modal did open.");

  modalDidClose = () => {
    this.setState({ open: false });
  };

  openModal = () => this.setState({ open: true });

  closeModal = () => this.setState({ open: false });


  static navigationOptions={ 
    // header:null,
    tabBarVisible:true ,
    title: 'Time Entry sheet'
}
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params,

    this.state = {
      //default value of the date time
      AllActivities:[],
      toDayActivity:[],
      delayedActivities:[],
      date1: '',
      date2: '',
      date3: '',
      date4: '',
      date5: '',
      i:'',

      postList:[]
     
    };
  }
  componentDidMount() {
    var that = this;

    Date.prototype.addDays = function(days) {
      this.setDate(this.getDate() + parseInt(days));
      return this;
      };

      var toDayActivities = new Date();
      var tomorrow = new Date().addDays(1);
      var dayAfterTomorrow = new Date().addDays(2);
      var yesterday = new Date().addDays(-1);
      var dayBeforeYesterday = new Date().addDays(-2);
      var TokenTimeSheetInternal =  this.params.TokenTimeSheet
    
    that.setState({
      //Setting the value of the date time
      date1: dayBeforeYesterday.getDate(),
      date2: yesterday.getDate(),
      date3: toDayActivities.getDate(),
      date4: tomorrow.getDate(),
      date5: dayAfterTomorrow.getDate() 
    });
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {

    fetch ('http://192.168.2.23:100/integration/activity/getActivities', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + this.params.TokenTimeSheet,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
      .then((responseJson) => {
          
          let ToDayTask = [];
          let DelayedTask = [];
          let ToTestarray = [];
          // let ToTestarray=["09/02/2012","06/04/2010","02/01/2018"]

          for (i = 0 ; i < responseJson.activityList.length ; i = i + 1)
          {
            ToTestarray.push(responseJson.activityList[i]);

            if(responseJson.activityList[i].isDelayed == true)
            {
              DelayedTask.push(responseJson.activityList[i].description);
            }
            else
            {
              ToDayTask.push(responseJson.activityList[i].description);
            }

          }

          this.setState({toDayActivity : ToDayTask})
          this.setState({delayedActivities : DelayedTask})
          this.setState({AllActivities : ToTestarray})

        })
}
  render() {
    // how to view token import from previous page

    const { navigate } = this.props.navigation;

    return (
      <View style = {styles.fullView}>
        <ScrollView>
          
            <Icon style={styles.iconStyle} name="ios-notifications" size = {30}/>
          
          <View style={styles.style1}>
            <View style= {styles.dateFrame}>
              <TouchableOpacity style= {styles.dateFrame1}>
                <Text style={styles.style2}>
                  {this.state.date1}
                </Text>
              </TouchableOpacity>
            </View>
          
          <View style= {styles.dateFrame}>
            <TouchableOpacity>
              <Text style={styles.style2}>
                {this.state.date2}
              </Text>
            </TouchableOpacity>
          </View>

          <View style= {styles.dateFrame}>
            <TouchableOpacity>
              <Text style={styles.style2}>
                {this.state.date3}
              </Text>
            </TouchableOpacity>
          </View>

          <View style= {styles.dateFrame}>
            <TouchableOpacity>
              <Text style={styles.style2}>
                {this.state.date4}
              </Text>
            </TouchableOpacity>
          </View>

          <View style= {styles.dateFrame}>
            <TouchableOpacity>
              <Text style={styles.style2}>
                {this.state.date5}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style = {styles.TextStyle}>
            {'\n'}Tasks{'\n'}
          </Text>

          <View style= {styles.container}>
            
            {/* {
                this.state.AllActivities.map(( item, key ) =>
                (
                  <View key = { key } style = { styles.item }>
                    <Text style = { styles.text2 }>{ item }</Text>
                    <View style = { styles.separator }/>
                  </View>
                ))
              } */}
              {
                this.state.delayedActivities.map(( item, key ) =>
                (
                  <View key = { key } style = { styles.item }>
                    <TouchableOpacity onPress={this.openModal}>
                     {/* <TouchableOpacity onPress = { () => navigate(this.openModel) }> */}
                      <Text style = { styles.text2 }>{ item }</Text>
                    </TouchableOpacity>
                    <View style = { styles.separator }/> 
                  </View>
                ))
              }

              {
                this.state.toDayActivity.map(( item, key ) =>
                (
                  <View key = { key } style = { styles.item }>
                    <TouchableOpacity onPress={(this.openModal, {ToTestarray})}>
                      <Text style = { styles.text }>{ item }</Text>
                    </TouchableOpacity>
                    <View style = { styles.separator }/>
                  </View>
                ))
              } 
          </View>
          
            <Modal
              // transparent={true}
              style = {styles.modelStyle} 
              offset={this.state.offset}
              open={this.state.open}
              modalDidOpen={this.modalDidOpen}
              modalDidClose={this.modalDidClose}>

            <View style = {styles.popupStyle}>
              <Button style = {{ margin: 5}} onPress = { () => navigate('Done') }>
                <Text> Done </Text>
              </Button>
            </View>

            <View style = {styles.popupStyle}>
              <Button style = {{ margin: 5}} onPress = { () => navigate('Postpone') }>
                <Text> Postpone </Text>
              </Button>
            </View>

            <View style = {styles.popupStyle}>
              <Button style = {{ margin: 5}} onPress = { () => navigate('Edit') }>
                <Text> Edit </Text>
              </Button>
            </View>

            <View style = {styles.popupStyle}>
              <Button style = {{ margin: 5}} onPress={this.closeModal}>
                <Text> Cancel </Text>
              </Button>
            </View>
          </Modal>
        </View>

        

      <View>
        <View>
          <Text style = {styles.TextStyle}>
              {'\n'}Time Sheet{'\n'}
          </Text>
        </View>

      <View>
      <ScrollView>
        <View style= {styles.TimeSheetStyle}>
          <Text padding= '10'> 08:00 AM</Text>
            <Text style= {styles.TimeSheet}>

            </Text>
        </View>
        <View style= {styles.TimeSheetStyle}>
          <Text padding= '10'> 09:00 AM</Text>
            <Text style= {styles.TimeSheet}>

            </Text>
        </View>
        <View style= {styles.TimeSheetStyle}>
          <Text padding= '10'> 10:00 AM</Text>
            <Text style= {styles.TimeSheet}>

            </Text>
        </View>
        <View style= {styles.TimeSheetStyle}>
          <Text padding= '10'> 11:00 AM</Text>
            <Text style= {styles.TimeSheet}>

            </Text>
        </View>
        <View style= {styles.TimeSheetStyle}>
          <Text padding= '10'> 12:00 AM</Text>
            <Text style= {styles.TimeSheet}>

            </Text>
        </View>
        <View style= {styles.TimeSheetStyle}>
          <Text padding= '10'> 01:00 PM</Text>
            <Text style= {styles.TimeSheet}>

            </Text>
        </View>
        <View style= {styles.TimeSheetStyle}>
          <Text padding= '10'> 02:00 PM</Text>
            <Text style= {styles.TimeSheet}>

            </Text>
        </View>
        <View style= {styles.TimeSheetStyle}>
          <Text padding= '10'> 03:00 PM</Text>
            <Text style= {styles.TimeSheet}>

            </Text>
        </View>
        <View style= {styles.TimeSheetStyle}>
          <Text padding= '10'> 04:00 PM</Text>
            <Text style= {styles.TimeSheet}>

            </Text>
        </View>
        <View style= {styles.TimeSheetStyle}>
          <Text padding= '10'> 05:00 PM</Text>
            <Text style= {styles.TimeSheet}>
             
            </Text>
        </View>
        </ScrollView>
        </View>
        </View>

        <View>
          <TextInput
            placeholder= {"save"}
          />
        </View>

        <Button onPress = { () => navigate('Postpone')}>  Day End </Button>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container:
  {
    flex: 1,
    // paddingTop: (Platform.OS === 'ios') ? 20 : 0
  },
  
  separator:
  {
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%'
  },
 
  text:
  {
    fontSize: 15,
    color: 'black',
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    width: '100%',
    backgroundColor: '#90ee90'
  },
  text2:
  {
    fontSize: 15,
    color: 'black',
    padding: 5,
    backgroundColor: '#f08080'
  },
  style1: {
    // paddingLeft: 70,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center'
  },
  style2: {
    fontSize: 20,
    marginTop: 16,
    width: 50,
    paddingLeft: 20
  },
  dateFrame: {
    borderWidth: 1,
    borderColor: "#deb887",
    borderRadius: 10
  },
  dateFrame1: {
    justifyContent: 'center'
  },
  TextStyle: {
    fontSize: 18,
    textDecorationLine: 'underline',
    color: '#000000',
    paddingLeft: 20
  },
  textViewStyle: {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    height: 60,
    width: 350,
    fontWeight: 'bold',
  },
  textStyle1: {
    
  },
  TimeSheet: {
    height: 20,
    width: 275,
    borderWidth: 1,
    borderColor: 'black'
  },
  TimeSheetStyle: {
    flexDirection: 'row',
    padding: 3
  },

  iconStyle: {
    alignSelf: 'flex-end',
    paddingRight: 10
 },
 popupStyle: {
  //  borderWidth: 1,
  //  borderColor: 'black',
  //  borderRadius: 10,
  //  width: 200,
   alignItems: 'center'
 },
 popupModelStyle: {
   borderWidth: 1,
   borderColor: 'red'
 },
 modelStyle: {
   backgroundColor: 'black'
 },
 fullView: {
   backgroundColor: '#dcdcdc'
 }
});

AppRegistry.registerComponent('App', () => App);
