import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import SideSwipe from 'react-native-sideswipe';

export default function PhrasesActivityCarousel({ onChange, activityData }) {
  const { width } = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = React.useState(activityData.length - 1);

  const itemWidth = Dimensions.get('window').width - Dimensions.get('window').width*0.1;
  const contentOffset = (width - itemWidth) / 2;
  return (
    <SideSwipe
        contentContainerStyle={styles.swipperContainer}
        index={currentIndex}
        itemWidth={itemWidth}
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
            ]}>
                <Text style={styles.questionText}>{item.phrase}</Text>
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
        width: Dimensions.get('window').width - Dimensions.get('window').width*0.1 - 12,
        minHeight: 120,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 6,
        marginLeft: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2.22,
        elevation: 6,
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
        paddingHorizontal: 5,
        paddingVertical: 10,
        fontFamily: 'NeoSansArabicBold'
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
