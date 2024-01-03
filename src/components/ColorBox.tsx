import { View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'

type ColorBoxProps = {
    color: string
    currentColors: string[]
    callBackClick: (color: string) => void
}

export const ColorBox: React.FC<ColorBoxProps> = ({ color, currentColors, callBackClick }) => {

    const [animation, setAnimation] = useState<boolean>(false)
    const boxColorClickHandler = (color: string) => callBackClick(color);

    useEffect(() => {
        //console.log(currentColor.at(currentColor.length - 1))
        currentColors.map((colorItem, index) => {
            if (color === colorItem) {
                console.log('Animation')
                setTimeout(() => setAnimation(true), (index + 1) * 500)
                setTimeout(() => setAnimation(false), (index + 1) * 650)
            }
        })
    }, [currentColors.length])


    return (
        <View style={[styles.mainContainer, animation ? { opacity: 0.5 } : { opacity: 1 }]}>
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