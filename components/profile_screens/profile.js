import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useStore from '../../store';

const Profile = ({ navigation }) => {

  // const phoneNumber = useStore((state) => state.authSlice.phoneNumber);
  // const number = AsyncStorage.getItem('number');
  // console.log(phoneNumber);
  // console.log(number);

  const [number, setNumber] = useState('');


  const getNumber = async () => {
    try {
      const value = await AsyncStorage.getItem('number');
      if(value !== null) {
        // value previously stored
        // console.log('Retrieved value:', value);
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
      // console.log(storedNumber);
    }

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <Text style={styles.subtitle}>({number})</Text>

      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('MyMoves', { phoneNumber: number})}>
        <View style={styles.linkContent}>
          <Text style={styles.linkText}>My Moves</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Settings')}>
        <View style={styles.linkContent}>
          <Text style={styles.linkText}>Account Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 130,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 25,
  },
  link: {
    marginVertical: 10,
    padding: 10,
    // backgroundColor: '#f0f0f0',
    borderRadius: 5,
    width: '100%',
  },
  linkContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkText: {
    fontSize: 18,
    color: '#000',
  },
});

export default Profile;
