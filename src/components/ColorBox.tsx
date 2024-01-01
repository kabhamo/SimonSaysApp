import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

type ColorBoxProps = {
    color: string
    callBackClick: (color: string) => void
}

export const ColorBox: React.FC<ColorBoxProps> = ({ color, callBackClick }) => {

    const boxColorClickHandler = (color: string) => callBackClick(color);

    return (
        <View style={[styles.mainContainer, {}]}>
            <TouchableOpacity
                style={{}}
                onPress={() => boxColorClickHandler(color)}>
                <View style={[styles.gameColorsBox, { backgroundColor: color }]}></View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameColorsBox: {
        width: 100,
        height: 100,
    }
})