import React from 'react';
import { Text, View, TouchableOpacity, Button, Image, StyleSheet } from 'react-native';
import UserLessons from '../../types/UserLessons';
import UserActivitiesProvider from '../../providers/activities/UserActivitiesProvider';

interface State {
  selectedIndex: Number,
  userLessons: UserLessons,
}

export default class Activities extends React.Component<State> {
    state: Readonly<State> = {
        selectedIndex: -1,
        userLessons: null
    }  
    
    renderActivitiesList(){
      const { lessonTitle, lessonId } = this.props.route.params; 
      const userActivities = UserActivitiesProvider("1", lessonId);
      return (
        <View 
          //key={i} 
          style={{
          marginTop: 10, 
          justifyContent: 'space-around',
          backgroundColor: '#FCFDFF',
          borderColor: 'black',
          borderStyle: 'solid',
          borderWidth: 0,
          shadowColor: 'lightgray',
          shadowOpacity: 0.6,
          borderRadius: 15}}>

          <TouchableOpacity style={{padding: 5}} 
            onPress={() => this.props.navigation.navigate('VideoActivity', { videoUrl: userActivities.videoActivity.videoUrl,
              lessonTitle: lessonTitle})}>
            <View style = {{alignItems: 'center', backgroundColor: '#FCFDFF', 
                  justifyContent: 'space-around', height: 60,
                  flexDirection: 'row'
                  }}>
              <Text style = {{marginLeft: 70, color: '#233665', alignContent: 'center', display: 'flex', 
              padding: 10, fontWeight: 'bold'}}>Video Activity</Text>
              <Image 
                            style={styles.image}
                            source={require('../../assets/video-24px.png')} 
                            />
            </View>
          </TouchableOpacity>
        
        </View>
      )
    }
  
    render() {
        const { lessonTitle } = this.props.route.params; 
        return (
            <View style={{flex: 1, justifyContent:'top', width: '100%', backgroundColor: '#FCFDFF'}}>
                <View style={{flex: 1, justifyContent:'top', width: '100%', backgroundColor: '#FCFDFF'}}>
                    <View style={{backgroundColor: '#233665',
                            borderStyle: 'solid', borderWidth: 3,
                        borderColor: '#F7F9F7', height: 100,
                        justifyContent: 'space-around',
                        flexDirection: 'row', overflow: 'hidden'}}>
                      <View style={{marginTop: 60, backgroundColor: '#FCFDFF',
                            borderStyle: 'solid', borderWidth: 3,
                            borderColor: '#F7F9F7', height: 60,                          
                            position: 'absolute',
                            paddingTop:10,
                            paddingLeft:10,
                            top: 40,
                            left: 10
                            }}>
                        <Text style={{textAlign: 'center', marginTop: 50, fontWeight: 'bold', color: '#233665', width: '100%',}}>
                          {lessonTitle}
                        </Text>
                      </View>
                    </View>
                {this.renderActivitiesList()}
            </View>
        </View>
      );
    } 
  }


  const styles = StyleSheet.create({
    image: {
      height: 24,
      width: 24,
      //resizeMode: 'contain',  
    },
    backButton: {marginTop: 50, color: '#233665', width: 30, height: 30, marginRight: 30,
    backgroundColor: '#F7F9FC',
    fontWeight: 'bold', borderStyle: 'solid', borderRadius: 5, borderWidth: 1,
    borderColor: '#F7F9FC', overflow: 'hidden',
    alignItems: 'center'}
  });