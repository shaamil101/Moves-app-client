import React, { useState, useEffect } from 'react';
import { TextInput, navigation, StyleSheet, View, Text, Image, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { BackgroundImage } from 'react-native-elements/dist/config';
import useStore from '../../store';
import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';

const JoinMove = ( {navigation} ) => {

  const [number, setNumber] = useState('');

  const [code, setCode] = useState('');
  const [user, setUser] = useState('');
  const setUserSlice = useStore((state) => state.joinMoveSlice.setUser);
  const handleCodeEnter = (event) => {
    setCode(event.nativeEvent.text);
  } 

  const setUserName = (event) => {
    setUser(event.nativeEvent.text);
  }
  // const user = useStore((state) => state.joinMoveSlice.user);
  const joinMove = useStore((state) => state.joinMoveSlice.joinMove);
  const setMoveId = useStore((state) => state.joinMoveSlice.setMoveId);

  const getNumber = async () => {
    try {
      const value = await AsyncStorage.getItem('number');
      if(value !== null) {
        // value previously stored
        return value;
      }
    } catch(e) {
      // error reading value
      console.error('Failed to fetch the data from storage', e);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedNumber = await getNumber();
      setNumber(storedNumber);
    }

    fetchData();
  }, []);
  

  const handleTestCode = async () => {
    if (!code) {
      alert('Please enter a code');
      return;
    }
    
    try {

      if (user != '') {
        setUserSlice(user);
      } else {
        alert('Please enter a name');
      }
      const response = await joinMove(code, user, number);
    
      if (response) {
        setMoveId(response.data.id);
        navigation.navigate('Question');
      }
    } catch (error) {
      alert('Join Move Failed. Try again.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={35} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}> Join a Move </Text>
        <View>
          <Input placeholder='Your name' onChange={setUserName} inputContainerStyle={styles.input} />
        </View>
        <View>
          <Input placeholder='Enter Code' onChange={handleCodeEnter} inputContainerStyle={styles.input} />
        </View>
        <TouchableOpacity onPress={handleTestCode} style={styles.button}> 
            <Text style={styles.button.text}>
              Join Move
            </Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    zIndex:1,
    top: 65,
    left: 5,
    position: 'absolute',
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 30,
    backgroundColor: 'white',
    padding: 3,
    width: 47,
    marginLeft: 10,
  },
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
    marginBottom: 160,
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
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    }
  }
});

export default JoinMove;