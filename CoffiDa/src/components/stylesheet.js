import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    flexContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '1%',
    },

    scrollView: {
        flex: 1,
    },

    textInputLogin : {
        flex: 1,
        margin: '7%',
    },

    textInputSignup: {
        flex: 1,
        margin: '7%',
    },

    textInputLoginFirst: {
        marginTop: '50%',
        flex: 1,
        margin: '7%',
    },

    textInputSignupFirst: {
        flex: 1,
        margin: '7%',
        marginTop: '15%',
    },

    button : {
        borderRadius: 20,
        margin: 30,
    },

    loginButton : {
        marginTop: '15%',
        borderRadius: 20,
        flex: 0,
    },

    signupButton : {
        marginTop: '5%',
        borderRadius: 20,
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