import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ActivityGroupsProgress from '../../Components/navigation/ActivityGroupsProgress';
import ActivityFooter from '../../Components/ActivityFooter/ActivityFooter';
import Multichoice from '../../Components/Multichoice/Multichoice';
import HintBtn from '../../Components/Multichoice/HintBtn';
import { getMultichoice } from '../../providers/activities/Multichoice';
import OnSuccessNavigation from '../../Components/navigation/OnSuccessNavigation';

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
                <ActivityGroupsProgress navigation={navigation} chosenActivity='multichoice' activities={activities}/>
                <View style={{ flex: 1 }}>
                    {activityData ? (
                        <Multichoice
                            activityData={activityData}
                            setHintText={setHintText}
                            onSuccess={onAllChoicesAnswered}
                        />
                    ): <View style={{ flex: 1 }} />}
                    <ActivityFooter
                        navigation={navigation}
                        leftBtn={<HintBtn hintText={hintText} />}
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
