import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Default_theme, icons} from '../../constants';
import Boton from './Boton';

const Alerta_Btn = ({icon, titulo, msg, btn}) => {
  return (
    <View style={style.body}>
      <Image style={style.slr} source={icons.cross_circle} />
      <Image style={style.icon} source={icon ? icon : icons.checkbox} />
      <Text style={style.title}>{titulo ? titulo : 'Titulo'}</Text>
      <Text style={style.msg}>{msg ? msg : 'Mensaje'}</Text>
      <Boton text={btn ? btn : 'Boton'} />
    </View>
  );
};

const style = StyleSheet.create({
  body: {
    height: 280,
    width: 260,
    backgroundColor: Default_theme.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  slr: {
    height: 40,
    width: 40,
    position: 'absolute',
    right: 15,
    top: 15,
  },
  icon: {
    height: 80,
    width: 80,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000',
  },
  msg: {
    color: '#000',
    fontSize: 16,
  },
});

export default Alerta_Btn;
