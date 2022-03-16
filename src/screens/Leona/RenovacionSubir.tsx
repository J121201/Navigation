import React, {useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {styles} from '../../theme/appTheme';
import {EstilosGenerales} from '../../css/Estilos';

export const RenovacionSubir = () => {
  const navigator = useNavigation();

  useEffect(() => {
    navigator.setOptions({
      title: 'Renovacion',
      headerBackTitle: '',
    });
  }, []);

  return (
    <SafeAreaView style={styles.globalMargin}>
      <ScrollView>
        <Image
          source={{
            uri: 'https://sui.dif.cdmx.gob.mx/sui/_app/renovacionDigital.jpg',
          }}
          style={EstilosGenerales.StyleImagen}
        />
        <Text style={EstilosGenerales.StyleTexto}>
          Renovacion Digital Marzo 2022
        </Text>
        <Text style={EstilosGenerales.StyleTexto}>
          Texto de informativo de Renovacion
        </Text>
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={EstilosGenerales.TuchableButton}
            onPress={() => navigator.navigate('FormularioRenovacion')}>
            <Text style={EstilosGenerales.TextoButton}>
              Datos de la Renovacion por Familia
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={EstilosGenerales.TuchableButton}
            onPress={() => navigator.navigate('FormularioRenovacionBene')}>
            <Text style={EstilosGenerales.TextoButton}>
              Informacion de Renovacion de Chistopher Rodrigo Sanchez Mata
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
