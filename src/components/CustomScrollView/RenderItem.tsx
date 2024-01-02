import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

type RenderItemProps = {

}
export const RenderItem: React.FC<RenderItemProps> = ({ }) => {
    return (
        <View style={styles.mainContainer}>
            <Text>RenderItemScreen</Text>
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