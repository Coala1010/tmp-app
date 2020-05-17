import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import NavigationActivity from './NavigationActivity';

interface Props {
    chosenActivity: string,
    navigation: any,
    activities: Map<string, NavigationActivity>
}
export default class ActivityGroupsProgress extends React.Component<Props> {
    renderActivity(navigationActivity : NavigationActivity, chosenActivity: string, index: number) {
        return navigationActivity.type != 'lessons' ? (
            <View style={{flexDirection: 'row'}}>
                <View> 
                    <TouchableOpacity onPress={() => this.props.navigation.push(navigationActivity.navigationScreen, {
                        userGroupId: navigationActivity.userGroupId,
                        lessonTitle: navigationActivity.lessonTitle,
                        lessonId: navigationActivity.lessonId,
                        userToken: navigationActivity.userToken,
                        activities: this.props.activities
                        })}>
                        <View style={styles.activityGroup}>
                            <Image 
                                style={[styles.activityImage, chosenActivity == navigationActivity.type ? styles.activeImage : styles.inActiveImage]}
                                source={navigationActivity.iconUrl} 
                            />
                        </View>
                    </TouchableOpacity>
                </View> 
                {
                    (index > 1) ? <View style={[styles.grayLine, {width: Dimensions.get('window').width/this.props.activities.size/2}]}/> : <View/>
                }  
            </View>
        ) : <View/>
    }

    renderActivityGroups() {
        const activitiesArray = new Array();
        this.props.activities.forEach((value) => activitiesArray.push(value));
        
        return activitiesArray.map((navigationActivity, i) => {
            return this.renderActivity(navigationActivity, this.props.chosenActivity, i);
        });    
    }

    render() {
        return (
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', marginTop: 5, marginBottom: 5}}>
                <View style={{flexDirection: 'row-reverse', justifyContent: 'center'}}>
                    {this.renderActivityGroups()}
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
