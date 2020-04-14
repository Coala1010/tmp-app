import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';

import ActivityGroupsProgress from '../../Components/navigation/ActivityGroupsProgress';
import DragNDrop from '../../Components/DragNDrop/DragNDrop';
import { getDnDActivity } from '../../providers/activities/DragNDropActivity';
import ActivityFooter from '../../Components/ActivityFooter/ActivityFooter';
import environment from '../../development.json';

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

    return (
        <View style={{flex: 1, justifyContent:'flex-start', width: '100%', backgroundColor: '#FCFDFF'}}>
            <View style={{flex: 1, justifyContent:'flex-start', width: '100%', backgroundColor: 'white'}}>
                <View style={{backgroundColor: '#FCFDFF',
                    borderStyle: 'solid', borderWidth: 3,
                    borderColor: '#F7F9F7', height: 100,
                    justifyContent: 'space-around',
                    flexDirection: 'row'}}>
                    <Text style={{textAlign: 'center', marginTop: 50, fontWeight: 'bold', color: '#233665', width: '100%',}}>
                        {lessonTitle}
                    </Text>
                    <TouchableOpacity 
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}>
                        <Image 
                            style={styles.image}
                            source={require('../../assets/arrow_back-24px.png')} 
                        />
                    </TouchableOpacity>
                </View>
                <ActivityGroupsProgress chosenActivity='dragndrop' navigation={navigation} activities={activities}/>
                <DragNDrop activityData={activityData} />
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
      marginTop: 50, 
      color: '#233665', 
      width: 30, 
      height: 30, 
      marginRight: 30,
      backgroundColor: '#F7F9FC',
      fontWeight: 'bold', 
      borderStyle: 'solid', 
      borderRadius: 5, 
      borderWidth: 1,
      borderColor: '#F7F9FC', 
      overflow: 'hidden',
      alignItems: 'center'
    }
  });
