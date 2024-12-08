import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import ImageList from './image_list';
import useStore from '../../store';

const Results = ( {navigation} ) => {

  const getResults = useStore((state) => state.joinMoveSlice.getResults);
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    const response = await getResults();
    setResults(response.data);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}> Your Move </Text>

        {results.length > 0 ? (
          <ScrollView>
            <ImageList results={results} />
          </ScrollView>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    fontStyle: 'italic',
  }
});

export default Results;
