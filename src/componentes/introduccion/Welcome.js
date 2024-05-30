/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import img from '../../constants/img';

const Welcome = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Principal');
    }, 5000);
    return () => clearTimeout(timer);
  });

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={style.main}>
        <View style={{gap: 80, alignItems: 'center'}}>
          <Image style={style.logo} source={img.logo} />
          <Text style={style.titulo}>BIENVENIDO</Text>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D4B89E',
    width: 300,
    height: 460,
    borderRadius: 10,
  },

  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },

  titulo: {
    fontStyle: 'italic',
    fontSize: 32,
    fontWeight: '900',
    color: '#382424',
  },
});
export default Welcome;
