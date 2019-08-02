import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  scrollViewContent: {
    flexDirection: 'column',
    // height:200
  },
  header: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeLabel: {
    // flex: -1,
    height: 40,
  },
  timeText: {
    fontSize: 12,
    textAlign: 'left',
    fontWeight: 'bold',
    paddingLeft: 10
  },
  timeColumn: {
    paddingTop: 10,
    width: '100%',
  },
});

export default styles;