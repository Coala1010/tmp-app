import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import SideSwipe from 'react-native-sideswipe';
import { Feather, AntDesign } from '@expo/vector-icons';
import { uploadMultichoiceActivityRecord } from '../../providers/activities/Multichoice';

export default function Multichoice({ activityData, setHintText, onSuccess }) {
    const [currentIndex, setCurrentIndex] = React.useState(activityData.length - 1);
    const [selected, setSelected] = React.useState({});
    const [currentQuestion, setCurrentQuestion] = React.useState(0);

    const clearSelected = () => {
        setSelected({
            ...selected,
            [currentQuestion]: null,
        });
    };
    const setCurrentSelected = async (answer) => {
        const id = answer.id;
        if (selected[currentQuestion] === id) {
            clearSelected();
        } else {
            setSelected({
                ...selected,
                [currentQuestion]: id,
            });
            try {
                await uploadMultichoiceActivityRecord({
                    id: activityData[currentQuestion].id,
                    userAnswerId: activityData[currentQuestion].userAnswerId,
                    answerId: id,
                });
            } catch (err) {
                console.log(err);
            }

            if (answer.isCorrect) {
                setTimeout(() => {
                    if (currentIndex > 0) {
                        setCurrentQuestion(activityData.length - currentIndex);//activityData.length - 1 - index)
                        setCurrentIndex(currentIndex - 1);
                    } else {
                        onSuccess();
                    }
                }, 2000);
            }    
        }
    };

    const { width } = Dimensions.get('window');
    const contentOffset = 0;

    React.useEffect(() => {
        setHintText(activityData[currentQuestion].hint);
    }, [currentQuestion]);

    return (
        <View style={{ flex: 1 }}>
            <SideSwipe
                contentContainerStyle={styles.swipperContainer}
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
                        activityData.length === 1 && { marginRight: 50, marginLeft: 50 },
                    ]}>
                        <View style={{ width: 30 }} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.questionText}>{item.question}</Text>
                        </View>
                        <View style={styles.numberContainer}>
                            <Text style={styles.number}>{activityData.length}/{itemIndex + 1}</Text>
                        </View>
                    </View>
                )}
            />
            <ScrollView style={styles.answers}>
                {activityData[currentQuestion].answers.map((answer, id) => (
                    <TouchableOpacity
                        onPress={() => setCurrentSelected(answer)}
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
                                && activityData[currentQuestion].answers.find(({ id }) => selected[currentQuestion] === id).isCorrect
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
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    swipperContainer: {
        flexDirection: 'row-reverse',
    },
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
        fontSize: 18,
        fontWeight: 'bold',
    },
    numberContainer: {
        backgroundColor: 'rgba(35, 54, 101, 0.08)',
        padding: 10,
        borderRadius: 10,
        height: 45,
        marginLeft: 10,
    },
    number: {
        color: '#24395F',
        fontWeight: 'bold',
        fontSize: 18,
    },
    answers: {
        paddingVertical: 8,
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
        fontSize: 18,
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
