import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import { ColorBox } from '../components/ColorBox'

export const GameScreen: React.FC<{}> = () => {
    return (
        <View style={styles.mainContainer}>
            <Text style={styles.text}>Start The Game</Text>
            <View style={styles.topColorBoxContainer}>
                <ColorBox color='red' />
                <ColorBox color='blue' />

            </View>
            <View style={styles.bottomColorBoxContainer}>
                <ColorBox color='yellow' />
                <ColorBox color='green' />
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
    text: {
        color: colors.primaryBlue,
        fontSize: 22,
        fontWeight: '600'
    },
})