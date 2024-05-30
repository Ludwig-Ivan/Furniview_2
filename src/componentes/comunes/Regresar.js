import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Default_theme} from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

const Regresar = ({func, styleExt}) => {
  return (
    <Pressable
      onPress={() => {
        try {
          func();
        } catch (error) {
          console.error('La funcion no se pudo ejecutar');
        }
      }}
      style={[style.btn, styleExt]}>
      <Icon name={'arrow-back'} size={30} color="#000" />
    </Pressable>
  );
};

const style = StyleSheet.create({
  btn: {
    width: 76,
    height: 62,
    backgroundColor: Default_theme.primary,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
});
export default Regresar;
