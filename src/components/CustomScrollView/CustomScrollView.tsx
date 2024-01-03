import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { CustomScrollViewProps } from '../../utils/types'
import { RenderItem } from './RenderItem';

export const CustomScrollView: React.FC<CustomScrollViewProps> = ({ gameData }) => {
    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                {gameData ?
                    gameData.map(({ data, userName }, index) => {
                        return <RenderItem key={index} data={data} userName={userName} index={index} />
                    })
                    : <Text>No Data Yet</Text>}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
    },
})