import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'

type CustomModalProps = {
    showModal: boolean
    setInputName: React.Dispatch<React.SetStateAction<string>>
    saveInputNameHandler: () => void
}
//todo modal styles fixes
export const CustomModal: React.FC<CustomModalProps> = ({ showModal, setInputName, saveInputNameHandler }) => {


    return (
        <Modal
            visible={showModal}
            transparent={true}>
            <View style={styles.mainContainer}>
                <View style={styles.modalTitleContainer}>

                    <Text style={styles.text}>Please Inter your name</Text>
                </View>
                <View style={styles.modalInputContainer}>

                    <TextInput
                        style={[styles.inputText, { borderColor: colors.gray }]}
                        autoCapitalize="none"
                        placeholderTextColor="#5A5A89"
                        placeholder={"Your Name"}
                        onChangeText={(input) => setInputName(input)}
                    />
                </View>
                <View style={styles.modalBtnContainer}>

                    <TouchableOpacity
                        onPress={() => saveInputNameHandler()}>
                        <Text style={styles.text}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 0.8,
        marginVertical: '15%',
        backgroundColor: colors.primaryBlackThree,
        justifyContent: 'center', //inside content
        alignItems: 'center', // inside content 
        alignSelf: 'center', // modal position horizontal
        width: '80%',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.grayDark,
    },
    modalTitleContainer: {
        flex: 0.3,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'red'

    },
    modalInputContainer: {
        flex: 0.3,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'blue'
    },
    modalBtnContainer: {
        flex: 0.2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'green'
    },
    text: {
        color: colors.gray,
        fontSize: 22,
        fontWeight: '600'
    },
    inputText: {
        fontSize: 20,
        width: "87%",
        borderWidth: 2,
        borderRadius: 4,
        paddingVertical: 11,
        paddingLeft: 16,
        backgroundColor: "#FFFFFF",
        color: colors.primaryBlackTwo,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Arial',
        fontWeight: '400',
    },

})