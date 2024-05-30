import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Boton from './Boton';
import {Default_theme} from '../../constants';

const BottomTap = ({precio, styleExt}) => {
  return (
    <View style={[style.btm, styleExt]}>
      <Text style={style.text}>{'$' + (precio ? precio : '00.00')}</Text>
      <Boton text={'Reservar'} />
    </View>
  );
};

const style = StyleSheet.create({
  btm: {
    flexDirection: 'row',
    backgroundColor: Default_theme.cuartario,
    width: 360,
    height: 69,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
  text: {
    fontWeight: '900',
    fontSize: 32,
  },
});

export default BottomTap;
