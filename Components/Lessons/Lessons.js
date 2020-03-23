import React from 'react';

import { Text, View, TouchableOpacity } from 'react-native';

import Units from '../Units/Units';

export default class Lessons extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
          selectedIndex: -1,
          buttons: ['Level 1', 'Level 2', 'Level 3']
        }
        this.updateIndex = this.updateIndex.bind(this)
    }
  
    updateIndex (selectedIndex) {
        this.setState({selectedIndex})
    }
  
    handleOnPress(selectedIndex) {
      this.setState({selectedIndex: selectedIndex,
        buttons: ['Level 1', 'Level 2', 'Level 3']
      });  
    }
    
    renderLevelsList(){
      return this.state.buttons.map((level, i, levelArray) =>
        <View 
          key={i} 
          style={{ height:60, marginTop: 15, justifyContent: 'space-around'}}>

          <TouchableOpacity style={{padding: 10}} onPress = {() => {this.handleOnPress(i)}}>
            <View style = {{backgroundColor: '#FCFDFF', alignItems: 'center', 
                  justifyContent: 'space-around', borderRadius: 15, height: 60, 
                  borderColor: 'black', 
                  borderStyle: 'solid',
                  borderWidth: 0,
                  shadowColor: 'lightgray',
                  shadowOpacity: 0.6,
                  flexDirection: 'row'
                  }}>
              <Text style = {{marginLeft: 70, color: '#233665', alignContent: 'center', display: 'flex', 
              padding: 7, fontWeight: 'bold'}}>{level}</Text>
              <Text style = {{marginLeft: 20, color: '#233665', alignContent: 'flex-end', display: 'flex', padding: 7, marginEnd: 0,
                            backgroundColor: '#F7F9FC',
                            fontWeight: 'bold', borderStyle: 'solid', borderRadius: 5, borderWidth: 1,
                            borderColor: '#F7F9FC', overflow: 'hidden'}}>{i+1}</Text>              
            </View>
          </TouchableOpacity>
          
          <Units visible={this.state.selectedIndex == i }/>
        
        </View>
      )
    }
  
    render() {
      return (
        <View style={{flex: 1, justifyContent:'top', padding: 20, width: '100%'}}>
          {this.renderLevelsList()}
        </View>
      );
    } 
  }