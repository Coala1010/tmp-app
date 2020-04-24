import React from 'react';
import { Text, View, TouchableOpacity, StatusBar, Image, StyleSheet } from 'react-native';
import UserActivities from '../../types/activities/UserActivities';
import UserActivitiesProvider from '../../providers/activities/UserActivitiesProvider';
import NavigationActivity from '../../Components/navigation/NavigationActivity';

interface State {
  selectedIndex: Number,
  userActivities: UserActivities,
  userToken: string,
  activities: Map<string, NavigationActivity>,
  firstActivity: NavigationActivity
}

export default class Activities extends React.Component<State> {
    state: Readonly<State> = {
        selectedIndex: -1,
        userActivities: null,
        userToken: null,
        activities: null,
        firstActivity: null
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
            phrasesNavigation.userGroupId = userActivities.videoActivityGroup.userGroupId;
            phrasesNavigation.userToken = userToken;
            phrasesNavigation.navigationScreen = 'VideoActivity';
            phrasesNavigation.nextActivity = nextActivity;
            phrasesNavigation.unitId = unitId;
            phrasesNavigation.unitTitle = unitTitle;
            activities.set('video', phrasesNavigation);
            nextActivity = phrasesNavigation;
        }

        this.setState({firstActivity : nextActivity});

        this.setState({activities: activities});
    }

    renderActivitiesList(){
      const { lessonTitle, lessonId } = this.props.route.params; 
      // const userActivities = 

      return this.state.userActivities ? (
        <View style={{flex: 1, justifyContent:'flex-start', padding: 20, width: '100%', marginTop: 40}}>
            {
                this.state.userActivities.videoActivityGroup && this.state.userActivities.videoActivityGroup.userGroupId ? 
                (
                    <View style={styles.activity}>

                        <TouchableOpacity style={{padding: 5}} 
                            onPress={() => this.props.navigation.navigate('VideoActivity', { 
                                userGroupId: this.state.userActivities.videoActivityGroup.userGroupId,
                                lessonTitle: lessonTitle,
                                lessonId: lessonId,
                                userToken: this.state.userToken,
                                activities: this.state.activities,
                                unitId: this.props.route.params.unitId 
                                })}>
                            <View style = {{alignItems: 'center', backgroundColor: '#FCFDFF', 
                                justifyContent: 'space-around', height: 60,
                                flexDirection: 'row'
                                }}>
                            <Text style = {styles.activityText}>النشاط الأول : فيديو</Text>
                            {/* Video Activity */}
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
                            <Text style = {styles.activityText}>النشاط الثاني  : إستماع</Text>
                            {/* Phrases Activity */}
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
                            <Text style = {styles.activityText}>النشاط الثالث : التعرف على الصور</Text>
                            {/* Words Activity */}
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
                            <Text style = {styles.activityText}>النشاط الثالث : إختيار ما بين متعدد</Text>
                            {/* Multichoice Activity */}
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
                                <Text style={styles.activityText}>النشاط الرابع : مطابقة الصور</Text>
                                {/* Drag And Drop Activity */}
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
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#233665"
                    translucent/>
                <View style={{flex: 1, justifyContent:'center', width: '100%', backgroundColor: '#FCFDFF'}}>
                    <View style={{backgroundColor: '#233665',
                                borderStyle: 'solid', 
                                borderColor: '#F7F9F7', height: 80,
                                justifyContent: 'space-around',
                                flexDirection: 'row', overflow: 'hidden'}}>
                        
                    </View>
                    <View style={{marginTop: 60, 
                                    backgroundColor: '#FCFDFF',
                                    borderWidth: 0,
                                    shadowOpacity: 0.6,
                                    borderRadius: 16,
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowRadius: 2.22,
                                    shadowColor: 'lightgray',
                                    height: 88,                         
                                    position: 'absolute', 
                                    justifyContent: 'center',
                                    top: -20,
                                    left: '5%',
                                    zIndex: 1,
                                    width: '90%',
                                    flexDirection: 'row',
                                    elevation: 6,
                                }}>
                            <View style={{alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={styles.screenTitle}>
                                    {lessonTitle}
                                </Text>
                            </View>                                  
                            <TouchableOpacity 
                                style={styles.backButton}
                                onPress={() => this.props.navigation.goBack()}>
                                <Image 
                                    style={styles.image}
                                    source={require('../../assets/arrow_back-24px.png')} 
                                />
                            </TouchableOpacity>
                        </View>
                    {this.renderActivitiesList()}
                </View>
                {
                    this.state.firstActivity ? <View style={{flexDirection: 'row', marginBottom: 16, justifyContent: 'center'}}>
                        <View style={styles.forwardButton}>
                            <TouchableOpacity style={{padding: 5}} 
                                onPress={() => this.props.navigation.navigate(this.state.firstActivity.navigationScreen, 
                                    { 
                                        userGroupId: this.state.firstActivity.userGroupId,
                                        lessonTitle: this.state.firstActivity.lessonTitle,
                                        lessonId: this.state.firstActivity.lessonId,
                                        userToken: this.state.userToken,
                                        activities: this.state.activities,
                                        unitId: this.props.route.params.unitId 
                                    }
                                    )}>
                                <View style = {styles.forwardButtonInner}>
                                    <Image 
                                        style={styles.forwardImage}
                                        source={require('../../assets/keyboard_arrow_left-24px.png')} 
                                    />
                                    <Text style = {styles.forwardButtonText}>التــالي</Text>
                                                {/* Forward */}
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={styles.backButton}>
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
                        </View> */}
                    </View> : <View/>
                }
          </View>
      );
    } 
  }


  const styles = StyleSheet.create({
    forwardButtonText: { 
        color: '#233665', 
        alignContent: 'center', 
        display: 'flex', 
        padding: 10, 
        fontSize: 20, 
        fontFamily: 'NeoSansArabicBold'
    },
    screenTitle: {
        textAlign: 'center', 
        color: '#233665', 
        width: '100%', 
        fontSize: 20,
        fontFamily: 'NeoSansArabicBold'
    },
    activityText: {
        marginLeft: 50, 
        color: '#233665', 
        alignContent: 'center', 
        display: 'flex', 
        padding: 10, 
        // fontWeight: 'bold', 
        marginRight: 10,
        fontSize: 16,
        fontFamily: 'NeoSansArabic'
    },
    image: {
        height: 24,
        width: 24,
        marginRight: 11
    },
    forwardImage: {
        height: 24,
        width: 14,
        position: 'absolute',
        left: 10
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
    },
    backButtonTO: {
        width: 60, 
        height: 30, 
        borderColor: '#F7F9FC', 
        overflow: 'hidden',
        alignItems: 'center',
    },
    // backButton: {
    //     width: 60, 
    //     marginTop: 10, 
    //     justifyContent: 'space-around',
    //     backgroundColor: '#FCFDFF',
    //     borderColor: 'black',
    //     borderStyle: 'solid',
    //     borderWidth: 0,
    //     shadowColor: 'lightgray',
    //     shadowOpacity: 0.6,
    //     borderRadius: 15,
    //     marginLeft: 10,
    //     marginRight: 10,
    //     alignItems: 'center',
    // },
    backButton: {
        color: '#233665', 
        width: 30, 
        height: 30, 
        backgroundColor: '#F7F9FC',
        fontWeight: 'bold', 
        borderStyle: 'solid', 
        borderRadius: 5, 
        borderWidth: 1,
        borderColor: '#F7F9FC', 
        position: 'absolute',
        right: '5%',
        top: 30, 
      },
    forwardButton: {
        marginTop: 10,
        justifyContent: 'space-around',
        backgroundColor: '#FCFDFF',
        borderWidth: 0,
        shadowOpacity: 0.6,
        borderRadius: 16,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        // shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 1,
        width: '90%',
        shadowColor: 'lightgray',
    },
    forwardButtonInner: {
        alignItems: 'center', 
        backgroundColor: '#FCFDFF', 
        justifyContent: 'space-around', 
        height: 60,
        flexDirection: 'row'
    },
    activity: {
        marginTop: 8,
        marginBottom: 8, 
        justifyContent: 'space-around',
        backgroundColor: '#FCFDFF',
        borderWidth: 0,
        alignContent: 'center',
        alignItems: 'flex-end',
        shadowColor: 'lightgray',
        shadowOpacity: 0.6,
        borderRadius: 16,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 2.22,
        elevation: 6,
    }
  });