import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

type ScoreScreenProps = {

}
export const ScoreScreen: React.FC<ScoreScreenProps> = ({ }) => {
    return (
        <View style={styles.mainContainer}>
            <Text>ScoreScreen</Text>
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