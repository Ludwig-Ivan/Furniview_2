import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Default_theme} from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

const Producto_2 = ({producto, func, styleExt}) => {
  const {id, nombre, precio, imagen} = producto;
  return (
    <Pressable
      style={[style.body, styleExt]}
      onPress={() => {
        try {
          func(id);
        } catch (error) {
          console.error('error al ejecutar la funcion');
        }
      }}>
      <View style={style.info}>
        <Image style={style.img} source={{uri: imagen}} />
        <Text style={style.precio}>{'$' + (precio ? precio : '00.00')}</Text>
        <Pressable
          onPress={() => {
            console.log('falta icono');
          }}>
          <View style={style.icon}>
            <Icon name={'heart-outline'} size={30} color={'#000'} />
          </View>
        </Pressable>
        <Text style={style.prod}>{nombre ? nombre : 'Producto'}</Text>
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  body: {
    backgroundColor: Default_theme.quintario,
    width: 173,
    height: 174,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  icon: {
    right: 15,
    top: 15,
    position: 'absolute',
  },
  img: {
    height: 184,
    width: 184,
    position: 'absolute',
  },
  info: {
    width: 184,
    height: 184,
  },
  precio: {
    left: 15,
    top: 15,
    position: 'absolute',
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
  },
  prod: {
    left: 25,
    bottom: 15,
    position: 'absolute',
    fontSize: 14,
    color: '#000',
  },
});

export default Producto_2;
