import React from 'react';
import { Text, View, TouchableOpacity, Button, Image, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
// import BottomNavigation from '../../Components/navigation/BottomNavigation';
import VideoProvider from '../../providers/activities/VideoProvider';
import ActivityFooter from '../../Components/ActivityFooter/ActivityFooter';

interface State {
  videoUrl: string,
  videoTimer: number
}

export default class VideoActivity extends React.Component<State> {
    state: Readonly<State> = {
        videoUrl: '',
        videoTimer: 0,
    }  

    componentDidMount() {
        const { userGroupId } = this.props.route.params;
        VideoProvider(userGroupId, (json) => {
          const videoProgress = json;
          this.setState({videoUrl : videoProgress.videoUrl, videoTimer: videoProgress.videoTimer});
        })
      }
    
    renderVideo(videoTitle: String){
    //   const { videoUrl, lessonTitle } = this.props.route.params; 
        // const { activities } = this.props.route.params;
        // const nextActivity = activities.get('video').nextActivity;
      return (
        <View style={{flex: 1, justifyContent:'flex-start', width: '100%', backgroundColor: '#FCFDFF'}}>
            <View style={{flex: 1, justifyContent: 'flex-start', flexDirection: 'column', alignItems:'flex-start', width: '100%', backgroundColor: '#FCFDFF'}}>
                {
                    this.state.videoUrl ? (<VideoPlayer
                        videoProps={{
                            shouldPlay: true,
                            resizeMode: Video.RESIZE_MODE_CONTAIN,
                            source: {
                                uri: this.state.videoUrl,
                            }
                        }}
                        height={360}
                        inFullscreen={false}
                        showControlsOnLoad={true}
                        videoBackground='transparent'
                        sliderColor='#233665'
                    />)
                    : <View/>
                }
            </View>
            <Text style={{textAlign: 'right', marginTop: 20, marginRight:50, fontWeight: 'bold', color: '#233665', width: '90%',}}>
                {videoTitle}
            </Text>
        </View>
      )
    }
  
    render() {
        const { videoUrl, lessonTitle, videoTitle, activities } = this.props.route.params; 
        const nextActivity = activities.get('video').nextActivity;
        return (
            <View style={{flex: 1, justifyContent:'flex-start', width: '100%', backgroundColor: '#FCFDFF'}}>
                <View style={{flex: 1, justifyContent:'flex-start', width: '100%', backgroundColor: '#FCFDFF'}}>
                    <View style={{backgroundColor: '#FCFDFF',
                            borderStyle: 'solid', borderWidth: 3,
                        borderColor: '#F7F9F7', height: 100,
                        justifyContent: 'space-around',
                        flexDirection: 'row'}}>
                        <Text style={{textAlign: 'center', marginTop: 50, fontWeight: 'bold', color: '#233665', width: '100%',}}>
                            {lessonTitle}
                        </Text>
                    </View>
                {this.renderVideo(videoTitle)}

                {/* <BottomNavigation/> */}
                <ActivityFooter
                        navigation={this.props.navigation}
                        toNext={nextActivity.navigationScreen}
                        toNextPayload={{ 
                            userGroupId: nextActivity.userGroupId,
                            lessonTitle: nextActivity.lessonTitle,
                            lessonId: nextActivity.lessonId,
                            userToken: nextActivity.userToken,
                            unitTitle: nextActivity.unitTitle,
                            activities: activities
                        }}
                    />
                {/* <View style={{flexDirection: 'row', marginBottom: 50}}>
                    <View style={styles.forwardButton}>
                        <TouchableOpacity style={{padding: 5}} 
                            onPress={() => this.props.navigation.navigate('VideoActivity', { videoUrl: userActivities.videoActivity.videoUrl,
                            lessonTitle: lessonTitle})}>
                            <View style = {styles.forwardButtonInner}>
                                <Image 
                                    style={styles.forwardImage}
                                    source={require('../../assets/keyboard_arrow_left-24px.png')} 
                                />
                                <Text style = {{ color: '#233665', alignContent: 'center', display: 'flex', 
                                            padding: 10, fontWeight: 'bold'}}>Forward</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.backButton}>
                        <TouchableOpacity 
                            style={styles.backButtonTO}
                            onPress={() => this.props.navigation.goBack()}>
                            <View style={styles.backImageWrapper}>
                                <Image 
                                    style={styles.backImage}
                                    source={require('../../assets/exit_to_app-24px.png')} 
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> */}

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
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    forwardImage: {
        height: 24,
        width: 14,
    },
    backImage: {
        height: 24,
        width: 24,
    },
    backImageWrapper: {
        color: '#233665', 
        width: 30, 
        height: 30, 
        backgroundColor: '#F7F9FC',
        fontWeight: 'bold', 
        borderStyle: 'solid', 
        borderRadius: 5, 
        borderWidth: 1,
        borderColor: '#F7F9FC', 
        overflow: 'hidden',
        alignItems: 'center',
    },
    backButtonTO: {
        width: 60, 
        height: 30, 
        borderColor: '#F7F9FC', 
        overflow: 'hidden',
        alignItems: 'center',
    },
    backButton: {
        width: 60, 
        marginTop: 10, 
        justifyContent: 'space-around',
        backgroundColor: '#FCFDFF',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 0,
        shadowColor: 'lightgray',
        shadowOpacity: 0.6,
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
    },
    forwardButton: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 10, 
        justifyContent: 'space-around',
        backgroundColor: '#FCFDFF',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 0,
        shadowColor: 'lightgray',
        shadowOpacity: 0.6,
        borderRadius: 15,
        width: '70%'
    },
    forwardButtonInner: {
        alignItems: 'center', 
        backgroundColor: '#FCFDFF', 
        justifyContent: 'space-around', 
        height: 60,
        flexDirection: 'row'
    }
  });