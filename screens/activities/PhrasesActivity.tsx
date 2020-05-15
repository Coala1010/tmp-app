import React from 'react';
import { View, Platform, StyleSheet, StatusBar } from 'react-native';
import ActivityGroupsProgress from '../../Components/navigation/ActivityGroupsProgress';
import ActivityFooter from '../../Components/ActivityFooter/ActivityFooter';
import ActivityHeader from '../../Components/ActivityHeader/ActivityHeader';
import PhrasesActivityCarousel from '../../Components/PhrasesActivity/PhrasesActivityCarousel';
import PhrasesAudioControls from '../../Components/PhrasesActivity/AudioControls';
import { getPhrases, uploadUserPhraseAudio } from '../../providers/activities/PhrasesActivity';
import environment from '../../development.json';

export default function PhrasesActivity({ navigation, route }) {
    const [answers, setAnswers] = React.useState({});
    const [activityData, setActivityData] = React.useState(null);
    const { activities, lessonTitle } = route.params;
    const nextActivity = activities.get('phrases').nextActivity;

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
    const uploadData = async (data) => {
        setAnswers({
            ...answers,
            [activeQuestion]: data.recordedFileUrl,
        });

        try {
            const uriParts = data.recordedFileUrl.split('.');
            const fileType = uriParts[uriParts.length - 1];
            const formData = new FormData();

            formData.append('userAudio', {
                uri: Platform.OS === 'android' ? data.recordedFileUrl : data.recordedFileUrl.replace('file://', ''),
                name: `recording.${fileType}`,
                type: `audio/x-${fileType}`,
            });
            formData.append('id', activityData[activeQuestion].id);
            // TODO: replace a token:
            formData.append('token', route.params.userToken);
            await uploadUserPhraseAudio(formData);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={{flex: 1, width: '100%', backgroundColor: '#FCFDFF'}}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="white"
                translucent/>
            <View style={{ flex: 1 }}>
                <View style={{flex: 1, width: '100%', backgroundColor: '#FCFDFF'}}>
                    <View style={{flex: 1, width: '100%', backgroundColor: '#FCFDFF', justifyContent: 'center'}}>
                        <ActivityHeader navigation={navigation} currentActivityName='phrases' route={route}/>
                        <ActivityGroupsProgress navigation={navigation} chosenActivity='phrases' activities={route.params.activities}/>
                        {activityData &&  (
                            <>
                                <PhrasesActivityCarousel activityData={activityData} onChange={setActiveQuestion} />
                                <PhrasesAudioControls
                                    navigation={navigation}
                                    onUserAnswer={uploadData}
                                    sampleUrl={activityData[activeQuestion].audioUrl}
                                    userAudioRecordUrl={activityData[activeQuestion].userAudioRecordUrl}
                                    id={activityData[activeQuestion].id}
                                />
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
