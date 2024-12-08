import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useStore from '../../store';

const RequireAuth = ({ children }) => {
  const navigation = useNavigation();
  const authenticated = useStore(({ authSlice }) => authSlice.authenticated);
  const loading = useStore(({ authSlice }) => authSlice.loading);

  useEffect(() => {
    if (!loading && !authenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    }
  }, [loading, authenticated]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!authenticated) {
    return null; // Render nothing while redirecting
  }

  return children;
};

const styles = {
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default RequireAuth;
