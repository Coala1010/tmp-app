import React from 'react';
import { View, Platform, StyleSheet, StatusBar } from 'react-native';
import ActivityGroupsProgress from '../../Components/navigation/ActivityGroupsProgress';
import ActivityFooter from '../../Components/ActivityFooter/ActivityFooter';
import ActivityHeader from '../../Components/ActivityHeader/ActivityHeader';
import PhrasesActivityCarousel from '../../Components/PhrasesActivity/PhrasesActivityCarousel';
import { getPhrases, uploadUserPhraseAudio } from '../../providers/activities/PhrasesActivity';
import environment from '../../development.json';

export default function OrderWordsActivity({ navigation, route }) {
    const [answers, setAnswers] = React.useState({});
    const [activityData, setActivityData] = React.useState(null);
    const { activities, lessonTitle } = route.params;
    const nextActivity = activities.get('orderwords').nextActivity;

    React.useEffect(() => {
        getPhrases(route.params.userGroupId).then((res) => {
            setActivityData(
                res.map(answer => {
                    return ({
                        ...answer,
                        userAudioRecordUrl: answer.userAudioRecordUrl && route.params.userToken
                            ? `${environment.API_URL}/api/v1/app/phrases/progress/${answer.phrasesActivityId}/user/${route.params.userToken}/`
                            : null,
                        audioUrl: answer.audioUrl
                            ? `${environment.API_URL}/api/v1/admin/phrases/${answer.phrasesActivityId}/audio/${answer.audioUrl}/`
                            : null,
                    });
                }),
            );
        });
    }, []);

    const [activeQuestion, setActiveQuestion] = React.useState(0);

    return (
        <View style={{flex: 1, width: '100%', backgroundColor: '#FCFDFF'}}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="white"
                translucent/>
            <View style={{ flex: 1 }}>
                <View style={{flex: 1, width: '100%', backgroundColor: '#FCFDFF'}}>
                    <ActivityHeader navigation={navigation} currentActivityName='orderwords' route={route}/>
                    <ActivityGroupsProgress navigation={navigation} chosenActivity='orderwords' activities={route.params.activities}/>
                    <View style={{flex: 1, width: '100%', backgroundColor: '#FCFDFF', justifyContent: 'center'}}>
                        {activityData &&  (
                            <>
                                <PhrasesActivityCarousel activityData={activityData} onChange={setActiveQuestion} />
                            </>
                        )}
                    </View>
                    <ActivityFooter
                        navigation={navigation}
                        toNext={nextActivity.navigationScreen}
                        toNextPayload={{ 
                            userGroupId: nextActivity.userGroupId,
                            lessonTitle: nextActivity.lessonTitle,
                            lessonId: nextActivity.lessonId,
                            userToken: nextActivity.userToken,
                            unitTitle: nextActivity.unitTitle,
                            unitId: nextActivity.unitId,
                            activities: activities
                        }}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
      height: 24,
      width: 24,
      //resizeMode: 'contain', 
    },
  });
