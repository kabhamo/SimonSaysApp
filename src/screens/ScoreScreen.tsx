import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, SectionList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../utils/colors';
import { ProfileNavigationProp } from '../SimonSaysApp';
import type { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { storeLocalData, getLocalData } from '../utils/asyncStorageService';
import { CustomModal } from '../components/CustomModal';
import { setUserData } from '../store/user/userSlice';
import { UserState } from '../utils/types';

export const ScoreScreen: React.FC<ProfileNavigationProp> = ({ navigation }) => {
    const currentScore: number = useSelector((state: RootState) => state.scoreReducer.score); //! todelete
    const gameOverState: boolean = useSelector((state: RootState) => state.gameReducer.isGameOver);
    const gameData: UserState[] = useSelector((state: RootState) => state.userReducer.data)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [inputName, setInputName] = useState<string>('')
    const dispatch = useDispatch()

    //useEffect(() => {
    //    const storeData = async () => {
    //        // Make sure not to replace the data with new empty array
    //        if (currentScore > 0) {
    //            await storeLocalData(currentScore);
    //        }
    //    }
    //    storeData()
    //}, [scoreArray]);

    console.log(gameData)
    useEffect(() => {
        console.log('gameOverState: ', gameOverState)
        if (gameOverState) {
            setShowModal(true)
        }
    }, [gameOverState])

    const saveInputNameHandler = () => {
        if (inputName) { //! should check the currentScore ?
            console.log("Input Name: ", inputName)
            //save it in redux
            console.log("Adding user: ", inputName, " scored: ", currentScore)
            dispatch(setUserData({ userName: inputName, score: currentScore })) //! dispatch(userName, userScore)
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
                {/*<SectionList
                    sections={gameData}
                    keyExtractor={(item, index) => JSON.stringify(item + index)}
                    renderItem={({ item }) => (
                        <View>
                            {item ? <Text>{item}</Text> : <Text>No data</Text>}
                        </View>
                    )}
                    renderSectionHeader={({ section: { userName, data } }) => (
                        <View>
                            {userName ? <Text>{userName}</Text> : <Text>No data</Text>}
                            {data.map((score) => (
                                <Text>{score}</Text>
                            ))}

                        </View>
                    )}
                />*/}
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
        alignItems: 'flex-start',
        backgroundColor: colors.gray,
        paddingStart: '5%'

    },
    scoreListContainer: {
        flex: 0.9,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingVertical: '5%',
        paddingHorizontal: '5%',
        borderColor: colors.primaryBlack,
        borderWidth: 3,
        borderRadius: 5,
        backgroundColor: colors.primaryBlue
    },
    text: {
        color: colors.primaryBlue,
        fontSize: 22,
        fontWeight: '600'
    },
})