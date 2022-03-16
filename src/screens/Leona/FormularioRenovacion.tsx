import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {styles} from '../../theme/appTheme';
import {EstilosGenerales} from '../../css/Estilos';
import RNPickerSelect from 'react-native-picker-select';
import {ScrollView} from 'react-native-gesture-handler';
import {useForm} from '../../hook/useForm';
import {Formik, validateYupSchema} from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext, authInitialState } from '../../context/AuthContext';

//SAAA110922MDFNLLA5
//#-  Validate del Formulario
const loginValidationSchema = yup.object().shape({
  //id_vialidad: yup.string().required('*Campo requerido'),
  nombre_vialidad: yup.string().required('*Campo requerido'),
  num_exterior: yup.string().required('*Campo requerido'),
  num_interior: yup.string().required('*Campo requerido'),
  entre_calle: yup.string().required('*Campo requerido'),
  y_calle: yup.string().required('*Campo requerido'),
  codigo_postal: yup.string().required('*Campo requerido'),
  tipo_asentamiento: yup.string().required('*Campo requerido'),
  nombre_asentamiento: yup.string().required('*Campo requerido'),
  //id_delegacion: yup.string().required('*Campo requerido'),
  ut: yup.string().required('*Campo requerido'),
  ingreso_economico: yup.string().required('*Campo requerido'),
  tel_casa: yup.string().required('*Campo requerido'),
  tel_cel: yup.string().required('*Campo requerido'),
  tel_recados: yup.string().required('*Campo requerido'),
  tel_otro: yup.string().required('*Campo requerido'),
  correo: yup.string().required('*Campo requerido'),
});
interface Props extends StackScreenProps <any, any> {};

export const FormularioRenovacion = ({route, }: Props) => {

  const params = route.params;

  console.log(params)

  const [Notificaciones, setNotificaciones] = useState([]);

  const navigator = useNavigation();
  //#-  Use Effect de los datos
  useEffect(() => {}, []);
  const {
    id_vialidad,
    nombre_vialidad,
    num_exterior,
    num_interior,
    entre_calle,
    y_calle,
    codigo_postal,
    tipo_asentamiento,
    nombre_asentamiento,
    id_delegacion,
    ut,
    ingreso_economico,
    tel_casa,
    tel_cel,
    tel_recados,
    tel_otro,
    correo,
    onChange,
  } = useForm({
    id_vialidad: '',
    nombre_vialidad: '',
    num_exterior: '',
    num_interior: '',
    entre_calle: '',
    y_calle: '',
    codigo_postal: '',
    tipo_asentamiento: '',
    nombre_asentamiento: '',
    id_delegacion: '',
    ut: '',
    ingreso_economico: '',
    tel_casa: '',
    tel_cel: '',
    tel_recados: '',
    tel_otro: '',
    correo: '',
  });
  return (
    <SafeAreaView>
      <ScrollView>
        <Formik
          validateOnMount={true}
          validationSchema={loginValidationSchema}
          initialValues={{
            id_vialidad: '',
            nombre_vialidad: '',
            num_exterior: '',
            num_interior: '',
            entre_calle: '',
            y_calle: '',
            codigo_postal: '',
            tipo_asentamiento: '',
            nombre_asentamiento: '',
            id_delegacion: '',
            ut: '',
            ingreso_economico: '',
            tel_casa: '',
            tel_cel: '',
            tel_recados: '',
            tel_otro: '',
            correo: '',
          }}
          onSubmit={(values) => {
            const DatosConsulta = async () => {
              const {data}: any = await axios.get(
                'https://sui.dif.cdmx.gob.mx/sui/subsistemas/UVZCSg==/YkdWdmJtRT0=/aW5zZXJ0Cg==.php',
                {
                  params: {
                    tipo: 'RF',
                    id_vialidad: values['id_vialidad'],
                    nombre_vialidad: values['nombre_vialidad'],
                    num_exterior: values['num_exterior'],
                    num_interior: values['num_interior'],
                    entre_calle: values['entre_calle'],
                    y_calle: values['y_calle'],
                    codigo_postal: values['codigo_postal'],
                    tipo_asentamiento: values['tipo_asentamiento'],
                    nombre_asentamiento: values['nombre_asentamiento'],
                    id_delegacion: values['id_delegacion'],
                    ut: values['ut'],
                    ingreso_economico: values['ingreso_economico'],
                    tel_casa: values['tel_casa'],
                    tel_cel: values['tel_cel'],
                    tel_recados: values['tel_recados'],
                    tel_otro: values['tel_otro'],
                    correo: values['correo'],
                  },
                },
              );
              setNotificaciones(data);
              console.log(data);
            };
            DatosConsulta();
            const pasa = 'OK';

            if (pasa === 'OK') {
              Alert.alert(
                'Guardo',
                'La Informacion fue Gardada Correctamente',
                [
                  {
                    text: 'Regresar',
                    onPress: () => navigator.navigate('Renovacion'),
                    style: 'cancel',
                  },
                ],
                {
                  cancelable: true,
                  onDismiss: () => navigator.navigate('Renovacion'),
                },
              );
            } else {
              Alert.alert(
                'Error en la Conexion',
                'Error en la conexion Volver a intentar',
                [
                  {
                    text: 'Regresar',
                    onPress: () => Alert.alert('Cancel Pressed'),
                    style: 'cancel',
                  },
                ],
                {
                  cancelable: true,
                  onDismiss: () =>
                    Alert.alert(
                      'This alert was dismissed by tapping outside of the alert dialog.',
                    ),
                },
              );
            }

            //console.log(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              {/* #------ Datos de domicilio ------# */}
              <Text
                style={{
                  fontSize: 30,
                  color: '#fff',
                  paddingLeft: 10,
                  marginTop: 50,
                  marginBottom: 20,
                  backgroundColor: '#9f2141',
                }}>
                Datos de domicilio
              </Text>
              <Text style={style.titulo}>Tipo de Vialidad:</Text>
              <RNPickerSelect
                style={picketSelectStyle}
                onValueChange={handleChange('id_vialidad')}
                placeholder={{
                  label: '<--Seleciona-->',
                  value: '99',
                }}
                items={[
                  {label: 'Si', value: '1'},
                  {label: 'No', value: '2'},
                ]}
              />
              {errors.id_vialidad && touched.id_vialidad && (
                <Text style={style.errorText}>{errors.id_vialidad}</Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text style={style.titulo}>Nombre vialidad</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('nombre_vialidad')}
                onBlur={handleBlur('nombre_vialidad')}></TextInput>
              {errors.nombre_vialidad && touched.nombre_vialidad && (
                <Text style={style.errorText}>{errors.nombre_vialidad}</Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text style={style.titulo}>Numero exterior</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('num_exterior')}
                onBlur={handleBlur('num_exterior')}></TextInput>
              {errors.num_exterior && touched.num_exterior && (
                <Text style={style.errorText}>{errors.num_exterior}</Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text style={style.titulo}>Numero interior</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('num_interior')}
                onBlur={handleBlur('num_interior')}></TextInput>
              {errors.num_interior && touched.num_interior && (
                <Text style={style.errorText}>{errors.num_interior}</Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text style={style.titulo}>Entre calle</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('entre_calle')}
                onBlur={handleBlur('entre_calle')}></TextInput>
              {errors.entre_calle && touched.entre_calle && (
                <Text style={style.errorText}>{errors.entre_calle}</Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text style={style.titulo}>y calle</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('y_calle')}
                onBlur={handleBlur('y_calle')}></TextInput>
              {errors.y_calle && touched.y_calle && (
                <Text style={style.errorText}>{errors.y_calle}</Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text style={style.titulo}>Codigo Postal</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('codigo_postal')}
                onBlur={handleBlur('codigo_postal')}></TextInput>
              {errors.codigo_postal && touched.codigo_postal && (
                <Text style={style.errorText}>{errors.codigo_postal}</Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text style={style.titulo}>Tipo de asentamiento</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('tipo_asentamiento')}
                onBlur={handleBlur('tipo_asentamiento')}></TextInput>
              {errors.tipo_asentamiento && touched.tipo_asentamiento && (
                <Text style={style.errorText}>{errors.tipo_asentamiento}</Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text style={style.titulo}>Nombre del asentamiento</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('nombre_asentamiento')}
                onBlur={handleBlur('nombre_asentamiento')}></TextInput>
              {errors.nombre_asentamiento && touched.nombre_asentamiento && (
                <Text style={style.errorText}>
                  {errors.nombre_asentamiento}
                </Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text style={style.titulo}>Alcaldia</Text>
              <RNPickerSelect
                style={picketSelectStyle}
                onValueChange={handleChange('id_delegacion')}
                placeholder={{
                  label: '<--Seleciona-->',
                  value: '99',
                }}
                items={[
                  {label: 'SI', value: '1'},
                  {label: 'NO', value: '2'},
                ]}
              />
              {errors.id_delegacion && touched.id_delegacion && (
                <Text style={style.errorText}>{errors.id_delegacion}</Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text style={style.titulo}>UT</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('ut')}
                onBlur={handleBlur('ut')}></TextInput>
              {errors.ut && touched.ut && (
                <Text style={style.errorText}>{errors.ut}</Text>
              )}
              {/* #------ Datos del Tutor ------# */}
              <Text
                style={{
                  fontSize: 30,
                  color: '#fff',
                  paddingLeft: 10,
                  marginTop: 50,
                  marginBottom: 20,
                  backgroundColor: '#9f2141',
                }}>
                Datos del Tutor
              </Text>

              {/*---------------------------------------------------------------------------------*/}
              <Text>Ingreso económico mensual</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('ingreso_economico')}
                onBlur={handleBlur('ingreso_economico')}></TextInput>
              {errors.ingreso_economico && touched.ingreso_economico && (
                <Text style={style.errorText}>{errors.ingreso_economico}</Text>
              )}

              <Text>Telefono casa</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('tel_casa')}
                onBlur={handleBlur('tel_casa')}></TextInput>
              {errors.tel_casa && touched.tel_casa && (
                <Text style={style.errorText}>{errors.tel_casa}</Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text>Telefono Celular</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('tel_cel')}
                onBlur={handleBlur('tel_cel')}></TextInput>
              {errors.tel_cel && touched.tel_cel && (
                <Text style={style.errorText}>{errors.tel_cel}</Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text>Telefono Recados</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('tel_recados')}
                onBlur={handleBlur('tel_recados')}></TextInput>
              {errors.tel_recados && touched.tel_recados && (
                <Text style={style.errorText}>{errors.tel_recados}</Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text>Otro Telefono</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('tel_otro')}
                onBlur={handleBlur('tel_otro')}></TextInput>
              {errors.tel_otro && touched.tel_otro && (
                <Text style={style.errorText}>{errors.tel_otro}</Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text>Correo Electronico</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('correo')}
                onBlur={handleBlur('correo')}></TextInput>
              {errors.correo && touched.correo && (
                <Text style={style.errorText}>{errors.correo}</Text>
              )}

              {/*# --------- Botones de Guardar --------- */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={EstilosGenerales.TuchableButton}
                onPress={handleSubmit}>
                <Text style={EstilosGenerales.TextoButton}>
                  Guardar Información
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={EstilosGenerales.TuchableButton}
                onPress={() => navigator.navigate('Renovacion')}>
                <Text style={EstilosGenerales.TextoButton}>Regresar</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  titulo: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  textInput: {
    fontSize: 18,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    padding: 5,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    margin: 2,
  },
});
const picketSelectStyle = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 30,
    padding: 5,
  },
  inputAndroid: {
    fontSize: 18,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 30,
    padding: 5,
  },
});
