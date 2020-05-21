import React from 'react';
import { Alert, Image, Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import Reasons from '../../types/Reasons';
import UserProvider from '../../providers/UserProvider';
import { GetReason, CreateUserReasonToLearn, DeleteReason } from '../../providers/ReasonProvider';
import { IC_CHECK } from '../../utils/Icons';
import environment from '../../development.json';

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

interface State {
  selectedIndex: Array<Number>,
  reasonData: Reasons,
  userId: number
}

export default class Whylearn extends React.Component<State> {
  constructor (props) {
    super(props);
    UserProvider((json) => {
      this.setState({ userId: json.id });      
    });
  }

  state: Readonly<State> = {
    selectedIndex: [],
    reasonData: null,
    userId: null
  }

  getImageUrl(reasonId: number, pictureUrl: string) {
    return environment.API_URL + '/api/v1/app/reasons/' + reasonId + '/image/' + pictureUrl;
  }
  
  componentDidMount() {
    GetReason((json) => {
      let data : Reasons = new Reasons();
      data.reasonOfArabic = json;
      for(let i = 0; i < data.reasonOfArabic.length; i++) {
        data.reasonOfArabic[i]['imageUrl'] = this.getImageUrl(data.reasonOfArabic[i].id, data.reasonOfArabic[i].pictureUrl);
      }
      this.setState({ reasonData : data });
    });
  }

  addReason(reasonId: number, dateOfCreation: Date) {
    let requestData = {
      id: null,
      reasonsToLearnId: reasonId,
      userId: this.state.userId,
      userReasonCreationDate: dateOfCreation
    };
    CreateUserReasonToLearn(requestData, (json) => {
      console.log('CreateUserReasonToLearn');
      console.log(json);
      if(json.error_message) {
        console.log(json.error_message);
      } else {
        let data = this.state.reasonData;
        for(let i = 0; i < data.reasonOfArabic.length; i++) {
          if (data.reasonOfArabic[i].id == reasonId) {
            data.reasonOfArabic[i]['learnId'] = json.id;
            this.setState({ reasonData : data });
            break;
          }
        }
      }
    });
  }

  removeReason(learnId: number) {
    console.log('removeReason');
    console.log(learnId);
    DeleteReason(learnId, (json) => {
      console.log('DeleteReason');
      console.log(json);
      if (json.error_message) {
        console.log(json.error_message);
      } else {
        let data = this.state.reasonData;
        for(let i = 0; i < data.reasonOfArabic.length; i++) {
          if (data.reasonOfArabic[i].learnId == learnId) {
            data.reasonOfArabic[i].learnId = null;
            this.setState({ reasonData : data });
            break;
          }
        }
      }
    });
  }

  render() {
    let { selectedIndex, reasonData } = this.state;

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
          {reasonData && reasonData.reasonOfArabic.map((item, index) => {
            return (
              <TouchableOpacity
                key={item.reasonOrder}
                onPress={() => {
                  let aryIndex = selectedIndex;
                  let pos = aryIndex.indexOf(index);
                  if (pos > -1) {
                    aryIndex.splice(pos, 1);
                    this.removeReason(item.learnId);
                  } else {
                    aryIndex.push(index);
                    this.addReason(item.id, item.dateOfCreation);
                  }
                  this.setState({ selectedIndex : aryIndex });
                }}
                style={styles.answerBtnContainer}>
                <View 
                  style={styles.answerBtnSection}>
                  <Image
                    style={{
                      width: 24,
                      height: 24,
                      opacity: selectedIndex.indexOf(index) > -1 ? 1 : 0, }}
                    resizeMode="contain"
                    source={IC_CHECK} />
                  <View style={{ flexDirection: 'row'}}>
                    <Text style={[styles.answerBtnText, { fontFamily: selectedIndex.indexOf(index) > -1 ? 'NeoSansArabicBold' : 'NeoSansArabic' }]}>
                      {item.reason}
                    </Text>
                    <Image style={{ width: 24, height: 24 }} source={{uri: item.imageUrl}} />
                  </View>
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
                  {text: 'OK', onPress: () => { this.props.navigation.navigate('Levels', {}); }}
                ],
                { cancelable: false }
              );
            }
            else {
              this.props.navigation.navigate('Levels', {});
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
    shadowOpacity: 0.14,
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
    height: 59,
    paddingHorizontal: 16,
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