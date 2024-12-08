import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const ROOT_URL = Constants.expoConfig.extra.rootUrl;
const API_KEY = Constants.expoConfig.extra.apiKey;

export default function AuthSlice(set, get) {
  return {
    phoneNumber: String,
    authenticated: false,
    loading: true,

    setPhoneNumber: (number) => {
      set (state => {
        state.authSlice.phoneNumber = number;
      });
    },
    getUserInfo: async (phoneNumber) => {
      try {
        const response = await axios.get(`${ROOT_URL}/users`, {
          params: {
            number: phoneNumber
          }
        });
        // console.log('Auth Slice response: ', response.data);
        return response.data;
      } catch (error) {
        alert('Get User Info Failed: ' + error);
        get().errorSlice.newError(`Get User Info Failed: ${error}`);
      }
    },
    loadUser: async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${ROOT_URL}`, {
            headers: { 'Authorization': token }
          });
          if (response.status !== 200) {
            throw new Error('Failed to load user');
          }
          set(state => {
            state.authSlice.authenticated = true;
            state.authSlice.loading = false;
          }, false, 'auth/loadUser');
        } catch (error) {
          console.error("Failed to load user", error);
          await AsyncStorage.removeItem('token');
          set(state => {
            state.authSlice.authenticated = false;
            state.authSlice.loading = false;
          }, false, 'auth/loadUser');
        }
      } else {
        set(state => {
          state.authSlice.loading = false;
        }, false, 'auth/loadUser');
      }
    },
    signinUser: async (fields) => {
      try {
        if (fields.number === '' || fields.password === '') {
          get().errorSlice.newError('Sign In Failed: Number and Password Required');
          return;
        }

        const response = await axios.post(`${ROOT_URL}/signin`, fields);
        await set(({ authSlice }) => { authSlice.authenticated = true; }, false, '/signin');
        await AsyncStorage.setItem('token', response.data.token);
        // setPhoneNumber(fields.number);
      } catch (error) {
        get().errorSlice.newError('Sign In Failed: ' + error.message);
      }
    },
    signupUser: async (fields) => {
      try {
        if (!fields.number || !fields.password) {
          get().errorSlice.newError('Sign Up Failed: Number and Password Required');
          return;
        }

        const response = await axios.post(`${ROOT_URL}/signup`, fields);
        await set(({ authSlice }) => { authSlice.authenticated = true; }, false, '/signup');
        await AsyncStorage.setItem('token', response.data.token);
        // setPhoneNumber(fields.number);
      } catch (error) {
        get().errorSlice.newError('Sign Up Failed: ' + error.message);
      }
    },
    signoutUser: async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        
        if (!token) {
          throw new Error('No token found');
        }
    
        // Update authentication state
        await set(({ authSlice }) => { authSlice.authenticated = false; }, false, 'auth/signout');
    
        // Remove token from AsyncStorage
        await AsyncStorage.removeItem('token');
      } catch (error) {
        // Check for 401 error specifically
        if (error.response && error.response.status === 401) {
          get().errorSlice.newError('Sign Out Failed: Unauthorized. Please log in again.');
        } else {
          get().errorSlice.newError('Sign Out Failed: ' + error.message);
        }
      }
    },
  };
}
