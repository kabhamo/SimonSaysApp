import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../utils/colors'
import { ColorBox } from '../components/ColorBox'
import { ProfileNavigationProp } from '../SimonSaysApp';

const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern: string[] = ['red', 'blue'];
const userClickedPattern: string[] = [];
let level = 0;
let started = false;

export const GameScreen: React.FC<ProfileNavigationProp> = ({ navigation }) => {
    const [hide, setHide] = useState(true)
    const [level, setLevel] = useState(0)
    const startClickHandler = () => {
        //nextSequence();
        setHide(false)
    }

    const callBackColorClick = (color: string) => {
        //push the sequqnc to the userClickedPattern
        userClickedPattern.push(color)
        console.log("callBack click ", userClickedPattern)
    }

    return (
        <View style={styles.mainContainer}>

            {hide ? null : <View style={styles.levelTextContainer}>
                <Text style={styles.text}>{`Level: ${level}`}</Text>
            </View>}


            <View style={styles.topColorBoxContainer}>
                <ColorBox color='red' callBack={callBackColorClick} gamePattern={gamePattern} />
                <ColorBox color='blue' callBack={callBackColorClick} gamePattern={gamePattern} />

            </View>
            <View style={styles.bottomColorBoxContainer}>
                <ColorBox color='yellow' callBack={callBackColorClick} gamePattern={gamePattern} />
                <ColorBox color='green' callBack={callBackColorClick} gamePattern={gamePattern} />
            </View>

            <View style={styles.startBtnContainer}>
                <TouchableOpacity
                    onPress={() => startClickHandler()}>
                    <Text style={styles.text}>Start The Game</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray
    },
    topColorBoxContainer: {
        flex: 0.1,
        marginHorizontal: '10%',
        flexDirection: 'row',
        marginVertical: '10%',
        //backgroundColor: 'black',
    },
    bottomColorBoxContainer: {
        flex: 0.1,
        marginHorizontal: '10%',
        marginVertical: '10%',
        flexDirection: 'row',
        //backgroundColor: 'pink',
    },
    startBtnContainer: {
        flex: 0.1,
        backgroundColor: 'pink',
    },
    levelTextContainer: {
        flex: 0.1,
        backgroundColor: 'pink',
    },
    text: {
        color: colors.primaryBlue,
        fontSize: 22,
        fontWeight: '600'
    },
})

//$(".btn").click(function(){

//    var userChosenColour = $(this).attr("id");

//    userClickedPattern.push(userChosenColour);

//    playSound(userChosenColour);

//    animatePress(userChosenColour);

//    checkAnswer(userClickedPattern.length-1);
//});