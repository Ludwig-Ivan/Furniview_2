import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Default_theme} from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

const Item = ({placeholder, value, icon, setText, styleExt, edit, onBlur}) => {
  //placeholder - el texto que aparece en el placeholder del input
  //value - el valor del input
  //icon - el icono que aparece a un lado del input
  //func - funcion que se usa para cambiar el text
  return (
    <View style={[style.item, styleExt]}>
      <Icon
        name={!icon ? 'help-circle-outline' : icon}
        size={25}
        color={'#000'}
      />
      <TextInput
        onBlur={() => {
          try {
            onBlur();
          } catch (error) {}
        }}
        style={style.text}
        editable={edit}
        onChangeText={text => {
          setText(text);
        }}
        value={value + ''}
        placeholder={placeholder ? placeholder : 'Placeholder'}
      />
    </View>
  );
};

const style = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
  item: {
    backgroundColor: Default_theme.primary,
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 13,
  },
  text: {
    color: '#000',
    fontSize: 14,
    width: '90%',
    height: 30,
    padding: 0,
  },
});
export default Item;
