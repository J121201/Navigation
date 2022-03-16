import React, {useContext, useEffect} from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  Image,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {EstilosFormulario, EstilosLogin} from '../css/Estilos';
import {useForm} from '../hook/useForm';
import {AuthContext} from '../context/AuthContext';
import {SettingsScreen} from '../screens/SettingsScreen';
import {Tabs} from './Tabs';
import { FormularioRenovacion } from '../screens/Leona/FormularioRenovacion';
import { Renovacion } from '../screens/Leona/Renovacion';
import { RenovacionSubir } from '../screens/Leona/RenovacionSubir';
import { FormularioRenovacionBene } from '../screens/Leona/FormularioRenovacionBene';

const Drawer = createDrawerNavigator();

export const MenuLateral = () => {
  const {width} = useWindowDimensions();

  return (
    <Drawer.Navigator
      drawerType={width >= 768 ? 'permanent' : 'front'}
      drawerContent={(props) => <MenuInterno {...props} />}>
      <Drawer.Screen name="Tabs" component={Tabs} />
      <Drawer.Screen
        name="FormularioRenovacion"
        component={FormularioRenovacion}
      />

      <Drawer.Screen name="RegresarRenovacion" component={Renovacion} />
      <Drawer.Screen name="RenovacionSubir" component={RenovacionSubir} />
      <Drawer.Screen
        name="FormularioRenovacionBene"
        component={FormularioRenovacionBene}
      />
    </Drawer.Navigator>
  );
};

const MenuInterno = ({
  navigation,
}: DrawerContentComponentProps<DrawerContentOptions>) => {
  //#-  Creamos en Context para crear la "Sesion"
  const {singIn, singOut, quitarError, authState} = useContext(AuthContext);

  //#- Hook para cachar los datos del Useform
  const {curp, idp, onChange} = useForm({
    curp: '',
    idp: 0,
  });

  useEffect(() => {
    if (authState.mensaje === 'OK' || authState.mensaje === undefined) return;
    Alert.alert('Error en los Datos', authState.mensaje, [
      {
        text: 'OK',
        onPress: quitarError,
      },
    ]);
    //console.log(authState.mensaje);
    //9042
    //InformacionTab,BienvenidoTab
    //SAAA080417MMCLLNA7
  }, [authState.mensaje]);

  const onLogin = () => {
    singIn({curp, idp});
    navigation.navigate('Bienvenido');
  };

  return (
    <DrawerContentScrollView>
      {/* Parte del avatar */}
      <View style={EstilosLogin.avatarContainer}>
        <Image
          source={{
            uri: 'https://sui.dif.cdmx.gob.mx/sui/_app/img_inicio_login.png',
          }}
          style={EstilosLogin.AvatarLogin}
        />
      </View>

      {/* Opciones de menú */}
      {!authState.logeado && (
        <>
          <Text style={EstilosFormulario.InputTexto}>
            CURP del Beneficiario
          </Text>
          <TextInput
            style={EstilosFormulario.Input}
            maxLength={18}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(value) => onChange(value, 'curp')}
            onSubmitEditing={onLogin}
          />

          <Text style={EstilosFormulario.InputTexto}>IDP</Text>
          <TextInput
            style={EstilosFormulario.Input}
            maxLength={5}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(value) => onChange(value, 'idp')}
            onSubmitEditing={onLogin}
          />
        </>
      )}

      <View style={EstilosFormulario.ContenedorButton}>
        {!authState.logeado && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={EstilosFormulario.TuchableButton}
            onPress={onLogin}>
            <Text style={EstilosFormulario.TextoButton}>&nbsp;Login</Text>
          </TouchableOpacity>
        )}

        {/* Boton de Salir sesion  */}
        {authState.logeado && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={EstilosFormulario.TuchableButton}
            onPress={singOut}>
            <Text style={EstilosFormulario.TextoButton}>
              &nbsp;Salir Sesión
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/*Para password secureTextEntry*/}
      <Image
        source={{
          uri: 'https://sui.dif.cdmx.gob.mx/sui/_app/img_pie.png',
        }}
        style={EstilosLogin.AvatarLoginPie}
      />
    </DrawerContentScrollView>
  );
};
