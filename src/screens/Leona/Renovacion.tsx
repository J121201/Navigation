import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { styles } from '../../theme/appTheme';
import { EstilosGenerales } from '../../css/Estilos';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

export const Renovacion = () => {


  const { authState } = useContext(AuthContext);

  //#- Consulta para traer los dataos del Beneficiario
  const [infoDerecho, setInfoDerecho] = useState([]);
  useEffect(() => {
    const DatosConsulta = async () => {
      const { data }: any = await axios.get(
        'https://sui.dif.cdmx.gob.mx/sui/subsistemas/UVZCSg==/YkdWdmJtRT0=/WVhCcFgyeGxiMjVo.php',
        {
          params: {
            curp: authState.curp,
            x: 'BENEFICIARIO',
          },
        },
      );

      setInfoDerecho(data);
    };
    DatosConsulta();
  }, []);


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


          {infoDerecho.map((AsValue) => (
            <TouchableOpacity
              key={AsValue['curp']}
              activeOpacity={0.8}
              style={EstilosGenerales.TuchableButton}
              onPress={() =>
                navigator.navigate('FormularioRenovacionBene', {
                  curp: 'hola'
                })
              }>
              <Text style={EstilosGenerales.TextoButton}>
                Informacion de Renovacion de {AsValue['nombre_completo']}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
