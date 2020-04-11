import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import ActivityGroupsProgress from '../../Components/navigation/ActivityGroupsProgress';
import ActivityFooter from '../../Components/ActivityFooter/ActivityFooter';
import PhrasesActivityCarousel from '../../Components/PhrasesActivity/PhrasesActivityCarousel';
import PhrasesAudioControls from '../../Components/PhrasesActivity/AudioControls';
import { getPhrases, uploadUserPhraseAudio } from '../../providers/activities/PhrasesActivity';

export default function PhrasesActivity({ lessonTitle, navigation, route, userToken }) {
    const [answers, setAnswers] = React.useState({});
    const [activityData, setActivityData] = React.useState(null);

    React.useEffect(() => {
        getPhrases(route.params.userGroupId).then((res) => {
            setActivityData(
                res.map(
                    answer => ({
                        ...answer,
                        audioUrl: 'https://ccrma.stanford.edu/~jos/mp3/gtr-nylon22.mp3',
                    }),
                ),
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
            formData.append('token', userToken);
            await uploadUserPhraseAudio(formData);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={{flex: 1, width: '100%', backgroundColor: '#FCFDFF'}}>
            <View style={{ flex: 1 }}>
                <View style={{flex: 1, width: '100%', backgroundColor: '#FCFDFF'}}>
                    <View style={{flex: 1, width: '100%', backgroundColor: '#FCFDFF'}}>
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
                                <PhrasesActivityCarousel activityData={activityData} onChange={setActiveQuestion} />
                                <PhrasesAudioControls
                                    recordUrl={answers[activeQuestion]}
                                    onUserAnswer={uploadData}
                                    sampleUrl={activityData[activeQuestion].audioUrl}
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
            </View>
        </View>
    );
}
