import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import SideSwipe from 'react-native-sideswipe';
import { Feather, AntDesign } from '@expo/vector-icons';
import { updateMultichoiceActivity } from '../../providers/activities/Multichoice';

export default function Multichoice({ activityData }) {
    const [currentIndex, setCurrentIndex] = React.useState(activityData.length - 1);
    const [selected, setSelected] = React.useState({});
    const [currentQuestion, setCurrentQuestion] = React.useState(0);

    const clearSelected = () => {
        setSelected({
            ...selected,
            [currentQuestion]: null,
        });
    };
    const setCurrentSelected = async (id) => {
        if (selected[currentQuestion] === id) {
            clearSelected();
        } else {
            setSelected({
                ...selected,
                [currentQuestion]: id,
            });
            try {
                await updateMultichoiceActivity({
                    id: activityData[currentQuestion].id,
                    userAnswerId: activityData[currentQuestion].userAnswerId,
                    answerId: id,
                });
            } catch (err) {
                console.log(err);
            }
        }
    };

    const { width } = Dimensions.get('window');
    const contentOffset = 0;

    return (
        <ScrollView>
            <SideSwipe
                contentContainerStyle={{ flexDirection: 'row-reverse' }}
                index={currentIndex}
                itemWidth={width - 50}
                style={{ width }}
                data={activityData}
                contentOffset={contentOffset}
                onIndexChange={index => {
                    setCurrentIndex(index);
                    setCurrentQuestion(activityData.length - 1 - index);
                }}
                renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
                    <View style={[
                        styles.questionCard,
                        itemIndex === 0 && { marginRight: 20 },
                        itemIndex === activityData.length - 1 && { marginLeft: 20 },
                    ]}>
                        <View style={{ width: 10 }} />
                        <Text style={styles.questionText}>{item.question}</Text>
                        <View style={styles.numberContainer}>
                            <Text style={styles.number}>{activityData.length}/{itemIndex + 1}</Text>
                        </View>
                    </View>
                )}
            />
            <View style={styles.answers}>
                {activityData[currentQuestion].answers.map((answer, id) => (
                    <TouchableOpacity
                        onPress={() => setCurrentSelected(answer.id)}
                        key={answer.id}
                        style={[styles.answerContainer, selected[currentQuestion] === answer.id && styles.answerContainerSelected]}
                    >
                        <Text
                            style={[styles.answerText, selected[currentQuestion] === answer.id && styles.answerTextSelected]}
                        >
                            {answer.answer}
                        </Text>
                        <View style={styles.answerRightLabel}>
                            {
                            selected[currentQuestion] === answer.id
                            || (
                                selected[currentQuestion]
                                && activityData[currentQuestion].answers[selected[currentQuestion] - 1].isCorrect
                            ) ? (
                                <View style={[styles.answerIconContainer, selected[currentQuestion] !== answer.id && styles.answerIconNotSelected]}>
                                    {answer.isCorrect ? (
                                        <Feather name="check" size={28} color="#24395F" />
                                    ): (
                                        <AntDesign style={{ marginTop: 2 }} name="close" size={26} color="#24395F" />
                                    )}
                                </View>
                            ) : (
                                <View style={styles.answerNumberContainer}>
                                    <Text style={styles.answerNumberText}>{id + 1}</Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    questionCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: Dimensions.get('window').width - 100,
        height: 70,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2.22,
        elevation: 2,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    questionText: {
        color: '#233665',
        fontSize: 20,
        fontWeight: 'bold',
    },
    numberContainer: {
        backgroundColor: 'rgba(35, 54, 101, 0.08)',
        padding: 10,
        borderRadius: 10,
        height: 45,
    },
    number: {
        color: '#24395F',
        fontWeight: 'bold',
        fontSize: 20,
    },
    answers: {
        paddingTop: 30,
    },
    answerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width - 40,
        height: 70,
        marginHorizontal: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2.22,
        elevation: 2,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 10,
    },
    answerContainerSelected: {
        backgroundColor: '#233665',
    },
    answerText: {
        color: '#233665',
        fontSize: 20,
        fontWeight: 'bold',
    },
    answerTextSelected: {
        color: 'white',
    },
    answerRightLabel: {
        position: 'absolute',
        right: 20,
    },
    answerNumberContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(35, 54, 101, 0.08)',
        width: 40,
        borderRadius: 25,
        height: 40,
    },
    answerNumberText: {
        color: '#24395F',
        fontWeight: 'bold',
        fontSize: 20,
    },
    answerIconContainer: {
        width: 40,
        borderRadius: 25,
        height: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    answerIconNotSelected: {
        borderWidth: 1,
        borderColor: '#24395F',
    }
});
