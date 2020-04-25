import * as React from 'react';
import {Text, Button, ActivityIndicator} from "react-native";
import {invite} from "./services";
import {sharedStyles} from "./constants";
import {selectContactPhone} from "react-native-select-contact";

export const InviteScreen = () => {
    const [didInviteSomeone, setDidInviteSomeone] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const invitePhoneNumber = async () => {
        setDidInviteSomeone(false);
        const selection = await selectContactPhone();
        if (!selection) return;
        const phoneNumber = selection.selectedPhone.number
        setIsLoading(true);
        await invite({phoneNumber})
        setIsLoading(false);
        setDidInviteSomeone(true);
    }

    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff"/>;
    }

    return (
        <>
            <Text style={styles.header}>Invite Friends to the Platform!</Text>
            <Text style={styles.body}>Social media platforms are always more fun with friends! We can send a text message
                to your friends to invite them to join you on the platform! Simply select a contact and we'll take care of the rest</Text>
            <Button title={"Pick a contact to invite"} color={"black"} onPress={invitePhoneNumber}/>
            {!!didInviteSomeone && <Text style={styles.body}>An invite has been sent to the selected contact!</Text>}
        </>
    )
}


const styles = sharedStyles;
