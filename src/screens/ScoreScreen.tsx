import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../utils/colors';
import { ProfileNavigationProp } from '../SimonSaysApp';
import type { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { storeLocalData, getLocalData } from '../utils/asyncStorageService';
import { CustomModal } from '../components/CustomModal';
import { setUserName } from '../store/user/userSlice';

export const ScoreScreen: React.FC<ProfileNavigationProp> = ({ navigation }) => {
    const scoreArray: number[] = useSelector((state: RootState) => state.scoreReducer.scoreArray);
    const gameOverState: boolean = useSelector((state: RootState) => state.gameReducer.isGameOver)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [inputName, setInputName] = useState<string>('')
    const dispatch = useDispatch()

    useEffect(() => {
        const storeData = async () => {
            // Make sure not to replace the data with new empty array
            if (scoreArray.length) {
                await storeLocalData(scoreArray);
            }
        }
        storeData()
    }, [scoreArray]);

    useEffect(() => {
        console.log('gameOverState: ', gameOverState)
        if (gameOverState) {
            setShowModal(true)
        }
    }, [gameOverState])

    const saveInputNameHandler = () => {
        if (inputName) {
            console.log("Input Name: ", inputName)
            //save it in redux
            dispatch(setUserName(inputName))
            console.log('close Modal...')
            setShowModal(false)
        }
    }

    //! to delete just for testing
    const fun = async () => {
        const result = await getLocalData();
        console.log("getLocalData", result)
    }

    return (
        <SafeAreaView style={styles.mainContainer}>

            <View style={styles.navigateBtnContainer}>
                <TouchableOpacity
                    style={{}}
                    onPress={() => navigation.navigate('GameScreen')}>
                    {/* colorImage */}
                    <Text style={styles.text}>Start A new Game</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{}}
                    onPress={() => fun()}>
                    {/* colorImage */}
                    <Text style={styles.text}>getData</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.scoreListContainer}>

            </View>

            <CustomModal showModal={showModal} setInputName={setInputName} saveInputNameHandler={saveInputNameHandler} />
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
    navigateBtnContainer: {
        flex: 0.1,
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'pink',
        paddingStart: '5%'

    },
    scoreListContainer: {
        flex: 0.9,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primaryBlue
    },
    text: {
        color: colors.primaryBlue,
        fontSize: 22,
        fontWeight: '600'
    },
})