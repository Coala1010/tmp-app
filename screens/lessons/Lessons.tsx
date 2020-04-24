import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar } from 'react-native';
import UserLessons from '../../types/UserLessons';
import UserLessonsProvider from '../../providers/UserLessonsProvider';
import CircularProgress from '../../Components/CircularProgress/CircularProgress';

interface Props {
}

interface State {
  selectedIndex: Number,
  userLessons: UserLessons,
  unitId: Number,
  token: string
}

export default class Lessons extends React.Component<Props, State> {
  
  state: Readonly<State> = {
      selectedIndex: -1,
      userLessons: null,
      unitId: null,
      token: null
  } 
 
  constructor (props) {
    super(props);
  } 

  componentDidMount() {
    const { unitId, userToken } = this.props.route.params; 
    this.setState({unitId : unitId, token: userToken});
    UserLessonsProvider(userToken, unitId, (json) => {
      let userLessons : UserLessons = new UserLessons();
      userLessons.userLessonsArray = json;
      this.setState({userLessons : userLessons});
    })
  }
    
  renderLessonsList(){
    const userLessons = this.state.userLessons;
    const { unitTitle } = this.props.route.params; 
    return userLessons.userLessonsArray.map((userLesson, i, levelArray) =>
      <View 
        key={i} 
        style={styles.lesson}>

        <TouchableOpacity style={{padding: 5}} 
        onPress={() => this.props.navigation.push('Activities', {
            lessonTitle: userLesson.title, 
            lessonId: userLesson.lessonId,
            userToken: this.state.token,
            unitId: this.state.unitId,
            unitTitle: unitTitle
            })}>
          <View style = {{alignItems: 'center', backgroundColor: '#FCFDFF', 
                justifyContent: 'center', height: 60,
                flexDirection: 'row'
                }}>
            <View style={styles.progressContainer}>
                {
                  userLesson.userLessonProgress > 0 ?
                  (
                    userLesson.userLessonProgress < 1 ? 
                  <CircularProgress percent={userLesson.userLessonProgress * 100} />
                  : <Image style={styles.congratsImage} source={require('../../assets/achieved.png')} />
                  ) : <View/>
                }          
              </View>       
            <Text style = {{color: '#233665', alignContent: 'center', display: 'flex', 
            padding: 10, fontSize: 20, fontFamily: 'NeoSansArabicBold'}}>{userLesson.title}</Text>
            <View style = {styles.lessonNumberWrapper}>
              <Text style = {styles.lessonNumber}>{i+1}</Text>              
            </View>
          </View>
        </TouchableOpacity>
        
      </View>
    )
  }
  
  render() {
    const { unitTitle } = this.props.route.params; 
    const userLessons = this.state.userLessons;
    let list;
    if (userLessons && userLessons.userLessonsArray) {
        list = this.renderLessonsList();
    }
      return (
        // <View style={{flex: 1, justifyContent:'flex-start', width: '100%', backgroundColor: '#FCFDFF'}}>
          <View style={{flex: 1, justifyContent:'flex-start', width: '100%', backgroundColor: '#FCFDFF'}}>
            <StatusBar
          barStyle="dark-content"
          backgroundColor="white"
          translucent/>
            <View style={{backgroundColor: '#FCFDFF',
                        borderStyle: 'solid', borderWidth: 3,
                        borderColor: '#F7F9F7', height: 80,
                        justifyContent: 'center',
                        flexDirection: 'row',
                        alignItems: 'center'}}>
                <Text style={styles.unitTitle}>
                  {unitTitle}
                </Text>
                <TouchableOpacity 
                    style={styles.backButton}
                   onPress={() => this.props.navigation.navigate('Home')}>
                  <Image 
                      style={styles.image}
                      source={require('../../assets/arrow_back-24px.png')} 
                  />
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, justifyContent:'flex-start', padding: 10, width: '100%'}}>
              <ScrollView 
                scrollEventThrottle={50} 
              >
                {list}
              </ScrollView>
          </View>
       </View>
      );
    } 
  }


  const styles = StyleSheet.create({
    lessonNumber: {
      fontSize: 20, 
      color: '#233665', 
      fontFamily: 'NeoSansArabicBold'
    },
    lessonNumberWrapper: {
      height: 36,
      width: 36,
      alignContent: 'center', 
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex', 
      backgroundColor: '#F7F9FC',
      borderStyle: 'solid', 
      borderRadius: 5, 
      borderWidth: 1,
      borderColor: '#F7F9FC', 
      overflow: 'hidden', 
      position: 'absolute',
      right: 10
  },
    unitTitle: {
      textAlign: 'center', 
      marginTop: 26, 
      color: '#233665', 
      width: '100%', 
      fontSize: 20,
      fontFamily: 'NeoSansArabicBold',
    },
    image: {
      height: 24,
      width: 24,
      //resizeMode: 'contain',  
    },
    backButton: {
      position: 'absolute', 
      bottom: 10, 
      right: 23,
      color: '#233665', 
      width: 30, 
      height: 30, 
      backgroundColor: '#F7F9FC',
      fontWeight: 'bold', 
      borderStyle: 'solid', 
      borderRadius: 5, 
      borderWidth: 1,
      borderColor: '#F7F9FC', 
      overflow: 'hidden',
      alignItems: 'center'
    },
    lesson: {
      width: '95%',
      margin: 10,
      justifyContent: 'space-around',
      backgroundColor: '#FCFDFF',
      borderColor: 'black',
      borderStyle: 'solid',
      borderWidth: 0,
      shadowColor: 'lightgray',
      shadowOpacity: 0.6,
      borderRadius: 16,
      // shadowColor: "#000",
      shadowOffset: {
            width: 0,
            height: 2,
        },
      // shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    progressContainer: {
      position: 'absolute',
      left: 17,
      justifyContent: 'center',
      flexDirection: 'row',
    },
    congratsImage: {
      height: 36,
      width: 32,
      resizeMode: 'contain', 
    },
  }
);