import React from 'react';
import { Text, View, TouchableOpacity, Button, Image, StyleSheet } from 'react-native';
import UserLessons from '../../types/UserLessons';
import UserLessonsProvider from '../../providers/UserLessonsProvider';
import { Video } from 'expo-av';

interface State {
  selectedIndex: Number,
  userLessons: UserLessons,
}

export default class VideoActivity extends React.Component<State> {
    state: Readonly<State> = {
        selectedIndex: -1,
        userLessons: UserLessonsProvider("1")
    }  
    
    renderVideo(){
      const userLessons = this.state.userLessons;
      const { videoUrl, lessonTitle } = this.props.route.params; 
      return (
        <View style={{flex: 1, justifyContent:'top', width: '100%', backgroundColor: '#FCFDFF'}}>
            <Video
                source={require('../../assets/video_sample.mov')}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={{ width: '100%', height: 300 }}
            />
        
        </View>
      )
    }
  
    render() {
        const { videoUrl, lessonTitle } = this.props.route.params; 
        return (
            <View style={{flex: 1, justifyContent:'top', width: '100%', backgroundColor: '#FCFDFF'}}>
                <View style={{flex: 1, justifyContent:'top', width: '100%', backgroundColor: '#FCFDFF'}}>
                    <View style={{backgroundColor: '#FCFDFF',
                            borderStyle: 'solid', borderWidth: 3,
                        borderColor: '#F7F9F7', height: 100,
                        justifyContent: 'space-around',
                        flexDirection: 'row'}}>
                        <Text style={{textAlign: 'center', marginTop: 50, fontWeight: 'bold', color: '#233665', width: '100%',}}>
                            {lessonTitle}
                        </Text>
                    </View>
                {this.renderVideo()}
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
    backButton: {
        marginTop: 50, 
        color: '#233665', 
        width: 30, 
        height: 30, 
        marginRight: 30,
        backgroundColor: '#F7F9FC',
        fontWeight: 'bold', 
        borderStyle: 'solid', 
        borderRadius: 5, 
        borderWidth: 1,
        borderColor: '#F7F9FC', 
        overflow: 'hidden',
        alignItems: 'center'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }
  });