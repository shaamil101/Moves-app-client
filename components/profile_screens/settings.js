import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useStore from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({ navigation }) => {
  const signoutUser = useStore(({ authSlice }) => authSlice.signoutUser);

  const handleSignOut = async () => {
    await signoutUser();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={35} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>My Settings</Text>
      {/* <Text>Default Location</Text> */}
      <TouchableOpacity onPress={handleSignOut} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    // marginTop: 100,
  },
  backButton: {
    zIndex: 1,
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
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 50,
    fontStyle: 'italic',
    marginTop: 130,
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    width: 100,
  },
  logoutText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Settings;
