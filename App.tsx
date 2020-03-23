import React from 'react';
import { StyleSheet, View } from 'react-native';
import Lessons from './Components/Lessons/Lessons';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
          <Lessons/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFDFF',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial',
    padding: 5
  },
});    
