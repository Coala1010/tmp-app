import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';

import ActivityGroupsProgress from '../../Components/navigation/ActivityGroupsProgress';
import DragNDrop from '../../Components/DragNDrop/DragNDrop';
import { getDnDActivity } from '../../providers/activities/DragNDropActivity';
import ActivityFooter from '../../Components/ActivityFooter/ActivityFooter';
import environment from '../../development.json';
import OnSuccessNavigation from '../../Components/navigation/OnSuccessNavigation';

export default function DragAndDropActivity({ route, navigation }) {
    const [activityData, setActivityData] = React.useState(null);
    const { lessonTitle, activities } = route.params;
    const nextActivity = activities.get('dragndrop').nextActivity;

    React.useEffect(() => {
        try {
            getDnDActivity(route.params.userGroupId).then((res) => {
                setActivityData(res.map(item => ({
                    ...item,
                    imgUrl: `${environment.API_URL}/api/v1/admin/dragndrop/${item.pictureId}/picture/${item.pictureUrl}`,
                })));
            }); 
        } catch (err) {
            console.log(err);
        }
    }, []);

    const onAllChoicesAnswered = () =>{        
        OnSuccessNavigation(nextActivity, activities, navigation);

        // navigation.push(nextActivity.navigationScreen, { 
        //     userGroupId: nextActivity.userGroupId,
        //     lessonTitle: nextActivity.lessonTitle,
        //     lessonId: nextActivity.lessonId,
        //     userToken: nextActivity.userToken,
        //     unitTitle: nextActivity.unitTitle,
        //     unitId: nextActivity.unitId,
        //     activities: activities
        // });
    }

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
    }

    return (
        <View style={{flex: 1, justifyContent:'flex-start', width: '100%', height: '100%', backgroundColor: '#FCFDFF'}}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="white"
                translucent/>
            <View style={{flex: 1, justifyContent:'flex-start', width: '100%', height: '100%', backgroundColor: 'white'}}>
                <View style={{backgroundColor: '#FCFDFF',
                    shadowColor: 'lightgray',
                    shadowOpacity: 0.6,
                    elevation: 3,
                    height: 80,
                    justifyContent: 'center',
                    flexDirection: 'row'}}>
                    <Text style={{textAlign: 'center', marginTop: 34, color: '#233665', width: '100%', 
                    fontFamily: 'NeoSansArabicBold', fontSize: 20}}>
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
                <View style={{ flex: 1, marginTop: 0, height: '100%' }}>
                <ActivityGroupsProgress chosenActivity='dragndrop' navigation={navigation} activities={activities}/>
                {
                    activityData ? (
                        <View style={{ flex: 1, marginTop: 0, height: '100%' }}>
                            <DragNDrop activityData={activityData} onSuccess={onAllChoicesAnswered}/> 
                            <ActivityFooter navigation={navigation} 
                        toNext={nextActivity.navigationScreen}
                        toNextPayload={{ 
                            userGroupId: nextActivity.userGroupId,
                            lessonTitle: nextActivity.lessonTitle,
                            lessonId: nextActivity.lessonId,
                            userToken: nextActivity.userToken,
                            unitId: nextActivity.unitId,
                            unitTitle: nextActivity.unitTitle,
                            activities: activities
                        }}
                    />
                        </View>
                    ): (
                    <View style={{position: 'absolute', bottom: 0}}>
                        <ActivityFooter navigation={navigation} 
                        toNext={nextActivity.navigationScreen}
                        toNextPayload={{ 
                            userGroupId: nextActivity.userGroupId,
                            lessonTitle: nextActivity.lessonTitle,
                            lessonId: nextActivity.lessonId,
                            userToken: nextActivity.userToken,
                            unitId: nextActivity.unitId,
                            unitTitle: nextActivity.unitTitle,
                            activities: activities
                        }}
                    />
                    </View>
                    )
                }
                {/* <View style={{position: 'absolute', bottom: 0}}> */}
                        
                </View>
            </View>
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
        position: 'absolute',
        top: 34,
        right: 23,  
        color: '#233665', 
        width: 30, 
        height: 30, 
        backgroundColor: '#F7F9FC',
        borderStyle: 'solid', 
        borderRadius: 5, 
        borderWidth: 1,
        borderColor: '#F7F9FC', 
        overflow: 'hidden',
        alignItems: 'center',
        fontFamily: 'NeoSansArabicBold'
    }
  });
