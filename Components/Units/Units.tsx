import React from 'react';

import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import UserUnit from '../../types/UserUnit';
import {
  NavigationScreenProp
} from 'react-navigation';

import environment from '../../development.json';
import UnitProgress from './UnitProgress';

interface Props {
  visible: boolean,
  userUnits: Array<UserUnit>,
  navigation: NavigationScreenProp<any,any>,
  token: string
}

interface State {
  unitsToDisplay: Array<UserUnit>
}

export default class Units extends React.Component<Props, State> {

  state: Readonly<State> = {
    unitsToDisplay: new Array<UserUnit>()
  } 

  _keyExtractor = (item, index) => item.order.toString();

  _unitTitle = (item, index) => (item.displayIndex + 1) + '. ' + item.title;

  radius : number = 10; 

  componentDidMount = () => {
    let bufferUnit = null;
    let firstUnitIndex = null;
    this.props.userUnits.forEach((element, index) => {
      if (index % 2 == 0) {
        bufferUnit = element;    
        firstUnitIndex = index;    
        bufferUnit.displayIndex = index;
      }
      if (index % 2 == 1) {
        this.state.unitsToDisplay[firstUnitIndex] = element;
        element.displayIndex = index;
        this.state.unitsToDisplay[index] = bufferUnit;        
        bufferUnit.displayIndex = firstUnitIndex;
      }
    });
  }

  _renderItem = ({item, index}) => {
    return (
    <View style={styles.unitContainer} >
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Lessons', { 
          unitTitle: this._unitTitle(item, index), 
          unitId: item.unitId,
          userToken: this.props.token
        })}>
        <View style={styles.imageContainer}>
          <Image style={styles.image}
              source={{ uri: environment.API_URL + '/api/v1/admin/unit/image/' + item.pictureUrl}}
              key={item.title} />
          <View style={styles.progressContainer}>
            {
              item.userUnitProgress > 0 ?
              (
                item.userUnitProgress < 1 ? 
                <UnitProgress percent={item.userUnitProgress * 100} />
                : <Image style={styles.congratsImage} source={require('../../assets/achieved.png')}/>
              ) : <View/>
            }          
          </View>
        </View>
        <Text style={styles.text}>{this._unitTitle(item, index)}</Text>     
      </TouchableOpacity>
    </View>
  );
  }  
  
  render() {
    const userUnits = this.state.unitsToDisplay;
    const visible = this.props.visible;

    return visible &&  
    <View style={styles.container}>
      <FlatList<UserUnit>
        data={userUnits}
        renderItem={this._renderItem}
        numColumns={2}
        keyExtractor={this._keyExtractor}
          />
    </View>;
  }  
}

const styles = StyleSheet.create({
  outerCircle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginTop: 10,
    textAlign: 'center',
    color: '#233665',
    fontSize: 16,
    fontFamily: 'NeoSansArabicBold'
  },
  container: {
    margin: 5,
    padding: 5,
    backgroundColor: '#FCFDFF',
  },
  unitContainer: {
    flex: 0.5, 
    flexDirection: 'column', 
    margin: 2,
    padding: 5,
    backgroundColor: '#FCFDFF'
  },
  imageContainer: { 
    margin: 2,
    padding: 15,
    backgroundColor: '#FCFDFF',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 0,
    shadowColor: 'lightgray',
    shadowOpacity: 0.6,
    borderRadius: 16,
    shadowOffset: {
          width: 0,
          height: 2,
      },
    shadowRadius: 2.22,
    elevation: 3,
    height: 149,
    width: 149,
    justifyContent: 'center'
  },
  image: {
    height: 100,
    width: '100%',
    resizeMode: 'contain',  
  },
  congratsImage: {
    height: 36,
    // width: '100%',
    resizeMode: 'contain',  
  },
  progressContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
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
    fontSize: 16,
    fontFamily: 'NeoSansArabicBold'
},
});