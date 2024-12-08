// app.config.js
import 'dotenv/config';

export default {
  expo: {
    name: 'moves-app',
    owner: 'moves-ai',
    slug: 'moves-app',
    version: '1.0.5',
    orientation: 'portrait',
    icon: './assets/logo.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash-logo.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'edu.dartmouth.Moves'
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#ffffff'
      }
    },
    web: {
      favicon: './assets/favicon.png'
    },
    extra: {
      rootUrl: process.env.ROOT_URL || 'http://localhost:9090/api',
      placesApiKey: process.env.PLACES_API_KEY,
      apiKey: process.env.API_KEY,
      eas: {
        projectId: "d744e707-539f-4401-b969-d3cec0e5fbb6"
      }
    }
  }
};
