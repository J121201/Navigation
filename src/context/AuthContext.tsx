import React, {createContext, useReducer, useEffect} from 'react';
import {generaEstado} from './generaEstado';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Inferfases de para los tipos

export interface LoginResponse {
  curp: string;
  idp: number;
}

export interface LoginData {
  curp: string;
  idp: number;
}

// Definir como luce, que informacion tendre aqui
export interface AuthState {
  logeado: boolean;
  curp?: string;
  idp?: number;
  mensaje?: string;
  token?: string;
}

// Estado inicial
export const authInitialState: AuthState = {
  logeado: false,
  curp: undefined,
  idp: undefined,
  mensaje: undefined,
  token: undefined,
};

// Lo usaremos para decirle a React como luce y que expone el context
export interface AuthContextPropiedades {
  authState: AuthState;
  singIn: (LoginData: LoginData) => void;
  singOut: () => void;
  quitarError: () => void;
}

// Crear  el Contexto
export const AuthContext = createContext({} as AuthContextPropiedades);

// Componenete proveedor del estado
export const AuthProvedor = ({children}: any) => {
  const [authState, dispach] = useReducer(generaEstado, authInitialState);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');

    //#– Si no hay token
    if (token !== null) {
      //alert('Hay token ') ;
      //console.log('Mi token es:  '+token);
      //#-  Hay toquen
      const {data}: any = await axios.get(
        'https://sui.dif.cdmx.gob.mx/sui/subsistemas/UVZCSg==/YkdWdmJtRT0=/WVhCcFgyeGxiMjVo.php',
        {
          params: {
            token,
            x: 'T',
          },
        },
      );
      //console.log(data);
      if (data[0]['mensaje'] == 'OK') {
        dispach({
          type: 'singIn',
          payload: {
            curp: data[0]['curp'],
            idp: data[0]['idp'],
            mensaje: data[0]['mensaje'],
            token: data[0]['token'],
          },
        });

        await AsyncStorage.setItem('token', data[0]['token']);
      } else {
        dispach({type: 'mensajeError', payload: data[0]['mensaje']});
      }
    } else {
      console.log('SIN TOKEN');
    }
  };

  const singIn = async ({curp, idp}: LoginData) => {
    try {
      const {data}: any = await axios.get<LoginResponse>(
        'https://sui.dif.cdmx.gob.mx/sui/subsistemas/UVZCSg==/YkdWdmJtRT0=/WVhCcFgyeGxiMjVo.php',
        {
          params: {
            curp,
            idp,
            x: 'C',
          },
        },
      );
      //4291,'SAPK110829MDFNRRA8'
      //console.log(data);
      if (data[0]['mensaje'] == 'OK') {
        dispach({
          type: 'singIn',
          payload: {
            curp: data[0]['curp'],
            idp: data[0]['idp'],
            mensaje: data[0]['mensaje'],
            token: data[0]['token'],
          },
        });

        await AsyncStorage.setItem('token', data[0]['token']);
      } else {
        dispach({type: 'mensajeError', payload: data[0]['mensaje']});
      }
    } catch (error) {
      console.log({error});

      //dispach({type:'mensajeError',payload:data[0]['mensaje']})
    }
  };

  const singOut = async () => {
    await AsyncStorage.removeItem('token');
    dispach({type: 'singOut'});
  };
  const quitarError = () => {
    dispach({type: 'quitarError'});
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        singIn,
        singOut,
        quitarError,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
