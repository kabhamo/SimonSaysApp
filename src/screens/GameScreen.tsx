import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

type GameScreenProps = {

}
export const GameScreen: React.FC<GameScreenProps> = ({ }) => {
    return (
        <View style={styles.mainContainer}>
            <Text>GameScreenScreen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})