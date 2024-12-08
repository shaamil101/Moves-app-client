import axios from 'axios';
import Constants from 'expo-constants';

const ROOT_URL = Constants.expoConfig.extra.rootUrl;
const API_KEY = Constants.expoConfig.extra.apiKey;

export default function joinMoveSlice(set, get) {
    return {
      user: String,
      moveId: String,
      questionId: String,
      response: Boolean,
      joinCode: Number,
      
      getQuestion: async () => {
        try {
          const response = await axios.get(`${ROOT_URL}/question`, {
            params: {
              user: get().joinMoveSlice.user,
              moveId: get().joinMoveSlice.moveId,
              gifUrl: get().joinMoveSlice.gif
            }
          });
          set(state => {
            state.joinMoveSlice.prompt = response.data.prompt;
          });
          return response;
        } catch (error) {
          alert('Get Prompt Failed: ' + error);
          get().errorSlice.newError(`Get Prompt Failed: ${error}`);
        }
      },
      submitResponse: async (res, questionId) => {
        try {
          const response = await axios.post(`${ROOT_URL}/question`, {
            user: get().joinMoveSlice.user,
            moveId: get().joinMoveSlice.moveId,
            questionId: questionId,
            response: res,
          });
          
        } catch (error) {
          alert('Submit Response Failed: ' + error);
          get().errorSlice.newError(`Submit Response Failed: ${error}`);
        }
      },
      setUser : (user) => {
        set(state => {
          state.joinMoveSlice.user = user;
        });
      },
      setJoinCode: (code) => {
        set(state => {
          state.joinMoveSlice.joinCode = code;
        });
      },
      setMoveId: (id) => {
        set (state => {
          state.joinMoveSlice.moveId = id;
        });
      },
      joinMove: async ( code, user, phoneNumber) => {
        try {
          const response = await axios.post(`${ROOT_URL}/join`, {
            user: user,
            code: code,
            number: phoneNumber
          });
          set (state => {
            state.joinMoveSlice.questionId = 0; // response.data.questionId;
          });
          return response;
        } catch (error) {
          alert('Join Move Failed: ' + error);
          get().errorSlice.newError(`Join Move Failed: ${error}`);
        }
      },
      getResults: async (newMoveId) => { 
        try {
          const response = await axios.get(`${ROOT_URL}/results`, {
            params: {
              moveId: newMoveId ? newMoveId : get().joinMoveSlice.moveId
            }
          });
          return response;
        } catch (error) {
          alert('Get Results Failed: ' + error);
          get().errorSlice.newError(`Get Results Failed: ${error}`);
        }
      },
      createResults: async (newMoveId) => { 
        for (let i = 0; i < 5; i++) {
          try {
            const response = await axios.post(`${ROOT_URL}/results`, {
              params: {
                moveId: newMoveId? newMoveId : get().joinMoveSlice.moveId
              }
            });
            return response;
          } catch (error) {
            get().errorSlice.newError(`Create Results Failed: ${error}`);
          }
        }
        alert('Create Results Failed: ' + error);
      },
      getMoveStatus: async (newMoveId) => {
        try {
          const response = await axios.get(`${ROOT_URL}/move/status`, {
            params: {
              moveId: newMoveId ? newMoveId : get().joinMoveSlice.moveId,
              user: newMoveId ? null : get().joinMoveSlice.user
            }
          });
          // console.log('Move Slice response: ', response.data);
          return response.data;
        } catch (error) {
          alert('Get Move Status Failed: ' + error);
          get().errorSlice.newError(`Get Move Status Failed: ${error}`);
        }
      },
      changeMoveStatus: async ( givenStatus ) => {
        try {
          const response = await axios.post(`${ROOT_URL}/move/status`, {
            moveId: get().joinMoveSlice.moveId,
            user: get().joinMoveSlice.user,
            status: givenStatus
          });
          console.log("Changing status to:", response.data);
          return response.data;
        } catch (error) {
          alert('Change Move Status Failed: ' + error);
          get().errorSlice.newError(`Change Move Status Failed: ${error}`);
        }
      },
      addCompletedUser: async ( moveId, userNumber ) => {
        try {
          const response = await axios.post(`${ROOT_URL}/join/completed`, {
            moveId: moveId,
            number: userNumber,
          });
          console.log("Added completed user: ", response.data);
          return response.data;
        } catch (error) {
          alert('Adding completed user Failed: ' + error);
          get().errorSlice.newError(`Adding completed user Failed: ${error}`);
        }
      },
    }
  }