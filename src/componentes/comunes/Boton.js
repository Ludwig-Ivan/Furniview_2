import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';

//Boton recibe un texto para el boton y estilos extra para el boton
const Boton = ({text, func, styleExt}) => {
  return (
    <Pressable
      onPress={() => {
        try {
          func();
        } catch (error) {
          console.error('error al ejecutar la funcion');
        }
      }}
      style={[styles.btn, styleExt]}>
      <Text style={styles.text}> {text ? text : 'Boton'} </Text>
    </Pressable>
  );
};

//Estilos por defecto del boton
const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#331E0B',
    width: 180,
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '900',
    color: '#FFF',
  },
});

export default Boton;
