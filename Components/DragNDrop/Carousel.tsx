import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import SideSwipe from 'react-native-sideswipe';

export const Carousel = ({ activityData, onChange }) => {
  const [currentIndex, setCurrentIndex] = React.useState(activityData.length - 1);
  const { width } = Dimensions.get('window');
  const contentOffset = 0;

  return (
    <SideSwipe
      contentContainerStyle={{ flexDirection: 'row-reverse' }}
      index={currentIndex}
      itemWidth={width - 50}
      style={{ width }}
      data={activityData.map(() => ({
        imgUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1701&q=80',
      }))}
      contentOffset={contentOffset}
      onIndexChange={index => {
        setCurrentIndex(index);
        onChange(activityData.length - 1 - index);
      }}
      renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
        <View style={[
          {width: width - 50},
          itemIndex === 0 && { paddingRight: 20 },
          itemIndex === activityData.length - 1 && { paddingLeft: 20 },
        ]}>
          <View style={styles.imgContainer}>
            <Image style={styles.img} source={{ uri: item.imgUrl }} />
            <View style={styles.numberContainer}>
              <Text style={styles.number}>{activityData.length}/{itemIndex + 1}</Text>
            </View>
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    height: (Dimensions.get('window').height / 2) - 170,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
  },
  img: {
    flex: 1,
    borderRadius: 20,
    width: '100%',
    height: '100%',
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
});
