import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'

type ColorBoxProps = {
    color: string
    currentColor: string[]
    callBackClick: (color: string) => void
}

export const ColorBox: React.FC<ColorBoxProps> = ({ color, currentColor, callBackClick }) => {

    const [test, setTest] = useState<boolean>(false)
    const boxColorClickHandler = (color: string) => callBackClick(color);

    const click = {
        opacity: 0.5
    }
    const unClick = {
        opacity: 1
    }
    useEffect(() => {
        //console.log(currentColor.at(currentColor.length - 1))
        currentColor.map((colorItem, index) => {
            if (color === colorItem) {
                console.log('Animation')
                setTimeout(() => setTest(true), (index + 1) * 500)
                setTimeout(() => setTest(false), (index + 1) * 650)
            }
        })
    }, [currentColor.length])


    return (
        <View style={[styles.mainContainer, test ? click : unClick]}>
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
        width: 130,
        height: 130,
        borderWidth: 3,
        borderRadius: 5,
        borderColor: '#7077A1'
    }
})