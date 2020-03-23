import React from 'react';

import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

export default class Units extends React.Component {
    static propTypes = {
        visible: PropTypes.bool
    }

    constructor (props) {
        super(props)
        this.state = {
          selectedIndex: -1,
          buttons: ['Level 1', 'Level 2', 'Level 3']
        }
    }
  
    render() {
        const visible  = this.props.visible;
      return ( visible &&  
        <View style={{padding: 20, display: 'flex', justifyContent: 'space-between'}}>
          <Text>Unit 1</Text>
        </View>
      );
    }  
  }