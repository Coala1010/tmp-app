import React from 'react';
import { Text, View, TouchableOpacity, Button, Image, StyleSheet } from 'react-native';

export default class BottomNavigation extends React.Component<State> {

    render() {
        return (
            <View style={{flexDirection: 'row', marginBottom: 50}}>
                    <View style={styles.forwardButton}>
                        <TouchableOpacity style={{padding: 5}} 
                            // onPress={() => this.props.navigation.navigate('VideoActivity', { videoUrl: userActivities.videoActivity.videoUrl,
                            // lessonTitle: lessonTitle})}
                            >
                            <View style = {styles.forwardButtonInner}>
                                <Image 
                                    style={styles.forwardImage}
                                    source={require('../../assets/keyboard_arrow_left-24px.png')} 
                                />
                                <Text style = {{ color: '#233665', alignContent: 'center', display: 'flex', 
                                            padding: 10, fontWeight: 'bold', fontSize: 20}}>التــالي</Text> 
                                            {/* Forward */}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.backButton}>
                        <TouchableOpacity 
                            style={styles.backButtonTO}
                            onPress={() => this.props.navigation.goBack()}>
                            <View style={styles.backImageWrapper}>
                                <Image 
                                    style={styles.backImage}
                                    source={require('../../assets/exit_to_app-24px.png')} 
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }
}   

const styles = StyleSheet.create({
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