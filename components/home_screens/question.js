import React, { act, useEffect, useState, useRef } from 'react';
import { navigation, StyleSheet, View, Text, Image, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import useStore from '../../store';
import { Swipeable, RectButton } from 'react-native-gesture-handler';
import { Card } from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Question = ( {navigation} ) => {

  const [number, setNumber] = useState('');


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

  // const prompt = 'Is this Romantic?';
  const getQuestion = useStore((state) => state.joinMoveSlice.getQuestion);
  const [prompt, setPrompt] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [gifUrl, setGifUrl] = useState('');
  const [renderCard, setRenderCard] = useState(false);

  const submitResponse = useStore((state) => state.joinMoveSlice.submitResponse);
  const user = useStore((state) => state.joinMoveSlice.user);
  const creator = useStore((state) => state.createMoveSlice.creator);
  const [swipeKey, setSwipeKey] = useState(0);

  const addCompletedUser = useStore((state) => state.joinMoveSlice.addCompletedUser);
  const moveId = useStore((state) => state.joinMoveSlice.moveId);

  const fetchQuestion = async () => {
    const question = await getQuestion(); // Assuming getQuestion is async
    if (question.data.questionId < 0) {
      const result = await addCompletedUser(moveId, number);
      console.log('Completed user added:', result.completed);
      navigation.navigate('WaitingRoom', { currentUser: user, creator: creator, userNumber: number });
    }
    setPrompt(question.data.prompt);
    setQuestionId(question.data.questionId);
    setGifUrl(question.data.gif);
    // console.log(question.data);
    setRenderCard(true);
  };
  
  useEffect(() => {
    // console.log(gifUrl);
    setGifUrl('');
    setPrompt('');
    fetchQuestion();
  }, [swipeKey]);

  const handleYes = async () => {
    const res = true;
    const response = await submitResponse(res, questionId);
    resetSwipeable();
  }

  const handleNo = async () => {
    const res = false;
    const response = await submitResponse(res, questionId);
    resetSwipeable();
    
  }

  const resetSwipeable = () => {
    setSwipeKey((prevKey) => prevKey + 1);
  };

  const renderLeftActions = () => (
    <RectButton style={[styles.action, styles.yesAction]} />
  );

  const renderRightActions = () => (
    <RectButton style={[styles.action, styles.noAction]} />
  );

  const renderSwipeText = () => (
    <View style={styles.swipeTextContainer}>
      <Text style={styles.swipeText}>Swipe left for no and right for yes!</Text>
    </View>
  );


  return (
    renderCard && <SafeAreaView style={styles.container}>
      <Swipeable
        key={swipeKey}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        onSwipeableOpen={(direction) => {
          if (direction === 'left') {
            handleYes();
          } else {
            handleNo();
          }
        }}
        leftThreshold={50}
        rightThreshold={50}
        containerStyle={styles.swipeableContainer}
      >
        <View style={styles.buttonContainer}>
          <Card containerStyle={styles.card}>
            <Text style={styles.title}>{prompt}</Text>
            <Image source={{ uri: gifUrl }} style={styles.image} />
          </Card>
          {questionId < 5 && renderSwipeText()}
        </View>
      </Swipeable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  swipeableContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 16,
  },
  buttonContainer: {
    width: '92%',
    borderColor: 'black',
    borderRadius: 35,
  },
  card: {
    width: '100%',
    borderRadius: 15,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
    marginHorizontal: 20,
  },
  button: {
    borderWidth: 3,
    borderColor: 'black',
    justifySelf: 'center',
    alignSelf: 'center',
    width: 100,
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 10, // Add space between buttons
    text: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    }
  },
  action: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  yesAction: {
    backgroundColor:'#39e75f',
  },
  noAction: {
    backgroundColor: '#ff4137',
  },
  swipeTextContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  swipeText: {
    fontSize: 18,
  },
  image: {
    width: '100%', 
    height: 200, 
    resizeMode: 'cover', 
  },
});

export default Question;
