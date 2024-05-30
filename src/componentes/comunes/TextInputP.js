import React from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';

//recibe el valor del input y la funcion para que cambie (obligado a usar state)
//recibe los estilos extra y el placeholder
const TextInputP = ({titulo, value, setText, styleExt, placeholder}) => {
  const style = StyleSheet.create({
    txtinput: {
      backgroundColor: '#7F6C5B',
      width: 320,
      height: 40,
      paddingHorizontal: 15,
      fontWeight: value === '' ? '700' : '500',
      letterSpacing: 1,
      color: '#FFF',
    },
    txtinp: {
      height: 62,
      width: 320,
    },
    txt: {
      fontWeight: '700',
      fontSize: 16,
      color: '#000',
    },
  });

  return (
    <View style={[style.txtinp, styleExt]}>
      <Text style={style.txt}>{titulo ? titulo : 'Titulo'}</Text>
      <TextInput
        style={style.txtinput}
        placeholder={placeholder ? placeholder : 'placeholder'}
        placeholderTextColor={'rgba(255,255,255, 0.6)'}
        value={value}
        cursorColor={'#FFF'}
        onChangeText={text => {
          try {
            setText(text);
          } catch (error) {
            console.log('No se puede ejecutar el cambio del valor del input');
          }
        }}
      />
    </View>
  );
};

export default TextInputP;
