import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GameScreen } from './screens/GameScreen';
import { ScoreScreen } from './screens/ScoreScreen';
import PlayIcon from 'react-native-vector-icons/Entypo'
import ScoreBoardIcon from 'react-native-vector-icons/Foundation'
import LineIcon from 'react-native-vector-icons/FontAwesome5'
import { colors } from './utils/colors';

enableScreens();

type RootStackParamList = {
    GameScreen: undefined;
    ScoreScreen: undefined;
};

const RootTab = createBottomTabNavigator<RootStackParamList>();

export function SimonSaysApp(): JSX.Element {
    return (
        <NavigationContainer>
            <RootTab.Navigator
                initialRouteName="GameScreen"
                screenOptions={{
                    tabBarLabel: (e) => (
                        e.focused ?
                            <LineIcon
                                style={{ marginTop: -20, paddingBottom: 10 }}
                                name="window-minimize"
                                size={28}
                                color={e.focused ? colors.gray : colors.grayDark}
                            />
                            : null
                    )
                }}
                tabBarOptions={{
                    style: styles.tabBarStyle
                }}
            >
                <RootTab.Screen name="GameScreen" component={GameScreen} options={{
                    tabBarIcon: (e) => (
                        <PlayIcon
                            name="game-controller"
                            size={28}
                            color={e.focused ? colors.gray : colors.grayDark}
                        />
                    )
                }} />
                <RootTab.Screen name="ScoreScreen" component={ScoreScreen} options={{
                    tabBarIcon: (e) => (
                        <ScoreBoardIcon
                            name="results"
                            size={28}
                            color={e.focused ? colors.gray : colors.grayDark}
                        />
                    )
                }} />
            </RootTab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBarStyle: {
        backgroundColor: colors.primaryBlack,
        height: '8%',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        borderColor: colors.gray,
    }
})
