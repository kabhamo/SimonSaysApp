import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../utils/colors';
import { ColorBox } from '../components/ColorBox';
import { ProfileNavigationProp } from '../SimonSaysApp';
import Sound from 'react-native-sound';
import { useDispatch } from 'react-redux';
import { setScore } from '../store/score/scoreSlice';
import { setGameOverState } from '../store/game/gameSlice';

const buttonColors: string[] = ["red", "blue", "green", "yellow"];
let gamePattern: string[] = [];
let userClickedPattern: string[] = [];
const WRONG_SOUND: string = 'wrong';
Sound.setCategory('Playback');

export const GameScreen: React.FC<ProfileNavigationProp> = ({ navigation }) => {
    const [showScore, setShowScore] = useState<boolean>(false);
    const [level, setLevel] = useState<number>(-1);
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    const [showGameOver, setShowGameOver] = useState<boolean>(false)
    const [currentColor, setCuurrentColor] = useState<string[]>([])
    const dispatch = useDispatch();

    //Starting point logic - like a Main function
    const startClickHandler = () => {
        //start the game
        nextSequence();
        // show the level
        setShowScore(prev => !prev);
        // change start the game state
        setIsGameStarted(prev => !prev)
        setShowGameOver(prev => !prev)
        //update the redux
        dispatch(setGameOverState(showGameOver))
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
        setCuurrentColor([...gamePattern]) //to treger animation
        console.log("gamePattern: ", gamePattern)
        gamePattern.map((item, index) => {
            setTimeout(() => {
                playSound(item)
            }, (index + 1) * 500)
        })
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
        setShowScore(prev => !prev)
        // change the UI
        // send the gameOver state to colorBoxes so it will be disabled
        //redux storing the score
        dispatch(setScore(level)) //! we may need to delete the scoreArraySlice
        //dispatch(setUserData({ score: level }))
        dispatch(setGameOverState(showGameOver))
        //New game pattern
        setLevel(0);
        gamePattern = [];
        // navigation
        navigation.navigate('ScoreScreen')
    }

    //Play sound method
    const playSound = (color: string) => {
        let player = new Sound(`${color}.mp3`, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
            player.play((msg) => console.log("playSound: ", msg))
        });
    }

    return (
        <SafeAreaView style={styles.mainContainer}>

            {/* //! add the score and some styles */}
            {showScore ?
                (<View style={styles.levelTextContainer}>
                    <Text style={styles.text}>{`Level: ${level}`}</Text>
                </View>) : null}


            <View style={styles.topColorBoxContainer}>
                <ColorBox color='red' currentColor={currentColor} callBackClick={colorBoxClickHandler} />
                <ColorBox color='blue' currentColor={currentColor} callBackClick={colorBoxClickHandler} />

            </View>
            <View style={styles.bottomColorBoxContainer}>
                <ColorBox color='yellow' currentColor={currentColor} callBackClick={colorBoxClickHandler} />
                <ColorBox color='green' currentColor={currentColor} callBackClick={colorBoxClickHandler} />
            </View>

            <View style={styles.startBtnContainer}>
                <TouchableOpacity
                    onPress={() => startClickHandler()}>
                    <Text style={styles.text}>Start The Game</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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