import React from 'react';
import { StyleSheet, View } from 'react-native';
import Levels from './screens/levels/Levels';
import Lessons from './screens/lessons/Lessons';
import Activities from './screens/activities/Activities';
import VideoActivity from './screens/activities/VideoActivity';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  Stack = createStackNavigator();

  HomeScreen() {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
          <Levels navigation={navigation}/>
      </View>
    );
  }

  render() {
    return (
      <NavigationContainer>
        <this.Stack.Navigator screenOptions={{
          headerShown: false
          }}>
          <this.Stack.Screen name="Home" component={this.HomeScreen} />
          <this.Stack.Screen name="Lessons" component={Lessons}/>
          <this.Stack.Screen name="Activities" component={Activities}/>
          <this.Stack.Screen name="VideoActivity" component={VideoActivity}/>
        </this.Stack.Navigator>
      </NavigationContainer>
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
