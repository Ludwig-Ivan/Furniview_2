import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Producto_2 from './Producto_2';
import axios from 'axios';
import {JsonInfo} from '../../constants';

//funcion que genera la lista de productos en base a la categoria que contiene productos pertenecientes a esta
function items(list_prod, func) {
  const list_items = [];
  for (let i = 0; i < list_prod.length; i++) {
    list_items.push(
      <Producto_2
        producto={list_prod[i]}
        func={func}
        key={i}
        styleExt={style.item}
      />,
    );
  }
  return list_items;
}

//funcion asincrona que devuelve la categoria indicada
async function obtenerCat(setList, cat) {
  try {
    setList(
      (await axios.get(`https://${JsonInfo.ip}/productos/categoria/${cat}`))
        .data,
    );
  } catch (error) {
    console.log(error);
  }
}

const Categoria = ({cat, styleExt, func}) => {
  const [list_prod, setList] = useState([]);
  useEffect(() => {
    obtenerCat(setList, cat);
  }, [cat]);

  return (
    <View style={[style.body, styleExt]}>
      <Text style={style.titulo}>{cat}</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={style.list}>
        {items(list_prod, func)}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  body: {
    gap: 10,
  },
  list: {
    gap: 20,
  },
  titulo: {
    marginLeft: 10,
    fontSize: 24,
    fontWeight: '900',
    color: '#000',
  },
  item: {
    marginHorizontal: 10,
  },
});

export default Categoria;
