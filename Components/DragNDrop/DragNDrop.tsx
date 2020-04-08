import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity, Image, ScrollView } from 'react-native';
import { createDndContext } from 'react-native-easy-dnd';
import { Ionicons } from '@expo/vector-icons';
import { Carousel } from './Carousel';
import { updateDnDActivity } from '../../providers/activities/DragNDropActivity';

const { Provider, Droppable, Draggable } = createDndContext();

const Options = ({ hideId, setDragging, dragging, selected, answers }) => (
    <View style={styles.optionsContainer}>
        {answers.map((answer) => answer.id === hideId ? (
            <View
                key={answer.id}
                style={styles.optionPlaceholder}
            />
        ) : (
            <Draggable
                key={answer.id}
                onDragStart={() => setDragging(answer.id)}
                onDragEnd={() => setDragging(null)}
                payload={answer.id}
            >
                {({ viewProps }) => {
                    return (
                        <Animated.View
                            {...viewProps}
                            style={[
                                viewProps.style,
                                styles.option,
                                dragging === answer.id ? styles.optionDragging : null,
                                selected === answer.id ? styles.optionActive : null,
                            ]}
                        >
                            <Text style={[styles.optionText, dragging === answer.id ? styles.optionTextDragging : null]}>{answer.answer}</Text>
                            {dragging === answer.id && (
                                answer.isCorrect ? (
                                    <Ionicons style={styles.optionIcon} name="md-checkmark" size={32} color="white" />
                                ) : (
                                    <Ionicons style={styles.optionIcon} name="md-close" size={32} color="white" />
                                )
                            )}
                        </Animated.View>
                    );
                }}
            </Draggable>
        ))}
    </View>
);

const Dropbox = ({ setSelected, clearSelected, selected, answers }) => (
    <Droppable
        onDrop={({ payload }) => {
            setSelected(payload);
        }}
    >
        {({ active, viewProps }) => {
            return selected ? (
                <View style={[styles.dropContainer]} >
                    <TouchableOpacity style={[styles.option, styles.optionDragging]} onPress={clearSelected}>
                        <Text style={[styles.optionText, styles.optionTextDragging]}>{answers.find(({ id }) => id === selected).answer}</Text>
                        {answers.find(({ id }) => id === selected).isCorrect ? (
                            <Ionicons
                                style={styles.optionIcon}
                                name="md-checkmark"
                                size={Dimensions.get('window').width < 390 ? 28 : 32} color="white"
                            />
                        ) : (
                            <Ionicons
                                style={styles.optionIcon}
                                name="md-close"
                                size={Dimensions.get('window').width < 390 ? 28 : 32}
                                color="white"
                            />
                        )}
                    </TouchableOpacity>
                </View>
            ) : (
                <Animated.View {...viewProps} style={[styles.dropContainer, viewProps.style]}>
                    <View style={[
                        styles.dropView,
                        active ? {
                            backgroundColor: '#F8FAFE',
                        } : {},
                    ]}/>
                </Animated.View>
            );
        }}
    </Droppable>
);

export default function DragNDrop({ activityData }) {
    const [currentQuest, setQurrentQuest] = React.useState(0);
    const [selected, setSelected] = React.useState({});
    const [dragging, setDragging] = React.useState(null);
    const [scrollId, setScrollId] = React.useState(1);

    const clearSelected = () => {
        setSelected({
            ...selected,
            [currentQuest]: null,
        });
    };
    const setCurrentSelected = async (val) => {
        setSelected({
            ...selected,
            [currentQuest]: val,
        });
        try {
            await updateDnDActivity({
                id: activityData[currentQuest].id,
                userAnswerId: activityData[currentQuest].userAnswerId,
                answerId: val,
            });
        } catch (err) {
            console.log(err);
        }
    };

    return !activityData || !activityData.length ? null : (
        <ScrollView onScroll={() => setScrollId(scrollId + 1)} scrollEventThrottle={50} scrollEnabled={!dragging}>
            <Carousel activityData={activityData} onChange={(index) => setQurrentQuest(index)} />
            <View style={{
                height: 130 + Math.ceil(activityData[currentQuest].answers.length / 2) * 90,
            }}>
                <Provider key={scrollId}>
                    <View style={[styles.dndContainer]}>
                        <Dropbox
                            setSelected={setCurrentSelected}
                            clearSelected={clearSelected}
                            selected={selected[currentQuest]}
                            answers={activityData[currentQuest].answers}
                        />
                        <Options
                            hideId={selected[currentQuest]}
                            dragging={dragging}
                            setDragging={setDragging}
                            selected={selected[currentQuest]}
                            answers={activityData[currentQuest].answers}
                        />
                    </View>
                </Provider>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    imgContainer: {
        height: (Dimensions.get('window').height / 2) - 170,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    img: {
        flex: 1,
        borderRadius: 20,
        width: '100%',
        height: '100%',
    },
    dropContainer: {
        marginVertical: 15,
        width: 300,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width / 2 - 30,
        height: 70,
        borderColor: '#287E8C',
        borderWidth: 2,
        borderRadius: 20,
        borderStyle: 'dashed',
    },
    dndContainer: {
        flex: 1,
        height: (Dimensions.get('window').height / 2) - 100,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionsContainer: {
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: 90,
        flexDirection: 'row',
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width / 2 - 30,
        height: 70,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    optionText: {
        color: '#24395F',
        fontWeight: 'bold',
        fontSize: Dimensions.get('window').width < 390 ? 14 : 16,
    },
    optionTextDragging: {
        color: 'white',
    },
    optionDragging: {
        backgroundColor: '#24395F',
    },
    optionActive: {
        elevation: 0,
        backgroundColor: 'red',
    },
    optionPlaceholder: {
        width: Dimensions.get('window').width / 2 - 30,
        height: 70,
        backgroundColor: 'transparent',
        margin: 10,
    },
    optionIcon: {
        position: 'absolute',
        right: Dimensions.get('window').width < 390 ? 13 : 16,
    },
});
