import React, { useState } from 'react';
import { navigation, StyleSheet, View, Text, Image, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { BackgroundImage } from 'react-native-elements/dist/config';
import useStore from '../../store';

const Welcome = ( {navigation} ) => {

    // const [user, setUser] = useState('');
    // const setUserSlice = useStore((state) => state.joinMoveSlice.setUser);
    // const setCreateSlice = useStore((state) => state.createMoveSlice.setCreator);

    // const handleSetUser = (event) => {
    //   setUser(event.nativeEvent.text);
    // }

    const handleCreateMove = () => {
      navigation.navigate('Name Move');
      // if (user != '') {
      //   setUserSlice(user);
      //   setCreateSlice(user);
      //   navigation.navigate('CreateMove');
      // } else {
      //   alert('Please enter a name');
      // }
    }
    const handleJoinMove = () => {
      navigation.navigate('JoinMove');
      // if (user != '') {
      //   setUserSlice(user);
      //   navigation.navigate('JoinMove');
      // } else {
      //   alert('Please enter a name');
      // }
    }
 
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}> Moves </Text>
        
        <TouchableOpacity onPress={handleCreateMove} style={styles.button}> 
            <Text style={styles.button.text}>
            Create Move
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleJoinMove} style={styles.button}> 
            <Text style={styles.button.text}>
                Join Move
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

export default Welcome;