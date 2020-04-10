import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';
import { Audio } from 'expo-av';
import { Sound, Recording } from 'expo-av/build/Audio';
import ActivityGroupsProgress from '../../Components/navigation/ActivityGroupsProgress';
import ActivityFooter from '../../Components/ActivityFooter/ActivityFooter';
import PhrasesActivityCarousel from '../../Components/PhrasesActivity/PhrasesActivityCarousel';
import PhrasesAudioControls from '../../Components/PhrasesActivity/AudioControls';

export default function PhrasesActivity({ videoUrl, lessonTitle, videoTitle, navigation }) {
    const [answers, setAnswers] = React.useState({});
    const activityData = [{
        id: 1,
        question: 'عمر الذهاب إلى المدرسة.اليوم هو يوم الإثنين، يجب على',
    }, {
        id: 2,
        question: 'عمر الذهاب إلى المدرسة.اليوم هو يوم الإثنين، يجب على وتتكلمها بطلاقة ',
    }];

    const [activeQuestion, setActiveQuestion] = React.useState(0);
    const uploadData = (data) => {
        setAnswers({
            ...answers,
            [activeQuestion]: data.recordedFileUrl,
        });
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
                    <PhrasesActivityCarousel activityData={activityData} onChange={setActiveQuestion} />
                    <PhrasesAudioControls recordUrl={answers[activeQuestion]} onUserAnswer={uploadData} />
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


const styles = StyleSheet.create({
    audioPlayImage: {
        height: 26,
        resizeMode: 'contain'
    },
    closeAudioPlayImage: {
        height: 24,
        width: 24, 
        resizeMode: 'contain'
    },
    audioPlayButtonTO: {
        width: 70, 
        height: 70, 
        borderColor: '#F7F9FC', 
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    audioPlayButton: {
        width: 70,
        height: 70, 
        marginTop: 30, 
        justifyContent: 'space-around',
        color: '#233665', 
        backgroundColor: '#F7F9FC',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 0,
        shadowColor: 'lightgray',
        shadowOpacity: 0.6,
        borderRadius: 45,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center'
    },
    closeAudioRecordingImage: {
        height: 24,
        width: 24, 
        resizeMode: 'contain'
    },
    audioRecordingButtonTO: {
        width: 70, 
        height: 70, 
        borderColor: '#F7F9FC', 
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    audioRecordingButton: {
        width: 70,
        height: 70, 
        marginTop: 30, 
        justifyContent: 'space-around',
        color: '#233665', 
        backgroundColor: '#F7F9FC',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 0,
        shadowColor: 'lightgray',
        shadowOpacity: 0.6,
        borderRadius: 45,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
    },
    audioRecordingImage: {
        height: 26,
        // width: 19,
        resizeMode: 'contain'
    },
    closeAudioImage: {
        height: 24,
        width: 24, 
        resizeMode: 'contain'
    },
    audioButtonTO: {
        width: 70, 
        height: 70, 
        borderColor: '#F7F9FC', 
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1
    },
    audioButton: {
        width: 70,
        height: 70, 
        marginTop: 30, 
        justifyContent: 'flex-start',
        backgroundColor: '#233665',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 0,
        shadowColor: 'lightgray',
        shadowOpacity: 0.6,
        borderRadius: 45,
        marginLeft: 20,
        marginRight: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },
    audioImage: {
        height: 20,
        width: 22,
        resizeMode: 'contain'
    },
    image: {
        height: 24,
        width: 24,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    forwardImage: {
        height: 24,
        width: 14,
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
        alignItems: 'center',
    },
    backButtonTO: {
        width: 60, 
        height: 30, 
        borderColor: '#F7F9FC', 
        overflow: 'hidden',
        alignItems: 'center',
    },
    backButton: {
        width: 60, 
        marginTop: 10, 
        justifyContent: 'space-around',
        backgroundColor: '#FCFDFF',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 0,
        shadowColor: 'lightgray',
        shadowOpacity: 0.6,
        borderRadius: 15,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
    },
    forwardButton: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 10, 
        justifyContent: 'space-around',
        backgroundColor: '#FCFDFF',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 0,
        shadowColor: 'lightgray',
        shadowOpacity: 0.6,
        borderRadius: 15,
        width: '70%'
    },
    forwardButtonInner: {
        alignItems: 'center', 
        backgroundColor: '#FCFDFF', 
        justifyContent: 'space-around', 
        height: 60,
        flexDirection: 'row'
    }
});
