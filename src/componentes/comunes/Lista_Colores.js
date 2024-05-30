import React from 'react';
import {StyleSheet, View} from 'react-native';
import Color from './Color';

const Lista_Colores = ({colores}) => {
  const {color1, color2, color3, color4} = colores
    ? colores
    : {colo1: '', color2: '', color3: '', color4: ''};
  return (
    <View style={style.list}>
      <Color color={color1} />
      <Color color={color2} />
      <Color color={color3} />
      <Color color={color4} />
    </View>
  );
};

const style = StyleSheet.create({
  list: {
    flexDirection: 'row',
    gap: 10,
    alignSelf: 'center',
  },
});
export default Lista_Colores;
