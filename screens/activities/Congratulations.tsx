import React from 'react';
import { Text, View, TouchableOpacity, Button, Image, StyleSheet } from 'react-native';

export default class Congratulations extends React.Component<State> {  
    render() {
        const { unitTitle, unitId, userToken } = this.props.route.params; 
        // const nextActivity = activities.get('video').nextActivity;
        return (
            <View style={{flex: 1, justifyContent:'center', flexDirection: 'column', width: '100%', backgroundColor: '#FCFDFF'}}>
                <View style={styles.imageWrapper}>
                    <Image 
                        style={styles.image}
                        source={require('../../assets/congratulations.png')} 
                        />    
                </View>
                <View style={{ alignItems: 'center'
                        }}>
                    <Text style={{color: '#ffc700', fontSize: 40, fontFamily: 'NeoSansArabicBold'
                        }}>
                        جيد جداً     
                    </Text>
                </View>
                <View style={{ alignItems: 'center'
                        }}>
                    <Text style={{color: '#233665', fontSize: 20, fontFamily: 'NeoSansArabicBold'}}>
                        لقد أتممت الدرس بنجاح
                    </Text>
                </View>    
                <View style={styles.footerContainer}>
                    <View style={styles.footer}>
                        <TouchableOpacity style={{padding: 5, flex: 1, flexDirection: "row",
                            alignItems: 'center', 
                            justifyContent: 'space-around'}}
                            onPress={() => this.props.navigation.push('Lessons', { 
                                unitTitle: unitTitle, 
                                unitId: unitId,
                                userToken: userToken
                            })}
                        >
                            <View style={{padding: 5, flex: 1, flexDirection: "row",
                            alignItems: 'center', 
                            backgroundColor: '#FCFDFF', 
                            justifyContent: 'space-around', fontFamily: 'NeoSansArabicBold'}}>
                                <Text style={styles.footerTitle}>
                                    العودة إلى الدروس   
                                </Text>
                            </View>
                            <View style = {styles.forwardButtonInner}>
                                <Image 
                                    style={styles.forwardImage}
                                    source={require('../../assets/arrow_back-24px.png')} 
                                />
                            </View>
                            
                        </TouchableOpacity>
                        
                        {/* To lessons */}
                    </View>
                </View>   
            </View>
      );
    } 
  }


  const styles = StyleSheet.create({
    image: {
        height: 200,
        // marginTop: '40%',
        // alignContent: 'center',
        // width: 24,
        resizeMode: 'contain',  
    },
    imageWrapper: {        
        marginTop: '30%',
        alignContent: 'center',
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    forwardImage: {
        height: 24,
        width: 14,
        position: 'absolute',
        right: '5%'
    },
    backImage: {
        height: 24,
        width: 24,
    },
    backImageWrapper: {
        color: '#233665', 
        width: 30, 
        height: 30, 
        backgroundColor: '#F7F9FC',
        fontWeight: 'bold', 
        borderStyle: 'solid', 
        borderRadius: 5, 
        borderWidth: 1,
        borderColor: '#F7F9FC', 
        overflow: 'hidden',
        alignItems: 'center',
    },
    backButtonTO: {
        width: 60, 
        height: 30, 
        borderColor: '#F7F9FC', 
        overflow: 'hidden',
        alignItems: 'center',
    },
    backButton: {
        marginTop: 50, 
        color: '#233665', 
        width: 30, 
        height: 30, 
        marginRight: 30,
        backgroundColor: '#F7F9FC',
        fontWeight: 'bold', 
        borderStyle: 'solid', 
        borderRadius: 5, 
        borderWidth: 1,
        borderColor: '#F7F9FC', 
        overflow: 'hidden',
        alignItems: 'center'
    },
    forwardButton: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 10, 
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
        height: 60,
        flexDirection: 'row'
    },
    footerContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 16
    },
    footer: {
        marginTop: 10,
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
        elevation: 3,
        width: '90%',
        shadowColor: 'lightgray',
        marginBottom: 16,
        marginHorizontal: '5%'
    },
    footerTitle: {
        color: '#233665',
        alignContent: 'center',
        padding: 10,
        fontSize: 22,
        fontFamily: 'NeoSansArabicBold'
    },
  });