import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../utils/colors'
import { ColorBox } from '../components/ColorBox'
import { ProfileNavigationProp } from '../SimonSaysApp';
import { Player } from '@react-native-community/audio-toolkit';
import { useDispatch } from 'react-redux';
import { setScoreArray } from '../store/score/scoreSlice';

const buttonColors: string[] = ["red", "blue", "green", "yellow"];
let gamePattern: string[] = [];
let userClickedPattern: string[] = [];
const GAME_OVER: string = "Game Over, Press Any Key to Restart";
const WRONG_SOUND: string = 'wrong';

export const GameScreen: React.FC<ProfileNavigationProp> = ({ navigation }) => {
    const [showScore, setShowScore] = useState<boolean>(false);
    const [level, setLevel] = useState<number>(0);
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    const [showGameOver, setShowGameOver] = useState<boolean>(false)
    const dispatch = useDispatch();

    //If the user fails, navigate to the results screen
    //with a popup(use a RN modal) for entering the
    //players name.


    //Starting point logic - like a Main function
    const startClickHandler = () => {
        //start the game
        nextSequence();
        // show the level
        setShowScore(prev => !prev);
        // change start the game state

        setIsGameStarted(prev => !prev)
        // start the gamePattern
    }

    //The level up game sequence method
    const nextSequence = () => {
        userClickedPattern = [];
        setLevel(prev => prev + 1);
        console.log("New level: ", level)
        const randomNumber: number = Math.floor(Math.random() * 4);
        const randomChosenColor: string = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        console.log("gamePattern: ", gamePattern)
        gamePattern.map((item, index) => {
            setTimeout(() => playSound(item), (index + 1) * 500)
            //! add css styles
        })
        console.log("waiting for the user...")
    }

    //User click on a color boxes
    const colorBoxClickHandler = (color: string) => {
        if (isGameStarted) {
            userClickedPattern.push(color);
            playSound(color);
            console.log("userClickPattern: ", userClickedPattern)
            checkAnswer(userClickedPattern.length - 1);
        } else {
            color ? playSound(color) : null;
        }
    }

    const checkAnswer = (currentLevel: number) => {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            console.log("success")
            //Start a new sequence level after 1 sec
            if (gamePattern.length == userClickedPattern.length) {
                console.log("current level: ", level)
                setTimeout(() => {
                    nextSequence()
                }, 1000)
            }
        } else {
            console.log('wrong')
            playSound(WRONG_SOUND);
            //Change the css styles and show try agian botton
            setTimeout(() => {
                setShowGameOver(prev => !prev);
                setIsGameStarted(prev => !prev);
                gameOverHandler()
            }, 200)
        }
    }

    //
    const gameOverHandler = () => {
        console.log("Game Over")
        // change the UI
        // send the gameOver state to colorBoxes so it will be disabled
        //redux storing the score
        dispatch(setScoreArray(level))
        setLevel(0);
        //New game pattern
        gamePattern = [];
        // navigation
    }

    //Play sound method
    const playSound = (color: string) => {
        const player = new Player(`${color}.mp3`);
        player.play((error) => console.log("playSound: ", error?.message))
    }

    return (
        <View style={styles.mainContainer}>

            {/* //! add the score and some styles */}
            {showScore ?
                (<View style={styles.levelTextContainer}>
                    <Text style={styles.text}>{`Level: ${level}`}</Text>
                </View>) : null}


            <View style={styles.topColorBoxContainer}>
                <ColorBox color='red' callBackClick={colorBoxClickHandler} />
                <ColorBox color='blue' callBackClick={colorBoxClickHandler} />

            </View>
            <View style={styles.bottomColorBoxContainer}>
                <ColorBox color='yellow' callBackClick={colorBoxClickHandler} />
                <ColorBox color='green' callBackClick={colorBoxClickHandler} />
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
        //backgroundColor: 'pink',
    },
    levelTextContainer: {
        flex: 0.1,
        //backgroundColor: 'pink',
    },
    text: {
        color: colors.primaryBlue,
        fontSize: 22,
        fontWeight: '600'
    },
})