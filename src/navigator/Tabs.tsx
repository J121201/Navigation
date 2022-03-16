import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Platform, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Bienvenido } from '../screens/Index/Bienvenido';
import { Notificaciones } from '../screens/Index/Notificaciones';
import { Renovacion } from '../screens/Leona/Renovacion';
import { Informacion } from '../screens/Index/Informacion';
import {AuthContext} from '../context/AuthContext';

export const Tabs = () => {
  return Platform.OS === 'ios' ? <TabsIOS /> : <TabsAndroid />;
};

const BottomTabAndroid = createMaterialBottomTabNavigator();

const TabsAndroid = () => {
  const {singIn, singOut, quitarError, authState} = useContext(AuthContext);

  return (
    <BottomTabAndroid.Navigator
      sceneAnimationEnabled={true}
      barStyle={{
        backgroundColor: '#9f2141',
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({color, focused}) => {
          let iconName: string = '';
          switch (route.name) {
            case 'Bienvenido':
              iconName = 'home';
              break;
            case 'Informacion':
              iconName = 'information-circle';
              break;
            case 'Notificaciones':
              iconName = 'notifications-circle';
              break;

            case 'Renovacion':
              iconName = 'infinite';
              break;
          }

          return <Icon name={iconName} size={20} color={color} />;
        },
      })}>
      <BottomTabAndroid.Screen
        name="Bienvenido"
        options={{title: 'Bienvenido'}}
        component={Bienvenido}
      />
      {authState.logeado && (
        <>
          <BottomTabAndroid.Screen
            name="Informacion"
            options={{title: 'Informacion'}}
            component={Informacion}
          />
          <BottomTabAndroid.Screen
            name="Notificaciones"
            options={{title: 'Notificaciones'}}
            component={Notificaciones}
          />
          <BottomTabAndroid.Screen
            name="Renovacion"
            options={{title: 'Renovacion'}}
            component={Renovacion}
          />
        </>
      )}
    </BottomTabAndroid.Navigator>
  );
};

const BottomTabIOS = createBottomTabNavigator();

const TabsIOS = () => {
  const {singIn, singOut, quitarError, authState} = useContext(AuthContext);
  return (
    <BottomTabIOS.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}
      tabBarOptions={{
        activeTintColor: '#9f2141',
        style: {
          borderTopColor: '#9f2141',
          borderTopWidth: 0,
          elevation: 0,
        },
        labelStyle: {
          fontSize: 15,
        },
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({color, focused, size}) => {
          let iconName: string = '';
          switch (route.name) {
            case 'Bienvenido':
              iconName = 'home';
              break;

            case 'Notificaciones':
              iconName = 'information-circle';
              break;

            case 'Renovacion':
              iconName = 'notifications-circle';
              break;

            case 'Informacion':
              iconName = 'infinite';
              break;
          }

          return <Icon name={iconName} size={20} color={color} />;
        },
      })}>
      {/* <Tab.Screen name="Tab1Screen" options={{ title: 'Tab1', tabBarIcon: (props) => <Text style={{ color: props.color }} >T1</Text> }} component={ Tab1Screen } /> */}
      <BottomTabIOS.Screen
        name="Bienvenido"
        options={{title: 'Bienvenido'}}
        component={Bienvenido}
      />
      {authState.logeado && (
        <>
          <BottomTabIOS.Screen
            name="Informacion"
            options={{title: 'Informacion'}}
            component={Informacion}
          />
          <BottomTabIOS.Screen
            name="Notificaciones"
            options={{title: 'Notificaciones'}}
            component={Notificaciones}
          />
          <BottomTabIOS.Screen
            name="Renovacion"
            options={{title: 'Renovacion'}}
            component={Renovacion}
          />
        </>
      )}
    </BottomTabIOS.Navigator>
  );
};
