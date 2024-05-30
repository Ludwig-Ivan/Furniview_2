import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Default_theme, Furnitures} from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

const Producto_2 = ({producto, img, func, styleExt}) => {
  const {id, nombre, precio} = producto;
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
        <Image style={style.img} source={img ? img : Furnitures.furniture1} />
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
  },
  icon: {
    right: 1,
    top: 1,
    position: 'absolute',
  },
  img: {
    height: 154,
    width: 153,
    position: 'absolute',
  },
  info: {
    width: 153,
    height: 154,
  },
  precio: {
    left: 1,
    top: 1,
    position: 'absolute',
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
  },
  prod: {
    left: 1,
    bottom: 1,
    position: 'absolute',
    fontSize: 14,
    color: '#000',
  },
});

export default Producto_2;
