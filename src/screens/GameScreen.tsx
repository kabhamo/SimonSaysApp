import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { colors } from '../utils/colors';
import { ColorBox } from '../components/ColorBox';
import { ProfileNavigationProp } from '../SimonSaysApp';
import Sound from 'react-native-sound';
import { useDispatch } from 'react-redux';
import { setScore } from '../store/score/scoreSlice';
import { setGameOverState } from '../store/game/gameSlice';
import SimonSaysButton from '../components/CustomButton';

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
    const [currentColors, setCurrentColors] = useState<string[]>([])
    const dispatch = useDispatch();

    //Starting point logic - like a Main function
    const startClickHandler = () => {
        //start the game logic
        nextSequence();
        // show the level
        setShowScore(prev => !prev);
        // Now every click will be recognized and effect the logic
        setIsGameStarted(prev => !prev);
        // When chaged the scoreScreen will show the modal 
        setShowGameOver(prev => !prev);
        //update the redux so ScoreScreen rerender the changes
        dispatch(setGameOverState(showGameOver));
    }

    //The level up game sequence method
    const nextSequence = () => {
        userClickedPattern = [];
        setLevel(prev => prev + 1);
        const randomNumber: number = Math.floor(Math.random() * 4);
        const randomChosenColor: string = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        setCurrentColors([...gamePattern]) //to treger animation
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
        setShowScore(prev => !prev)
        //share the score with ScoreScreen
        dispatch(setScore(level - 1))
        // share the gameOver state with SCoreScreen
        dispatch(setGameOverState(showGameOver))
        //New game pattern
        setLevel(0);
        gamePattern = [];
        // navigation to ScoreScreen
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

            {showScore ?
                (<View style={styles.levelTextContainer}>
                    <Text style={styles.text}>{`Level: ${level}`}</Text>
                </View>) : null}


            <View style={styles.topColorBoxContainer}>
                <ColorBox color='red' currentColors={currentColors} callBackClick={colorBoxClickHandler} />
                <ColorBox color='blue' currentColors={currentColors} callBackClick={colorBoxClickHandler} />

            </View>
            <View style={styles.bottomColorBoxContainer}>
                <ColorBox color='yellow' currentColors={currentColors} callBackClick={colorBoxClickHandler} />
                <ColorBox color='green' currentColors={currentColors} callBackClick={colorBoxClickHandler} />
            </View>

            <View style={styles.startBtnContainer}>
                <SimonSaysButton title='Play' textColorStyleType={{ color: colors.white }} backgroundColorStyleType={{ backgroundColor: colors.primaryBlue }} onPress={startClickHandler} disable={isGameStarted} />
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
    },
    bottomColorBoxContainer: {
        flex: 0.1,
        marginHorizontal: '10%',
        marginVertical: '10%',
        flexDirection: 'row',
    },
    startBtnContainer: {
        flex: 0.1,
        marginTop: '5%'
    },
    levelTextContainer: {
        flex: 0.1,
    },
    text: {
        color: colors.primaryBlue,
        fontSize: 22,
        fontWeight: '600'
    },
})