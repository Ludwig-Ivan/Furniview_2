/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import TextInputP from '../comunes/TextInputP';
import Boton from '../comunes/Boton';
import furnitures from '../../constants/furnitures';
import {Default_theme, JsonInfo} from '../../constants';
import Regresar from '../comunes/Regresar';
import axios from 'axios';
import validator from 'validator';
/*
funcion asincrona que recibe el email, contra, y la navegacion: para validar que el cliente que quiere ingresar
si concuerde con su contrasena, permitiendo la navegacion (Verificar el email que exista y este en formato correcto[pendiente])
*/
async function Ingresar_Val(email, password, navigation, setError) {
  try {
    const cli = await axios.get(
      `https://${JsonInfo.ip}/clientes/${email}/${password}`,
    );
    const ocli = cli.data;
    if (ocli !== null) {
      setError(false);
      navigation.navigate('Menu', {id: ocli.id});
    } else {
      setError(true);
    }
  } catch (error) {
    console.error(error);
  }
}

//Ventana de ingresar, se pide el email y contrasena
const Ingresar = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState(false);
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
          <Text style={style.tit}>INGRESAR</Text>
        </View>
        <View style={style.form_cont}>
          <View style={style.form}>
            <TextInputP
              value={email}
              setText={setEmail}
              titulo={'Usuario o Email'}
              placeholder={'usuario o example@gmail.com'}
            />
            <TextInputP
              value={contrasena}
              setText={setContrasena}
              titulo={'Contrasena'}
              placeholder={'contrasena'}
            />
            <Pressable
              onPress={() => {
                /* Mostrar modal alerta [pendiente] */
              }}>
              <Text style={style.link}>Olvidaste tu contrasena?</Text>
            </Pressable>
            {error ? (
              <Text style={{color: '#F00', fontStyle: 'italic'}}>
                Usuario o contrasena incorrecta
              </Text>
            ) : (
              ''
            )}
          </View>
          <Boton
            func={
              //funcion flecha que llama al metodo que se encarga de validar el inicion de sesion
              () => {
                if (
                  validator.isEmail(email) ||
                  (validator.isAlphanumeric(email) &&
                    !validator.isEmpty(email) &&
                    !validator.isEmpty(contrasena))
                ) {
                  setError(false);
                  Ingresar_Val(email, contrasena, navigation, setError);
                } else {
                  setError(true);
                }
              }
            }
            text={'Ingresar'}
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
    minHeight: 338,
    height: '70%', //448-70%
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cont_tit: {
    height: 62,
    width: 214,
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
  },
  form: {
    gap: 20,
  },
  link: {
    fontStyle: 'italic',
    width: 150,
    borderBottomWidth: 1,
    fontSize: 14,
    color: '#000',
  },
  bnt: {
    marginTop: 30,
  },
});

export default Ingresar;
