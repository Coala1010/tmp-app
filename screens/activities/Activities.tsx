import React from 'react';
import { Text, View, TouchableOpacity, Button, Image, StyleSheet } from 'react-native';
import UserActivities from '../../types/activities/UserActivities';
import UserActivitiesProvider from '../../providers/activities/UserActivitiesProvider';
import NavigationActivity from '../../Components/navigation/NavigationActivity';

interface State {
  selectedIndex: Number,
  userActivities: UserActivities,
  userToken: string,
  activities: Map<string, NavigationActivity>
}

export default class Activities extends React.Component<State> {
    state: Readonly<State> = {
        selectedIndex: -1,
        userActivities: null,
        userToken: null,
        activities: null
    }

    constructor (props) {
        super(props)
    }

    componentDidMount() {
        const { lessonTitle, lessonId, userToken, unitId, unitTitle } = this.props.route.params;
        this.setState({userToken: userToken});
        UserActivitiesProvider(lessonId, (json) => {
            let userActivities : UserActivities = json;
            this.setState({userActivities : userActivities});
            this.createActivitiesMap(lessonId, lessonTitle, userToken, userActivities, unitId, unitTitle);
        });
    }

    createActivitiesMap = (lessonId: number, lessonTitle: string, userToken: string, userActivities : UserActivities, unitId: number, unitTitle: string) => {
        const activities = new Map<string, NavigationActivity>()

        let nextActivity = new NavigationActivity();
        nextActivity.lessonId = lessonId;
        nextActivity.lessonTitle = lessonTitle;
        nextActivity.userGroupId = userActivities.dragAndDropActivityGroup.userGroupId;
        nextActivity.userToken = userToken;
        nextActivity.navigationScreen = 'Lessons';
        nextActivity.nextActivity = nextActivity;
        nextActivity.unitId = unitId;
        nextActivity.unitTitle = unitTitle;
        activities.set('lessons', nextActivity);

        if (userActivities.dragAndDropActivityGroup && userActivities.dragAndDropActivityGroup.userGroupId) {
            const phrasesNavigation = new NavigationActivity();
            phrasesNavigation.lessonId = lessonId;
            phrasesNavigation.lessonTitle = lessonTitle;
            phrasesNavigation.userGroupId = userActivities.dragAndDropActivityGroup.userGroupId;
            phrasesNavigation.userToken = userToken;
            phrasesNavigation.navigationScreen = 'DragAndDropActivity';
            phrasesNavigation.nextActivity = nextActivity;
            phrasesNavigation.unitId = unitId;
            phrasesNavigation.unitTitle = unitTitle;
            activities.set('dragndrop', phrasesNavigation);
            nextActivity = phrasesNavigation;
        }

        if (userActivities.multichoiceActivityGroup && userActivities.multichoiceActivityGroup.userGroupId) {
            const phrasesNavigation = new NavigationActivity();
            phrasesNavigation.lessonId = lessonId;
            phrasesNavigation.lessonTitle = lessonTitle;
            phrasesNavigation.userGroupId = userActivities.multichoiceActivityGroup.userGroupId;
            phrasesNavigation.userToken = userToken;
            phrasesNavigation.navigationScreen = 'MultichoiceActivity';
            phrasesNavigation.nextActivity = nextActivity;
            phrasesNavigation.unitId = unitId;
            phrasesNavigation.unitTitle = unitTitle;
            activities.set('multichoice', phrasesNavigation);
            nextActivity = phrasesNavigation;
        }

        if (userActivities.wordActivityGroup && userActivities.wordActivityGroup.userGroupId) {
            const phrasesNavigation = new NavigationActivity();
            phrasesNavigation.lessonId = lessonId;
            phrasesNavigation.lessonTitle = lessonTitle;
            phrasesNavigation.userGroupId = userActivities.wordActivityGroup.userGroupId;
            phrasesNavigation.userToken = userToken;
            phrasesNavigation.navigationScreen = 'WordsActivity';
            phrasesNavigation.nextActivity = nextActivity;
            phrasesNavigation.unitId = unitId;
            phrasesNavigation.unitTitle = unitTitle;
            activities.set('words', phrasesNavigation);
            nextActivity = phrasesNavigation;
        }

        if (userActivities.phrasesActivityGroup && userActivities.phrasesActivityGroup.userGroupId) {
            const phrasesNavigation = new NavigationActivity();
            phrasesNavigation.lessonId = lessonId;
            phrasesNavigation.lessonTitle = lessonTitle;
            phrasesNavigation.userGroupId = userActivities.phrasesActivityGroup.userGroupId;
            phrasesNavigation.userToken = userToken;
            phrasesNavigation.navigationScreen = 'PhrasesActivity';
            phrasesNavigation.nextActivity = nextActivity;
            phrasesNavigation.unitId = unitId;
            phrasesNavigation.unitTitle = unitTitle;
            activities.set('phrases', phrasesNavigation);
            nextActivity = phrasesNavigation;
        }

        if (userActivities.videoActivityGroup && userActivities.videoActivityGroup.userGroupId) {
            const phrasesNavigation = new NavigationActivity();
            phrasesNavigation.lessonId = lessonId;
            phrasesNavigation.lessonTitle = lessonTitle;
            phrasesNavigation.userGroupId = userActivities.dragAndDropActivityGroup.userGroupId;
            phrasesNavigation.userToken = userToken;
            phrasesNavigation.navigationScreen = 'VideoActivity';
            phrasesNavigation.nextActivity = nextActivity;
            phrasesNavigation.unitId = unitId;
            phrasesNavigation.unitTitle = unitTitle;
            activities.set('video', phrasesNavigation);
            nextActivity = phrasesNavigation;
        }

        this.setState({activities: activities});
    }

    renderActivitiesList(){
      const { lessonTitle, lessonId } = this.props.route.params; 
      // const userActivities = 

      return this.state.userActivities ? (
        <View style={{flex: 1, justifyContent:'flex-start', padding: 10, width: '100%'}}>
            {
                this.state.userActivities.videoActivityGroup && this.state.userActivities.videoActivityGroup.userGroupId ? 
                (
                    <View 
                        //style={{alignContent: 'flex-end', alignItems: 'flex-start', }}
                        //key={i} 
                        style={styles.activity}>

               
                        <TouchableOpacity style={{padding: 5}} 
                            onPress={() => this.props.navigation.navigate('VideoActivity', { 
                                userGroupId: this.state.userActivities.videoActivityGroup.userGroupId,
                                lessonTitle: lessonTitle,
                                lessonId: lessonId,
                                userToken: this.state.userToken,
                                activities: this.state.activities
                                })}>
                            <View style = {{alignItems: 'center', backgroundColor: '#FCFDFF', 
                                justifyContent: 'space-around', height: 60,
                                flexDirection: 'row'
                                }}>
                            <Text style = {styles.activityText}>Video Activity</Text>
                            <Image 
                                            style={styles.image}
                                            source={require('../../assets/video-24px.png')} 
                                            />
                            </View>
                        </TouchableOpacity>
                    
                   </View>
                ) 
                : <View/>
            }
            {
                this.state.userActivities.phrasesActivityGroup && this.state.userActivities.phrasesActivityGroup.userGroupId ? (
                    <View 
                        //key={i} 
                        style={styles.activity}>

                        <TouchableOpacity
                            style={{padding: 5}}
                            onPress={() => this.props.navigation.navigate('PhrasesActivity', { 
                                userGroupId: this.state.userActivities.phrasesActivityGroup.userGroupId,
                                groupId: this.state.userActivities.phrasesActivityGroup.groupId,
                                lessonTitle: lessonTitle,
                                lessonId: lessonId,
                                userToken: this.state.userToken,
                                activities: this.state.activities
                            })}
                        >
                            <View style = {{alignItems: 'center', backgroundColor: '#FCFDFF', 
                                justifyContent: 'space-around', height: 60,
                                flexDirection: 'row'
                                }}>
                            <Text style = {styles.activityText}>Phrases Activity</Text>
                            <Image 
                                            style={styles.image}
                                            source={require('../../assets/headset-24px.png')} 
                                            />
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : <View/>
            }
            {
                this.state.userActivities.wordActivityGroup && this.state.userActivities.wordActivityGroup.userGroupId ? ( 
                    <View 
                        //key={i} 
                        style={styles.activity}>

                        <TouchableOpacity style={{padding: 5}} 
                            onPress={() => this.props.navigation.navigate('WordsActivity', { 
                                userGroupId: this.state.userActivities.wordActivityGroup.userGroupId,
                                lessonTitle: lessonTitle,
                                lessonId: lessonId,
                                userToken: this.state.userToken,
                                activities: this.state.activities
                            })}>
                            <View style = {{alignItems: 'center', backgroundColor: '#FCFDFF', 
                                justifyContent: 'space-around', height: 60,
                                flexDirection: 'row'
                                }}>
                            <Text style = {styles.activityText}>Words Activity</Text>
                            <Image 
                                            style={styles.image}
                                            source={require('../../assets/photo-24px.png')} 
                                            />
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : <View/>
            }
            {
                this.state.userActivities.multichoiceActivityGroup && this.state.userActivities.multichoiceActivityGroup.userGroupId ? ( 
                    <View 
                        //key={i} 
                        style={styles.activity}>

                        <TouchableOpacity style={{padding: 5}} 
                            onPress={() => this.props.navigation.navigate('MultichoiceActivity', { 
                                userGroupId: this.state.userActivities.multichoiceActivityGroup.userGroupId,
                                lessonTitle: lessonTitle,
                                lessonId: lessonId,
                                userToken: this.state.userToken,
                                activities: this.state.activities
                                })}>
                            <View style = {{alignItems: 'center', backgroundColor: '#FCFDFF', 
                                justifyContent: 'space-around', height: 60,
                                flexDirection: 'row'
                                }}>
                            <Text style = {styles.activityText}>Multichoice Activity</Text>
                            <Image 
                                            style={styles.image}
                                            source={require('../../assets/format_list_bulleted-24px.png')} 
                                            />
                            </View>
                        </TouchableOpacity>
                    </View>
               ) : <View/>
            }
            {
                this.state.userActivities.dragAndDropActivityGroup && this.state.userActivities.dragAndDropActivityGroup.userGroupId ? (
                    <View style={styles.activity}>
                        <TouchableOpacity style={{padding: 5}} 
                            onPress={() => this.props.navigation.navigate('DragAndDropActivity', { 
                                userGroupId: this.state.userActivities.dragAndDropActivityGroup.userGroupId,
                                lessonTitle: lessonTitle,
                                lessonId: lessonId,
                                userToken: this.state.userToken,
                                activities: this.state.activities
                             })}>
                            <View style={{alignItems: 'center', backgroundColor: '#FCFDFF', 
                                justifyContent: 'space-around', height: 60,
                                flexDirection: 'row'
                            }}>
                                <Text style={styles.activityText}>Drag And Drop Activity</Text>
                                <Image 
                                    style={styles.image}
                                    source={require('../../assets/extension-24px.png')} 
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
               ) : <View/>
            }
        </View>
      ) : <View/>
    }
  
    render() {
        const { lessonTitle } = this.props.route.params; 
        return (
            <View style={{flex: 1, justifyContent:'flex-start', width: '100%', backgroundColor: '#FCFDFF'}}>
                <View style={{flex: 1, justifyContent:'flex-start', width: '100%', backgroundColor: '#FCFDFF'}}>
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
    activityText: {
        marginLeft: 50, 
        color: '#233665', 
        alignContent: 'center', 
        display: 'flex', 
        padding: 10, 
        fontWeight: 'bold', 
        marginRight: 10
    },
    image: {
        height: 24,
        width: 24,
        marginRight: 10
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
        alignContent: 'center',
        // alignContent: 'flex-end', 
        alignItems: 'flex-end'
    }
  });