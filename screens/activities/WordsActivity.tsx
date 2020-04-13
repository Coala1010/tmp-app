import React from 'react';
import { Text, View, Platform } from 'react-native';
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
                </View>
                <ActivityGroupsProgress navigation={navigation} chosenActivity='phrases'/>
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
                toNext="WordsActivity"
                toNextPayload={{}}
                navigation={navigation}
            />
        </View>
    );
}
