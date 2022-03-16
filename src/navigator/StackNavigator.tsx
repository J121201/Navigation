import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Pagina2Screen} from '../screens/Pagina2Screen';
import {Pagina3Screen} from '../screens/Pagina3Screen';
import {PersonaScreen} from '../screens/PersonaScreen';
import { FormularioRenovacion } from '../screens/Leona/FormularioRenovacion';
import { Renovacion } from '../screens/Leona/Renovacion';
import { RenovacionSubir } from '../screens/Leona/RenovacionSubir';
import { FormularioRenovacionBene } from '../screens/Leona/FormularioRenovacionBene';

export type RootStackParams = {
  FormularioRenovacion: undefined;
  RegresarRenovacion: undefined;
  RenovacionSubir: undefined;
  FormularioRenovacionBene: undefined;
  PersonaScreen: {id: number; nombre: string};
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          elevation: 0,
          shadowColor: 'transparent',
        },
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen
        name="FormularioRenovacion"
        options={{title: 'FormularioRenovacion'}}
        component={FormularioRenovacion}
      />
      <Stack.Screen
        name="RegresarRenovacion"
        options={{title: 'RegresarRenovacion'}}
        component={Renovacion}
      />
      <Stack.Screen
        name="RenovacionSubir"
        options={{title: 'RenovacionSubir'}}
        component={RenovacionSubir}
      />
      <Stack.Screen
        name="FormularioRenovacionBene"
        options={{title: 'FormularioRenovacionBene'}}
        component={FormularioRenovacionBene}
      />
      <Stack.Screen name="PersonaScreen" component={PersonaScreen} />
    </Stack.Navigator>
  );
};
