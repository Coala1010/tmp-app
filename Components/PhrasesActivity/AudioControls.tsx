import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';
import { Audio } from 'expo-av';
import { Sound, Recording } from 'expo-av/build/Audio';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';

interface State {
    selectedIndex: Number,
    audioButtonAnim: Animated.Value,
    audioButtonExpanded: boolean,
    audioProgress: string,
    audio: Sound;
    sampleLoaded: boolean;
    audioRecordingButtonAnim: Animated.Value,
    audioRecordingButtonExpanded: boolean,
    audioPlayButtonAnim: Animated.Value,
    audioPlayButtonExpanded: boolean,
    record: Recording,
    recordProgress: string,
    recordedFileUrl: string,
    userRecord: Sound,
    userRecordProgress: string,
}

type Props = {
    onUserAnswer: Function,
    sampleUrl: string,
}

export default class PhrasesAudioControls extends React.Component<State> {
    state: Readonly<State> = {
        selectedIndex: -1,
        audioButtonAnim: new Animated.Value(70),
        audioButtonExpanded: false,
        audioRecordingButtonAnim: new Animated.Value(70),
        audioRecordingButtonExpanded: false,
        audioProgress: '00:00',
        audio: null,
        sampleLoaded: false,
        audioPlayButtonAnim: new Animated.Value(70),
        audioPlayButtonExpanded: false,
        record: null,
        recordProgress: '00:00',
        recordedFileUrl: null,
        userRecord: null,
        userRecordProgress: null,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.loadAudio();
    }

    componentWillUnmount() {
        this.stopAudioSample('userRecord');
        this.stopAudioSample('audio');
    }

    static getDerivedStateFromProps(props, state) {
        if (!props.recordUrl) {
            return { recordedFileUrl: null };
        }
        if (props.recordUrl !== state.recordedFileUrl) {
            return { recordedFileUrl: props.recordUrl };
        }
        return null;
    }

    onAutoPlaybackStatusUpdate = (name: string, status: any) => {
        if (status.positionMillis) {
            let progress = this.millisecondsToTime(status.positionMillis);
            this.setState({ [`${name}Progress`]: progress });
        }
    } 

    millisecondsToTime = (milli) => {
        const seconds = Math.floor((milli / 1000) % 60);
        const minutes = Math.floor((milli / (60 * 1000)) % 60);
        const secondsString = ('0' + seconds).slice(-2);
        const minutesString = ('0' + minutes).slice(-2);
        return minutesString + ":" + secondsString;
    }

    loadAudio = async (name = 'audio', uri?, onFinished?) => {
        if (name === 'audio') {
            uri = this.props.sampleUrl;
        }

        if (this.state[name === 'audio' ? 'sampleLoaded' : `${name}Loaded`] === uri) {
            return;
        }

        try {
            const soundObject = new Audio.Sound();
            await soundObject.loadAsync({ uri }, {}, false);
            soundObject.setOnPlaybackStatusUpdate(
                (...args) => {
                    this.onAutoPlaybackStatusUpdate(name, ...args);
                    if (args[0].didJustFinish && onFinished) {
                        onFinished();
                    }
                },
            );
            soundObject.setProgressUpdateIntervalAsync(1000);
            this.setState({
                [name]: soundObject,
                [name === 'audio' ? 'sampleLoaded' : `${name}Loaded`]: uri,
            });
        } catch (error) {
            alert('error: ' + error)
        }
    }

    expandAudioButton = async () => {
        if (this.state.audioButtonExpanded) {
            this.setState({audioButtonExpanded: false});
            Animated.spring(
                this.state.audioButtonAnim,
                {
                    toValue: 70,
                }
            ).start();
            await this.stopAudioSample('userRecord');
            await this.stopAudioSample('audio');
        } else {
            this.setState({audioButtonExpanded: true});
            if (this.state.audioRecordingButtonExpanded) {
                this.expandAudioRecordingButton();
            }
            Animated.spring(
                this.state.audioButtonAnim,
                {
                    toValue: 120,
                }
            ).start();
            this.playAudioSample();
        }
    }

    stopAudioSample = async (name) => {
        this.setState({ [`${name}Progress`]: '00:00' });
        if (this.state[name] && this.state[name].stopAsync) {
            await this.state[name].stopAsync();
        }
    };

    playAudioSample = (name = 'audio', url?) => new Promise(async (res, rej) => {
        try {
            await this.loadAudio(name, url, () => {
                this.state[`${name}Progress`] = '00:00';
                res();
            });
            this.state[name].playAsync();
        } catch (error) {
            alert('error: ' + error);
            rej(error);
        }
    });

    expandAudioRecordingButton = async () => {
        if (this.state.audioRecordingButtonExpanded) {
            this.setState({audioRecordingButtonExpanded: false});
            Animated.spring(
                this.state.audioRecordingButtonAnim,
                {
                    toValue: 70,
                }
            ).start();
            this.setState({ recordProgress: '00:00' });
            if (this.state.record) {
                await this.state.record.stopAndUnloadAsync();
                const fileUrl = this.state.record.getURI();
                this.setState({ recordedFileUrl: fileUrl });
                this.props.onUserAnswer({ recordedFileUrl: fileUrl });
            }
        }
        else {
            Audio.getPermissionsAsync().then((permission) => {
                if (!permission.granted) {
                    Audio.requestPermissionsAsync().then(() => this.recordAudio());
                } else {
                    this.recordAudio();
                }
            })

            this.expandAudioRecord();
        }
    }

    expandAudioRecord = () => {
        this.setState({audioRecordingButtonExpanded: true});
        if (this.state.audioButtonExpanded) {
            this.expandAudioButton();
        }
        Animated.spring(
            this.state.audioRecordingButtonAnim,
            { toValue: 120 },
        ).start();
    }

    recordAudio = async () => {
        const recording = new Audio.Recording();
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                playThroughEarpieceAndroid: false,
                staysActiveInBackground: true,
              });
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY);
            await recording.startAsync();
            this.setState({ record: recording });
        } catch (error) {
            console.log(error);
            // An error occurred!
        }
    }
    

    expandAudioPlayButton = async () => {
        if (this.state.audioPlayButtonExpanded) {
            this.setState({audioPlayButtonExpanded: false});
            Animated.spring(
                this.state.audioPlayButtonAnim,
                {
                    toValue: 70,
                }
            ).start();
            await this.stopAudioSample('userRecord');
            await this.stopAudioSample('audio');
        } else {
            this.setState({audioPlayButtonExpanded: true});
            if (this.state.audioButtonExpanded) {
                this.expandAudioButton();
            }
            Animated.spring(
                this.state.audioPlayButtonAnim,
                {
                    toValue: 120,
                }
            ).start();
            await this.playAudioSample('userRecord', this.state.recordedFileUrl);
            await this.playAudioSample();
        }
    }

    render() {
        return (
            <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'row' }}>
                <Animated.View style={[styles.audioPlayButton, {height: this.state.audioPlayButtonAnim}]}>
                    <TouchableOpacity 
                        style={styles.audioPlayButtonTO}
                        onPress={() => this.expandAudioPlayButton()}
                        disabled={!this.state.recordedFileUrl}
                    >
                        <Ionicons style={{ opacity: !this.state.recordedFileUrl ? 0.3 : 1 }} name="ios-repeat" size={35} color="#233665" />
                        <View>
                            {this.state.audioPlayButtonExpanded ?  (
                                <Image 
                                    style={styles.closeAudioPlayImage}
                                    source={require('../../assets/close-24px.png')} 
                                />  
                            ) : (<View/>)}
                        </View>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.audioRecordingButton, {height: this.state.audioRecordingButtonAnim}]}>
                    <TouchableOpacity 
                        style={styles.audioRecordingButtonTO}
                        onPress={() => this.expandAudioRecordingButton()}
                    >
                        <MaterialCommunityIcons name="microphone" size={32} color="#233665" />
                        <View>
                            {this.state.audioRecordingButtonExpanded ?  (
                                <Image 
                                    style={styles.closeAudioRecordingImage}
                                    source={require('../../assets/close-24px.png')} 
                                />  
                            ) : (<View/>)}
                        </View>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.audioButton, {height: this.state.audioButtonAnim}]}>
                    <TouchableOpacity 
                        style={styles.audioButtonTO}
                        onPress={() => this.expandAudioButton()}
                    >
                        <MaterialIcons name="volume-up" size={32} color="white" />
                        {this.state.audioButtonExpanded ?  (
                            <View 
                                style={{ paddingTop: 20, flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center'}}
                            >
                                <Text style={{color: '#F7F9FC', textAlign:'center'}}>
                                    {this.state.audioProgress}
                                </Text>
                                <Ionicons name="ios-close" size={30} color="white" />
                            </View>
                        ) : (<View />)}
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
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
        height: 80, 
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
