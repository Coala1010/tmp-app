import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Levels from './screens/levels/Levels';
import Lessons from './screens/lessons/Lessons';
import Activities from './screens/activities/Activities';
import VideoActivity from './screens/activities/VideoActivity';
import PhrasesActivity from './screens/activities/PhrasesActivity';
import WordsActivity from './screens/activities/WordsActivity';
import MultichoiceActivity from './screens/activities/MultichoiceActivity';
import DragAndDropActivity from './screens/activities/DragAndDropActivity';
import Congratulations from './screens/activities/Congratulations';
// import { useFonts } from '@use-expo/font';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

let customFonts = {
  'NeoSansArabicBlack': require('./assets/fonts/NeoSansArabic-Black.ttf'),
  'NeoSansArabicBold': require('./assets/fonts/NeoSansArabic-Bold.ttf'),
  'NeoSansArabicLight': require('./assets/fonts/NeoSansArabic-Light.ttf'),
  'NeoSansArabicMedium': require('./assets/fonts/NeoSansArabic-Medium.ttf'),
  'NeoSansArabicRegular': require('./assets/fonts/NeoSansArabic-Regular.ttf'),
  'NeoSansArabicUltra': require('./assets/fonts/NeoSansArabic-Ultra.ttf'),
  'NeoSansArabic': require('./assets/fonts/NeoSansArabic.ttf')
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    fontsLoaded: false,
  };

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount = async () => {
    await this._loadFontsAsync();
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
    if (this.state.fontsLoaded) {
      return (
        <NavigationContainer>
          <this.Stack.Navigator screenOptions={{
            headerShown: false
          }}>
            <this.Stack.Screen name="Home" component={this.HomeScreen} />
            <this.Stack.Screen name="Lessons" component={Lessons}/>
            <this.Stack.Screen name="Activities" component={Activities}/>
            <this.Stack.Screen name="VideoActivity" component={VideoActivity}/>
            <this.Stack.Screen name="PhrasesActivity" component={PhrasesActivity}/>
            <this.Stack.Screen name="WordsActivity" component={WordsActivity}/>
            <this.Stack.Screen name="MultichoiceActivity" component={MultichoiceActivity}/>
            <this.Stack.Screen name="DragAndDropActivity" component={DragAndDropActivity}/>
            <this.Stack.Screen name="Congratulations" component={Congratulations}/>
          </this.Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return <AppLoading startAsync={() => Font.loadAsync(customFonts)}
            onFinish={() => this.setState({ fontsLoaded: true })}/>;
    }  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFDFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
});
