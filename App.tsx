import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MenuLateral} from './src/navigator/MenuLateral';
import {AuthProvedor} from './src/context/AuthContext';

const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <MenuLateral />
      </AppState>
    </NavigationContainer>
  );
};

const AppState = ({children}: any) => {
  return <AuthProvedor>{children}</AuthProvedor>;
};

export default App;
