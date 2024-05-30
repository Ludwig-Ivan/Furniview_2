import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Item from './Item';
import {Default_theme} from '../../constants';

const Seccion = ({titulo, value, edit, setText, icon}) => {
  return (
    <View style={style.sec}>
      <Text style={style.titulo}>{titulo ? titulo : 'Seccion'}</Text>
      <Item
        placeholder={titulo}
        icon={icon}
        setText={setText}
        value={value}
        edit={edit}
      />
    </View>
  );
};

const style = StyleSheet.create({
  sec: {
    backgroundColor: Default_theme.primary,
    paddingHorizontal: 17,
    paddingVertical: 13,
    width: 305,
    borderRadius: 20,
    gap: 12,
    alignSelf: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000',
  },
});

export default Seccion;
