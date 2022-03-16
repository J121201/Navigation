import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import {Text, View, FlatList, SafeAreaView} from 'react-native';

import {EstilosLogin, Notificacion, Colores} from '../../css/Estilos';

import {ScrollView} from 'react-native-gesture-handler';
import {AuthContext, authInitialState} from '../../context/AuthContext';

/*
<Icon name="bell" size={30} color="#00a300" />  
*/

export const Notificaciones = () => {
  const {authState} = useContext(AuthContext);

  const [Notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const DatosConsulta = async () => {
      const {data}: any = await axios.get(
        'https://sui.dif.cdmx.gob.mx/sui/subsistemas/UVZCSg==/YkdWdmJtRT0=/WVhCcFgyeGxiMjVo.php',
        {
          params: {
            curp: authState.curp,
            x: 'N',
          },
        },
      );

      setNotificaciones(data);
    };
    DatosConsulta();
  }, []);

  if (authState.mensaje == 'OK') {
    return (
      <ScrollView>
        <SafeAreaView style={EstilosLogin.Contenedor}>
          <Text
            style={{
              ...Colores.Dorado,
              fontWeight: 'bold',
              fontSize: 30,
              paddingBottom: 30,
            }}>
            Notificaciones
          </Text>

          <FlatList
            data={Notificaciones}
            renderItem={({item}) => {
              return (
                <Text style={Notificacion.Singular}>{item.notificacion}</Text>
              );
            }}
            keyExtractor={(item) => item.id_notificaciones_leona_app}
          />
        </SafeAreaView>
      </ScrollView>
    );
  } else {
    <View style={EstilosLogin.Contenedor}>
      <Text>No se ha iniciado Sesiòn</Text>
    </View>;
  }
};
