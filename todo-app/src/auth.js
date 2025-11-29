import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'access_token';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    console.log('Token stored successfully');
  } catch (error) {
    console.log('Error storing token:', error);
    throw error;
  }
};

export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  } catch (error) {
    console.log('Error getting token:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    console.log('Token removed successfully');
  } catch (error) {
    console.log('Error removing token:', error);
    throw error;
  }
};

export const isAuthenticated = async () => {
  const token = await getToken();
  return !!token;
};