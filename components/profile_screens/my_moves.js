import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import useStore from '../../store';

import MoveRow from './move_row';

const MyMoves = ({ navigation, route }) => {
  const { phoneNumber } = route.params;

  const getUserInfo = useStore((state) => state.authSlice.getUserInfo);
  const getMoveStatus = useStore((state) => state.joinMoveSlice.getMoveStatus);

  const [movesList, setMovesList] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserInfo(phoneNumber);
      setUserInfo(response);
      // console.log(response.movesList);
      for (const move of response.movesList) {
        // console.log(move);
        const tempResponse = await getMoveStatus(move);
        // console.log('Move Status: ', tempResponse);
        tempArray = movesList;
        tempArray.push(tempResponse);
        setMovesList(tempArray);
      }

      setLoading(false);

      // console.log('USER INFO:', userInfo);
      // console.log('MOVES LISTTTT:', movesList);
    }

    fetchData();
  }, []);


  const handlePress = (move) => {
    // console.log('MoveRow pressed!');
    // Add any navigation or other logic here
    navigation.navigate("MoveInfo", { move: move, phoneNumber: phoneNumber });
  };
      
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={35} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>My Moves</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title2}>Current Moves</Text>

        {loading ? "" : movesList.map((move, index) => (
          move.status == 'IN_PROGRESS' ?
          <MoveRow
            key={index}
            name={move.moveName}  // Assuming move object has a name property
            isOwner={phoneNumber == move.creatorNumber}  // Assuming move object has an isOwner property
            onPress={() => handlePress(move)}
          /> : null
        ))}

        <View style={styles.pastMoves}>
          <Text style={styles.title2}>Past Moves</Text>
          {loading ? "" : movesList.map((move, index) => (
            move.status != 'IN_PROGRESS' ?
            <MoveRow
              key={index}
              name={move.moveName}  // Assuming move object has a name property
              isOwner={phoneNumber == move.creatorNumber}  // Assuming move object has an isOwner property
              onPress={() => handlePress(move)}
            /> : null
          ))}
        </View>
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
    marginBottom: 0,
    marginTop: 110,
    fontStyle: 'italic',
  },
  title2: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    // fontStyle: 'italic',
  },
  link: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
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
  pastMoves: {
    marginBottom: 15,
  }
});

export default MyMoves;
