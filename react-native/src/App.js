import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    StatusBar,
    PermissionsAndroid,
    View,
    Image,
    Text
} from 'react-native';
import DefaultPreference from 'react-native-default-preference';
import {SignInScreen} from "./sign-in-screen";
import VonageImg from "../assets/vonageHeader.png";
import {InviteScreen} from "./invite-screen";

const AUTH_STORAGE_KEY = 'isAuthed';

const App = () => {
    const [isAuthed, setIsAuthed] = React.useState(false);

    /**
     * Ask permissions to read from contacts
     */
    React.useEffect(() => {
        const askedPermission = PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        );
        askedPermission.then(() => {
        })
    }, []);

    /**
     * Check if user has logged in
     */
    React.useEffect(() => {
        DefaultPreference.get(AUTH_STORAGE_KEY).then(val => {
            if (`${val}` === 'true') {
                setIsAuthed(true);
            }
        });
    }, [])

    const signIn = () => {
        DefaultPreference.set(AUTH_STORAGE_KEY, true).then(val => {
            setIsAuthed(true)
        });
    }

    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>
                <View style={styles.container}>
                    <Image source={VonageImg} style={styles.logo} resizeMode={"contain"}/>
                    <View style={styles.bodyContainer}>
                        {isAuthed ? <InviteScreen/> : <SignInScreen signIn={signIn}/>}
                        <View style={styles.filler}/>
                        <Text style={styles.footerText}>The Vonage logo and name are fully owned by the Vonage company.
                            This app
                            is simply a demo app and does not reflect the company in any manner</Text>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

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

export default App;
