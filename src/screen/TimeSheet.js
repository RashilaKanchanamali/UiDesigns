import React, { Component } from 'react';
import { StyleSheet, View, Alert,FlatList, Text, ScrollView,AppRegistry, TouchableOpacity,Dimensions, CheckBox} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Button from '../UI/components/Button/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-simple-modal";
import moment from 'moment';
import styles2 from './WeekView.styles';


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TIME_LABELS_COUNT = 48;



export default class App extends Component {
  state = { open: false };

  modalDidOpen = () => console.log("Modal did open.");

  modalDidClose = () => {
    this.setState({ open: false });
  };

  openModal = (rowItem) => this.setState({ 
             open: true ,
             selectedDescription: rowItem.description,
             selectCode: rowItem.code,
             selectTimeFrom: rowItem.timeFrom,
             selectTimeTo: rowItem.timeTo,
             selectId: rowItem.id,
             selectIsDone: rowItem.isDone
            });

  closeModal = () => this.setState({ open: false });

  // onPressAction = (rowItem) => {
  //   console.log('ListItem was selected');
  //   console.dir(rowItem);
  //   this.setState({
  //     selectedItem: rowItem.description
  //   });
  // }


  static navigationOptions={ 
    // header:null,
    tabBarVisible:true ,
    title: 'Time Entry Sheet'
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
      date6: '',
      date7: '',
      i:'',
      testDate:'',
      selectedDescription:'',
      selectCode: '',
      selectTimeFrom: '',
      selectTimeTo: '',
      selectId: '',
      selectIsDone: '',
      checked: false
    };
    this.calendar = null;
    this.times = this.generateTimes();
  }
  componentDidMount() {
    var that = this;

    requestAnimationFrame(() => {
      this.calendar.scrollTo({ y: 0, x: 2 * (SCREEN_WIDTH - 60), animated: false });
    });

    
    Date.prototype.addDays = function(days) {
      this.setDate(this.getDate() + parseInt(days));
      return this;
      };

      var toDayActivities = new Date();
      var mon ,tue,wed,thu,fri,sat,sun
      var TokenTimeSheetInternal =  this.params.TokenTimeSheet
      var TestDate = new Date(toDayActivities).getDay();

      if(TestDate ==1){
        TestDate='MON'
        mon = toDayActivities;
        tue = new Date().addDays(1);
        wed = new Date().addDays(2);
        thu = new Date().addDays(3);
        fri = new Date().addDays(4);
        sat = new Date().addDays(5);
        sun = new Date().addDays(6);
      }
      else if(TestDate ==2){
        TestDate='TUE'
        mon = new Date().addDays(-1);
        tue = toDayActivities;
        wed = new Date().addDays(1);
        thu = new Date().addDays(2);
        fri = new Date().addDays(3);
        sat = new Date().addDays(4);
        sun = new Date().addDays(5);
      }
      else if(TestDate ==3){
        TestDate='WED'
        mon = new Date().addDays(-2);
        tue = new Date().addDays(-1);
        wed = toDayActivities;
        thu = new Date().addDays(1);
        fri = new Date().addDays(2);
        sat = new Date().addDays(3);
        sun = new Date().addDays(4);
      }
      else if(TestDate ==4){
        TestDate='THU';
        mon = new Date().addDays(-3);
        tue = new Date().addDays(-2);
        wed = new Date().addDays(-1);
        thu = toDayActivities;
        fri = new Date().addDays(1);
        sat = new Date().addDays(2);
        sun = new Date().addDays(3);
      }
      else if(TestDate ==5){
        TestDate='FRI';
        mon = new Date().addDays(-4);
        tue = new Date().addDays(-3);
        wed = new Date().addDays(-2);
        thu = new Date().addDays(-1);
        fri = toDayActivities;
        sat = new Date().addDays(1);
        sun = new Date().addDays(2);
      }
      else if(TestDate ==6){
        TestDate='SAT';
        mon = new Date().addDays(-5);
        tue = new Date().addDays(-4);
        wed = new Date().addDays(-3);
        thu = new Date().addDays(-2);
        fri = new Date().addDays(-1);
        sat = toDayActivities;
        sun = new Date().addDays(1);
      }
      else if(TestDate ==0){
        TestDate='SUT';
        mon = new Date().addDays(-6);
        tue = new Date().addDays(-5);
        wed = new Date().addDays(-4);
        thu = new Date().addDays(-3);
        fri = new Date().addDays(-2);
        sat = new Date().addDays(-1);
        sun = toDayActivities;
      }
      
    
    that.setState({
      date1 : mon.getDate(),
      date2 : tue.getDate(),
      date3 : wed.getDate(),
      date4 : thu.getDate(),
      date5 : fri.getDate(),
      date6 : sat.getDate(),
      date7 : sun.getDate(),
      testDate:TestDate
    });
  }

  scrollViewRef = (ref) => {
    this.calendar = ref;
  }

  prepareDates = (currentMoment, numberOfDays) => {
    const dates = [];
    for (let i = -2; i < 3; i += 1) {
      const date = moment(currentMoment).add(numberOfDays * i, 'd');
      dates.push(date);
    }
    return dates;
  };
  
  componentDidUpdate() {
    this.calendar.scrollTo({ y: 0, x: 2 * (SCREEN_WIDTH - 60), animated: false });
  }

  generateTimes = () => {
    const times = [];
    for (let i = 0; i < TIME_LABELS_COUNT; i += 1) {
      const minutes = i % 2 === 0 ? '00' : '15';
      const hour = Math.floor(i / 2);
      const time = `${hour}:${minutes}`;
      times.push(time);
    }
    return times;
  };

  scrollEnded = (event) => {
    const { nativeEvent: { contentOffset, contentSize } } = event;
    const { x: position } = contentOffset;
    const { width: innerWidth } = contentSize;
    const newPage = (position / innerWidth) * 5;
    const { onSwipePrev, onSwipeNext, numberOfDays } = this.props;
    const { currentMoment } = this.state;
    requestAnimationFrame(() => {
      const newMoment = moment(currentMoment)
        .add((newPage - 2) * numberOfDays, 'd')
        .toDate();

      this.setState({ currentMoment: newMoment });

      if (newPage < 2) {
        onSwipePrev && onSwipePrev(newMoment);
      } else if (newPage > 2) {
        onSwipeNext && onSwipeNext(newMoment);
      }
    });
  };

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
    const {
      numberOfDays,
      headerStyle,
      formatDateHeader,
      onEventPress,
      events,
    } = this.props;
      var SelectedDescription= this.state.selectedDescription
      var SelectCode= this.state.selectCode
      var SelectTimeFrom= this.state.selectTimeFrom
      var SelectTimeTo= this.state.selectTimeTo
      var SelectId = this.state.selectId
      var SelectIsDone = this.state.selectIsDone
      var TokenTimeSheetInternal =  this.params.TokenTimeSheet

    // how to view token import from previous page

    const { navigate } = this.props.navigation;
    const { currentMoment } = this.state;
    const dates = this.prepareDates(currentMoment, numberOfDays);

    return (
      <View style = {styles.fullView}>
        <ScrollView>
          <Icon style={styles.iconStyle} name="ios-notifications" size = {30}/>

          <View style = {styles.calenderStyle}>
            <View style={styles.style1}>

            {this.state.testDate =='MON'?<View style= {styles.dateFrame2}>
                <TouchableOpacity style= {styles.dateFrame1}>
                  <Text style={styles.style2}>
                    {this.state.date1}
                  </Text>
                  <Text style={styles.style3}>{'MON'}</Text>
                </TouchableOpacity>
              </View>: null}

            {this.state.testDate !='MON'?<View style= {styles.dateFrame}>
                <TouchableOpacity style= {styles.dateFrame1}>
                  <Text style={styles.style2}>
                    {this.state.date1}
                  </Text>
                  <Text style={styles.style3}>{'MON'}</Text>
                </TouchableOpacity>
              </View>: null}

            {this.state.testDate =='TUE'?<View style= {styles.dateFrame2}>
              <TouchableOpacity>
                <Text style={styles.style2}>
                  {this.state.date2}
                </Text>
                <Text style={styles.style3}>
                  {'TUE'}
                  </Text>
              </TouchableOpacity>
            </View>: null}

              {this.state.testDate !='TUE'?<View style= {styles.dateFrame}>
              <TouchableOpacity>
                <Text style={styles.style2}>
                  {this.state.date2}
                </Text>
                <Text style={styles.style3}>
                  {'TUE'}
                  </Text>
              </TouchableOpacity>
            </View>: null}


            {this.state.testDate =='WED'?<View style= {styles.dateFrame2}>
              <TouchableOpacity>
                <Text style={styles.style2}>
                  {this.state.date3}
                </Text>
                <Text style={styles.style3}>
                  {'WED'}
                  </Text>
              </TouchableOpacity>
            </View>: null}
            {this.state.testDate !='WED'?<View style= {styles.dateFrame}>
              <TouchableOpacity>
                <Text style={styles.style2}>
                  {this.state.date3}
                </Text>
                <Text style={styles.style3}>
                  {'WED'}
                  </Text>
              </TouchableOpacity>
            </View>: null}

            {this.state.testDate =='THU'?<View style= {styles.dateFrame2}>
              <TouchableOpacity>
                <Text style={styles.style2}>
                  {this.state.date4}
                </Text>
                <Text style={styles.style3}>{'THU'}</Text>
              </TouchableOpacity>
            </View> : null}

            {this.state.testDate !='THU'?<View style= {styles.dateFrame}>
              <TouchableOpacity>
                <Text style={styles.style2}>
                  {this.state.date4}
                </Text>
                <Text style={styles.style3}>{'THU'}</Text>
              </TouchableOpacity>
            </View> : null}


            {this.state.testDate =='FRI'?<View style= {styles.dateFrame2}>
              <TouchableOpacity>
                <Text style={styles.style2}>
                  {this.state.date5}
                </Text>
                <Text style={styles.style3}>
                  {'FRI'}
                  </Text>
              </TouchableOpacity>
            </View> : null}

            {this.state.testDate !='FRI'?<View style= {styles.dateFrame}>
              <TouchableOpacity>
                <Text style={styles.style2}>
                  {this.state.date5}
                </Text>
                <Text style={styles.style3}>
                  {'FRI'}
                  </Text>
              </TouchableOpacity>
            </View>: null}

            {this.state.testDate =='SAT'?<View style= {styles.dateFrame2}>
              <TouchableOpacity>
                <Text style={styles.style2}>
                  {this.state.date6}
                </Text>
                <Text style={styles.style4}>
                  {'SAT'}
                  </Text>
              </TouchableOpacity>
            </View>: null}

            {this.state.testDate !='SAT'?<View style= {styles.dateFrame}>
              <TouchableOpacity>
                <Text style={styles.style2}>
                  {this.state.date6}
                </Text>
                <Text style={styles.style4}>
                  {'SAT'}
                  </Text>
              </TouchableOpacity>
            </View>: null}

            {this.state.testDate =='SUN'?<View style= {styles.dateFrame2}>
              <TouchableOpacity>
                <Text style={styles.style2}>
                  {this.state.date7}
                </Text>
                <Text style={styles.style5}>
                  {'SUN'}
                  </Text>
              </TouchableOpacity>
            </View>: null}    

            {this.state.testDate !='SUN'?<View style= {styles.dateFrame}>
              <TouchableOpacity>
                <Text style={styles.style2}>
                  {this.state.date7}
                </Text>
                <Text style={styles.style5}>
                  {'SUN'}
                  </Text>
              </TouchableOpacity>
            </View>: null}
          </View>
        </View>

        {/* <View style = { styles.blank}></View> */}

        <Text style = {styles.TextStyle}>
            {'\n'}Tasks{'\n'}
        </Text>

        <View style = {styles.taskStyle}>

          <View style= {styles.container}>
          <View style = { styles.item }>
          
          <FlatList
          data={this.state.AllActivities}
          renderItem={({item}) => 
          <TouchableOpacity onPress={() => this.openModal(item)}>
          <View style={{ flexDirection: 'row' }}>
          <CheckBox 
            value={this.state.checked}
            onValueChange={() => this.setState({ checked: !this.state.checked })}
          />
          {item.isDelayed == true?<Text style = { styles.text2 }>{item.description} - {moment(item.date).format('DD/MM/YYYY')}</Text> : null}
          {item.isDelayed == false?<Text style = { styles.text } >{item.description} - {moment(item.timeFrom).format('HH:mm')}</Text> : null}
          <View style = { styles.separator }/> 
          </View>
          </TouchableOpacity>
          }
          
          // extraData={this.state.selectedItem}
          keyExtractor={({id}, index) => id}
          />
          </View>
          
              {/* {
                this.state.delayedActivities.map(( item, key ) =>
                (
                  <View key = { key } style = { styles.item }>
                    <TouchableOpacity onPress={this.openModal}>
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
              }  */}
          </View>
          
            <Modal
              // transparent={true}
              style = {styles.modelStyle} 
              offset={this.state.offset}
              open={this.state.open}
              modalDidOpen={this.modalDidOpen}
              modalDidClose={this.modalDidClose}>

            <View style = {styles.popupStyle}>
              <Button style = {{ margin: 5}} onPress = { () => navigate('Done',{SelectedDescription, SelectCode, SelectTimeFrom, SelectTimeTo, SelectId, SelectIsDone, TokenTimeSheetInternal}) }>
                <Text> Done </Text>
              </Button>
            </View>

            <View style = {styles.popupStyle}>
              <Button style = {{ margin: 5}} onPress = { () => navigate('Postpone', {SelectCode, SelectTimeFrom, SelectTimeTo, TokenTimeSheetInternal}) }>
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

      <View style = { styles.blank}></View>

      <Text style = {styles.TextStyle}>
              {'\n'}Time Sheet{'\n'}
      </Text>

      <View style = { styles.timeSheetStyle}>

        <ScrollView>
          <View style={styles2.scrollViewContent}>
            <View style={styles2.timeColumn}>
              {this.times.map(time => (
                <View key={time} style={styles2.timeLabel}>
                  <Text style={styles2.timeText}>{time}</Text>
                </View>
              ))}
            </View>
            <ScrollView
              horizontal
              pagingEnabled
              automaticallyAdjustContentInsets={false}
              onMomentumScrollEnd={this.scrollEnded}
              ref={this.scrollViewRef}
            >
              {dates.map(date => (
                <View
                  key={date}
                  style={{ flex: 1, width: SCREEN_WIDTH - 60 }}
                >
                  {/* <Events
                    key={dates}
                    times={this.times}
                    selectedDate={date.toDate()}
                    numberOfDays={numberOfDays}
                    onEventPress={onEventPress}
                    events={events}
                  /> */}
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>



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
    // borderWidth: 1,
    // borderColor: 'black',
     width: SCREEN_WIDTH - 2
    // paddingTop: (Platform.OS === 'ios') ? 20 : 0
  },
  item: {
    borderWidth: 1,
    // borderColor: '#FFEB3B',
    borderRadius: 5,
    // paddingLeft: 40,
    width: SCREEN_WIDTH - 5
  },
  
  separator:
  {
    height: 2,
    backgroundColor: 'rgba(255,255,0,0.3)',
    width: '100%'
  },
 
  text:
  {
    fontSize: 15,
    color: 'black',
    padding: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#74e368',
    justifyContent: 'center',
    width: '100%'
  },
  text2:
  {
    fontSize: 15,
    color: 'black',
    padding: 5,
    backgroundColor: '#ef3939',
    borderColor: 'black',
    width: '100%',
    justifyContent: 'center'
  },
  style1: {
    // paddingLeft: 70,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center'
  },
  style2: {
    fontSize: 15,
    marginTop: 8,
    width: 40,
    paddingLeft: 15
  },
  style3: {
    fontSize: 12,
    //marginTop: 9,
    //width: 40,
    color: '#2196f3',
    paddingLeft: 8
  },
  style4: {
    fontSize: 12,
    //marginTop: 9,
    //width: 40,
    color: '#606970',
    paddingLeft: 8
  },
  style5: {
    fontSize: 12,
    //marginTop: 9,
    //width: 40,
    color: '#f08080',
    paddingLeft: 8
  },
  dateFrame: {
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 6,
    backgroundColor: '#cfcab0'
    
    },
    dateFrame2: {
    borderWidth: 1,
    borderColor: "#f3d321",
    borderRadius: 6,
    backgroundColor: '#f3d321'
    },
  dateFrame1: {
    justifyContent: 'center'
  },
  TextStyle: {
    fontSize: 18,
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
 },
 timeSheetStyle: {
  borderWidth: 1,
  borderColor: '#1A237E',
  backgroundColor: '#B2EBF2',
  borderRadius:5
 },
 blank: {
   height: 30
 },
 taskStyle: {
  // borderWidth: 1,
  // borderColor: '#1A237E',
  // backgroundColor: '#7fffd4',
  // borderRadius:5
  justifyContent: 'center',
  alignItems: 'center'
 },
 calenderStyle: {
  height: 80,
  // borderWidth: 1,
  // borderColor: 'orange',
  // backgroundColor: '#f0e68c',
  // borderRadius:5,
  justifyContent: 'center',
  alignItems: 'center'
 },
 descriptionTime: {
   borderWidth: 1,
   borderColor: '#FF00CC',

 }
});

AppRegistry.registerComponent('App', () => App);