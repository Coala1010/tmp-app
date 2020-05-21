import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

interface State {
  selectedIndex: Array<Number>,
  userToken: string
}

const answerData = [
  {
    text: '🤓 الثقافة والمرح',
  },
  {
    text: '📚 التعليم',
  },
  {
    text: '🕋 الغرض الديني',
  },
  {
    text: '✈️ السفر',
  },
  {
    text: '💼 غرض العمل',
  },
  {
    text: '🧠 تدريب الدماغ',
  },
  {
    text: '🧐 أغراض أخرى',
  },
];

export default class Whylearn extends React.Component<State> {
  constructor (props) {
    super(props);
  }

  state: Readonly<State> = {
    selectedIndex: [],
    userToken: null
  } 
  
  componentDidMount() {
  }

  render() {
    let { selectedIndex } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.titleSection}>
          <Text style={styles.screenTitle}>
            لماذا تريد أن تتعلم اللغة العربية؟
          </Text>
        </View>
        <ScrollView
          scrollEventThrottle={50}
          style={styles.answerSection}
          contentContainerStyle={styles.answerContentContainer}>
          {answerData.map((item, index) => {
            return (
              <TouchableOpacity
                key={item.text}
                onPress={() => {
                  let aryIndex = selectedIndex;
                  let pos = aryIndex.indexOf(index);
                  if (pos > -1) {
                    aryIndex.splice(pos, 1);
                  } else {
                    aryIndex.push(index);
                  }
                  this.setState({ selectedIndex : aryIndex });
                }}
                style={styles.answerBtnContainer}>
                <View 
                  key={item.text} 
                  style={styles.answerBtnSection}>
                  <FeatherIcon name="check" size={24} style={[styles.answerBtnCheck, { opacity: selectedIndex.indexOf(index) > -1 ? 1 : 0}]} />
                  <Text style={[styles.answerBtnText, { fontFamily: selectedIndex.indexOf(index) > -1 ? 'NeoSansArabicBold' : 'NeoSansArabic' }]}>
                    {item.text}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <TouchableOpacity
          onPress={() => {
            if (selectedIndex.length == 0) {
              Alert.alert(
                'Notice',
                'Show Login page',
                [
                  {text: 'OK', onPress: () => { console.log('Show Login page'); }}
                ],
                { cancelable: false }
              );
            }
            else {
              Alert.alert(
                'Notice',
                'Why are you learning Arabic?',
                [
                  {text: 'OK', onPress: () => { console.log('Why are you learning Arabic?'); }}
                ],
                { cancelable: false }
              );
            }
          }}
          style={styles.bottomBtnContainer}>
          <View style={styles.bottomBtnSection}>
            <View style={[styles.bottomBtnIcon, { paddingLeft: 10, paddingTop: 4 }]}>
              <AntDesignIcon name='left' color='#fcfdff' size={20} />
            </View>
            <View style={styles.bottomBtnTextSection}>
              <Text style={styles.bottomBtnText}>
                {selectedIndex.length == 0 ? 'تسجيل الدخول' : 'التالي'}
              </Text>
            </View>
            <View style={styles.bottomBtnIcon} />
          </View>
        </TouchableOpacity>
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    width: '100%',
    backgroundColor: 'white',
  },
  titleSection: {
    shadowColor: 'lightgray',
    shadowOpacity: 0.6,
    elevation: 3,
    borderColor: '#F7F9F7',
    marginTop: 50,
    marginBottom: 20,
    justifyContent: 'center',
    flexDirection: 'row-reverse',
  },
  screenTitle: {
    width: '90%',
    textAlign: 'right', 
    color: '#233665', 
    fontSize: 20,
    fontFamily: 'NeoSansArabic',
  },
  answerSection: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    marginBottom: 20,
  },
  answerContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerBtnContainer: {
    width: '90%',
    shadowColor: '#233665',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.20,
    shadowRadius: 4,
    elevation: 6,
    marginVertical: 10,
  },
  answerBtnSection: {
    backgroundColor: '#fcfdff',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
  },
  answerBtnCheck: {
    color: '#368496',
    marginLeft: 16,
  },
  answerBtnText: {
    color: '#233665',
    textAlign: 'right',
    fontSize: 20,
    marginRight: 10,
  },
  bottomBtnContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    position: 'absolute',
    bottom: 14
  },
  bottomBtnSection: {
    flex: 1,
    backgroundColor: '#233665',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  bottomBtnIcon: {
    flex: 1,
  },
  bottomBtnTextSection: {
    flex: 2,
  },
  bottomBtnText: {
    paddingTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'NeoSansArabicBold',
    color: '#fcfdff',
    textAlign: 'center',
  },
});