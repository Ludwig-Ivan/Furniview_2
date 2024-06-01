/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import TextInputP from '../comunes/TextInputP';
import Boton from '../comunes/Boton';
import furnitures from '../../constants/furnitures';
import {Default_theme, JsonInfo} from '../../constants';
import Regresar from '../comunes/Regresar';
import axios from 'axios';
import zxcvbn from 'zxcvbn';
import validator from 'validator';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Funcion encargada de Registrar el cliente en base a su email, contrasena y usuario
async function Registrar_Cli(email, user, password, navigation) {
  try {
    //Se registra el cliente
    await axios.post(`https://${JsonInfo.ip}/clientes`, {
      usuario: user,
      correo: email,
      password: password,
    });

    //obtengo el cliente recien creado para mandar la info a menu
    const cli = await axios.get(
      `https://${JsonInfo.ip}/clientes/${email}/${password}`,
    );
    const ocli = cli.data;

    if (ocli !== null) {
      await AsyncStorage.setItem('idCliente', JSON.stringify(ocli.id));
      navigation.navigate('Menu');
    }
  } catch (error) {
    console.error(error);
  }
}

//funcion que se encarga de validar todos los campos
function ValidarDatos(email, user, password, repcontrasena, score) {
  return email !== '' && user !== '' && password !== '' && repcontrasena !== ''
    ? validator.isEmail(email)
      ? validator.isAlphanumeric(user)
        ? score >= 3
          ? password === repcontrasena
            ? ''
            : 'La contrasenas no son iguales'
          : 'Contrasena poco segura'
        : 'El usuario no admite caracteres especiales'
      : 'Formato del email incorrecto'
    : 'Campos vacios';
}

//Ventana para el registro del cliente, se pide el email, usuario, contrasena y repetir esta misma
const Registrarse = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [repcontrasena, setRepContrasena] = useState('');
  const [score, setScore] = useState(0);
  const [error, setError] = useState(' ');

  useEffect(() => {
    setScore(zxcvbn(password).score);
  }, [password]);

  return (
    <View style={{flex: 1}}>
      <View style={style.cont_img}>
        <Image
          resizeMethod="scale"
          resizeMode="stretch"
          style={style.img}
          source={furnitures.furniture9}
        />
      </View>
      <Regresar styleExt={style.reg} />
      <View style={style.body}>
        <View style={style.cont_tit}>
          <Text style={style.tit}>REGISTRARSE</Text>
        </View>
        <View style={style.form_cont}>
          <View style={style.form}>
            <TextInputP
              value={email}
              setText={setEmail}
              titulo={'Email'}
              placeholder={'example@gmail.com'}
            />
            <TextInputP
              value={user}
              setText={setUser}
              titulo={'Nombre Usuario'}
              placeholder={'nombre Usuario'}
            />
            <TextInputP
              value={password}
              setText={setPassword}
              titulo={'Contrasena'}
              placeholder={'contrasena'}
            />
            <TextInputP
              value={repcontrasena}
              setText={setRepContrasena}
              titulo={'Repetir Contrasena'}
              placeholder={'Repetir contrasena'}
            />
            <Text
              style={{
                color: '#F00',
                alignSelf: 'flex-start',
              }}>
              {error}
            </Text>
          </View>

          <Boton
            func={
              //Funcion Flecha que llama al metodo para registrar al cliente
              () => {
                setError(
                  ValidarDatos(email, user, password, repcontrasena, score),
                );
                if (error === '') {
                  Registrar_Cli(email, user, password, navigation);
                }
              }
            }
            text={'Registrarse'}
            styleExt={style.bnt}
          />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  reg: {
    marginTop: 30,
  },
  img: {
    height: 360,
    width: 360,
    top: -50,
  },
  cont_img: {
    width: 360,
    height: 260,
    position: 'absolute',
  },
  body: {
    backgroundColor: Default_theme.primary,
    minHeight: 408,
    height: '75%', //448-70%
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cont_tit: {
    height: 62,
    width: 274,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    position: 'absolute',
    top: -30,
    backgroundColor: Default_theme.primary,
    alignSelf: 'flex-start',
  },
  tit: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  form_cont: {
    height: '75%',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 40,
  },
  form: {
    gap: 15,
  },

  bnt: {
    marginTop: 30,
  },
});
export default Registrarse;
