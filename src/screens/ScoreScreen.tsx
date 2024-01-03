import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../utils/colors';
import { ProfileNavigationProp } from '../SimonSaysApp';
import type { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { storeLocalData, getLocalData } from '../utils/asyncStorageService';
import { CustomModal } from '../components/CustomModal';
import { setUserData, updateUserData } from '../store/user/userSlice';
import { UserState } from '../utils/types';
import { setGameOverState } from '../store/game/gameSlice';
import { CustomScrollView } from '../components/CustomScrollView/CustomScrollView';

export const ScoreScreen: React.FC<ProfileNavigationProp> = ({ navigation }) => {
    const currentScore: number = useSelector((state: RootState) => state.scoreReducer.score);
    const gameOverState: boolean = useSelector((state: RootState) => state.gameReducer.isGameOver);
    const gameData: UserState[] = useSelector((state: RootState) => state.userReducer.data);
    const [localData, setLocalData] = useState<UserState[] | undefined>();
    const [showModal, setShowModal] = useState<boolean>(false)
    const [inputName, setInputName] = useState<string>('')
    const dispatch = useDispatch()

    useEffect(() => {
        const storeData = async () => {
            // Make sure not to replace the data with new empty array
            if (currentScore > 0) {
                console.log('Saving new data...')
                await storeLocalData(gameData);
            }
        }
        storeData()
        const getData = async () => {
            const response: UserState[] | undefined = await getLocalData();
            if (response) {
                setLocalData(response)
            }
        }
        getData();
    }, [gameData]);


    useEffect(() => {
        if (gameOverState) {
            dispatch(setGameOverState(false))
            setShowModal(true)
        }
    }, [gameOverState])

    const saveInputNameHandler = async () => {
        if (inputName) {
            //check and update the user redux state
            dispatch(updateUserData(await getLocalDataMethod()))
            //save the data to orgnaized data structure see - (ScoreData type at ./utiles/types)
            dispatch(setUserData({ userName: inputName, score: currentScore }))
            // close the modal
            setShowModal(false)
        }
    }

    const getLocalDataMethod = async () => {
        const response: UserState[] | undefined = await getLocalData();
        return response
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
            </View>

            <View style={styles.scoreListContainer}>
                <CustomScrollView gameData={localData} />
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
        borderColor: '#365486',
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: '#DCF2F1'
    },
    text: {
        color: colors.primaryBlue,
        fontSize: 22,
        fontWeight: '600'
    },
})


//  //retrive the articles from asyncLocalStorage
//  useEffect(() => {
//    async function getData() {
//      // Try fetching articles from API
//      const articles = await getArticles()
//      // If it works, then save to local storage
//      if (articles.length !== 0) {
//        //store the data in local storage
//        await storeLocalData(AsyncLocalStorageKeysType.ArticlesKey, articles)
//      }
//      // FINALLY, return articles from local storage.
//      setArticles(await getLocalData(AsyncLocalStorageKeysType.ArticlesKey))
//    }
//    getData();
//  }, [])