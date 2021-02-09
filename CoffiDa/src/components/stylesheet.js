import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    flexContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },

    textInputLogin : {
        borderRadius: 20,
        margin: 30,
        marginTop: 100,
        width: 300,
        height: 60,   
    },

    textInputSignup: {
        borderRadius: 20,
        margin: 30,
        marginTop: 30,
        width: 300,
        height: 60,   
    },

    textInputSignupFirst: {
        borderRadius: 20,
        margin: 30,
        marginTop: 60,
        width: 300,
        height: 60,   
    },

    button : {
        borderRadius: 20,
        margin: 30,
    },

    loginButton : {
        borderRadius: 20,
        margin: 30,
        marginTop: 150,
    },

    signupButton : {
        borderRadius: 20,
        margin: 30,
        marginTop: 30,
    },

    buttonContent: {
        width: 300,
        height: 60,   
    },

    box: {
        borderWidth: 1,
        height: 400,
        width: 400,
    }
})