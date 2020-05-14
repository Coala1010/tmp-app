import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
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
import * as SplashScreen from 'expo-splash-screen';

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
    SplashScreen.hideAsync() 
  }

  componentDidMount = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {
      console.warn(e);
    }
    const ReactNative = require('react-native');
    try {
      ReactNative.I18nManager.allowRTL(false);
    } catch (e) {
      console.log(e);
    }
    await this._loadFontsAsync();
  }

  Stack = createStackNavigator();

  HomeScreen() {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="white"
          translucent/>
        <Levels navigation={navigation}/>
      </View>
      // </SafeAreaView>
    );
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <NavigationContainer>
          <this.Stack.Navigator screenOptions={{
            headerShown: false
          }}
          headerMode='none'>
            <this.Stack.Screen name="Home" component={this.HomeScreen}/>
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
      return null;
    }  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFDFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
