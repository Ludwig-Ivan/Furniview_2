import React from 'react';
import {StyleSheet, View} from 'react-native';
import SerachBar from './SerachBar';

const Header = ({bus, setBus, func, styleExt}) => {
  return (
    <View style={[style.head, styleExt]}>
      <SerachBar
        value={bus}
        setText={setBus}
        placeholder={'Buscar'}
        func={func}
      />
    </View>
  );
};

const style = StyleSheet.create({
  head: {
    flexDirection: 'row',
    width: 332,
    gap: 18,
    marginTop: 15,
  },
});
export default Header;
