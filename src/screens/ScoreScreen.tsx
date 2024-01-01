import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../utils/colors';
import { ProfileNavigationProp } from '../SimonSaysApp';
import type { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { storeLocalData, getLocalData } from '../utils/asyncStorageService';

export const ScoreScreen: React.FC<ProfileNavigationProp> = ({ navigation }) => {
    const scoreArray: number[] = useSelector((state: RootState) => state.scoreReducer.scoreArray);
    const [showModal, setShowModal] = useState<boolean>(false)

    useEffect(() => {
        const storeData = async () => {
            // Make sure not to replace the data with new empty array
            if (scoreArray.length) {
                await storeLocalData(scoreArray);
            }
        }
        storeData()
    }, [scoreArray]);

    const fun = async () => {
        const result = await getLocalData();
        console.log("getLocalData", result)
        setShowModal(prev => !prev)
    }

    return (
        <View style={styles.mainContainer}>
            <Text>ScoreScreen</Text>
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
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.gray
    },
    text: {
        color: colors.primaryBlue,
        fontSize: 22,
        fontWeight: '600'
    },
})