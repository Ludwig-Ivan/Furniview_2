import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Item from './Item';
import {Default_theme} from '../../constants';

const Seccion_2 = ({titulo, list_info, list_icons, styleExt}) => {
  function items() {
    const list_items = [];
    for (let i = 0; i < list_info.length; i++) {
      list_items.push(
        <Item
          key={i}
          value={list_info[i]}
          icon={list_icons[i]}
          edit={false}
          styleExt={style.item}
        />,
      );
    }
    return list_items;
  }

  return (
    <View style={[style.sec, styleExt]}>
      <Text style={style.titulo}>{titulo ? titulo : 'Seccion'}</Text>
      <View>{items()}</View>
    </View>
  );
};

const style = StyleSheet.create({
  sec: {
    backgroundColor: Default_theme.primary,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    minHeight: 36,
    backgroundColor: Default_theme.cuartario,
    textAlignVertical: 'center',
    padding: 9,
  },
  item: {
    borderBottomWidth: 0,
  },
});
export default Seccion_2;
