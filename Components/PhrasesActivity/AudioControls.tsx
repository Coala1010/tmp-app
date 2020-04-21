import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';
import { Audio } from 'expo-av';
import { Sound, Recording } from 'expo-av/build/Audio';
import { MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';

const RECORDING_QUALITY = {
    android: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
    },
    ios: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MEDIUM,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 96400,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
};

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
    playedAudios: Array<string>,
    replayProgress: string,
    replayProgressInterval: number,
    id: number,
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
        playedAudios: [],
        replayProgress: '00:00',
        replayProgressInterval: null,
        id: null,
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Audio.setIsEnabledAsync(true);
        this.loadAudio();
    }

    componentWillUnmount = async () => {
        await this.stopAudioSample('userRecord');
        await this.stopAudioSample('audio');
        Audio.setIsEnabledAsync(false);
    }

    onAutoPlaybackStatusUpdate = (name: string, status: any) => {
        if (status.positionMillis) {
            const progress = this.millisecondsToTime(status.positionMillis);
            this.setState({ [`${name}Progress`]: progress });
        }
    } 

    onRecordStatusUpdate = (name, status) => {
        if (status.durationMillis) {
            const progress = this.millisecondsToTime(status.durationMillis);
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

    loadAudio = async (name = 'audio', uri?, onFinished?, onProgress?) => {
        if (name === 'audio') {
            uri = this.props.sampleUrl;
        }

        try {
            let soundObject = this[name] || new Audio.Sound();
            await soundObject.unloadAsync();
            await soundObject.loadAsync({ uri }, {}, false);
            soundObject.setOnPlaybackStatusUpdate(
                (status: any) => {
                    if (status.didJustFinish && onFinished) {
                        onFinished();
                    } else if (!status.didJustFinish) {
                        if (onProgress) {
                            onProgress(status);
                        } else {
                            this.onAutoPlaybackStatusUpdate(name, status);
                        }
                    }
                },
            );
            soundObject.setProgressUpdateIntervalAsync(1000);
            this.setState({
                [name]: soundObject,
                [name === 'audio' ? 'sampleLoaded' : `${name}Loaded`]: uri,
            });
        } catch (error) {
            console.log('error: ' + error)
        }
    }

    expandAudioButton = async () => {
        if (this.state.audioButtonExpanded) {
            this.setState({ audioButtonExpanded: false });
            Animated.spring(
                this.state.audioButtonAnim,
                {
                    toValue: 70,
                }
            ).start();
            await this.stopAudioSample('userRecord');
            await this.stopAudioSample('audio');
        } else {
            this.setState({ audioButtonExpanded: true });

            if (this.state.audioRecordingButtonExpanded) {
                this.expandAudioRecordingButton();
            }

            if (this.state.audioPlayButtonExpanded) {
                this.expandPlaybackButton();
            }

            Animated.spring(
                this.state.audioButtonAnim,
                {
                    toValue: 120,
                }
            ).start();
            this.playAudioSample();
            this.setState(state => {
                const playedAudios = state.playedAudios.includes(this.props.id)
                    ? state.playedAudios
                    : [...state.playedAudios, this.props.id];

                return { playedAudios };
            });
        }
    }

    stopAudioSample = async (name) => {
        try {
            // this.setState({ [`${name}Progress`]: '00:00' });
            if (this.state[name] && this.state[name].stopAsync) {
                await this.state[name].stopAsync();
            }
        } catch (err) { }
    };

    playAudioSample = (name = 'audio', url?, onProgress?) => new Promise(async (res, rej) => {
        try {
            this.state[`${name}Progress`] = '00:00';
            await this.loadAudio(name, url, () => {
                this.state[`${name}Progress`] = '00:00';
                res();
            }, onProgress);
            this.state[name].playFromPositionAsync(0);
        } catch (error) {
            console.log(error);
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
                try {
                    await this.state.record.stopAndUnloadAsync();
                    const fileUrl = this.state.record.getURI();
                    this.setState({ recordedFileUrl: fileUrl });
                    this.props.onUserAnswer({ recordedFileUrl: fileUrl });
                } catch (err) {}
            }
        } else {
            Audio.getPermissionsAsync().then((permission) => {
                if (!permission.granted) {
                    Audio.requestPermissionsAsync().then(() => this.recordAudio());
                } else {
                    this.recordAudio();
                }
            });
            this.setState({ audioRecordingButtonExpanded: true });

            if (this.state.audioButtonExpanded) {
                this.expandAudioButton();
            }

            if (this.state.audioPlayButtonExpanded) {
                this.expandPlaybackButton();
            }

            Animated.spring(
                this.state.audioRecordingButtonAnim,
                { toValue: 120 },
            ).start();
        }
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
            recording.setOnRecordingStatusUpdate(
                (status) => this.onRecordStatusUpdate('userRecord', status),
            );
            await recording.prepareToRecordAsync(RECORDING_QUALITY);
            await recording.startAsync();
            this.setState({ record: recording });
        } catch (error) {
            console.log(error);
            // An error occurred!
        }
    }

    expandPlaybackButton = async () => {
        if (this.state.audioPlayButtonExpanded) {
            this.setState({ replayProgress: '00:00' });
            if (this.state.replayProgressInterval) {
                clearInterval(this.state.replayProgressInterval);
                this.setState({ replayProgressInterval: null });
            }
            await this.stopAudioSample('userRecord');
            await this.stopAudioSample('audio');
            this.setState({ audioPlayButtonExpanded: false });
            Animated.spring(
                this.state.audioPlayButtonAnim,
                {
                    toValue: 70,
                }
            ).start();
        } else {
            this.setState({ replayProgress: '00:00' });
            if (this.state.replayProgressInterval) {
                clearInterval(this.state.replayProgressInterval);
                this.setState({ replayProgressInterval: null });
            }

            this.setState({ audioPlayButtonExpanded: true });

            if (this.state.audioButtonExpanded) {
                this.expandAudioButton();
            }

            if (this.state.audioRecordingButtonExpanded) {
                this.expandAudioRecordingButton();
            }

            Animated.spring(
                this.state.audioPlayButtonAnim,
                {
                    toValue: 120,
                }
            ).start();
            this.playbackAudios();
        }
    }

    playbackAudios = async () => {
        let positionMillis = 0;
        if (this.state.replayProgressInterval) {
            clearInterval(this.state.replayProgressInterval);
            this.setState({ replayProgressInterval: null });
        }
        const interval = setInterval(() => {
            positionMillis += 1000;
            this.onAutoPlaybackStatusUpdate('replay', { positionMillis });
        }, 1000);
        this.setState({
            replayProgressInterval: interval,
        });
        try {
            await this.playAudioSample('userRecord', this.state.recordedFileUrl || this.props.userAudioRecordUrl);
            await this.playAudioSample('audio', null);
        } catch (err) {}
        clearInterval(this.state.replayProgressInterval);
        this.setState({ replayProgressInterval: null, replayProgress: '00:00' });
    }

    shouldDisableReplayBtn = () => !(this.state.recordedFileUrl || this.props.userAudioRecordUrl);

    render() {
        return (
            <View style={{ justifyContent: 'center', flex: 1, flexDirection: 'row' }}>
                <Animated.View style={[styles.audioPlayButton, { height: this.state.audioPlayButtonAnim }]}>
                    <TouchableOpacity
                        style={styles.audioPlayButtonTO}
                        onPress={() => this.expandPlaybackButton()}
                        disabled={this.shouldDisableReplayBtn()}
                    >
                        <Ionicons style={{ opacity: this.shouldDisableReplayBtn() ? 0.3 : 1 }} name="ios-repeat" size={35} color="#233665" />
                        {this.state.audioPlayButtonExpanded && (
                            <View style={styles.expandedBtnContent}>
                                <Text style={{color: '#233665', textAlign:'center'}}>
                                    {this.state.replayProgress}
                                </Text>
                                <Ionicons name="ios-close" size={30} color="#233665" />
                            </View>
                        )}
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.audioRecordingButton, {height: this.state.audioRecordingButtonAnim}]}>
                    <TouchableOpacity 
                        style={styles.audioRecordingButtonTO}
                        onPress={() => this.expandAudioRecordingButton()}
                        disabled={!this.state.playedAudios.includes(this.props.id)}
                    >
                        <MaterialCommunityIcons
                            style={{ opacity: !this.state.playedAudios.includes(this.props.id) ? 0.3 : 1 }}
                            name="microphone"
                            size={32}
                            color="#233665"
                        />
                        {this.state.audioRecordingButtonExpanded && (
                            <View style={styles.expandedBtnContent}>
                                <Text style={{color: '#233665', textAlign:'center'}}>
                                    {this.state.userRecordProgress}
                                </Text>
                                <Ionicons name="ios-close" size={30} color="#233665" />
                            </View>
                        )}
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[styles.audioButton, {height: this.state.audioButtonAnim}]}>
                    <TouchableOpacity 
                        style={styles.audioButtonTO}
                        onPress={() => this.expandAudioButton()}
                    >
                        <MaterialIcons name="volume-up" size={32} color="white" />
                        {this.state.audioButtonExpanded && (
                            <View style={styles.expandedBtnContent}>
                                <Text style={{color: '#F7F9FC', textAlign:'center'}}>
                                    {this.state.audioProgress}
                                </Text>
                                <Ionicons name="ios-close" size={30} color="white" />
                            </View>
                        )}
                    </TouchableOpacity>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    expandedBtnContent: {
        paddingTop: 18,
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
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
        height: 85,
        borderColor: '#F7F9FC', 
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    audioPlayButton: {
        width: 70,
        height: 85,
        marginTop: 30,
        justifyContent: 'flex-start',
        flexDirection: 'row',
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
        height: 85, 
        borderColor: '#F7F9FC', 
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
    },
    audioRecordingButton: {
        width: 70,
        height: 80,
        marginTop: 30,
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
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    audioRecordingImage: {
        height: 26,
        resizeMode: 'contain',
    },
    closeAudioImage: {
        height: 24,
        width: 24, 
        resizeMode: 'contain',
    },
    audioButtonTO: {
        width: 70, 
        height: 80, 
        borderColor: '#F7F9FC', 
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
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
        resizeMode: 'contain',
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
