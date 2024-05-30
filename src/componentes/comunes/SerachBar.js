import React from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import {Default_theme} from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';

const SerachBar = ({value, setText, styleExt, placeholder, func}) => {
  const style = StyleSheet.create({
    icon: {
      width: 30,
      height: 30,
    },
    searchbar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      minWidth: 264,
      width: '100%',
      backgroundColor: Default_theme.terciario,
      borderRadius: 20,
      paddingHorizontal: 20,
    },
    txtinput: {
      color: '#FFF',
      letterSpacing: 1,
      minWidth: 194,
      fontWeight: value === '' ? '500' : '700',
    },
  });

  return (
    <View style={[style.searchbar, styleExt]}>
      <TextInput
        style={style.txtinput}
        placeholder={placeholder ? placeholder : 'placeholder'}
        placeholderTextColor={'rgba(255,255,255,0.6)'}
        value={value}
        onChangeText={text => {
          try {
            setText(text);
          } catch (error) {
            console.error('error al cambiar el texto');
          }
        }}
      />
      <Pressable
        onPress={() => {
          try {
            func();
            setText('');
          } catch (error) {
            console.error('error al ejecutar la funcion');
          }
        }}>
        <Icon name={'search-outline'} size={35} color={'#000'} />
      </Pressable>
    </View>
  );
};

export default SerachBar;
