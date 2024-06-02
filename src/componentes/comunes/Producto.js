/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Default_theme} from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

//Este componente recibe un objeto producto(contiene la informacion y la desempaqueta), una imagen relacionada, icon, func y estilos extras
const Producto = ({producto, img, icon, func, func2, styleExt}) => {
  const {id, nombre, precio, imagen} = producto;
  return (
    <Pressable
      onPress={() => {
        func2();
      }}
      style={[style.body, styleExt]}>
      <View style={{flexDirection: 'row', gap: 18, alignItems: 'center'}}>
        <Image style={style.furn} source={{uri: imagen}} />
        <View style={{gap: 16}}>
          <Text style={style.text}>{nombre ? nombre : 'Producto'}</Text>
          <Text style={style.text}>{'$' + (precio ? precio : '00.00')}</Text>
        </View>
      </View>
      <Pressable
        onPress={() => {
          try {
            func(id);
          } catch (error) {
            console.error('error al ejecutar la funcion');
          }
        }}>
        <Icon
          name={!icon ? 'help-circle-outline' : icon}
          size={25}
          color={'#000'}
        />
      </Pressable>
    </Pressable>
  );
};

const style = StyleSheet.create({
  body: {
    flexDirection: 'row',
    backgroundColor: Default_theme.primary,
    padding: 15,
    width: 317,
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  icon: {
    height: 20,
    width: 20,
  },
  furn: {
    height: 76,
    width: 76,
    borderRadius: 10,
    backgroundColor: Default_theme.quintario,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Producto;
