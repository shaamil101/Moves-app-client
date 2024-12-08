// i asked chatgpt to fix the map and make it smooth for me, and it worked so i used the code
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Slider from '@react-native-community/slider';
import * as Location from 'expo-location';
import useStore from '../../store';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import AsyncStorage from '@react-native-async-storage/async-storage';

const PLACES_API_KEY = Constants.expoConfig.extra.placesApiKey;

const MapWithRadius = ({ navigation }) => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [radius, setRadius] = useState(1609); // 1 mile in meters
  const setRadiusSlice = useStore((state) => state.createMoveSlice.setRadius);
  const setLocationSlice = useStore((state) => state.createMoveSlice.setLocation);
  const creator = useStore((state) => state.createMoveSlice.creator);
  const moveName = useStore((state) => state.createMoveSlice.moveName);
  const createMove = useStore((state) => state.createMoveSlice.createMove);
  const setJoinCode_create = useStore((state) => state.createMoveSlice.setJoinCode);
  const setJoinCode2_join = useStore((state) => state.joinMoveSlice.setJoinCode);
  const setMoveId = useStore((state) => state.joinMoveSlice.setMoveId);


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

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(region, 1000); // Animate map to new region
    }
  }, [region]);

  const handleButtonPress = async () => {
    const moveInitInfo = {
      creator: creator,
      creatorNumber: number,
      moveName: moveName,
      questions: [], // Add questions here
      location: {
        latitude: region.latitude,
        longitude: region.longitude,
      },
      radius: radius,
      status: 'IN_PROGRESS',
    };
    await setRadiusSlice(radius);
    await setLocationSlice(moveInitInfo.location);
    try {
      const response = await createMove(navigation, moveInitInfo);
      setJoinCode_create(response.data.joinCode);
      setJoinCode2_join(response.data.joinCode);
      setMoveId(response.data.moveId);
    } catch (error) {
      alert('Create Move Failed. Try again.');
    }
  };

  const handleZoom = (type) => {
    let newDelta = type === 'in' ? region.latitudeDelta / 2 : region.latitudeDelta * 2;
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        ...region,
        latitudeDelta: newDelta,
        longitudeDelta: newDelta,
      }, 500);
    }
  };

  const handleGetMyLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log(location.coords.latitude, location.coords.longitude);
    setRegion({
      ...region,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  useEffect(() => {
    handleGetMyLocation();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        ref={mapRef}
        initialRegion={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        region={region}
        zoomEnabled={true}
      >
        <Circle
          center={{ latitude: region.latitude, longitude: region.longitude }}
          radius={radius}
          fillColor="rgba(100, 100, 240, 0.5)"
          strokeColor="rgba(100, 100, 240, 1)"
        />
      </MapView>
      <SafeAreaView style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={35} color="black" />
        </TouchableOpacity>
        <GooglePlacesAutocomplete
          placeholder="Search for location"
          fetchDetails={true}
          onPress={(data, details = null) => {
            setRegion({
              ...region,
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });
          }}
          query={{
            key: PLACES_API_KEY,
            language: 'en',
          }}
          styles={{
            container: styles.searchBarContainer,
            listView: { backgroundColor: 'white' }
          }}
        />
      </SafeAreaView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Create Move</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sliderContainer}>
        <Text>Adjust Radius: {(radius / 1609.34).toFixed(2)} miles</Text>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={160.934}
          maximumValue={4828.03} // 3 miles in meters
          value={radius}
          onValueChange={(value) => setRadius(value)}
          minimumTrackTintColor="#0000FF"
          maximumTrackTintColor="#000000"
        />
      </View>
      <View style={styles.locationButtonContainer}>
        <TouchableOpacity onPress={handleGetMyLocation}>
          <Ionicons name="location" size={35} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 45,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  backButton: {
    borderColor: 'black',
    borderWidth: 3,
    borderRadius: 30,
    backgroundColor: 'white',
    padding: 3,
  },
  searchBarContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 110,
    height: 50,
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 3,
    borderColor: 'black',
    alignSelf: 'center',
    width: 200,
    borderRadius: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sliderContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    padding: 10,
  },
  locationButtonContainer: {
    position: 'absolute',
    bottom: 110,
    right: 10,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 60,
    padding: 15,
    borderWidth: 3, 
    borderColor: 'black',
  },
});

export default MapWithRadius;
