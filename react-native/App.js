import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Button,
    StatusBar,
    PermissionsAndroid,
    View,
} from 'react-native';
import {selectContactPhone} from 'react-native-select-contact';
import DefaultPreference from 'react-native-default-preference';

const AUTH_STORAGE_KEY = 'isAuthed';

const AuthScreen = () => {
    return (
        <View>
            <Text>Hello</Text>
        </View>
    )
}

const IsAuthedScreen = () => {
    return (
        <View style={styles.button}>
            <Button
                onPress={() => {
                    selectContactPhone().then(selection => {
                        console.log('selection', selection)
                    })
                }}
                title={"Pick a contact to invite"}/>
        </View>
    )
}

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

            }
        });

    }, [])

    return (
        <>
            <StatusBar barStyle="dark-content"/>
            <SafeAreaView>
                {isAuthed ? <IsAuthedScreen/> : <AuthScreen/>}
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        marginTop: 150
    }
});

export default App;
