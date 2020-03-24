import React from 'react';

import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import UserUnit from '../../types/UserUnit';

interface Props {
  visible: boolean,
  userUnits: Array<UserUnit>
}

export default class Units extends React.Component<Props> {

  static defaultProps: Props = {
    visible: false,
    userUnits: Array<UserUnit>()
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({item, index}) => (
    <View style={styles.unitContainer} >
      <View style={styles.imageContainer}>
        <Image style={styles.image}
            source={require('../../assets/family.png')} 
            key={item.title} />
      </View>
      <Text style={styles.text}>{item.title} .{index}</Text>     
    </View>
  );  

  render() {
    const userUnits  = this.props.userUnits;
    const visible  = this.props.visible;
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