import * as React from 'react';
import {TextInput, View, Text, Button} from "react-native";
import {sharedStyles} from "./constants";

export const SignInScreen = ({signIn}) => {
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [confirmationPin, setConfirmationPin] = React.useState('');
    const [showConfirmScreen, setShowConfirmScreen] = React.useState(false);

    const submitPhoneNumber = () => {
        setShowConfirmScreen(true);
    }

    const submitPin = () => {
        signIn();
    }

    const cancel = () => {
        setShowConfirmScreen(false);
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
        <Button title={"Submit"} color={"black"} onPress={submitPhoneNumber}/>
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
        <Button title={"Verify"} color={"black"} onPress={submitPin}/>
        <View style={{marginTop: 16}}>
            <Button title={"Cancel"} color={"#8e8f8f"} onPress={cancel}/>
        </View>
    </>

    return showConfirmScreen ? ConfirmNumber : EnterPhoneNumber;
}


const styles = sharedStyles;
