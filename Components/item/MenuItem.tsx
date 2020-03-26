import {React} from 'react';

import { Text, View, TouchableOpacity } from 'react-native';

import Units from '../../components/units/Units';
import UserLevels from '../../types/UserLevels';

import UserLevelsProvider from '../../providers/UserLevelsProvider';

interface Props {
    onPress;
}

export default class MenuItem extends React.Component<Props> {

    static defaultProps: Props = {
        onPress: null
    }  

    
    render(){
      const userLevels = this.state.userLevels;
      return (
        <TouchableOpacity style={{padding: 5}} onPress = {() => {this.onPress}}>
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
      );  
    }
  }