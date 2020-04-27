import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, StatusBar } from 'react-native';
import ActivityGroupsProgress from '../../Components/navigation/ActivityGroupsProgress';
import ActivityFooter from '../../Components/ActivityFooter/ActivityFooter';
import Multichoice from '../../Components/Multichoice/Multichoice';
import HintBtn from '../../Components/Multichoice/HintBtn';
import { getMultichoice } from '../../providers/activities/Multichoice';
import OnSuccessNavigation from '../../Components/navigation/OnSuccessNavigation';

export default function MultichoiceActivityScreen({ navigation, route }) {
    const [activityData, setActivityData] = React.useState(null);
    const [hintText, setHintText] = React.useState(null);

    const { lessonTitle, activities } = route.params;
    const nextActivity = activities.get('multichoice').nextActivity;

    React.useEffect(() => {
        try {
            getMultichoice(route.params.userGroupId).then((res) => {
                setActivityData(res);
            });
        } catch (err) {
            console.log(err);
        }
    }, []);

    const onAllChoicesAnswered = () =>{  
        OnSuccessNavigation(nextActivity, activities, navigation);
    }

    const backToLessons = () =>{        
        navigation.push('Lessons', { 
            userGroupId: nextActivity.userGroupId,
            lessonTitle: nextActivity.lessonTitle,
            lessonId: nextActivity.lessonId,
            userToken: nextActivity.userToken,
            unitTitle: nextActivity.unitTitle,
            unitId: nextActivity.unitId,
            activities: activities
        });
    }

    return (
        <View style={{flex: 1, justifyContent:'flex-start', width: '100%', backgroundColor: '#FCFDFF'}}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="white"
                translucent/>
            <View style={{flex: 1, justifyContent:'flex-start', width: '100%', backgroundColor: '#FCFDFF'}}>
                <View style={{backgroundColor: '#FCFDFF',
                    shadowColor: 'lightgray',
                    shadowOpacity: 0.6,
                    elevation: 3, 
                    height: 80,
                    justifyContent: 'center',
                    flexDirection: 'row'}}
                >
                    <Text style={styles.lessonTitle}>
                        {lessonTitle}
                    </Text>
                    <TouchableOpacity 
                        style={styles.backButton}
                        //onPress={() => navigation.goBack()}
                        onPress={() => backToLessons()}
                        >
                        <Image 
                            style={styles.backImage}
                            source={require('../../assets/arrow_back-24px.png')} 
                        />
                    </TouchableOpacity>
                </View>
                <ActivityGroupsProgress navigation={navigation} chosenActivity='multichoice' activities={activities}/>
                <View style={{ flex: 1, marginTop: 20, height: '100%' }}>
                    {activityData && activityData.length > 0 ? (
                        <Multichoice
                            activityData={activityData}
                            setHintText={setHintText}
                            onSuccess={onAllChoicesAnswered}
                        />
                    ): <View style={{ flex: 1 }} />}
                    <View style={{position: 'absolute', bottom: 0}}>
                        <ActivityFooter
                            navigation={navigation}
                            leftBtn={hintText ? <HintBtn hintText={hintText}/> : ""}
                            toNext={nextActivity.navigationScreen}
                            toNextPayload={{ 
                                userGroupId: nextActivity.userGroupId,
                                lessonTitle: nextActivity.lessonTitle,
                                lessonId: nextActivity.lessonId,
                                userToken: nextActivity.userToken,
                                unitTitle: nextActivity.unitTitle,
                                unitId: nextActivity.unitI,
                                activities: activities
                            }}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    lessonTitle: {
        textAlign: 'center', 
        marginTop: 34, 
        color: '#233665', 
        width: '100%',
        fontFamily: 'NeoSansArabicBold', 
        fontSize: 20
    },
    image: {
      height: 24,
      width: 24, 
    },
    backImage: {
        height: 24,
        width: 15,
    },
    backButton: {
        position: 'absolute',
        top: 34,
        right: 23, 
        color: '#233665', 
        width: 30, 
        height: 30, 
        backgroundColor: '#F7F9FC',
        borderStyle: 'solid', 
        borderRadius: 5, 
        borderWidth: 1,
        borderColor: '#F7F9FC', 
        overflow: 'hidden',
        alignItems: 'center',
        fontFamily: 'NeoSansArabicBold'
    }
  });
