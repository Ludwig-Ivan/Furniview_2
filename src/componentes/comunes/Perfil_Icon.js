import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {Imagenes} from '../../constants';

const Perfil_Icon = ({perfil}) => {
  return <Image style={style.img} source={perfil ? perfil : Imagenes.perfil} />;
};
const style = StyleSheet.create({
  img: {
    borderRadius: 50,
    width: 45,
    height: 45,
  },
});
export default Perfil_Icon;
