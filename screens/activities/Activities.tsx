import React from 'react';
import { Text, View, TouchableOpacity, StatusBar, Image, StyleSheet } from 'react-native';
import ActivityGroup from '../../types/activities/ActivityGroup';
import UserActivitiesProvider from '../../providers/activities/UserActivitiesProvider';
import NavigationActivity from '../../Components/navigation/NavigationActivity';

interface State {
  selectedIndex: Number,
  groups: ActivityGroup[],
  userToken: string,
  activities: Map<string, NavigationActivity>,
  firstActivity: NavigationActivity
}

export default class Activities extends React.Component<State> {
    numberNames;

    state: Readonly<State> = {
        selectedIndex: -1,
        groups: null,
        userToken: null,
        activities: null,
        firstActivity: null
    }

    constructor (props) {
        super(props);
        this.numberNames = this.numbers();
    }

    numbers = () => {
        const numbers = new Array;
        
        //1
        numbers.push('النشاط الأول'); 
        //2
        numbers.push('النشاط الثاني');
        //3
        numbers.push('النشاط الثالث');
        //4
        numbers.push('النشاط الرابع');
        //5
        numbers.push('النشاط الخامس');
        //6
        numbers.push('النشاط السادس');
        //7
        numbers.push('النشاط السابع');
        //8
        numbers.push('النشاط الثامن');
        //9
        numbers.push('النشاط التاسع');
        //10
        numbers.push('النشاط العاشر');
        //11
        numbers.push('النشاط الحادي عشر');
        //12
        numbers.push('النشاط الثاني عشر');
        //13
        numbers.push('النشاط الثالث عشر');
        //14
        numbers.push('النشاط الرابع عشر');
        //15
        numbers.push('النشاط الخامس عشر');
        //16
        numbers.push('النشاط السادس عشر');
        //17
        numbers.push('النشاط السابع عشر');
        //18
        numbers.push('النشاط الثامن عشر');
        //19
        numbers.push('النشاط التاسع عشر');
        //21
        numbers.push('النشاط العشرون');
        return numbers;
    }

    componentDidMount() {
        const { lessonTitle, lessonId, userToken, unitId, unitTitle } = this.props.route.params;
        this.setState({userToken: userToken, unitTitle: unitTitle});
        UserActivitiesProvider(lessonId, (json) => {
            // let userActivities : UserActivities = json;
            let groups : ActivityGroup[] = json;
            this.setState({groups : groups});
            this.createActivitiesMap(lessonId, lessonTitle, userToken, groups, unitId, unitTitle);
        });
    }

    createActivityNavigation(lessonId: number, lessonTitle: string, userToken: string,
        nextActivity: NavigationActivity, unitId: number, unitTitle: string, userGroupId: number,
        navigationScreen: string, iconUrl: string, type: string) : NavigationActivity {

        const navigationActivity = new NavigationActivity();
        navigationActivity.lessonId = lessonId;
        navigationActivity.lessonTitle = lessonTitle;
        navigationActivity.userGroupId = userGroupId;
        navigationActivity.userToken = userToken;
        navigationActivity.navigationScreen = navigationScreen;
        navigationActivity.nextActivity = nextActivity;
        navigationActivity.unitId = unitId;
        navigationActivity.unitTitle = unitTitle;
        navigationActivity.iconUrl = iconUrl;
        navigationActivity.type = type;
        return navigationActivity;
    }

    createActivitiesMap = (lessonId: number, lessonTitle: string, userToken: string, groups : ActivityGroup[], unitId: number, unitTitle: string) => {
        const activities = new Map<string, NavigationActivity>()

        let nextActivity = new NavigationActivity();
        nextActivity.lessonId = lessonId;
        nextActivity.lessonTitle = lessonTitle;
        //nextActivity.userGroupId = userActivities.dragAndDropActivityGroup.userGroupId;
        nextActivity.userToken = userToken;
        nextActivity.navigationScreen = 'Lessons';
        nextActivity.nextActivity = nextActivity;
        nextActivity.unitId = unitId;
        nextActivity.unitTitle = unitTitle;
        nextActivity.type = 'lessons';
        activities.set('lessons', nextActivity);

        groups.forEach((activityGroup) => {
            if (activityGroup.type === 'orderWordsActivityGroup') {
                const navigationActivity = this.createActivityNavigation(
                    lessonId, 
                    lessonTitle,
                    userToken,
                    nextActivity,
                    unitId,
                    unitTitle,
                    activityGroup.groupId,
                    'OrderWordsActivity',
                    require('../../assets/touch_app_24_px.png'),
                    'orderwords'
                )

                activities.set('orderwords', navigationActivity);
                nextActivity = navigationActivity;
            }

            if (activityGroup.type === 'dragAndDropActivityGroup') {
                const navigationActivity = this.createActivityNavigation(
                    lessonId, 
                    lessonTitle,
                    userToken,
                    nextActivity,
                    unitId,
                    unitTitle,
                    activityGroup.groupId,
                    'DragAndDropActivity',
                    require('../../assets/extension-24px.png'),
                    'dragndrop'
                )

                activities.set('dragndrop', navigationActivity);
                nextActivity = navigationActivity;
            }

            if (activityGroup.type === 'multichoiceActivityGroup') {
                const navigationActivity = this.createActivityNavigation(
                    lessonId, 
                    lessonTitle,
                    userToken,
                    nextActivity,
                    unitId,
                    unitTitle,
                    activityGroup.groupId,
                    'MultichoiceActivity',
                    require('../../assets/format_list_bulleted-24px.png'),
                    'multichoice'
                )

                activities.set('multichoice', navigationActivity);
                nextActivity = navigationActivity;
            }

            if (activityGroup.type === 'wordActivityGroup') {
                const navigationActivity = this.createActivityNavigation(
                    lessonId, 
                    lessonTitle,
                    userToken,
                    nextActivity,
                    unitId,
                    unitTitle,
                    activityGroup.groupId,
                    'WordsActivity',
                    require('../../assets/photo-24px.png'),
                    'words'
                )

                activities.set('words', navigationActivity);
                nextActivity = navigationActivity;
            }

            if (activityGroup.type === 'phrasesActivityGroup') {
                const navigationActivity = this.createActivityNavigation(
                    lessonId, 
                    lessonTitle,
                    userToken,
                    nextActivity,
                    unitId,
                    unitTitle,
                    activityGroup.groupId,
                    'PhrasesActivity',
                    require('../../assets/headset-24px.png'),
                    'phrases'
                )

                activities.set('phrases', navigationActivity);
                nextActivity = navigationActivity;
            }

            if (activityGroup.type === 'videoActivityGroup') {
                const navigationActivity = this.createActivityNavigation(
                    lessonId, 
                    lessonTitle,
                    userToken,
                    nextActivity,
                    unitId,
                    unitTitle,
                    activityGroup.groupId,
                    'VideoActivity',
                    require('../../assets/video-24px.png'),
                    'video'
                )

                activities.set('video', navigationActivity);
                nextActivity = navigationActivity;
            }
        });

        this.setState({firstActivity : nextActivity});

        this.setState({activities: activities});
    }

    prerenderActivities() {
        const { lessonTitle, lessonId } = this.props.route.params;
        let lessonNumber = -1; 
        return this.state.groups.map((activityGroup, i) => {
            var activityTitle, iconUrl, navigationScreen: string;
            lessonNumber++;
            if (activityGroup.type === 'videoActivityGroup') {
                activityTitle = this.numberNames[lessonNumber] + ' : ' + 'فيديو';
                iconUrl = require('../../assets/video-24px.png');
                navigationScreen = 'VideoActivity';
            }
            if (activityGroup.type === 'phrasesActivityGroup') {
                activityTitle = this.numberNames[lessonNumber] + ' : ' + 'إستماع';
                iconUrl = require('../../assets/headset-24px.png');     
                navigationScreen = 'PhrasesActivity';
            }
            if (activityGroup.type === 'wordActivityGroup') {
                activityTitle = this.numberNames[lessonNumber] + ' : ' + 'التعرف على الصور';
                iconUrl = require('../../assets/photo-24px.png');     
                navigationScreen = 'WordsActivity';
            }
            if (activityGroup.type === 'multichoiceActivityGroup') {
                activityTitle = this.numberNames[lessonNumber] + ' : ' + 'إختيار ما بين متعدد';
                iconUrl = require('../../assets/format_list_bulleted-24px.png');     
                navigationScreen = 'MultichoiceActivity';
            }
            if (activityGroup.type === 'dragAndDropActivityGroup') {
                activityTitle = this.numberNames[lessonNumber] + ' : ' + 'مطابقة الصور';
                iconUrl = require('../../assets/extension-24px.png');     
                navigationScreen = 'DragAndDropActivity';
            }
            if (activityGroup.type === 'orderWordsActivityGroup') {
                activityTitle = this.numberNames[lessonNumber] + ' : ' + 'لجعل الجملة';
                iconUrl = require('../../assets/touch_app_24_px.png');     
                navigationScreen = 'OrderWordsActivity';
            }
        
            return this.renderActivity(this.props.navigation, 
                navigationScreen, 
                activityGroup.userGroupId, 
                lessonTitle,
                lessonId,
                activityTitle, 
                iconUrl);          
        })
    }

    renderActivitiesList(){
      let userActivities;
      if (this.state.activities) {
        userActivities = this.prerenderActivities();
      }
      return this.state.activities ? (
        <View style={{flex: 1, justifyContent:'flex-start', padding: 20, width: '100%', marginTop: 40}}>
            {userActivities}
        </View>
      ) : <View/>
    }

    renderActivity(navigation, screenName: string, userGroupId: number, 
        lessonTitle: string, lessonId: number, activityTitle: string, urlToIcon: any) {
        return (
            <View style={styles.activity}>
                <TouchableOpacity style={{padding: 5}} 
                    onPress={() => navigation.navigate(screenName, { 
                        userGroupId: userGroupId,
                        lessonTitle: lessonTitle,
                        lessonId: lessonId,
                        userToken: this.state.userToken,
                        activities: this.state.activities
                        })}>
                    <View style={{alignItems: 'center', backgroundColor: '#FCFDFF', 
                        justifyContent: 'space-around', height: 60,
                        flexDirection: 'row'
                    }}>
                        <Text style={styles.activityText}>{activityTitle}</Text>
                        <Image 
                            style={styles.image}
                            // source={require('../../assets/photo-24px.png')}
                            source={urlToIcon} 
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
  
    backToLessons(userToken: string, unitTitle: string, unitId: number) {        
        this.props.navigation.push('Lessons', { 
            userToken: userToken,
            unitTitle: unitTitle,
            unitId: unitId,
            activities: this.state.activities
        });
    };

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
                                onPress={() => this.backToLessons(
                                    this.state.userToken,
                                    this.props.route.params.unitTitle,
                                    this.props.route.params.unitId
                                )}>
                                <Image 
                                    style={styles.backImage}
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
        // marginLeft: 50, 
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
    backImage: {
        height: 24,
        width: 15,
    },
    forwardImage: {
        height: 24,
        width: 14,
        position: 'absolute',
        left: 10
    },
    backImage: {
        height: 24,
        width: 15,
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
        alignItems: 'center',
        justifyContent: 'center'
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