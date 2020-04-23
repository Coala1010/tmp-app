import React from 'react';
import { Image, View, Text, Dimensions, StyleSheet } from 'react-native';
import SideSwipe from 'react-native-sideswipe';

export default function WordActivityCarousel({ onChange, activityData }) {
  const { width } = Dimensions.get('window');
  const [currentIndex, setCurrentIndex] = React.useState(activityData.length - 1);

  return (
    <SideSwipe
        contentContainerStyle={styles.swipperContainer}
        index={currentIndex}
        itemWidth={width - 80}
        style={{ width }}
        data={activityData}
        contentOffset={activityData.length > 2 ? 40 : 0}
        onIndexChange={index => {
            setCurrentIndex(index);
            onChange(activityData.length - 1 - index);
        }}
        renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
            <View style={[
                styles.questionCard,
                itemIndex !== 0 && itemIndex !== activityData.length - 1 && { width: Dimensions.get('window').width - 120 },
                itemIndex === 0 && { marginRight: 20 },
                itemIndex === activityData.length - 1 && { marginLeft: 20 },
                activityData.length === 1 && { marginRight: 50, marginLeft: 50 },
            ]}>
                <Image style={styles.img} source={{ uri: item.imageUrl }} />
                <View style={styles.numberContainer}>
                    <Text style={styles.number}>{activityData.length}/{itemIndex + 1}</Text>
                </View>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{item.phrase}</Text>
                </View>
            </View>
        )}
    />
  );
}

const styles = StyleSheet.create({
    img: {
        flex: 1,
        borderRadius: 20,
        width: '100%',
        height: '100%',
    },
    swipperContainer: {
        flexDirection: 'row-reverse',
    },
    questionCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: Dimensions.get('window').width - 100,
        height: Dimensions.get('window').width - 100,
        margin: 10,
        marginBottom: 0,
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
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        position: 'absolute',
        top: 20,
        right: 23,
        padding: 10,
        borderRadius: 10,
    },
    number: {
        color: '#24395F',
        fontWeight: 'bold',
        fontSize: 22,
    },
    titleContainer: {
        position: 'absolute',
        bottom: 7,
        left: 0,
        right: 0,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    title: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderRadius: 10,
        overflow: 'hidden',
        color: '#24395F',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
