import {StyleSheet} from 'react-native';

export const EstilosGenerales = StyleSheet.create({
  Contenedor: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#F7F7F7',
    height: '100%',
  },
  StyleImagen: {
    width: '80%',
    height: 200,
    marginBottom: 20,
  },
  StyleTexto: {
    color: 'black',
    width: '80%',
    marginBottom: 20,
  },
  Titulos: {
    color: '#9f2141',
    fontSize: 20,
    marginBottom: 5,
  },
  TuchableButton: {
    backgroundColor: '#9f2141',
    borderRadius: 100,
    borderColor: '#9f2141',
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  TuchableButtonArchivo: {
    backgroundColor: '#bc955a',
    borderRadius: 100,
    borderColor: '#9f2141',
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 20,
    width: '90%',
  },

  TextoButton: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },

  Notificacion: {
    backgroundColor: '#D8DED8',
    color: '#797979',
    padding: 10,
    borderTopLeftRadius: 6,
    borderTopColor: '#a7a7a7',
    marginVertical: 20,
    textAlign: 'center',
  },
});

export const Colores = StyleSheet.create({
  Guinda: {
    color: '#f7f7f7',
  },
  GuidaFondo: {
    backgroundColor: '#f7f7f7',
  },
  Dorado: {
    color: '#bc955a',
  },
  DoradoFondo: {
    backgroundColor: '#bc955a',
  },
});

export const EstilosLogin = StyleSheet.create({
  Fondo: {
    backgroundColor: '#F7F7F7',
  },
  Contenedor: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#F7F7F7',
    height: '100%',
  },
  AvatarLogin: {
    width: 150,
    height: 150,
  },
  AvatarLoginPie: {
    width: '100%',
    top: '40%',
    height: 70,
  },

  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});

export const EstilosFormulario = StyleSheet.create({
  Boton: {
    backgroundColor: '#9f2141',
    width: '40%',
    marginVertical: 20,
    alignItems: 'center',
    position: 'relative',
    height: 35,
    borderRadius: 100,
  },
  BotonTexto: {
    position: 'absolute',
    color: 'white',
  },
  Input: {
    height: 50,
    margin: 10,
    padding: 10,
    width: '80%',
    borderRadius: 100,
    backgroundColor: '#9F2141',
    color: 'white',
  },
  InputTexto: {
    textAlign: 'center',
    fontSize: 17,
    color: '#BC955A',
    fontWeight: 'bold',
  },
  Label: {
    fontSize: 14,
    color: 'black',
  },
  InputText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#BC955A',
    fontWeight: 'bold',
    padding: 0,
  },
  ContenedorButton: {
    alignItems: 'center',
  },
  TuchableButton: {
    backgroundColor: '#9f2141',
    borderRadius: 100,
    borderColor: '#9f2141',
    borderWidth: 2,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  TextoButton: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  ViewContenedor: {
    padding: 10,
    borderWidth: 5,
    borderColor: '#BC955A',
  },
  ColorDorado: {
    color: '#BC955A',
  },
  inputCombo: {
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
    color: 'red',
  },
});

export const Carta = StyleSheet.create({
  ContenedorCarta: {
    width: '95%',
    marginHorizontal: 10,
  },
  Carta: {
    width: '100%',
    padding: 5,
    marginTop: 10,
    textAlign: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    borderRadius: 15,
    shadowOffset: {
      width: 4,
      height: 3,
    },
    shadowOpacity: 0.9,
    shadowRadius: 1.41,

    elevation: 2,
  },
  ContenidoCarta: {
    padding: 10,
    textAlign: 'center',
  },
  TituloCarta: {
    marginBottom: 10,
    color: '#9f2141',
    fontSize: 20,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#9f2141',
  },
  LabelCarta: {
    fontSize: 14,
    marginBottom: 5,
  },
  DatoCarta: {
    fontSize: 14,
    marginBottom: 5,
    color: '#BC955A',
  },
});

export const Notificacion = StyleSheet.create({
  Singular: {
    color: '#fff',
    backgroundColor: '#9f2141',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
    fontSize: 15,
  },
});
