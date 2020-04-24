import React from 'react';
import { Text, View, Platform, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import ActivityGroupsProgress from '../../Components/navigation/ActivityGroupsProgress';
import ActivityFooter from '../../Components/ActivityFooter/ActivityFooter';
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
        <View style={{flex: 1, width: '100%', backgroundColor: '#FCFDFF'}}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="white"
                translucent/>
            <View style={{ flex: 1 }}>
                <View style={{flex: 1, width: '100%', backgroundColor: '#FCFDFF'}}>
                    <View style={{flex: 1, width: '100%', backgroundColor: '#FCFDFF', justifyContent: 'center'}}>
                        <View style={{
                            backgroundColor: '#FCFDFF',
                            shadowColor: 'lightgray',
                            shadowOpacity: 0.6,
                            elevation: 3,
                            height: 80,
                            justifyContent: 'center',
                            flexDirection: 'row'
                        }}>
                            <Text style={{textAlign: 'center', marginTop: 34, color: '#233665', width: '100%', fontSize: 20, fontFamily: 'NeoSansArabicBold'}}>
                                {lessonTitle}
                            </Text>
                            <TouchableOpacity 
                                style={styles.backButton}
                                //onPress={() => navigation.goBack()}
                                onPress={() => backToLessons()}
                                >
                                <Image 
                                    style={styles.image}
                                    source={require('../../assets/arrow_back-24px.png')} 
                                />
                            </TouchableOpacity>
                        </View>
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
    backButton: {
      position: 'absolute',
      top: 34,
      right: 23, 
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
      alignItems: 'center'
    }
  });
