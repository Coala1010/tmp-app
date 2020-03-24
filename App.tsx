import React from 'react';
import { StyleSheet, View } from 'react-native';
import Levels from './screens/levels/Levels';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
          <Levels/>
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
    marginTop: 30
  },
});    
