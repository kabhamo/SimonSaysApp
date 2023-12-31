import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Player, MediaStates } from '@react-native-community/audio-toolkit';

type ColorBoxProps = {
    color: string
}

const PATH = "blue.mp3";

export const ColorBox: React.FC<ColorBoxProps> = ({ color }) => {

    const handler = () => {
        const player = new Player(PATH).play((result) => console.log(result))
    }

    return (
        <View style={styles.mainContainer}>
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

//this.player = new Player(filename, {
//    autoDestroy: false
//  }).prepare((err) => {
//    if (err) {
//      console.log('error at _reloadPlayer():');
//      console.log(err);
//    } else {
//      this.player.looping = this.state.loopButtonStatus;
//    }