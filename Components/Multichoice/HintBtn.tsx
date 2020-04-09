import React from 'react';
import Tooltip from 'react-native-walkthrough-tooltip';
import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

export default function HintBtn({ hintText }) {
    const [isVisible, setIsVisible] = React.useState(false);

    return (
        <Tooltip
            tooltipStyle={styles.tooltip}
            contentStyle={styles.content}
            arrowSize={{ width: 15, height: 15 }}
            arrowStyle={{ display: 'none' }}
            isVisible={isVisible}
            content={
                <View>
                    <View style={styles.arrow} />
                    <Text style={{ fontSize: 18, color: '#233665' }}>{hintText}</Text>
                </View>
            }
            placement="top"
            onClose={() => setIsVisible(false)}
        >
            <TouchableOpacity style={styles.hintBtn} onPress={() => {
                if (hintText) {
                    setIsVisible(true);
                }
            }}>
                <Image style={styles.img} source={require('./light_bulb.png')} />
            </TouchableOpacity>
        </Tooltip>
    );
}

const styles = StyleSheet.create({
    tooltip: {
        width: Dimensions.get('window').width,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    content: {
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 20,
        fontSize: 18,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible'
    },
    arrow: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 9,
        borderRightWidth: 9,
        borderBottomWidth: 15,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'white',
        position: 'absolute',
        bottom: -35,
        right: 7,
        transform: [{ rotate: '180deg' }],
    },
    img: {
        height: 37,
        width: 30,
    },
    hintBtn: {
        marginBottom: 20,
        marginRight: 20,
        borderRadius: 35,
        backgroundColor: 'white',
        height: 70,
        width: 70,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
