import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors';

type ScoreScreenProps = {

}
export const ScoreScreen: React.FC<ScoreScreenProps> = ({ }) => {
    return (
        <View style={styles.mainContainer}>
            <Text>ScoreScreen</Text>
            <TouchableOpacity
                style={{}}
                onPress={() => console.log("Fav Article, Navigate to Article")}>
                {/* colorImage */}
                <Text>Button</Text>
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
})