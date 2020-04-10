import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import SideSwipe from 'react-native-sideswipe';

export default function PhrasesActivityCarousel({ onChange }) {
  const activityData = [{
    id: 1,
    question: 'عمر الذهاب إلى المدرسة.اليوم هو يوم الإثنين، يجب على',
  }, {
    id: 2,
    question: 'عمر الذهاب إلى المدرسة.اليوم هو يوم الإثنين، يجب على وتتكلمها بطلاقة ',
  }];
  const { width } = Dimensions.get('window');
  const contentOffset = 0;
  const [currentIndex, setCurrentIndex] = React.useState(activityData.length - 1);

  return (
    <SideSwipe
        contentContainerStyle={styles.swipperContainer}
        index={currentIndex}
        itemWidth={width - 50}
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
                <Text style={styles.questionText}>{item.question}</Text>
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
        minHeight: 70,
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

// <View 
// style={{
// marginTop: 10, 
// backgroundColor: '#FCFDFF',
// borderColor: 'black',
// borderStyle: 'solid',
// borderWidth: 0,
// shadowColor: 'lightgray',
// shadowOpacity: 0.6,
// borderRadius: 15, 
// width: '80%',
// marginRight: 10}}>

// {/* <TouchableOpacity style={{padding: 5}} onPress = {() => {this.handleOnPress(i)}}> */}
//   <View style = {{backgroundColor: '#FCFDFF', 
//     flexDirection: 'row-reverse', flexWrap: 'wrap',
//     marginRight: 10, justifyContent:'flex-start', alignContent: 'space-around'
//   }}>
//       <Text style = {{marginRight: 10, color: '#233665', alignContent: 'flex-end', padding: 7,
//         backgroundColor: '#F7F9FC',
//         fontWeight: 'bold', borderStyle: 'solid', borderRadius: 5, borderWidth: 1,
//         borderColor: '#F7F9FC', overflow: 'hidden', width: 20, height: 30}}
//       >
//         1
//       </Text>
//       <Text style={{marginLeft: 10, color: '#233665', alignContent: 'flex-end',
//           padding: 10, fontWeight: 'bold', alignItems: 'flex-end',
//           flexWrap: 'wrap'}}
//       >
//         One idea that comes to mind that would be worth tinkering around with is measuring the text, dimensions and/or character count, and depending on the size of the image, divide the text into two Text components, one that goes to the right/left and the other that goes below the image.
//       </Text>
//   </View>
// </View> 
