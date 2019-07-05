import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

export class Done extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to done intent</Text>
      </View>
    );
  }
}
export default Done;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

      // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      //   <TouchableOpacity onPress={this.openModal}>
      //     <Text>Open modal</Text>
      //   </TouchableOpacity>
      //   <Modal
      //     offset={this.state.offset}
      //     open={this.state.open}
      //     modalDidOpen={this.modalDidOpen}
      //     modalDidClose={this.modalDidClose}
      //     style={{ alignItems: "center" }}
      //   >
      //     <View style={{ alignItems: "center" }}>
      //       <Text style={{ fontSize: 20, marginBottom: 10 }}>Hello world!</Text>
      //       <TouchableOpacity style={{ margin: 5 }} onPress={this.moveUp}>
      //         <Text>Move modal up</Text>
      //       </TouchableOpacity>
      //       <TouchableOpacity
      //         style={{ margin: 5 }}
      //         onPress={this.resetPosition}
      //       >
      //         <Text>Reset modal position</Text>
      //       </TouchableOpacity>
      //       <TouchableOpacity style={{ margin: 5 }} onPress={this.closeModal}>
      //         <Text>Close modal</Text>
      //       </TouchableOpacity>
      //     </View>
      //   </Modal>
      // </View>

