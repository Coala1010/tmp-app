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
        <View style={{flex: 1, justifyContent:'top', padding: 10, width: '100%'}}>
            <View style={{alignContent: 'flex-end', alignItems: 'flex-start'}}
                //key={i} 
                style={styles.activity}>

                <TouchableOpacity style={{padding: 5}} 
                    onPress={() => this.props.navigation.navigate('VideoActivity', { videoUrl: userActivities.videoActivity.videoUrl,
                    lessonTitle: lessonTitle})}>
                    <View style = {{alignItems: 'center', backgroundColor: '#FCFDFF', 
                        justifyContent: 'space-around', height: 60,
                        flexDirection: 'row'
                        }}>
                    <Text style = {{marginLeft: 50, color: '#233665', alignContent: 'center', display: 'flex', 
                    padding: 10, fontWeight: 'bold'}}>Video Activity</Text>
                    <Image 
                                    style={styles.image}
                                    source={require('../../assets/video-24px.png')} 
                                    />
                    </View>
                </TouchableOpacity>
            </View>
            <View 
                //key={i} 
                style={styles.activity}>

                <TouchableOpacity style={{padding: 5}} 
                    onPress={() => this.props.navigation.navigate('PhrasesActivity', { videoUrl: userActivities.videoActivity.videoUrl,
                    lessonTitle: lessonTitle})}>
                    <View style = {{alignItems: 'center', backgroundColor: '#FCFDFF', 
                        justifyContent: 'space-around', height: 60,
                        flexDirection: 'row'
                        }}>
                    <Text style = {{marginLeft: 50, color: '#233665', alignContent: 'center', display: 'flex', 
                    padding: 10, fontWeight: 'bold'}}>Phrases Activity</Text>
                    <Image 
                                    style={styles.image}
                                    source={require('../../assets/headset-24px.png')} 
                                    />
                    </View>
                </TouchableOpacity>
            </View>
            <View 
                //key={i} 
                style={styles.activity}>

                <TouchableOpacity style={{padding: 5}} 
                    onPress={() => this.props.navigation.navigate('WordsActivity', { videoUrl: userActivities.videoActivity.videoUrl,
                    lessonTitle: lessonTitle})}>
                    <View style = {{alignItems: 'center', backgroundColor: '#FCFDFF', 
                        justifyContent: 'space-around', height: 60,
                        flexDirection: 'row'
                        }}>
                    <Text style = {{marginLeft: 50, color: '#233665', alignContent: 'center', display: 'flex', 
                    padding: 10, fontWeight: 'bold'}}>Words Activity</Text>
                    <Image 
                                    style={styles.image}
                                    source={require('../../assets/photo-24px.png')} 
                                    />
                    </View>
                </TouchableOpacity>
            </View>
            <View 
                //key={i} 
                style={styles.activity}>

                <TouchableOpacity style={{padding: 5}} 
                    onPress={() => this.props.navigation.navigate('MultichoiceActivity', { videoUrl: userActivities.videoActivity.videoUrl,
                    lessonTitle: lessonTitle})}>
                    <View style = {{alignItems: 'center', backgroundColor: '#FCFDFF', 
                        justifyContent: 'space-around', height: 60,
                        flexDirection: 'row'
                        }}>
                    <Text style = {{marginLeft: 50, color: '#233665', alignContent: 'center', display: 'flex', 
                    padding: 10, fontWeight: 'bold'}}>Multichoice Activity</Text>
                    <Image 
                                    style={styles.image}
                                    source={require('../../assets/format_list_bulleted-24px.png')} 
                                    />
                    </View>
                </TouchableOpacity>
            </View>
            <View 
                //key={i} 
                style={styles.activity}>

                <TouchableOpacity style={{padding: 5}} 
                    onPress={() => this.props.navigation.navigate('DragAndDropActivity', { videoUrl: userActivities.videoActivity.videoUrl,
                    lessonTitle: lessonTitle})}>
                    <View style = {{alignItems: 'center', backgroundColor: '#FCFDFF', 
                        justifyContent: 'space-around', height: 60,
                        flexDirection: 'row'
                        }}>
                    <Text style = {{marginLeft: 50, color: '#233665', alignContent: 'center', display: 'flex', 
                    padding: 10, fontWeight: 'bold'}}>Drag And Drop Activity</Text>
                    <Image 
                                    style={styles.image}
                                    source={require('../../assets/extension-24px.png')} 
                                    />
                    </View>
                </TouchableOpacity>
            </View>
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
                <View style={{flexDirection: 'row', marginBottom: 50}}>
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
      );
    } 
  }


  const styles = StyleSheet.create({
    image: {
        height: 24,
        width: 24,
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
    },
    activity: {
        marginTop: 10, 
        justifyContent: 'space-around',
        backgroundColor: '#FCFDFF',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 0,
        shadowColor: 'lightgray',
        shadowOpacity: 0.6,
        borderRadius: 15,
        alignContent: 'center'
    }
  });