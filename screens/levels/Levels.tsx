import React from 'react';

import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';

import Units from '../../Components/Units/Units';
import UserLevels from '../../types/UserLevels';

import UserLevelsProvider from '../../providers/UserLevelsProvider';
import UserProvider from '../../providers/UserProvider';
import CircularProgress from '../../Components/CircularProgress/CircularProgress';

import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
} from 'react-navigation';


interface State {
    selectedIndex: Number,
    userLevels: UserLevels,
    userToken: string
}

export default class Levels extends React.Component<State> {

    constructor (props) {
        super(props)
        this.updateIndex = this.updateIndex.bind(this)
        UserProvider((json) => {
          const token = json.token;
          this.setState({userToken: token});
          UserLevelsProvider(token, (json) => {
            let userLevels : UserLevels = new UserLevels();
            userLevels.userLevelsArray = json;
            this.setState({userLevels : userLevels});
        })
        });
    }

    state: Readonly<State> = {
        selectedIndex: -1,
        userLevels: null,
        userToken: null
    }  
  
    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }
  
    handleOnPress(selectedIndex) {
        const selectedIndexUpdate = this.state.selectedIndex == selectedIndex ? -1 : selectedIndex
        this.setState({selectedIndex: selectedIndexUpdate});  
    }
    
    renderLevelsList(){
      const userLevels = this.state.userLevels;
      return userLevels.userLevelsArray.map((userLevel, i, levelArray) =>
        <View 
          key={i} 
          style={styles.level}>

          <TouchableOpacity style={{padding: 5}} onPress = {() => {this.handleOnPress(i)}}>
            <View style = {{alignItems: 'center', backgroundColor: '#FCFDFF', 
                  justifyContent: 'space-around', height: 60,
                  flexDirection: 'row'
                  }}>
              <View style={styles.progressContainer}>
                {
                  userLevel.userLevelProgress > 0 ?
                  (
                  userLevel.userLevelProgress < 1 ? 
                  <CircularProgress percent={userLevel.userLevelProgress * 100} />
                  : <Image style={styles.congratsImage} source={require('../../assets/achieved.png')} />
                  ) : <View/>
                }          
              </View>      
              <Text style = {styles.levelTitle}>{userLevel.title}</Text>
              <View style = {styles.levelNumberWrapper}>
                <Text style = {styles.levelNumber}>{i+1}</Text>              
              </View>
            </View>
          </TouchableOpacity>
          
          <Units userUnits={userLevel.userUnits} visible={this.state.selectedIndex == i} 
                navigation = {this.props.navigation} token={this.state.userToken}/>
        
        </View>
      )
    }
  
    render() {
      let list;
      if (this.state.userLevels) {
          list = this.renderLevelsList();
      }

      return (
        // <CircularProgressWrapper/>  
        <View style={{flex: 1, justifyContent:'center', width: '100%'}}>
          <View style={{backgroundColor: '#FCFDFF',
                        borderStyle: 'solid', borderWidth: 3,
                        borderColor: '#F7F9F7', height: 80,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center'}}>
                <Text style={styles.screenTitle}>
                  المسـتويــات  
                </Text>
            </View>
          <ScrollView 
            scrollEventThrottle={50}>
            {list}
          </ScrollView>
        </View>
      );
    } 
  }

  const styles = StyleSheet.create({
    screenTitle: {
      position: 'absolute',
      bottom: 16,
      textAlign: 'center', 
      // marginBottom: 16, 
      fontWeight: 'bold', 
      color: '#233665', 
      width: '100%', 
      fontSize: 20,
      fontFamily: 'NeoSansArabicBold',
    },
    level: {
      width: '95%',
      margin: 10,
      justifyContent: 'center', 
      alignContent: 'center',
      backgroundColor: '#FCFDFF',
      // borderColor: 'black',
      // borderStyle: 'solid',
      // borderWidth: 0,
      shadowColor: 'lightgray',
      shadowOpacity: 0.6,
      borderRadius: 16,
      // shadowColor: "#000",
      shadowOffset: {
            width: 0,
            height: 2,
        },
      // shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
      fontSize: 20
      // backgroundColor: 'white',
      // borderRadius: 20,
    },
    levelNumberWrapper: {
      height: 36,
      width: 36,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      display: 'flex', 
      backgroundColor: '#F7F9FC',
      borderStyle: 'solid', 
      borderRadius: 5, 
      borderWidth: 1,
      borderColor: '#F7F9FC', 
      overflow: 'hidden', 
      position: 'absolute',
      right: 10,
    },
    levelNumber: {
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      fontSize: 20, 
      color: '#233665', 
      fontWeight: 'bold',
      fontFamily: 'NeoSansArabicBold',
      margin: 8
    },
    levelTitle: {
      color: '#233665', 
      alignContent: 'center', 
      display: 'flex', 
      padding: 10, 
      fontWeight: 'bold',
      fontSize: 20,
      fontFamily: 'NeoSansArabicBold'
    },
    progressContainer: {
      position: 'absolute',
      left: '5%',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    congratsImage: {
      height: 36,
      width: 32,
      resizeMode: 'contain', 
    },
  });

