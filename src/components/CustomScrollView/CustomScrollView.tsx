import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { CustomScrollViewProps } from '../../utils/types'

export const CustomScrollView: React.FC<CustomScrollViewProps> = ({ gameData }) => {
    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                {gameData.map(({ data, userName }, index) => {
                    return (
                        <View key={index}>
                            <Text>{userName}</Text>
                            {data.map((score, index) => (
                                <Text key={index}>{score}</Text>
                            ))}
                        </View>
                    );
                })}
            </ScrollView>
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