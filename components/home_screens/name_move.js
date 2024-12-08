import React, { useState } from 'react';
import { navigation, StyleSheet, View, Text, Image, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { BackgroundImage } from 'react-native-elements/dist/config';
import useStore from '../../store';
import { Ionicons } from '@expo/vector-icons';

const NameMove = ( {navigation} ) => {
      const [user, setUser] = useState('');
      const [moveName, setMoveName] = useState('');

      const setUserSlice = useStore((state) => state.joinMoveSlice.setUser);
      const setCreateSlice = useStore((state) => state.createMoveSlice.setCreator);
      const setMoveNameSlice = useStore((state) => state.createMoveSlice.setMoveName);

      const handleCreateMove = () => {
            if (user != '' && moveName !='') {
              setUserSlice(user);
              setMoveNameSlice(moveName);
              setCreateSlice(user);
              navigation.navigate('CreateMove');
            } else {
              alert('Please enter a name');
            }
          }

return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={35} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}> Create Move </Text>
        <View>
        <Input placeholder='Your name' onChangeText={setUser} inputContainerStyle={styles.input} />
        {/* <Input placeholder='phone number' onChange={setPhoneNumber} inputContainerStyle={styles.input} /> */}
        </View>
        <View>
        <Input placeholder='Name your move' onChangeText={setMoveName} inputContainerStyle={styles.input} />
        {/* <Input placeholder='phone number' onChange={setPhoneNumber} inputContainerStyle={styles.input} /> */}
        </View>
        <TouchableOpacity onPress={handleCreateMove} style={styles.button}> 
            <Text style={styles.button.text}>
            Create Move
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

    export default NameMove;