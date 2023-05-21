import {createContext, useState} from 'react';
import {decodeToken, isExpired} from 'react-jwt';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authContext = createContext();

export const AuthState = ({children}) => {
  const token = AsyncStorage.getItem('token') || null;
  console.log(token)
  let isMyTokenExpired = isExpired(token);
  const [decodedToken, setDecodedToken] = useState(decodeToken(token));
  return (
    <authContext.Provider
      value={{decodedToken, setDecodedToken, isMyTokenExpired}}>
      {children}
    </authContext.Provider>
  );
};
