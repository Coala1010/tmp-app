import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

import ActivityGroupsProgress from '../../Components/navigation/ActivityGroupsProgress';
import DragNDrop from '../../Components/DragNDrop/DragNDrop';
import { getDnDActivity } from '../../providers/activities/DragNDropActivity';
import ActivityFooter from '../../Components/ActivityFooter/ActivityFooter';
import ActivityHeader from '../../Components/ActivityHeader/ActivityHeader';
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
    }

    return (
        <View style={{flex: 1, justifyContent:'flex-start', width: '100%', height: '100%', backgroundColor: '#FCFDFF'}}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="white"
                translucent/>
            <View style={{flex: 1, justifyContent:'flex-start', width: '100%', height: '100%', backgroundColor: 'white'}}>
                <ActivityHeader navigation={navigation} currentActivityName='dragndrop' route={route}/>
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

  });
