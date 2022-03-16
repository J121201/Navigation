import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  SafeAreaView,
} from 'react-native';
import {AuthContext, authInitialState} from '../../context/AuthContext';
import {Carta, EstilosLogin} from '../../css/Estilos';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export const Informacion = () => {
  const {authState} = useContext(AuthContext);

  //#- Constante del Diseño

  //#- Consulta para traer los dataos del Beneficiario
  const [infoDerecho, setInfoDerecho] = useState([]);
  useEffect(() => {
    const DatosConsulta = async () => {
      const {data}: any = await axios.get(
        'https://sui.dif.cdmx.gob.mx/sui/subsistemas/UVZCSg==/YkdWdmJtRT0=/WVhCcFgyeGxiMjVo.php',
        {
          params: {
            curp: authState.curp,
            idp: authState.idp,
            x: 'BENEFICIARIO',
          },
        },
      );

      setInfoDerecho(data);
    };
    DatosConsulta();
  }, []);

  //#- Consulta para traer los dataos del Tutor
  const [infoTutor, setInfoTutor] = useState([]);
  useEffect(() => {
    const DatosConsultaTutor = async () => {
      const {data}: any = await axios.get(
        'https://sui.dif.cdmx.gob.mx/sui/subsistemas/UVZCSg==/YkdWdmJtRT0=/WVhCcFgyeGxiMjVo.php',
        {
          params: {
            curp: authState.curp,
            idp: authState.idp,
            x: 'TUTOR',
          },
        },
      );

      setInfoTutor(data);
    };
    DatosConsultaTutor();
  }, []);

  //#- Consulta para traer los dataos del Tutor
  const [infoDomicilio, setInfoDomicilio] = useState([]);
  useEffect(() => {
    const DatosConsultaDomicilio = async () => {
      const {data}: any = await axios.get(
        'https://sui.dif.cdmx.gob.mx/sui/subsistemas/UVZCSg==/YkdWdmJtRT0=/WVhCcFgyeGxiMjVo.php',
        {
          params: {
            curp: authState.curp,
            idp: authState.idp,
            x: 'DOMICILIO',
          },
        },
      );

      setInfoDomicilio(data);
    };
    DatosConsultaDomicilio();
  }, []);

  const Etiqueta = (props) => {
    const {titulo, texto} = props;
    return (
      <>
        <Text style={Carta.LabelCarta}>{titulo} </Text>
        <Text style={Carta.DatoCarta}>{texto}</Text>
      </>
    );
  };

  const Tarjeta = (props) => {
    const {titulo, etiquetasArray} = props;
    const defaultLimit = 1;
    const [limit, setLimit] = useState(defaultLimit);

    const handleClick = () => {
      setLimit(limit === defaultLimit ? 100 : defaultLimit);
    };

    return (
      <View style={Carta.Carta}>
        <TouchableWithoutFeedback onPress={handleClick}>
          <View style={Carta.ContenedorCarta}>
            <Text style={Carta.TituloCarta}>{titulo}</Text>
            {etiquetasArray.map(({titulo, texto}, index) => {
              return index < limit ? (
                <Etiqueta titulo={titulo} texto={texto} />
              ) : (
                <></>
              );
            })}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  const DatosDeInfante = ({infante}) => {
    const {nombre_completo, ...otros} = infante;
    const etiquetasArray = Object.entries(otros).map((items) => ({
      titulo: items[0],
      texto: items[1],
    }));

    return (
      <Tarjeta
        titulo={'Datos de ' + nombre_completo}
        etiquetasArray={etiquetasArray}
      />
    );
  };

  const TarjetaDeInformacion = ({titulo, datos}) => {
    const {datosInformacion, ...otros} = datos;
    const etiquetasArray = Object.entries(otros).map((items) => ({
      titulo: items[0],
      texto: items[1],
    }));

    return (
      <Tarjeta titulo={'Datos de ' + titulo} etiquetasArray={etiquetasArray} />
    );
  };

  if (authState.mensaje == 'OK') {
    return (
      <>
        <SafeAreaView style={EstilosLogin.Contenedor}>
          <View>
            <ScrollView>
              {infoTutor.map((AsValueTutor) => (
                <TarjetaDeInformacion datos={AsValueTutor} titulo="Tutor" />
              ))}
              {infoDerecho.map((AsValue) => (
                <DatosDeInfante infante={AsValue} />
              ))}
              {infoDomicilio.map((AsValueDomicilio) => (
                <TarjetaDeInformacion
                  datos={AsValueDomicilio}
                  titulo="Domicilio"
                />
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </>
    );
  } else {
    return <Text>No pasa:</Text>;
  }
};
