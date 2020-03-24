import React from 'react';

import { Text, View, TouchableOpacity } from 'react-native';

import Units from '../../components/units/Units';
import UserLevels from '../../types/UserLevels';

import UserLevelsProvider from '../../providers/UserLevelsProvider';

interface State {
  selectedIndex: Number,
  userLevels: UserLevels
}

export default class Levels extends React.Component<State> {

    constructor (props) {
        super(props)
        this.updateIndex = this.updateIndex.bind(this)
    }

    state: Readonly<State> = {
        selectedIndex: -1,
        userLevels: UserLevelsProvider("1")
    }  
  
    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }
  
    handleOnPress(selectedIndex) {
      const selectedIndexUpdate = this.state.selectedIndex == selectedIndex ? -1 : selectedIndex
      this.setState({selectedIndex: selectedIndexUpdate});  
    }
    
    renderLevelsList(){
      const userLevels = this.state.userLevels;
      return userLevels.userLevelsArray.map((userLevel, i, levelArray) =>
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

          <TouchableOpacity style={{padding: 5}} onPress = {() => {this.handleOnPress(i)}}>
            <View style = {{alignItems: 'center', backgroundColor: '#FCFDFF', 
                  justifyContent: 'space-around', height: 60,
                  flexDirection: 'row'
                  }}>
              <Text style = {{marginLeft: 70, color: '#233665', alignContent: 'center', display: 'flex', 
              padding: 10, fontWeight: 'bold'}}>{userLevel.title}</Text>
              <Text style = {{marginLeft: 20, color: '#233665', alignContent: 'flex-end', display: 'flex', padding: 7, marginEnd: 0,
                            backgroundColor: '#F7F9FC',
                            fontWeight: 'bold', borderStyle: 'solid', borderRadius: 5, borderWidth: 1,
                            borderColor: '#F7F9FC', overflow: 'hidden'}}>{i+1}</Text>              
            </View>
          </TouchableOpacity>
          
          <Units userUnits={userLevel.units} visible={this.state.selectedIndex == i }/>
        
        </View>
      )
    }
  
    render() {
      return (
        <View style={{flex: 1, justifyContent:'top', padding: 10, width: '100%'}}>
          {this.renderLevelsList()}
        </View>
      );
    } 
  }