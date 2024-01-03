import { StyleSheet, Text, TouchableOpacity, GestureResponderEvent, Platform } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'

type Props = {
    title: string,
    onPress?: ((event: GestureResponderEvent) => void) | undefined,
    backgroundColorStyleType: { backgroundColor: string },
    textColorStyleType: { color: string }
    disable: boolean
}

const SimonSaysButton = (props: Props) => {

    return (
        <TouchableOpacity
            style={[styles.btn, props.backgroundColorStyleType]}
            onPress={props.onPress}
            disabled={props.disable}>
            <Text style={[styles.text, props.textColorStyleType]}>{props.title}</Text>
        </TouchableOpacity>
    )
}

export default SimonSaysButton

const styles = StyleSheet.create({
    btn: {
        width: '88%',
        textAlign: 'center',
        padding: 12,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: colors.primaryBlue
    },
    text: {
        width: 85,
        height: 20,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Arial',
        fontWeight: "500",
    }
})