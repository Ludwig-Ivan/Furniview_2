import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TextInputP from '../comunes/TextInputP';
import Boton from '../comunes/Boton';
import {Default_theme} from '../../constants';

const Recuperar = () => {
  return (
    <View style={styles.body}>
      <Text style={styles.tit}>Rescuperar Contrasena</Text>
      <TextInputP titulo={'Email'} placeholder={'example.gmail.com'} />
      <Boton text={'Continuar'} />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: Default_theme.primary,
    width: 360,
    height: 263,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 20,
  },
  tit: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000',
  },
});

export default Recuperar;
