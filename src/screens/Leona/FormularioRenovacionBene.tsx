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
  Image,
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
import {launchImageLibrary} from 'react-native-image-picker';

//#-  Validate del Formulario
const loginValidationSchema = yup.object().shape({
  //estudia_renova: yup.string().required('*Campo requerido'),
  nombre_escuela: yup.string().required('*Campo requerido'),
  //id_escolaridad: yup.string().required('*Campo requerido'),

  cct: yup.string().required('*Campo requerido'),
  tel_escuela: yup.string().required('*Campo requerido'),
  //beca_empezar_renova: yup.string().required('*Campo requerido'),
  //id_caso_prioritario: yup.string().required('*Campo requerido'),
  nombre_prioritario: yup.string().required('*Campo requerido'),
  apellido_paterno_prioritario: yup.string().required('*Campo requerido'),
  apellido_materno_prioritario: yup.string().required('*Campo requerido'),
  //recibe_pension: yup.string().required('*Campo requerido'),
  pension_institucion: yup.string().required('*Campo requerido'),
  dedica_prioritario: yup.string().required('*Campo requerido'),
  //id_grupo_etnico: yup.string().required('*Campo requerido'),
});

export const FormularioRenovacionBene = () => {
  const [image, setImage] = useState('https://via.placeholder.com/200');
  const selectImage = () => {
    const options = {
      title: 'selecciona Imagen',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, (res) => {
      if (res.errorCode) {
        console.log(res.errorMessage);
      } else if (res.didCancel) {
        console.log('el usuario cancelo');
      } else {
        const path = res.assets[0].uri;
        setImage(path);
      }
    });
  };

  const [Notificaciones, setNotificaciones] = useState([]);

  const navigator = useNavigation();
  //#-  Use Effect de los datos
  useEffect(() => {}, []);
  const {
    estudia_renova,
    nombre_escuela,
    id_escolaridad,

    cct,
    tel_escuela,
    beca_empezar_renova,
    id_caso_prioritario,
    nombre_prioritario,
    apellido_paterno_prioritario,
    apellido_materno_prioritario,
    recibe_pension,
    pension_institucion,
    dedica_prioritario,
    id_grupo_etnico,
    onChange,
  } = useForm({
    estudia_renova: '',
    nombre_escuela: '',
    id_escolaridad: '',

    cct: '',
    tel_escuela: '',
    beca_empezar_renova: '',
    id_caso_prioritario: '',
    nombre_prioritario: '',
    apellido_paterno_prioritario: '',
    apellido_materno_prioritario: '',
    recibe_pension: '',
    pension_institucion: '',
    dedica_prioritario: '',
    id_grupo_etnico: '',
  });
  return (
    <SafeAreaView>
      <ScrollView>
        <Formik
          validateOnMount={true}
          validationSchema={loginValidationSchema}
          initialValues={{
            estudia_renova: '',
            nombre_escuela: '',
            id_escolaridad: '',

            cct: '',
            tel_escuela: '',
            beca_empezar_renova: '',
            id_caso_prioritario: '',
            nombre_prioritario: '',
            apellido_paterno_prioritario: '',
            apellido_materno_prioritario: '',
            recibe_pension: '',
            pension_institucion: '',
            dedica_prioritario: '',
            id_grupo_etnico: '',
          }}
          onSubmit={(values) => {
            const DatosConsulta = async () => {
              const {data}: any = await axios.get(
                'https://sui.dif.cdmx.gob.mx/sui/subsistemas/UVZCSg==/YkdWdmJtRT0=/aW5zZXJ0Cg==.php',
                {
                  params: {
                    tipo: 'RB',
                    estudia_renova: values['estudia_renova'],
                    nombre_escuela: values['nombre_escuela'],
                    id_escolaridad: values['id_escolaridad'],
                    cct: values['cct'],
                    tel_escuela: values['tel_escuela'],
                    beca_empezar_renova: values['beca_empezar_renova'],
                    id_caso_prioritario: values['id_caso_prioritario'],
                    nombre_prioritario: values['nombre_prioritario'],
                    apellido_paterno_prioritario:
                      values['apellido_paterno_prioritario'],
                    apellido_materno_prioritario:
                      values['apellido_materno_prioritario'],
                    recibe_pension: values['recibe_pension'],
                    pension_institucion: values['pension_institucion'],
                    dedica_prioritario: values['dedica_prioritario'],
                    id_grupo_etnico: values['id_grupo_etnico'],
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
              {/* #------ Datos del Solicitante ------# */}
              <Text
                style={{
                  fontSize: 30,
                  color: '#fff',
                  paddingLeft: 10,
                  marginTop: 50,
                  marginBottom: 20,
                  backgroundColor: '#9f2141',
                }}>
                Datos del Solicitante BENEFICIARIO
              </Text>
              <Text style={style.titulo}>Estudia</Text>
              <RNPickerSelect
                style={picketSelectStyle}
                onValueChange={handleChange('estudia_renova')}
                placeholder={{
                  label: '<--Seleciona-->',
                  value: 'X',
                }}
                items={[
                  {label: 'SI', value: 'SI'},
                  {label: 'NO', value: 'NO'},
                ]}
              />
              {errors.estudia_renova && touched.estudia_renova && (
                <Text style={style.errorText}>{errors.estudia_renova}</Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text style={style.titulo}>Nombre de la escuela actual</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('nombre_escuela')}
                onBlur={handleBlur('nombre_escuela')}
                value={values.nombre_escuela}
                keyboardType="default"></TextInput>
              {errors.nombre_escuela && touched.nombre_escuela && (
                <Text style={style.errorText}>{errors.nombre_escuela}</Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text style={style.titulo}>Nivel escolar</Text>
              <RNPickerSelect
                style={picketSelectStyle}
                onValueChange={handleChange('id_escolaridad')}
                placeholder={{
                  label: '<--Seleciona-->',
                  value: '99',
                }}
                items={[
                  {label: 'PREESCOLAR / JARDIN DE NIÑOS', value: '1'},
                  {label: 'PRIMARIA', value: '2'},
                  {label: 'SECUNDARIA', value: '3'},
                  {label: 'PREPARATORIA / BACHILLERATO', value: '4'},
                ]}
              />
              {errors.id_escolaridad && touched.id_escolaridad && (
                <Text style={style.errorText}>{errors.id_escolaridad}</Text>
              )}

              {/*---------------------------------------------------------------------------------*/}
              <Text style={style.titulo}>Clave escolar (C.C.T.)</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('cct')}
                onBlur={handleBlur('cct')}></TextInput>
              {errors.cct && touched.cct && (
                <Text style={style.errorText}>{errors.cct}</Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text style={style.titulo}>Telefono de la escuela</Text>
              <TextInput
                style={style.textInput}
                keyboardType="numeric"
                onChangeText={handleChange('tel_escuela')}
                onBlur={handleBlur('tel_escuela')}></TextInput>
              {errors.tel_escuela && touched.tel_escuela && (
                <Text style={style.errorText}>{errors.tel_escuela}</Text>
              )}

              {/*---------------------------------------------------------------------------------*/}
              <Text style={style.titulo}>
                ¿La niña, niño o adolescente solicitante cuenta con Mi beca para
                empezar?
              </Text>
              <RNPickerSelect
                style={picketSelectStyle}
                onValueChange={handleChange('beca_empezar_renova')}
                placeholder={{
                  label: '<--Seleciona-->',
                  value: 'X',
                }}
                items={[
                  {label: 'SI', value: 'SI'},
                  {label: 'NO', value: 'NO'},
                ]}
              />
              {errors.beca_empezar_renova && touched.beca_empezar_renova && (
                <Text style={style.errorText}>
                  {errors.beca_empezar_renova}
                </Text>
              )}
              {/* #------ Casos prioritarios ------# */}
              <Text
                style={{
                  fontSize: 30,
                  color: '#fff',
                  paddingLeft: 10,
                  marginTop: 50,
                  marginBottom: 20,
                  backgroundColor: '#4A8BC2',
                }}>
                Casos prioritarios
              </Text>
              <Text>Tipo de Caso</Text>
              <RNPickerSelect
                style={picketSelectStyle}
                onValueChange={handleChange('id_caso_prioritario')}
                placeholder={{
                  label: '<--Seleciona-->',
                  value: '99',
                }}
                items={[
                  {
                    label:
                      'DEFUNCIÓN DE LA MADRE PADRE O TUTOR RESPONSABLE DEL SOSTÉN ECONÓMICO',
                    value: '1',
                  },
                  {
                    label:
                      'MADRE PADRE O TUTOR CON DISCAPACIDAD PERMANENTE RESPONSABLE DEL SOSTÉN ECONÓMICO',
                    value: '2',
                  },
                  {label: 'MADRE O PADRE PRIVADO DE SU LIBERTAD', value: '3'},
                  {label: 'MADRE SOLA JEFA DE FAMILIA', value: '4'},
                ]}
              />
              {errors.id_caso_prioritario && touched.id_caso_prioritario && (
                <Text style={style.errorText}>
                  {errors.id_caso_prioritario}
                </Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text>Nombre</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('nombre_prioritario')}
                onBlur={handleBlur('nombre_prioritario')}></TextInput>
              {errors.nombre_prioritario && touched.nombre_prioritario && (
                <Text style={style.errorText}>{errors.nombre_prioritario}</Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text>Apellido Paterno</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('apellido_paterno_prioritario')}
                onBlur={handleBlur('apellido_paterno_prioritario')}></TextInput>
              {errors.apellido_paterno_prioritario &&
                touched.apellido_paterno_prioritario && (
                  <Text style={style.errorText}>
                    {errors.apellido_paterno_prioritario}
                  </Text>
                )}
              {/*---------------------------------------------------------------------------------*/}
              <Text>Apellido Materno</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('apellido_materno_prioritario')}
                onBlur={handleBlur('apellido_materno_prioritario')}></TextInput>
              {errors.apellido_materno_prioritario &&
                touched.apellido_materno_prioritario && (
                  <Text style={style.errorText}>
                    {errors.apellido_materno_prioritario}
                  </Text>
                )}
              {/*---------------------------------------------------------------------------------*/}
              <Text>¿recibe alguna pension?</Text>
              <RNPickerSelect
                style={picketSelectStyle}
                onValueChange={handleChange('recibe_pension')}
                placeholder={{
                  label: '<--Seleciona-->',
                  value: 'X',
                }}
                items={[
                  {label: 'Si', value: 'SI'},
                  {label: 'No', value: 'NO'},
                ]}
              />
              {errors.recibe_pension && touched.recibe_pension && (
                <Text style={style.errorText}>{errors.recibe_pension}</Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text>¿De que institucion?</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('pension_institucion')}
                onBlur={handleBlur('pension_institucion')}></TextInput>
              {errors.pension_institucion && touched.pension_institucion && (
                <Text style={style.errorText}>
                  {errors.pension_institucion}
                </Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text>¿A qué se dedica o dedicaba?</Text>
              <TextInput
                style={style.textInput}
                onChangeText={handleChange('dedica_prioritario')}
                onBlur={handleBlur('dedica_prioritario')}></TextInput>
              {errors.dedica_prioritario && touched.dedica_prioritario && (
                <Text style={style.errorText}>{errors.dedica_prioritario}</Text>
              )}
              {/*---------------------------------------------------------------------------------*/}
              <Text>Grupo étnico</Text>
              <RNPickerSelect
                style={picketSelectStyle}
                onValueChange={handleChange('id_grupo_etnico')}
                placeholder={{
                  label: '<--Seleciona-->',
                  value: '99',
                }}
                items={[
                  {label: 'Si', value: '1'},
                  {label: 'No', value: '2'},
                ]}
              />
              {errors.id_grupo_etnico && touched.id_grupo_etnico && (
                <Text style={style.errorText}>{errors.id_grupo_etnico}</Text>
              )}

              {/*# --------- Botones de Subir archivo  ---------
               */}
              <Button title="selecionar imagen" onPress={selectImage} />
              <Image
                style={{
                  alignSelf: 'center',
                  height: 200,
                  width: 200,
                }}
                source={{uri: image}}
              />

              {/*# --------- Botones de Subir archivo  --------- */}

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
