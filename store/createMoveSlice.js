import axios from 'axios';
import Constants from 'expo-constants';

const ROOT_URL = Constants.expoConfig.extra.rootUrl;
const API_KEY = Constants.expoConfig.extra.apiKey;

export default function createMoveSlice(set, get) {
    return {
      creator: String,
      moveName: String,
      location: {},
      radius: Number,
      joinCode: Number,

      setJoinCode: (code) => {
        set(state => {
          state.createMoveSlice.joinCode = code;
        });
      },
      setCreator: (creator) => {
        set(state => {
          state.createMoveSlice.creator = creator;
        });
      },
      setMoveName : (moveName) => {
        set(state => {
          state.createMoveSlice.moveName = moveName;
        });
      },
      setLocation: (location) => {
        set(state => {
          state.createMoveSlice.location = location;
        });
      },
      setRadius: (radius) => {
        set(state => {
          state.createMoveSlice.radius = radius;
        });
      },

      createMove: async ( navigation, moveInitInfo ) => {
        // console.log(moveInitInfo);
        try {
          const response = await axios.post(`${ROOT_URL}/create`, {
            moveInitInfo: moveInitInfo,
          }); 
          navigation.navigate('ShareMove', {joinCode: response.data.joinCode});
          return response;
          //,{
          //   headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          // });
        } catch (error) {
          alert('Create Move Failed: ' + error);
          get().errorSlice.newError(`Create Move Failed: ${error}`);
        }
      },
    };
  }
  