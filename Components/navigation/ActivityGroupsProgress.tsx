import React from 'react';
import { Text, View, TouchableOpacity, Button, Image, StyleSheet } from 'react-native';
import NavigationActivity from './NavigationActivity';

interface Props {
    chosenActivity: string,
    navigation: any,
    activities: Map<string, NavigationActivity>
}
export default class ActivityGroupsProgress extends React.Component<Props> {

    render() {
        let chosenActivity = this.props.chosenActivity;
        return (
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', marginTop: 5, marginBottom: 5}}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    {
                        this.props.activities.get('dragndrop') ? (
                            <View style={styles.activityGroup}>
                                <TouchableOpacity onPress={() => this.props.navigation.push('DragAndDropActivity', {
                                    userGroupId: this.props.activities.get('dragndrop').userGroupId,
                                    lessonTitle: this.props.activities.get('dragndrop').lessonTitle,
                                    lessonId: this.props.activities.get('dragndrop').lessonId,
                                    userToken: this.props.activities.get('dragndrop').userToken,
                                    activities: this.props.activities
                                    })}>
                                    <View style={styles.activityGroup}>
                                        <Image 
                                            style={[styles.activityImage, chosenActivity == 'dragndrop' ? styles.activeImage : styles.inActiveImage]}
                                            source={require('../../assets/extension-24px.png')} 
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>    
                        ) : <View/>
                    }  
                    {
                        this.props.activities.get('dragndrop') && this.props.activities.get('multichoice') ? <View style={styles.grayLine}/> : <View/>
                    }
                    {
                        this.props.activities.get('multichoice') ? (
                            // <View style={styles.activityWrapper}>
                                
                                <View style={styles.activityGroup}>
                                    <TouchableOpacity onPress={() => this.props.navigation.push('MultichoiceActivity', { 
                                        userGroupId: this.props.activities.get('multichoice').userGroupId,
                                        lessonTitle: this.props.activities.get('multichoice').lessonTitle,
                                        lessonId: this.props.activities.get('multichoice').lessonId,
                                        userToken: this.props.activities.get('multichoice').userToken,
                                        activities: this.props.activities
                                    })}>  
                                        <Image 
                                            style={[styles.activityImage, chosenActivity == 'multichoice' ? styles.activeImage : styles.inActiveImage]}
                                            source={require('../../assets/format_list_bulleted-24px.png')} 
                                        />
                                    </TouchableOpacity>
                                </View>
                            // </View>
                        ) : <View/>    
                    }

                    {
                        (this.props.activities.get('multichoice') || this.props.activities.get('dragndrop') && this.props.activities.get('words'))
                         ? <View style={styles.grayLine}/> : <View/>
                    }
                    {
                        this.props.activities.get('words') ? (
                            // <View style={styles.activityWrapper}>
                                    <TouchableOpacity onPress={() => this.props.navigation.push('WordsActivity', { 
                                        userGroupId: this.props.activities.get('words').userGroupId,
                                        lessonTitle: this.props.activities.get('words').lessonTitle,
                                        lessonId: this.props.activities.get('words').lessonId,
                                        userToken: this.props.activities.get('words').userToken,
                                        activities: this.props.activities
                                    })}>  
                                <View style={styles.activityGroup}>
                                    <Image 
                                        style={[styles.activityImage, chosenActivity == 'words' ? styles.activeImage : styles.inActiveImage]}
                                        source={require('../../assets/photo-24px.png')} 
                                    />
                                </View>
                            </TouchableOpacity>
                            // {/* </View> */}
                        ) : <View/>
                    }       
                    {
                        ((this.props.activities.get('multichoice') || this.props.activities.get('dragndrop') || this.props.activities.get('words')) 
                        && this.props.activities.get('phrases'))
                         ? <View style={styles.grayLine}/> : <View/>
                    }    
                    {
                        this.props.activities.get('phrases') ? (
                            // <View style={styles.activityWrapper}>
                                
                                <TouchableOpacity onPress={() => this.props.navigation.push('PhrasesActivity', { 
                                    userGroupId: this.props.activities.get('phrases').userGroupId,
                                    lessonTitle: this.props.activities.get('phrases').lessonTitle,
                                    lessonId: this.props.activities.get('phrases').lessonId,
                                    userToken: this.props.activities.get('phrases').userToken,
                                    activities: this.props.activities
                                })}>   
                                    <View style={styles.activityGroup}>
                                        <Image 
                                            style={[styles.activityImage, chosenActivity == 'phrases' ? styles.activeImage : styles.inActiveImage]}
                                            source={require('../../assets/headset-24px.png')} 
                                        />
                                    </View>
                                </TouchableOpacity>
                            // </View>
                        ) : <View/>
                    }  
                </View>
            </View>
        )
    }
}   

const styles = StyleSheet.create({
    activityWrapper: {
        // width: '20%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    grayLine: {
        width: '10%',
        height: 25,
        marginLeft: 5,
        marginRight: 5,
        borderBottomColor: '#E3E3E3',
        borderBottomWidth: 2,
    },
    activityImage: {
        height: 26,
        width: 26,
    },
    activeImage: {
    },
    inActiveImage: {
        tintColor: '#E3E3E3'
    },
    activityGroup: {
        // width: '20%',
        color: '#233665', 
        width: 50, 
        height: 50, 
        backgroundColor: 'white',
        fontWeight: 'bold', 
        borderStyle: 'solid', 
        borderRadius: 30, 
        borderWidth: 3,
        borderColor: '#F7F9FC', 
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
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
