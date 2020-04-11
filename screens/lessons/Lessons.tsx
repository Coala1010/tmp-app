import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import UserLessons from '../../types/UserLessons';
import UserLessonsProvider from '../../providers/UserLessonsProvider';

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
    const { unitId, token } = this.props.route.params; 
    this.setState({unitId : unitId, token: token});
    UserLessonsProvider(token, unitId, (json) => {
      let userLessons : UserLessons = new UserLessons();
      userLessons.userLessonsArray = json;
      this.setState({userLessons : userLessons});
    })
  }
    
  renderLessonsList(){
    const userLessons = this.state.userLessons;
    return userLessons.userLessonsArray.map((userLesson, i, levelArray) =>
      <View 
        key={i} 
        style={{
        marginTop: 10, 
        justifyContent: 'space-around',
        backgroundColor: '#FCFDFF',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 0,
        shadowColor: 'lightgray',
        shadowOpacity: 0.6,
        borderRadius: 15}}>

        <TouchableOpacity style={{padding: 5}} 
        onPress={() => this.props.navigation.navigate('Activities', {
            lessonTitle: userLesson.title, 
            lessonId: userLesson.lessonId,
            userToken: this.state.token})}>
          <View style = {{alignItems: 'center', backgroundColor: '#FCFDFF', 
                justifyContent: 'space-around', height: 60,
                flexDirection: 'row'
                }}>
            <Text style = {{marginLeft: 70, color: '#233665', alignContent: 'center', display: 'flex', 
            padding: 10, fontWeight: 'bold'}}>{userLesson.title}</Text>
            <Text style = {{marginLeft: 20, color: '#233665', alignContent: 'flex-end', display: 'flex', padding: 7, marginEnd: 0,
                          backgroundColor: '#F7F9FC',
                          fontWeight: 'bold', borderStyle: 'solid', borderRadius: 5, borderWidth: 1,
                          borderColor: '#F7F9FC', overflow: 'hidden'}}>{i+1}</Text>              
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
            <View style={{backgroundColor: '#FCFDFF',
                        borderStyle: 'solid', borderWidth: 3,
                        borderColor: '#F7F9F7', height: 100,
                        justifyContent: 'space-around',
                        flexDirection: 'row'}}>
                <Text style={{textAlign: 'center', marginTop: 50, fontWeight: 'bold', color: '#233665', width: '100%',}}>
                  {unitTitle}
                </Text>
                <TouchableOpacity 
                    style={styles.backButton}
                   onPress={() => this.props.navigation.goBack()}>
                  <Image 
                      style={styles.image}
                      source={require('../../assets/arrow_back-24px.png')} 
                  />
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, justifyContent:'flex-start', padding: 10, width: '100%'}}>
            {list}
          </View>
       </View>
      );
    } 
  }


  const styles = StyleSheet.create({
    image: {
      height: 24,
      width: 24,
      //resizeMode: 'contain',  
    },
    backButton: {
      marginTop: 50, 
      color: '#233665', 
      width: 30, 
      height: 30, 
      marginRight: 30,
      backgroundColor: '#F7F9FC',
      fontWeight: 'bold', 
      borderStyle: 'solid', 
      borderRadius: 5, 
      borderWidth: 1,
      borderColor: '#F7F9FC', 
      overflow: 'hidden',
      alignItems: 'center'
    }
  });