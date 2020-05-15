import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';


export default function ActivityHeader({ navigation, currentActivityName, route }) {
    
    const backToLessons = () =>{        
        navigation.push('Activities', { 
            userGroupId: nextActivity.userGroupId,
            lessonTitle: nextActivity.lessonTitle,
            lessonId: nextActivity.lessonId,
            userToken: nextActivity.userToken,
            unitTitle: nextActivity.unitTitle,
            unitId: nextActivity.unitId,
            activities: activities
        });
    };

    const { lessonTitle, activities } = route.params;
    const nextActivity = activities.get(currentActivityName).nextActivity;

    return (
        <View style={{
            backgroundColor: '#FCFDFF',
            shadowColor: 'lightgray',
            shadowOpacity: 0.6,
            elevation: 3, 
            height: 80,
            justifyContent: 'center',
            flexDirection: 'row'
        }}>
            <Text style={styles.lessonTitleText}>
                {lessonTitle}
            </Text>
            <TouchableOpacity 
                style={styles.backButton}
                //onPress={() => navigation.goBack()}
                onPress={() => backToLessons()}
                >
                <Image 
                    style={styles.backImage}
                    source={require('../../assets/arrow_back-24px.png')} 
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    lessonTitleText: {
        textAlign: 'center', 
        marginTop: 34, 
        color: '#233665', 
        width: '100%', 
        fontSize: 20, 
        fontFamily: 'NeoSansArabicBold'
    },
    backImage: {
        height: 24,
        width: 15,
    },
    backButton: {
        position: 'absolute',
        top: 34,
        right: 23, 
        color: '#233665', 
        width: 30, 
        height: 30, 
        backgroundColor: '#F7F9FC',
        borderStyle: 'solid', 
        borderRadius: 5, 
        borderWidth: 1,
        borderColor: '#F7F9FC', 
        overflow: 'hidden',
        alignItems: 'center'
    }
});
