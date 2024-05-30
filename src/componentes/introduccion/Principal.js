import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Boton from '../comunes/Boton';
import {Default_theme, Imagenes} from '../../constants';
import furnitures from '../../constants/furnitures';

const Principal = ({navigation}) => {
  return (
    <View style={style.princ}>
      <View style={style.cont_img}>
        <Image
          resizeMethod="scale"
          resizeMode="stretch"
          style={style.img}
          source={furnitures.furniture}
        />
      </View>
      <View style={style.body}>
        <View style={style.cont_logo}>
          <Image
            resizeMethod="scale"
            resizeMode="center"
            style={style.logo}
            source={Imagenes.logo}
          />
        </View>

        <View style={style.cont_btn}>
          <Text style={style.titulo}>FURNIVIEW</Text>
          <Boton
            func={() => {
              navigation.navigate('Ingresar');
            }}
            text={'Ingresar'}
          />
          <Boton
            func={() => {
              navigation.navigate('Registrarse');
            }}
            text={'Registrarse'}
          />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  princ: {
    flex: 1,
    maxWidth: 360,
    backgroundColor: Default_theme.primary,
  },
  logo: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  img: {
    height: 360,
    width: 360,
    top: -50,
  },
  cont_img: {
    width: 360,
    height: '40%',
    overflow: 'hidden',
  },
  cont_logo: {
    backgroundColor: Default_theme.primary,
    height: 180,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    position: 'absolute',
    top: -90,
  },

  body: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
    backgroundColor: Default_theme.primary,
  },

  titulo: {
    fontSize: 42,
    fontWeight: '900',
    color: '#000',
    marginBottom: 20,
  },

  cont_btn: {
    marginTop: 50,
    alignItems: 'center',
    gap: 20,
  },
});

export default Principal;
