import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageList from '../home_screens/image_list';

import * as Clipboard from 'expo-clipboard';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import useStore from '../../store';

const MoveInfo = ({ navigation, route }) => {

  const { move, phoneNumber } = route.params;

  const setJoinCode = useStore((state) => state.joinMoveSlice.setJoinCode);
  const setMoveId = useStore((state) => state.joinMoveSlice.setMoveId);

  const getResults = useStore((state) => state.joinMoveSlice.getResults);
  const [results, setResults] = useState('');

  const [code] = useState(move.code);

  const copyToClipboard = async () => {
    try {
      await Clipboard.setStringAsync(code);
      Alert.alert('Copied to clipboard', `Code: ${code}`);
    } catch (error) {
      console.log('Error copying to clipboard: ' + error);
    }
  };

  const fetchResults = async () => {
    const response = await getResults(move.id);
    setResults(response.data);
  };

  useEffect(() => {
    console.log('MOVE BEING DISPLAYED:', move);
    console.log(move.completed.includes(phoneNumber));
    
    if (move.status == 'FINISHED') {
      fetchResults();
    }
  }, []);

  const shareViaMessage = () => {
    const message = `Join my Move using this code: ${code}`;
    const url = `sms:&body=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch((err) => console.error('Error opening iMessage: ', err));
  };

  const goToWaitingRoom = async () => {
    console.log('current number: ', phoneNumber);
    setJoinCode(code);
    setMoveId(move.id)
    navigation.navigate('Home', {
      screen: 'WaitingRoom',
      params: { currentUser: null, creator: null, userNumber: phoneNumber },
    });
  };

  return (

    <View style={styles.container}>
       <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={35} color="black" />
        </TouchableOpacity>
      {/* <Text style={styles.title}>Move Info</Text> */}
        <Text style={styles.title}>{move.moveName}</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>Creator:</Text>
        <Text style={styles.value}>{move.creator}</Text>

        { move.status == 'IN_PROGRESS' ?
          <Text style={[styles.statusBadge, styles.statusBadge.inProgress]}>IN PROGRESS</Text>
          :
          <Text style={[styles.statusBadge, styles.statusBadge.finished]}>{move.status}</Text>
        }


        {/* <Text style={styles.label}>Status:</Text>
        <Text style={styles.value}>{move.status}</Text> */}
        <Text style={styles.label}>Users:</Text>
        {move.users.map((user, index) => (
          <Text key={index} style={styles.listValue}>{user}</Text>
        ))}

        { move.status == 'IN_PROGRESS' ? 
          <View>
            <Text style={styles.label1}>Code:</Text>
            <TouchableOpacity onPress={copyToClipboard} style={styles.button}> 
                <Text style={styles.button.text}>
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

            { move.completed.includes(phoneNumber) ?
              <TouchableOpacity style={styles.link} onPress={goToWaitingRoom}>
                <View style={styles.linkContent}>
                  <Text style={styles.linkText}>Go to Move Waiting Room</Text>
                  <Ionicons name="chevron-forward" size={20} color="black" />
                </View>
              </TouchableOpacity>
              :
              <Text style={styles.value}>Haven't Finished Questions</Text>

            }
          </View> : null
        }

        { move.status == 'FINISHED' && results && 
          <View>
            <Text style={styles.label1}>Your Move:</Text>
            <ImageList results={results} />
          </View>
        }
      </ScrollView>
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
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 5,
    fontStyle: 'italic',
    marginTop: 110,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    marginBottom: 20,
  },
  listValue: {
    fontSize: 18,
  },
  label1: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
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
    alignItems: 'center',
    marginBottom: 20,
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    }
  },
  statusBadge: {
    borderWidth: 3,
    borderRadius: 15,
    padding: 5,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    finished: {
      borderColor: 'green',
      width: '35%',
      color: 'green',
    },
    inProgress: {
      borderColor: 'orange',
      width: '40%',
      color: 'orange',
    }
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginVertical: 10,
    padding: 10,
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

export default MoveInfo;
