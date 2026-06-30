import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/client/react';

import store , { RootState, useAppDispatch } from './redux/store'; // 👈 Make sure 'store' is exported from your store file!
import SplashAuthScreen from './screens/onBoarding/splashAuthScreen';
import NavHost from './navigation/NavHost';
import { asyncGetData } from './utils/asyncStorageHelpers';
import { storageKeys } from './constants/storageKeys';
import { _authenticateUserByToken } from './redux/actions/auth.actions';
import { GQL_URL } from './network/api';
import { setToken } from './redux/features/auth.features';

// ==========================================
// 1. APOLLO CLIENT SETUP (Moved OUTSIDE component)
// ==========================================

// Standard HTTP link
const httpLink = new HttpLink({
  uri: GQL_URL,
});

// Authentication link that dynamically reads the token from Redux
const authLink = setContext((_, { headers }) => {
  // We read directly from the Redux store so it ALWAYS gets the latest token
  const token = store.getState().authSlice.token;
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Initialize the client ONCE globally
const client = new ApolloClient({
  link: authLink.concat(httpLink), // Combines the auth header with the HTTP request
  cache: new InMemoryCache(),
});

// ==========================================
// 2. MAIN COMPONENT
// ==========================================

const Main = () => {
  const { isInitializing } = useSelector(
    (state: RootState) => state.authSlice,
  );
  const dispatch = useAppDispatch();

  // On mount, check for token and set it, then authenticate user if token exists
  useEffect(() => {
    async function init() {
      const storedToken = await asyncGetData(storageKeys.TOKEN);
      if (storedToken) {
        dispatch(setToken(storedToken.value));
        dispatch(_authenticateUserByToken({ token: storedToken.value as string }));
      } else {
        dispatch(setToken(null));
      }
    }
    
    // Only run initialization once
    if (isInitializing) {
       init();
    }
  }, [isInitializing, dispatch]);

  return (
    // Pass the globally created client into the provider
    <ApolloProvider client={client}>
      {isInitializing ? <SplashAuthScreen /> : <NavHost />}
    </ApolloProvider>
  );
};

export default Main;