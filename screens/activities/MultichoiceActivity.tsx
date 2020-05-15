import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import ActivityGroupsProgress from '../../Components/navigation/ActivityGroupsProgress';
import ActivityFooter from '../../Components/ActivityFooter/ActivityFooter';
import Multichoice from '../../Components/Multichoice/Multichoice';
import HintBtn from '../../Components/Multichoice/HintBtn';
import { getMultichoice } from '../../providers/activities/Multichoice';
import OnSuccessNavigation from '../../Components/navigation/OnSuccessNavigation';
import ActivityHeader from '../../Components/ActivityHeader/ActivityHeader';

export default function MultichoiceActivityScreen({ navigation, route }) {
    const [activityData, setActivityData] = React.useState(null);
    const [hintText, setHintText] = React.useState(null);

    const { lessonTitle, activities } = route.params;
    const nextActivity = activities.get('multichoice').nextActivity;

    React.useEffect(() => {
        try {
            getMultichoice(route.params.userGroupId).then((res) => {
                setActivityData(res);
            });
        } catch (err) {
            console.log(err);
        }
    }, []);

    const onAllChoicesAnswered = () =>{  
        OnSuccessNavigation(nextActivity, activities, navigation);
    }

    return (
        <View style={{flex: 1, justifyContent:'flex-start', width: '100%', backgroundColor: '#FCFDFF'}}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="white"
                translucent/>
            <View style={{flex: 1, justifyContent:'flex-start', width: '100%', backgroundColor: '#FCFDFF'}}>
                <ActivityHeader navigation={navigation} currentActivityName='multichoice' route={route}/>
                <ActivityGroupsProgress navigation={navigation} chosenActivity='multichoice' activities={activities}/>
                <View style={{ flex: 1, marginTop: 20, height: '100%' }}>
                    {activityData && activityData.length > 0 ? (
                        <Multichoice
                            activityData={activityData}
                            setHintText={setHintText}
                            onSuccess={onAllChoicesAnswered}
                        />
                    ): <View style={{ flex: 1 }} />}
                    <View style={{position: 'absolute', bottom: 0}}>
                        <ActivityFooter
                            navigation={navigation}
                            leftBtn={hintText ? <HintBtn hintText={hintText}/> : ""}
                            toNext={nextActivity.navigationScreen}
                            toNextPayload={{ 
                                userGroupId: nextActivity.userGroupId,
                                lessonTitle: nextActivity.lessonTitle,
                                lessonId: nextActivity.lessonId,
                                userToken: nextActivity.userToken,
                                unitTitle: nextActivity.unitTitle,
                                unitId: nextActivity.unitI,
                                activities: activities
                            }}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
      height: 24,
      width: 24, 
    }
  });
