import React from 'react';
import { Text, View } from 'react-native';
import ActivityGroupsProgress from '../../Components/navigation/ActivityGroupsProgress';
import ActivityFooter from '../../Components/ActivityFooter/ActivityFooter';
import { getWordsActivity, uploadWordsActivityRecord } from '../../providers/activities/WordsActivity';
import PhrasesAudioControls from '../../Components/PhrasesActivity/AudioControls';
import WordsActivityCarousel from '../../Components/WordsActivity/WordsActivityCarousel';

export default function WordsActivity({ navigation, lessonTitle, route }) {
    const [answers, setAnswers] = React.useState({});
    const [activityData, setActivityData] = React.useState(null);
    const [activeQuestion, setActiveQuestion] = React.useState(0);

    React.useEffect(() => {
        getWordsActivity(route.params.userGroupId).then((res) => {
            setActivityData([{
                id: 1,
                audioUrl: 'https://ccrma.stanford.edu/~jos/mp3/gtr-nylon22.mp3',
                imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
                title: 'الأسرة'
            }, {
                id: 2,
                audioUrl: 'https://ccrma.stanford.edu/~jos/mp3/gtr-nylon22.mp3',
                imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
                title: 'الأسرة22',
            }, {
                id: 3,
                audioUrl: 'https://ccrma.stanford.edu/~jos/mp3/gtr-nylon22.mp3',
                imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80',
                title: 'الأسرة22',
            }]);
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
            // TODO: replace a token:
            formData.append('token', '1');
            await uploadWordsActivityRecord(formData);
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
                            recordUrl={answers[activeQuestion]}
                            onUserAnswer={uploadData}
                            sampleUrl={activityData[activeQuestion].audioUrl}
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
