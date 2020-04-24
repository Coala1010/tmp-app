import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Tooltip from 'rn-tooltip';

export default function HintBtn({ hintText }) {
    const [adjusted, setAdjusted] = React.useState(false);
    const [height, setHeight] = React.useState(500);

    React.useEffect(() => {
        if (hintText) {
            setHeight(Math.ceil(hintText.length));
            setAdjusted(false);
        }
    }, [hintText]);

    return (
        <View style={{ position: 'relative', top: -10 }}>
            { hintText ?
            <Tooltip
                backgroundColor="transparent"
                overlayColor="rgba(0, 0, 0, 0.3)"
                containerStyle={styles.container}
                width={Dimensions.get('window').width - 10}
                height={height}
                popover={(
                    <View style={styles.tooltipBody}>
                        <View style={styles.arrow} />
                        <Text
                            onLayout={(e) => {
                                if (!adjusted) {
                                    setHeight(e.nativeEvent.layout.height + 40)
                                }
                            }}
                            style={styles.tooltipText}
                        >
                            {hintText}
                        </Text>
                    </View>
                )}
            >
                    <View style={styles.hintBtn}>
                        <Image style={styles.img} source={require('./light_bulb.png')} />
                    </View>
            </Tooltip>:null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        bottom: -10,
        justifyContent: 'flex-end',
        padding: 0,
        width: Dimensions.get('window').width - 40,
    },
    tooltipBody: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        width: Dimensions.get('window').width - 40,
        marginRight: -20,
    },
    tooltipText: {
        fontSize: 18,
        color: '#233665',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 25,
        borderRadius: 20,
        overflow: 'hidden',
    },
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
        bottom: -15,
        right: 25,
        transform: [{ rotate: '180deg' }],
    },
    img: {
        height: 37,
        width: 30,
    },
    hintBtn: {
        position: 'relative',
        paddingTop: -10,
        top: 10,
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
