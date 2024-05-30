import React from 'react';
import {StyleSheet, View} from 'react-native';
import Images_back from './Images_back';
import Filter from './Filter_Background';

const Background = ({children}) => {
  return (
    <View style={styles.container}>
      <Images_back />
      <Filter />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 650,
    position: 'relative',
  },
});
export default Background;
