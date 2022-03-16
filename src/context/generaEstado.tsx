import {AuthState} from './AuthContext';

type AuthAcction =
  | {
      type: 'singIn';
      payload: {curp: string; idp: number; mensaje: string; token: string};
    }
  | {type: 'singOut'}
  | {type: 'mensajeError'; payload: string}
  | {type: 'quitarError'}
  | {type: 'noAutenticado'};

export const generaEstado = (
  state: AuthState,
  acction: AuthAcction,
): AuthState => {
  switch (acction.type) {
    case 'singIn':
      return {
        ...state,
        logeado: true,
        curp: acction.payload.curp,
        idp: acction.payload.idp,
        mensaje: acction.payload.mensaje,
        token: acction.payload.token,
      };
    //
    case 'mensajeError':
      return {
        ...state,
        logeado: false,
        mensaje: 'prueba mensaje',
        //mensaje:acction.payload
      };
    case 'quitarError':
      return {
        ...state,
        mensaje: '',
      };

    // Salir de la Sesion
    case 'singOut':
      return {
        ...state,
        logeado: false,
        curp: undefined,
        idp: undefined,
        mensaje: undefined,
        token: undefined,
      };
    //

    case 'noAutenticado':
      return {
        ...state,
        logeado: false,
        curp: '',
        idp: undefined,
        mensaje: '',
        token: '',
      };

    default:
      return state;
  }
};
