import * as React from 'react';
import {Image, StyleSheet, TextInput, View, Text, Button} from "react-native";
import VonageImg from "./assets/vonageHeader.png";

export const SignInScreen = () => {
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [confirmationPin, setConfirmationPin] = React.useState('');
    const [showConfirmScreen, setShowConfirmScreen] = React.useState(false);

    const submitPhoneNumber = () => {
        setShowConfirmScreen(true);
    }

    const EnterPhoneNumber = <>
        <Text style={styles.header}>Enter Your Phone Number</Text>
        <Text style={styles.body}>In order to sign up for an account, we use your phone number to verify that
            your account is real. Once you've signed up, we allow you to invite friends to sign up.</Text>
        <TextInput
            placeholder={"Phone #"}
            keyboardType={"phone-pad"}
            onChangeText={text => setPhoneNumber(text)}
            value={phoneNumber}
            style={styles.textInput}
        />
        <Button title={"Submit"} onPress={submitPhoneNumber}/>
    </>

    const ConfirmNumber = <>
        <Text style={styles.header}>Enter Your Confirmation Pin</Text>
        <Text style={styles.body}>We've sent a text to {phoneNumber}! Please check your mobile device to verify your
            account</Text>
        <TextInput
            placeholder={"Confirmation Pin"}
            keyboardType={"number-pad"}
            onChangeText={text => setConfirmationPin(text)}
            value={confirmationPin}
            style={styles.textInput}
        />
        <Button title={"Verify"}/>
    </>

    return (
        <View style={styles.container}>
            <Image source={VonageImg} style={styles.logo} resizeMode={"contain"}/>
            <View style={styles.bodyContainer}>
                {showConfirmScreen ? ConfirmNumber : EnterPhoneNumber}
                <View style={styles.filler}/>
                <Text style={styles.footerText}>The Vonage logo and name are fully owned by the Vonage company. This app
                    is simply a demo app and does not reflect the company in any manner</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '100%',
        padding: 16,
        display: 'flex',
        flexDirection: 'column'
    },
    logo: {
        height: 40,
        width: 153,
        marginBottom: 16,
    },
    bodyContainer: {
        backgroundColor: '#f3f3f5',
        borderRadius: 6,
        padding: 16,
        flexGrow: 1,
    },
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
    filler: {
        flexGrow: 1,
    },
    footerText: {
        fontSize: 14,
        alignSelf: 'center',
        textAlign: 'center',
        color: 'rgba(0,0,0,0.3)'
    }
});
