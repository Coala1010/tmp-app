import React from 'react';
import { Text, View } from 'react-native';

import ActivityGroupsProgress from '../../Components/navigation/ActivityGroupsProgress';
import DragNDrop from '../../Components/DragNDrop/DragNDrop';
import { getDnDActivity } from '../../providers/activities/DragNDropActivity';
import ActivityFooter from '../../Components/ActivityFooter/ActivityFooter';
import environment from '../../development.json';

export default function DragAndDropActivity({ route, navigation }) {
    const [activityData, setActivityData] = React.useState(null);
    const { lessonTitle } = route.params;

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
                </View>
                <ActivityGroupsProgress chosenActivity='dragndrop'/>
                <DragNDrop activityData={activityData} />
                <ActivityFooter navigation={navigation} />
            </View>
        </View>
    );
}
