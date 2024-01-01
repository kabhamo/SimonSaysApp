import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Player } from '@react-native-community/audio-toolkit';

type ColorBoxProps = {
    color: string
    callBack: (color: string) => void //!change it with the setState method
    gamePattern: string[]
    setColorState: () => ()
}

export const ColorBox: React.FC<ColorBoxProps> = ({ color, callBack, gamePattern }) => {
    const btnRef = useRef(null);

    const handler = () => {
        //const player = new Player(`${color}.mp3`).play((error) => console.log(error?.message))
        callBack(color)
    }

    // interval work for sec forEach item in gamePattern
    // play sound of the color
    // change opacity of the box color


    //<View style={[styles.mainContainer, color == 'red' ? { opacity: 0.1 } : {}]}>
    return (
        <View style={[styles.mainContainer, {}]}>
            <TouchableOpacity
                style={{}}
                onPress={() => handler()}>
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