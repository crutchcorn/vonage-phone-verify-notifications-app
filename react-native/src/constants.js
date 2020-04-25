import {StyleSheet} from "react-native";

export const SERVER_BASE = 'http://c9167a83.ngrok.io'

export const sharedStyles  = StyleSheet.create({
    textInput: {
        borderWidth: 1,
        borderColor: '#c2c4cc',
        backgroundColor: '#e1e2e6',
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    header: {
        fontSize: 22,
    },
    body: {
        marginTop: 8,
        marginBottom: 16,
        fontSize: 16,
        lineHeight: 22,
        color: 'rgba(0,0,0,0.4)'
    },
});
