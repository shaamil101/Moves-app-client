import React, { useState } from 'react';
import useStore from '../../store';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PhoneInput from 'react-native-phone-input';
import Ionicons from 'react-native-vector-icons/Ionicons';

function SignIn({ navigation }) {
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const signinUser = useStore(({ authSlice }) => authSlice.signinUser);
    const setPhoneNumber = useStore(({ authSlice }) => authSlice.setPhoneNumber);

    const handleSignIn = async () => {
        if (isValidNumber(number) && password.length > 5) {
            try {
                setIsLoading(true);
                await signinUser({ number, password });
                await AsyncStorage.setItem('number', number);
                setError(null);
            } catch (err) {
                setError('Failed to sign in. Please try again.');
                setIsLoading(false);
            }
        } else {
            setError('Please enter a valid number and a password longer than 5 characters.');
        }
    };

    const isValidNumber = (phoneNumber) => {
        const phoneRegex = /^(?:\+?\d{1,3}[-.\s]?)?(?:\(\d{1,4}\)|\d{1,4})[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
        return phoneRegex.test(phoneNumber);
    };

    return (
        <View style={styles.signIn}>
            <Text style={styles.title}>Moves</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Phone Number:</Text>
                <PhoneInput
                    style={styles.phoneInput}
                    value={number}
                    onChangePhoneNumber={setNumber}
                    initialCountry="us"
                    textProps={{ placeholder: "Enter phone number" }}
                />
                <Text style={styles.label}>Password:</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
                    </TouchableOpacity>
                </View>
                {error && <Text style={styles.errorText}>{error}</Text>}
                <TouchableOpacity
                    style={[styles.button, (isValidNumber(number) && password.length > 5) && !isLoading ? styles.buttonEnabled : styles.buttonDisabled]}
                    onPress={handleSignIn}
                    disabled={!(isValidNumber(number) && password.length > 5) || isLoading}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.signupText}>
                Need an account?{' '}
                <Text style={styles.signupLink} onPress={() => navigation.navigate('SignUp')}>
                    Sign Up
                </Text>
            </Text>
            { isLoading ? 
                <ActivityIndicator style={styles.loading} size="medium" /> : null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    signIn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginBottom: 160,
    },
    title: {
        fontSize: 32,
        fontStyle: 'italic',
        fontWeight: 'bold',
        margin: 24,
    },
    form: {
        width: '100%',
        maxWidth: 400,
        paddingHorizontal: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    phoneInput: {
        width: '100%',
        padding: 10,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        padding: 10,
    },
    eyeIcon: {
        padding: 10,
    },
    button: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonEnabled: {
        backgroundColor: 'black',
    },
    buttonDisabled: {
        backgroundColor: 'lightgray',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
    },
    signupText: {
        marginTop: 16,
        fontSize: 16,
    },
    signupLink: {
        color: 'black',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    loading: {
        position: 'absolute',
        // top: 50, // 50 units from the top
        // left: 50, // 50 units from the left
        // marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default SignIn;
