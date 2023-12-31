import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors';
import { ProfileNavigationProp } from '../SimonSaysApp';

export const ScoreScreen: React.FC<ProfileNavigationProp> = ({ navigation }) => {
    return (
        <View style={styles.mainContainer}>
            <Text>ScoreScreen</Text>
            <TouchableOpacity
                style={{}}
                onPress={() => navigation.navigate('GameScreen')}>
                {/* colorImage */}
                <Text style={styles.text}>Start A new Game</Text>
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