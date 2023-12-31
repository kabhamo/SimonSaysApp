import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GameScreen } from './screens/GameScreen';
import { ScoreScreen } from './screens/ScoreScreen';
import PlayIcon from 'react-native-vector-icons/Entypo'
import ScoreBoardIcon from 'react-native-vector-icons/MaterialCommunityIcons'

enableScreens();

type RootStackParamList = {
    GameScreen: undefined;
    ScoreScreen: undefined;
};
//scoreboard

//const RootStack = createNativeStackNavigator<RootStackParamList>();
const RootTab = createBottomTabNavigator<RootStackParamList>();

export function SimonSaysApp(): JSX.Element {
    return (
        <NavigationContainer>
            <RootTab.Navigator
                initialRouteName="GameScreen"
                screenOptions={{

                }}
            >
                <RootTab.Screen name="GameScreen" component={GameScreen} options={{
                    tabBarIcon: (e) => (
                        <PlayIcon
                            name="game-controller"
                            size={28}
                            color={e.focused ? 'red' : 'green'}
                        />
                    )
                }} />
                <RootTab.Screen name="ScoreScreen" component={ScoreScreen} options={{
                    tabBarIcon: (e) => (
                        <ScoreBoardIcon
                            name="scoreboard"
                            size={28}
                            color={e.focused ? 'red' : 'green'}
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
})
