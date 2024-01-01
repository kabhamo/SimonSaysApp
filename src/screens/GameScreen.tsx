import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../utils/colors'
import { ColorBox } from '../components/ColorBox'
import { ProfileNavigationProp } from '../SimonSaysApp';
import { Player } from '@react-native-community/audio-toolkit';

const buttonColors: string[] = ["red", "blue", "green", "yellow"];
const gamePattern: string[] = []; //! maybe a state
let userClickedPattern: string[] = [];
//let level: number = 0;
let started: boolean = false;
const gameOver: string = "Game Over, Press Any Key to Restart"

export const GameScreen: React.FC<ProfileNavigationProp> = ({ navigation }) => {
    const [hide, setHide] = useState<boolean>(true);
    const [level, setLevel] = useState<number>(0);
    const [colorState, setColorState] = useState<string>('');

    //when player click "start the game"
    const startClickHandler = () => {
        //start the game
        nextSequence();
        // show the level
        setHide(false);
    }

    const callBackColorClick = (color: string) => {
        setColorState(prev => prev = color)
        //push the sequqnc to the userClickedPattern
        userClickedPattern.push(color)
        console.log("callBack click ", userClickedPattern)
    }

    //The level up game sequence method
    const nextSequence = () => {
        userClickedPattern = [];
        setLevel(prev => prev + 1);
        const randomNumber: number = Math.floor(Math.random() * 4);
        const randomChosenColour: string = buttonColors[randomNumber];
        gamePattern.push(randomChosenColour);
        console.log(gamePattern)

    }


    //Play sound method
    const playSound = () => {
        const player = new Player(`${colorState}.mp3`).play((error) => console.log(error?.message))
    }


    //When user is clicking on the color boxes
    const colorBoxClickHandler = () => {
        //give me the color
        //update the userClickedPattern with the color clicked
        // play the relevant sound
        //checkAnswer(current level) => init with 0
    }

    const checkAnswer = () => {
        //check if the gamePattern and userClickPattern are equales 
        //at the relevant position by level

        //console.log("success");

        //check if the gamePattern and userClickPattern have the same length
        // so we can go and level up => after 1 sec call nextSequence()

        //else
        //console.log("wrong");
        // playSound('wrong')
        // in 200 meliSec show game over and hide it
        // show game over title

    }





    return (
        <View style={styles.mainContainer}>

            {hide ? null : <View style={styles.levelTextContainer}>
                <Text style={styles.text}>{`Level: ${level}`}</Text>
            </View>}


            <View style={styles.topColorBoxContainer}>
                <ColorBox color='red' callBack={callBackColorClick} gamePattern={gamePattern} setColorState={setColorState} />
                <ColorBox color='blue' callBack={callBackColorClick} gamePattern={gamePattern} />

            </View>
            <View style={styles.bottomColorBoxContainer}>
                <ColorBox color='yellow' callBack={callBackColorClick} gamePattern={gamePattern} />
                <ColorBox color='green' callBack={callBackColorClick} gamePattern={gamePattern} />
            </View>

            <View style={styles.startBtnContainer}>
                { }
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