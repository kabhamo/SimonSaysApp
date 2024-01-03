import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../../utils/colors'

type RenderItemProps = {
    data: number[]
    userName: string
    index: number
}
export const RenderItem: React.FC<RenderItemProps> = ({ data, userName, index }) => {
    return (
        userName ? <View style={styles.mainContainer}>
            <View>
                <Text style={styles.titleText}>Player Name: {userName}</Text>
                {data.map((score, index) => (
                    <Text style={styles.scoreText} key={index}>{score}</Text>
                ))}
            </View>
        </View> : <></>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 5,
        backgroundColor: colors.renderItem,
        marginVertical: '1%'
    },
    titleText: {
        color: colors.primaryBlue,
        fontSize: 22,
        fontWeight: '600'
    },
    scoreText: {
        color: colors.primaryBlue,
        fontSize: 20,
        fontWeight: '500',
        marginHorizontal: '3%',
        marginVertical: '0.5%'
    }
})