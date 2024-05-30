import React from 'react';
import {View, StyleSheet} from 'react-native';

const Filter_Background = () => {
  return <View style={style.colorOverlay} />;
};

const style = StyleSheet.create({
  colorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
});

export default Filter_Background;
