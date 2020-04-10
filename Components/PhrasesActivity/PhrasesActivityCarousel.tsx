import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import SideSwipe from 'react-native-sideswipe';

export default function PhrasesActivityCarousel({ onChange, activityData }) {
  const { width } = Dimensions.get('window');
  const contentOffset = 0;
  const [currentIndex, setCurrentIndex] = React.useState(activityData.length - 1);

  return (
    <SideSwipe
        contentContainerStyle={styles.swipperContainer}
        index={currentIndex}
        itemWidth={width - 80}
        style={{ width }}
        data={activityData}
        contentOffset={contentOffset}
        onIndexChange={index => {
            setCurrentIndex(index);
            onChange(activityData.length - 1 - index);
        }}
        renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
            <View style={[
                styles.questionCard,
                itemIndex === 0 && { marginRight: 20 },
                itemIndex === activityData.length - 1 && { marginLeft: 20 },
            ]}>
                <Text style={styles.questionText}>{item.title}</Text>
                <View style={styles.numberContainer}>
                    <Text style={styles.number}>{activityData.length}/{itemIndex + 1}</Text>
                </View>
            </View>
        )}
    />
  );
}

const styles = StyleSheet.create({
    swipperContainer: {
        flexDirection: 'row-reverse',
    },
    questionCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: Dimensions.get('window').width - 100,
        minHeight: 120,
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
        paddingVertical: 10,
    },
    questionText: {
        textAlign: 'right',
        flex: 1,
        flexWrap: 'wrap',
        color: '#233665',
        fontSize: 18,
        fontWeight: 'bold',
        paddingHorizontal: 5,
        paddingVertical: 10,
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
});
