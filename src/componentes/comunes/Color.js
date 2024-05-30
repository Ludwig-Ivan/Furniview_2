import React from 'react';
import {StyleSheet, View} from 'react-native';

const Color = ({color, styleExt}) => {
  const style = StyleSheet.create({
    clr: {
      borderRadius: 20,
      width: 75,
      height: 74,
      backgroundColor: color ? color : '#F00',
    },
  });
  return <View style={[style.clr, styleExt]} />;
};

export default Color;
