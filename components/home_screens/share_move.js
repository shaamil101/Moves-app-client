import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text, Button, SafeAreaView, TouchableOpacity, Alert, Linking } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Clipboard from 'expo-clipboard';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const ShareMove = ({ navigation }) => {
  const route = useRoute();
  const { joinCode } = route.params;
  const [code] = useState(String(joinCode));

  const copyToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(code);
      Alert.alert('Copied to clipboard', `Code: ${code}`);
    } catch (error) {
      console.log('Error copying to clipboard: ' + error);
    }
  };

  const shareViaMessage = () => {
    const message = `Join my Move using this code: ${code}`;
    const url = `sms:&body=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch((err) => console.error('Error opening iMessage: ', err));
  };

  const handleContinue = () => {
    navigation.navigate('Question');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Share this code to get moving!</Text>
      <View>
        <Text text="test" />
      </View>
      <TouchableOpacity onPress={copyToClipboard} style={styles.button}>
        <Text style={styles.buttonText}>
          {code}
        </Text>
        <FontAwesome6 name="person-running" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={shareViaMessage} style={styles.button}>
        <Text style={styles.buttonText}>
          Share via iMessage
        </Text>
        <FontAwesome6 name="message" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
        <Text style={styles.buttonText}>
          Continue
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 3,
    borderColor: 'black',
    justifySelf: 'center',
    alignSelf: 'center',
    borderRadius: 20,
    padding: 5,
    paddingLeft: 20,
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    }
  },
  container: {
    flex: 1,
    direction: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 20,
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },

  button: {
    borderWidth: 3,
    borderColor: 'black',
    justifySelf: 'center',
    alignSelf: 'center',
    width: 200,
    borderRadius: 20,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  continueButton: {
    borderWidth: 3,
    borderColor: 'black',
    justifySelf: 'center',
    alignSelf: 'center',
    width: 200,
    borderRadius: 20,
    padding: 10,
  }
});

export default ShareMove;
