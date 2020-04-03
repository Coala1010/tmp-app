import React from 'react';
import { Text, View, TouchableOpacity, Button, Image, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import ActivityGroupsProgress from '../../Components/navigation/ActivityGroupsProgress';
// import BottomNavigation from '../../Components/navigation/BottomNavigation';

interface State {
  selectedIndex: Number,
}

export default class PhrasesActivity extends React.Component<State> {
    state: Readonly<State> = {
        selectedIndex: -1,
    }  
    
    renderPhraseActivity(videoTitle: String){
      const { videoUrl, lessonTitle } = this.props.route.params; 
      return (
        <View 
        //   key={i} 
          style={{
          marginTop: 10, 
          backgroundColor: '#FCFDFF',
          borderColor: 'black',
          borderStyle: 'solid',
          borderWidth: 0,
          shadowColor: 'lightgray',
          shadowOpacity: 0.6,
          borderRadius: 15, 
          width: '80%',
          marginRight: 10}}>

          {/* <TouchableOpacity style={{padding: 5}} onPress = {() => {this.handleOnPress(i)}}> */}
            <View style = {{backgroundColor: '#FCFDFF', 
                    flexDirection: 'row-reverse', flexWrap: 'wrap',
                    marginRight: 10, justifyContent:'flex-start', alignContent: 'space-around'
                  }}>
                      
                {/* <Text style={{flex: 1, alignContent: 'space-around'}}> */}
                <Text style = {{marginRight: 10, color: '#233665', alignContent: 'flex-end', padding: 7,
                            backgroundColor: '#F7F9FC',
                            fontWeight: 'bold', borderStyle: 'solid', borderRadius: 5, borderWidth: 1,
                            borderColor: '#F7F9FC', overflow: 'hidden', width: 20, height: 30}}>1</Text>    
                    <Text style = {{marginLeft: 10, color: '#233665', alignContent: 'flex-end',
                        padding: 10, fontWeight: 'bold', alignItems: 'flex-end',
                        flexWrap: 'wrap'}}>One idea that comes to mind that would be worth tinkering around with is measuring the text, dimensions and/or character count, and depending on the size of the image, divide the text into two Text components, one that goes to the right/left and the other that goes below the image.</Text>
                    
                {/* </Text> */}
            </View>
          {/* </TouchableOpacity> */}
        
        </View> 
      )
    }
  
    render() {
        const { videoUrl, lessonTitle, videoTitle } = this.props.route.params; 
        return (
            <View style={{flex: 1, justifyContent:'top', width: '100%', backgroundColor: '#FCFDFF'}}>
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
                        <ActivityGroupsProgress chosenActivity='phrases'/>
                    <View style={{alignItems: 'flex-end'}}>
                        {this.renderPhraseActivity(videoTitle)}
                    </View>  

                    <View style={{justifyContent: 'center', flex: 1, flexDirection: 'row'}}>
                        <View style={styles.audioRecordingButton}>
                            <TouchableOpacity 
                                style={styles.audioRecordingButtonTO}
                                onPress={() => this.props.navigation.goBack()}>
                                {/* <View style={styles.audioImageWrapper}> */}
                                <Image 
                                    style={styles.audioRecordingImage}
                                    source={require('../../assets/mic-24px.png')} 
                                />
                                {/* </View> */}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.audioButton}>
                            <TouchableOpacity 
                                style={styles.audioButtonTO}
                                onPress={() => this.props.navigation.goBack()}>
                                {/* <View style={styles.audioImageWrapper}> */}
                                <Image 
                                    style={styles.audioImage}
                                    source={require('../../assets/volume_up-24px.png')} 
                                />
                                {/* </View> */}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


                {/* <BottomNavigation/> */}
                <View style={{flexDirection: 'row', marginBottom: 50, marginBottom: 50}}>
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
                </View>

            </View>
        </View>
      );
    } 
  }


  const styles = StyleSheet.create({
    audioRecordingButtonTO: {
        width: 70, 
        height: 70, 
        borderColor: '#F7F9FC', 
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    audioRecordingButton: {
        width: 70,
        height: 70, 
        marginTop: 30, 
        justifyContent: 'space-around',
        color: '#233665', 
        backgroundColor: '#F7F9FC',
        // backgroundColor: '#233665',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 0,
        shadowColor: 'lightgray',
        shadowOpacity: 0.6,
        borderRadius: 45,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
    },
    audioRecordingImage: {
        height: 26,
        // width: 19,
        resizeMode: 'contain'
    },
    audioButtonTO: {
        width: 70, 
        height: 70, 
        borderColor: '#F7F9FC', 
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    audioButton: {
        width: 70,
        height: 70, 
        marginTop: 30, 
        justifyContent: 'space-around',
        backgroundColor: '#233665',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 0,
        shadowColor: 'lightgray',
        shadowOpacity: 0.6,
        borderRadius: 45,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
    },
    audioImage: {
        height: 20,
        // width: 22,
        resizeMode: 'contain'
    },
    // audioImageWrapper: {
    //     color: '#233665', 
    //     width: 30, 
    //     height: 30, 
    //     backgroundColor: '#F7F9FC',
    //     fontWeight: 'bold', 
    //     borderStyle: 'solid', 
    //     borderRadius: 5, 
    //     borderWidth: 1,
    //     borderColor: '#F7F9FC', 
    //     overflow: 'hidden',
    //     alignItems: 'center',
    // },
    image: {
        height: 24,
        width: 24,
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