import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const Etiqueta = ({text, func, styleExt}) => {
  return (
    <Pressable
      onPress={() => {
        try {
          func();
        } catch (error) {
          console.error('error en ejecutar la funcion');
        }
      }}
      style={[style.etq, styleExt]}>
      <Text style={style.text}>{text ? text : 'Etiqueta'}</Text>
    </Pressable>
  );
};

const style = StyleSheet.create({
  etq: {
    backgroundColor: '#54422E',
    height: 45,
    width: 110,
    minWidth: 110,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
export default Etiqueta;
