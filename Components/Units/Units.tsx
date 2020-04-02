import React from 'react';

import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import UserUnit from '../../types/UserUnit';
import {
  NavigationScreenProp
} from 'react-navigation';

interface Props {
  visible: boolean,
  userUnits: Array<UserUnit>
  navigation: NavigationScreenProp<any,any>;
}

export default class Units extends React.Component<Props> {

  _keyExtractor = (item, index) => index.toString();

  _unitTitle = (item, index) => item.title + ' .' + (index+1);

  _renderItem = ({item, index}) => {
    return (
    <View style={styles.unitContainer} >
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Lessons', { unitTitle: this._unitTitle(item, index), unitId: item.unitId})}>
        <View style={styles.imageContainer}>
          <Image style={styles.image}
              source={require('../../assets/family.png')} 
              key={item.title} />
        </View>
        <Text style={styles.text}>{this._unitTitle(item, index)}</Text>     
      </TouchableOpacity>
    </View>
  );
  }  
  
  render() {
    const userUnits = this.props.userUnits;
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
  text: {
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Arial',
    color: '#233665',
    fontWeight: 'bold',
  },
  container: {
    margin: 5,
    padding: 5,
    backgroundColor: '#FCFDFF',
  },
  unitContainer: {
    flex: 1, 
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
    borderRadius: 15,
  },
  image: {
    height: 100,
    width: '100%',
    resizeMode: 'contain',  
  }
});