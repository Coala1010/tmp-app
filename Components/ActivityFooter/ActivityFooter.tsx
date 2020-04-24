import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserLessonProvider from '../../providers/UserLessonProvider';
import UserLesson from '../../types/UserLesson';

export default function ActivityFooter({ userLessonId, navigation, leftBtn, toNext, toNextPayload, toNextDisabled }) {

    const nextNavigation = () => {

        if (toNext == 'Lessons') {
            UserLessonProvider(userLessonId, (json) => {
                let userLesson : UserLesson = json;
                if (userLesson.userLessonProgress == 1.0) {
                    navigation.navigate('Congratulations', toNextPayload);
                } else {
                    navigation.navigate(toNext, toNextPayload);
                }
            })
        } else {  
            navigation.push(toNext, toNextPayload);
        }    
    }

    return (
        <View style={styles.footerContainer}>
            <View style={leftBtn ? styles.footerWithLeftBtn : styles.footer}>
                <TouchableOpacity
                    style={{padding: 5}} 
                    onPress={() => nextNavigation()}
                    disabled={toNextDisabled}
                >
                    <View style = {styles.forwardButtonInner}>
                        <Image 
                            style={[toNextDisabled ? styles.disabledForwardImage: styles.forwardImage]}
                            source={require('../../assets/keyboard_arrow_left-24px.png')} 
                        />
                        <Text style={[toNextDisabled ? styles.disabledFooterTitle: styles.footerTitle]}>
                            التــالي
                        </Text>
                    </View>
                </TouchableOpacity>
                {/* Forward */}
            </View>

            {leftBtn ? leftBtn : <View/>
            // (
            //     <View style={styles.backBtnContainer}>
            //         <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            //             <Ionicons name="md-exit" size={32} color="#24395F" />
            //         </TouchableOpacity>
            //     </View>
            // )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    backBtn: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backBtnContainer: {
        marginBottom: 16,
        marginRight: 20,
        borderRadius: 20,
        backgroundColor: 'white',
        height: 70,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    footerContainer: {
        flexDirection: 'row'
    },
    footer: {
        justifyContent: 'space-around',
        backgroundColor: '#FCFDFF',
        borderWidth: 0,
        shadowOpacity: 0.6,
        borderRadius: 16,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        // shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 1,
        width: '90%',
        shadowColor: 'lightgray',
        marginBottom: 16,
        marginHorizontal: '5%'
    },
    footerWithLeftBtn: {
        // marginTop: 10,
        justifyContent: 'space-around',
        backgroundColor: '#FCFDFF',
        borderWidth: 0,
        shadowOpacity: 0.6,
        borderRadius: 16,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        // shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 1,
        width: '69%',
        shadowColor: 'lightgray',
        marginBottom: 16,
        marginHorizontal: '5%'
    },
    disabledFooterTitle: {
        color: 'lightgray',
        alignContent: 'center',
        padding: 10,
        fontFamily: 'NeoSansArabicBold',
        fontSize: 22,
    },
    footerTitle: {
        color: '#233665',
        alignContent: 'center',
        padding: 10,
        fontFamily: 'NeoSansArabicBold',
        fontSize: 22,
    },
    image: {
        height: 24,
        width: 24,
        //resizeMode: 'contain',  
    },
    // backgroundVideo: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     bottom: 0,
    //     right: 0,
    // },
    forwardImage: {
        height: 24,
        width: 14,
        position: 'absolute',
        left: 10
    },
    disabledForwardImage: {
        height: 24,
        width: 14,
        tintColor: '#E3E3E3',
        position: 'absolute',
        left: 10
    },
    forwardButton: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 10,
        marginBottom: 16, 
        justifyContent: 'space-around',
        backgroundColor: '#FCFDFF',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 0,
        shadowColor: 'lightgray',
        shadowOpacity: 0.6,
        borderRadius: 15,
        width: '70%'
    },
    forwardButtonInner: {
        alignItems: 'center', 
        backgroundColor: '#FCFDFF', 
        justifyContent: 'space-around', 
        height: 56,
        flexDirection: 'row'
    },
});
