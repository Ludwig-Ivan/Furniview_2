import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import TextInputP from '../comunes/TextInputP';
import Boton from '../comunes/Boton';
import {Default_theme} from '../../constants';

const Restablecer = () => {
  return (
    <View style={style.body}>
      <Text style={style.tit}>Restablecer Contrasena</Text>
      <TextInputP titulo={'Contrasena'} placeholder={'contrasena'} />
      <TextInputP
        titulo={'Repetir contrasena'}
        placeholder={'repetir contrasena'}
      />
      <Boton text={'Continuar'} />
    </View>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: Default_theme.primary,
  },
  tit: {
    fontSize: 24,
    fontWeight: '900',
  },
});
export default Restablecer;
