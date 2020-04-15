import React from 'react';
import { Text, View, Platform, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ActivityGroupsProgress from '../../Components/navigation/ActivityGroupsProgress';
import ActivityFooter from '../../Components/ActivityFooter/ActivityFooter';
import { getWordsActivity, uploadWordsActivityRecord } from '../../providers/activities/WordsActivity';
import PhrasesAudioControls from '../../Components/PhrasesActivity/AudioControls';
import WordsActivityCarousel from '../../Components/WordsActivity/WordsActivityCarousel';
import environment from '../../development.json';

export default function WordsActivity({ navigation, lessonTitle, route }) {
    const [answers, setAnswers] = React.useState({});
    const [activityData, setActivityData] = React.useState(null);
    const [activeQuestion, setActiveQuestion] = React.useState(0);

    const { activities } = route.params;
    const nextActivity = activities.get('words').nextActivity;

    React.useEffect(() => {
        getWordsActivity(route.params.userGroupId).then((res) => {
            setActivityData(res.map((item) => ({
                ...item,
                imageUrl: item.imageUrl
                    ? `${environment.API_URL}/api/v1/app/words/${item.wordActivityId}/image/${item.imageUrl}/`
                    : null,
                audioUrl: item.audioUrl
                    ? `${environment.API_URL}/api/v1/app/words/${item.wordActivityId}/audio/${item.audioUrl}/`
                    : null,
                userAudioRecordUrl: item.userAudioRecordUrl && route.params.userToken
                    ? `${environment.API_URL}/api/v1/app/words/progress/${item.userAudioRecordUrl}/user/${route.params.userToken}/`
                    : null,
                title: 'الأسرة',
            })));
        });
    }, []);

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
            formData.append('token', route.params.userToken);
            const res = await uploadWordsActivityRecord(formData);
            console.log(res);
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
    };

    return (
        <View style={{flex: 1, justifyContent:'flex-start', width: '100%', backgroundColor: '#FCFDFF'}}>
            <View style={{flex: 1, justifyContent:'flex-start', width: '100%', backgroundColor: '#FCFDFF'}}>
                <View style={{
                    backgroundColor: '#FCFDFF',
                    borderStyle: 'solid', borderWidth: 3,
                    borderColor: '#F7F9F7', height: 100,
                    justifyContent: 'space-around',
                    flexDirection: 'row'
                }}>
                    <Text style={{textAlign: 'center', marginTop: 50, fontWeight: 'bold', color: '#233665', width: '100%',}}>
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
                <ActivityGroupsProgress navigation={navigation} chosenActivity='words' activities={route.params.activities}/>
                {activityData &&  (
                    <>
                        <WordsActivityCarousel activityData={activityData} onChange={setActiveQuestion} />
                        <PhrasesAudioControls
                            onUserAnswer={uploadData}
                            sampleUrl={activityData[activeQuestion].audioUrl}
                            userAudioRecordUrl={activityData[activeQuestion].userAudioRecordUrl}
                            id={activityData[activeQuestion].id}
                        />
                    </>
                )}
            </View>
            <ActivityFooter
                // toNext="WordsActivity"
                // toNextPayload={{}}
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
    );
}

const styles = StyleSheet.create({
    image: {
      height: 24,
      width: 24,
      //resizeMode: 'contain',  
    },
    backButton: {
      marginTop: 50, 
      color: '#233665', 
      width: 30, 
      height: 30, 
      marginRight: 30,
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
