import React, { Component } from 'react';
import { StyleSheet, View ,FlatList, Text, ScrollView,AppRegistry, TouchableOpacity,Dimensions, CheckBox} from 'react-native';
import Button from '../UI/components/Button/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-simple-modal";
import moment from 'moment';
import styles2 from './WeekView.styles';
import CalendarStrip from 'react-native-slideable-calendar-strip';

const width = Dimensions.get('window').width;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TIME_LABELS_COUNT = 48;

export default class App extends Component {
  state = { 
    open: false,
    scrollEnabled: true,
  };

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
             selectIsDone: rowItem.isDone,
             selectDate: rowItem.date
            });

  closeModal = () => this.setState({ open: false });
  
  static navigationOptions={ 
    // header:null,
    tabBarVisible:true ,
    title: 'Time Entry Sheet'
  }
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.state = {
      selectedDate: new Date(),
      AllActivities:[],
      toDayActivity:[],
      delayedActivities:[],
      i:'',
      selectedDescription:'',
      selectCode: '',
      selectTimeFrom: '',
      selectTimeTo: '',
      selectId: '',
      selectIsDone: '',
      selectDate: '',
      checked: false
    };
    this.calendar = null;
    this.times = this.generateTimes();
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

    var API = 'http://192.168.2.23:100/integration/activity/getActivities?date='
    var day = new Date().getDate()
    var month = new Date().getMonth() + 1
    var year = new Date().getFullYear()
    var today = year+'-'+month+'-'+day

    fetch ( API+ today , {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + this.params.TokenTimeSheet,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json())
      .then((responseJson) => {
          
          let ToTestarray = [];
          for (i = 0 ; i < responseJson.activityList.length ; i = i + 1)
          {
            ToTestarray.push(responseJson.activityList[i]);
          }
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
      var SelectDate = this.state.selectDate
      var TokenTimeSheetInternal =  this.params.TokenTimeSheet
      
    // how to view token import from previous page
    const { navigate } = this.props.navigation;

    const { currentMoment } = this.state;
    const dates = this.prepareDates(currentMoment, numberOfDays);
    return (
      <View style = {styles.fullView}>
        <ScrollView>
          {/* <Icon style={styles.iconStyle} name="ios-notifications" size = {30}/> */}

          <View style={styles.container1}>
            <CalendarStrip
              selectedDate={this.state.selectedDate}
              onPressDate={(date) => {
                this.setState({ selectedDate: date });
              }}
              onPressGoToday={(today) => {
                this.setState({ selectedDate: today });
              }}
              onSwipeDown={() => {
                alert('onSwipeDown');
              }}
              markedDate={['']}
            />
          </View>
          <Text style = {styles.TextStyle}>
              {'\n'}Tasks{'\n'}
          </Text>

          <View style = {styles.taskStyle}>
            <View style= {styles.container2}>
              <View style = { styles.item } >
                <FlatList
                  style = {styles.listTask}
                  scrollEnabled={this.state.scrollEnabled}
                  data={this.state.AllActivities}
                  renderItem={({item}) => 
                    <TouchableOpacity onPress={() => this.openModal(item)}>
                      <View style={{ flexDirection: 'row' }}>
                        <CheckBox 
                        value={this.state.checked}
                        onValueChange={() => this.setState({ checked: !this.state.checked })}/>
                        {item.isDelayed == true?<Text style = { styles.text2 }>{item.description} - {moment(item.date).format('YYYY-MM-DD')}</Text> : null}
                        {item.isDelayed == false?<Text style = { styles.text } >{item.description} - {moment(item.timeFrom).format('HH:mm')}</Text> : null}
                        <View style = { styles.separator }/> 
                      </View>
                    </TouchableOpacity>
                  }
                  keyExtractor={({id}, index) => id}
                  scrollEnabled={true}> 
                </FlatList>
              </View>
            </View>
            <Modal
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
                <Button style = {{ margin: 5}} onPress = { () => navigate('EditTask') }>
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
      <Text style = {styles.TextStyle}>{'\n'}Time Sheet{'\n'}</Text>
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
              ref={this.scrollViewRef}>
              {dates.map(date => (
                <View
                  key={date}
                  style={{ flex: 1, width: SCREEN_WIDTH - 60 }}>
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
  container1: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  container2:
  {
    flex: 1,
    width: SCREEN_WIDTH - 2
  },
  item: {
    borderWidth: 1,
    borderRadius: 5,
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
  TextStyle: {
    fontSize: 18,
    color: '#000000',
    paddingLeft: 20
  },
  iconStyle: {
    alignSelf: 'flex-end',
    paddingRight: 10
},
  popupStyle: {
    alignItems: 'center'
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
    justifyContent: 'center',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('App', () => App);