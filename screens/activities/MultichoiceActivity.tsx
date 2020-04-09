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
                res[1] = {
                    hint: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque porttitor elit quis sem ultricies, vel ultrices lectus viverra. Sed vel metus porttitor, bibendum erat in, imperdiet erat. Sed a sapien nulla. Curabitur scelerisque urna sit amet felis pellentesque, vitae ornare est porta. Nulla",
                    id: 4,
                    question: "ما هي عاصمة السعودية ؟",
                    title: "الدرس الخامس",
                    userAnswerId: 1,
                    activityStatus: true,
                    answerId: 2,
                    userMultichoiceActivityGroupId: 1,
                    answers: [
                        { id: 1, answer: 'الرياض', isCorrect: true, },
                        { id: 2, answer: 'المدينة' },
                        { id: 3, answer: 'مكة' },
                        { id: 4, answer: 'الرياض' },
                        { id: 5, answer: 'الرياض' },
                        { id: 6, answer: 'الرياض' },
                        { id: 7, answer: 'الرياض' },
                        { id: 8, answer: 'الرياض' },
                        { id: 9, answer: 'الرياض' },
                    ],
                };

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
