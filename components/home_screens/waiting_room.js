import React, { useEffect, useState } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import useStore from '../../store';


const WaitingRoom = ( { navigation, route } ) => {
  const { currentUser, creator, userNumber } = route.params;

  const getMoveStatus = useStore((state) => state.joinMoveSlice.getMoveStatus);
  const changeMoveStatus = useStore((state) => state.joinMoveSlice.changeMoveStatus);
  const createResults = useStore((state) => state.joinMoveSlice.createResults);


  const moveID = useStore((state) => state.joinMoveSlice.moveId);

  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingResults, setLoadingResults] = useState(false);

  async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleClick = async () => {
    setLoadingResults(true);
    await createResults(); 
    await changeMoveStatus('FINISHED');
    navigation.navigate('Results');
    setLoadingResults(false);
  }

  useEffect(() => {
    const fetchData = async () => {
      const tempResponse = await getMoveStatus();
      // console.log('Response in waiting room: ', tempResponse);
      setResponse(tempResponse);
      setLoading(false);
      
      // console.log(tempResponse.status);
      if (tempResponse.status == 'FINISHED') {
        // console.log("MOVE FINISHED");
        // console.log("DELAY OVER");
        clearInterval(intervalId);
        navigation.navigate('Results');
      }
  
    }

    fetchData();


    // Fetch data every 3 seconds
    const intervalId = setInterval(fetchData, 3000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
    
  }, []);

  return (
    <View style={styles.container}>

      { loadingResults ?
        <View>
          <Text style={styles.title}>Loading Your Move</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
        :
        <View>
          <Text style={styles.title}>Nice!</Text>
          <Text style={styles.text}>Move: {response.moveName}</Text>
    
          {response.status !== 'FINISHED' ? 
            <Text style={styles.text}>This move is still open for responses.</Text>
            :
            <Text style={styles.text}>This move has ended. Loading results ...</Text>
          }
          {/* <Text style={styles.text}>{loading ? "" : response.users.length} movers have joined.</Text> */}
          
          <Text style={styles.label}>Movers who have joined:</Text>
          {loading ? null : response.users.map((user, index) => (
            <Text key={index} style={styles.listValue}>{user}</Text>
          ))}

          { loading ? null : (userNumber == response.creatorNumber ? 
            <View style={styles.marginAbove}>
              <Text style={styles.text}>Close the move to see your results:</Text>
              <TouchableOpacity onPress={handleClick} style={styles.button}> 
                  <Text style={styles.button.text}>
                    Close Move
                  </Text>
              </TouchableOpacity>
            </View> : null)
          }
        </View>

      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
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
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listValue: {
    fontSize: 20,
  },
  marginAbove: {
    marginTop: 25,
  }
});

export default WaitingRoom;
