import React, {useContext} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  SafeAreaView,
} from 'react-native';
import {AuthContext, authInitialState} from '../../context/AuthContext';
import {EstilosGenerales} from '../../css/Estilos';

export const Bienvenido = () => {
  const {authState} = useContext(AuthContext);

  const handleAprendeyCreaPress = async () => {
    Linking.openURL(
      'http://derechohabientes.sui.dif.cdmx.gob.mx/sui/subsistemas/registros/new_pro/registro.php',
    );
  };
  const handleyoutubePress = async () => {
    Linking.openURL(
      'https://becaleonavicario.cdmx.gob.mx/I/atenciones-integrales-virtuales',
    );
  };

  return (
    <ScrollView>
      <SafeAreaView style={EstilosGenerales.Contenedor}>
        <Image
          source={{
            uri: 'https://sui.dif.cdmx.gob.mx/sui/_app/img_leona_bicario.jpg',
          }}
          style={EstilosGenerales.StyleImagen}
        />
        {authState.logeado && (
          <Text style={EstilosGenerales.Titulos}>Bienvenido a tu app</Text>
        )}
        <Text style={EstilosGenerales.StyleTexto}>
          Apoya a niñas, niños y adolescentes de 0 a 17 años 11 meses, que viven
          situaciones de alta vulnerabilidad, atendiendo a la restitución de sus
          derechos en particular de educación y alimentación.
        </Text>
        <Text style={EstilosGenerales.StyleTexto}>
          Contribuir a la restitución de los derechos de hasta 35,500 niñas,
          niños y adolescentes, de 0 a 17 años 11 meses, que viven situaciones
          de alta vulnerabilidad, que favorezca su desarrollo integral, de
          manera particular, sus derechos a la educación y alimentación
        </Text>
        <View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={EstilosGenerales.TuchableButton}
            onPress={handleAprendeyCreaPress}>
            <Text style={EstilosGenerales.TextoButton}>
              Registrate Aprende y Crea
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={EstilosGenerales.TuchableButton}
            onPress={handleyoutubePress}>
            <Text style={EstilosGenerales.TextoButton}>
              Atenciones Integrales
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
