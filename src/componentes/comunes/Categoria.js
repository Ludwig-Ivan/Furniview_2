import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Producto_2 from './Producto_2';

const Categoria = ({title, cat, styleExt, func}) => {
  const items = () => {
    const list_items = [];
    for (let i = 0; i < cat.length; i++) {
      list_items.push(
        <Producto_2
          producto={cat[i]}
          func={func}
          key={i}
          styleExt={style.item}
        />,
      );
    }
    return list_items;
  };

  return (
    <View style={[style.body, styleExt]}>
      <Text style={style.titulo}>{title}</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={style.list}>
        {items()}
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
