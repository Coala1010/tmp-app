import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import ActivityGroupsProgress from '../../Components/navigation/ActivityGroupsProgress';
import ActivityFooter from '../../Components/ActivityFooter/ActivityFooter';
import Multichoice from '../../Components/Multichoice/Multichoice';
import HintBtn from '../../Components/Multichoice/HintBtn';
import { getMultichoice } from '../../providers/activities/Multichoice';

export default function MultichoiceActivityScreen({ navigation, route }) {
    const [activityData, setActivityData] = React.useState(null);
    const [hintText, setHintText] = React.useState(null);

    const { lessonTitle } = route.params;

    React.useEffect(() => {
        try {
            getMultichoice(1).then((res) => {
                setActivityData(res);
            });
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <View style={{flex: 1, justifyContent:'flex-start', width: '100%', backgroundColor: '#FCFDFF'}}>
            <View style={{flex: 1, justifyContent:'flex-start', width: '100%', backgroundColor: '#FCFDFF'}}>
                <View style={{backgroundColor: '#FCFDFF',
                    borderStyle: 'solid', borderWidth: 3,
                    borderColor: '#F7F9F7', height: 100,
                    justifyContent: 'space-around',
                    flexDirection: 'row'}}
                >
                    <Text style={{textAlign: 'center', marginTop: 50, fontWeight: 'bold', color: '#233665', width: '100%',}}>
                        {lessonTitle}
                    </Text>
                </View>
                <ActivityGroupsProgress navigation={navigation} chosenActivity='multichoice'/>
                <View style={{ flex: 1 }}>
                    {activityData ? (
                        <Multichoice
                            activityData={activityData}
                            setHintText={setHintText}
                        />
                    ): <View style={{ flex: 1 }} />}
                    <ActivityFooter
                        navigation={navigation}
                        leftBtn={<HintBtn hintText={hintText} />}
                    />
                </View>
            </View>
        </View>
    );
}
